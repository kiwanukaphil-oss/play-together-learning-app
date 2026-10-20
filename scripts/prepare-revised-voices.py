"""Level direction-v2 takes, build their listening catalogue and bundle transcript-checked clips into the app."""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
REVISED = ROOT / "output" / "voice-revised"
LOG = REVISED / "generation-log.json"
DIRECTION = ROOT / "docs" / "PICNIC_VOICE_DIRECTION_V2.json"
RUNTIME_AUDIO = ROOT / "assets" / "picnic" / "voice"
RUNTIME_MODULE = ROOT / "src" / "picnic-voice.js"
PLAYABLE_STATUS = "produced-auto-checked"


def measure_recording(path):
    """Decode the whole recording and return FFmpeg's loudness measurements."""
    result = subprocess.run(
        ["ffmpeg", "-hide_banner", "-i", str(path), "-af",
         "loudnorm=I=-18:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
        capture_output=True, text=True, check=True,
    )
    return json.loads(result.stderr[result.stderr.rindex("{"):result.stderr.rindex("}") + 1])


def encode_levelled_copy(source, output, bitrate):
    """Two-pass loudness normalisation so Pip and Bear sit at the same level as the earlier review copies."""
    levels = measure_recording(source)
    if levels["input_i"] == "-inf":
        raise ValueError(f"Silent source: {source.name}")
    audio_filter = (
        "loudnorm=I=-18:TP=-1.5:LRA=11:"
        "measured_I={input_i}:measured_TP={input_tp}:measured_LRA={input_lra}:"
        "measured_thresh={input_thresh}:offset={target_offset}:linear=true"
    ).format(**levels)
    output.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", str(source), "-af", audio_filter,
         "-ar", "44100", "-ac", "1", "-b:a", bitrate, str(output)],
        check=True,
    )
    probe = json.loads(subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration,size",
         "-of", "json", str(output)], capture_output=True, text=True, check=True,
    ).stdout)["format"]
    measured = measure_recording(output)
    details = {
        "duration": round(float(probe["duration"]), 3), "bytes": int(probe["size"]),
        "sha256": hashlib.sha256(output.read_bytes()).hexdigest(),
        "integratedLufs": float(measured["input_i"]), "truePeakDbtp": float(measured["input_tp"]),
    }
    if not 0.2 < details["duration"] < 30 or details["truePeakDbtp"] > -1:
        raise ValueError(f"Duration or peak outside limits: {output.name} {details}")
    return details


def mouth_envelope(path, frames_per_second=25):
    """Loudness per 40 ms frame as digits 0-9, so the character's mouth follows the recording without runtime analysis."""
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "s16le", "-ac", "1", "-ar", "16000", "-"],
                         capture_output=True, check=True).stdout
    samples = memoryview(raw).cast("h")
    frame = 16000 // frames_per_second
    levels = []
    for start in range(0, len(samples) - frame + 1, frame):
        chunk = samples[start:start + frame]
        levels.append((sum(value * value for value in chunk) / frame) ** 0.5)
    loudest = max(levels) or 1
    # Square-root scaling keeps quieter syllables visible; a small floor keeps silence fully closed.
    return "".join(str(min(9, round(9 * (level / loudest) ** 0.5))) if level / loudest > 0.04 else "0" for level in levels)


def load_runtime_lines():
    script = subprocess.run(
        ["node", "--input-type=module", "-e",
         "import {PICNIC_LINES} from './src/picnic-content.js';console.log(JSON.stringify(PICNIC_LINES));"],
        cwd=ROOT, capture_output=True, text=True, encoding="utf-8", check=True,
    )
    return json.loads(script.stdout)


def prepare_revised_voices():
    """Only takes whose transcript matched the runtime words are bundled; others stay on the review sheet for retakes."""
    log = json.loads(LOG.read_text(encoding="utf-8"))
    direction = json.loads(DIRECTION.read_text(encoding="utf-8"))
    runtime = load_runtime_lines()
    assert set(log["entries"]) == set(runtime), "Generation log does not cover every runtime line"
    if RUNTIME_AUDIO.exists():
        shutil.rmtree(RUNTIME_AUDIO)
    catalogue, bundled, held_back = [], {}, []
    for line_id, line in runtime.items():
        record = log["entries"][line_id]
        source = REVISED / "originals" / f"{line_id}.mp3"
        listening = encode_levelled_copy(source, REVISED / "clips" / f"{line_id}.mp3", "128k")
        catalogue.append({
            "id": line_id, "speaker": line["speaker"], "text": line["text"],
            "direction": f'Energy {direction["lines"][line_id]["energy"]}/10 - {direction["lines"][line_id]["generationText"]}',
            "file": f"clips/{line_id}.mp3", "source": record.get("source"),
            "transcript": record.get("transcript"), "transcriptMatches": record.get("transcriptMatches"),
            **listening,
        })
        if record.get("transcriptMatches") is not True:
            held_back.append(line_id)
            continue
        # Speech at 64 kbps mono keeps the offline bundle small without audible loss on laptop speakers.
        packed = encode_levelled_copy(source, RUNTIME_AUDIO / f"{line_id}.mp3", "64k")
        bundled[line_id] = {"file": f"./assets/picnic/voice/{line_id}.mp3", "duration": packed["duration"],
                            "review": PLAYABLE_STATUS, "sha256": packed["sha256"], "bytes": packed["bytes"],
                            "mouth": mouth_envelope(RUNTIME_AUDIO / f"{line_id}.mp3")}

    manifest = {"manifestVersion": 1, "scriptVersion": 2, "directionVersion": 2, "model": log.get("modelId"),
                "voices": log.get("voices"), "voiceSettings": log.get("voiceSettings"),
                "humanListeningReview": False, "heldBack": held_back, "entries": catalogue}
    (REVISED / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    safe_json = json.dumps(manifest, ensure_ascii=False).replace("<", "\\u003c")
    (REVISED / "catalogue.js").write_text("const recordingCatalogue = " + safe_json + ";\n", encoding="utf-8")

    module_lines = [
        "// Generated by scripts/prepare-revised-voices.py from direction-v2 takes; do not edit by hand.",
        "// produced-auto-checked: transcript matched the runtime words, levelled; parent listening review 2026-10-20.",
        "// mouth: loudness per 40 ms frame (0-9) used to animate the speaking character.",
        "export const PICNIC_VOICE_CLIPS=" + json.dumps(
            {k: {key: v[key] for key in ("file", "duration", "review", "mouth")} for k, v in bundled.items()},
            ensure_ascii=False, separators=(",", ":")) + ";",
    ]
    RUNTIME_MODULE.write_text("\n".join(module_lines) + "\n", encoding="utf-8")
    total = sum(item["bytes"] for item in bundled.values())
    print(f"Bundled {len(bundled)}/{len(runtime)} clips ({total / 1024:.0f} KiB). Held back: {held_back or 'none'}")


if __name__ == "__main__":
    prepare_revised_voices()

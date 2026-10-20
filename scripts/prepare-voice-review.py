"""Prepare preserved ElevenLabs exports for listening; never approve production takes."""
import hashlib
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / "output" / "voice-production"
MANIFEST = REVIEW / "production-manifest.json"


def measure_recording(path):
    """Decode the whole recording and measure levels rather than trusting its extension."""
    result = subprocess.run(
        ["ffmpeg", "-hide_banner", "-i", str(path), "-af",
         "loudnorm=I=-18:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
        capture_output=True, text=True, check=True,
    )
    return json.loads(re.findall(r"\{[^{}]+\}", result.stderr)[-1])


def prepare_comparison_recording(entry):
    """Preserve the export and create a levelled copy with independently measured metadata."""
    source = REVIEW / entry["originalFile"]
    output = REVIEW / "clips" / f'{entry["id"]}.mp3'
    levels = measure_recording(source)
    if levels["input_i"] == "-inf":
        raise ValueError(f'Silent source: {entry["id"]}')
    audio_filter = (
        "loudnorm=I=-18:TP=-1.5:LRA=11:"
        "measured_I={input_i}:measured_TP={input_tp}:measured_LRA={input_lra}:"
        "measured_thresh={input_thresh}:offset={target_offset}:linear=true"
    ).format(**levels)
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", str(source), "-af", audio_filter,
         "-ar", "44100", "-ac", "1", "-b:a", "128k", str(output)],
        check=True,
    )
    probe = json.loads(subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries",
         "format=duration,size:stream=codec_name,sample_rate,channels",
         "-of", "json", str(output)], capture_output=True, text=True, check=True,
    ).stdout)
    measured = measure_recording(output)
    entry.update({
        "file": f'clips/{entry["id"]}.mp3',
        "duration": float(probe["format"]["duration"]),
        "bytes": int(probe["format"]["size"]),
        "originalSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        "sha256": hashlib.sha256(output.read_bytes()).hexdigest(),
        "integratedLufs": float(measured["input_i"]),
        "truePeakDbtp": float(measured["input_tp"]),
        "media": probe["streams"][0],
    })
    if not 0.2 < entry["duration"] < 30:
        raise ValueError(f'Unexpected duration: {entry["id"]}')
    if entry["truePeakDbtp"] > -1:
        raise ValueError(f'Peak exceeds review ceiling: {entry["id"]}')


def prepare_review_catalogue():
    """Require every script ID before publishing a complete review catalogue."""
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    script = subprocess.run(
        ["node", "--input-type=module", "-e",
         "import {PICNIC_LINES} from './src/picnic-content.js';"
         "console.log(JSON.stringify(PICNIC_LINES));"],
        cwd=ROOT, capture_output=True, text=True, encoding="utf-8", check=True,
    )
    runtime = json.loads(script.stdout)
    entries = manifest["entries"]
    assert len(entries) == len(runtime) == len({entry["id"] for entry in entries})
    assert {entry["id"] for entry in entries} == set(runtime)
    (REVIEW / "clips").mkdir(exist_ok=True)
    for entry in entries:
        expected = runtime[entry["id"]]
        assert entry["text"] == expected["text"] and entry["speaker"] == expected["speaker"]
        assert entry["review"] == "produced" and entry.get("originalFile")
        prepare_comparison_recording(entry)
    manifest["technicalValidation"] = {
        "date": "2026-10-20", "scriptIds": len(entries),
        "allSourcesPreserved": True, "allComparisonFilesDecoded": True,
        "humanListeningReview": False, "normalisation": "Two-pass FFmpeg loudnorm; -18 LUFS / -1.5 dBTP",
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    # A JS data file lets the review sheet work from disk as well as a local server.
    safe_json = json.dumps(manifest, ensure_ascii=False).replace("<", "\\u003c")
    (REVIEW / "catalogue.js").write_text("const recordingCatalogue = " + safe_json + ";\n", encoding="utf-8")
    print(f'Prepared {len(entries)} recordings; {sum(e["duration"] for e in entries):.1f} seconds.')


if __name__ == "__main__":
    prepare_review_catalogue()

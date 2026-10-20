"""Transcribe revised takes locally with Whisper and record whether each one says exactly the runtime words.

Used when the ElevenLabs key lacks speech-to-text permission; audio never leaves this machine.
Usage: python scripts/verify-voice-transcripts.py [line-id ...]
"""
import json
from pathlib import Path
import re
import subprocess
import sys

import numpy
from faster_whisper import WhisperModel

ROOT = Path(__file__).resolve().parents[1]
LOG = ROOT / "output" / "voice-revised" / "generation-log.json"
ORIGINALS = ROOT / "output" / "voice-revised" / "originals"
NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
# Recognisers write American spellings, contractions or homophones differently; these are the same spoken words.
EQUIVALENT_SPELLINGS = {"cozy": "cosy", "ok": "okay", "matt": "mat"}  # "matt": homophone of the taught word mat


def spoken_words(text):
    """Mirror spokenWords() in generate-picnic-voices.mjs, plus spelling equivalence for recogniser output."""
    text = re.sub(r"\[[^\]]*\]", " ", text).replace("’", "'").replace("‘", "'").lower()
    text = re.sub(r"\d+", lambda m: NUMBER_WORDS[int(m.group())] if int(m.group()) <= 10 else m.group(), text)
    words = [word.strip("'") for word in re.sub(r"[^a-z' ]+", " ", text).split()]
    return [EQUIVALENT_SPELLINGS.get(word, word) for word in words if word]


def decode_for_whisper(path):
    """Decode with FFmpeg to 16 kHz mono float samples, avoiding PyAV version mismatches."""
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "f32le", "-ac", "1", "-ar", "16000", "-"],
                         capture_output=True, check=True).stdout
    return numpy.frombuffer(raw, dtype=numpy.float32)


def load_runtime_lines():
    script = subprocess.run(
        ["node", "--input-type=module", "-e",
         "import {PICNIC_LINES} from './src/picnic-content.js';console.log(JSON.stringify(PICNIC_LINES));"],
        cwd=ROOT, capture_output=True, text=True, encoding="utf-8", check=True,
    )
    return json.loads(script.stdout)


def verify_transcripts(selected_ids):
    """Transcribe each take, compare word sequences and store the evidence in the generation log."""
    runtime = load_runtime_lines()
    log = json.loads(LOG.read_text(encoding="utf-8"))
    model = WhisperModel("small.en", device="cpu", compute_type="int8")
    mismatches = []
    for line_id in selected_ids or list(runtime):
        segments, _ = model.transcribe(decode_for_whisper(ORIGINALS / f"{line_id}.mp3"), language="en", beam_size=5,
                                       vad_filter=False, condition_on_previous_text=False)
        heard = " ".join(segment.text.strip() for segment in segments).strip()
        matches = spoken_words(heard) == spoken_words(runtime[line_id]["text"])
        log["entries"][line_id].update({"transcript": heard, "transcriptMatches": matches,
                                        "transcriber": "faster-whisper small.en (local)"})
        if not matches:
            mismatches.append(f'{line_id}: heard "{heard}" expected "{runtime[line_id]["text"]}"')
    LOG.write_text(json.dumps(log, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("\n".join(mismatches) if mismatches else "All transcripts match the runtime text.")


if __name__ == "__main__":
    verify_transcripts(sys.argv[1:])

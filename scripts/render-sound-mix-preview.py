"""Render a short gameplay mix with the app's exact gains so effects and ambience can be judged beside speech."""
from pathlib import Path
import re
import subprocess

import numpy

ROOT = Path(__file__).resolve().parents[1]
RATE = 44100
OUTPUT = ROOT / "output" / "sound-effects" / "mix-preview.mp3"


def runtime_gains():
    """Read the levels from src/picnic-sound.js so the preview cannot drift from the app."""
    source = (ROOT / "src" / "picnic-sound.js").read_text(encoding="utf-8")
    return {name: float(value) for name, value in re.findall(r"(AMBIENCE_LEVEL|AMBIENCE_DUCKED|EFFECT_LEVEL)=([\d.]+)", source)}


def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "f32le", "-ac", "1", "-ar", str(RATE), "-"],
                         capture_output=True, check=True).stdout
    return numpy.frombuffer(raw, dtype=numpy.float32)


def render_mix_preview():
    """Lay out a packing scene: welcome, transition, instruction, three counted apples, success, then ambience alone."""
    gains = runtime_gains()
    voice = lambda name: load(ROOT / "assets" / "picnic" / "voice" / f"{name}.mp3")
    effect = lambda name: load(ROOT / "assets" / "picnic" / "sound" / f"{name}.mp3") * gains["EFFECT_LEVEL"]
    events = [(0.6, voice("welcome"), True), (5.2, effect("whoosh"), False), (5.8, voice("pack-three-in-row"), True)]
    for index, start in enumerate([8.6, 9.9, 11.2], start=1):
        events += [(start, effect("apple-basket"), False), (start + 0.15, voice(f"count-{index}"), True)]
    events += [(12.8, effect("success"), False), (13.4, voice("pack-success-1"), True)]
    length = int(20.5 * RATE)  # ends with three seconds of ambience alone
    speech, effects = numpy.zeros(length, numpy.float32), numpy.zeros(length, numpy.float32)
    speaking = numpy.zeros(length, bool)
    for start, clip, is_speech in events:
        begin = int(start * RATE); end = min(length, begin + len(clip))
        (speech if is_speech else effects)[begin:end] += clip[:end - begin]
        if is_speech:
            speaking[begin:end] = True
    # Ambience gain ramps over 0.3 s toward the ducked level while anyone speaks, as the Web Audio engine does.
    target = numpy.where(speaking, gains["AMBIENCE_DUCKED"], gains["AMBIENCE_LEVEL"]).astype(numpy.float32)
    kernel = numpy.ones(int(.3 * RATE), numpy.float32) / int(.3 * RATE)
    envelope = numpy.convolve(target, kernel, mode="same")
    envelope[:int(1.5 * RATE)] *= numpy.linspace(0, 1, int(1.5 * RATE))
    bed = numpy.resize(load(ROOT / "assets" / "picnic" / "sound" / "ambience.mp3"), length)
    mix = speech + effects + bed * envelope
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ac", "1", "-ar", str(RATE), "-i", "-",
                    "-b:a", "128k", str(OUTPUT)], input=mix.astype(numpy.float32).tobytes(), check=True)
    print(f"Mix preview: {OUTPUT.relative_to(ROOT)} (peak {20 * numpy.log10(numpy.max(numpy.abs(mix))):.1f} dBFS)")


if __name__ == "__main__":
    render_mix_preview()

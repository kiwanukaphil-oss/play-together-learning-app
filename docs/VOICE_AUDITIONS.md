# Moonlight Picnic voice auditions

Generated 2026-10-20 through the user's signed-in ElevenLabs Starter account, using Eleven v4. Casting and human listening review remain open.

Open [the listening sheet](../output/voice-auditions/index.html) locally, or serve that directory with `python -m http.server 4174 --bind 127.0.0.1` and visit `http://127.0.0.1:4174/`. The review page and recordings are excluded from the app build because they live outside `src/` and `assets/`.

| Candidate | Library voice | Voice ID | Original duration | Export parameter suffix |
|---|---|---|---|---|
| Pip A | Tamsin — Engaging British storyteller and narrator | `dAlhI9qAHVIjXuVppzhW` | 25.16 s | `pvc_sp100_s50_sb75_v4` |
| Pip B | Beth — British female, playful & witty | `zH7TN9vEZAsEway9xWev` | 23.80 s | `pvc_sp89_s38_sb100_v4` |
| Bear A | Mike — Warm, Conversational British | `FZQ5wG88XQUxYZLhe3dp` | 24.53 s | `pvc_sp94_s100_sb100_v4` |
| Bear B | Cotswold — Calm, Soft and Rural British | `bZOiovivKA2Bl3lLvbC6` | 24.03 s | `pvc_sp90_s71_sb40_v4` |

These are library descriptions, not findings from listening. British voices are an initial casting assumption, not an approved pronunciation convention for teaching phonics.

Four generation requests produced two alternatives each. Generation 1 from each request was downloaded without ranking the takes by ear. The UI balance decreased by 1,600 included credits; no additional purchase was made. Generation 2 alternatives remain in the provider history.

## Common generation text

```text
[warmly] A little picnic, under the moon. Will you help us get ready?
[playfully] My basket is enormous. Our picnic is quite small.
[gently] Put three apples in the basket.
[patiently] Let's count what's here. One. Two. Three.
[encouragingly] One more apple will make three.
[pleased] Three apples. Our basket is ready.
[softly] We made a lovely little picnic. Stay a while, or come back another day.
```

The generation UI displayed Stability 50%, Similarity 75%, language Auto, and MP3 44.1 kHz / 128 kbps. Exported filenames contain different voice-specific parameter suffixes, preserved above. Their effective interpretation has not been verified. This is a same-script casting comparison, not a controlled comparison with identical effective settings. Resolve this before producing the full catalogue.

## Files and verification

Original downloaded MP3s are preserved alongside `*-levelled.mp3` comparison copies. FFmpeg two-pass loudness normalisation targeted -18 LUFS with a -1.5 dBTP ceiling; post-encode measurements range from -18.72 to -18.46 LUFS and -1.92 to -1.85 dBTP. This is audition preparation, not a final production mix.

[Media validation](../output/voice-auditions/media-validation.json) records hashes, durations, format and measured levels. All four comparison files decode successfully, load in Chrome, and expose native audio controls. Switching from Pip A to Pip B pauses A; keyboard Space pauses B. The desktop page was visually inspected without horizontal overflow. Responsive and cross-browser coverage are not claimed.

The lack of an installed ElevenLabs connector was resolved using the already signed-in browser. No API key was requested, created or stored. No child data or recordings were used. The files contain generated library voices; no custom voice clone was created.

## Next production decisions

1. Listen and choose a Pip/Bear pair, or describe the changes needed. Assess clear words, warmth, natural pauses, character distinction, humour and fatigue at normal laptop volume.
2. Confirm effective settings and document the applicable library/provider usage rights before production distribution.
3. Produce the 68 runtime lines with stable IDs and per-line review records. Integrate approved clips, interruptions, replay, caching and fallback.
4. Review phoneme, blending and teaching-word pronunciation separately. These seven-line auditions do not certify phonics correctness.

No human listening, educational, parent acceptance or real-child review is recorded yet.

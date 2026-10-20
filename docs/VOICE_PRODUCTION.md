# Pip and Bear production recordings

Date: 2026-10-20. The user selected **Pip A / Tamsin** and **Bear A / Mike**. The first production set covers all 68 IDs in runtime script version 2: 29 Pip lines and 39 Bear lines.

Open [the recording review sheet](../output/voice-production/index.html), or serve its directory with `python -m http.server 4175 --bind 127.0.0.1` and visit `http://127.0.0.1:4175/`.

## Current direction revision

The user reported that a number of first takes sounded whispery and requested more children's-presenter energy, referencing Ms Rachel/Blippi at roughly 70% intensity. This is collection-level listening feedback; it does not identify every affected line or approve the remaining takes.

The original direction overemphasised restrained delivery. Direction version 2 keeps the chosen voices and seeks clear, fully voiced speech, brighter invitations, playful emphasis, engaged questions and more delighted discoveries. Instructions remain easy to follow, and endings relax without whispering. The percentage is a creative brief, not a numeric synthesis setting.

[Compare eight original/revised samples](../output/voice-energy-review/index.html) (local server: `python -m http.server 4176 --bind 127.0.0.1` from that directory). Start with Bear's welcome and Pip's discovery. The set also includes counting instruction, help, word building, a demonstration, drawing and an ending.

- Same selected voices, Eleven v4, displayed Stability 50% / Similarity 75%. The test changes performance tags and punctuation while preserving the spoken word sequences.
- Eight final revised clips, totalling 29.9 seconds. Both sides use the same loudness-preparation target; post-encode integrated loudness differs by at most 1.08 LUFS per pair.
- Ten generation requests used 784 included credits. Input checks caught apostrophes encoded as question marks in two prompts; corrected versions were regenerated before handoff. Superseded exports are preserved privately and flagged as retirement candidates, not included in the listening page or Git.
- The comparison manifest preserves exact generation text, originals, hashes, measured levels and the corrected-input history. All eight final word-sequence checks and decoding/peak checks passed.
- Chrome loaded all 16 comparison players without media errors; switching takes paused the previous player and keyboard playback was exercised. No console warnings/errors or horizontal overflow in the inspected desktop page.
- These are calibration samples awaiting listening feedback. The complete first batch and runtime remain unchanged; do not assume that a successful download or a revised tag proves the whisperiness is resolved.

The [ElevenLabs prompting guide](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices#prompting-eleven-v4) supports delivery tags and punctuation as controls, while noting that results depend on the voice and need testing. The exact prompt is documented as an input, not a verified description of its sound.

## Production record

- ElevenLabs v4, through the already signed-in paid Starter account. No API credential was created or stored.
- Tamsin voice ID: `dAlhI9qAHVIjXuVppzhW`. Mike voice ID: `FZQ5wG88XQUxYZLhe3dp`.
- 67 generation requests; Generation 1 downloaded for each. The two identical five-apple prompts reuse one take, explicitly linked in the manifest.
- 3,833 included credits used for this batch, separate from the earlier 1,600-credit auditions. No additional purchase.
- Performance tags direct warmth, gentle support, patient demonstrations, pleased successes and quiet endings. The exact generation text is preserved. Numerals were written as English number words for generation; runtime captions were not changed.
- The UI displayed Stability 50%, Similarity 75%, Auto language and MP3 44.1 kHz / 128 kbps for both voices. Reapplying the displayed values for Mike did not change the filename suffix. The production manifest therefore distinguishes observed UI settings from preserved filename metadata; effective backend parameters were not independently verified.
- Originals are preserved in `output/voice-production/originals/`. Levelled listening copies, a versioned manifest, hashes, durations, provenance and explicit `produced` review states are alongside them.

ElevenLabs' [publishing guidance](https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform) states that paid plans include commercial licensing, excluding Beta Services and subject to applicable terms and rights. These recordings used selectable library voices under the paid account; no custom cloning was performed. The [TTS guide](https://elevenlabs.io/docs/eleven-creative/playground/text-to-speech) informed performance tags and spelling out numbers. This records the licensing basis, not a claim of exclusive voice ownership.

## Technical evidence

`python scripts/prepare-voice-review.py` checks exact script IDs, speakers and transcripts, decodes every source and comparison copy, applies two-pass level preparation and records independent output measurements. It does not change any take's review status.

- 68 matching script IDs; 67 preserved original exports; 68 comparison files.
- 243.6 seconds of audio; comparison files total 3,957,696 bytes.
- MP3, mono, 44.1 kHz. Target -18 LUFS / -1.5 dBTP; measured integrated levels range from -21.52 to -18.05 LUFS, with maximum true peak -1.69 dBTP. Short phrases and peak limits prevent a claim of perfectly equal perceived loudness.
- Individual count clips are 0.84–0.99 seconds. This checks duration, not number pronunciation.
- Chrome loaded metadata for all 68 files without media errors. Welcome/resume playback, exclusive playback, keyboard pause, seven-result counting search, character filtering, review persistence through reload, pending/retake filtering and review export were exercised.
- Exported JSON contained 68 pending decisions with exact take hashes after the synthetic review test was reset. No real listening approval was fabricated.
- Desktop layout was visually inspected without horizontal overflow. No console warnings/errors were reported in the inspected review session. Mobile, cross-browser and complete accessibility review are not claimed.

## Listening handoff and integration

The review sheet supports per-line judgements and notes, stored only in that browser. **Download review notes** exports them explicitly. Decisions are tied to audio hashes, so a replacement recording cannot inherit approval.

Every take is currently **produced, not listen-reviewed**. Listen for correct words, clear numbers, natural pauses, consistent character and comfortable delivery. Production acceptance is separate from the user's completed casting choice. Teaching words, isolated sounds and blending still need appropriate pronunciation review.

The live app remains on its documented browser fallback. Its audio controller already requires `listen-reviewed` or `teaching-reviewed` clips. These review artifacts live outside the production bundle; after actual review, approved files can be moved into the bundled audio path and wired to runtime IDs, with replay/interruption/offline tests. No new live deployment or full Q2 acceptance is claimed.

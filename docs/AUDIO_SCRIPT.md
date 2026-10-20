# Moonlight Picnic — voice production script

Date: 2026-10-20. Version 2. All 68 lines now have first production takes; per-line listening review remains open. See `docs/VOICE_PRODUCTION.md`. Runtime records and the recording sheet retain draft status until reviewed clips are integrated.

Runtime transcripts and stable IDs live in `src/picnic-content.js`. They are the exact-text source for production; this guide describes performance, timing, and coverage. Never ship prose annotations as spoken text.

## Direction shared by both performers

Speak to one child nearby. Invite, notice, and wait. Keep instructions concise and natural. Allow 200–400ms between a story thought and an action instruction. Never add a vowel to a consonant recording. Teaching sounds need separate professional review; narrative acting is not that review.

Pip: curious, bright, gentle smile. Bear: warm, thoughtful, relaxed. Keep pronunciation consistent across the cast. Accent is provisional English, to be aligned with the child's school where possible. No voice cloning or impersonation.

## Audition passage

Record these exact lines for each suitable voice, keeping the performance character-specific:

1. “A little picnic, under the moon. Will you help us get ready?” — welcoming, a small pause after picnic.
2. “My basket is enormous. Our picnic is quite small.” — quiet amusement, no canned laugh.
3. “Put three apples in the basket.” — clear instruction, natural emphasis on three.
4. “Let's count what's here. One. Two. Three.” — evenly paced, space for pointing.
5. “One more apple will make three.” — helpful realisation, no disappointment.
6. “Three apples. Our basket is ready.” — satisfaction, not shouting.
7. “We made a lovely little picnic. Stay a while, or come back another day.” — warm, settling cadence.

Log each candidate's provider/performer, rights, production cost, voice settings, accent, sample files, and actual listening notes. Four generated candidates are preserved in `docs/VOICE_AUDITIONS.md`. The user selected Tamsin for Pip and Mike for Bear on 2026-10-20; each production take still requires its own listening review.

## Trigger and performance map

| ID family | Speaker | Trigger | Direction / timing |
|---|---|---|---|
| welcome, resume | Bear | Enter/resume | Friendly invitation; wait for child |
| word-* | Pip | Workshop word selected | Clear whole word; pause before repeating |
| demo-word-* | Pip | Self-paced word example frame | Patient modelling; describe the example, then wait |
| demo-pack-* / demo-share-* | Bear | Self-paced apple example frame | One action/thought at a time; no automatic advance |
| word-help-* | Pip | Help stages | Calm cue, then modelling; never pronounce raw graphemes with generic TTS |
| word-success-* | Pip | Correct word | Name the object and its purpose; short delighted pause |
| pack-* | Bear | Counting prompt selected | Emphasise quantity once, then wait |
| count-* | Bear | Individual count/action | Dry, clear number; no long praise on each apple |
| pack-few / pack-many | Bear | Explicit check | Neutral noticing, practical invitation |
| pack-help-* | Bear | Help stages | Slow enough to follow object highlights |
| pack-success-* | Bear | Correct quantity | Warm, specific; no repeated generic “You did it” |
| share-* | Bear | Sharing branch | Two friends, same amount; short and concrete |
| share-left | Bear | Equal plates with fruit still in the supply | Notice both success conditions: equal plates and all apples shared |
| share-help-* | Bear | Requested support | Notice unequal plates; demonstrate one action |
| share-success-* | Pip | Equal distribution | Acknowledge both plates |
| paper-* | Pip | Drawing step | One shape at a time, natural pauses; child controls timing |
| paper-extension-* | Pip | Optional creative invitation | Curious, no expected answer |
| ending-* | Bear | Completed adventure | Quiet satisfaction; acknowledge paper only when confirmed |
| exit | Pip | Pause | Reassuring; no guilt, countdown, or urgency |

## Production manifest contract

For each exact line: stable ID, script version, speaker, text, direction, optional pronunciation note, file, duration, provider/performer, rights, voice settings, review status, reviewer/date. Review status is `draft`, `produced`, `listen-reviewed`, or `teaching-reviewed`.

No generated file is automatically approved. Do not select a provider merely because generation is possible. Until recordings are available, the implementation may speak whole words/instructions through the browser as a labelled development fallback. The audition and final audio quality milestone remain incomplete.

## Sound design

Apple placement: short soft wooden/plush tap. Removal: lighter lift. Object reveal: brief two-note wooden chime. Ending: a quiet resolution. No error buzzer. Ambience: optional evening hush, no insects that compete with consonants. Music and effects must be separately mutable and duck beneath dialogue.

## Coverage and boundaries

The runtime transcript catalogue includes all implemented routes and numbers 0–6. Sound clues/phoneme files remain a separate unimplemented reviewed-audio requirement. Do not mark full-route audio coverage complete until these assets, optional drawing alternatives, and all future branches are authored and reviewed.

## Sound-clue branch — production brief, not enabled

This branch is omitted from the current route until pictures and teaching audio have been reviewed. All tasks assess first-sound matching, not written-word decoding. Speak the picture names on request; do not show printed answers.

| Proposed line ID | Exact draft text | Picture choices / expected answer |
|---|---|---|
| sound-moon | Listen to moon. Which picture starts with the same sound? | mouse, pan, sun → mouse |
| sound-pear | Listen to pear. Which picture starts with the same sound? | pan, moon, sun → pan |
| sound-sock | Listen to sock. Which picture starts with the same sound? | sun, mouse, pan → sun |
| sound-help-1 | Let's name the pictures together. Listen to the start of each word. | Replay each picture's reviewed whole-word label |
| sound-help-2 | Listen to the first sound. Now listen to the picture names again. | Reviewed isolated sound and whole-word recordings; never raw TTS phonemes |
| sound-help-3 | I'll show one that starts the same way. Then we can try another. | Mark supported; model one example before a different authored task |
| sound-success-moon | You found mouse. A little friend for our picnic. | Mouse appears beside the path |
| sound-success-pear | You found pan. Bear can use that for the picnic. | Pan becomes available |
| sound-success-sock | You found sun. Our picnic can begin as the sun goes down. | Sky transition, no claim of learning a written word |

The branch's word/object consequences must be reconciled with the following workshop scene before enabling it, so the story does not award the same object twice. This is an explicit remaining Q3 integration item.

# Learning blueprint and implementation decisions

Date: 2026-10-19. Reversible defaults chosen under the user's autonomous-delivery instruction.

## Learner and teaching boundaries

Primary learner: approaching six, learning through a laptop with a nearby parent. Alphabet recognition and rote counting do not imply decoding, spelling, cardinality, or independent writing.

English is the current content language. Whole-word browser narration uses an English voice where available. It is not a substitute for reviewed phoneme recordings; oral blending explicitly asks the adult to model sounds. Voice quality and offline availability depend on the device. School phonics and handwriting alignment remain to be reviewed when information becomes available; this does not block reversible development.

## Skill structure

| Area | Starting task | Support | Progression evidence |
|---|---|---|---|
| Listening | Compare initial sounds in familiar named pictures | Adult names objects; show a correct choice | Different examples, across days, observed independently |
| Oral blending | Hear separate sounds and choose a familiar pictured word | Adult models blending | Parent observation; never infer from a visual tile match alone |
| Reading | Read a short word and select its picture | Replay directions and adult support | Varied words within taught patterns |
| Spelling | Hear a word and arrange its grapheme tiles | Show the completed word; adult models sounds | Independent response without hints |
| Number | Count a small collection, compare, join, and remove | Concrete visual groups; count with adult | New quantities/arrangements, beyond reciting numbers |
| Patterns | Name shapes and continue repeating patterns | Highlight the next choice | Different shapes/patterns and parent confirmation |
| Storytelling | Arrange three events and tell a story | Spoken descriptions and adult discussion | Parent observation, not a rigid correctness judgement of creative narration |
| Drawing/writing | Copy a step-by-step picture and pencil patterns | Large diagrams and repeatable steps | Adult observes paper work; app does not grade it |

Nine independent storage strands now distinguish listening, reading, spelling, number understanding, operations, shapes/patterns, storytelling, drawing, and handwriting. Each has its own evidence and parent-set practice level. Activity IDs preserve task differences within a strand.

## Starter phonics constraints

1. `s a t p i n m`: short words using these correspondences.
2. Add `c d g o u e r h b`: further short words.
3. Remaining single-letter correspondences used by the selected content.
4. Selected digraphs `sh ch th ng ck`.
5. Selected vowel patterns `ai ee oo oa ar`.

The parent sets the highest taught group. Game content is further limited by current practice level. A group label is not a complete systematic phonics programme. All content is marked draft for parent/educator review. Picture-supported choices use a concrete subset to avoid ambiguous action symbols.

## Evidence rules

- Default completion is **supported**, not independent.
- Parent can mark a completed session independent, supported, or revisit.
- Hints, wrong attempts, and shown answers remain supported even when a parent marks the session independent.
- Advancement requires at least three distinct examples independently observed across at least three different days within recent evidence.
- Multiple revisits inhibit advancement. Advancing clears the evidence window for the next level without deleting history.
- Parent-set levels disable automatic progression until explicitly resumed.
- Skipped activities do not count as failures or completed sessions.
- These are transparent product rules, not validated developmental thresholds.

## Daily flow and free choice

Start with sounds, continue to word building, then number or pattern play, and finish on paper. Free choice is always available. Four questions form a short game round, but the learner may leave at any time. Completed sessions persist. An unfinished game resumes at its next unfinished question; half-entered answers restart, and a resumed game is free play rather than a restored daily sequence. No time limit, streaks, or locked creative activities.

Word selection now prioritises due reviews: supported words can return after one day; independent examples after three days. Already-used examples are avoided within the current session where the pool allows it. These are adjustable product heuristics, not a validated learning schedule. Parent starting-point tasks separately observe oral blending, counting, and pencil control; success in oral blending does not automatically raise reading or spelling levels.

## Architecture decisions

- Use native browser modules and a static build for the first implementation. No framework/runtime dependency is necessary for this scale, and it makes offline packaging and review straightforward.
- Modules separate content, learning/persistence logic, drawing definitions, and application rendering. Game routing is still centralised; split it as activity complexity grows.
- Use Node's built-in test runner for learning rules and content invariants.
- Store versioned progress in this browser only. Export/import provides parent-controlled portability.
- No backend, accounts, analytics, microphone, camera, or external AI service. A parent can select an existing drawing image; it is resized locally and included in backups, with a six-image limit.
- Bundle fonts locally with their open-font licences. Custom scene and drawing SVGs are repository-native artwork.
- Use the requested GitHub repository as source of truth. A static GitHub Pages deployment is the simplest compatible release target.

## Current content limitations

- Emoji artwork varies between systems and some word pictures remain approximate; concrete reading selections are filtered.
- No professional educational review or real-child usability session has been claimed.
- Runtime-generated maths variations do not count as a reviewed inventory of authored prompts.
- Generic lowercase letter models, position/length games, and six short reading books are now implemented. Letter forms still need school alignment. Two later books disclose additional words/patterns for adult introduction rather than silently claiming full decodability.
- Reviewed phoneme audio and full school-aligned story coverage remain tracked in the roadmap.

## Moonlight Picnic — 2026-10-20

The new authored route is additive. It uses starter spellings `s a t p i n m` and the words map, mat, pan; spelling selection is constrained by both taught stage and spelling level. Word transcripts do not display the answer before completion. Correct letters can be retained while another space is edited.

Six authored counting records cover 1–5 apples with row, pair, and staggered arrangements. The child must explicitly check the basket. Equal sharing of 2/4/6 apples is included only when operations practice level is at least 1; this is a reversible product heuristic, not a validated developmental threshold.

The story omits sound clues until reviewed teaching audio exists. It records no listening or reading evidence. Spelling, number, optional operations, and confirmed paper drawing receive separate supported observations at the ending; a completion marker prevents duplicate records after refresh. Skipped paper work receives no observation. New-route independent parent assessment remains pending.

Narrative state and partial answers now travel inside validated local backups. Existing saves without a picnic field remain compatible. The original generic unfinished-game snapshot continues to operate separately.

The route reuses due-review selection with picnic-specific content IDs; new sessions prefer due or unseen tasks. The paper stage includes a simple round alternative and two optional creative prompts.

Final voice performance, phonics recordings, educator review, school alignment, and observed child usability remain open. See the creative guide, storyboard, audio script, and asset register for production details.

# Play Together — Creative Quality and Build Roadmap

Last updated: 2026-10-20 (Africa/Nairobi)

**Current milestone:** Q2/Q3 — Character audio production and completion of the picnic benchmark; Q4 technical checks are in progress.
**Latest completed work:** Produced all 68 picnic lines in the accepted brighter direction (Tamsin/Pip, Mike/Bear) via the ElevenLabs API, verified every take's words locally, and bundled them into the app with offline caching.
**Next deliverable:** Sound effects and character speaking animation, then an observed play session; then the sound-clue scene aligned to the school's phonics programme.
**Product status:** The illustrated home and picnic are implemented with recorded Pip/Bear dialogue for all 68 lines. Per-line listening review, sound effects, sound clues, human review and full benchmark acceptance remain incomplete.
**Latest published code:** `4c5a4d3`, release `5982fba9ccd7`; Actions run `39621226470` (manual dispatch); 84 recorded lines, effects, ambience and lip-sync live on 2026-10-21.
**Authority:** Continue autonomously under [AGENTS.md](AGENTS.md). No routine phase approvals; commits and pushes to the authorised repository are allowed.

## 1. Purpose and source of truth

The user reviewed the app as a good start but below the desired quality, specifically identifying bland voiceovers and the need for more creative thought. On 2026-10-19 the user accepted the proposed direction and requested an updated roadmap to guide the build and track progress.

The next objective is one exceptional, approximately five-minute on-screen adventure: **The Moonlight Picnic**. Paper drawing takes as long as the child needs. Establish the quality through this complete experience before extending it across all six destinations.

This roadmap governs the new build order. The [original roadmap and delivery history](docs/ROADMAP_BASELINE_2026-10-19.md) are preserved in full. All unfinished original requirements remain in scope; a redesign does not erase them. Historical checked items describe the earlier release and do not certify the new quality standard.

Supporting records:

- [Learning blueprint](docs/LEARNING_BLUEPRINT.md): current teaching rules, skill tracking, defaults, and limitations.
- [Validation record](docs/VALIDATION.md): checks actually performed.
- [README](README.md): running the app and current parent guidance.
- [Creative direction](docs/CREATIVE_DIRECTION.md), [storyboard](docs/PICNIC_STORYBOARD.md), [audio script](docs/AUDIO_SCRIPT.md), and [asset register](docs/PICNIC_ASSETS.md).
- [Exact recording sheet](docs/PICNIC_RECORDING_SCRIPT.csv): 68 draft runtime lines with production/review fields.
- [Voice auditions and production record](docs/VOICE_AUDITIONS.md); [local listening sheet](output/voice-auditions/index.html).
- [Full recording production record](docs/VOICE_PRODUCTION.md); [68-line recording review](output/voice-production/index.html).
- [Eight-line energy comparison](output/voice-energy-review/index.html): revised direction after user listening feedback.
- [Home screenshot](output/picnic-review/home-1366.png); the runnable character/scene sheet is `src/picnic-preview.html`.
- [Live development release](https://kiwanukaphil-oss.github.io/play-together-learning-app/).
- [Source repository](https://github.com/kiwanukaphil-oss/play-together-learning-app).

## 2. Starting point and quality gaps

### Preserve and regression-test

The existing app has six destinations, eighteen game modes, fifteen paper-drawing lessons, six pencil patterns, 26 generic lowercase letter models, six short books, twelve physical-world missions, independent tracking across nine strands, parent controls, backup/restore, unfinished-game resume, and an optional local gallery.

The latest recorded app implementation is commit `5cc81b7`, release `a7046afcce12`. Historical verification includes fifteen automated tests, syntax/build checks, browser activity flows, and a public deployment. See the validation record; this roadmap update does not claim those checks were rerun.

Preserve existing progress, backup compatibility, taught-sound limits, independent skill levels, accessible controls, free play, privacy, and early exit. Flag obsolete UI/assets as retirement candidates in comments; do not remove preserved references without authorisation.

### Findings driving the upgrade

| Area | Current evidence | Required improvement |
|---|---|---|
| Voice | One browser-selected English voice, fixed rate/pitch, repeated generic success lines | Directed character performances, varied contextual dialogue, consistent bundled recordings |
| World | Illustrated destination cards beneath a large introduction | A connected, recognisable picture-book setting with obvious destinations |
| Activities | Picnic and word-building screens use sparse panels, buttons, and emoji | Meaningful manipulation of illustrated objects with visible story consequences |
| Help | Generic retry; several help paths reveal or highlight an answer | Graduated, action-specific demonstrations that return control to the learner |
| Continuity | Short question sets and generic celebration | A beginning, purpose, changing scene, and satisfying ending |
| Drawing | Cumulative static diagrams and short prompts | Animated demonstrations, paced paper practice, imaginative choices, and story context |

Review scope: live home, picnic, and word-building screens plus source inspection of audio, activities, feedback, and drawing. The review did not include a direct audition of the device's voice, educator review, or real-child observation.

## 3. Product and creative principles

- Design for a child approaching six on a laptop with mouse and keyboard; use minimal child-facing text.
- Give each learning action a visible purpose: feed, build, discover, share, draw, or help.
- Use a coherent illustrated style for characters, scenery, objects, controls, and animation.
- Make characters warm, curious, and occasionally funny. Avoid constant shouting, exaggerated praise, and babyish delivery.
- Keep a clear immediate action. Background motion settles during listening and thinking.
- Keep Home, Replay, Show me, Undo where applicable, and Break consistent and reachable.
- Support clicks and keyboard activation for every required action; dragging is optional.
- Offer calm retries, specific feedback, replayable demonstrations, and unhurried response time.
- Keep narrative dialogue expressive and instructional phonemes precise.
- Keep story variation separate from teaching difficulty. Each skill progresses independently.
- Paper drawing and handwriting remain physical activities; the app never pretends to see or grade the paper.
- Free play, creative exploration, and breaks remain available without earning access.
- No countdowns, lost lives, streak penalties, advertising, purchases, required camera/microphone, or child-facing AI chat.
- Keep progress local by default. No child data is sent to voice or image production services.
- Keep detailed curriculum, settings, evidence, and recovery in the parent area.

## 4. First quality benchmark — The Moonlight Picnic

### Cast and setting

Working creative direction: Pip is the familiar, curious companion; Bear is a gentle picnic chef. A playful workshop robot can join later. Final names, appearance, accent, and delivery are production decisions to document in Q1/Q2, not assumed to have been auditioned or approved.

Use a cosy treehouse clearing at dusk with readable, warm lighting. The child prepares a small picnic and sees the characters enjoy what was made. Avoid a long introduction or time pressure.

### Scene sequence

| Beat | Child's action | Learning purpose | Visible consequence |
|---|---|---|---|
| Welcome | Choose to help Bear or explore freely | Understand the immediate goal | Bear opens an empty basket; Pip joins |
| Sound clue | Choose a picture after a reviewed sound prompt | Practise the selected listening skill | Discover the friend or item needed for the picnic |
| Workshop | Build an eligible word such as **map** | Connect taught sounds and spellings | The completed map unfolds and reveals the picnic spot |
| Pack | Add/remove actual illustrated food items | One-to-one counting and total quantity | Food moves into the basket; characters react to the action |
| Share, when appropriate | Distribute a suitable quantity across plates | Equal sharing or simple composition | Friends receive the food; totals remain visible |
| Make on paper | Follow a short lantern drawing or choose an extension | Pencil control, drawing, optional eligible label | The child confirms completion; the story continues without judging the drawing |
| Picnic ending | Choose a small decoration or revisit a scene | Agency and a clear ending | Characters gather with the prepared food; the chosen world decoration persists |

Default to an approximately five-minute on-screen route; no timer is shown. Sharing and later content appear only when appropriate to that strand. Provide authored alternatives when a word or task exceeds taught prerequisites. A story never forces an untaught spelling or treats oral blending as reading.

### Minimum benchmark content and behaviour

- [x] Author at least three eligible word examples for the starter route and map their sound prerequisites.
- [x] Author at least six counting prompts spanning quantities 1–5 with varied arrangements.
- [x] Author at least three sharing/composition prompts for the optional appropriate-level branch.
- [x] Author one complete lantern paper lesson with two imaginative extensions and a simple alternative.
- [ ] Provide a full script for every route: introduction, instruction, demonstration, partial progress, retry, success, exit, resume, and ending.
- [x] Include specific responses to too many, too few, removing an item, and completing a quantity.
- [x] Supply at least three contextual success lines and three support lines per core activity, selected without immediate repetition where appropriate. (Word success is word-specific; packing/sharing have six success variants; support has graduated help plus three-variant retries; no back-to-back repeats.)
- [x] Deliver an ending that reflects completed story actions, including supported completion.
- [x] Verify at least three sessions with different content selections; count only distinct authored/reviewed teaching examples toward coverage.

Evidence: `src/picnic-content.js`, `src/picnic-state.js`, `src/picnic-view.js`, and `tests/picnic.test.mjs`. Three distinct routes are exercised by state/backup tests; browser checks separately cover the starter and sharing routes. All teaching content remains draft for human review. Script coverage and no-repeat dialogue selection remain open for the complete benchmark.

These are production floors, not claims of educational sufficiency. A smaller evidenced prototype may be used during development, but it does not complete the benchmark.

## 5. Milestone tracker

Statuses: **Ready**, **In progress**, **Blocked**, **Complete**. Only mark Complete when the checklist, acceptance criteria, and linked evidence agree. Record a concrete dependency for Blocked; continue independent work.

| ID | Milestone | Status | Depends on | Completion evidence |
|---|---|---|---|---|
| Q0 | Review and revised roadmap | Complete | User direction | Review in this conversation; this document; preserved baseline |
| Q1 | Creative direction and picnic specification | Complete | Q0 | Linked guides, exact recording sheet, asset register, character/scene samples; 2026-10-20 validation entry |
| Q2 | Character audio and sound production | In progress | Q1 script/cast | Direction 2 accepted; 68/68 lines produced, transcript-checked and bundled with offline/replay browser checks; per-line listening, effects/ambience and phonics audio pending |
| Q3 | Complete playable picnic | In progress | Q1; Q2 required for final acceptance | Word/pack/share/paper/ending route implemented; sound clues and final recordings pending |
| Q4 | Benchmark validation and refinement | In progress | Q2, Q3 | 25 automated tests; browser routes, demonstration persistence, keyboard, narrow-layout and target-size checks; full acceptance remains open |
| Q5 | Connected world and destination upgrades | Ready | Q4 technical/creative acceptance | Pending |
| Q6 | Full coverage, reliability, and release acceptance | Ready | Q5; original outstanding scope | Pending |

Q2 production and Q3 implementation may overlap once their contracts are defined. Temporary art/audio must be visibly tracked as provisional. Passing a technical checkpoint permits useful downstream work; human review items stay open until actual evidence exists.

### Q1 — Creative direction and picnic specification

- [x] Create `docs/CREATIVE_DIRECTION.md`: palette, lighting, illustration style, typography, composition, object scale, motion, sound character, and accessibility constraints.
- [x] Define character silhouettes, proportions, personalities, relationships, and expression/pose sheets.
- [x] Create `docs/PICNIC_STORYBOARD.md`: every scene and interaction, including first use, mistakes, help, leaving, resume, and completion.
- [x] Create `docs/AUDIO_SCRIPT.md` with stable line IDs, speaker, exact text, delivery direction, trigger, timing, and pronunciation notes.
- [x] Define the teaching prerequisites and alternatives for every picnic task in the learning blueprint.
- [x] Produce visual samples for home/world navigation, the picnic, and a help state at laptop sizes.
- [x] Inventory assets and scripts with ownership/licensing, production status, and review status.
- [x] Record reversible creative decisions and unresolved external dependencies.

**Acceptance:** The storyboard explains what the child sees, hears, does, and changes at every step. Teaching actions and support paths are explicit. The samples demonstrate a coherent visual direction that can be built and verified.

### Q2 — Character audio and sound production

- [x] Prepare a common audition script covering welcome, instruction, humour, support, success, and a quiet ending.
- [x] Generate two candidate voices per character and provide a technically verified listening sheet with preserved originals.
- [ ] Compare available human-performed and directed generated samples; record intelligibility, warmth, pacing, consistency, pronunciation, licensing, and production cost/access.
- [x] Select the production route and voice per character: user chose ElevenLabs Tamsin/Pip and Mike/Bear from the audition sheet.
- [x] Produce first takes for every current runtime ID, preserve originals and verify coverage, decoding, durations and levels.
- [x] Produce and listen-review every required picnic line, including pronunciation and natural sentence flow. (Parent listening 2026-10-20; two cough retakes. Not professional phonics review.)
- [ ] Produce separately reviewed phoneme, word, and blending assets needed by the supported learning routes.
- [ ] Record reviewer, review scope, date, pronunciation convention, and revisions for teaching audio.
- [x] Create a versioned production audio manifest linking line IDs, transcripts, speakers, files, duration, review status, and provenance; runtime integration remains pending review.
- [ ] Add restrained object sounds, short character reactions, and optional ambience/music that lowers beneath speech. (Object sounds and ducked ambience implemented and measured; short character reactions and parent listening of the mix remain.)
- [ ] Implement speech priority, replay/cancellation, separate voice/music/effects controls, and user-initiated audio start. (Engine, ducking and effects/ambience toggles implemented; awaiting produced sounds and a mixed-scene listening check.)
- [ ] Bundle production clips; verify loading, caching, missing-file behaviour, and interruption when navigating away.
- [x] Keep browser speech as a clearly documented fallback; do not count fallback speech as finished character production.

The audio controller cancels/replays speech and guards against late callbacks. Runtime records remain draft until approved recordings are integrated. A separate versioned production manifest now covers all 68 runtime IDs, with files, durations, selected voice IDs, generation text, rights basis and explicit produced/unreviewed status. The user selected Tamsin/Pip and Mike/Bear from the four auditions. See `docs/VOICE_PRODUCTION.md` for evidence and the settings-metadata limitation. Human per-line listening review remains open; browser fallback is still used by the live app.

**Acceptance:** All benchmark routes have reviewed recordings; no overlapping dialogue, clipped phrases, or blocking audio queues. The voices have distinct character and remain clear at normal laptop volume. Phonics correctness and performance quality have separate evidence. Mute and audio failure have usable visual demonstrations and clearly explained parent support where listening is essential.

**Dependency handling:** If a paid service, credentials, performer, or reviewer is needed, prepare the script and sample specification first and ask only for the concrete missing input. Continue visual and engineering work. Do not clone a real person's voice without permission or put credentials in the repository.

### Q3 — Complete playable picnic

- [x] Separate scene flow, rendering, audio, content, and learning evidence as needed; retain the static browser-module foundation unless a documented requirement justifies changing it.
- [x] Implement introduction → demonstration → attempt → support → consequence → completion → exit/resume.
- [x] Build reusable character states: idle, speaking, attentive, thinking, encouraging, and celebrating.
- [x] Replace benchmark emoji and placeholder surfaces with consistent authored assets.
- [x] Animate objects in direct response to the child's action; make quantities readable throughout.
- [x] Implement graduated help: a cue, one demonstrated step, then supported completion when needed.
- [ ] Preserve correct partial spelling work; target the next needed sound without revealing an answer prematurely.
- [x] Implement counting, over/under-target feedback, and optional equal sharing using actual manipulable objects.
- [x] Add animated paper demonstrations with start point, direction, pause/replay, previous/next, and finished-view state.
- [x] Connect the route to current per-skill levels, parent limits, review scheduling, and evidence semantics.
- [x] Save narrative progress without duplicating learning evidence; restore at a documented safe checkpoint.
- [x] Add a short story-specific ending and persistent non-pressure decoration choice.
- [x] Preserve old activities, backups, gallery, parent controls, and accessible free-play entry.

First-use interaction demonstrations now precede word/packing/sharing tasks, are self-paced and replayable, and preserve answers and the current frame through backups. Older saves resume directly with examples available on request. These are static visual sequences with draft narration, not reviewed phonics teaching demonstrations or additional assessed content.

Remaining Q3: integrate the reviewed sound-clue branch; replace fallback voice; make spelling support use reviewed target sounds; improve gesture/transition polish. Correct letter positions survive editing/help, and all new-route evidence defaults to supported. Dedicated parent independence assessment for the picnic remains pending.

**Acceptance:** A complete route has finished assets/audio, meaningful changes to the scene, useful mistakes/help, and a coherent ending. Refresh, early exit, repeated clicks, and help cannot corrupt progress or produce false independence. All mandatory actions work by keyboard and click.

### Q4 — Benchmark validation and refinement

- [x] Run relevant automated behaviour/content checks, JavaScript checks, and production build.
- [ ] Walk every branch, including small/large quantities, wrong answers, repeated input, full support, replay, pause, exit, and resume.
- [ ] Verify pictures, quantities, spoken nouns, displayed symbols, and answer logic agree.
- [ ] Inspect key visual states at 1280 × 720 and 1366 × 768, narrow layouts, and 200% zoom.
- [ ] Verify visible focus, target sizes of at least 48 × 48 CSS pixels where practical, contrast, non-colour cues, mute, and reduced motion.
- [ ] Audition the complete mixed scene on laptop speakers; verify pauses, volume consistency, and reduced ambience beneath instructions.
- [ ] Measure startup, input feedback, asset transfer size, and scene transitions on a recorded device/network; set and meet explicit budgets before final acceptance.
- [x] Inspect a production build and the actual published release; record commit, release ID, and evidence.
- [ ] Obtain parent feedback on voice warmth, character appeal, clarity, and perceived quality.
- [ ] Where feasible, observe voluntary child use: understanding the goal, navigation, response to mistakes, use of help, and interest in returning.
- [ ] Keep private observations outside Git; record only anonymised product issues and resulting fixes.
- [ ] Fix identified issues and repeat the affected checks; publish a benchmark acceptance note with remaining limitations.

**Acceptance:** Technical checks pass with no known critical gameplay, teaching, accessibility, or data-loss issues. Parent feedback on the upgraded experience is recorded. Child usability is reported honestly as observed or unverified. No claim of “world class” follows from automated tests alone.

**Observation targets:** The child can begin through visual/spoken cues, manipulate objects, request help, and return home; recovery feels calm; actions have understandable consequences. These are qualitative design targets, not developmental assessment thresholds.

### Q5 — Connected world and destination upgrades

- [ ] Build a connected illustrated home world with recognisable landmarks and accessible destination controls.
- [ ] Add small optional discoveries and remembered creations; settle decorative motion during tasks.
- [ ] Apply the benchmark's character, art, audio, help, and feedback systems across all six destinations.
- [ ] Connect short authored adventures through beginning, purpose, consequence, and ending.
- [ ] Add deliberate variation without weakening phonics prerequisites or independent skill progression.
- [ ] Keep all existing modes reachable during staged rollout; flag retirement candidates rather than silently removing them.
- [ ] Validate each destination with the Q4 technical checklist and record its content/audio review status.

| Destination | Planned experience | Done when |
|---|---|---|
| Sound Safari | Find hidden friends through sound clues | First/middle/ending sound tasks and blending use reviewed examples and accurate audio |
| Word Workshop | Build objects and repair word machines | Building, reading, word switching, sound train, and labels respect taught patterns |
| Number Kitchen | Prepare and share visible meals | Counting, comparison, operations, composition, and sharing have concrete consequences and useful support |
| Shape Builders | Construct creatures, vehicles, and structures | Shape, position, pattern, comparison, and measurement tasks use meaningful manipulation |
| Story Theatre | Arrange and perform puppet stories | Sequencing, open storytelling, and reviewed decodable books have coherent illustrations/audio |
| Art Treehouse | Make objects for adventures on paper | Drawing, pencil patterns, handwriting, labels, and open prompts are paced and clearly demonstrated |

**Acceptance:** Every destination reaches the agreed benchmark with recognisable character and distinct play. The completed picnic retains its quality. A common screen template or new illustration alone does not count as upgrading a game.

### Q6 — Full coverage, reliability, and release acceptance

- [ ] Reconcile every unfinished item in the original roadmap against this plan and actual implementation; record evidence or explicit remaining work.
- [ ] Complete the authored content inventory and review prerequisites, distractors, diagrams, answers, scripts, and audio.
- [ ] Align phonics and letter forms with school information when available; keep unconfirmed defaults labelled.
- [ ] Distinguish oral blending, decoding, spelling, copying, tracing, and independent writing in evidence and parent views.
- [ ] Add missing adaptive supports, parent practice/skip controls, and practical off-screen suggestions.
- [ ] Verify content/save versions, migrations, valid backup round trips, malformed imports, quota failures, and cleared-storage guidance.
- [ ] Test at least two relevant browsers, recording versions, devices, and limitations.
- [ ] Test genuine disconnected use of promised core assets/audio and upgrades between releases; retain a stable old release until a replacement is complete.
- [ ] Verify privacy, asset provenance, payload/performance budgets, error recovery, and production behaviour.
- [ ] Update parent instructions, known limitations, release version, and maintenance guidance.
- [ ] Record final parent acceptance and accurately report child/educator review status.

**Acceptance:** The complete agreed scope, content floors, technical checks, and review requirements have evidence. School/educator/audio review and child observation cannot be inferred from code, generated assets, or game counts. No full-release completion claim while material requirements remain unchecked.

## 6. Retained content coverage commitments

The first benchmark adds quality; it does not replace the complete-release content scope.

| Content family | Retained complete-release floor | Review status |
|---|---|---|
| Literacy | At least 6 game types and 80 examples across the agreed taught sequence | Inventory/review outstanding |
| Maths | At least 5 game types and 60 prompts across number and operations | Modes exist; authored inventory/review outstanding |
| Paper art | At least 15 lessons plus 10 open-ended prompts | 15 lessons implemented; expanded prompts/review outstanding |
| Handwriting | Agreed letter forms, 6 pencil patterns, labels and supported writing | Generic models exist; school alignment/review outstanding |
| Shapes, patterns, measure | At least 24 reviewed prompts | Inventory/review outstanding |
| Storytelling and reading | At least 8 picture sequences and 6 reviewed decodable stories | Existing stories/books do not establish reviewed coverage |
| Physical-world missions | At least 12 across learning areas | 12 implemented; review outstanding |

Each record needs a stable ID, strand/skill, prerequisites, support options, expected response, feedback, visual/audio references, content version, and review status. Randomised quantities and artwork variants do not establish a reviewed inventory.

Original-to-current mapping: learning blueprint → Q1/Q6; design → Q1/Q4/Q5; foundation → Q2/Q3/Q6; play loop → Q3/Q4; paper studio → Q3/Q5/Q6; progression/parent controls → Q3/Q6; breadth → Q5/Q6; personalisation/gallery/polish → Q3/Q5/Q6; deployment/verification → Q4/Q6. The baseline checklist remains the item-level reconciliation reference.

## 7. Decisions and external dependencies

| Topic | Current decision | Remaining input/evidence |
|---|---|---|
| Build order | One complete picnic benchmark, then destination rollout | Accepted direction on 2026-10-19 |
| Runtime | Retain native browser modules and static GitHub Pages hosting | Revisit only for a demonstrated need |
| Data | Preserve local progress, backups, and optional local gallery | Migration and recovery verification |
| Art | Coherent picture-book world with custom characters/objects | Q1 visual samples and asset production |
| Cast | Pip and Bear first; workshop robot later | Final character/voice production choices |
| Voice | ElevenLabs v4; Tamsin/Pip and Mike/Bear selected by user; direction v2 (~70% presenter energy) accepted 2026-10-20; API production route | Key in gitignored `.env`; full v2 production, transcript checks, per-line listening and publication pending |
| Teaching audio | Separately reviewed phonemes and blending | Qualified human review and school conventions where available |
| Language | English working default | School pronunciation/phonics confirmation |
| Curriculum | User confirmed 2026-10-20: school follows Pearson Edexcel (iPrimary, based on the English National Curriculum 2014). Working phonics assumption: Pearson's mapped Bug Club Phonics sequence; current starter set s a t p i n m is consistent with it | Ask school which phonics programme/letter-sound order and letter formation they actually teach; keep Bug Club assumption labelled unconfirmed |
| Handwriting | Existing generic manuscript models remain provisional | School forms and formation order |
| Timing | Approximately five on-screen minutes; paper time flexible | Actual session observation |
| Privacy | No new runtime external service or collection | Any later change requires an explicit product decision |

Future scope remains outside this release: speech recognition, automatic paper grading, child-facing generative chat/lessons, required accounts/cloud sync, multiple profiles, and additional languages.

## 8. Progress and evidence protocol

At the start of work, read AGENTS.md, this current-milestone summary, the latest delivery entry, and Git status. Inspect remote state before integration. Preserve others' work and never force-push or publish secrets/private child data.

For each meaningful milestone:

1. Set the active milestone to In progress and identify the next concrete deliverable.
2. Update task checkboxes only for implemented and verified work; partial work stays unchecked.
3. Record significant decisions, dependencies, fallback tools, and limitations.
4. Link implementation commits, artefacts, and validation evidence in the delivery log.
5. Update the content/audio inventory and review statuses when assets change.
6. Run checks appropriate to the change; repeat only for new changes or unresolved concerns.
7. Commit/push coherent validated milestones under the standing authorisation.
8. Update this top summary and the tracker so the next agent can continue immediately.

Every production validation entry should identify date, commit/build, environment, scenario, expected result, actual result, evidence location, and limitation. Distinguish automated checks, visual inspection, listening review, parent feedback, educator review, and child observation.

Routine checkpoints are not approval stops. When an external dependency blocks one requirement, continue independent work and leave that requirement visibly open. Never fabricate human review or mark a phase complete simply because code builds.

## 9. Delivery log

| Date | Milestone / change | Evidence | Limitations / next step |
|---|---|---|---|
| 2026-10-19 | Existing development release baseline retained | App commit `5cc81b7`, release `a7046afcce12`; [validation record](docs/VALIDATION.md) | Historical evidence; creative upgrade not implemented |
| 2026-10-19 | Q0: user accepted creative direction; roadmap reorganised around the picnic benchmark | Review conversation; this document; [preserved original checklist](docs/ROADMAP_BASELINE_2026-10-19.md); exact baseline preservation, local links, Q0–Q6 tracker, and diff whitespace checks verified | Documentation only; app tests not rerun; no new art, recordings, gameplay, or human review claimed |
| 2026-10-20 | Q1 specification and first Q3 implementation: illustrated home, Pip/Bear poses, word/packing/sharing route, paper lessons, ending, partial-state backups, draft audio controller | Guides and asset register; `tests/picnic.test.mjs`; 23 automated tests, syntax/build checks; browser walkthrough and home screenshot; see validation entry | Sound clues, final character recordings, listening/educator/parent/child review, complete accessibility/performance/offline checks remain open |
| 2026-10-20 | Follow-up replay correction: replay the task after count/support feedback; fresh map selection checked in a third browser session | Browser assertion of the restored five-apple instruction; 23 tests and syntax/build checks pass | Production verification recorded below once the final deployment is checked |
| 2026-10-20 | Published and smoke-tested the picnic development release | Code `75302b8`; release `0e4c6ca79eb9`; successful Actions run `39371407554`; matching public module/art version, home/welcome/word rendering, no console warnings/errors | Final voice/audio, full quality audit, and human acceptance remain open |
| 2026-10-20 | Added and published self-paced first-use examples, saved demonstration frames, answer-preserving replay, clearer equal-plate feedback, and larger controls | Code `cde5df1`; public release `bbe506dbf6b3`; Actions `39374550445`; 25 tests, syntax/build checks; muted browser walkthrough, keyboard progression, 1366/1280/390 CSS-width inspection and public smoke test; [validation record](docs/VALIDATION.md) | Draft script now 68 lines; voice connection, reviewed sound guidance, complete quality audit, and human review remain open |

### Voice audition milestone — 2026-10-20

Produced two Pip and two Bear candidates with ElevenLabs v4 and added a local listening sheet. Four generation requests used 1,600 included credits; Generation 1 was downloaded for each voice. FFmpeg decode/level checks and Chrome loading, exclusive playback and keyboard pause were verified. See the [production record](docs/VOICE_AUDITIONS.md). Human listening/casting remains pending; export settings need resolution before full production. The 68 runtime lines are still unproduced and the live app is unchanged.

### Selected cast and first production set — 2026-10-20

The user chose **Pip A + Bear A**. Produced 67 takes covering all 68 script IDs (one identical prompt reused), preserving originals and preparing levelled review copies. This batch used 3,833 included credits and contains 243.6 seconds of audio. Exact catalogue coverage, source/output decoding, duration and peak checks passed. A searchable local review sheet supports hash-specific listening decisions, local notes and explicit export; Chrome playback, keyboard pause, filtering, persistence and export were checked. These are first takes, not approved audio. Per-line listening/teaching review and runtime integration remain open; [production details](docs/VOICE_PRODUCTION.md) record the UI settings, filename discrepancy, licensing basis and limits.

### Performance direction revision — 2026-10-20

The user reported whispery delivery in several first takes and requested children's-presenter energy at roughly 70% intensity. Updated the creative/audio direction toward fully voiced, animated performances, varying energy by scene. Produced eight same-word comparisons with the chosen cast, including lively invitations/discovery, clear instruction/help and a relaxed fully voiced ending. Ten requests used 784 included credits; two punctuation-encoding input errors were caught and corrected before handoff. Final samples total 29.9 seconds; eight transcript-word/decoding checks and 16-player browser loading/playback checks passed. The first set is preserved. Full-catalogue retakes wait on listening evidence that the revised direction meets the user's intent.

### Dialogue variety and play-session guide — 2026-10-21

Added 16 recorded feedback variants (script version 3, 84 lines): three lines each for word retry, too few/too many apples, unequal plates and matching-plates-with-apples-left, and six success lines each for packing and sharing. `chooseLineVariant` picks randomly without back-to-back repeats; previously packing/sharing success depended only on the basket size. All 84 transcripts match on both ElevenLabs Scribe and local Whisper after one retake (pack-many-2 said "takes them out"); the cough scan found none. 35 tests; Chrome check of three consecutive too-few checks played three variants with no repeat; 12 voice/offline checks pass. User proceeded after the sound-check page (taken as acceptance; any sound can be redone). Added the [parent play-session guide](docs/PLAY_SESSION_GUIDE.md); observation itself is the parent's next step. Published as `4c5a4d3`, release `5982fba9ccd7`, via manually dispatched Actions run `39621226470` (GitHub created no run for the push; deploy checks must match the run's commit SHA). New clips confirmed served live.

### Picnic sound effects and night ambience — 2026-10-20

Twelve sounds generated with ElevenLabs sound generation (322 credits) from [the sound direction](docs/PICNIC_SOUND_DIRECTION.json): tile place/lift, apple into basket/out/onto plate, word reveal, success chime, decoration sparkle, paper turn, scene whoosh, lantern ending, and a 20.5 s night loop. `prepare-picnic-sounds.py` trims relative to each sound's peak, levels effects to -9 dBFS peaks at 96 kbps (64 kbps filtered the shimmer), and crossfades/levels the ambience loop at fixed gain (-26 LUFS file). Whisper found no speech in any sound; loop-point level and step continuity checked. `render-sound-mix-preview.py` renders a gameplay mix at the app's exact gains: speech -18 dB, apple/count -19, chime/whoosh about -24, ambience alone about -35 and ducked about 10 dB further. Ambience was raised 10 dB after measuring it 26.6 dB under speech. Chrome production-build checks: ambience starts and ducks/returns with speech, whoosh and tile effects fire, both toggles off are silent, 12 sounds precached, no console errors; 34 tests and the 12 voice/offline checks pass. Parent listening of the mix ([sound check page](output/sound-effects/index.html)) pending.

### Character animation and sound engine — 2026-10-20

Pip and Bear now lip-sync to their recordings: `prepare-revised-voices.py` stores a 25 fps loudness envelope per clip, and the audio controller drives a `--mouth` value on the speaking character each frame (generic chatter only for the speech fallback). Characters blink and breathe; completion adds a short hop. All motion respects the Playful motion setting and `prefers-reduced-motion` (mouth stays closed). Added a Web Audio sound engine (`src/picnic-sound.js`): action-matched effects (mistakes stay silent), a looped night ambience that ducks under speech, separate parent toggles for effects and night sounds (backward-compatible save fields), and silent fallback when files or Web Audio are missing. Sound direction, generation and preparation scripts are ready (`docs/PICNIC_SOUND_DIRECTION.json`, `scripts/generate-picnic-sounds.mjs`, `scripts/prepare-picnic-sounds.py`); generation is waiting on the Sound Effects permission for the API key. Evidence: 34 tests; Chrome checks of six distinct mouth openings during Bear's welcome, Pip closed, reset at line end, closed under reduced motion, close-up screenshot, and the 12 voice/offline regression checks.

### Direction 2 voices produced and integrated — 2026-10-20

All 68 lines produced (59 new + 8 accepted samples + 1 shared take; 8 retakes after local Whisper checks) and bundled as 64 kbps clips (1,870 KiB). 68/68 transcripts match; 26 tests, syntax and build pass; Chrome production-build checks cover decoding, recorded welcome without speech fallback, replay interruption, leaving, 68/68 offline playback and offline resume, with no console errors. Details and limits in [VOICE_PRODUCTION.md](docs/VOICE_PRODUCTION.md). Published as code `f14d853`, release `89fefd41a061`, Actions `39440450623`; live Chrome check confirmed the recorded welcome. User listened to all 68: excellent apart from coughs on count-0 and paper-handle, now retaken (avoid "clear" in delivery tags). Parent listening review complete; professional/phonics audio review not claimed.

### Revised direction accepted; API production pipeline — 2026-10-20

The user listened to the comparison and asked for the revised voices to be implemented, chose API production, and is supplying an ElevenLabs key in the gitignored `.env`. Added [direction v2 for all 68 lines](docs/PICNIC_VOICE_DIRECTION_V2.json) (8 accepted samples reused verbatim), `scripts/generate-picnic-voices.mjs` (word-sequence guard before spending credits, resumable, per-take request IDs, ElevenLabs Scribe transcript check of every take) and `scripts/prepare-revised-voices.py` (levelling, 64 kbps runtime clips in `assets/picnic/voice/`, generated `src/picnic-voice.js`, listening sheet in `output/voice-revised/`). The runtime now plays `produced-auto-checked` clips; takes with transcript mismatches are held back. Dry run: 68/68 prompts match runtime words; 59 to generate (~4,292 characters). 26 tests, syntax and build pass. Fixed missing `<option>` tags in the first-batch review sheet filters. No new takes yet; the app is unchanged until the clip module is populated. Automatic word checks do not establish tone or per-line listening approval.

## 10. Immediate build queue

1. Parent holds one observed play session using [the guide](docs/PLAY_SESSION_GUIDE.md) (private notes outside Git); fix what it reveals.
2. Produce/review phonics assets and integrate the sound-clue scene without duplicating workshop rewards.
3. Add reviewed sound-based spelling support and remaining sound/motion polish; self-paced first-use interaction demonstrations are implemented.
4. Complete Q4 browser, accessibility, performance, real-offline, and parent review checks; keep unperformed review clearly open.
5. Extend the accepted benchmark across the world only after the Q4 technical/creative checkpoint.

**Completion rule:** Finish only when the agreed full scope and quality requirements have supporting evidence. A roadmap, attractive screenshot, successful deployment, or polished single adventure does not complete the planned app.

# Play Together — Creative Quality and Build Roadmap

Last updated: 2026-10-20 (Africa/Nairobi)

**Current milestone:** Q2/Q3 — Character audio production and completion of the picnic benchmark; Q4 technical checks are in progress.
**Latest completed work:** Q1 creative specification, character sheet, visual samples, and a playable development picnic with automated and browser evidence.
**Next deliverable:** Voice audition clips from the prepared script, reviewed sound-clue assets, and remaining benchmark quality checks.
**Product status:** The new illustrated home and picnic are implemented. Character dialogue still uses the documented browser fallback; final audio, sound clues, human review, and full benchmark acceptance remain incomplete.
**Latest published code:** `75302b8`, release `0e4c6ca79eb9`; successful Actions run `39371407554`; live home/welcome/word screen verified on 2026-10-20.
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
- [Exact recording sheet](docs/PICNIC_RECORDING_SCRIPT.csv): 58 draft runtime lines with production/review fields.
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
- [ ] Supply at least three contextual success lines and three support lines per core activity, selected without immediate repetition where appropriate.
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
| Q2 | Character audio and sound production | In progress | Q1 script/cast | Audition brief and 58 draft lines ready; production connection and listening review pending |
| Q3 | Complete playable picnic | In progress | Q1; Q2 required for final acceptance | Word/pack/share/paper/ending route implemented; sound clues and final recordings pending |
| Q4 | Benchmark validation and refinement | In progress | Q2, Q3 | Automated tests and two browser routes; full acceptance remains open |
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
- [ ] Compare available human-performed and directed generated samples; record intelligibility, warmth, pacing, consistency, pronunciation, licensing, and production cost/access.
- [ ] Select the production route and voice per character based on listening evidence; document any unavailable candidate without inventing a comparison.
- [ ] Produce and listen-review every required picnic line, including pronunciation and natural sentence flow.
- [ ] Produce separately reviewed phoneme, word, and blending assets needed by the supported learning routes.
- [ ] Record reviewer, review scope, date, pronunciation convention, and revisions for teaching audio.
- [ ] Create a versioned audio manifest linking line IDs, transcripts, speakers, files, duration, review status, and provenance.
- [ ] Add restrained object sounds, short character reactions, and optional ambience/music that lowers beneath speech.
- [ ] Implement speech priority, replay/cancellation, separate voice/music/effects controls, and user-initiated audio start.
- [ ] Bundle production clips; verify loading, caching, missing-file behaviour, and interruption when navigating away.
- [x] Keep browser speech as a clearly documented fallback; do not count fallback speech as finished character production.

The audio controller cancels/replays speech and guards against late callbacks. Runtime line records and the exported recording sheet have stable IDs and review fields, but file/duration/performer/rights/reviewer fields remain empty: this is not a completed production audio manifest. Runway was discovered and suggested as an available voiceover option; connection and generated/human audition samples are unconfirmed. Continue independent work without representing fallback speech as the requested upgrade.

**Acceptance:** All benchmark routes have reviewed recordings; no overlapping dialogue, clipped phrases, or blocking audio queues. The voices have distinct character and remain clear at normal laptop volume. Phonics correctness and performance quality have separate evidence. Mute and audio failure have usable visual demonstrations and clearly explained parent support where listening is essential.

**Dependency handling:** If a paid service, credentials, performer, or reviewer is needed, prepare the script and sample specification first and ask only for the concrete missing input. Continue visual and engineering work. Do not clone a real person's voice without permission or put credentials in the repository.

### Q3 — Complete playable picnic

- [x] Separate scene flow, rendering, audio, content, and learning evidence as needed; retain the static browser-module foundation unless a documented requirement justifies changing it.
- [ ] Implement introduction → demonstration → attempt → support → consequence → completion → exit/resume.
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

Remaining Q3: integrate the reviewed sound-clue branch; provide a first-use demonstration before attempts; replace fallback voice; make spelling support use reviewed target sounds; improve gesture/transition polish. Correct letter positions already survive editing/help, and all new-route evidence defaults to supported. Dedicated parent independence assessment for the picnic remains pending.

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
| Voice | Directed bundled recordings; audition accessible human/generated options | Access, licensing, listening reviews; no provider selected |
| Teaching audio | Separately reviewed phonemes and blending | Qualified human review and school conventions where available |
| Language | English working default | School pronunciation/phonics confirmation |
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

## 10. Immediate build queue

1. Produce audition clips from `docs/AUDIO_SCRIPT.md` once a production route is accessible; obtain actual listening evidence.
2. Produce/review phonics assets and integrate the sound-clue scene without duplicating workshop rewards.
3. Add first-use demonstrations, reviewed sound-based spelling support, and remaining sound/motion polish.
4. Complete Q4 browser, accessibility, performance, real-offline, and parent review checks; keep unperformed review clearly open.
5. Extend the accepted benchmark across the world only after the Q4 technical/creative checkpoint.

**Completion rule:** Finish only when the agreed full scope and quality requirements have supporting evidence. A roadmap, attractive screenshot, successful deployment, or polished single adventure does not complete the planned app.

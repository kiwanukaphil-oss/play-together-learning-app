# Little Learning Adventures — Product and Build Roadmap

Last updated: 2026-10-19 (Africa/Nairobi)

**Current phase:** First playable milestone implemented and browser-tested; continuing content breadth, resilience, and deployment.
**Working authority:** Proceed autonomously through all phases. Commits and pushes to the specified GitHub repository are authorised. See AGENTS.md.
**Product status:** A new colourful static app is implemented with six destinations, sixteen game modes, fifteen paper-drawing lessons, 26 generic lowercase letter models, six short reading books, local progress, parent controls, and backup/restore. Earlier previews are retained references. Full roadmap scope and educational review remain unfinished.

## 1. Product vision

Build a polished, joyful learning playground for a child approaching six who knows the alphabet, can count, and can copy writing, but needs support connecting sounds to written words. The primary device is a laptop with a mouse and keyboard. The child should navigate much of the experience without reading or having a parent translate the interface.

The parent remains a learning partner. The app should support gradually greater independence without treating game completion as proof of understanding.

The world should feel alive through expressive characters, bright harmonious colours, purposeful animation, clear sound, and playful cause and effect. Learning should produce a meaningful result: feed a character, complete a journey, build an object, or create a picture.

### Non-negotiable product principles

- Child-facing screens use pictures, short spoken prompts, demonstrations, and minimal words.
- A colourful illustrated playground is the main navigation, not a dashboard or grid of instructional cards.
- Keep curriculum explanations, settings, progress reports, and observations in a separate parent area.
- Use large, forgiving controls; all required actions work with clicks and ordinary keyboard controls. Dragging is optional.
- One clear immediate action per activity step; consistent Home, Replay instruction, Show me, and Undo controls.
- Keep essential instructions separate from optional background music. Avoid overlapping speech.
- Offer warm, specific feedback, gentle retries, and help. No countdown pressure, lost lives, streak penalties, adverts, or purchases in the child flow.
- Free drawing, exploration, and breaks remain available without earning access.
- Prioritise paper drawing and handwriting supported by on-screen examples.
- Progress each learning area independently, using repeated evidence and parent observations.
- Do not claim to diagnose learning difficulties or guarantee educational outcomes.

## 2. Delivery rules and roadmap maintenance

This file is the source of truth for scope, delivery status, approval gates, and remaining work.

- `[ ]` means incomplete, including partially implemented work. `[x]` means completed and verified.
- Check off an item only after its stated acceptance criteria are met. Link implementation, validation evidence, or a review note where appropriate.
- Update this file after each meaningful delivery: completion checkboxes, current phase, decisions, validation results, known issues, and next steps.
- Record scope changes explicitly; do not silently drop requirements or mark unfinished features complete.
- Proceed through phase checkpoints autonomously. The user superseded routine phase approvals on 2026-10-19; ask only for genuine blockers.
- Commit and push coherent verified milestones to the authorised GitHub repository without asking again.
- Resolve reversible uncertainty with reasonable defaults and document decisions; ask only when input unlocks a blocker.
- Flag candidates for removal with a comment and preserve them until removal is approved.
- Use intent-based function names and explanatory comments on functions longer than ten lines.
- Prefer tools that preserve fidelity and allow verification. If unavailable, use a capable safe fallback, record it briefly, and validate the result.

### Definition of done for every phase

- [ ] Required deliverables and acceptance criteria are satisfied.
- [ ] Relevant functionality, visual states, accessibility, and error paths are verified.
- [ ] New content and teaching examples are reviewed for correctness.
- [ ] Material limitations and deferred items are recorded.
- [ ] Roadmap checkboxes and delivery log reflect actual evidence.
- [ ] Phase evidence is recorded and the next phase is ready; routine user approval is not required.

## 3. Existing work and confirmed direction

- [x] Establish laptop as the primary device.
- [x] Establish core needs: sounds, reading, spelling, maths, writing, drawing, and colouring.
- [x] Agree that paper drawing should follow clear on-screen picture steps.
- [x] Agree on a broad learning journey with separate progression by area.
- [x] Establish the revised child-centred playground direction and reject the text-heavy green-and-cream approach.
- [x] Explore initial session screens and learning-map interactions in local previews.
- [x] Inspect the workspace: only the two exploratory HTML previews existed before this roadmap.
- [x] Approve autonomous execution of this build roadmap (user instruction, 2026-10-19).

Existing references:

- `output/learning-adventure-design.html` — early activity exploration; grid colouring is a candidate for retirement, not the planned art experience.
- `output/learning-journey-design.html` — learning-path and paper-drawing exploration; useful interaction reference, not approved visual design for the child app.

Preserve both files as references until removal is explicitly approved. Their existence does not satisfy implementation milestones below.

## 4. Product scope and priorities

### First usable release

A cohesive playground with a companion, spoken guidance, three substantial learning games, a paper-drawing studio, a simple daily adventure, local progress with backup, and a parent area. It must have enough varied, reviewed content for repeated use, not just one demonstration per game.

### Complete planned release

All six destinations, coverage across the eight learning areas, a structured content library, independent progression per skill, physical-world missions, optional personalisation and gallery, robust recovery, and documented release verification.

### Later possibilities, outside the initial completion target

- Speech recognition for pronunciation or oral responses.
- Automatic handwriting or drawing grading.
- Generative lessons or child-facing AI chat.
- Cloud accounts, cross-device sync, and multiple household profiles unless chosen explicitly.
- Additional languages and complete school-specific curriculum variants.

The initial app must work without these capabilities. No child voice recording or external AI service is required for the core experience.

## 5. Playground destinations

| Destination | Core learning | Representative games | Priority |
|---|---|---|---|
| Sound Safari | Listening, sound awareness, sound–letter connections | Sound hunt, robot blending, mystery bag | First usable release |
| Word Workshop | Reading and spelling | Sound train, build a spoken word, change a letter, label an object | First usable release |
| Number Kitchen | Quantity, counting, early operations | Fill an order, share snacks, add or remove ingredients | First usable release |
| Art Treehouse | Paper drawing, pencil control, handwriting | Draw with me, finish a picture, pattern paths, label a drawing | First usable release |
| Shape Builders | Shapes, position, patterns, measurement | Shape robot, pattern parade, picture detective, build and compare | Complete release |
| Story Theatre | Oral language, sequencing, early reading | Story scramble, tell the next event, illustrated decodable stories | Complete release |

Avoid a cluttered world. Later destinations should be introduced gently, without making the child feel punished by locked content.

## 6. Decisions to resolve in Phase 1

Record choices in the decision log before dependent implementation. English is a working assumption, not a confirmed school language.

| Decision | Options / information needed | Recommendation or constraint | Status |
|---|---|---|---|
| Learning language and phonics | School language, pronunciation/accent, phonics programme | Align teaching sounds and sequence with school where possible | Open |
| Handwriting | School letter forms, lowercase conventions, formation order | Match school practice; introduce lowercase deliberately | Open |
| Storage | Device-only with backup, or account-based sync | Device-only with export/import suits one laptop; explain browser-data loss risk | Open |
| Implementation stack | Component framework vs simpler static implementation | Propose React + TypeScript for reusable games and typed content; verify current tooling before setup | Proposed, not adopted |
| Hosting and connectivity | Local use, hosted app, installable offline app | Hosted static app with offline core is a candidate; confirm deployment destination | Open |
| Audio production | Reviewed human recordings vs carefully reviewed generated audio | Reviewed recordings for phonemes; synthetic speech must not be assumed accurate | Open |
| Art direction | Companion, world style, child's interests | Present a coherent colourful direction and a meaningful alternative for review | Open |
| Release content budget | Minimum reviewed content in each skill family | Use the inventory below as a floor, not a substitute for instructional coverage | Proposed |

## 7. Phased build plan

### Phase 1 — Learning blueprint and build decisions

Goal: Define the teaching content, product boundaries, and technical direction before building the app.

- [ ] Resolve critical decisions in Section 6 with the parent.
- [ ] Define eight strands: listening, reading, spelling, handwriting, number understanding, operations, shapes/patterns/measure, and drawing/storytelling.
- [ ] Map each strand into explicit skills, prerequisites, activity types, help levels, and review opportunities.
- [ ] Define a phonics sequence; tag every word with its required sounds and spellings.
- [ ] Distinguish oral blending, decoding, spelling, copying, and independent writing in both content and tracking.
- [ ] Create a gentle starting-point experience; do not infer proficiency solely from age or alphabet knowledge.
- [ ] Define daily adventure rotation, free-play access, and parent overrides.
- [ ] Approve the content inventory and first-release boundaries.
- [ ] Document architecture, hosting/storage choice, and asset/audio production approach.

Acceptance: We can identify why each starter activity is appropriate, what skill it teaches, what comes next, and how the parent can change its starting level. No unresolved decision blocks Phase 2.

Autonomous quality checkpoint: Learning blueprint and technical direction.

### Phase 2 — Child-centred visual and interaction design

Goal: Establish a polished playground that a beginning reader can navigate.

- [x] Create an illustrated home world with a recognisable companion and destinations.
- [x] Define a bright, harmonious palette, typography, illustration style, motion rules, and sound personality.
- [x] Replace paragraphs and dashboard cards with visual actions, short labels, and spoken cues.
- [x] Establish consistent Home, Replay, Show me, Undo, and Pause/Break controls.
- [ ] Design first-use demonstrations, independent play, help, retry, success, and leaving an unfinished activity.
- [x] Design a clearly separate parent area, with an adult entry step that does not pretend to provide account security.
- [x] Produce interactive previews of home, one learning game, and the paper-drawing studio.
- [ ] Test visual comprehension with the parent and, if feasible, observe the child navigating without reading support.
- [ ] Verify laptop layouts, keyboard focus, touchpad use, reduced motion, and clear audio controls.

Acceptance: The child can identify a destination, enter an activity, request help, and return home using visual or spoken cues. Navigation does not depend on hover, reading, or precise dragging. The parent approves the visual direction.

Autonomous quality checkpoint: Playground design and interaction system.

### Phase 3 — Application foundation

Goal: Build a reliable foundation that supports consistent activities and future expansion.

- [ ] Set up the approved project structure, tooling, formatting, linting, type checks, and build process.
- [x] Build application navigation, child/parent shells, shared controls, and responsive layouts.
- [ ] Create an audio manager: user-initiated start, replay, voice prioritisation, mute, volume, cancellation, and graceful unavailable-audio behaviour.
- [ ] Implement an activity lifecycle: introduction, demonstration, attempt, support, completion, and exit/resume.
- [ ] Define typed content records and validate prerequisites, asset references, answers, and content versions.
- [ ] Implement the approved storage model with versioned saves, migrations, and recovery behaviour.
- [x] Add backup export/import with schema validation and clear handling of replacement or merge.
- [x] Establish asset licensing/provenance records and efficient image/audio loading.
- [x] Add meaningful automated checks for content validation, persistence, and shared interaction rules.

Acceptance: A sample activity runs through its complete lifecycle. Refresh restores valid progress, malformed imports do not overwrite good data, and audio does not overlap or continue after leaving the activity.

Autonomous quality checkpoint: Foundation demonstration and validation evidence.

### Phase 4 — First complete play loop

Goal: Deliver a small but usable learning app, not a collection of disconnected demos.

- [x] Build Sound Safari's oral sound/blending game with demonstration and graduated help.
- [x] Build Word Workshop's word-building game using only introduced sound–letter patterns.
- [x] Build Number Kitchen's counting/quantity game with varied arrangements and totals.
- [ ] Make gameplay produce a meaningful story result and warm, proportionate feedback.
- [ ] Add reviewed starter audio, illustrations, and multiple examples per game.
- [x] Build a daily adventure combining familiar practice, a manageable next step, and a paper activity.
- [x] Provide free choice, replay, pause, and graceful early exit.
- [x] Add concise parent observations: independent, supported, revisit, or not observed.
- [x] Verify gameplay cannot confuse repeated clicks, motor difficulty, or hints with independent understanding.

Acceptance: A parent and child can complete a useful session without developer intervention. Content varies between sessions, help is available, and progress survives refresh according to the selected storage model.

Autonomous quality checkpoint: First usable gameplay session.

### Phase 5 — Paper drawing and handwriting studio

Goal: Make the laptop an effective guide for meaningful work on paper.

- [x] Create cumulative, step-by-step picture lessons with large diagrams and short spoken instructions.
- [x] Include Previous, Next, Finished picture, and Return to my step controls.
- [x] Provide simple starting drawings such as a cat, fish, house, flower, vehicle, and imaginative creature.
- [x] Show only a manageable amount of new drawing information per step.
- [x] Add optional colour ideas, backgrounds, and imaginative extensions without judging likeness.
- [ ] Add pencil-control patterns, reviewed letter-formation demonstrations, and short labels matched to taught sounds.
- [ ] Distinguish copying from writing independently in parent observations.
- [ ] Include finish-the-picture and draw-from-spoken-instructions activities.
- [x] Support completion without photos; optional gallery work comes later.

Acceptance: The child can follow a complete lesson on paper, revisit steps, and view the finished example without losing their place. Diagrams are recognisable and readable at normal laptop size. Handwriting models match the agreed style.

Autonomous quality checkpoint: Paper studio and handwriting examples.

### Phase 6 — Adaptive progression and parent controls

Goal: Select appropriate practice without treating a game score as a diagnosis or full assessment.

- [ ] Track evidence by skill, with activity/content version, support level, outcome, and session context.
- [x] Define transparent progression rules using repeated observations across sessions and varied examples.
- [x] Keep supported completion distinct from independent success.
- [ ] Respond to difficulty with modelling, fewer choices, smaller quantities, or easier examples.
- [ ] Schedule revisits and prevent the same content dominating consecutive sessions.
- [x] Respect prerequisites and keep each learning strand independent.
- [ ] Allow the parent to adjust starting points, request more practice, skip an activity, or flag a mouse/attention issue.
- [ ] Show concise progress observations and practical off-screen suggestions in the parent area.
- [x] Verify skipped sessions and activities do not count as failure or erase progress.
- [x] Test progression, review scheduling, overrides, and imported progress with meaningful scenarios.

Acceptance: A single correct answer cannot advance an entire skill. Support changes the evidence appropriately. A child can advance in maths while remaining at an earlier literacy stage. The parent can understand and override recommendations.

Autonomous quality checkpoint: Progression rules and parent experience.

### Phase 7 — Broader playground and content library

Goal: Deliver the breadth required for continued learning across the complete planned release.

- [ ] Expand Sound Safari with first/middle/ending sound activities and robot blending.
- [ ] Expand Word Workshop with sound train, changing a letter, and picture labels.
- [ ] Expand Number Kitchen with fair shares, composition, adding, taking away, and picture stories.
- [ ] Build Shape Builders: shape construction, position, patterns, comparison, and concrete measurement missions.
- [ ] Build Story Theatre: picture sequencing, oral storytelling, and short decodable stories.
- [x] Add movement breaks and household-object missions with simple parent confirmation.
- [ ] Rotate activities across the week while preserving skill-specific practice.
- [ ] Complete and audit the approved minimum content inventory.
- [ ] Review every answer, diagram, phoneme recording, instruction, and spelling-pattern dependency.

Acceptance: Every planned strand has usable activities, reviewed examples, and clear progression/review opportunities. Later reading content never silently introduces untaught patterns. Content breadth is demonstrated through the inventory, not destination icons alone.

Autonomous quality checkpoint: Complete learning coverage and content review.

### Phase 8 — Personalisation, gallery, and finishing touches

Goal: Make the world feel personal without adding pressure or unnecessary complexity.

- [x] Add a companion name and a small set of appearance choices.
- [ ] Add gentle world decoration rewards based on participation, without blocking learning or art.
- [ ] Provide completed-adventure replay and a simple story collection.
- [x] Add an optional parent-managed drawing gallery with local image handling under the approved storage model.
- [x] Provide intentional image removal, storage-limit feedback, and clear backup inclusion/exclusion.
- [ ] Add purposeful animation, transitions, and sound effects with reduced-motion and mute equivalents.
- [ ] Polish loading, empty, offline, unavailable-audio, and recovery states.

Acceptance: Personalisation persists, rewards do not disrupt learning, and the app remains complete when images are never uploaded or sound/motion is reduced.

Autonomous quality checkpoint: Personalisation and final visual polish.

### Phase 9 — Release verification and deployment

Goal: Deliver a dependable, documented app suitable for regular family use.

- [ ] Run the quality checks in Section 10 on the final integrated app.
- [ ] Perform realistic sessions with varied skill levels, frequent help, early exits, refreshes, and mixed parent observations.
- [ ] Review with the parent and, where feasible, observe the child using the app; record confusing interactions and fix them.
- [ ] Verify backup restoration, upgrades, storage errors, and offline behaviour where promised.
- [x] Prepare parent instructions covering setup, session use, audio, backups, and recovery.
- [ ] Verify deployment configuration, asset loading, HTTPS where hosted, and production behaviour.
- [ ] Obtain approval for the concrete deployment destination and release build before publication unless already explicitly authorised.
- [ ] Publish through the approved hosting path and smoke-test the actual deployed app.
- [ ] Record remaining limitations, content coverage, release version, and maintenance instructions.

Acceptance: No known critical gameplay, data-loss, teaching-content, or accessibility defects remain. The parent can use the released app and recover progress without developer help. Deployment is verified, not merely reported as successful by a build command.

Autonomous quality checkpoint: Release acceptance and transition to maintenance.

## 8. Proposed minimum content inventory

These are planning floors to approve in Phase 1. Counts refer to reviewed content records or lessons, not automatically generated variations. Valid phonics coverage takes precedence over reaching a word count.

| Content | First usable release | Complete planned release |
|---|---|---|
| Literacy games | 2 distinct game types | At least 6 distinct game types |
| Literacy examples | At least 24 reviewed examples across the approved starter sounds | At least 80 across the approved taught sequence, including review |
| Maths games | Counting/quantity with at least 20 reviewed prompts | At least 5 types and 60 prompts spanning approved number and operation skills |
| Paper drawing | 6 complete step-by-step lessons | At least 15 lessons plus 10 open-ended picture prompts |
| Handwriting | Approved starter letter set and 6 pencil-pattern activities | All agreed letter forms, with labels and supported writing prompts |
| Shapes/patterns/measure | Included in a few paper activities | At least 24 reviewed prompts across the strand |
| Storytelling/reading | Parent-supported story prompts | At least 8 picture sequences and 6 short reviewed decodable stories |
| Physical-world missions | 4 simple missions | At least 12 across learning areas |

Content records should include a stable ID, strand/skill, prerequisites, difficulty/support options, visual and audio references, expected responses, feedback, review status, and version. Do not treat artwork variants as new instructional coverage.

## 9. Proposed implementation boundaries

Confirm the stack in Phase 1. Regardless of framework, separate:

- **Playground and navigation:** destinations, companion, shared controls, and scene transitions.
- **Activity engine:** lifecycle, input handling, feedback, help, and exit/resume behaviour.
- **Reviewed content:** lessons, word lists, maths prompts, diagrams, stories, and audio manifests.
- **Learning model:** skill prerequisites, evidence, review scheduling, recommendations, and parent overrides.
- **Persistence:** profiles, observations, settings, backup/import, migrations, and optional gallery assets.
- **Parent experience:** observations, progress summaries, settings, and recovery tools.

Keep content editable without rewriting game logic. Use deterministic progression rules before considering AI-generated content. Do not place secrets in browser code. Any new external service or data collection requires an explicit product decision.

## 10. Quality and verification standards

### Child usability and accessibility

- [ ] Core play does not require reading instructions.
- [ ] Spoken instructions can be replayed; a visible demonstration conveys the action.
- [ ] Child action targets are comfortably large; aim for at least 48 × 48 CSS pixels with spacing.
- [x] Required interactions work with clicks and keyboard activation; no drag-only or hover-only tasks.
- [ ] Focus remains visible; navigation and dialogs do not trap or lose keyboard focus.
- [ ] Colour is never the only cue; text and essential controls meet appropriate contrast requirements.
- [ ] Verify zoom to 200%, reduced motion, mute, and common laptop viewport sizes including 1280 × 720 and 1366 × 768.
- [ ] Important content and controls remain reachable without clipping; smaller screens reflow gracefully.
- [ ] Audio failure has a parent-supported fallback, and the limitation is made clear without silently breaking the activity.

### Educational correctness

- [ ] Phonemes and letter names are distinct; reviewed consonant recordings avoid unnecessary added vowel sounds.
- [ ] Words, stories, and distractors respect the taught sequence and the target skill.
- [ ] Pictures do not accidentally reveal answers when decoding is being checked.
- [ ] Maths distinguishes reciting numbers from counting objects and identifying the total.
- [ ] Copying, tracing, spelling, oral responses, and independent writing are recorded distinctly.
- [x] No automatic grading of speech, handwriting, or paper drawings is implied where unavailable.
- [ ] A parent/educator content review is recorded; specialist review is identified honestly if not obtained.

### Reliability, performance, and privacy

- [ ] Production build, lint, type checks, and relevant tests pass.
- [ ] Test major rules and user journeys rather than writing tests that merely reproduce implementation details.
- [x] No uncaught errors or broken assets in verified core flows.
- [ ] Playback stops correctly when leaving an activity; repeated clicks cannot queue competing instructions.
- [x] Save/import/export and migrations protect existing valid progress.
- [ ] Storage quota errors and cleared browser data have understandable recovery guidance.
- [ ] Measure startup and activity transitions on the target laptop/browser; optimise heavy artwork and audio before release.
- [ ] Test the agreed primary browser plus at least one other relevant browser; record actual versions and results.
- [ ] Verify offline claims after initial loading and across app updates, if offline use is included.
- [x] Collect only data needed for the experience; no analytics or external uploads by default.
- [x] Optional child images remain under explicit parent control, with storage and backup behaviour documented.

### Visual polish

- [ ] Illustrations, controls, typography, spacing, and character expressions form a coherent visual system.
- [ ] No placeholder artwork, silent stub buttons, or unexplained dead ends remain in released flows.
- [ ] Success feedback is satisfying without obstructing the next action.
- [ ] Wrong attempts remain calm and helpful; feedback never shames the child.
- [ ] Inspect screenshots of key screens and states at supported sizes, then verify the interactions in-browser.

## 11. Risks and mitigations

| Risk | Planned response |
|---|---|
| Beautiful world with shallow exercises | Maintain skill coverage and reviewed content inventory as release criteria |
| Too much visual stimulation | One immediate task per scene; purposeful motion; adjustable sound and reduced motion |
| Incorrect phonics audio or sequence | Review recordings and content dependencies before release; align with school |
| Guessing looks like learning | Use varied examples, supported/independent evidence, and parent observations |
| Mouse difficulty looks like a learning gap | Generous targets, click alternatives, and parent override |
| Device-only progress is lost | Export/import, clear backup guidance, versioned saves, and recovery verification |
| Offline audio/assets are incomplete | Explicit caching strategy and real offline tests before making promises |
| Scope grows indefinitely | Deliver phase gates; maintain complete-release scope separately from future ideas |
| Prior previews mistaken for completed app work | Mark them as exploratory references and verify production deliverables independently |

## 12. Decision log

| Date | Decision | Basis / status |
|---|---|---|
| 2026-10-19 | Primary device is a laptop | Confirmed by parent |
| 2026-10-19 | Child-facing experience is an illustrated, colourful playground with minimal text | Explicit parent direction |
| 2026-10-19 | Drawing is guided on screen and completed on paper | Confirmed by parent |
| 2026-10-19 | Parent controls and curriculum detail belong outside the child flow | Accepted product direction |
| 2026-10-19 | English, stack, storage, hosting, and school alignment remain unconfirmed | Resolve during Phase 1; do not infer approval |

## 13. Delivery and validation log

| Date | Work completed | Verification | Remaining work |
|---|---|---|---|
| 2026-10-19 | Initial activity and learning-journey previews | Prior browser checks covered sample activity interactions, drawing step navigation, and independent literacy/maths preview changes | Replace child-facing visual direction; implement production app |
| 2026-10-19 | Create this roadmap from the agreed vision and inspect workspace | Confirm both existing previews; review phase order, scope, acceptance criteria, and approval gates | Roadmap approval, then Phase 1 |

## 14. Immediate next steps

1. Continue autonomously under the instructions in AGENTS.md.
2. Record reversible defaults for language, phonics, handwriting, storage, hosting, and technical direction.
3. Produce the concrete learning blueprint and record decisions here.
4. Validate Phase 1 deliverables and continue to the playground design phase without stopping for routine approval.

**Completion rule:** The app is complete only when the complete planned release scope, content coverage, quality checks, deployment verification, and parent acceptance are satisfied. A visual prototype, successful build, or exhausted development session is not completion.

## Autonomous delivery update — 2026-10-19

- Standing instructions saved in `AGENTS.md`, committed and pushed. Routine phase approvals are superseded; remaining historical review wording is a quality checkpoint, not a request to stop.
- GitHub source: https://github.com/kiwanukaphil-oss/play-together-learning-app
- Hosting: GitHub Pages, configured for tested Actions deployments. First deployment workflow succeeded; verify the latest public release before claiming completion.
- Native browser modules selected instead of the proposed React stack: no runtime dependencies, straightforward static hosting/offline support, and separate content/learning/drawing modules.
- English, local device storage, generic manuscript letter forms, and a reversible starter phonics sequence are the documented defaults. School alignment remains unconfirmed and is not silently assumed.
- Implemented: six illustrated destinations; sixteen game modes; daily adventure; 15 paper drawing lessons; six pencil patterns; 26 stroke-based lowercase letter models; six short reading books; 12 physical-world missions; independent evidence across nine strands; parent overrides; local backup/restore; optional six-photo gallery; companion preferences; gentle treasure collection.
- Verified: ten unit tests, syntax checks, static build, all sixteen game-mode completion flows, drawing/letter/book navigation, local gallery import, narrow-screen layout checks, and no console errors in verified flows. See `docs/VALIDATION.md`.
- Still incomplete: reviewed phoneme recordings; educator/school alignment; a comprehensive authored and reviewed content inventory; richer shape construction and number composition activities; unfinished-session resume; an onboarding starting-point assessment; scheduled spaced review; broader browser testing; real-child observation; final full-release acceptance.
- Do not mark the full roadmap complete. Existing code is a usable development release with explicit teaching limitations, not evidence that every planned feature or quality gate is complete.
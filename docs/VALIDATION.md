# Validation record

## 2026-10-19 — Initial playable milestone

Environment: Node 24.18.1, Windows workspace, Chromium browser controlled through Chrome DevTools.

Passed:

- `npm test`: seven meaningful tests covering progression, per-strand isolation, support/override semantics, backup round trips and rejection, content IDs/graphemes, drawing/story completeness, and fresh-item selection.
- `npm run check`: JavaScript syntax checks for application modules and service worker.
- `npm run build`: complete static output.
- Browser walkthrough: all twelve game modes completed four questions each using support controls, reached completion, and saved observations.
- Attempts completed with help remained supported even when the parent selected independence.
- Fifteen drawing lessons present; next/previous and finished-picture toggling preserved the current step; completed cat lesson persisted in treasures.
- No horizontal overflow at 390px for home, counting, drawing, and parent screens.
- No browser console errors/warnings in those flows.
- Home visual inspected at 1366 × 900. Clear illustrated destinations, consistent purple/pastel art direction, minimal child-facing copy.
- Font assets downloaded and bundled with licences so typography no longer depends on external requests.

Pending at this milestone:

- True offline and deployed-site verification.
- Broader keyboard and browser compatibility checks.
- Real-child observation and human educational/audio review.
- Full roadmap features and content inventory, including reviewed letter formation and decodable books.

Do not describe automated interaction tests as a substitute for a child usability session or educator content review.

## 2026-10-19 — Breadth and resilience milestone

- Ten unit tests pass, adding checks for all 26 letter models, starter book constraints, and rejection of unsafe/oversized gallery data.
- All four additional game modes (word switch, fair shares, spatial position, and ribbon length) completed full four-question sessions in Chromium.
- Letter studio exposes 26 models; stroke navigation and animation exercised on a three-stroke letter; paper practice saved separately from drawing.
- Starter reading book completed its three pages; higher-stage books are filtered by the parent's taught-sounds limit.
- Synthetic test drawing was imported through the parent file input, resized locally, and persisted as a JPEG. The test image exists only in an isolated browser profile, not in Git.
- Parent layout checked at 1366 × 768 with no horizontal overflow.
- No console errors/warnings during the new flows.
- Reading, spelling, number understanding, operations, and handwriting now persist independently.
- Keyboard focus restoration added for controls rebuilt after each interaction.

Deployment/offline evidence is recorded after the published milestone is verified, not inferred from local tests.

## 2026-10-19 — Public deployment and cache correction

- GitHub Actions check/build/deploy completed successfully for the playable release and subsequent expansion.
- Public app opened at https://kiwanukaphil-oss.github.io/play-together-learning-app/; six destinations and the 26-letter studio verified on the deployed site.
- Deployed resource inspection found no external font or asset requests; production payload is approximately 0.94 MB uncompressed, including bundled fonts and licences.
- An offline-emulation experiment exposed mixed old/new module caches. Fixed production packaging to give all modules, stylesheets, and fonts the same content version; added a regression test verifying the shared version and cache manifest.
- New deployed cache contains 20 matching release resources. Old release cache was removed on activation, and the app/letter studio loaded after the transition.
- Browser tool's page-level offline emulation did **not** reliably disconnect service-worker network requests: an uncached probe returned HTTP 404, not an offline failure. Therefore a physical disconnected-network browser session is still unverified.
- Added tests that execute the actual worker handler with a failed network, verifying cached-response fallback, missing-asset 503 responses, and non-interception of external requests.
- Final automated suite: 13 tests. Passing worker tests and a complete deployed cache are evidence for the implementation, not a claim that a physical disconnected session was tested.

## 2026-10-19 — Continuity and constructive play

- Added due-review selection tests and validated unfinished-session snapshots; suite now has 15 passing tests.
- Number composition and stepwise robot construction both completed full four-question sessions in Chromium, bringing the total to 18 game modes.
- Refresh after question one restored **Activity 2 of 4** with the existing supported observation retained.
- Parent starting-point flow changed only the selected number practice level; oral blending is deliberately separate from reading/spelling.
- Half-entered answers restart on resume; the next unfinished question and completed-round observations are retained. This scope is documented rather than claiming full input-state restoration.
- GitHub Actions run `39249869630` succeeded for commit `5cc81b7`. Public release `a7046afcce12` was opened and its six Number Kitchen modes (including composition) verified after deployment.

## 2026-10-20 — Moonlight Picnic development milestone

Environment: Windows workspace, Node 24.18.1, connected Chrome UI and isolated Chrome DevTools test context. Local production build: `e02a1fd60715`, 30 offline manifest resources. Deployment evidence follows separately after publication.

Implemented and checked:

- Q1 creative guide, storyboard, audio direction/audition brief, exact 58-line CSV recording sheet, asset register, and a runnable visual sample/character sheet.
- Generated woodland artwork copied into the project and encoded as a 343,342-byte WebP with FFmpeg. Original editable character/object SVGs remain separate.
- New home invitation and word/packing/optional-sharing/paper/ending route. All six previous destinations remain available.
- `npm test`: 23 tests pass. New cases cover three different complete state routes, partial-answer backup restoration, supported evidence recorded once, graduated help, editing a single spelling slot, quantity limits, sharing, skipped paper, invalid imports, simpler paper alternative, hidden spelling answers, and stale audio callbacks.
- `npm run check`: all ten application JavaScript modules and the service worker pass syntax checks.
- `npm run build`: versioned output includes the new modules and background. The release hash includes public assets and shell files; regression tests verify the background and transitive module imports are represented in the versioned offline manifest.
- Browser route one: wrong spelling, partial-word refresh/resume, one-letter help preserving other positions, keyboard Check activation, correct pan reveal, too-few and too-many apples, removal to the target, classic lantern previous/next/finished preview, paper confirmation, ending and leaf-decoration persistence.
- Browser route two: parent-selected operations level; mat reveal; five-apple basket; unequal two-apple sharing followed by correction to one per plate; reduced-motion preference; classic/round paper switching; drawing pause/continue, replay and creative prompts; skipped-paper ending without claiming a drawing.
- Parent screen showed spelling/number/drawing observations after the first route, with zero reading/listening observations. State tests additionally verify no duplicate completion records.
- No console warnings/errors in the inspected connected-Chrome flows.
- Home, packing, word support, paper, ending, and character-sheet visuals were inspected. A 1366 × 768 home screenshot is saved at `output/picnic-review/home-1366.png`. The character sheet exposes twelve samples (six states each for Pip/Bear).
- Connected-Chrome viewport requests used 1366 × 768, 1280 × 720 and 390 × 844. Its browser scaling produced narrower CSS widths (including 1150 and 340); measured content widths matched the viewport without horizontal overflow in the checked sharing/paper states. The isolated DevTools home was separately verified at an actual 1366 × 768 viewport. Do not describe this as completed exact-size coverage for every state.

Issues found and corrected:

- Spelling dialogue initially printed its target word. The pre-completion visible caption now asks the child to listen; the correct word appears only after completion.
- The dedicated Hear the word control could replay the most recent support message. It now always speaks the selected word.
- Counting help initially invited touching apples even though clicking a basket apple removes it. The instruction now says to count them.
- Sharing now explicitly introduces Bear's additional apples so its quantity does not imply the packed basket changed.
- A further browser pass verified the third word (map) was selected as fresh practice. It found that general Replay could repeat a count response rather than the task; Replay now restores the full task instruction. This was checked after adding an apple, with the visible instruction returning to “Put 5 apples in the basket.” All 23 tests and syntax checks passed again; local build after this fix is `0e4c6ca79eb9`.

Tool fallbacks and limits:

- Initial visual checks used the connected browser. When DevTools became available, an isolated context provided the exact-size home screenshot and character-sheet inspection.
- DevTools rejected direct screenshot saving because of its configured workspace-root check. The returned PNG bytes were saved through local filesystem tooling in bounded chunks; the image is a screenshot, not a recreated mockup.
- A later DevTools screenshot request stalled and was cancelled. Additional screenshots were not fabricated; the runnable samples and recorded connected-browser inspection remain available.
- Browser speech remains a development fallback. A recorded-audio path exists but no produced clip, voice audition, direct listening review, or final sound mix has been verified.
- Sound clues are deliberately omitted until reviewed audio/art exist. The script includes a disabled-branch production brief, not an implemented listening game.
- Full keyboard/contrast/200%-zoom audits, target-size audit, multiple-browser testing, measured startup/interaction budgets, real disconnected-browser testing, and production update recovery remain open.
- No parent/educator acceptance, school alignment, professional audio review, real-child observation, or completed Q2/Q3/Q4 acceptance is claimed.

### Published milestone verification

- Implementation commit `492edc0` and replay correction `75302b8` were pushed without rewriting history. GitHub Actions run `39371407554` passed check and deploy for the final code.
- Public release `0e4c6ca79eb9` was opened after deployment. The app module URL and woodland asset URL both carried that same version.
- Verified the published home, all six retained destination controls, adventure welcome, and word-building screen with its answer hidden. No console warnings/errors were reported in this smoke test. No live learning observations were recorded by completing a test task.
- The app was returned to Home and left open for review. Full gameplay, incorrect answers, paper work, and sharing were exercised locally as described above, not misreported as a full production test suite.
- Local packaged output was approximately 1.34 MB before the small replay correction, including fonts and the new artwork. This is a file-size measurement, not measured network startup or responsiveness.
- Roadmap status remains Q1 complete, Q2/Q3/Q4 in progress. Deployment success does not complete the audio or human-review requirements.

## 2026-10-20 — Self-paced examples and interaction refinement

Environment: Windows, Node 24.18.1, isolated Chrome DevTools browser context with synthetic local progress. No private child progress was used or added to Git.

- Added three-frame examples for placing/removing a letter, adding/removing an apple, and sharing four example apples. The child controls the pace, can begin their turn early, and can reopen an example without changing partial work. These frames do not increase assessed content counts.
- Demonstration state persists in validated backups. Later picnics remember seen examples, while newly eligible sharing still gets its introduction; this carry-forward rule is tested. Missing optional fields in old saves resume the existing task directly; malformed new fields are rejected. Examples cannot submit answers, change task quantities, record completion, or generate observations.
- `npm test`: 25 tests pass, including two new cases covering all demonstration routes, action isolation, restoration, bounded navigation, partial-answer replay, legacy saves, and invalid imported fields. Existing full-route and audio cancellation tests still pass.
- `npm run check`: ten application modules and service worker pass. Production build and Git whitespace check pass. Exact recording sheet regenerated with 68 draft lines, script version 2.
- Browser: started a new muted picnic, advanced the word example, refreshed at frame two, and resumed that exact frame. Tab/Enter advanced the example; focus remained usable when the last Next control changed to My turn.
- Browser: entered a partial word, reopened/advanced/closed its example, and confirmed the letters remained. Completed the word, inspected all packing example frames, skipped into the task, checked an empty basket, and added an apple. Example counts and captions matched the separate example objects.
- Browser: a synthetic valid six-apple sharing fixture exercised all three four-apple example frames, then returned to the original six-apple task. Checking equal empty plates now explains the apples still waiting. Distributed three per plate, completed sharing, and entered the paper lesson.
- Visual inspection used actual CSS viewports 1366 × 768 (word example), 1280 × 720 (six-apple sharing), and 390 × 844 (packing, sharing example, sharing task). Inspected states had no horizontal overflow. All measured picnic buttons in these states and the paper lesson met the 48 × 48 CSS-pixel minimum, including removable fruit and the previous-step control.
- Reduced-motion emulation on the narrow packing screen produced no apple animation. Examples are static labelled frames, so their action sequence remains visible with sound muted and motion reduced.
- Fixed a narrow-layout overlap between tall task cards and character heads; added spacing below demonstration/sharing cards. Singular apple labels now agree with quantities. The visual sample page retains its original task/help examples and adds a demonstration example.
- The final inspected page reported no console warnings or errors after reload.

Limits: the keyboard zoom shortcut did not change the browser's measured CSS viewport, so genuine 200% zoom remains unverified. These checks are targeted evidence, not a full contrast, keyboard, every-screen, offline, performance, or multiple-browser audit. No new voice tool is connected; no voice sample, listening review, phonics review, parent acceptance, or child observation is claimed. Q2/Q3/Q4 remain in progress.

### Published examples milestone

- Code commit `cde5df1` pushed to the authorised remote. Actions run `39374550445` passed checks and deployment; its production release is `bbe506dbf6b3` with 30 offline assets.
- A fresh isolated public browser session verified matching versioned app/art URLs, the first two word demonstration frames, My turn into the word task, Help me and Watch an example controls, and the retained six destinations. Measured task controls met the 48-pixel minimum. No console warnings/errors were reported.
- Returned the public test session to Home without submitting learning answers. The public smoke check is separate from the more extensive local gameplay checks above.
- The Windows working-tree build ID was `657dad4fc318`; CI uses `bbe506dbf6b3`. The source hash currently includes line-ending bytes, so local CRLF versus repository LF produces different IDs. Each inspected build is internally coherent; deterministic cross-platform hash normalisation is a maintenance candidate, not a reported gameplay failure.

## 2026-10-20 — ElevenLabs casting auditions

- Generated four same-script candidates with Eleven v4: Tamsin/Beth for Pip and Mike/Cotswold for Bear. Saved Generation 1 for each; no best-take selection by ear is claimed.
- Preserved original MP3s and made levelled comparison copies. FFmpeg decoded every copy successfully; FFprobe confirmed MP3, mono, 44.1 kHz and approximately 24–25 seconds. Post-encode integrated loudness spans -18.72 to -18.46 LUFS, with true peaks below -1.85 dBTP. Hashes and measurements are in `output/voice-auditions/media-validation.json`.
- Chrome loaded all four players with ready state 4 and no media error. Starting Pip B paused Pip A; keyboard Space paused B. The desktop sheet was visually inspected without horizontal overflow; screenshot saved as `output/voice-auditions/listening-sheet.png`.
- No ElevenLabs connector was available, so the existing signed-in browser was used. No API credential or private child information was stored. Four requests used 1,600 included credits.
- Exported filenames have different parameter suffixes despite the displayed common settings. Effective settings need confirmation before production; this is not a controlled settings comparison.
- `scripts/build.mjs` copies only app shell, `src/` and `assets/`; audition files in `output/` are excluded from the deployed app and offline cache. No runtime code changed, so the app test suite/build were not rerun for this artifact-only milestone.

Limits: no human listening, pronunciation, rights acceptance, parent/educator/child review, final casting or full runtime recording is claimed. No live app audio changed. Q2 remains in progress.

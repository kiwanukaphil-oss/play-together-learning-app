# Picnic asset and content register

Date: 2026-10-20. No human educational, listening, or child review has been recorded.

| Asset | File / source | Provenance | State and limitation |
|---|---|---|---|
| Woodland clearing | `assets/picnic/moonlight-clearing.webp` | Built-in image generation, 2026-10-20; prompt below | Generated and visually inspected; 1536 × 1024; 343,342 bytes; converted to WebP with FFmpeg, no composition edits |
| Pip, Bear and six pose states | `src/picnic-art.js` | Original editable SVG authored for this project | Implemented; character sheet at `src/picnic-preview.html`; human art review pending |
| Apples, map, mat, pan, lantern, decorations | `src/picnic-art.js` | Original editable SVG authored for this project | Implemented; no third-party character references |
| Fonts | Existing `assets/fonts/` | Existing Fredoka/Nunito SIL Open Font Licences | Reused, bundled locally |
| Three word tasks | `PICNIC_WORDS` in `src/picnic-content.js` | Authored map/mat/pan tasks, version 1 | Starter-grapheme invariants tested; educator review pending |
| Six counting tasks | `PICNIC_COUNTS` in `src/picnic-content.js` | Authored quantities 1–5, version 1 | Implemented; educator review pending |
| Three sharing tasks | `PICNIC_SHARES` in `src/picnic-content.js` | Authored equal shares of 2/4/6, version 1 | Implemented; reviewed mastery thresholds not claimed |
| Lantern lessons | `LANTERN_STEPS` and `ROUND_LANTERN_STEPS` in `src/picnic-content.js` | Original paths/instructions, version 1 | Four-step classic and three-step round alternative implemented, with pause/replay and two optional creative prompts |
| Interaction examples | `PICNIC_DEMOS` in `src/picnic-content.js` | Nine original self-paced frames | Implemented with existing SVG objects; separate from answer state and content-coverage counts |
| Dialogue catalogue | `PICNIC_LINES` in `src/picnic-content.js` | Original script; version 2 | 68 runtime IDs have first takes; runtime records remain draft pending listening review and integration |
| Audition script | `docs/AUDIO_SCRIPT.md` | Original production direction | Used for four ElevenLabs candidates |
| Voice auditions | `output/voice-auditions/` | ElevenLabs v4 library voices, 2026-10-20; see `docs/VOICE_AUDITIONS.md` | User selected Tamsin/Pip and Mike/Bear; four audition originals preserved |
| Production takes | `output/voice-production/` | ElevenLabs v4 selected library voices; see `docs/VOICE_PRODUCTION.md` | 67 preserved exports cover 68 IDs; levelled copies technically verified; per-line listening/teaching review pending; outside app bundle |
| Exact recording sheet | `docs/PICNIC_RECORDING_SCRIPT.csv` | Reproducible export of the runtime catalogue | 68 draft lines; blank performer, rights and reviewer fields are deliberate |

Generated artwork is not claimed to be human-illustrated or exclusively owned. Provider terms govern generated output. Original local SVG/code uses no imported character IP. Confirm production-service and performer rights before distributing new recordings.

## Generation prompt

Built-in image generation was used, not the CLI/API fallback.

> Use case: illustration-story. Create a beautiful production background illustration for a children's learning game called The Moonlight Picnic. Landscape aspect ratio approximately 3:2 or 16:9. A handcrafted layered-paper picture-book woodland clearing at blue hour, sophisticated matte cut-paper shapes with subtle fine paper grain, gently irregular silhouettes, premium children's animation art direction. Rich deep twilight navy and muted teal trees frame left and right edges, a large ancient tree on the left contains a tiny cosy wooden treehouse with amber lit window, a winding ochre footpath leads from left toward an OPEN FLAT GRASS CLEARING across the lower central half. Midground right a tiny wooden cooking shelter with a warm lantern, not a large building. Tiny wildflowers and mushrooms at edges only. Upper centre/right sky is pale dusk lavender-peach with one small crescent moon and a few restrained stars. Warm apricot light against cool teal. Entire scene inviting, never dark or scary. Clearly layered foreground, midground, background with crafted detail and strong composition. IMPORTANT: central area and lower middle are spacious quiet grass, reserved for game characters and objects overlaid in code. No people, no animals, no basket, no food, no picnic blanket, no lettering, no UI, no borders, no watermarks. No blurry photo, no plastic 3D, no emoji appearance. The result should feel like opening an exquisite illustrated storybook.

Original generated file remains in the generation service's local output directory. The optimised app asset is copied into this repository and is independently available to the production build.

## Voice-production access

Runway was an earlier access suggestion. The user subscribed to ElevenLabs and selected Tamsin/Pip and Mike/Bear. The signed-in browser generated four auditions (1,600 included credits) and the first full production set (3,833 included credits); no API key was required. The production record documents the licensing basis, displayed settings and unresolved filename-metadata discrepancy. Browser speech is still the live app's temporary whole-word/instruction fallback until takes are listen-reviewed and integrated.

## Visual sample access

Run `npm run dev`, then open `http://127.0.0.1:4173/src/picnic-preview.html`. The page presents the home invitation, character poses, packing, and a support state. Its controls are disabled because it is a review sheet, not another game.

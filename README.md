# Play Together

A colourful, laptop-friendly learning playground for a child and grown-up to use together.

**Live development release:** https://kiwanukaphil-oss.github.io/play-together-learning-app/

## Run locally

Requires Node.js 22 or newer. There are no package dependencies to install.

```sh
npm run dev
```

Open http://127.0.0.1:4173. The server exposes only application assets, not repository metadata or local backups.

```sh
npm test
npm run check
npm run build
```

The static production files are written to `dist/`.

## Play

- Choose one of six illustrated destinations, or press **Let's play** for a short adventure.
- Use the speaker to repeat an instruction and **Show me** for support.
- Art Treehouse guides drawings on paper. Pencil play provides lines and patterns to copy.
- **Home** is always available. Leaving unfinished play carries no penalty.
- Open the gear for Parent corner; the small addition question separates adult settings from play, not a security boundary.
- In Parent corner, choose the sound groups already taught, adjust practice levels, and export a backup.

## The Moonlight Picnic

The home invitation opens a new illustrated adventure with Pip and Bear: build a starter word, pack apples, share food when the parent-selected operations level is appropriate, and draw a lantern on paper. A simpler round lantern and optional creative prompts are available. Partial answers and the chosen decoration are included in local backups.

The first encounter with word-building, packing, or sharing starts with a short, self-paced example. **My turn** starts the task; **Watch an example** reopens it without changing an answer. Later picnics remember which examples you have already seen. **Help me** provides support with the current task. Older saved adventures resume directly, with examples available on request.

The adventure is a development edition. Character recordings and reviewed sound clues are still pending; browser speech currently provides whole-word instructions. Its observations are recorded as supported. Existing destinations remain available below the invitation.

Creative specification: [direction](docs/CREATIVE_DIRECTION.md), [storyboard](docs/PICNIC_STORYBOARD.md), [voice script](docs/AUDIO_SCRIPT.md), and [asset register](docs/PICNIC_ASSETS.md). With the local server running, open `http://127.0.0.1:4173/src/picnic-preview.html` for the character sheet and visual samples.

Run `npm run picnic:script` to export exact current dialogue into `docs/PICNIC_RECORDING_SCRIPT.csv` for audio production and review.

## Progress and privacy

Progress remains in this browser. Clearing browser data or switching browsers can remove access to it. Export regularly. Imports are validated before replacing anything and require an explicit replacement confirmation.

No account, tracking, recording, external AI service, or image upload is required. Fonts and illustrations are bundled. Speech uses the browser's available English voices, which may rely on the operating system or its speech service; offline speech is not guaranteed.

Completion is initially recorded as supported. A parent can record independence, but answers that were demonstrated remain supported. The app does not diagnose difficulties or automatically grade paper work.

## Project continuity

- [AGENTS.md](AGENTS.md): standing autonomy and Git permissions, product direction, and engineering rules.
- [ROADMAP.md](ROADMAP.md): full scope, checked progress, validation log, and outstanding work.
- [Learning blueprint](docs/LEARNING_BLUEPRINT.md): current teaching rules and implementation defaults.
- [Validation log](docs/VALIDATION.md): checks actually performed, including limitations.

This is an actively developing app. It now includes eighteen game modes, fifteen drawing lessons, 26 lowercase letter models, six short reading books, and an optional local photo gallery. Reviewed phoneme recordings, school alignment, full content review, and real-child usability review are not yet complete. See the roadmap rather than assuming every planned feature is released.

## Assets

Custom SVG scenes, companion icon, and drawing instructions are authored in this repository. Fredoka and Nunito are distributed under their included SIL Open Font Licences in `assets/fonts/`. Emoji appearance is supplied by the user's platform.

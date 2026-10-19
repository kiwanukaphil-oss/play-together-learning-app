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

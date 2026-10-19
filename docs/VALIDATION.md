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

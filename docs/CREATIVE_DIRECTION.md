# Moonlight Picnic — creative direction

Date: 2026-10-20. Working production specification; human art/voice review pending.

## The feeling

A little place worth coming back to. A handmade picture book comes alive when the child touches something. The evening is cosy, never spooky. Warm light, tactile objects, spacious compositions, and small moments of humour make the learning feel purposeful.

The narrative is simple: Bear has a picnic basket, Pip knows a lovely spot, and the child helps them get ready. The child has agency; characters wait without reminders or disappointment.

## Visual system

| Element | Specification |
|---|---|
| Background | Layered paper woodland, quiet clearing, treehouse, winding path, dusk sky |
| Ink | Midnight plum `#29263d`; body copy on warm white |
| Primary | Warm saffron `#f7c76a`, dark ink, solid readable shapes |
| Secondary | Dusk lavender `#b5a5da`, pale lilac surfaces |
| Nature | Deep teal `#264e50`, moss `#719184`, pale mint |
| Paper | Warm cream `#fff8e8`; slightly irregular contours, restrained shadows |
| Typography | Existing locally bundled Fredoka for short headings; Nunito for instructions |
| Composition | Full-width scene, one foreground task, characters at edges watching the action |
| Objects | Clearly separated; no decorative fruit that could be mistaken for countable fruit |
| Controls | At least 48px, visible keyboard focus, text plus meaningful pictogram |
| Small screens | Scene becomes shorter; task controls flow underneath without overlap |

Create backgrounds as raster artwork. Keep manipulable objects and expressive characters in editable SVG so their states can change without producing an entire image per action. Do not put instructional text into background art.

## Pip

Orange cat; pointed ears, cream muzzle, three forehead stripes, curled tail, teal neckerchief. Head occupies approximately 45% of visible height. Slightly asymmetrical ears and a tilted head give curiosity without a permanently exaggerated grin.

Personality: observant, friendly, a little mischievous. Pip notices small things and invites the child to try. Never mocks mistakes.

Voice brief, revised after user listening feedback: Tamsin, with a clear youthful adult speaking voice, animated curiosity, playful emphasis and an audible smile. Aim around 7/10 energy for invitations and 8/10 for discoveries; settle to 5–6/10 for help. Preserve thinking time without adopting a whisper or breathy bedtime delivery. Accent alignment with school remains open.

## Bear

Cinnamon-brown bear; rounded ears, broad cream muzzle, small dark eyes, cream apron with a saffron pocket. Wider and taller than Pip. Rounded paws and generous stance convey patience.

Personality: thoughtful picnic chef. Bear sometimes pauses to consider a problem and is quietly delighted when the child helps. Humour comes from the scene: a very large basket for a very small picnic.

Voice brief, revised after user listening feedback: Mike, with a warm adult lower register, engaged conversational projection and clear consonants. Aim around 7/10 energy for the welcome and 6/10 for demonstrations/instructions. The ending can settle to 4/10 while remaining fully voiced. Use curiosity and light comic timing; avoid turning patience into sleepy or whispery delivery.

The user described the desired intensity as children's-presenter energy, referencing Ms Rachel/Blippi dialled to roughly 70%. This is a creative direction scale, not a provider slider or a measured acoustic percentage. Keep the selected characters' own voices. Vary enthusiasm with the scene and leave the child time to respond. Eight revised samples are available in `output/voice-energy-review/index.html`; their performance quality still needs listening feedback before applying the direction across the catalogue.

## Pose and expression contract

Both characters need idle, speaking, attentive, thinking, encouraging, and celebrating states. The renderer uses pose/expression names, not separate hard-coded game illustrations.

| State | Eyes / mouth | Body action | When |
|---|---|---|---|
| Idle | Relaxed, small smile | Still, occasional optional blink | Welcome and pause |
| Speaking | Open mouth, engaged eyes | Small head tilt | Active voice only |
| Attentive | Eyes towards task | Lean slightly towards work | Child attempts |
| Thinking | One brow lifted, small mouth | Paw near muzzle | A clue or counting together |
| Encouraging | Soft smile | Open paw towards task | Helpful retry |
| Celebrating | Smile, happy eyes | One small paw lift | Meaningful completed action |

Use poses to express attention, not to imply the characters can see or hear the child. No sad characters when the child leaves.

## Motion and sound

An object appears where it was placed, a map unfolds, a basket fills, and a lantern lights. Most input feedback should start immediately and finish in 150–350ms. Story transitions may take 400–700ms and never block the next action for a long flourish.

Reduced motion shows the same result immediately. Hide background firefly/foliage motion while the child works. Avoid random confetti and motion across text.

Dialogue is always foreground. Ambience and effects are independently controllable and must lower beneath speech. No continuous narration during a child's thinking time. Speech should stop on Home, another instruction, mute, page hide, or a hidden tab.

## First production boundaries

The first implementation may use browser speech for navigation and whole words only. This is an explicit development fallback, not the finished performance. Unreviewed synthetic phonemes are forbidden. Human phonics/audio review remains open.

Use custom original SVG character/object art and one generated woodland asset. Track generation prompt, provider, file, dimensions, and review state in the asset register. Never include private child data in prompts.

## Practical quality budgets

Provisional engineering targets, to be measured: core initial payload below 3 MB excluding optional audio; each compressed background below 1 MB; first usable scene within 3 seconds on the recorded test connection; action feedback within 100ms excluding intentional animation. Revised budgets require recorded measurements and reasoning.

## Significant decisions

- Preserve the current destinations and parent features while introducing the new adventure.
- Use a separate authored scene/state module instead of enlarging the existing game switch.
- Reuse existing fonts and local storage. Extend validated backups additively.
- Use explicit completion controls for quantity tasks; reaching a number momentarily is not proof of understanding.
- New content is draft until a human review is recorded. A visually polished build is not educational approval.

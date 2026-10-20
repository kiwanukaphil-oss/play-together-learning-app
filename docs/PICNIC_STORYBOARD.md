# The Moonlight Picnic — storyboard and interaction contract

Date: 2026-10-20. Version 1. This is a build specification, not a record of child testing.

## Route

Welcome → sound clue when reviewed audio is available → word workshop → pack → share when operations level is at least 1 → paper lantern → picnic ending.

The first development route omits the sound clue because there are no reviewed sound recordings. Explain this limitation in Parent corner, not as technical language in the child flow. Do not silently record listening evidence. All route words use the existing starter group `s a t p i n m`: map, mat, pan.

Different words create different useful objects. **Map** shows the path; **mat** provides somewhere to sit; **pan** supplies Bear's cooking pan. Do not make a pan turn into a map. Story selection must not override taught prerequisites.

## Scenes

| Scene | What the child sees and hears | Action | Response / learning |
|---|---|---|---|
| Welcome | Bear and Pip in a dusk clearing. An empty basket. “A little picnic, under the moon. Will you help us get ready?” | Start or Home | Characters turn towards the clearing. No evidence recorded |
| Sound clue, future | Three named pictures and a reviewed initial-sound cue | Select the matching initial sound | Reveal a picnic helper/object. Oral vocabulary is not a decoding task |
| Workshop | A wooden tray with three letter slots; eligible letter tiles; replay | Build the spoken word, then check | Correct letters remain; mistakes receive a targeted cue. Finished word reveals its object |
| Pack | A visible target quantity, separate fruit supply and basket positions | Add apples by clicking the supply; remove a chosen basket apple; check | Every action changes the basket. Too few/many feedback explains what to inspect |
| Share, optional | Bear explicitly brings 2, 4, or 6 additional apples; two clearly labelled plates | Add from this separate supply to either plate, remove from a plate, then check | All new fruit must be distributed and plates equal; the packed basket is not silently changed |
| Paper lantern | Large sequential line model and clear start dot; paper/pencil cue | Watch/replay, previous/next, finished view, or skip | New line is shown in context. Child confirms paper participation; app does not grade it |
| Ending | Prepared food, created object, warm lanterns, both friends | Choose a star/leaf/flower decoration; Home or another picnic | Story acknowledges what happened, including help. Decorations persist without currency |

## Help sequence

On the first encounter with each of word-building, packing, and sharing, show a three-frame example with its own objects. The child controls previous/next, replay, or an early move to their turn. Word frames show placing/removing a single example letter; packing shows adding/removing one apple; sharing distributes four example apples across two plates. These are interaction demonstrations, not extra teaching examples or assessed attempts. Later picnics remember which examples have already been seen; a newly eligible sharing branch still introduces its example.

The examples have labelled static frames, so their meaning survives mute and reduced motion. They do not reveal the selected target word or alter letters, basket, plates, completion, or learning observations. Refresh/resume retains the current frame. The **Watch an example** control returns to the first frame while preserving partial task answers; **Help me** retains the separate graduated task support.

Existing saves without demonstration fields migrate to the current task without an imposed interruption. New players start with demonstrations enabled. The new fields are included in validated backups.

Help is requested, never imposed after a timer. The first request cues attention, the second demonstrates one action, later requests continue supported modelling. Once help or a wrong attempt is used, evidence cannot become independent automatically.

- Spelling: locate the earliest incorrect/missing letter. Keep correctly placed letters; mark the relevant slot. Demonstrate that letter on the next request. Speech may name the whole word; phoneme demonstrations require reviewed recordings.
- Counting: highlight/count the current basket one object at a time. Then show one addition or removal towards the target. Keep control available. Do not fill the entire basket with the answer on the first request.
- Sharing: first compare plate quantities; then demonstrate one transfer to the less-filled plate, or return one excess fruit to the supply. Leave the next action to the child.
- Drawing: replay the current stroke and keep it visible. A complete example can be viewed without losing the current step.

## Persistence and evidence

Store the exact authored content IDs, scene, task entries, support flags, selected decoration, and a completion marker in the versioned parent progress backup. Validate every imported field and cross-field relationship before restoring it.

Save after each deliberate input. A refresh restores the same selected task and partial answer. Corrupt/missing narrative data must not overwrite otherwise valid learning progress; incompatible imports must be rejected before replacement.

Record supported observations once at the adventure ending for actually completed tasks. A skipped drawing receives no drawing evidence. No reading evidence is derived from spelling; no oral listening evidence is fabricated. A saved completion marker prevents refresh or repeated ending clicks from recording duplicate observations.

Parent independence controls for this new route remain a separate outstanding feature until implemented. Preserve existing per-game parent controls.

## Exiting and interruption

- Home and Break save the current adventure with no penalty.
- Replay cancels prior dialogue; it does not queue.
- Mute preserves visuals and text; essential listening tasks require an adult-supported alternative.
- On returning, provide a short welcome and the current task instruction.
- Starting another picnic is available only after completion; an unfinished adventure resumes.
- Storage failure shows a clear parent-facing recovery notice; do not falsely promise a saved adventure.

## Content authoring floor

Word objects: map, mat, pan. Counting records: one apple on a cloth; two side by side; three in a row; four in two pairs; five in a row; five in a staggered arrangement. Sharing: two, four, and six apples split between Pip and Bear.

Lantern: top rim; two sides and base; curved handle; decorative star/stripe. Simple alternative: a round lantern with one handle. Extensions: invent a lantern pattern; draw a creature that carries it. No candles or real flames required.

## Review checklist

- Every visible count agrees with the spoken quantity and validation rule.
- Starting levels remain independent; sharing is absent when the operations rule is not met.
- All words and displayed distractor letters belong to the starter sound set.
- Partial answers survive refresh; completed observations are idempotent.
- No button requires dragging, hover, precision timing, or reading a paragraph.
- Screenshot home, packing, help, paper, and ending at the required laptop sizes.
- Capture technical evidence separately from parent, educator, listening, and child review.

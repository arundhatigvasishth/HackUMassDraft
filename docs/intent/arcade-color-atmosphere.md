# Intent: Arcade Color Atmosphere

Confirmed via `/interview-me` on 2026-07-20. Supersedes `docs/ideas/zone-accent-colors.md` and `docs/specs/zone-accent-colors*.md` — the zone-based blue/yellow section-recoloring approach was rejected and its code will be reverted.

## Outcome
Replace the zone-recoloring approach with an actual "arcade room" atmosphere: red stays the loudest, most-used color everywhere (borders, CTAs, glows), but the page stops feeling like a black void by layering in:
1. A subtle, consistent pixel-art carpet/wall texture across the *entire* page background.
2. Soft neon glow-bleed gradients in varied saturated arcade colors (yellow, cyan, magenta, green, orange) bleeding into that texture, varying section to section for visual variety.
3. Literal pixel-art arcade motifs (marquee string-lights, buttons, coin/token shapes) as decoration at exactly two spots: the **Hero** and the **Footer**.

## User
Same as before — this is for the live HackUMass XV site the team is presenting; feedback came from the team's head ("black is overpowering").

## Why now
The zone-based recoloring built in the prior round was rejected outright — it read as a section-grouping color scheme, not "arcade," and didn't address the actual complaint (background feels too black/empty).

## Success
Site still reads as unmistakably red/HackUMass-branded at a glance, but no longer feels flat/black — texture + colored light bleed give it depth, and the two motif spots (Hero/Footer) give it arcade personality without clutter.

## Constraint
Colors are scattered "playfully," not tied to any per-section meaning (no more "blue = compete zone" logic) — this is decoration, not information architecture. Existing conventions stay untouched: `TerminalHeader`'s `> LOAD X.DAT` stays green, and the 3 marketing CTA buttons stay red.

## Out of scope
- No revival of the zone/grouping concept.
- No per-section flat color tinting.
- No changing the already-completed Guest Players removal (stays removed).
- Motifs confined to Hero + Footer only, not every section boundary.

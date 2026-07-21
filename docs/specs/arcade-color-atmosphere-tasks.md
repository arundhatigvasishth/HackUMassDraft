# Implementation Plan: Arcade Color Atmosphere

## Overview
Foundation first (tokens, texture, two shared components), then revert the 7 zone-retrofitted files back to red, then wire the new decorative glow into all 9 sections, then place the two motif instances. Each phase leaves the build green.

## Architecture Decisions
- Tokens + texture live together in `app/globals.css` (one file, one task) since they're the same editing pass.
- `SectionGlow` and `ControlPanel` are built and verified in isolation (compile-only) before anything references them — avoids debugging a new component and a call-site at the same time.
- Reverts happen before glow-wiring so each file only changes once per pass (revert red, then separately add glow) rather than tangling "undo blue" and "add glow" in a single diff.

## Task List

### Phase 1: Foundation
- **Task 1 — `app/globals.css` tokens + texture.** Remove `--zone-blue`/`--zone-blue-foreground`, `.blue-glow`, `.text-glow-blue`, `.card-wash-blue`, `.yellow-glow`, `.text-glow-yellow`, `.card-wash-yellow`. Rename `--zone-yellow`→`--arcade-yellow` (and its `@theme inline` mapping). Add `--arcade-cyan` (#00e5ff), `--arcade-magenta` (#ff00c8), `--arcade-orange` (#ff8c00) + their `@theme inline` mappings. Add checkerboard `background-image` to `body`. *Verify: `npm run build` passes.* **Files:** `app/globals.css`. **Size:** S.
- **Task 2 — `SectionGlow` component.** New file, per spec's code sample (color/corner props, `aria-hidden`, `blur-3xl`, `opacity-20`). Not yet used anywhere. *Verify: build passes.* **Files:** `components/hackumass/section-glow.tsx`. **Size:** XS.
- **Task 3 — `ControlPanel` component.** New pixel-art SVG (joystick ball-top + 2-3 buttons + base), same drawing style as `ChimneySilhouette` in `hero.tsx` (stacked `<rect>`s, `shapeRendering="crispEdges"`). Not yet used anywhere. *Verify: build passes.* **Files:** `components/hackumass/control-panel.tsx`. **Size:** S.

### Checkpoint: Foundation
- [ ] `npm run build` clean
- [ ] Both new components exist and export correctly, unreferenced so far

### Phase 2: Revert zone system to red
Each task: swap `zone-blue`/`blue-glow`/`card-wash-blue`/`text-glow-blue` (or the `-yellow` equivalents) back to `primary`/`red-glow`/`bg-card`/`text-glow`, including the section's H2. CTA buttons in why-sponsor/bonus-stages are already red — don't touch those lines.
- **Task 4:** `schedule.tsx` (icon box, connector line/arrow, H2)
- **Task 5:** `sponsors.tsx` (tier ribbon, character-select cards, H2)
- **Task 6:** `why-sponsor.tsx` (XP bar, dialogue box border, H2 — leave `SPONSOR HACKUMASS` button alone)
- **Task 7:** `bonus-stages.tsx` (mission cards, mission number, H2 — leave `ENTER STAGE` button alone)
- **Task 8:** `faq.tsx` (H2, tab buttons, expand-arrow/hover)
- **Task 9:** `gameplay-footage.tsx` (label, strip border, tint overlay)
- **Task 10:** `team.tsx` (H2, tab buttons, member cards, avatar circle)

Each: *Verify: `grep -n "zone-\|blue-glow\|yellow-glow\|card-wash" <file>` returns nothing; `npm run build` passes.* **Size:** S each (1 file).

### Checkpoint: Zone system fully reverted
- [ ] `grep -rn "zone-\|blue-glow\|yellow-glow\|card-wash" components/ app/` returns nothing repo-wide
- [ ] `npm run build` clean
- [ ] CTA buttons and `TerminalHeader` visibly untouched (diff check)

### Phase 3: Wire SectionGlow into all 9 sections
Each task adds `relative overflow-hidden` to the `<section>` wrapper + one `<SectionGlow color corner />` per the spec's table.
- **Task 11:** `about.tsx` (cyan/top-right) + `hall-of-fame.tsx` (magenta/bottom-left)
- **Task 12:** `schedule.tsx` (yellow/top-left) + `sponsors.tsx` (green/bottom-right)
- **Task 13:** `why-sponsor.tsx` (orange/top-right) + `bonus-stages.tsx` (cyan/bottom-left)
- **Task 14:** `faq.tsx` (magenta/top-left) + `gameplay-footage.tsx` (yellow/bottom-right)
- **Task 15:** `team.tsx` (green/top-right)

Each: *Verify: build passes; visually no horizontal scrollbar introduced (manual, by you).* **Size:** S–M (1-2 files).

### Checkpoint: Glow wired everywhere
- [ ] All 9 sections render exactly one `SectionGlow`, matching the spec table
- [ ] `npm run build` clean

### Phase 4: Motifs
- **Task 16:** Place `<ControlPanel>` in `hero.tsx`, positioned near the monitor stand (below/beside the CRT frame, not overlapping the screen).
- **Task 17:** Place `<ControlPanel>` in `footer.tsx`, near the bottom nav column.

Each: *Verify: build passes; manual visual check (by you) that it doesn't overlap/crowd existing elements at mobile width.* **Size:** XS each.

### Checkpoint: Complete
- [ ] All Success Criteria from the spec are met
- [ ] `npm run build` clean, zero `zone-*` references anywhere
- [ ] Ready for your visual review at `localhost:3000`

## Risks and Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| Checkerboard texture visually muddies with existing `.crt-overlay`/`.scanlines` | Med | Very low opacity/contrast (#141414 on #0a0a0a); adjust in Task 1 if it looks off |
| `SectionGlow` causes horizontal scroll without `overflow-hidden` on the section | Med | `overflow-hidden` added in the same task as the glow, not deferred |
| `ControlPanel` crowds Hero/Footer at mobile widths | Low | Hide or shrink via responsive classes (`hidden sm:block` or smaller `viewBox` scale) if needed |
| No eslint means no automated catch of stray `zone-*` classes | Low | Repo-wide `grep` gate at end of Phase 2 and again at final checkpoint |
| Manual revert of 7 files misses a class | Low | Same grep gate catches it before Phase 3 starts |

## Open Questions
- None blocking.

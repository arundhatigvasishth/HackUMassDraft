# Arcade Color Atmosphere

## Problem Statement
How might we make the HackUMass XV site feel like a living arcade room — textured, colorful, alive — without diluting red as the brand's dominant color or reviving a section-based color-coding scheme?

## Recommended Direction
Three layers, each solving a distinct part of "black is overpowering":

1. **Base texture — checkerboard floor.** A tiny two-tone (#0a0a0a / #141414) repeating checkerboard tile, tiled ~24px, applied as a CSS `background-image` on `body`. Barely visible at a glance, but breaks up the flat black field the same way a real arcade's floor breaks up a dark room. Pure CSS, no JS, negligible perf cost.

2. **Per-section neon glow-bleed — shared `<SectionGlow>` component.** A small reusable component (`components/hackumass/section-glow.tsx`) rendering one absolutely-positioned, heavily-blurred (`blur-3xl`), low-opacity (~0.15–0.25) color blob. Each of the ~9 content sections (About, HallOfFame, Schedule, Sponsors, WhySponsor, BonusStages, Faq, GameplayFootage, Team) drops in one `<SectionGlow color={...} corner={...} />`, cycling round-robin through cyan → magenta → yellow → green (reusing `--terminal`) → orange, alternating which corner it sits in. No section-to-color meaning — purely for variety, matching the "playful, not semantic" constraint.

3. **Literal motif at Hero + Footer only — joystick/button control panel.** A pixel-art SVG joystick + button cluster, built once as a shared component, placed near the Hero's monitor stand (not overlapping the CRT screen) and mirrored in the Footer near the bottom nav. Two placements, one component.

Red stays untouched: `--primary` borders/CTAs, `.text-glow`, and the 3 CTA buttons (PRE-REGISTER NOW, SPONSOR HACKUMASS, ENTER STAGE) keep their current styling exactly. `TerminalHeader`'s green `> LOAD X.DAT` also stays as-is.

## Key Assumptions to Validate
- [ ] The checkerboard texture stays subtle enough to not visually fight the existing `.crt-overlay`/`.scanlines` effects when both render at once — check by eye once built, tune opacity down if muddy.
- [ ] Existing section wrappers can take `relative overflow-hidden` without disturbing current layout/spacing (most sections use `mx-auto max-w-7xl px-4 py-20` — need `overflow-hidden` added without clipping content that's meant to bleed, e.g. footage ticker strips).
- [ ] Five glow colors read as distinctly "arcade neon" rather than muddy when blurred at 15–25% opacity over a near-black background — may need brighter/more saturated hex values than a typical UI palette to survive the blur+opacity reduction.

## MVP Scope
**In:**
- `body`-level checkerboard background texture (CSS only)
- `<SectionGlow>` component + one instance per content section, round-robin colors/corners
- `<ArcadeControlPanel>` (name TBD) SVG component placed in Hero + Footer
- New CSS tokens: `--arcade-cyan`, `--arcade-magenta`, `--arcade-orange`; rename `--zone-yellow` → `--arcade-yellow`
- Full revert of the discarded zone system: `schedule.tsx`, `sponsors.tsx`, `why-sponsor.tsx`, `bonus-stages.tsx`, `faq.tsx`, `gameplay-footage.tsx`, `team.tsx` back to red styling; remove `--zone-blue`/`--zone-blue-foreground` tokens and `.blue-glow`/`.text-glow-blue`/`.card-wash-blue` utilities entirely

**Out (see Not Doing):**

## Not Doing (and Why)
- **Marquee string-lights** — the runner-up motif option; not building it since the control panel was explicitly chosen instead. Not a "do both" situation — one literal motif per spot, to avoid clutter.
- **Full-page fixed light rig** — rejected mechanic for glow-bleed; more atmospheric but riskier for layout shift and harder to keep aligned to section boundaries as copy changes. The per-section component is simpler and just as effective.
- **Geometric retro carpet texture** — rejected; its baked-in color flecks would duplicate what the glow-bleed layer already does, and two color sources tangle together instead of layering cleanly.
- **Any per-section color meaning** — explicitly killed by the original interview; this is decoration, not information architecture. No color should imply "this section is about X."
- **Touching the Guest Players removal, TerminalHeader, or the 3 CTA buttons** — out of scope; already-settled decisions from before this pivot.

## Open Questions
- Exact hex values for `--arcade-cyan`, `--arcade-magenta`, `--arcade-orange` — will pick close-to-classic-neon values (e.g. cyan `#00e5ff`, magenta `#ff00c8`, orange `#ff8c00`) unless the user wants specific ones.
- Exact SVG design for the joystick/button control panel — will build a simple pixel-art cluster (ball-top joystick + 2-3 round buttons) consistent with the existing `ChimneySilhouette` pixel-block SVG style in `hero.tsx`.

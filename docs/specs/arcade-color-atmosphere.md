# Spec: Arcade Color Atmosphere

## Objective
Replace the discarded zone-based blue/yellow section-recoloring system with an "arcade room" atmosphere that fixes "black is overpowering" without diluting red as the dominant brand color. Three additive layers (texture, per-section glow, two literal motifs) plus a full revert of the zone system. Success = site reads as unmistakably red/HackUMass-branded, but no longer flat/black; `npm run build` passes; no `zone-*` references remain in source.

## Tech Stack
Next.js 16.2.6 (App Router), React 19, TypeScript 5.7, Tailwind CSS v4 (`@theme inline` token pattern in `app/globals.css`). No test framework installed.

## Commands
```
Build: npm run build
Dev:   npm run dev
Lint:  npm run lint   (broken pre-existing — eslint not installed; out of scope, already flagged)
```

## Project Structure
```
app/globals.css                       → design tokens, utility layer (texture, glow colors)
components/hackumass/*.tsx            → one component per page section
components/hackumass/section-glow.tsx → NEW: shared decorative glow-blob component
components/hackumass/control-panel.tsx→ NEW: shared joystick/button SVG motif
docs/specs/arcade-color-atmosphere.md → this spec
docs/specs/arcade-color-atmosphere-tasks.md → task breakdown (next phase)
```

## Code Style

**Tokens (`app/globals.css`)** — remove zone-blue entirely, rename zone-yellow → arcade-yellow, add three new arcade colors:
```css
/* @theme inline */
--color-arcade-cyan: var(--arcade-cyan);
--color-arcade-magenta: var(--arcade-magenta);
--color-arcade-yellow: var(--arcade-yellow);
--color-arcade-orange: var(--arcade-orange);

/* :root */
--arcade-cyan: #00e5ff;
--arcade-magenta: #ff00c8;
--arcade-yellow: #ffd400;
--arcade-orange: #ff8c00;
```
Remove: `--zone-blue`, `--zone-blue-foreground`, `--zone-yellow`, `--zone-yellow-foreground`, `.blue-glow`, `.text-glow-blue`, `.card-wash-blue`, `.yellow-glow`, `.text-glow-yellow`, `.card-wash-yellow` (all zone-era utilities — the new layers don't need hover-glow or card-wash variants, since color now lives in the background texture/glow, not on borders/text).

**Checkerboard texture** (`body`, `@layer base`):
```css
body {
  @apply bg-background text-foreground font-sans;
  background-image:
    linear-gradient(45deg, #141414 25%, transparent 25%),
    linear-gradient(-45deg, #141414 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #141414 75%),
    linear-gradient(-45deg, transparent 75%, #141414 75%);
  background-size: 24px 24px;
  background-position: 0 0, 0 12px, 12px -12px, -12px 0px;
}
```

**`<SectionGlow>` component:**
```tsx
type Corner = 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right'

const POSITION: Record<Corner, string> = {
  'top-right': '-top-24 -right-24',
  'bottom-left': '-bottom-24 -left-24',
  'top-left': '-top-24 -left-24',
  'bottom-right': '-bottom-24 -right-24',
}

export function SectionGlow({ color, corner }: { color: string; corner: Corner }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${POSITION[corner]} h-72 w-72 rounded-full opacity-20 blur-3xl`}
      style={{ backgroundColor: color }}
    />
  )
}
```
Each section wrapper adds `relative overflow-hidden` and drops in one instance, e.g.:
```tsx
<section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20">
  <SectionGlow color="var(--arcade-cyan)" corner="top-right" />
  ...
</section>
```

**Deterministic assignment** (DOM order, from `app/page.tsx`):

| # | Section | Color | Corner |
|---|---------|-------|--------|
| 1 | About | cyan | top-right |
| 2 | HallOfFame | magenta | bottom-left |
| 3 | Schedule | yellow | top-left |
| 4 | Sponsors | green (`--terminal`) | bottom-right |
| 5 | WhySponsor | orange | top-right |
| 6 | BonusStages | cyan | bottom-left |
| 7 | Faq | magenta | top-left |
| 8 | GameplayFootage | yellow | bottom-right |
| 9 | Team | green (`--terminal`) | top-right |

**Revert rule for the 7 zone-retrofitted files:** every `zone-blue`/`zone-yellow`/`blue-glow`/`yellow-glow`/`card-wash-blue`/`card-wash-yellow`/`text-glow-blue`/`text-glow-yellow` class reverts to its pre-zone red equivalent (`primary`/`red-glow`/`card`/`text-glow`), including H2 titles.

**Section heading convention — two lines only, no separate subheading.** New visitors couldn't parse the arcade-themed H2s on their own (e.g. "STAGE SELECT," "ALLIANCE"), but a third, separate plain-language line felt redundant. The fix: fold the plain-English meaning directly into the existing green `<TerminalHeader command="..." />` line instead of adding new markup — that line already exists at the top of every section, so it does double duty as the terminal-flavor decoration *and* the non-figurative label.

```tsx
<TerminalHeader command="LOAD ABOUT_US.DAT" />
<h2 className="mb-10 font-pixel text-2xl text-foreground text-glow sm:text-3xl">
  WHY HACKUMASS?
</h2>
```

Command text = the plain-English section name, uppercased with underscores, suffixed `.DAT`. Pulled from the real hackumass.com labels where they exist; invented the clearest plain equivalent for sections that don't exist on the real site (Hall of Fame, Bonus Stages, Gameplay Footage).

| Section | `TerminalHeader` command | Arcade H2 |
|---|---|---|
| About | `LOAD ABOUT_US.DAT` | WHY HACKUMASS? |
| HallOfFame | `LOAD PAST_HACKATHONS.DAT` | HALL OF FAME |
| Schedule | `LOAD SCHEDULE.DAT` | STAGE SELECT |
| Sponsors | `LOAD OUR_SPONSORS.DAT` | ALLIANCE |
| WhySponsor | `LOAD WHY_SPONSOR_US.DAT` | JOIN THE ALLIANCE |
| BonusStages | `LOAD WORKSHOPS_EVENTS.DAT` | BONUS STAGES |
| Faq | `LOAD FAQ.DAT` | HELP SCREEN |
| GameplayFootage | `LOAD PHOTOS.DAT` | ▶ RECORDED GAMEPLAY FOOTAGE |
| Team | `LOAD MEET_THE_TEAM.DAT` | OUR CREW |

Any new section added later must follow this same two-line pattern (`TerminalHeader` command + arcade H2) rather than introducing a third heading line.

## Testing Strategy
No automated test framework in this repo. Verification per task:
1. `npm run build` succeeds (type errors, JSX errors surface here).
2. `grep -rn "zone-" components/ app/` returns nothing after the revert tasks.
3. Manual visual check at `localhost:3000` (by you — no browser tooling available to me this session).

## Boundaries
- **Always:** run `npm run build` after each task; grep for stray `zone-*`/leftover classes before marking a revert task done; keep the 3 CTA buttons and `TerminalHeader` green untouched.
- **Ask first:** adding any new npm dependency (e.g. do not install eslint to fix the pre-existing broken lint script); changing the deterministic color/corner table above.
- **Never:** revive per-section color *meaning*; touch the already-completed Guest Players removal; add motifs anywhere besides Hero + Footer.

## Success Criteria
- `npm run build` passes with zero errors.
- No `zone-*` class or token remains anywhere in `components/` or `app/`.
- All 9 content sections render a `<SectionGlow>` per the table above.
- `<ControlPanel>` renders once in Hero (near monitor stand) and once in Footer.
- `body` has the checkerboard background applied globally.
- CTA buttons, `TerminalHeader`, and Guest Players removal are unchanged (verified by grep/diff).
- Every section follows the two-line heading convention (`TerminalHeader` plain-language command + arcade H2) — no separate third subheading line.

## Open Questions
- None blocking — hex values and file names are assumptions above; correct if wrong, otherwise proceeding.

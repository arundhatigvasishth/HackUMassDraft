import { TerminalHeader } from './terminal-header'
import { SectionGlow } from './section-glow'
import { rotateColors, cardTint } from './arcade-colors'

const EDITIONS = [
  { edition: 'HACKUMASS XII', quote: '"Built a robot that sorts candy. 10/10."' },
  { edition: 'HACKUMASS XIII', quote: '"Our AI note-taker won best hardware hack."' },
  { edition: 'HACKUMASS XIV', quote: '"Met my co-founder here. Insert coin, indeed."' },
  { edition: 'HACKUMASS X', quote: '"First hackathon ever. Now I mentor here."' },
  { edition: 'HACKUMASS XI', quote: '"36 hours, zero sleep, infinite memories."' },
]

const YEARS = ['X', 'XI', 'XII', 'XIII', 'XIV']

const COLORS = rotateColors(1)

export function HallOfFame() {
  return (
    <section data-stage="hall-of-fame" className="relative overflow-hidden py-20">
      <SectionGlow colors={COLORS} />
      <div className="relative mx-auto max-w-7xl px-4">
        <TerminalHeader command="LOAD PAST_HACKATHONS.DAT" />
        <h2 className="mb-10 font-pixel text-2xl leading-snug arcade-title sm:text-3xl">
          HALL OF FAME
        </h2>

        <div className="flex snap-x gap-6 overflow-x-auto pb-4">
          {EDITIONS.map((e, i) => (
            <article
              key={e.edition}
              className="arcade-hover flex w-72 shrink-0 snap-start flex-col border-4 border-primary"
              style={{ backgroundColor: cardTint(COLORS[i % COLORS.length]), '--glow': COLORS[i % COLORS.length] } as React.CSSProperties}
            >
              <div className="border-b-2 border-primary px-4 py-3 text-center font-pixel text-[10px] text-foreground text-glow">
                {e.edition}
              </div>
              <div
                className="scanlines flex h-40 items-center justify-center"
                style={{ backgroundColor: cardTint(COLORS[(i + 2) % COLORS.length], 35) }}
              >
                <span className="font-pixel text-[9px] text-foreground/50">PHOTO</span>
              </div>
              <p className="flex-1 px-4 py-5 font-sans text-2xl leading-snug text-foreground/85">
                {e.quote}
              </p>
              <div className="border-t-2 border-border px-4 py-3 text-center font-pixel text-[9px] text-[color:var(--terminal)]">
                LEVEL CLEARED &#10003;
              </div>
            </article>
          ))}
        </div>

        {/* Year selector */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-pixel text-[9px] text-muted-foreground">SELECT YEAR:</span>
          {YEARS.map((y, i) => (
            <button
              key={y}
              type="button"
              className="arcade-hover border-2 border-border px-3 py-2 font-pixel text-[10px] text-foreground hover:border-primary"
              style={{ backgroundColor: cardTint(COLORS[i % COLORS.length]), '--glow': COLORS[i % COLORS.length] } as React.CSSProperties}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

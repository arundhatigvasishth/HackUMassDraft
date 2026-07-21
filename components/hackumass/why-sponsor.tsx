import { TerminalHeader } from './terminal-header'
import { SectionGlow } from './section-glow'
import { rotateColors, cardTint } from './arcade-colors'

const BARS = [
  { label: '600+ PARTICIPANTS', pct: 92 },
  { label: 'TOP UNIVERSITIES', pct: 78 },
  { label: '36 HOURS', pct: 100 },
]

const COLORS = rotateColors(4)

function XpBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  const filled = Math.round(pct / 5)
  return (
    <div>
      <div className="mb-2 flex items-center justify-between font-pixel text-[9px] text-foreground">
        <span>{label}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="flex gap-[3px] border-2 p-1" style={{ borderColor: color, backgroundColor: 'black' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="h-4 flex-1"
            style={{ backgroundColor: i < filled ? color : '#1a1a1a' }}
          />
        ))}
      </div>
    </div>
  )
}

export function WhySponsor() {
  return (
    <section className="relative overflow-hidden py-20">
      <SectionGlow colors={COLORS} />
      <div className="relative mx-auto max-w-7xl px-4">
        <TerminalHeader command="LOAD WHY_SPONSOR_US.DAT" />
        <h2 className="mb-10 font-pixel text-2xl text-foreground text-glow sm:text-3xl">
          JOIN THE ALLIANCE
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <div
            className="border-4 border-primary p-6 sm:p-8"
            style={{ backgroundColor: cardTint(COLORS[0]) }}
          >
            <p className="font-sans text-2xl leading-relaxed text-foreground/90">
              Partner with HackUMass XV to reach one of the most driven engineering
              and computer science communities in the Northeast. Sponsors get direct
              access to 600+ builders, prime recruiting real estate, branded
              challenges, and 36 hours of face-time with future teammates. Every tier
              unlocks new power-ups &mdash; choose your alliance level and press START.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-6">
            {BARS.map((b, i) => (
              <XpBar key={b.label} label={b.label} pct={b.pct} color={COLORS[i % COLORS.length]} />
            ))}
            <a
              href="#top"
              className="red-glow mt-2 self-start border-2 border-primary bg-primary px-6 py-3 font-pixel text-[11px] text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
            >
              SPONSOR HACKUMASS
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

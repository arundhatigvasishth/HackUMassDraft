import { TerminalHeader } from './terminal-header'
import { SectionGlow } from './section-glow'
import { rotateColors, cardTint } from './arcade-colors'

// Loot-rarity colors, like item tiers in an RPG
const TIERS = [
  { tier: 'LEGENDARY', color: 'var(--arcade-yellow)', names: ['PITUN', 'AWS', 'HONDA RESEARCH'] },
  { tier: 'EPIC', color: '#b36bff', names: ['COE', 'CICS', 'CDSAI', 'MAKERSPACE'] },
  { tier: 'RARE', color: 'var(--arcade-cyan)', names: ['ANALOG DEVICES', 'CLAUDE AI', 'M5'] },
  { tier: 'COMMON', color: '#b8b8c8', names: ['INSOMNIA COOKIES', 'MLH', 'RED BULL', 'STICKER MULE'] },
]

const COLORS = rotateColors(3)

export function Sponsors() {
  return (
    <section id="sponsors" data-stage="sponsors" className="relative overflow-hidden py-20">
      <SectionGlow colors={COLORS} />
      <div className="relative mx-auto max-w-7xl px-4">
        <TerminalHeader command="LOAD OUR_SPONSORS.DAT" />
        <h2 className="mb-10 font-pixel text-2xl leading-snug arcade-title sm:text-3xl">
          ALLIANCE
        </h2>

        <div className="flex flex-col gap-10">
          {TIERS.map(({ tier, color, names }) => (
            <div key={tier}>
              {/* Pixel ribbon banner in the tier's rarity color */}
              <div className="mb-5 inline-flex items-center">
                <span
                  className="h-0 w-0 border-y-[18px] border-r-[14px] border-y-transparent"
                  style={{ borderRightColor: color }}
                />
                <span
                  className="px-4 py-2 font-pixel text-[11px] text-background"
                  style={{ backgroundColor: color }}
                >
                  &#9733; {tier}
                </span>
                <span
                  className="h-0 w-0 border-y-[18px] border-l-[14px] border-y-transparent"
                  style={{ borderLeftColor: color }}
                />
              </div>

              {/* Character select grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {names.map((name) => {
                  return (
                    <div
                      key={name}
                      className="arcade-hover flex h-24 flex-col items-center justify-center gap-2 border-2 border-border p-3 text-center hover:border-primary"
                      style={{ backgroundColor: cardTint(color), '--glow': color } as React.CSSProperties}
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center border font-pixel text-[10px]"
                        style={{ borderColor: color, color }}
                      >
                        {name.charAt(0)}
                      </span>
                      <span className="font-pixel text-[8px] leading-tight text-foreground">
                        {name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

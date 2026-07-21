import { TerminalHeader } from './terminal-header'
import { SectionGlow } from './section-glow'
import { rotateColors, cardTint } from './arcade-colors'

const TIERS = [
  { tier: 'LEGENDARY', names: ['PITUN', 'AWS', 'HONDA RESEARCH'] },
  { tier: 'EPIC', names: ['COE', 'CICS', 'CDSAI', 'MAKERSPACE'] },
  { tier: 'RARE', names: ['ANALOG DEVICES', 'CLAUDE AI', 'M5'] },
  { tier: 'COMMON', names: ['INSOMNIA COOKIES', 'MLH', 'RED BULL', 'STICKER MULE'] },
]

const COLORS = rotateColors(3)

export function Sponsors() {
  let cardIndex = 0
  return (
    <section id="sponsors" className="relative overflow-hidden py-20">
      <SectionGlow colors={COLORS} />
      <div className="relative mx-auto max-w-7xl px-4">
        <TerminalHeader command="LOAD OUR_SPONSORS.DAT" />
        <h2 className="mb-10 font-pixel text-2xl text-foreground text-glow sm:text-3xl">
          ALLIANCE
        </h2>

        <div className="flex flex-col gap-10">
          {TIERS.map(({ tier, names }) => (
            <div key={tier}>
              {/* Red pixel ribbon banner */}
              <div className="mb-5 inline-flex items-center">
                <span className="h-0 w-0 border-y-[18px] border-r-[14px] border-y-transparent border-r-primary" />
                <span className="bg-primary px-4 py-2 font-pixel text-[11px] text-primary-foreground">
                  {tier}
                </span>
                <span className="h-0 w-0 border-y-[18px] border-l-[14px] border-y-transparent border-l-primary" />
              </div>

              {/* Character select grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {names.map((name) => {
                  const color = COLORS[cardIndex % COLORS.length]
                  cardIndex += 1
                  return (
                    <div
                      key={name}
                      className="red-glow flex h-24 flex-col items-center justify-center gap-2 border-2 border-border p-3 text-center hover:border-primary"
                      style={{ backgroundColor: cardTint(color) }}
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

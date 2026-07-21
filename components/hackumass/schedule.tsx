import { TerminalHeader } from './terminal-header'
import { SectionGlow } from './section-glow'
import { rotateColors, cardTint } from './arcade-colors'

const NODES = [
  { icon: '►', title: 'WORLD 1-1 START', time: 'SAT 10:00', desc: 'Check-in & opening' },
  { icon: '⚔', title: 'HACKING UNLOCKED', time: 'SAT 12:00', desc: 'Clock starts' },
  { icon: '♥', title: 'POWER-UP', time: 'SAT 18:00', desc: 'Meals & snacks' },
  { icon: '★', title: 'BONUS STAGE', time: 'SAT 21:00', desc: 'Workshops' },
  { icon: '★', title: 'FINAL BOSS', time: 'SUN 12:00', desc: 'Closing & submit' },
  { icon: '✓', title: 'GAME CLEAR', time: 'SUN 15:00', desc: 'Awards ceremony' },
]

const COLORS = rotateColors(2)

export function Schedule() {
  return (
    <section id="schedule" className="relative overflow-hidden py-20">
      <SectionGlow colors={COLORS} />
      <div className="relative mx-auto max-w-7xl px-4">
        <TerminalHeader command="LOAD SCHEDULE.DAT" />
        <h2 className="mb-12 font-pixel text-2xl text-foreground text-glow sm:text-3xl">
          STAGE SELECT
        </h2>

        <div className="overflow-x-auto pb-4">
          <div className="flex min-w-max items-stretch">
            {NODES.map((node, i) => (
              <div key={node.title} className="flex items-stretch">
                <div className="flex w-44 flex-col items-center text-center">
                  <div
                    className="red-glow flex h-16 w-16 items-center justify-center border-4 border-primary font-sans text-3xl text-foreground text-glow"
                    style={{ backgroundColor: cardTint(COLORS[i % COLORS.length]) }}
                  >
                    {node.icon}
                  </div>
                  <span className="mt-4 font-pixel text-[9px] leading-tight text-foreground">
                    {node.title}
                  </span>
                  <span className="mt-2 font-sans text-xl text-[color:var(--terminal)]">
                    {node.time}
                  </span>
                  <span className="font-sans text-lg text-muted-foreground">
                    {node.desc}
                  </span>
                </div>
                {i < NODES.length - 1 && (
                  <div className="flex items-center pt-6" aria-hidden="true">
                    <div
                      className="h-1 w-10"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span
                      className="font-pixel text-[8px]"
                      style={{ color: COLORS[i % COLORS.length] }}
                    >
                      &gt;
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

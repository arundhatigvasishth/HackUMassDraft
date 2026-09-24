import { TerminalHeader } from './terminal-header'
import { SectionGlow } from './section-glow'
import { rotateColors, cardTint } from './arcade-colors'

const MISSIONS = [
  {
    no: '01/',
    name: 'INTRO TO HACKATHONS',
    meta: 'OCT 8 · ILC N151',
    desc: 'New to hacking? Learn how to form a team, scope a project, and ship in 36 hours.',
  },
  {
    no: '02/',
    name: 'WEB DEV BASICS',
    meta: 'OCT 12 · LGRC A301',
    desc: 'Build and deploy your first full-stack web app with modern frameworks.',
  },
  {
    no: '03/',
    name: 'HARDWARE WORKSHOP',
    meta: 'OCT 15 · MAKERSPACE',
    desc: 'Solder, wire, and prototype with microcontrollers from our hardware lab.',
  },
  {
    no: '04/',
    name: 'AI AND ML INTRO',
    meta: 'OCT 19 · ILC S140',
    desc: 'Go from zero to model. Prompt, fine-tune, and integrate AI into your build.',
  },
  {
    no: '05/',
    name: 'TEAM FORMING NIGHT',
    meta: 'OCT 22 · CAMPUS CENTER',
    desc: 'Meet fellow hackers, pitch ideas, and assemble your dream party.',
  },
  {
    no: '06/',
    name: 'SPONSOR PREP SESSION',
    meta: 'OCT 26 · ONLINE',
    desc: 'Learn about sponsor challenges and prizes before the main event begins.',
  },
]

const COLORS = rotateColors(0)

export function BonusStages() {
  return (
    <section data-stage="bonus" className="relative overflow-hidden py-20">
      <SectionGlow colors={COLORS} />
      <div className="relative mx-auto max-w-7xl px-4">
        <TerminalHeader command="LOAD WORKSHOPS_EVENTS.DAT" />
        <h2 className="mb-10 font-pixel text-2xl leading-snug arcade-title sm:text-3xl">
          BONUS STAGES
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {MISSIONS.map((m, i) => {
            const color = COLORS[i % COLORS.length]
            return (
              <article
                key={m.no}
                className="arcade-hover flex flex-col gap-3 border-2 border-border p-6 hover:border-primary"
                style={{ backgroundColor: cardTint(color), '--glow': color } as React.CSSProperties}
              >
                <span className="font-pixel text-3xl text-glow" style={{ color }}>
                  {m.no}
                </span>
                <h3 className="font-pixel text-sm text-foreground">{m.name}</h3>
                <span className="font-sans text-xl text-[color:var(--terminal)]">
                  {m.meta}
                </span>
                <p className="font-sans text-xl leading-snug text-foreground/80">
                  {m.desc}
                </p>
                <button
                  type="button"
                  className="arcade-btn arcade-btn-cyan mt-3 self-start px-5 py-3 text-[9px]"
                >
                  ENTER STAGE
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

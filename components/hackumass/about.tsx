import { TerminalHeader } from './terminal-header'
import { SectionGlow } from './section-glow'
import { rotateColors, cardTint } from './arcade-colors'
import { Users, UtensilsCrossed, Cpu, Trophy, Building2 } from 'lucide-react'

const CARDS = [
  { icon: Users, label: '600+ HACKERS' },
  { icon: UtensilsCrossed, label: 'FREE DINING' },
  { icon: Cpu, label: 'HARDWARE LAB' },
  { icon: Trophy, label: 'TOP SPONSORS' },
  { icon: Building2, label: 'ILC VENUE' },
]

const SCORES = [
  { rank: '1ST', label: 'HACKERS', value: '600+' },
  { rank: '2ND', label: 'HOURS', value: '36' },
  { rank: '3RD', label: 'PROJECTS', value: '120+' },
]

const COLORS = rotateColors(0)

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20">
      <SectionGlow colors={COLORS} />
      <div className="relative mx-auto max-w-7xl px-4">
        <TerminalHeader command="LOAD ABOUT_US.DAT" />
        <h2 className="mb-10 font-pixel text-2xl text-foreground text-glow sm:text-3xl">
          WHY HACKUMASS?
        </h2>

        {/* RPG dialogue box */}
        <div
          className="relative border-4 border-primary p-6 sm:p-8"
          style={{ backgroundColor: cardTint(COLORS[0]) }}
        >
          <p className="font-sans text-2xl leading-relaxed text-foreground/90">
            Greetings, PLAYER. HackUMass XV is western Massachusetts&apos; largest
            collegiate hackathon &mdash; 36 non-stop hours where 600+ students team up,
            caffeinate, and build hardware and software projects from scratch. Whether
            this is your first quest or your fifteenth, our mentors, workshops, and
            sponsors are here to help you level up. Grab your party, claim your spot,
            and prepare to HACK THE SYSTEM.
          </p>
          <span className="blink absolute bottom-3 right-4 font-sans text-2xl text-foreground">
            &#9660;
          </span>
        </div>

        {/* Icon cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CARDS.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className="red-glow flex flex-col items-center gap-3 border-2 border-border p-5 text-center hover:border-primary"
              style={{ backgroundColor: cardTint(COLORS[i % COLORS.length]) }}
            >
              <Icon className="h-8 w-8 text-foreground" strokeWidth={1.5} aria-hidden="true" />
              <span className="font-pixel text-[9px] leading-tight text-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Arcade high score leaderboard */}
        <div className="mt-10 border-2 border-primary bg-black">
          <div className="border-b-2 border-primary bg-primary px-4 py-2 text-center font-pixel text-[10px] text-primary-foreground">
            HIGH SCORES
          </div>
          <ul className="divide-y-2 divide-border">
            {SCORES.map((s, i) => (
              <li
                key={s.rank}
                className="flex items-center justify-between px-5 py-4 font-sans text-2xl"
                style={{ backgroundColor: cardTint(COLORS[i % COLORS.length], 10) }}
              >
                <span className="font-pixel text-[10px] text-[color:var(--terminal)]">
                  {s.rank}
                </span>
                <span className="text-foreground/80">{s.label}</span>
                <span className="text-3xl text-foreground text-glow">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

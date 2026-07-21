'use client'

import { useState } from 'react'
import { TerminalHeader } from './terminal-header'
import { SectionGlow } from './section-glow'
import { rotateColors, cardTint } from './arcade-colors'

type Member = { name: string; role: string }

function make(names: [string, string][]): Member[] {
  return names.map(([name, role]) => ({ name, role }))
}

const TABS: { name: string; members: Member[] }[] = [
  {
    name: 'COMMANDERS',
    members: make([
      ['ALEX MORROW', 'Director'],
      ['SAM PATEL', 'Co-Director'],
      ['JAMIE LEE', 'Operations Lead'],
    ]),
  },
  {
    name: 'ENGINEERS',
    members: make([
      ['RILEY FOX', 'Web Lead'],
      ['DANA WU', 'Backend Dev'],
      ['CHRIS OWENS', 'Hardware Dev'],
      ['MO KHAN', 'Frontend Dev'],
    ]),
  },
  {
    name: 'TACTICIANS',
    members: make([
      ['TAYLOR REED', 'Logistics'],
      ['JORDAN BELL', 'Scheduling'],
      ['CASEY LIN', 'Venue Ops'],
    ]),
  },
  {
    name: 'ARCHITECTS',
    members: make([
      ['NORA HALE', 'Design Lead'],
      ['IVAN PARK', 'Brand'],
      ['LUCY GRAY', 'UX'],
    ]),
  },
  {
    name: 'DIPLOMATS',
    members: make([
      ['OMAR SAID', 'Sponsorship'],
      ['EVA STONE', 'Outreach'],
      ['KAI NGUYEN', 'Partnerships'],
    ]),
  },
  {
    name: 'CODERS',
    members: make([
      ['PAT DIAZ', 'Full-Stack'],
      ['ZOE KERR', 'ML Eng'],
      ['LIAM ROSS', 'DevOps'],
      ['MIA CRUZ', 'Mobile'],
    ]),
  },
]

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
}

const COLORS = rotateColors(3)

export function Team() {
  const [tab, setTab] = useState(0)

  return (
    <section id="team" className="relative overflow-hidden py-20">
      <SectionGlow colors={COLORS} />
      <div className="relative mx-auto max-w-7xl px-4">
        <TerminalHeader command="LOAD MEET_THE_TEAM.DAT" />
        <h2 className="mb-10 font-pixel text-2xl text-foreground text-glow sm:text-3xl">
          OUR CREW
        </h2>

        <div className="mb-8 flex flex-wrap gap-3">
          {TABS.map((t, i) => {
            const color = COLORS[i % COLORS.length]
            const active = tab === i
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => setTab(i)}
                className="red-glow border-2 px-4 py-3 font-pixel text-[9px] text-foreground"
                style={
                  active
                    ? { borderColor: color, backgroundColor: color, color: 'var(--background)' }
                    : { borderColor: 'var(--border)', backgroundColor: cardTint(color) }
                }
              >
                {t.name}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {TABS[tab].members.map((m, i) => {
            const color = COLORS[i % COLORS.length]
            return (
              <div
                key={m.name}
                className="red-glow flex flex-col items-center gap-3 border-2 border-border p-6 text-center"
                style={{ backgroundColor: cardTint(color) }}
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 font-pixel text-[11px]"
                  style={{ borderColor: color, backgroundColor: cardTint(color, 30), color }}
                >
                  {initials(m.name)}
                </span>
                <p className="font-pixel text-[9px] leading-tight text-foreground">
                  {m.name}
                </p>
                <p className="font-sans text-lg text-[color:var(--terminal)]">{m.role}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

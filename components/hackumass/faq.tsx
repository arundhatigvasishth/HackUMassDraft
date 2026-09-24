'use client'

import { useState } from 'react'
import { TerminalHeader } from './terminal-header'
import { SectionGlow } from './section-glow'
import { rotateColors, cardTint } from './arcade-colors'

type QA = { q: string; a: string }

const TABS: { name: string; items: QA[] }[] = [
  {
    name: 'PLAYER GUIDE',
    items: [
      { q: 'Who can participate?', a: 'Any current university or college student, regardless of major or experience level. First-timers are very welcome.' },
      { q: 'How much does it cost?', a: 'Nothing. HackUMass is completely free, including meals, swag, and hardware checkout.' },
      { q: 'Do I need a team?', a: 'Nope. Come solo and form a team at our Team Forming Night, or team up on day one. Teams can have up to 4 players.' },
    ],
  },
  {
    name: 'ENTRY CODES',
    items: [
      { q: 'How do I register?', a: 'Hit PRE-REGISTER NOW at the top of this page and fill out the form. Confirmation arrives by email.' },
      { q: 'What should I bring?', a: 'Your student ID, laptop, charger, and a hacker spirit. Sleeping bags optional but encouraged.' },
      { q: 'Is there a code of conduct?', a: 'Yes. We follow the MLH Code of Conduct to keep the event safe and inclusive for every player.' },
    ],
  },
  {
    name: 'GAME DAY',
    items: [
      { q: 'When does hacking start?', a: 'Hacking unlocks Saturday at noon and runs 36 hours straight until submissions close Sunday.' },
      { q: 'Will there be food?', a: 'Free dining all weekend: full meals, midnight snacks, and enough caffeine to defeat the final boss.' },
      { q: 'Are there prizes?', a: 'Absolutely. Grand prizes, sponsor challenge tracks, and best hardware, AI, and beginner hack awards.' },
    ],
  },
]

const COLORS = rotateColors(1)

export function Faq() {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<number | null>(0)

  const items = TABS[tab].items

  return (
    <section id="faq" data-stage="faq" className="relative overflow-hidden py-20">
      <SectionGlow colors={COLORS} />
      <div className="relative mx-auto max-w-7xl px-4">
        <TerminalHeader command="LOAD FAQ.DAT" />
        <h2 className="mb-10 font-pixel text-2xl leading-snug arcade-title sm:text-3xl">
          HELP SCREEN
        </h2>

        <div className="mb-6 flex flex-wrap gap-3">
          {TABS.map((t, i) => {
            const color = COLORS[i % COLORS.length]
            const active = tab === i
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => {
                  setTab(i)
                  setOpen(0)
                }}
                className="arcade-hover border-2 px-4 py-3 font-pixel text-[9px] text-foreground"
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

        <div className="flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = open === i
            const color = COLORS[i % COLORS.length]
            return (
              <div
                key={item.q}
                className="border-2 border-border"
                style={{ backgroundColor: cardTint(color), '--glow': color } as React.CSSProperties}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-sans text-2xl ${isOpen ? 'rotate-90' : ''}`}
                    style={{ color }}
                    aria-hidden="true"
                  >
                    &#9658;
                  </span>
                  <span className="font-pixel text-[10px] leading-relaxed text-foreground">
                    {item.q}
                  </span>
                </button>
                {isOpen && (
                  <p className="border-t-2 border-border px-5 py-4 font-sans text-2xl leading-relaxed text-foreground/85">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

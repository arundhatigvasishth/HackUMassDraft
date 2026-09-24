import { TerminalHeader } from './terminal-header'
import { SectionGlow } from './section-glow'
import { rotateColors } from './arcade-colors'

const PHOTOS = [
  'PHOTO · HACKUMASS XIV',
  'PHOTO · HACKUMASS XIII',
  'PHOTO · HARDWARE LAB',
  'PHOTO · DEMO NIGHT',
  'PHOTO · AWARDS 2024',
  'PHOTO · TEAM BUILD',
]

const COLORS = rotateColors(2)

export function GameplayFootage() {
  const loop = [...PHOTOS, ...PHOTOS]
  return (
    <section data-stage="footage" className="relative overflow-hidden py-20">
      <SectionGlow colors={COLORS} />
      <div className="relative mx-auto max-w-7xl px-4">
        <TerminalHeader command="LOAD PHOTOS.DAT" />
        <p className="mb-6 font-pixel text-sm arcade-title">
          &#9654; RECORDED GAMEPLAY FOOTAGE
        </p>

        <div className="relative w-full overflow-hidden border-y-2 border-primary">
          <div className="scanlines">
            <div className="footage-track">
              {loop.map((label, i) => (
                <div
                  key={i}
                  className="mx-2 flex h-48 w-72 shrink-0 items-center justify-center"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${COLORS[i % COLORS.length]} 30%, #2a2a2a)`,
                  }}
                >
                  <span className="font-pixel text-[9px] text-foreground/60">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

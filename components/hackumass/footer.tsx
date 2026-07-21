import { ControlPanel } from './control-panel'

const NAV = ['ABOUT', 'SCHEDULE', 'SPONSORS', 'FAQ', 'TEAM']
const STRIP = [
  'THANKS FOR PLAYING',
  'HACKUMASS XV',
  'GAME OVER',
  'INSERT COIN TO PLAY AGAIN',
]

export function Footer() {
  const loop = [...STRIP, ...STRIP, ...STRIP, ...STRIP]
  return (
    <footer className="border-t-2 border-primary bg-[#080808]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-pixel text-sm text-foreground text-glow">HACKUMASS XV</p>
          <p className="mt-4 font-sans text-xl leading-relaxed text-foreground/80">
            Western Mass&apos; largest collegiate hackathon. Insert coin. Hack the
            system.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-center">
          <nav className="flex flex-col gap-3 md:items-center">
            {NAV.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className="font-pixel text-[10px] text-foreground hover:text-[#bd0000] hover:text-glow"
              >
                {n}
              </a>
            ))}
          </nav>
          <ControlPanel className="mt-4 h-auto w-40" />
        </div>

        <div className="md:text-right">
          <p className="font-pixel text-[9px] text-muted-foreground">CONTACT</p>
          <p className="mt-4 font-sans text-xl text-[color:var(--terminal)] text-glow-green">
            &gt; team@hackumass.org
            <span className="blink ml-1" aria-hidden="true">
              _
            </span>
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden border-t-2 border-black bg-primary py-3">
        <div className="ticker-track-slow">
          {loop.map((item, i) => (
            <span
              key={i}
              className="mx-6 font-pixel text-[10px] text-primary-foreground"
            >
              {item}
              <span className="ml-6 text-primary-foreground/70" aria-hidden="true">
                &middot;
              </span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

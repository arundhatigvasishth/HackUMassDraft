'use client'

const NAV_LINKS = ['ABOUT', 'SCHEDULE', 'SPONSORS', 'FAQ', 'TEAM']

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="font-pixel text-xs text-arcade-yellow text-glow sm:text-sm">
          HACKUMASS XV
          <span className="blink ml-2 inline-block h-4 w-2 bg-primary align-middle" aria-hidden="true" />
        </a>

        <ul className="hidden items-center gap-5 font-pixel text-[10px] text-foreground lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="group flex items-center px-1 py-1 hover:text-arcade-yellow hover:text-glow"
              >
                <span className="mr-1 text-arcade-yellow opacity-0 group-hover:opacity-100" aria-hidden="true">
                  &#9654;
                </span>
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="flex h-10 items-center justify-center border-2 bg-card px-3 font-pixel text-[9px] leading-tight neon-box"
          style={{ '--glow': 'var(--arcade-cyan)' } as React.CSSProperties}
          aria-label="Major League Hacking badge"
        >
          <span className="text-arcade-cyan">MLH</span>
          <span className="ml-1 hidden text-muted-foreground sm:inline">/// 2025</span>
        </div>
      </nav>
      <div className="rainbow-stripe" aria-hidden="true" />
    </header>
  )
}

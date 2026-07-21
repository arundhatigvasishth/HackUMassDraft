'use client'

const NAV_LINKS = ['ABOUT', 'SCHEDULE', 'SPONSORS', 'FAQ', 'TEAM']

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-primary bg-[#080808]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <a
          href="#top"
          className="font-pixel text-xs text-foreground text-glow sm:text-sm"
        >
          HACKUMASS XV
          <span className="blink ml-1 inline-block h-4 w-2 bg-[#bd0000] align-middle" aria-hidden="true" />
        </a>

        <ul className="hidden items-center gap-5 font-pixel text-[10px] text-foreground lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="px-1 py-1 text-glow-none hover:text-[#bd0000] hover:text-glow"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="flex h-10 items-center justify-center border-2 border-primary bg-card px-2 font-pixel text-[9px] leading-tight text-foreground"
          aria-label="Major League Hacking badge"
        >
          <span className="text-foreground">MLH</span>
          <span className="ml-1 hidden text-muted-foreground sm:inline">/// 2025</span>
        </div>
      </nav>
    </header>
  )
}

const ITEMS = [
  'HACKUMASS XV',
  'UMASS AMHERST',
  '36 HOURS',
  '600+ HACKERS',
  'INSERT COIN',
]

export function Ticker() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div className="w-full overflow-hidden border-y-2 border-black bg-primary py-3">
      <div className="ticker-track">
        {loop.map((item, i) => (
          <span
            key={i}
            className="mx-6 font-pixel text-[10px] text-primary-foreground sm:text-xs"
          >
            {item}
            <span className="ml-6 text-primary-foreground/70" aria-hidden="true">
              &middot;
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

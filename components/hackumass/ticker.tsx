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
    <div className="w-full overflow-hidden">
      <div className="hazard-edge" aria-hidden="true" />
      <div className="bg-secondary py-3">
        <div className="ticker-track">
          {loop.map((item, i) => (
            <span
              key={i}
              className="mx-6 font-pixel text-[10px] text-secondary-foreground sm:text-xs"
            >
              {item}
              <span className="ml-6 text-primary" aria-hidden="true">
                &#9733;
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="hazard-edge" aria-hidden="true" />
    </div>
  )
}

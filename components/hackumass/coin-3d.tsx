// A chunky arcade token built from stacked discs so it has real thickness
// when it spins. Purely visual; wrap it in a button to make it collectable.
const RIM = [-3, -2, -1, 0, 1, 2, 3]

export function Coin3D({ className = '' }: { className?: string }) {
  return (
    <span className={`coin-spin relative block ${className}`} aria-hidden="true">
      {RIM.map((z) => (
        <span key={z} className="coin-disc coin-rim" style={{ transform: `translateZ(${z}px)` }} />
      ))}
      <span className="coin-disc coin-face" style={{ transform: 'translateZ(4px)' }}>
        XV
      </span>
      <span className="coin-disc coin-face" style={{ transform: 'rotateY(180deg) translateZ(4px)' }}>
        XV
      </span>
    </span>
  )
}

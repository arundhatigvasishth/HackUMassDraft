type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'

const GRADIENT_POS: Record<Position, string> = {
  'top-left': 'circle at 0% 0%',
  'top-right': 'circle at 100% 0%',
  'bottom-left': 'circle at 0% 100%',
  'bottom-right': 'circle at 100% 100%',
  center: 'circle at 50% 50%',
}

const ORDER: Position[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center']

// Neon light spilling into the dark arcade room from the section corners.
// The background is already near-black purple, so the colors can bleed
// straight in without a dark backing layer.
export function SectionGlow({ colors }: { colors: string[] }) {
  const colorLayers = ORDER.map(
    (pos, i) => `radial-gradient(${GRADIENT_POS[pos]}, ${colors[i % colors.length]} 0%, transparent 45%)`,
  ).join(', ')

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: colorLayers, opacity: 0.18 }}
    />
  )
}

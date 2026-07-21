type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'

const GRADIENT_POS: Record<Position, string> = {
  'top-left': 'circle at 0% 0%',
  'top-right': 'circle at 100% 0%',
  'bottom-left': 'circle at 0% 100%',
  'bottom-right': 'circle at 100% 100%',
  center: 'circle at 50% 50%',
}

const ORDER: Position[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center']

// Two layers: a dark backing so each color pool has something near-black
// to glow against (blending straight into the red background muddies the
// arcade hues), then the actual colors on top, kept concentrated so they
// stay clearly readable as distinct colors instead of pastel washes.
export function SectionGlow({ colors }: { colors: string[] }) {
  const darkLayers = ORDER.map(
    (pos) => `radial-gradient(${GRADIENT_POS[pos]}, rgba(0, 0, 0, 0.9) 0%, transparent 65%)`,
  ).join(', ')
  const colorLayers = ORDER.map(
    (pos, i) => `radial-gradient(${GRADIENT_POS[pos]}, ${colors[i % colors.length]} 0%, transparent 50%)`,
  ).join(', ')

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: darkLayers, opacity: 0.75 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: colorLayers, opacity: 0.45 }}
      />
    </>
  )
}

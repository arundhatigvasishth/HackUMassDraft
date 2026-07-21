export const ARCADE_COLORS = [
  'var(--arcade-cyan)',
  'var(--arcade-magenta)',
  'var(--arcade-yellow)',
  'var(--arcade-orange)',
  'var(--terminal)',
]

export function rotateColors(n: number) {
  const i = n % ARCADE_COLORS.length
  return [...ARCADE_COLORS.slice(i), ...ARCADE_COLORS.slice(0, i)]
}

// Mixed against a fixed dark neutral (not var(--card)) so the arcade
// colors stay vivid regardless of what the brand's background/card
// tokens currently are — blending saturated color into a colored
// surface (e.g. red) muddies it; blending into near-black doesn't.
export function cardTint(color: string, pct = 32) {
  return `color-mix(in srgb, ${color} ${pct}%, #141414)`
}

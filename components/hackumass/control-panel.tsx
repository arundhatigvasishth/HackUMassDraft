export function ControlPanel({ className = 'h-auto w-24' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 100"
      className={className}
      shapeRendering="crispEdges"
    >
      {/* base plate */}
      <rect x="0" y="76" width="160" height="18" fill="#1c1c1c" />
      <rect x="0" y="94" width="160" height="4" fill="#0a0a0a" />

      {/* joystick shaft */}
      <rect x="38" y="46" width="8" height="32" fill="#3a3a3a" />

      {/* joystick ball-top, stacked pixel rows */}
      <rect x="30" y="18" width="24" height="6" fill="var(--primary)" />
      <rect x="26" y="24" width="32" height="6" fill="var(--primary)" />
      <rect x="24" y="30" width="36" height="12" fill="var(--primary)" />
      <rect x="26" y="42" width="32" height="6" fill="var(--primary)" />

      {/* buttons */}
      <rect x="90" y="52" width="16" height="16" fill="var(--arcade-cyan)" />
      <rect x="90" y="52" width="16" height="4" fill="#ffffff" opacity="0.3" />
      <rect x="114" y="60" width="16" height="16" fill="var(--arcade-magenta)" />
      <rect x="114" y="60" width="16" height="4" fill="#ffffff" opacity="0.3" />
      <rect x="90" y="30" width="16" height="16" fill="var(--arcade-yellow)" />
      <rect x="90" y="30" width="16" height="4" fill="#ffffff" opacity="0.3" />
    </svg>
  )
}

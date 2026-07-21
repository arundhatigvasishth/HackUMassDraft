export function TerminalHeader({ command }: { command: string }) {
  return (
    <div className="mb-6 flex items-center gap-2 font-sans text-[color:var(--terminal)] text-glow-green text-2xl">
      <span aria-hidden="true">&gt;</span>
      <span className="uppercase tracking-wide">{command}</span>
      <span className="blink" aria-hidden="true">
        _
      </span>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { ControlPanel } from './control-panel'

const TARGET = new Date('2025-11-01T00:00:00').getTime()

function useCountdown() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = now === null ? 0 : Math.max(0, TARGET - now)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  return { days, hours, minutes, seconds, ready: now !== null }
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

function LedCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="min-w-[3ch] border-2 border-[#bd0000] bg-black px-2 py-1 text-center font-sans text-3xl text-[#bd0000] text-glow sm:text-4xl">
        {value}
      </span>
      <span className="font-pixel text-[7px] text-muted-foreground">{label}</span>
    </div>
  )
}

function ChimneySilhouette() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 200"
      className="h-[70vh] w-auto"
      shapeRendering="crispEdges"
      fill="#1a1a1a"
    >
      {/* tapered industrial chimney built from stacked pixel blocks */}
      <rect x="30" y="0" width="20" height="12" />
      <rect x="28" y="12" width="24" height="8" />
      <rect x="30" y="20" width="20" height="30" />
      <rect x="28" y="50" width="24" height="30" />
      <rect x="26" y="80" width="28" height="40" />
      <rect x="24" y="120" width="32" height="40" />
      <rect x="22" y="160" width="36" height="40" />
      {/* brick banding */}
      <rect x="26" y="88" width="28" height="3" fill="#0a0a0a" />
      <rect x="24" y="128" width="32" height="3" fill="#0a0a0a" />
      <rect x="22" y="172" width="36" height="3" fill="#0a0a0a" />
    </svg>
  )
}

export function Hero() {
  const { days, hours, minutes, seconds, ready } = useCountdown()

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pt-24 pb-16"
    >
      {/* Pixel chimney silhouette behind the CRT, right side */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 flex items-end pr-2 opacity-70 sm:pr-10">
        <ChimneySilhouette />
      </div>

      {/* CRT arcade monitor */}
      <div className="relative z-10 w-full max-w-3xl">
        <div
          className="border-[14px] border-[#1c1c1c] bg-[#050505] p-1 shadow-[0_0_40px_rgba(189,0,0,0.35)]"
          style={{ borderRadius: '8px' }}
        >
          <div className="scanlines relative flex flex-col items-center gap-5 border-2 border-[#2a2a2a] bg-[#060806] px-6 py-10 text-center sm:px-12">
            <p className="blink font-pixel text-xs text-[color:var(--terminal)] text-glow-green">
              INSERT COIN
            </p>

            <h1 className="font-pixel text-2xl leading-tight text-foreground text-balance sm:text-4xl">
              HACK THE SYSTEM
            </h1>

            <p className="font-pixel text-sm text-foreground text-glow sm:text-lg">
              HACKUMASS XV
            </p>

            <p className="max-w-md font-sans text-2xl text-foreground/90 text-pretty">
              Nov 1&ndash;2, 2025 &middot; UMass Amherst &middot; 36 hours to build
              something legendary.
            </p>

            <a
              href="#about"
              className="red-glow border-2 border-primary bg-primary px-6 py-3 font-pixel text-[11px] text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
            >
              PRE-REGISTER NOW
            </a>

            <div className="mt-2 flex flex-col items-center gap-3">
              <span className="font-pixel text-[8px] text-muted-foreground">
                GAME STARTS IN
              </span>
              <div className="flex items-start gap-2 sm:gap-3">
                <LedCell value={ready ? pad(days) : '--'} label="DAYS" />
                <span className="pt-1 font-sans text-3xl text-[#bd0000]">:</span>
                <LedCell value={ready ? pad(hours) : '--'} label="HRS" />
                <span className="pt-1 font-sans text-3xl text-[#bd0000]">:</span>
                <LedCell value={ready ? pad(minutes) : '--'} label="MIN" />
                <span className="pt-1 font-sans text-3xl text-[#bd0000]">:</span>
                <LedCell value={ready ? pad(seconds) : '--'} label="SEC" />
              </div>
            </div>
          </div>
        </div>
        {/* monitor stand */}
        <div className="mx-auto h-6 w-24 bg-[#1c1c1c]" />
        <div className="mx-auto h-2 w-40 bg-[#141414]" />

        {/* arcade cabinet control panel */}
        <ControlPanel className="mx-auto mt-6 h-auto w-48 sm:w-56" />
      </div>
    </section>
  )
}

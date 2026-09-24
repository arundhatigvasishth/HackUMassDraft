'use client'

import { useEffect, useRef, useState } from 'react'
import { ControlPanel } from './control-panel'
import { Coin3D } from './coin-3d'
import { pinchSay } from './lobster-narrator'

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
      <span
        className="min-w-[3ch] border-2 bg-black px-2 py-1 text-center font-sans text-3xl text-primary text-glow neon-box sm:text-4xl"
        style={{ '--glow': 'var(--primary)' } as React.CSSProperties}
      >
        {value}
      </span>
      <span className="font-pixel text-[7px] text-arcade-cyan">{label}</span>
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
      fill="#1a0f3d"
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
      <rect x="26" y="88" width="28" height="3" fill="#0a0420" />
      <rect x="24" y="128" width="32" height="3" fill="#0a0420" />
      <rect x="22" y="172" width="36" height="3" fill="#0a0420" />
      {/* aircraft warning light */}
      <rect x="36" y="0" width="8" height="4" fill="var(--primary)" className="blink" />
    </svg>
  )
}

const COINS = [
  { left: '7%', top: '26%', delay: '0s' },
  { left: '88%', top: '16%', delay: '-1.2s' },
  { left: '12%', top: '66%', delay: '-2.1s' },
]

const COIN_LINES = [
  '+1 CREDIT! Ka-ching. Hit START when you are ready.',
  'Another coin! You are a natural at this.',
  'Three credits?! You are basically sponsoring us now.',
]

function useCabinetTilt() {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = e.currentTarget.getBoundingClientRect()
    ref.current.style.setProperty('--tx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    ref.current.style.setProperty('--ty', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }
  const onPointerLeave = () => {
    ref.current?.style.setProperty('--tx', '0')
    ref.current?.style.setProperty('--ty', '0')
  }

  return { ref, onPointerMove, onPointerLeave }
}

export function Hero() {
  const { days, hours, minutes, seconds, ready } = useCountdown()
  const tilt = useCabinetTilt()
  const [collected, setCollected] = useState<boolean[]>(() => COINS.map(() => false))
  const credits = collected.filter(Boolean).length

  const collect = (i: number) => {
    if (collected[i]) return
    setCollected((c) => c.map((v, j) => (j === i ? true : v)))
    pinchSay(COIN_LINES[Math.min(credits, COIN_LINES.length - 1)])
  }

  return (
    <section
      id="top"
      data-stage="top"
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pt-28 pb-16"
    >
      {/* Red synthwave sun rising over the horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[38%] flex h-[min(55vw,560px)] justify-center overflow-hidden"
      >
        <div className="red-sun aspect-square h-[200%] shrink-0 rounded-full" />
      </div>

      {/* Horizon glow + scrolling neon grid floor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[38%] h-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(255, 45, 85, 0.6), transparent 70%)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] overflow-hidden opacity-50">
        <div className="synth-grid absolute -inset-x-1/2 top-0 h-[200%]" />
      </div>

      {/* Pixel chimney silhouette behind the cabinet, right side */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 flex items-end pr-2 opacity-80 sm:pr-10">
        <ChimneySilhouette />
      </div>

      {/* Collectable spinning tokens */}
      {COINS.map((c, i) => (
        <button
          key={i}
          type="button"
          onClick={() => collect(i)}
          disabled={collected[i]}
          aria-label={collected[i] ? 'Coin collected' : 'Collect coin'}
          className={`coin-float absolute z-20 hidden md:block ${collected[i] ? 'coin-collected' : 'cursor-pointer'}`}
          style={{ left: c.left, top: c.top, animationDelay: c.delay }}
        >
          <Coin3D className="h-14 w-14" />
        </button>
      ))}

      {/* Arcade cabinet (tilts in 3D with the mouse) */}
      <div ref={tilt.ref} className="cabinet-3d relative z-10 w-full max-w-3xl">
        {/* lit marquee sign */}
        <div className="cabinet-pop marquee-bulbs mx-4 border-4 border-black p-[14px] sm:mx-10">
          <div className="border-2 border-black bg-primary py-3 text-center font-pixel text-sm text-primary-foreground shadow-[inset_0_-6px_0_rgba(0,0,0,0.3),inset_0_6px_0_rgba(255,255,255,0.25)] sm:text-lg">
            <span className="text-glow">&#9733; HACKUMASS XV &#9733;</span>
          </div>
        </div>

        {/* screen bezel with chasing lights */}
        <div className="marquee-bulbs border-4 border-black p-[14px] shadow-[0_0_60px_rgba(255,45,85,0.5),0_0_140px_rgba(255,45,85,0.2)]">
          <div className="border-[10px] border-[#1a0f3d] bg-black">
            <div className="scanlines relative flex flex-col items-center gap-5 bg-[radial-gradient(ellipse_at_center,#150a38_0%,#05010f_80%)] px-5 pt-4 pb-10 text-center sm:px-12">
              {/* arcade HUD */}
              <div className="flex w-full justify-between font-pixel text-[8px] sm:text-[10px]">
                <span className="text-primary">
                  1UP<span className="block pt-1 text-foreground">001500</span>
                </span>
                <span className="text-arcade-cyan">
                  HI-SCORE<span className="block pt-1 text-foreground">999999</span>
                </span>
                <span className="text-arcade-yellow">
                  CREDIT<span className="block pt-1 text-foreground">{pad(credits)}</span>
                </span>
              </div>

              <p className="blink mt-4 font-pixel text-xs text-terminal text-glow-green">
                {credits > 0 ? 'PRESS START' : 'INSERT COIN'}
              </p>

              <h1 className="font-pixel text-2xl leading-snug arcade-title text-balance sm:text-5xl">
                HACK THE SYSTEM
              </h1>

              <p className="max-w-md font-sans text-2xl text-foreground/90 text-pretty">
                <span className="text-arcade-cyan">Nov 1&ndash;2, 2025</span>{' '}&middot; UMass
                Amherst &middot; 36 hours to build something legendary.
              </p>

              <a href="#about" className="arcade-btn mt-2 px-6 py-4 text-[11px]">
                &#9654; PRE-REGISTER NOW
              </a>

              <div className="mt-4 flex flex-col items-center gap-3">
                <span className="font-pixel text-[8px] text-arcade-yellow">GAME STARTS IN</span>
                <div className="flex items-start gap-2 sm:gap-3">
                  <LedCell value={ready ? pad(days) : '--'} label="DAYS" />
                  <span className="blink pt-1 font-sans text-3xl text-primary">:</span>
                  <LedCell value={ready ? pad(hours) : '--'} label="HRS" />
                  <span className="blink pt-1 font-sans text-3xl text-primary">:</span>
                  <LedCell value={ready ? pad(minutes) : '--'} label="MIN" />
                  <span className="blink pt-1 font-sans text-3xl text-primary">:</span>
                  <LedCell value={ready ? pad(seconds) : '--'} label="SEC" />
                </div>
              </div>

              <p className="mt-2 font-pixel text-[7px] text-muted-foreground">
                &copy; 2025 HACKUMASS &middot; 1 PLAYER &middot; 2 PLAYERS
              </p>
            </div>
          </div>
        </div>

        {/* control deck */}
        <div className="cabinet-deck mx-auto flex w-[92%] justify-center border-4 border-t-0 border-black bg-[linear-gradient(#2a1760,#1a0f3d)] py-4 shadow-[0_8px_0_#000]">
          <ControlPanel className="h-auto w-48 sm:w-56" />
        </div>
      </div>
    </section>
  )
}

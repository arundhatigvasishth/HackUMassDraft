'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// PINCH: the plush lobster mascot who rides along as the site's narrator.
// Each section root carries data-stage="<key>"; when a section crosses the
// middle of the viewport, PINCH hops and delivers that stage's line.

type Stage = { key: string; line: string }

const STAGES: Stage[] = [
  { key: 'top', line: "Psst! Down here. I'm PINCH, your Player 2. Scroll and I'll show you around the arcade." },
  { key: 'about', line: '600+ hackers, 36 hours, free food. I am mostly here for the free food.' },
  { key: 'hall-of-fame', line: 'The Hall of Fame! Every legend here started right where you are standing.' },
  { key: 'schedule', line: "Mark your calendar. I've set fourteen alarms. One per leg. Wait, that's ten..." },
  { key: 'sponsors', line: 'These heroes keep the lights on and the snacks flowing. Give them a wave!' },
  { key: 'why-sponsor', line: "Recruiter? Top talent ahead. I'd hire them all, but I can't sign with claws." },
  { key: 'bonus', line: 'BONUS STAGES! Workshops, mini-games, and at least one cup-stacking incident.' },
  { key: 'faq', line: 'Questions? I have answers. Mostly. Click one and see.' },
  { key: 'footage', line: "Footage from past runs. I'm in none of them. I was holding the camera." },
  { key: 'team', line: 'The crew behind the cabinet. They built this whole arcade. I just live here.' },
  { key: 'footer', line: 'GAME OVER? Nah. Insert coin and play again. See you on game day!' },
]

const QUIPS = [
  'Hey! That tickles.',
  'Fun fact: lobsters taste with their legs. Please do not test this.',
  'Pre-register before the pinch hits!',
  'HI-SCORE 999999? Yeah, that one is mine.',
  "I've lived in this cabinet since HackUMass I.",
  'Snip snap! Keep scrolling, Player 1.',
]

const AUTO_HIDE_MS = 9000
const MUTE_KEY = 'pinch-muted'
const LAYERS = [1, 2, 3, 4, 5, 6]

/** Make PINCH say something from anywhere on the page. */
export function pinchSay(text: string) {
  window.dispatchEvent(new CustomEvent<string>('pinch:say', { detail: text }))
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function useTypewriter(msg: { text: string; n: number } | null) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!msg) return
    if (prefersReducedMotion()) {
      setShown(msg.text.length)
      return
    }
    setShown(0)
    const id = window.setInterval(() => {
      setShown((c) => {
        if (c >= msg.text.length) {
          window.clearInterval(id)
          return c
        }
        return c + 1
      })
    }, 24)
    return () => window.clearInterval(id)
  }, [msg])

  return { typed: msg ? msg.text.slice(0, shown) : '', done: !!msg && shown >= msg.text.length }
}

export function LobsterNarrator() {
  const [stage, setStage] = useState(0)
  const [msg, setMsg] = useState<{ text: string; n: number } | null>(null)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  const bodyRef = useRef<HTMLDivElement>(null)
  const hopRef = useRef<HTMLDivElement>(null)
  const hideTimer = useRef<number | undefined>(undefined)
  const mutedRef = useRef(false)
  const quipRef = useRef(0)

  const { typed, done } = useTypewriter(msg)

  const hop = useCallback(() => {
    if (prefersReducedMotion()) return
    hopRef.current?.animate(
      [
        { transform: 'translateY(0) scale(1, 1)' },
        { transform: 'translateY(4px) scale(1.12, 0.86)', offset: 0.15 },
        { transform: 'translateY(-26px) scale(0.92, 1.1)', offset: 0.45 },
        { transform: 'translateY(0) scale(1.08, 0.92)', offset: 0.8 },
        { transform: 'translateY(0) scale(1, 1)' },
      ],
      { duration: 550, easing: 'ease-out' },
    )
  }, [])

  const speak = useCallback(
    (text: string, force = false) => {
      if (mutedRef.current && !force) return
      setMsg((m) => ({ text, n: (m?.n ?? 0) + 1 }))
      setOpen(true)
      hop()
      window.clearTimeout(hideTimer.current)
      hideTimer.current = window.setTimeout(() => setOpen(false), AUTO_HIDE_MS)
    },
    [hop],
  )

  // Entrance: drop in shortly after load, remembering a previous mute.
  useEffect(() => {
    try {
      mutedRef.current = window.localStorage.getItem(MUTE_KEY) === '1'
    } catch {}
    const id = window.setTimeout(() => setVisible(true), 700)
    return () => {
      window.clearTimeout(id)
      window.clearTimeout(hideTimer.current)
    }
  }, [])

  // Narrate whenever the current stage changes.
  useEffect(() => {
    if (visible) speak(STAGES[stage].line)
  }, [stage, visible, speak])

  // Other components (e.g. hero coins) can make PINCH talk.
  useEffect(() => {
    const onSay = (e: Event) => speak((e as CustomEvent<string>).detail, true)
    window.addEventListener('pinch:say', onSay)
    return () => window.removeEventListener('pinch:say', onSay)
  }, [speak])

  // Track which stage is under the middle of the viewport + scroll progress.
  useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0
      setProgress(p)

      let key = STAGES[0].key
      if (p > 0.985) {
        key = STAGES[STAGES.length - 1].key
      } else {
        const mid = window.innerHeight / 2
        for (const el of document.querySelectorAll<HTMLElement>('[data-stage]')) {
          if (el.getBoundingClientRect().top <= mid) key = el.dataset.stage ?? key
        }
      }
      const i = STAGES.findIndex((s) => s.key === key)
      if (i >= 0) setStage(i)
    }
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // 3D: turn toward the cursor, lean into fast scrolls.
  useEffect(() => {
    if (prefersReducedMotion()) return
    let mx = 0
    let my = 0
    let lastY = window.scrollY
    let vel = 0
    const cur = { rx: 0, ry: 0, rz: 0 }
    let raf = 0

    const onMove = (e: PointerEvent) => {
      const el = bodyRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      mx = clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2), -1, 1)
      my = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2), -1, 1)
    }

    const tick = () => {
      const y = window.scrollY
      vel = vel * 0.85 + (y - lastY) * 0.15
      lastY = y
      cur.ry += (mx * 38 - cur.ry) * 0.1
      cur.rx += (-my * 20 - cur.rx) * 0.1
      cur.rz += (clamp(vel * 0.5, -16, 16) - cur.rz) * 0.15
      if (bodyRef.current) {
        bodyRef.current.style.transform = `perspective(520px) rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg) rotateZ(${cur.rz.toFixed(2)}deg)`
      }
      raf = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = window.requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  const onLobsterClick = () => {
    mutedRef.current = false
    try {
      window.localStorage.removeItem(MUTE_KEY)
    } catch {}
    speak(QUIPS[quipRef.current++ % QUIPS.length], true)
  }

  const onClose = () => {
    mutedRef.current = true
    try {
      window.localStorage.setItem(MUTE_KEY, '1')
    } catch {}
    window.clearTimeout(hideTimer.current)
    setOpen(false)
  }

  return (
    <div
      className={`pointer-events-none fixed right-3 bottom-3 z-[10000] flex flex-col items-end gap-2 transition-all duration-700 ease-[cubic-bezier(.2,1.5,.4,1)] sm:right-6 sm:bottom-5 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-[140%] opacity-0'
      }`}
    >
      {/* RPG dialogue bubble */}
      <div
        className={`pinch-bubble pointer-events-auto relative mr-6 w-[min(20rem,calc(100vw-4.5rem))] origin-bottom-right border-4 border-primary bg-[#0b0215]/95 transition-all duration-200 ${
          open && msg ? 'scale-100 opacity-100' : 'pointer-events-none! scale-75 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between bg-primary px-3 py-1 font-pixel text-[8px] text-primary-foreground">
          <span>PINCH &#9656; P2</span>
          <button
            type="button"
            onClick={onClose}
            className="px-1 text-[10px] leading-none hover:text-arcade-yellow"
            aria-label="Hide narrator messages"
          >
            &#10005;
          </button>
        </div>
        <p className="min-h-[4.2em] px-3 pt-2 pb-5 font-sans text-lg leading-snug sm:text-xl text-foreground" aria-hidden="true">
          {typed}
          {!done && <span className="blink">_</span>}
        </p>
        <p className="sr-only" aria-live="polite">
          {open && msg ? msg.text : ''}
        </p>
        {done && (
          <span className="blink absolute right-3 bottom-1 font-sans text-lg text-primary" aria-hidden="true">
            &#9660;
          </span>
        )}
        {/* tail pointing at PINCH */}
        <span
          aria-hidden="true"
          className="absolute -bottom-[14px] right-6 h-0 w-0 border-t-[12px] border-r-[12px] border-l-0 border-t-primary border-r-transparent"
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        {/* PINCH, as a thick 3D sprite */}
        <button
          type="button"
          onClick={onLobsterClick}
          className="pinch-bob pointer-events-auto relative block w-20 cursor-pointer sm:w-28"
          aria-label="Talk to PINCH the lobster"
        >
          <div ref={hopRef} className="origin-bottom">
            <div ref={bodyRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>
              {LAYERS.map((i) => (
                <img
                  key={i}
                  src="/lobster.webp"
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none"
                  style={{ transform: `translateZ(${-i * 1.6}px)`, filter: 'brightness(0.4) saturate(1.4)' }}
                />
              ))}
              <img
                src="/lobster.webp"
                alt=""
                draggable={false}
                className="relative block h-auto w-full select-none"
                style={{ transform: 'translateZ(1px)', filter: 'drop-shadow(0 0 10px rgba(255, 45, 85, 0.6))' }}
              />
            </div>
          </div>
          <span aria-hidden="true" className="pinch-shadow absolute -bottom-2 left-1/2 h-3 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/60 blur-[2px]" />
        </button>

        {/* stage + progress readout */}
        <div className="pointer-events-none mt-1 w-24 border-2 border-black bg-black/80 px-1.5 py-1 sm:w-28">
          <div className="flex justify-between font-pixel text-[6px] text-primary">
            <span>STAGE</span>
            <span className="text-foreground">
              {String(stage + 1).padStart(2, '0')}/{STAGES.length}
            </span>
          </div>
          <div className="mt-1 h-1.5 bg-[#2a0610]">
            <div className="h-full bg-primary shadow-[0_0_6px_var(--primary)]" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

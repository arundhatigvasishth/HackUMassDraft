'use client'

import { useEffect } from 'react'

// Page-wide 3D touches, wired up once instead of per component:
// - every .arcade-hover card tilts toward the cursor (via --rx / --ry)
// - section titles (h2.arcade-title) flip up into place when scrolled to
export function ArcadeFx() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement
    root.classList.add('fx')

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('in-view')
          io.unobserve(e.target)
        }
      },
      { threshold: 0.4 },
    )
    document.querySelectorAll('h2.arcade-title').forEach((h) => io.observe(h))

    let active: HTMLElement | null = null
    const reset = (el: HTMLElement) => {
      el.style.removeProperty('--rx')
      el.style.removeProperty('--ry')
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('.arcade-hover') ?? null
      if (active && active !== el) reset(active)
      active = el
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--rx', `${(-y * 16).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(x * 16).toFixed(2)}deg`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      io.disconnect()
      document.removeEventListener('pointermove', onMove)
      if (active) reset(active)
      root.classList.remove('fx')
    }
  }, [])

  return null
}

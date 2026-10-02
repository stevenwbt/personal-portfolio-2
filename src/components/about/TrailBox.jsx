import { useCallback, useEffect, useRef, useState } from 'react'
import { TINTS, TRAIL } from '../../data/about'

const THROTTLE = 200 // ms between cards
const CARD = 185 // px, square
const PAD = 14 // keeps cards clear of the box edge
const LIFE = 1400 // ms a card is on screen

/*
  The shared display surface.

  Wandering the cursor across it drops snapshots in sequence; hovering a dotted
  word in the copy pins one image instead (`peek`). Scoped to this element
  rather than the page, so it only fires where it's invited.
*/
export default function TrailBox({ peek, className = '' }) {
  const boxRef = useRef(null)
  const seq = useRef({ i: 0, last: 0 })
  const timers = useRef(new Set())
  const [cards, setCards] = useState([])
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach(clearTimeout)
      pending.clear()
    }
  }, [])

  const onMove = useCallback((e) => {
    const box = boxRef.current
    if (!box) return

    const now = Date.now()
    if (now - seq.current.last < THROTTLE) return
    seq.current.last = now
    setSeen(true)

    const i = seq.current.i++
    const photo = TRAIL[i % TRAIL.length]
    const tint = TINTS[i % TINTS.length]

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rot = calm ? 0 : (Math.random() - 0.5) * 10
    const ox = calm ? 0 : (Math.random() - 0.5) * 16

    // Cards live inside the box, so clamp to keep each one fully within it.
    const r = box.getBoundingClientRect()
    const half = CARD / 2
    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)
    const x = clamp(e.clientX - r.left + ox, PAD + half, Math.max(PAD + half, r.width - PAD - half))
    const y = clamp(e.clientY - r.top, PAD + half, Math.max(PAD + half, r.height - PAD - half))

    const id = `${now}-${i}`
    setCards((list) => [...list, { id, photo, tint, x, y, rot }])

    const t = setTimeout(() => {
      setCards((list) => list.filter((c) => c.id !== id))
      timers.current.delete(t)
    }, LIFE)
    timers.current.add(t)
  }, [])

  return (
    <div
      ref={boxRef}
      onMouseMove={onMove}
      className={`trailbox relative mt-10 flex min-h-[clamp(240px,26vw,420px)] items-center justify-center overflow-hidden rounded-[10px] px-7 text-center max-[900px]:hidden ${className}`}
    >
      {/* An SVG stroke is the only way to hold a 7px dash while the box resizes. */}
      <svg className="trailbox-frame" aria-hidden="true">
        <rect />
      </svg>

      <span
        className="font-mono text-[10px] tracking-[0.06em] text-ink-mute transition-opacity duration-700"
        style={{ opacity: seen || peek ? 0 : 0.7, maxWidth: '34ch' }}
      >
        Hover around the underlined text, or wander your cursor through this space to show some
        snapshots of my favorite things
      </span>

      {cards.map((c) => (
        <div
          key={c.id}
          className="trail-card"
          style={{
            left: c.x,
            top: c.y,
            borderColor: c.tint,
            '--rot': `${c.rot}deg`,
            '--rot-in': `${c.rot * 1.1}deg`,
          }}
        >
          <img src={c.photo.src} alt="" />
          <span className="tc-label">{c.photo.label}</span>
        </div>
      ))}

      {peek && (
        <div className="peek-card" style={{ aspectRatio: peek.ratio }}>
          <img src={peek.src} alt="" style={{ objectFit: peek.fit ?? 'cover' }} />
          {peek.label && <span className="tc-label">{peek.label}</span>}
        </div>
      )}
    </div>
  )
}

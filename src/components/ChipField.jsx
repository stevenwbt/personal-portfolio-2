import { useEffect, useRef, useState } from 'react'
import Clover from './Clover'
import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { CIRCLE, CLOVER_FILL, CLOVER_GROWTH, CLOVER_VIEWBOX, PETAL, SQUARE } from '../data/shapes'
import { CHIPS, PHOTOS } from '../data/stage'

gsap.registerPlugin(MorphSVGPlugin)

const CHIP_SCALE = 0.0255 // chip edge, as a fraction of stage width
const GRAB_RADIUS = 0.85 // multiples of chip size
const PHOTO_RATIO = 9 / 20 // Snapshot's aspect
const MAX_STICKERS = 20
const DESKTOP = '(min-width: 1024px)'
const TIP_CHIP = 0 // the square the onboarding tooltip starts on

const pct = (v) => parseFloat(v) / 100

/*
  Pick-up order is the lobe: this clover's lobes sit at 12 / 3 / 6 / 9 o'clock,
  so the first square picked takes the top one and the rest follow clockwise.
  Colour is no longer per-lobe — a formed clover is one green.
*/

// Where the squares start: the layout from the comp.
const FIRST_HOMES = CHIPS.map((c) => ({ fx: pct(c.left), fy: pct(c.top) }))

// Areas a respawning square should stay out of, as fractions of the stage.
const TEXT_ZONES = [
  { fx: 0.02, fy: 0.08, fw: 0.5, fh: 0.4 }, // intro
  { fx: 0.34, fy: 0.4, fw: 0.32, fh: 0.24 }, // wordmark + [stay with me]
  { fx: 0.78, fy: 0.86, fw: 0.22, fh: 0.14 }, // clock + coordinates
]

/*
  The nav bar's height plus a little air. It's opaque now, so a square that
  respawns under it is simply gone — worth a keep-out band in real pixels
  rather than a fraction of a stage whose height varies.
*/
const NAV_BAND = 60

function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}

/*
  Rectangles a square shouldn't land on: the nav, the text blocks, the photos,
  and any clover already stamped down.
*/
function blockedRects(W, H, size, stickers) {
  const rects = TEXT_ZONES.map((z) => ({
    x: z.fx * W,
    y: z.fy * H,
    w: z.fw * W,
    h: z.fh * H,
  }))

  rects.push({ x: 0, y: 0, w: W, h: NAV_BAND })

  for (const p of PHOTOS) {
    const pw = pct(p.w) * W
    rects.push({ x: pct(p.left) * W, y: pct(p.top) * H, w: pw, h: pw * PHOTO_RATIO })
  }

  for (const s of stickers) {
    // A clover sits above-right of its centre.
    rects.push({ x: s.fx * W - size, y: s.fy * H - size, w: size * 2, h: size * 2 })
  }

  return rects
}

/*
  Rejection sampling: try random spots until one clears the blocked rectangles
  and isn't crowding a square already placed this round.
*/
function scatterHomes(W, H, size, stickers) {
  const rects = blockedRects(W, H, size, stickers)
  const pad = size * 0.75
  const spanX = W - size - pad * 2
  const spanY = H - size - pad * 2
  const placed = []

  for (let i = 0; i < CHIPS.length; i++) {
    let spot = null
    for (let tries = 0; tries < 250 && !spot; tries++) {
      const x = pad + Math.random() * spanX
      const y = pad + Math.random() * spanY
      const box = { x: x - pad, y: y - pad, w: size + pad * 2, h: size + pad * 2 }
      if (rects.some((r) => overlaps(box, r))) continue
      if (placed.some((p) => Math.hypot(p.x - x, p.y - y) < size * 3.5)) continue
      spot = { x, y }
    }
    // If the stage is too crowded to place cleanly, take any spot in bounds.
    spot ??= { x: pad + Math.random() * spanX, y: pad + Math.random() * spanY }
    placed.push(spot)
  }

  return placed.map((p) => ({ fx: p.x / W, fy: p.y / H }))
}

/*
  The chip interaction.

  1. Pointer passes over a square  -> it attaches, MorphSVG rounds it into a
                                     circle, and it trails the pointer.
  2. All four attached            -> the circles settle into overlapping
                                     quadrants, which is the clover.
  3. Pointer pressed (or lifted, on touch)
                                  -> the clover stamps itself as a sticker and
                                     four squares reappear, square again.

  The first round uses the comp's layout; every round after that scatters the
  squares somewhere new.

  Positions are driven imperatively in a rAF loop rather than through React
  state, so a frame costs one transform write per chip and no re-render.
*/
export default function ChipField({ stageRef, onClover, idle = false }) {
  const wrapRefs = useRef([])
  const [stickers, setStickers] = useState([])
  const [cycle, setCycle] = useState(0)
  // Which chips are in hand, and which quadrant each took, by pick-up order.
  const [held, setHeld] = useState(() => CHIPS.map(() => -1))
  const pathRefs = useRef([])
  const tipRef = useRef(null)
  /* What each path was last told to be. Without this the effect re-tweens all
     four chips on every pick-up, and a no-op fill tween starts from
     transparent — which reads as the untouched squares blinking. */
  const applied = useRef({ shape: CHIPS.map(() => SQUARE), fill: CHIPS.map((c) => c.color) })
  /* Read inside the frame loop, so toggling it doesn't tear the loop down. */
  const idleRef = useRef(idle)
  useEffect(() => {
    idleRef.current = idle
  }, [idle])

  const world = useRef({
    ready: false,
    size: 0,
    stage: { w: 0, h: 0 },
    homes: FIRST_HOMES, // fractions, so they survive a resize
    stickers: [],
    chips: CHIPS.map(() => ({ x: 0, y: 0, attached: false, order: -1 })),
    pointer: { x: 0, y: 0, live: false },
    attached: 0,
    formed: false,
    grow: 0, // 0 = four squares, 1 = one clover-sized frame
  })

  /* Three shapes: a square at rest, a circle in hand, and a petal once all
     four are in — the petals' points meet at the centre to make the clover. */
  const complete = held.every((q) => q >= 0)

  /*
    First-visit onboarding: a tooltip that rides above the squares and walks
    through the interaction one step at a time. It's only for the first round —
    once a clover has been stamped, the visitor knows how it works.
  */
  const inHand = held.filter((q) => q >= 0).length

  // Tell the page a clover has formed — the wordmark waits for the first one.
  useEffect(() => {
    if (complete) onClover?.()
  }, [complete, onClover])
  /* No hint while the opening animation is still placing the squares — there's
     nothing to hover yet. */
  const tip =
    cycle > 0 || idle
      ? null
      : complete
        ? 'Clover! Click anywhere on the screen'
        : inHand > 0
          ? 'Sweep over the four squares together'
          : 'Hover around the square'
  useEffect(() => {
    held.forEach((quadrant, i) => {
      const path = pathRefs.current[i]
      if (!path) return
      const shape = quadrant < 0 ? SQUARE : complete ? PETAL[quadrant] : CIRCLE
      // The four colours bleed to the clover's own green as it comes together.
      const fill = complete ? CLOVER_FILL : CHIPS[i].color

      const vars = {}
      if (applied.current.shape[i] !== shape) vars.morphSVG = { shape, smooth: { points: 80 } }
      if (applied.current.fill[i] !== fill) vars.fill = fill
      if (!Object.keys(vars).length) return

      applied.current.shape[i] = shape
      applied.current.fill[i] = fill
      gsap.to(path, { duration: 0.55, ease: 'power2.inOut', ...vars })
    })
  }, [held, complete])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const mq = window.matchMedia(DESKTOP)
    const w = world.current
    let raf = 0

    const homeX = (i) => w.homes[i].fx * w.stage.w
    const homeY = (i) => w.homes[i].fy * w.stage.h

    function measure() {
      const r = stage.getBoundingClientRect()
      w.size = r.width * CHIP_SCALE
      w.stage = { w: r.width, h: r.height }
      /* Size and place the squares here, not only in the frame loop. While the
         opening animation holds that loop off they'd otherwise have no width
         at all and would balloon to fill the stage — and with no transform
         they'd sit at the stage's top-left corner, then snap a thousand pixels
         to their places on the loop's first frame. Parking them here means
         they fade in already where they belong. Once the loop is live it owns
         the transform, so this only writes it while idle. */
      wrapRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.width = `${w.size}px`
        el.style.height = `${w.size}px`
        if (idleRef.current) {
          el.style.transform = `translate3d(${homeX(i)}px, ${homeY(i)}px, 0)`
        }
      })
      if (!w.ready) {
        w.chips.forEach((c, i) => {
          c.x = homeX(i)
          c.y = homeY(i)
        })
        w.ready = true
      }
    }

    function respawn() {
      w.homes = scatterHomes(w.stage.w, w.stage.h, w.size, w.stickers)
      w.chips.forEach((c, i) => {
        c.attached = false
        c.order = -1
        c.x = homeX(i)
        c.y = homeY(i)
      })
      w.attached = 0
      w.formed = false
      w.grow = 0
      // The paths remount on the new cycle, so drop their tweens and the
      // record of what they were told to be.
      gsap.killTweensOf(pathRefs.current.filter(Boolean))
      applied.current = { shape: CHIPS.map(() => SQUARE), fill: CHIPS.map((c) => c.color) }
      setHeld(CHIPS.map(() => -1))
      setCycle((n) => n + 1)
    }

    function stamp() {
      if (!w.formed) return
      const sticker = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        // stored as fractions so stickers stay put when the window resizes
        fx: w.pointer.x / w.stage.w,
        fy: w.pointer.y / w.stage.h,
        rot: Math.round(-14 + Math.random() * 28),
      }
      w.stickers = [...w.stickers, sticker].slice(-MAX_STICKERS)
      setStickers(w.stickers)
      respawn()
    }

    function onMove(e) {
      const r = stage.getBoundingClientRect()
      w.pointer.x = e.clientX - r.left
      w.pointer.y = e.clientY - r.top
      w.pointer.live = true
    }

    function onLeave() {
      w.pointer.live = false
    }

    function frame() {
      raf = requestAnimationFrame(frame)
      // The opening animation owns these elements until it hands them back.
      if (!mq.matches || !w.ready || idleRef.current) return

      const { chips, pointer, size } = w

      // Pick up any square the pointer is touching.
      if (!w.formed && pointer.live) {
        for (const c of chips) {
          if (c.attached) continue
          const dx = pointer.x - (c.x + size / 2)
          const dy = pointer.y - (c.y + size / 2)
          if (Math.hypot(dx, dy) < size * GRAB_RADIUS) {
            c.attached = true
            c.order = w.attached++
            setHeld(chips.map((chip) => chip.order))
            if (w.attached === chips.length) {
              w.formed = true
            }
          }
        }
      }

      // Every petal is drawn in the full clover frame, so the four boxes
      // converge on one spot and grow together; the art places each lobe.
      w.grow += ((w.formed ? 1 : 0) - w.grow) * 0.12
      const box = size * (1 + w.grow * (CLOVER_GROWTH - 1))

      if (w.formed) {
        for (const c of chips) {
          c.x += (pointer.x - box / 2 - c.x) * 0.22
          c.y += (pointer.y - box / 2 - c.y) * 0.22
        }
      } else {
        // Attached squares trail the pointer in a chain; the rest ease home.
        let leadX = pointer.x - size / 2
        let leadY = pointer.y - size / 2
        const chain = chips.filter((c) => c.attached).sort((a, b) => a.order - b.order)
        for (const c of chain) {
          c.x += (leadX - c.x) * 0.3
          c.y += (leadY - c.y) * 0.3
          leadX = c.x
          leadY = c.y
        }
        for (let i = 0; i < chips.length; i++) {
          const c = chips[i]
          if (c.attached) continue
          c.x += (homeX(i) - c.x) * 0.14
          c.y += (homeY(i) - c.y) * 0.14
        }
      }

      for (let i = 0; i < chips.length; i++) {
        const el = wrapRefs.current[i]
        if (!el) continue
        const c = chips[i]
        el.style.width = `${box}px`
        el.style.height = `${box}px`
        el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`
      }

      // The tooltip sits centred above whatever it's talking about: the first
      // square at rest, then the head of the chain in hand, then the clover.
      const tipEl = tipRef.current
      if (tipEl) {
        const lead = chips.find((c) => c.order === 0) ?? chips[TIP_CHIP]
        tipEl.style.transform = `translate3d(${lead.x + box / 2}px, ${lead.y - 10}px, 0) translate(-50%, -100%)`
      }
    }

    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    measure()
    // The idle flag flips after mount, so measure again once it settles.
    const parked = setTimeout(measure, 0)

    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    // Mouse stamps on press; touch is already pressed while dragging, so it
    // stamps on release.
    stage.addEventListener('pointerdown', stamp)
    stage.addEventListener('pointerup', stamp)
    raf = requestAnimationFrame(frame)

    return () => {
      clearTimeout(parked)
      cancelAnimationFrame(raf)
      ro.disconnect()
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
      stage.removeEventListener('pointerdown', stamp)
      stage.removeEventListener('pointerup', stamp)
    }
  }, [stageRef])

  return (
    <div
      data-intro-hide
      className="pointer-events-none absolute inset-0 z-30 hidden lg:block"
      aria-hidden="true"
    >
      {stickers.map((s) => (
        <div
          key={s.id}
          className="animate-stamp absolute origin-top-left"
          style={{
            left: `${s.fx * 100}%`,
            top: `${s.fy * 100}%`,
            width: `${CHIP_SCALE * 100}%`,
            aspectRatio: '1',
          }}
        >
          <Clover rotation={s.rot} />
        </div>
      ))}

      {tip && (
        <div ref={tipRef} className="absolute top-0 left-0 will-change-transform">
          <div className="animate-drift" style={{ '--drift': '3px', '--dur': '2.4s' }}>
            <p
              key={tip}
              className="animate-rise relative rounded-full border border-dashed border-ink-mute bg-[#efefed] px-3 py-1.5 text-[0.78rem] leading-none whitespace-nowrap text-ink-mute"
              style={{ '--delay': '0s' }}
            >
              {tip}
              {/* The caret, pointing down at the square: a turned square that
                  shows only its two lower edges, so the dashes run on from the
                  pill's outline. It overlaps the pill to cover that stretch. */}
              <span className="absolute top-full left-1/2 size-[9px] -translate-x-1/2 -translate-y-[4.5px] rotate-45 border-r border-b border-dashed border-ink-mute bg-[#efefed]" />
            </p>
          </div>
        </div>
      )}

      {CHIPS.map((chip, i) => (
        <div
          key={`${chip.id}-${cycle}`}
          ref={(el) => {
            wrapRefs.current[i] = el
          }}
          data-chip
          className="animate-pop absolute top-0 left-0 will-change-transform"
        >
          <svg className="chip-shape" viewBox={`0 0 ${CLOVER_VIEWBOX} ${CLOVER_VIEWBOX}`}>
            <path
              ref={(el) => {
                pathRefs.current[i] = el
              }}
              d={SQUARE}
              style={{ fill: chip.color }}
            />
          </svg>
        </div>
      ))}
    </div>
  )
}

import { useCallback, useEffect, useRef } from 'react'
import { TRAIL } from '../../data/about'

/*
  A fixed pool of <img>, cycled rather than mounted and unmounted. The list is
  the photos twice over, so by the time a slot comes round again it has long
  since faded — with only one pass you'd catch a slot being reused while it was
  still on screen.
*/
const POOL = [...TRAIL, ...TRAIL, ...TRAIL]
const TAIL = 9 // how many stay up behind the cursor
const LIFE = 1000 // ms before one fades on its own
/*
  The cursor must cross this fraction of the viewport before the next photo
  drops. At 1/20th that's 76px, which lands them in visible steps; this is
  about half that, so the trail reads as one ribbon. TAIL rises to match, or a
  denser trail would just be a shorter one.
*/
const GAP = 40

/*
  The shared display surface.

  Wandering the cursor across it lays down snapshots: the next photo appears
  wherever the pointer has travelled far enough from the last one, and the one
  five places back is taken down. Hovering a dotted word in the copy pins a
  single image instead (`peek`).

  Positions are written straight to the elements. Nothing here goes through
  React state, so a sweep across the box costs a handful of style writes rather
  than a render per photo.
*/
export default function TrailBox({ peek, className = '' }) {
  const boxRef = useRef(null)
  const imgRefs = useRef([])
  const timers = useRef([])
  const index = useRef(0)
  const last = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((t) => clearTimeout(t))
  }, [])

  const onMove = useCallback((e) => {
    const box = boxRef.current
    if (!box) return

    const { clientX: x, clientY: y } = e
    if (Math.hypot(x - last.current.x, y - last.current.y) < window.innerWidth / GAP) return
    last.current = { x, y }

    const i = index.current
    const lead = imgRefs.current[i % POOL.length]
    // Proper modulo: the raw `i - TAIL` is negative on the first few moves, and
    // a negative index would quietly take the tail off the wrong slot.
    const tail = imgRefs.current[(((i - TAIL) % POOL.length) + POOL.length) % POOL.length]

    if (lead) {
      const r = box.getBoundingClientRect()
      lead.style.left = `${x - r.left}px`
      lead.style.top = `${y - r.top}px`
      lead.style.zIndex = `${(i % POOL.length) + 1}`
      lead.dataset.status = 'active'

      // Reusing a slot restarts its clock; the old timer would cut it short.
      clearTimeout(timers.current[i % POOL.length])
      timers.current[i % POOL.length] = setTimeout(() => {
        lead.dataset.status = 'inactive'
      }, LIFE)
    }
    if (tail && tail !== lead) tail.dataset.status = 'inactive'

    index.current = i + 1
  }, [])

  return (
    <div
      ref={boxRef}
      onMouseMove={onMove}
      onTouchMove={(e) => onMove(e.touches[0])}
      className={`trailbox relative mt-10 flex min-h-[clamp(240px,26vw,420px)] items-center justify-center overflow-hidden rounded-[10px] max-[900px]:hidden ${className}`}
    >
      {/* An SVG stroke is the only way to hold a 7px dash while the box resizes. */}
      <svg className="trailbox-frame" aria-hidden="true">
        <rect />
      </svg>

      {POOL.map((photo, i) => (
        <img
          key={`${photo.src}-${i}`}
          ref={(el) => {
            imgRefs.current[i] = el
          }}
          src={photo.src}
          alt=""
          data-status="inactive"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute w-[clamp(120px,13vw,180px)] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-sm object-cover opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-[status=active]:scale-100 data-[status=active]:opacity-100"
          style={{ aspectRatio: '3 / 4' }}
        />
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

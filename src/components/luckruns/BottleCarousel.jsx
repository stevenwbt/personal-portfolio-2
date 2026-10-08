import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BOTTLES } from '../../data/luckruns'

/*
  The bottles as a plain grid: all eight in one row on desktop, four across on
  tablets, two on phones. Each photo is 3:4, so the tiles take that shape and
  nothing is cropped.

  Clicking a bottle opens it full size, measured from where the tile actually
  is on screen and animated out from there, so the photo appears to grow out of
  the grid rather than fading in over it.
*/
export default function BottleCarousel() {
  const [open, setOpen] = useState(null) // { index, rect }

  const openAt = (i, e) => setOpen({ index: i, rect: e.currentTarget.getBoundingClientRect() })
  const close = () => setOpen(null)

  return (
    <section aria-label="The collection" className="mt-[clamp(3rem,6vw,5.5rem)]">
      <p className="mb-4 font-mono text-[0.68rem] tracking-[0.1em] text-ink-mute uppercase">
        The collection
      </p>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {BOTTLES.map((b, i) => (
          <li key={b.src}>
            <button
              type="button"
              onClick={(e) => openAt(i, e)}
              aria-label={`Open bottle ${i + 1} of ${BOTTLES.length}`}
              className="group block aspect-[3/4] w-full overflow-hidden rounded-xl"
            >
              <img
                src={b.src}
                alt={b.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      {open && <Lightbox bottle={BOTTLES[open.index]} from={open.rect} onClose={close} />}
    </section>
  )
}

/*
  The opened bottle.

  A hand-rolled FLIP: the photo is laid out where it belongs, then tweened
  from the card's measured rectangle to that position. Same trick as a shared
  element transition, without needing the two to be the same node.
*/
function Lightbox({ bottle, from, onClose }) {
  const imgRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const to = img.getBoundingClientRect()
    const anim = gsap.fromTo(
      img,
      {
        x: from.left - to.left,
        y: from.top - to.top,
        scaleX: from.width / to.width,
        scaleY: from.height / to.height,
        transformOrigin: 'top left',
      },
      { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: calm ? 0 : 0.55, ease: 'power3.inOut' },
    )

    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      anim.kill()
      document.removeEventListener('keydown', onKey)
    }
  }, [from, onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={bottle.alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-page/90 p-6 backdrop-blur-sm"
    >
      <img
        ref={imgRef}
        src={bottle.src}
        alt={bottle.alt}
        className="max-h-full w-auto max-w-full rounded-xl object-contain"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 flex size-10 items-center justify-center rounded-full border border-ink/15 bg-page text-ink"
      >
        ✕
      </button>
    </div>
  )
}

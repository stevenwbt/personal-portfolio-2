import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { TRAIL } from '../data/about'

const DESKTOP = '(min-width: 1024px)'
const ONCE_KEY = 'ste:intro-played'

/*
  Phase boundaries, in seconds.

    0    →  FADE   items fade in where they were scattered
    FADE →  T1     they drift
    T1   →  T2     they gather onto a ring
    T2   →  T3     the ring revolves around the wordmark
    T3   →  T4     it breaks and each item travels to its real place
*/
const FADE = 0.35
const T1 = 1.5 // drift
const T2 = T1 + 1.1 // gather
const T3 = T2 + 1.3 // revolve
const T4 = T3 + 1.1 // scatter home — five seconds all told

/* Radians per second. The ring starts turning the moment the pieces begin
   gathering, so a shorter revolve still reads as a turn: at this rate it
   covers about 200° between T1 and T3. */
const SPIN = 1.5

const RADIUS = 0.34 // of the stage's shorter side
/*
  GSAP's eases rather than a hand-rolled cubic: `power2.inOut` leaves the drift
  without a lurch, and `power3.out` lands each piece with its velocity already
  at zero, which is what stops the settle reading as a stop.
*/
const easeGather = gsap.parseEase('power2.inOut')
const easeSettle = gsap.parseEase('power3.out')
const lerp = (a, b, e) => [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e]

/*
  The landing's opening.

  Photographs fade in scattered, drift, gather into a ring that turns around
  the wordmark, then break out — the four that belong to the stage travelling
  to the places they hold for the rest of the page's life, and the rest
  dissolving as the ring opens.

  The four stage photos are the real elements, not copies. Each is placed as
  `transform = where it should be now − where CSS already puts it`, so when the
  animation reaches a photo's own home the transform is exactly zero and the
  hand-off is seamless. The extras are this component's own, and only exist for
  the five seconds the ring does.

  Desktop only, because that's the only breakpoint where the stage is
  positioned rather than stacked — and once per session, so coming back from a
  case study doesn't replay it.
*/
export default function LandingIntro({ stageRef, onFinish }) {
  const extrasRef = useRef([])
  const labelRef = useRef(null)
  const done = useRef(false)
  const eligible = useRef(false)

  /*
    Decide and flag before the browser paints, so the real page never shows for
    a frame on its way to being hidden. This can't live in the animation effect
    below: that one needs the stage, and the stage's ref belongs to the parent,
    which React attaches *after* a child's layout effect has already run.
  */
  useLayoutEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(ONCE_KEY) === '1'
    } catch {
      /* private mode: the intro simply plays again next time */
    }
    eligible.current =
      window.matchMedia(DESKTOP).matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !seen
    if (eligible.current) document.documentElement.dataset.intro = '1'
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const finish = () => {
      if (done.current) return
      done.current = true
      delete document.documentElement.dataset.intro
      delete document.documentElement.dataset.introNav
      try {
        sessionStorage.setItem(ONCE_KEY, '1')
      } catch {
        /* private mode: the intro simply plays again next time */
      }
      onFinish?.()
    }

    if (!eligible.current) {
      finish()
      return
    }

    const photos = [...stage.querySelectorAll('[data-photo]')]
    const extras = extrasRef.current.filter(Boolean)
    const label = labelRef.current
    if (!photos.length) {
      finish()
      return
    }

    /*
      One entry per item: the element, where it ends up, and a random seed for
      its drift and its scattered starting point. `base` is what CSS already
      contributes, which the transform has to cancel out.
    */
    const rnd = (a, b) => a + Math.random() * (b - a)
    const W = stage.clientWidth
    const H = stage.clientHeight

    /*
      Where the extras end: the clover in the nav. A photograph isn't an SVG
      path, so it can't literally morph into one — instead each shrinks onto
      the mark's centre until it's the size of a full stop and gone, which
      reads as the pictures folding into the logo.
    */
    const navClover = document.querySelector('nav[aria-label="Primary"] a[aria-label="Home"] svg')

    // The ring turns around the wordmark, wherever the layout actually put it.
    const lb = label?.getBoundingClientRect()
    const sb = stage.getBoundingClientRect()
    const centre = lb
      ? [lb.left - sb.left + lb.width / 2, lb.top - sb.top + lb.height / 2]
      : [W / 2, H / 2]
    const R = Math.min(W, H) * RADIUS

    const cb = navClover?.getBoundingClientRect()
    const sink = cb
      ? [cb.left - sb.left + cb.width / 2, cb.top - sb.top + cb.height / 2]
      : [W * 0.03, -H * 0.02]

    /* Interleaved, so the ring alternates stage photos with extras rather than
       seating all four of the keepers next to each other. */
    const mixed = []
    const longer = Math.max(photos.length, extras.length)
    for (let i = 0; i < longer; i++) {
      if (extras[i]) mixed.push({ el: extras[i], kind: 'extra' })
      if (photos[i]) mixed.push({ el: photos[i], kind: 'photo' })
    }

    const items = mixed.map((it) => {
      const base = [it.el.offsetLeft, it.el.offsetTop]
      /* A stage photo goes home. An extra goes to the clover — positioned so
         its centre lands on the mark, because scaling happens about the centre
         and the point has to hold still while it shrinks. */
      const home =
        it.kind === 'extra'
          ? [sink[0] - it.el.offsetWidth / 2, sink[1] - it.el.offsetHeight / 2]
          : base
      return {
        ...it,
        base,
        home,
        start: [rnd(0.08, 0.88) * W, rnd(0.08, 0.84) * H],
        seed: [rnd(0, Math.PI * 2), rnd(0, Math.PI * 2), rnd(0.6, 1.1)],
      }
    })

    items.forEach((it) => {
      it.el.style.willChange = 'transform, opacity'
      it.el.style.opacity = '0'
    })

    let raf = 0
    let navEarly = false
    const t0 = performance.now()

    const frame = (now) => {
      const t = (now - t0) / 1000
      const n = items.length

      items.forEach((it, i) => {
        const [sx, sy, sp] = it.seed
        const w = it.el.offsetWidth
        const h = it.el.offsetHeight

        const floating = (tt) => [
          it.start[0] + Math.sin(tt * sp + sx) * 26,
          it.start[1] + Math.cos(tt * sp * 0.8 + sy) * 26,
        ]
        // Evenly spaced around the ring, the whole thing turning as time passes.
        const onRing = (tt) => {
          const a = -Math.PI / 2 + (i / n) * Math.PI * 2 + (tt - T1) * SPIN
          return [centre[0] + Math.cos(a) * R - w / 2, centre[1] + Math.sin(a) * R - h / 2]
        }

        let pos
        let opacity = 1
        if (t < FADE) {
          pos = floating(t)
          opacity = t / FADE
        } else if (t < T1) {
          pos = floating(t)
        } else if (t < T2) {
          pos = lerp(floating(t), onRing(t), easeGather((t - T1) / (T2 - T1)))
        } else if (t < T3) {
          pos = onRing(t)
        } else if (t < T4) {
          pos = lerp(onRing(t), it.home, easeSettle((t - T3) / (T4 - T3)))
        } else {
          pos = it.home
        }

        /* An extra shrinks as it travels, and only lets go at the very end —
           fading it early would just look like it vanished on the way. */
        let scale = 1
        if (it.kind === 'extra' && t > T3) {
          const e = easeSettle(Math.min(1, (t - T3) / (T4 - T3)))
          scale = 1 - e * 0.94
          opacity = Math.max(0, Math.min(1, (1 - e) / 0.25))
        }

        it.el.style.opacity = `${opacity}`
        it.el.style.transform = `translate3d(${(pos[0] - it.base[0]).toFixed(1)}px, ${(
          pos[1] - it.base[1]
        ).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
      })

      /* The nav arrives as the ring breaks: the photographs need something to
         fold into, and an invisible target would read as them just vanishing. */
      if (!navEarly && t >= T3) {
        navEarly = true
        document.documentElement.dataset.introNav = '1'
      }

      if (label) {
        // In with the ring, out as it breaks.
        const inE = Math.max(0, Math.min(1, (t - (T1 + 0.2)) / 0.9))
        const outE = t > T3 ? Math.max(0, 1 - (t - T3) / 0.7) : 1
        label.style.opacity = `${inE * outE}`
      }

      if (t >= T4) {
        /*
          Hand back cleanly: every transform is already identity for the photos,
          and the squares are where ChipField expects them, so clearing these
          inline styles leaves the page exactly as it would have loaded.
        */
        items.forEach((it) => {
          if (it.kind === 'extra') return
          /*
            Only the photos get their transform cleared. A square's CSS position
            is the stage's top-left corner — its whole position lives in the
            transform — so clearing that one throws it a thousand pixels across
            the screen for the frame before ChipField writes the same value back.
            Leave it; ChipField's next frame sets it to exactly this.
          */
          if (it.kind === 'photo') it.el.style.transform = ''
          it.el.style.opacity = ''
          it.el.style.willChange = ''
        })
        extras.forEach((el) => (el.style.opacity = '0'))
        // A beat of acknowledgement as the last of them lands.
        if (navClover) {
          gsap.fromTo(
            navClover,
            { scale: 1 },
            { scale: 1.35, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1 },
          )
        }
        /* Uncover the page only once every piece has stopped. Revealing under
           the tail of the travel just means you watch them land. */
        finish()
        return
      }
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [stageRef, onFinish])

  return (
    <>
      {/*
        The loading screen's only words. The green wordmark is the reward for
        building a clover, so it stays out of this entirely.
      */}
      <div
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 font-mono text-[0.72rem] tracking-[0.14em] text-ink-soft opacity-0 lg:block"
      >
        stay with me
      </div>

      {/*
        The extras. Cut to match the four on the stage — grayscale, landscape,
        the same diagonal corners — so the ring reads as one set of photographs
        rather than a mix of stage pieces and visitors.
      */}
      {TRAIL.map((photo, i) => (
        <div
          key={photo.src}
          ref={(el) => {
            extrasRef.current[i] = el
          }}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-10 hidden w-[13%] opacity-0 lg:block"
        >
          <div className="overflow-hidden rounded-[10px_0_10px_0]">
            <img
              src={photo.src}
              alt=""
              decoding="async"
              className="aspect-[20/9] w-full object-cover grayscale"
            />
          </div>
        </div>
      ))}
    </>
  )
}

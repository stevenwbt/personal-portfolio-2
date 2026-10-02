import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

/*
  Smooth scrolling, plus the scroll-linked reveals.

  ScrollSmoother transforms #smooth-content to ease the page along, so anything
  `position: fixed` has to live outside the wrapper — that's why <Nav> sits
  above it in App.jsx.

  `effects: true` is what makes a `data-speed` attribute do anything: an
  element at 0.94 drifts slower than the page, one at 1.06 outruns it. Nothing
  uses it at the moment — parallax and grid alignment pull against each other,
  and alignment won.
*/
export default function useSmoothScroll(route) {
  useEffect(() => {
    // Hijacking the scrollbar is exactly what this asks us not to do.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
    })

    const ctx = gsap.context(() => {
      /*
        fromTo with immediateRender: false, not from().

        from() hides the element the moment the tween is built and waits for the
        trigger to bring it back — so if the trigger never fires, the content is
        stuck invisible. Loading straight into /#work did exactly that: all four
        cards sat at opacity 0. This way nothing is hidden until the trigger
        actually runs, and a missed trigger just means no animation.
      */
      /* `y` is pulled out of vars rather than spread with the rest: it names
         where the element starts, and spreading it into the end state made it
         the destination too — a tween from 28 to 28, which left About's copy
         and portrait sitting permanently 28px below their own grid cells. */
      const reveal = (targets, { y = 40, ...vars } = {}) =>
        gsap.fromTo(
          targets,
          { y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            immediateRender: false,
            overwrite: 'auto',
            ...vars,
          },
        )

      gsap.utils.toArray('.work-card').forEach((card) => {
        reveal(card, { scrollTrigger: { trigger: card, start: 'top 88%' } })
      })

      /*
        `position: sticky` does nothing inside ScrollSmoother — the content is
        transformed rather than scrolled, so the sticky threshold is never
        crossed. Pinning is the equivalent that understands the smoother. The
        CSS `sticky` stays on the element for the reduced-motion path, where
        this hook bails out before any of this runs.
      */
      const pinned = document.querySelector('[data-pin]')
      if (pinned) {
        ScrollTrigger.create({
          trigger: pinned.parentElement,
          start: 'top 112px',
          end: 'bottom bottom',
          pin: pinned,
          pinSpacing: false,
        })
      }

      // Guarded: each page only has some of these.
      if (document.querySelector('#about')) {
        reveal('.about-reveal', {
          y: 28,
          duration: 0.7,
          stagger: 0.08,
          scrollTrigger: { trigger: '#about', start: 'top 80%' },
        })
      }
    })

    /*
      Trigger positions are measured from layout, and layout keeps moving after
      first paint — lazy images resolve, webfonts swap. Without a refresh the
      starts are stale and triggers fire at the wrong scroll position, or not
      at all.
    */
    // A new page starts at the top, not wherever the last one was left.
    smoother.scrollTop(0)

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    const settle = setTimeout(refresh, 600)

    /*
      In-page links have to go through the smoother — the browser's native jump
      moves the scrollbar while the smoothed content stays where it was.
    */
    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (id.length < 2) return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      smoother.scrollTo(target, true, 'top 120px')
      history.pushState(null, '', id)
    }
    document.addEventListener('click', onClick)

    return () => {
      clearTimeout(settle)
      window.removeEventListener('load', refresh)
      document.removeEventListener('click', onClick)
      ctx.revert()
      smoother.kill()
    }
  }, [route])
}

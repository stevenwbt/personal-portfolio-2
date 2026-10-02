import { useEffect, useRef } from 'react'

/*
  A silent screen recording.

  Plays only while it's on screen and pauses when it leaves, so a page of
  clips never has several decoding at once.

  `preload="none"` matters: with "metadata" Chromium ignores the hint and
  buffers the files anyway — six clips cost ~20MB before you've scrolled
  anywhere. With "none" nothing is fetched until the observer calls play(),
  so each clip is paid for only if it's actually reached.

  Under `prefers-reduced-motion` it never autoplays: it shows controls and
  waits to be asked.
*/
export default function Clip({ src, label, ratio, poster, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  const calm =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      controls={calm}
      /* Holds the box at the file's own shape until `preload="none"` lets the
         video load, so arriving metadata doesn't shove the page around. */
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={`w-full rounded-sm bg-veil ${className}`}
    />
  )
}

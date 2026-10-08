import { useEffect, useRef } from 'react'
import Link from './Link'
import { PROJECTS } from '../data/work'

/* So a browser that can't decode the animated format falls through to the
   still rather than to nothing. */
const MIME = { gif: 'image/gif', webp: 'image/webp', png: 'image/png' }
const mimeOf = (src) => MIME[src.split('.').pop().toLowerCase()]

/*
  A cover that's a video rather than an image.

  It plays only while the card is on screen, so a card scrolled past isn't
  still decoding. `preload="none"` keeps the file unfetched until then — the
  poster carries the card in the meantime, which is also what stands in under
  reduced motion, where it never autoplays at all.
*/
function CoverVideo({ project }) {
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
      { threshold: 0.3 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={project.video}
      poster={project.still}
      aria-label={project.alt}
      muted
      loop
      playsInline
      preload="none"
      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
    />
  )
}

/*
  Cards with a case study become links; the rest stay plain. The caption goes
  inside the link so the whole card is one target — `aria-label` then names it
  once, rather than the alt text and the caption both being read out.
*/
function Wrap({ project, children }) {
  if (!project.href) return children
  return (
    <Link to={project.href} aria-label={project.title} className="block">
      {children}
    </Link>
  )
}

export default function Work() {
  return (
    <section
      id="work"
      data-intro-hide
      aria-label="Selected work"
      className="mx-auto w-full max-w-[1800px] pt-[clamp(4rem,12vw,14rem)] pb-[clamp(6rem,15vw,17rem)]"
    >
      {/* Wider rows than columns: the caption now sits in the row gap, so an
          even gap would read as a caption crowding the card beneath it. */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 px-5 sm:grid-cols-5 sm:px-[2.2%]">
        {PROJECTS.map((project) => (
          /*
            The covers are finished artwork — they carry their own frame,
            hairline and rounded corners — so the card adds no ring, fill or
            clipping of its own, and `contain` guarantees nothing is cropped.

            28.3vw is the height at which both column widths match their art:
            the wide covers are 2.02:1, the narrow ones 1.32:1, and 2.02 / 1.32
            is 1.53 — near enough to the grid's 3:2 columns that the fit is
            within about a percent at every width.
          */
          <article key={project.id} className="work-card group" style={{ '--span': project.span }}>
            <Wrap project={project}>
            {/* The cover keeps the fixed height; the caption sits under it, so
                the article is as tall as both together. */}
            <div
              style={project.ratio ? { aspectRatio: project.ratio } : undefined}
              className={
                project.ratio
                  ? 'relative w-full'
                  : 'relative max-sm:aspect-[16/10] sm:h-[clamp(200px,28.3vw,505px)]'
              }
            >
            {!project.still ? (
              /* Artwork still to come: hold the slot rather than show nothing. */
              <span className="block h-full w-full rounded-xl bg-veil" />
            ) : project.video ? (
              /*
                A real video, so the GPU decodes it and the still stands in as
                the poster — shown before it loads, when reduced motion stops it
                autoplaying, and in any browser that can't take the format.
              */
              <CoverVideo project={project} />
            ) : (
              /*
                A cover that animates gets the still for anyone who asked for less
                motion — neither a GIF nor an animated WebP can be paused, so
                <picture> swaps the source rather than the behaviour. The still is
                the <img>, which makes it the fallback for both branches below.
              */
              <picture className="block h-full w-full">
                {project.motion && (
                  <>
                    <source media="(prefers-reduced-motion: reduce)" srcSet={project.still} />
                    <source srcSet={project.motion} type={mimeOf(project.motion)} />
                  </>
                )}
                <img
                  src={project.still}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </picture>
            )}
            </div>

            {/* `aria-hidden` because the link is already named by the same
                words — without it a screen reader reads the title twice. */}
            <h3
              aria-hidden="true"
              className="mt-3 text-[clamp(0.95rem,1.1vw,1.12rem)] leading-snug font-normal text-ink-soft transition-colors duration-200 group-hover:text-ink"
            >
              {project.title}
            </h3>
            </Wrap>
          </article>
        ))}
      </div>
    </section>
  )
}

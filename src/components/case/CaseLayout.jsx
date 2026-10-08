import { useEffect, useState } from 'react'
import Link from '../Link'
import { Eyebrow, Figure, Slot } from './parts'

/*
  The shell every case study shares: the article centred on the page, a pinned
  section index in the left margin, and the title block at the top.

  `sections` drives the index; each id must match a `<section id>` in children.
*/
export default function CaseLayout({
  title,
  hero,
  heroAlt,
  heroFit = 'cover',
  sections,
  meta,
  children,
}) {
  /*
    Which section is being read: the one crossing a thin band just above the
    middle of the screen. An observer rather than a scroll listener, so it
    reads where sections actually render even under the smoother's transforms.
  */
  const [active, setActive] = useState(null)
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  return (
    <main className="mx-auto w-full max-w-[1800px] px-5 pt-28 sm:px-[2.2%]">
      {/*
        Three tracks, so the article is centred on the page rather than sitting
        in whatever space the index leaves over. The index rides in the left
        track and the right one stays empty — equal margins either side, which
        is what puts the reading column under the middle of the screen.
      */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,61.5%)_minmax(0,1fr)]">
        <aside className="hidden pr-10 lg:block">
          {/* Pinned by ScrollTrigger when the smoother runs; CSS sticky only on
              the reduced-motion path, where the smoother never starts. Applying
              both at once stacks their offsets. */}
          <nav aria-label="Sections" data-pin className="motion-reduce:sticky motion-reduce:top-28">
            <Link
              to="/"
              className="mb-9 inline-block font-mono text-[0.72rem] tracking-[0.1em] text-ink-mute uppercase transition-colors duration-200 hover:text-ink"
            >
              &larr; Back
            </Link>

            {/* The current section wears the same acid highlight as selected
                text — acid as a text colour alone would vanish on white. */}
            <ul className="space-y-[1.1em] text-[clamp(0.95rem,1.15vw,1.15rem)] text-ink-mute">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? 'location' : undefined}
                    className={`-mx-1 px-1 transition-colors duration-200 ${
                      active === s.id ? 'bg-acid text-ink' : 'hover:text-ink'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0 space-y-[clamp(5rem,10vw,10rem)]">
          <header className="space-y-8">
            {/*
              Sized against the viewport so the title and the meta grid always
              clear the fold. The text below the image is a fixed ~380px, so the
              cap is that budget subtracted from the viewport, not a plain
              fraction of it — a fraction alone overflows on short screens.

              `contain` for artwork that must not lose its edges (it sits on
              white, so the letterboxing is invisible); `cover` for photographs,
              which should fill.
            */}
            {/* A study whose art isn't in yet still gets its shape held. */}
            {hero ? (
              <Figure
                src={hero}
                alt={heroAlt}
                className={
                  heroFit === 'contain'
                    ? 'max-h-[clamp(160px,min(48svh,100svh-420px),560px)] rounded-xl object-contain'
                    : 'h-[clamp(160px,min(48svh,100svh-420px),560px)] rounded-xl object-cover'
                }
              />
            ) : (
              <Slot label={heroAlt} ratio="2200 / 822" />
            )}

            <div>
              <h1 className="font-serif text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.05] font-normal">
                {title}
              </h1>

              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt>
                      <Eyebrow>{m.label}</Eyebrow>
                    </dt>
                    <dd className="mt-3 space-y-1 text-[0.95rem] leading-[1.45] text-ink-soft">
                      {m.values.map((v) => (
                        <div key={v}>{v}</div>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </header>

          {children}
        </article>
      </div>
    </main>
  )
}

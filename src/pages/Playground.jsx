import Clip from '../components/case/Clip'
import Link from '../components/Link'
import { PIECES } from '../data/playground'

/* Tiles that lead somewhere become links; the rest stay plain. */
function Tile({ piece, children }) {
  if (!piece.href) return children
  return (
    <Link to={piece.href} aria-label={piece.caption} className="block h-full w-full">
      {children}
    </Link>
  )
}

export default function Playground() {
  return (
    <main className="mx-auto w-full max-w-[1800px] px-5 pt-28 sm:px-[2.2%]">
      <header className="max-w-[46rem]">
        <h1 className="font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.2] font-normal text-balance">
          I make things for the screen, the senses, and everything in between.
        </h1>
        <p className="mt-4 text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.5] text-ink-soft">
          Currently building an independent fragrance label, and playing around with AI tools!
        </p>
      </header>

      {/*
        Each tile is shaped by its own artwork rather than a shared height, so
        `items-start` lets a row of squares sit shorter than a row of posters
        instead of stretching to match it.
      */}
      <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-2 items-start gap-5 sm:grid-cols-6">
        {PIECES.map((p) => (
          <figure
            key={p.id}
            style={{ '--span': p.span, aspectRatio: p.ratio }}
            className="playground-tile group relative m-0 overflow-hidden rounded-sm bg-veil"
          >
            <Tile piece={p}>
            {!p.ready ? (
              <span className="block h-full w-full" />
            ) : p.video ? (
              /* The still doubles as the poster, so the tile is filled before
                 `preload="none"` lets the video load — and stays filled for
                 anyone whose browser won't take the format. */
              <Clip
                src={p.video}
                poster={p.still}
                label={p.caption}
                className="h-full rounded-none object-cover"
              />
            ) : (
              /* A GIF can't be paused, so reduced motion gets the still. */
              <picture className="block h-full w-full">
                {p.still && (
                  <source media="(prefers-reduced-motion: reduce)" srcSet={p.still} />
                )}
                <img
                  src={p.image}
                  alt={p.caption}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </picture>
            )}
            </Tile>

            {p.ready && (
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pt-10 pb-3 font-mono text-[0.68rem] tracking-[0.08em] text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {p.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </main>
  )
}

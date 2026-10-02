import wordmark from '../assets/images/thanks-for-steing.svg'

/*
  The run-out before the footer lives here rather than on each page, so every
  page ends with the same breathing room and there's one value to change
  instead of four drifting apart.
*/
export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1800px] px-5 pt-[clamp(5rem,14vw,15rem)] pb-12 sm:px-[2.2%]">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-16">
        <h2 className="shrink-0">
          <img
            src={wordmark}
            alt="thanks for sté-ing"
            width="262"
            height="34"
            className="h-auto w-[clamp(10rem,21vw,20.5rem)]"
          />
        </h2>

        {/* Type matched to the Seattle clock on the landing stage (Footprint.jsx). */}
        <p className="max-w-[46ch] text-[clamp(0.78rem,0.92vw,1rem)] leading-relaxed sm:text-right lg:max-w-[30%]">
          Sté is short for Steven; and a small wink at &ldquo;stay.&rdquo; It ties together the
          things I make: products worth engaging with, art worth looking at, and fragrances that
          linger.
        </p>
      </div>

      <hr className="mt-8 border-0 border-t border-ink/15" />

      <div className="mt-5 flex flex-col gap-3 font-mono text-[clamp(0.75rem,0.95vw,0.9rem)] tracking-[0.08em] text-blush uppercase sm:flex-row sm:items-baseline sm:justify-between">
        <p>© 2026 Steven Heng + iced americanos + React</p>
        <a href="#resume" className="transition-colors duration-200 hover:text-ink">
          Resume
        </a>
      </div>
    </footer>
  )
}

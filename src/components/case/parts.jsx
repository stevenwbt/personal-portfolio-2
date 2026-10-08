/* The typographic pieces every case study is built from. */

export const Eyebrow = ({ children, className = '' }) => (
  <p
    className={`eyebrow font-mono text-[0.72rem] tracking-[0.12em] text-ink-mute uppercase ${className}`}
  >
    {children}
  </p>
)

export const H2 = ({ children, className = '' }) => (
  <h2
    className={`font-serif text-[clamp(1.5rem,2.3vw,2.05rem)] leading-[1.18] font-normal text-balance ${className}`}
  >
    {children}
  </h2>
)

export const Body = ({ children, className = '' }) => (
  <p className={`text-[clamp(0.95rem,1.1vw,1.08rem)] leading-[1.5] text-ink-soft ${className}`}>
    {children}
  </p>
)

/* A grey frame standing in for artwork that isn't in the repo yet. */
export const Slot = ({ label, ratio = '16 / 9', bg = 'bg-veil' }) => (
  <div
    className={`case-block flex items-end justify-start rounded-xl p-4 ${bg}`}
    style={{ aspectRatio: ratio }}
  >
    <span className="font-mono text-[0.62rem] tracking-[0.1em] text-ink-faint uppercase">
      {label}
    </span>
  </div>
)

export const Figure = ({ src, alt, className = '' }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    className={`case-block w-full ${className}`}
  />
)

/*
  An animated GIF with a still fallback. A GIF can't be paused, so anyone who
  asked for less motion gets the still instead.
*/
export const MotionFigure = ({ src, still, alt, className = '' }) => (
  <picture className={`case-block block ${className}`}>
    <source media="(prefers-reduced-motion: reduce)" srcSet={still} />
    <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full" />
  </picture>
)

/* A dashed card with a leading number — principles, frictions, phases. */
export const NumberedCard = ({ n, title, children }) => (
  <div className="rounded-md border border-dashed border-ink/20 px-5 py-4">
    <dt className="flex items-baseline gap-4">
      <span className="font-mono text-[0.78rem] text-ink-mute">{n}</span>
      <span className="font-serif text-[1.05rem]">{title}</span>
    </dt>
    <dd>
      <Body className="mt-1">{children}</Body>
    </dd>
  </div>
)

/* The bordered question / aside that punctuates a section. */
export const Callout = ({ label, children, accent = false }) => (
  <div
    className={`case-block space-y-2 px-5 py-4 ${
      accent
        ? 'rounded-md border border-dashed border-[#e0a86a] bg-[#fdf1e4]'
        : 'rounded-lg border border-ink/15'
    }`}
  >
    <Eyebrow>{label}</Eyebrow>
    {children}
  </div>
)

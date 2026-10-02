import CaseLayout from '../components/case/CaseLayout'
import Clip from '../components/case/Clip'
import { Body, Eyebrow, Figure, H2, Slot } from '../components/case/parts'
import {
  AREAS,
  CLIPS,
  IMAGES,
  LANDSCAPE,
  LEARNED,
  META,
  PATHS,
  PRINCIPLES,
  SECTIONS,
  STEX_FACTS,
  SURFACES,
  THEMES,
  WALKTHROUGH,
  WORKFLOWS,
} from '../data/case-accordant'

/* ── page-local pieces ───────────────────────────────────────────── */

/* One step in a workflow row. Replaced steps carry the accent. */
const Step = ({ children, changed }) => (
  <span
    className={`rounded-md border px-2.5 py-1 text-[0.85rem] whitespace-nowrap ${
      changed ? 'border-accent text-ink' : 'border-ink/25 text-ink'
    }`}
  >
    {children}
  </span>
)

/*
  A card that drops its number on the opposite side each row, the way the comp
  alternates them.

  `flip` is also which column it sits in, so it picks the squared-off corner:
  bottom-left in the left column, bottom-right in the right. Each card then
  points outward, like a message bubble's tail.
*/
const ThemeCard = ({ theme, flip }) => (
  <div
    className={`flex items-start gap-3 rounded-xl border border-ink/12 px-4 py-3 ${
      flip ? 'flex-row-reverse rounded-br-none text-left' : 'rounded-bl-none'
    }`}
  >
    <span className="font-mono text-[0.72rem] leading-6 text-ink-mute">{theme.n}</span>
    <div className="min-w-0 flex-1">
      <p className="font-serif text-[1.05rem] leading-snug">{theme.title}</p>
      <p className="text-[0.95rem] leading-snug text-ink-soft">{theme.body}</p>
    </div>
  </div>
)

/* The pull-quote that closes an argument: a rule down the left, no box. */
const Rule = ({ children, className = '' }) => (
  <div className={`case-block border-l-2 border-accent pl-4 ${className}`}>{children}</div>
)

const Arrow = ({ children }) => (
  <li className="flex gap-2 text-[0.98rem] leading-relaxed text-ink-soft">
    <span aria-hidden="true" className="text-ink-mute">
      &rarr;
    </span>
    <span>{children}</span>
  </li>
)

/* ── the page ────────────────────────────────────────────────────── */

export default function CaseAccordant() {
  return (
    <CaseLayout
      title="AI-Assisted Design System Browser"
      hero={IMAGES.hero}
      heroAlt="Accordant: search, understand, compare, choose, insert"
      heroFit="contain"
      sections={SECTIONS}
      meta={META}
    >
      {/* ── Overview ── */}
      <section id="overview" className="case-section scroll-mt-32">
        <Slot label="Overview visual" />
        <Eyebrow>Overview</Eyebrow>
        <H2>A decision-support layer for design systems.</H2>
        <Body>
          Accordant is a speculative product that sits between a design system and the designers who
          actually use it. It doesn&rsquo;t help author components or govern a library — it helps
          designers find the right component, understand it, and compare it against near-alternatives
          at the moment of choice.
        </Body>
        <Body>
          The project spans concept, information architecture, and UI design, built around a
          fictional enterprise company called Stex with two active design systems.
        </Body>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="case-section scroll-mt-32">
        <Eyebrow>Problem</Eyebrow>
        <H2>Access is not the same as understanding.</H2>
        <Body>
          Designers may have access to a Figma library and a documentation site, yet still struggle
          to answer the simplest question of all: which component should I use here? They fall back
          on memory, scattered docs, or team knowledge. The gap is not access. It&rsquo;s informed
          access.
        </Body>
        <Body>
          Most of the time, choosing is automatic — components fall into place from memory. But
          almost every designer hits moments where they need to check, and every check means leaving
          Figma, searching, reading, switching back, searching the library. Repeated across a
          project, that becomes a tax on flow. Multiplied across a team, it becomes a tax on the
          system itself.
        </Body>

        {/*
          Each row is one step per chip, so the rows shorten as the workflow
          does — the saving is visible without counting.
        */}
        <div className="case-block space-y-3">
          {WORKFLOWS.map((w) => (
            <div
              key={w.label}
              className="flex w-fit max-w-full flex-wrap items-center gap-2 rounded-lg border border-ink/12 px-3 py-2.5"
            >
              <span className="mr-2 font-mono text-[0.68rem] tracking-[0.1em] text-ink-mute uppercase">
                {w.label}
              </span>
              {w.steps.map((s, i) => (
                <Step key={`${s.t}-${i}`} changed={s.changed}>
                  {s.t}
                </Step>
              ))}
            </div>
          ))}
        </div>

      </section>

      <section className="case-section">
        <H2>What designers actually struggle with.</H2>
        <Body>
          I coded 14 practitioner accounts published between 2023 and 2026 using inductive thematic
          coding (Braun &amp; Clarke). Eight recurring themes emerged.
        </Body>

        {/* Rows step inward and the numbers switch sides, so the grid reads as
            a list of findings rather than a table. */}
        <div className="case-block grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          {THEMES.map((t, i) => (
            <div key={t.n} className={Math.floor(i / 2) % 2 === 1 ? 'sm:mx-6' : ''}>
              <ThemeCard theme={t} flip={i % 2 === 1} />
            </div>
          ))}
        </div>

        <Eyebrow>What I learned</Eyebrow>
        {/*
          Two independent columns, not grid rows. In a grid the boxes stretch to
          their row's height and their tops lock together; here each box hugs
          its own text and each column stacks on its own, so a short box leaves
          the next one free to rise — which is what the comp shows.
        */}
        <div className="case-block grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          {[0, 1].map((col) => (
            <div key={col} className="flex flex-col gap-4">
              {LEARNED.filter((_, i) => i % 2 === col).map((l) => (
                <p
                  key={l}
                  className="rounded-sm border border-dashed border-accent-hot px-4 py-3 text-[0.98rem] leading-relaxed text-ink-soft"
                >
                  {l}
                </p>
              ))}
            </div>
          ))}
        </div>

      </section>

      <section className="case-section">
        <H2>
          Most tools document and govern.
          <br />
          None help decide between near-alternatives at the moment of choice.
        </H2>

        <div className="case-block grid grid-cols-1 gap-4 sm:grid-cols-2">
          {LANDSCAPE.map((c) => (
            <div
              key={c.n}
              className={`space-y-4 rounded-sm px-5 py-5 ${
                c.ours ? 'border border-accent' : 'border border-dashed border-ink/25'
              }`}
            >
              <p className="font-mono text-[0.7rem] tracking-[0.1em] text-ink-mute uppercase">
                {c.n} / {c.kind}
              </p>
              {/* The marks carry their own grounds, so no tile behind them. */}
              <img
                src={c.logo}
                alt=""
                aria-hidden="true"
                width="60"
                height="60"
                loading="lazy"
                decoding="async"
                className="size-9"
              />
              <p className="font-serif text-[1.3rem]">{c.name}</p>
              <div>
                <Eyebrow>Strength</Eyebrow>
                <Body className="mt-1.5">{c.strength}</Body>
              </div>
              <div>
                <Eyebrow>Gap</Eyebrow>
                <Body className="mt-1.5">{c.gap}</Body>
              </div>
            </div>
          ))}
        </div>

        <Rule>
          <Body>
            Comparison is the missing primary view. Every platform sells to DS teams, but none is
            built for the consumer of a design system.
          </Body>
        </Rule>
      </section>

      {/* ── Design process ── */}
      <section id="design-principles" className="case-section scroll-mt-32">
        <Eyebrow>Design Principles</Eyebrow>
        <H2>Decisions, not preferences</H2>

        <dl className="case-block grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title}>
              <dt className="font-serif text-[1.15rem] text-ink-soft">{p.title}</dt>
              <dd className="mt-1.5 flex gap-2 text-[1rem] text-ink-soft">
                <span aria-hidden="true" className="text-ink-mute">
                  &rarr;
                </span>
                <span>{p.to}</span>
              </dd>
            </div>
          ))}
        </dl>

      </section>

      <section className="case-section">
        <H2>One product, two surfaces.</H2>
        <Body>
          The browser supports depth, documentation, and onboarding. The plugin supports in-context
          action.
        </Body>

        <div className="case-block grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SURFACES.map((s) => (
            <div key={s.label} className="space-y-4">
              {/*
                The frame is the same size for both, so the two cards line up.
                The screen inside is not: it sits at its true size relative to
                the other surface, centred in the grey. Nothing is cropped —
                the plugin just genuinely takes up less room than the browser.
              */}
              <div className="flex aspect-[4/3] items-center justify-center rounded-sm bg-black p-5">
                <img
                  src={IMAGES[s.image]}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ maxWidth: `${s.scale * 100}%` }}
                  className="max-h-full w-auto rounded-xs object-contain"
                />
              </div>
              <div className="space-y-3 rounded-sm border border-dashed border-ink/25 px-5 py-4">
                <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-mute uppercase">
                  {s.label}
                </p>
                <p className="font-serif text-[1.3rem]">{s.title}</p>
                <ul className="space-y-2.5">
                  {s.points.map((pt) => (
                    <Arrow key={pt}>{pt}</Arrow>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </section>

      <section className="case-section">
        <H2>Four areas, one decision flow.</H2>
        <dl className="case-block grid grid-cols-1 gap-4 sm:grid-cols-2">
          {AREAS.map((a) => (
            <div key={a.n} className="space-y-3 rounded-xl border border-ink/12 px-5 py-4">
              <dt className="font-mono text-[0.72rem] text-ink-mute">{a.n}</dt>
              <dd>
                <p className="font-serif text-[1.1rem]">{a.title}</p>
                <Body>{a.body}</Body>
              </dd>
            </div>
          ))}
        </dl>

        <Rule>
          <p className="text-[clamp(1rem,1.3vw,1.25rem)] text-ink-soft">
            Search &rarr; Understand &rarr; Compare &rarr; Choose &rarr; Insert
          </p>
        </Rule>

      </section>

      <section id="how-it-works" className="case-section scroll-mt-32">
        <Eyebrow>How It Works</Eyebrow>
        <H2>Two surfaces. Four areas. One decision flow.</H2>
        <Body>
          The walkthrough below is set inside Stex, a fictional enterprise stack used as a working
          context for the prototype.
        </Body>

        <Figure src={IMAGES.stex} alt="Stex, the fictional enterprise stack" />

        <ul className="case-block space-y-3">
          {STEX_FACTS.map((f) => (
            <Arrow key={f}>{f}</Arrow>
          ))}
        </ul>

      </section>

      <section className="case-section">
        <H2>Two ways to get started.</H2>
        <Body>
          Whether your design system is documented or just lived-in, Accordant meets you where you
          are.
        </Body>

        <div className="case-block grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PATHS.map((p) => (
            <div key={p.label} className="space-y-3 rounded-sm border border-ink/20 px-5 py-4">
              <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-mute uppercase">
                {p.label}
              </p>
              <p className="font-serif text-[1.3rem]">{p.title}</p>
              <p className="text-[0.98rem] font-semibold">{p.lede}</p>
              <Body>{p.body}</Body>
            </div>
          ))}
        </div>

        <div className="case-block rounded-sm border border-dashed border-accent-hot bg-accent-wash px-5 py-4">
          <Eyebrow>Both paths</Eyebrow>
          <p className="mt-2 font-serif text-[1.25rem]">Designers sign in to the plugin once.</p>
        </div>

      </section>

      <section className="case-section">
        {/*
          The walkthrough: each screen at the article's full width with its
          caption underneath, so the screen is read first and the copy explains
          what was just seen. Beside a column of copy these ran at 70% width —
          too small to make out a component name.
        */}
        {WALKTHROUGH.map((w) => (
          <figure key={w.n} className="case-block m-0">
            {w.clip ? (
              <Clip
                src={CLIPS[w.clip].src}
                ratio={CLIPS[w.clip].ratio}
                label={`${w.area}: ${w.title}`}
              />
            ) : (
              <Slot label={`${w.area} screen`} ratio="16 / 9" />
            )}

            <figcaption className="mt-6">
              <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-mute uppercase">
                {w.n} | {w.area}
              </p>
              <p className="mt-[15px] font-serif text-[clamp(1.25rem,1.8vw,1.6rem)] leading-[1.15] text-balance">
                {w.title}
              </p>
              <Body className="mt-[20px]">{w.body}</Body>
            </figcaption>
          </figure>
        ))}
      </section>

      {/* ── Reflection ── */}
      <section id="reflection" className="case-section scroll-mt-32">
        <Eyebrow>Reflection</Eyebrow>
        <H2>The library isn&rsquo;t the product. The decision is.</H2>
        <Body>
          Designers don&rsquo;t lack access. They lack a structural surface for the decision
          they&rsquo;re already making. Accordant treats comparison as the primary view, not an
          afterthought, and meets the work where it actually happens: inside Figma.
        </Body>
        <Body>
          If Figma libraries make components accessible, Accordant&rsquo;s job is to make them
          understandable — and to teach by use, not by document.
        </Body>

        <Figure src={IMAGES.nextSteps} alt="Next steps for Accordant" className="rounded-lg" />

        <div className="case-block">
          <Clip src={CLIPS.future.src} ratio={CLIPS.future.ratio} label="Where Accordant goes next" />
        </div>
      </section>
    </CaseLayout>
  )
}

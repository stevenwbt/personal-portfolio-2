import CaseLayout from '../components/case/CaseLayout'
import { Body, Callout, Eyebrow, H2, NumberedCard, Slot } from '../components/case/parts'
import {
  FEATURES,
  GUARDRAILS,
  LANDSCAPE,
  LOOP,
  META,
  METHODS,
  POSITIONING,
  REFRAME,
  SECTIONS,
  SIGNALS,
} from '../data/case-switchback'

/* ── page-local pieces ───────────────────────────────────────────── */

/* One row of the competitive table. Ours carries the accent so the argument
   reads down the column rather than needing a caption. */
const LandscapeRow = ({ row }) => (
  <div
    className={`grid grid-cols-1 gap-1 border-t py-3 sm:grid-cols-[minmax(0,10rem)_minmax(0,14rem)_minmax(0,1fr)] sm:gap-6 ${
      row.ours ? 'border-accent' : 'border-ink/12'
    }`}
  >
    <p className={`text-[0.98rem] ${row.ours ? 'text-ink' : 'text-ink'}`}>{row.product}</p>
    <p className={`text-[0.95rem] ${row.ours ? 'text-accent' : 'text-ink-soft'}`}>{row.gravity}</p>
    <p className="text-[0.95rem] text-ink-soft">{row.means}</p>
  </div>
)

/* ── the page ────────────────────────────────────────────────────── */

export default function CaseSwitchback() {
  return (
    <CaseLayout
      title="Switchback"
      heroAlt="Switchback: a hiking app for the trip, and the people, not the trail"
      heroFit="contain"
      sections={SECTIONS}
      meta={META}
    >
      {/* ── Overview ── */}
      <section id="overview" className="case-section scroll-mt-32">
        <Eyebrow>Overview</Eyebrow>
        <H2>A hiking app for the trip, and the people, not the trail.</H2>
        <Body>
          Switchback is a concept for the coordination layer that sits between trail discovery and
          the trailhead — built around groups, preparation, daylight, and conditions that change
          while you&rsquo;re already walking.
        </Body>
        <Body>
          AllTrails tells you what a trail is. Switchback tells you whether your group gets out
          before dark.
        </Body>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="case-section scroll-mt-32">
        <Eyebrow>Problem</Eyebrow>
        <H2>One day hike that stopped being a day hike.</H2>
        <Body>
          We had the route. What we didn&rsquo;t have was a shared group state. A day hike became an
          unplanned overnight — not because the trail was invisible, but because our assumptions
          lived separately.
        </Body>

        <Callout label="The reframe" accent>
          <Body>
            This was not a navigation problem. It was a social coordination problem. The information
            existed somewhere; what was missing was shared ownership, shared decisions, and shared
            awareness.
          </Body>
        </Callout>

        <div className="case-block grid grid-cols-1 gap-4 sm:grid-cols-2">
          {REFRAME.map((r) => (
            <NumberedCard key={r.n} n={r.n} title={r.title}>
              {r.body}
            </NumberedCard>
          ))}
        </div>
      </section>

      {/* ── Research ── */}
      <section id="research" className="case-section scroll-mt-32">
        <Eyebrow>Research</Eyebrow>
        <H2>Concept-stage research, grounded in a trip that actually went wrong.</H2>
        <Body>
          No user study yet. The concept rests on lived experience, desk research, and a competitive
          audit — named plainly, because a concept shouldn&rsquo;t borrow the authority of fieldwork
          it hasn&rsquo;t done.
        </Body>

        <div className="case-block grid grid-cols-1 gap-4 sm:grid-cols-2">
          {METHODS.map((m) => (
            <div key={m.label} className="space-y-2 rounded-xl border border-ink/12 px-5 py-4">
              <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-mute uppercase">
                {m.label}
              </p>
              <Body>{m.body}</Body>
            </div>
          ))}
        </div>

        <Body>
          Hiking is mainstream, and active experiences are increasingly social. The opportunity
          isn&rsquo;t to invent social behaviour around the outdoors — it already happens, across
          text threads, links and ad-hoc plans.
        </Body>

        <div className="case-block grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SIGNALS.map((s) => (
            <div key={s.stat} className="metric space-y-1" style={{ '--span': 1 }}>
              <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-none">{s.stat}</p>
              <p className="text-[0.95rem] leading-snug text-ink-soft">{s.body}</p>
              <p className="font-mono text-[0.62rem] tracking-[0.08em] text-ink-faint uppercase">
                {s.source}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="case-section">
        <H2>The market is crowded, but every product owns a different job.</H2>
        <Body>
          Eight products, eight centres of gravity. None of them centres the full small-group
          day-hike workflow: choosing, committing, preparing, adapting and remembering together.
        </Body>

        <div className="case-block">
          <div className="hidden grid-cols-[minmax(0,10rem)_minmax(0,14rem)_minmax(0,1fr)] gap-6 pb-2 font-mono text-[0.62rem] tracking-[0.1em] text-ink-mute uppercase sm:grid">
            <p>Product</p>
            <p>Centre of gravity</p>
            <p>What that means</p>
          </div>
          {LANDSCAPE.map((row) => (
            <LandscapeRow key={row.product} row={row} />
          ))}
        </div>

        <Callout label="The wedge">
          <Body>
            The gap isn&rsquo;t another hiking app. It&rsquo;s the social workflow around a small
            group day hike — the part that currently lives in a group chat.
          </Body>
        </Callout>
      </section>

      {/* ── The product ── */}
      <section id="product" className="case-section scroll-mt-32">
        <Eyebrow>The Product</Eyebrow>
        <H2>Switchback turns a trail into a group space.</H2>
        <Body>
          The core object isn&rsquo;t a route file or an activity post. It&rsquo;s a shared trip that
          changes as the group makes decisions — so everyone can see what has been decided, what
          is missing, and what has changed.
        </Body>

        <Slot label="Trip space: logistics, group, map and trail" ratio="16 / 9" />

        <Body>
          The social loop begins before the trail and continues after it. Five small-group jobs, not
          a public content feed.
        </Body>

        <div className="case-block grid grid-cols-1 gap-3 sm:grid-cols-5">
          {LOOP.map((l) => (
            <div key={l.n} className="space-y-2 rounded-xl border border-ink/12 px-4 py-3">
              <p className="font-mono text-[0.68rem] text-ink-mute">{l.n}</p>
              <p className="font-serif text-[1.05rem] leading-snug">{l.title}</p>
              <p className="text-[0.9rem] leading-snug text-ink-soft">{l.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case-section">
        {/* Each feature: the screen at full width with its caption underneath,
            the same rhythm the Accordant walkthrough uses. */}
        {FEATURES.map((f) => (
          <figure key={f.n} className="case-block m-0">
            <Slot label={`${f.area} screen`} ratio="16 / 9" />
            <figcaption className="mt-6">
              <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-mute uppercase">
                {f.n} | {f.area}
              </p>
              <p className="mt-[15px] font-serif text-[clamp(1.25rem,1.8vw,1.6rem)] leading-[1.15] text-balance">
                {f.title}
              </p>
              <Body className="mt-[20px]">{f.body}</Body>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="case-section">
        <H2>Social, without becoming social media.</H2>
        <Body>
          The social graph is about trusted company, not reach. These are the constraints that keep
          it a coordination tool rather than a feed.
        </Body>

        <ul className="case-block flex flex-wrap gap-2">
          {GUARDRAILS.map((g) => (
            <li
              key={g}
              className="rounded-md border border-ink/25 px-2.5 py-1 text-[0.85rem] whitespace-nowrap"
            >
              {g}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Positioning ── */}
      <section id="positioning" className="case-section scroll-mt-32">
        <Eyebrow>Positioning</Eyebrow>
        <H2>
          Switchback owns the moment between &ldquo;found a hike&rdquo; and &ldquo;ready to
          go&rdquo;.
        </H2>
        <Body>
          It isn&rsquo;t trying to out-map Gaia, out-discover AllTrails, or out-social Strava. It
          connects the people around the trail.
        </Body>

        <div className="case-block grid grid-cols-1 gap-4 sm:grid-cols-3">
          {POSITIONING.map((p) => (
            <NumberedCard key={p.n} n={p.n} title={p.title}>
              {p.body}
            </NumberedCard>
          ))}
        </div>

        <div className="case-block border-l-2 border-accent pl-4">
          <p className="font-serif text-[clamp(1.2rem,1.8vw,1.6rem)] leading-[1.2]">
            Maps get you through the trail. Switchback gets the group there together.
          </p>
        </div>
      </section>
    </CaseLayout>
  )
}

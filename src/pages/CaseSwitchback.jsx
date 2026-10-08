import CaseLayout from '../components/case/CaseLayout'
import Clip from '../components/case/Clip'
import { Body, Callout, Eyebrow, Figure, H2, NumberedCard, Slot } from '../components/case/parts'
import appIcons from '../assets/switchback/app-icons.png'
import {
  FEATURES,
  GALLERY_TALL,
  GALLERY_WIDE,
  GUARDRAILS,
  IMAGES,
  LANDSCAPE,
  LOOP,
  META,
  METHODS,
  POSITIONING,
  REFRAME,
  SECTIONS,
  SIGNALS,
  TRIP,
  TRIP_SPACE,
} from '../data/case-switchback'

/* ── page-local pieces ───────────────────────────────────────────── */

/* '1500 / 940' -> 1.596 */
const ratioOf = (r) => {
  const [w, h] = r.split('/').map(Number)
  return w / h
}

/* The tallest a media row is allowed to get, whatever it holds. */
const ROW_MAX_H = 630

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
      hero={IMAGES.hero}
      heroAlt="Switchback: a hiking app for the trip, and the people, not the trail"
      heroFit="contain"
      sections={SECTIONS}
      meta={META}
    >
      {/* ── Overview ── */}
      <section id="overview" className="case-section scroll-mt-32">
        <Eyebrow>Overview</Eyebrow>
        <H2>Picking the trail is only the start.</H2>
        <Body>
        You’ve found a hike. Now there’s a group chat to organize, gear to sort out, 
        and the question of whether everyone can make it back before dark. 
        A late start or a slower pace can change the whole day.
        </Body>
        <Body>Switchback is a hiking app concept that helps groups work through those details, 
          from preparing together to adjusting the plan on the trail.</Body>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="case-section scroll-mt-32">
        <Eyebrow>Problem</Eyebrow>
        <H2>We planned a day hike. We ended up staying overnight.</H2>
        <Body>
        We knew which trail to take, but we hadn’t talked through enough of the details. 
        What was everyone bringing? What would we do if we fell behind? 
        We each had assumptions, and we didn’t realize how much we’d left unspoken 
        until the day went off plan.
        </Body>

        <div className="case-block grid grid-cols-1 gap-8 rounded-xl border border-ink/12 bg-veil/45 px-6 py-7 sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-8">
          {TRIP.map((t) => (
            <figure key={t.phase} className="m-0">
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full rounded-lg object-cover"
              />
              <figcaption className="mt-3 space-y-1">
                <p className="font-serif text-[1.05rem] leading-none">{t.phase}</p>
                <p className="font-mono text-[0.78rem] text-ink-soft">
                  <time>{t.time}</time>
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <Callout label="What I took from it" accent>
          <Body>
          Planning a group hike means making sure everyone knows what they’re responsible for 
          and when it’s time to rethink the plan. 
          Those were the gaps I wanted to explore with Switchback.
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
        <H2>That hike gave me a starting point.</H2>
        <Body>
        I revisited our trip, compared existing products, 
        and reviewed research on outdoor preparation and group activities. 
        These informed the concept although I haven’t conducted user studies yet.
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
        The question I wanted to explore: how can scattered messages become a plan everyone understands?
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
        <H2>Where does planning a hike together fit in?</H2>
        <Body>
        I reviewed eight products covering trail discovery, navigation, and trip planning. 
        This helped narrow Switchback’s focus: helping small groups prepare for a day hike and adjust the plan together.
        </Body>

        {/* The eight apps sitting in a frosted, dock-like tray. */}
        <div className="case-block">
          <div className="w-full rounded-[1.75rem] border border-white/70 bg-white/45 px-3 py-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-ink/8 backdrop-blur-xl backdrop-saturate-150">
            <img
              src={appIcons}
              alt="App icons for AllTrails, Gaia GPS, FarOut, onX Backcountry, Komoot, Strava, TrailSync, and Switchback"
              loading="lazy"
              decoding="async"
              className="w-full"
            />
          </div>
        </div>

        <div className="case-block">
          <div className="hidden grid-cols-[minmax(0,10rem)_minmax(0,14rem)_minmax(0,1fr)] gap-6 pb-2 font-mono text-[0.62rem] tracking-[0.1em] text-ink-mute uppercase sm:grid">
            <p>Product</p>
            <p>Main focus</p>
            <p>What it offers</p>
          </div>
          {LANDSCAPE.map((row) => (
            <LandscapeRow key={row.product} row={row} />
          ))}
        </div>

        <Callout label="The opportunity">
          <Body>
            Help small groups work out the details that get buried in a group chat: who’s bringing what,
            when to leave, and what to do if plans change.          
           </Body>
        </Callout>
      </section>

      {/* ── The product ── */}
      <section id="product" className="case-section scroll-mt-32">
        <Eyebrow>The Product</Eyebrow>
        <H2>One place to plan hike together.</H2>
        <Body>
          Each hike has a shared space where everyone can see the plan, 
          take on responsibilities, and keep track of changes.
        </Body>

        <Figure
          src={TRIP_SPACE}
          alt="Three phones showing Switchback: browsing trails, the finished-trip recap, and a trip's group and date"
          className="rounded-xl"
        />

        <Body>
          From the first invite to looking back on the day:
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
            {f.frame ? (
              /*
                Several clips set inside one box the shape of a single landscape
                clip. They share the box's height and each takes the width its
                own ratio asks for, so they sit level and uncropped.
              */
              <div
                style={{ aspectRatio: f.frame, '--row-max': `${Math.round(ROW_MAX_H * ratioOf(f.frame))}px` }}
                className="mx-auto flex w-full items-center justify-center gap-[3%] overflow-hidden rounded-[1.75rem] border border-ink/12 bg-white p-[3%] max-lg:max-w-[360px] lg:max-w-[var(--row-max)]"
              >
                {f.media.map((m) => (
                  <div
                    key={m.src}
                    style={{ aspectRatio: m.ratio }}
                    className="h-full overflow-hidden rounded-[clamp(0.5rem,1.4vw,1.1rem)] border border-ink/12"
                  >
                    <Clip
                      src={m.src}
                      poster={m.poster}
                      label={`${f.title} — ${m.label}`}
                      className="block h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : f.media ? (
              /*
                Each box grows in proportion to its own aspect ratio, so a row
                always comes out level however many clips it holds and whatever
                shape they are — a 0.46 phone beside a 0.93 screen, or one 1.6
                landscape on its own — and the row fills the column exactly.

                The cap stops a tall clip from running away: left to the column
                width alone, a lone phone frame would stand nearly 2,000px.
                Stacked below `lg`, where side by side leaves nothing readable.
              */
              <div
                style={{
                  '--row-max': `${Math.round(ROW_MAX_H * f.media.reduce((n, m) => n + ratioOf(m.ratio), 0)) + (f.media.length - 1) * 16}px`,
                }}
                className="mx-auto flex flex-col items-center gap-4 max-lg:max-w-[360px] lg:max-w-[var(--row-max)] lg:flex-row lg:items-stretch"
              >
                {f.media.map((m) => (
                  <div
                    key={m.src}
                    style={{ '--grow': ratioOf(m.ratio), aspectRatio: m.ratio }}
                    className="w-full overflow-hidden rounded-[1.75rem] border border-ink/12 lg:w-auto lg:min-w-0 lg:grow-[var(--grow)] lg:basis-0"
                  >
                    <Clip
                      src={m.src}
                      poster={m.poster}
                      label={`${f.title} — ${m.label}`}
                      className="block h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Slot label={`${f.area} screen`} ratio="16 / 9" />
            )}
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
        <H2>Built around people you're hiking with.</H2>
        <Body>
        Trips are invite-only, and conversations, responsibilities, and recaps 
        stay within the group. Each feature helps people prepare, make decisions, 
        or remember the day together.
        </Body>
      </section>

      {/* ── Positioning ── */}
      <section id="positioning" className="case-section scroll-mt-32">
        <Eyebrow>Positioning</Eyebrow>
        <H2>
          From "found a hike" to "ready to go".
        </H2>
        <Body>
          Switchback brings the group’s plans into one place: who’s coming, what everyone’s bringing, and when to leave. 
          That same space stays useful on the trail as plans change, and afterward as a shared record of the day.      
        </Body>
      </section>

      {/* ── Reflection ── */}
      <section id="reflection" className="case-section scroll-mt-32">
        <Eyebrow>Reflection</Eyebrow>
        <H2>I started with a hike I wished had gone differently.</H2>
        <Body>
          Working on Switchback pushed me to think about how one decision affects the rest of a
          trip. A later start changes the daylight available. A different ride changes what needs
          booking. I wanted the design to make those connections easier for everyone to see.
        </Body>
        <Body>
          My own experience gave me a starting point, but I still need to understand how other
          groups plan. Next, I’d test whether people can agree on a plan, divide responsibilities,
          and notice when something needs to change, without one person having to manage it all.
        </Body>
        <Body>
         But overall, it was a BEAUTIFUL hike for sure! A lot of memories and a lot of fun. 
          Will definitely be back to hike this trail again (with Switchback..). Cheers to my friends, Darren and Mellvin 
          for doing this hike with me! Here are some photos from the hike.
        </Body>
        <Body>
          Note: if you search "Nada Lake" on Wikipedia, that picture that is being displayed was literally where we stayed overnight.
        </Body>
        <div className="case-block space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {GALLERY_WIDE.map((g) => (
              <img
                key={g.src}
                src={g.src}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {GALLERY_TALL.map((g) => (
              <img
                key={g.src}
                src={g.src}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      </section>
    </CaseLayout>
  )
}

import CaseLayout from '../components/case/CaseLayout'
import Clip from '../components/case/Clip'
import { Body, Callout, Eyebrow, H2, NumberedCard } from '../components/case/parts'
import { FEATURES, FRICTIONS, IMAGES, META, PAGES, SECTIONS, VALUES } from '../data/case-flux'

export default function CaseFlux() {
  return (
    <CaseLayout
      title="FLUX"
      hero={IMAGES.hero}
      heroAlt="FLUX: a unified workspace for distributed teams"
      heroFit="contain"
      sections={SECTIONS}
      meta={META}
    >
      {/* ── Overview ── */}
      <section id="overview" className="case-section scroll-mt-32">
        <Eyebrow>Overview</Eyebrow>
        <H2>A unified platform for distributed teams.</H2>
        <Body>
          FLUX is a personal project exploring what a human-centered productivity platform could
          look like for remote teams: one that brings together communication, scheduling, and task
          tracking without the noise that most async tools accumulate.
        </Body>
        <Body>
          The project spans user research, information architecture, and UI design, built around the
          core tension between staying connected and staying focused across timezones.
        </Body>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="case-section scroll-mt-32">
        <Eyebrow>Problem</Eyebrow>
        <H2>
          As remote work became the norm, every tool got louder and the work got quieter.
        </H2>
        <Body>
          Distributed teams shared a common set of problems: scattered communications, timezone
          confusion, fragmented tools, and inconsistent documentation. Project updates were lost
          across multiple platforms, important context buried in long chat logs, and scheduling
          meetings across time zones often led to miscommunication.
        </Body>

        <Callout label="The brief">
          <Body>
            Design a unified, human-centered platform that could bring clarity, connection, and
            control back to remote workflows, without overwhelming users with complexity.
          </Body>
        </Callout>
      </section>

      {/* ── Research ── */}
      <section id="research" className="case-section scroll-mt-32">
        <Eyebrow>Research</Eyebrow>
        <H2>Eight remote professionals. Four recurring frictions.</H2>
        <Body>
          I interviewed eight remote professionals across product, design, marketing, and
          engineering. Several core themes emerged.
        </Body>

        <dl className="case-block grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FRICTIONS.map((f) => (
            <NumberedCard key={f.n} n={f.n} title={f.title}>
              {f.body}
            </NumberedCard>
          ))}
        </dl>
      </section>

      <section className="case-section">
        <H2>Slack, Notion, Teams. None do all three.</H2>
        <Body>
          A review of existing tools revealed a clear gap in solutions that effectively balance
          asynchronous clarity, human connection, and centralized control, especially for
          distributed teams. Slack, Notion, and Teams each address parts of the remote workflow, but
          none offer a seamless experience across communication, task management, and timezone
          coordination.
        </Body>

        {/*
          The frame spans the column; the diagram inside stays at ~38rem and
          centres. Sizing the frame to the artwork instead would leave a narrow
          box floating in a wide column — and the artwork can't grow, because
          at full width its own labels dwarf the prose around it.
        */}
        <div className="case-block rounded-sm border border-ink/15 p-6">
          <img
            src={IMAGES.landscape}
            alt="Competitive analysis of Slack, Notion and Teams against clarity, connection and control"
            loading="lazy"
            decoding="async"
            className="mx-auto block w-full max-w-[38rem]"
          />
        </div>

        <Body>
          FLUX is uniquely positioned to fill this gap by integrating Smart Threads, Timezone
          Awareness, and a built-in calling and support system, delivering on the core values of
          clarity, connection, and control.
        </Body>

        <dl className="case-block grid grid-cols-1 gap-3 sm:grid-cols-3">
          {VALUES.map((v) => (
            <NumberedCard key={v.n} n={v.n} title={v.title}>
              {v.body}
            </NumberedCard>
          ))}
        </dl>
      </section>

      {/* ── Design process ── */}
      <section id="design-process" className="case-section scroll-mt-32">
        <Eyebrow>Design Process</Eyebrow>
        <H2>Four pages, one async-first rhythm.</H2>
        <Body>
          FLUX is organized around four main pages. Each section branches into key features that
          support remote teams in managing async clarity, centralized control, and meaningful
          collaboration.
        </Body>

        <dl className="case-block grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PAGES.map((p) => (
            <NumberedCard key={p.n} n={p.n} title={p.title}>
              {p.body}
            </NumberedCard>
          ))}
        </dl>
      </section>

      <section className="case-section">
        <H2>Six interactions that make async feel intentional.</H2>

        {FEATURES.map((f) => (
          <div
            key={f.n}
            className="case-block grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]"
          >
            <div className="space-y-3">
              <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-mute uppercase">
                {f.n} &middot; {f.area}
              </p>
              <p className="font-serif text-[clamp(1.25rem,1.8vw,1.6rem)] leading-[1.15] text-balance">
                {f.title}
              </p>
              <Body>{f.body}</Body>
            </div>
            <Clip src={f.clip} label={`${f.area}: ${f.title}`} />
          </div>
        ))}
      </section>

      {/* ── Reflection ── */}
      <section id="reflection" className="case-section scroll-mt-32">
        <Eyebrow>Reflection</Eyebrow>
        <H2>Async work isn&rsquo;t just productive. It&rsquo;s emotional.</H2>
        <Body>
          FLUX was deeply personal, built from my own experience working remotely during my second
          internship. I realized how often things get lost across tools, time zones, and threads.
        </Body>
        <Body>
          Through this project I learned to design for asynchronous team dynamics, prioritize
          clarity and focus, and balance AI support with human control.
        </Body>
        <Body>
          A professor I tested with suggested incorporating team &ldquo;pulse&rdquo; features — a
          reminder that even in async environments, emotional insight and alignment matter just as
          much as productivity. The next iteration of FLUX would lean further into that signal: not
          more tools, but more care embedded in the ones that already exist.
        </Body>
      </section>
    </CaseLayout>
  )
}

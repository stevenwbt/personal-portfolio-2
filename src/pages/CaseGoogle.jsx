import CaseLayout from '../components/case/CaseLayout'
import {
  Body,
  Callout,
  Eyebrow,
  Figure,
  H2,
  MotionFigure,
  NumberedCard,
} from '../components/case/parts'
import {
  IMAGES,
  META,
  METRICS,
  PIPELINE_STAGES,
  PIVOT,
  PRINCIPLES,
  PROBLEM_STATS,
  SECTIONS,
} from '../data/case-google'

export default function CaseGoogle() {
  return (
    <CaseLayout
      title="Google Android Security"
      hero={IMAGES.hero}
      heroAlt="The patch-porting tool: the CLI open in an editor beside the stepper screens"
      heroFit="contain"
      sections={SECTIONS}
      meta={META}
    >
      {/* ── Overview ── */}
      <section id="overview" className="case-section scroll-mt-32">
        {/* The capstone team, as the capstone team actually looked. */}
        <Figure
          src={IMAGES.bereal}
          alt="Five BeReal captures from the capstone: the team at their desks, a Google office, and someone face-down on the floor"
          className="rounded-xl"
        />
        <Eyebrow>Overview</Eyebrow>
          <H2>Automating Android security patch porting with LLMs.</H2>
          <Body>
            Google Android Security is a capstone project developed in partnership with Google,
            addressing the time-intensive and error-prone process of backporting security
            patches across the Android ecosystem. The system uses LLMs and agentic workflows to
          automate what engineers previously resolved by hand.
        </Body>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="case-section scroll-mt-32">
        <Eyebrow>Problem</Eyebrow>
        <H2>Security patch backporting is slow, manual, and inconsistent.</H2>
        <Body>
          In the Android ecosystem, security patches developed upstream must be ported to dozens
          of downstream branches maintained by OEM partners. Tools like git cherry-pick handle
          simple cases, but many patches require manual resolution due to structural or API
          differences, a process that averages 30 minutes per vulnerability. That effort slows
          deployment, risks inconsistent coverage across devices, and compounds across every OEM
          partner at scale.
        </Body>

        <dl className="case-block grid grid-cols-1 gap-8 sm:grid-cols-3">
          {PROBLEM_STATS.map((s) => (
            <div key={s.caption}>
              <dt className="font-serif text-[clamp(1.5rem,2.4vw,2.1rem)] leading-none">
                {s.figure}
              </dt>
              <dd className="mt-3">
                <Eyebrow>{s.caption}</Eyebrow>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Pipeline ── */}
      <section className="case-section">
        <H2>A four-stage automated pipeline.</H2>
        <Body>
          The pipeline ingests Vanir vulnerability reports and runs them through a sequential
          pipeline: parsing, applying, fixing, and validating, so engineers receive a
          ready-to-merge patch rather than a conflict to resolve by hand.
        </Body>

        <MotionFigure
          src={IMAGES.pipeline}
          still={IMAGES.pipelineStill}
          alt="Patches flow from upstream Android branches through Vanir and the automated patch port, out to each downstream OEM branch"
          className="rounded-lg"
        />

        <dl className="case-block space-y-5">
          {PIPELINE_STAGES.map((s) => (
            <div key={s.title}>
              <dt className="font-serif text-[1.05rem]">{s.title}</dt>
              <dd>
                <Body className="mt-1">{s.body}</Body>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Evaluation ── */}
      <section className="case-section">
        <H2>Tested across 128 downstream versions.</H2>
        <Body>
          Evaluated against 262 merge conflicts using a multi-dimensional metrics suite,
          measuring patch quality and similarity to ground-truth human-resolved patches.
        </Body>

        {/* Alternating widths, the way the comp staggers them. */}
        <dl className="case-block metric-grid grid grid-cols-1 gap-3 sm:grid-cols-10">
          {METRICS.map((m) => (
            <div
              key={m.title}
              style={{ '--span': m.span }}
              className="metric rounded-md border border-dashed border-ink/20 px-4 py-3"
            >
              <dt className="font-serif text-[1.02rem]">{m.title}</dt>
              <dd>
                <Body className="mt-0.5">{m.body}</Body>
              </dd>
            </div>
          ))}
        </dl>

        <div className="case-block">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-serif text-[clamp(1.4rem,2.2vw,1.95rem)] leading-none">
            <span>30 min</span>
            <span aria-hidden="true" className="text-ink-mute">
              &#10230;
            </span>
            <span>5 min</span>
            <span
              aria-hidden="true"
              className="hidden w-24 border-t border-dashed border-ink/35 sm:block"
            />
            <span>83% faster</span>
          </p>
          <Body className="mt-3">Average patch-porting time per vulnerability</Body>
        </div>
      </section>

      {/* ── Design process ── */}
      <section id="design-process" className="case-section scroll-mt-32">
        <Eyebrow>Design Process</Eyebrow>
        <H2>Translating workflow into GUI.</H2>
        <Body>
          Evaluated against 262 merge conflicts using a multi-dimensional metrics suite,
          measuring patch quality and similarity to ground-truth human-resolved patches.
        </Body>

        <Figure
          src={IMAGES.workflow}
          alt="The full patch-porting workflow mapped out as ten sequential stages"
          className="rounded-lg"
        />

        <Body>
          Before designing any screens, I mapped the full workflow as ten distinct stages, from
          vulnerability ingestion through to patch validation. Laying them out sequentially made
          visible what the system was actually doing at each step, and where decisions were made
          by rules versus by the model.
        </Body>
        <Body>
          Translating that into the GUI meant treating each stage as its own card in a stepper:
          scoped, legible, and unambiguous about what action, if any, the engineer needed to
          take.
        </Body>

        <div className="case-block flex flex-col gap-3 rounded-lg border border-ink/15 px-5 py-4 sm:flex-row sm:items-center sm:gap-8">
          <p className="shrink-0 font-mono text-[0.72rem] tracking-[0.1em] text-ink-mute uppercase">
            Each card answered one question:
          </p>
          <p className="font-serif text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.35] text-ink-soft">
            What does the engineer need to know, and what do they need to be able to do, at this
            exact step?
          </p>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="case-section">
        <H2>Three principles behind every screen.</H2>

        <Figure
          src={IMAGES.gui}
          alt="The GUI stepper: one card per stage, beside the patch diff"
          className="rounded-lg"
        />

        <dl className="case-block space-y-3">
          {PRINCIPLES.map((p) => (
            <NumberedCard key={p.n} n={p.n} title={p.title}>
              {p.body}
            </NumberedCard>
          ))}
        </dl>
      </section>

      {/* ── The pivot ── */}
      <section className="case-section">
        <H2>Tested against three principles, then pivoted.</H2>
        <Body>
          We ran usability sessions with Android security engineers, evaluating the GUI against
          the three principles that guided every screen. The sessions confirmed what the design
          was doing right, and surfaced a more fundamental problem with the medium itself.
        </Body>

        <div className="case-block grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-2 rounded-lg border border-ink/15 px-5 py-4">
            <Eyebrow>{PIVOT[0].label}</Eyebrow>
            <p className="font-serif text-[1.05rem]">{PIVOT[0].title}</p>
            <Body>{PIVOT[0].body}</Body>
          </div>

          <span aria-hidden="true" className="justify-self-center text-2xl text-ink-mute">
            &#10230;
          </span>

          <div className="space-y-2 rounded-lg border border-ink/15 px-5 py-4">
            <Eyebrow>{PIVOT[1].label}</Eyebrow>
            <p className="font-serif text-[1.05rem]">{PIVOT[1].title}</p>
            <Body>{PIVOT[1].body}</Body>
          </div>
        </div>

        <Callout label="The pivot" accent>
          <Body>
            Engineers who tested the tool lived in their terminal. Switching into a GUI
            interrupted that flow, no matter how well-designed. We rebuilt the interface as a
            CLI, and the tool finally felt like it belonged in their workflow.
          </Body>
        </Callout>
      </section>

      {/* ── Reflection ── */}
      <section id="reflection" className="case-section scroll-mt-32">
        <Eyebrow>Reflection</Eyebrow>
        <H2>Good design is meeting people inside the workflows they already trust.</H2>
        <Body>
          When I first took this role, I was genuinely excited because this would be the first
          time I&rsquo;d work on the technical side of a project. I got to explore LLM prompting,
          feed context into the model to shape desired outputs for our AI tooling, and contribute
          to designing our evaluation metrics. Working closely with the same technology I&rsquo;d
          been using every day, but now from the inside, was fascinating.
        </Body>
        <Body>
          Early on, I designed a graphical user interface for our end users (Android security
          engineers), assuming a visual tool would make patch porting more approachable. But
          after gathering feedback, we pivoted to a command-line interface, because that was the
          environment they already lived in. Learning to build a CLI was a technical lift, but
          the bigger lesson was about design itself: good design isn&rsquo;t about introducing
          something better in the abstract; it&rsquo;s about meeting people inside the workflows
          they already trust. A polished GUI that pulls an engineer out of their terminal creates
          friction, no matter how well-crafted it looks.
        </Body>
        <Body>
          This reframed how I think about AI tooling more broadly. When the underlying system is
          a black box, like an LLM making patch decisions, familiarity in the surrounding
          interface becomes a form of transparency. Engineers could read our tool&rsquo;s output,
          trace its reasoning, and intervene in the same environment where they&rsquo;d normally
          review a diff. The CLI didn&rsquo;t just match their habits; it made the AI feel
          legible, like another tool in their pipeline rather than a separate system asking for
          their trust.
        </Body>
      </section>

      {/* ── What's next ── */}
      <section className="case-section">
        <H2>Research paper, further development, open sourcing.</H2>
        <Body>
          The team is working toward publishing a research paper on the approach and results,
          continuing development of the pipeline, and open sourcing the tool so the broader
          Android security community can build on it.
        </Body>
        <Body>
          For me, it deepened where I think design sits in systems-level engineering work: how to
          contribute meaningfully to a technically complex product without losing sight of the
          human judgment that still matters at each step.
        </Body>
      </section>
    </CaseLayout>
  )
}

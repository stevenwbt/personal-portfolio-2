import CaseLayout from '../components/case/CaseLayout'
import { Body, Callout, Eyebrow, Figure, H2, NumberedCard } from '../components/case/parts'
import { FRICTIONS, IMAGES, META, PHASES, SECTIONS } from '../data/case-delta'

export default function CaseDelta() {
  return (
    <CaseLayout
      title="Delta Dental"
      hero={IMAGES.hero}
      heroAlt="Delta Dental’s online enrollment platform"
      heroFit="contain"
      sections={SECTIONS}
      meta={META}
    >
      {/* ── Overview ── */}
      <section id="overview" className="case-section scroll-mt-32">
        <Eyebrow>Overview</Eyebrow>
        <H2>Redesigning enrollment for brokers and employers.</H2>
        <Body>
          A UX internship at Delta Dental, redesigning the broker and employer enrollment experience
          as the company expanded into ancillary insurance products. Growing complexity had
          introduced redundant steps and unclear progress, making an already demanding B2B flow
          harder to navigate.
        </Body>
        <Body>
          I joined a cross-functional team mid-project, owning design from discovery through
          developer handoff: research, wireframes, hi-fidelity screens, and usability testing.
        </Body>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="case-section scroll-mt-32">
        <Eyebrow>Problem</Eyebrow>
        <H2>A growing product line. An enrollment flow that didn&rsquo;t grow with it.</H2>
        <Body>
          Delta Dental is expanding beyond dental into ancillary products: vision and other
          insurance offerings. That expansion meant more products, more options, and more
          configuration decisions layered on top of an already complex enrollment experience.
        </Body>
        <Body>
          Brokers and employers are the primary users responsible for enrolling groups into coverage
          plans. As more product lines were added, the existing flow&rsquo;s redundancies became
          harder to ignore, and harder to navigate.
        </Body>

        <dl className="case-block space-y-3">
          {FRICTIONS.map((f) => (
            <NumberedCard key={f.n} n={f.n} title={f.title}>
              {f.body}
            </NumberedCard>
          ))}
        </dl>

        <Callout label="Design question">
          <Body>
            How might we redesign enrollment so that brokers and employers always know where they
            are, what comes next, and can navigate a growing product offering without confusion?
          </Body>
        </Callout>
      </section>

      {/* ── Design process ── */}
      <section id="design-process" className="case-section scroll-mt-32">
        <Eyebrow>Design Process</Eyebrow>
        <H2>Five phases from research to handoff.</H2>
        <Body>
          With the UX researcher on leave, the process required some improvisation, particularly
          during discovery. Each phase built directly on the last.
        </Body>

        <dl className="case-block space-y-3">
          {PHASES.map((p) => (
            <NumberedCard key={p.n} n={p.n} title={p.title}>
              {p.body}
            </NumberedCard>
          ))}
        </dl>

        <Callout label="The brief">
          <Body>
            Redesign the end-to-end enrollment flow for both brokers and employers: reducing
            redundancy, clarifying where users are in the process, and building a foundation that can
            accommodate ancillary products without breaking the experience.
          </Body>
        </Callout>
      </section>

      {/* ── Reflection ── */}
      <section id="reflection" className="case-section scroll-mt-32">
        <Eyebrow>Reflection</Eyebrow>
        <H2>A summer in Seattle.</H2>
        <Body>
          This summer I interned at Delta Dental of Washington on Triforza&rsquo;s Digital Platform
          Team, where I led end-to-end design of the new enrollment flow for brokers and employers.
        </Body>
        <Body>
          I started by breaking down the existing workflow to identify pain points, then
          collaborated with the PM intern to refine our user research interviews and product
          requirements document. From there I translated those insights into mid-fidelity and
          high-fidelity designs, and ran usability testing to validate the direction.
        </Body>
        <Body>
          Before taking on the enrollment flow, I worked on other projects, including refining the
          multi-factor authentication experience and the provider claims dashboard.
        </Body>
        <Body>
          I also worked closely with engineers based in Ireland, and started a design change log so
          teams could review updates asynchronously, on their own time. The product is currently in
          development, and I&rsquo;ll share more once it officially ships.
        </Body>

        <Figure
          src={IMAGES.team}
          alt="The Digital Platform Team, summer 2025"
          className="rounded-lg"
        />

        <Callout label="Thank you">
          <Body>
            Grateful for this opportunity and for the chance to work alongside fellow designers, PMs,
            engineers, and all the stakeholders who shaped this project. A special thank you to my
            mentors, Jessie Brown (Designer) and Kimberly Lum (UX Marketing Manager). Lots of lessons
            learned, lots of caffeine involved, and a great summer in Seattle.
          </Body>
        </Callout>
      </section>
    </CaseLayout>
  )
}

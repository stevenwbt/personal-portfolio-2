import vBrowse from '../assets/accordant/video/browse.mp4'
import vCompare from '../assets/accordant/video/compare.mp4'
import vDetail from '../assets/accordant/video/detail.mp4'
import vFuture from '../assets/accordant/video/future.mp4'
import vLearn from '../assets/accordant/video/learn.mp4'
import vPlugin from '../assets/accordant/video/plugin.mp4'
import browse from '../assets/accordant/browse.jpg'
import hero from '../assets/accordant/hero.jpg'
import nextSteps from '../assets/accordant/next-steps.jpg'
import plugin from '../assets/accordant/plugin.jpg'
import stex from '../assets/accordant/stex.svg'
import logoAccordant from '../assets/accordant/logo/accordant.png'
import logoFigma from '../assets/accordant/logo/figma.png'
import logoSupernova from '../assets/accordant/logo/supernova.png'
import logoZeroheight from '../assets/accordant/logo/zeroheight.png'

export const IMAGES = { hero, browse, plugin, stex, nextSteps }

/*
  Screen recordings of each surface, one per walkthrough step.

  `ratio` is the file's own frame, carried here so the page can reserve the
  right box before the video loads. These are `preload="none"` — nothing is
  fetched until the clip scrolls into view — so without it each one would pop
  from a collapsed box to full height and shove the page down as it arrives.
*/
export const CLIPS = {
  browse: { src: vBrowse, ratio: '1518 / 1080' },
  detail: { src: vDetail, ratio: '1280 / 912' },
  compare: { src: vCompare, ratio: '1280 / 912' },
  learn: { src: vLearn, ratio: '1280 / 912' },
  plugin: { src: vPlugin, ratio: '1280 / 828' },
  future: { src: vFuture, ratio: '1280 / 252' },
}

/* One entry per section that carries an eyebrow — the index and the eyebrows
   are the same list, so they can't drift apart. */
export const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'design-principles', label: 'Design Principles' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'reflection', label: 'Reflection' },
]

export const META = [
  {
    label: 'Role',
    values: ['Product Design', 'Product Research', 'Information Architecture', 'UI Designer'],
  },
  { label: 'Timeline', values: ['Mar - Apr 2026'] },
  { label: 'Type', values: ['Passion Project', 'Speculative Project'] },
  { label: 'Surfaces', values: ['Web platform', 'Figma plugin'] },
]

/*
  The workflow tax, as steps rather than pictures. `changed` marks the steps
  Accordant replaces, so the saving is legible without counting.
*/
export const WORKFLOWS = [
  {
    label: 'Today',
    steps: [
      { t: 'Figma' },
      { t: 'Browser' },
      { t: 'Documentation' },
      { t: 'Search' },
      { t: 'Read' },
      { t: 'Figma' },
      { t: 'Library' },
      { t: 'Insert' },
      { t: 'Figma' },
    ],
  },
  {
    label: 'Web platform',
    steps: [
      { t: 'Figma' },
      { t: 'Browser', changed: true },
      { t: 'Search by intent', changed: true },
      { t: 'Understand', changed: true },
      { t: 'Insert' },
      { t: 'Figma' },
    ],
  },
  {
    label: 'Plugin',
    steps: [
      { t: 'Figma' },
      { t: 'Search by intent', changed: true },
      { t: 'Understand', changed: true },
      { t: 'Insert' },
    ],
  },
]

export const THEMES = [
  { n: '01', title: 'Near-alternative confusion', body: 'Modal vs. Prompt vs. Popover.' },
  { n: '02', title: 'Documentation hard to find', body: 'Or stale once they find it.' },
  { n: '03', title: 'Components without limits', body: 'No “when to use”.' },
  { n: '04', title: 'Drift between Figma and code', body: 'Library and production desync.' },
  { n: '05', title: 'Onboarding overload', body: 'Steep curve for new joiners.' },
  { n: '06', title: 'Use case isn’t covered', body: 'Bend it, build custom, or wait.' },
  { n: '07', title: 'DS team as bottleneck', body: 'Repeated questions, slow loop.' },
  { n: '08', title: 'Built but unused', body: 'The system exists, and is ignored.' },
]

export const LEARNED = [
  'Designers think in tasks, not names. They search by intent, “display warning”, and not “alert”.',
  'Documentation needs “when not to use” as much as “when to use.”',
  'Decisions live between near-alternatives',
  'If guidance isn’t in Figma, designers won’t reach for it',
]

/* The landscape. `ours` gets the solid accent border. */
export const LANDSCAPE = [
  {
    n: '01',
    kind: 'Default',
    name: 'Figma library',
    logo: logoFigma,
    strength: 'Zero context switch. What designers already use.',
    gap: 'Name-based search only. No comparison, no usage rules.',
  },
  {
    n: '02',
    kind: 'Docs',
    name: 'Zeroheight',
    logo: logoZeroheight,
    strength: 'Strong publishing. MCP + Assistant (2026).',
    gap: 'Read-first. AI returns text, not structured comparison.',
  },
  {
    n: '03',
    kind: 'Pivoted',
    name: 'Supernova',
    logo: logoSupernova,
    strength: 'Vibe coding & PRD generation. Design-to-code.',
    gap: 'Pivoted away from decision support, a different product now.',
  },
  {
    n: '04',
    kind: 'Decision-support',
    name: 'Accordant',
    logo: logoAccordant,
    strength: 'Intent search. Side-by-side comparison. Figma plugin.',
    gap: 'Doesn’t author or govern. Extends, doesn’t replace.',
    ours: true,
  },
]

export const PRINCIPLES = [
  { title: 'Discovery should feel intuitive', to: 'Browse with intent search' },
  { title: 'Guidance appears before misuse', to: 'Component detail' },
  { title: 'Learning should be embedded', to: 'Onboarding paths' },
  { title: 'Comparison is first-class', to: 'Compare as a primary surface' },
  { title: 'Workflow matters', to: 'Figma plugin extension' },
]

/*
  `scale` is each surface at its true relative size. A browser window and a
  Figma plugin panel are not the same size, and showing them in matching boxes
  says they are: measured against each other, the panel is ~62% of the
  window's width.
*/
export const SURFACES = [
  {
    scale: 1,
    label: 'A | Web platform, for depth',
    title: 'Browse the full system',
    image: 'browse',
    alt: 'Accordant’s browse view: the component library, filtered by intent',
    points: [
      'Compare related components',
      'Learn principles & onboarding',
      'View detailed component guidance',
    ],
  },
  {
    scale: 0.62,
    label: 'B | Figma plugin, fast in-context action',
    title: 'Search by intent inside Figma',
    image: 'plugin',
    alt: 'The Accordant Figma plugin, ranking components against a query',
    points: [
      'See recommended components',
      'View quick use-case guidance',
      'Insert the best-fit component',
    ],
  },
]

export const AREAS = [
  { n: '01', title: 'Browse', body: 'Searchable library, filter by category and intent.' },
  { n: '02', title: 'Compare', body: 'Side-by-side view of similar or confusable patterns.' },
  { n: '03', title: 'Learn', body: 'Onboarding, principles, and curated learning paths.' },
  { n: '04', title: 'Insights', body: 'Future: usage data and recommendation intelligence.' },
]

export const STEX_FACTS = [
  'Multiple enterprise products in active development',
  'Internal tools and customer-facing workflows',
  'Two design systems: Enterprise and Mobile',
  'A growing design team working across both',
]

export const PATHS = [
  {
    label: 'Path A',
    title: 'Connecting dots',
    lede: 'For teams with existing documentation.',
    body: 'Connect Figma + your existing documentation. Accordant pulls components from Figma and structures your guidance against them.',
  },
  {
    label: 'Path B',
    title: 'Generating drafts',
    lede: 'For teams without formal documentation yet.',
    body: 'Connect Figma only. Accordant generates initial drafts of intent, usage, and comparisons, then the team refines from there.',
  },
]

/* The walkthrough: a narrow column of copy beside a wide screen. */
export const WALKTHROUGH = [
  {
    n: '01',
    area: 'Browse',
    title: 'Search by intent, not just by name.',
    body: 'A designer searching "display warning" should not need to know the word "alert" beforehand, and can learn the names after.',
    clip: 'browse',
  },
  {
    n: '02',
    area: 'Component detail',
    title: 'Guidance before misuse.',
    body: 'Each component opens to a structured page with core guidance for everyone, every time, plus advanced guidance for deeper, contextual work.',
    clip: 'detail',
  },
  {
    n: '03',
    area: 'Compare',
    title: 'Comparison as a primary surface.',
    body: 'Place two confusable components side-by-side and see how their intent, behavior, and rules differ — not as a footnote, but as the view itself.',
    clip: 'compare',
  },
  {
    n: '04',
    area: 'Learn',
    title: 'Learning where the choosing happens.',
    body: 'Onboarding paths, system principles, and curated learning sequences embedded in the same surface designers already use to choose components.',
    clip: 'learn',
  },
  {
    n: '05',
    area: 'Plugin',
    title: 'In-context action, inside Figma.',
    body: 'Search by intent inside Figma, see recommended components ranked against your query, view quick use-case guidance, and insert the best-fit component without leaving the file.',
    clip: 'plugin',
  },
]

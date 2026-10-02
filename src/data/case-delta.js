import hero from '../assets/delta/hero.jpg'
import team from '../assets/delta/team.jpg'

export const IMAGES = { hero, team }

export const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'design-process', label: 'Design Process' },
  { id: 'reflection', label: 'Reflection' },
]

/*
  Colleagues are listed by role, not name — the earlier write-up of this
  project anonymised them, and that's theirs to change, not ours.
*/
export const META = [
  { label: 'Role', values: ['UX Design Intern', 'Research', 'Dev Handoff'] },
  { label: 'Timeline', values: ['Summer 2025'] },
  { label: 'Team', values: ['UX Designer', 'UX Engineer', 'PM Intern', 'UX Researcher'] },
  {
    label: 'Skills',
    values: ['User Research', 'Wireframing', 'Hi-fi Design', 'Usability Testing', 'Figma'],
  },
]

/* The four frictions brokers and employers kept hitting. */
export const FRICTIONS = [
  {
    n: '01',
    title: 'Redundant steps across the flow',
    body: 'Users were asked for the same information in multiple places. Without a clear sense of progress, it was hard to know what still needed to happen, or what had already been done.',
  },
  {
    n: '02',
    title: 'No sense of where you are',
    body: "Enrollment involves many sequential decisions. Without a visible progress model, users couldn't track their position, or how much work was left.",
  },
  {
    n: '03',
    title: 'New products, old structure',
    body: "Ancillary expansion added new product lines to a flow that wasn't designed to hold them. The result was confusing navigation and unclear branching between product types.",
  },
  {
    n: '04',
    title: 'Two user types, one unclear path',
    body: 'Brokers and employers have different relationships to the enrollment process but shared an undifferentiated experience, causing friction for both, for different reasons.',
  },
]

export const PHASES = [
  {
    n: '01',
    title: 'Research',
    body: 'User interviews conducted with the PM intern. Identified key pain points despite the researcher being on leave.',
  },
  {
    n: '02',
    title: 'Ideation',
    body: 'Proposed a stepper component with two designers. Mid-fidelity wireframes across the broker and employer flows.',
  },
  {
    n: '03',
    title: 'Hi-fi design',
    body: 'Converted wireframes into complete high-fidelity designs for the full enrollment flow.',
  },
  {
    n: '04',
    title: 'Usability testing',
    body: 'Tested the hi-fi prototype, gathered findings, and iterated on the key friction points.',
  },
  {
    n: '05',
    title: 'Dev handoff',
    body: 'Created design change logs to streamline communication and handoff with the dev team.',
  },
]

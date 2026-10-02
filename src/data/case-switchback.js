/* One entry per section that carries an eyebrow — the index and the eyebrows
   are the same list, so they can't drift apart. */
export const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research' },
  { id: 'product', label: 'The Product' },
  { id: 'positioning', label: 'Positioning' },
]

export const META = [
  { label: 'Role', values: ['Research', 'Product Strategy', 'IA', 'UI Design'] },
  { label: 'Timeline', values: ['2026'] },
  { label: 'Type', values: ['Self-directed concept'] },
  { label: 'Surfaces', values: ['iOS app'] },
]

/* The four ways a day hike came apart — each one a coordination failure, not
   a navigation one. */
export const REFRAME = [
  {
    n: '01',
    title: 'Assumptions stayed invisible',
    body: 'Everyone thought someone probably had it. Headlamps, charging, food and backup plans were never surfaced as group commitments.',
  },
  {
    n: '02',
    title: 'Responsibility was ambiguous',
    body: 'Critical items are easy to forget when the task belongs to everyone — which often means it belongs to no one.',
  },
  {
    n: '03',
    title: 'The plan did not evolve',
    body: 'Our pace changed and the daylight disappeared, but the original plan stayed, mentally, the plan.',
  },
  {
    n: '04',
    title: 'Information was device-bound',
    body: 'A dead phone should not remove the group’s map, exit details, or the contingency everyone was relying on.',
  },
]

/* Concept-stage research: no user study yet, so the sources are named plainly
   rather than dressed up as fieldwork. */
export const METHODS = [
  {
    label: 'Lived experience',
    body: 'Reconstructed the decisions, missing information, assumptions and handoffs from a real group day hike.',
  },
  { label: 'Competitive audit', body: 'Reviewed current public feature sets across eight products.' },
  {
    label: 'Safety guidance',
    body: 'Mapped NPS preparedness guidance to the moments where a group can still make a safer choice.',
  },
  {
    label: 'Social behaviour signal',
    body: 'Used outdoor participation and active-community research to understand the role of social connection.',
  },
]

export const SIGNALS = [
  { stat: '63.4M', body: 'U.S. hiking participants in 2024', source: 'OIA, 2026' },
  {
    stat: '48%',
    body: 'say social connection is a top reason to join a fitness group',
    source: 'Strava Year in Sport, 2024',
  },
  {
    stat: '58%',
    body: 'say they made new friends through a fitness group',
    source: 'Strava Year in Sport, 2024',
  },
]

/* The market is crowded, but each product owns a different job — which is the
   argument for the gap rather than against it. */
export const LANDSCAPE = [
  { product: 'AllTrails', gravity: 'Discovery + default', means: 'Find a trail, reviews, community content' },
  { product: 'Gaia GPS / CalTopo', gravity: 'Backcountry navigation', means: 'Topo, layers, route and field navigation' },
  { product: 'FarOut', gravity: 'Thru-hiking beta', means: 'Water, camps, comments, long-trail intel' },
  { product: 'onX Backcountry', gravity: 'Land + map collaboration', means: 'Terrain, access, shared map content' },
  { product: 'Komoot', gravity: 'Route building', means: 'Turn destinations into routable adventures' },
  { product: 'Strava', gravity: 'Performance social', means: 'Activities, feed, clubs, challenges' },
  { product: 'TrailSync', gravity: 'Backpacking trip ops', means: 'Routes, chat, gear, meals, budget' },
  {
    product: 'Switchback',
    gravity: 'Social day-hike coordination',
    means: 'People, decisions, responsibility, shared state',
    ours: true,
  },
]

/* Five small-group jobs, not a public content feed. */
export const LOOP = [
  { n: '01', title: 'Gather', body: 'Invite the people who are actually going.' },
  { n: '02', title: 'Decide', body: 'Choose the date, the start time, and how everyone gets there.' },
  { n: '03', title: 'Prepare', body: 'Claim responsibilities and see what is still missing.' },
  { n: '04', title: 'Move', body: 'Stay aligned as pace, daylight and context change.' },
  { n: '05', title: 'Remember', body: 'Build one shared record of the day together.' },
]

export const FEATURES = [
  {
    n: '01',
    area: 'Discover',
    title: 'Discovery should tell the group whether the day is realistic.',
    body: 'Familiar trail discovery, plus the planning signals that start to matter once friends are involved: a duration estimate drawn from your own past hikes, and whether anyone you know has done it before.',
  },
  {
    n: '02',
    area: 'Plan for the group',
    title: 'A difficulty badge is not enough when people have to finish together.',
    body: 'Hard, moderate and easy describe a trail. Switchback reframes planning around time, daylight and the group’s realistic pace — 11h 40m for this group, not “hard”.',
  },
  {
    n: '03',
    area: 'Invite',
    title: 'The moment friends join, a saved trail becomes a shared trip.',
    body: 'Invite by link for low friction, or from a friends list for the groups that go out often. Everyone then sees the same date, trail, decisions, responsibilities and changes.',
  },
  {
    n: '04',
    area: 'Group space',
    title: 'A hike gets a name, a member list, and one contextual conversation.',
    body: 'Closer to a temporary group space than a permanent public feed. Renaming the trip makes it a shared artefact; the chat is attached to the plan it refers to, so decisions stop getting buried.',
  },
  {
    n: '05',
    area: 'Adaptive logistics',
    title: 'One group decision can rewrite the checklist.',
    body: 'Transportation is a social dependency. Choosing a shuttle over two cars changes who books what, which passes are required, and what the group has to coordinate before anyone leaves.',
  },
  {
    n: '06',
    area: 'Group decisions',
    title: 'Plans should be proposals, not silent settings.',
    body: 'Someone proposes a start time, the group sees what it costs them in daylight, and the plan becomes explicit. Moving the slider moves the chart — a negotiation surface rather than a preference.',
  },
  {
    n: '07',
    area: 'Contributions',
    title: 'Preparedness becomes visible group ownership.',
    body: 'Not assigning jobs, but removing the ambiguity of “I thought someone else had it.” Roles and gear are claimed, and what nobody has claimed stays visible to everybody.',
  },
  {
    n: '08',
    area: 'During the hike',
    title: 'The group needs shared state, not another dense map.',
    body: 'When the plan starts drifting, four things decide what happens next: pace against plan, the next meaningful landmark, how much usable light is left, and the last reasonable place to turn around.',
  },
  {
    n: '09',
    area: 'Offline card',
    title: 'Critical information should survive signal loss.',
    body: 'A deliberately small card: exit trailhead and coordinates, group contacts, sunset, last water, and the few facts worth carrying when the phone that had everything is dead.',
  },
  {
    n: '10',
    area: 'Shared recap',
    title: 'The hike ends; the group object should not.',
    body: 'The same trip becomes a lightweight private record — who went, what was completed, joined camera rolls, and a review only the people who were there can read.',
  },
]

/* What keeps it a coordination tool rather than a feed. */
export const GUARDRAILS = [
  'Invite-only trip spaces',
  'Decisions tied to consequences',
  'Responsibilities tied to people',
  'Shared progress and contingency',
  'Private group memory',
]

export const POSITIONING = [
  {
    n: '01',
    title: 'The gap',
    body: 'Group decisions, responsibilities and changing conditions are still scattered across a trail app, a weather app, a group chat, a notes list and a shared album.',
  },
  {
    n: '02',
    title: 'The differentiator',
    body: 'Small-group social coordination: decisions, claimed ownership, shared state, and private memory.',
  },
  {
    n: '03',
    title: 'The product loop',
    body: 'Gather → decide → prepare → move → remember, all living around one shared trip.',
  },
]

import hero from '../assets/flux/hero.jpg'
import landscape from '../assets/flux/landscape.jpg'
import f1 from '../assets/flux/video/f1.mp4'
import f2 from '../assets/flux/video/f2.mp4'
import f3 from '../assets/flux/video/f3.mp4'
import f4 from '../assets/flux/video/f4.mp4'
import f5 from '../assets/flux/video/f5.mp4'
import f6 from '../assets/flux/video/f6.mp4'

export const IMAGES = { hero, landscape }

export const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research' },
  { id: 'design-process', label: 'Design Process' },
  { id: 'reflection', label: 'Reflection' },
]

export const META = [
  { label: 'Role', values: ['Research', 'Information Architecture', 'UI Design', 'Prototype'] },
  { label: 'Timeline', values: ['Feb - Apr 2025'] },
  { label: 'Type', values: ['Personal project'] },
  { label: 'Surfaces', values: ['Web platform'] },
]

/* Four frictions, from interviews with eight remote professionals. */
export const FRICTIONS = [
  {
    n: '01',
    title: 'Scattered comms = mental fatigue',
    body: 'Juggling multiple platforms for chat, meetings, and task updates drains focus and increases the risk of missing key information.',
  },
  {
    n: '02',
    title: 'Timezones = constant friction',
    body: 'Scheduling across time zones creates delays and misunderstandings, often leading to missed updates or late responses.',
  },
  {
    n: '03',
    title: 'Threads get long = threads get lost',
    body: 'In most tools, threaded discussions grow unwieldy over time, making it difficult to trace decisions, find context, or onboard new collaborators.',
  },
  {
    n: '04',
    title: 'AI, if transparent = useful',
    body: 'Users wanted features like summarization or task extraction, but were cautious about automation that felt opaque or uncontrollable.',
  },
]

export const VALUES = [
  { n: 'Value 01', title: 'Clarity', body: 'Cut through scattered tools and noise. Surface what matters first.' },
  { n: 'Value 02', title: 'Connection', body: 'Make async feel human across time zones, threads, and screens.' },
  { n: 'Value 03', title: 'Control', body: 'Keep the human in the loop. AI assists; people decide.' },
]

export const PAGES = [
  {
    n: '01',
    title: 'Dashboard',
    body: 'Central hub surfacing key activity across channels, meetings, and notes.',
  },
  {
    n: '02',
    title: 'Channels',
    body: 'Deep async communication via threaded discussions, tagging, and filtering.',
  },
  {
    n: '03',
    title: 'Meetings',
    body: 'Scheduling, participation management, and post-call summarization.',
  },
  {
    n: '04',
    title: 'Notes',
    body: 'Consolidate meeting outcomes with linked threads and actionable insights.',
  },
]

/* Six interactions, each with its own recording. */
export const FEATURES = [
  {
    n: '01',
    area: 'AI-summarized thread',
    title: 'Show summary, in one tap.',
    body: 'When a discussion becomes lengthy or complex, users tap "Show Summary" to instantly surface a concise recap of the key points, without losing the underlying thread.',
    clip: f1,
  },
  {
    n: '02',
    area: 'Update thread status',
    title: 'Move work forward without writing a recap.',
    body: 'Set thread status: Open, In review, Resolved, so collaborators see the state of a conversation at a glance, no scroll-back required.',
    clip: f2,
  },
  {
    n: '03',
    area: 'Contextual note sharing',
    title: 'Quote the doc, not your memory of it.',
    body: 'Highlight content from docs or notes and share it in chat as a clickable reference, keeping discussions traceable and source-linked.',
    clip: f3,
  },
  {
    n: '04',
    area: 'Timezone hover',
    title: 'Your teammate’s timezone to your timezone.',
    body: 'Shows a teammate’s local time on hover, making cross-timezone coordination effortless and unobtrusive.',
    clip: f4,
  },
  {
    n: '05',
    area: 'Sync to thread',
    title: 'Centralize the conversation, keep the context.',
    body: 'Bring specific chat messages into a thread so teams can centralize discussion history. Context isn’t lost across channels.',
    clip: f5,
  },
  {
    n: '06',
    area: 'Meetings to notes',
    title: 'Capture the call without losing your voice.',
    body: 'Captures meeting discussions into linked, summarized notes with key points and action items, so the record stays close to the conversation.',
    clip: f6,
  },
]

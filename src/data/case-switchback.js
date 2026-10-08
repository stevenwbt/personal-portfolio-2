import hero from '../assets/switchback/hero.jpg'
import tripSpace from '../assets/switchback/trip-space.jpg'
import hikeDetail from '../assets/switchback/video/hike-detail.webm'
import hikeDetailPoster from '../assets/switchback/video/hike-detail-poster.jpg'
import scene4 from '../assets/switchback/video/scene-4.webm'
import scene4Poster from '../assets/switchback/video/scene-4-poster.jpg'
import scene5 from '../assets/switchback/video/scene-5.webm'
import scene5Poster from '../assets/switchback/video/scene-5-poster.jpg'
import scene7 from '../assets/switchback/video/scene-7.mp4'
import scene7Poster from '../assets/switchback/video/scene-7-poster.jpg'
import scene8 from '../assets/switchback/video/scene-8.mp4'
import scene8Poster from '../assets/switchback/video/scene-8-poster.jpg'
import scene9 from '../assets/switchback/video/scene-9.mp4'
import scene9Poster from '../assets/switchback/video/scene-9-poster.jpg'
import scene2 from '../assets/switchback/video/scene-2.mp4'
import scene2Poster from '../assets/switchback/video/scene-2-poster.jpg'
import scene11 from '../assets/switchback/video/scene-11.mp4'
import scene11Poster from '../assets/switchback/video/scene-11-poster.jpg'
import scene12 from '../assets/switchback/video/scene-12.mp4'
import scene12Poster from '../assets/switchback/video/scene-12-poster.jpg'
import tripBefore from '../assets/switchback/trip-before.jpg'
import tripDuring from '../assets/switchback/trip-during.jpg'
import tripAfter from '../assets/switchback/trip-after.jpg'
import gallery1 from '../assets/switchback/gallery-1.jpg'
import gallery2 from '../assets/switchback/gallery-2.jpg'
import gallery3 from '../assets/switchback/gallery-3.jpg'
import gallery4 from '../assets/switchback/gallery-4.jpg'
import gallery5 from '../assets/switchback/gallery-5.jpg'
import gallery6 from '../assets/switchback/gallery-6.jpg'
import gallery7 from '../assets/switchback/gallery-7.jpg'
import gallery8 from '../assets/switchback/gallery-8.jpg'
import gallery9 from '../assets/switchback/gallery-9.jpg'

/* One entry per section that carries an eyebrow — the index and the eyebrows
   are the same list, so they can't drift apart. */
export const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research' },
  { id: 'product', label: 'The Product' },
  { id: 'positioning', label: 'Positioning' },
  { id: 'reflection', label: 'Reflection' },
]

export const META = [
  { label: 'Role', values: ['Research', 'Product Strategy', 'IA', 'UI Design'] },
  { label: 'Timeline', values: ['2026'] },
  { label: 'Type', values: ['Self-directed concept'] },
  { label: 'Surfaces', values: ['iOS app'] },
]

/* The trip itself, in three photos. The timestamps carry the story: a day
   hike that started at dawn and was still going at dawn the next day. */
export const TRIP = [
  {
    phase: 'Before',
    time: 'July 22 6:11AM',
    src: tripBefore,
    alt: 'Three hikers posing at the Stuart Lake trailhead kiosk in the Alpine Lakes Wilderness',
  },
  {
    phase: 'During',
    time: 'July 22 11:38AM',
    src: tripDuring,
    alt: 'Two hikers with trekking poles scrambling up a boulder field beneath jagged granite peaks',
  },
  {
    phase: 'After',
    time: 'July 23 6:10AM',
    src: tripAfter,
    alt: 'A tired selfie of the three hikers on a rocky forest trail the following morning',
  },
]

/* The four ways a day hike came apart — each one a coordination failure, not
   a navigation one. */
export const REFRAME = [
  {
    n: '01',
    title: '“I thought someone else had it.”',
    body: 'We hadn’t checked who was bringing headlamps, food, or a way to charge our phones. We assumed we had things covered without confirming it together.',
  },
  {
    n: '02',
    title: 'We hadn’t decided who would handle what.',
    body: 'The group needed to prepare, but individual responsibilities were unclear. It was easy to leave something to someone else.',
  },
  {
    n: '03',
    title: 'We kept going with the original plan.',
    body: 'Our pace changed and daylight was running out, but we didn’t adjust the plan to match what was happening.',
  },
  {
    n: '04',
    title: 'A dead phone could leave everyone without the details.',
    body: 'Maps and backup plans need to be accessible to the group, even when the phone holding that information runs out of battery.',
  },
]

/* Concept-stage research: no user study yet, so the sources are named plainly
   rather than dressed up as fieldwork. */
export const METHODS = [
  {
    label: 'Our trip',
    body: 'Retraced our decisions to identify missing information and assumptions we hadn’t discussed.',
  },
  {
    label: 'Competitive review',
    body: 'Compared the publicly listed features of eight products for planning, navigation, and group coordination.',
  },
  {
    label: 'Hike preparation',
    body: 'Reviewed National Park Service guidance to identify when preparation and check-ins could help groups make safer decisions.',
  },
  {
    label: 'Social motivation',
    body: 'Explored research on outdoor participation and fitness communities to understand why people get active together.',
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
  { product: 'AllTrails', gravity: 'Finding trails', means: 'Trail discovery, reviews, and community content' },
  { product: 'Gaia GPS / CalTopo', gravity: 'Backcountry navigation', means: 'Detailed maps, map layers, and route planning' },
  { product: 'FarOut', gravity: 'Long-distance hiking', means: 'Water sources, campsites, and hiker updates' },
  { product: 'onX Backcountry', gravity: 'Terrain and access', means: 'Terrain details, land access, and shared maps' },
  { product: 'Komoot', gravity: 'Route planning', means: 'Build and follow custom routes' },
  { product: 'Strava', gravity: 'Fitness and community', means: 'Activity tracking, clubs, and challenges' },
  { product: 'TrailSync', gravity: 'Backpacking trip planning', means: 'Routes, chat, gear, meals, and budgets' },
  {
    product: 'Switchback (concept)',
    gravity: 'Planning day hikes together',
    means: 'Agree on plans, divide responsibilities, and adjust as a group',
    ours: true,
  },
]

/* Five small-group jobs, not a public content feed. */
export const LOOP = [
  { n: '01', title: 'Gather', body: 'Invite the people you’re hiking with.' },
  { n: '02', title: 'Decide', body: 'Agree on a date, start time, and how to get there.' },
  { n: '03', title: 'Prepare', body: 'Work out who’s bringing what and see what’s missing.' },
  { n: '04', title: 'Adjust', body: 'Revisit the plan as your pace and remaining daylight change.' },
  { n: '05', title: 'Remember', body: 'Keep a shared record of the day.' },
]

export const FEATURES = [
  {
    n: '01',
    area: 'Discover',
    title: 'Find a hike that fits the day.',
    body: 'Explore trails with time estimates based on your past hikes, and see whether friends have done them before.',
    media: [{ src: scene5, poster: scene5Poster, ratio: '1500 / 940', label: 'browsing trails' }],
  },
  {
    n: '02',
    area: 'Plan for the group',
    title: 'How long will this take us?',
    body: 'Plan around your group’s estimated pace and available daylight. An estimate like “11h 40m” gives everyone a clearer picture of the day ahead.',
    /*
      Two views of the same screen, side by side. `ratio` is each file's own
      frame — the row sets one height and each box takes the width that shape
      asks for, so they line up top and bottom without being cropped.
      `frame` sets them inside a box the shape of features 01 and 03, so the
      three read at one size.
    */
    frame: '1500 / 940',
    media: [
      { src: hikeDetail, poster: hikeDetailPoster, ratio: '720 / 1564', label: 'on a phone' },
      { src: scene4, poster: scene4Poster, ratio: '2160 / 2330', label: 'the full detail screen' },
    ],
  },
  {
    n: '03',
    area: 'Invite',
    title: 'Get everyone in on the plan.',
    body: 'Invite friends through a link or your friends list. Everyone can see the trip details, responsibilities, and updates.',
    /* Shipped as the original H.264: it arrived already web-weight at 0.8 Mbps,
       and re-encoding would have cost size and browser support both. */
    media: [{ src: scene7, poster: scene7Poster, ratio: '3448 / 2160', label: 'inviting friends' }],
  },
  {
    n: '04',
    area: 'Group space',
    title: 'Give the hike its own space.',
    body: 'Name the trip, see who’s coming, and keep the conversation alongside the plan so details are easier to find.',
    media: [{ src: scene8, poster: scene8Poster, ratio: '3448 / 2160', label: 'the group space' }],
  },
  {
    n: '05',
    area: 'Getting ready',
    title: 'Know what needs doing and who’s handling it.',
    body: 'The shared checklist updates as plans change. Switching from cars to a shuttle, for example, changes the bookings and passes you need. Everyone can claim tasks or gear, while anything unclaimed stays visible for the group to sort out before leaving.',
    media: [{ src: scene9, poster: scene9Poster, ratio: '3448 / 2160', label: 'changing the ride' }],
  },
  {
    n: '06',
    area: 'Plan and adjust',
    title: 'Make a plan, then check it against the day.',
    body: 'Before leaving, adjust the start time to see how it affects your estimated finish and remaining daylight. On the trail, compare your actual pace with the plan, check upcoming landmarks and turnaround options, and decide together when to make a change.',
    media: [{ src: scene2, poster: scene2Poster, ratio: '3448 / 2160', label: 'checking the plan against the day' }],
  },
  {
    n: '07',
    area: 'Offline card',
    title: 'Keep the essentials available offline.',
    body: 'A compact trip card keeps exit trailhead coordinates, group contacts, sunset time, and the last water source accessible without reception.',
    media: [{ src: scene11, poster: scene11Poster, ratio: '3448 / 2160', label: 'the offline card' }],
  },
  {
    n: '08',
    area: 'Shared recap',
    title: 'Keep a record of the day together.',
    body: 'After the hike, the trip becomes a private recap with who went, what you completed, shared photos, and reflections only your group can read.',
    media: [{ src: scene12, poster: scene12Poster, ratio: '3448 / 2160', label: 'the shared recap' }],
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

/* Photos from the trip, closing out the page. The wide shots lead as one row;
   the tall ones follow in a grid of their own so nothing has to be cropped hard. */
export const GALLERY_WIDE = [
  { src: gallery7, alt: 'Two hikers with trekking poles descending a granite slab past a stone cairn' },
  { src: gallery4, alt: 'Tents pitched on a grassy lakeshore, seen from above, with a mountain goat among the rocks' },
  { src: gallery6, alt: 'A mountain goat and her kid crossing a boulder field below steep granite cliffs' },
]

export const GALLERY_TALL = [
  { src: gallery1, alt: 'Packs, water bottles and trekking poles spread across a granite boulder above a turquoise alpine lake' },
  { src: gallery8, alt: 'A hiker photographing a still alpine pool beneath snowy granite peaks' },
  { src: gallery3, alt: 'A mountain goat grazing on a slope above clear turquoise water and sunken logs' },
  { src: gallery2, alt: 'Snow-streaked granite peaks and larches reflected in a still pool beneath heavy clouds' },
  { src: gallery9, alt: 'A stream running down a rocky gully between two sheer granite walls' },
  { src: gallery5, alt: 'A boulder-strewn trail at dusk, the forest already dark' },
]

/* The three surfaces of a trip, shown together. */
export const TRIP_SPACE = tripSpace

export const IMAGES = { hero }

import circle from '../assets/images/circle.jpg'
import maple from '../assets/images/maple.jpg'
import perfume from '../assets/images/perfume.jpg'
import steven from '../assets/images/steven.jpg'

/*
  Positions are percentages of the stage, matching the layout comp.
  They only apply at `lg` and up — see `.stage-item` in index.css.
*/
export const PHOTOS = [
  {
    id: 'circle',
    src: circle,
    alt: 'Friends standing in a circle, phones in the middle, shot from above',
    caption: 'the group chat, in person',
    top: '28%',
    left: '55%',
    w: '13.2%',
    drift: '7px',
    dur: '9s',
    delay: '0s',
  },
  {
    id: 'perfume',
    src: perfume,
    alt: 'Blending fragrance at a desk, vials and a scale laid out',
    caption: 'blending at the kitchen table',
    top: '46.5%',
    left: '70.2%',
    w: '13%',
    drift: '5px',
    dur: '11s',
    delay: '0.8s',
  },
  {
    id: 'steven',
    src: steven,
    alt: 'Steven on a street corner in early spring',
    caption: 'somewhere cold, holding coffee',
    top: '61%',
    left: '12.9%',
    w: '13.3%',
    drift: '6px',
    dur: '10s',
    delay: '1.6s',
  },
  {
    id: 'maple',
    src: maple,
    alt: 'Maple, a toy poodle, wearing a bow',
    caption: 'Maple, art director',
    top: '70%',
    left: '44.7%',
    w: '13.7%',
    drift: '8px',
    dur: '8s',
    delay: '0.4s',
  },
]

export const CHIPS = [
  { id: 'forest', color: 'var(--color-chip-forest)', top: '19.5%', left: '74.2%', dur: '12s', delay: '0.2s' },
  { id: 'vermilion', color: 'var(--color-chip-vermilion)', top: '54.5%', left: '10.3%', dur: '9s', delay: '1.1s' },
  { id: 'magenta', color: 'var(--color-chip-magenta)', top: '60%', left: '67.4%', dur: '10s', delay: '0.6s' },
  { id: 'cerulean', color: 'var(--color-chip-cerulean)', top: '82.8%', left: '42.9%', dur: '13s', delay: '1.4s' },
]

/*
  Two groups, because they're two kinds of destination: these three are places
  on the site, and they sit together in the middle of the bar.
*/
export const NAV_LINKS = [
  { label: 'work', href: '#work' },
  { label: 'about', href: '#about' },
  { label: 'playground', href: '/playground' },
]

/* The résumé is a document, not a section — so it sits on its own, far right. */
export const NAV_TRAILING = { label: 'resume', href: '#resume' }

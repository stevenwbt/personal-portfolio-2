import dfaApp from '../assets/playground/dfa-app.jpg'
import dfaExpo from '../assets/playground/dfa-expo.jpg'
import isauwRecap from '../assets/playground/isauw-recap.jpg'
import keratonHeadliner from '../assets/playground/keraton-headliner.jpg'
import keratonPoster from '../assets/playground/keraton-poster.webm'
import keratonPosterStill from '../assets/playground/keraton-poster-poster.jpg'
import keratonVolunteer from '../assets/playground/keraton-volunteer.webm'
import keratonVolunteerStill from '../assets/playground/keraton-volunteer-poster.jpg'
import luckruns from '../assets/playground/luckruns.gif'
import luckrunsStill from '../assets/playground/luckruns-still.jpg'
import merch1 from '../assets/playground/isauw-merch-1.jpg'
import merch2 from '../assets/playground/isauw-merch-2.jpg'
import merch3 from '../assets/playground/isauw-merch-3.jpg'

/*
  A six-column grid: Luckruns and its neighbour take half each, and everything
  below runs in rows of three.

  `ratio` is the artwork's own frame, so a tile is shaped by what's in it
  rather than cropped to a common box — these pieces range from a 2.16 banner
  to 0.75 posters, and a single tile height would have cut half the height off
  the tallest. Rows are grouped by shape so tiles in a row come out level:
  squares together, then the 0.80 clips, then the 0.75 posters.

  `ready` marks a piece whose artwork is final; anything without it renders as
  a grey tile, so work can go live one piece at a time.
*/
export const PIECES = [
  {
    id: 'luckruns',
    span: 3,
    ratio: '2817 / 1305',
    href: '/playground/luckruns',
    image: luckruns,
    still: luckrunsStill,
    ready: true,
    caption: 'Luckruns · Indie fragrance house',
  },
  /* Held for the next piece — same frame as Luckruns so the row stays level. */
  { id: 'next', span: 3, ratio: '2817 / 1305' },

  { id: 'merch1', span: 2, ratio: '1200 / 1197', image: merch1, ready: true, caption: 'ISAUW · Merch collection' },
  { id: 'merch2', span: 2, ratio: '1200 / 1187', image: merch2, ready: true, caption: 'ISAUW · Merch collection' },
  { id: 'merch3', span: 2, ratio: '1200 / 1194', image: merch3, ready: true, caption: 'ISAUW · Merch collection' },

  {
    id: 'keraton-poster',
    span: 2,
    ratio: '800 / 1000',
    video: keratonPoster,
    still: keratonPosterStill,
    ready: true,
    caption: 'Keraton · Motion poster',
  },
  {
    id: 'keraton-volunteer',
    span: 2,
    ratio: '800 / 1000',
    video: keratonVolunteer,
    still: keratonVolunteerStill,
    ready: true,
    caption: 'Keraton · Volunteer call',
  },
  {
    id: 'keraton-headliner',
    span: 2,
    ratio: '963 / 1200',
    image: keratonHeadliner,
    ready: true,
    caption: 'Keraton · Headliner poster',
  },

  { id: 'dfa-expo', span: 2, ratio: '900 / 1200', image: dfaExpo, ready: true, caption: 'DFA UW · Annual Expo 2026' },
  { id: 'dfa-app', span: 2, ratio: '900 / 1200', image: dfaApp, ready: true, caption: 'DFA UW · Internal team application' },
  { id: 'recap', span: 2, ratio: '1200 / 1182', image: isauwRecap, ready: true, caption: 'ISAUW · Keraton event recap' },
]

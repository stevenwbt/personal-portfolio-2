import accordant from '../assets/images/work-accordant.webm'
import accordantPoster from '../assets/images/work-accordant.png'
import dd from '../assets/images/work-dd.webp'
import ddStill from '../assets/images/work-dd-still.jpg'
import flux from '../assets/images/work-flux.webm'
import fluxPoster from '../assets/images/work-flux.png'
import google from '../assets/images/work-google.gif'
import googleStill from '../assets/images/work-google-still.jpg'

/*
  A pinwheel: row one runs wide | narrow, row two narrow | wide.
  `span` is the card's share of a five-column grid, so 3 + 2 fills a row.

  `still` is the cover proper — what the <img> loads, and what anyone who asked
  for less motion sees. `motion` is the animated version layered over it, and a
  card without one is simply static.
*/
export const PROJECTS = [
  {
    id: 'android-patches',
    href: '/work/google-android-security',
    span: 3,
    tag: 'AI · Systems',
    title: 'Automating Android Security Patching with LLMs',
    blurb:
      'A workflow that lets engineers trust an LLM to backport security fixes across kernel branches — and know exactly when not to.',
    org: 'Google',
    year: '2025',
    motion: google,
    still: googleStill,
    alt: 'Automating Android security patch porting with LLMs, at Google',
  },
  {
    id: 'delta-dental',
    href: '/work/delta-dental',
    span: 2,
    tag: 'Enterprise · Healthcare',
    title: 'Enhancing Enrollment Experiences',
    blurb: 'A decade of legacy enrollment logic reshaped into a flow brokers can finish without calling support.',
    org: 'Delta Dental',
    year: '2025',
    motion: dd,
    still: ddStill,
    alt: 'Delta Dental’s online enrollment platform',
  },
  {
    id: 'flux',
    href: '/work/flux',
    span: 2,
    tag: 'AI · Productivity',
    title: 'AI-Driven Tools for Remote Teams',
    blurb: 'Ambient tools that cut coordination overhead for remote teams, without adding another dashboard to check.',
    year: '2024',
    video: flux,
    still: fluxPoster,
    alt: 'Flux, a workspace digest of a remote team’s threads and meetings',
  },
  {
    id: 'accordant',
    href: '/work/accordant',
    span: 3,
    tag: 'Design Systems',
    title: 'AI-Assisted Design System Browser',
    blurb:
      'Direct, structured control over tokens and components for designers — no waiting on engineering to translate intent into code.',
    year: '2026',
    video: accordant,
    still: accordantPoster,
    alt: 'Accordant’s component browser and comparison views',
  },
  {
    id: 'switchback',
    href: '/work/switchback',
    span: 5,
    tag: 'Product · Concept',
    title: 'A Hiking App for the Trip, Not the Trail',
    blurb:
      'The coordination layer between finding a trail and reaching the trailhead: group decisions, claimed responsibility, and daylight everyone can see.',
    year: '2026',
    alt: 'Switchback, a social coordination app for small-group day hikes',
  },
]

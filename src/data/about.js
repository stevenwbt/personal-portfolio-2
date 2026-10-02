import peekDeltaDental from '../assets/about/peek-deltadental.jpg'
import peekGoogle from '../assets/about/peek-google.jpg'
import peekGraduate from '../assets/about/peek-graduate.jpg'
import peekLuckruns from '../assets/about/peek-luckruns.png'
import peekPerfume from '../assets/about/peek-perfume.jpg'
import peekSeattle from '../assets/about/peek-seattle.jpg'
import peekTennis from '../assets/about/peek-tennis.jpg'
import portrait1 from '../assets/about/portrait-1.jpg'
import trailFriends from '../assets/about/trail-friends.jpg'
import trailHome from '../assets/about/trail-home.jpg'
import trailMaple from '../assets/about/trail-maple.jpg'
import trailNature from '../assets/about/trail-nature.jpg'
import trailPerfume from '../assets/about/trail-perfume.jpg'
import trailSteven from '../assets/about/trail-steven.jpg'

/* What each dotted word pins inside the box. */
export const PEEKS = {
  seattle: { src: peekSeattle, ratio: '3 / 4', label: 'Seattle' },
  graduate: { src: peekGraduate, ratio: '3 / 4', label: 'UW, 2026' },
  deltaDental: { src: peekDeltaDental, ratio: '4 / 3', label: 'Delta Dental' },
  google: { src: peekGoogle, ratio: '4 / 3', label: 'Google' },
  perfume: { src: peekPerfume, ratio: '3 / 4', label: 'Perfume making' },
  label: { src: peekLuckruns, ratio: '16 / 9', fit: 'contain', label: 'Luckruns' },
  tennis: { src: peekTennis, ratio: '3 / 4', label: 'Tennis' },
}

/* The snapshots that surface as the cursor wanders the box, in order. */
export const TRAIL = [
  { src: trailSteven, label: 'Steven..' },
  { src: trailPerfume, label: 'Perfume making' },
  { src: trailNature, label: 'Nature' },
  { src: trailMaple, label: 'Maple, my poodle' },
  { src: trailHome, label: 'Home.. @ UW!' },
  { src: trailFriends, label: 'Friends' },
]

export const TINTS = ['#b62d07', '#7c3aed', '#e8630a', '#009a5c', '#4f6fd4', '#0f766e', '#002fa7']

/* The one photo in the About frame. */
export const PORTRAIT = portrait1

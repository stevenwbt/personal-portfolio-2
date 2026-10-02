/*
  The shapes a chip morphs between, all drawn in the same 0 0 88 88 viewBox so
  MorphSVG has a like-for-like frame to interpolate in. 88 is the viewBox of
  the supplied clover (assets/images/clover.svg), which the petals come from.
*/
export const CLOVER_VIEWBOX = 88

/* clover.svg's own green: the four colours bleed to this as the clover forms. */
export const CLOVER_FILL = '#b5e640'

/* The whole clover as one path, straight from clover.svg. Used for the stamp,
   where four abutting paths would show antialiasing seams. */
export const CLOVER_PATH =
  'M56.3078 5.28343C49.2629 -1.76156 37.8407 -1.76156 30.7957 5.28343C23.7506 12.3285 23.7507 23.7506 30.7957 30.7956C23.7507 23.7506 12.3286 23.7505 5.28349 30.7956C-1.76161 37.8407 -1.7615 49.2628 5.28349 56.3078C12.3286 63.3529 23.7506 63.3529 30.7957 56.3078C23.7506 63.3529 23.7506 74.7749 30.7957 81.82C37.8408 88.8651 49.2627 88.8651 56.3078 81.82C63.3529 74.7749 63.3529 63.3529 56.3078 56.3078C63.3529 63.3529 74.7749 63.3529 81.82 56.3078C88.865 49.2628 88.8651 37.8407 81.82 30.7956C74.7749 23.7505 63.3528 23.7506 56.3078 30.7956C63.3528 23.7506 63.3529 12.3285 56.3078 5.28343Z'

const MID = CLOVER_VIEWBOX / 2

export const SQUARE = `M0,0 L${CLOVER_VIEWBOX},0 L${CLOVER_VIEWBOX},${CLOVER_VIEWBOX} L0,${CLOVER_VIEWBOX} Z`

/* A circle as four cubics — 0.5523 is the magic ratio for a bezier arc. */
export const CIRCLE =
  'M44,0 C68.3,0 88,19.7 88,44 C88,68.3 68.3,88 44,88 ' +
  'C19.7,88 0,68.3 0,44 C0,19.7 19.7,0 44,0 Z'

/*
  clover.svg is one path: twelve cubics, three per lobe, running top -> left ->
  bottom -> right around an inner square. Each petal below is one lobe's three
  cubics closed back to the centre, so the four together redraw the original
  exactly.

  Ordered by pick-up: this clover's lobes sit at 12 / 3 / 6 / 9 o'clock, not on
  the diagonals, so the first square picked takes the top lobe and the rest
  follow clockwise.
*/
export const PETAL = [
  // top
  'M56.3078,30.7956 C63.3528,23.7506 63.3529,12.3285 56.3078,5.28343 C49.2629,-1.76156 37.8407,-1.76156 30.7957,5.28343 C23.7506,12.3285 23.7507,23.7506 30.7957,30.7956 L44,44 Z',
  // right
  'M56.3078,56.3078 C63.3528,63.3529 74.7749,63.3529 81.82,56.3078 C88.865,49.2628 88.8651,37.8407 81.82,30.7956 C74.7749,23.7505 63.3528,23.7506 56.3078,30.7956 L44,44 Z',
  // bottom
  'M30.7957,56.3078 C23.7506,63.3529 23.7506,74.7749 30.7957,81.82 C37.8408,88.8651 49.2627,88.8651 56.3078,81.82 C63.3529,74.7749 63.3529,63.3529 56.3078,56.3078 L44,44 Z',
  // left
  'M30.7957,30.7956 C23.7507,23.7506 12.3286,23.7505 5.28349,30.7956 C-1.76161,37.8407 -1.7615,49.2628 5.28349,56.3078 C12.3286,63.3529 23.7506,63.3529 30.7957,56.3078 L44,44 Z',
]

/*
  Every petal is drawn in the full clover frame, so the four boxes converge on
  the same spot rather than tiling into quadrants — the art places each lobe.
  CLOVER_GROWTH is how much bigger that shared box is than one chip.
*/
export const CLOVER_GROWTH = 2

export { MID }

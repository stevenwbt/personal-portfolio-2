import { CLOVER_FILL, CLOVER_PATH, CLOVER_VIEWBOX } from '../data/shapes'

/*
  A stamped clover.

  Drawn as clover.svg's single path rather than the four petals: the stamp is
  one colour, and four abutting paths would show antialiasing seams where they
  meet. Centred on the parent's top-left corner — the point it was stamped at.
*/
export default function Clover({ rotation = 0 }) {
  return (
    <svg
      className="clover-stamp"
      viewBox={`0 0 ${CLOVER_VIEWBOX} ${CLOVER_VIEWBOX}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <path d={CLOVER_PATH} fill={CLOVER_FILL} />
    </svg>
  )
}

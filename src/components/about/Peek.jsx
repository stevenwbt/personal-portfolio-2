/* A dotted-underline word that pins one snapshot inside the trail box. */
export default function Peek({ image, onPeek, children }) {
  return (
    <span
      className="u-dot"
      onMouseEnter={() => onPeek(image)}
      onMouseLeave={() => onPeek(null)}
    >
      {children}
    </span>
  )
}

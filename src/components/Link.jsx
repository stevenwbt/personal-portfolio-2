import { navigate } from '../router'

/* An internal link. Modified clicks fall through to the browser so
   cmd-click still opens a new tab. */
export default function Link({ to, children, onClick, ...rest }) {
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    /* Runs before navigating, and still runs when `to` is the current path —
       which is how the nav mark scrolls home back to the top. */
    onClick?.(e)
    navigate(to)
  }
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

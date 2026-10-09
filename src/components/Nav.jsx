import { ScrollSmoother } from 'gsap/ScrollSmoother'
import Link from './Link'
import { CLOVER_FILL, CLOVER_PATH, CLOVER_VIEWBOX } from '../data/shapes'
import { NAV_LINKS, NAV_TRAILING } from '../data/stage'

/*
  Two kinds of nav item. `#work` and `#about` are anchors on the home page, so
  from anywhere else they need a `/` in front to get back there first. Real
  routes like `/playground` go through the router instead — a plain <a> would
  reload the whole app.
*/
function NavItem({ link, subpage, className }) {
  const isRoute = link.href.startsWith('/')
  // Off-site links (the résumé on Drive) open in a new tab, untouched.
  const external = /^https?:/.test(link.href)
  const href = isRoute || external || !subpage ? link.href : `/${link.href}`
  // `leading-none` so the hover pill is set by the padding, not by inherited
  // line height — at this bar height that's the difference between air and none.
  const style = `block rounded-full px-3 py-1 font-nav text-[0.85rem] leading-none text-ink transition-colors duration-200 hover:bg-acid/60 sm:px-4 sm:py-1.5 sm:text-[clamp(0.88rem,0.95vw,1.05rem)] ${className ?? ''}`

  return isRoute ? (
    <Link to={href} className={style}>
      {link.label}
    </Link>
  ) : (
    <a
      href={href}
      className={style}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {link.label}
    </a>
  )
}

/*
  Clicking the mark while already home would otherwise do nothing — the router
  short-circuits a navigation to the current path, so no route change means no
  scroll reset. Going through the smoother rather than `window.scrollTo`,
  because it transforms the content rather than scrolling it; without an
  instance (reduced motion kills it) the native call is the right one.
*/
function scrollHomeToTop() {
  if (window.location.pathname !== '/') return
  const smoother = ScrollSmoother.get?.()
  if (smoother) smoother.scrollTo(0, true)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Nav({ subpage = false }) {
  return (
    <nav
      aria-label="Primary"
      className="animate-rise fixed inset-x-0 top-0 z-50 border-b border-[#F0F0F0] bg-page"
      style={{ '--delay': '0.05s' }}
    >
      {/*
        The same frame the footer and the work grid use, so the mark lines up
        with the headline on the left and `resume` with the grid's right edge.

        A three-track grid rather than `justify-between`: the outer tracks are
        equal fractions, which keeps the middle group centred on the page no
        matter how much wider `resume` is than the mark.
      */}
      <div className="mx-auto grid h-11 w-full max-w-[1800px] grid-cols-[auto_1fr_auto] items-center gap-2 px-5 sm:h-12 sm:grid-cols-[1fr_auto_1fr] sm:px-[2.2%]">
        {/* The mark is the way home, from any page. */}
        <Link
          to="/"
          aria-label="Home"
          onClick={scrollHomeToTop}
          className="flex w-fit rounded-full transition-opacity duration-200 hover:opacity-60"
        >
          <svg
            viewBox={`0 0 ${CLOVER_VIEWBOX} ${CLOVER_VIEWBOX}`}
            className="size-[1.05rem] sm:size-[1.15rem]"
            aria-hidden="true"
            focusable="false"
          >
            <path d={CLOVER_PATH} fill={CLOVER_FILL} />
          </svg>
        </Link>

        <ul className="flex min-w-0 items-center justify-center gap-0 sm:gap-6 lg:gap-12">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavItem link={link} subpage={subpage} />
            </li>
          ))}
        </ul>

        <div className="flex justify-end">
          <NavItem link={NAV_TRAILING} subpage={subpage} className="max-sm:px-2" />
        </div>
      </div>
    </nav>
  )
}

import Footer from './components/Footer'
import Nav from './components/Nav'
import useSmoothScroll from './hooks/useSmoothScroll'
import CaseAccordant from './pages/CaseAccordant'
import CaseDelta from './pages/CaseDelta'
import CaseFlux from './pages/CaseFlux'
import CaseSwitchback from './pages/CaseSwitchback'
import CaseGoogle from './pages/CaseGoogle'
import Home from './pages/Home'
import Luckruns from './pages/Luckruns'
import Playground from './pages/Playground'
import { useRoute } from './router'

const PAGES = {
  '/work/google-android-security': CaseGoogle,
  '/work/delta-dental': CaseDelta,
  '/work/accordant': CaseAccordant,
  '/work/flux': CaseFlux,
  '/work/switchback': CaseSwitchback,
  '/playground': Playground,
  '/playground/luckruns': Luckruns,
}

export default function App() {
  const route = useRoute()
  const Page = PAGES[route] ?? Home
  const isCase = route in PAGES

  // Rebuilt per route: trigger positions belong to the page that's mounted.
  useSmoothScroll(route)

  return (
    <>
      {/* Fixed, so it stays outside the smoothed content — see useSmoothScroll. */}
      <Nav subpage={isCase} />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Page />
          <Footer />
        </div>
      </div>
    </>
  )
}

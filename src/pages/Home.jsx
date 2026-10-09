import { useCallback, useRef, useState } from 'react'
import About from '../components/About'
import ChipField from '../components/ChipField'
import Footprint from '../components/Footprint'
import Intro from '../components/Intro'
import LandingIntro from '../components/LandingIntro'
import Snapshot from '../components/Snapshot'
import Work from '../components/Work'
import Wordmark from '../components/Wordmark'
import { PHOTOS } from '../data/stage'

// Kept across route changes, reset by a refresh — same as the stamped clovers.
let wordmarkShown = false

export default function Home() {
  const stageRef = useRef(null)
  // The wordmark stays hidden until the visitor forms their first clover.
  const [revealed, setRevealed] = useState(wordmarkShown)
  const reveal = useCallback(() => {
    wordmarkShown = true
    setRevealed(true)
  }, [])
  /* The squares sit still while the opening animation is placing them. */
  const [introRunning, setIntroRunning] = useState(true)
  const endIntro = useCallback(() => setIntroRunning(false), [])

  return (
    <main>
      {/* The stage: everything on it is positioned against this box. */}
      <section
        ref={stageRef}
        aria-label="Introduction"
        className="relative mx-auto w-full max-w-[1800px] px-5 pt-28 pb-16 lg:h-[100svh] lg:min-h-[46rem] lg:px-0 lg:pt-0 lg:pb-0"
      >
        <Intro />
        <Wordmark revealed={revealed} />

        {/* On phones these become a two-up gallery; on desktop they scatter. */}
        <div className="grid grid-cols-2 gap-4 lg:contents">
          {PHOTOS.map((photo) => (
            <Snapshot key={photo.id} photo={photo} />
          ))}
        </div>

        {/* Desktop: the squares are pickable and make a clover. */}
        <ChipField stageRef={stageRef} onClover={reveal} idle={introRunning} />

        <LandingIntro stageRef={stageRef} onFinish={endIntro} />

        <Footprint />
      </section>

      <Work />
      <About />
    </main>
  )
}

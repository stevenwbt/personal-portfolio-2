import { useRef } from 'react'
import About from '../components/About'
import ChipField from '../components/ChipField'
import Footprint from '../components/Footprint'
import Intro from '../components/Intro'
import Snapshot from '../components/Snapshot'
import Work from '../components/Work'
import Wordmark from '../components/Wordmark'
import { CHIPS, PHOTOS } from '../data/stage'

export default function Home() {
  const stageRef = useRef(null)

  return (
    <main>
      {/* The stage: everything on it is positioned against this box. */}
      <section
        ref={stageRef}
        aria-label="Introduction"
        className="relative mx-auto w-full max-w-[1800px] px-5 pt-28 pb-16 lg:h-[100svh] lg:min-h-[46rem] lg:px-0 lg:pt-0 lg:pb-0"
      >
        <Intro />
        <Wordmark />

        {/* On phones these become a two-up gallery; on desktop they scatter. */}
        <div className="grid grid-cols-2 gap-4 lg:contents">
          {PHOTOS.map((photo) => (
            <Snapshot key={photo.id} photo={photo} />
          ))}
        </div>

        {/* Desktop: the squares are pickable and make a clover. */}
        <ChipField stageRef={stageRef} />

        {/* Phones get the same four squares, at rest. */}
        <div className="mt-10 flex gap-3 lg:hidden" aria-hidden="true">
          {CHIPS.map((chip) => (
            <div key={chip.id} className="size-8" style={{ background: chip.color }} />
          ))}
        </div>

        <Footprint />
      </section>

      <Work />
      <About />
    </main>
  )
}

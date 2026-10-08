import { useState } from 'react'
import Peek from './about/Peek'
import TrailBox from './about/TrailBox'
import { PEEKS, PORTRAIT } from '../data/about'

export default function About() {
  const [peek, setPeek] = useState(null)

  return (
    <section
      id="about"
      data-intro-hide
      aria-labelledby="about-heading"
      className="mx-auto w-full max-w-[1800px] px-5 sm:px-[2.2%]"
    >
      {/* `font-serif` is the Recoleta token — see "Recoleta" in the README. */}
      <h2
        id="about-heading"
        className="about-reveal mb-[clamp(1.25rem,2.2vw,2.25rem)] font-serif text-[clamp(1.5rem,2.3vw,2.05rem)] leading-[1.18] font-normal"
      >
        Halo, I&rsquo;m Steven Heng
      </h2>

      {/*
        The trail field sits under the copy rather than across the whole
        section, so it shares the text column's width — and because the grid
        stretches, the portrait beside it runs the full height of the two
        together instead of stopping at the end of the paragraphs.
      */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div className="flex flex-col">
        <div className="about-reveal text-[clamp(0.9rem,1.05vw,1.1rem)] leading-[1.5] [&>p+p]:mt-[1.1em]">
          <p>
            Product designer from Indonesia, now based in{' '}
            <Peek image={PEEKS.seattle} onPeek={setPeek}>
              Seattle
            </Peek>
            . I&rsquo;m a recent{' '}
            <Peek image={PEEKS.graduate} onPeek={setPeek}>
              graduate
            </Peek>{' '}
            of the University of Washington, with experience at{' '}
            <Peek image={PEEKS.deltaDental} onPeek={setPeek}>
              Delta Dental
            </Peek>{' '}
            and on a capstone project with{' '}
            <Peek image={PEEKS.google} onPeek={setPeek}>
              Google
            </Peek>
            .
          </p>

          <p>
            I&rsquo;m drawn to shaping complex, often invisible systems into experiences that feel
            clear, intentional, and human. I care about the kinds of details people don&rsquo;t
            always notice, but always feel. Outside of design, I make{' '}
            <Peek image={PEEKS.perfume} onPeek={setPeek}>
              perfumes
            </Peek>{' '}
            and am currently building my own{' '}
            <Peek image={PEEKS.label} onPeek={setPeek}>
              fragrance label
            </Peek>
            .
          </p>

          <p>
            When I&rsquo;m not designing or making fragrances, I&rsquo;m usually playing racket
            sports like{' '}
            <Peek image={PEEKS.tennis} onPeek={setPeek}>
              tennis
            </Peek>
            , badminton, or pickleball, watching horror and thriller films, trying to get a full
            eight hours of sleep, or removing em dashes from sentences I definitely wrote myself.
          </p>
        </div>

          <TrailBox peek={peek} className="flex-1" />
        </div>

        {/*
          No `data-speed` here: the parallax it gave the portrait slid it up to
          43px out of its own grid cell, so its top no longer met the copy and
          its bottom no longer met the trail field. The alignment is worth more
          than the drift.
        */}
        <div className="about-reveal relative overflow-hidden rounded-[10px] bg-veil ring-1 ring-ink/10 ring-inset max-lg:aspect-[4/3]">
          <img
            src={PORTRAIT}
            alt="Steven Heng"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

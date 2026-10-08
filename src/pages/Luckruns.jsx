import BottleCarousel from '../components/luckruns/BottleCarousel'
import Link from '../components/Link'
import { Body, Eyebrow, H2 } from '../components/case/parts'
import bench from '../assets/luckruns/bench.jpg'
import logo from '../assets/luckruns/logo.png'

export default function Luckruns() {
  return (
    <main className="mx-auto w-full max-w-[1800px] px-5 pt-28 sm:px-[2.2%]">
      <Link
        to="/playground"
        className="mb-9 inline-block font-mono text-[0.65rem] tracking-[0.1em] text-ink-mute uppercase transition-colors duration-200 hover:text-ink"
      >
        &larr; Playground
      </Link>

      <header className="max-w-[62rem]">
        <h1 className="font-serif text-[clamp(2rem,4vw,3.4rem)] leading-none font-normal">
          LUCKRUNS
        </h1>
        <p className="mt-2 text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.5] text-ink-soft">
          is my indie fragrance house; a personal project where I blend, brand, and bottle scents
          that live between memory and imagination.
        </p>
        <p className="mt-5 text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.5] text-ink-soft">
          Every fragrance is named after a place, real or dreamt, and I design the whole thing
          end-to-end: formula, bottle, story. It&rsquo;s what my design practice looks like
          translated into something you wear.
        </p>
      </header>

      {/*
        A narrow frame beside a wide one. Both carry the same explicit height —
        left to their own ratios the photo's intrinsic height drove the row and
        the two tiles came out different sizes.
      */}
      <div className="mt-[clamp(2rem,4vw,3.5rem)] grid grid-cols-1 gap-4 sm:auto-rows-[clamp(240px,30vw,470px)] sm:grid-cols-7">
        {/* No ratio of its own: the grid row is sized by the logo tile beside
            it, and this stretches to match. */}
        <div className="h-full sm:col-span-2">
          <img
            src={bench}
            alt="Blending a fragrance by hand: a bottle on the scale, oils laid out around it"
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-xl object-cover max-sm:aspect-[4/5]"
          />
        </div>
        <div className="sm:col-span-5">
          {/* The mark is keyed to transparency, so it sits on the tile's ground
              rather than arriving in a white box of its own. */}
          <div className="flex h-full items-center justify-center rounded-xl border border-[#D9D9D9] bg-white px-[8%] max-sm:aspect-[16/7]">
            <img
              src={logo}
              alt="Luckruns"
              loading="lazy"
              decoding="async"
              className="w-full max-w-[34rem]"
            />
          </div>
        </div>
      </div>

      <section className="mt-[clamp(3rem,6vw,5.5rem)] max-w-[62rem]">
        <Eyebrow>Introduction</Eyebrow>
        <H2 className="mt-[15px]">Perfume as a medium.</H2>
        <Body className="mt-[20px]">
          Perfume for me is design at its most invisible. You can&rsquo;t see it, you can only feel
          it. That&rsquo;s the constraint that pulled me in.
        </Body>
        <Body className="mt-[20px]">
          I grew up collecting fragrances, and the story behind each one still stays with me. At UW I
          took a few psychology classes and got pulled into the idea of sensory memory, how smell is
          the sense most tightly tied to what we remember. Somehow that made everything I already
          loved about perfume make sense.
        </Body>
        <Body className="mt-[20px]">
          A few years ago I took a perfumery class and started mixing scents out of curiosity. It
          turned into an indie fragrance house I&rsquo;ve been building on the side. My thesis is the
          blur between imagination and reality. Each fragrance is named after a place, real or
          dreamt. I&rsquo;m building the whole system, from the formulation to the bottle to the name
          to the copy. It&rsquo;s my most patient project, and the one that keeps reminding me that
          most of what I care about as a designer is really about atmosphere.
        </Body>
      </section>

      <BottleCarousel />

      <section className="mt-[clamp(3rem,6vw,5.5rem)] max-w-[62rem] pb-[clamp(4rem,8vw,7rem)]">
        <Eyebrow>Work in progress</Eyebrow>
        <H2 className="mt-[15px]">Still being blended.</H2>
        <Body className="mt-[20px]">
          Luckruns is a work in progress. The formulas, bottles and names are still changing, and
          nothing is for sale just yet. If you&rsquo;re curious about a scent, want to try one, or
          would like to collaborate, I&rsquo;d love to hear from you.
        </Body>
        {/* Same pill as the site's other buttons, with the acid hover. */}
        <a
          href="mailto:tostevenheng@gmail.com?subject=Luckruns"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-[0.95rem] text-ink transition-colors duration-200 hover:bg-acid/60"
        >
          Contact me <span aria-hidden="true">&rarr;</span>
        </a>
      </section>
    </main>
  )
}

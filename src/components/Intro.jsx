export default function Intro() {
  return (
    <div
      className="stage-item animate-rise relative z-20 max-w-[42rem]"
      style={{ '--top': '13%', '--left': '2.2%', '--w': '46%', '--delay': '0.15s' }}
    >
      {/* The line breaks are the comp's; on phones the sentence wraps on its own. */}
      <h1 className="text-[clamp(1.15rem,1.5vw,1.7rem)] leading-[1.17] font-medium tracking-[-0.022em] text-graphite text-pretty max-sm:text-[1.25rem]">
        I&rsquo;m Steven Heng,
        <br className="max-sm:hidden" />{' '}
        Product Designer drawn to ambiguity,
        <br className="max-sm:hidden" />{' '}
        making complex systems feel simple,
        <br className="max-sm:hidden" />{' '}
        and the invisible feel intentional.
      </h1>

      <p className="mt-4 text-[clamp(0.85rem,1.05vw,1.15rem)] leading-[1.42] tracking-[-0.02em] text-ink-soft">
        Working across AI, cognition, human-centered systems.
        <br />
        Also an amateur perfumer!
      </p>

      <p className="mt-5 font-mono text-[clamp(0.6rem,0.7vw,0.78rem)] tracking-[0.015em] text-ink-faint uppercase">
        Prev. at Google, Delta Dental and Teaching Assistant @ UW iSchool
      </p>
    </div>
  )
}

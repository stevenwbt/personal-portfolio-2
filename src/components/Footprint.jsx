import { useEffect, useState } from 'react'

const SEATTLE = 'America/Los_Angeles'

function seattleTime() {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: SEATTLE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date())
}

export default function Footprint() {
  const [time, setTime] = useState(seattleTime)

  useEffect(() => {
    const id = setInterval(() => setTime(seattleTime()), 10_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      data-intro-hide
      className="animate-rise mt-14 text-[clamp(0.78rem,0.92vw,1rem)] leading-relaxed text-ink-mute lg:absolute lg:right-[2.2%] lg:bottom-[5%] lg:mt-0 lg:text-right"
      style={{ '--delay': '0.5s' }}
    >
      <p>
        <time>{time}</time> in Seattle
      </p>
      <p>47°36&prime;14&Prime;N 122°19&prime;48&Prime;W</p>
    </div>
  )
}

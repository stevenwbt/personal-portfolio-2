import logo from '../assets/images/stewithme-logo.svg'

export default function Wordmark() {
  return (
    <div
      className="stage-item animate-rise z-10 my-16 flex flex-col items-center lg:my-0"
      style={{ '--top': '44%', '--left': '37%', '--w': '26%', '--delay': '0.3s' }}
    >
      <div className="w-full max-w-[17rem] lg:max-w-none">
        <img src={logo} alt="stéwithme" className="h-auto w-full" width="515" height="101" />
      </div>

      <p className="mt-3 text-[clamp(0.9rem,1.5vw,1.15rem)] font-medium tracking-[0.01em] text-blush">
        [stay with me]
      </p>
    </div>
  )
}

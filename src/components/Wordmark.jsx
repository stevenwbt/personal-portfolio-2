import logo from '../assets/images/stewithme-logo.svg'

/*
  Hidden on desktop until the first clover forms — it's the reward for the
  squares. Phones have no clover to make, so they always see it. The fade sits
  on an inner wrapper because `animate-rise` owns the outer one's opacity.
*/
export default function Wordmark({ revealed = true }) {
  return (
    <div
      data-wordmark
      className="stage-item animate-rise z-10 my-16 flex flex-col items-center lg:my-0"
      style={{ '--top': '44%', '--left': '37%', '--w': '26%', '--delay': '0.3s' }}
    >
      <div
        className={`flex w-full flex-col items-center transition-[opacity,translate,filter] duration-1000 ease-out ${
          revealed ? '' : 'lg:translate-y-3 lg:opacity-0 lg:blur-sm'
        }`}
      >
        <div className="w-full max-w-[17rem] lg:max-w-none">
          <img src={logo} alt="stéwithme" className="h-auto w-full" width="515" height="101" />
        </div>

        <p className="mt-3 text-[clamp(0.9rem,1.5vw,1.15rem)] font-medium tracking-[0.01em] text-blush">
          [stay with me]
        </p>
      </div>
    </div>
  )
}

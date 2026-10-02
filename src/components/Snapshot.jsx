export default function Snapshot({ photo }) {
  return (
    <figure
      className="stage-item group relative z-10 m-0"
      style={{ '--top': photo.top, '--left': photo.left, '--w': photo.w }}
    >
      <div
        className="animate-drift"
        style={{ '--drift': photo.drift, '--dur': photo.dur, '--delay': photo.delay }}
      >
        <div className="animate-rise" style={{ '--delay': photo.delay }}>
          {/* Diagonal corners: rounded top-left and bottom-right, sharp on the other two. */}
          <div className="overflow-hidden rounded-[10px_0_10px_0]">
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[20/9] w-full object-cover grayscale transition duration-500 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
            />
          </div>
          <figcaption className="pointer-events-none mt-1.5 text-[0.7rem] text-ink-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100">
            {photo.caption}
          </figcaption>
        </div>
      </div>
    </figure>
  )
}

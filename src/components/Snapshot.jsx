export default function Snapshot({ photo }) {
  return (
    <figure
      data-photo
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
        </div>
      </div>
    </figure>
  )
}

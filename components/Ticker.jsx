/** Scrolling strip of dish names (decorative; pauses off screen). */
export default function Ticker({ items, reverse = false }) {
  const text = `${items.join(' • ')} • `;
  return (
    <div className={`ticker-strip${reverse ? ' ticker-reverse' : ''}`} aria-hidden="true" data-play-when-visible="">
      <div className="ticker-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

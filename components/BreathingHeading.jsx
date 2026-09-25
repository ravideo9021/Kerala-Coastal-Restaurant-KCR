/**
 * Section heading whose letters slowly "breathe" between two weights of the
 * variable display font, in a wave that starts from the middle of each line.
 *
 * Pure CSS (one shared keyframe in globals.css). The animation only runs
 * while the heading is on screen (see ScrollEffects), stops for reduced
 * motion, and screen readers get the plain text once.
 *
 *   <BreathingHeading lines={[{ text: 'A Taste of', size: 'sm' }, { text: 'Kerala', size: 'lg' }]} />
 */
export default function BreathingHeading({ as: Tag = 'h2', id, lines, tagline, align = 'center', className = '' }) {
  const label = lines.map((l) => l.text).join(' ');
  return (
    <div className={`breathe-wrap breathe-wrap--${align} ${className}`}>
      <Tag id={id} className="breathe" data-play-when-visible="">
        <span className="sr-only">{label}</span>
        {lines.map(({ text, size = 'md', min = 400, max = 900, duration = 2.2, step = 0.18 }) => {
          const chars = [...text];
          return (
            <span
              key={text}
              className={`breathe-line breathe-line--${size}`}
              aria-hidden="true"
              style={{ '--w-min': min, '--w-max': max, '--breathe-dur': `${duration}s` }}
            >
              {chars.map((char, i) => (
                <span key={i} style={{ animationDelay: `${((i - chars.length / 2) * step).toFixed(2)}s` }}>
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </span>
          );
        })}
      </Tag>
      {tagline && <p className="breathe-tagline">{tagline}</p>}
    </div>
  );
}

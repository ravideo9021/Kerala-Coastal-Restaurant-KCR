import Link from 'next/link';

/**
 * Wordmark: "KERALA" in the display face with "Coastal" in script, like the
 * mural in the restaurant. Each word carries its own gradient: Safari only
 * paints `background-clip: text` on an element's own text, so a gradient on
 * the parent would leave a child word invisible.
 */
export default function Logo({ className = '', onClick }) {
  return (
    <Link href="/" className={`logo ${className}`} onClick={onClick}>
      <span className="logo-word">Kerala</span> <span className="logo-script">Coastal</span>
    </Link>
  );
}

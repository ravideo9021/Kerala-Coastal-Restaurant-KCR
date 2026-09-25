import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="script">Oops</p>
        <h1>This dish isn&apos;t on the menu</h1>
        <p className="lead">The page you were looking for doesn&apos;t exist or has moved.</p>
        <div className="not-found-actions">
          <Link className="btn btn-gold" href="/">
            Back to home
          </Link>
          <Link className="btn btn-outline" href="/menu">
            See the menu
          </Link>
        </div>
      </div>
    </section>
  );
}

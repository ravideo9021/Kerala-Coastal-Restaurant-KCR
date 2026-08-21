export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Kerala Coastal Restaurant</h3>
          <p>
            Authentic Kerala cuisine crafted with love, fresh seafood, and
            time-honoured recipes from God&apos;s Own Country. Dine-in or order
            online for a taste of the Malabar coast.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
            <a
              href="https://www.swiggy.com/menu/750696?source=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order on Swiggy
            </a>
            <a
              href="https://zomato.onelink.me/xqzv/0lb6eb63"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order on Zomato
            </a>
          </nav>
        </div>

        <div className="footer-hours">
          <h4>Opening Hours</h4>
          <p>Monday – Sunday</p>
          <p style={{ color: 'var(--cream)', fontWeight: 700 }}>
            11:00 AM – 11:00 PM
          </p>
          <div className="footer-phone">
            <a href="tel:+917633019866">+91 76330 19866</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Kerala Coastal Restaurant (KCR). All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

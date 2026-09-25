import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import MapEmbed from './MapEmbed';
import OpenStatus from './OpenStatus';
import { WhatsAppIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';
import { hoursSummary } from '@/lib/hours';

export default function Visit() {
  const { address } = site;
  return (
    <section className="visit section section--open" id="visit" aria-labelledby="visit-title">
      <div className="container visit-grid">
        <div className="visit-info reveal">
          <p className="script">Visit us</p>
          <h2 id="visit-title">Find us on Shankar Road</h2>
          <address className="visit-list">
            <p className="visit-item">
              <MapPin size={20} aria-hidden="true" />
              <span>
                <a href={site.maps.place} target="_blank" rel="noopener noreferrer">
                  {address.street}, {address.locality}, {address.city} {address.postalCode}
                </a>
                <small>{address.landmark}</small>
              </span>
            </p>
            <p className="visit-item">
              <Clock size={20} aria-hidden="true" />
              <span>
                <OpenStatus />
                <small>{hoursSummary()}</small>
              </span>
            </p>
            <p className="visit-item">
              <Phone size={20} aria-hidden="true" />
              <span>
                <a href={site.phone.href}>{site.phone.display}</a>
                <small>Reservations, takeaway &amp; orders</small>
              </span>
            </p>
            <p className="visit-item">
              <WhatsAppIcon size={20} />
              <span>
                <a
                  href={whatsappLink('Hi KCR! I would like to book a table.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.whatsapp.display}
                </a>
                <small>WhatsApp</small>
              </span>
            </p>
          </address>
          <div className="visit-actions">
            <a className="btn btn-gold" href={site.maps.directions} target="_blank" rel="noopener noreferrer">
              <Navigation size={18} aria-hidden="true" /> Get directions
            </a>
            <a className="btn btn-outline" href={site.phone.href}>
              <Phone size={17} aria-hidden="true" /> Call us
            </a>
          </div>
        </div>
        <div className="visit-map reveal">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}

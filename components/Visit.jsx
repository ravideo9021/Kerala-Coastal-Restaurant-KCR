import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import MapEmbed from './MapEmbed';
import OpenStatus from './OpenStatus';
import OrderButton from './OrderButton';
import BreathingHeading from './BreathingHeading';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';
import { hoursSummary } from '@/lib/hours';

export default function Visit() {
  const { address } = site;
  return (
    <section id="visit" className="contact" aria-labelledby="visit-title">
      <div className="contact-wrapper">
        <div className="contact-info">
          <p className="eyebrow reveal">Find us</p>
          <div className="reveal">
            <BreathingHeading
              id="visit-title"
              align="start"
              lines={[
                { text: 'Visit', size: 'sm', max: 800, duration: 2.5, step: 0.2 },
                { text: 'KCR', size: 'lg', duration: 2, step: 0.25 },
              ]}
              tagline="We'd love to host you"
            />
          </div>

          <address className="reveal">
            <div className="contact-item">
              <MapPin size={22} aria-hidden="true" />
              <div>
                <a href={site.maps.place} target="_blank" rel="noopener noreferrer">
                  {address.street}
                </a>
                <span>
                  {address.landmark}, {address.locality}, {address.city} {address.postalCode}
                </span>
              </div>
            </div>
            <div className="contact-item">
              <Phone size={22} aria-hidden="true" />
              <div>
                <a href={site.phone.href}>{site.phone.display}</a>
                <span>Call to reserve a table or order takeaway</span>
              </div>
            </div>
            <div className="contact-item">
              <Clock size={22} aria-hidden="true" />
              <div>
                <strong className="contact-hours">{hoursSummary()}</strong>
                <OpenStatus />
              </div>
            </div>
          </address>

          <div className="contact-actions reveal">
            <a className="btn btn-teal" href={site.maps.directions} target="_blank" rel="noopener noreferrer">
              <Navigation size={17} aria-hidden="true" /> Get directions
            </a>
            <a
              className="btn btn-whatsapp"
              href={whatsappLink('Hi KCR! I would like to book a table.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} /> Book on WhatsApp
            </a>
          </div>

          <div className="contact-order reveal">
            <OrderButton brand="swiggy" />
            <OrderButton brand="zomato" />
          </div>

          <div className="contact-social reveal">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="KCR on Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Chat with KCR on WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
          </div>
        </div>

        <div className="contact-map reveal">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}

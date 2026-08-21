'use client';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-wrapper">
        <div className="contact-info">
          <p className="eyebrow reveal">Find Us</p>
          <div className="reveal">
            <AnimatedText
              text="Visit"
              fontSize={42}
              minWeight={300}
              maxWeight={800}
              animationDuration={2.5}
              delayMultiplier={0.2}
            />
            <AnimatedText
              text="KCR"
              fontSize={56}
              minWeight={300}
              maxWeight={900}
              animationDuration={2}
              delayMultiplier={0.25}
            />
            <em style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-script)', fontSize: '20px', color: 'var(--coconut)', marginTop: '8px' }}>We&apos;d love to host you</em>
          </div>
          <address className="reveal">
            <div className="contact-item">
              <MapPin size={22} />
              <div>
                <a
                  href="https://www.google.com/maps/place/Kerala+Coastal+Restaurant+(KCR)/@28.6364417,77.181616,17z/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2/76, Ground Floor, Shankar Road
                </a>
                <span>Opposite BSES Office, Rajinder Nagar, New Delhi</span>
              </div>
            </div>
            <div className="contact-item">
              <Phone size={22} />
              <div>
                <a href="tel:+917633019866">+91 76330 19866</a>
                <span>Call us to reserve a table</span>
              </div>
            </div>
            <div className="contact-item">
              <Clock size={22} />
              <div>
                <span style={{ color: 'var(--cream)', fontWeight: 700, fontSize: '18px' }}>
                  11:00 AM – 11:00 PM
                </span>
                <span>Open all 7 days</span>
              </div>
            </div>
          </address>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="https://www.swiggy.com/menu/750696?source=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-teal"
            >
              Order on Swiggy
            </a>
            <a
              href="https://zomato.onelink.me/xqzv/0lb6eb63"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red"
            >
              Order on Zomato
            </a>
          </div>
        </div>

        <div className="contact-map reveal">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.7!2d77.181616!3d28.6364417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKerala+Coastal+Restaurant+(KCR)!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '14px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kerala Coastal Restaurant location"
          />
        </div>
      </div>
    </section>
  );
}

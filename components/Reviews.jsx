import { ArrowUpRight, MessageSquareText, Star } from 'lucide-react';
import ReviewStack from './ReviewStack';
import { GoogleIcon, ZomatoIcon } from './BrandIcons';
import { reviews } from '@/data/reviews';
import { site } from '@/data/site';

/**
 * Reviews link to where they really live (Google, Zomato, Tripadvisor). The
 * previous site showed twelve made-up testimonials; genuine ones can be added
 * to data/reviews.js and then appear in the animated card stack.
 */
export default function Reviews() {
  const rating = site.reviews.googleRating;
  const writeUrl = site.reviews.googleWrite || site.reviews.google;

  return (
    <section className="reviews-section" id="reviews" aria-labelledby="reviews-title">
      <div className="section-head">
        <p className="eyebrow reveal">Reviews</p>
        <h2 id="reviews-title" className="reveal">
          What our
          <br />
          guests say
          <em>Real reviews, straight from the source</em>
        </h2>
        <p className="lead reveal">
          Read what diners say about us on Google, Zomato and Tripadvisor. Eaten with us? A quick review helps
          other Kerala-food lovers in Delhi find us.
        </p>
      </div>

      {reviews.length >= 3 && <ReviewStack reviews={reviews} />}

      <div className="review-platforms">
        <a className="platform-card reveal" href={site.reviews.google} target="_blank" rel="noopener noreferrer">
          <span className="platform-icon platform-icon--google">
            <GoogleIcon size={24} />
          </span>
          <span className="platform-text">
            <strong>Google</strong>
            <span>
              {rating ? `${rating.value} ★ from ${rating.count.toLocaleString('en-IN')}+ reviews` : 'Reviews on Google Maps'}
            </span>
          </span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
        <a className="platform-card reveal" href={site.reviews.zomato} target="_blank" rel="noopener noreferrer">
          <span className="platform-icon platform-icon--zomato">
            <ZomatoIcon size={42} />
          </span>
          <span className="platform-text">
            <strong>Zomato</strong>
            <span>Dining &amp; delivery reviews</span>
          </span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
        <a className="platform-card reveal" href={site.reviews.tripadvisor} target="_blank" rel="noopener noreferrer">
          <span className="platform-icon platform-icon--trip">
            <MessageSquareText size={24} aria-hidden="true" />
          </span>
          <span className="platform-text">
            <strong>Tripadvisor</strong>
            <span>Reviews from travellers</span>
          </span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
        <a className="platform-card platform-card--cta reveal" href={writeUrl} target="_blank" rel="noopener noreferrer">
          <span className="platform-icon">
            <Star size={24} aria-hidden="true" />
          </span>
          <span className="platform-text">
            <strong>Loved your meal?</strong>
            <span>Leave us a review on Google</span>
          </span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

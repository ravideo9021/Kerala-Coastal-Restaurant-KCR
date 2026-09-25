/**
 * Business facts used across the whole site (header, footer, contact,
 * structured data, WhatsApp messages...). Change them here, once.
 *
 * Please double-check anything marked VERIFY against your Google Business
 * Profile: search engines and customers compare the two, and mismatched hours
 * or phone numbers cost both rankings and walk-ins.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://kerala-coastal-restaurant.vercel.app').replace(/\/$/, '');

const PLACE_URL = 'https://www.google.com/maps/place/Kerala+Coastal+Restaurant+(KCR)/@28.6364417,77.181616,17z/';
const MAP_QUERY = 'Kerala Coastal Restaurant (KCR), 2/76 Shankar Road, Rajinder Nagar, New Delhi 110060';

export const site = {
  name: 'Kerala Coastal Restaurant',
  shortName: 'KCR',
  fullName: 'Kerala Coastal Restaurant (KCR)',
  tagline: 'Authentic Kerala cuisine in Delhi',
  description:
    'Kerala Coastal Restaurant (KCR) in Rajinder Nagar, New Delhi: Kerala fish curry, meen pollichathu, Thalassery biryani, kizhi parotta, appam and puttu, plus North Indian and Indo-Chinese favourites. Dine-in, takeaway, delivery, parties and catering.',
  cuisines: ['Kerala', 'South Indian', 'Seafood', 'North Indian', 'Chinese'],
  priceRange: '₹₹',

  phone: { display: '+91 76330 19866', href: 'tel:+917633019866', e164: '+917633019866' },
  whatsapp: { display: '+91 76330 19866', number: '917633019866' },

  address: {
    street: '2/76, Ground Floor, Shankar Road',
    landmark: 'Opposite BSES Office',
    locality: 'Rajinder Nagar',
    city: 'New Delhi',
    region: 'Delhi',
    postalCode: '110060',
    country: 'IN',
  },
  geo: { lat: 28.6364417, lng: 77.1841909 },

  maps: {
    place: PLACE_URL,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`,
    embed: `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=17&output=embed`,
  },

  // VERIFY: the previous site said 11 AM - 11 PM every day, while Zomato lists
  // 8 AM - 2 AM. Keep this identical to your Google Business Profile.
  // Days: 0 = Sunday ... 6 = Saturday, 24h "HH:MM"; a closing time earlier
  // than the opening time means "after midnight".
  hours: [{ days: [0, 1, 2, 3, 4, 5, 6], opens: '11:00', closes: '23:00' }],
  timeZone: 'Asia/Kolkata',

  order: {
    swiggy: 'https://www.swiggy.com/menu/750696?source=sharing',
    zomato: 'https://zomato.onelink.me/xqzv/0lb6eb63',
  },

  social: {
    instagram: 'https://www.instagram.com/keralacoastalrestaurant/',
  },

  reviews: {
    // Where "Read our reviews" sends people (your Google Maps listing).
    google: PLACE_URL,
    zomato: 'https://www.zomato.com/ncr/kerala-coastal-restaurant-rajinder-nagar-new-delhi/reviews',
    tripadvisor:
      'https://www.tripadvisor.com/Restaurant_Review-g304551-d26501841-Reviews-Kerala_Coastal_Restaurant-New_Delhi_National_Capital_Territory_of_Delhi.html',
    // Optional: paste the "Ask for reviews" short link from your Google
    // Business Profile (looks like https://g.page/r/XXXX/review) to open the
    // review form directly. Until then the button opens your Maps listing.
    googleWrite: null,
    // Optional: shown as "4.x on Google" once filled in from your profile,
    // e.g. { value: 4.1, count: 1000 }. Left empty so the site never shows a
    // number that is out of date.
    googleRating: null,
  },
};

export const fullAddress = `${site.address.street}, ${site.address.landmark}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}`;

/** wa.me deep link with a pre-filled message. */
export function whatsappLink(message) {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${site.whatsapp.number}${text}`;
}

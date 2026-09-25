/**
 * The full menu — the single source of truth for the menu section, the /menu
 * page, dish cards and structured data. Prices are in rupees.
 *
 * - `diet`: 'veg' | 'nonveg' (drives the FSSAI-style green / brown marks;
 *   egg dishes are non-veg)
 * - `prices`: one number, or several matching the section's `portions`
 * - `special`: highlighted as a must-try
 *
 * VERIFY: dishes and prices were carried over from the previous website.
 * Please check them against your current menu card — anything changed here
 * updates the home page, the /menu page and the dish cards together.
 */

export const menu = [
  {
    id: 'kerala',
    label: 'Kerala Kitchen',
    blurb: 'Appam, puttu, parotta and dosa',
    sections: [
      {
        title: 'Kerala Traditional',
        items: [
          { name: 'Appam (2 pcs)', slug: 'appam', diet: 'veg', prices: [99] },
          { name: 'Puttu & Kadala Curry', diet: 'veg', prices: [179] },
          { name: 'Idiyappam (3 pcs)', slug: 'idiyappam', diet: 'veg', prices: [119] },
          { name: 'Kerala Parotta (2 pcs)', slug: 'kerala-parotta', diet: 'veg', prices: [99], special: true },
          { name: 'Kizhi Parotta (Chicken)', slug: 'kizhi-parotta', diet: 'nonveg', prices: [349] },
          { name: 'Porotta & Beef Fry', diet: 'nonveg', prices: [329] },
          { name: 'Dosa', diet: 'veg', prices: [129] },
          { name: 'Masala Dosa', diet: 'veg', prices: [149] },
        ],
      },
    ],
  },
  {
    id: 'seafood',
    label: 'Seafood',
    blurb: 'Fish, prawns, crab and squid, Kerala style',
    sections: [
      {
        title: 'Seafood Specials',
        items: [
          { name: 'Kerala Fish Curry', diet: 'nonveg', prices: [399], special: true },
          { name: 'Fish Moilee', diet: 'nonveg', prices: [419] },
          { name: 'Meen Pollichathu', diet: 'nonveg', prices: [449], special: true },
          { name: 'Prawns Masala', diet: 'nonveg', prices: [469] },
          { name: 'Prawns Curry', diet: 'nonveg', prices: [449] },
          { name: 'Chemmeen Ularthiyathu', diet: 'nonveg', prices: [469] },
          { name: 'Fish Mappas', diet: 'nonveg', prices: [429] },
          { name: 'Karimeen Fry', diet: 'nonveg', prices: [499] },
          { name: 'Crab Roast', diet: 'nonveg', prices: [549] },
          { name: 'Squid Roast', diet: 'nonveg', prices: [449] },
        ],
      },
    ],
  },
  {
    id: 'biryani',
    label: 'Biryani',
    blurb: 'Kerala and Thalassery biryanis',
    sections: [
      {
        title: 'Kerala Biryani',
        items: [
          { name: 'Chicken Biryani', diet: 'nonveg', prices: [329], special: true },
          { name: 'Thalassery Chicken Biryani', diet: 'nonveg', prices: [369], special: true },
          { name: 'Kerala Chicken Dum Biryani', diet: 'nonveg', prices: [359] },
          { name: 'Mutton Biryani', diet: 'nonveg', prices: [449] },
          { name: 'Prawns Biryani', diet: 'nonveg', prices: [449] },
          { name: 'Fish Biryani', diet: 'nonveg', prices: [399] },
          { name: 'Egg Biryani', diet: 'nonveg', prices: [269] },
          { name: 'Veg Biryani', diet: 'veg', prices: [249] },
        ],
      },
    ],
  },
  {
    id: 'starters',
    label: 'Starters',
    blurb: 'Fries, tikkas and tandoor',
    sections: [
      {
        title: 'Non-Veg Starters',
        portions: ['Half', 'Full'],
        items: [
          { name: 'Chicken 65', diet: 'nonveg', prices: [329], special: true },
          { name: 'Chilli Chicken', diet: 'nonveg', prices: [329] },
          { name: 'Chicken Tikka', diet: 'nonveg', prices: [349] },
          { name: 'Tandoori Chicken', diet: 'nonveg', prices: [349, 599] },
          { name: 'Chicken Lollipop', diet: 'nonveg', prices: [329] },
          { name: 'Fish Fry', diet: 'nonveg', prices: [379], special: true },
          { name: 'Fish Tikka', diet: 'nonveg', prices: [399] },
          { name: 'Prawns Fry', diet: 'nonveg', prices: [449] },
          { name: 'Prawns Pepper Fry', diet: 'nonveg', prices: [449] },
        ],
      },
      {
        title: 'Veg Starters',
        items: [
          { name: 'Paneer Tikka', diet: 'veg', prices: [299] },
          { name: 'Paneer 65', diet: 'veg', prices: [289] },
          { name: 'Gobi Manchurian', diet: 'veg', prices: [249] },
          { name: 'Mushroom Pepper Fry', diet: 'veg', prices: [269] },
          { name: 'Baby Corn Pepper Fry', diet: 'veg', prices: [249] },
          { name: 'Crispy Corn', diet: 'veg', prices: [229] },
          { name: 'Veg Spring Roll', diet: 'veg', prices: [199] },
          { name: 'Hara Bhara Kebab', diet: 'veg', prices: [249] },
        ],
      },
      {
        title: 'Tandoori Veg & Chaap',
        items: [
          { name: 'Paneer Malai Tikka', diet: 'veg', prices: [319] },
          { name: 'Tandoori Mushroom', diet: 'veg', prices: [269] },
          { name: 'Soya Chaap', diet: 'veg', prices: [249] },
          { name: 'Malai Chaap', diet: 'veg', prices: [269] },
          { name: 'Afghani Chaap', diet: 'veg', prices: [279] },
        ],
      },
    ],
  },
  {
    id: 'curries',
    label: 'Curries',
    blurb: 'North Indian chicken, mutton, paneer and dal',
    sections: [
      {
        title: 'Non-Veg Curries',
        items: [
          { name: 'Butter Chicken', diet: 'nonveg', prices: [369], special: true },
          { name: 'Chicken Curry', diet: 'nonveg', prices: [329] },
          { name: 'Kadai Chicken', diet: 'nonveg', prices: [349] },
          { name: 'Chicken Masala', diet: 'nonveg', prices: [349] },
          { name: 'Chicken Do Pyaza', diet: 'nonveg', prices: [349] },
          { name: 'Mutton Curry', diet: 'nonveg', prices: [449] },
          { name: 'Mutton Rogan Josh', diet: 'nonveg', prices: [469] },
          { name: 'Egg Curry', diet: 'nonveg', prices: [249] },
          { name: 'Egg Masala', diet: 'nonveg', prices: [249] },
        ],
      },
      {
        title: 'Veg Curries',
        items: [
          { name: 'Paneer Butter Masala', diet: 'veg', prices: [299], special: true },
          { name: 'Kadai Paneer', diet: 'veg', prices: [289] },
          { name: 'Shahi Paneer', diet: 'veg', prices: [299] },
          { name: 'Palak Paneer', diet: 'veg', prices: [279] },
          { name: 'Malai Kofta', diet: 'veg', prices: [289] },
          { name: 'Dal Makhani', diet: 'veg', prices: [249] },
          { name: 'Dal Tadka', diet: 'veg', prices: [219] },
          { name: 'Mix Veg', diet: 'veg', prices: [229] },
          { name: 'Aloo Gobi', diet: 'veg', prices: [219] },
          { name: 'Chana Masala', diet: 'veg', prices: [229] },
        ],
      },
    ],
  },
  {
    id: 'chinese',
    label: 'Chinese',
    blurb: 'Fried rice, noodles and Indo-Chinese curries',
    sections: [
      {
        title: 'Rice, Noodles & Manchurian',
        items: [
          { name: 'Chicken Fried Rice', diet: 'nonveg', prices: [269] },
          { name: 'Egg Fried Rice', diet: 'nonveg', prices: [239] },
          { name: 'Veg Fried Rice', diet: 'veg', prices: [219] },
          { name: 'Chicken Noodles', diet: 'nonveg', prices: [269] },
          { name: 'Egg Noodles', diet: 'nonveg', prices: [239] },
          { name: 'Veg Noodles', diet: 'veg', prices: [219] },
          { name: 'Chicken Manchurian', diet: 'nonveg', prices: [289] },
          { name: 'Veg Manchurian', diet: 'veg', prices: [229] },
        ],
      },
      {
        title: 'Chinese Curries',
        items: [
          { name: 'Honey Chilli Chicken', diet: 'nonveg', prices: [329] },
          { name: 'Dragon Chicken', diet: 'nonveg', prices: [319] },
          { name: 'Kung Pao Chicken', diet: 'nonveg', prices: [319] },
          { name: 'Schezwan Chicken', diet: 'nonveg', prices: [309] },
          { name: 'Chilli Paneer', diet: 'veg', prices: [269] },
          { name: 'Schezwan Paneer', diet: 'veg', prices: [279] },
        ],
      },
    ],
  },
  {
    id: 'breads',
    label: 'Breads',
    blurb: 'Naan, roti and paratha',
    sections: [
      {
        title: 'Breads',
        items: [
          { name: 'Tandoori Roti', diet: 'veg', prices: [49] },
          { name: 'Butter Naan', diet: 'veg', prices: [69] },
          { name: 'Garlic Naan', diet: 'veg', prices: [79] },
          { name: 'Cheese Naan', diet: 'veg', prices: [99] },
          { name: 'Laccha Paratha', diet: 'veg', prices: [69] },
          { name: 'Missi Roti', diet: 'veg', prices: [59] },
          { name: 'Kulcha', diet: 'veg', prices: [69] },
          { name: 'Aloo Paratha', diet: 'veg', prices: [89] },
        ],
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts & Drinks',
    blurb: 'Payasam, falooda, shakes and more',
    sections: [
      {
        title: 'Desserts',
        items: [
          { name: 'Payasam', diet: 'veg', prices: [149], special: true },
          { name: 'Falooda', diet: 'veg', prices: [169] },
          { name: 'Gulab Jamun (2 pcs)', slug: 'gulab-jamun', diet: 'veg', prices: [99] },
          { name: 'Rasmalai (2 pcs)', slug: 'rasmalai', diet: 'veg', prices: [129] },
          { name: 'Ice Cream (Vanilla / Chocolate)', slug: 'ice-cream', diet: 'veg', prices: [99] },
        ],
      },
      {
        title: 'Drinks',
        items: [
          { name: 'Mango Shake', diet: 'veg', prices: [149] },
          { name: 'Cold Coffee', diet: 'veg', prices: [129] },
          { name: 'Buttermilk', diet: 'veg', prices: [79] },
        ],
      },
    ],
  },
];

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Every item with its category/section context and a stable slug. */
export const allItems = menu.flatMap((category) =>
  category.sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      slug: item.slug ?? slugify(item.name),
      categoryId: category.id,
      section: section.title,
      portions: section.portions,
    })),
  ),
);

const bySlug = new Map(allItems.map((item) => [item.slug, item]));

export function getItem(slug) {
  const item = bySlug.get(slug);
  if (!item) throw new Error(`Unknown menu item "${slug}"`);
  return item;
}

export const formatRupees = (value) => `₹${value.toLocaleString('en-IN')}`;

/** [{ label: 'Half', value: 349 }, ...] — labels align to the right of `portions`. */
export function priceList(item) {
  const { prices = [], portions } = item;
  if (!portions || prices.length < 2) return prices.map((value) => ({ label: null, value }));
  const labels = portions.slice(portions.length - prices.length);
  return prices.map((value, i) => ({ label: labels[i] ?? null, value }));
}

/** Short price for cards: "₹349" or "from ₹349". */
export function priceFrom(item) {
  if (!item.prices?.length) return '';
  const min = Math.min(...item.prices);
  return item.prices.length > 1 ? `from ${formatRupees(min)}` : formatRupees(min);
}

export const dishCount = allItems.length;

'use client';
import { useDeferredValue, useEffect, useId, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import DietMark from './DietMark';
import { menu, formatRupees, priceList } from '@/data/menu';

const DIETS = [
  { id: 'all', label: 'All' },
  { id: 'veg', label: 'Veg' },
  { id: 'nonveg', label: 'Non-veg' },
];

// Menu words people may not search for: "prawns" should find "Chemmeen
// Ularthiyathu", "fish" should find "Meen Pollichathu".
const ALIASES = [
  [/\b(meen|fish|karimeen|pollichathu|moilee|mappas)\b/, 'fish meen seafood'],
  [/\b(chemmeen|prawns?)\b/, 'prawn prawns shrimp chemmeen seafood'],
  [/\b(crab|squid)\b/, 'seafood'],
  [/\bkarimeen\b/, 'pearl spot'],
  [/\bpollichathu\b/, 'banana leaf'],
  [/\bmoilee\b/, 'molee stew coconut'],
  [/\b(ularthiyathu|roast)\b/, 'roast fry dry'],
  [/\b(parotta|porotta)\b/, 'parotta porotta paratha bread'],
  [/\bkizhi\b/, 'banana leaf parcel'],
  [/\b(appam|idiyappam|puttu|dosa)\b/, 'breakfast south indian'],
  [/\bidiyappam\b/, 'string hoppers noodles'],
  [/\bappam\b/, 'hoppers'],
  [/\b(kadala|chana)\b/, 'chickpeas chana kadala'],
  [/\bmutton\b/, 'meat lamb goat'],
  [/\baloo\b/, 'potato'],
  [/\bgobi\b/, 'cauliflower'],
  [/\bpalak\b/, 'spinach'],
  [/\bchaap\b/, 'soya soy'],
  [/\bpaneer\b/, 'cottage cheese'],
  [/\bdal\b/, 'lentils daal'],
  [/\b(roti|naan|paratha|kulcha)\b/, 'bread breads'],
  [/\bbiryani\b/, 'biriyani rice'],
  [/\bpayasam\b/, 'kheer sweet dessert'],
  [/\b(falooda|ice cream|gulab|rasmalai)\b/, 'sweet dessert'],
  [/\b(shake|coffee|buttermilk)\b/, 'drink drinks beverage'],
  [/\bschezwan\b/, 'szechuan sichuan'],
  [/\b(manchurian|noodles|fried rice)\b/, 'chinese'],
];

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const haystacks = new Map();
for (const category of menu) {
  for (const section of category.sections) {
    for (const item of section.items) {
      const base = normalize(`${item.name} ${section.title} ${category.label}`);
      const extra = ALIASES.filter(([re]) => re.test(base)).map(([, words]) => words);
      haystacks.set(item, `${base} ${extra.join(' ')}`);
    }
  }
}

function filterMenu(diet, terms) {
  return menu
    .map((category) => ({
      ...category,
      sections: category.sections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => {
            if (diet !== 'all' && item.diet !== diet && item.diet !== 'both') return false;
            const hay = haystacks.get(item);
            return terms.every((t) => hay.includes(t));
          }),
        }))
        .filter((section) => section.items.length > 0),
    }))
    .filter((category) => category.sections.length > 0);
}

function Prices({ item, portions }) {
  const list = priceList({ ...item, portions });
  if (!list.length) return <span className="mi-prices"><span className="mi-price">—</span></span>;
  return (
    <span className="mi-prices">
      {list.map((p, i) => (
        <span className="mi-price" key={i}>
          {p.label && <small>{p.label}</small>}
          {formatRupees(p.value)}
        </span>
      ))}
    </span>
  );
}

function Section({ section, Heading }) {
  return (
    <div className="menu-block">
      <Heading className="menu-block-title">{section.title}</Heading>
      <ul className="menu-items">
        {section.items.map((item) => (
          <li key={item.name} className={`mi${item.special ? ' mi--special' : ''}`}>
            <DietMark diet={item.diet} size={14} className="mi-mark" />
            <span className="mi-name">
              {item.name}
              {item.special && <span className="mi-badge">Must try</span>}
            </span>
            <Prices item={item} portions={section.portions} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Searchable, filterable menu.
 * - mode "tabs": one category at a time (home page)
 * - mode "full": every category on one page with a jump bar (/menu)
 */
export default function MenuExplorer({ mode = 'tabs', headingLevel = 3 }) {
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('all');
  const [tab, setTab] = useState(menu[0].id);
  const [activeJump, setActiveJump] = useState(menu[0].id);
  const uid = useId();

  const deferredQuery = useDeferredValue(query);
  const terms = useMemo(() => normalize(deferredQuery).split(' ').filter(Boolean), [deferredQuery]);
  const searching = terms.length > 0;
  const filtered = useMemo(() => filterMenu(diet, terms), [diet, terms]);
  const count = filtered.reduce((n, c) => n + c.sections.reduce((m, s) => m + s.items.length, 0), 0);

  const showAll = mode === 'full' || searching;
  const categories = showAll ? filtered : filtered.filter((c) => c.id === tab);

  // Category titles only appear when several categories are listed; keep the
  // heading levels sequential either way.
  const CategoryHeading = `h${headingLevel}`;
  const SectionHeading = `h${Math.min(showAll ? headingLevel + 1 : headingLevel, 6)}`;

  // Highlight the category in view on the full menu page.
  useEffect(() => {
    if (mode !== 'full') return;
    const els = filtered.map((c) => document.getElementById(c.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveJump(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mode, filtered]);

  return (
    <div className={`menu-explorer menu-explorer--${mode}`}>
      <div className="menu-controls">
        <div className="menu-search">
          <Search size={18} aria-hidden="true" />
          <label htmlFor={`${uid}-q`} className="sr-only">
            Search the menu
          </label>
          <input
            id={`${uid}-q`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes: fish curry, biryani, appam…"
            autoComplete="off"
            enterKeyHint="search"
          />
          {query && (
            <button type="button" className="menu-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        <fieldset className="diet-toggle">
          <legend className="sr-only">Show dishes</legend>
          {DIETS.map((d) => (
            <label key={d.id} className={diet === d.id ? 'is-active' : undefined}>
              <input
                type="radio"
                name={`${uid}-diet`}
                value={d.id}
                checked={diet === d.id}
                onChange={() => setDiet(d.id)}
              />
              {d.id !== 'all' && <DietMark diet={d.id} size={13} decorative />}
              {d.label}
            </label>
          ))}
        </fieldset>
      </div>

      {mode === 'tabs' && !searching && (
        <div className="menu-tabs" role="group" aria-label="Menu categories">
          {menu.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`menu-tab${tab === c.id ? ' is-active' : ''}`}
              aria-pressed={tab === c.id}
              onClick={() => setTab(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {mode === 'full' && !searching && filtered.length > 1 && (
        <nav className="menu-jump" aria-label="Menu categories">
          {filtered.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={activeJump === c.id ? 'is-active' : undefined}>
              {c.label}
            </a>
          ))}
        </nav>
      )}

      <p className="menu-status" aria-live="polite">
        {searching || diet !== 'all' ? `${count} ${count === 1 ? 'dish' : 'dishes'} found` : ''}
      </p>

      {categories.length === 0 ? (
        <div className="menu-empty">
          <p>No dishes match “{query}”.</p>
          <p>Try another word, or call us: the kitchen may still be able to make it for you.</p>
        </div>
      ) : (
        categories.map((category) => (
          <section key={category.id} id={mode === 'full' ? category.id : undefined} className="menu-category" aria-label={category.label}>
            {showAll && <CategoryHeading className="menu-category-title">{category.label}</CategoryHeading>}
            <div className={`menu-columns${category.sections.length === 1 ? ' menu-columns--flow' : ''}`}>
              {category.sections.map((section) => (
                <Section key={section.title} section={section} Heading={SectionHeading} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

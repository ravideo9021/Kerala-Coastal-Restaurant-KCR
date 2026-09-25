import Picture from './Picture';
import DietMark from './DietMark';
import { getItem, priceFrom } from '@/data/menu';

/** Dish card whose diet mark and price always come from the menu data. */
export default function DishCard({ slug, image, alt, name, tag, description, sizes, compact = false }) {
  const item = getItem(slug);
  return (
    <article className={`dish-card${compact ? ' dish-card--compact' : ''} reveal`}>
      <div className="dish-card-media">
        <Picture name={image} alt={alt} sizes={sizes} />
      </div>
      <div className="dish-card-body">
        <div className="dish-card-meta">
          <DietMark diet={item.diet} size={16} />
          {tag && <span className="dish-tag">{tag}</span>}
        </div>
        <h3>{name ?? item.name}</h3>
        <p>{description}</p>
        <p className="dish-price">{priceFrom(item)}</p>
      </div>
    </article>
  );
}

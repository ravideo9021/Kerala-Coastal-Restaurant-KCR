import Picture from './Picture';
import DietMark from './DietMark';
import { getItem, priceFrom } from '@/data/menu';

/** Dish card whose diet mark and price always come from the menu data. */
export default function DishCard({ slug, image, alt, name, description, sizes }) {
  const item = getItem(slug);
  return (
    <article className="dish-card reveal">
      <div className="dish-card-media">
        <Picture name={image} alt={alt} sizes={sizes} />
      </div>
      <div className="dish-card-body">
        <h3>
          <DietMark diet={item.diet} size={15} className="dish-card-mark" />
          {name ?? item.name}
        </h3>
        <p>{description}</p>
        <p className="dish-card-price">{priceFrom(item)}</p>
      </div>
    </article>
  );
}

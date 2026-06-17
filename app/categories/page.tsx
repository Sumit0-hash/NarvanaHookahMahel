import type { Metadata } from 'next';
import { CategoryCard } from '@/components/category-card';
import { CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse hookah categories - Hookahs, Accessories, Flavours, Charcoal, Premium Collection and New Arrivals.',
};

export default function CategoriesPage() {
  return (
    <div className="container-luxury section-padding">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-2">Browse</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-50 mb-4">
          Shop By <span className="gold-gradient-text">Category</span>
        </h1>
        <p className="text-sm text-charcoal-400 max-w-lg mx-auto">
          Humari curated categories mein se choose karein &mdash; har category mein premium quality products available hai
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.handle}
            handle={cat.handle}
            title={cat.title}
            description={cat.description}
            image={cat.image}
          />
        ))}
      </div>
    </div>
  );
}

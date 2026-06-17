'use client';

import { useParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { EmptyState } from '@/components/empty-state';
import { ProductGridSkeleton } from '@/components/loading-skeleton';
import { CATEGORIES, PLACEHOLDER_PRODUCTS } from '@/lib/constants';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const handle = params.handle as string;
  const [isLoading, setIsLoading] = useState(true);

  const category = CATEGORIES.find((c) => c.handle === handle);
  const categoryName = category?.title || handle.replace('-', ' ');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const products = PLACEHOLDER_PRODUCTS.filter(
    (p) => p.productType.toLowerCase() === handle.replace('-', ' ')
  );

  if (isLoading) {
    return (
      <div className="container-luxury section-padding">
        <ProductGridSkeleton count={6} />
      </div>
    );
  }

  return (
    <div className="container-luxury section-padding">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link href="/" className="text-charcoal-500 hover:text-gold-500 transition-colors">Home</Link>
        <ChevronRight size={12} className="text-charcoal-600" />
        <Link href="/categories" className="text-charcoal-500 hover:text-gold-500 transition-colors">Categories</Link>
        <ChevronRight size={12} className="text-charcoal-600" />
        <span className="text-charcoal-300">{categoryName}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50">
          {categoryName} <span className="gold-gradient-text">Collection</span>
        </h1>
        {category?.description && (
          <p className="text-sm text-charcoal-400 mt-2">{category.description}</p>
        )}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              handle={product.handle}
              title={product.title}
              description={product.description}
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              image={product.image}
              productType={product.productType}
              tags={[...product.tags]}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          type="products"
          title={`No ${categoryName} products yet`}
          description="Check back soon for new additions to this category"
        />
      )}
    </div>
  );
}

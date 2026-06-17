import { ProductCard } from '@/components/product-card';
import { EmptyState } from '@/components/empty-state';
import { CATEGORIES } from '@/lib/constants';
import { productMatchesCategory } from '@/lib/product-filters';
import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  params: {
    handle: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { handle } = params;
  const category = CATEGORIES.find((c) => c.handle === handle);
  const categoryName = category?.title || handle.replace('-', ' ');
  const { products: allProducts } = await getProducts({ first: 100 });
  const products = allProducts.filter(
    (p) => productMatchesCategory(p, handle)
  );

  return (
    <div className="container-luxury section-padding">
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
              merchandiseId={product.merchandiseId}
              productType={product.productType}
              tags={[...product.tags]}
              available={product.availableForSale}
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

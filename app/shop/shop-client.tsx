'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { ProductGridSkeleton } from '@/components/loading-skeleton';
import { EmptyState } from '@/components/empty-state';
import { CATEGORIES } from '@/lib/constants';
import { productMatchesCategory } from '@/lib/product-filters';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import type { ShopifyProduct, SortOption } from '@/types';

type SortOptionType = SortOption | 'relevance';

export function ShopClient({ products }: { products: ShopifyProduct[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOptionType>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let visibleProducts = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      visibleProducts = visibleProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.productType.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      visibleProducts = visibleProducts.filter((p) => productMatchesCategory(p, selectedCategory));
    }

    switch (sortBy) {
      case 'price-asc':
        visibleProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        visibleProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'title-asc':
        visibleProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        visibleProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return visibleProducts;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const activeFilters = [
    ...(selectedCategory !== 'all' ? [{ key: 'category', label: CATEGORIES.find(c => c.handle === selectedCategory)?.title || selectedCategory }] : []),
    ...(sortBy !== 'relevance' ? [{ key: 'sort', label: `Sort: ${sortBy.replace('-', ' ')}` }] : []),
    ...(searchQuery ? [{ key: 'search', label: `"${searchQuery}"` }] : []),
  ];

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('relevance');
  };

  if (isLoading) {
    return (
      <div className="container-luxury section-padding">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50 mb-8">
          Shop <span className="gold-gradient-text">All</span>
        </h1>
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="container-luxury section-padding">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50">
          Shop <span className="gold-gradient-text">All</span>
        </h1>
        <p className="text-sm text-charcoal-400 mt-2">
          Explore our latest collection &mdash; best quality products at great prices
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-charcoal-800 border border-charcoal-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-charcoal-100 placeholder:text-charcoal-500 focus:outline-none focus:border-gold-500/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-charcoal-300"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-charcoal-800 border border-charcoal-700/50 rounded-lg text-sm text-charcoal-200 hover:border-gold-500/30 transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <div className={`${showFilters ? 'flex' : 'hidden'} md:flex items-center gap-3`}>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-charcoal-800 border border-charcoal-700/50 rounded-lg px-4 py-2.5 pr-10 text-sm text-charcoal-200 focus:outline-none focus:border-gold-500/50 transition-colors cursor-pointer"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.handle} value={cat.handle}>{cat.title}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOptionType)}
                className="appearance-none bg-charcoal-800 border border-charcoal-700/50 rounded-lg px-4 py-2.5 pr-10 text-sm text-charcoal-200 focus:outline-none focus:border-gold-500/50 transition-colors cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Name: A-Z</option>
                <option value="title-desc">Name: Z-A</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-xs text-gold-400"
            >
              {filter.label}
            </span>
          ))}
          <button
            onClick={clearFilters}
            className="text-xs text-charcoal-400 hover:text-charcoal-200 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      <p className="text-sm text-charcoal-500 mb-6">
        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
      </p>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
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
        <EmptyState type="search" />
      )}
    </div>
  );
}

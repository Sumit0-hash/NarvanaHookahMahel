'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  id: string;
  handle: string;
  title: string;
  description?: string;
  price: string;
  compareAtPrice?: string | null;
  image: string | null;
  productType?: string;
  tags?: string[];
  available?: boolean;
}

export function ProductCard({
  handle,
  title,
  price,
  compareAtPrice,
  image,
  productType,
  tags = [],
  available = true,
}: ProductCardProps) {
  const { addItem } = useCart();
  const discount = compareAtPrice ? getDiscountPercentage(price, compareAtPrice) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      merchandiseId: `local-${handle}`,
      quantity: 1,
      title,
      price,
      image,
      handle,
      variantTitle: 'Default',
    });
  };

  return (
    <Link
      href={`/product/${handle}`}
      className={cn(
        'group block bg-charcoal-800 border border-charcoal-700/30 rounded-xl overflow-hidden transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5',
        !available && 'opacity-60'
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-charcoal-700 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={32} className="text-charcoal-600" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-md">
              -{discount}%
            </span>
          )}
          {tags.includes('new') && (
            <span className="px-2 py-0.5 bg-gold-500 text-charcoal-900 text-[10px] font-bold rounded-md">
              NEW
            </span>
          )}
          {tags.includes('bestseller') && (
            <span className="px-2 py-0.5 bg-green-600 text-white text-[10px] font-bold rounded-md">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Quick add button */}
        <button
          onClick={handleAddToCart}
          disabled={!available}
          className={cn(
            'absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200',
            available
              ? 'bg-gold-500 text-charcoal-900 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-gold-400'
              : 'bg-charcoal-600 text-charcoal-400 cursor-not-allowed'
          )}
          aria-label="Add to cart"
        >
          <ShoppingBag size={16} />
        </button>
      </div>

      {/* Details */}
      <div className="p-4">
        {productType && (
          <p className="text-[10px] uppercase tracking-wider text-gold-500/60 mb-1">{productType}</p>
        )}
        <h3 className="text-sm font-medium text-charcoal-100 line-clamp-1 group-hover:text-gold-500 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-semibold text-gold-500">{formatPrice(price)}</span>
          {compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price) && (
            <span className="text-xs text-charcoal-500 line-through">{formatPrice(compareAtPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

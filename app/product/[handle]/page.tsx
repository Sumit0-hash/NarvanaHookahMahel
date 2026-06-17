'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Minus, Plus, ChevronRight, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { useCart } from '@/hooks/use-cart';
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils';
import { PLACEHOLDER_PRODUCTS } from '@/lib/constants';

export default function ProductDetailPage() {
  const params = useParams();
  const handle = params.handle as string;

  const product = PLACEHOLDER_PRODUCTS.find((p) => p.handle === handle);

  if (!product) {
    return (
      <div className="container-luxury section-padding text-center">
        <h1 className="text-2xl font-display font-bold text-charcoal-100">Product not found</h1>
        <p className="text-sm text-charcoal-400 mt-2">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/shop" className="inline-block mt-4 px-6 py-2.5 bg-gold-500 text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-gold-400 transition-colors">
          Browse Shop
        </Link>
      </div>
    );
  }

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.compareAtPrice ? getDiscountPercentage(product.price, product.compareAtPrice) : 0;
  const relatedProducts = PLACEHOLDER_PRODUCTS.filter((p) => p.productType === product.productType && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      merchandiseId: `local-${product.handle}`,
      quantity,
      title: product.title,
      price: product.price,
      image: product.image,
      handle: product.handle,
      variantTitle: 'Default',
    });
  };

  return (
    <div className="container-luxury section-padding">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link href="/" className="text-charcoal-500 hover:text-gold-500 transition-colors">Home</Link>
        <ChevronRight size={12} className="text-charcoal-600" />
        <Link href="/shop" className="text-charcoal-500 hover:text-gold-500 transition-colors">Shop</Link>
        <ChevronRight size={12} className="text-charcoal-600" />
        <span className="text-charcoal-300">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-charcoal-800 rounded-xl overflow-hidden border border-charcoal-700/30">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                -{discount}% OFF
              </span>
            )}
          </div>
          {/* Thumbnail row (same image for demo) */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'w-20 h-20 bg-charcoal-800 rounded-lg overflow-hidden border-2 transition-colors',
                  selectedImage === i ? 'border-gold-500' : 'border-charcoal-700/30 hover:border-charcoal-600'
                )}
              >
                <Image
                  src={product.image}
                  alt={`${product.title} ${i + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          {/* Category & Tags */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider text-gold-500/70">{product.productType}</span>
            {product.tags.includes('bestseller') && (
              <span className="px-2 py-0.5 bg-green-600/20 text-green-400 text-[10px] font-bold rounded-md uppercase">Bestseller</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal-50 mb-4">{product.title}</h1>

          {/* Rating placeholder */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} className={i <= 4 ? 'fill-gold-500 text-gold-500' : 'text-charcoal-600'} />
              ))}
            </div>
            <span className="text-xs text-charcoal-500">(4.0 - 24 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-gold-500">{formatPrice(product.price)}</span>
            {product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price) && (
              <span className="text-lg text-charcoal-500 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            {discount > 0 && (
              <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs font-semibold rounded">
                Save {formatPrice((parseFloat(product.compareAtPrice || '0') - parseFloat(product.price)).toString())}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-charcoal-300 leading-relaxed mb-6">{product.description}</p>

          {/* Quantity */}
          <div className="mb-6">
            <label className="text-sm font-medium text-charcoal-200 mb-2 block">Quantity</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-charcoal-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-charcoal-300 hover:bg-charcoal-700 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-medium text-charcoal-100 border-x border-charcoal-700">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-charcoal-300 hover:bg-charcoal-700 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-500 text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-gold-400 transition-all hover:shadow-lg hover:shadow-gold-500/20"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={cn(
                'w-12 h-12 flex items-center justify-center border rounded-lg transition-colors',
                isWishlisted
                  ? 'border-red-500/50 bg-red-500/10 text-red-400'
                  : 'border-charcoal-700 text-charcoal-400 hover:border-gold-500/30 hover:text-gold-500'
              )}
              aria-label="Add to wishlist"
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              className="w-12 h-12 flex items-center justify-center border border-charcoal-700 text-charcoal-400 rounded-lg hover:border-gold-500/30 hover:text-gold-500 transition-colors"
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center p-3 bg-charcoal-800 rounded-lg border border-charcoal-700/30 text-center">
              <Truck size={18} className="text-gold-500 mb-1.5" />
              <span className="text-[11px] text-charcoal-400">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-charcoal-800 rounded-lg border border-charcoal-700/30 text-center">
              <Shield size={18} className="text-gold-500 mb-1.5" />
              <span className="text-[11px] text-charcoal-400">Genuine Product</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-charcoal-800 rounded-lg border border-charcoal-700/30 text-center">
              <RotateCcw size={18} className="text-gold-500 mb-1.5" />
              <span className="text-[11px] text-charcoal-400">Easy Returns</span>
            </div>
          </div>

          {/* Product details */}
          <div className="p-5 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
            <h3 className="text-sm font-semibold text-charcoal-100 mb-3">Product Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Type</span>
                <span className="text-charcoal-300">{product.productType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Availability</span>
                <span className="text-green-400">In Stock</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Vendor</span>
                <span className="text-charcoal-300">Narwana Hookah Mahal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-display font-bold text-charcoal-50 mb-6">
            Related <span className="gold-gradient-text">Products</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                handle={p.handle}
                title={p.title}
                description={p.description}
                price={p.price}
                compareAtPrice={p.compareAtPrice}
                image={p.image}
                productType={p.productType}
                tags={[...p.tags]}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

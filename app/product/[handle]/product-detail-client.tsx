'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Minus, Plus, ChevronRight, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { useCart } from '@/hooks/use-cart';
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils';
import type { ShopifyProduct } from '@/types';

interface ProductDetailClientProps {
  product: ShopifyProduct;
  relatedProducts: ShopifyProduct[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const galleryImages = [
    product.image,
    ...product.images.map((image) => image.url),
  ].filter((image): image is string => Boolean(image));
  const activeImage = galleryImages[selectedImage] || galleryImages[0] || null;
  const discount = product.compareAtPrice ? getDiscountPercentage(product.price, product.compareAtPrice) : 0;

  const handleAddToCart = () => {
    if (!product.merchandiseId) {
      console.error('Missing Shopify variant ID');
      return;
    }
    addItem({
      merchandiseId: product.merchandiseId || `local-${product.handle}`,
      quantity,
      title: product.title,
      price: product.price,
      image: product.image,
      handle: product.handle,
      variantTitle: product.variants[0]?.title || 'Default',
    });
  };

  return (
    <div className="container-luxury section-padding">
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link href="/" className="text-charcoal-500 hover:text-gold-500 transition-colors">Home</Link>
        <ChevronRight size={12} className="text-charcoal-600" />
        <Link href="/shop" className="text-charcoal-500 hover:text-gold-500 transition-colors">Shop</Link>
        <ChevronRight size={12} className="text-charcoal-600" />
        <span className="text-charcoal-300">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square bg-charcoal-800 rounded-xl overflow-hidden border border-charcoal-700/30">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag size={40} className="text-charcoal-600" />
              </div>
            )}
            {discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                -{discount}% OFF
              </span>
            )}
          </div>
          {galleryImages.length > 1 && (
            <div className="flex gap-3">
              {galleryImages.slice(0, 5).map((image, i) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'w-20 h-20 bg-charcoal-800 rounded-lg overflow-hidden border-2 transition-colors',
                    selectedImage === i ? 'border-gold-500' : 'border-charcoal-700/30 hover:border-charcoal-600'
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${i + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg uppercase tracking-wider text-gold-500/70">{product.productType}</span>
            {product.tags?.includes('bestseller') && (
              <span className="px-2 py-0.5 bg-green-600/20 text-green-400 text-[10px] font-bold rounded-md uppercase">Bestseller</span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal-50 mb-4">{product.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} className={i <= 4 ? 'fill-gold-500 text-gold-500' : 'text-charcoal-600'} />
              ))}
            </div>
            <span className="text-xs text-charcoal-500">(4.0 - 24 reviews)</span>
          </div>

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

          <p className="text-sm text-charcoal-300 leading-relaxed mb-6">{product.description}</p>

          <div className="mb-6">
            <label className="text-md font-medium text-white mb-2 block">Quantity</label>
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

          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!product.availableForSale}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg transition-all',
                product.availableForSale
                  ? 'bg-gold-500 text-charcoal-900 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20'
                  : 'bg-charcoal-700 text-charcoal-400 cursor-not-allowed'
              )}
            >
              <ShoppingBag size={18} />
              {product.availableForSale ? 'Add to Cart' : 'Out of Stock'}
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

          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center p-3 bg-charcoal-800 rounded-lg border border-charcoal-700/30 text-center">
              <Truck size={18} className="text-gold-500 mb-1.5" />
              <span className="text-[11px] text-charcoal-400">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-charcoal-800 rounded-lg border border-charcoal-700/30 text-center">
              <Shield size={18} className="text-gold-500 mb-1.5" />
              <span className="text-[11px] text-charcoal-400">Genuine Product</span>
            </div>
            {/* <div className="flex flex-col items-center p-3 bg-charcoal-800 rounded-lg border border-charcoal-700/30 text-center">
              <RotateCcw size={18} className="text-gold-500 mb-1.5" />
              <span className="text-[11px] text-charcoal-400">Easy Returns</span>
            </div> */}
          </div>

          <div className="p-5 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
            <h3 className="text-sm font-semibold text-charcoal-100 mb-3">Product Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white">Type</span>
                <span className="text-white">{product.productType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Availability</span>
                <span className={product.availableForSale ? 'text-green-400' : 'text-red-400'}>
                  {product.availableForSale ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Vendor</span>
                <span className="text-white">{product.vendor || 'Narwana Hookah Mahal'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                merchandiseId={p.merchandiseId}
                productType={p.productType}
                tags={[...p.tags]}
                available={p.availableForSale}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

'use client';

import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { EmptyState } from '@/components/empty-state';

export default function CartPage() {
  const { items, totalQuantity, totalAmount, updateItemQuantity, removeItem, clearCart, isLoading,checkoutUrl } = useCart();

  if (items.length === 0) {
    return <EmptyState type="cart" />;
  }

  const subtotal = parseFloat(totalAmount);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="container-luxury section-padding">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50">
          Your <span className="gold-gradient-text">Cart</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-charcoal-500 hover:text-red-400 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.merchandiseId}
              className="flex gap-4 p-4 bg-charcoal-800 border border-charcoal-700/30 rounded-xl"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-charcoal-700 rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={24} className="text-charcoal-500" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.handle}`}
                  className="text-base font-medium text-charcoal-100 hover:text-gold-500 transition-colors"
                >
                  {item.title}
                </Link>
                {item.variantTitle && item.variantTitle !== 'Default' && (
                  <p className="text-xs text-charcoal-500 mt-0.5">{item.variantTitle}</p>
                )}
                <p className="text-lg font-semibold text-gold-500 mt-2">{formatPrice(item.price)}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-charcoal-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateItemQuantity(item.merchandiseId, item.quantity - 1)}
                      disabled={isLoading}
                      className="w-9 h-9 flex items-center justify-center text-charcoal-300 hover:bg-charcoal-700 transition-colors disabled:opacity-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 h-9 flex items-center justify-center text-sm font-medium text-charcoal-100 border-x border-charcoal-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItemQuantity(item.merchandiseId, item.quantity + 1)}
                      disabled={isLoading}
                      className="w-9 h-9 flex items-center justify-center text-charcoal-300 hover:bg-charcoal-700 transition-colors disabled:opacity-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-charcoal-200">
                      {formatPrice((parseFloat(item.price) * item.quantity).toString())}
                    </span>
                    <button
                      onClick={() => removeItem(item.merchandiseId)}
                      disabled={isLoading}
                      className="p-2 text-charcoal-500 hover:text-red-400 transition-colors disabled:opacity-50"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 transition-colors mt-4"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl sticky top-24">
            <h2 className="text-lg font-display font-semibold text-charcoal-100 mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-400">Subtotal ({totalQuantity} items)</span>
                <span className="text-charcoal-200">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-400">Shipping</span>
                <span className={shipping === 0 ? 'text-green-400' : 'text-charcoal-200'}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-charcoal-500">
                  Free shipping on orders above {formatPrice('999')}
                </p>
              )}
              <div className="border-t border-charcoal-700 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-charcoal-100">Total</span>
                  <span className="text-xl font-bold text-gold-500">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (checkoutUrl) {
                  window.location.href = checkoutUrl;
                }
              }}
              disabled={!checkoutUrl}
              className="w-full flex items-center justify-center gap-2 mt-6 px-6 py-3.5 bg-gold-500 text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-gold-400 transition-all hover:shadow-lg hover:shadow-gold-500/20"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </button>

            <p className="text-xs text-charcoal-500 text-center mt-3">
              Secure checkout powered by Shopify
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useCart } from '@/hooks/use-cart';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { formatPrice, cn } from '@/lib/utils';
import Image from 'next/image';

export function CartDrawer() {
  const { items, totalQuantity, totalAmount, isOpen, setIsOpen, updateItemQuantity, removeItem, isLoading } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-charcoal-900 border-l border-charcoal-700/50 z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-charcoal-700/50">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-gold-500" />
            <h2 className="text-lg font-display font-semibold text-charcoal-100">Your Cart</h2>
            {totalQuantity > 0 && (
              <span className="text-xs text-charcoal-400">({totalQuantity} items)</span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-charcoal-400 hover:text-charcoal-100 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-charcoal-600 mb-4" />
              <p className="text-charcoal-300 font-medium">Your cart is empty</p>
              <p className="text-sm text-charcoal-500 mt-1">Explore our collection and add items</p>
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-2.5 bg-gold-500 text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-gold-400 transition-colors"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.merchandiseId}
                  className="flex gap-4 p-3 bg-charcoal-800 rounded-lg border border-charcoal-700/30"
                >
                  {/* Image */}
                  <div className="w-20 h-20 bg-charcoal-700 rounded-md overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={20} className="text-charcoal-500" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.handle}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-charcoal-100 hover:text-gold-500 transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    {item.variantTitle && item.variantTitle !== 'Default Title' && (
                      <p className="text-xs text-charcoal-500 mt-0.5">{item.variantTitle}</p>
                    )}
                    <p className="text-sm text-gold-500 font-semibold mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateItemQuantity(item.merchandiseId, item.quantity - 1)}
                          disabled={isLoading}
                          className="w-7 h-7 flex items-center justify-center rounded bg-charcoal-700 text-charcoal-300 hover:bg-charcoal-600 transition-colors disabled:opacity-50"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm text-charcoal-200 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateItemQuantity(item.merchandiseId, item.quantity + 1)}
                          disabled={isLoading}
                          className="w-7 h-7 flex items-center justify-center rounded bg-charcoal-700 text-charcoal-300 hover:bg-charcoal-600 transition-colors disabled:opacity-50"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.merchandiseId)}
                        disabled={isLoading}
                        className="p-1.5 text-charcoal-500 hover:text-red-400 transition-colors disabled:opacity-50"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-charcoal-700/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-charcoal-300">Subtotal</span>
              <span className="text-lg font-semibold text-gold-500">{formatPrice(totalAmount)}</span>
            </div>
            <p className="text-xs text-charcoal-500">Shipping & taxes calculated at checkout</p>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3 bg-gold-500 text-charcoal-900 text-center text-sm font-semibold rounded-lg hover:bg-gold-400 transition-colors"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

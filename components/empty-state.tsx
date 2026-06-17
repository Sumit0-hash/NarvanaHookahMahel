import { ShoppingBag, Search, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  type: 'cart' | 'search' | 'products' | 'error';
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  type,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const defaults = {
    cart: {
      icon: ShoppingBag,
      title: title || 'Your cart is empty',
      description: description || 'Explore our premium collection and add items to your cart',
      actionLabel: actionLabel || 'Browse Shop',
      actionHref: actionHref || '/shop',
    },
    search: {
      icon: Search,
      title: title || 'No results found',
      description: description || 'Try adjusting your search or browse our categories',
      actionLabel: actionLabel || 'View All Products',
      actionHref: actionHref || '/shop',
    },
    products: {
      icon: ShoppingBag,
      title: title || 'No products available',
      description: description || 'Check back soon for new arrivals',
      actionLabel: actionLabel || 'Browse Categories',
      actionHref: actionHref || '/categories',
    },
    error: {
      icon: AlertCircle,
      title: title || 'Something went wrong',
      description: description || 'Please try again later',
      actionLabel: actionLabel || 'Go Home',
      actionHref: actionHref || '/',
    },
  };

  const config = defaults[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-charcoal-800 border border-charcoal-700/30 mb-5">
        <Icon size={28} className="text-gold-500/50" />
      </div>
      <h3 className="text-xl font-display font-semibold text-charcoal-100 mb-2">{config.title}</h3>
      <p className="text-sm text-charcoal-400 max-w-md">{config.description}</p>
      {config.actionLabel && config.actionHref && (
        <Link
          href={config.actionHref}
          className="mt-6 px-6 py-2.5 bg-gold-500 text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-gold-400 transition-colors"
        >
          {config.actionLabel}
        </Link>
      )}
    </div>
  );
}

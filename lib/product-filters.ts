import type { ShopifyProduct } from '@/types';

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  hookahs: ['hookah', 'hooka'],
  accessories: ['accessory', 'accessories', 'hose', 'bowl', 'tongs', 'chilam', 'thikar'],
  flavours: ['flavour', 'flavor', 'masala', 'shisha'],
  charcoal: ['charcoal', 'coal'],
  'premium-collection': ['premium', 'luxury'],
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function productMatchesCategory(product: ShopifyProduct, categoryHandle: string) {
  if (categoryHandle === 'all') return true;

  const tags = product.tags.map((tag) => normalize(tag));

  if (categoryHandle === 'new-arrivals') {
    return tags.includes('new') || tags.includes('new arrival') || tags.includes('new arrivals');
  }

  const keywords = CATEGORY_KEYWORDS[categoryHandle] || [categoryHandle.replace('-', ' ')];
  const searchableText = normalize([
    product.productType,
    product.title,
    product.vendor,
    ...product.tags,
  ].join(' '));

  return keywords.some((keyword) => searchableText.includes(normalize(keyword)));
}

export const SITE_NAME = 'Narwana Hookah Mahal';
export const SITE_DESCRIPTION = 'Premium Hookah Collection - Narwana Hookah Mahal mein aapka swagat hai. Best quality hookahs, flavours, and accessories at great prices.';
export const SITE_URL = 'https://narwanahookahmahal.com';

export const BUSINESS = {
  name: 'Narwana Hookah Mahal',
  address: {
    street: 'Shop No. 55, Panchkula Shopping Complex',
    area: 'Dhakoli',
    landmark: 'Near Opera Garden',
    city: 'Zirakpur',
    state: 'Punjab',
    pincode: '140603',
  },
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'info@narwanahookahmahal.com',
} as const;

export const CATEGORIES = [
  { handle: 'hookahs', title: 'Hookahs', description: 'Premium hookah pipes and sets', image: 'https://images.pexels.com/photos/8474931/pexels-photo-8474931.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { handle: 'accessories', title: 'Accessories', description: 'Hoses, bowls, tongs and more', image: 'https://images.pexels.com/photos/8474935/pexels-photo-8474935.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { handle: 'flavours', title: 'Flavours', description: 'Exotic shisha flavours and blends', image: 'https://images.pexels.com/photos/8474929/pexels-photo-8474929.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { handle: 'charcoal', title: 'Charcoal', description: 'Quick-light and natural coconut coals', image: 'https://images.pexels.com/photos/8474933/pexels-photo-8474933.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { handle: 'premium-collection', title: 'Premium Collection', description: 'Luxury hookahs for connoisseurs', image: 'https://images.pexels.com/photos/8474937/pexels-photo-8474937.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { handle: 'new-arrivals', title: 'New Arrivals', description: 'Latest additions to our store', image: 'https://images.pexels.com/photos/8474931/pexels-photo-8474931.jpeg?auto=compress&cs=tinysrgb&w=600' },
] as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const WHATSAPP_URL = `https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}`;

export const PLACEHOLDER_PRODUCTS = [
  {
    id: '1',
    handle: 'khalil-mamoon-horus',
    title: 'Khalil Mamoon Horus',
    description: 'Premium Egyptian hookah with gold-trimmed stem and wide base. Perfect for smooth, flavourful sessions.',
    productType: 'Hookahs',
    price: '4999',
    compareAtPrice: '6999',
    image: 'https://images.pexels.com/photos/8474931/pexels-photo-8474931.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['premium', 'bestseller'],
  },
  {
    id: '2',
    handle: 'moze-breeze-mini',
    title: 'Moze Breeze Mini',
    description: 'Compact German-engineered hookah with blow-off system. Ideal for solo sessions.',
    productType: 'Hookahs',
    price: '3499',
    compareAtPrice: null,
    image: 'https://images.pexels.com/photos/8474935/pexels-photo-8474935.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['new'],
  },
  {
    id: '3',
    handle: 'al-fakher-double-apple',
    title: 'Al Fakher Double Apple',
    description: 'Classic double apple flavour with anise undertones. The most popular shisha flavour worldwide.',
    productType: 'Flavours',
    price: '450',
    compareAtPrice: '550',
    image: 'https://images.pexels.com/photos/8474929/pexels-photo-8474929.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['bestseller'],
  },
  {
    id: '4',
    handle: 'cocourth-coconut-coals',
    title: 'Cocourth Coconut Coals',
    description: 'Natural coconut shell charcoal. Long-lasting, clean burn with no chemical aftertaste.',
    productType: 'Charcoal',
    price: '399',
    compareAtPrice: null,
    image: 'https://images.pexels.com/photos/8474933/pexels-photo-8474933.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['essential'],
  },
  {
    id: '5',
    handle: 'steamulation-station',
    title: 'Steamulation Station',
    description: 'Top-tier German hookah with adjustable purge and smoke control. Ultimate luxury experience.',
    productType: 'Hookahs',
    price: '12999',
    compareAtPrice: '15999',
    image: 'https://images.pexels.com/photos/8474937/pexels-photo-8474937.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['premium', 'luxury'],
  },
  {
    id: '6',
    handle: 'silicone-hose-premium',
    title: 'Premium Silicone Hose',
    description: 'Food-grade silicone hose with gold-plated handle. Washable and flavour-residue free.',
    productType: 'Accessories',
    price: '899',
    compareAtPrice: '1199',
    image: 'https://images.pexels.com/photos/8474935/pexels-photo-8474935.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['premium'],
  },
  {
    id: '7',
    handle: 'social-smoke-peach',
    title: 'Social Smoke Peach',
    description: 'Sweet, juicy peach flavour with a smooth finish. Perfect for mixing with mint.',
    productType: 'Flavours',
    price: '550',
    compareAtPrice: null,
    image: 'https://images.pexels.com/photos/8474929/pexels-photo-8474929.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['popular'],
  },
  {
    id: '8',
    handle: 'kaloud-lotus-ii',
    title: 'Kaloud Lotus II',
    description: 'Heat management device that eliminates the need for foil. Consistent heat distribution.',
    productType: 'Accessories',
    price: '2499',
    compareAtPrice: '2999',
    image: 'https://images.pexels.com/photos/8474933/pexels-photo-8474933.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['premium', 'bestseller'],
  },
];

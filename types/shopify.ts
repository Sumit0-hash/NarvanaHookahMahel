export interface ShopifyImage {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  selectedOptions: ShopifySelectedOption[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  vendor: string;
  tags: string[];
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  seo: {
    title: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: { node: ShopifyProduct }[];
  };
}

export interface ShopifyCartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyPrice;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
    };
    selectedOptions: ShopifySelectedOption[];
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: { node: ShopifyCartItem }[];
  };
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
    totalTaxAmount: ShopifyPrice | null;
  };
}

export interface ShopifyPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface ShopifyProductsResponse {
  products: ShopifyProduct[];
  pageInfo: ShopifyPageInfo;
}

export interface ShopifyCollectionsResponse {
  collections: ShopifyCollection[];
}

export type CategoryHandle =
  | 'hookahs'
  | 'accessories'
  | 'flavours'
  | 'charcoal'
  | 'premium-collection'
  | 'new-arrivals';

export interface Category {
  handle: CategoryHandle | string;
  title: string;
  description: string;
  image?: string;
}

export type SortOption = 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc' | 'created-asc' | 'created-desc';

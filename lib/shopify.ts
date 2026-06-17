const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || '';
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

const endpoint = `https://${STORE_DOMAIN}/api/2025-01/graphql.json`;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    productType
    vendor
    tags
    featuredImage {
      id
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    options {
      id
      name
      values
    }
    seo {
      title
      description
    }
    createdAt
    updatedAt
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                id
                handle
                title
                featuredImage {
                  id
                  url
                  altText
                  width
                  height
                }
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
  }
`;

export async function getProducts({
  first = 24,
  query,
  sortKey,
  reverse,
  after,
}: {
  first?: number;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
  after?: string;
} = {}) {
  const sortKeyMap: Record<string, string> = {
    'title-asc': 'TITLE',
    'title-desc': 'TITLE',
    'price-asc': 'PRICE',
    'price-desc': 'PRICE',
    'created-asc': 'CREATED_AT',
    'created-desc': 'CREATED_AT',
  };

  const gqlSortKey = sortKey ? sortKeyMap[sortKey] || 'CREATED_AT' : 'CREATED_AT';
  const gqlReverse = reverse !== undefined ? reverse : sortKey ? sortKey.endsWith('desc') : false;

  const data = await shopifyFetch<{
    products: {
      edges: { node: unknown; cursor: string }[];
      pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; endCursor: string; startCursor: string };
    };
  }>(
    `${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean, $after: String) {
      products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse, after: $after) {
        edges {
          node {
            ...ProductFields
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }`,
    { first, query, sortKey: gqlSortKey, reverse: gqlReverse, after }
  );

  return {
    products: data.products.edges.map((e) => transformProduct(e.node)),
    pageInfo: data.products.pageInfo,
  };
}

export async function getProduct(handle: string) {
  const data = await shopifyFetch<{
    product: unknown;
  }>(
    `${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }`,
    { handle }
  );

  return data.product ? transformProduct(data.product) : null;
}

export async function getCollection(handle: string, first = 24) {
  const data = await shopifyFetch<{
    collection: {
      id: string;
      handle: string;
      title: string;
      description: string;
      image: { id: string; url: string; altText: string } | null;
      products: {
        edges: { node: unknown }[];
      };
    } | null;
  }>(
    `${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        image {
          id
          url
          altText
        }
        products(first: $first) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }`,
    { handle, first }
  );

  if (!data.collection) return null;

  return {
    ...data.collection,
    products: data.collection.products.edges.map((e) => transformProduct(e.node)),
  };
}

export async function getCollections() {
  const data = await shopifyFetch<{
    collections: {
      edges: {
        node: {
          id: string;
          handle: string;
          title: string;
          description: string;
          image: { id: string; url: string; altText: string } | null;
        };
      }[];
    };
  }>(
    `query GetCollections {
      collections(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              id
              url
              altText
            }
          }
        }
      }
    }`
  );

  return data.collections.edges.map((e) => e.node);
}

export async function createCart() {
  const data = await shopifyFetch<{
    cartCreate: { cart: unknown };
  }>(
    `${CART_FRAGMENT}
    mutation CreateCart {
      cartCreate {
        cart {
          ...CartFields
        }
      }
    }`
  );

  return transformCart(data.cartCreate.cart);
}

export async function getCart(cartId: string) {
  try {
    const data = await shopifyFetch<{
      cart: unknown;
    }>(
      `${CART_FRAGMENT}
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFields
        }
      }`,
      { cartId }
    );

    return data.cart ? transformCart(data.cart) : null;
  } catch {
    return null;
  }
}

export async function addToCart(cartId: string, merchandiseId: string, quantity = 1) {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: unknown };
  }>(
    `${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }`,
    { cartId, lines: [{ merchandiseId, quantity }] }
  );

  return transformCart(data.cartLinesAdd.cart);
}

export async function updateCartItem(cartId: string, lineId: string, quantity: number) {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: unknown };
  }>(
    `${CART_FRAGMENT}
    mutation UpdateCartItem($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] }
  );

  return transformCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: unknown };
  }>(
    `${CART_FRAGMENT}
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
      }
    }`,
    { cartId, lineIds }
  );

  return transformCart(data.cartLinesRemove.cart);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformProduct(raw: any) {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml,
    availableForSale: raw.availableForSale,
    productType: raw.productType,
    vendor: raw.vendor,
    tags: raw.tags,
    featuredImage: raw.featuredImage,
    images: raw.images?.edges?.map((e: { node: unknown }) => e.node) || [],
    variants: raw.variants?.edges?.map((e: { node: unknown }) => e.node) || [],
    priceRange: raw.priceRange,
    options: raw.options,
    seo: raw.seo,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformCart(raw: any) {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    lines: raw.lines?.edges?.map((e: { node: unknown }) => e.node) || [],
    cost: raw.cost,
  };
}

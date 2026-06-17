import { getProducts } from '@/lib/shopify';
import { ShopClient } from './shop-client';

export default async function ShopPage() {
  const { products } = await getProducts({ first: 100 });

  return <ShopClient products={products} />;
}

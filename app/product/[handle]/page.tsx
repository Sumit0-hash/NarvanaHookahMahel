import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/shopify';
import { ProductDetailClient } from './product-detail-client';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle);

  console.log("PRODUCT PAGE DATA:", product);

  if (!product) {
    notFound();
  }

  const { products } = await getProducts({ first: 100 });

  const relatedProducts = products
    .filter((p) => p.productType === product.productType && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

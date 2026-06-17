import { createCart } from '@/lib/shopify';

export default async function TestPage() {
  const cart = await createCart();

  return (
    <pre>
      {JSON.stringify(cart, null, 2)}
    </pre>
  );
}
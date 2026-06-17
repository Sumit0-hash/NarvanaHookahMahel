// src/app/test/page.tsx

import { getProducts } from "@/lib/shopify";

export default async function TestPage() {
  const { products } = await getProducts();

  return (
    <div>
      {products.map((p: any) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  );
}
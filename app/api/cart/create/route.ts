import { NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

export async function GET() {
  const cart = await createCart();

  return NextResponse.json({
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
  });
}
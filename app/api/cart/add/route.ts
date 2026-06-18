import { NextRequest, NextResponse } from 'next/server';
import { addToCart } from '@/lib/shopify';

export async function POST(req: NextRequest) {
  const { cartId, merchandiseId, quantity } = await req.json();

  const cart = await addToCart(
    cartId,
    merchandiseId,
    quantity
  );
  return NextResponse.json(cart);
}
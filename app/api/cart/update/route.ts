import { NextRequest, NextResponse } from 'next/server';
import { updateCartLine } from '@/lib/shopify';

export async function POST(req: NextRequest) {
  const { cartId, lineId, quantity } = await req.json();

  const cart = await updateCartLine(
    cartId,
    lineId,
    quantity
  );

  return NextResponse.json(cart);
}
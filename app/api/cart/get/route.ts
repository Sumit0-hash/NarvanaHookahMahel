import { NextRequest, NextResponse } from "next/server";
import { getCart } from "@/lib/shopify";

export async function GET(req: NextRequest) {
  const cartId = req.nextUrl.searchParams.get("cartId");

  if (!cartId) {
    return NextResponse.json(
      { error: "cartId required" },
      { status: 400 }
    );
  }

  const cart = await getCart(cartId);

  return NextResponse.json(cart);
}
import { NextResponse } from 'next/server';
import { products as allProducts } from '@/lib/placeholder-data';

// Correct RouteParams type definition
type RouteParams = { id: string };

export async function GET(
  request: Request,
  context: { params: Promise<RouteParams> }
) {
  // Await the resolved params object
  const { id } = await context.params;

  // Locate product
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(product);
}

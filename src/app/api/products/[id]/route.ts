import { NextResponse } from 'next/server';
import { products as allProducts } from '@/lib/placeholder-data';

// This function handles GET requests for a single product by its ID.
export async function GET(
  request: Request,
  // The 'params' object is now correctly destructured from the second argument.
  { params }: { params: { id: string } }
) {
  // Find the product in our mock data array
  const product = allProducts.find((p) => p.id === params.id);

  if (!product) {
    // If no product is found, return a 404 error
    return new NextResponse('Product not found', { status: 404 });
  }

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(product);
}

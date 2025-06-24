import { NextResponse } from 'next/server';
import { products } from '@/lib/placeholder-data';

// This function handles updating a product's status (approving/rejecting)
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  // Await the resolved params object
  const { id } = await context.params;

  const { status } = await request.json(); // Expecting { status: 'ACTIVE' } or { status: 'REJECTED' }

  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return new NextResponse('Product not found', { status: 404 });
  }

  // Update the product's status in our "database"
  products[productIndex].status = status;
  console.log(`Product ${id} status updated to:`, status);

  return NextResponse.json(products[productIndex]);
}

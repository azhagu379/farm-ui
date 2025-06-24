import { NextResponse } from 'next/server';
import { products } from '@/lib/placeholder-data';

// This function handles updating a product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return new NextResponse('Product not found', { status: 404 });
  }

  // Update the product in our "database"
  products[productIndex] = { ...products[productIndex], ...body };
  console.log('Product updated:', products[productIndex]);

  return NextResponse.json(products[productIndex]);
}

// This function handles deleting a product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return new NextResponse('Product not found', { status: 404 });
  }

  // Remove the product from our "database"
  products.splice(productIndex, 1);
  console.log('Product deleted:', id);

  return new NextResponse(null, { status: 204 }); // 204 No Content
}

import { NextResponse } from 'next/server';
import { products } from '@/lib/placeholder-data';

// This function simulates fetching all products that need admin approval.
export async function GET() {
  const pendingProducts = products.filter(
    (p) => p.status === 'Pending Approval'
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(pendingProducts);
}

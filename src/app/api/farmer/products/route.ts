import { NextResponse } from 'next/server';
import { products as allProducts } from '@/lib/placeholder-data';


export async function GET() {
  const farmerName = 'Nilgiri Organics'; // Hardcoded for this example
  const farmerProducts = allProducts.filter(
    (p) => p.farmer === farmerName
  );

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(farmerProducts);
}

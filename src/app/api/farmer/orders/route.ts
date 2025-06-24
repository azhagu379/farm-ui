import { NextResponse } from 'next/server';
import {
  orders,
  orderItems,
  products,
} from '@/lib/placeholder-data';

// This function simulates fetching orders that contain products from a specific farmer.
export async function GET() {
  // In a real app, you'd get the farmer's ID from the session.
  // We'll hardcode it for Bob Farmer for this example.
  const farmerId = 'farm_bob'; 

  // 1. Find all product IDs belonging to this farmer.
  const farmerProductIds = products
    .filter((p) => p.farmerId === farmerId)
    .map((p) => p.id);

  // 2. Find all order items that match these product IDs.
  const relevantOrderItems = orderItems.filter((oi) =>
    farmerProductIds.includes(oi.productId)
  );

  // 3. Get the unique order IDs from these items.
  const relevantOrderIds = [
    ...new Set(relevantOrderItems.map((oi) => oi.orderId)),
  ];

  // 4. Find the full order details for those order IDs.
  const farmerOrders = orders.filter((o) => relevantOrderIds.includes(o.id));

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(farmerOrders);
}

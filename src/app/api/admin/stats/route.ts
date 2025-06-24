import { NextResponse } from 'next/server';
import { users, products, orders } from '@/lib/placeholder-data';

// This function simulates fetching platform-wide statistics.
export async function GET() {
  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const stats = {
    totalRevenue,
    totalUsers,
    totalProducts,
    totalOrders,
  };

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(stats);
}

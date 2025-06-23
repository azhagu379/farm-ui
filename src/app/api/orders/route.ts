import { NextResponse } from 'next/server';
import { orders as mockOrders } from '@/shared/lib/placeholder-data';

// This function handles GET requests to /api/orders
export async function GET() {
  // In a real app, you would fetch orders for the logged-in user from your database.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(mockOrders);
}

// This function handles POST requests to /api/orders to create a new order
export async function POST(request: Request) {
  const body = await request.json();
  console.log('New order received:', body);
  
  // In a real app, you would save this to the database.
  // For now, we just simulate success.
  const newOrder = {
    id: `ORD${Math.floor(Math.random() * 9000) + 1000}`,
    ...body,
    status: 'Processing',
    date: new Date().toISOString().split('T')[0],
  };

  // We could add the new order to our mock data array here if we wanted to persist it for the session
  // mockOrders.unshift(newOrder); 

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new NextResponse(JSON.stringify(newOrder), { status: 201 });
}

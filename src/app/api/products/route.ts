import { products } from '@/lib/placeholder-data';
import { NextResponse } from 'next/server';

// This is mock data that simulates what our database would return.
// const products = [
//   {
//     id: '1',
//     name: 'Organic Carrots',
//     farmer: 'Green Valley Farms',
//     price: 2.99,
//     status: 'In Stock',
//   },
//   {
//     id: '2',
//     name: 'Fresh Strawberries',
//     farmer: 'Sunrise Orchards',
//     price: 4.5,
//     status: 'In Stock',
//   },
//   {
//     id: '3',
//     name: 'Pasture-Raised Eggs',
//     farmer: 'Happy Hen Homestead',
//     price: 5.25,
//     status: 'Low Stock',
//   },
//   {
//     id: '4',
//     name: 'Artisanal Goat Cheese',
//     farmer: 'Mountain Goat Dairy',
//     price: 8.0,
//     status: 'In Stock',
//   },
//   {
//     id: '5',
//     name: 'Heirloom Tomatoes',
//     farmer: 'Green Valley Farms',
//     price: 3.75,
//     status: 'Out of Stock',
//   },
// ];

// This function handles GET requests to /api/products
export async function GET() {
  // In a real app, you would fetch this data from your database.
  // We'll add a short delay to simulate network latency.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(products);
}

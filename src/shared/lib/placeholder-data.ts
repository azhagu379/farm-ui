
import { Product } from '@/entities/product/types';

// --- User Data (from previous steps) ---
export const users = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  },
];

// --- Product Data (Indian Context) ---
export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Tomatoes (Tamatar)',
    farmer: 'Nilgiri Organics',
    price: 80, // Price per kg
    status: 'In Stock',
  },
  {
    id: '2',
    name: 'Fresh Alphonso Mangoes',
    farmer: 'Ratnagiri Farms',
    price: 650, // Price per dozen
    status: 'In Stock',
  },
  {
    id: '3',
    name: 'Country Eggs (Naatu Muttai)',
    farmer: 'Kovai Poultry',
    price: 120, // Price per dozen
    status: 'Low Stock',
  },
  {
    id: '4',
    name: 'Paneer (Freshly Made)',
    farmer: 'Amritsar Dairy Co.',
    price: 150, // Price per 200g
    status: 'In Stock',
  },
  {
    id: '5',
    name: 'Basmati Rice (Extra Long Grain)',
    farmer: 'Himalayan Fields',
    price: 180, // Price per kg
    status: 'Out of Stock',
  },
  {
    id: '6',
    name: 'Tender Coconut Water',
    farmer: 'Kerala Groves',
    price: 40, // Price per piece
    status: 'In Stock',
  },
  {
    id: '7',
    name: 'Farm-Fresh Spinach (Palak)',
    farmer: 'Nilgiri Organics',
    price: 30, // Price per bunch
    status: 'In Stock',
  },
  {
    id: '8',
    name: 'A2 Desi Cow Milk',
    farmer: 'Amritsar Dairy Co.',
    price: 75, // Price per litre
    status: 'Low Stock',
  },
  {
    id: '9',
    name: 'Himalayan Apples',
    farmer: 'Himalayan Fields',
    price: 220, // Price per kg
    status: 'In Stock',
  },
  {
    id: '10',
    name: 'Organic Ginger (Adrak)',
    farmer: 'Kerala Groves',
    price: 50, // Price per 250g
    status: 'Out of Stock',
  },
];


import { Product } from '@/entities/product/types';
import { Address } from '@/entities/address/types';
import { Order, OrderItem } from '@/entities/order/types'; // Assuming OrderItem is defined within order/types
import { User } from '@/entities/user/types';
import { FarmerProfile } from '@/entities/farmer/types';
import { Category } from '@/entities/category/types';

export const users: User[] = [
  {
    id: 'user_buyer_1',
    name: 'Alice Buyer',
    email: 'buyer@example.com',
    password: 'password123',
    role: 'BUYER',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'user_farmer_1',
    name: 'Bob Farmer',
    email: 'farmer@example.com',
    password: 'password123',
    role: 'FARMER',
    createdAt: '2023-02-01T11:00:00Z',
    updatedAt: '2023-02-01T11:00:00Z',
  },
  {
    id: 'user_admin_1',
    name: 'Charlie Admin',
    email: 'admin@example.com',
    password: 'password123',
    role: 'ADMIN',
    createdAt: '2023-03-10T12:00:00Z',
    updatedAt: '2023-03-10T12:00:00Z',
  },
  {
    id: 'user_farmer_2',
    name: 'David Harvest',
    email: 'farmer2@example.com',
    password: 'password123',
    role: 'FARMER',
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-05T09:00:00Z',
  },
];

export const farmerProfiles: FarmerProfile[] = [
  {
    id: 'farm_bob',
    userId: 'user_farmer_1',
    farmName: 'Bob\'s Organic Harvest',
    location: 'Chennai, Tamil Nadu',
    bio: 'Sustainable farming with a passion for fresh, organic produce delivered straight from our fields.',
    certifications: ['Organic Certified (TN-ORG-001)'],
    profileImageUrl: '/images/mock/farm_bob.jpg',
    createdAt: '2023-02-01T11:00:00Z',
    updatedAt: '2023-02-01T11:00:00Z',
  },
  {
    id: 'farm_david',
    userId: 'user_farmer_2',
    farmName: 'David\'s Dairy Delights',
    location: 'Kancheepuram, Tamil Nadu',
    bio: 'Farm-fresh milk and eggs from happy, free-range animals. Ethical and delicious.',
    certifications: [],
    profileImageUrl: '/images/mock/farm_david.jpg',
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-05T09:00:00Z',
  },
];

export const categories: Category[] = [
  { id: 'cat_veg', name: 'Vegetables', slug: 'vegetables', description: 'Freshly harvested vegetables direct from farms.', imageUrl: '/images/mock/category_veg.jpg', createdAt: '2023-01-01T08:00:00Z', updatedAt: '2023-01-01T08:00:00Z' },
  { id: 'cat_fruit', name: 'Fruits', slug: 'fruits', description: 'Sweet and juicy fruits, locally sourced and seasonal.', imageUrl: '/images/mock/category_fruit.jpg', createdAt: '2023-01-01T08:00:00Z', updatedAt: '2023-01-01T08:00:00Z' },
  { id: 'cat_dairy', name: 'Dairy & Eggs', slug: 'dairy-eggs', description: 'Farm fresh dairy products and free-range eggs.', imageUrl: '/images/mock/category_dairy.jpg', createdAt: '2023-01-01T08:00:00Z', updatedAt: '2023-01-01T08:00:00Z' },
  { id: 'cat_grains', name: 'Grains & Pulses', slug: 'grains-pulses', description: 'Wholesome grains and pulses for a healthy diet.', imageUrl: '/images/mock/category_grains.jpg', createdAt: '2023-01-01T08:00:00Z', updatedAt: '2023-01-01T08:00:00Z' },
  { id: 'cat_baked', name: 'Baked Goods', slug: 'baked-goods', description: 'Artisan breads and fresh baked delights.', imageUrl: '/images/mock/category_baked.jpg', createdAt: '2023-01-01T08:00:00Z', updatedAt: '2023-01-01T08:00:00Z' },
];

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Organic Heirloom Tomatoes',
    description: 'Sweet and juicy heirloom tomatoes, perfect for salads and sauces. Grown with care on our sustainable farm. Priced per kg.',
    price: 120.00,
    stock: 50,
    status: 'In Stock',
    imageUrl: ['/images/mock/product_tomato_1.jpg', '/images/mock/product_tomato_2.jpg'],
    category: 'Vegetables', // Matches Category.name
    farmerId: 'farm_bob',
    createdAt: '2023-04-01T13:00:00Z',
    updatedAt: '2023-04-01T13:00:00Z',
  },
  {
    id: 'prod_2',
    name: 'Fresh Farm Eggs (Dozen)',
    description: 'Pasture-raised, free-range eggs with rich yolks. Our hens roam freely, ensuring quality and taste. Priced per dozen.',
    price: 90.00,
    stock: 20,
    status: 'In Stock',
    imageUrl: ['/images/mock/product_eggs_1.jpg'],
    category: 'Dairy & Eggs',
    farmerId: 'farm_david',
    createdAt: '2023-05-10T09:00:00Z',
    updatedAt: '2023-05-10T09:00:00Z',
  },
  {
    id: 'prod_3',
    name: 'Artisan Sourdough Loaf',
    description: 'Hand-kneaded, slow-fermented sourdough loaf, baked fresh daily with organic flour. Perfect for sandwiches or toast.',
    price: 150.00,
    stock: 10,
    status: 'Low Stock',
    imageUrl: ['/images/mock/product_sourdough_1.jpg'],
    category: 'Baked Goods',
    farmerId: 'farm_bob',
    createdAt: '2023-06-01T15:00:00Z',
    updatedAt: '2023-06-01T15:00:00Z',
  },
  {
    id: 'prod_4',
    name: 'Organic Broccoli Florets',
    description: 'Freshly cut organic broccoli florets, vibrant and healthy. Ideal for steaming or stir-frying. Priced per 500g.',
    price: 80.00,
    stock: 0,
    status: 'Out of Stock',
    imageUrl: ['/images/mock/product_broccoli_1.jpg'],
    category: 'Vegetables',
    farmerId: 'farm_bob',
    createdAt: '2023-07-20T11:00:00Z',
    updatedAt: '2023-07-20T11:00:00Z',
  },
  {
    id: 'prod_5',
    name: 'Farm Fresh Milk (1 Liter)',
    description: 'Pure, unpasteurized A2 cow\'s milk from our dairy farm. Delivered fresh daily. Priced per liter.',
    price: 60.00,
    stock: 30,
    status: 'In Stock',
    imageUrl: ['/images/mock/product_milk_1.jpg'],
    category: 'Dairy & Eggs',
    farmerId: 'farm_david',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  // Add more products as needed
];

export const addresses: Address[] = [
  {
    id: 'addr_alice_1',
    userId: 'user_buyer_1',
    fullName: 'Alice Buyer',
    street: '123 Farmview Lane',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zipCode: '600001',
    country: 'India',
    phone: '9876543210',
    isDefault: true,
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z',
  },
];

export const orders: Order[] = [
  {
    id: 'order_1',
    userId: 'user_buyer_1',
    orderDate: '2024-06-20T10:00:00Z', // Recent order
    totalAmount: 210.00,
    status: 'Delivered',
    shippingAddressId: 'addr_alice_1',
    paymentStatus: 'Paid',
    trackingNumber: 'TRACK123456789',
    createdAt: '2024-06-20T10:00:00Z',
    updatedAt: '2024-06-22T15:00:00Z',
  },
  {
    id: 'order_2',
    userId: 'user_buyer_1',
    orderDate: '2024-06-23T14:30:00Z', // Pending order
    totalAmount: 120.00,
    status: 'Pending',
    shippingAddressId: 'addr_alice_1',
    paymentStatus: 'Pending',
    createdAt: '2024-06-23T14:30:00Z',
    updatedAt: '2024-06-23T14:30:00Z',
  },
];

export const orderItems: OrderItem[] = [
  {
    id: 'oi_1_p1',
    orderId: 'order_1',
    productId: 'prod_1',
    productName: 'Organic Heirloom Tomatoes',
    productPrice: 120.00,
    quantity: 1,
    subtotal: 120.00,
  },
  {
    id: 'oi_1_p2',
    orderId: 'order_1',
    productId: 'prod_2',
    productName: 'Fresh Farm Eggs (Dozen)',
    productPrice: 90.00,
    quantity: 1,
    subtotal: 90.00,
  },
  {
    id: 'oi_2_p1',
    orderId: 'order_2',
    productId: 'prod_1',
    productName: 'Organic Heirloom Tomatoes',
    productPrice: 120.00,
    quantity: 1,
    subtotal: 120.00,
  },
];
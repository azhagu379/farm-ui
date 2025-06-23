import { api } from '@/app/api';
import { type Order } from '../types';
import { type CartItem } from '@/features/cart/store/useCartStore';

// Define a strict type for the shipping details
export interface ShippingDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface CreateOrderPayload {
  shippingDetails: ShippingDetails;
  items: CartItem[];
  total: number;
}

// Fetch all orders for the current user
export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get('/api/orders');
  return response.data;
};

// Create a new order
export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  const response = await api.post('/api/orders', payload);
  return response.data;
};

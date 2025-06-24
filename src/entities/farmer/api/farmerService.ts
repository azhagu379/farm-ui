import { api } from '@/app/api';
import { Order } from '@/entities/order/types';
import { type Product } from '@/entities/product/types';

export const getFarmerProducts = async (): Promise<Product[]> => {
  const response = await api.get('/api/farmer/products');
  return response.data;
};
 export const getFarmerOrders = async (): Promise<Order[]> => {
      const response = await api.get('/api/farmer/orders');
      return response.data;
    };
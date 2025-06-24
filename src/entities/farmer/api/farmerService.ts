import { axiosInstance } from '@/lib/axios';
import { Order } from '@/entities/order/types';
import { type Product } from '@/entities/product/types';

export const getFarmerProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get('/farmer/products');
  return response.data;
};
 export const getFarmerOrders = async (): Promise<Order[]> => {
      const response = await axiosInstance.get('/farmer/orders');
      return response.data;
    };
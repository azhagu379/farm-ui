import { api } from '@/app/api';
import { type Product } from '@/entities/product/types';

export const getFarmerProducts = async (): Promise<Product[]> => {
  const response = await api.get('/api/farmer/products');
  return response.data;
};

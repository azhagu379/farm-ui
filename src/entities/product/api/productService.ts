import { api } from '@/app/api';
import { type Product } from '../types';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/api/products');
  return response.data;
};
export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};
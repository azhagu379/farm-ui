import { api } from '@/app/api';
import { type Product } from '../types';
import { CreateProductPayload } from '../hooks/use-product-mutation';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/api/products');
  return response.data;
};
export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};
export const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
      const response = await api.post('/api/farmer/products', payload);
      return response.data;
    };
export const updateProduct = async ({ id, ...payload }: {id: string} & Partial<CreateProductPayload>): Promise<Product> => {
const response = await api.put(`/api/farmer/products/${id}`, payload);
return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
await api.delete(`/api/farmer/products/${id}`);
};
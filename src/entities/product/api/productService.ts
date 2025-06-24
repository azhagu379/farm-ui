import { axiosInstance } from '@/lib/axios';
import { type Product } from '../types';
import { CreateProductPayload } from '../hooks/use-product-mutation';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get('/products');
  return response.data;
};
export const getProductById = async (id: string): Promise<Product> => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};
export const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
      const response = await axiosInstance.post('/farmer/products', payload);
      return response.data;
    };
export const updateProduct = async ({ id, ...payload }: {id: string} & Partial<CreateProductPayload>): Promise<Product> => {
const response = await axiosInstance.put(`/farmer/products/${id}`, payload);
return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
await axiosInstance.delete(`/farmer/products/${id}`);
};
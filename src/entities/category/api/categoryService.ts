import { axiosInstance } from '@/lib/axios';
import { type Category } from '../types';

/**
 * Fetches a list of all product categories from the axiosInstance.
 * @returns A promise that resolves to an array of Category objects.
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get('/categories');
  return response.data;
};

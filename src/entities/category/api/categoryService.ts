import { api } from '@/app/api';
import { type Category } from '../types';

/**
 * Fetches a list of all product categories from the API.
 * @returns A promise that resolves to an array of Category objects.
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/api/categories');
  return response.data;
};

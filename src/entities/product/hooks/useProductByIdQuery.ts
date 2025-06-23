'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/productService';

export const useProductByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['product', id], // Dynamic query key includes the product ID
    queryFn: () => getProductById(id),
    enabled: !!id, // The query will not run until an ID is provided
  });
};

'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/productService';

export const useProductByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['product', id], 
    queryFn: () => getProductById(id),
    enabled: !!id, 
  });
};

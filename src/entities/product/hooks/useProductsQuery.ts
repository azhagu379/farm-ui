'use client';

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productService';

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'], // A unique key for this query
    queryFn: getProducts, // The function that will fetch the data
  });
};

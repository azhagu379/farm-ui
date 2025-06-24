'use client';

import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/categoryService';

/**
 * A custom React Query hook to fetch and cache the list of product categories.
 *
 * This hook abstracts the data-fetching logic, providing components with a simple
 * way to access category data, along with loading and error states.
 *
 * @returns The result of the useQuery hook, including `data`, `isLoading`, and `isError`.
 */
export const useCategoriesQuery = () => {
  return useQuery({
    // A unique key for this query, used by React Query for caching.
    queryKey: ['categories'],
    
    // The function that will be executed to fetch the data.
    queryFn: getCategories,
  });
};

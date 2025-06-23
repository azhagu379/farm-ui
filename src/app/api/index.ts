import axios from 'axios';

/**
 * A centralized Axios instance for making API requests.
 * We can configure base URLs, headers, and interceptors here.
 */
export const api = axios.create({
  // In a real application, you would set your API's base URL here
  // baseURL: 'https://api.farmconnect.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Later, we can add interceptors here to automatically handle
// things like adding auth tokens to requests or handling global errors.

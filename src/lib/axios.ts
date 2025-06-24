// src/lib/axios.ts

import axios from 'axios';

// Create a custom Axios instance for your API calls
export const axiosInstance = axios.create({
  // Use /api as the base URL for Next.js API routes (e.g., /api/products, /api/farmer/products)
  // In a real app with a separate backend, this would typically be your backend's full API URL
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Optional: Add Request and Response Interceptors ---
// These are good for global error handling, adding auth tokens, etc.

// Example Request Interceptor (e.g., for attaching Auth token from session if needed)
axiosInstance.interceptors.request.use(
  (config) => {
    // Note: For Next.js App Router with NextAuth.js, Server Components can fetch directly.
    // Client Components using axios might need to get the session token here if API routes require it.
    // However, if your API routes are also Next.js API routes, NextAuth middleware handles session.
    // If you need a token for an external backend, you'd fetch it client-side:
    // const sessionToken = localStorage.getItem('next-auth.session-token'); // Or from useSession
    // if (sessionToken && config.headers) {
    //   config.headers.Authorization = `Bearer ${sessionToken}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example Response Interceptor (for global error handling and toast notifications)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Global error handling based on status codes
    // import { signOut } from 'next-auth/react'; // You'd import this if using client-side signOut
    // import { useRouter } from 'next/navigation'; // You'd import this
    // const router = useRouter(); // You'd get router in your main App/Providers

    // if (error.response?.status === 401 || error.response?.status === 403) {
    //   // Unauthorized or Forbidden: Redirect to login or unauthorized page
    //   // signOut(); // Sign out the user if token is invalid
    //   // router.push('/login');
    //   console.error("Authentication/Authorization Error:", error.response.status, error.response.data);
    // } else if (error.response?.status >= 500) {
    //   // Server error: Show a generic error toast
    //   // toast.error("Server Error", { description: "An unexpected error occurred. Please try again." });
    //   console.error("Server Error:", error.response.status, error.response.data);
    // } else if (error.response) {
    //   // Other client-side errors (4xx)
    //   // toast.error("Request Failed", { description: error.response.data?.message || "Please check your input." });
    //   console.error("API Error:", error.response.status, error.response.data);
    // } else if (error.request) {
    //   // No response received (e.g., network error)
    //   // toast.error("Network Error", { description: "Could not connect to the server. Please check your internet connection." });
    //   console.error("Network Error:", error.request);
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   console.error('Error', error.message);
    // }
    return Promise.reject(error);
  }
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product } from '@/entities/product/types';

// Define the shape of an item in the cart
export interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the cart's state and actions
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  // Use the 'persist' middleware to save the cart state to localStorage.
  // This makes the cart persist even when the user reloads the page.
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            // If item already exists, increment its quantity
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return { items: updatedItems };
          } else {
            // If item is new, add it to the cart with quantity 1
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateItemQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'farm-cart-storage', // Name for the localStorage key
    }
  )
);

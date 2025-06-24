export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number; // Current stock quantity
  status: 'In Stock' | 'Out of Stock' | 'Low Stock' | 'Pending Approval' | 'Rejected'; // Product availability/approval status
  imageUrl: string[]; // Array of URLs to product images
  category: string; // Name or slug of the category (e.g., 'Vegetables'). Acts as a FK to Category.name/slug
  farmerId: string; // Foreign Key to FarmerProfile.id
  createdAt: string; // ISO string date
  updatedAt: string; // ISO string date
  isDeal?: boolean; // NEW: Flag to indicate if product is part of a deal/offer
  salesCount?: number; // NEW: Simulate sales count for 'Best Sellers' or popularity
  // Add other optional fields like weight, unit, tags, etc.
}

// Types for Product API payloads (used for forms and mutations)
export type ProductCreatePayload = Omit<Product, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'salesCount'>; // salesCount typically not set on create
export type ProductUpdatePayload = Partial<Omit<Product, 'id' | 'farmerId' | 'createdAt' | 'updatedAt'>>;

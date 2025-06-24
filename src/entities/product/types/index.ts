// src/entities/product/types/index.ts

/**
 * Represents a farm product available for sale.
 */
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
}

export type ProductCreatePayload = Omit<Product, 'id' | 'status' | 'createdAt' | 'updatedAt'>; // Status might be default 'Pending Approval' on creation
export type ProductUpdatePayload = Partial<Omit<Product, 'id' | 'farmerId' | 'createdAt' | 'updatedAt'>>; // FarmerId shouldn't be changed on update from frontend

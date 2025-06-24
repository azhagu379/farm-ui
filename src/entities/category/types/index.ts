export interface Category {
  id: string;
  name: string;
  slug: string; // URL-friendly identifier for the category (e.g., 'vegetables')
  description?: string;
  imageUrl?: string; // Optional URL for a category icon/image
  createdAt: string; // ISO string date
  updatedAt: string; // ISO string date
}

// Types for Category API payloads (less common for frontend to create/update categories)
export type CategoryCreatePayload = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>;
export type CategoryUpdatePayload = Partial<Omit<Category, 'id' | 'slug' | 'createdAt' | 'updatedAt'>>;

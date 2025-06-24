
// ===================================
//      1. AUTH & USER MODELS
// ===================================

/**
 * The central User model. Represents anyone who can log in.
 * The `role` enum is critical for access control.
 */
export interface User {
  id: string; 
  name: string;
  email: string; 
  passwordHash: string; 
  role: 'BUYER' | 'FARMER' | 'ADMIN';
  createdAt: string; 
  updatedAt: string; 
}

/**
 * A user can have multiple shipping addresses.
 * This is a one-to-many relationship: One User -> Many Addresses.
 */
export interface Address {
  id: string;
  userId: string;
  recipientName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string; 
  phone: string;
}


export interface FarmerProfile {
  id: string;
  userId: string;
  farmName: string;
  farmDescription: string;
  logoUrl?: string; 
  isVerified: boolean; 
}


// ===================================
//      2. PRODUCT & CATALOG MODELS
// ===================================


export interface Category {
  id: string;
  name: string;      
  slug: string;      
  imageUrl?: string; 
}


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;       
  images: string[];    
  stock: number;       
  status: 'ACTIVE' | 'ARCHIVED' | 'PENDING_APPROVAL';
  categoryId: string;
  farmerId: string;

  createdAt: string;
  updatedAt: string; 
}


// ===================================
//      3. ORDER & TRANSACTION MODELS
// ===================================


export interface Order {
  id: string; 
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number; 
  buyerId: string;
  shippingAddressId: string;

  createdAt: string;
  updatedAt: string; 
}

export interface OrderItem {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  orderId: string;
  productId: string;
}

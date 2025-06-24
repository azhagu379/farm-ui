export interface FarmerProfile {
  id: string; // Unique ID for the farmer profile (can be same as User.id if 1:1)
  userId: string; // Foreign Key to User.id
  farmName: string;
  location: string; // e.g., "Chennai, Tamil Nadu"
  bio: string;
  certifications: string[]; // e.g., ['Organic Certified', 'Fair Trade']
  profileImageUrl: string; // URL to the farmer's profile picture/logo
  createdAt: string; // ISO string date
  updatedAt: string; // ISO string date
}

// Types for Farmer Profile API payloads
export type FarmerProfileCreatePayload = Omit<FarmerProfile, 'id' | 'createdAt' | 'updatedAt'>;
export type FarmerProfileUpdatePayload = Partial<Omit<FarmerProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;

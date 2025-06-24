
export interface Address {
  id: string;
  userId: string; // Foreign Key to User.id
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean; // True if this is the user's default address
  createdAt: string; // ISO string date
  updatedAt: string; // ISO string date
}

// Types for Address API payloads
export type AddressCreatePayload = Omit<Address, 'id' | 'createdAt' | 'updatedAt'>;
export type AddressUpdatePayload = Partial<Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;

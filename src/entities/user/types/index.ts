
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; 
  role: 'BUYER' | 'FARMER' | 'ADMIN';
  createdAt: string; 
  updatedAt: string;
}

export type UserCreatePayload = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UserUpdatePayload = Partial<Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>>;

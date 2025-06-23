export interface Product {
  id: string;
  name: string;
  farmer: string;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

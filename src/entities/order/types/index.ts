// src/entities/order/types/index.ts

/**
 * Represents a single item within a customer's order.
 * This is typically nested within an Order or fetched alongside it.
 */
export interface OrderItem {
  id: string; // Unique ID for the order item
  orderId: string; // Foreign Key to Order.id
  productId: string; // Foreign Key to Product.id
  productName: string;
  productPrice: number; 
  quantity: number;
  subtotal: number; 
}


export interface Order {
  id: string;
  userId: string; // Foreign Key to User.id (the buyer)
  orderDate: string; // ISO string date of when the order was placed
  totalAmount: number; // Total price of the order including all items
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  shippingAddressId: string; // Foreign Key to Address.id
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  trackingNumber?: string; // Optional tracking number for shipped orders
  createdAt: string; // ISO string date
  updatedAt: string; // ISO string date

}

export type OrderCreatePayload = Omit<Order, 'id' | 'status' | 'paymentStatus' | 'createdAt' | 'updatedAt' | 'trackingNumber'> & {
  items: Omit<OrderItem, 'id' | 'orderId'>[]; // When creating, you send items data
};
export type OrderUpdatePayload = Partial<Omit<Order, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;
export type OrderItemCreatePayload = Omit<OrderItem, 'id' | 'orderId'>;

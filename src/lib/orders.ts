import { Order, CartItem } from '../types';

export const generateOrderId = (): string => {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GM-${year}-${randomChars}`;
};

export const createOrder = (
  items: CartItem[],
  subtotal: number,
  discount: number,
  total: number,
  customerInfo: { name: string; email: string; phone: string }
): Order => {
  const order: Order = {
    id: generateOrderId(),
    date: new Date().toISOString(),
    items,
    subtotal,
    discount,
    total,
    customer: customerInfo,
    status: 'pending'
  };

  return order;
};

export const saveOrder = (order: Order) => {
  if (typeof window !== 'undefined') {
    const existingOrders = JSON.parse(localStorage.getItem('spgameloot_orders') || '[]');
    localStorage.setItem('spgameloot_orders', JSON.stringify([order, ...existingOrders]));
    
    // Save as current order for confirmation page
    localStorage.setItem('spgameloot_current_order', JSON.stringify(order));
  }
};

export const getCurrentOrder = (): Order | null => {
  if (typeof window !== 'undefined') {
    const orderStr = localStorage.getItem('spgameloot_current_order');
    if (orderStr) {
      try {
        return JSON.parse(orderStr);
      } catch (e) {
        console.error('Failed to parse current order');
      }
    }
  }
  return null;
};

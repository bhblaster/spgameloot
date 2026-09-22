import { Order, DeliveryResult } from '../types';
import { CONFIG } from './config';

export interface DeliveryProvider {
  send(order: Order, phone: string): Promise<DeliveryResult>;
}

class MockDeliveryProvider implements DeliveryProvider {
  async send(order: Order, phone: string): Promise<DeliveryResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`[MOCK DELIVERY] Sending order ${order.id} to ${phone}`);
    console.log(`[MOCK DELIVERY] Items:`, order.items.map(i => `${i.quantity}x ${i.game.title}`).join(', '));
    
    return {
      success: true,
      message: 'Order delivered successfully via mock provider.',
      orderId: order.id
    };
  }
}

export const deliverOrder = async (order: Order): Promise<DeliveryResult> => {
  const provider = new MockDeliveryProvider();
  
  try {
    return await provider.send(order, CONFIG.DELIVERY_PHONE_NUMBER);
  } catch (error) {
    console.error('Delivery failed:', error);
    return {
      success: false,
      message: 'Failed to deliver order.',
    };
  }
};

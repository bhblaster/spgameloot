'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCurrentOrder } from '@/lib/orders';
import { Order } from '@/types';

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentOrder = getCurrentOrder();
    setOrder(currentOrder);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-white">Loading...</div>;
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <svg className="w-20 h-20 text-gray-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl font-bold text-white mb-4">No Recent Order Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">We couldn't find your recent order details. If you just placed an order, please check your phone/email for the confirmation.</p>
        <Link href="/games" className="px-8 py-3 bg-accent text-white font-bold uppercase tracking-widest clip-angled-button hover:bg-accent-glow transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 animate-[fadeIn_0.5s_ease-out]">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-wider mb-4">
          Order <span className="text-accent">Confirmed</span>
        </h1>
        <p className="text-xl text-gray-300">
          Thank you for your purchase, {order.customer.name.split(' ')[0]}!
        </p>
      </div>

      <div className="bg-elevated border border-gray-800 p-8 rounded-sm clip-angled shadow-2xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-800 relative z-10">
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Order Number</h3>
            <p className="text-2xl font-mono text-white">{order.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Date</h3>
            <p className="text-lg text-white">{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</p>
          </div>
        </div>

        <div className="mb-8 relative z-10">
          <div className="bg-primary/50 border border-green-500/30 p-6 rounded text-center">
            <h3 className="text-green-400 font-bold mb-2 text-lg">Delivery Status: Sent to WhatsApp</h3>
            <p className="text-gray-300">
              Your game keys have been dispatched to <span className="text-white font-bold">{order.customer.phone}</span>. 
              Please check your WhatsApp messages.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Order Items</h3>
          <div className="flex flex-col gap-6 mb-8">
            {order.items.map(({ game, quantity }) => (
              <div key={game.id} className="flex gap-6 items-center">
                <div className="relative w-20 h-28 flex-shrink-0 border border-gray-700">
                  <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-bold text-white mb-1">{game.title}</h4>
                  <div className="text-gray-400 text-sm mb-2">{game.platforms.join(', ')}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Qty: {quantity}</span>
                    <span className="font-bold text-white">${((game.salePrice || game.price) * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary p-6 rounded">
            <div className="flex justify-between text-gray-400 mb-3">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-400 mb-3">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-white font-bold text-2xl pt-4 border-t border-gray-800 mt-4">
              <span>Total Paid</span>
              <span className="text-accent">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/games" className="inline-block px-10 py-4 bg-white hover:bg-gray-200 text-black font-bold uppercase tracking-widest clip-angled-button transition-colors">
          Explore More Games
        </Link>
      </div>
    </div>
  );
}

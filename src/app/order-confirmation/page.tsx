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
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-2 border-white/10 border-t-accent rounded-full animate-spin mb-6"></div>
        <div className="text-muted tracking-[0.2em] uppercase font-bold text-sm">Decoding Signal...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-primary pt-32 pb-20 flex flex-col items-center text-center px-6">
        <svg className="w-24 h-24 text-white/10 mb-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-4xl font-display font-bold text-light mb-4 uppercase tracking-wider">Signal Lost</h1>
        <p className="text-muted mb-10 max-w-lg leading-relaxed text-lg">We couldn't find your recent order details in the cache. If you just placed an order, please check your WhatsApp or email for the transmission.</p>
        <Link href="/games" className="px-10 py-5 bg-accent text-white font-bold uppercase tracking-[0.2em] clip-angled-button hover:bg-accent-glow transition-all">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen pt-24 pb-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-60 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-[fadeIn_0.5s_ease-out]">
          <div className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8 border border-accent/20 shadow-[0_0_30px_rgba(230,57,70,0.3)]">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-light uppercase tracking-widest mb-4">
            Order <span className="text-accent">Confirmed</span>
          </h1>
          <p className="text-xl text-muted tracking-wide">
            Transmission successful, {order.customer.name.split(' ')[0]}.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 border border-white/5 clip-angled relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent/50"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent/50"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-white/10 relative z-10">
            <div>
              <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-2">Transmission ID</h3>
              <p className="text-2xl font-mono text-light tracking-wider">{order.id}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-2">Timestamp</h3>
              <p className="text-lg text-light tracking-wide">{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="mb-12 relative z-10">
            <div className="bg-accent/10 border border-accent/30 p-6 clip-angled-tl">
              <h3 className="text-accent font-display font-bold mb-3 text-xl tracking-wider uppercase flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Delivery Status: Dispatched
              </h3>
              <p className="text-light/90 leading-relaxed text-lg">
                Your game keys have been sent via encrypted channel to <span className="text-white font-mono bg-primary px-2 py-1 mx-1 border border-white/10">{order.customer.phone}</span>. 
                Please check your WhatsApp messages.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-display font-bold text-light mb-8 uppercase tracking-[0.2em]">Acquired Assets</h3>
            <div className="flex flex-col gap-6 mb-10">
              {order.items.map(({ game, quantity }) => (
                <div key={game.id} className="flex gap-6 items-center p-4 bg-secondary border border-white/5 clip-angled-tl hover:bg-white/5 transition-colors">
                  <div className="relative w-24 h-32 flex-shrink-0 border border-white/10">
                    <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-display font-bold text-light mb-1 uppercase tracking-wider">{game.title}</h4>
                    <div className="text-muted text-xs font-bold tracking-widest uppercase mb-4">{game.platforms.join(' • ')}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted tracking-widest uppercase text-sm">Qty: {quantity}</span>
                      <span className="font-display font-bold text-light text-xl">${((game.salePrice || game.price) * quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary p-8 border border-white/5">
              <div className="flex justify-between text-muted mb-4 font-bold tracking-widest uppercase text-sm">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-accent mb-4 font-bold tracking-widest uppercase text-sm">
                  <span>Discount</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-light font-display font-bold text-3xl pt-6 border-t border-white/10 mt-6">
                <span>Total Cleared</span>
                <span className="text-accent">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/games" className="inline-block px-12 py-5 bg-light hover:bg-white text-primary font-bold uppercase tracking-[0.2em] clip-angled-button transition-colors relative group">
            <span className="relative z-10">Explore More Games</span>
            <div className="absolute inset-0 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out z-0 opacity-10"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

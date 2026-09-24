'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartUI } from './ClientCartWrapper';
import { useCart } from '@/lib/cart';

export default function Header() {
  const router = useRouter();
  const { setIsCartOpen } = useCartUI();
  const { items } = useCart();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="w-full flex items-center justify-between px-10 py-6 absolute top-0 z-50 pointer-events-none">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white hover:text-white/80 transition-colors pointer-events-auto bg-shell/50 backdrop-blur-md px-4 py-2 rounded-lg"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* User Actions */}
      <div className="flex items-center gap-6 pointer-events-auto bg-shell/50 backdrop-blur-md px-6 py-2 rounded-xl">
        <div className="flex items-center gap-5">
          {/* Cart Icon */}
          <button onClick={() => setIsCartOpen(true)} className="text-white/80 hover:text-white transition-colors relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          <button className="text-white/80 hover:text-white transition-colors relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          
          <button className="text-white/80 hover:text-white transition-colors relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0.5 w-2 h-2 bg-accent rounded-full border border-shell"></span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-5 border-l border-white/10 cursor-pointer group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors">
            <Image 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" 
              alt="User Avatar" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-white font-bold text-sm leading-none mb-1">QuantumSpectre55</span>
            <span className="text-white/50 text-[10px] leading-none">quantums@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}

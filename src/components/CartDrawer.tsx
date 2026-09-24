'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotal, getSubtotal, getDiscount } = useCart();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  return (
    <>
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity rounded-[var(--radius-shell)]"
        onClick={onClose}
      />
      
      <div className={`absolute inset-y-0 right-0 z-[100] w-full max-w-md bg-shell-elevated border-l border-white/5 shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} rounded-r-[var(--radius-shell)]`}>
        
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Your Cart</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/50 gap-4">
              <svg className="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="font-medium text-sm">Your cart is empty.</p>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-3 border border-white/10 hover:border-white/30 hover:text-white transition-colors text-xs font-bold uppercase rounded-[var(--radius-button)]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map(({ game, quantity }) => (
                <div key={game.id} className="flex gap-4 p-3 bg-shell border border-white/5 rounded-[var(--radius-card)]">
                  <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
                  </div>
                  
                  <div className="flex flex-col justify-between flex-grow py-1 pr-2">
                    <div>
                      <h4 className="font-bold text-white text-sm line-clamp-1 mb-1">{game.title}</h4>
                      <p className="text-white font-bold text-lg">${(game.salePrice || game.price).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-shell-elevated border border-white/5 rounded-md px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(game.id, quantity - 1)}
                          className="text-white/50 hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm w-4 text-center text-white font-medium">{quantity}</span>
                        <button 
                          onClick={() => updateQuantity(game.id, quantity + 1)}
                          className="text-white/50 hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(game.id)}
                        className="text-white/40 hover:text-accent transition-colors text-xs font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/5 p-8 bg-shell">
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between text-white/50 text-sm font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-accent text-sm font-bold">
                  <span>Bundle Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-bold text-2xl mt-4 pt-4 border-t border-white/10">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              href="/checkout"
              onClick={onClose}
              className="block w-full gradient-accent hover:gradient-accent-hover text-white text-center py-4 font-bold rounded-[var(--radius-button)] transition-all shadow-lg"
            >
              Checkout Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
        onClick={onClose}
      />
      
      <div className={`fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-secondary border-l border-white/10 shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-60"></div>
          <h2 className="text-xl font-display font-bold tracking-[0.2em] text-light uppercase relative z-10">Your Cart</h2>
          <button onClick={onClose} className="text-muted hover:text-light transition-colors p-2 relative z-10">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar bg-secondary relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-screen" />
          
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted gap-4 relative z-10">
              <svg className="w-16 h-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="font-display tracking-wider uppercase text-sm">Your cart is empty.</p>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-3 border border-white/10 hover:border-accent hover:text-light transition-colors text-xs font-bold tracking-widest uppercase clip-angled-button"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 relative z-10">
              {items.map(({ game, quantity }) => (
                <div key={game.id} className="flex gap-4 glass-panel p-3 clip-angled-tl border border-white/5">
                  <div className="relative w-20 h-24 flex-shrink-0 border border-white/10">
                    <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
                  </div>
                  
                  <div className="flex flex-col justify-between flex-grow py-1">
                    <div>
                      <h4 className="font-bold text-light font-display uppercase tracking-wide leading-tight line-clamp-2">{game.title}</h4>
                      <p className="text-accent font-display font-bold mt-1 text-lg">${(game.salePrice || game.price).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-primary border border-white/5 px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(game.id, quantity - 1)}
                          className="text-muted hover:text-light transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm w-4 text-center text-light">{quantity}</span>
                        <button 
                          onClick={() => updateQuantity(game.id, quantity + 1)}
                          className="text-muted hover:text-light transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(game.id)}
                        className="text-muted hover:text-accent transition-colors text-xs font-bold uppercase tracking-wider"
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
          <div className="border-t border-white/5 p-6 bg-primary relative">
            <div className="flex flex-col gap-3 mb-6 relative z-10">
              <div className="flex justify-between text-muted text-sm font-bold tracking-widest uppercase">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-accent text-sm font-bold tracking-widest uppercase">
                  <span>Bundle Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-light font-display font-bold text-2xl mt-4 pt-4 border-t border-white/10">
                <span>Total</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              href="/checkout"
              onClick={onClose}
              className="group relative block w-full bg-accent hover:bg-accent-glow text-white text-center py-5 font-bold tracking-[0.2em] uppercase transition-all clip-angled-button overflow-hidden"
            >
              <span className="relative z-10">Checkout Now</span>
              <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

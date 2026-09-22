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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-card shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-primary">
          <h2 className="text-xl font-display font-bold tracking-widest text-white uppercase">Your Cart</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
              <svg className="w-16 h-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>Your cart is empty.</p>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-elevated hover:bg-gray-700 text-white font-medium rounded transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map(({ game, quantity }) => (
                <div key={game.id} className="flex gap-4 bg-elevated p-3 rounded clip-angled">
                  <div className="relative w-20 h-24 flex-shrink-0">
                    <Image src={game.coverImage} alt={game.title} fill className="object-cover rounded-sm" />
                  </div>
                  
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="font-semibold text-white line-clamp-1">{game.title}</h4>
                      <p className="text-sm font-bold text-white mt-1">${(game.salePrice || game.price).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-primary rounded px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(game.id, quantity - 1)}
                          className="text-gray-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="text-sm w-4 text-center">{quantity}</span>
                        <button 
                          onClick={() => updateQuantity(game.id, quantity + 1)}
                          className="text-gray-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(game.id)}
                        className="text-gray-500 hover:text-accent transition-colors text-sm underline"
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
          <div className="border-t border-gray-800 p-6 bg-primary">
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400 text-sm">
                  <span>Bundle Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-bold text-xl mt-2 pt-2 border-t border-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-accent hover:bg-accent-glow text-white text-center py-4 font-bold tracking-widest uppercase transition-colors clip-angled-button"
            >
              Checkout Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

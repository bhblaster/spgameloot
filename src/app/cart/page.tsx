'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getSubtotal, getDiscount, getTotal } = useCart();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-display font-bold text-white uppercase tracking-wider mb-8 border-b border-gray-800 pb-4">
        Your <span className="text-accent">Cart</span>
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-elevated rounded-sm border border-gray-800 clip-angled text-center">
          <svg className="w-24 h-24 text-gray-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">Your cart is empty</h2>
          <p className="text-gray-400 mb-8 max-w-md">Looks like you haven't added any games to your cart yet. Discover some amazing titles in our store.</p>
          <Link href="/games" className="px-8 py-4 bg-accent hover:bg-accent-glow text-white font-bold uppercase tracking-widest clip-angled-button transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-4">
              <span>Product</span>
              <span className="hidden sm:block">Quantity & Price</span>
            </div>
            
            <div className="flex flex-col gap-6">
              {items.map(({ game, quantity }) => (
                <div key={game.id} className="flex flex-col sm:flex-row gap-6 bg-elevated p-4 sm:p-6 rounded-sm border border-gray-800 clip-angled relative group">
                  <div className="relative w-full sm:w-32 aspect-video sm:aspect-[3/4] flex-shrink-0">
                    <Image src={game.coverImage} alt={game.title} fill className="object-cover rounded-sm" />
                  </div>
                  
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <Link href={`/games/${game.slug}`}>
                          <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{game.title}</h3>
                        </Link>
                        <button 
                          onClick={() => removeFromCart(game.id)}
                          className="text-gray-500 hover:text-accent p-1 transition-colors"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{game.platforms.join(', ')}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 bg-primary border border-gray-700 rounded px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(game.id, quantity - 1)}
                          className="text-gray-400 hover:text-white px-2 font-bold"
                        >
                          -
                        </button>
                        <span className="text-white font-mono w-4 text-center">{quantity}</span>
                        <button 
                          onClick={() => updateQuantity(game.id, quantity + 1)}
                          className="text-gray-400 hover:text-white px-2 font-bold"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        {game.salePrice && (
                          <div className="text-sm text-gray-500 line-through">${(game.price * quantity).toFixed(2)}</div>
                        )}
                        <div className="text-2xl font-bold text-white">
                          ${((game.salePrice || game.price) * quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-elevated p-8 rounded-sm border border-gray-800 clip-angled sticky top-28 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-gray-800 pb-4">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({items.reduce((acc, curr) => acc + curr.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-400 font-medium bg-green-900/20 p-2 rounded">
                    <span>Bundle Discount Applied</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-white font-bold text-2xl pt-6 border-t border-gray-800 mb-8">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Link 
                href="/checkout"
                className="block w-full py-4 bg-accent hover:bg-accent-glow text-white text-center font-bold tracking-widest uppercase transition-colors clip-angled-button shadow-lg"
              >
                Proceed to Checkout
              </Link>

              <p className="text-xs text-gray-500 mt-6 text-center">
                Taxes and additional fees are calculated during checkout.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

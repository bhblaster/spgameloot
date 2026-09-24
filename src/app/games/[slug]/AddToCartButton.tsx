'use client';

import React from 'react';
import { Game } from '@/types';
import { useCart } from '@/lib/cart';
import { useToast } from '@/components/ToastProvider';

export default function AddToCartButton({ game }: { game: Game }) {
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();

  const handleAdd = () => {
    if (!isInCart(game.id)) {
      addToCart(game);
      addToast(`${game.title} added to cart`, 'success');
    }
  };

  return (
    <div className="flex gap-4 ml-auto lg:ml-0">
      <button 
        onClick={handleAdd}
        className="gradient-accent hover:gradient-accent-hover px-6 py-3 rounded-[var(--radius-button)] flex items-center gap-6 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg"
      >
        <span className="text-white font-bold text-sm tracking-wide">
          {isInCart(game.id) ? 'In Cart' : 'Buy now'}
        </span>
        <div className="flex items-baseline gap-2">
          {game.salePrice && (
            <span className="text-white/70 text-[11px] line-through font-medium">${game.price.toFixed(2)}</span>
          )}
          <span className="text-white font-bold text-lg">${(game.salePrice || game.price).toFixed(2)}</span>
        </div>
      </button>
      
      <button className="bg-shell-elevated hover:bg-[#312e30] w-[52px] h-[52px] rounded-[var(--radius-button)] flex items-center justify-center transition-colors">
        <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
}

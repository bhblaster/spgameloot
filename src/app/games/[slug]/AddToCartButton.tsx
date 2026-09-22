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

  if (isInCart(game.id)) {
    return (
      <button 
        disabled
        className="w-full py-4 bg-green-600 text-white font-bold tracking-widest uppercase flex items-center justify-center gap-2 clip-angled-button opacity-90 cursor-default"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Added to Cart
      </button>
    );
  }

  return (
    <button 
      onClick={handleAdd}
      className="w-full py-4 bg-accent hover:bg-accent-glow text-white font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 clip-angled-button shadow-lg hover:shadow-[0_0_20px_rgba(255,45,107,0.4)]"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Add to Cart
    </button>
  );
}

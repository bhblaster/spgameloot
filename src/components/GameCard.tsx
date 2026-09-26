'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types';
import { useCart } from '@/lib/cart';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isInCart(game.id)) {
      addToCart(game);
    }
  };

  return (
    <Link href={`/games/${game.slug}`} className="block group relative w-full aspect-[2/3] rounded-[var(--radius-card)] overflow-hidden transition-all duration-300 shadow-lg">
      <div className="absolute inset-0 bg-shell">
        <Image 
          src={game.coverImage} 
          alt={game.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        {/* Soft gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-shell via-shell/20 to-transparent opacity-90 transition-opacity duration-300" />
      </div>

      <div className="absolute inset-0 p-5 flex flex-col justify-end z-10">
        <h3 className="font-bold text-white text-lg leading-tight mb-1 group-hover:text-accent transition-colors">
          {game.title}
        </h3>
        <p className="text-xs text-white/60 mb-3">{game.genres.join(', ')}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {game.salePrice ? (
              <>
                <span className="font-bold text-accent">${game.salePrice.toFixed(2)}</span>
                <span className="text-[10px] text-white/40 line-through">${game.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold text-white">${game.price.toFixed(2)}</span>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isInCart(game.id) ? 'bg-white/10 text-white cursor-default' : 'bg-white/10 text-white hover:bg-white hover:text-black'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isInCart(game.id) ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types';
import { useCart } from '@/lib/cart';
import { useToast } from './ToastProvider';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart(game.id)) {
      addToCart(game);
      addToast(`${game.title} added to cart`, 'success');
    }
  };

  const hasDiscount = game.salePrice && game.salePrice < game.price;
  const discountPercent = hasDiscount 
    ? Math.round(((game.price - game.salePrice!) / game.price) * 100) 
    : 0;

  return (
    <Link 
      href={`/games/${game.slug}`}
      className="group bg-card rounded-sm border border-gray-800 hover:border-gray-600 transition-all duration-300 flex flex-col h-full overflow-hidden clip-angled hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-elevated">
        <Image 
          src={game.coverImage} 
          alt={game.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-sm shadow-lg">
              -{discountPercent}%
            </span>
          )}
          {game.newRelease && (
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-lg">
              NEW
            </span>
          )}
        </div>

        {/* Quick Add Button (visible on hover) */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button 
            onClick={handleAddToCart}
            className={`w-full py-2 text-sm font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 ${
              isInCart(game.id)
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-accent hover:bg-accent-glow text-white'
            }`}
          >
            {isInCart(game.id) ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                In Cart
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>

      {/* Info container */}
      <div className="p-4 flex flex-col flex-grow relative z-20 bg-card">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors line-clamp-1">
            {game.title}
          </h3>
        </div>
        
        <p className="text-xs text-gray-400 mb-3 line-clamp-1">
          {game.developer}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-300 font-medium">{game.rating}</span>
          </div>
          
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${game.price.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-white">
              ${(game.salePrice || game.price).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

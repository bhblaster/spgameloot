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
    if (!isInCart(game.id)) {
      addToCart(game);
      addToast(`${game.title} added to cart`, 'success');
    }
  };

  return (
    <Link href={`/games/${game.slug}`} className="block group relative w-full h-[450px] clip-angled-tl bg-card transition-all duration-500 hover:glow-box">
      {/* Background/Image Container */}
      <div className="absolute inset-0 overflow-hidden bg-secondary">
        <Image 
          src={game.coverImage} 
          alt={game.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 opacity-80 group-hover:opacity-100"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay" />
      </div>

      {/* Sale Badge */}
      {game.salePrice && (
        <div className="absolute top-4 right-4 z-20 bg-accent text-white text-xs font-bold px-3 py-1.5 clip-angled shadow-[0_0_15px_rgba(230,57,70,0.5)]">
          -{Math.round((1 - game.salePrice / game.price) * 100)}%
        </div>
      )}

      {/* Content - Default state (bottom aligned) */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end h-full transition-transform duration-500 transform group-hover:translate-y-[-60px]">
        
        {/* Genre & Platform metadata */}
        <div className="flex items-center justify-between mb-2 opacity-80">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">
            {game.genres[0]}
          </span>
          <div className="flex gap-2 text-xs text-muted">
            {game.platforms.slice(0,2).map(p => (
              <span key={p}>{p === 'PC' ? 'PC' : p === 'PS5' ? 'PS' : 'XB'}</span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl font-bold text-light uppercase leading-tight mb-1">
          {game.title}
        </h3>
        
        {/* Developer */}
        <p className="text-xs text-muted mb-4">{game.developer}</p>

        {/* Price Area */}
        <div className="flex items-end gap-2">
          {game.salePrice ? (
            <>
              <span className="font-display font-bold text-xl text-accent">${game.salePrice}</span>
              <span className="text-sm text-muted line-through mb-0.5">${game.price}</span>
            </>
          ) : (
            <span className="font-display font-bold text-xl text-light">${game.price}</span>
          )}
        </div>
      </div>

      {/* Hover Reveal CTA */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-20 translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 flex items-center justify-between bg-gradient-to-t from-primary to-transparent pt-12">
        <div className="flex items-center gap-1 text-accent text-sm font-bold">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {game.rating}
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="bg-light text-primary hover:bg-white text-xs font-bold uppercase tracking-wider px-4 py-2 clip-angled-button transition-colors"
        >
          {isInCart(game.id) ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
      
      {/* Edge decoration */}
      <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-[1px] h-24 bg-gradient-to-t from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  );
}

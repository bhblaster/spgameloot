'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types';
import { useCart } from '@/lib/cart';
import { useToast } from './ToastProvider';

interface HeroProps {
  game: Game;
}

export default function Hero({ game }: HeroProps) {
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    if (!isInCart(game.id)) {
      addToCart(game);
      addToast(`${game.title} added to cart`, 'success');
    }
  };

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={game.heroImage} 
          alt={game.title} 
          fill 
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl animate-[fadeIn_1s_ease-out]">
          <div className="flex items-center gap-3 mb-4">
            {game.featured && (
              <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-sm tracking-wider uppercase">
                Featured
              </span>
            )}
            <span className="text-gray-300 text-sm font-medium tracking-widest uppercase">
              {game.genres[0]}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-2 leading-tight glow-text">
            {game.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6 font-display">
            {game.tagline}
          </p>
          
          <p className="text-gray-400 mb-8 line-clamp-3 md:text-lg">
            {game.description}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={handleAddToCart}
              className={`px-8 py-4 font-bold tracking-widest uppercase transition-all clip-angled-button flex items-center gap-2 ${
                isInCart(game.id) 
                  ? 'bg-elevated text-white cursor-default' 
                  : 'bg-accent hover:bg-accent-glow text-white hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,45,107,0.4)]'
              }`}
            >
              {isInCart(game.id) ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  In Cart
                </>
              ) : (
                <>
                  Buy Now - ${(game.salePrice || game.price).toFixed(2)}
                </>
              )}
            </button>
            
            <Link 
              href={`/games/${game.slug}`}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold tracking-widest uppercase transition-all clip-angled-button backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

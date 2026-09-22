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
    <div className="relative w-full h-[90vh] min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Parallax effect simulation */}
      <div className="absolute inset-0 z-0 scale-105 transition-transform duration-[10s] hover:scale-100">
        <Image 
          src={game.heroImage} 
          alt={game.title} 
          fill 
          className="object-cover object-top opacity-90"
          priority
        />
        {/* Layered cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent opacity-60 mix-blend-screen" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-2xl">
          {/* Metadata */}
          <div className="flex items-center gap-4 mb-6">
            {game.featured && (
              <div className="bg-accent/10 border border-accent/30 text-accent text-xs font-bold px-3 py-1.5 tracking-[0.2em] uppercase clip-angled">
                Featured
              </div>
            )}
            <div className="flex items-center gap-2 text-muted text-xs font-semibold tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-accent/50"></span>
              {game.genres[0]}
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-light leading-[0.9] mb-4 glow-text uppercase">
            {game.title}
          </h1>
          
          <p className="text-xl sm:text-2xl text-light/90 font-light mb-6 tracking-wide border-l-2 border-accent pl-4">
            {game.tagline}
          </p>

          <p className="text-muted text-lg leading-relaxed mb-10 line-clamp-3 max-w-xl">
            {game.description}
          </p>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-baseline gap-3">
              {game.salePrice ? (
                <>
                  <span className="text-4xl font-display font-bold text-accent">${game.salePrice}</span>
                  <span className="text-xl text-muted line-through">${game.price}</span>
                </>
              ) : (
                <span className="text-4xl font-display font-bold text-light">${game.price}</span>
              )}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={handleAddToCart}
                className="group relative inline-flex items-center justify-center bg-accent text-white px-8 py-4 font-bold tracking-wider uppercase transition-all hover:bg-accent-glow clip-angled-button overflow-hidden"
              >
                <span className="relative z-10">{isInCart(game.id) ? 'In Cart' : 'Buy Now'}</span>
                <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
              </button>
              
              <Link 
                href={`/games/${game.slug}`}
                className="group inline-flex items-center justify-center bg-card/80 backdrop-blur-sm border border-white/10 text-light px-8 py-4 font-bold tracking-wider uppercase transition-all hover:bg-white/10 clip-angled-button"
              >
                Explore
              </Link>
            </div>
          </div>
          
          {/* Platform indicators */}
          <div className="mt-12 flex items-center gap-6 text-sm text-muted uppercase tracking-widest font-semibold">
            <span>Available On:</span>
            <div className="flex gap-4">
              {game.platforms.map(p => (
                <span key={p} className="text-light/70">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative tech elements */}
      <div className="absolute right-0 bottom-0 p-12 opacity-20 pointer-events-none hidden lg:block">
        <div className="font-display text-9xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
          {game.title.substring(0, 2).toUpperCase()}
        </div>
      </div>
    </div>
  );
}

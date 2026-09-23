import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { games } from '@/data/games';
import AddToCartButton from './AddToCartButton';
import GameCard from '@/components/GameCard';

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);

  if (!game) {
    notFound();
  }

  const relatedGames = games
    .filter(g => g.id !== game.id && g.genres.some(genre => game.genres.includes(genre)))
    .slice(0, 4);

  return (
    <div className="pb-24 bg-primary min-h-screen">
      {/* Cinematic Hero Banner */}
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden -mt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src={game.heroImage} 
            alt={game.title} 
            fill 
            className="object-cover object-top opacity-70"
            priority
          />
          {/* Layered gradients for blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent opacity-40 mix-blend-screen" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-64 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Cover Art & Buy Box */}
          <div className="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* Cover Art Container */}
              <div className="bg-secondary p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] clip-angled-tl border border-white/5 relative group">
                <div className="relative aspect-[3/4] w-full clip-angled-tl overflow-hidden">
                  <Image 
                    src={game.coverImage} 
                    alt={game.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  {game.salePrice && (
                    <div className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-3 py-1.5 shadow-[0_0_15px_rgba(230,57,70,0.5)] clip-angled">
                      -{Math.round(((game.price - game.salePrice) / game.price) * 100)}%
                    </div>
                  )}
                  {/* Subtle edge highlight */}
                  <div className="absolute inset-0 border border-white/10 clip-angled-tl pointer-events-none" />
                </div>
              </div>
              
              {/* Buy Box */}
              <div className="glass-panel p-6 clip-angled relative overflow-hidden">
                <div className="flex items-end justify-between mb-6 relative z-10">
                  {game.salePrice ? (
                    <div className="flex flex-col">
                      <span className="text-muted line-through text-sm mb-1">${game.price.toFixed(2)}</span>
                      <span className="text-4xl font-display font-bold text-accent">${game.salePrice.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-display font-bold text-light">${game.price.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="relative z-10">
                  <AddToCartButton game={game} />
                </div>
                
                {/* Meta details */}
                <div className="mt-6 flex flex-col gap-4 text-sm border-t border-white/10 pt-6 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-muted tracking-wide">Developer</span>
                    <span className="text-light font-bold tracking-wider">{game.developer}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted tracking-wide">Publisher</span>
                    <span className="text-light font-bold tracking-wider">{game.publisher}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted tracking-wide">Release</span>
                    <span className="text-light font-bold tracking-wider">
                      {new Date(game.releaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Decorative background accent */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/5 blur-[50px]" />
              </div>
            </div>
          </div>

          {/* Right Column - Title & Content */}
          <div className="w-full lg:w-2/3 xl:w-3/4 pt-8 lg:pt-32">
            
            {/* Header / Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {game.genres.map(genre => (
                <Link key={genre} href={`/categories/${genre.toLowerCase()}`} className="px-4 py-1.5 bg-secondary border border-white/10 hover:border-accent hover:text-light text-muted text-xs font-bold uppercase tracking-[0.2em] transition-colors">
                  {genre}
                </Link>
              ))}
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-light uppercase mb-4 leading-[0.9] glow-text">
              {game.title}
            </h1>
            
            <p className="text-2xl text-light/80 font-light mb-8 border-l-2 border-accent pl-5 max-w-2xl">
              {game.tagline}
            </p>
            
            <div className="flex items-center gap-8 mb-12 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-light font-bold text-xl">{game.rating}</span>
                <span className="text-muted tracking-wider text-sm">({game.reviewCount.toLocaleString()} REVIEWS)</span>
              </div>
              
              <div className="flex gap-3">
                {game.platforms.map(platform => (
                  <span key={platform} className="text-muted text-xs font-bold uppercase tracking-widest border border-white/20 px-3 py-1">
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-16 max-w-4xl">
              <h2 className="text-sm font-bold text-accent mb-6 tracking-[0.2em] uppercase">About This Game</h2>
              <div className="text-light/90 text-lg leading-relaxed space-y-6">
                <p>{game.longDescription}</p>
                <p>{game.description}</p>
              </div>
            </div>

            {/* Gallery */}
            {game.gallery && game.gallery.length > 0 && (
              <div className="mb-16">
                <h2 className="text-sm font-bold text-accent mb-6 tracking-[0.2em] uppercase">Media Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {game.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-video bg-secondary clip-angled overflow-hidden group border border-white/5 cursor-pointer">
                      <Image 
                        src={img} 
                        alt={`${game.title} screenshot ${idx + 1}`} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {game.features && (
              <div className="mb-16">
                <h2 className="text-sm font-bold text-accent mb-6 tracking-[0.2em] uppercase">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {game.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-4 glass-panel border-l-2 border-l-accent">
                      <div className="w-1.5 h-1.5 bg-accent mt-2 flex-shrink-0 glow-box rounded-full" />
                      <span className="text-light tracking-wide">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* System Requirements */}
            {game.systemRequirements && (
              <div className="mb-16">
                <h2 className="text-sm font-bold text-accent mb-6 tracking-[0.2em] uppercase">System Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 clip-angled-tl border border-white/10 overflow-hidden">
                  <div className="bg-secondary p-8">
                    <h3 className="text-light font-display font-bold mb-6 uppercase tracking-widest text-lg">Minimum</h3>
                    <ul className="text-sm text-muted space-y-4">
                      {game.systemRequirements.minimum.map((req, idx) => (
                        <li key={idx} className="flex gap-3 items-center">
                          <span className="w-4 h-[1px] bg-white/20"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-secondary p-8">
                    <h3 className="text-light font-display font-bold mb-6 uppercase tracking-widest text-lg">Recommended</h3>
                    <ul className="text-sm text-muted space-y-4">
                      {game.systemRequirements.recommended.map((req, idx) => (
                        <li key={idx} className="flex gap-3 items-center">
                          <span className="w-4 h-[1px] bg-accent/50"></span>
                          <span className="text-light/90">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <div className="mt-24 pt-16 border-t border-white/5 relative">
            <div className="flex flex-col items-center mb-12 text-center">
              <h2 className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-2">Continue Exploring</h2>
              <h3 className="font-display text-4xl font-bold text-light uppercase">Similar Titles</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedGames.map(rg => (
                <GameCard key={rg.id} game={rg} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

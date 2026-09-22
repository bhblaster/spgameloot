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
    <div className="pb-20">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image 
          src={game.heroImage} 
          alt={game.title} 
          fill 
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Col - Cover & Buy */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="bg-card rounded-sm border border-gray-800 overflow-hidden shadow-2xl clip-angled">
              <div className="relative aspect-[3/4] w-full">
                <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
                {game.salePrice && (
                  <div className="absolute top-2 left-2 bg-accent text-white text-sm font-bold px-3 py-1 rounded shadow-lg">
                    -{Math.round(((game.price - game.salePrice) / game.price) * 100)}%
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-end justify-between mb-6">
                  {game.salePrice ? (
                    <div className="flex flex-col">
                      <span className="text-gray-500 line-through text-sm">${game.price.toFixed(2)}</span>
                      <span className="text-3xl font-bold text-white">${game.salePrice.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-white">${game.price.toFixed(2)}</span>
                  )}
                </div>
                
                <AddToCartButton game={game} />
                
                <div className="mt-6 flex flex-col gap-3 text-sm border-t border-gray-800 pt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Developer</span>
                    <span className="text-white font-medium text-right">{game.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Publisher</span>
                    <span className="text-white font-medium text-right">{game.publisher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Release Date</span>
                    <span className="text-white font-medium text-right">
                      {new Date(game.releaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col - Details */}
          <div className="w-full md:w-2/3 lg:w-3/4 pt-8 md:pt-32">
            <div className="flex flex-wrap gap-2 mb-4">
              {game.genres.map(genre => (
                <Link key={genre} href={`/categories/${genre.toLowerCase()}`} className="px-3 py-1 bg-elevated hover:bg-gray-700 text-gray-300 text-xs font-bold uppercase tracking-wider rounded transition-colors">
                  {genre}
                </Link>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2">{game.title}</h1>
            <p className="text-xl text-gray-400 mb-6 font-display">{game.tagline}</p>
            
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-bold text-lg">{game.rating}</span>
                <span className="text-gray-500">({game.reviewCount.toLocaleString()} reviews)</span>
              </div>
              
              <div className="flex gap-2">
                {game.platforms.map(platform => (
                  <span key={platform} className="text-gray-400 text-sm border border-gray-700 px-2 py-1 rounded">
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-display font-bold text-white mb-4 tracking-wider uppercase border-l-4 border-accent pl-3">About This Game</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>{game.longDescription}</p>
              </div>
            </div>

            {/* Gallery */}
            {game.gallery && game.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-display font-bold text-white mb-4 tracking-wider uppercase border-l-4 border-accent pl-3">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {game.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded overflow-hidden bg-elevated clip-angled">
                      <Image src={img} alt={`${game.title} screenshot ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {game.features && (
              <div className="mb-12">
                <h2 className="text-2xl font-display font-bold text-white mb-4 tracking-wider uppercase border-l-4 border-accent pl-3">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {game.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* System Requirements */}
            {game.systemRequirements && (
              <div className="mb-12">
                <h2 className="text-2xl font-display font-bold text-white mb-4 tracking-wider uppercase border-l-4 border-accent pl-3">System Requirements (PC)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-elevated p-6 rounded border border-gray-800">
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Minimum</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      {game.systemRequirements.minimum.map((req, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-gray-600 font-bold">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">Recommended</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      {game.systemRequirements.recommended.map((req, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-gray-600 font-bold">•</span>
                          {req}
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
          <div className="mt-20 pt-12 border-t border-gray-800">
            <h2 className="text-2xl font-display font-bold text-white mb-8 tracking-wider uppercase text-center">
              You Might Also <span className="text-accent">Like</span>
            </h2>
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

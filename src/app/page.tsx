import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import GameCard from '@/components/GameCard';
import { games } from '@/data/games';
import { categories } from '@/data/categories';

export default function Home() {
  const featuredGame = games.find(g => g.slug === 'shadow-protocol') || games[0];
  const trendingGames = games.filter(g => g.trending).slice(0, 4);
  const newReleases = games.filter(g => g.newRelease).slice(0, 4);
  const deals = games.filter(g => g.discount).slice(0, 4);

  return (
    <div className="w-full">
      <Hero game={featuredGame} />
      
      {/* Trending Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wider mb-2">
              Trending <span className="text-accent">Now</span>
            </h2>
            <p className="text-gray-400">What everyone is playing right now.</p>
          </div>
          <Link href="/games?sort=trending" className="text-accent hover:text-accent-glow font-medium text-sm tracking-wider uppercase transition-colors hidden sm:block">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Featured Editorial */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Curated Collection</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Worlds Built on <br />Shadow & Steel
              </h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Dive into our hand-picked selection of dark fantasy and gritty sci-fi adventures. These titles offer unparalleled atmosphere, challenging mechanics, and stories that will stick with you long after the credits roll.
              </p>
              <Link 
                href="/categories/rpg" 
                className="inline-block px-8 py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors clip-angled-button"
              >
                Explore Collection
              </Link>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {games.filter(g => g.id === 'g-2' || g.id === 'g-5').map((game, i) => (
                <div key={game.id} className={`transform ${i % 2 !== 0 ? 'translate-y-8' : ''}`}>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wider mb-8 text-center">
          Browse by <span className="text-accent">Category</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map(cat => (
            <Link 
              key={cat.slug} 
              href={`/categories/${cat.slug}`}
              className="group relative h-40 overflow-hidden rounded clip-angled bg-elevated"
            >
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end items-center text-center">
                <span className="text-2xl mb-1">{cat.icon}</span>
                <span className="text-white font-bold tracking-wider uppercase group-hover:text-accent transition-colors">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Releases & Deals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider">New Releases</h2>
              <Link href="/games" className="text-accent hover:text-white text-sm uppercase tracking-wider">View All</Link>
            </div>
            <div className="flex flex-col gap-4">
              {newReleases.map(game => (
                <Link key={game.id} href={`/games/${game.slug}`} className="flex gap-4 bg-elevated p-3 rounded clip-angled group hover:bg-gray-800 transition-colors">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image src={game.coverImage} alt={game.title} fill className="object-cover rounded-sm" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-white group-hover:text-accent transition-colors">{game.title}</h4>
                    <span className="text-xs text-gray-400 mb-2">{game.genres.join(', ')}</span>
                    <span className="font-bold text-white">${(game.salePrice || game.price).toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider text-accent">Special Deals</h2>
              <Link href="/deals" className="text-gray-400 hover:text-white text-sm uppercase tracking-wider">View All</Link>
            </div>
            <div className="flex flex-col gap-4">
              {deals.map(game => (
                <Link key={game.id} href={`/games/${game.slug}`} className="flex gap-4 bg-elevated p-3 rounded clip-angled group hover:bg-gray-800 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-2 py-1 z-10 rounded-bl">
                    -{Math.round(((game.price - game.salePrice!) / game.price) * 100)}%
                  </div>
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image src={game.coverImage} alt={game.title} fill className="object-cover rounded-sm" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-white group-hover:text-accent transition-colors">{game.title}</h4>
                    <span className="text-xs text-gray-400 mb-2">{game.developer}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 line-through">${game.price.toFixed(2)}</span>
                      <span className="font-bold text-white">${game.salePrice?.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

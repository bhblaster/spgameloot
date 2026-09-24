'use client';

import { games } from '@/data/games';
import GameCard from '@/components/GameCard';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const featuredGame = games.find(g => g.slug === 'shadow-protocol') || games[0];
  const trendingGames = games.filter(g => g.trending).slice(0, 4);
  const newReleases = games.filter(g => g.newRelease).slice(0, 4);

  return (
    <div className="w-full flex flex-col relative pb-12">
      {/* Hero Featured Game (Matching the Hogwarts Legacy layout style, but as a billboard) */}
      <div className="relative w-full h-[55vh] flex-shrink-0 group cursor-pointer overflow-hidden">
        <Link href={`/games/${featuredGame.slug}`}>
          <Image 
            src={featuredGame.heroImage} 
            alt={featuredGame.title}
            fill
            className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-shell via-shell/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-10 w-full flex items-end justify-between z-10">
            <div>
              <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4">
                Featured Game
              </div>
              <h2 className="text-5xl font-bold text-white mb-2">{featuredGame.title}</h2>
              <p className="text-white/80 max-w-lg text-sm">{featuredGame.description}</p>
            </div>
            
            <button className="gradient-accent hover:gradient-accent-hover px-8 py-3 rounded-[var(--radius-button)] text-white font-bold transition-all shadow-lg hidden sm:block">
              Play Now
            </button>
          </div>
        </Link>
      </div>

      {/* Content Grids */}
      <div className="px-10 pt-8 flex flex-col gap-12 relative z-10">
        
        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Trending Now</h3>
            <Link href="/games" className="text-xs font-bold text-white/50 hover:text-white uppercase tracking-wider transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {trendingGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">New Releases</h3>
            <Link href="/games" className="text-xs font-bold text-white/50 hover:text-white uppercase tracking-wider transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {newReleases.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}

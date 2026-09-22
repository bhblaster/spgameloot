import React from 'react';
import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';
import { games } from '@/data/games';
import GameCard from '@/components/GameCard';
import Image from 'next/image';

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default function CategoryDetailPage({ params }: { params: { category: string } }) {
  const categoryData = categories.find(c => c.slug === params.category);
  
  if (!categoryData) {
    notFound();
  }

  const categoryGames = games.filter(g => 
    g.genres.map(x => x.toLowerCase()).includes(categoryData.slug)
  );

  return (
    <div>
      {/* Category Hero */}
      <div className="relative w-full h-[40vh] min-h-[300px] flex items-center">
        <Image 
          src={categoryData.image} 
          alt={categoryData.name} 
          fill 
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <span className="text-6xl mb-4 block">{categoryData.icon}</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-wider mb-4 glow-text">
            {categoryData.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-display">
            {categoryData.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">Showing {categoryGames.length} Games</h2>
        </div>

        {categoryGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-elevated rounded-sm border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-2">No games found</h3>
            <p className="text-gray-400">We don't have any games in this category yet. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}

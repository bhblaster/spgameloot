'use client';

import React from 'react';
import { games } from '@/data/games';
import GameCard from '@/components/GameCard';

export default function GamesPage() {
  return (
    <div className="w-full h-full p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">All Games</h1>
        <div className="flex gap-4">
          <select className="bg-shell-elevated border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30">
            <option>Sort by: Featured</option>
            <option>Sort by: Newest</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

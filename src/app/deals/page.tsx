import React from 'react';
import { games } from '@/data/games';
import GameCard from '@/components/GameCard';

export default function DealsPage() {
  const deals = games.filter(g => g.salePrice && g.salePrice < g.price);
  
  // Sort by highest discount percentage
  deals.sort((a, b) => {
    const aDiscount = (a.price - a.salePrice!) / a.price;
    const bDiscount = (b.price - b.salePrice!) / b.price;
    return bDiscount - aDiscount;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center bg-gradient-to-r from-accent/20 via-primary to-accent/20 border border-accent/30 py-12 rounded-sm clip-angled">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-wider mb-4">
          Hot <span className="text-accent glow-text">Deals</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Score epic games at massive discounts. Grab these limited-time offers before they're gone!
        </p>
      </div>

      <div className="mb-8 pb-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">Showing {deals.length} deals</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {deals.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

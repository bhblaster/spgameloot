'use client';

import React, { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard';
import { games } from '@/data/games';
import { searchGames } from '@/lib/search';
import { SearchFilters, Game } from '@/types';

export default function GamesPage() {
  const [results, setResults] = useState<Game[]>(games);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    genre: 'all',
    platform: 'all'
  });
  const [sort, setSort] = useState('relevance');

  // Extract unique genres and platforms
  const allGenres = Array.from(new Set(games.flatMap(g => g.genres))).sort();
  const allPlatforms = Array.from(new Set(games.flatMap(g => g.platforms))).sort();

  useEffect(() => {
    const filtered = searchGames(query, filters, sort);
    setResults(filtered);
  }, [query, filters, sort]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-gray-800 pb-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-white uppercase tracking-wider mb-2">
            All <span className="text-accent">Games</span>
          </h1>
          <p className="text-gray-400">Showing {results.length} results</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search games..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-elevated border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-accent w-full sm:w-64"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-accent pl-2">Sort By</h3>
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-elevated border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-accent appearance-none"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="release-date">Newest</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-accent pl-2">Genre</h3>
            <select 
              value={filters.genre || 'all'}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
              className="w-full bg-elevated border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-accent appearance-none"
            >
              <option value="all">All Genres</option>
              {allGenres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-accent pl-2">Platform</h3>
            <select 
              value={filters.platform || 'all'}
              onChange={(e) => handleFilterChange('platform', e.target.value)}
              className="w-full bg-elevated border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-accent appearance-none"
            >
              <option value="all">All Platforms</option>
              {allPlatforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          
          <div>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5 bg-elevated border border-gray-600 rounded group-hover:border-accent transition-colors">
                <input 
                  type="checkbox" 
                  checked={filters.onSale || false}
                  onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                  className="opacity-0 absolute inset-0 cursor-pointer"
                />
                {filters.onSale && (
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors">On Sale Only</span>
            </label>
          </div>
        </div>

        {/* Game Grid */}
        <div className="flex-grow">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {results.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center bg-elevated rounded-sm border border-gray-800 clip-angled">
              <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => {
                  setQuery('');
                  setFilters({ genre: 'all', platform: 'all' });
                  setSort('relevance');
                }}
                className="mt-4 text-accent hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

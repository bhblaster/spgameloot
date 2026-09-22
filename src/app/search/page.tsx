'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchGames } from '@/lib/search';
import { Game } from '@/types';
import GameCard from '@/components/GameCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Game[]>([]);

  useEffect(() => {
    // Sync query string to input if it changes via navigation
    const q = searchParams.get('q') || '';
    setQuery(q);
    if (q) {
      setResults(searchGames(q));
    } else {
      setResults([]);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      setResults(searchGames(query));
      window.history.pushState({}, '', `/spgameloot/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-wider mb-8">
          Search <span className="text-accent">Results</span>
        </h1>
        
        <form onSubmit={handleSearch} className="relative flex">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for games, genres, developers..."
            className="w-full bg-elevated border-2 border-gray-700 focus:border-accent rounded-l px-6 py-4 text-white text-lg focus:outline-none"
            autoFocus
          />
          <button 
            type="submit"
            className="bg-accent hover:bg-accent-glow text-white px-8 font-bold tracking-widest uppercase rounded-r transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {query && (
        <div className="mb-8 pb-4 border-b border-gray-800 flex justify-between items-end">
          <h2 className="text-xl text-gray-300">
            Found <span className="text-white font-bold">{results.length}</span> results for "<span className="text-white font-bold">{query}</span>"
          </h2>
        </div>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-20 bg-elevated rounded-sm border border-gray-800 clip-angled max-w-3xl mx-auto">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-white mb-2">No exact matches found</h3>
          <p className="text-gray-400">Try checking your spelling or using more general terms.</p>
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          Enter a search term above to find games.
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-white">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

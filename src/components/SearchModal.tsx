'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { searchGames } from '@/lib/search';
import { Game } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const searchRes = searchGames(query).slice(0, 5);
      setResults(searchRes);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32 px-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-card rounded-t-lg shadow-2xl border border-gray-800 flex flex-col max-h-[80vh] overflow-hidden animate-[slideIn_0.2s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-800 flex items-center gap-4">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleEscape}
            placeholder="Search for games, genres, publishers..."
            className="flex-grow bg-transparent text-white text-lg focus:outline-none placeholder-gray-500"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 bg-elevated rounded">
            <span className="text-xs uppercase font-bold tracking-widest px-1">ESC</span>
          </button>
        </div>

        <div className="overflow-y-auto p-4 flex-grow custom-scrollbar">
          {!query && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                {['RPG', 'Shooter', 'Sci-Fi', 'Racing', 'Survival'].map(term => (
                  <button 
                    key={term}
                    onClick={() => {
                      router.push(`/search?q=${term}`);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-elevated hover:bg-gray-700 rounded text-sm text-gray-300 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="flex flex-col gap-2">
              {results.map(game => (
                <Link 
                  key={game.id} 
                  href={`/games/${game.slug}`}
                  onClick={onClose}
                  className="flex gap-4 p-2 hover:bg-elevated rounded transition-colors group"
                >
                  <div className="relative w-16 h-20 rounded overflow-hidden flex-shrink-0">
                    <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h5 className="font-semibold text-white group-hover:text-accent transition-colors">{game.title}</h5>
                    <span className="text-xs text-gray-400">{game.genres.join(', ')}</span>
                    <span className="text-sm font-bold text-white mt-1">${(game.salePrice || game.price).toFixed(2)}</span>
                  </div>
                </Link>
              ))}
              
              <Link 
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="mt-4 text-center text-sm font-semibold text-accent hover:text-accent-glow p-2 transition-colors"
              >
                View all results for "{query}"
              </Link>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No games found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

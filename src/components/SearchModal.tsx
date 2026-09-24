'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { searchGames } from '@/lib/search';
import { Game } from '@/types';

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

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

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32 px-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-secondary clip-angled-tl border border-white/10 flex flex-col max-h-[80vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-screen" />
        
        <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-primary relative z-10">
          <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleEscape}
            placeholder="SEARCH TARGET..."
            className="flex-grow bg-transparent text-light font-display text-xl uppercase tracking-wider focus:outline-none placeholder-muted/50"
          />
          <button onClick={onClose} className="text-muted hover:text-light p-1 border border-white/10 hover:border-white/30 transition-colors">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2">ESC</span>
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-grow custom-scrollbar relative z-10">
          {!query && (
            <div>
              <h4 className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.2em]">Suggested Targets</h4>
              <div className="flex flex-wrap gap-3">
                {['RPG', 'Shooter', 'Sci-Fi', 'Racing', 'Survival'].map(term => (
                  <button 
                    key={term}
                    onClick={() => {
                      router.push(`/search?q=${term}`);
                      onClose();
                    }}
                    className="px-4 py-2 border border-white/5 hover:border-accent hover:text-light text-muted text-xs font-bold uppercase tracking-widest transition-colors clip-angled-button bg-primary/50"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="flex flex-col gap-3">
              {results.map(game => (
                <Link 
                  key={game.id} 
                  href={`/games/${game.slug}`}
                  onClick={onClose}
                  className="flex gap-4 p-3 bg-primary/50 hover:bg-white/5 border border-white/5 clip-angled-tl transition-colors group"
                >
                  <div className="relative w-16 h-20 flex-shrink-0 border border-white/10">
                    <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h5 className="font-display font-bold text-light text-lg uppercase tracking-wider group-hover:text-accent transition-colors">{game.title}</h5>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{game.genres.join(', ')}</span>
                    <span className="text-sm font-display font-bold text-light mt-1">${(game.salePrice || game.price).toFixed(2)}</span>
                  </div>
                </Link>
              ))}
              
              <Link 
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="mt-6 text-center text-xs font-bold tracking-[0.2em] text-accent hover:text-light uppercase transition-colors p-4 border border-accent/20 bg-accent/5 hover:bg-accent/20 clip-angled-button"
              >
                Execute Full Scan for "{query}"
              </Link>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-16 flex flex-col items-center">
              <svg className="w-12 h-12 text-muted/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="text-muted tracking-widest uppercase text-sm font-bold">No signals detected for "{query}"</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

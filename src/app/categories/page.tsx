import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';
import { games } from '@/data/games';

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-wider mb-4">
          Game <span className="text-accent">Categories</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore our vast library of games organized by genre. Find exactly what you're looking for, whether it's high-speed racing or deep role-playing adventures.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(category => {
          const gameCount = games.filter(g => g.genres.map(x => x.toLowerCase()).includes(category.slug)).length;
          
          return (
            <Link 
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative h-64 rounded-sm overflow-hidden clip-angled shadow-lg border border-gray-800 hover:border-gray-500 transition-all duration-300"
            >
              <Image 
                src={category.image} 
                alt={category.name} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider group-hover:text-accent transition-colors">
                    {category.name}
                  </h2>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>{gameCount} Games</span>
                  <span className="text-accent group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1">
                    Browse
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      {/* Background glitch effect element placeholder */}
      <div className="absolute inset-0 bg-primary z-0 opacity-50 flex items-center justify-center">
         <span className="text-[300px] font-display font-black text-gray-900 opacity-50 select-none">404</span>
      </div>
      
      <div className="relative z-10 text-center max-w-2xl px-4">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-wider glow-text">
          System <span className="text-accent">Error</span>
        </h1>
        <div className="bg-elevated border border-gray-800 p-6 rounded clip-angled mb-8 text-left inline-block w-full max-w-md shadow-2xl">
          <p className="text-accent font-mono text-sm mb-2">&gt; ERROR 404: DIRECTORY_NOT_FOUND</p>
          <p className="text-gray-400 font-mono text-sm mb-2">&gt; The requested coordinate is missing from the database.</p>
          <p className="text-gray-400 font-mono text-sm mb-4">&gt; Analyzing potential causes... Level corrupted.</p>
          <div className="w-full h-1 bg-gray-800 rounded overflow-hidden">
            <div className="w-1/3 h-full bg-accent animate-pulse"></div>
          </div>
        </div>
        
        <p className="text-xl text-gray-300 mb-10 font-display">
          Looks like you've ventured into uncharted territory. Let's get you back to the action.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="px-8 py-4 bg-accent hover:bg-accent-glow text-white font-bold uppercase tracking-widest clip-angled-button transition-colors">
            Return to Base
          </Link>
          <Link href="/games" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest clip-angled-button transition-colors backdrop-blur-sm">
            Browse Games
          </Link>
        </div>
      </div>
    </div>
  );
}

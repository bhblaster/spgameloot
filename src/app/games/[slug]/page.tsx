import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { games } from '@/data/games';
import AddToCartButton from './AddToCartButton';

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);

  if (!game) notFound();

  return (
    <div className="w-full min-h-full flex flex-col relative pb-12">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 w-full h-[65%] select-none pointer-events-none">
        <Image 
          src={game.heroImage} 
          alt={game.title} 
          fill 
          className="object-cover object-top opacity-80"
          priority
        />
        {/* Top gradient for header visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-shell/80 via-transparent to-transparent h-32" />
        {/* Bottom gradient blending into app shell */}
        <div className="absolute inset-0 bg-gradient-to-t from-shell via-shell/50 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 px-10 pt-[32%] flex flex-col gap-10">
        
        {/* Game Info Row */}
        <div className="flex flex-col xl:flex-row items-end gap-10">
          
          {/* Cover Art */}
          <div className="w-[280px] flex-shrink-0 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <Image 
              src={game.coverImage} 
              alt={game.title} 
              fill 
              className="object-cover" 
            />
          </div>

          {/* Details & Actions */}
          <div className="flex-1 flex flex-col justify-end w-full pb-2">
            
            <div className="flex items-center gap-6 mb-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{game.title}</h1>
              <div className="flex items-center gap-1.5 text-3xl font-bold text-[#d4ad57]">
                {game.rating}
                <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-8">
              <p className="text-[15px] text-white/90 max-w-lg leading-relaxed font-medium">
                {game.description}
              </p>
              
              <div className="grid grid-cols-[auto_auto] gap-x-12 gap-y-2 text-[13px] font-medium">
                <div className="text-white/60">Release Date</div>
                <div className="text-white">{new Date(game.releaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                
                <div className="text-white/60">Manufacturer</div>
                <div className="text-white">{game.publisher}</div>
                
                <div className="text-white/60">Developer</div>
                <div className="text-white">{game.developer}</div>
                
                <div className="text-white/60">Genre</div>
                <div className="text-white">{game.genres[0]}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {/* Platforms */}
              <div className="flex gap-3">
                {game.platforms.map(platform => (
                  <div key={platform} className="px-5 py-2.5 border border-white/20 rounded-[var(--radius-button)] flex items-center justify-center gap-2 text-sm text-white font-medium bg-white/5 hover:bg-white/10 transition-colors">
                    {platform === 'PC' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
                    )}
                    {platform.includes('Xbox') && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.996 0C5.371 0 0 5.373 0 12c0 6.628 5.371 12 11.996 12 6.626 0 11.996-5.372 11.996-12 0-6.627-5.37-12-11.996-12zm-5.06 7.425c.677-1.42 1.637-2.614 3.013-3.327-.12.18-.328.666-.372 1.053-.131 1.258.558 3.518 1.944 6.073-2.146-2.025-4.148-3.08-4.585-3.8zm5.06 9.873c-1.391 0-2.898-.598-4.49-1.996 1.838.243 3.65.114 5.32-.48 1.059-1.256 1.93-3.155 2.378-5.367.653 2.128 1.34 3.585 2.32 4.966-1.576 1.66-3.393 2.877-5.528 2.877zm5.556-3.79c-.443.682-1.251 1.684-2.228 2.812-.907-1.157-1.517-2.585-1.929-3.804-1.287 1.153-2.923 1.656-4.996 1.312-1.782-3.181-2.456-6.196-2.008-7.945.034-.144.095-.275.14-.414 1.348.65 2.227 1.761 2.83 3.037.26-.358.536-.71.84-1.04-.645-1.411-1.748-2.668-3.21-3.488 1.542-1.096 3.42-1.747 5.438-1.747 1.488 0 2.9.362 4.148 1.01-1.168.74-2.027 1.657-2.585 2.551.498.43.957.9 1.36 1.412 1.464-1.415 2.322-2.738 2.658-3.447.643 1.252 1.009 2.665 1.009 4.146 0 2.274-.757 4.37-2.025 6.002h-.002z"/></svg>
                    )}
                    {platform.includes('PS') && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-2.88 16.48c-1.39 0-2.51-1.12-2.51-2.51 0-1.39 1.12-2.51 2.51-2.51 1.39 0 2.51 1.12 2.51 2.51 0 1.39-1.12 2.51-2.51 2.51zm0-6c-1.39 0-2.51-1.12-2.51-2.51s1.12-2.51 2.51-2.51 2.51 1.12 2.51 2.51-1.12 2.51-2.51 2.51zm5.76 6c-1.39 0-2.51-1.12-2.51-2.51 0-1.39 1.12-2.51 2.51-2.51s2.51 1.12 2.51 2.51c0 1.39-1.12 2.51-2.51 2.51zm0-6c-1.39 0-2.51-1.12-2.51-2.51s1.12-2.51 2.51-2.51 2.51 1.12 2.51 2.51-1.12 2.51-2.51 2.51z"/></svg>
                    )}
                    {platform}
                  </div>
                ))}
              </div>

              {/* Purchase Actions */}
              <AddToCartButton game={game} />
            </div>

          </div>
        </div>

        {/* Screenshot Gallery */}
        {game.gallery && game.gallery.length > 0 && (
          <div className="flex items-center gap-4 mt-6">
            {game.gallery.slice(0, 3).map((img, idx) => (
              <div key={idx} className="flex-1 aspect-[16/10] rounded-[var(--radius-card)] overflow-hidden relative group cursor-pointer">
                <Image 
                  src={img} 
                  alt={`${game.title} screenshot ${idx + 1}`} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
            <button className="flex-shrink-0 w-12 h-12 ml-2 rounded-full bg-shell-elevated hover:bg-[#312e30] flex items-center justify-center transition-colors text-white/80">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

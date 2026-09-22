import { games } from '@/data/games';
import { categories } from '@/data/categories';
import Hero from '@/components/Hero';
import GameCard from '@/components/GameCard';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const featuredGame = games.find(g => g.slug === 'shadow-protocol') || games[0];
  const trendingGames = games.filter(g => g.trending).slice(0, 4);
  const newReleases = games.filter(g => g.newRelease).slice(0, 4);
  const deals = games.filter(g => g.discount).slice(0, 4);
  const topCategories = categories.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cinematic Hero */}
      <section className="-mt-20">
        <Hero game={featuredGame} />
      </section>

      {/* Trending Now */}
      <section className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-2">Most Played</h2>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-light uppercase">Trending Now</h3>
            </div>
            <Link href="/games" className="hidden sm:flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm font-bold uppercase tracking-widest">
              View All 
              <span className="text-xl">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection / Editorial Section */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80" 
            alt="Dark Fantasy" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary/90 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="bg-accent/10 border border-accent/20 text-accent text-xs font-bold px-3 py-1.5 inline-block tracking-[0.2em] uppercase clip-angled mb-6">
                Curated Collection
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-light uppercase leading-tight mb-6">
                Into the<br/>Darkness
              </h2>
              <p className="text-muted text-lg mb-8 leading-relaxed max-w-md">
                Immerse yourself in our hand-picked selection of dark fantasy and psychological horror titles. Test your courage and uncover ancient secrets.
              </p>
              <Link href="/categories/rpg" className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 font-bold tracking-wider uppercase transition-all hover:bg-accent-glow clip-angled-button">
                Explore Collection
              </Link>
            </div>
            
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                {games.filter(g => g.slug === 'kingdoms-of-ash' || g.slug === 'the-last-outpost').map((game, idx) => (
                  <div key={game.id} className={idx === 1 ? "sm:mt-12" : ""}>
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-light uppercase mb-12 text-center">Browse by Genre</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCategories.map((cat, idx) => (
              <Link 
                key={cat.slug} 
                href={`/categories/${cat.slug}`}
                className={`group relative overflow-hidden clip-angled-tl bg-card block ${idx === 0 || idx === 3 ? 'lg:col-span-2' : ''} h-64`}
              >
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-4xl mb-3">{cat.icon}</span>
                  <h3 className="font-display text-2xl font-bold text-light uppercase tracking-wide group-hover:text-accent transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-0 h-0.5 bg-accent mt-4 transition-all duration-300 group-hover:w-12"></div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/categories" className="inline-flex items-center gap-2 text-muted hover:text-light transition-colors text-sm font-bold uppercase tracking-widest border-b border-muted hover:border-light pb-1">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-24 bg-secondary border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-2">Special Offers</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-light uppercase">Limited Time Deals</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center bg-card/50 backdrop-blur-md border border-white/5 p-12 clip-angled">
          <h2 className="font-display text-4xl font-bold text-light uppercase mb-4">Join the Vanguard</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive drops, early access to sales, and insider gaming news.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="flex-1 bg-secondary border border-white/10 text-light px-6 py-4 focus:outline-none focus:border-accent font-sans text-sm tracking-wide placeholder:text-muted/50"
              required
            />
            <button type="submit" className="bg-light text-primary hover:bg-white px-8 py-4 font-bold tracking-wider uppercase transition-colors whitespace-nowrap clip-angled-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

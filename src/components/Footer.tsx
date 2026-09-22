import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-accent clip-angled-tl flex items-center justify-center">
                <span className="text-white font-display font-bold leading-none">SP</span>
              </div>
              <span className="font-display font-bold text-xl tracking-[0.2em] text-light uppercase">
                Game<span className="text-accent">Loot</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Your premium destination for the best digital games. Instantly delivered, securely handled, and ready to play.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Discord', 'YouTube', 'Twitch'].map((social) => (
                <a key={social} href="#" className="text-muted hover:text-accent transition-colors text-sm font-bold uppercase tracking-wider">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-light text-lg uppercase tracking-widest mb-6">Explore</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'All Games', 'New Releases', 'Special Deals'].map((link) => (
                <li key={link}>
                  <Link href={link === 'Home' ? '/' : link === 'All Games' ? '/games' : link === 'Special Deals' ? '/deals' : '/games'} className="text-muted hover:text-light transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-bold text-light text-lg uppercase tracking-widest mb-6">Genres</h4>
            <ul className="flex flex-col gap-4">
              {['Action', 'RPG', 'Strategy', 'Horror', 'Racing'].map((cat) => (
                <li key={cat}>
                  <Link href={`/categories/${cat.toLowerCase()}`} className="text-muted hover:text-light transition-colors text-sm">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-light text-lg uppercase tracking-widest mb-6">Support</h4>
            <ul className="flex flex-col gap-4">
              {['Help Center', 'Contact Us', 'Refund Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <Link href={link === 'Contact Us' ? '/contact' : '#'} className="text-muted hover:text-light transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs tracking-wider uppercase">
            &copy; {new Date().getFullYear()} SP Game Loot. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted tracking-wider uppercase">
            <a href="#" className="hover:text-light transition-colors">Privacy</a>
            <a href="#" className="hover:text-light transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

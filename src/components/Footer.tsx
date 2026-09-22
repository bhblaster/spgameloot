'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-display font-bold tracking-wider text-white">
                SP <span className="text-accent">GAME</span> LOOT
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Your premium destination for the best digital games. Instantly delivered, securely handled, and ready to play.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <a href="#" className="w-10 h-10 rounded-full bg-elevated flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-elevated flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent transition-colors">
                <span className="sr-only">Discord</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Navigation</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="text-muted hover:text-accent transition-colors text-sm">Home</Link></li>
              <li><Link href="/games" className="text-muted hover:text-accent transition-colors text-sm">Browse Games</Link></li>
              <li><Link href="/deals" className="text-muted hover:text-accent transition-colors text-sm">Hot Deals</Link></li>
              <li><Link href="/categories" className="text-muted hover:text-accent transition-colors text-sm">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Top Genres</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/categories/action" className="text-muted hover:text-accent transition-colors text-sm">Action</Link></li>
              <li><Link href="/categories/rpg" className="text-muted hover:text-accent transition-colors text-sm">RPG</Link></li>
              <li><Link href="/categories/shooter" className="text-muted hover:text-accent transition-colors text-sm">Shooters</Link></li>
              <li><Link href="/categories/strategy" className="text-muted hover:text-accent transition-colors text-sm">Strategy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Newsletter</h3>
            <p className="text-muted text-sm mb-4">Subscribe for the latest releases and exclusive discounts.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-primary border border-gray-700 px-4 py-2 text-sm text-white w-full focus:outline-none focus:border-accent"
              />
              <button 
                type="submit"
                className="bg-accent hover:bg-accent-glow text-white px-4 py-2 font-medium transition-colors clip-angled-button"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} SP Game Loot. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="text-muted hover:text-white text-sm transition-colors">Contact Support</Link>
            <a href="#" className="text-muted hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

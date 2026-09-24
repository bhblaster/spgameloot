'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Category', href: '/categories', icon: CategoryIcon },
    { name: 'Library', href: '/games', icon: LibraryIcon },
    { name: 'Community', href: '/community', icon: CommunityIcon },
    { name: 'Friends', href: '/friends', icon: FriendsIcon, badge: 2 },
    { name: 'Wishlist', href: '/wishlist', icon: WishlistIcon },
    { name: 'Downloads', href: '/downloads', icon: DownloadsIcon },
  ];

  const bottomNavItems = [
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
    { name: 'Help', href: '/help', icon: HelpIcon },
  ];

  return (
    <aside className="w-[280px] flex-shrink-0 h-full flex flex-col pt-8 pb-6 px-6 relative z-20">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-3 mb-10 px-2">
        <div className="text-accent flex-shrink-0">
          <svg width="24" height="28" viewBox="0 0 24 28" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12C0 18.232 4.75 23.336 10.82 23.95V28L15.35 23.63C18.66 22.37 21.32 19.82 22.68 16.5C23.54 14.4 24 12.15 24 9.8V8C24 3.58 20.42 0 16 0H12ZM8.5 14.5C7.12 14.5 6 13.38 6 12C6 10.62 7.12 9.5 8.5 9.5C9.88 9.5 11 10.62 11 12C11 13.38 9.88 14.5 8.5 14.5ZM15.5 14.5C14.12 14.5 13 13.38 13 12C13 10.62 14.12 9.5 15.5 9.5C16.88 9.5 18 10.62 18 12C18 13.38 16.88 14.5 15.5 14.5Z" />
          </svg>
        </div>
        <span className="text-text-main font-bold text-xl tracking-wider uppercase">Gameverse</span>
      </Link>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-colors group ${
                isActive ? 'text-accent' : 'text-text-main hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-text-muted group-hover:text-white'}`} />
              <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
        
        <div className="mt-8 flex flex-col gap-1">
          {bottomNavItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-4 px-3 py-3 text-text-main hover:text-white rounded-lg transition-colors group"
            >
              <item.icon className="w-5 h-5 text-text-muted group-hover:text-white" />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Discount Promotion Card */}
      <div className="mt-auto pt-6">
        <div className="gradient-accent p-6 rounded-2xl flex flex-col gap-3 shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-white font-bold text-xl leading-tight">50% discount</h3>
          <p className="text-white/90 text-sm leading-snug mb-2">on the games in the selection</p>
          <Link 
            href="/deals" 
            className="w-full bg-[#1c191b] hover:bg-black text-white text-sm font-medium py-3 rounded-xl text-center transition-colors shadow-sm relative z-10"
          >
            Go to library
          </Link>
        </div>
      </div>
    </aside>
  );
}

// Icons (Simple line style matching reference)
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function CategoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function LibraryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function CommunityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  );
}

function FriendsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function WishlistIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function DownloadsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function HelpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

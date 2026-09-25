import React from 'react';

export default function Page() {
  return (
    <div className="w-full h-full p-10 flex flex-col items-center justify-center text-center mt-12">
      <div className="w-24 h-24 bg-shell border border-white/5 rounded-[var(--radius-card)] flex items-center justify-center mb-6 shadow-xl mx-auto">
        <svg className="w-10 h-10 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-white mb-3">Help & Support</h1>
      <p className="text-white/50 max-w-md mx-auto">
        This section is currently under construction in the new application shell. Check out the Home and Library pages for the main functionality.
      </p>
    </div>
  );
}
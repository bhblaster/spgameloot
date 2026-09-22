'use client';

import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-green-600';
      case 'error': return 'bg-accent';
      case 'info': return 'bg-blue-600';
      default: return 'bg-elevated';
    }
  };

  return (
    <div className={`${getBgColor()} text-white px-4 py-3 rounded shadow-lg flex items-center justify-between gap-4 animate-[slideIn_0.3s_ease-out] clip-angled-button`}>
      <span className="font-medium text-sm">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

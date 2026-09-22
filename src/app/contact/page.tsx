'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastProvider';

export default function ContactPage() {
  const { addToast } = useToast();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      addToast('Message sent successfully. We will reply soon!', 'success');
      (e.target as HTMLFormElement).reset();
      
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-wider mb-4">
          Contact <span className="text-accent">Support</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Need help with an order, finding a specific game, or have a business inquiry? Our support team is here to assist you.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div className="bg-elevated p-8 rounded-sm border border-gray-800 clip-angled">
            <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
            <p className="text-gray-400 mb-4 text-sm">For general inquiries and support.</p>
            <a href="mailto:support@spgameloot.com" className="text-accent hover:text-accent-glow font-bold font-mono">support@spgameloot.com</a>
          </div>

          <div className="bg-elevated p-8 rounded-sm border border-gray-800 clip-angled">
            <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp Support</h3>
            <p className="text-gray-400 mb-4 text-sm">Fastest way to get help with an existing order.</p>
            <p className="text-white font-bold font-mono">+91 XXXXX XXXXX</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit} className="bg-elevated p-8 rounded-sm border border-gray-800 shadow-xl relative overflow-hidden">
            {status === 'success' && (
              <div className="absolute inset-0 bg-green-900/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-200">We've received your inquiry and will get back to you within 24 hours.</p>
              </div>
            )}
            
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Send a Message</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Name</label>
                <input required type="text" className="w-full bg-primary border border-gray-700 focus:border-accent rounded p-3 text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Email</label>
                <input required type="email" className="w-full bg-primary border border-gray-700 focus:border-accent rounded p-3 text-white focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Inquiry Type</label>
                <select className="w-full bg-primary border border-gray-700 focus:border-accent rounded p-3 text-white focus:outline-none appearance-none">
                  <option>Order Support (Key not received)</option>
                  <option>Payment Issue</option>
                  <option>Game Request</option>
                  <option>Business Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Order Number (Optional)</label>
                <input type="text" placeholder="e.g. GM-2024-ABCD" className="w-full bg-primary border border-gray-700 focus:border-accent rounded p-3 text-white focus:outline-none" />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Message</label>
              <textarea required rows={5} className="w-full bg-primary border border-gray-700 focus:border-accent rounded p-3 text-white focus:outline-none resize-none"></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full md:w-auto px-10 py-4 bg-accent hover:bg-accent-glow text-white font-bold uppercase tracking-widest clip-angled-button transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
            >
              {status === 'submitting' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

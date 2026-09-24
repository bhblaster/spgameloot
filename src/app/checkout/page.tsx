'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { createOrder, saveOrder } from '@/lib/orders';
import { deliverOrder } from '@/lib/delivery';
import { useToast } from '@/components/ToastProvider';

export default function CheckoutPage() {
  const { items, getSubtotal, getDiscount, getTotal, clearCart } = useCart();
  const router = useRouter();
  const { addToast } = useToast();

  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Processing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discordId: '' // Optional
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (items.length === 0 && step < 3) {
      router.push('/games');
    }
  }, [items, router, step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        addToast('Please fill in all required fields', 'error');
        return;
      }
      setStep(2);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStep(3); // Processing state
    
    try {
      const order = createOrder(
        items,
        getSubtotal(),
        getDiscount(),
        getTotal(),
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }
      );

      saveOrder(order);
      const result = await deliverOrder(order);

      if (result.success) {
        clearCart();
        addToast('Order placed successfully!', 'success');
        router.push('/order-confirmation');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);
      addToast('Checkout failed. Please try again.', 'error');
      setStep(2); // Back to payment
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && step < 3) return null;

  return (
    <div className="w-full flex flex-col pt-12 pb-24 px-10">
      <h1 className="text-3xl font-bold text-white mb-12">
        Secure Checkout
      </h1>

      <div className="flex flex-col xl:flex-row gap-12">
        {/* Main Content */}
        <div className="w-full xl:w-2/3">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/10 -z-10 transform -translate-y-1/2" />
            <div className={`flex flex-col items-center gap-3 ${step >= 1 ? 'text-accent' : 'text-white/40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'gradient-accent text-white shadow-lg' : 'bg-shell-elevated text-white/40 border border-white/10'}`}>1</div>
              <span className="text-xs font-bold bg-shell px-2">Details</span>
            </div>
            <div className={`flex flex-col items-center gap-3 ${step >= 2 ? 'text-accent' : 'text-white/40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'gradient-accent text-white shadow-lg' : 'bg-shell-elevated text-white/40 border border-white/10'}`}>2</div>
              <span className="text-xs font-bold bg-shell px-2">Payment</span>
            </div>
            <div className={`flex flex-col items-center gap-3 ${step >= 3 ? 'text-accent' : 'text-white/40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'gradient-accent text-white shadow-lg' : 'bg-shell-elevated text-white/40 border border-white/10'}`}>3</div>
              <span className="text-xs font-bold bg-shell px-2">Processing</span>
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={handleContinue} className="bg-shell-elevated p-8 md:p-10 rounded-[var(--radius-card)] border border-white/5 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-2">Delivery Details</h2>
              <p className="text-white/50 text-sm mb-8">
                Your game keys will be delivered instantly to the phone number and email provided below.
              </p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-shell border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-shell border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Phone Number (WhatsApp) *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-shell border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                  <p className="text-xs text-accent mt-2">We will send your game keys via WhatsApp to this number.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Discord ID (Optional)</label>
                  <input 
                    type="text" 
                    name="discordId"
                    value={formData.discordId}
                    onChange={handleInputChange}
                    placeholder="Username#1234"
                    className="w-full bg-shell border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button 
                  type="submit"
                  className="px-8 py-3 gradient-accent hover:gradient-accent-hover text-white font-bold rounded-[var(--radius-button)] shadow-lg transition-all"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleCheckout} className="bg-shell-elevated p-8 md:p-10 rounded-[var(--radius-card)] border border-white/5 shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-white">Payment Details</h2>
              </div>
              
              <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg mb-8 flex items-start gap-4">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-accent text-sm">
                  This is a simulated checkout. No real payment will be processed. Feel free to click "Complete Order".
                </p>
              </div>

              <div className="space-y-6 opacity-50 pointer-events-none">
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Card Number</label>
                  <input 
                    type="text" 
                    value="•••• •••• •••• 4242"
                    readOnly
                    className="w-full bg-shell border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">Expiry Date</label>
                    <input 
                      type="text" 
                      value="12/26"
                      readOnly
                      className="w-full bg-shell border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">CVC</label>
                    <input 
                      type="text" 
                      value="•••"
                      readOnly
                      className="w-full bg-shell border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 gradient-accent hover:gradient-accent-hover text-white font-bold rounded-[var(--radius-button)] shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Pay ${getTotal().toFixed(2)}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="bg-shell-elevated p-12 rounded-[var(--radius-card)] border border-white/5 text-center h-[400px] flex flex-col items-center justify-center shadow-lg">
              <div className="w-16 h-16 border-2 border-white/10 border-t-accent rounded-full animate-spin mb-8"></div>
              <h2 className="text-2xl font-bold text-white mb-2">Processing Order...</h2>
              <p className="text-white/50 text-sm">Please do not close or refresh this page.</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full xl:w-1/3">
          <div className="bg-shell-elevated p-8 rounded-[var(--radius-card)] border border-white/5 sticky top-10">
            <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>
            
            <div className="flex flex-col gap-4 mb-8">
              {items.map(({ game, quantity }) => (
                <div key={game.id} className="flex gap-4">
                  <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center flex-grow">
                    <h4 className="font-bold text-white text-sm line-clamp-1 mb-1">{game.title}</h4>
                    <span className="text-xs text-white/50">Qty: {quantity}</span>
                    <span className="font-bold text-white mt-1">${((game.salePrice || game.price) * quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-6 flex flex-col gap-3">
              <div className="flex justify-between text-white/50 text-sm font-medium">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              {getDiscount() > 0 && (
                <div className="flex justify-between text-accent text-sm font-bold">
                  <span>Bundle Discount</span>
                  <span>-${getDiscount().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-bold text-xl mt-4 pt-4 border-t border-white/5">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

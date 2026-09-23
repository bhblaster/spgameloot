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

      // Save to localStorage
      saveOrder(order);

      // Trigger mock delivery
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
    <div className="bg-primary min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-light uppercase tracking-widest mb-12">
          Secure <span className="text-accent">Checkout</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-16 relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/5 -z-10 transform -translate-y-1/2" />
              <div className={`flex flex-col items-center gap-3 ${step >= 1 ? 'text-accent' : 'text-muted'}`}>
                <div className={`w-10 h-10 clip-angled flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-accent text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]' : 'bg-secondary border border-white/10 text-muted'}`}>1</div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold bg-primary px-3 py-1">Details</span>
              </div>
              <div className={`flex flex-col items-center gap-3 ${step >= 2 ? 'text-accent' : 'text-muted'}`}>
                <div className={`w-10 h-10 clip-angled flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-accent text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]' : 'bg-secondary border border-white/10 text-muted'}`}>2</div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold bg-primary px-3 py-1">Payment</span>
              </div>
              <div className={`flex flex-col items-center gap-3 ${step >= 3 ? 'text-accent' : 'text-muted'}`}>
                <div className={`w-10 h-10 clip-angled flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-accent text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]' : 'bg-secondary border border-white/10 text-muted'}`}>3</div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold bg-primary px-3 py-1">Processing</span>
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleContinue} className="glass-panel p-8 md:p-10 clip-angled border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                <h2 className="text-2xl font-display font-bold text-light uppercase tracking-wide mb-2">Delivery Details</h2>
                <p className="text-muted text-sm mb-10 tracking-wide">
                  Your game keys will be delivered instantly to the phone number and email provided below.
                </p>
                
                <div className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-3">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-secondary border border-white/10 px-5 py-4 text-light focus:outline-none focus:border-accent transition-colors font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-3">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-secondary border border-white/10 px-5 py-4 text-light focus:outline-none focus:border-accent transition-colors font-sans"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-3">Phone Number (WhatsApp) *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-secondary border border-white/10 px-5 py-4 text-light focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                    <p className="text-xs text-accent mt-2 tracking-wide">We will send your game keys via WhatsApp to this number.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-3">Discord ID (Optional)</label>
                    <input 
                      type="text" 
                      name="discordId"
                      value={formData.discordId}
                      onChange={handleInputChange}
                      placeholder="Username#1234"
                      className="w-full bg-secondary border border-white/10 px-5 py-4 text-light focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="mt-12 flex justify-end relative z-10">
                  <button 
                    type="submit"
                    className="px-10 py-5 bg-accent hover:bg-accent-glow text-white font-bold tracking-[0.2em] uppercase transition-all clip-angled-button"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleCheckout} className="glass-panel p-8 md:p-10 clip-angled border border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-muted hover:text-light transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-display font-bold text-light uppercase tracking-wide">Payment Details</h2>
                </div>
                
                <div className="bg-accent/10 border border-accent/20 p-5 mb-10 flex items-start gap-4">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-accent/90 text-sm tracking-wide leading-relaxed">
                    This is a simulated checkout. No real payment will be processed. Feel free to click "Complete Order".
                  </p>
                </div>

                <div className="space-y-8 opacity-50 pointer-events-none">
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-3">Card Number</label>
                    <input 
                      type="text" 
                      value="•••• •••• •••• 4242"
                      readOnly
                      className="w-full bg-secondary border border-white/10 px-5 py-4 text-light font-mono tracking-widest"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-3">Expiry Date</label>
                      <input 
                        type="text" 
                        value="12/26"
                        readOnly
                        className="w-full bg-secondary border border-white/10 px-5 py-4 text-light font-mono tracking-widest"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-3">CVC</label>
                      <input 
                        type="text" 
                        value="•••"
                        readOnly
                        className="w-full bg-secondary border border-white/10 px-5 py-4 text-light font-mono tracking-widest"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full py-5 bg-accent hover:bg-accent-glow text-white font-bold tracking-[0.2em] uppercase transition-all clip-angled-button flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Pay ${getTotal().toFixed(2)}
                    </span>
                    <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="glass-panel p-12 clip-angled border border-white/5 text-center h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 border-2 border-white/10 border-t-accent rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(230,57,70,0.3)]"></div>
                  <h2 className="text-3xl font-display font-bold text-light uppercase tracking-widest mb-4">Processing Signal...</h2>
                  <p className="text-muted tracking-wide">Please do not close or refresh this page.</p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="glass-panel p-8 border border-white/5 sticky top-28 clip-angled-tl">
              <h3 className="text-lg font-display font-bold text-light mb-8 uppercase tracking-[0.2em] border-b border-white/5 pb-4">Transmission Summary</h3>
              
              <div className="flex flex-col gap-6 mb-8 max-h-96 overflow-y-auto custom-scrollbar pr-4">
                {items.map(({ game, quantity }) => (
                  <div key={game.id} className="flex gap-4">
                    <div className="relative w-16 h-20 flex-shrink-0 border border-white/10 clip-angled-tl">
                      <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center flex-grow">
                      <h4 className="font-bold text-light text-sm uppercase tracking-wider line-clamp-1">{game.title}</h4>
                      <span className="text-xs text-muted mt-1">QTY: {quantity}</span>
                      <span className="font-bold text-accent mt-1">${((game.salePrice || game.price) * quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
                <div className="flex justify-between text-muted text-sm font-bold tracking-widest uppercase">
                  <span>Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-accent text-sm font-bold tracking-widest uppercase">
                    <span>Bundle Discount</span>
                    <span>-${getDiscount().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-light font-display font-bold text-2xl mt-4 pt-6 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-accent">${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

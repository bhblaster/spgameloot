'use client';

import React, { useState, createContext, useContext } from 'react';
import CartDrawer from './CartDrawer';

interface CartContextType {
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const useCartUI = () => useContext(CartContext);

export default function ClientCartWrapper({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartContext.Provider>
  );
}

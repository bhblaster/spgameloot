'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  updateQuantity: (gameId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  itemCount: number;
  isInCart: (gameId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('spgameloot_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('spgameloot_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addToCart = (game: Game) => {
    setItems(prev => {
      const existing = prev.find(item => item.game.id === game.id);
      if (existing) {
        return prev.map(item =>
          item.game.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { game, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (gameId: string) => {
    setItems(prev => prev.filter(item => item.game.id !== gameId));
  };

  const updateQuantity = (gameId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(gameId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.game.id === gameId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => {
      const price = item.game.salePrice || item.game.price;
      return total + price * item.quantity;
    }, 0);
  };

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const getDiscount = () => {
    const subtotal = getSubtotal();
    let discountPercent = 0;
    
    if (itemCount >= 5) {
      discountPercent = 0.20;
    } else if (itemCount >= 3) {
      discountPercent = 0.15;
    } else if (itemCount >= 2) {
      discountPercent = 0.10;
    }
    
    return subtotal * discountPercent;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount();
  };

  const isInCart = (gameId: string) => {
    return items.some(item => item.game.id === gameId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal,
        getDiscount,
        getTotal,
        itemCount,
        isInCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

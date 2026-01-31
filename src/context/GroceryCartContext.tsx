// ============================================
// Grocery Cart Context
// Separate cart for grocery items
// ============================================

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GroceryCartItem, GroceryProduct } from '@/types/services';

interface GroceryCartContextType {
  items: GroceryCartItem[];
  addItem: (product: GroceryProduct, storeId: string, storeName: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const GroceryCartContext = createContext<GroceryCartContextType | undefined>(undefined);

export function GroceryCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GroceryCartItem[]>([]);

  const addItem = (product: GroceryProduct, storeId: string, storeName: string) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, storeId, storeName }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, item) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price;
      return sum + price * item.quantity;
    },
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <GroceryCartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </GroceryCartContext.Provider>
  );
}

export function useGroceryCart() {
  const context = useContext(GroceryCartContext);
  if (!context) {
    throw new Error('useGroceryCart must be used within a GroceryCartProvider');
  }
  return context;
}

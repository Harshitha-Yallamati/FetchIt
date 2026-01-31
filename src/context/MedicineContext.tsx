// ============================================
// Medicine Order Context
// Manages pharmacy orders and prescriptions
// ============================================

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Medicine, PrescriptionOrder } from '@/types/services';

interface MedicineCartItem {
  medicine: Medicine;
  quantity: number;
}

interface MedicineContextType {
  cart: MedicineCartItem[];
  orders: PrescriptionOrder[];
  prescriptionImage: string | null;
  addToCart: (medicine: Medicine) => void;
  removeFromCart: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  setPrescription: (image: string | null) => void;
  placeOrder: (pharmacyId: string) => PrescriptionOrder;
  getOrder: (orderId: string) => PrescriptionOrder | undefined;
  cartTotal: number;
  cartCount: number;
}

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

export function MedicineProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<MedicineCartItem[]>([]);
  const [orders, setOrders] = useState<PrescriptionOrder[]>([]);
  const [prescriptionImage, setPrescriptionImage] = useState<string | null>(null);

  const addToCart = (medicine: Medicine) => {
    setCart(prev => {
      const existing = prev.find(item => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map(item =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { medicine, quantity: 1 }];
    });
  };

  const removeFromCart = (medicineId: string) => {
    setCart(prev => prev.filter(item => item.medicine.id !== medicineId));
  };

  const updateQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.medicine.id === medicineId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setPrescriptionImage(null);
  };

  const setPrescription = (image: string | null) => {
    setPrescriptionImage(image);
  };

  const placeOrder = (pharmacyId: string): PrescriptionOrder => {
    const order: PrescriptionOrder = {
      id: `MED-${Date.now()}`,
      pharmacyId,
      prescriptionImage: prescriptionImage || undefined,
      medicines: cart,
      status: cart.some(item => item.medicine.requiresPrescription) 
        ? 'pending-verification' 
        : 'verified',
      total: cartTotal + 2.99, // delivery fee
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => [order, ...prev]);
    clearCart();

    // Simulate order progress
    if (order.status === 'pending-verification') {
      setTimeout(() => updateOrderStatus(order.id, 'verified'), 5000);
    }
    setTimeout(() => updateOrderStatus(order.id, 'preparing'), 8000);
    setTimeout(() => updateOrderStatus(order.id, 'out-for-delivery'), 15000);

    return order;
  };

  const updateOrderStatus = (orderId: string, status: PrescriptionOrder['status']) => {
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status } : o
    ));
  };

  const getOrder = (orderId: string) => orders.find(o => o.id === orderId);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MedicineContext.Provider
      value={{
        cart,
        orders,
        prescriptionImage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setPrescription,
        placeOrder,
        getOrder,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
}

export function useMedicine() {
  const context = useContext(MedicineContext);
  if (!context) {
    throw new Error('useMedicine must be used within a MedicineProvider');
  }
  return context;
}

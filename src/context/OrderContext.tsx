import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, CartItem } from '@/types';

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (items: CartItem[], total: number, address: string) => Order;
  getOrder: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const placeOrder = (items: CartItem[], total: number, address: string): Order => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      restaurantName: items[0]?.restaurantName || 'Restaurant',
      items,
      total: total + 2.99, // Add delivery fee
      status: 'confirmed',
      estimatedDelivery: '30-40 min',
      createdAt: new Date().toISOString(),
      deliveryAddress: address,
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    
    // Simulate order progress
    setTimeout(() => {
      setOrders(prev => prev.map(o => 
        o.id === newOrder.id ? { ...o, status: 'preparing' } : o
      ));
      setCurrentOrder(prev => prev?.id === newOrder.id ? { ...prev, status: 'preparing' } : prev);
    }, 5000);

    setTimeout(() => {
      setOrders(prev => prev.map(o => 
        o.id === newOrder.id ? { ...o, status: 'on-the-way' } : o
      ));
      setCurrentOrder(prev => prev?.id === newOrder.id ? { ...prev, status: 'on-the-way' } : prev);
    }, 15000);

    return newOrder;
  };

  const getOrder = (orderId: string) => orders.find(o => o.id === orderId);

  return (
    <OrderContext.Provider value={{ orders, currentOrder, placeOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

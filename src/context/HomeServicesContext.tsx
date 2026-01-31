// ============================================
// Home Services Context
// Manages service bookings and history
// ============================================

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceBooking, ServiceProvider } from '@/types/services';

interface HomeServicesContextType {
  bookings: ServiceBooking[];
  createBooking: (
    provider: ServiceProvider,
    scheduledDate: string,
    scheduledTime: string,
    address: string,
    description: string
  ) => ServiceBooking;
  updateBookingStatus: (bookingId: string, status: ServiceBooking['status']) => void;
  addReview: (bookingId: string, rating: number, review: string) => void;
  getBooking: (bookingId: string) => ServiceBooking | undefined;
}

const HomeServicesContext = createContext<HomeServicesContextType | undefined>(undefined);

export function HomeServicesProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);

  const createBooking = (
    provider: ServiceProvider,
    scheduledDate: string,
    scheduledTime: string,
    address: string,
    description: string
  ): ServiceBooking => {
    const booking: ServiceBooking = {
      id: `SVC-${Date.now()}`,
      provider,
      scheduledDate,
      scheduledTime,
      address,
      description,
      status: 'pending',
      estimatedCost: provider.pricePerHour * 2, // Assume 2 hours minimum
    };

    setBookings(prev => [booking, ...prev]);

    // Simulate confirmation
    setTimeout(() => {
      updateBookingStatus(booking.id, 'confirmed');
    }, 3000);

    return booking;
  };

  const updateBookingStatus = (bookingId: string, status: ServiceBooking['status']) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status } : b
    ));
  };

  const addReview = (bookingId: string, rating: number, review: string) => {
    setBookings(prev => prev.map(b =>
      b.id === bookingId ? { ...b, rating, review, status: 'completed' } : b
    ));
  };

  const getBooking = (bookingId: string) => bookings.find(b => b.id === bookingId);

  return (
    <HomeServicesContext.Provider
      value={{ bookings, createBooking, updateBookingStatus, addReview, getBooking }}
    >
      {children}
    </HomeServicesContext.Provider>
  );
}

export function useHomeServices() {
  const context = useContext(HomeServicesContext);
  if (!context) {
    throw new Error('useHomeServices must be used within a HomeServicesProvider');
  }
  return context;
}

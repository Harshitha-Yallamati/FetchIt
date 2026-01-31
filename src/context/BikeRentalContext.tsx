// ============================================
// Bike Rental Context
// Manages vehicle bookings and rental history
// ============================================

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BikeBooking, Vehicle } from '@/types/services';

interface BikeRentalContextType {
  activeBooking: BikeBooking | null;
  bookingHistory: BikeBooking[];
  startRental: (vehicle: Vehicle, duration: 'hourly' | 'daily', location: string) => BikeBooking;
  endRental: () => void;
  getBooking: (bookingId: string) => BikeBooking | undefined;
}

const BikeRentalContext = createContext<BikeRentalContextType | undefined>(undefined);

export function BikeRentalProvider({ children }: { children: ReactNode }) {
  const [activeBooking, setActiveBooking] = useState<BikeBooking | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BikeBooking[]>([]);

  const startRental = (vehicle: Vehicle, duration: 'hourly' | 'daily', location: string): BikeBooking => {
    const booking: BikeBooking = {
      id: `BK-${Date.now()}`,
      vehicle,
      startTime: new Date().toISOString(),
      duration,
      status: 'active',
      totalCost: duration === 'hourly' ? vehicle.pricePerHour : vehicle.pricePerDay,
      pickupLocation: location,
    };
    
    setActiveBooking(booking);
    return booking;
  };

  const endRental = () => {
    if (activeBooking) {
      const completedBooking: BikeBooking = {
        ...activeBooking,
        endTime: new Date().toISOString(),
        status: 'completed',
      };
      setBookingHistory(prev => [completedBooking, ...prev]);
      setActiveBooking(null);
    }
  };

  const getBooking = (bookingId: string) => 
    bookingHistory.find(b => b.id === bookingId) || 
    (activeBooking?.id === bookingId ? activeBooking : undefined);

  return (
    <BikeRentalContext.Provider
      value={{ activeBooking, bookingHistory, startRental, endRental, getBooking }}
    >
      {children}
    </BikeRentalContext.Provider>
  );
}

export function useBikeRental() {
  const context = useContext(BikeRentalContext);
  if (!context) {
    throw new Error('useBikeRental must be used within a BikeRentalProvider');
  }
  return context;
}

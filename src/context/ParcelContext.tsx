// ============================================
// Parcel Delivery Context
// Manages parcel orders and tracking
// ============================================

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ParcelDelivery, ParcelSize, TrackingUpdate } from '@/types/services';
import { calculateParcelPrice } from '@/data/parcel';

interface ParcelContextType {
  parcels: ParcelDelivery[];
  createParcel: (
    pickupAddress: string,
    dropAddress: string,
    size: ParcelSize,
    weight: number,
    description?: string
  ) => ParcelDelivery;
  getParcel: (parcelId: string) => ParcelDelivery | undefined;
}

const ParcelContext = createContext<ParcelContextType | undefined>(undefined);

export function ParcelProvider({ children }: { children: ReactNode }) {
  const [parcels, setParcels] = useState<ParcelDelivery[]>([]);

  const createParcel = (
    pickupAddress: string,
    dropAddress: string,
    size: ParcelSize,
    weight: number,
    description?: string
  ): ParcelDelivery => {
    const parcel: ParcelDelivery = {
      id: `PCL-${Date.now()}`,
      pickupAddress,
      dropAddress,
      size,
      weight,
      description,
      status: 'pending',
      estimatedPrice: calculateParcelPrice(size, weight),
      createdAt: new Date().toISOString(),
      estimatedDelivery: '45-60 min',
      trackingUpdates: [
        {
          timestamp: new Date().toISOString(),
          status: 'Order placed',
          location: 'Processing',
        },
      ],
    };

    setParcels(prev => [parcel, ...prev]);

    // Simulate status updates
    setTimeout(() => updateParcelStatus(parcel.id, 'picked-up', 'Pickup Location'), 5000);
    setTimeout(() => updateParcelStatus(parcel.id, 'in-transit', 'En Route'), 15000);

    return parcel;
  };

  const updateParcelStatus = (parcelId: string, status: ParcelDelivery['status'], location: string) => {
    setParcels(prev => prev.map(p => {
      if (p.id === parcelId) {
        const update: TrackingUpdate = {
          timestamp: new Date().toISOString(),
          status: status === 'picked-up' ? 'Picked up' : status === 'in-transit' ? 'In transit' : 'Delivered',
          location,
        };
        return {
          ...p,
          status,
          trackingUpdates: [...p.trackingUpdates, update],
        };
      }
      return p;
    }));
  };

  const getParcel = (parcelId: string) => parcels.find(p => p.id === parcelId);

  return (
    <ParcelContext.Provider value={{ parcels, createParcel, getParcel }}>
      {children}
    </ParcelContext.Provider>
  );
}

export function useParcel() {
  const context = useContext(ParcelContext);
  if (!context) {
    throw new Error('useParcel must be used within a ParcelProvider');
  }
  return context;
}

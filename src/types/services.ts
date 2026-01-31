// ============================================
// FetchIt Multi-Service Types
// Shared type definitions for all services
// ============================================

// Service type identifiers
export type ServiceType = 'food' | 'bikes' | 'parcel' | 'grocery' | 'services' | 'medicine';

// ============================================
// BIKE & SCOOTER RENTALS
// ============================================
export interface Vehicle {
  id: string;
  name: string;
  type: 'bike' | 'scooter' | 'e-bike' | 'e-scooter';
  image: string;
  pricePerHour: number;
  pricePerDay: number;
  available: boolean;
  location: string;
  distance: string;
  batteryLevel?: number; // For electric vehicles
  rating: number;
  features: string[];
}

export interface BikeBooking {
  id: string;
  vehicle: Vehicle;
  startTime: string;
  endTime?: string;
  duration: 'hourly' | 'daily';
  status: 'active' | 'completed' | 'cancelled';
  totalCost: number;
  pickupLocation: string;
}

// ============================================
// PARCEL & COURIER DELIVERY
// ============================================
export type ParcelSize = 'small' | 'medium' | 'large' | 'extra-large';

export interface ParcelDelivery {
  id: string;
  pickupAddress: string;
  dropAddress: string;
  size: ParcelSize;
  weight: number; // in kg
  description?: string;
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered';
  estimatedPrice: number;
  createdAt: string;
  estimatedDelivery: string;
  trackingUpdates: TrackingUpdate[];
}

export interface TrackingUpdate {
  timestamp: string;
  status: string;
  location: string;
}

// ============================================
// GROCERY & ESSENTIALS
// ============================================
export interface GroceryStore {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
}

export interface GroceryProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  unit: string;
  inStock: boolean;
  discount?: number;
}

export interface GroceryCartItem {
  product: GroceryProduct;
  quantity: number;
  storeId: string;
  storeName: string;
}

// ============================================
// HOME SERVICES
// ============================================
export type ServiceCategory = 'plumber' | 'electrician' | 'cleaning' | 'carpenter' | 'painter' | 'ac-repair';

export interface ServiceProvider {
  id: string;
  name: string;
  image: string;
  category: ServiceCategory;
  rating: number;
  reviewCount: number;
  experience: string;
  pricePerHour: number;
  available: boolean;
  skills: string[];
  completedJobs: number;
}

export interface ServiceBooking {
  id: string;
  provider: ServiceProvider;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  description: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  estimatedCost: number;
  actualCost?: number;
  rating?: number;
  review?: string;
}

// ============================================
// MEDICINE DELIVERY
// ============================================
export interface Pharmacy {
  id: string;
  name: string;
  image: string;
  address: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  openNow: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  requiresPrescription: boolean;
  inStock: boolean;
  manufacturer: string;
}

export interface PrescriptionOrder {
  id: string;
  pharmacyId: string;
  prescriptionImage?: string;
  medicines: { medicine: Medicine; quantity: number }[];
  status: 'pending-verification' | 'verified' | 'preparing' | 'out-for-delivery' | 'delivered';
  total: number;
  createdAt: string;
}

// ============================================
// COMMON / SHARED
// ============================================
export interface ServiceCard {
  id: ServiceType;
  name: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}

export interface RecentActivity {
  id: string;
  serviceType: ServiceType;
  title: string;
  subtitle: string;
  timestamp: string;
  status: string;
}

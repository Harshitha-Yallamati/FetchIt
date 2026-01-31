// ============================================
// Parcel & Courier Data
// ============================================

import { ParcelSize } from '@/types/services';

export interface ParcelSizeOption {
  size: ParcelSize;
  label: string;
  description: string;
  maxWeight: number;
  basePrice: number;
  icon: string;
}

export const parcelSizeOptions: ParcelSizeOption[] = [
  {
    size: 'small',
    label: 'Small',
    description: 'Documents, small items',
    maxWeight: 1,
    basePrice: 4.99,
    icon: '📄',
  },
  {
    size: 'medium',
    label: 'Medium',
    description: 'Books, clothes, accessories',
    maxWeight: 5,
    basePrice: 8.99,
    icon: '📦',
  },
  {
    size: 'large',
    label: 'Large',
    description: 'Electronics, home goods',
    maxWeight: 15,
    basePrice: 14.99,
    icon: '📫',
  },
  {
    size: 'extra-large',
    label: 'Extra Large',
    description: 'Furniture, large appliances',
    maxWeight: 30,
    basePrice: 24.99,
    icon: '🏠',
  },
];

export const calculateParcelPrice = (size: ParcelSize, weight: number, distance: number = 5): number => {
  const sizeOption = parcelSizeOptions.find(o => o.size === size);
  if (!sizeOption) return 0;
  
  // Base price + weight surcharge + distance surcharge
  const weightSurcharge = Math.max(0, weight - 1) * 1.5;
  const distanceSurcharge = distance * 0.5;
  
  return Math.round((sizeOption.basePrice + weightSurcharge + distanceSurcharge) * 100) / 100;
};

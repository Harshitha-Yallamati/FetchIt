// ============================================
// Home Services Data
// ============================================

import { ServiceProvider, ServiceCategory } from '@/types/services';

export const serviceProviders: ServiceProvider[] = [
  {
    id: 'sp1',
    name: 'Mike Johnson',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    category: 'plumber',
    rating: 4.9,
    reviewCount: 156,
    experience: '12 years',
    pricePerHour: 45,
    available: true,
    skills: ['Leak Repair', 'Pipe Installation', 'Drain Cleaning'],
    completedJobs: 523,
  },
  {
    id: 'sp2',
    name: 'Sarah Williams',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    category: 'electrician',
    rating: 4.8,
    reviewCount: 203,
    experience: '8 years',
    pricePerHour: 55,
    available: true,
    skills: ['Wiring', 'Panel Upgrades', 'Lighting Installation'],
    completedJobs: 412,
  },
  {
    id: 'sp3',
    name: 'CleanPro Team',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&q=80',
    category: 'cleaning',
    rating: 4.7,
    reviewCount: 342,
    experience: '5 years',
    pricePerHour: 35,
    available: true,
    skills: ['Deep Cleaning', 'Move-out Cleaning', 'Office Cleaning'],
    completedJobs: 892,
  },
  {
    id: 'sp4',
    name: 'David Chen',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    category: 'carpenter',
    rating: 4.9,
    reviewCount: 98,
    experience: '15 years',
    pricePerHour: 60,
    available: false,
    skills: ['Custom Furniture', 'Cabinet Making', 'Wood Repair'],
    completedJobs: 267,
  },
  {
    id: 'sp5',
    name: 'Lisa Martinez',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    category: 'painter',
    rating: 4.6,
    reviewCount: 87,
    experience: '6 years',
    pricePerHour: 40,
    available: true,
    skills: ['Interior Painting', 'Exterior Painting', 'Wall Texturing'],
    completedJobs: 198,
  },
  {
    id: 'sp6',
    name: 'CoolAir Solutions',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&q=80',
    category: 'ac-repair',
    rating: 4.8,
    reviewCount: 234,
    experience: '10 years',
    pricePerHour: 65,
    available: true,
    skills: ['AC Installation', 'AC Repair', 'Maintenance'],
    completedJobs: 645,
  },
];

export const serviceCategoryLabels: Record<ServiceCategory, string> = {
  plumber: 'Plumber',
  electrician: 'Electrician',
  cleaning: 'Cleaning',
  carpenter: 'Carpenter',
  painter: 'Painter',
  'ac-repair': 'AC Repair',
};

export const serviceCategoryIcons: Record<ServiceCategory, string> = {
  plumber: '🔧',
  electrician: '⚡',
  cleaning: '🧹',
  carpenter: '🪚',
  painter: '🎨',
  'ac-repair': '❄️',
};

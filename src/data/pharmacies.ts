// ============================================
// Medicine Delivery Data
// ============================================

import { Pharmacy, Medicine } from '@/types/services';

export const pharmacies: Pharmacy[] = [
  {
    id: 'ph1',
    name: 'HealthFirst Pharmacy',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&q=80',
    address: '123 Medical Center Dr',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 2.99,
    openNow: true,
  },
  {
    id: 'ph2',
    name: 'MedQuick',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&q=80',
    address: '456 Health Ave',
    rating: 4.6,
    deliveryTime: '25-35 min',
    deliveryFee: 3.49,
    openNow: true,
  },
  {
    id: 'ph3',
    name: 'WellCare Drugs',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80',
    address: '789 Wellness Blvd',
    rating: 4.7,
    deliveryTime: '35-50 min',
    deliveryFee: 1.99,
    openNow: false,
  },
];

export const medicines: Record<string, Medicine[]> = {
  'ph1': [
    { id: 'med1', name: 'Paracetamol 500mg', description: 'Pain relief and fever reducer', price: 5.99, category: 'Pain Relief', requiresPrescription: false, inStock: true, manufacturer: 'GenericPharma' },
    { id: 'med2', name: 'Ibuprofen 400mg', description: 'Anti-inflammatory pain reliever', price: 7.99, category: 'Pain Relief', requiresPrescription: false, inStock: true, manufacturer: 'MediBrand' },
    { id: 'med3', name: 'Vitamin C 1000mg', description: 'Immune system support', price: 12.99, category: 'Vitamins', requiresPrescription: false, inStock: true, manufacturer: 'VitaLife' },
    { id: 'med4', name: 'Amoxicillin 500mg', description: 'Antibiotic for bacterial infections', price: 15.99, category: 'Antibiotics', requiresPrescription: true, inStock: true, manufacturer: 'PharmaCorp' },
    { id: 'med5', name: 'Cetirizine 10mg', description: 'Antihistamine for allergies', price: 8.49, category: 'Allergy', requiresPrescription: false, inStock: true, manufacturer: 'AllergyFree' },
    { id: 'med6', name: 'Omeprazole 20mg', description: 'Acid reflux treatment', price: 11.99, category: 'Digestive', requiresPrescription: false, inStock: false, manufacturer: 'GastroHealth' },
  ],
  'ph2': [
    { id: 'med7', name: 'Aspirin 325mg', description: 'Pain relief and blood thinner', price: 4.99, category: 'Pain Relief', requiresPrescription: false, inStock: true, manufacturer: 'BayerHealth' },
    { id: 'med8', name: 'Multivitamin Daily', description: 'Complete daily vitamin complex', price: 18.99, category: 'Vitamins', requiresPrescription: false, inStock: true, manufacturer: 'VitaLife' },
    { id: 'med9', name: 'Insulin Pen', description: 'Fast-acting insulin', price: 45.99, category: 'Diabetes', requiresPrescription: true, inStock: true, manufacturer: 'DiaCare' },
    { id: 'med10', name: 'Blood Pressure Monitor', description: 'Digital BP monitor', price: 39.99, category: 'Devices', requiresPrescription: false, inStock: true, manufacturer: 'MediTech' },
  ],
  'ph3': [
    { id: 'med11', name: 'Cough Syrup', description: 'Dry cough relief', price: 9.99, category: 'Cold & Flu', requiresPrescription: false, inStock: true, manufacturer: 'ColdCare' },
    { id: 'med12', name: 'Throat Lozenges', description: 'Sore throat relief', price: 6.49, category: 'Cold & Flu', requiresPrescription: false, inStock: true, manufacturer: 'SootheCare' },
    { id: 'med13', name: 'First Aid Kit', description: 'Complete home first aid kit', price: 24.99, category: 'First Aid', requiresPrescription: false, inStock: true, manufacturer: 'SafetyFirst' },
  ],
};

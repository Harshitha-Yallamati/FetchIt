// ============================================
// Grocery & Essentials Data
// ============================================

import { GroceryStore, GroceryProduct } from '@/types/services';

export const groceryStores: GroceryStore[] = [
  {
    id: 'gs1',
    name: 'Fresh Mart',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80',
    category: 'Supermarket',
    rating: 4.7,
    deliveryTime: '30-45 min',
    deliveryFee: 2.99,
    minOrder: 15,
  },
  {
    id: 'gs2',
    name: 'Organic Garden',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
    category: 'Organic',
    rating: 4.9,
    deliveryTime: '35-50 min',
    deliveryFee: 3.49,
    minOrder: 20,
  },
  {
    id: 'gs3',
    name: 'Quick Stop',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&q=80',
    category: 'Convenience',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    minOrder: 10,
  },
  {
    id: 'gs4',
    name: 'Farm Fresh',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80',
    category: 'Farm Produce',
    rating: 4.8,
    deliveryTime: '40-55 min',
    deliveryFee: 2.49,
    minOrder: 18,
  },
];

export const groceryProducts: Record<string, GroceryProduct[]> = {
  'gs1': [
    { id: 'gp1', name: 'Organic Bananas', description: 'Fresh organic bananas, bunch of 6', price: 2.99, category: 'Fruits', unit: 'bunch', inStock: true, discount: 10 },
    { id: 'gp2', name: 'Whole Milk', description: 'Fresh whole milk, 1 gallon', price: 4.49, category: 'Dairy', unit: 'gallon', inStock: true },
    { id: 'gp3', name: 'Bread Loaf', description: 'Freshly baked whole wheat bread', price: 3.49, category: 'Bakery', unit: 'loaf', inStock: true },
    { id: 'gp4', name: 'Free Range Eggs', description: 'Dozen large free-range eggs', price: 5.99, category: 'Dairy', unit: 'dozen', inStock: true },
    { id: 'gp5', name: 'Chicken Breast', description: 'Fresh boneless chicken breast', price: 8.99, category: 'Meat', unit: 'lb', inStock: true },
    { id: 'gp6', name: 'Greek Yogurt', description: 'Plain Greek yogurt, 32oz', price: 6.49, category: 'Dairy', unit: 'container', inStock: true },
    { id: 'gp7', name: 'Avocados', description: 'Ripe Hass avocados, pack of 4', price: 5.99, category: 'Fruits', unit: 'pack', inStock: false },
    { id: 'gp8', name: 'Pasta', description: 'Italian spaghetti, 1lb', price: 2.29, category: 'Pantry', unit: 'box', inStock: true },
  ],
  'gs2': [
    { id: 'gp9', name: 'Organic Spinach', description: 'Fresh organic baby spinach', price: 4.99, category: 'Vegetables', unit: 'bag', inStock: true },
    { id: 'gp10', name: 'Almond Milk', description: 'Unsweetened almond milk', price: 5.49, category: 'Dairy Alternatives', unit: 'carton', inStock: true },
    { id: 'gp11', name: 'Quinoa', description: 'Organic white quinoa', price: 7.99, category: 'Grains', unit: 'lb', inStock: true },
    { id: 'gp12', name: 'Kale Chips', description: 'Sea salt kale chips', price: 4.49, category: 'Snacks', unit: 'bag', inStock: true },
  ],
  'gs3': [
    { id: 'gp13', name: 'Chips', description: 'Classic potato chips', price: 3.99, category: 'Snacks', unit: 'bag', inStock: true },
    { id: 'gp14', name: 'Soda', description: '2L Cola', price: 2.49, category: 'Beverages', unit: 'bottle', inStock: true },
    { id: 'gp15', name: 'Ice Cream', description: 'Vanilla ice cream pint', price: 5.99, category: 'Frozen', unit: 'pint', inStock: true },
    { id: 'gp16', name: 'Instant Noodles', description: 'Pack of 6 instant noodles', price: 4.99, category: 'Pantry', unit: 'pack', inStock: true },
  ],
  'gs4': [
    { id: 'gp17', name: 'Fresh Tomatoes', description: 'Vine-ripened tomatoes', price: 3.99, category: 'Vegetables', unit: 'lb', inStock: true },
    { id: 'gp18', name: 'Farm Eggs', description: 'Pasture-raised eggs', price: 7.99, category: 'Dairy', unit: 'dozen', inStock: true },
    { id: 'gp19', name: 'Local Honey', description: 'Raw local wildflower honey', price: 12.99, category: 'Pantry', unit: 'jar', inStock: true },
    { id: 'gp20', name: 'Mixed Greens', description: 'Fresh mixed salad greens', price: 5.49, category: 'Vegetables', unit: 'bag', inStock: true },
  ],
};

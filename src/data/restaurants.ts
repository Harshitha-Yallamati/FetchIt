import { Restaurant, MenuItem } from '@/types';
import restaurantItalian from '@/assets/restaurant-italian.jpg';
import restaurantSushi from '@/assets/restaurant-sushi.jpg';
import restaurantBurger from '@/assets/restaurant-burger.jpg';
import restaurantThai from '@/assets/restaurant-thai.jpg';
import restaurantMexican from '@/assets/restaurant-mexican.jpg';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: "Bella Italia",
    image: restaurantItalian,
    cuisine: "Italian",
    rating: 4.8,
    reviewCount: 324,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    minOrder: 15,
    featured: true,
  },
  {
    id: '2',
    name: "Tokyo Sushi",
    image: restaurantSushi,
    cuisine: "Japanese",
    rating: 4.9,
    reviewCount: 512,
    deliveryTime: "30-40 min",
    deliveryFee: 3.49,
    minOrder: 20,
    featured: true,
  },
  {
    id: '3',
    name: "Burger Bros",
    image: restaurantBurger,
    cuisine: "American",
    rating: 4.6,
    reviewCount: 289,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    minOrder: 12,
    featured: true,
  },
  {
    id: '4',
    name: "Thai Orchid",
    image: restaurantThai,
    cuisine: "Thai",
    rating: 4.7,
    reviewCount: 198,
    deliveryTime: "35-45 min",
    deliveryFee: 2.49,
    minOrder: 18,
  },
  {
    id: '5',
    name: "El Mexicano",
    image: restaurantMexican,
    cuisine: "Mexican",
    rating: 4.5,
    reviewCount: 156,
    deliveryTime: "25-35 min",
    deliveryFee: 2.29,
    minOrder: 14,
  },
];

export const menuItems: Record<string, MenuItem[]> = {
  '1': [
    { id: 'm1', name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, basil', price: 14.99, category: 'Pizza', popular: true },
    { id: 'm2', name: 'Pepperoni Pizza', description: 'Spicy pepperoni, mozzarella, tomato sauce', price: 16.99, category: 'Pizza', popular: true },
    { id: 'm3', name: 'Spaghetti Carbonara', description: 'Creamy egg sauce, pancetta, parmesan', price: 15.99, category: 'Pasta' },
    { id: 'm4', name: 'Lasagna', description: 'Layers of pasta, beef ragù, béchamel', price: 17.99, category: 'Pasta', popular: true },
    { id: 'm5', name: 'Tiramisu', description: 'Classic Italian coffee dessert', price: 7.99, category: 'Desserts' },
    { id: 'm6', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', price: 8.99, category: 'Starters' },
  ],
  '2': [
    { id: 's1', name: 'Salmon Nigiri (8pc)', description: 'Fresh Atlantic salmon on rice', price: 16.99, category: 'Sushi', popular: true },
    { id: 's2', name: 'Dragon Roll', description: 'Eel, avocado, cucumber', price: 18.99, category: 'Rolls', popular: true },
    { id: 's3', name: 'Tuna Sashimi', description: 'Premium bluefin tuna slices', price: 22.99, category: 'Sashimi' },
    { id: 's4', name: 'Miso Soup', description: 'Traditional soybean soup with tofu', price: 4.99, category: 'Soup' },
    { id: 's5', name: 'Edamame', description: 'Steamed soybeans with sea salt', price: 5.99, category: 'Starters' },
    { id: 's6', name: 'Tempura Combo', description: 'Shrimp and vegetable tempura', price: 14.99, category: 'Hot Dishes', popular: true },
  ],
  '3': [
    { id: 'b1', name: 'Classic Cheeseburger', description: 'Beef patty, cheddar, lettuce, tomato', price: 12.99, category: 'Burgers', popular: true },
    { id: 'b2', name: 'Bacon Deluxe', description: 'Double beef, crispy bacon, special sauce', price: 15.99, category: 'Burgers', popular: true },
    { id: 'b3', name: 'Crispy Fries', description: 'Golden fries with house seasoning', price: 4.99, category: 'Sides' },
    { id: 'b4', name: 'Onion Rings', description: 'Beer-battered onion rings', price: 5.99, category: 'Sides' },
    { id: 'b5', name: 'Milkshake', description: 'Vanilla, chocolate, or strawberry', price: 6.99, category: 'Drinks' },
    { id: 'b6', name: 'Veggie Burger', description: 'Plant-based patty with all the fixings', price: 13.99, category: 'Burgers' },
  ],
  '4': [
    { id: 't1', name: 'Pad Thai', description: 'Rice noodles, shrimp, peanuts, lime', price: 14.99, category: 'Noodles', popular: true },
    { id: 't2', name: 'Green Curry', description: 'Coconut curry with vegetables', price: 13.99, category: 'Curry', popular: true },
    { id: 't3', name: 'Tom Yum Soup', description: 'Spicy and sour soup with shrimp', price: 9.99, category: 'Soup' },
    { id: 't4', name: 'Spring Rolls', description: 'Fresh vegetables in rice paper', price: 7.99, category: 'Starters' },
    { id: 't5', name: 'Thai Iced Tea', description: 'Sweet tea with condensed milk', price: 4.99, category: 'Drinks' },
    { id: 't6', name: 'Mango Sticky Rice', description: 'Fresh mango with coconut rice', price: 8.99, category: 'Desserts', popular: true },
  ],
  '5': [
    { id: 'x1', name: 'Tacos al Pastor', description: 'Marinated pork, pineapple, cilantro', price: 12.99, category: 'Tacos', popular: true },
    { id: 'x2', name: 'Burrito Supreme', description: 'Loaded with beef, beans, rice, cheese', price: 14.99, category: 'Burritos', popular: true },
    { id: 'x3', name: 'Nachos Grande', description: 'Tortilla chips with all toppings', price: 11.99, category: 'Starters' },
    { id: 'x4', name: 'Quesadilla', description: 'Cheese and chicken in crispy tortilla', price: 10.99, category: 'Mains' },
    { id: 'x5', name: 'Guacamole & Chips', description: 'Fresh made avocado dip', price: 8.99, category: 'Starters' },
    { id: 'x6', name: 'Churros', description: 'Fried dough with chocolate sauce', price: 6.99, category: 'Desserts', popular: true },
  ],
};

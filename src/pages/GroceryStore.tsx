// ============================================
// Grocery Store Detail Page
// Products listing for a specific store
// ============================================

import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, ShoppingBasket } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { GroceryProductCard } from '@/components/GroceryProductCard';
import { groceryStores, groceryProducts } from '@/data/groceries';
import { useGroceryCart } from '@/context/GroceryCartContext';

const GroceryStore = () => {
  const { id } = useParams<{ id: string }>();
  const store = groceryStores.find(s => s.id === id);
  const products = groceryProducts[id || ''] || [];
  const { itemCount, total } = useGroceryCart();

  if (!store) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Store not found</p>
      </div>
    );
  }

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Store Header */}
      <section className="relative h-48 overflow-hidden">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-2">
              <Link to="/grocery">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">{store.name}</h1>
            </div>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{store.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{store.deliveryTime}</span>
              </div>
              <span>${store.deliveryFee} delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-8 pb-24">
        {Object.entries(productsByCategory).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-lg font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((product, index) => (
                <GroceryProductCard
                  key={product.id}
                  product={product}
                  storeId={store.id}
                  storeName={store.name}
                  index={index}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Floating Cart */}
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4"
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBasket className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">{itemCount} items</p>
                <p className="text-sm text-muted-foreground">${total.toFixed(2)} + ${store.deliveryFee} delivery</p>
              </div>
            </div>
            <Link to="/grocery/cart">
              <Button className="bg-green-600 hover:bg-green-700">
                View Cart
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GroceryStore;

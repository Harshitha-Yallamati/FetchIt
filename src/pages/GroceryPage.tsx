// ============================================
// Grocery Page
// Store listing
// ============================================

import { motion } from 'framer-motion';
import { ArrowLeft, Search, ShoppingBasket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { GroceryStoreCard } from '@/components/GroceryStoreCard';
import { Button } from '@/components/ui/button';
import { groceryStores } from '@/data/groceries';
import { useGroceryCart } from '@/context/GroceryCartContext';

const categories = ['All', 'Supermarket', 'Organic', 'Convenience', 'Farm Produce'];

const GroceryPage = () => {
  const { itemCount, total } = useGroceryCart();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Grocery & Essentials</h1>
          </div>
          <p className="text-white/80">Fresh groceries delivered to your door</p>
          
          {/* Search */}
          <div className="relative mt-4 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search stores or products..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card text-foreground border-0 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Cart Banner */}
      {itemCount > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-green-100 border-b border-green-200"
        >
          <div className="container mx-auto px-4 py-3">
            <Link to="/grocery/cart">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBasket className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">{itemCount} items in cart</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-green-800">${total.toFixed(2)}</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    View Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-6 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                index === 0
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groceryStores.map((store, index) => (
            <GroceryStoreCard key={store.id} store={store} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GroceryPage;

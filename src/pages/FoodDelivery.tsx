// ============================================
// Food Delivery Page
// Maintains original restaurant listing functionality
// ============================================

import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { RestaurantCard } from '@/components/RestaurantCard';
import { restaurants } from '@/data/restaurants';
import { Button } from '@/components/ui/button';

const cuisineFilters = ['All', 'Italian', 'Japanese', 'American', 'Thai', 'Mexican'];

const FoodDelivery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Food Delivery</h1>
          </div>
          <p className="text-primary-foreground/80">Order from your favorite restaurants</p>
          
          {/* Search Bar */}
          <div className="relative mt-4 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        {/* Cuisine Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8"
        >
          {cuisineFilters.map((cuisine, index) => (
            <button
              key={cuisine}
              className={`px-6 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                index === 0
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </motion.div>

        {/* Featured Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Featured Restaurants</h2>
              <p className="text-muted-foreground">Top picks for you</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants
              .filter(r => r.featured)
              .map((restaurant, index) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
              ))}
          </div>
        </div>

        {/* All Restaurants */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">All Restaurants</h2>
              <p className="text-muted-foreground">Explore all options near you</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, index) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodDelivery;

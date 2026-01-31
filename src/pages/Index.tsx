import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { RestaurantCard } from '@/components/RestaurantCard';
import { restaurants } from '@/data/restaurants';
import heroImage from '@/assets/hero-food.jpg';

const cuisineFilters = ['All', 'Italian', 'Japanese', 'American', 'Thai', 'Mexican'];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Fast & Fresh Delivery</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              Delicious Food,
              <br />
              <span className="text-gradient">Delivered Fast</span>
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Order from the best local restaurants with easy, contactless delivery.
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card text-foreground text-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Cuisine Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">🍔</span>
              </div>
              <span className="font-bold text-xl">Foodie</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Foodie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

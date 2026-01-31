import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Bike, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { MenuItemCard } from '@/components/MenuItem';
import { restaurants, menuItems } from '@/data/restaurants';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function RestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, total } = useCart();
  
  const restaurant = restaurants.find(r => r.id === id);
  const menu = menuItems[id || ''] || [];

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Link to="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Group menu items by category
  const categories = [...new Set(menu.map(item => item.category))];

  const cartItemsForRestaurant = items.filter(item => item.restaurantId === id);
  const hasItemsInCart = cartItemsForRestaurant.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {restaurant.name}
              </h1>
              <p className="text-white/80 text-lg">{restaurant.cuisine} Cuisine</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-6 mb-8 p-4 bg-card rounded-2xl border border-border"
        >
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-warning text-warning" />
            <span className="font-bold">{restaurant.rating}</span>
            <span className="text-muted-foreground">({restaurant.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bike className="w-5 h-5" />
            <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span>Min. order ${restaurant.minOrder}</span>
          </div>
        </motion.div>

        {/* Menu */}
        <div className="space-y-10">
          {categories.map(category => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">{category}</h2>
              <div className="grid gap-4">
                {menu
                  .filter(item => item.category === category)
                  .map(item => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      restaurantId={restaurant.id}
                      restaurantName={restaurant.name}
                    />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {hasItemsInCart && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-auto z-50"
        >
          <Link to="/cart">
            <Button className="w-full md:w-auto px-8 py-6 rounded-2xl text-lg shadow-2xl">
              <span className="flex items-center gap-3">
                <span className="bg-primary-foreground/20 px-3 py-1 rounded-full">
                  {cartItemsForRestaurant.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
                <span>View Cart</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </span>
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

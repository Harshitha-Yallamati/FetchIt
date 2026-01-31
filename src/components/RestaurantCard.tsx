import { Link } from 'react-router-dom';
import { Star, Clock, Bike } from 'lucide-react';
import { Restaurant } from '@/types';
import { motion } from 'framer-motion';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
}

export function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link to={`/restaurant/${restaurant.id}`}>
        <div className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {restaurant.featured && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                Featured
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-lg font-bold text-white">{restaurant.name}</h3>
              <p className="text-sm text-white/80">{restaurant.cuisine}</p>
            </div>
          </div>

          {/* Details */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium text-foreground">{restaurant.rating}</span>
                  <span>({restaurant.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Bike className="w-4 h-4 text-primary" />
                <span className="font-medium">${restaurant.deliveryFee.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================
// Grocery Store Card Component
// ============================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Clock, DollarSign } from 'lucide-react';
import { GroceryStore } from '@/types/services';

interface GroceryStoreCardProps {
  store: GroceryStore;
  index: number;
}

export function GroceryStoreCard({ store, index }: GroceryStoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/grocery/${store.id}`}>
        <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
          {/* Image */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
              {store.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{store.name}</h3>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">{store.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{store.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>${store.deliveryFee} delivery</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================
// Pharmacy Card Component
// ============================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Pharmacy } from '@/types/services';

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  index: number;
}

export function PharmacyCard({ pharmacy, index }: PharmacyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/medicine/${pharmacy.id}`}>
        <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
          {/* Image */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={pharmacy.image}
              alt={pharmacy.name}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <Badge 
              variant={pharmacy.openNow ? 'default' : 'secondary'} 
              className="absolute top-3 right-3"
            >
              {pharmacy.openNow ? 'Open Now' : 'Closed'}
            </Badge>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{pharmacy.name}</h3>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <MapPin className="w-4 h-4" />
              <span>{pharmacy.address}</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">{pharmacy.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{pharmacy.deliveryTime}</span>
              </div>
              <span>${pharmacy.deliveryFee} delivery</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

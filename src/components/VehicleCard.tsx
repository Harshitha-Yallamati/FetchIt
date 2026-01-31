// ============================================
// Vehicle Card Component
// For bike/scooter rental listing
// ============================================

import { motion } from 'framer-motion';
import { MapPin, Star, Battery, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vehicle } from '@/types/services';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
  onBook: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, index, onBook }: VehicleCardProps) {
  const isElectric = vehicle.type.startsWith('e-');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {!vehicle.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Not Available</span>
          </div>
        )}
        {isElectric && vehicle.batteryLevel && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
            <Battery className="w-4 h-4" />
            {vehicle.batteryLevel}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg">{vehicle.name}</h3>
            <Badge variant="secondary" className="mt-1">
              {vehicle.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{vehicle.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4" />
          <span>{vehicle.location}</span>
          <span className="mx-1">•</span>
          <span>{vehicle.distance}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {vehicle.features.slice(0, 3).map((feature, i) => (
            <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-full">
              {feature}
            </span>
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-sm">
            <span className="font-bold text-lg">${vehicle.pricePerHour}</span>
            <span className="text-muted-foreground">/hr</span>
            <span className="mx-2 text-muted-foreground">|</span>
            <span className="font-bold">${vehicle.pricePerDay}</span>
            <span className="text-muted-foreground">/day</span>
          </div>
          <Button 
            size="sm" 
            disabled={!vehicle.available}
            onClick={() => onBook(vehicle)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

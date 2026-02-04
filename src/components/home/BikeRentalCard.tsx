// ============================================
// Bike Rental Card - Horizontal Scroll
// ============================================

import { motion } from 'framer-motion';
import { MapPin, Battery, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface BikeRentalCardProps {
  id: string;
  name: string;
  image: string;
  pricePerHour: number;
  pricePerDay: number;
  available: boolean;
  distance: string;
  batteryLevel?: number;
  rating: number;
}

export function BikeRentalCard({ 
  id,
  name, 
  image, 
  pricePerHour,
  pricePerDay,
  available,
  distance,
  batteryLevel,
  rating 
}: BikeRentalCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex-shrink-0 w-48 bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
    >
      <div className="relative h-28 bg-secondary/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 ${available ? 'bg-emerald-500' : 'bg-muted'}`}
        >
          {available ? 'Available' : 'In Use'}
        </Badge>
        {batteryLevel !== undefined && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/90 rounded-full px-2 py-0.5 text-xs">
            <Battery className="w-3 h-3 text-emerald-500" />
            <span>{batteryLevel}%</span>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm truncate">{name}</h3>
          <div className="flex items-center gap-0.5 text-xs">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
          <MapPin className="w-3 h-3" />
          <span>{distance}</span>
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-xs">
          <span className="font-bold">₹{pricePerHour}/hr</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">₹{pricePerDay}/day</span>
        </div>
        
        <Link to="/bikes">
          <Button 
            size="sm" 
            className="w-full mt-3 rounded-full text-xs"
            disabled={!available}
          >
            Rent Now
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ============================================
// Tiffin Service Card - Horizontal Scroll
// ============================================

import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface TiffinCardProps {
  id: string;
  name: string;
  image: string;
  mealTypes: string[];
  pricePerMeal: number;
  subscriptions: string[];
  rating: number;
}

export function TiffinCard({ 
  name, 
  image, 
  mealTypes,
  pricePerMeal,
  subscriptions,
  rating 
}: TiffinCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex-shrink-0 w-52 bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
    >
      <div className="relative h-28">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-background/90 rounded-full px-2 py-0.5 text-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{name}</h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
          <Clock className="w-3 h-3" />
          <span>{mealTypes.join(' • ')}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {subscriptions.map((sub) => (
            <Badge key={sub} variant="secondary" className="text-[10px] px-1.5">
              {sub}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-sm">₹{pricePerMeal}/meal</span>
          <Link to="/food">
            <Button size="sm" variant="outline" className="rounded-full text-xs h-7">
              Subscribe
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

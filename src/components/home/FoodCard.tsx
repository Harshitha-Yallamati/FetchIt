// ============================================
// Food Item Card - Horizontal Scroll
// ============================================

import { motion } from 'framer-motion';
import { Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FoodCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  deliveryTime: string;
  discount?: number;
  onAdd?: () => void;
}

export function FoodCard({ 
  name, 
  image, 
  price, 
  deliveryTime, 
  discount, 
  onAdd 
}: FoodCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex-shrink-0 w-40 bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
    >
      <div className="relative h-28">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {discount && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
            {discount}% OFF
          </Badge>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{name}</h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
          <Clock className="w-3 h-3" />
          <span>{deliveryTime}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-primary">₹{price}</span>
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7 rounded-full"
            onClick={onAdd}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

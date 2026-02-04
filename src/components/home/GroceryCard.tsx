// ============================================
// Grocery Item Card - Horizontal Scroll
// ============================================

import { motion } from 'framer-motion';
import { Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GroceryCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  deliveryTime: string;
  discount?: number;
  onAdd?: () => void;
}

export function GroceryCard({ 
  name, 
  image, 
  price, 
  unit,
  deliveryTime, 
  discount, 
  onAdd 
}: GroceryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex-shrink-0 w-36 bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
    >
      <div className="relative h-24 bg-secondary/30 p-2">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
        {discount && (
          <Badge className="absolute top-1 left-1 bg-destructive text-destructive-foreground text-[10px] px-1.5">
            {discount}% OFF
          </Badge>
        )}
      </div>
      
      <div className="p-2.5">
        <h3 className="font-medium text-sm truncate">{name}</h3>
        <p className="text-xs text-muted-foreground">{unit}</p>
        
        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
          <Clock className="w-3 h-3" />
          <span>{deliveryTime}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-sm">₹{price}</span>
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6 rounded-full"
            onClick={onAdd}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

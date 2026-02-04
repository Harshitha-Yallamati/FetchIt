// ============================================
// Medicine Item Card - Horizontal Scroll
// ============================================

import { motion } from 'framer-motion';
import { Clock, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MedicineCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  deliveryTime: string;
  requiresPrescription?: boolean;
  onAdd?: () => void;
}

export function MedicineCard({ 
  name, 
  image, 
  price, 
  deliveryTime, 
  requiresPrescription,
  onAdd 
}: MedicineCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex-shrink-0 w-36 bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
    >
      <div className="relative h-24 bg-secondary/30 p-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
        {requiresPrescription && (
          <Badge 
            variant="secondary" 
            className="absolute top-1 left-1 text-[9px] px-1.5 gap-0.5"
          >
            <FileText className="w-2.5 h-2.5" />
            Rx
          </Badge>
        )}
      </div>
      
      <div className="p-2.5">
        <h3 className="font-medium text-sm truncate">{name}</h3>
        
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
            disabled={requiresPrescription}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

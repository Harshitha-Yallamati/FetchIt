// ============================================
// Parcel Service Card
// ============================================

import { motion } from 'framer-motion';
import { FileText, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ParcelCardProps {
  type: 'document' | 'small' | 'large';
  title: string;
  description: string;
}

const icons = {
  document: FileText,
  small: Package,
  large: Truck,
};

const colors = {
  document: 'bg-blue-100 text-blue-600',
  small: 'bg-amber-100 text-amber-600',
  large: 'bg-emerald-100 text-emerald-600',
};

export function ParcelCard({ type, title, description }: ParcelCardProps) {
  const Icon = icons[type];
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex-shrink-0 w-44 bg-card rounded-2xl border border-border p-4 shadow-sm"
    >
      <div className={`w-12 h-12 rounded-xl ${colors[type]} flex items-center justify-center mb-3`}>
        <Icon className="w-6 h-6" />
      </div>
      
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
      
      <Link to="/parcel">
        <Button size="sm" className="w-full mt-3 rounded-full text-xs">
          Send Parcel
        </Button>
      </Link>
    </motion.div>
  );
}

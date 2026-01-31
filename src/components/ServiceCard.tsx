// ============================================
// Service Card Component
// Reusable card for service hub
// ============================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ServiceType } from '@/types/services';
import { 
  Utensils, 
  Bike, 
  Package, 
  ShoppingBasket, 
  Wrench, 
  Pill 
} from 'lucide-react';

interface ServiceCardProps {
  id: ServiceType;
  name: string;
  description: string;
  route: string;
  index: number;
}

const serviceIcons: Record<ServiceType, React.ReactNode> = {
  food: <Utensils className="w-8 h-8" />,
  bikes: <Bike className="w-8 h-8" />,
  parcel: <Package className="w-8 h-8" />,
  grocery: <ShoppingBasket className="w-8 h-8" />,
  services: <Wrench className="w-8 h-8" />,
  medicine: <Pill className="w-8 h-8" />,
};

const serviceColors: Record<ServiceType, string> = {
  food: 'from-primary to-primary/80',
  bikes: 'from-emerald-500 to-emerald-600',
  parcel: 'from-amber-500 to-amber-600',
  grocery: 'from-green-500 to-green-600',
  services: 'from-blue-500 to-blue-600',
  medicine: 'from-rose-500 to-rose-600',
};

export function ServiceCard({ id, name, description, route, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={route}>
        <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${serviceColors[id]} text-white mb-4 transition-transform group-hover:scale-110`}>
            {serviceIcons[id]}
          </div>
          
          {/* Content */}
          <h3 className="text-lg font-bold mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          
          {/* Arrow indicator */}
          <div className="absolute top-6 right-6 opacity-0 transform translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

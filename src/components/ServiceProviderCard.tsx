// ============================================
// Service Provider Card Component
// For home services listing
// ============================================

import { motion } from 'framer-motion';
import { Star, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceProvider } from '@/types/services';
import { serviceCategoryLabels, serviceCategoryIcons } from '@/data/homeServices';

interface ServiceProviderCardProps {
  provider: ServiceProvider;
  index: number;
  onBook: (provider: ServiceProvider) => void;
}

export function ServiceProviderCard({ provider, index, onBook }: ServiceProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg transition-all"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          {provider.available && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg">{provider.name}</h3>
              <Badge variant="secondary" className="mt-1">
                <span className="mr-1">{serviceCategoryIcons[provider.category]}</span>
                {serviceCategoryLabels[provider.category]}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{provider.rating}</span>
              <span className="text-muted-foreground text-sm">({provider.reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{provider.experience}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              <span>{provider.completedJobs} jobs</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mt-3">
            {provider.skills.map((skill, i) => (
              <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div>
          <span className="font-bold text-lg">${provider.pricePerHour}</span>
          <span className="text-muted-foreground">/hour</span>
        </div>
        <Button 
          disabled={!provider.available}
          onClick={() => onBook(provider)}
        >
          {provider.available ? 'Book Now' : 'Not Available'}
        </Button>
      </div>
    </motion.div>
  );
}

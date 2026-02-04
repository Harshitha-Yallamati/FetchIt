// ============================================
// Section Header Component
// ============================================

import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  seeAllLink?: string;
}

export function SectionHeader({ title, subtitle, seeAllLink }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {seeAllLink && (
        <Link 
          to={seeAllLink}
          className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
        >
          See All
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

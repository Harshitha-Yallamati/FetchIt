// ============================================
// Category Icons Row - Home Page
// ============================================

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const categories = [
  { id: 'all', label: 'All', icon: '🏠' },
  { id: 'food', label: 'Food', icon: '🍔' },
  { id: 'grocery', label: 'Grocery', icon: '🥦' },
  { id: 'medicine', label: 'Medicine', icon: '💊' },
  { id: 'parcel', label: 'Parcel', icon: '📦' },
  { id: 'bikes', label: 'Bikes', icon: '🏍️' },
  { id: 'tiffin', label: 'Tiffins', icon: '🍱' },
];

interface CategoryRowProps {
  onCategoryChange?: (category: string) => void;
}

export function CategoryRow({ onCategoryChange }: CategoryRowProps) {
  const [active, setActive] = useState('all');

  const handleClick = (id: string) => {
    setActive(id);
    onCategoryChange?.(id);
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={active === cat.id ? 'default' : 'outline'}
            size="sm"
            className="rounded-full gap-2 shrink-0"
            onClick={() => handleClick(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

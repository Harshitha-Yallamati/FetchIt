// ============================================
// Search Bar Component - Home Page
// ============================================

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search for food, groceries, medicines…"
        className="pl-12 pr-4 py-6 rounded-2xl bg-card border-border shadow-sm text-base"
      />
    </div>
  );
}

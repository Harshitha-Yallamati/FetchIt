import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuItem as MenuItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface MenuItemProps {
  item: MenuItemType;
  restaurantId: string;
  restaurantName: string;
}

export function MenuItemCard({ item, restaurantId, restaurantName }: MenuItemProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item, restaurantId, restaurantName);
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group"
    >
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">{item.name}</h4>
          {item.popular && (
            <span className="px-2 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-medium">
              Popular
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {item.description}
        </p>
        <p className="text-lg font-bold mt-2 text-primary">${item.price.toFixed(2)}</p>
      </div>

      <Button
        onClick={handleAddToCart}
        size="icon"
        className="rounded-full h-10 w-10 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity"
      >
        <Plus className="w-5 h-5" />
      </Button>
    </motion.div>
  );
}

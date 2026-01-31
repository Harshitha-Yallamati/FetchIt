// ============================================
// Grocery Product Card Component
// ============================================

import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GroceryProduct } from '@/types/services';
import { useGroceryCart } from '@/context/GroceryCartContext';

interface GroceryProductCardProps {
  product: GroceryProduct;
  storeId: string;
  storeName: string;
  index: number;
}

export function GroceryProductCard({ product, storeId, storeName, index }: GroceryProductCardProps) {
  const { items, addItem, updateQuantity } = useGroceryCart();
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold">{product.name}</h4>
          <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
        </div>
        {product.discount && (
          <Badge variant="destructive" className="ml-2">
            -{product.discount}%
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="font-bold text-lg">${discountedPrice.toFixed(2)}</span>
          {product.discount && (
            <span className="text-sm text-muted-foreground line-through ml-2">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="text-sm text-muted-foreground ml-1">/ {product.unit}</span>
        </div>

        {!product.inStock ? (
          <Badge variant="secondary">Out of Stock</Badge>
        ) : quantity > 0 ? (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              size="icon"
              className="h-8 w-8"
              onClick={() => addItem(product, storeId, storeName)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={() => addItem(product, storeId, storeName)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        )}
      </div>
    </motion.div>
  );
}

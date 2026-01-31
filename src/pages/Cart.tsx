import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, MapPin, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { CartItemCard } from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { toast } from 'sonner';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { placeOrder } = useOrders();
  const [address, setAddress] = useState('123 Main Street, City');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const deliveryFee = 2.99;
  const grandTotal = total + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to place an order');
      navigate('/auth');
      return;
    }

    if (!address.trim()) {
      toast.error('Please enter a delivery address');
      return;
    }

    setIsPlacingOrder(true);
    
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const order = placeOrder(items, total, address);
    clearCart();
    
    toast.success('Order placed successfully!');
    navigate(`/orders/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some delicious items from our restaurants!
            </p>
            <Link to="/">
              <Button size="lg" className="rounded-full px-8">
                Browse Restaurants
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            
            <AnimatePresence mode="popLayout">
              <div className="space-y-4">
                {items.map(item => (
                  <CartItemCard key={item.menuItem.id} item={item} />
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-6 border border-border sticky top-24"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Delivery Address */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Delivery Address
                </label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="rounded-xl"
                />
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-primary">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full py-6 rounded-xl text-lg"
              >
                {isPlacingOrder ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Placing Order...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Place Order
                  </span>
                )}
              </Button>

              {!isAuthenticated && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  You'll need to{' '}
                  <Link to="/auth" className="text-primary font-medium hover:underline">
                    sign in
                  </Link>{' '}
                  to complete your order
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { OrderTracker } from '@/components/OrderTracker';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';

export default function OrdersPage() {
  const { orderId } = useParams();
  const { orders, currentOrder, getOrder } = useOrders();
  const { isAuthenticated, logout } = useAuth();

  // Show specific order if orderId provided
  const order = orderId ? getOrder(orderId) || currentOrder : currentOrder;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <h1 className="text-2xl font-bold mb-4">Sign in to view orders</h1>
            <p className="text-muted-foreground mb-8">
              Please sign in to track your orders and view order history.
            </p>
            <Link to="/auth">
              <Button size="lg" className="rounded-full px-8">
                Sign In
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {orderId ? 'Order Tracking' : 'Your Orders'}
            </h1>
          </div>
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>

        {order ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <OrderTracker order={order} />
          </motion.div>
        ) : orders.length > 0 ? (
          <div className="max-w-2xl mx-auto space-y-4">
            {orders.map(o => (
              <Link key={o.id} to={`/orders/${o.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{o.restaurantName}</h3>
                      <p className="text-sm text-muted-foreground">{o.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">${o.total.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        o.status === 'delivered' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {o.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-8">
              Your order history will appear here.
            </p>
            <Link to="/">
              <Button size="lg" className="rounded-full px-8">
                Start Ordering
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

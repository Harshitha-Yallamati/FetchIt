import { Check, ChefHat, Bike, Home, Clock } from 'lucide-react';
import { Order } from '@/types';
import { motion } from 'framer-motion';

interface OrderTrackerProps {
  order: Order;
}

const steps = [
  { key: 'confirmed', label: 'Order Confirmed', icon: Check },
  { key: 'preparing', label: 'Preparing', icon: ChefHat },
  { key: 'on-the-way', label: 'On the Way', icon: Bike },
  { key: 'delivered', label: 'Delivered', icon: Home },
];

export function OrderTracker({ order }: OrderTrackerProps) {
  const currentStepIndex = steps.findIndex(s => s.key === order.status);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-lg">{order.restaurantName}</h3>
          <p className="text-sm text-muted-foreground">Order {order.id}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
          <Clock className="w-4 h-4" />
          <span className="font-medium text-sm">{order.estimatedDelivery}</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-1 bg-secondary rounded-full">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isActive = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  } ${isCurrent ? 'ring-4 ring-primary/30' : ''}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span
                  className={`mt-3 text-xs font-medium text-center ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Items Summary */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-semibold mb-3">Order Summary</h4>
        <div className="space-y-2">
          {order.items.map(item => (
            <div key={item.menuItem.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.quantity}x {item.menuItem.name}
              </span>
              <span className="font-medium">
                ${(item.menuItem.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-sm pt-2 border-t border-border">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="font-medium">$2.99</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total</span>
            <span className="text-primary">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mt-6 p-4 rounded-xl bg-secondary/50">
        <p className="text-sm text-muted-foreground">Delivering to</p>
        <p className="font-medium">{order.deliveryAddress}</p>
      </div>
    </div>
  );
}

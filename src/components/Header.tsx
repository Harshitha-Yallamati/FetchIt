import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export function Header() {
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">🍔</span>
            </div>
            <span className="font-bold text-xl">Foodie</span>
          </Link>

          {/* Delivery Location */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary cursor-pointer hover:bg-secondary/80 transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">123 Main Street</span>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search restaurants or dishes..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <Link to="/orders">
                <Button variant="ghost" className="gap-2">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{user?.name?.split(' ')[0]}</span>
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="default" className="rounded-full">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

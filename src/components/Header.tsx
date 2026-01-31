import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, MapPin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: '/food', label: 'Food' },
    { path: '/grocery', label: 'Grocery' },
    { path: '/bikes', label: 'Bikes' },
    { path: '/parcel', label: 'Parcel' },
    { path: '/services', label: 'Services' },
    { path: '/medicine', label: 'Medicine' },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">⚡</span>
            </div>
            <span className="font-bold text-xl">FetchIt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={location.pathname.startsWith(link.path) ? 'secondary' : 'ghost'}
                  size="sm"
                  className="text-sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Delivery Location */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary cursor-pointer hover:bg-secondary/80 transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">123 Main Street</span>
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

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={location.pathname.startsWith(link.path) ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

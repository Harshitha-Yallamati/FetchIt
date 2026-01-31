// ============================================
// Pharmacy Detail Page
// Medicine listing for a specific pharmacy
// ============================================

import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, MapPin, AlertCircle, Plus, Minus, Pill } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { pharmacies, medicines } from '@/data/pharmacies';
import { useMedicine } from '@/context/MedicineContext';
import { Medicine } from '@/types/services';

const PharmacyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const pharmacy = pharmacies.find(p => p.id === id);
  const medicineList = medicines[id || ''] || [];
  const { cart, addToCart, updateQuantity, cartCount, cartTotal } = useMedicine();

  if (!pharmacy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Pharmacy not found</p>
      </div>
    );
  }

  const getQuantity = (medicineId: string) => {
    const item = cart.find(i => i.medicine.id === medicineId);
    return item?.quantity || 0;
  };

  // Group by category
  const byCategory = medicineList.reduce((acc, med) => {
    if (!acc[med.category]) acc[med.category] = [];
    acc[med.category].push(med);
    return acc;
  }, {} as Record<string, Medicine[]>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Pharmacy Header */}
      <section className="relative h-48 overflow-hidden">
        <img
          src={pharmacy.image}
          alt={pharmacy.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-2">
              <Link to="/medicine">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">{pharmacy.name}</h1>
              <Badge variant={pharmacy.openNow ? 'default' : 'secondary'}>
                {pharmacy.openNow ? 'Open' : 'Closed'}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{pharmacy.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{pharmacy.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{pharmacy.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medicines */}
      <section className="container mx-auto px-4 py-8 pb-24">
        {Object.entries(byCategory).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-lg font-bold mb-4">{category}</h2>
            <div className="space-y-3">
              {items.map((medicine, index) => {
                const qty = getQuantity(medicine.id);
                return (
                  <motion.div
                    key={medicine.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-xl border border-border p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{medicine.name}</h4>
                          {medicine.requiresPrescription && (
                            <Badge variant="outline" className="text-xs">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Rx Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{medicine.description}</p>
                        <p className="text-xs text-muted-foreground">By {medicine.manufacturer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${medicine.price.toFixed(2)}</p>
                        {!medicine.inStock ? (
                          <Badge variant="secondary" className="mt-2">Out of Stock</Badge>
                        ) : qty > 0 ? (
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(medicine.id, qty - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{qty}</span>
                            <Button
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => addToCart(medicine)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={() => addToCart(medicine)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Floating Cart */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4"
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Pill className="w-5 h-5 text-rose-600" />
              <div>
                <p className="font-medium">{cartCount} items</p>
                <p className="text-sm text-muted-foreground">${cartTotal.toFixed(2)} + ${pharmacy.deliveryFee} delivery</p>
              </div>
            </div>
            <Link to="/medicine/cart">
              <Button className="bg-rose-600 hover:bg-rose-700">
                Checkout
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PharmacyDetail;

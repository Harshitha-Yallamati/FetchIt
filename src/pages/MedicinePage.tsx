// ============================================
// Medicine Page
// Pharmacy listing
// ============================================

import { motion } from 'framer-motion';
import { ArrowLeft, Search, Upload, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { PharmacyCard } from '@/components/PharmacyCard';
import { Button } from '@/components/ui/button';
import { pharmacies } from '@/data/pharmacies';
import { useMedicine } from '@/context/MedicineContext';

const MedicinePage = () => {
  const { cartCount, cartTotal } = useMedicine();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Medicine Delivery</h1>
          </div>
          <p className="text-white/80">Get medicines delivered safely to your door</p>
          
          {/* Search */}
          <div className="relative mt-4 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search pharmacies or medicines..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card text-foreground border-0 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Cart Banner */}
      {cartCount > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-rose-100 border-b border-rose-200"
        >
          <div className="container mx-auto px-4 py-3">
            <Link to="/medicine/cart">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Pill className="w-5 h-5 text-rose-600" />
                  <span className="text-rose-800 font-medium">{cartCount} items in cart</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-rose-800">${cartTotal.toFixed(2)}</span>
                  <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                    View Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        {/* Upload Prescription Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-100 rounded-xl">
              <Upload className="w-6 h-6 text-rose-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Upload Prescription</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Have a prescription? Upload it and we'll prepare your order.
              </p>
              <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                Upload Image
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Pharmacy Grid */}
        <h2 className="text-xl font-bold mb-4">Nearby Pharmacies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacies.map((pharmacy, index) => (
            <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MedicinePage;

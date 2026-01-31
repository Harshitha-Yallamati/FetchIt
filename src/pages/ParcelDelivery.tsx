// ============================================
// Parcel Delivery Page
// Send parcels with tracking
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Package, Scale, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { parcelSizeOptions, calculateParcelPrice } from '@/data/parcel';
import { ParcelSize } from '@/types/services';
import { useParcel } from '@/context/ParcelContext';
import { useToast } from '@/hooks/use-toast';

const ParcelDelivery = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [selectedSize, setSelectedSize] = useState<ParcelSize>('small');
  const [weight, setWeight] = useState(1);
  const [description, setDescription] = useState('');
  
  const { createParcel, parcels } = useParcel();
  const { toast } = useToast();
  const navigate = useNavigate();

  const estimatedPrice = calculateParcelPrice(selectedSize, weight);

  const handleSubmit = () => {
    if (!pickupAddress || !dropAddress) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in pickup and drop addresses',
        variant: 'destructive',
      });
      return;
    }

    const parcel = createParcel(pickupAddress, dropAddress, selectedSize, weight, description);
    
    toast({
      title: 'Parcel Booked! 📦',
      description: `Tracking ID: ${parcel.id}`,
    });

    navigate(`/parcel/track/${parcel.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Parcel & Courier</h1>
          </div>
          <p className="text-white/80">Send parcels locally with live tracking</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            {/* Addresses */}
            <div className="space-y-4 mb-6">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  Pickup Address
                </Label>
                <Input
                  placeholder="Enter pickup location"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                />
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Drop Address
                </Label>
                <Input
                  placeholder="Enter delivery location"
                  value={dropAddress}
                  onChange={(e) => setDropAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Parcel Size */}
            <div className="mb-6">
              <Label className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4" />
                Parcel Size
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {parcelSizeOptions.map((option) => (
                  <button
                    key={option.size}
                    onClick={() => setSelectedSize(option.size)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      selectedSize === option.size
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="text-2xl block mb-2">{option.icon}</span>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-xs text-muted-foreground">Max {option.maxWeight}kg</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div className="mb-6">
              <Label className="flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4" />
                Weight (kg)
              </Label>
              <Input
                type="number"
                min={0.1}
                max={30}
                step={0.1}
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 1)}
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <Label className="mb-2">Description (Optional)</Label>
              <Textarea
                placeholder="What are you sending?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Price Summary */}
            <div className="bg-secondary rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5" />
                <span className="font-medium">Delivery Estimate</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimated delivery: 45-60 min</span>
                <span className="text-2xl font-bold">${estimatedPrice.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleSubmit}>
              Book Delivery
            </Button>
          </motion.div>

          {/* Recent Parcels */}
          {parcels.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Recent Deliveries</h3>
              <div className="space-y-3">
                {parcels.slice(0, 3).map((parcel) => (
                  <Link key={parcel.id} to={`/parcel/track/${parcel.id}`}>
                    <div className="bg-card rounded-xl border border-border p-4 hover:border-primary transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{parcel.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {parcel.pickupAddress} → {parcel.dropAddress}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          parcel.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          parcel.status === 'in-transit' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {parcel.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ParcelDelivery;

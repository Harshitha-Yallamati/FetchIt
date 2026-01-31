// ============================================
// Bike Rental Page
// Vehicle listing and booking
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bike, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { VehicleCard } from '@/components/VehicleCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { vehicles } from '@/data/vehicles';
import { Vehicle } from '@/types/services';
import { useBikeRental } from '@/context/BikeRentalContext';
import { useToast } from '@/hooks/use-toast';

const BikeRental = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [duration, setDuration] = useState<'hourly' | 'daily'>('hourly');
  const { startRental, activeBooking } = useBikeRental();
  const { toast } = useToast();

  const handleBook = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const confirmBooking = () => {
    if (!selectedVehicle) return;
    
    const booking = startRental(selectedVehicle, duration, selectedVehicle.location);
    setSelectedVehicle(null);
    
    toast({
      title: 'Booking Confirmed! 🚴',
      description: `Your ${selectedVehicle.name} is ready for pickup at ${selectedVehicle.location}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Bike & Scooter Rentals</h1>
          </div>
          <p className="text-white/80">Rent vehicles by the hour or day</p>
        </div>
      </section>

      {/* Active Booking Banner */}
      <AnimatePresence>
        {activeBooking && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-emerald-100 border-b border-emerald-200"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Bike className="w-6 h-6 text-emerald-600" />
                  <div>
                    <p className="font-medium text-emerald-800">Active Rental: {activeBooking.vehicle.name}</p>
                    <p className="text-sm text-emerald-600">Started at {new Date(activeBooking.startTime).toLocaleTimeString()}</p>
                  </div>
                </div>
                <Link to="/bikes/active">
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-emerald-500">{vehicles.filter(v => v.available).length}</p>
            <p className="text-sm text-muted-foreground">Available Now</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold">$3.99</p>
            <p className="text-sm text-muted-foreground">Starting/hr</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <MapPin className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">6 Locations</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">24/7 Available</p>
          </div>
        </div>

        {/* Vehicle Grid */}
        <h2 className="text-xl font-bold mb-4">Nearby Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
              onBook={handleBook}
            />
          ))}
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book {selectedVehicle?.name}</DialogTitle>
            <DialogDescription>Choose your rental duration</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex gap-4">
              <Button
                variant={duration === 'hourly' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setDuration('hourly')}
              >
                Hourly (${selectedVehicle?.pricePerHour}/hr)
              </Button>
              <Button
                variant={duration === 'daily' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setDuration('daily')}
              >
                Daily (${selectedVehicle?.pricePerDay}/day)
              </Button>
            </div>

            <div className="bg-secondary rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>Pickup Location</span>
              </div>
              <p className="font-medium">{selectedVehicle?.location}</p>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Total</span>
                <span className="text-2xl font-bold">
                  ${duration === 'hourly' ? selectedVehicle?.pricePerHour : selectedVehicle?.pricePerDay}
                </span>
              </div>
              <Button className="w-full" onClick={confirmBooking}>
                Confirm Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BikeRental;

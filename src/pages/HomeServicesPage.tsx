// ============================================
// Home Services Page
// Service provider listing and booking
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ServiceProviderCard } from '@/components/ServiceProviderCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { serviceProviders, serviceCategoryLabels, serviceCategoryIcons } from '@/data/homeServices';
import { ServiceProvider, ServiceCategory } from '@/types/services';
import { useHomeServices } from '@/context/HomeServicesContext';
import { useToast } from '@/hooks/use-toast';

const categories: ServiceCategory[] = ['plumber', 'electrician', 'cleaning', 'carpenter', 'painter', 'ac-repair'];

const HomeServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  
  const { createBooking } = useHomeServices();
  const { toast } = useToast();

  const filteredProviders = selectedCategory
    ? serviceProviders.filter(p => p.category === selectedCategory)
    : serviceProviders;

  const handleBook = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
  };

  const confirmBooking = () => {
    if (!selectedProvider || !bookingDate || !bookingTime || !address) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const booking = createBooking(selectedProvider, bookingDate, bookingTime, address, description);
    setSelectedProvider(null);
    setBookingDate('');
    setBookingTime('');
    setAddress('');
    setDescription('');

    toast({
      title: 'Booking Confirmed! 🛠️',
      description: `${selectedProvider.name} will arrive on ${bookingDate} at ${bookingTime}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Home Services</h1>
          </div>
          <p className="text-white/80">Professional help for your home needs</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        {/* Category Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                selectedCategory === category
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-border hover:border-blue-300'
              }`}
            >
              <span className="text-2xl block mb-2">{serviceCategoryIcons[category]}</span>
              <p className="text-sm font-medium">{serviceCategoryLabels[category]}</p>
            </motion.button>
          ))}
        </div>

        {/* Provider List */}
        <div className="space-y-4">
          {filteredProviders.map((provider, index) => (
            <ServiceProviderCard
              key={provider.id}
              provider={provider}
              index={index}
              onBook={handleBook}
            />
          ))}
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={!!selectedProvider} onOpenChange={() => setSelectedProvider(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book {selectedProvider?.name}</DialogTitle>
            <DialogDescription>
              {serviceCategoryLabels[selectedProvider?.category || 'plumber']} • ${selectedProvider?.pricePerHour}/hour
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </Label>
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  Time
                </Label>
                <Input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                Address
              </Label>
              <Input
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2">Describe the issue</Label>
              <Textarea
                placeholder="What do you need help with?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Estimated Cost (2 hrs min)</span>
                <span className="text-xl font-bold">${(selectedProvider?.pricePerHour || 0) * 2}</span>
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

export default HomeServicesPage;

// ============================================
// FetchIt Home Page - Service Hub
// Multi-service dashboard
// ============================================

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, MapPin } from 'lucide-react';
import { Header } from '@/components/Header';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceType } from '@/types/services';
import heroImage from '@/assets/hero-food.jpg';

interface ServiceItem {
  id: ServiceType;
  name: string;
  description: string;
  route: string;
}

const services: ServiceItem[] = [
  {
    id: 'food',
    name: 'Food Delivery',
    description: 'Order from restaurants',
    route: '/food',
  },
  {
    id: 'bikes',
    name: 'Bike Rentals',
    description: 'Rent bikes & scooters',
    route: '/bikes',
  },
  {
    id: 'parcel',
    name: 'Parcel & Courier',
    description: 'Send packages locally',
    route: '/parcel',
  },
  {
    id: 'grocery',
    name: 'Grocery',
    description: 'Fresh groceries delivered',
    route: '/grocery',
  },
  {
    id: 'services',
    name: 'Home Services',
    description: 'Book local professionals',
    route: '/services',
  },
  {
    id: 'medicine',
    name: 'Medicine',
    description: 'Pharmacy delivery',
    route: '/medicine',
  },
];

const recentActivities = [
  { id: '1', type: 'food' as ServiceType, title: 'Order from Bella Italia', time: '2 hours ago', status: 'Delivered' },
  { id: '2', type: 'bikes' as ServiceType, title: 'E-Scooter Rental', time: 'Yesterday', status: 'Completed' },
  { id: '3', type: 'parcel' as ServiceType, title: 'Parcel to Main St', time: '3 days ago', status: 'Delivered' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="FetchIt services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Your Local Super App</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Everything You Need,
              <br />
              <span className="text-gradient">Delivered Fast</span>
            </h1>
            <p className="text-lg text-white/80">
              Food, groceries, rides, parcels, and more — all in one app.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-card rounded-xl border border-border p-4 text-center shadow-lg">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">6 Services</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center shadow-lg">
            <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">30 min avg</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center shadow-lg">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Citywide</p>
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Our Services</h2>
            <p className="text-muted-foreground">What can we help you with today?</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              description={service.description}
              route={service.route}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <p className="text-muted-foreground">Your latest orders and bookings</p>
          </div>
        </div>

        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-4 flex items-center justify-between hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activity.type === 'food' ? 'bg-primary/10 text-primary' :
                  activity.type === 'bikes' ? 'bg-emerald-100 text-emerald-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {activity.type === 'food' ? '🍔' : activity.type === 'bikes' ? '🚴' : '📦'}
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                {activity.status}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 md:p-8 text-primary-foreground"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">First Order Free Delivery!</h3>
              <p className="text-primary-foreground/80">Use code FETCHIT at checkout</p>
            </div>
            <span className="text-4xl">🎉</span>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">⚡</span>
              </div>
              <span className="font-bold text-xl">FetchIt</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 FetchIt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

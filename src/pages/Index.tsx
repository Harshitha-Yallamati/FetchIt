// ============================================
// FetchIt Home Page - Service Hub
// Modern mobile-first home screen
// ============================================

import { motion } from 'framer-motion';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { SearchBar } from '@/components/home/SearchBar';
import { CategoryRow } from '@/components/home/CategoryRow';
import { SectionHeader } from '@/components/home/SectionHeader';
import { FoodCard } from '@/components/home/FoodCard';
import { GroceryCard } from '@/components/home/GroceryCard';
import { ParcelCard } from '@/components/home/ParcelCard';
import { MedicineCard } from '@/components/home/MedicineCard';
import { BikeRentalCard } from '@/components/home/BikeRentalCard';
import { TiffinCard } from '@/components/home/TiffinCard';
import { BottomNav } from '@/components/home/BottomNav';
import { 
  foodItems, 
  groceryItems, 
  parcelTypes, 
  medicineItems, 
  bikeRentals, 
  tiffinServices 
} from '@/data/homeFeed';

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Section with Gradient */}
      <div className="bg-gradient-to-b from-primary/10 to-background px-4 pt-6 pb-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">⚡</span>
          </div>
          <span className="font-bold text-xl">FetchIt</span>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SearchBar />
        </motion.div>

        {/* Category Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <CategoryRow />
        </motion.div>
      </div>

      {/* Content Sections */}
      <div className="px-4 space-y-8 mt-6">
        {/* Foods Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionHeader title="🍔 Foods" seeAllLink="/food" />
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-4">
              {foodItems.map((item) => (
                <FoodCard key={item.id} {...item} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.section>

        {/* Groceries Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionHeader title="🥦 Groceries" seeAllLink="/grocery" />
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-4">
              {groceryItems.map((item) => (
                <GroceryCard key={item.id} {...item} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.section>

        {/* Parcels Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SectionHeader title="📦 Parcels" subtitle="Send anything nearby" seeAllLink="/parcel" />
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-4">
              {parcelTypes.map((item) => (
                <ParcelCard key={item.type} {...item} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.section>

        {/* Medicines Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <SectionHeader title="💊 Medicines" seeAllLink="/medicine" />
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-4">
              {medicineItems.map((item) => (
                <MedicineCard key={item.id} {...item} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.section>

        {/* Bike Rentals Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <SectionHeader title="🏍️ Bike Rentals" subtitle="Rent bikes nearby" seeAllLink="/bikes" />
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-4">
              {bikeRentals.map((item) => (
                <BikeRentalCard key={item.id} {...item} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.section>

        {/* Tiffin Services Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <SectionHeader title="🍱 Tiffin Services" subtitle="Home-style meals" seeAllLink="/food" />
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-4">
              {tiffinServices.map((item) => (
                <TiffinCard key={item.id} {...item} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.section>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;

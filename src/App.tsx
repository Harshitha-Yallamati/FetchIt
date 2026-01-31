import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Core contexts
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
// Service contexts
import { GroceryCartProvider } from "@/context/GroceryCartContext";
import { BikeRentalProvider } from "@/context/BikeRentalContext";
import { ParcelProvider } from "@/context/ParcelContext";
import { HomeServicesProvider } from "@/context/HomeServicesContext";
import { MedicineProvider } from "@/context/MedicineContext";
// Pages
import Index from "./pages/Index";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
// Food Delivery
import FoodDelivery from "./pages/FoodDelivery";
// Bike Rental
import BikeRental from "./pages/BikeRental";
// Parcel
import ParcelDelivery from "./pages/ParcelDelivery";
// Grocery
import GroceryPage from "./pages/GroceryPage";
import GroceryStore from "./pages/GroceryStore";
// Home Services
import HomeServicesPage from "./pages/HomeServicesPage";
// Medicine
import MedicinePage from "./pages/MedicinePage";
import PharmacyDetail from "./pages/PharmacyDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <GroceryCartProvider>
              <BikeRentalProvider>
                <ParcelProvider>
                  <HomeServicesProvider>
                    <MedicineProvider>
                      <Toaster />
                      <Sonner />
                      <BrowserRouter>
                        <Routes>
                          {/* Home / Service Hub */}
                          <Route path="/" element={<Index />} />
                          
                          {/* Food Delivery */}
                          <Route path="/food" element={<FoodDelivery />} />
                          <Route path="/restaurant/:id" element={<Restaurant />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/orders/:orderId" element={<Orders />} />
                          
                          {/* Bike & Scooter Rentals */}
                          <Route path="/bikes" element={<BikeRental />} />
                          
                          {/* Parcel & Courier */}
                          <Route path="/parcel" element={<ParcelDelivery />} />
                          
                          {/* Grocery */}
                          <Route path="/grocery" element={<GroceryPage />} />
                          <Route path="/grocery/:id" element={<GroceryStore />} />
                          
                          {/* Home Services */}
                          <Route path="/services" element={<HomeServicesPage />} />
                          
                          {/* Medicine */}
                          <Route path="/medicine" element={<MedicinePage />} />
                          <Route path="/medicine/:id" element={<PharmacyDetail />} />
                          
                          {/* Auth */}
                          <Route path="/auth" element={<Auth />} />
                          
                          {/* Catch-all */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </BrowserRouter>
                    </MedicineProvider>
                  </HomeServicesProvider>
                </ParcelProvider>
              </BikeRentalProvider>
            </GroceryCartProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

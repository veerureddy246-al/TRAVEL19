import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';

// Lazy-loaded page components for optimal bundle performance & code-splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const DestinationPage = lazy(() => import('./pages/DestinationPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const PackageDetailsPage = lazy(() => import('./pages/PackageDetailsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const HotelsPage = lazy(() => import('./pages/HotelsPage'));
const ActivitiesPage = lazy(() => import('./pages/ActivitiesPage'));
const ItineraryPage = lazy(() => import('./pages/ItineraryPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Loading Ventoura Travel...</span>
  </div>
);

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleOpenBooking = (data = null) => {
    setBookingData(data);
    setIsBookingOpen(true);
  };
  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingData(null);
  };

  const handleOpenAuth = () => setIsAuthOpen(true);
  const handleCloseAuth = () => setIsAuthOpen(false);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-light-bg text-charcoal font-sans antialiased selection:bg-primary-light selection:text-primary relative overflow-x-hidden">
        
        {/* Navigation Header */}
        <Navbar onOpenBooking={handleOpenBooking} onOpenAuth={handleOpenAuth} />

        {/* Main Page Router View with Suspense Code-Splitting */}
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} onOpenAuth={handleOpenAuth} />} />
              <Route path="/destination" element={<DestinationPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/packages" element={<PackagesPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/package/:id" element={<PackageDetailsPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/hotels" element={<HotelsPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/activities" element={<ActivitiesPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/itinerary" element={<ItineraryPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Modals */}
        <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} initialData={bookingData} />
        <AuthModal isOpen={isAuthOpen} onClose={handleCloseAuth} />

      </div>
    </AuthProvider>
  );
}

export default App;

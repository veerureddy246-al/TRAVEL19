import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import SearchEngineWidget from '../components/SearchEngineWidget';
import OffersCarousel from '../components/OffersCarousel';
import { Compass, Star, MapPin, Calendar, ArrowRight, ShieldCheck, Heart, Users, Plane, CheckCircle2, PhoneCall, Smartphone, ChevronDown, ChevronUp, Tag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import FoldText from './FoldText';


const defaultDestinations = [
  {
    _id: 'goa-1',
    title: 'Goa Sun & Sea Beach Escape',
    city: 'Goa',
    country: 'India',
    rating: 4.9,
    startingPrice: 14999,
    days: 5,
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'North & South Goa beach tour, private yacht sunset cruise, casino pass, and beachfront luxury resort stays.'
  },
  {
    _id: 'kashmir-2',
    title: 'Kashmir Paradise Valley & Gulmarg',
    city: 'Srinagar & Gulmarg',
    country: 'India',
    rating: 4.95,
    startingPrice: 24500,
    days: 6,
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    description: 'Dal Lake luxury Shikara ride, luxury houseboat stay, Gulmarg Gondola cable car ride, and Pahalgam valley.'
  },
  {
    _id: 'kerala-3',
    title: 'Kerala Backwaters & Munnar Tea Gardens',
    city: 'Alleppey & Munnar',
    country: 'India',
    rating: 4.92,
    startingPrice: 18999,
    days: 5,
    category: 'Honeymoon',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    description: 'Private air-conditioned houseboat cruise, spice plantation tours, Munnar tea hills, and Ayurvedic spa.'
  },
  {
    _id: 'rajasthan-4',
    title: 'Royal Rajasthan Forts & Desert Safari',
    city: 'Jaipur & Udaipur',
    country: 'India',
    rating: 4.94,
    startingPrice: 28900,
    days: 7,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    description: 'Palace stays in Jaipur & Udaipur, Lake Pichola boat ride, Thar desert glamping, and camel safari.'
  },
  {
    _id: 'maldives-5',
    title: 'Maldives Overwater Villa Paradise',
    city: 'Baa Atoll',
    country: 'Maldives',
    rating: 4.99,
    startingPrice: 65000,
    days: 5,
    category: 'Luxury Island',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    description: 'All-inclusive overwater villa with private pool, seaplane transfers, stingray feeding, and reef snorkeling.'
  },
  {
    _id: 'bali-6',
    title: 'Bali Tropical Island & Temple Odyssey',
    city: 'Ubud & Seminyak',
    country: 'Indonesia',
    rating: 4.91,
    startingPrice: 38900,
    days: 6,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Private pool villa stay in Ubud, Tanah Lot sunset, Uluwatu monkey temple pass, and Nusa Penida island tour.'
  }
];

const featuredPackages = [
  {
    _id: 'pkg-kashmir-6d',
    title: 'Flagship Kashmir Paradise & Gulmarg Gondola',
    destination: 'Srinagar, Gulmarg & Pahalgam',
    duration: '6 Days / 5 Nights',
    rating: 4.95,
    price: 24500,
    badge: 'BEST SELLER',
    highlights: ['Houseboat Stay', 'Gondola Pass Included', 'Private Cab Transfer'],
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    _id: 'pkg-goa-5d',
    title: 'Goa Luxury Beach Resort & Sunset Yacht Cruise',
    destination: 'North & South Goa',
    duration: '5 Days / 4 Nights',
    rating: 4.9,
    price: 14999,
    badge: '15% OFF',
    highlights: ['5-Star Beachfront Hotel', 'Yacht Cruise Pass', 'Free Breakfast'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    _id: 'pkg-maldives-5d',
    title: 'Maldives All-Inclusive Overwater Villa',
    destination: 'Baa Atoll, Maldives',
    duration: '5 Days / 4 Nights',
    rating: 4.99,
    price: 65000,
    badge: 'LUXURY VIP',
    highlights: ['Private Water Pool Villa', 'Seaplane Flight', 'Submerged Dining'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80'
  }
];

const travelCategories = [
  { name: 'Beach Escapes', count: '140+ Resorts', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', cat: 'Beach' },
  { name: 'Mountain Retreats', count: '95+ Lodges', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', cat: 'Mountains' },
  { name: 'Adventure & Wildlife', count: '60+ Tours', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80', cat: 'Adventure' },
  { name: 'Family Holidays', count: '210+ Packages', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80', cat: 'Family' },
  { name: 'Honeymoon Specials', count: '85+ Villas', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80', cat: 'Honeymoon' },
  { name: 'Cultural Heritage', count: '110+ Palaces', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80', cat: 'Cultural' }
];

const popularSearches = [
  { from: 'New Delhi', to: 'Goa', price: '₹3,499', type: 'Flight' },
  { from: 'Mumbai', to: 'Dubai', price: '₹8,999', type: 'Flight' },
  { from: 'Bengaluru', to: 'Maldives', price: '₹14,500', type: 'Flight' },
  { from: 'New Delhi', to: 'Srinagar', price: '₹4,200', type: 'Flight' },
  { from: 'Goa', to: 'Taj Exotica Resort', price: '₹12,499/night', type: 'Hotel' },
  { from: 'Gulmarg', to: 'The Khyber Resort', price: '₹18,000/night', type: 'Hotel' }
];

const homeFaqs = [
  { q: 'Why should I book flight tickets and holidays on Ventoura?', a: 'Ventoura guarantees the lowest prices with zero hidden convenience fees, 100% verified hotels, instant flight e-tickets, and round-the-clock hotline assistance.' },
  { q: 'What is Ventoura\'s Zero Penalty Cancellation policy?', a: 'Under selected Zero Penalty fares, you can cancel your flight or hotel reservation up to 24 hours prior to travel for a 100% refund with no processing fee.' },
  { q: 'How do I redeem discount promo codes during checkout?', a: 'Simply copy any active promo code like VENTOURAFIRST or HOLIDAYSPECIAL from our offers carousel and paste it into the promo code field during step 2 of checkout.' }
];

const HomePage = ({ onOpenBooking, onOpenAuth }) => {
  const { data: fetchDest } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => (await API.get('/destinations')).data?.data || []
  });

  const { data: fetchCMS } = useQuery({
    queryKey: ['cmsSettings'],
    queryFn: async () => (await API.get('/cms')).data?.data || null
  });

  const destinations = (fetchDest && fetchDest.length > 0) ? fetchDest : defaultDestinations;
  const cms = fetchCMS || {};
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="space-y-14 pb-16 bg-light-bg">
      
      {/* SECTION 2: Hero / Search Header */}
      <section className="relative bg-gradient-to-r from-charcoal via-slate-900 to-charcoal text-white pt-12 pb-28 sm:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('${cms.heroBgImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80'}')` }}
        ></div>

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary-light text-xs font-bold uppercase tracking-widest">
            <Plane className="w-3.5 h-3.5" />
            {cms.heroBadge || "India's Leading Travel Booking Network"}
          </div>

          <FoldText
            text={cms.heroHeading || "Book Flights, Hotels & Holidays at Guaranteed Best Rates"}
            splitBy="char"
            hinge="top"
            trigger="mount"
            duration={0.65}
            stagger={0.045}
            ease="power3.out"
            perspective={700}
            creaseShading={0.55}
            fontSize={80}
            fontWeight={800}
            color="#f7f2e8"
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight"
          />

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            {cms.heroSubheading || "Join over 2.5 Million happy travelers who enjoy zero cancellation penalties, 100% verified hotels, and instant booking vouchers."}
          </p>
        </div>
      </section>

      {/* SECTION 3: Travel Service Tabs + Search Engine Widget */}
      <section className="px-4 sm:px-6 lg:px-8">
        <SearchEngineWidget onOpenBooking={onOpenBooking} />
      </section>

      {/* SECTION 4: Offers / Specials Carousel */}
      <OffersCarousel />

      {/* SECTION 5: Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Top Rated Locations</span>
            <FoldText as="h2" className="text-2xl sm:text-4xl font-extrabold text-charcoal">
              Popular Destinations & Escapes
            </FoldText>
          </div>
          <Link
            to="/destination"
            className="text-xs font-bold text-primary hover:text-primary-dark uppercase tracking-wider flex items-center gap-1.5"
          >
            Explore All Destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, idx) => (
            <div
              key={dest._id || idx}
              className="bg-white rounded-2xl overflow-hidden border border-border-color shadow-card card-hover flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-charcoal/80 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {dest.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white text-charcoal text-xs font-bold shadow flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {dest.rating || 4.9}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{dest.city}, {dest.country}</span>
                    <span className="mx-1">•</span>
                    <span>{dest.days} Days / {dest.days - 1} Nights</span>
                  </div>

                  <h3 className="text-xl font-bold text-charcoal hover:text-primary transition-colors">
                    {dest.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Starting From</span>
                    <div className="text-xl font-black text-primary">
                      ₹{dest.startingPrice?.toLocaleString('en-IN') || '14,999'} <span className="text-xs font-normal text-slate-500">/ person</span>
                    </div>
                  </div>

                  <Link
                    to="/destination"
                    className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow transition-all"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Featured Packages */}
      <section className="bg-white py-12 border-y border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">All-Inclusive Holidays</span>
              <FoldText as="h2" className="text-2xl sm:text-4xl font-extrabold text-charcoal">
                Featured Tour Packages
              </FoldText>
            </div>
            <Link
              to="/packages"
              className="text-xs font-bold text-primary hover:text-primary-dark uppercase tracking-wider flex items-center gap-1.5"
            >
              View All Tour Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <div key={pkg._id} className="bg-light-bg rounded-2xl overflow-hidden border border-border-color shadow-card flex flex-col justify-between">
                <div className="relative h-48">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-wider rounded-md shadow">
                    {pkg.badge}
                  </span>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-md text-xs font-bold text-charcoal flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {pkg.rating}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-500">{pkg.destination} • {pkg.duration}</span>
                    <h3 className="text-lg font-bold text-charcoal line-clamp-1">{pkg.title}</h3>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pkg.highlights.map((h, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white text-[10px] font-bold text-slate-600 border border-slate-200">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Price per Person</span>
                      <span className="text-xl font-black text-primary">₹{pkg.price.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/package/${pkg._id}`}
                        className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-charcoal font-bold text-xs"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => onOpenBooking(pkg)}
                        className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Travel Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Explore By Theme</span>
          <FoldText as="h2" className="text-2xl sm:text-3xl font-extrabold text-charcoal">
            Browse Popular Travel Categories
          </FoldText>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {travelCategories.map((cat, idx) => (
            <Link
              key={idx}
              to="/destination"
              className="group relative h-40 rounded-2xl overflow-hidden shadow-md flex items-end p-4 border border-border-color"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent"></div>
              <div className="relative z-10 text-white space-y-0.5">
                <h4 className="text-sm font-bold leading-tight group-hover:text-primary-light transition-colors">{cat.name}</h4>
                <span className="text-[11px] text-slate-300 font-medium block">{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 8: Popular Routes / Travel Searches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border-color shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-charcoal flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Popular Travel Routes & Flight Fares
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {popularSearches.map((s, i) => (
              <Link
                key={i}
                to="/"
                className="p-3 bg-light-bg rounded-xl border border-slate-200 hover:border-primary transition-colors space-y-1 block"
              >
                <span className="px-1.5 py-0.5 bg-primary/10 text-primary font-bold rounded text-[10px] uppercase">{s.type}</span>
                <div className="font-extrabold text-charcoal">{s.from} → {s.to}</div>
                <div className="text-primary font-black">{s.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Why Choose Us */}
      <section className="bg-white border-y border-border-color py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">The Ventoura Guarantee</span>
            <FoldText as="h2" className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-1">
              Why Millions Trust Ventoura Travel Agency
            </FoldText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Best Price Guarantee', desc: 'Lowest fare matching across domestic and international routes.' },
              { icon: CheckCircle2, title: '100% Verified Stays', desc: 'Every hotel is inspected for cleanliness, safety, and luxury standards.' },
              { icon: PhoneCall, title: '24x7 Hotline Assistance', desc: 'Instant support for booking changes, cancellations, and inquiries.' },
              { icon: Plane, title: 'Zero Cancellation Penalty', desc: 'Hassle-free zero fee cancellations on eligible flight & hotel fares.' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-light-bg border border-border-color space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-charcoal">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: App / Travel Promotion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-charcoal to-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl relative z-10">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30 inline-flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" /> Download Mobile App
            </span>
            <FoldText as="h2" className="text-3xl sm:text-4xl font-black">
              Get Extra <span className="text-primary">₹1,500 Off</span> On App Bookings
            </FoldText>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Track live flight statuses, download offline e-tickets, receive price drop alerts, and unlock exclusive mobile-only deals on the Ventoura App.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-xs font-bold text-white">
                 iOS App Store
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-xs font-bold text-white">
                ▶ Google Play
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl text-charcoal text-center space-y-3 shrink-0 shadow-xl border border-white/20">
            <div className="w-32 h-32 bg-slate-100 rounded-xl mx-auto flex items-center justify-center font-bold text-xs text-slate-400 border border-slate-300">
              [Scan QR Code]
            </div>
            <span className="text-xs font-bold text-charcoal block">Scan to Download App</span>
          </div>
        </div>
      </section>

      {/* SECTION 11: Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Traveler Feedback</span>
          <FoldText as="h2" className="text-2xl sm:text-3xl font-extrabold text-charcoal">
            Verified Customer Stories
          </FoldText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Ananya Sharma', location: 'Delhi', text: 'Booked a Kashmir package with Ventoura. Houseboat stay and Gondola passes were seamlessly arranged. Outstanding service!' },
            { name: 'Vikram & Meera', location: 'Mumbai', text: 'The Goa resort deal was super affordable. Customer support responded in 2 minutes when we modified our dates.' },
            { name: 'Rohan Patel', location: 'Bengaluru', text: 'Ventoura is my go-to travel portal. Best prices and instant booking vouchers every single time.' }
          ].map((rev, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-border-color shadow-card space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">"{rev.text}"</p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-charcoal">{rev.name}</span>
                <span className="text-slate-400 font-normal">{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 12: FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Help Center</span>
          <FoldText as="h2" className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-1">
            Frequently Asked Questions
          </FoldText>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-charcoal hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 13: SEO Travel Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl border border-border-color space-y-4 text-xs text-slate-600 leading-relaxed">
          <h3 className="text-lg font-bold text-charcoal">Why Ventoura is India's Premier Online Travel Agency</h3>
          <p>
            Ventoura is your trusted one-stop travel platform for booking domestic and international flights, verified hotel stays, holiday packages, bus tickets, and sightseeing experiences. Whether you are planning a beach vacation in Goa, a luxury overwater villa retreat in the Maldives, a heritage palace tour in Rajasthan, or a snow-capped mountain holiday in Kashmir, Ventoura brings you the best prices and seamless booking convenience.
          </p>
          <p>
            Enjoy transparent pricing with no hidden charges, zero penalty cancellation options, instant e-tickets delivered to your phone, and 24x7 dedicated customer concierge support. Book your next journey with Ventoura today and travel with complete confidence!
          </p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;

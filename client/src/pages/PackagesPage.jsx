import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Star, MapPin, ArrowRight, ShieldCheck, CheckCircle2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import FoldText from './FoldText';


const defaultPackages = [
  {
    _id: 'pkg-kashmir-6d',
    title: 'Flagship Kashmir Paradise & Gulmarg Gondola',
    destination: 'Srinagar, Gulmarg & Pahalgam',
    duration: '6 Days / 5 Nights',
    rating: 4.95,
    price: 24500,
    badge: 'BEST SELLER',
    category: 'Mountains',
    highlights: ['Houseboat Stay', 'Gondola Pass Included', 'Private Cab Transfer', 'Shikara Ride'],
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    description: 'Experience the crown jewel of India with luxury houseboat stays on Dal Lake, high-altitude Gondola cable car ride in Gulmarg, and scenic saffron valley tours.'
  },
  {
    _id: 'pkg-goa-5d',
    title: 'Goa Luxury Beach Resort & Sunset Yacht Cruise',
    destination: 'North & South Goa',
    duration: '5 Days / 4 Nights',
    rating: 4.9,
    price: 14999,
    badge: '15% OFF',
    category: 'Beach',
    highlights: ['5-Star Beachfront Hotel', 'Private Yacht Cruise', 'Buffet Breakfast', 'Casino Entry Pass'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'Relax on pristine golden sands, enjoy private sunset yacht sailing on the Mandovi river, and stay at 5-star beachfront resorts.'
  },
  {
    _id: 'pkg-maldives-5d',
    title: 'Maldives All-Inclusive Overwater Villa',
    destination: 'Baa Atoll, Maldives',
    duration: '5 Days / 4 Nights',
    rating: 4.99,
    price: 65000,
    badge: 'LUXURY VIP',
    category: 'Honeymoon',
    highlights: ['Private Water Pool Villa', 'Seaplane Flight', 'Submerged Reef Dining', 'Unlimited Drinks'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    description: 'Unwind in glass-floored overwater bungalows with private infinity pools, seaplane transfers, and world-class coral reef snorkeling.'
  },
  {
    _id: 'pkg-kerala-5d',
    title: 'Kerala Backwater Houseboat & Munnar Tea Estate',
    destination: 'Alleppey & Munnar',
    duration: '5 Days / 4 Nights',
    rating: 4.92,
    price: 18999,
    badge: 'POPULAR',
    category: 'Nature',
    highlights: ['AC Deluxe Houseboat', 'Munnar Tea Tour', 'Ayurvedic Massage', 'Spice Plantation'],
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    description: 'Cruise through peaceful emerald backwaters, stay on luxury houseboats, and rejuvenate with traditional Kerala Ayurvedic spa massages.'
  },
  {
    _id: 'pkg-rajasthan-7d',
    title: 'Royal Rajasthan Palaces & Thar Desert Glamping',
    destination: 'Jaipur, Jodhpur & Udaipur',
    duration: '7 Days / 6 Nights',
    rating: 4.94,
    price: 28900,
    badge: 'HERITAGE',
    category: 'Cultural',
    highlights: ['Palace Heritage Stay', 'Thar Desert Glamping', 'Camel Safari', 'Fort Guided Tour'],
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    description: 'Live like royalty in heritage palace hotels, witness the grand Amber Fort in Jaipur, and sleep under desert stars in luxury Thar tents.'
  },
  {
    _id: 'pkg-bali-6d',
    title: 'Bali Villa Sanctuary & Temple Odyssey',
    destination: 'Ubud & Seminyak, Bali',
    duration: '6 Days / 5 Nights',
    rating: 4.91,
    price: 38900,
    badge: 'HOT DEAL',
    category: 'Adventure',
    highlights: ['Private Pool Villa', 'Nusa Penida Boat Tour', 'Uluwatu Temple Pass', 'Floating Breakfast'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Explore Bali’s lush rice terraces, swing over Ubud jungle valleys, and enjoy private pool villa luxury in Seminyak.'
  }
];

const PackagesPage = ({ onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const { data: fetchPkgs } = useQuery({
    queryKey: ['packagesPageData'],
    queryFn: async () => (await API.get('/packages')).data?.data || []
  });

  const packages = (fetchPkgs && fetchPkgs.length > 0) ? fetchPkgs : defaultPackages;

  const categories = ['All', 'Beach', 'Mountains', 'Honeymoon', 'Nature', 'Cultural', 'Adventure'];

  const filtered = packages.filter((pkg) => {
    const matchesCat = selectedCat === 'All' || pkg.category === selectedCat;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pkg.destination?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-8 pb-16 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Title */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30">
              All-Inclusive Tour Packages
            </span>
            <FoldText as="h1" className="text-3xl sm:text-5xl font-black text-white">
              Trending Travel <span className="text-primary">Packages</span>
            </FoldText>
            <p className="text-sm text-slate-300">
              Browse curated holiday packages featuring flights, luxury accommodations, guided sightseeing, and zero cancellation penalty options.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-border-color shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCat === c ? 'bg-primary text-white shadow' : 'bg-light-bg text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search package name or city..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border-color text-xs font-medium text-charcoal focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-2xl overflow-hidden border border-border-color shadow-card card-hover flex flex-col justify-between">
              
              <div className="relative h-56 overflow-hidden">
                <img src={pkg.image || pkg.featuredImage} alt={pkg.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-wider rounded-md shadow">
                  {pkg.badge || 'EXCLUSIVE'}
                </span>
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-md text-xs font-bold text-charcoal flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {pkg.rating}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> {pkg.destination}
                    <span className="mx-1">•</span>
                    <span>{pkg.duration}</span>
                  </div>

                  <h3 className="text-lg font-bold text-charcoal hover:text-primary transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(pkg.highlights || []).map((h, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-light-bg text-[10px] font-bold text-slate-600 border border-slate-200">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Starting Price</span>
                    <span className="text-xl font-black text-primary">₹{(pkg.price || pkg.startingPrice)?.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/package/${pkg._id}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-charcoal font-bold text-xs"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => onOpenBooking(pkg)}
                      className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PackagesPage;

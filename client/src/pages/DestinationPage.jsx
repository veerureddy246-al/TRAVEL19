import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { MapPin, Search, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import FoldText from './FoldText';

const defaultDestinationsList = [
  {
    _id: 'pkg-goa-5d',
    title: 'Goa Sun & Sea Beach Escape',
    city: 'Goa',
    country: 'India',
    rating: 4.9,
    startingPrice: 14999,
    days: 5,
    category: 'Beach',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'North & South Goa beach tour, private yacht sunset cruise, casino pass, and beachfront luxury resort stays.'
  },
  {
    _id: 'pkg-kashmir-6d',
    title: 'Kashmir Paradise Valley & Gulmarg',
    city: 'Srinagar & Gulmarg',
    country: 'India',
    rating: 4.95,
    startingPrice: 24500,
    days: 6,
    category: 'Mountains',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    description: 'Dal Lake luxury Shikara ride, luxury houseboat stay, Gulmarg Gondola cable car ride, and Pahalgam valley.'
  },
  {
    _id: 'pkg-kerala-5d',
    title: 'Kerala Backwaters & Munnar Tea Plantation',
    city: 'Alleppey & Munnar',
    country: 'India',
    rating: 4.92,
    startingPrice: 18999,
    days: 5,
    category: 'Honeymoon',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    description: 'Private air-conditioned houseboat cruise, spice plantation tours, Munnar tea hills, and Ayurvedic spa.'
  },
  {
    _id: 'pkg-rajasthan-7d',
    title: 'Royal Rajasthan Forts, Palaces & Thar Desert',
    city: 'Jaipur & Udaipur',
    country: 'India',
    rating: 4.94,
    startingPrice: 28900,
    days: 7,
    category: 'Cultural',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    description: 'Palace stays in Jaipur & Udaipur, Lake Pichola boat ride, Thar desert glamping, and camel safari.'
  },
  {
    _id: 'pkg-maldives-5d',
    title: 'Maldives Overwater Villa Resort Escape',
    city: 'Baa Atoll',
    country: 'Maldives',
    rating: 4.99,
    startingPrice: 65000,
    days: 5,
    category: 'Beach',
    type: 'International',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    description: 'All-inclusive overwater villa with private pool, seaplane transfers, stingray feeding, and reef snorkeling.'
  },
  {
    _id: 'pkg-bali-6d',
    title: 'Bali Island, Rice Terraces & Temple Tour',
    city: 'Ubud & Seminyak',
    country: 'Indonesia',
    rating: 4.91,
    startingPrice: 38900,
    days: 6,
    category: 'Adventure',
    type: 'International',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Private pool villa stay in Ubud, Tanah Lot sunset, Uluwatu monkey temple pass, and Nusa Penida island tour.'
  }
];

const DestinationPage = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: fetchDest } = useQuery({
    queryKey: ['destinationsPageList'],
    queryFn: async () => (await API.get('/destinations')).data?.data || []
  });

  const destinations = (fetchDest && fetchDest.length > 0) ? fetchDest : defaultDestinationsList;

  const categories = ['All', 'Domestic', 'International', 'Beach', 'Mountains', 'Adventure', 'Family', 'Honeymoon', 'Cultural'];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = selectedCategory === 'All' || 
                            dest.category === selectedCategory || 
                            dest.type === selectedCategory;
    const matchesSearch = dest.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.country?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-8 pb-16 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Title */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30">
              Handcrafted Travel Experiences
            </span>
            <FoldText as="h1" className="text-3xl sm:text-5xl font-black text-white">
              Explore Top <span className="text-primary">Destinations</span>
            </FoldText>
            <p className="text-sm text-slate-300">
              Discover breathtaking domestic and international destinations with original itineraries, verified stays, and guaranteed low rates.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-border-color shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow'
                    : 'bg-light-bg text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination or country..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border-color text-xs font-medium text-charcoal focus:outline-none focus:border-primary"
            />
          </div>

        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest, idx) => (
            <div
              key={dest._id || idx}
              className="bg-white rounded-2xl overflow-hidden border border-border-color shadow-card card-hover flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={dest.image || dest.featuredImage}
                  alt={dest.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-charcoal/80 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {dest.category || dest.type || 'Travel'}
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
                    <span>{dest.city || 'India'}, {dest.country || 'India'}</span>
                    <span className="mx-1">•</span>
                    <span>{dest.days || 5} Days / {(dest.days || 5) - 1} Nights</span>
                  </div>

                  <h3 className="text-xl font-bold text-charcoal hover:text-primary transition-colors">
                    {dest.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Starting Price</span>
                    <div className="text-xl font-black text-primary">
                      ₹{(dest.startingPrice || dest.price)?.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">/ person</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/package/${dest._id || 'pkg-kashmir-6d'}`}
                      className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow transition-all flex items-center gap-1"
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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

export default DestinationPage;

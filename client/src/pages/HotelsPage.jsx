import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { MapPin, Star, Utensils, Wifi, Waves, Coffee, ShieldCheck, Search } from 'lucide-react';
import FoldText from './FoldText';


const defaultHotelsList = [
  {
    _id: 'hotel-1',
    name: 'Taj Exotica Resort & Spa, Goa',
    location: 'Benaulim, South Goa',
    price: 18500,
    starRating: 5,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    description: '56-acre Mediterranean-style beachfront resort with private pool villas, Jiva Spa, and fine dining.',
    amenities: ['Private Beach Access', 'Infinity Pool', 'Ayurvedic Spa', 'Free High-Speed WiFi', 'Golf Course']
  },
  {
    _id: 'hotel-2',
    name: 'The Khyber Himalayan Resort & Spa',
    location: 'Gulmarg, Kashmir',
    price: 26000,
    starRating: 5,
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    description: 'Luxury pine wood mountain resort overlooking Apharwat peaks with heated indoor glass pool.',
    amenities: ['Heated Indoor Pool', 'Ski Gear Rental', 'L\'Occitane Spa', 'Mountain View Balconies']
  },
  {
    _id: 'hotel-3',
    name: 'Rambagh Palace - Taj Heritage Hotel',
    location: 'Jaipur, Rajasthan',
    price: 34000,
    starRating: 5,
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    description: 'The Jewel of Jaipur — former royal residence of the Maharaja of Jaipur featuring heritage suites.',
    amenities: ['Royal Peacock Gardens', 'Polo Bar', 'Vintage Car Airport Transfers', 'Butler Service']
  },
  {
    _id: 'hotel-4',
    name: 'Soneva Jani Overwater Villa',
    location: 'Noonu Atoll, Maldives',
    price: 98000,
    starRating: 5,
    heroImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
    description: 'Iconic overwater villas with private water slides directly into turquoise marine lagoon.',
    amenities: ['Private Water Slide', 'Retractable Roof Observatory', 'Private Butler', 'Seaplane Transfer']
  }
];

const HotelsPage = ({ onOpenBooking }) => {
  const [filterRating, setFilterRating] = useState('All');
  const [searchCity, setSearchCity] = useState('');

  const { data: fetchHotels } = useQuery({
    queryKey: ['hotelsList'],
    queryFn: async () => (await API.get('/hotels')).data?.data || []
  });

  const hotels = (fetchHotels && fetchHotels.length > 0) ? fetchHotels : defaultHotelsList;

  const filteredHotels = hotels.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(searchCity.toLowerCase()) ||
                          h.location.toLowerCase().includes(searchCity.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="pt-8 pb-16 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Title */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30">
              Verified Stays Only
            </span>
            <FoldText as="h1" className="text-3xl sm:text-5xl font-black text-white">
              Luxury Hotels & <span className="text-primary">Resorts</span>
            </FoldText>
            <p className="text-sm text-slate-300">
              Book handpicked 5-star hotels, luxury mountain resorts, heritage palaces, and overwater villas with instant confirmation.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-border-color shadow-sm flex items-center justify-between gap-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Filter by hotel name, city, or location..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-color text-xs font-medium text-charcoal focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Hotel Listings */}
        <div className="space-y-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-2xl overflow-hidden border border-border-color shadow-card card-hover grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Image Column */}
              <div className="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={hotel.heroImage || hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-charcoal/80 text-amber-400 text-xs font-bold shadow flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {hotel.starRating || 5} Stars Verified
                </div>
              </div>

              {/* Info Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{hotel.location}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Breakfast Included
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-charcoal hover:text-primary transition-colors">
                    {hotel.name}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {hotel.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {hotel.amenities?.map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-light-bg border border-slate-200 text-[11px] font-semibold text-slate-600"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Price per night</span>
                    <div className="text-2xl font-black text-primary">
                      ₹{hotel.price?.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">+ taxes</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking({ title: hotel.name, price: hotel.price })}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow transition-all"
                  >
                    Reserve Room
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HotelsPage;


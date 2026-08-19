import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Calendar, CheckCircle2, XCircle, ShieldCheck, PhoneCall, Plane, Hotel, Car, HelpCircle, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import FoldText from './FoldText';


const packageDataMap = {
  'pkg-kashmir-6d': {
    _id: 'pkg-kashmir-6d',
    title: 'Flagship Kashmir Paradise Valley & Gulmarg Gondola',
    destination: 'Srinagar, Gulmarg & Pahalgam',
    duration: '6 Days / 5 Nights',
    rating: 4.95,
    reviewsCount: 680,
    price: 24500,
    badge: 'BEST SELLER',
    category: 'Mountains',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=80',
    description: 'Experience Kashmir’s breathtaking beauty with luxury houseboat stays on Dal Lake, high-altitude Gondola cable car ride in Gulmarg, and scenic saffron valley tours.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Srinagar & Dal Lake Shikara Ride', desc: 'Welcome at Srinagar Airport. Transfer to a luxury Mughal houseboat on Dal Lake. Enjoy a romantic 2-hour Shikara sunset ride.' },
      { day: 'Day 2', title: 'Srinagar Sightseeing & Mughal Gardens', desc: 'Visit Shalimar Bagh, Nishat Bagh, Pari Mahal, and the historic Shankaracharya Temple overlooking the city.' },
      { day: 'Day 3', title: 'Excursion to Gulmarg & Gondola Phase 1 & 2', desc: 'Drive to Gulmarg. Ride the famous Gulmarg Gondola cable car up to Apharwat Peak at 13,780 ft. Snow sports and pine forest trail.' },
      { day: 'Day 4', title: 'Scenic Drive to Pahalgam & Betaab Valley', desc: 'Travel to Pahalgam (Valley of Shepherds). Visit saffron fields at Pampore, Avantipur ruins, Betaab Valley, and Aru Valley.' },
      { day: 'Day 5', title: 'Pahalgam River Rafting & Return to Srinagar', desc: 'Enjoy Lidder River white water rafting, pine pony rides, and shopping for Pashmina shawls in local Kashmiri bazaars.' },
      { day: 'Day 6', title: 'Departure from Srinagar Airport', desc: 'Breakfast on the houseboat, souvenir shopping, and transfer to Srinagar Airport for your onward flight home.' }
    ],
    inclusions: [
      '5 Nights Accommodation (3N Hotel + 2N Deluxe Houseboat)',
      'Daily Buffet Breakfast and Gourmet Dinner',
      'Non-AC Private SUV / Sedan Transfer throughout trip',
      'Phase 1 & Phase 2 Gulmarg Gondola Cable Car Pass',
      'Complementary 2-Hour Shikara Sunset Cruise on Dal Lake',
      'Airport Pickup and Dropoff'
    ],
    exclusions: [
      'Roundtrip Airfare / Train Tickets',
      'Personal expenses (Pony rides, camera fees, laundry)',
      'Travel Insurance & Medical Expenses',
      'Any lunches or unmentioned beverages'
    ],
    accommodation: '4-Star Luxury Heritage Hotel in Srinagar & Pahalgam + Super Deluxe AC Houseboat on Dal Lake.',
    transport: 'Private Toyota Innova / Swift Dzire with experienced local driver for all transfers and sightseeing.',
    cancellationPolicy: 'Full 100% refund for cancellations made 15 days before departure date. Zero penalty policy on selected fare types.'
  },
  'pkg-goa-5d': {
    _id: 'pkg-goa-5d',
    title: 'Goa Luxury Beach Resort & Sunset Yacht Cruise',
    destination: 'North & South Goa',
    duration: '5 Days / 4 Nights',
    rating: 4.9,
    reviewsCount: 420,
    price: 14999,
    badge: '15% OFF',
    category: 'Beach',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2000&q=80',
    description: 'Unwind on golden sands, private sunset yacht sailing on Mandovi river, and stay at 5-star beachfront resorts in South Goa.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Goa & Beachfront Welcome', desc: 'Transfer from Dabolim / Mopa Airport to beachfront luxury resort. Free evening at Baga Beach.' },
      { day: 'Day 2', title: 'North Goa Beaches & Fort Aguada', desc: 'Explore Fort Aguada, Calangute, Anjuna, and Vagator beach viewpoints.' },
      { day: 'Day 3', title: 'South Goa Heritage & Private Yacht Cruise', desc: 'Visit Old Goa churches, Basilica of Bom Jesus, and enjoy a private 2-hour sunset yacht sailing.' },
      { day: 'Day 4', title: 'Dudhsagar Waterfalls & Spice Plantation', desc: 'Jeep safari through Mollem National Park to Dudhsagar Waterfalls followed by traditional Goan lunch.' },
      { day: 'Day 5', title: 'Departure', desc: 'Morning spa session, checkout, and airport transfer.' }
    ],
    inclusions: [
      '4 Nights 5-Star Beach Resort Stay',
      'Daily Breakfast & Dinner',
      'Private Yacht Cruise Ticket',
      'Dudhsagar Jeep Safari & Lunch'
    ],
    exclusions: ['Flights', 'Casino Entry Chips', 'Personal Water Sports'],
    accommodation: 'Taj Exotica / Alila Diwa South Goa 5-Star Resort.',
    transport: 'Private AC Sedan with airport transfers.',
    cancellationPolicy: 'Cancel up to 7 days before departure for 100% refund.'
  }
};

const PackageDetailsPage = ({ onOpenBooking }) => {
  const { id } = useParams();
  const pkg = packageDataMap[id] || packageDataMap['pkg-kashmir-6d'];
  const [openItinerary, setOpenItinerary] = useState(0);

  return (
    <div className="pt-6 pb-24 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link to="/packages" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Packages
        </Link>

        {/* Hero Section */}
        <div className="relative h-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-border-color">
          <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-lg shadow">
                {pkg.badge}
              </span>
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {pkg.rating} ({pkg.reviewsCount} reviews)
              </span>
            </div>

            <FoldText as="h1" className="text-2xl sm:text-4xl font-black text-white" text={pkg.title} />

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {pkg.destination}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {pkg.duration}</span>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview */}
            <div className="bg-white p-8 rounded-2xl border border-border-color shadow-sm space-y-3">
              <h2 className="text-xl font-extrabold text-charcoal">Package Overview</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pkg.description}</p>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white p-8 rounded-2xl border border-border-color shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-charcoal">Detailed Day-by-Day Itinerary</h2>
              <div className="space-y-3">
                {pkg.itinerary.map((item, idx) => {
                  const isOpen = openItinerary === idx;
                  return (
                    <div key={idx} className="border border-border-color rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenItinerary(isOpen ? null : idx)}
                        className="w-full p-4 bg-light-bg text-left flex items-center justify-between font-bold text-sm text-charcoal hover:text-primary transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-md bg-primary text-white text-xs font-black">{item.day}</span>
                          <span>{item.title}</span>
                        </span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          {item.desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white p-8 rounded-2xl border border-border-color shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-charcoal">Inclusions & Exclusions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-emerald-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What's Included
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">✓</span> {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-rose-700 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600" /> What's Excluded
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">✕</span> {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Accommodation & Transport */}
            <div className="bg-white p-8 rounded-2xl border border-border-color shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-charcoal">Stay & Transport Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="p-4 rounded-xl bg-light-bg border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-charcoal text-sm">
                    <Hotel className="w-4 h-4 text-primary" /> Verified Hotels
                  </div>
                  <p>{pkg.accommodation}</p>
                </div>

                <div className="p-4 rounded-xl bg-light-bg border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-charcoal text-sm">
                    <Car className="w-4 h-4 text-primary" /> Private Vehicles
                  </div>
                  <p>{pkg.transport}</p>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white p-8 rounded-2xl border border-border-color shadow-sm space-y-3">
              <h2 className="text-xl font-extrabold text-charcoal flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> Cancellation Policy & Refund Terms
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">{pkg.cancellationPolicy}</p>
            </div>

          </div>

          {/* Sticky Booking Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-border-color shadow-xl space-y-6 sticky top-28">
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Price per Adult</span>
                <div className="text-3xl font-black text-primary">₹{pkg.price.toLocaleString('en-IN')}</div>
                <span className="text-[11px] text-emerald-600 font-bold">Inclusive of all taxes & GST</span>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <strong className="text-charcoal">{pkg.duration}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hotels:</span>
                  <strong className="text-charcoal">4-Star & Houseboat</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Transfers:</span>
                  <strong className="text-charcoal">Private Cab Included</strong>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(pkg)}
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all"
              >
                Instant Book Package
              </button>

              <div className="pt-2 text-center text-[11px] text-slate-400 font-medium">
                Need help? Call Toll Free <strong className="text-charcoal">1800-VENTOURA</strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PackageDetailsPage;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Compass, Sparkles, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import FoldText from './FoldText';


const defaultActivitiesList = [
  {
    _id: 'act-1',
    title: 'Private Sunset Yacht Cruise in North Goa',
    location: 'Mandovi River & Panaji Coast',
    price: 4999,
    duration: '3 Hours',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    description: 'Exclusive 3-hour catamaran yacht sailing with live DJ, complimentary champagne, snacks, and sunset photos.',
    highlights: ['Complimentary Wine & Snacks', 'Live Music & DJ', 'Sunset Photography']
  },
  {
    _id: 'act-2',
    title: 'Gulmarg Gondola Phase 1 & Phase 2 Cable Car Pass',
    location: 'Gulmarg Peak, Kashmir',
    price: 3200,
    duration: 'Full Day Pass',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    description: 'Priority VIP cable car tickets ascending to 13,780 ft on Mt. Apharwat for snow skiing and panoramic valley views.',
    highlights: ['VIP Queue Bypass', 'Snow Activity Gear Included', 'Certified Alpine Guide']
  },
  {
    _id: 'act-3',
    title: 'Thar Desert Camel Safari & Dune Bashing',
    location: 'Sam Sand Dunes, Jaisalmer',
    price: 2800,
    duration: '4 Hours (Evening)',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    description: 'Sunset camel ride across golden sand dunes, 4x4 dune bashing, Rajasthani folk dance show, and dinner buffer.',
    highlights: ['4x4 Dune Bashing', 'Folk Dance & Kalbeliya Show', 'Traditional Buffet Dinner']
  },
  {
    _id: 'act-4',
    title: 'Scuba Diving & Coral Reef Exploration',
    location: 'Grande Island, Goa',
    price: 3500,
    duration: '5 Hours',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    description: 'PADI certified instructor guided deep sea dive, underwater HD video recording, banana boat ride, and jet ski pass.',
    highlights: ['PADI Instructor Guided', 'Free Underwater Video', 'Includes 3 Water Sports']
  }
];

const ActivitiesPage = ({ onOpenBooking }) => {
  const { data: fetchActivities } = useQuery({
    queryKey: ['activitiesList'],
    queryFn: async () => (await API.get('/activities')).data?.data || []
  });

  const activities = (fetchActivities && fetchActivities.length > 0) ? fetchActivities : defaultActivitiesList;

  return (
    <div className="pt-8 pb-16 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Title */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30">
              Unforgettable Experiences
            </span>
            <FoldText as="h1" className="text-3xl sm:text-5xl font-black text-white">
              Tours & <span className="text-primary">Activities</span>
            </FoldText>
            <p className="text-sm text-slate-300">
              Book adventure passes, yacht cruises, sightseeing tours, and cultural experiences with instant electronic vouchers.
            </p>
          </div>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((act) => (
            <div
              key={act._id}
              className="bg-white rounded-2xl overflow-hidden border border-border-color shadow-card card-hover flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-charcoal/80 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {act.duration || 'Half Day'}
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-primary text-white text-xs font-bold shadow">
                  ₹{act.price?.toLocaleString('en-IN')} / person
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{act.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-charcoal hover:text-primary transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {act.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {act.highlights?.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-light-bg border border-slate-200 text-[11px] font-semibold text-slate-600 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {h}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking({ title: act.title, price: act.price })}
                  className="w-full py-3.5 mt-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow transition-all"
                >
                  Book Activity Pass
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ActivitiesPage;


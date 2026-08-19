import React from 'react';
import { MapPin, Calendar, CheckCircle2, Clock } from 'lucide-react';
import FoldText from './FoldText';


const defaultItineraryDays = [
  {
    dayNumber: 1,
    location: 'New Delhi — Arrival & City Tour',
    title: 'Welcome to Delhi & Heritage Sightseeing',
    description: 'Arrive at IGI Airport, Delhi. VIP transfer to 5-star hotel. Evening visits to India Gate, Rashtrapati Bhavan, and Qutub Minar followed by welcome dinner.',
    breakfast: 'Airport Lounge / Hotel',
    lunch: 'Imperial Restaurant',
    dinner: 'Bukhara Heritage Grill',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 2,
    location: 'Agra — Taj Mahal at Sunrise',
    title: 'Sunrise at Taj Mahal & Agra Fort',
    description: 'Early morning express train to Agra. Witness breathtaking sunrise over Taj Mahal with expert historian guide. Tour Agra Fort and Mehtab Bagh.',
    breakfast: 'Express Train Breakfast',
    lunch: 'Peshawri Agra',
    dinner: 'Oberoi Amarvilas Rooftop',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 3,
    location: 'Jaipur — Pink City Palaces',
    title: 'Amber Fort & City Palace Jaipur',
    description: 'Drive to Jaipur. Elephant ascent at Amber Fort, visit Hawa Mahal (Palace of Winds), and royal suit tour of Jaipur City Palace.',
    breakfast: 'Hotel Buffet',
    lunch: 'Surya Mahal',
    dinner: 'Suvarna Mahal Palace',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 4,
    location: 'Flight to Srinagar, Kashmir',
    title: 'Flight to Srinagar & Dal Lake Houseboat',
    description: 'Morning flight to Srinagar. Transfer to luxury carved wooden houseboat on Dal Lake. Sunset Shikara ride around Char Chinar.',
    breakfast: 'Jaipur Hotel',
    lunch: 'Kashmiri Wazwan Lunch',
    dinner: 'Houseboat Deck Candlelight',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 5,
    location: 'Gulmarg Snow Peaks & Gondola',
    title: 'Gulmarg Gondola Ride to 13,780 FT',
    description: 'Excursion to Gulmarg. Ride Phase 1 and Phase 2 Gondola cable car to snow-clad Apharwat peak. Skiing and snow trekking options.',
    breakfast: 'Houseboat Special',
    lunch: 'Highland Park Cafe',
    dinner: 'Khyber Resort Fireplace',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 6,
    location: 'Pahalgam Valley & Betaab Valley',
    title: 'Pahalgam Valley & Lidder River Walk',
    description: 'Day trip to Pahalgam (Valley of Shepherds). Visit Betaab Valley, Aru Valley, and enjoy pine forest riverside walk along Lidder river.',
    breakfast: 'Resort Buffet',
    lunch: 'Lidder Riverside Picnic',
    dinner: 'Traditional Wazwan Feast',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80'
  },
  {
    dayNumber: 7,
    location: 'Srinagar to Delhi Departure',
    title: 'Mughal Gardens & Onward Departure',
    description: 'Visit Shalimar Bagh and Nishat Bagh Mughal Gardens. Shopping for Kashmiri Pashmina and saffron before return flight to Delhi.',
    breakfast: 'Houseboat Deck',
    lunch: 'Lal Chowk Grill',
    dinner: 'In-Flight Service',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  }
];

const ItineraryPage = ({ onOpenBooking }) => {
  return (
    <div className="pt-8 pb-16 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Title */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30">
              Flagship 7-Day Experience
            </span>
            <FoldText as="h1" className="text-3xl sm:text-5xl font-black text-white">
              7-Day Golden Triangle & <span className="text-primary">Kashmir Tour</span>
            </FoldText>
            <p className="text-sm text-slate-300">
              Complete day-by-day expedition timeline featuring Taj Mahal, Rajasthan Palaces, Dal Lake Houseboats, and Gulmarg Gondola.
            </p>
          </div>
        </div>

        {/* Days List */}
        <div className="space-y-6">
          {defaultItineraryDays.map((day) => (
            <div
              key={day.dayNumber}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-border-color shadow-card grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-4 relative h-56 rounded-xl overflow-hidden shadow">
                <img src={day.image} alt={day.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-primary text-white font-extrabold text-xs shadow">
                  Day {day.dayNumber}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{day.location}</span>
                </div>

                <h2 className="text-xl font-extrabold text-charcoal">{day.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{day.description}</p>

                <div className="grid grid-cols-3 gap-3 pt-2 text-[11px]">
                  <div className="bg-light-bg p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block font-bold uppercase text-[9px]">Breakfast</span>
                    <span className="font-semibold text-charcoal">{day.breakfast}</span>
                  </div>
                  <div className="bg-light-bg p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block font-bold uppercase text-[9px]">Lunch</span>
                    <span className="font-semibold text-charcoal">{day.lunch}</span>
                  </div>
                  <div className="bg-light-bg p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block font-bold uppercase text-[9px]">Dinner</span>
                    <span className="font-semibold text-charcoal">{day.dinner}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onOpenBooking({ title: '7-Day Golden Triangle & Kashmir Tour', price: 34500 })}
            className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            Book This 7-Day Tour Package (₹34,500)
          </button>
        </div>

      </div>
    </div>
  );
};

export default ItineraryPage;


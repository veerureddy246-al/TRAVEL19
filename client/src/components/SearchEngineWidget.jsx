import React, { useState } from 'react';
import { Plane, Hotel, Compass, Package, Bus, Train, Search, Calendar, Users, MapPin, ArrowRightLeft, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchEngineWidget = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('roundTrip');
  
  // Flights state
  const [fromCity, setFromCity] = useState('New Delhi (DEL)');
  const [toCity, setToCity] = useState('Goa (GOI)');
  const [departDate, setDepartDate] = useState('2026-08-20');
  const [returnDate, setReturnDate] = useState('2026-08-27');
  const [travellers, setTravellers] = useState('1 Adult');
  const [flightClass, setFlightClass] = useState('Economy');

  // Hotels state
  const [hotelDestination, setHotelDestination] = useState('Goa, India');
  const [checkIn, setCheckIn] = useState('2026-08-20');
  const [checkOut, setCheckOut] = useState('2026-08-25');
  const [guests, setGuests] = useState('2 Guests, 1 Room');

  // Holidays state
  const [holidayDest, setHolidayDest] = useState('Kashmir & Ladakh');
  const [holidayDate, setHolidayDate] = useState('2026-09-10');
  const [holidayDuration, setHolidayDuration] = useState('6 Days / 5 Nights');
  const [holidayTravellers, setHolidayTravellers] = useState('2 Adults');
  const [holidayBudget, setHolidayBudget] = useState('₹20,000 - ₹35,000');

  // Packages state
  const [packageDest, setPackageDest] = useState('Maldives Overwater Villa');
  const [packageDuration, setPackageDuration] = useState('5 Days / 4 Nights');
  const [packageTravellers, setPackageTravellers] = useState('2 Adults');
  const [packageBudget, setPackageBudget] = useState('₹50,000+');

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === 'flights') {
      onOpenBooking({
        package: `Flight: ${fromCity} to ${toCity} (${tripType.toUpperCase()}, ${flightClass})`,
        destination: `${toCity}`,
        travelDate: departDate,
        travellers: travellers,
        message: `Flight enquiry for ${travellers} in ${flightClass} class.`
      });
    } else if (activeTab === 'hotels') {
      onOpenBooking({
        package: `Hotel Reservation in ${hotelDestination}`,
        destination: hotelDestination,
        travelDate: checkIn,
        travellers: guests,
        message: `Hotel booking check-in ${checkIn} to check-out ${checkOut} for ${guests}.`
      });
    } else if (activeTab === 'holidays') {
      navigate('/destination');
    } else if (activeTab === 'packages') {
      navigate('/packages');
    } else {
      onOpenBooking({
        package: `${activeTab.toUpperCase()} Travel Booking`,
        destination: toCity,
        travelDate: departDate,
        travellers: travellers,
        message: `Enquiry for ${activeTab} travel from ${fromCity} to ${toCity}.`
      });
    }
  };

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-border-color p-4 sm:p-6 -mt-16 sm:-mt-24 relative z-20">
      {/* Search Engine Tabs */}
      <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('flights')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'flights' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Plane className="w-4 h-4" /> Flights
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hotels')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'hotels' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Hotel className="w-4 h-4" /> Hotels
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('holidays')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'holidays' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Compass className="w-4 h-4" /> Holidays
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('packages')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'packages' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" /> Packages
        </button>
      </div>

      {/* Sub Options for Flights */}
      {activeTab === 'flights' && (
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 text-xs font-semibold text-charcoal">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'oneWay'}
                onChange={() => setTripType('oneWay')}
                className="accent-primary"
              />
              One Way
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'roundTrip'}
                onChange={() => setTripType('roundTrip')}
                className="accent-primary"
              />
              Round Trip
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'multiCity'}
                onChange={() => setTripType('multiCity')}
                className="accent-primary"
              />
              Multi-City
            </label>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <select
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="px-3 py-1 rounded-lg border border-slate-300 bg-light-bg font-semibold focus:outline-none"
            >
              <option value="1 Adult">1 Adult</option>
              <option value="2 Adults">2 Adults</option>
              <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
              <option value="4+ Group">4+ Group</option>
            </select>

            <select
              value={flightClass}
              onChange={(e) => setFlightClass(e.target.value)}
              className="px-3 py-1 rounded-lg border border-slate-300 bg-light-bg font-semibold focus:outline-none"
            >
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business Class</option>
            </select>
          </div>
        </div>
      )}

      {/* Form Submission */}
      <form onSubmit={handleSearch} className="mt-4">
        
        {/* FLIGHTS TAB */}
        {activeTab === 'flights' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-3 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">From</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent font-bold text-charcoal text-sm focus:outline-none"
                  placeholder="Departure Airport"
                />
              </div>
            </div>

            <div className="hidden md:flex justify-center -mx-3 z-10">
              <button
                type="button"
                onClick={swapCities}
                className="p-2 bg-white border border-border-color rounded-full shadow-sm hover:bg-primary-light hover:text-primary text-slate-500 transition-all"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="md:col-span-3 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">To</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent font-bold text-charcoal text-sm focus:outline-none"
                  placeholder="Destination Airport"
                />
              </div>
            </div>

            <div className="md:col-span-2 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Departure</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full bg-transparent font-bold text-charcoal text-xs sm:text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Return</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="date"
                  value={returnDate}
                  disabled={tripType === 'oneWay'}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-transparent font-bold text-charcoal text-xs sm:text-sm focus:outline-none disabled:opacity-40"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Search
              </button>
            </div>
          </div>
        )}

        {/* HOTELS TAB */}
        {activeTab === 'hotels' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-4 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Destination</span>
              <div className="flex items-center gap-2">
                <Hotel className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="text"
                  value={hotelDestination}
                  onChange={(e) => setHotelDestination(e.target.value)}
                  className="w-full bg-transparent font-bold text-charcoal text-sm focus:outline-none"
                  placeholder="Where do you want to stay?"
                />
              </div>
            </div>

            <div className="md:col-span-3 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Check-in</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent font-bold text-charcoal text-xs sm:text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-3 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Check-out / Guests</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent font-bold text-charcoal text-sm focus:outline-none"
                  placeholder="2 Guests, 1 Room"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Find Hotels
              </button>
            </div>
          </div>
        )}

        {/* HOLIDAYS TAB */}
        {activeTab === 'holidays' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-4 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Destination</span>
              <input
                type="text"
                value={holidayDest}
                onChange={(e) => setHolidayDest(e.target.value)}
                className="w-full bg-transparent font-bold text-charcoal text-sm focus:outline-none"
                placeholder="e.g. Kashmir, Goa, Kerala"
              />
            </div>

            <div className="md:col-span-3 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Travel Date & Duration</span>
              <input
                type="text"
                value={holidayDuration}
                onChange={(e) => setHolidayDuration(e.target.value)}
                className="w-full bg-transparent font-bold text-charcoal text-sm focus:outline-none"
              />
            </div>

            <div className="md:col-span-3 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Travellers & Budget</span>
              <input
                type="text"
                value={holidayBudget}
                onChange={(e) => setHolidayBudget(e.target.value)}
                className="w-full bg-transparent font-bold text-charcoal text-sm focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Explore
              </button>
            </div>
          </div>
        )}

        {/* PACKAGES TAB */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-4 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Destination</span>
              <input
                type="text"
                value={packageDest}
                onChange={(e) => setPackageDest(e.target.value)}
                className="w-full bg-transparent font-bold text-charcoal text-sm focus:outline-none"
                placeholder="e.g. Maldives, Bali, Rajasthan"
              />
            </div>

            <div className="md:col-span-3 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Duration & Travellers</span>
              <input
                type="text"
                value={packageDuration}
                onChange={(e) => setPackageDuration(e.target.value)}
                className="w-full bg-transparent font-bold text-charcoal text-sm focus:outline-none"
              />
            </div>

            <div className="md:col-span-3 border border-border-color rounded-xl p-3 hover:border-primary transition-colors bg-light-bg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Budget</span>
              <input
                type="text"
                value={packageBudget}
                onChange={(e) => setPackageBudget(e.target.value)}
                className="w-full bg-transparent font-bold text-charcoal text-sm focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> View Packages
              </button>
            </div>
          </div>
        )}

      </form>

      {/* Trust Badges */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 overflow-x-auto">
        <span className="font-semibold text-charcoal">Why Book With Ventoura?</span>
        <div className="flex items-center gap-6 shrink-0">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Zero Cancellation Fee Options</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"></span> Instant Refund Guarantee</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> 24x7 Customer Care</span>
        </div>
      </div>
    </div>
  );
};

export default SearchEngineWidget;

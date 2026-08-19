import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Plane, Hotel, Compass, Package, MapPin, Tag, PhoneCall, User, Menu, X, ShieldCheck, HelpCircle, ChevronDown, Sparkles, Star } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const DEFAULT_DESTINATIONS = [
  {
    id: 'dest-1',
    title: 'Amalfi Coast Escape',
    city: 'Positano & Amalfi',
    country: 'Italy 🇮🇹',
    startingPrice: 285000,
    image: 'assets/images/amalfi-view-1.jpg',
    description: 'Cliffside pastel villages, private yacht charters to Capri & Michelin dining.'
  },
  {
    id: 'dest-2',
    title: 'Kyoto Zen Retreat',
    city: 'Kyoto',
    country: 'Japan 🇯🇵',
    startingPrice: 320000,
    image: 'assets/images/kyoto-view-1.jpg',
    description: 'Ancient bamboo groves, private tea ceremonies & riverfront ryokan onsens.'
  },
  {
    id: 'dest-3',
    title: 'Maldives Private Haven',
    city: 'Baa Atoll',
    country: 'Maldives 🇲🇻',
    startingPrice: 450000,
    image: 'assets/images/dest-maldives.jpg',
    description: 'Overwater luxury villas with private lagoon pool & seaplane transfers.'
  },
  {
    id: 'dest-4',
    title: 'Bali Tropical Paradise',
    city: 'Ubud & Seminyak',
    country: 'Indonesia 🇮🇩',
    startingPrice: 149900,
    image: 'assets/images/dest-bali.jpg',
    description: 'Private infinity pool villa stays, jungle swings, and sacred ocean temples.'
  },
  {
    id: 'dest-1786535642759',
    title: 'Kerala Backwater Sanctuary',
    city: 'Alleppey & Munnar',
    country: 'India 🇮🇳',
    startingPrice: 180000,
    image: 'assets/images/kerala-view-1.jpg',
    description: 'Private air-conditioned houseboat cruises and Ayurvedic hill resort spa.'
  },
  {
    id: 'dest-6',
    title: 'Santorini Sunset Dreams',
    city: 'Oia & Fira',
    country: 'Greece 🇬🇷',
    startingPrice: 285000,
    image: 'assets/images/dest-santorini.jpg',
    description: 'Caldera cliff luxury cave suites, sunset catamaran cruises & Aegean wine.'
  }
];

const DEFAULT_PACKAGES = [
  {
    _id: 'pkg-kashmir-6d',
    title: 'Flagship Kashmir Paradise & Gondola',
    duration: '6 Days / 5 Nights',
    price: 24500,
    badge: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80',
    highlights: 'Dal Lake Shikara ride, luxury houseboat & Gulmarg Phase 2 Gondola pass.'
  },
  {
    _id: 'pkg-goa-5d',
    title: 'Goa Sun & Sea Beach Escape',
    duration: '5 Days / 4 Nights',
    price: 14999,
    badge: '15% OFF',
    image: 'assets/images/dest-goa.jpg',
    highlights: 'North & South beaches, luxury beachfront resort & private sunset yacht cruise.'
  },
  {
    _id: 'pkg-kerala-5d',
    title: 'Kerala Backwaters & Munnar Tea Hills',
    duration: '5 Days / 4 Nights',
    price: 18999,
    badge: 'POPULAR',
    image: 'assets/images/kerala-view-1.jpg',
    highlights: 'Private AC houseboat stay, spice plantation safari & Ayurvedic spa.'
  },
  {
    _id: 'pkg-rajasthan-7d',
    title: 'Royal Rajasthan Forts & Desert Safari',
    duration: '7 Days / 6 Nights',
    price: 28900,
    badge: 'HERITAGE VIP',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80',
    highlights: 'Jaipur & Udaipur royal palace stays, Lake Pichola boat & Thar camel glamping.'
  },
  {
    _id: 'pkg-maldives-5d',
    title: 'Maldives Overwater Villa Paradise',
    duration: '5 Days / 4 Nights',
    price: 65000,
    badge: 'ALL-INCLUSIVE',
    image: 'assets/images/dest-maldives.jpg',
    highlights: 'Private pool overwater villa, seaplane transfers & coral reef snorkeling.'
  },
  {
    _id: 'pkg-bali-6d',
    title: 'Bali Tropical Island & Temple Odyssey',
    duration: '6 Days / 5 Nights',
    price: 38900,
    badge: 'HOT DEAL',
    image: 'assets/images/dest-bali.jpg',
    highlights: 'Private Ubud pool villa, Tanah Lot sunset & Nusa Penida island speedboat pass.'
  }
];

const Navbar = ({ onOpenBooking, onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'destinations' | 'packages' | null
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0, left: 0, width: 0 });
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const navListRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Fetch live CMS / Database items
  const { data: fetchDest } = useQuery({
    queryKey: ['navDestinations'],
    queryFn: async () => (await API.get('/destinations')).data?.data || []
  });

  const { data: fetchPkg } = useQuery({
    queryKey: ['navPackages'],
    queryFn: async () => (await API.get('/packages')).data?.data || []
  });

  const destinations = (fetchDest && fetchDest.length > 0) ? fetchDest.slice(0, 6) : DEFAULT_DESTINATIONS;
  const packages = (fetchPkg && fetchPkg.length > 0) ? fetchPkg.slice(0, 6) : DEFAULT_PACKAGES;

  // Background Scroll Locking when Mobile Menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Escape key handler to close menus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navListRef.current && !navListRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnterTrigger = (menuKey, event) => {
    clearTimeout(hoverTimeoutRef.current);
    const triggerEl = event.currentTarget;
    if (triggerEl && navListRef.current) {
      const triggerRect = triggerEl.getBoundingClientRect();
      const listRect = navListRef.current.getBoundingClientRect();
      setIndicatorStyle({
        opacity: 1,
        left: triggerRect.left - listRect.left,
        width: triggerRect.width
      });
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(menuKey);
    }, 70);
  };

  const handleMouseLeaveItem = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }, 150);
  };

  const handleTriggerClick = (menuKey, event) => {
    event.preventDefault();
    if (activeMenu === menuKey) {
      setActiveMenu(null);
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    } else {
      handleMouseEnterTrigger(menuKey, event);
      setActiveMenu(menuKey);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-border-color shadow-sm text-white">
      {/* Top Utility Helpline Bar */}
      <div className="bg-slate-900/90 text-slate-300 text-xs py-1.5 px-4 hidden md:block border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-primary" />
              Toll Free Hotline: <strong className="text-white font-semibold">1800-VENTOURA (8368)</strong>
            </span>
            <span className="flex items-center gap-1 hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Verified Price Match Guarantee
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-white/10 px-2 py-0.5 rounded text-[11px] font-bold text-white">INR ₹</span>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">Hi, {user.name || 'Traveler'}</span>
                <button onClick={logout} className="hover:text-primary transition-colors underline font-semibold">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={onOpenAuth} className="hover:text-white flex items-center gap-1 transition-colors font-semibold">
                <User className="w-3.5 h-3.5" />
                Login / Register
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md group-hover:bg-primary-dark transition-colors">
              <Plane className="w-6 h-6 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1 leading-none">
                VENTOURA <span className="text-primary text-xs font-bold px-1.5 py-0.5 rounded bg-primary/20 uppercase tracking-widest">Travel</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">Flights • Hotels • Packages</span>
            </div>
          </Link>

          {/* Desktop Base UI Navigation Menu */}
          <nav className="hidden lg:flex items-center relative" aria-label="Main Navigation">
            <ul ref={navListRef} className="flex items-center gap-1 list-none m-0 p-0 relative">

              {/* 1. DESTINATIONS ▼ */}
              <li 
                className={`relative ${activeMenu === 'destinations' ? 'is-open' : ''}`}
                onMouseEnter={(e) => handleMouseEnterTrigger('destinations', e)}
                onMouseLeave={handleMouseLeaveItem}
              >
                <button
                  type="button"
                  onClick={(e) => handleTriggerClick('destinations', e)}
                  aria-expanded={activeMenu === 'destinations'}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeMenu === 'destinations'
                      ? 'bg-white/15 text-white border-white/25 shadow-lg'
                      : 'text-white/90 border-transparent hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Destinations
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'destinations' ? 'rotate-180 text-primary-light' : 'text-slate-400'}`} />
                </button>

                {/* Destinations Dropdown Content */}
                {activeMenu === 'destinations' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] max-w-[92vw] bg-charcoal/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                      <span className="text-xs font-black uppercase tracking-widest text-primary-light flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Handcrafted Destinations
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 bg-white/10 px-2.5 py-0.5 rounded-full">
                        {destinations.length} Featured
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-4">
                      {destinations.map((dest) => {
                        const id = dest.id || dest._id || dest.title;
                        const price = dest.startingPrice ? `₹${dest.startingPrice.toLocaleString('en-IN')}` : (dest.price || '');
                        return (
                          <Link
                            key={id}
                            to={`/destination?id=${encodeURIComponent(id)}`}
                            onClick={() => setActiveMenu(null)}
                            className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-primary/40 transition-all group"
                          >
                            <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 relative bg-black/40">
                              <img
                                src={dest.image || 'assets/images/dest-maldives.jpg'}
                                alt={dest.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-primary-light uppercase tracking-wider block truncate">
                                {dest.city ? `${dest.city}, ${dest.country}` : (dest.country || 'Global')}
                              </span>
                              <h4 className="text-xs font-extrabold text-white truncate group-hover:text-primary-light transition-colors">
                                {dest.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 line-clamp-1">
                                {dest.description || 'Luxury curated holiday.'}
                              </p>
                              {price && (
                                <span className="text-[11px] text-slate-300 font-medium block mt-0.5">
                                  From <strong className="text-primary-light font-black">{price}</strong>
                                </span>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="p-3.5 px-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-400">🗺️ Discover 100+ worldwide destinations</span>
                      <Link
                        to="/destination"
                        onClick={() => setActiveMenu(null)}
                        className="text-xs font-bold text-primary-light hover:text-white px-3.5 py-1 rounded-full bg-primary/20 hover:bg-primary/40 border border-primary/30 transition-all"
                      >
                        View All Destinations →
                      </Link>
                    </div>
                  </div>
                )}
              </li>

              {/* 2. PACKAGES ▼ */}
              <li 
                className={`relative ${activeMenu === 'packages' ? 'is-open' : ''}`}
                onMouseEnter={(e) => handleMouseEnterTrigger('packages', e)}
                onMouseLeave={handleMouseLeaveItem}
              >
                <button
                  type="button"
                  onClick={(e) => handleTriggerClick('packages', e)}
                  aria-expanded={activeMenu === 'packages'}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeMenu === 'packages'
                      ? 'bg-white/15 text-white border-white/25 shadow-lg'
                      : 'text-white/90 border-transparent hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Packages
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'packages' ? 'rotate-180 text-primary-light' : 'text-slate-400'}`} />
                </button>

                {/* Packages Dropdown Content */}
                {activeMenu === 'packages' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[760px] max-w-[92vw] bg-charcoal/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                      <span className="text-xs font-black uppercase tracking-widest text-primary-light flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5" /> All-Inclusive Tour Packages
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 bg-white/10 px-2.5 py-0.5 rounded-full">
                        {packages.length} Trending
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-4">
                      {packages.map((pkg) => {
                        const id = pkg._id || pkg.id || pkg.title;
                        const price = pkg.price ? `₹${pkg.price.toLocaleString('en-IN')}` : '';
                        const img = pkg.featuredImage || pkg.image || 'assets/images/dest-goa.jpg';
                        return (
                          <Link
                            key={id}
                            to={`/package/${encodeURIComponent(id)}`}
                            onClick={() => setActiveMenu(null)}
                            className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-primary/40 transition-all group"
                          >
                            <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 relative bg-black/40">
                              <img
                                src={img}
                                alt={pkg.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              {pkg.badge && (
                                <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-primary text-white text-[8px] font-black uppercase rounded shadow">
                                  {pkg.badge}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-primary-light uppercase tracking-wider block truncate">
                                📅 {pkg.duration || '5 Days'}
                              </span>
                              <h4 className="text-xs font-extrabold text-white truncate group-hover:text-primary-light transition-colors">
                                {pkg.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 line-clamp-1">
                                {pkg.highlights || pkg.description || 'Guided tours, luxury stays & verified flights.'}
                              </p>
                              {price && (
                                <span className="text-[11px] text-slate-300 font-medium block mt-0.5">
                                  Starting <strong className="text-primary-light font-black">{price}</strong>
                                </span>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="p-3.5 px-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-400">🎁 Zero cancellation fees & lowest price guarantee</span>
                      <Link
                        to="/packages"
                        onClick={() => setActiveMenu(null)}
                        className="text-xs font-bold text-primary-light hover:text-white px-3.5 py-1 rounded-full bg-primary/20 hover:bg-primary/40 border border-primary/30 transition-all"
                      >
                        Browse All Packages →
                      </Link>
                    </div>
                  </div>
                )}
              </li>

              {/* 3. CRUISES */}
              <li>
                <Link
                  to="/activities"
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    location.pathname === '/activities'
                      ? 'bg-white/15 text-white font-extrabold'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Cruises
                </Link>
              </li>

              {/* 4. BLOG */}
              <li>
                <Link
                  to="/reviews"
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    location.pathname === '/reviews'
                      ? 'bg-white/15 text-white font-extrabold'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Blog
                </Link>
              </li>

              {/* 5. CONTACT */}
              <li>
                <Link
                  to="/contact"
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    location.pathname === '/contact'
                      ? 'bg-white/15 text-white font-extrabold'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Contact
                </Link>
              </li>

            </ul>

            {/* Navigation Menu Indicator */}
            <div
              className="absolute -bottom-1 h-0.5 bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-200 pointer-events-none"
              style={{
                opacity: indicatorStyle.opacity,
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`
              }}
            />
          </nav>

          {/* Desktop Right CTA Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <span className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                👤 {user.name}
              </span>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-lg border border-white/20 hover:border-primary text-white hover:text-primary-light font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Login / Register
              </button>
            )}

            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plane className="w-4 h-4" />
              Book Now
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3 py-1.5 rounded-md bg-primary text-white font-bold text-xs"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-primary transition-colors rounded-lg bg-white/10 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md lg:hidden flex justify-end animate-fadeIn">
          <div
            ref={mobileMenuRef}
            className="w-4/5 max-w-sm bg-charcoal h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-white/10 text-white"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-sm">
                  V
                </div>
                <span className="font-black text-lg text-white">VENTOURA</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Nav Links */}
            <div className="p-4 space-y-2 flex-1">
              <Link
                to="/destination"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm"
              >
                <MapPin className="w-4 h-4 text-primary" /> Destinations
              </Link>
              <Link
                to="/packages"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm"
              >
                <Package className="w-4 h-4 text-primary" /> Packages
              </Link>
              <Link
                to="/activities"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm"
              >
                <Tag className="w-4 h-4 text-primary" /> Cruises & Activities
              </Link>
              <Link
                to="/reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm"
              >
                <ShieldCheck className="w-4 h-4 text-primary" /> Blog & Reviews
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm"
              >
                <PhoneCall className="w-4 h-4 text-primary" /> Contact Desk
              </Link>
            </div>

            {/* Drawer Footer CTAs */}
            <div className="p-4 border-t border-white/10 bg-slate-900 space-y-2">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-lg border border-white/20 text-white font-bold text-xs"
                >
                  Sign Out ({user.name})
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 rounded-lg border border-primary text-primary-light font-bold text-xs hover:bg-primary/20"
                >
                  Login / Register
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow-md"
              >
                Book Travel Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

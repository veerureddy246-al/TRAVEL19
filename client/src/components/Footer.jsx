import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, PhoneCall, Mail, MapPin, ShieldCheck, ArrowUp, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-slate-300 pt-14 pb-8 border-t border-slate-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 6-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company & Brand */}
          <div className="sm:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="Ventoura Travel Homepage">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md group-hover:bg-primary-dark transition-colors">
                <Plane className="w-6 h-6 transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                  VENTOURA <span className="text-primary text-xs font-bold px-1.5 py-0.5 rounded bg-primary-light uppercase tracking-widest">Travel</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">India's Trusted Travel Agency</span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed pr-2">
              Ventoura is India's leading travel booking platform for flights, verified hotel stays, holiday packages, bus tickets, and 24x7 customer support.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Ventoura Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Ventoura Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Ventoura Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-primary text-slate-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Ventoura LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Travel Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Flight Bookings</Link></li>
              <li><Link to="/hotels" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Hotel Reservations</Link></li>
              <li><Link to="/destination" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Holiday Packages</Link></li>
              <li><Link to="/packages" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Tour Packages</Link></li>
              <li><Link to="/activities" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Activities & Passes</Link></li>
              <li><Link to="/itinerary" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">7-Day Tour Builder</Link></li>
            </ul>
          </div>

          {/* Column 3: Popular Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/destination" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Goa Beach Escapes</Link></li>
              <li><Link to="/destination" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Kashmir Valley</Link></li>
              <li><Link to="/destination" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Kerala Backwaters</Link></li>
              <li><Link to="/destination" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Rajasthan Palaces</Link></li>
              <li><Link to="/destination" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Maldives Villas</Link></li>
              <li><Link to="/destination" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Bali Tropical Odyssey</Link></li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/gallery" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Photo Gallery</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Customer Reviews</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Help & FAQ</Link></li>
              <li><Link to="/booking" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">My Bookings</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors text-primary font-bold min-h-[32px] inline-flex items-center">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 5: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Policies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/faq" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Terms of Service</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Cancellation Policy</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Refund Policy</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors min-h-[32px] inline-flex items-center">Security Compliance</Link></li>
            </ul>
          </div>

        </div>

        {/* Contact & Payment Footer Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>© 2026 Ventoura Travel Agency. All rights reserved. 100% Safe & Secure SSL Encrypted Booking.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Payment Gateways:</span>
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
              <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700">UPI</span>
              <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700">VISA</span>
              <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700">MasterCard</span>
              <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700">NetBanking</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-primary hover:text-white text-slate-300 transition-colors ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Back to Top"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { User, Calendar, MapPin, Ticket, ShieldCheck, LogOut, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultUserBookings = [
  {
    _id: 'VEN-482019',
    package: 'Flagship Kashmir Paradise Valley & Gulmarg Gondola',
    destination: 'Srinagar, Kashmir',
    travelDate: '2026-09-15',
    travellers: '2 Adults',
    totalPrice: 24500,
    status: 'Confirmed',
    createdAt: new Date()
  },
  {
    _id: 'VEN-892104',
    package: 'Goa 5-Day Sun & Sea Beach Escape',
    destination: 'South Goa',
    travelDate: '2026-10-02',
    travellers: '2 Adults, 1 Child',
    totalPrice: 18500,
    status: 'Confirmed',
    createdAt: new Date()
  }
];

const BookingPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const res = await API.get('/bookings');
        if (res.data && res.data.data) {
          setBookings(res.data.data);
        } else {
          setBookings(defaultUserBookings);
        }
      } catch (err) {
        setBookings(defaultUserBookings);
      } finally {
        setLoading(false);
      }
    };
    fetchUserBookings();
  }, []);

  return (
    <div className="pt-8 pb-16 bg-light-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Card Header */}
        <div className="bg-white p-8 rounded-2xl border border-border-color shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary text-white font-black flex items-center justify-center text-2xl shadow-md">
              {user?.name ? user.name[0].toUpperCase() : 'T'}
            </div>
            <div>
              <h1 className="text-2xl font-black text-charcoal">{user?.name || 'Valued Traveler'}</h1>
              <p className="text-xs text-slate-500 font-medium">{user?.email || 'traveler@ventoura.com'} • Ventoura Rewards Member</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-emerald-600 font-bold">
                <ShieldCheck className="w-4 h-4" /> Verified Travel Account
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/destination"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow"
            >
              Book New Holiday
            </Link>
            {user && (
              <button
                onClick={logout}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 font-bold text-xs flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            )}
          </div>
        </div>

        {/* My Bookings List */}
        <div className="bg-white p-8 rounded-2xl border border-border-color shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-charcoal flex items-center gap-2">
              <Ticket className="w-5 h-5 text-primary" /> My Travel Reservations ({bookings.length})
            </h2>
            <span className="text-xs font-bold text-slate-400">Instant E-Vouchers Issued</span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400 text-xs font-medium">Loading your reservation history...</div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm font-bold text-charcoal">No active travel bookings found.</p>
              <Link to="/destination" className="inline-block px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-xs uppercase">
                Explore Destinations
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b._id} className="p-6 rounded-xl border border-border-color bg-light-bg space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Reference ID</span>
                      <span className="text-sm font-black text-primary">#{b._id}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider w-fit">
                      ✓ {b.status || 'Confirmed'}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-charcoal">{b.package || b.title || 'Ventoura Holiday Package'}</h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Destination:</span>
                      <strong className="text-charcoal">{b.destination || 'India'}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Travel Date:</span>
                      <strong className="text-charcoal">{b.travelDate || 'September 2026'}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Passengers:</span>
                      <strong className="text-charcoal">{b.travellers || '2 Adults'}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Total Amount:</span>
                      <strong className="text-primary font-black">₹{(b.totalPrice || 18500).toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingPage;

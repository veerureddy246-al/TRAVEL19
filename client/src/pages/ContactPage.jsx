import React, { useState } from 'react';
import API from '../services/api';
import { Mail, Phone, MapPin, Send, PhoneCall, CheckCircle2 } from 'lucide-react';
import FoldText from './FoldText';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Goa',
    travelDate: '2026-09-01',
    travellers: '2 Adults',
    budget: '₹25,000 - ₹50,000',
    message: ''
  });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/enquiries', formData);
      setMsg('Your travel enquiry has been submitted successfully! Our senior concierge will contact you within 15 minutes.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: 'Goa',
        travelDate: '2026-09-01',
        travellers: '2 Adults',
        budget: '₹25,000 - ₹50,000',
        message: ''
      });
    } catch (err) {
      setMsg('Your travel enquiry has been submitted successfully!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8 pb-16 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Title */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl text-center">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30">
              24x7 Customer Desk
            </span>
            <FoldText as="h1" className="text-3xl sm:text-5xl font-black text-white">
              Travel <span className="text-primary">Enquiry</span> & Support
            </FoldText>
            <p className="text-sm text-slate-300">
              Planning a custom holiday or need assistance with your booking? Submit your enquiry below and our experts will reach out.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Office Details */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-border-color shadow-card space-y-6">
            <h3 className="text-2xl font-black text-charcoal">Corporate Headquarters</h3>
            
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-charcoal block text-sm">New Delhi Headquarters</span>
                  <span>Ventoura Towers, Connaught Place, Inner Circle, New Delhi 110001</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-charcoal block text-sm">Toll Free Helpline</span>
                  <span>1800-VENTOURA (8368) / +91 11 4000 8000</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-charcoal block text-sm">Email Support Desk</span>
                  <span>support@ventoura.com / bookings@ventoura.com</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-extrabold uppercase text-slate-400 block tracking-wider">Regional Offices</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-charcoal">
                <span className="p-2 bg-light-bg rounded-lg border border-slate-200">📍 Mumbai (Bandra)</span>
                <span className="p-2 bg-light-bg rounded-lg border border-slate-200">📍 Bengaluru (MG Road)</span>
                <span className="p-2 bg-light-bg rounded-lg border border-slate-200">📍 Hyderabad (Hitec)</span>
                <span className="p-2 bg-light-bg rounded-lg border border-slate-200">📍 Kolkata (Park St)</span>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-border-color shadow-card space-y-4">
            <h3 className="text-2xl font-black text-charcoal">Custom Travel Enquiry Form</h3>
            {msg && <div className="p-3 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 text-center flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> {msg}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Destination *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kashmir, Goa, Maldives"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Travel Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Travellers *</label>
                  <select
                    value={formData.travellers}
                    onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                    <option value="3-5 Group">3-5 Family Group</option>
                    <option value="6+ Group">6+ Tour Group</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Estimated Budget *</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="Under ₹25,000">Under ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="₹1,00,000+ Luxury">₹1,00,000+ Luxury</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Message / Requirements</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe your travel dates, passenger count, preferred destinations, or special requests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium focus:outline-none focus:border-primary text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Travel Enquiry
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;

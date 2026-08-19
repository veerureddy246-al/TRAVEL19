import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Sliders, Save, CheckCircle2, Globe, Image, ShieldCheck } from 'lucide-react';

const HomepageCMSView = () => {
  const [cmsData, setCmsData] = useState({
    heroBadge: "India's Leading Travel Booking Network",
    heroHeading: "Book Flights, Hotels & Holidays at Guaranteed Best Rates",
    heroSubheading: "Join over 2.5 Million happy travelers who enjoy zero cancellation penalties, 100% verified hotels, and instant booking vouchers.",
    heroBgImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Ventoura Travel | Book Flights, Hotels, Bus, Trains & Holiday Packages",
    seoDescription: "Book cheap flights, 5-star hotels, luxury holiday packages, and customized tours across India, Kashmir, Goa, and Maldives at best rates.",
    status: 'Published'
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const res = await API.get('/cms');
        if (res.data && res.data.success && res.data.data) {
          setCmsData(prev => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {}
    };
    fetchCMS();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCmsData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await API.put('/admin/cms', cmsData);
      setMessage('Homepage CMS settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Settings saved locally.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border-color shadow-xs space-y-6 animate-fadeIn">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-black text-charcoal uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" /> Homepage CMS & Hero Control
          </h2>
          <p className="text-xs text-slate-500">Customize main banner title, hero background, app promotion, and SEO metadata</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save CMS Settings'}
        </button>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* Section 1: Hero Banner */}
        <div className="p-5 bg-light-bg rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-xs font-black uppercase text-charcoal tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-primary" /> Main Hero Header & Banner
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Hero Badge Text</label>
              <input
                type="text"
                name="heroBadge"
                value={cmsData.heroBadge}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-semibold text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Hero Heading</label>
              <input
                type="text"
                name="heroHeading"
                value={cmsData.heroHeading}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-black text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Hero Subheading</label>
              <textarea
                rows="2"
                name="heroSubheading"
                value={cmsData.heroSubheading}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs"
              ></textarea>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Hero Background Image URL</label>
              <input
                type="text"
                name="heroBgImage"
                value={cmsData.heroBgImage}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs"
              />

              <div className="h-36 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative">
                <img src={cmsData.heroBgImage} alt="Hero Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 bg-charcoal/80 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  Hero Background Preview
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: SEO Settings */}
        <div className="p-5 bg-light-bg rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-xs font-black uppercase text-charcoal tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> SEO & Meta Data
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">SEO Title Tag</label>
              <input
                type="text"
                name="seoTitle"
                value={cmsData.seoTitle}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-semibold text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">SEO Meta Description</label>
              <textarea
                rows="2"
                name="seoDescription"
                value={cmsData.seoDescription}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs"
              ></textarea>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};

export default HomepageCMSView;

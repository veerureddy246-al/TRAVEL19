import React, { useState, useEffect } from 'react';
import { X, Image, Info, DollarSign, List, Shield, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

const TripModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    destination: 'Goa, India',
    category: 'Beach',
    departureLocation: 'New Delhi',
    travelType: 'Group Tour',
    difficulty: 'Easy',
    bestSeason: 'October to March',
    status: 'Published',

    price: 14999,
    startingPrice: 17500,
    discountPrice: 14999,
    discount: '15% OFF',
    badge: 'SPECIAL OFFER',
    rating: 4.9,
    maxTravellers: 12,

    featuredImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    galleryInput: '',
    gallery: [],

    shortDescription: '',
    fullDescription: '',
    highlightsInput: '',
    highlights: [],
    itinerary: [
      { day: 1, title: 'Arrival & Check-in', description: 'Airport pickup and transfer to hotel.', meals: 'Dinner Included' },
      { day: 2, title: 'Guided Sightseeing Tour', description: 'Full day city and attraction tour.', meals: 'Breakfast Included' }
    ],

    includedInput: '',
    included: [],
    excludedInput: '',
    excluded: [],
    accommodation: '4-Star / 5-Star Luxury Resort Stay',
    transportation: 'Private Air-Conditioned Sedan / SUV',
    cancellationPolicy: 'Free cancellation up to 7 days prior to departure'
  });

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        title: initialData.title || initialData.name || '',
        slug: initialData.slug || '',
        destination: initialData.destination || 'Goa, India',
        category: initialData.category || 'Beach',
        status: initialData.status || 'Published',
        price: initialData.price || 14999,
        featuredImage: initialData.featuredImage || initialData.image || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
        shortDescription: initialData.shortDescription || initialData.description || '',
        fullDescription: initialData.fullDescription || initialData.description || '',
        highlights: initialData.highlights || [],
        itinerary: initialData.itinerary && initialData.itinerary.length > 0 ? initialData.itinerary : [
          { day: 1, title: 'Arrival & Check-in', description: 'Airport pickup and transfer to hotel.', meals: 'Dinner Included' }
        ]
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: value };
      if (name === 'title' && !prev.slug) {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return next;
    });
  };

  const handleAddItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: prev.itinerary.length + 1, title: `Day ${prev.itinerary.length + 1} Activity`, description: 'Day itinerary description...', meals: 'Breakfast Included' }
      ]
    }));
  };

  const handleRemoveItineraryDay = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const handleItineraryChange = (index, field, val) => {
    setFormData(prev => {
      const updated = [...prev.itinerary];
      updated[index][field] = val;
      return { ...prev, itinerary: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-border-color flex flex-col">
        
        {/* Header */}
        <div className="bg-charcoal p-5 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
              {initialData ? 'Edit Trip / Tour' : 'Create New Trip / Tour'}
            </h3>
            <p className="text-xs text-slate-400">Complete multi-tab travel package editor with live image preview</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-light-bg px-4 pt-2 gap-2 overflow-x-auto no-scrollbar text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'basic', name: 'Basic Info', icon: Info },
            { id: 'pricing', name: 'Pricing & Capacity', icon: DollarSign },
            { id: 'media', name: 'Media & Images', icon: Image },
            { id: 'details', name: 'Details & Itinerary', icon: List },
            { id: 'policies', name: 'Inclusions & Policies', icon: Shield }
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2.5 rounded-t-xl flex items-center gap-2 transition-all ${
                  isActive ? 'bg-white text-primary border-t-2 border-primary font-extrabold shadow-xs' : 'text-slate-500 hover:text-charcoal'
                }`}
              >
                <Icon className="w-4 h-4" /> {t.name}
              </button>
            );
          })}
        </div>

        {/* Form Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Trip Name</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Kerala Backwaters & Munnar Tea Gardens"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-semibold text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">URL Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="kerala-backwaters-and-munnar"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Destination</label>
                <input
                  type="text"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Alleppey & Munnar, Kerala"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                >
                  {['Beach', 'Mountains', 'Adventure', 'Family', 'Honeymoon', 'Religious', 'Cultural', 'Wildlife', 'Luxury', 'Budget', 'International', 'Domestic'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Publish Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-bold text-xs focus:outline-none focus:border-primary bg-light-bg"
                >
                  <option value="Published">✅ Published (Live on Public Website)</option>
                  <option value="Draft">📝 Draft (Admin Only)</option>
                  <option value="Unpublished">🚫 Unpublished (Hidden)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Departure Location</label>
                <input
                  type="text"
                  name="departureLocation"
                  value={formData.departureLocation}
                  onChange={handleChange}
                  placeholder="New Delhi / Mumbai / Kochi"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Travel Type</label>
                <input
                  type="text"
                  name="travelType"
                  value={formData.travelType}
                  onChange={handleChange}
                  placeholder="Group / Couple / Customized"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Best Season</label>
                <input
                  type="text"
                  name="bestSeason"
                  value={formData.bestSeason}
                  onChange={handleChange}
                  placeholder="October to March"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PRICING & CAPACITY */}
          {activeTab === 'pricing' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Package Price (₹ INR)</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="14999"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-black text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Original Price (Before Discount)</label>
                <input
                  type="number"
                  name="startingPrice"
                  value={formData.startingPrice}
                  onChange={handleChange}
                  placeholder="17500"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Discount Tag</label>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="15% OFF / FLAT ₹3000 OFF"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Badge</label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  placeholder="BEST SELLER / SPECIAL OFFER"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  required
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="5 Days / 4 Nights"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Maximum Travellers</label>
                <input
                  type="number"
                  name="maxTravellers"
                  value={formData.maxTravellers}
                  onChange={handleChange}
                  placeholder="12"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          {/* TAB 3: MEDIA & LIVE IMAGE PREVIEW */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Featured Trip Image URL</label>
                <input
                  type="text"
                  name="featuredImage"
                  required
                  value={formData.featuredImage}
                  onChange={(e) => {
                    handleChange(e);
                    setImageError(false);
                  }}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              {/* LIVE IMAGE PREVIEW BOX */}
              <div className="p-4 bg-light-bg rounded-2xl border border-border-color space-y-2">
                <span className="text-[11px] font-extrabold uppercase text-slate-500 block">Real-Time Image Preview</span>
                <div className="relative h-64 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center">
                  {!imageError ? (
                    <img
                      src={formData.featuredImage}
                      alt="Preview"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6 space-y-2 text-slate-500">
                      <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                      <p className="font-bold text-xs">Image URL failed to load. Default fallback image will be displayed.</p>
                      <img
                        src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
                        alt="Fallback Preview"
                        className="w-full h-40 object-cover rounded-lg mt-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DETAILS & ITINERARY */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Short Description</label>
                <textarea
                  rows="2"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Brief 1-2 sentence summary for cards..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Full Description</label>
                <textarea
                  rows="4"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Detailed tour narrative for the details page..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              {/* Day-by-Day Itinerary Builder */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold uppercase text-slate-700 text-xs">Day-by-Day Itinerary ({formData.itinerary.length} Days)</span>
                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="px-3 py-1.5 rounded-lg bg-primary text-white font-bold text-[11px] uppercase flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Day
                  </button>
                </div>

                {formData.itinerary.map((day, idx) => (
                  <div key={idx} className="p-4 bg-light-bg rounded-xl border border-slate-200 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-primary uppercase text-[11px]">Day {day.day}</span>
                      {formData.itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItineraryDay(idx)}
                          className="text-red-600 hover:text-primary"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Day Title (e.g. Arrival & Beachfront Check-in)"
                        value={day.title}
                        onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border-color text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="Meals (e.g. Breakfast & Dinner Included)"
                        value={day.meals}
                        onChange={(e) => handleItineraryChange(idx, 'meals', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border-color text-xs"
                      />
                    </div>

                    <textarea
                      rows="2"
                      placeholder="Day activity details..."
                      value={day.description}
                      onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border-color text-xs"
                    ></textarea>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INCLUSIONS & POLICIES */}
          {activeTab === 'policies' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Accommodation Details</label>
                <input
                  type="text"
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleChange}
                  placeholder="e.g. Taj Exotica Resort & Spa / 5-Star Beachfront Villa"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Transportation</label>
                <input
                  type="text"
                  name="transportation"
                  value={formData.transportation}
                  onChange={handleChange}
                  placeholder="e.g. Private Air-Conditioned Sedan / SUV"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Cancellation Policy</label>
                <textarea
                  rows="3"
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={handleChange}
                  placeholder="Free cancellation up to 7 days prior to departure date..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
                ></textarea>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold uppercase text-xs hover:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs shadow-md flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Save Trip & Sync Database
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default TripModal;

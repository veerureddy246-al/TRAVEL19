import React, { useState, useEffect } from 'react';
import { X, Image, AlertCircle, CheckCircle2 } from 'lucide-react';

const DestinationModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    city: '',
    country: 'India',
    region: 'North India',
    category: 'Beach & Nightlife',
    startingPrice: 14999,
    days: 5,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    shortDescription: '',
    description: '',
    bestTime: 'October to March',
    status: 'Published'
  });

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        title: initialData.title || initialData.name || '',
        slug: initialData.slug || '',
        city: initialData.city || '',
        country: initialData.country || 'India',
        region: initialData.region || 'South India',
        category: initialData.category || 'Beach & Nightlife',
        startingPrice: initialData.startingPrice || initialData.price || 14999,
        days: initialData.days || 5,
        image: initialData.image || initialData.featuredImage || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
        shortDescription: initialData.shortDescription || '',
        description: initialData.description || '',
        bestTime: initialData.bestTime || 'October to March',
        status: initialData.status || 'Published'
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border-color flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-charcoal p-5 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              {initialData ? 'Edit Destination' : 'Add New Destination'}
            </h3>
            <p className="text-xs text-slate-400">Configure destination overview, country, pricing, and preview image</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Destination Name</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Goa Sun & Sea Beach Escape"
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-semibold text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">City / Region</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Goa"
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Country</label>
              <input
                type="text"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                placeholder="India / Maldives"
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Starting Price (₹ INR)</label>
              <input
                type="number"
                name="startingPrice"
                required
                value={formData.startingPrice}
                onChange={handleChange}
                placeholder="14999"
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-bold text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-bold text-xs focus:outline-none focus:border-primary bg-light-bg"
              >
                <option value="Published">✅ Published</option>
                <option value="Draft">📝 Draft</option>
                <option value="Unpublished">🚫 Unpublished</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Main Image URL</label>
              <input
                type="text"
                name="image"
                required
                value={formData.image}
                onChange={(e) => {
                  handleChange(e);
                  setImageError(false);
                }}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
              />

              {/* LIVE PREVIEW BOX */}
              <div className="h-40 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative flex items-center justify-center">
                {!imageError ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4 text-slate-500">
                    <AlertCircle className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                    <p className="font-bold text-[11px]">Image URL failed to load. Fallback default active.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Description</label>
              <textarea
                rows="3"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Destination description..."
                className="w-full px-4 py-2.5 rounded-xl border border-border-color text-charcoal font-medium text-xs focus:outline-none focus:border-primary"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold uppercase text-xs">
              Cancel
            </button>
            <button type="submit" className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold uppercase text-xs shadow-md flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Save Destination
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default DestinationModal;

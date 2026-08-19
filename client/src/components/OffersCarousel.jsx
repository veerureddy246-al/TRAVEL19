import React, { useState } from 'react';
import { Tag, Copy, Check, Percent, Gift, ShieldAlert } from 'lucide-react';

const offersList = [
  {
    id: 1,
    category: 'flights',
    title: 'Flat ₹1,500 Instant Discount on Domestic Flights',
    code: 'VENTOURAFIRST',
    validity: 'Valid till 31st Aug 2026',
    bank: 'ICICI & HDFC Bank Cards',
    bgGradient: 'from-red-600 to-rose-700',
  },
  {
    id: 2,
    category: 'hotels',
    title: 'Up to 25% Off on Luxury Stays & Resort Bookings',
    code: 'STAYMORE',
    validity: 'Valid on 3+ night bookings',
    bank: 'Axis & SBI Credit Cards',
    bgGradient: 'from-slate-800 to-slate-900',
  },
  {
    id: 3,
    category: 'holidays',
    title: 'Flat ₹5,000 Off on Kashmir, Goa & Ladakh Tour Packages',
    code: 'HOLIDAYSPECIAL',
    validity: 'Limited Period Offer',
    bank: 'All Payment Modes',
    bgGradient: 'from-red-700 to-red-900',
  },
  {
    id: 4,
    category: 'flights',
    title: 'Special Student & Senior Citizen Fares Available',
    code: 'SPECIAL10',
    validity: 'Active Daily',
    bank: 'Direct Savings',
    bgGradient: 'from-charcoal to-slate-800',
  },
];

const OffersCarousel = () => {
  const [filter, setFilter] = useState('all');
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2500);
  };

  const filteredOffers = filter === 'all' 
    ? offersList 
    : offersList.filter(o => o.category === filter);

  return (
    <section className="py-12 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Special Savings</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal flex items-center gap-2">
              <Gift className="w-6 h-6 text-primary" />
              Exclusive Offers & Promo Codes
            </h2>
          </div>

          {/* Filter Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {['all', 'flights', 'hotels', 'holidays'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all capitalize whitespace-nowrap ${
                  filter === cat
                    ? 'bg-charcoal text-white shadow'
                    : 'bg-white text-slate-600 border border-border-color hover:border-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Copy Toast Alert */}
        {copiedCode && (
          <div className="mb-4 p-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-between animate-fadeIn">
            <span>Promo Code <strong>{copiedCode}</strong> copied to clipboard! Paste it during checkout.</span>
            <Check className="w-4 h-4" />
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className={`rounded-2xl p-5 bg-gradient-to-br ${offer.bgGradient} text-white shadow-lg flex flex-col justify-between relative overflow-hidden card-hover`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider">
                  {offer.bank}
                </span>
                <Percent className="w-5 h-5 text-white/60" />
              </div>

              <div>
                <h3 className="text-base font-bold leading-snug mb-2 text-white">
                  {offer.title}
                </h3>
                <p className="text-xs text-white/80 mb-4">{offer.validity}</p>
              </div>

              <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/70 block uppercase tracking-wider">Promo Code</span>
                  <span className="text-sm font-black tracking-widest font-mono text-white">{offer.code}</span>
                </div>
                <button
                  onClick={() => handleCopy(offer.code)}
                  className="px-3 py-1.5 rounded-lg bg-white text-charcoal hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersCarousel;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Camera, X, Maximize2 } from 'lucide-react';
import FoldText from './FoldText';


const categories = [
  'All',
  'Goa',
  'Kashmir',
  'Kerala',
  'Rajasthan',
  'Maldives',
  'Bali'
];

const defaultGalleryList = [
  { _id: 'g1', category: 'Goa', title: 'Palolem Beach Sunset Yacht', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80', description: 'Tranquil evening sunset over South Goa coast.' },
  { _id: 'g2', category: 'Kashmir', title: 'Dal Lake Houseboat Morning', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80', description: 'Serene morning view of Shikara boats on Dal Lake.' },
  { _id: 'g3', category: 'Kashmir', title: 'Gulmarg Gondola Snow Peaks', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80', description: 'Snowy Himalayan peaks at 13,780 ft.' },
  { _id: 'g4', category: 'Kerala', title: 'Alleppey Backwaters Cruise', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', description: 'Traditional luxury houseboat gliding through palm backwaters.' },
  { _id: 'g5', category: 'Rajasthan', title: 'Hawa Mahal Palace Jaipur', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80', description: 'Pink City iconic sandstone facade.' },
  { _id: 'g6', category: 'Maldives', title: 'Overwater Villa Lagoon View', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', description: 'Crystal clear marine waters at Baa Atoll.' },
  { _id: 'g7', category: 'Bali', title: 'Ubud Rice Terrace Sunset', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80', description: 'Lush green tropical rice terraces in Ubud.' },
  { _id: 'g8', category: 'Goa', title: 'Taj Exotica Beachfront Resort', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', description: '5-Star Mediterranean resort gardens in Goa.' }
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalImage, setActiveModalImage] = useState(null);

  const { data: fetchGallery } = useQuery({
    queryKey: ['galleryList', selectedCategory],
    queryFn: async () => (await API.get(`/gallery?category=${selectedCategory}`)).data?.data || []
  });

  const gallery = (fetchGallery && fetchGallery.length > 0) ? fetchGallery : defaultGalleryList;

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === selectedCategory);

  return (
    <div className="pt-8 pb-16 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Title */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl text-center">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30 inline-flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" /> High-Res Photography
            </span>
            <FoldText as="h1" className="text-3xl sm:text-5xl font-black text-white">
              Travel Photo <span className="text-primary">Gallery</span>
            </FoldText>
            <p className="text-sm text-slate-300">
              Browse authentic destination photos from our luxury tours across Goa, Kashmir, Kerala, Rajasthan, Maldives, and Bali.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-slate-600 border border-border-color hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item._id || idx}
              onClick={() => setActiveModalImage(item)}
              className="relative h-72 rounded-2xl overflow-hidden bg-white border border-border-color shadow-card cursor-pointer group card-hover"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase text-primary font-bold tracking-widest">{item.category}</span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeModalImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative max-w-4xl w-full bg-white p-4 sm:p-6 rounded-2xl overflow-hidden shadow-2xl border border-border-color">
              <button
                onClick={() => setActiveModalImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-charcoal hover:bg-primary hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="h-[450px] rounded-xl overflow-hidden mb-4">
                <img src={activeModalImage.image} alt={activeModalImage.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase text-primary font-bold">{activeModalImage.category}</span>
                <h3 className="text-2xl font-black text-charcoal">{activeModalImage.title}</h3>
                <p className="text-xs text-slate-600">{activeModalImage.description}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GalleryPage;


import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Calendar, Play, Sun, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import EnvironmentEffects from './EnvironmentEffects';
import WildlifeEngine from './WildlifeEngine';

const HeroSection = ({ onOpenBooking }) => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0705]">
      
      {/* 4K Cinematic Serengeti Sunset Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 font-sans"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80')` 
        }}
      >
        {/* Dark Golden Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a07] via-[#0f0a07]/50 to-black/60"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-[#0f0a07]"></div>
      </div>

      {/* Atmospheric Environment Canvas (Dust particles, sunlight rays) */}
      <EnvironmentEffects isNight={false} />

      {/* Animated Wildlife Loop across Savannah */}
      <WildlifeEngine />

      {/* Acacia Tree & Savannah Grass Overlay Silhouettes */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#0f0a07] to-transparent z-10 pointer-events-none"></div>

      {/* Hero Content Container */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.25em] mb-6 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-[#FFBF00] animate-pulse" />
          <span>Exclusive 2026 Tanzanian Expedition</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none drop-shadow-2xl"
        >
          SERENGETI <br />
          <span className="gold-gradient-text italic font-normal">NATIONAL PARK</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed drop-shadow-lg"
        >
          Experience the pinnacle of African Wildlife Safaris. Witness 1.5 million wildebeest during the Great Migration, stay in 5-star luxury lodges, and track Big Five predators in their pristine natural habitat.
        </motion.p>

        {/* Highlight Chips */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#E8D5B5]"
        >
          <div className="flex items-center gap-1.5 bg-black/60 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/20">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Tanzania, East Africa</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/20">
            <Sun className="w-3.5 h-3.5 text-[#FFBF00]" />
            <span>28°C Golden Hour Sun</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Guaranteed Big Five Sightings</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFBF00] to-[#E65100] text-black font-bold text-sm tracking-widest uppercase shadow-2xl shadow-[#D4AF37]/30 hover:scale-105 hover:brightness-110 transition-all flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Book Serengeti Expedition
          </button>

          <a
            href="#itinerary-section"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-[#D4AF37]/50 text-[#D4AF37] font-semibold text-sm tracking-widest uppercase hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-3"
          >
            <Play className="w-4 h-4 fill-[#D4AF37]" />
            Explore 7-Day Itinerary
          </a>
        </motion.div>

      </div>
      
    </div>
  );
};

export default HeroSection;

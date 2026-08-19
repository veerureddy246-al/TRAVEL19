const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    required: true, 
    enum: ['Big Five', 'Great Migration', 'Luxury Lodges', 'Predators', 'Landscape & Sunset', 'Aerial & Balloon', 'Safari Life']
  },
  image: { type: String, required: true },
  displayOrder: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  location: { type: String, default: 'Serengeti National Park, Tanzania' }
}, { timestamps: true });

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

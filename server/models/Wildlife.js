const mongoose = require('mongoose');

const wildlifeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: { type: String },
  category: { 
    type: String, 
    enum: ['Big Five', 'Predator', 'Herbivore', 'Bird', 'Reptile & Insect'], 
    default: 'Big Five' 
  },
  rarity: { type: String, default: 'Common in Serengeti' },
  bestSightings: { type: String, default: 'Seronera Valley & Mara River' },
  description: { type: String, required: true },
  image: { type: String, required: true },
  animationSpeed: { type: Number, default: 1.0 },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Wildlife || mongoose.model('Wildlife', wildlifeSchema);

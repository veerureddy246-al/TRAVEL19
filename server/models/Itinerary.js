const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  dinner: { type: String, required: true },
  activities: [{ type: String }],
  location: { type: String, required: true, default: 'Serengeti National Park' },
  images: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.models.Itinerary || mongoose.model('Itinerary', itinerarySchema);

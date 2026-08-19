const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  city: { type: String },
  country: { type: String, required: true },
  region: { type: String, default: 'North India' },
  location: { type: String },
  category: { type: String, required: true },
  rating: { type: Number, default: 4.9 },
  startingPrice: { type: Number, required: true },
  days: { type: Number, default: 5 },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  shortDescription: { type: String },
  description: { type: String, required: true },
  bestTime: { type: String, default: 'October to March' },
  popularAttractions: [{ type: String }],
  travelTips: [{ type: String }],
  status: { type: String, enum: ['Draft', 'Published', 'Unpublished'], default: 'Published' }
}, { timestamps: true });

module.exports = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  starRating: { type: Number, default: 5 },
  description: { type: String, required: true },
  roomImages: [{ type: String }],
  swimmingPool: { type: Boolean, default: true },
  luxuryTent: { type: Boolean, default: true },
  restaurant: { type: String, default: 'Fine Dining Bush Gourmet & Wine Cellar' },
  location: { type: String, required: true, default: 'Central Serengeti, Tanzania' },
  price: { type: Number, required: true },
  gallery: [{ type: String }],
  amenities: [{ type: String }],
  heroImage: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);

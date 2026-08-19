const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userAvatar: { type: String },
  location: { type: String, default: 'London, UK' },
  rating: { type: Number, required: true, default: 5 },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: String, default: 'July 2026' },
  verifiedBooking: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);

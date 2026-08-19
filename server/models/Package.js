const mongoose = require('mongoose');

const itineraryItemSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  meals: { type: String, default: 'Breakfast included' }
});

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  destination: { type: String, required: true },
  category: { type: String, default: 'Beach' },
  shortDescription: { type: String },
  fullDescription: { type: String },
  featuredImage: { type: String, required: true },
  gallery: [{ type: String }],
  duration: { type: String, required: true },
  daysCount: { type: Number, default: 5 },
  price: { type: Number, required: true },
  startingPrice: { type: Number },
  discountPrice: { type: Number },
  discount: { type: String, default: '15% OFF' },
  badge: { type: String, default: 'SPECIAL OFFER' },
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 120 },
  maxTravellers: { type: Number, default: 12 },
  departureLocation: { type: String, default: 'New Delhi' },
  travelType: { type: String, default: 'Group Tour' },
  difficulty: { type: String, default: 'Easy' },
  bestSeason: { type: String, default: 'October to March' },
  highlights: [{ type: String }],
  included: [{ type: String }],
  excluded: [{ type: String }],
  accommodation: { type: String, default: '4-Star / 5-Star Resort Stays' },
  transportation: { type: String, default: 'Private Air-Conditioned Vehicle' },
  cancellationPolicy: { type: String, default: 'Free cancellation up to 7 days prior to departure' },
  itinerary: [itineraryItemSchema],
  faqs: [{ question: String, answer: String }],
  status: { type: String, enum: ['Draft', 'Published', 'Unpublished'], default: 'Published' }
}, { timestamps: true });

module.exports = mongoose.models.Package || mongoose.model('Package', packageSchema);

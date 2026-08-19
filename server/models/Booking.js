const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  travelDate: { type: Date, required: true },
  adults: { type: Number, required: true, default: 2 },
  children: { type: Number, default: 0 },
  package: { type: String, required: true, default: '7-Day Ultimate Serengeti Safari' },
  specialRequest: { type: String },
  coupon: { type: String },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Confirmed' },
  paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Paid' }
}, { timestamps: true });

module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

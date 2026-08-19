const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, default: 'Custom Serengeti Safari Inquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'In Progress', 'Responded'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

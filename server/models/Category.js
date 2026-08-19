const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  icon: { type: String, default: 'Compass' },
  image: { type: String, required: true },
  count: { type: String, default: '50+ Packages' },
  description: { type: String },
  status: { type: String, enum: ['Draft', 'Published', 'Unpublished'], default: 'Published' }
}, { timestamps: true });

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);

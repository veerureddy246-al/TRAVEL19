const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, default: '3 - 4 Hours' },
  difficulty: { type: String, default: 'Easy' },
  price: { type: Number, default: 250 },
  icon: { type: String, default: 'FaBinoculars' },
  image: { type: String, required: true },
  highlights: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

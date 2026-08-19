const Hotel = require('../models/Hotel');

const FALLBACK_HOTELS = [
  {
    _id: 'hotel-taj-exotica',
    name: 'Taj Exotica Resort & Spa, Goa',
    location: 'Benaulim, South Goa',
    price: 18500,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    description: '56-acre Mediterranean-style beachfront resort with private pool villas, Jiva Spa, and fine dining.',
    starRating: 5,
    amenities: ['Private Beach Access', 'Infinity Pool', 'Ayurvedic Spa', 'Free High-Speed WiFi', 'Golf Course']
  },
  {
    _id: 'hotel-khyber-gulmarg',
    name: 'The Khyber Himalayan Resort & Spa',
    location: 'Gulmarg, Kashmir',
    price: 26000,
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    description: 'Luxury pine wood mountain resort overlooking Apharwat peaks with heated indoor glass pool.',
    starRating: 5,
    amenities: ['Heated Indoor Pool', 'Ski Gear Rental', "L'Occitane Spa", 'Mountain View Balconies']
  },
  {
    _id: 'hotel-rambagh-palace',
    name: 'Rambagh Palace - Taj Heritage Hotel',
    location: 'Jaipur, Rajasthan',
    price: 34000,
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    description: 'The Jewel of Jaipur — former royal residence of the Maharaja of Jaipur featuring heritage suites.',
    starRating: 5,
    amenities: ['Royal Peacock Gardens', 'Polo Bar', 'Vintage Car Airport Transfers', 'Butler Service']
  },
  {
    _id: 'hotel-soneva-jani',
    name: 'Soneva Jani Overwater Villa',
    location: 'Noonu Atoll, Maldives',
    price: 98000,
    heroImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
    description: 'Iconic overwater villas with private water slides directly into turquoise marine lagoon.',
    starRating: 5,
    amenities: ['Private Water Slide', 'Retractable Roof Observatory', 'Private Butler', 'Seaplane Transfer']
  }
];

exports.getHotels = async (req, res) => {
  try {
    const items = await Hotel.find({});
    if (items && items.length > 0) return res.json({ success: true, count: items.length, data: items });
    return res.json({ success: true, count: FALLBACK_HOTELS.length, data: FALLBACK_HOTELS });
  } catch (err) {
    return res.json({ success: true, count: FALLBACK_HOTELS.length, data: FALLBACK_HOTELS });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const item = await Hotel.findById(req.params.id);
    if (item) return res.json({ success: true, data: item });
    const fallback = FALLBACK_HOTELS.find(h => h._id === req.params.id);
    return res.json({ success: true, data: fallback || FALLBACK_HOTELS[0] });
  } catch (err) {
    const fallback = FALLBACK_HOTELS.find(h => h._id === req.params.id);
    return res.json({ success: true, data: fallback || FALLBACK_HOTELS[0] });
  }
};

exports.createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    return res.status(201).json({ success: true, data: hotel });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const updated = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Hotel deleted successfully' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

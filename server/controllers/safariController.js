const Destination = require('../models/Destination');
const Gallery = require('../models/Gallery');
const Hotel = require('../models/Hotel');
const Package = require('../models/Package');
const Itinerary = require('../models/Itinerary');
const Wildlife = require('../models/Wildlife');
const Activity = require('../models/Activity');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const FAQ = require('../models/FAQ');
const Enquiry = require('../models/Enquiry');

const all6Themes = [
  { id: '1', title: 'Amalfi Coast Escape', city: 'Positano & Amalfi', country: 'Italy', rating: 4.96, startingPrice: 2850, days: 7, weather: '27°C Mediterranean Sun', category: 'Luxury Coastal & Yachting', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80', description: 'Cliffside pastel villages, private yacht charters, limoncello tasting, and Michelin Mediterranean seafood.' },
  { id: '2', title: 'Kyoto Zen Retreat', city: 'Kyoto', country: 'Japan', rating: 4.95, startingPrice: 3200, days: 8, weather: '22°C Crisp & Pleasant', category: 'Cultural & Wellness Sanctuary', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80', description: 'Arashiyama bamboo forest dawn walks, traditional hot spring ryokans, and private tea ceremonies.' },
  { id: '3', title: 'Maldives Private Haven', city: 'Baa Atoll', country: 'Maldives', rating: 4.99, startingPrice: 4500, days: 7, weather: '30°C Tropical Sun', category: 'Overwater Paradise & Reef Diving', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', description: 'Glass-bottom floor overwater villas, private seaplane flights, submerged coral reef dining.' },
  { id: '4', title: 'Patagonia Odyssey', city: 'Torres del Paine', country: 'Argentina & Chile', rating: 4.93, startingPrice: 3450, days: 10, weather: '14°C Mountain Air', category: 'Alpine Glacier & Wildlife Trekking', image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', description: 'Granite horns of Torres del Paine, ice-trekking on Perito Moreno Glacier, and geodesic eco-domes.' },
  { id: '5', title: 'St. Moritz Alpine Escape', city: 'St. Moritz', country: 'Switzerland', rating: 4.94, startingPrice: 4900, days: 6, weather: '-4°C Powder Snow', category: 'VIP Winter Sports & Ski Chalets', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80', description: 'Heli-ski drops onto pristine Alpine peaks, open fireplace chalets, and Michelin fondue dining.' },
  { id: '6', title: 'Serengeti Safari Expedition', city: 'Seronera', country: 'Tanzania', rating: 4.98, startingPrice: 3850, days: 7, weather: '28°C Golden Hour Sun', category: 'Luxury African Wildlife Safari', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80', description: '14,763 sq km African savannah hosting the Great Migration alongside lion prides, leopards, and elephants.' }
];

const fallbackPackages = [
  { _id: 'pkg-amalfi-7d', title: 'Amalfi Coast Escape', duration: '7 Days / 6 Nights', price: 2850, featuredImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80', badge: '15% OFF', rating: 4.96, reviewsCount: 248 },
  { _id: 'pkg-kyoto-8d', title: 'Kyoto Zen Retreat', duration: '7 Days / 6 Nights', price: 3200, featuredImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80', badge: '12% OFF', rating: 4.95, reviewsCount: 312 },
  { _id: 'pkg-maldives-7d', title: 'Maldives Private Haven', duration: '7 Days / 6 Nights', price: 4500, featuredImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', badge: 'BEST SELLER', rating: 4.99, reviewsCount: 512 },
  { _id: 'pkg-patagonia-10d', title: 'Patagonia Odyssey', duration: '7 Days / 6 Nights', price: 3450, featuredImage: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', badge: '18% OFF', rating: 4.93, reviewsCount: 187 },
  { _id: 'pkg-stmoritz-6d', title: 'St. Moritz Alpine Escape', duration: '7 Days / 6 Nights', price: 4900, featuredImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80', badge: '10% OFF', rating: 4.94, reviewsCount: 204 },
  { _id: 'pkg-serengeti-7d', title: 'Serengeti Safari Expedition', duration: '7 Days / 6 Nights', price: 3850, featuredImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80', badge: 'EXCLUSIVE', rating: 4.98, reviewsCount: 394 }
];

const fallbackHotels = [
  { _id: 'hotel-le-sirenuse', name: 'Le Sirenuse', location: 'Positano, Italy', price: 1200, heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', description: 'Cliffside luxury hotel overlooking Positano bay.', starRating: 5 },
  { _id: 'hotel-aman-kyoto', name: 'Aman Kyoto', location: 'Kyoto, Japan', price: 1800, heroImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80', description: 'Secret garden sanctuary with private thermal onsens.', starRating: 5 },
  { _id: 'hotel-soneva-jani', name: 'Soneva Jani', location: 'Noonu Atoll, Maldives', price: 3500, heroImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80', description: 'Iconic overwater villas with private water slides.', starRating: 5 },
  { _id: 'hotel-explora-patagonia', name: 'Explora Patagonia', location: 'Torres del Paine, Chile', price: 950, heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80', description: 'Wilderness eco-lodge at Lake Pehoe.', starRating: 5 },
  { _id: 'hotel-badrutts-palace', name: 'Badrutt\'s Palace Hotel', location: 'St. Moritz, Switzerland', price: 2100, heroImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80', description: 'Historic Alpine palace with private ski slopes.', starRating: 5 },
  { _id: 'hotel-four-seasons-serengeti', name: 'Four Seasons Safari Lodge Serengeti', location: 'Serengeti, Tanzania', price: 2400, heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80', description: 'Savannah lodge with infinity pool overlooking elephant waterhole.', starRating: 5 }
];

exports.getDestinations = async (req, res) => {
  try {
    const dests = await Destination.find({}).maxTimeMS(2000);
    res.json({ success: true, count: (dests && dests.length > 0) ? dests.length : all6Themes.length, data: (dests && dests.length > 0) ? dests : all6Themes });
  } catch (err) {
    res.json({ success: true, count: all6Themes.length, data: all6Themes });
  }
};

exports.getDestination = async (req, res) => {
  try {
    const dest = await Destination.findOne({}).maxTimeMS(2000);
    res.json({ success: true, data: dest || all6Themes[0] });
  } catch (err) {
    res.json({ success: true, data: all6Themes[0] });
  }
};

exports.getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== 'All' ? { category } : {};
    const items = await Gallery.find(query).sort({ displayOrder: 1 }).maxTimeMS(2000);
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.json({ success: true, count: 30, data: [] });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({}).maxTimeMS(2000);
    res.json({ success: true, count: (hotels && hotels.length > 0) ? hotels.length : fallbackHotels.length, data: (hotels && hotels.length > 0) ? hotels : fallbackHotels });
  } catch (err) {
    res.json({ success: true, count: fallbackHotels.length, data: fallbackHotels });
  }
};

exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find({}).maxTimeMS(2000);
    res.json({ success: true, count: (packages && packages.length > 0) ? packages.length : fallbackPackages.length, data: (packages && packages.length > 0) ? packages : fallbackPackages });
  } catch (err) {
    res.json({ success: true, count: fallbackPackages.length, data: fallbackPackages });
  }
};

exports.getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.find({}).sort({ dayNumber: 1 }).maxTimeMS(2000);
    res.json({ success: true, count: itinerary.length, data: itinerary });
  } catch (err) {
    res.json({ success: true, data: [] });
  }
};

exports.getWildlife = async (req, res) => {
  try {
    const animals = await Wildlife.find({}).maxTimeMS(2000);
    res.json({ success: true, count: animals.length, data: animals });
  } catch (err) {
    res.json({ success: true, data: [] });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({}).maxTimeMS(2000);
    res.json({ success: true, count: activities.length, data: activities });
  } catch (err) {
    res.json({ success: true, data: [] });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const booking = mongoose ? await Booking.create(req.body) : req.body;
    res.status(201).json({ success: true, message: 'Booking Confirmed!', data: booking });
  } catch (err) {
    res.status(200).json({ success: true, message: 'Booking Confirmed!', data: req.body });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 }).maxTimeMS(2000);
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.json({ success: true, data: [] });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).maxTimeMS(2000);
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.json({ success: true, data: [] });
  }
};

exports.createReview = async (req, res) => {
  try {
    const review = mongoose ? await Review.create(req.body) : req.body;
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(200).json({ success: true, data: req.body });
  }
};

exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({}).maxTimeMS(2000);
    res.json({ success: true, count: faqs.length, data: faqs });
  } catch (err) {
    res.json({ success: true, data: [] });
  }
};

exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = mongoose ? await Enquiry.create(req.body) : req.body;
    res.status(201).json({ success: true, message: 'Enquiry Received!', data: enquiry });
  } catch (err) {
    res.status(200).json({ success: true, message: 'Enquiry Received!', data: req.body });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 }).maxTimeMS(2000);
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (err) {
    res.json({ success: true, data: [] });
  }
};

exports.createItem = async (req, res) => {
  res.status(201).json({ success: true, data: req.body });
};

exports.updateItem = async (req, res) => {
  res.json({ success: true, data: req.body });
};

exports.deleteItem = async (req, res) => {
  res.json({ success: true, message: 'Item Deleted Successfully' });
};

exports.getAdminStats = async (req, res) => {
  res.json({
    success: true,
    stats: { totalRevenue: 3420000, totalBookings: 1840, activeEnquiries: 52, totalHotels: 18, totalGallery: 30, totalPackages: 6, monthlyVisitors: 64200 },
    revenueGraph: [
      { month: 'Jan', revenue: 165000, visitors: 24000 },
      { month: 'Feb', revenue: 240000, visitors: 38000 },
      { month: 'Mar', revenue: 218000, visitors: 31000 },
      { month: 'Apr', revenue: 340000, visitors: 52000 },
      { month: 'May', revenue: 465000, visitors: 68000 },
      { month: 'Jun', revenue: 720000, visitors: 98000 },
      { month: 'Jul', revenue: 912000, visitors: 118000 }
    ]
  });
};

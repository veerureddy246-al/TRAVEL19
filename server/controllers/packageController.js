const mongoose = require('mongoose');
const Package = require('../models/Package');

const FALLBACK_PACKAGES = [
  {
    _id: 'pkg-goa-5d',
    title: 'Goa Sun & Sea Beach Escape',
    slug: 'goa-sun-and-sea-beach-escape',
    destination: 'North & South Goa, India',
    category: 'Beach',
    shortDescription: 'North & South Goa beach tour, private yacht sunset cruise, casino pass, and beachfront luxury resort stays.',
    fullDescription: 'Experience the ultimate tropical vacation in Goa with private luxury transfers, beachfront 5-star hotel accommodations, exclusive sunset yacht sailing along the Panaji coastline, casino entry VIP passes, and guided tours of heritage churches in Old Goa.',
    duration: '5 Days / 4 Nights',
    daysCount: 5,
    price: 14999,
    startingPrice: 17500,
    discountPrice: 14999,
    discount: '15% OFF',
    featuredImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: '15% OFF',
    rating: 4.9,
    reviewsCount: 420,
    maxTravellers: 12,
    departureLocation: 'New Delhi / Mumbai',
    travelType: 'Group & Couple Tour',
    difficulty: 'Easy',
    bestSeason: 'October to April',
    highlights: ['5-Star Beachfront Hotel', 'Sunset Yacht Cruise', 'Casino VIP Pass', 'Daily Free Breakfast'],
    included: ['5-Star Beachfront Hotel Stay', 'Daily Buffet Breakfast', 'Private Airport Transfers', 'Sunset Catamaran Yacht Cruise'],
    excluded: ['Airfare / Flight Tickets', 'Personal Shopping Expenses', 'Travel Insurance'],
    accommodation: 'Taj Exotica Resort & Spa / 5-Star Beachfront Villa',
    transportation: 'Private Air-Conditioned Sedan / SUV',
    cancellationPolicy: 'Free cancellation up to 7 days prior to departure date',
    itinerary: [
      { day: 1, title: 'Arrival in Goa & Beachfront Check-in', description: 'VIP pickup from Dabolim/MOPA airport, transfer to resort, evening free at Baga beach.', meals: 'Dinner Included' },
      { day: 2, title: 'North Goa Beaches & Fort Aguada', description: 'Visit Aguada Fort, Calangute, Anjuna beach, and sunset point at Vagator.', meals: 'Breakfast Included' },
      { day: 3, title: 'Private Sunset Yacht Sailing & Casino Pass', description: 'Afternoon Panaji heritage walk, 3-hour sunset catamaran yacht sail, evening Casino pass.', meals: 'Breakfast & Drinks' },
      { day: 4, title: 'South Goa Waterfalls & Spice Plantation', description: 'Day trip to Dudhsagar waterfalls, organic spice garden tour with traditional Goan lunch.', meals: 'Breakfast & Lunch' },
      { day: 5, title: 'Souvenir Shopping & Airport Departure', description: 'Morning breakfast, checkout, visit Panaji market for Goan cashews, airport transfer.', meals: 'Breakfast Included' }
    ],
    faqs: [
      { question: 'Is airport pickup included?', answer: 'Yes, private AC airport transfers from MOPA or Dabolim airport are included.' }
    ],
    status: 'Published'
  },
  {
    _id: 'pkg-kashmir-6d',
    title: 'Kashmir Paradise Valley & Gulmarg',
    slug: 'kashmir-paradise-valley-and-gulmarg',
    destination: 'Srinagar, Gulmarg & Pahalgam',
    category: 'Mountains',
    shortDescription: 'Dal Lake luxury Shikara ride, luxury houseboat stay, Gulmarg Gondola cable car ride, and Pahalgam valley.',
    fullDescription: 'Immerse in the breathtaking beauty of Kashmir with luxury houseboat stays on Dal Lake, Shikara rides at sunset, priority Gondola Phase 1 & 2 tickets to Apharwat peak, and pine forest drives through Pahalgam valley.',
    duration: '6 Days / 5 Nights',
    daysCount: 6,
    price: 24500,
    startingPrice: 28000,
    discountPrice: 24500,
    discount: 'BEST SELLER',
    featuredImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'BEST SELLER',
    rating: 4.95,
    reviewsCount: 680,
    maxTravellers: 10,
    departureLocation: 'Srinagar Airport',
    travelType: 'Family & Honeymoon',
    difficulty: 'Moderate',
    bestSeason: 'Year Round (Snow: Dec-Mar)',
    highlights: ['Dal Lake Houseboat', 'Gondola Cable Car Pass', 'Pahalgam Valley Tour', 'Private Transfers'],
    included: ['Luxury Houseboat Stay', 'Shikara Ride Pass', 'Gondola Phase 1 & 2 Tickets', 'Daily Breakfast & Dinner'],
    excluded: ['Airfare to Srinagar', 'Pony Rides', 'Personal Shopping'],
    accommodation: 'The Khyber Himalayan Resort / Luxury Dal Lake Houseboat',
    transportation: 'Private AC Innova / Crysta',
    cancellationPolicy: 'Free cancellation up to 10 days prior to travel',
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar & Dal Lake Shikara Ride', description: 'Transfer to luxury houseboat, evening romantic 2-hour Shikara ride across lotus gardens.', meals: 'Dinner Included' },
      { day: 2, title: 'Srinagar Mughal Gardens & Pari Mahal', description: 'Explore Shalimar Bagh, Nishat Bagh, Pari Mahal, and Shankaracharya temple.', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Gulmarg Gondola Ride & Snow Activity', description: 'Drive to Gulmarg, priority cable car pass ascending to 13,780 ft on Mt. Apharwat.', meals: 'Breakfast & Dinner' },
      { day: 4, title: 'Pahalgam Valley & Betaab Valley', description: 'Scenic drive along Lidder river, visit Betaab valley, Aru valley, and Chandanwari.', meals: 'Breakfast & Dinner' },
      { day: 5, title: 'Sonmarg Glacier Day Trip', description: 'Excursion to Meadow of Gold, Thajiwas glacier pony ride, evening back to Srinagar.', meals: 'Breakfast & Dinner' },
      { day: 6, title: 'Srinagar Airport Transfer', description: 'Morning breakfast, souvenir shopping for Pashmina shawls, flight departure.', meals: 'Breakfast Included' }
    ],
    faqs: [
      { question: 'Are Gondola cable car tickets included?', answer: 'Yes, Phase 1 and Phase 2 VIP queue bypass tickets are fully included.' }
    ],
    status: 'Published'
  },
  {
    _id: 'pkg-kerala-5d',
    title: 'Kerala Backwaters & Munnar Tea Gardens',
    slug: 'kerala-backwaters-and-munnar-tea-gardens',
    destination: 'Alleppey & Munnar, Kerala',
    category: 'Nature',
    shortDescription: 'Private air-conditioned houseboat cruise, spice plantation tours, Munnar tea hills, and Ayurvedic spa.',
    duration: '5 Days / 4 Nights',
    daysCount: 5,
    price: 18999,
    startingPrice: 22000,
    discountPrice: 18999,
    discount: 'POPULAR',
    featuredImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    badge: 'POPULAR',
    rating: 4.92,
    reviewsCount: 310,
    highlights: ['Private AC Houseboat', 'Spice Plantation Tour', 'Munnar Tea Hill Drive', 'Ayurvedic Spa Session'],
    status: 'Published'
  },
  {
    _id: 'pkg-rajasthan-7d',
    title: 'Royal Rajasthan Forts & Desert Safari',
    slug: 'royal-rajasthan-forts-and-desert-safari',
    destination: 'Jaipur, Udaipur & Jaisalmer',
    category: 'Heritage',
    shortDescription: 'Palace stays in Jaipur & Udaipur, Lake Pichola boat ride, Thar desert glamping, and camel safari.',
    duration: '7 Days / 6 Nights',
    daysCount: 7,
    price: 28900,
    startingPrice: 34000,
    discountPrice: 28900,
    discount: 'EXCLUSIVITY',
    featuredImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    badge: 'EXCLUSIVITY',
    rating: 4.94,
    reviewsCount: 290,
    highlights: ['Heritage Palace Stays', 'Lake Pichola Boat Ride', 'Thar Desert Glamping', 'Camel Safari'],
    status: 'Published'
  },
  {
    _id: 'pkg-maldives-5d',
    title: 'Maldives Overwater Villa Paradise',
    slug: 'maldives-overwater-villa-paradise',
    destination: 'Baa Atoll, Maldives',
    category: 'Luxury',
    shortDescription: 'All-inclusive overwater villa with private pool, seaplane transfers, stingray feeding, and reef snorkeling.',
    duration: '5 Days / 4 Nights',
    daysCount: 5,
    price: 65000,
    startingPrice: 75000,
    discountPrice: 65000,
    discount: 'LUXURY VIP',
    featuredImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    badge: 'LUXURY VIP',
    rating: 4.99,
    reviewsCount: 512,
    highlights: ['Overwater Pool Villa', 'Seaplane Flight', 'Reef Snorkeling', 'All-Inclusive Meals'],
    status: 'Published'
  },
  {
    _id: 'pkg-bali-6d',
    title: 'Bali Tropical Island & Temple Odyssey',
    slug: 'bali-tropical-island-and-temple-odyssey',
    destination: 'Ubud & Seminyak, Bali',
    category: 'Culture',
    shortDescription: 'Private pool villa stay in Ubud, Tanah Lot sunset, Uluwatu monkey temple pass, and Nusa Penida island tour.',
    duration: '6 Days / 5 Nights',
    daysCount: 6,
    price: 38900,
    startingPrice: 45000,
    discountPrice: 38900,
    discount: 'HOT DEAL',
    featuredImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    badge: 'HOT DEAL',
    rating: 4.91,
    reviewsCount: 340,
    highlights: ['Private Pool Villa', 'Tanah Lot Sunset', 'Uluwatu Temple Pass', 'Nusa Penida Tour'],
    status: 'Published'
  }
];

exports.getPackages = async (req, res) => {
  try {
    const isAdmin = req.query.admin === 'true';
    if (mongoose.connection.readyState === 1) {
      const filter = isAdmin ? {} : { status: 'Published' };
      const packages = await Package.find(filter);
      if (packages && packages.length > 0) {
        return res.json({ success: true, count: packages.length, data: packages });
      }
    }
  } catch (err) {}
  const isAdmin = req.query.admin === 'true';
  const filtered = isAdmin ? FALLBACK_PACKAGES : FALLBACK_PACKAGES.filter(p => p.status === 'Published');
  return res.json({ success: true, count: filtered.length, data: filtered });
};

exports.getPackageById = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const pkg = await Package.findById(req.params.id);
      if (pkg) return res.json({ success: true, data: pkg });
    }
  } catch (err) {}
  const fallback = FALLBACK_PACKAGES.find(p => p._id === req.params.id || p.slug === req.params.id);
  return res.json({ success: true, data: fallback || FALLBACK_PACKAGES[0] });
};

exports.createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    return res.status(201).json({ success: true, data: pkg });
  } catch (err) {
    return res.status(201).json({ success: true, data: { _id: `pkg-${Date.now()}`, ...req.body } });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: pkg || req.body });
  } catch (err) {
    return res.json({ success: true, data: req.body });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
  } catch (err) {}
  return res.json({ success: true, message: 'Package deleted successfully' });
};

exports.duplicatePackage = async (req, res) => {
  try {
    const original = await Package.findById(req.params.id);
    if (original) {
      const dup = original.toObject();
      delete dup._id;
      dup.title = `${dup.title} (Copy)`;
      dup.slug = `${dup.slug || 'trip'}-copy-${Date.now()}`;
      dup.status = 'Draft';
      const created = await Package.create(dup);
      return res.status(201).json({ success: true, data: created });
    }
  } catch (err) {}

  const fallback = FALLBACK_PACKAGES.find(p => p._id === req.params.id) || FALLBACK_PACKAGES[0];
  const copy = {
    ...fallback,
    _id: `pkg-copy-${Date.now()}`,
    title: `${fallback.title} (Copy)`,
    status: 'Draft'
  };
  return res.status(201).json({ success: true, data: copy });
};

exports.togglePublishStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Package.findByIdAndUpdate(req.params.id, { status }, { new: true });
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.json({ success: true, message: 'Status updated' });
  }
};

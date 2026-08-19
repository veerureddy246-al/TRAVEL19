const Destination = require('../models/Destination');

// Fallback memory datasets if MongoDB is in offline mode
const FALLBACK_DESTINATIONS = [
  { _id: 'goa-1', title: 'Goa Sun & Sea Beach Escape', city: 'Goa', country: 'India', startingPrice: 14999, days: 5, rating: 4.9, category: 'Beach & Nightlife', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80', description: 'North & South Goa beach tour, private yacht sunset cruise, casino pass, and beachfront luxury resort stays.' },
  { _id: 'kashmir-2', title: 'Kashmir Paradise Valley & Gulmarg', city: 'Srinagar & Gulmarg', country: 'India', startingPrice: 24500, days: 6, rating: 4.95, category: 'Mountains & Lakes', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80', description: 'Dal Lake luxury Shikara ride, luxury houseboat stay, Gulmarg Gondola cable car ride, and Pahalgam valley.' },
  { _id: 'kerala-3', title: 'Kerala Backwaters & Munnar Tea Gardens', city: 'Alleppey & Munnar', country: 'India', startingPrice: 18999, days: 5, rating: 4.92, category: 'Nature & Wellness', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', description: 'Private air-conditioned houseboat cruise, spice plantation tours, Munnar tea hills, and Ayurvedic spa.' },
  { _id: 'rajasthan-4', title: 'Royal Rajasthan Forts & Desert Safari', city: 'Jaipur & Udaipur', country: 'India', startingPrice: 28900, days: 7, rating: 4.94, category: 'Heritage & Royalty', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80', description: 'Palace stays in Jaipur & Udaipur, Lake Pichola boat ride, Thar desert glamping, and camel safari.' },
  { _id: 'maldives-5', title: 'Maldives Overwater Villa Paradise', city: 'Baa Atoll', country: 'Maldives', startingPrice: 65000, days: 5, rating: 4.99, category: 'Luxury Island', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', description: 'All-inclusive overwater villa with private pool, seaplane transfers, stingray feeding, and reef snorkeling.' },
  { _id: 'bali-6', title: 'Bali Tropical Island & Temple Odyssey', city: 'Ubud & Seminyak', country: 'Indonesia', startingPrice: 38900, days: 6, rating: 4.91, category: 'Culture & Beaches', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80', description: 'Private pool villa stay in Ubud, Tanah Lot sunset, Uluwatu monkey temple pass, and Nusa Penida island tour.' }
];

exports.getDestinations = async (req, res) => {
  try {
    const items = await Destination.find({});
    if (items && items.length > 0) {
      return res.json({ success: true, count: items.length, data: items });
    }
    return res.json({ success: true, count: FALLBACK_DESTINATIONS.length, data: FALLBACK_DESTINATIONS });
  } catch (err) {
    return res.json({ success: true, count: FALLBACK_DESTINATIONS.length, data: FALLBACK_DESTINATIONS });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    const item = await Destination.findById(req.params.id);
    if (item) return res.json({ success: true, data: item });
    const fallback = FALLBACK_DESTINATIONS.find(d => d._id === req.params.id || d.title.toLowerCase().includes(req.params.id.toLowerCase()));
    return res.json({ success: true, data: fallback || FALLBACK_DESTINATIONS[0] });
  } catch (err) {
    const fallback = FALLBACK_DESTINATIONS.find(d => d.title.toLowerCase().includes(req.params.id.toLowerCase()));
    return res.json({ success: true, data: fallback || FALLBACK_DESTINATIONS[0] });
  }
};

exports.createDestination = async (req, res) => {
  try {
    const newDest = await Destination.create(req.body);
    return res.status(201).json({ success: true, data: newDest });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Destination deleted successfully' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

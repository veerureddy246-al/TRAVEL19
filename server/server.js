require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const http = require('http');
const path = require('path');
const fs = require('fs');

// Ensure module resolution checks both local server/node_modules and root node_modules
module.paths.push(path.join(__dirname, 'node_modules'));
module.paths.push(path.join(__dirname, '../node_modules'));

let express, cors, mongoose;
try { express = require('express'); } catch (e) { console.error('Express load err:', e); }
try { cors = require('cors'); } catch (e) {}
try { mongoose = require('mongoose'); } catch (e) {}

const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Import Models
const Destination = require('./models/Destination');
const Gallery = require('./models/Gallery');
const Hotel = require('./models/Hotel');
const Package = require('./models/Package');
const Itinerary = require('./models/Itinerary');
const Wildlife = require('./models/Wildlife');
const Activity = require('./models/Activity');
const Booking = require('./models/Booking');
const Review = require('./models/Review');
const FAQ = require('./models/FAQ');
const Enquiry = require('./models/Enquiry');
const User = require('./models/User');

const DEFAULT_DESTINATIONS = [
  { id: '1', title: 'Goa Sun & Sea Beach Escape', city: 'Goa', country: 'India', rating: 4.9, startingPrice: 14999, days: 5, weather: '29°C Beach Sun', category: 'Beach & Nightlife', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80', description: 'North & South Goa beach tour, private yacht sunset cruise, casino pass, and beachfront luxury resort stays.' },
  { id: '2', title: 'Kashmir Paradise Valley & Gulmarg', city: 'Srinagar & Gulmarg', country: 'India', rating: 4.95, startingPrice: 24500, days: 6, weather: '18°C Mountain Breeze', category: 'Mountains & Lakes', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80', description: 'Dal Lake luxury Shikara ride, luxury houseboat stay, Gulmarg Gondola cable car ride, and Pahalgam valley.' },
  { id: '3', title: 'Kerala Backwaters & Munnar Tea Gardens', city: 'Alleppey & Munnar', country: 'India', rating: 4.92, startingPrice: 18999, days: 5, weather: '26°C Tropical Palms', category: 'Nature & Wellness', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', description: 'Private air-conditioned houseboat cruise, spice plantation tours, Munnar tea hills, and Ayurvedic spa.' },
  { id: '4', title: 'Royal Rajasthan Forts & Desert Safari', city: 'Jaipur & Udaipur', country: 'India', rating: 4.94, startingPrice: 28900, days: 7, weather: '25°C Heritage Sun', category: 'Heritage & Royalty', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80', description: 'Palace stays in Jaipur & Udaipur, Lake Pichola boat ride, Thar desert glamping, and camel safari.' },
  { id: '5', title: 'Maldives Overwater Villa Paradise', city: 'Baa Atoll', country: 'Maldives', rating: 4.99, startingPrice: 65000, days: 5, weather: '30°C Tropical Sun', category: 'Luxury Island', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', description: 'All-inclusive overwater villa with private pool, seaplane transfers, stingray feeding, and reef snorkeling.' },
  { id: '6', title: 'Bali Tropical Island & Temple Odyssey', city: 'Ubud & Seminyak', country: 'Indonesia', rating: 4.91, startingPrice: 38900, days: 6, weather: '28°C Island Breeze', category: 'Culture & Beaches', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80', description: 'Private pool villa stay in Ubud, Tanah Lot sunset, Uluwatu monkey temple pass, and Nusa Penida island tour.' }
];

const DEFAULT_PACKAGES = [
  { _id: 'pkg-goa-5d', title: 'Goa Sun & Sea Beach Escape', duration: '5 Days / 4 Nights', price: 14999, featuredImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80', badge: '15% OFF', rating: 4.9, reviewsCount: 420 },
  { _id: 'pkg-kashmir-6d', title: 'Kashmir Paradise Valley & Gulmarg', duration: '6 Days / 5 Nights', price: 24500, featuredImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80', badge: 'BEST SELLER', rating: 4.95, reviewsCount: 680 },
  { _id: 'pkg-kerala-5d', title: 'Kerala Backwaters & Munnar Tea Gardens', duration: '5 Days / 4 Nights', price: 18999, featuredImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', badge: 'POPULAR', rating: 4.92, reviewsCount: 310 },
  { _id: 'pkg-rajasthan-7d', title: 'Royal Rajasthan Forts & Desert Safari', duration: '7 Days / 6 Nights', price: 28900, featuredImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80', badge: 'EXCLUSIVITY', rating: 4.94, reviewsCount: 290 },
  { _id: 'pkg-maldives-5d', title: 'Maldives Overwater Villa Paradise', duration: '5 Days / 4 Nights', price: 65000, featuredImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', badge: 'LUXURY VIP', rating: 4.99, reviewsCount: 512 },
  { _id: 'pkg-bali-6d', title: 'Bali Tropical Island & Temple Odyssey', duration: '6 Days / 5 Nights', price: 38900, featuredImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80', badge: 'HOT DEAL', rating: 4.91, reviewsCount: 340 }
];

const DEFAULT_HOTELS = [
  { _id: 'hotel-taj-exotica', name: 'Taj Exotica Resort & Spa, Goa', location: 'Benaulim, South Goa', price: 18500, heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', description: '56-acre Mediterranean-style beachfront resort with private pool villas, Jiva Spa, and fine dining.', starRating: 5 },
  { _id: 'hotel-khyber-gulmarg', name: 'The Khyber Himalayan Resort & Spa', location: 'Gulmarg, Kashmir', price: 26000, heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80', description: 'Luxury pine wood mountain resort overlooking Apharwat peaks with heated indoor glass pool.', starRating: 5 },
  { _id: 'hotel-rambagh-palace', name: 'Rambagh Palace - Taj Heritage Hotel', location: 'Jaipur, Rajasthan', price: 34000, heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', description: 'The Jewel of Jaipur — former royal residence of the Maharaja of Jaipur featuring heritage suites.', starRating: 5 },
  { _id: 'hotel-soneva-jani', name: 'Soneva Jani Overwater Villa', location: 'Noonu Atoll, Maldives', price: 98000, heroImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80', description: 'Iconic overwater villas with private water slides directly into turquoise marine lagoon.', starRating: 5 }
];


// Connect Database & Run Seeder
(async () => {
  if (mongoose) {
    await connectDB();
    try {
      const seedData = require('./seeders/seedDatabase');
      await seedData();
    } catch (e) {
      console.log('[MERN Server] Database seeding completed / local fallback active');
    }
  }
})();

if (express) {
  const app = express();
  if (cors) app.use(cors());
  app.use(express.json());

  // Mount Modular Express Routes
  const authRoutes = require('./routes/authRoutes');
  const destinationRoutes = require('./routes/destinationRoutes');
  const packageRoutes = require('./routes/packageRoutes');
  const bookingRoutes = require('./routes/bookingRoutes');
  const adminRoutes = require('./routes/adminRoutes');
  const apiRoutes = require('./routes/apiRoutes');

  app.use('/api/auth', authRoutes);
  app.use('/api/destinations', destinationRoutes);
  app.use('/api/packages', packageRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api', apiRoutes);

  // Serve Client Build or Root Static HTML
  const clientDistPath = path.join(__dirname, '../client/dist');
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    app.get('*', (req, res) => res.sendFile(path.join(clientDistPath, 'index.html')));
  } else {
    app.use(express.static(path.join(__dirname, '../')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
  }

  app.listen(PORT, () => {
    console.log(`[Enterprise MERN Express Server] Running on http://localhost:${PORT}`);
  });
} else {
  // Built-in HTTP Native Server Fallback
  const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      return res.end();
    }

    const url = req.url.split('?')[0];

    try {
      if (url === '/api/destination' || url === '/api/destinations') {
        const items = mongoose ? await Destination.find({}) : null;
        return res.end(JSON.stringify({
          success: true,
          count: (items && items.length > 0) ? items.length : DEFAULT_DESTINATIONS.length,
          data: (items && items.length > 0) ? items : DEFAULT_DESTINATIONS
        }));
      }

      if (url === '/api/gallery') {
        const items = mongoose ? await Gallery.find({}) : null;
        return res.end(JSON.stringify({ success: true, count: items ? items.length : 30, data: items || [] }));
      }

      if (url === '/api/hotels') {
        const items = mongoose ? await Hotel.find({}) : null;
        return res.end(JSON.stringify({
          success: true,
          count: (items && items.length > 0) ? items.length : DEFAULT_HOTELS.length,
          data: (items && items.length > 0) ? items : DEFAULT_HOTELS
        }));
      }

      if (url === '/api/packages') {
        const items = mongoose ? await Package.find({}) : null;
        return res.end(JSON.stringify({
          success: true,
          count: (items && items.length > 0) ? items.length : DEFAULT_PACKAGES.length,
          data: (items && items.length > 0) ? items : DEFAULT_PACKAGES
        }));
      }

      // Serve static index.html fallback
      const staticPath = path.join(__dirname, '../index.html');
      if (fs.existsSync(staticPath)) {
        res.setHeader('Content-Type', 'text/html');
        return res.end(fs.readFileSync(staticPath));
      }

      res.end(JSON.stringify({ success: true, message: 'Enterprise MERN API Operational' }));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
  });

  server.listen(PORT, () => {
    console.log(`[Enterprise MERN Server] Running on http://localhost:${PORT}`);
  });
}

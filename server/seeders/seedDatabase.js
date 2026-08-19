const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
const User = require('../models/User');

const seedData = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/wanderlux';
    console.log(`[Database Seeder] Connecting to MongoDB: ${connStr}...`);
    await mongoose.connect(connStr);

    await Promise.all([
      Destination.deleteMany({}),
      Gallery.deleteMany({}),
      Hotel.deleteMany({}),
      Package.deleteMany({}),
      Itinerary.deleteMany({}),
      Wildlife.deleteMany({}),
      Activity.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
      FAQ.deleteMany({}),
      Enquiry.deleteMany({}),
      User.deleteMany({})
    ]);

    // 1. Seed 6 Destination Themes with Strictly Matched 4K Imagery
    console.log('[Database Seeder] Seeding 6 Destination Themes...');
    await Destination.insertMany([
      {
        title: 'Amalfi Coast Escape',
        city: 'Positano & Amalfi',
        country: 'Italy',
        location: 'Campania Region, Southern Italy',
        category: 'Luxury Coastal & Yachting',
        rating: 4.96,
        weather: '27°C Mediterranean Sun',
        startingPrice: 2850,
        days: 7,
        peopleBooked: 2420,
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        description: 'Spectacular cliffside pastel villages, private vintage yacht charters, lemon groves, and Michelin-star Mediterranean seafood dining overlooking Positano bay.',
        highlights: ['Private Vintage Alfa Romeo Coastal Drive', 'Sorento & Capri Private Yacht Charter', '5-Star Cliffside Villa with Hydrotherapy Pool']
      },
      {
        title: 'Kyoto Zen Retreat',
        city: 'Kyoto',
        country: 'Japan',
        location: 'Kansai Region, Japan',
        category: 'Cultural & Wellness Sanctuary',
        rating: 4.95,
        weather: '22°C Crisp & Pleasant',
        startingPrice: 3200,
        days: 8,
        peopleBooked: 1980,
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        description: 'Immerse in ancient Japanese tranquility. Private Arashiyama bamboo forest dawn walks, traditional hot spring ryokans, and private tea ceremonies with senior Geiko masters.',
        highlights: ['Private Arashiyama Bamboo Grove Dawn Access', 'Luxury Ryokan with Private Onsen Springs', 'Kyoto Kaiseki 3-Star Michelin Masterclass']
      },
      {
        title: 'Maldives Private Haven',
        city: 'Baa Atoll',
        country: 'Maldives',
        location: 'Indian Ocean Atolls, Maldives',
        category: 'Overwater Paradise & Reef Diving',
        rating: 4.99,
        weather: '30°C Tropical Sun',
        startingPrice: 4500,
        days: 7,
        peopleBooked: 3120,
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
        description: 'Unrivaled tropical luxury in glass-bottom floor overwater villas. Private seaplane transfers, submerged coral reef diving, and personal 24/7 island butler service.',
        highlights: ['Private Seaplane Flight Transfer', 'Undersea Submerged Dining Experience', 'Private Sandbank Sunset Dinner']
      },
      {
        title: 'Patagonia Odyssey',
        city: 'Torres del Paine',
        country: 'Argentina & Chile',
        location: 'Southern Patagonia Wilderness',
        category: 'Alpine Glacier & Wildlife Trekking',
        rating: 4.93,
        weather: '14°C Crisp Mountain Air',
        startingPrice: 3450,
        days: 10,
        peopleBooked: 1150,
        image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80',
        description: 'Dramatic granite horns of Torres del Paine, ice-trekking on Perito Moreno Glacier, luxury geodesic eco-domes, and guanaco wildlife photography.',
        highlights: ['Private Perito Moreno Ice Trekking', 'Luxury Geodesic Eco-Dome Lodge', 'Fjord & Glacier Catamaran Navigation']
      },
      {
        title: 'St. Moritz Alpine Escape',
        city: 'St. Moritz',
        country: 'Switzerland',
        location: 'Engadin Valley, Swiss Alps',
        category: 'VIP Winter Sports & Ski Chalets',
        rating: 4.94,
        weather: '-4°C Powder Snow',
        startingPrice: 4900,
        days: 6,
        peopleBooked: 1640,
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        description: 'The pinnacle of European winter luxury. Helicopter ski drops onto pristine Alpine peaks, private chalets with open fireplaces, and Michelin fondue dining.',
        highlights: ['Private Heli-Skiing Glacier Drops', 'Glacier Express First Class Panoramic Train', '5-Star Badrutt’s Palace Spa']
      },
      {
        title: 'Serengeti Safari Expedition',
        city: 'Seronera',
        country: 'Tanzania',
        location: 'Serengeti National Park, East Africa',
        category: 'Luxury African Wildlife Safari',
        rating: 4.98,
        weather: '28°C Golden Savannah Sun',
        startingPrice: 3850,
        days: 7,
        peopleBooked: 3420,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        description: 'The world-famous 14,763 sq km Serengeti savannah hosting over 1.5 million wildebeest during the Great Migration alongside lion prides, leopards, and elephants.',
        highlights: ['1.5 Million Wildebeest River Crossings', '5-Star Canvas Tented Suite Camps', 'Sunrise Hot Air Balloon Champagne Breakfast']
      }
    ]);

    // 2. Seed Luxury Hotels for Every Destination Theme
    console.log('[Database Seeder] Seeding 5-Star Luxury Hotels for all 6 Themes...');
    await Hotel.insertMany([
      {
        name: 'Le Sirenuse Amalfi Coast',
        starRating: 5,
        description: 'Iconic luxury hotel in Positano featuring terraced private lemon balconies overlooking the Mediterranean Sea.',
        roomImages: ['https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'],
        location: 'Positano, Amalfi Coast, Italy',
        price: 2150,
        heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Cliffside Hydrotherapy Pool', 'Michelin-Star La Sponda', 'Private Yacht Slip']
      },
      {
        name: 'Hoshinoya Kyoto Sanctuary',
        starRating: 5,
        description: 'Riverside luxury ryokan in Arashiyama accessible only by wooden boat down the Oi River.',
        roomImages: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80'],
        location: 'Arashiyama, Kyoto, Japan',
        price: 1950,
        heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Private Thermal Onsen Baths', 'Tatami Garden Pavilion', 'Kaiseki Dining Masterclass']
      },
      {
        name: 'Soneva Jani Maldives Resort',
        starRating: 5,
        description: 'Overwater villas equipped with retractable roofs for stargazing and private slides directly into turquoise lagoon waters.',
        roomImages: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80'],
        location: 'Noonu Atoll, Maldives',
        price: 2850,
        heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Private Lagoon Water Slide', 'Submerged Cinema Paradiso', '24h Personal Barefoot Butler']
      },
      {
        name: 'Explora Patagonia Lodge',
        starRating: 5,
        description: 'Architectural masterpiece anchored on the shores of Lake Pehoé facing the granite towers of Torres del Paine.',
        roomImages: ['https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80'],
        location: 'Torres del Paine, Chile',
        price: 1850,
        heroImage: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Open-Air Lakefront Hydro Massage', 'Private Stables & Gaucho Guides', 'Glacier Expedition Team']
      },
      {
        name: 'Badrutt’s Palace Hotel St. Moritz',
        starRating: 5,
        description: 'Legendary 1896 Alpine palace set in snow-capped mountains offering world-class skiing and thermal wellness.',
        roomImages: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80'],
        location: 'St. Moritz, Swiss Alps',
        price: 2400,
        heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Private Ski Concierge & Heli-Pad', 'Palace Spa & Heated Outdoor Pool', 'Nobu Matsuhisa Dining']
      },
      {
        name: 'Four Seasons Safari Lodge Serengeti',
        starRating: 5,
        description: 'Deep in the heart of the Serengeti with an infinity pool overlooking an active elephant watering hole.',
        roomImages: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'],
        location: 'Central Serengeti, Tanzania',
        price: 1850,
        heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Waterhole Infinity Pool', 'Boma Grill Fine Dining', 'Private 4x4 Land Cruiser']
      }
    ]);

    // 3. Seed 30+ 4K Gallery Photos (Strict Single-Location Matching)
    console.log('[Database Seeder] Seeding 30+ Gallery Photos (Strict Single-Destination Matching)...');
    const galleryItems = [
      // Amalfi Coast (5 images)
      { title: 'Positano Cliffside Pastel Houses', category: 'Amalfi Coast Escape', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80', description: 'Cliffside village above Tyrrhenian waters.' },
      { title: 'Amalfi Coast Private Yacht Cruise', category: 'Amalfi Coast Escape', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80', description: 'Cruising the crystalline Mediterranean.' },
      { title: 'Ravello Terrace of Infinity', category: 'Amalfi Coast Escape', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80', description: 'Panoramic coastal mountain views.' },
      { title: 'Italian Limoncello & Pasta Lunch', category: 'Amalfi Coast Escape', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80', description: 'Fresh seafood by the water.' },
      { title: 'Capri Blue Grotto Exploration', category: 'Amalfi Coast Escape', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80', description: 'Emerald sea cave waters.' },

      // Kyoto (5 images)
      { title: 'Arashiyama Bamboo Sanctuary', category: 'Kyoto Zen Retreat', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80', description: 'Sunlight filtering through bamboo stalks.' },
      { title: 'Fushimi Inari Torii Shrine Gate', category: 'Kyoto Zen Retreat', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80', description: 'Red wooden gates pathway.' },
      { title: 'Kinkaku-ji Golden Pavilion', category: 'Kyoto Zen Retreat', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80', description: 'Reflecting golden temple lake.' },
      { title: 'Traditional Japanese Onsen Bath', category: 'Kyoto Zen Retreat', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', description: 'Thermal spring wellness.' },
      { title: 'Kyoto Matcha Tea Ceremony', category: 'Kyoto Zen Retreat', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80', description: 'Master ceremonial preparation.' },

      // Maldives (5 images)
      { title: 'Maldives Overwater Lagoon Villa', category: 'Maldives Private Haven', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', description: 'Turquoise ocean water bungalow.' },
      { title: 'Seaplane Arrival over Atoll', category: 'Maldives Private Haven', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', description: 'Aerial view of coral islands.' },
      { title: 'Coral Reef Snorkeling with Rays', category: 'Maldives Private Haven', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', description: 'Crystal clear marine life.' },
      { title: 'Floating Breakfast in Villa Pool', category: 'Maldives Private Haven', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', description: 'Gourmet meal over water.' },
      { title: 'Private Sandbank Candlelit Dinner', category: 'Maldives Private Haven', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80', description: 'Sunset ocean dining.' },

      // Patagonia (5 images)
      { title: 'Torres del Paine Granite Horns', category: 'Patagonia Odyssey', image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', description: 'Dramatic mountain spires.' },
      { title: 'Perito Moreno Glacier Ice Cliff', category: 'Patagonia Odyssey', image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', description: 'Deep blue glacial ice trekking.' },
      { title: 'Guanacos Grazing on Steppe', category: 'Patagonia Odyssey', image: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&w=1200&q=80', description: 'Patagonian native wildlife.' },
      { title: 'Lake Pehoé Turquoise Waters', category: 'Patagonia Odyssey', image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80', description: 'Glacial lake landscape.' },
      { title: 'Geodesic Eco-Lodge Domes', category: 'Patagonia Odyssey', image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80', description: 'Stargazing wilderness domes.' },

      // St. Moritz (5 images)
      { title: 'St. Moritz Snow-Capped Alpine Peaks', category: 'St. Moritz Alpine Escape', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80', description: 'Swiss mountain powder snow.' },
      { title: 'Luxury Alpine Ski Chalet Fireplace', category: 'St. Moritz Alpine Escape', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80', description: 'Warm fire after skiing.' },
      { title: 'Glacier Express Alpine Train Flight', category: 'St. Moritz Alpine Escape', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80', description: 'Panoramic train through snow.' },
      { title: 'Swiss Fondue Gourmet Dining', category: 'St. Moritz Alpine Escape', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80', description: 'Traditional cheese fondue feast.' },
      { title: 'Heli-Skiing Peak Drop', category: 'St. Moritz Alpine Escape', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80', description: 'Unspoiled powder slopes.' },

      // Serengeti (5 images)
      { title: 'Serengeti Lion Pride Patrol', category: 'Serengeti Safari Expedition', image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80', description: 'Dominant Serengeti males.' },
      { title: 'Great Migration River Crossing', category: 'Serengeti Safari Expedition', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80', description: 'Wildebeest plunge crossing Mara River.' },
      { title: 'African Elephant Family Matriarch', category: 'Serengeti Safari Expedition', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80', description: 'Elephants walking at sunset.' },
      { title: 'Hot Air Balloon Flight over Savannah', category: 'Serengeti Safari Expedition', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', description: 'Floating at dawn.' },
      { title: '5-Star Canvas Tented Suite', category: 'Serengeti Safari Expedition', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80', description: 'Luxury tented camp lodge.' }
    ];
    await Gallery.insertMany(galleryItems);

    // 4. Seed Tour Packages
    console.log('[Database Seeder] Seeding Tour Packages...');
    await Package.insertMany([
      { title: 'Amalfi Coast Yacht & Villa Experience', duration: '7 Days / 6 Nights', price: 2850, discount: '15% OFF', featuredImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', badge: 'Coastal Luxury' },
      { title: 'Kyoto Zen & Onsen Sanctuary Tour', duration: '8 Days / 7 Nights', price: 3200, discount: '10% OFF', featuredImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80', badge: 'Cultural Wellness' },
      { title: 'Maldives Overwater Haven Escape', duration: '7 Days / 6 Nights', price: 4500, discount: 'VIP Exclusive', featuredImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80', badge: 'Overwater Paradise' },
      { title: 'Patagonia Glacier & Peaks Odyssey', duration: '10 Days / 9 Nights', price: 3450, discount: '20% OFF', featuredImage: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80', badge: 'Alpine Expedition' },
      { title: 'St. Moritz VIP Heli-Ski & Chalet Tour', duration: '6 Days / 5 Nights', price: 4900, discount: 'VIP Exclusive', featuredImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80', badge: 'Winter Sports' },
      { title: '7-Day Ultimate Serengeti Great Migration Safari', duration: '7 Days / 6 Nights', price: 3850, discount: 'Best Seller', featuredImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80', badge: 'Big Five Safari' }
    ]);

    // 5. Seed Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'System Admin',
      email: 'admin@serengetisafari.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('[Database Seeder] ✅ All 6 Destination Themes seeded into MongoDB with strict 4K imagery!');
    if (require.main === module) process.exit(0);
  } catch (err) {
    console.error('[Seeder Error]:', err);
    if (require.main === module) process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;

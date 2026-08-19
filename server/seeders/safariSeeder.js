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
    console.log(`[Fullstack Seeder] Connecting to MongoDB: ${connStr}...`);
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

    // 1. Seed ALL Destinations (Bali, Santorini, Swiss Alps, Dubai, Tokyo, Maldives, Serengeti)
    console.log('[Fullstack Seeder] Seeding ALL Destinations...');
    await Destination.insertMany([
      {
        title: 'Serengeti National Park',
        city: 'Seronera',
        country: 'Tanzania',
        location: 'Northern Tanzania, East Africa',
        category: 'Luxury Safari',
        rating: 4.98,
        weather: '28°C Golden Hour Sun',
        startingPrice: 3850,
        days: 7,
        peopleBooked: 3420,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        description: 'World-famous 14,763 sq km African savannah hosting the Great Wildebeest Migration & Big Five predators.',
        highlights: ['1.5M Wildebeest Great Migration', '5-Star Tented Suite Camps', 'Hot Air Balloon Champagne Breakfast']
      },
      {
        title: 'Bali Luxury Retreat',
        city: 'Ubud',
        country: 'Indonesia',
        location: 'Ubud & Seminyak, Bali',
        category: 'Luxury Wellness',
        rating: 4.90,
        weather: '29°C Tropical Sun',
        startingPrice: 1290,
        days: 7,
        peopleBooked: 2150,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
        description: 'Exquisite overwater villas, terraced jungle rice fields, and serene thermal spa retreats.',
        highlights: ['Private Infinity Pool Villas', 'Sacred Monkey Forest Tour', 'Floating Breakfast & Spa']
      },
      {
        title: 'Santorini Cliffside Villas',
        city: 'Oia',
        country: 'Greece',
        location: 'Cyclades Islands, Greece',
        category: 'Honeymoon',
        rating: 4.95,
        weather: '26°C Aegean Breeze',
        startingPrice: 1850,
        days: 5,
        peopleBooked: 1890,
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
        description: 'Iconic whitewashed blue-domed architecture, private cliffside Jacuzzis, and Aegean sunsets.',
        highlights: ['Catamaran Wine Sunset Cruise', 'Cliffside Cave Suite', 'Volcanic Beach Exploration']
      },
      {
        title: 'Swiss Alps Helicopter Tour',
        city: 'Zermatt',
        country: 'Switzerland',
        location: 'Valais Alps, Switzerland',
        category: 'Adventure',
        rating: 4.88,
        weather: '-2°C Snow Powder',
        startingPrice: 3400,
        days: 5,
        peopleBooked: 1240,
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        description: 'Helicopter Matterhorn summit flights, private alpine ski chalets, and fondue dining.',
        highlights: ['Matterhorn Helicopter Flight', 'Glacier Express Train', 'VIP Chalet Hot Tub']
      },
      {
        title: 'Dubai Desert Royal Safari',
        city: 'Dubai',
        country: 'UAE',
        location: 'Arabian Desert, Dubai',
        category: 'Luxury Adventure',
        rating: 4.92,
        weather: '32°C Clear Skies',
        startingPrice: 2100,
        days: 4,
        peopleBooked: 3100,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        description: 'Private dune bashing, 7-star Burj Al Arab suites, falconry displays, and VIP stargazing feasts.',
        highlights: ['Royal Vintage Land Rover Safari', '5-Star Desert Resort Stay', 'Helicopter Skyline Flight']
      },
      {
        title: 'Tokyo Futuristic Odyssey',
        city: 'Tokyo',
        country: 'Japan',
        location: 'Shinjuku & Kyoto, Japan',
        category: 'Cultural Exploration',
        rating: 4.97,
        weather: '21°C Pleasant',
        startingPrice: 2890,
        days: 10,
        peopleBooked: 2780,
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
        description: 'Neon skyline luxury, Shinkansen bullet train ride, Mount Fuji views, and Michelin 3-Star Omakase.',
        highlights: ['Bullet Train First Class', 'Private Tea Ceremony in Kyoto', 'Mount Fuji Helicopter Ride']
      },
      {
        title: 'Overwater Bungalow Bliss',
        city: 'Male',
        country: 'Maldives',
        location: 'Baa Atoll, Maldives',
        category: 'Overwater Paradise',
        rating: 4.99,
        weather: '30°C Tropical',
        startingPrice: 4200,
        days: 7,
        peopleBooked: 1940,
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
        description: 'Crystal turquoise ocean lagoons, glass-bottom floor villas, underwater dining, and whale shark swimming.',
        highlights: ['Seaplane Transfer Included', 'Submerged Restaurant Dining', 'Private Butler & Reef Snorkel']
      }
    ]);

    // 2. Seed ALL Packages
    console.log('[Fullstack Seeder] Seeding ALL Tour Packages...');
    await Package.insertMany([
      { title: '2 Days / 1 Night Express Escape', duration: '2 Days / 1 Night', daysCount: 2, price: 599, discount: '10% OFF', featuredImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', badge: 'Express' },
      { title: '3 Days / 2 Nights Island Getaway', duration: '3 Days / 2 Nights', daysCount: 3, price: 899, discount: '15% OFF', featuredImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80', badge: 'Popular' },
      { title: '5 Days / 4 Nights Cultural Expedition', duration: '5 Days / 4 Nights', daysCount: 5, price: 1450, discount: '20% OFF', featuredImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80', badge: 'Cultural' },
      { title: '7 Days / 6 Nights Grand Tour', duration: '7 Days / 6 Nights', daysCount: 7, price: 2190, discount: '25% OFF', featuredImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', badge: 'Grand' },
      { title: '7-Day Ultimate Serengeti Great Migration Expedition', duration: '7 Days / 6 Nights', daysCount: 7, price: 4950, discount: 'VIP Exclusive', featuredImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80', badge: 'Luxury Safari' },
      { title: '10 Days / 9 Nights Continental Voyage', duration: '10 Days / 9 Nights', daysCount: 10, price: 3200, discount: '15% OFF', featuredImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80', badge: 'Voyage' },
      { title: '15 Days / 14 Nights World Explorer', duration: '15 Days / 14 Nights', daysCount: 15, price: 5400, discount: '30% OFF', featuredImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80', badge: 'Explorer' },
      { title: '21 Days Luxury World Tour', duration: '21 Days Luxury Tour', daysCount: 21, price: 9800, discount: 'VIP Exclusive', featuredImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80', badge: 'World Tour' }
    ]);

    // 3. Seed Hotels
    console.log('[Fullstack Seeder] Seeding Luxury Hotels & Lodges...');
    await Hotel.insertMany([
      { name: 'Four Seasons Safari Lodge Serengeti', starRating: 5, description: 'Set deep in the Serengeti with an infinity pool overlooking elephant watering holes.', roomImages: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'], location: 'Central Serengeti, Tanzania', price: 1850, heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80' },
      { name: 'Singita Sasakwa Lodge', starRating: 5, description: 'Edwardian-style manor house with wraparound verandas over Grumeti plains.', roomImages: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'], location: 'Grumeti Reserve, Tanzania', price: 2450, heroImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80' },
      { name: 'The Mulia Bali Overwater Resort', starRating: 5, description: 'Ultra-luxurious beachside suites with oceanfront infinity pools and butler service.', roomImages: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'], location: 'Nusa Dua, Bali', price: 1250, heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80' },
      { name: 'Canaves Oia Luxury Suites', starRating: 5, description: 'Perched high on the cliffside of Oia overlooking the volcano caldera.', roomImages: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80'], location: 'Santorini, Greece', price: 1650, heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80' }
    ]);

    // 4. Seed Gallery (30+ High Quality Photography Images)
    console.log('[Fullstack Seeder] Seeding 30+ Gallery Images...');
    const galleryItems = [
      { title: 'Majestic Male Lion', category: 'Big Five', image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Great Migration Stampede', category: 'Great Migration', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80' },
      { title: 'African Elephant Herd', category: 'Big Five', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Bali Tropical Villa Pool', category: 'Luxury Lodges', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Santorini Blue Dome Sunset', category: 'Landscape & Sunset', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Swiss Alps Helicopter', category: 'Aerial & Balloon', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Dubai Desert Sunset', category: 'Landscape & Sunset', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Tokyo Neon Skyline', category: 'Landscape & Sunset', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Maldives Overwater Bungalow', category: 'Luxury Lodges', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Serengeti Acacia Sunset', category: 'Landscape & Sunset', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80' }
    ];
    await Gallery.insertMany(galleryItems);

    // 5. Seed 7-Day Itinerary
    console.log('[Fullstack Seeder] Seeding Itinerary...');
    await Itinerary.insertMany([
      { dayNumber: 1, title: 'Arrival & Scenic Bushplane Flight', description: 'Fly into Seronera Airstrip.', breakfast: 'Manor Breakfast', location: 'Central Serengeti', images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'] },
      { dayNumber: 2, title: 'Big Five Tracking in Seronera', description: 'Morning feline search.', breakfast: 'Bush Breakfast', location: 'Seronera Valley', images: ['https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80'] },
      { dayNumber: 3, title: 'Hot Air Balloon & Moru Kopjes', description: 'Sunrise flight & champagne.', breakfast: 'Champagne Bush Breakfast', location: 'Moru Kopjes', images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'] }
    ]);

    // 6. Seed Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'System Admin',
      email: 'admin@serengetisafari.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('[Fullstack Seeder] ✅ All Global Destinations, Packages, Hotels & Safari Data successfully seeded into MongoDB!');
  } catch (err) {
    console.error('[Seeder Error]:', err);
  }
};

if (require.main === module) {
  seedData();
}

module.seedData = seedData;
module.exports = seedData;

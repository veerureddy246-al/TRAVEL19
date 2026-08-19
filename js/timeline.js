/* ============================================================
   PREMIUM LUXURY DYNAMIC ALTERNATING TRAVEL TIMELINE ENGINE
   Ventoura Travel — Production Ready
   ============================================================ */

(function () {
  'use strict';

  /* ── Comprehensive Destination-Specific 7-Day Itineraries Database ── */
  const DESTINATION_ITINERARIES = {
    // 1. TOKYO (JAPAN)
    'tokyo': [
      {
        day: 1,
        date: 'Day 1 · Oct 12',
        title: 'Arrival in Tokyo & Skylines',
        location: '📍 Haneda / Narita ➔ Ginza District',
        time: '⏱️ 6 Hours',
        weather: '☀️ 22°C Clear',
        image: 'assets/images/dest-tokyo.jpg',
        hotel: '🏨 Aman Tokyo (5-Star Luxury)',
        meals: '🍽️ Welcome Omakase Dinner',
        transport: '✈️ Private VIP Pick-up',
        activities: ['✈️ Airport Pickup', '🏨 Luxury Hotel Check-in', '🍽️ Welcome Omakase Dinner', '🌃 Evening Ginza Stroll'],
        expandDetails: {
          hotelName: 'Aman Tokyo (Chiyoda City)',
          roomType: 'Deluxe Palace View Suite',
          amenities: 'Deep soaking Tub, 33rd Floor Pool, Spa, Butler Service',
          schedule: [
            '10:30 AM — Private VIP Escort & Transfer from Airport',
            '12:30 PM — Check-in at Aman Tokyo & Matcha Tea Ceremony',
            '03:00 PM — Guided Walk through Imperial Palace Gardens',
            '07:00 PM — 12-Course Omakase Sushi Dinner in Ginza'
          ],
          tips: 'Pasmo transit cards & pocket Wi-Fi included in welcome kit.',
          currency: 'JPY (¥)',
          language: 'Japanese / English'
        }
      },
      {
        day: 2,
        date: 'Day 2 · Oct 13',
        title: 'Tokyo City Tour & Skytree',
        location: '📍 Asakusa ➔ Shibuya Crossing',
        time: '⏱️ 9 Hours',
        weather: '🌤️ 23°C Sunny',
        image: 'assets/images/dest-tokyo.jpg',
        hotel: '🏨 Aman Tokyo',
        meals: '🍽️ Breakfast & Izakaya Lunch',
        transport: '🚅 Shinkansen & Private Van',
        activities: ['🗼 Tokyo Skytree', '⛩️ Asakusa Sensoji Temple', '🚶 Shibuya Crossing', '🍜 Tonkotsu Ramen Tour'],
        expandDetails: {
          hotelName: 'Aman Tokyo',
          roomType: 'Deluxe Palace View Suite',
          amenities: 'Private Chauffeur, Fast-track Skytree Pass',
          schedule: [
            '09:00 AM — VIP Fast-Track Observatory Access at Tokyo Skytree',
            '11:30 AM — Historic Walking Tour of Sensoji Temple in Asakusa',
            '01:30 PM — Gourmet Craft Ramen Tasting in Harajuku',
            '04:00 PM — Famous Shibuya Crossing Observation Deck',
            '07:30 PM — Izakaya Craft Beer & Yakitori Night'
          ],
          tips: 'Comfortable walking shoes recommended for Sensoji Temple.',
          currency: 'JPY (¥)',
          language: 'Japanese'
        }
      },
      {
        day: 3,
        date: 'Day 3 · Oct 14',
        title: 'Mount Fuji & Lake Kawaguchi',
        location: '📍 Mount Fuji ➔ Oshino Hakkai',
        time: '⏱️ 10 Hours',
        weather: '☀️ 19°C Mountain Fresh',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Hoshinoya Fuji Luxury Onsen',
        meals: '🍽️ Kaiseki Feast & Breakfast',
        transport: '🚗 Private Luxury SUV',
        activities: ['🗻 Mt. Fuji 5th Station', '🛶 Lake Kawaguchi Cruise', '🏡 Oshino Hakkai Village', '♨️ Private Onsen Bath'],
        expandDetails: {
          hotelName: 'Hoshinoya Fuji Glamping Resort',
          roomType: 'Mount Fuji Facing Cabin Villa',
          amenities: 'Natural Thermal Onsen, Private Terrace Fireplace',
          schedule: [
            '08:00 AM — Scenic Drive to Mt. Fuji 5th Station',
            '11:00 AM — Private Speedboat Cruise on Lake Kawaguchi',
            '01:30 PM — Soba Noodle & Local Tempura Lunch in Springs Village',
            '05:00 PM — Check-in & Open-air Onsen Soak overlooking Mt. Fuji',
            '07:30 PM — Traditional 9-Course Kaiseki Dinner'
          ],
          tips: 'Mountain weather can drop 5°C; bring lightweight luxury jacket.',
          currency: 'JPY (¥)',
          language: 'Japanese'
        }
      },
      {
        day: 4,
        date: 'Day 4 · Oct 15',
        title: 'Anime, Tech & Digital Art',
        location: '📍 Akihabara ➔ TeamLab Planets',
        time: '⏱️ 8 Hours',
        weather: '🌤️ 21°C Mild',
        image: 'assets/images/dest-tokyo.jpg',
        hotel: '🏨 Aman Tokyo',
        meals: '🍽️ Breakfast & Wagyu Teppanyaki',
        transport: '🚗 Private Chauffeur',
        activities: ['🎮 Akihabara Electric Town', '🤖 Giant Gundam Statue', '🎨 TeamLab Borderless Art', '🥩 Wagyu Teppanyaki'],
        expandDetails: {
          hotelName: 'Aman Tokyo',
          roomType: 'Deluxe Palace View Suite',
          amenities: 'Private Museum Entry Passes',
          schedule: [
            '10:00 AM — VIP Access to TeamLab Planets Digital Art Museum',
            '01:00 PM — Akihabara Anime & Vintage Gaming Guided Tour',
            '04:30 PM — Odaiba Bay Promenade & Giant Robot Statue',
            '07:30 PM — A5 Kobe Wagyu Teppanyaki Dinner'
          ],
          tips: 'TeamLab requires walking barefoot in shallow water exhibits.',
          currency: 'JPY (¥)',
          language: 'Japanese'
        }
      },
      {
        day: 5,
        date: 'Day 5 · Oct 16',
        title: 'Entertainment & Tokyo Bay Cruise',
        location: '📍 Tokyo Disney Resort / Bay Marina',
        time: '⏱️ 8 Hours',
        weather: '☀️ 22°C Sunny',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Aman Tokyo',
        meals: '🍽️ All-Inclusive Yacht Dining',
        transport: '🛥️ Private Yacht & Chauffeur',
        activities: ['🎢 VIP Disney Resort Pass', '⛵ Sunset Yacht Cruise', '🍷 Wine Tasting', '🌃 Shinjuku Neon Night Walk'],
        expandDetails: {
          hotelName: 'Aman Tokyo',
          roomType: 'Deluxe Palace View Suite',
          amenities: 'Yacht Captain Service, Sommelier Selection',
          schedule: [
            '09:30 AM — VIP Escort Service to Tokyo DisneySea / Resort',
            '04:30 PM — Private Sunset Yacht Charter across Tokyo Bay',
            '07:30 PM — Sommelier-paired French-Japanese Fusion Dinner',
            '09:30 PM — Night Owl Cocktail Tour in Shinjuku Golden Gai'
          ],
          tips: 'Yacht includes heated outdoor viewing lounge.',
          currency: 'JPY (¥)',
          language: 'Japanese / English'
        }
      },
      {
        day: 6,
        date: 'Day 6 · Oct 17',
        title: 'Departure & Sayonara Tokyo',
        location: '📍 Tsukiji Market ➔ Narita Airport',
        time: '⏱️ 4 Hours',
        weather: '🌤️ 20°C Mild',
        image: 'assets/images/dest-tokyo.jpg',
        hotel: '✈️ VIP Airport Lounge',
        meals: '🍽️ Farewell Breakfast & Champagne',
        transport: '✈️ First Class Airport Express',
        activities: ['🍳 Tsukiji Outer Market Breakfast', '🎁 Souvenir Craft Shopping', '📸 Farewell Memory Photos', '✈️ VIP Lounge Transfer'],
        expandDetails: {
          hotelName: 'Departure VIP Lounge',
          roomType: 'N/A',
          amenities: 'Fast-Track Customs, Shower Suites, Champagne Bar',
          schedule: [
            '08:30 AM — Chef-Guided Tsukiji Fish Market Breakfast Tour',
            '11:00 AM — Handcrafted Green Tea & Ceramics Shopping',
            '01:00 PM — Chauffeur Transfer to Narita VIP Terminal',
            '03:00 PM — Board First Class International Flight Home'
          ],
          tips: 'Keep passport and tax-free shopping receipts accessible.',
          currency: 'JPY / USD',
          language: 'English'
        }
      }
    ],

    // 2. PARIS (FRANCE)
    'paris': [
      {
        day: 1,
        date: 'Day 1 · June 10',
        title: 'Arrival in Paris & Eiffel Tower Sunset',
        location: '📍 CDG Airport ➔ Champs-Élysées',
        time: '⏱️ 5 Hours',
        weather: '☀️ 25°C Warm',
        image: 'assets/images/dest-paris.jpg',
        hotel: '🏨 Four Seasons Hotel George V (5-Star)',
        meals: '🍽️ Champagne Welcome Dinner',
        transport: '✈️ Private Mercedes-Maybach Pickup',
        activities: ['✈️ CDG Airport Escort', '🏨 Luxury Palace Check-in', '🥖 Fresh Croissant Tasting', '🍷 Seine Sunset Champagne Cruise'],
        expandDetails: {
          hotelName: 'Four Seasons Hotel George V Paris',
          roomType: 'Eiffel Tower View Terrace Suite',
          amenities: 'Private Balcony, Michelin Star Room Dining, Spa',
          schedule: [
            '11:00 AM — Private Airport Meet & Greet with Chauffeur',
            '01:00 PM — Check-in at Four Seasons George V & Flowers Welcome',
            '05:30 PM — VIP Private Seine River Sunset Boat Charter',
            '08:00 PM — Michelin-Star Welcome Dinner at Le Cinq'
          ],
          tips: 'Formal evening attire requested at Le Cinq.',
          currency: 'EUR (€)',
          language: 'French / English'
        }
      },
      {
        day: 2,
        date: 'Day 2 · June 11',
        title: 'Louvre Art & Tuileries Promenade',
        location: '📍 Louvre Museum ➔ Palais-Royal',
        time: '⏱️ 8 Hours',
        weather: '🌤️ 26°C Sunny',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Four Seasons Hotel George V',
        meals: '🍽️ Breakfast & Bistro Lunch',
        transport: '🚗 Private Executive Sedan',
        activities: ['🎨 Louvre Private Art Guide', '🖼️ Mona Lisa View', '🌳 Tuileries Garden Walk', '🍷 Wine Tasting Session'],
        expandDetails: {
          hotelName: 'Four Seasons Hotel George V',
          roomType: 'Eiffel Tower View Terrace Suite',
          amenities: 'Skip-the-Line Louvre Pass, Art Historian Guide',
          schedule: [
            '09:30 AM — Private After-Hours Guide at Louvre Museum',
            '12:30 PM — Gourmet Lunch at Café Marly overlooking Pyramids',
            '03:00 PM — Stroll through Tuileries Gardens & Palais-Royal',
            '06:30 PM — Sommelier-Guided Wine & Cheese Tasting in Le Marais'
          ],
          tips: 'Museum photography allowed without flash.',
          currency: 'EUR (€)',
          language: 'French / English'
        }
      },
      {
        day: 3,
        date: 'Day 3 · June 12',
        title: 'Palace of Versailles Grand Royal Tour',
        location: '📍 Versailles Palace & Gardens',
        time: '⏱️ 9 Hours',
        weather: '☀️ 24°C Pleasant',
        image: 'assets/images/dest-paris.jpg',
        hotel: '🏨 Four Seasons Hotel George V',
        meals: '🍽️ Royal Estate Lunch & Dinner',
        transport: '🚗 Private Chauffeur Van',
        activities: ['👑 Hall of Mirrors Tour', '🚣 Grand Canal Electric Boat', '🌺 Marie Antoinette Estate', '🎼 Fountain Music Show'],
        expandDetails: {
          hotelName: 'Four Seasons Hotel George V',
          roomType: 'Eiffel Tower View Terrace Suite',
          amenities: 'Private Royal Apartments Access',
          schedule: [
            '08:30 AM — Luxury Chauffeur Transfer to Versailles',
            '09:30 AM — Exclusive Access to King’s Private Apartments & Hall of Mirrors',
            '01:00 PM — Gourmet Lunch at Ore by Alain Ducasse',
            '03:30 PM — Electric Golf Cart & Boat Tour of Gardens & Trianon',
            '07:30 PM — Return to Paris for Opera Evening'
          ],
          tips: 'Walking distance is around 5km inside garden estates.',
          currency: 'EUR (€)',
          language: 'French'
        }
      },
      {
        day: 4,
        date: 'Day 4 · June 13',
        title: 'Bohemian Montmartre & Moulin Rouge',
        location: '📍 Sacré-Cœur ➔ Montmartre Hill',
        time: '⏱️ 7 Hours',
        weather: '🌤️ 23°C Breezy',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Four Seasons Hotel George V',
        meals: '🍽️ French Bistro & Dinner Show',
        transport: '🚗 Private Executive Sedan',
        activities: ['⛪ Sacré-Cœur Basilica', '🎨 Artist Square Portrait', '🥖 Artisan Bakery Class', '💃 Moulin Rouge VIP Cabaret'],
        expandDetails: {
          hotelName: 'Four Seasons Hotel George V',
          roomType: 'Eiffel Tower View Terrace Suite',
          amenities: 'VIP Box Tickets at Moulin Rouge with Champagne',
          schedule: [
            '10:00 AM — Cable Car & Guided Tour of Sacré-Cœur Basilica',
            '01:00 PM — Traditional French Bistro Lunch at Place du Tertre',
            '03:30 PM — Private Pastry & Macaron Masterclass in Montmartre',
            '08:30 PM — VIP Champagne Box Seating at Moulin Rouge Show'
          ],
          tips: 'Smart dress code enforced at Moulin Rouge.',
          currency: 'EUR (€)',
          language: 'French / English'
        }
      },
      {
        day: 5,
        date: 'Day 5 · June 14',
        title: 'Haute Couture & Gastronomy',
        location: '📍 Place Vendôme ➔ Arc de Triomphe',
        time: '⏱️ 8 Hours',
        weather: '☀️ 25°C Sunny',
        image: 'assets/images/dest-paris.jpg',
        hotel: '🏨 Four Seasons Hotel George V',
        meals: '🍽️ Michelin 3-Star Dinner',
        transport: '🚗 Private Luxury SUV',
        activities: ['🛍️ Personal Shopper Tour', '💎 Place Vendôme Jewelry', '🏛️ Arc de Triomphe Rooftop', '🍽️ Michelin 3-Star Feast'],
        expandDetails: {
          hotelName: 'Four Seasons Hotel George V',
          roomType: 'Eiffel Tower View Terrace Suite',
          amenities: 'Private VIP Shopping Salons at Chanel & Dior',
          schedule: [
            '10:30 AM — Private Stylist Guided Shopping on Rue Saint-Honoré',
            '02:00 PM — Rooftop Champagne View at Arc de Triomphe',
            '04:30 PM — Perfume Blending Masterclass at Maison Guerlain',
            '08:00 PM — 8-Course Tasting Dinner at Guy Savoy'
          ],
          tips: 'Private tax-free refund processing included at hotel.',
          currency: 'EUR (€)',
          language: 'French / English'
        }
      },
      {
        day: 6,
        date: 'Day 6 · June 15',
        title: 'Farewell Paris & VIP Departure',
        location: '📍 Le Marais ➔ CDG Airport',
        time: '⏱️ 4 Hours',
        weather: '🌤️ 22°C Mild',
        image: 'assets/images/dest-paris.jpg',
        hotel: '✈️ VIP Airport Lounge',
        meals: '🍽️ Champagne Breakfast',
        transport: '✈️ Private Airport Transfer',
        activities: ['☕ Sidewalk Café Breakfast', '🛍️ Antique Gift Shopping', '📸 Seine Farewell Photos', '✈️ VIP Terminal Lounge'],
        expandDetails: {
          hotelName: 'CDG VIP First Lounge',
          roomType: 'N/A',
          amenities: 'Fast-Track Customs, Clarins Spa Room',
          schedule: [
            '09:00 AM — Parisian Terrace Breakfast with Fresh Pastries',
            '11:00 AM — Final Souvenir Shopping in Historic Marais District',
            '01:00 PM — Chauffeur Escort to CDG Airport First Class Terminal',
            '03:30 PM — Board International Flight Home'
          ],
          tips: 'Have VAT refund forms stamped before security check.',
          currency: 'EUR (€)',
          language: 'French / English'
        }
      }
    ],

    // 3. BALI (INDONESIA)
    'bali': [
      {
        day: 1,
        date: 'Day 1 · Aug 05',
        title: 'Arrival in Bali & Jungle Sanctuary',
        location: '📍 DPS Airport ➔ Ubud Rainforest',
        time: '⏱️ 5 Hours',
        weather: '☀️ 29°C Tropical',
        image: 'assets/images/dest-bali.jpg',
        hotel: '🏨 Four Seasons Resort Sayan Ubud',
        meals: '🍽️ Floating Flower Dinner',
        transport: '🚗 Private Luxury SUV',
        activities: ['✈️ Denpasar VIP Pickup', '🏨 Jungle Pool Villa Check-in', '🌸 Sacred Flower Bath', '🍽️ Balinese Welcome Feast'],
        expandDetails: {
          hotelName: 'Four Seasons Resort Bali at Sayan',
          roomType: 'Riverfront River-View Pool Villa',
          amenities: 'Private Infinity Pool, Sacred River View, Spa',
          schedule: [
            '11:00 AM — Airport VIP Fast-track Immigration & Driver Greeting',
            '01:00 PM — Arrival at Four Seasons Ubud & Sacred River Welcome Ceremony',
            '04:00 PM — Complimentary 60-Minute Balinese Herbal Massage',
            '07:30 PM — 5-Course Traditional Balinese Royal Dinner'
          ],
          tips: 'Light cotton/linen clothing recommended for tropical humidity.',
          currency: 'IDR (Rp)',
          language: 'Indonesian / English'
        }
      },
      {
        day: 2,
        date: 'Day 2 · Aug 06',
        title: 'Sacred Ubud & Rice Terraces',
        location: '📍 Tegallalang ➔ Monkey Forest',
        time: '⏱️ 8 Hours',
        weather: '🌤️ 30°C Sunny',
        image: 'assets/images/dest-bali.jpg',
        hotel: '🏨 Four Seasons Resort Sayan',
        meals: '🍽️ Organic Jungle Breakfast & Lunch',
        transport: '🚗 Private Air-Conditioned Van',
        activities: ['🌾 Tegallalang Rice Terraces', '🐒 Sacred Monkey Forest', '🌴 Jungle Swing Photo', '☕ Luwak Coffee Tasting'],
        expandDetails: {
          hotelName: 'Four Seasons Resort Bali at Sayan',
          roomType: 'Riverfront River-View Pool Villa',
          amenities: 'Private Guide, Photography Drone Service',
          schedule: [
            '07:30 AM — Early Sunrise Photo Session at Tegallalang Rice Terraces',
            '10:30 AM — Guided Sanctuary Walk through Sacred Monkey Forest',
            '01:00 PM — Organic Farm-to-Table Lunch overlooking Ayung River Valley',
            '04:00 PM — Artisanal Coffee Plantation & Luwak Tasting'
          ],
          tips: 'Avoid wearing loose sunglasses or jewelry near monkeys.',
          currency: 'IDR (Rp)',
          language: 'Indonesian'
        }
      },
      {
        day: 3,
        date: 'Day 3 · Aug 07',
        title: 'Holy Water Temple & Waterfall Hike',
        location: '📍 Tirta Empul ➔ Tegenungan',
        time: '⏱️ 8 Hours',
        weather: '☀️ 28°C Pleasant',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Four Seasons Resort Sayan',
        meals: '🍽️ Breakfast & Volcano View Lunch',
        transport: '🚗 Private SUV',
        activities: ['⛩️ Tirta Empul Cleansing', '🌊 Tegenungan Waterfall', '🌋 Kintamani Volcano View', '🧘 Sunset Yoga'],
        expandDetails: {
          hotelName: 'Four Seasons Resort Sayan',
          roomType: 'Riverfront River-View Pool Villa',
          amenities: 'Traditional Sarong Provided, Priest Blessing',
          schedule: [
            '08:30 AM — Spiritual Water Purification Ritual at Tirta Empul',
            '11:30 AM — Scenic Hike & Dip at Tegenungan Waterfall',
            '01:30 PM — Gourmet Buffet Lunch facing Mount Batur Volcano',
            '05:30 PM — Open-Air Sunset Yoga & Meditation in Jungle Pavilion'
          ],
          tips: 'Bring spare change of clothes for temple water ritual.',
          currency: 'IDR (Rp)',
          language: 'Balinese'
        }
      },
      {
        day: 4,
        date: 'Day 4 · Aug 08',
        title: 'Nusa Penida Island Speedboat Expedition',
        location: '📍 Kelingking Beach ➔ Crystal Bay',
        time: '⏱️ 10 Hours',
        weather: '☀️ 31°C Coastal Warmth',
        image: 'assets/images/dest-bali.jpg',
        hotel: '🏨 The Seminyak Beach Resort',
        meals: '🍽️ Beachfront Lunch & BBQ',
        transport: '🚤 Private Speedboat Charter',
        activities: ['🦖 Kelingking T-Rex Cliff', '🏖️ Broken Beach & Angel Billabong', '🤿 Manta Ray Snorkeling', '🌅 Sunset Beach Club'],
        expandDetails: {
          hotelName: 'The Seminyak Beach Resort & Spa',
          roomType: 'Ocean View Beachfront Villa',
          amenities: 'Private Butler, Speedboat Crew & Snorkel Master',
          schedule: [
            '07:00 AM — Private Speedboat Departure from Sanur Harbor',
            '09:00 AM — Panoramic View at Kelingking T-Rex Cliff',
            '12:00 PM — Fresh Catch Seafood Lunch at Crystal Bay',
            '02:30 PM — Swimming with Giant Manta Rays in Coral Lagoon',
            '06:30 PM — Transfer to Seminyak Ocean Villa & Sunset Cocktail'
          ],
          tips: 'Reef-safe sunscreen & motion sickness tablets provided.',
          currency: 'IDR (Rp)',
          language: 'English'
        }
      },
      {
        day: 5,
        date: 'Day 5 · Aug 09',
        title: 'Uluwatu Sunset Cliff & Fire Dance',
        location: '📍 Uluwatu Temple ➔ Jimbaran Bay',
        time: '⏱️ 7 Hours',
        weather: '☀️ 29°C Sunny',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 The Seminyak Beach Resort',
        meals: '🍽️ Seafood BBQ on Beach',
        transport: '🚗 Private Executive Sedan',
        activities: ['🛕 Uluwatu Cliffside Temple', '🔥 Kecak Fire Dance Show', '🦞 Jimbaran Candlelight Dinner', '🍸 Seminyak Nightlife'],
        expandDetails: {
          hotelName: 'The Seminyak Beach Resort',
          roomType: 'Ocean View Beachfront Villa',
          amenities: 'VIP Front Row Seats at Kecak Dance',
          schedule: [
            '02:00 PM — Afternoon Relaxation at Private Villa Pool',
            '04:30 PM — Cliffside Walking Tour of 11th-Century Uluwatu Temple',
            '06:00 PM — VIP Front Row Kecak & Fire Dance Performance at Sunset',
            '08:00 PM — Candlelight Lobster BBQ Dinner right on Jimbaran Beach'
          ],
          tips: 'Kecak performance begins promptly at sunset (6:00 PM).',
          currency: 'IDR (Rp)',
          language: 'English'
        }
      },
      {
        day: 6,
        date: 'Day 6 · Aug 10',
        title: 'Farewell Bali & Spa Wellness',
        location: '📍 Seminyak ➔ DPS Airport',
        time: '⏱️ 4 Hours',
        weather: '🌤️ 28°C Warm',
        image: 'assets/images/dest-bali.jpg',
        hotel: '✈️ VIP Airport Lounge',
        meals: '🍽️ Breakfast & Farewell Tea',
        transport: '✈️ Luxury Airport Escort',
        activities: ['🧖 90-Min Lulur Body Scrub', '🛍️ Seminyak Boutique Shopping', '🥥 Fresh Coconut Toast', '✈️ VIP Lounge Transfer'],
        expandDetails: {
          hotelName: 'DPS Airport VIP Lounge',
          roomType: 'N/A',
          amenities: 'Fast-Track Escort, Private Lounge & Bar',
          schedule: [
            '09:00 AM — 90-Minute Signature Balinese Lulur Body Scrub',
            '11:30 AM — Boutique Souvenir & Handicraft Shopping in Seminyak',
            '01:30 PM — Private Escort to Denpasar Airport VIP Terminal',
            '04:00 PM — Board Departure Flight Home'
          ],
          tips: 'Keep wooden handicrafts unpacked for easy airport inspection.',
          currency: 'IDR / USD',
          language: 'English'
        }
      }
    ],

    // 4. MALDIVES (INDIAN OCEAN)
    'maldives': [
      {
        day: 1,
        date: 'Day 1 · Nov 01',
        title: 'Arrival & Lagoon Overwater Sanctuary',
        location: '📍 Malé Airport ➔ Resort Atoll',
        time: '⏱️ 4 Hours',
        weather: '☀️ 29°C Tropical Blue',
        image: 'assets/images/dest-maldives.jpg',
        hotel: '🏨 Anantara Dhigu Overwater Villa',
        meals: '🍽️ Floating Lunch & Welcome Dinner',
        transport: '🚤 VIP Speedboat / Seaplane',
        activities: ['✈️ VIP Airport Escort', '🚤 Seaplane Scenic Flight', '🏨 Glass Floor Villa Check-in', '🍽️ Sunset Candlelight Feast'],
        expandDetails: {
          hotelName: 'Anantara Dhigu Maldives Resort (5-Star Luxury)',
          roomType: 'Overwater Pool Villa with Glass Floor Panel',
          amenities: 'Private Pool, Glass Floor Panel, 24/7 Butler, Ocean Access',
          schedule: [
            '09:30 AM — VIP Airport Greeting at Malé Executive Lounge',
            '10:30 AM — Scenic Seaplane Flight over Coral Atolls',
            '11:30 AM — Villa Check-in & Floating Refreshment Welcome',
            '07:30 PM — 5-Course Beachfront Sunset Dinner'
          ],
          tips: 'US Dollars and Credit Cards accepted everywhere in resort.',
          currency: 'INR (₹)',
          language: 'English / Dhivehi'
        }
      },
      {
        day: 2,
        date: 'Day 2 · Nov 02',
        title: 'Coral Reef Snorkeling & Water Sports',
        location: '📍 Turtle Reef & Lagoon',
        time: '⏱️ 7 Hours',
        weather: '☀️ 30°C Sunny',
        image: 'assets/images/hotel-overwater.jpg',
        hotel: '🏨 Anantara Dhigu Overwater Villa',
        meals: '🍽️ Floating Breakfast & Reef Grill',
        transport: '🚤 Luxury Catamaran & Jet Ski',
        activities: ['🏖️ Floating Pool Breakfast', '🤿 Sea Turtle Snorkeling', '🚤 Jet Ski Lagoon Tour', '🍾 Sunset Champagne Cruise'],
        expandDetails: {
          hotelName: 'Anantara Dhigu Maldives Resort',
          roomType: 'Overwater Pool Villa',
          amenities: 'Snorkeling Gear, Paddleboards, Butler Service',
          schedule: [
            '08:30 AM — Floating Breakfast delivered directly to Villa Pool',
            '10:00 AM — Guided Coral Garden & Sea Turtle Snorkeling',
            '02:00 PM — Watersports: Jet Skiing & Stand-Up Paddleboarding',
            '06:00 PM — Sunset Champagne Cruise with Dolphin Watching'
          ],
          tips: 'Reef-safe sunscreen provided free by resort staff.',
          currency: 'INR (₹)',
          language: 'English'
        }
      },
      {
        day: 3,
        date: 'Day 3 · Nov 03',
        title: 'Subsea Dining & Island Hopping',
        location: '📍 Local Atoll ➔ 5-Meter Underwater Restaurant',
        time: '⏱️ 8 Hours',
        weather: '🌤️ 28°C Pleasant',
        image: 'assets/images/dest-santorini.jpg',
        hotel: '🏨 Anantara Dhigu Overwater Villa',
        meals: '🍽️ Subsea 6-Course Fine Dining',
        transport: '🚤 Private Dhoni Boat',
        activities: ['🚤 Island Hopping Dhoni', '🛍️ Local Craft Village', '🍽️ 5-Meter Subsea Restaurant', '🌃 Star Stargazing Deck'],
        expandDetails: {
          hotelName: 'Anantara Dhigu Maldives Resort',
          roomType: 'Sunset Overwater Villa',
          amenities: 'Underwater Table Reservation Included',
          schedule: [
            '09:30 AM — Traditional Dhoni Boat Ride to Local Fisherman Island',
            '01:00 PM — Sandbank Picnic Lunch under Private Canopy',
            '07:30 PM — 6-Course Fine Dining 5 Meters Below Sea Level'
          ],
          tips: 'Dress modestly when visiting local island villages.',
          currency: 'INR (₹)',
          language: 'English'
        }
      },
      {
        day: 4,
        date: 'Day 4 · Nov 04',
        title: 'Private Virgin Sandbank & Sunset Toast',
        location: '📍 Isolated Coral Sandbank',
        time: '⏱️ 7 Hours',
        weather: '☀️ 30°C Sunny',
        image: 'assets/images/dest-bali.jpg',
        hotel: '🏨 Anantara Dhigu Overwater Villa',
        meals: '🍽️ Chef Live BBQ Picnic',
        transport: '🛥️ Private Yacht Charter',
        activities: ['🏖️ Private Sandbank Sanctuary', '🥩 Live Chef BBQ', '📸 Aerial Drone Video', '🌌 Night Sky Stargazing'],
        expandDetails: {
          hotelName: 'Anantara Dhigu Maldives Resort',
          roomType: 'Sunset Overwater Villa',
          amenities: 'Chef Service, Private Setup, Drone Operator',
          schedule: [
            '10:00 AM — Private Yacht Transfer to Deserted Sandbank',
            '01:00 PM — Live Chef Seafood BBQ Lunch on Sandbank',
            '05:30 PM — Sunset Champagne Toast on Coral Water Edge',
            '08:30 PM — Stargazing Session with Resident Astronomer'
          ],
          tips: 'Bring sunglasses & camera for panoramic drone photography.',
          currency: 'INR (₹)',
          language: 'English'
        }
      },
      {
        day: 5,
        date: 'Day 5 · Nov 05',
        title: 'Overwater Spa & Wellness Sanctuary',
        location: '📍 Anantara Overwater Spa',
        time: '⏱️ 6 Hours',
        weather: '🌤️ 28°C Mild',
        image: 'assets/images/hotel-luxury.jpg',
        hotel: '🏨 Anantara Dhigu Spa Suite',
        meals: '🍽️ Organic Detox Dining',
        transport: '🚲 Electric Buggy',
        activities: ['🧖 90-Min Massage', '🧘 Sunrise Lagoon Yoga', '🍵 Herbal Detox Tea', '🏊 Hydrotherapy Pool'],
        expandDetails: {
          hotelName: 'Anantara Dhigu Spa Resort',
          roomType: 'Overwater Spa Suite',
          amenities: 'Glass Floor Treatment Room, Steam Room',
          schedule: [
            '07:30 AM — Sunrise Ocean Pavilion Yoga & Breathing Session',
            '10:30 AM — 90-Minute Signature Overwater Body Massage',
            '01:30 PM — Vitality Organic Salad & Detox Juice Lunch',
            '05:00 PM — Hydrotherapy Pool & Steam Bath Relaxation'
          ],
          tips: 'Arrive 15 minutes prior to spa appointment.',
          currency: 'INR (₹)',
          language: 'English'
        }
      },
      {
        day: 6,
        date: 'Day 6 · Nov 06',
        title: 'Farewell Sunrise & VIP Departure',
        location: '📍 Resort Lagoon ➔ Malé Airport',
        time: '⏱️ 4 Hours',
        weather: '☀️ 29°C Sunny',
        image: 'assets/images/dest-tokyo.jpg',
        hotel: '✈️ VIP Airport Lounge',
        meals: '🍽️ Farewell Breakfast',
        transport: '✈️ Seaplane / Speedboat',
        activities: ['🌅 Sunrise Photo Toast', '🍳 Farewell Breakfast', '🛍️ Duty-Free Shopping', '✈️ VIP Airport Lounge'],
        expandDetails: {
          hotelName: 'Malé Airport VIP Executive Lounge',
          roomType: 'N/A',
          amenities: 'VIP Lounge Access, Fast-track Security',
          schedule: [
            '07:00 AM — Sunrise Farewell Photo Session on Beach',
            '08:30 AM — Champagne Breakfast overlooking Lagoon',
            '10:30 AM — Seaplane Transfer to Malé Airport VIP Lounge',
            '01:30 PM — Board International Departure Flight Home'
          ],
          tips: 'Ensure liquid duty-free items are sealed in security bags.',
          currency: 'INR (₹)',
          language: 'English'
        }
      }
    ],

    // 5. DUBAI (UAE)
    'dubai': [
      {
        day: 1,
        date: 'Day 1 · Dec 01',
        title: 'Arrival in Dubai & Burj Al Arab Suite',
        location: '📍 DXB Airport ➔ Jumeirah Beach',
        time: '⏱️ 5 Hours',
        weather: '☀️ 27°C Sunny',
        image: 'assets/images/dest-dubai.jpg',
        hotel: '🏨 Burj Al Arab Jumeirah (7-Star)',
        meals: '🍽️ Royal Skyview Dinner',
        transport: '🚗 Private Rolls-Royce Phantom',
        activities: ['✈️ DXB Airport VIP Escort', '🚗 Rolls-Royce Transfer', '🏨 7-Star Suite Check-in', '🍸 Skyview Bar Cocktail'],
        expandDetails: {
          hotelName: 'Burj Al Arab Jumeirah',
          roomType: 'Duplex Deluxe Royal Suite',
          amenities: '24/7 Personal Butler, Hermes Amenities, Private Terrace Pool',
          schedule: [
            '11:00 AM — VIP Airport T3 Escort & Rolls-Royce Phantom Transfer',
            '01:00 PM — Check-in at 7-Star Burj Al Arab with Rose Welcome',
            '04:30 PM — Afternoon Tea at Al Muntaha (27th Floor View)',
            '08:00 PM — Gold-Leaf Cocktail Dinner at Skyview Bar'
          ],
          tips: 'Smart luxury dress code required across Burj Al Arab lounges.',
          currency: 'AED (د.إ)',
          language: 'Arabic / English'
        }
      },
      {
        day: 2,
        date: 'Day 2 · Dec 02',
        title: 'Burj Khalifa & Dubai Mall Wonders',
        location: '📍 Downtown Dubai ➔ Fountain Show',
        time: '⏱️ 8 Hours',
        weather: '☀️ 28°C Warm',
        image: 'assets/images/dest-dubai.jpg',
        hotel: '🏨 Burj Al Arab Jumeirah',
        meals: '🍽️ At.mosphere 122nd Floor Dining',
        transport: '🚗 Private Chauffeur Sedan',
        activities: ['🏙️ Burj Khalifa 148th Floor', '🐠 Dubai Mall Aquarium', '⛲ Fountain Show VIP Lounge', '🛍️ Personal Shopper Tour'],
        expandDetails: {
          hotelName: 'Burj Al Arab Jumeirah',
          roomType: 'Duplex Deluxe Royal Suite',
          amenities: 'At.mosphere VIP Lounge Reservation',
          schedule: [
            '10:00 AM — Fast-Track Access to At The Top Sky (148th Floor)',
            '01:00 PM — Fine Dining Lunch at At.mosphere on 122nd Floor',
            '03:30 PM — VIP Behind-the-Scenes Tour of Dubai Aquarium',
            '07:30 PM — Front Row Private Lounge Viewing of Dubai Fountains'
          ],
          tips: 'At.mosphere window tables booked 30 days in advance.',
          currency: 'AED (د.إ)',
          language: 'English'
        }
      },
      {
        day: 3,
        date: 'Day 3 · Dec 03',
        title: 'Royal Desert Safari & Falconry Camp',
        location: '📍 Al Marmoom Desert Reserve',
        time: '⏱️ 8 Hours',
        weather: '☀️ 26°C Clear',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Bab Al Shams Desert Resort',
        meals: '🍽️ Bedouin Gourmet Banquet',
        transport: '🚙 Vintage Range Rover 4x4',
        activities: ['🐫 Royal Camel Trek', '🦅 Falconry Demonstration', '🏜️ Dune Bashing Safari', '🔥 Bedouin Camp Banquet'],
        expandDetails: {
          hotelName: 'Bab Al Shams Desert Resort',
          roomType: 'Royal Desert Pool Suite',
          amenities: 'Private Desert Pool, Camel Escort',
          schedule: [
            '02:30 PM — Pickup in Vintage 1950s Land Rover 4x4',
            '04:30 PM — Interactive Royal Falconry & Gazelle Wildlife Drive',
            '06:00 PM — Sunset Camel Trek across Red Dunes',
            '07:30 PM — 5-Course Bedouin Banquet with Live Music & Fire Show'
          ],
          tips: 'Desert temperatures drop 8°C after sunset; bring jacket.',
          currency: 'AED (د.إ)',
          language: 'Arabic / English'
        }
      },
      {
        day: 4,
        date: 'Day 4 · Dec 04',
        title: 'Museum of Future & Palm Jumeirah Yacht',
        location: '📍 Museum of Future ➔ Dubai Marina',
        time: '⏱️ 8 Hours',
        weather: '☀️ 27°C Sunny',
        image: 'assets/images/dest-dubai.jpg',
        hotel: '🏨 Atlantis The Royal Palm',
        meals: '🍽️ Yacht Seafood Dinner',
        transport: '🛥️ Private Superyacht Charter',
        activities: ['🔮 Museum of the Future', '🏝️ Palm Jumeirah Monorail', '🛥️ Sunset Superyacht Cruise', '💦 Aquaventure VIP Cabana'],
        expandDetails: {
          hotelName: 'Atlantis The Royal Resort',
          roomType: 'Sky Pool Villa Suite',
          amenities: 'Private Infinity Skypool, Butler, Yacht Captain',
          schedule: [
            '10:00 AM — Fast-Pass Entry to Museum of the Future',
            '01:00 PM — Check-in at Atlantis The Royal & Cloud 22 Skypool',
            '05:00 PM — 3-Hour Private Superyacht Cruise around Palm Jumeirah',
            '08:30 PM — Gourmet Dinner on Yacht Deck facing Ain Dubai'
          ],
          tips: 'Swimwear recommended for Atlantis Skypool access.',
          currency: 'AED (د.إ)',
          language: 'English'
        }
      },
      {
        day: 5,
        date: 'Day 5 · Dec 05',
        title: 'Historic Souks & Gold Exploration',
        location: '📍 Old Dubai ➔ Gold Souk ➔ Creek',
        time: '⏱️ 7 Hours',
        weather: '☀️ 28°C Clear',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Atlantis The Royal Palm',
        meals: '🍽️ Emirati Heritage Lunch',
        transport: '🚤 Traditional Wooden Abra Boat',
        activities: ['💎 Gold & Spice Souks', '⛵ Abra Creek Crossing', '🏛️ Al Fahidi Heritage District', '☕ Arabic Coffee Tasting'],
        expandDetails: {
          hotelName: 'Atlantis The Royal Resort',
          roomType: 'Sky Pool Villa Suite',
          amenities: 'Private Cultural Historian Guide',
          schedule: [
            '09:30 AM — Guided Heritage Walking Tour through Al Fahidi Quarter',
            '11:30 AM — Traditional Abra Boat Crossing over Dubai Creek',
            '01:00 PM — Authentic Emirati Banquet at Sheikh Mohammed Cultural Centre',
            '03:30 PM — VIP Guided Gold & Spice Souk Shopping Experience'
          ],
          tips: 'Gold prices are regulated by government weights and measures.',
          currency: 'AED (د.إ)',
          language: 'Arabic / English'
        }
      },
      {
        day: 6,
        date: 'Day 6 · Dec 06',
        title: 'Helicopter Tour & Farewell Dubai',
        location: '📍 Atlantis Helipad ➔ DXB Airport',
        time: '⏱️ 4 Hours',
        weather: '☀️ 27°C Sunny',
        image: 'assets/images/dest-dubai.jpg',
        hotel: '✈️ DXB VIP First Lounge',
        meals: '🍽️ Farewell Champagne Brunch',
        transport: '🚁 Private Helicopter & Chauffeur',
        activities: ['🚁 Aerial Helicopter Tour', '🥂 Farewell Champagne Brunch', '🛍️ DXB Duty Free Shopping', '✈️ VIP Airport Transfer'],
        expandDetails: {
          hotelName: 'DXB First Class Lounge',
          roomType: 'N/A',
          amenities: 'Private Sleeping Suites, Cigar Bar',
          schedule: [
            '09:30 AM — 22-Minute Aerial Helicopter Flight over Palm & World Islands',
            '11:30 AM — Farewell Champagne Brunch at Nobu Dubai',
            '01:30 PM — Private Escort to DXB Airport VIP Terminal',
            '04:00 PM — Board International Flight Home'
          ],
          tips: 'Original passport required for helicopter flight check-in.',
          currency: 'AED / USD',
          language: 'English'
        }
      }
    ],

    // 6. SWITZERLAND (SWISS ALPS)
    'switzerland': [
      {
        day: 1,
        date: 'Day 1 · Jan 15',
        title: 'Arrival in St. Moritz & Glacier Express',
        location: '📍 Zurich ➔ St. Moritz Alpine Resort',
        time: '⏱️ 6 Hours',
        weather: '❄️ -2°C Snow Magic',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        hotel: "🏨 Badrutt's Palace Hotel St. Moritz (5-Star)",
        meals: '🍽️ Swiss Fondue Welcome Dinner',
        transport: '🚂 Glacier Express First Class',
        activities: ['✈️ Zurich Airport VIP Escort', '🚂 Glacier Express Excellence Class', '🏨 Palace Alpine Check-in', '🫕 Swiss Cheese Fondue'],
        expandDetails: {
          hotelName: "Badrutt's Palace Hotel (St. Moritz)",
          roomType: 'Engadin Mountain View Palace Suite',
          amenities: 'Heated Outdoor Pool, Ice Rink, Spa, Private Ski Locker',
          schedule: [
            '10:00 AM — Private VIP Transfer from Zurich Airport to Train Station',
            '11:30 AM — Excellence Class Journey on Glacier Express',
            '03:30 PM — Check-in at Badrutt’s Palace with Hot Chocolate Welcome',
            '07:30 PM — Traditional Swiss Cheese & Truffle Fondue Feast'
          ],
          tips: 'Winter thermal boots and warm woolens essential.',
          currency: 'CHF (CHF)',
          language: 'German / English'
        }
      },
      {
        day: 2,
        date: 'Day 2 · Jan 16',
        title: 'Matterhorn Zermatt Glacier Expedition',
        location: '📍 Zermatt Village ➔ Gornergrat',
        time: '⏱️ 8 Hours',
        weather: '☀️ -1°C Clear Alpine',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 The Omnia Zermatt (Luxury Lodge)',
        meals: '🍽️ Alpine Peak Breakfast & Lunch',
        transport: '🚂 Gornergrat Cogwheel Train',
        activities: ['🏔️ Gornergrat Cogwheel Train', '📸 Matterhorn Viewpoint', '❄️ Glacier Palace Walk', '🍷 Alpine Fireside Lounge'],
        expandDetails: {
          hotelName: 'The Omnia Lodge (Zermatt)',
          roomType: 'Matterhorn View Suite',
          amenities: 'Indoor-Outdoor Pool with Matterhorn View, Fireplace',
          schedule: [
            '09:00 AM — Cogwheel Railway Climb to Gornergrat (3,089m)',
            '11:30 AM — Panoramic Photo Session facing Matterhorn Peak',
            '01:30 PM — Gourmet Mountain Lunch at 3100 Kulmhotel',
            '05:00 PM — Fireplace Cocktail Relaxation at The Omnia'
          ],
          tips: 'High-altitude UV rays require UV400 sunglasses & SPF50.',
          currency: 'CHF (CHF)',
          language: 'German / English'
        }
      },
      {
        day: 3,
        date: 'Day 3 · Jan 17',
        title: 'Jungfraujoch Top of Europe',
        location: '📍 Grindelwald ➔ Jungfraujoch (3,454m)',
        time: '⏱️ 9 Hours',
        weather: '❄️ -4°C Snow Peak',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Victoria-Jungfrau Grand Hotel',
        meals: '🍽️ Glacier Panorama Lunch',
        transport: '🚡 Eiger Express Tricable Gondola',
        activities: ['🚡 Eiger Express Cable Car', '❄️ Ice Palace Sculptures', '🔭 Sphinx Observatory View', '🍫 Lindt Chocolate World'],
        expandDetails: {
          hotelName: 'Victoria-Jungfrau Grand Hotel & Spa (Interlaken)',
          roomType: 'Jungfrau Mountain View Suite',
          amenities: '5,500m² Nescens Spa, Indoor Heated Pool',
          schedule: [
            '08:30 AM — Eiger Express Gondola Ride to Eiger Glacier',
            '10:30 AM — Ice Palace & Sphinx Terrace Lookout (3,454m)',
            '01:00 PM — Highest Altitude Restaurant Lunch on Glacier',
            '04:30 PM — Lindt Swiss Chocolate Masterclass Tour'
          ],
          tips: 'Jungfraujoch is Europe’s highest railway station.',
          currency: 'CHF (CHF)',
          language: 'German / English'
        }
      },
      {
        day: 4,
        date: 'Day 4 · Jan 18',
        title: 'Lake Geneva & Chillon Castle',
        location: '📍 Montreux ➔ Lake Geneva',
        time: '⏱️ 7 Hours',
        weather: '🌤️ 4°C Crisp Air',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Fairmont Le Montreux Palace',
        meals: '🍽️ Vineyard Wine Lunch',
        transport: '🚢 Belle Époque Paddle Steamer',
        activities: ['🏰 Chillon Medieval Castle', '🚢 Lake Geneva Steamer Cruise', '🍇 Lavaux Vineyard Tasting', '🎷 Montreux Promenade'],
        expandDetails: {
          hotelName: 'Fairmont Le Montreux Palace',
          roomType: 'Lake View Junior Suite',
          amenities: 'Private Balcony overlooking Lake & French Alps',
          schedule: [
            '10:00 AM — Private Guided Tour of 12th-Century Chillon Castle',
            '12:30 PM — Steamer Boat Cruise across Lake Geneva to Vevey',
            '03:00 PM — UNESCO Lavaux Vineyard Wine & Cheese Cellar Tasting',
            '07:30 PM — Fine Dining at MP’s Bar & Grill'
          ],
          tips: 'Lavaux vineyards have produced wine since Roman times.',
          currency: 'CHF (CHF)',
          language: 'French / English'
        }
      },
      {
        day: 5,
        date: 'Day 5 · Jan 19',
        title: 'Grindelwald First Cliff Walk',
        location: '📍 Grindelwald First Peak',
        time: '⏱️ 8 Hours',
        weather: '☀️ 1°C Sunny Alpine',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Victoria-Jungfrau Grand Hotel',
        meals: '🍽️ Chalet Gourmet Dinner',
        transport: '🚡 Grindelwald Cable Car',
        activities: ['🌉 Tissot Cliff Walk Bridge', '🚡 First Flyer Zipline', '🏔️ Bachalpsee Alpine Lake', '🔥 Chalet Fireplace Dinner'],
        expandDetails: {
          hotelName: 'Victoria-Jungfrau Grand Hotel',
          roomType: 'Jungfrau Mountain View Suite',
          amenities: 'Spa Hydrotherapy Pass Included',
          schedule: [
            '09:30 AM — Cable Car Climb to Grindelwald First Peak',
            '11:00 AM — Thrilling Tissot Suspension Cliff Walk Experience',
            '01:30 PM — Alpine Meadow Picnic Lunch near Lake Bachalpsee',
            '07:30 PM — Swiss Raclette & Fine Wine Dinner in Chalet'
          ],
          tips: 'Sturdy hiking boots required for cliff walk platform.',
          currency: 'CHF (CHF)',
          language: 'German / English'
        }
      },
      {
        day: 6,
        date: 'Day 6 · Jan 20',
        title: 'Farewell Swiss Alps & Zurich Departure',
        location: '📍 Zurich Old Town ➔ ZRH Airport',
        time: '⏱️ 4 Hours',
        weather: '🌤️ 3°C Clear',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        hotel: '✈️ ZRH VIP First Lounge',
        meals: '🍽️ Farewell Swiss Breakfast',
        transport: '✈️ Private Airport Limousine',
        activities: ['🥐 Swiss Bakery Breakfast', '🍫 Sprüngli Chocolatier Tour', '🛍️ Bahnhofstrasse Shopping', '✈️ VIP Airport Transfer'],
        expandDetails: {
          hotelName: 'Zurich Airport First Class Terminal',
          roomType: 'N/A',
          amenities: 'Fast-track Security Pass, Cigar Lounge, Chef Station',
          schedule: [
            '09:00 AM — Gourmet Breakfast at Sprüngli Café on Bahnhofstrasse',
            '11:00 AM — Luxury Swiss Watch & Chocolate Souvenir Shopping',
            '01:00 PM — Chauffeur Escort to Zurich Airport VIP Lounge',
            '03:30 PM — Board International Flight Home'
          ],
          tips: 'Swiss watches purchased tax-free qualify for direct airport refund.',
          currency: 'CHF / EUR',
          language: 'English'
        }
      }
    ],

    // 7. AMALFI COAST (ITALY)
    'amalfi': [
      {
        day: 1,
        date: 'Day 1 · Jun 10',
        title: 'Arrival in Naples & Positano VIP Reception',
        location: '📍 Naples Airport (NAP) ➔ Positano Coast',
        time: '⏱️ 5 Hours',
        weather: '☀️ 27°C Sunny Warm',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Le Sirenuse Positano (5-Star Luxury)',
        meals: '🍽️ Welcome Seafood & Prosecco Banquet',
        transport: '🚗 Private Executive Mercedes Limousine',
        activities: ['✈️ Naples Airport Pick-up', '🚗 Coastal Scenic Transfer', '🏨 Cliffside Suite Check-in', '🥂 Sunset Prosecco Toast'],
        expandDetails: {
          hotelName: 'Le Sirenuse Positano',
          roomType: 'Cliffside Sea View Balcony Suite',
          amenities: 'Private Terrace, Saltwater Cliff Pool, La Sponda Michelin Restaurant',
          schedule: [
            '11:00 AM — Private VIP Escort at Naples International Airport (NAP)',
            '01:00 PM — Check-in at Le Sirenuse Positano with Lemon Welcome Drink',
            '04:30 PM — Guided Walk through Positano Cobblestone Streets',
            '07:30 PM — Candlelight Welcome Dinner at La Sponda'
          ],
          tips: 'Porter service included for luggage on Positano stairs.',
          currency: 'EUR (€)',
          language: 'Italian / English'
        }
      },
      {
        day: 2,
        date: 'Day 2 · Jun 11',
        title: 'Positano Cliffside Exploration & Spiaggia Grande',
        location: '📍 Positano Beach ➔ Church of Santa Maria',
        time: '⏱️ 7 Hours',
        weather: '☀️ 28°C Mediterranean',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Le Sirenuse Positano',
        meals: '🍽️ Beachfront Lunch & Terrace Dinner',
        transport: '🛥️ Private Coastal Tender',
        activities: ['🏖️ Spiaggia Grande Beach', '⛵ Private Coastal Speedboat', '🏛️ Santa Maria Assunta Church', '🛍️ Boutique Linen Shopping'],
        expandDetails: {
          hotelName: 'Le Sirenuse Positano',
          roomType: 'Cliffside Sea View Balcony Suite',
          amenities: 'Reserved Sunbeds at Spiaggia Grande Beach',
          schedule: [
            '09:30 AM — Sidewalk Bakery Breakfast overlooking Positano Bay',
            '11:00 AM — Reserved VIP Sunbeds at Spiaggia Grande Beach',
            '01:30 PM — Fresh Catch Seafood Lunch at Chez Black',
            '05:00 PM — Private Sunset Speedboat Cruise around Positano Cliffs'
          ],
          tips: 'Handmade leather sandals can be custom fitted in 20 minutes.',
          currency: 'EUR (€)',
          language: 'Italian / English'
        }
      },
      {
        day: 3,
        date: 'Day 3 · Jun 12',
        title: 'Capri Island Boat Charter & Blue Grotto',
        location: '📍 Positano Port ➔ Capri & Anacapri',
        time: '⏱️ 8 Hours',
        weather: '☀️ 29°C Island Blue',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Capri Palace Jumeirah',
        meals: '🍽️ Cliffside Cliff Dining & Gelato',
        transport: '🛥️ 45ft Private Luxury Yacht Charter',
        activities: ['🌊 Blue Grotto Sea Cave Swim', '🛥️ Capri Private Yacht Charter', '🚡 Mount Solaro Chairlift', '🏛️ Piazzetta Capri Tour'],
        expandDetails: {
          hotelName: 'Capri Palace Jumeirah (Anacapri)',
          roomType: 'Capri Sea View Penthouse Suite',
          amenities: 'Capri Beauty Farm Spa, Private Pool',
          schedule: [
            '09:00 AM — Board Private 45ft Yacht from Positano Pier',
            '10:30 AM — Swim inside the World-Famous Blue Grotto',
            '01:00 PM — Cliffside Lunch at Il Riccio Restaurant in Anacapri',
            '03:30 PM — Chairlift Ride to Mount Solaro Summit (589m)',
            '07:30 PM — Evening Cocktails in Capri Piazzetta'
          ],
          tips: 'Blue Grotto entry depends on morning tide level.',
          currency: 'EUR (€)',
          language: 'Italian / English'
        }
      },
      {
        day: 4,
        date: 'Day 4 · Jun 13',
        title: 'Ravello Infinity Gardens & Limoncello Tasting',
        location: '📍 Ravello ➔ Villa Cimbrone',
        time: '⏱️ 7 Hours',
        weather: '☀️ 26°C Sunny',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Hotel Caruso Belmond (Ravello)',
        meals: '🍽️ Gourmet Vineyard Lunch',
        transport: '🚗 Private Executive Mercedes',
        activities: ['🌺 Villa Rufolo Gardens', '🏛️ Villa Cimbrone Terrace of Infinity', '🍋 Organic Limoncello Cellar Tour', '🎹 Ravello Concert Hall'],
        expandDetails: {
          hotelName: 'Belmond Hotel Caruso (Ravello)',
          roomType: 'Belvedere Sea View Suite',
          amenities: 'Suspended Cliffside Infinity Pool, Piano Bar',
          schedule: [
            '10:00 AM — Scenic Drive up to Mountain Village of Ravello',
            '11:30 AM — Tour Villa Cimbrone Terrace of Infinity',
            '01:30 PM — Organic Lemon Grove Tour & Fresh Limoncello Tasting',
            '07:30 PM — Open-Air Concert & Classical Music Recital'
          ],
          tips: 'Ravello is 365m above sea level with cooler breezes.',
          currency: 'EUR (€)',
          language: 'Italian / English'
        }
      },
      {
        day: 5,
        date: 'Day 5 · Jun 14',
        title: 'Historic Amalfi Town & Cathedral',
        location: '📍 Amalfi Port ➔ Duomo di Sant’Andrea',
        time: '⏱️ 6 Hours',
        weather: '🌤️ 27°C Sunny',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Hotel Santa Caterina Amalfi',
        meals: '🍽️ Seafood Pasta Tasting',
        transport: '🚗 Private Chauffeur Van',
        activities: ['⛪ Amalfi Cathedral (Duomo)', '📜 Paper Museum Tour', '🍨 Artisanal Gelato Tasting', '🌅 Sunset Harbor Walk'],
        expandDetails: {
          hotelName: 'Hotel Santa Caterina Amalfi',
          roomType: 'Deluxe Sea View Suite with Garden',
          amenities: 'Beach Club Elevator through Cliff, Citrus Groves',
          schedule: [
            '10:00 AM — Guided Tour of 9th-Century Amalfi Cathedral',
            '12:30 PM — Traditional Handmade Scialatielli Pasta Lunch',
            '03:00 PM — Ancient Amalfi Handmade Paper Mill Museum Tour',
            '07:30 PM — Dinner at Hotel Santa Caterina Cliffside Restaurant'
          ],
          tips: 'Dress modestly when entering Duomo di Sant’Andrea.',
          currency: 'EUR (€)',
          language: 'Italian / English'
        }
      },
      {
        day: 6,
        date: 'Day 6 · Jun 15',
        title: 'Path of the Gods Panorama Hike',
        location: '📍 Bomerano ➔ Nocelle Mountain Trail',
        time: '⏱️ 6 Hours',
        weather: '🌤️ 25°C Fresh Breeze',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
        hotel: '🏨 Hotel Santa Caterina Amalfi',
        meals: '🍽️ Mountain Shepherd Picnic Lunch',
        transport: '🚗 Private Trailhead Shuttle',
        activities: ['🥾 Path of the Gods (Sentiero degli Dei)', '⛰️ Nocelle Viewpoint', '🧀 Shepherd Cheese Picnic', '🍷 Farewell Wine Tasting'],
        expandDetails: {
          hotelName: 'Hotel Santa Caterina Amalfi',
          roomType: 'Deluxe Sea View Suite',
          amenities: 'Private Spa Bath & Cliffside Beach Club',
          schedule: [
            '08:30 AM — Shuttle to Bomerano Trailhead',
            '09:30 AM — Hike Sentiero degli Dei (Path of the Gods)',
            '01:00 PM — Fresh Mozzarella & Wine Picnic in Mountain Refuge',
            '07:30 PM — 7-Course Farewell Dinner in Amalfi Harbor'
          ],
          tips: 'Path of the Gods offers the single best view of the entire coastline.',
          currency: 'EUR (€)',
          language: 'Italian / English'
        }
      },
      {
        day: 7,
        date: 'Day 7 · Jun 16',
        title: 'Neapolitan Breakfast & Naples Airport Transfer',
        location: '📍 Amalfi ➔ Naples Airport (NAP)',
        time: '⏱️ 4 Hours',
        weather: '☀️ 26°C Clear',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        hotel: '✈️ Naples Airport Executive VIP Lounge',
        meals: '🍽️ Farewell Sfogliatella & Espresso',
        transport: '🚗 Executive Limousine Escort',
        activities: ['☕ Neapolitan Espresso', '🥐 Fresh Sfogliatella Pastry', '✈️ VIP Airport Escort', '🛍️ Duty-Free Shopping'],
        expandDetails: {
          hotelName: 'Naples Airport VIP Lounge',
          roomType: 'N/A',
          amenities: 'Fast-track Security Pass, Private Lounge Bar',
          schedule: [
            '09:00 AM — Gourmet Farewell Breakfast overlooking Amalfi Bay',
            '11:00 AM — Executive Mercedes Limousine Transfer to Naples Airport',
            '01:00 PM — VIP Lounge Fast-Track Check-in at Naples (NAP)',
            '03:30 PM — Board Departure Flight Home'
          ],
          tips: 'Keep VAT tax-free refund receipts ready at airport customs.',
          currency: 'EUR (€)',
          language: 'Italian / English'
        }
      }
    ]
  };

  /* ── Dynamic Destination Fallback Generator ── */
  function getOrGenerateItinerary(destinationKey) {
    const rawKey = destinationKey || 'tokyo';
    const normKey = (window.VentouraDatabase && window.VentouraDatabase.normalizeDestKey) ?
                    window.VentouraDatabase.normalizeDestKey(rawKey) :
                    rawKey.toLowerCase().replace(/^pkg-/, '').replace(/^dest-/, '').replace(/-\d+d$/, '');

    // Check direct match in DESTINATION_ITINERARIES
    if (DESTINATION_ITINERARIES[normKey]) {
      return DESTINATION_ITINERARIES[normKey];
    }

    // Check fuzzy match in DESTINATION_ITINERARIES
    for (const dKey in DESTINATION_ITINERARIES) {
      if (normKey.includes(dKey) || dKey.includes(normKey)) {
        return DESTINATION_ITINERARIES[dKey];
      }
    }

    // Default fallback: Always return Tokyo itinerary (never output fake random text)
    return DESTINATION_ITINERARIES['tokyo'];
  }

  /* ── Core Luxury Alternating Timeline Renderer ── */
  window.renderLuxuryTimeline = function (containerId, daysCount = 6, destinationKey = 'maldives', isCheckout = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Detect destination dynamically if not explicitly specified
    let targetDest = destinationKey;
    if (!targetDest || targetDest === '7-day' || targetDest === 'default') {
      try {
        const storedTrip = localStorage.getItem('selectedTrip');
        if (storedTrip) {
          const parsed = JSON.parse(storedTrip);
          if (parsed && (parsed.country || parsed.name)) {
            targetDest = parsed.country || parsed.name;
          }
        }
      } catch (e) {}
    }

    const data = getOrGenerateItinerary(targetDest);
    const activeDays = data.slice(0, daysCount || data.length);

    let html = `
      <!-- Progress Bar Header -->
      <div class="timeline-header-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <div>
            <div style="font-size:12px;font-weight:800;color:var(--timeline-bronze-dark);letter-spacing:1.5px;text-transform:uppercase">JOURNEY JOURNAL</div>
            <h3 style="font-size:22px;font-weight:800;color:#1F2937;margin:2px 0;font-family:'Cormorant Garamond',serif">
              Day-by-Day Alternating Travel Timeline
            </h3>
          </div>
          <div style="text-align:right" id="timeline-progress-label">
            <span style="font-size:14px;font-weight:700;color:#1F2937">Day 1 of ${activeDays.length}</span>
            <span style="font-size:13px;color:#6B7280"> · 16% Complete</span>
          </div>
        </div>
        <div class="timeline-progress-bar-bg">
          <div class="timeline-progress-fill" id="timeline-progress-fill" style="width: 16%;"></div>
        </div>
      </div>

      <!-- Timeline Main Alternating Wrapper -->
      <div class="alternating-timeline" id="timeline-main-wrapper">
        <div class="timeline-progress-line" id="timeline-progress-line" style="height: 0%;"></div>
    `;

    activeDays.forEach((item, idx) => {
      // PROMPT SPECIFICATION:
      // Day 1 (idx=0) -> Right Side
      // Day 2 (idx=1) -> Left Side
      // Day 3 (idx=2) -> Right Side
      // Day 4 (idx=3) -> Left Side
      // Day 5 (idx=4) -> Right Side
      // Day 6 (idx=5) -> Left Side
      const alignClass = (idx % 2 === 0) ? 'right' : 'left';
      const dayNumStr = item.day < 10 ? `0${item.day}` : `${item.day}`;

      html += `
        <div class="timeline-item ${alignClass} ${idx === 0 ? 'visible' : ''}" data-day="${item.day}" id="timeline-item-day-${item.day}">
          
          <!-- Center Bronze Dot Node Indicator (●) -->
          <div class="timeline-node ${idx === 0 ? 'active' : ''}" id="timeline-node-${item.day}">${item.day}</div>

          <!-- Day Timeline Card -->
          <div class="day-card">
            
            <!-- Card Header -->
            <div class="day-card-header">
              <div class="day-badge">DAY ${dayNumStr}</div>
              <div class="day-weather-tag">${item.weather}</div>
            </div>

            <!-- Thumbnail Image -->
            <div class="day-img-wrap">
              <img src="${item.image}" alt="${item.title}" class="day-img" loading="lazy" />
              <div class="day-img-overlay">
                <span>${item.location}</span>
              </div>
            </div>

            <!-- Title & Location -->
            <h4 class="day-title">${item.title}</h4>
            <div class="day-location">${item.location}</div>

            <!-- Quick Meta Info Grid -->
            <div class="day-meta-grid">
              <div class="meta-chip" title="Hotel">🏨 <strong>${item.hotel}</strong></div>
              <div class="meta-chip" title="Meals">🍽️ <strong>${item.meals}</strong></div>
              <div class="meta-chip" title="Transport">✈️ <strong>${item.transport}</strong></div>
              <div class="meta-chip" title="Duration">⏱️ <strong>${item.time}</strong></div>
            </div>

            <!-- Activities List -->
            <div class="day-activities-list">
              ${item.activities.map(act => `
                <div class="activity-item">
                  <div class="activity-bullet"></div>
                  <span>${act}</span>
                </div>
              `).join('')}
            </div>

            <!-- Expandable Drawer Toggle -->
            <button type="button" class="day-expand-btn" onclick="window.toggleTimelineDay(${item.day})">
              <span>View Full Daily Journal</span>
              <span>↓</span>
            </button>

            <!-- Expandable Detail Content Drawer -->
            <div class="day-expand-content" id="day-expand-${item.day}">
              <div style="font-size:14px;font-weight:700;color:var(--timeline-bronze-dark);margin-bottom:8px">🏨 Accommodation & Amenities</div>
              <div style="font-size:13px;color:#4B5563;margin-bottom:14px;line-height:1.6">
                <strong>${item.expandDetails.hotelName}</strong><br />
                <span style="color:#6B7280">Room: ${item.expandDetails.roomType}</span><br />
                <span style="color:#6B7280">Included: ${item.expandDetails.amenities}</span>
              </div>

              <div style="font-size:14px;font-weight:700;color:var(--timeline-bronze-dark);margin-bottom:8px">⏱️ Detailed Schedule</div>
              <ul style="font-size:13px;color:#4B5563;padding-left:16px;margin-bottom:14px;line-height:1.7">
                ${item.expandDetails.schedule.map(s => `<li>${s}</li>`).join('')}
              </ul>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:12px;background:rgba(197,160,89,0.08);padding:12px;border-radius:12px;border:1px solid rgba(197,160,89,0.25)">
                <div><strong>💡 Travel Tip:</strong> ${item.expandDetails.tips}</div>
                <div><strong>💱 Currency:</strong> ${item.expandDetails.currency} | <strong>🗣️ Language:</strong> ${item.expandDetails.language}</div>
              </div>
            </div>

          </div>

        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // Attach Scroll Observer for animated central line & node pulses
    initTimelineScrollObserver(activeDays.length);
  };

  /* ── Toggle Expandable Day Content ── */
  window.toggleTimelineDay = function (dayNum) {
    const drawer = document.getElementById(`day-expand-${dayNum}`);
    const btn = drawer?.closest('.day-card')?.querySelector('.day-expand-btn');
    if (!drawer || !btn) return;

    if (drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      btn.innerHTML = '<span>View Full Daily Journal</span><span>↓</span>';
    } else {
      drawer.classList.add('open');
      btn.innerHTML = '<span>Collapse Journal</span><span>↑</span>';
    }
  };

  /* ── Animated Scroll Observer ── */
  function initTimelineScrollObserver(totalDays) {
    const items = document.querySelectorAll('.timeline-item');
    const line = document.getElementById('timeline-progress-line');
    const fill = document.getElementById('timeline-progress-fill');
    const label = document.getElementById('timeline-progress-label');

    if (!items.length) return;

    function checkScroll() {
      const windowHeight = window.innerHeight;
      let currentActiveDay = 1;

      items.forEach((item, idx) => {
        const rect = item.getBoundingClientRect();
        const node = document.getElementById(`timeline-node-${idx + 1}`);

        if (rect.top <= windowHeight * 0.8) {
          item.classList.add('visible');
          if (node) {
            node.classList.add('completed');
          }
          currentActiveDay = idx + 1;
        }
      });

      // Update active node highlight
      const activeNode = document.getElementById(`timeline-node-${currentActiveDay}`);
      if (activeNode) {
        activeNode.classList.remove('completed');
        activeNode.classList.add('active');
      }

      // Calculate vertical fill height
      const progressPercent = Math.min(100, Math.round((currentActiveDay / totalDays) * 100));
      if (line) line.style.height = `${progressPercent}%`;
      if (fill) fill.style.width = `${progressPercent}%`;
      if (label) {
        label.innerHTML = `<span style="font-size:14px;font-weight:700;color:#1F2937">Day ${currentActiveDay} of ${totalDays}</span><span style="font-size:13px;color:#6B7280"> · ${progressPercent}% Complete</span>`;
      }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
  }

})();

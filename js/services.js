/* ============================================================
   SERVICES.JS — Multi-Service Hub, Package Catalog & Details Engine
   ============================================================ */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════
  // TOUR PACKAGES DATABASE (14 CATEGORIES & 10 DURATIONS)
  // ═══════════════════════════════════════════════════
  let packageCatalogDb = [
  {
    "id": "pkg-maldives-7d",
    "category": "beach",
    "altCategories": [
      "beach",
      "luxury",
      "featured"
    ],
    "title": "Maldives Overwater Sanctuary",
    "country": "🇲🇻 Maldives",
    "city": "Baa Atoll",
    "rating": 4.9,
    "reviewsCount": 512,
    "price": "$2,499",
    "originalPrice": "$3,299",
    "discount": "25% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Velana Luxury Overwater Villa",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-maldives.jpg",
    "destImg": "assets/images/dest-maldives.jpg",
    "gallery": [
      "assets/images/dest-maldives.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Maldives Overwater Sanctuary in 🇲🇻 Maldives (Baa Atoll). Stay at 5★ Velana Luxury Overwater Villa with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Velana Luxury Overwater Villa Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      }
    ]
  },
  {
    "id": "pkg-santorini-beach-6d",
    "category": "beach",
    "altCategories": [
      "beach",
      "luxury",
      "featured"
    ],
    "title": "Santorini Clifftop Beach & Caldera",
    "country": "🇬🇷 Greece",
    "city": "Oia & Perissa",
    "rating": 4.8,
    "reviewsCount": 430,
    "price": "$1,399",
    "originalPrice": "$1,799",
    "discount": "22% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Grace Hotel Caldera Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-santorini.jpg",
    "destImg": "assets/images/dest-santorini.jpg",
    "gallery": [
      "assets/images/dest-santorini.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Santorini Clifftop Beach & Caldera in 🇬🇷 Greece (Oia & Perissa). Stay at 5★ Grace Hotel Caldera Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Grace Hotel Caldera Suite Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      }
    ]
  },
  {
    "id": "pkg-bali-beach-7d",
    "category": "beach",
    "altCategories": [
      "beach",
      "luxury",
      "featured"
    ],
    "title": "Bali Seminyak Beach & Island Escape",
    "country": "🇮🇩 Indonesia",
    "city": "Seminyak & Nusa Dua",
    "rating": 4.7,
    "reviewsCount": 580,
    "price": "$1,099",
    "originalPrice": "$1,499",
    "discount": "26% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Alila Seminyak Beachfront Resort",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-bali.jpg",
    "destImg": "assets/images/dest-bali.jpg",
    "gallery": [
      "assets/images/dest-bali.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Bali Seminyak Beach & Island Escape in 🇮🇩 Indonesia (Seminyak & Nusa Dua). Stay at 5★ Alila Seminyak Beachfront Resort with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Alila Seminyak Beachfront Resort Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      }
    ]
  },
  {
    "id": "pkg-phuket-beach-6d",
    "category": "beach",
    "altCategories": [
      "beach",
      "luxury",
      "featured"
    ],
    "title": "Phuket Phi Phi Islands Paradise",
    "country": "🇹🇭 Thailand",
    "city": "Phuket & Maya Bay",
    "rating": 4.8,
    "reviewsCount": 490,
    "price": "$899",
    "originalPrice": "$1,199",
    "discount": "25% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ The Naka Island Resort Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-overwater.jpg",
    "destImg": "assets/images/hotel-overwater.jpg",
    "gallery": [
      "assets/images/hotel-overwater.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Phuket Phi Phi Islands Paradise in 🇹🇭 Thailand (Phuket & Maya Bay). Stay at 5★ The Naka Island Resort Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ The Naka Island Resort Suite Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      }
    ]
  },
  {
    "id": "pkg-goldcoast-beach-7d",
    "category": "beach",
    "altCategories": [
      "beach",
      "luxury",
      "featured"
    ],
    "title": "Gold Coast Surfers Paradise & Reef",
    "country": "🇦🇺 Australia",
    "city": "Queensland & Barrier Reef",
    "rating": 4.9,
    "reviewsCount": 360,
    "price": "$1,799",
    "originalPrice": "$2,299",
    "discount": "21% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Sheraton Grand Mirage Resort",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-luxury.jpg",
    "destImg": "assets/images/hotel-luxury.jpg",
    "gallery": [
      "assets/images/hotel-luxury.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Gold Coast Surfers Paradise & Reef in 🇦🇺 Australia (Queensland & Barrier Reef). Stay at 5★ Sheraton Grand Mirage Resort with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Sheraton Grand Mirage Resort Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      }
    ]
  },
  {
    "id": "pkg-nepal-everest-10d",
    "category": "adventure",
    "altCategories": [
      "adventure",
      "luxury",
      "featured"
    ],
    "title": "Nepal Everest Base Camp Himalayan Trek",
    "country": "🇳🇵 Nepal",
    "city": "Kathmandu & Khumbu",
    "rating": 4.9,
    "reviewsCount": 340,
    "price": "$1,499",
    "originalPrice": "$1,999",
    "discount": "25% OFF",
    "duration": "10 Days / 9 Nights",
    "durationDays": 10,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "4★ Himalayan Mountain Lodge & Tea House",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-2.jpg",
    "destImg": "assets/images/gallery-2.jpg",
    "gallery": [
      "assets/images/gallery-2.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Nepal Everest Base Camp Himalayan Trek in 🇳🇵 Nepal (Kathmandu & Khumbu). Stay at 4★ Himalayan Mountain Lodge & Tea House with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 4★ Himalayan Mountain Lodge & Tea House Check-in",
      "Day 2–9: Guided Sightseeing & VIP Excursions",
      "Day 10: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 8,
        "title": "Guided Experience & Highlights Part 7",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 9,
        "title": "Guided Experience & Highlights Part 8",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 10,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      }
    ]
  },
  {
    "id": "pkg-nz-queenstown-8d",
    "category": "adventure",
    "altCategories": [
      "adventure",
      "luxury",
      "featured"
    ],
    "title": "New Zealand Queenstown Extreme Expedition",
    "country": "🇳🇿 New Zealand",
    "city": "Queenstown & Milford Sound",
    "rating": 5.0,
    "reviewsCount": 280,
    "price": "$2,199",
    "originalPrice": "$2,799",
    "discount": "21% OFF",
    "duration": "8 Days / 7 Nights",
    "durationDays": 8,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Eichardt's Alpine Private Lake Lodge",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-1.jpg",
    "destImg": "assets/images/gallery-1.jpg",
    "gallery": [
      "assets/images/gallery-1.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate New Zealand Queenstown Extreme Expedition in 🇳🇿 New Zealand (Queenstown & Milford Sound). Stay at 5★ Eichardt's Alpine Private Lake Lodge with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Eichardt's Alpine Private Lake Lodge Check-in",
      "Day 2–7: Guided Sightseeing & VIP Excursions",
      "Day 8: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 8,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      }
    ]
  },
  {
    "id": "pkg-costarica-zipline-7d",
    "category": "adventure",
    "altCategories": [
      "adventure",
      "luxury",
      "featured"
    ],
    "title": "Costa Rica Volcano & Rainforest Zipline",
    "country": "🇨🇷 Costa Rica",
    "city": "Arenal & Manuel Antonio",
    "rating": 4.8,
    "reviewsCount": 310,
    "price": "$1,399",
    "originalPrice": "$1,799",
    "discount": "22% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Nayara Springs Eco Jungle Villa",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-bali.jpg",
    "destImg": "assets/images/dest-bali.jpg",
    "gallery": [
      "assets/images/dest-bali.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Costa Rica Volcano & Rainforest Zipline in 🇨🇷 Costa Rica (Arenal & Manuel Antonio). Stay at 5★ Nayara Springs Eco Jungle Villa with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Nayara Springs Eco Jungle Villa Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      }
    ]
  },
  {
    "id": "pkg-iceland-volcano-6d",
    "category": "adventure",
    "altCategories": [
      "adventure",
      "luxury",
      "featured"
    ],
    "title": "Iceland Glacier & Ice Cave Expedition",
    "country": "🇮🇸 Iceland",
    "city": "Reykjavik & Vik",
    "rating": 4.9,
    "reviewsCount": 420,
    "price": "$1,899",
    "originalPrice": "$2,399",
    "discount": "20% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ The Retreat at Blue Lagoon",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-3.jpg",
    "destImg": "assets/images/gallery-3.jpg",
    "gallery": [
      "assets/images/gallery-3.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Iceland Glacier & Ice Cave Expedition in 🇮🇸 Iceland (Reykjavik & Vik). Stay at 5★ The Retreat at Blue Lagoon with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ The Retreat at Blue Lagoon Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      }
    ]
  },
  {
    "id": "pkg-peru-machupicchu-8d",
    "category": "adventure",
    "altCategories": [
      "adventure",
      "luxury",
      "featured"
    ],
    "title": "Peru Inca Trail & Machu Picchu Trek",
    "country": "🇵🇪 Peru",
    "city": "Cusco & Sacred Valley",
    "rating": 4.9,
    "reviewsCount": 390,
    "price": "$1,699",
    "originalPrice": "$2,199",
    "discount": "23% OFF",
    "duration": "8 Days / 7 Nights",
    "durationDays": 8,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Belmond Sanctuary Lodge Machu Picchu",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-paris.jpg",
    "destImg": "assets/images/dest-paris.jpg",
    "gallery": [
      "assets/images/dest-paris.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Peru Inca Trail & Machu Picchu Trek in 🇵🇪 Peru (Cusco & Sacred Valley). Stay at 5★ Belmond Sanctuary Lodge Machu Picchu with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Belmond Sanctuary Lodge Machu Picchu Check-in",
      "Day 2–7: Guided Sightseeing & VIP Excursions",
      "Day 8: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 8,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      }
    ]
  },
  {
    "id": "pkg-dubai-luxury-5d",
    "category": "luxury",
    "altCategories": [
      "luxury",
      "luxury",
      "featured"
    ],
    "title": "Dubai Burj Al Arab Royal Sky Suite",
    "country": "🇦🇪 UAE",
    "city": "Dubai Marina & Palm",
    "rating": 5.0,
    "reviewsCount": 480,
    "price": "$2,999",
    "originalPrice": "$3,999",
    "discount": "25% OFF",
    "duration": "5 Days / 4 Nights",
    "durationDays": 5,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "7★ Burj Al Arab Jumeirah Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-dubai.jpg",
    "destImg": "assets/images/dest-dubai.jpg",
    "gallery": [
      "assets/images/dest-dubai.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Dubai Burj Al Arab Royal Sky Suite in 🇦🇪 UAE (Dubai Marina & Palm). Stay at 7★ Burj Al Arab Jumeirah Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 7★ Burj Al Arab Jumeirah Suite Check-in",
      "Day 2–4: Guided Sightseeing & VIP Excursions",
      "Day 5: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      },
      {
        "day": 5,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      }
    ]
  },
  {
    "id": "pkg-paris-palace-6d",
    "category": "luxury",
    "altCategories": [
      "luxury",
      "luxury",
      "featured"
    ],
    "title": "Paris Haute Couture & Palace Experience",
    "country": "🇫🇷 France",
    "city": "Champs-Élysées, Paris",
    "rating": 4.9,
    "reviewsCount": 520,
    "price": "$2,499",
    "originalPrice": "$3,199",
    "discount": "22% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Hotel Plaza Athénée Paris",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-paris.jpg",
    "destImg": "assets/images/dest-paris.jpg",
    "gallery": [
      "assets/images/dest-paris.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Paris Haute Couture & Palace Experience in 🇫🇷 France (Champs-Élysées, Paris). Stay at 5★ Hotel Plaza Athénée Paris with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Hotel Plaza Athénée Paris Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      }
    ]
  },
  {
    "id": "pkg-swiss-chalet-7d",
    "category": "luxury",
    "altCategories": [
      "luxury",
      "luxury",
      "featured"
    ],
    "title": "St. Moritz Swiss Alpine Penthouse",
    "country": "🇨🇭 Switzerland",
    "city": "St. Moritz & Zermatt",
    "rating": 5.0,
    "reviewsCount": 290,
    "price": "$3,499",
    "originalPrice": "$4,299",
    "discount": "19% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Badrutt's Palace Hotel St. Moritz",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-santorini.jpg",
    "destImg": "assets/images/dest-santorini.jpg",
    "gallery": [
      "assets/images/dest-santorini.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate St. Moritz Swiss Alpine Penthouse in 🇨🇭 Switzerland (St. Moritz & Zermatt). Stay at 5★ Badrutt's Palace Hotel St. Moritz with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Badrutt's Palace Hotel St. Moritz Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      }
    ]
  },
  {
    "id": "pkg-monaco-yacht-5d",
    "category": "luxury",
    "altCategories": [
      "luxury",
      "luxury",
      "featured"
    ],
    "title": "French Riviera & Monaco Superyacht VIP",
    "country": "🇲🇨 Monaco",
    "city": "Monte Carlo & Nice",
    "rating": 4.9,
    "reviewsCount": 340,
    "price": "$3,199",
    "originalPrice": "$3,999",
    "discount": "20% OFF",
    "duration": "5 Days / 4 Nights",
    "durationDays": 5,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Hotel de Paris Monte-Carlo",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-3.jpg",
    "destImg": "assets/images/gallery-3.jpg",
    "gallery": [
      "assets/images/gallery-3.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate French Riviera & Monaco Superyacht VIP in 🇲🇨 Monaco (Monte Carlo & Nice). Stay at 5★ Hotel de Paris Monte-Carlo with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Hotel de Paris Monte-Carlo Check-in",
      "Day 2–4: Guided Sightseeing & VIP Excursions",
      "Day 5: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 5,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      }
    ]
  },
  {
    "id": "pkg-kyoto-ryokan-5d",
    "category": "luxury",
    "altCategories": [
      "luxury",
      "luxury",
      "featured"
    ],
    "title": "Kyoto VIP Private Onsen Ryokan",
    "country": "🇯🇵 Japan",
    "city": "Arashiyama & Kyoto",
    "rating": 5.0,
    "reviewsCount": 410,
    "price": "$2,299",
    "originalPrice": "$2,899",
    "discount": "21% OFF",
    "duration": "5 Days / 4 Nights",
    "durationDays": 5,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Hoshinoya Kyoto Private Onsen Villa",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-tokyo.jpg",
    "destImg": "assets/images/dest-tokyo.jpg",
    "gallery": [
      "assets/images/dest-tokyo.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Kyoto VIP Private Onsen Ryokan in 🇯🇵 Japan (Arashiyama & Kyoto). Stay at 5★ Hoshinoya Kyoto Private Onsen Villa with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Hoshinoya Kyoto Private Onsen Villa Check-in",
      "Day 2–4: Guided Sightseeing & VIP Excursions",
      "Day 5: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 5,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      }
    ]
  },
  {
    "id": "pkg-santorini-honeymoon-5d",
    "category": "honeymoon",
    "altCategories": [
      "honeymoon",
      "luxury",
      "featured"
    ],
    "title": "Santorini Cliffside Honeymoon Cave Suite",
    "country": "🇬🇷 Greece",
    "city": "Oia Caldera",
    "rating": 4.9,
    "reviewsCount": 620,
    "price": "$1,499",
    "originalPrice": "$1,899",
    "discount": "21% OFF",
    "duration": "5 Days / 4 Nights",
    "durationDays": 5,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Canaves Oia Honeymoon Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-santorini.jpg",
    "destImg": "assets/images/dest-santorini.jpg",
    "gallery": [
      "assets/images/dest-santorini.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Santorini Cliffside Honeymoon Cave Suite in 🇬🇷 Greece (Oia Caldera). Stay at 5★ Canaves Oia Honeymoon Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Canaves Oia Honeymoon Suite Check-in",
      "Day 2–4: Guided Sightseeing & VIP Excursions",
      "Day 5: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 5,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      }
    ]
  },
  {
    "id": "pkg-maldives-honeymoon-7d",
    "category": "honeymoon",
    "altCategories": [
      "honeymoon",
      "luxury",
      "featured"
    ],
    "title": "Maldives Couples Sunset Lagoon Escape",
    "country": "🇲🇻 Maldives",
    "city": "Baa Atoll",
    "rating": 5.0,
    "reviewsCount": 540,
    "price": "$2,699",
    "originalPrice": "$3,499",
    "discount": "23% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Soneva Jani Sunset Water Reserve",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-maldives.jpg",
    "destImg": "assets/images/dest-maldives.jpg",
    "gallery": [
      "assets/images/dest-maldives.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Maldives Couples Sunset Lagoon Escape in 🇲🇻 Maldives (Baa Atoll). Stay at 5★ Soneva Jani Sunset Water Reserve with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Soneva Jani Sunset Water Reserve Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      }
    ]
  },
  {
    "id": "pkg-venice-romance-5d",
    "category": "honeymoon",
    "altCategories": [
      "honeymoon",
      "luxury",
      "featured"
    ],
    "title": "Venice Canal Gondola & Palazzo Romance",
    "country": "🇮🇹 Italy",
    "city": "Venice Grand Canal",
    "rating": 4.9,
    "reviewsCount": 470,
    "price": "$1,599",
    "originalPrice": "$2,099",
    "discount": "24% OFF",
    "duration": "5 Days / 4 Nights",
    "durationDays": 5,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Gritti Palace Venice Grand Canal Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-paris.jpg",
    "destImg": "assets/images/dest-paris.jpg",
    "gallery": [
      "assets/images/dest-paris.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Venice Canal Gondola & Palazzo Romance in 🇮🇹 Italy (Venice Grand Canal). Stay at 5★ Gritti Palace Venice Grand Canal Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Gritti Palace Venice Grand Canal Suite Check-in",
      "Day 2–4: Guided Sightseeing & VIP Excursions",
      "Day 5: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 5,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      }
    ]
  },
  {
    "id": "pkg-borabora-bungalow-6d",
    "category": "honeymoon",
    "altCategories": [
      "honeymoon",
      "luxury",
      "featured"
    ],
    "title": "Bora Bora Lagoon Overwater Romance",
    "country": "🇵🇫 French Polynesia",
    "city": "Bora Bora",
    "rating": 5.0,
    "reviewsCount": 380,
    "price": "$3,299",
    "originalPrice": "$4,199",
    "discount": "21% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Four Seasons Bora Bora Overwater Bungalow",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-overwater.jpg",
    "destImg": "assets/images/hotel-overwater.jpg",
    "gallery": [
      "assets/images/hotel-overwater.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Bora Bora Lagoon Overwater Romance in 🇵🇫 French Polynesia (Bora Bora). Stay at 5★ Four Seasons Bora Bora Overwater Bungalow with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Four Seasons Bora Bora Overwater Bungalow Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      }
    ]
  },
  {
    "id": "pkg-hawaii-sunset-6d",
    "category": "honeymoon",
    "altCategories": [
      "honeymoon",
      "luxury",
      "featured"
    ],
    "title": "Maui Hawaii Oceanfront Honeymoon Villa",
    "country": "🇺🇸 USA",
    "city": "Maui, Hawaii",
    "rating": 4.8,
    "reviewsCount": 510,
    "price": "$2,199",
    "originalPrice": "$2,799",
    "discount": "21% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Montage Kapalua Bay Villa",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-bali.jpg",
    "destImg": "assets/images/dest-bali.jpg",
    "gallery": [
      "assets/images/dest-bali.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Maui Hawaii Oceanfront Honeymoon Villa in 🇺🇸 USA (Maui, Hawaii). Stay at 5★ Montage Kapalua Bay Villa with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Montage Kapalua Bay Villa Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      }
    ]
  },
  {
    "id": "pkg-singapore-family-6d",
    "category": "family",
    "altCategories": [
      "family",
      "luxury",
      "featured"
    ],
    "title": "Singapore Universal Studios Family Quest",
    "country": "🇸🇬 Singapore",
    "city": "Sentosa & Marina Bay",
    "rating": 4.8,
    "reviewsCount": 560,
    "price": "$1,199",
    "originalPrice": "$1,599",
    "discount": "25% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Resorts World Sentosa Family Deluxe Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-tokyo.jpg",
    "destImg": "assets/images/dest-tokyo.jpg",
    "gallery": [
      "assets/images/dest-tokyo.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Singapore Universal Studios Family Quest in 🇸🇬 Singapore (Sentosa & Marina Bay). Stay at 5★ Resorts World Sentosa Family Deluxe Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Resorts World Sentosa Family Deluxe Suite Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      }
    ]
  },
  {
    "id": "pkg-orlando-disney-7d",
    "category": "family",
    "altCategories": [
      "family",
      "luxury",
      "featured"
    ],
    "title": "Orlando Walt Disney World Magic Kingdom",
    "country": "🇺🇸 USA",
    "city": "Orlando, Florida",
    "rating": 4.9,
    "reviewsCount": 720,
    "price": "$1,599",
    "originalPrice": "$1,999",
    "discount": "20% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Disney Grand Floridian Resort & Spa",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-luxury.jpg",
    "destImg": "assets/images/hotel-luxury.jpg",
    "gallery": [
      "assets/images/hotel-luxury.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Orlando Walt Disney World Magic Kingdom in 🇺🇸 USA (Orlando, Florida). Stay at 5★ Disney Grand Floridian Resort & Spa with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Disney Grand Floridian Resort & Spa Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      }
    ]
  },
  {
    "id": "pkg-tokyo-disney-7d",
    "category": "family",
    "altCategories": [
      "family",
      "luxury",
      "featured"
    ],
    "title": "Tokyo Disney & Mount Fuji Family Tour",
    "country": "🇯🇵 Japan",
    "city": "Tokyo & Hakone",
    "rating": 4.9,
    "reviewsCount": 640,
    "price": "$1,799",
    "originalPrice": "$2,299",
    "discount": "22% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Tokyo Disneyland Hotel Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-tokyo.jpg",
    "destImg": "assets/images/dest-tokyo.jpg",
    "gallery": [
      "assets/images/dest-tokyo.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Tokyo Disney & Mount Fuji Family Tour in 🇯🇵 Japan (Tokyo & Hakone). Stay at 5★ Tokyo Disneyland Hotel Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Tokyo Disneyland Hotel Suite Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      }
    ]
  },
  {
    "id": "pkg-london-potter-6d",
    "category": "family",
    "altCategories": [
      "family",
      "luxury",
      "featured"
    ],
    "title": "London Harry Potter & Royal Family Explorer",
    "country": "🇬🇧 United Kingdom",
    "city": "London & Warner Bros Studios",
    "rating": 4.8,
    "reviewsCount": 580,
    "price": "$1,499",
    "originalPrice": "$1,899",
    "discount": "21% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ The Langham London Family Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-paris.jpg",
    "destImg": "assets/images/dest-paris.jpg",
    "gallery": [
      "assets/images/dest-paris.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate London Harry Potter & Royal Family Explorer in 🇬🇧 United Kingdom (London & Warner Bros Studios). Stay at 5★ The Langham London Family Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ The Langham London Family Suite Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      }
    ]
  },
  {
    "id": "pkg-goldcoast-family-6d",
    "category": "family",
    "altCategories": [
      "family",
      "luxury",
      "featured"
    ],
    "title": "Gold Coast Theme Parks & Wildlife Safari",
    "country": "🇦🇺 Australia",
    "city": "Queensland",
    "rating": 4.8,
    "reviewsCount": 410,
    "price": "$1,399",
    "originalPrice": "$1,799",
    "discount": "22% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Sea World Resort & Water Park",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-boutique.jpg",
    "destImg": "assets/images/hotel-boutique.jpg",
    "gallery": [
      "assets/images/hotel-boutique.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Gold Coast Theme Parks & Wildlife Safari in 🇦🇺 Australia (Queensland). Stay at 5★ Sea World Resort & Water Park with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Sea World Resort & Water Park Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      }
    ]
  },
  {
    "id": "pkg-japan-solo-8d",
    "category": "solo",
    "altCategories": [
      "solo",
      "luxury",
      "featured"
    ],
    "title": "Japan Solo Rail & Capsule Heritage Odyssey",
    "country": "🇯🇵 Japan",
    "city": "Tokyo, Kyoto & Osaka",
    "rating": 4.9,
    "reviewsCount": 430,
    "price": "$1,099",
    "originalPrice": "$1,499",
    "discount": "26% OFF",
    "duration": "8 Days / 7 Nights",
    "durationDays": 8,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "4★ Nine Hours Luxury Pod & Boutique Ryokan",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-tokyo.jpg",
    "destImg": "assets/images/dest-tokyo.jpg",
    "gallery": [
      "assets/images/dest-tokyo.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Japan Solo Rail & Capsule Heritage Odyssey in 🇯🇵 Japan (Tokyo, Kyoto & Osaka). Stay at 4★ Nine Hours Luxury Pod & Boutique Ryokan with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 4★ Nine Hours Luxury Pod & Boutique Ryokan Check-in",
      "Day 2–7: Guided Sightseeing & VIP Excursions",
      "Day 8: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 8,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      }
    ]
  },
  {
    "id": "pkg-iceland-solo-6d",
    "category": "solo",
    "altCategories": [
      "solo",
      "luxury",
      "featured"
    ],
    "title": "Iceland Solo Ring Road & Northern Lights",
    "country": "🇮🇸 Iceland",
    "city": "Reykjavik & Golden Circle",
    "rating": 4.9,
    "reviewsCount": 350,
    "price": "$1,299",
    "originalPrice": "$1,699",
    "discount": "23% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "4★ Kex Boutique Solo Lodge",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-3.jpg",
    "destImg": "assets/images/gallery-3.jpg",
    "gallery": [
      "assets/images/gallery-3.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Iceland Solo Ring Road & Northern Lights in 🇮🇸 Iceland (Reykjavik & Golden Circle). Stay at 4★ Kex Boutique Solo Lodge with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 4★ Kex Boutique Solo Lodge Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      }
    ]
  },
  {
    "id": "pkg-spain-solo-7d",
    "category": "solo",
    "altCategories": [
      "solo",
      "luxury",
      "featured"
    ],
    "title": "Spain Camino & Tapas Solo Wanderer",
    "country": "🇪🇸 Spain",
    "city": "Barcelona, Madrid & Seville",
    "rating": 4.8,
    "reviewsCount": 390,
    "price": "$999",
    "originalPrice": "$1,299",
    "discount": "23% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "4★ Generator Boutique Suite Barcelona",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-paris.jpg",
    "destImg": "assets/images/dest-paris.jpg",
    "gallery": [
      "assets/images/dest-paris.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Spain Camino & Tapas Solo Wanderer in 🇪🇸 Spain (Barcelona, Madrid & Seville). Stay at 4★ Generator Boutique Suite Barcelona with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 4★ Generator Boutique Suite Barcelona Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      }
    ]
  },
  {
    "id": "pkg-thailand-solo-7d",
    "category": "solo",
    "altCategories": [
      "solo",
      "luxury",
      "featured"
    ],
    "title": "Thailand Island Hopping Solo Backpacker",
    "country": "🇹🇭 Thailand",
    "city": "Bangkok, Chiang Mai & Phuket",
    "rating": 4.7,
    "reviewsCount": 610,
    "price": "$699",
    "originalPrice": "$949",
    "discount": "26% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "4★ Lub d Solo Beach Resort Phuket",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-bali.jpg",
    "destImg": "assets/images/dest-bali.jpg",
    "gallery": [
      "assets/images/dest-bali.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Thailand Island Hopping Solo Backpacker in 🇹🇭 Thailand (Bangkok, Chiang Mai & Phuket). Stay at 4★ Lub d Solo Beach Resort Phuket with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 4★ Lub d Solo Beach Resort Phuket Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      }
    ]
  },
  {
    "id": "pkg-korea-solo-6d",
    "category": "solo",
    "altCategories": [
      "solo",
      "luxury",
      "featured"
    ],
    "title": "Seoul & Jeju Island Solo K-Culture Quest",
    "country": "🇰🇷 South Korea",
    "city": "Seoul & Jeju Island",
    "rating": 4.9,
    "reviewsCount": 480,
    "price": "$1,199",
    "originalPrice": "$1,599",
    "discount": "25% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "4★ L7 Myeongdong Solo Boutique Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-tokyo.jpg",
    "destImg": "assets/images/dest-tokyo.jpg",
    "gallery": [
      "assets/images/dest-tokyo.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Seoul & Jeju Island Solo K-Culture Quest in 🇰🇷 South Korea (Seoul & Jeju Island). Stay at 4★ L7 Myeongdong Solo Boutique Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 4★ L7 Myeongdong Solo Boutique Suite Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      }
    ]
  },
  {
    "id": "pkg-singapore-biz-4d",
    "category": "business",
    "altCategories": [
      "business",
      "luxury",
      "featured"
    ],
    "title": "Singapore Marina Bay Executive Business Suite",
    "country": "🇸🇬 Singapore",
    "city": "Financial District",
    "rating": 4.9,
    "reviewsCount": 280,
    "price": "$1,599",
    "originalPrice": "$1,999",
    "discount": "20% OFF",
    "duration": "4 Days / 3 Nights",
    "durationDays": 4,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "7★ Marina Bay Sands Executive Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-luxury.jpg",
    "destImg": "assets/images/hotel-luxury.jpg",
    "gallery": [
      "assets/images/hotel-luxury.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Singapore Marina Bay Executive Business Suite in 🇸🇬 Singapore (Financial District). Stay at 7★ Marina Bay Sands Executive Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 7★ Marina Bay Sands Executive Suite Check-in",
      "Day 2–3: Guided Sightseeing & VIP Excursions",
      "Day 4: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 4,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      }
    ]
  },
  {
    "id": "pkg-dubai-biz-4d",
    "category": "business",
    "altCategories": [
      "business",
      "luxury",
      "featured"
    ],
    "title": "Dubai Financial Center & DIFC Executive",
    "country": "🇦🇪 UAE",
    "city": "DIFC & Downtown Dubai",
    "rating": 4.9,
    "reviewsCount": 340,
    "price": "$1,799",
    "originalPrice": "$2,299",
    "discount": "21% OFF",
    "duration": "4 Days / 3 Nights",
    "durationDays": 4,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Ritz-Carlton DIFC Penthouse",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-dubai.jpg",
    "destImg": "assets/images/dest-dubai.jpg",
    "gallery": [
      "assets/images/dest-dubai.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Dubai Financial Center & DIFC Executive in 🇦🇪 UAE (DIFC & Downtown Dubai). Stay at 5★ Ritz-Carlton DIFC Penthouse with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Ritz-Carlton DIFC Penthouse Check-in",
      "Day 2–3: Guided Sightseeing & VIP Excursions",
      "Day 4: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      },
      {
        "day": 4,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      }
    ]
  },
  {
    "id": "pkg-ny-biz-4d",
    "category": "business",
    "altCategories": [
      "business",
      "luxury",
      "featured"
    ],
    "title": "New York Wall Street & Midtown Corporate",
    "country": "🇺🇸 USA",
    "city": "Manhattan, New York",
    "rating": 4.8,
    "reviewsCount": 310,
    "price": "$1,899",
    "originalPrice": "$2,399",
    "discount": "20% OFF",
    "duration": "4 Days / 3 Nights",
    "durationDays": 4,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ The Plaza New York Executive Lounge",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-boutique.jpg",
    "destImg": "assets/images/hotel-boutique.jpg",
    "gallery": [
      "assets/images/hotel-boutique.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate New York Wall Street & Midtown Corporate in 🇺🇸 USA (Manhattan, New York). Stay at 5★ The Plaza New York Executive Lounge with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ The Plaza New York Executive Lounge Check-in",
      "Day 2–3: Guided Sightseeing & VIP Excursions",
      "Day 4: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 4,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      }
    ]
  },
  {
    "id": "pkg-tokyo-biz-4d",
    "category": "business",
    "altCategories": [
      "business",
      "luxury",
      "featured"
    ],
    "title": "Tokyo Ginza Executive Corporate Suite",
    "country": "🇯🇵 Japan",
    "city": "Ginza & Marunouchi",
    "rating": 4.9,
    "reviewsCount": 260,
    "price": "$1,699",
    "originalPrice": "$2,199",
    "discount": "22% OFF",
    "duration": "4 Days / 3 Nights",
    "durationDays": 4,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Palace Hotel Tokyo Executive Floor",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-tokyo.jpg",
    "destImg": "assets/images/dest-tokyo.jpg",
    "gallery": [
      "assets/images/dest-tokyo.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Tokyo Ginza Executive Corporate Suite in 🇯🇵 Japan (Ginza & Marunouchi). Stay at 5★ Palace Hotel Tokyo Executive Floor with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Palace Hotel Tokyo Executive Floor Check-in",
      "Day 2–3: Guided Sightseeing & VIP Excursions",
      "Day 4: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 4,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      }
    ]
  },
  {
    "id": "pkg-london-biz-4d",
    "category": "business",
    "altCategories": [
      "business",
      "luxury",
      "featured"
    ],
    "title": "London City Financial & Canary Wharf VIP",
    "country": "🇬🇧 United Kingdom",
    "city": "Square Mile & Canary Wharf",
    "rating": 4.8,
    "reviewsCount": 290,
    "price": "$1,649",
    "originalPrice": "$2,099",
    "discount": "21% OFF",
    "duration": "4 Days / 3 Nights",
    "durationDays": 4,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Four Seasons Hotel London at Ten Trinity Square",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-paris.jpg",
    "destImg": "assets/images/dest-paris.jpg",
    "gallery": [
      "assets/images/dest-paris.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate London City Financial & Canary Wharf VIP in 🇬🇧 United Kingdom (Square Mile & Canary Wharf). Stay at 5★ Four Seasons Hotel London at Ten Trinity Square with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Four Seasons Hotel London at Ten Trinity Square Check-in",
      "Day 2–3: Guided Sightseeing & VIP Excursions",
      "Day 4: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 4,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      }
    ]
  },
  {
    "id": "pkg-masaimara-safari-9d",
    "category": "safari",
    "altCategories": [
      "safari",
      "luxury",
      "featured"
    ],
    "title": "Kenya Masai Mara Great Migration Safari",
    "country": "🇰🇪 Kenya",
    "city": "Masai Mara & Nairobi",
    "rating": 4.9,
    "reviewsCount": 310,
    "price": "$2,099",
    "originalPrice": "$2,799",
    "discount": "25% OFF",
    "duration": "9 Days / 8 Nights",
    "durationDays": 9,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Governors' Camp Tented Safari Lodge",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-1.jpg",
    "destImg": "assets/images/gallery-1.jpg",
    "gallery": [
      "assets/images/gallery-1.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Kenya Masai Mara Great Migration Safari in 🇰🇪 Kenya (Masai Mara & Nairobi). Stay at 5★ Governors' Camp Tented Safari Lodge with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Governors' Camp Tented Safari Lodge Check-in",
      "Day 2–8: Guided Sightseeing & VIP Excursions",
      "Day 9: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 8,
        "title": "Guided Experience & Highlights Part 7",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 9,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      }
    ]
  },
  {
    "id": "pkg-serengeti-safari-8d",
    "category": "safari",
    "altCategories": [
      "safari",
      "luxury",
      "featured"
    ],
    "title": "Tanzania Serengeti & Ngorongoro Crater Expedition",
    "country": "🇹🇿 Tanzania",
    "city": "Serengeti & Ngorongoro",
    "rating": 5.0,
    "reviewsCount": 420,
    "price": "$2,299",
    "originalPrice": "$2,999",
    "discount": "23% OFF",
    "duration": "8 Days / 7 Nights",
    "durationDays": 8,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Four Seasons Safari Lodge Serengeti",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-2.jpg",
    "destImg": "assets/images/gallery-2.jpg",
    "gallery": [
      "assets/images/gallery-2.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Tanzania Serengeti & Ngorongoro Crater Expedition in 🇹🇿 Tanzania (Serengeti & Ngorongoro). Stay at 5★ Four Seasons Safari Lodge Serengeti with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Four Seasons Safari Lodge Serengeti Check-in",
      "Day 2–7: Guided Sightseeing & VIP Excursions",
      "Day 8: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 8,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      }
    ]
  },
  {
    "id": "pkg-kruger-safari-7d",
    "category": "safari",
    "altCategories": [
      "safari",
      "luxury",
      "featured"
    ],
    "title": "South Africa Kruger Big Five Luxury Safari",
    "country": "🇿🇦 South Africa",
    "city": "Kruger National Park",
    "rating": 4.9,
    "reviewsCount": 380,
    "price": "$1,899",
    "originalPrice": "$2,499",
    "discount": "24% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Singita Ebony Lodge Kruger",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-bali.jpg",
    "destImg": "assets/images/dest-bali.jpg",
    "gallery": [
      "assets/images/dest-bali.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate South Africa Kruger Big Five Luxury Safari in 🇿🇦 South Africa (Kruger National Park). Stay at 5★ Singita Ebony Lodge Kruger with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Singita Ebony Lodge Kruger Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      }
    ]
  },
  {
    "id": "pkg-galapagos-safari-7d",
    "category": "safari",
    "altCategories": [
      "safari",
      "luxury",
      "featured"
    ],
    "title": "Galápagos Islands Wildlife Cruise & Safari",
    "country": "🇪🇨 Ecuador",
    "city": "Galápagos Islands",
    "rating": 5.0,
    "reviewsCount": 240,
    "price": "$3,499",
    "originalPrice": "$4,299",
    "discount": "18% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ National Geographic Endeavour Yacht",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-overwater.jpg",
    "destImg": "assets/images/hotel-overwater.jpg",
    "gallery": [
      "assets/images/hotel-overwater.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Galápagos Islands Wildlife Cruise & Safari in 🇪🇨 Ecuador (Galápagos Islands). Stay at 5★ National Geographic Endeavour Yacht with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ National Geographic Endeavour Yacht Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-overwater.jpg"
      }
    ]
  },
  {
    "id": "pkg-ranthambore-safari-6d",
    "category": "safari",
    "altCategories": [
      "safari",
      "luxury",
      "featured"
    ],
    "title": "India Ranthambore Royal Bengal Tiger Safari",
    "country": "🇮🇳 India",
    "city": "Ranthambore & Jaipur",
    "rating": 4.8,
    "reviewsCount": 320,
    "price": "$1,299",
    "originalPrice": "$1,699",
    "discount": "23% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Oberoi Vanyavilas Wildlife Resort",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-tokyo.jpg",
    "destImg": "assets/images/dest-tokyo.jpg",
    "gallery": [
      "assets/images/dest-tokyo.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate India Ranthambore Royal Bengal Tiger Safari in 🇮🇳 India (Ranthambore & Jaipur). Stay at 5★ Oberoi Vanyavilas Wildlife Resort with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Oberoi Vanyavilas Wildlife Resort Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      }
    ]
  },
  {
    "id": "pkg-med-cruise-8d",
    "category": "cruise",
    "altCategories": [
      "cruise",
      "luxury",
      "featured"
    ],
    "title": "Mediterranean Magic Superliner Cruise",
    "country": "🇪🇸 Spain, 🇫🇷 France, 🇮🇹 Italy",
    "city": "Barcelona, Marseille, Rome",
    "rating": 4.9,
    "reviewsCount": 480,
    "price": "$1,899",
    "originalPrice": "$2,399",
    "discount": "20% OFF",
    "duration": "8 Days / 7 Nights",
    "durationDays": 8,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "Royal Caribbean Oceanview Balcony Stateroom",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-3.jpg",
    "destImg": "assets/images/gallery-3.jpg",
    "gallery": [
      "assets/images/gallery-3.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Mediterranean Magic Superliner Cruise in 🇪🇸 Spain, 🇫🇷 France, 🇮🇹 Italy (Barcelona, Marseille, Rome). Stay at Royal Caribbean Oceanview Balcony Stateroom with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & Royal Caribbean Oceanview Balcony Stateroom Check-in",
      "Day 2–7: Guided Sightseeing & VIP Excursions",
      "Day 8: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 8,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      }
    ]
  },
  {
    "id": "pkg-caribbean-cruise-7d",
    "category": "cruise",
    "altCategories": [
      "cruise",
      "luxury",
      "featured"
    ],
    "title": "Caribbean Private Island & Turquoise Lagoon Voyage",
    "country": "🇧🇸 Bahamas, 🇯🇲 Jamaica",
    "city": "Nassau & CocoCay",
    "rating": 4.9,
    "reviewsCount": 560,
    "price": "$1,499",
    "originalPrice": "$1,899",
    "discount": "21% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "Symphony of the Seas Ocean Balcony Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-maldives.jpg",
    "destImg": "assets/images/dest-maldives.jpg",
    "gallery": [
      "assets/images/dest-maldives.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Caribbean Private Island & Turquoise Lagoon Voyage in 🇧🇸 Bahamas, 🇯🇲 Jamaica (Nassau & CocoCay). Stay at Symphony of the Seas Ocean Balcony Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & Symphony of the Seas Ocean Balcony Suite Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-maldives.jpg"
      }
    ]
  },
  {
    "id": "pkg-norway-fjords-8d",
    "category": "cruise",
    "altCategories": [
      "cruise",
      "luxury",
      "featured"
    ],
    "title": "Norwegian Fjords & Midnight Sun Cruise",
    "country": "🇳🇴 Norway",
    "city": "Bergen & Geirangerfjord",
    "rating": 5.0,
    "reviewsCount": 310,
    "price": "$2,199",
    "originalPrice": "$2,799",
    "discount": "21% OFF",
    "duration": "8 Days / 7 Nights",
    "durationDays": 8,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "Hurtigruten Explorer Balcony Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-santorini.jpg",
    "destImg": "assets/images/dest-santorini.jpg",
    "gallery": [
      "assets/images/dest-santorini.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Norwegian Fjords & Midnight Sun Cruise in 🇳🇴 Norway (Bergen & Geirangerfjord). Stay at Hurtigruten Explorer Balcony Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & Hurtigruten Explorer Balcony Suite Check-in",
      "Day 2–7: Guided Sightseeing & VIP Excursions",
      "Day 8: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 8,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      }
    ]
  },
  {
    "id": "pkg-alaska-glacier-7d",
    "category": "cruise",
    "altCategories": [
      "cruise",
      "luxury",
      "featured"
    ],
    "title": "Alaska Inside Passage & Glacier Bay Cruise",
    "country": "🇺🇸 USA & 🇨🇦 Canada",
    "city": "Juneau, Skagway & Glacier Bay",
    "rating": 4.9,
    "reviewsCount": 420,
    "price": "$1,999",
    "originalPrice": "$2,499",
    "discount": "20% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "Princess Cruises Oceanview Glass Suite",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-paris.jpg",
    "destImg": "assets/images/dest-paris.jpg",
    "gallery": [
      "assets/images/dest-paris.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Alaska Inside Passage & Glacier Bay Cruise in 🇺🇸 USA & 🇨🇦 Canada (Juneau, Skagway & Glacier Bay). Stay at Princess Cruises Oceanview Glass Suite with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & Princess Cruises Oceanview Glass Suite Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      }
    ]
  },
  {
    "id": "pkg-nile-river-5d",
    "category": "cruise",
    "altCategories": [
      "cruise",
      "luxury",
      "featured"
    ],
    "title": "Egypt Nile River Pharaoh Luxury Cruise",
    "country": "🇪🇬 Egypt",
    "city": "Luxor to Aswan",
    "rating": 4.8,
    "reviewsCount": 390,
    "price": "$1,299",
    "originalPrice": "$1,699",
    "discount": "23% OFF",
    "duration": "5 Days / 4 Nights",
    "durationDays": 5,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Oberoi Philae Nile Cruiser",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-luxury.jpg",
    "destImg": "assets/images/hotel-luxury.jpg",
    "gallery": [
      "assets/images/hotel-luxury.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Egypt Nile River Pharaoh Luxury Cruise in 🇪🇬 Egypt (Luxor to Aswan). Stay at 5★ Oberoi Philae Nile Cruiser with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Oberoi Philae Nile Cruiser Check-in",
      "Day 2–4: Guided Sightseeing & VIP Excursions",
      "Day 5: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 5,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      }
    ]
  },
  {
    "id": "pkg-varanasi-spiritual-3d",
    "category": "pilgrimage",
    "altCategories": [
      "pilgrimage",
      "luxury",
      "featured"
    ],
    "title": "Varanasi Sacred Ganges & Sarnath Pilgrimage",
    "country": "🇮🇳 India",
    "city": "Varanasi & Sarnath",
    "rating": 4.9,
    "reviewsCount": 410,
    "price": "$499",
    "originalPrice": "$699",
    "discount": "28% OFF",
    "duration": "3 Days / 2 Nights",
    "durationDays": 3,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ BrijRama Palace Heritage Ghat Hotel",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-1.jpg",
    "destImg": "assets/images/gallery-1.jpg",
    "gallery": [
      "assets/images/gallery-1.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Varanasi Sacred Ganges & Sarnath Pilgrimage in 🇮🇳 India (Varanasi & Sarnath). Stay at 5★ BrijRama Palace Heritage Ghat Hotel with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ BrijRama Palace Heritage Ghat Hotel Check-in",
      "Day 2–2: Guided Sightseeing & VIP Excursions",
      "Day 3: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 3,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      }
    ]
  },
  {
    "id": "pkg-mecca-umrah-7d",
    "category": "pilgrimage",
    "altCategories": [
      "pilgrimage",
      "luxury",
      "featured"
    ],
    "title": "Mecca & Medina Royal Executive Umrah",
    "country": "🇸🇦 Saudi Arabia",
    "city": "Mecca & Medina",
    "rating": 5.0,
    "reviewsCount": 680,
    "price": "$1,899",
    "originalPrice": "$2,399",
    "discount": "20% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Makkah Clock Royal Tower Hotel",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-2.jpg",
    "destImg": "assets/images/gallery-2.jpg",
    "gallery": [
      "assets/images/gallery-2.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Mecca & Medina Royal Executive Umrah in 🇸🇦 Saudi Arabia (Mecca & Medina). Stay at 5★ Makkah Clock Royal Tower Hotel with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Makkah Clock Royal Tower Hotel Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      }
    ]
  },
  {
    "id": "pkg-jerusalem-holyland-7d",
    "category": "pilgrimage",
    "altCategories": [
      "pilgrimage",
      "luxury",
      "featured"
    ],
    "title": "Jerusalem & Bethlehem Holy Land Heritage",
    "country": "🇮🇱 Israel",
    "city": "Jerusalem & Dead Sea",
    "rating": 4.9,
    "reviewsCount": 450,
    "price": "$1,799",
    "originalPrice": "$2,299",
    "discount": "21% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ The King David Hotel Jerusalem",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-paris.jpg",
    "destImg": "assets/images/dest-paris.jpg",
    "gallery": [
      "assets/images/dest-paris.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Jerusalem & Bethlehem Holy Land Heritage in 🇮🇱 Israel (Jerusalem & Dead Sea). Stay at 5★ The King David Hotel Jerusalem with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ The King David Hotel Jerusalem Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      }
    ]
  },
  {
    "id": "pkg-rome-vatican-5d",
    "category": "pilgrimage",
    "altCategories": [
      "pilgrimage",
      "luxury",
      "featured"
    ],
    "title": "Vatican City & St. Peter's Basilica Pilgrimage",
    "country": "🇻🇦 Vatican City & 🇮🇹 Italy",
    "city": "Rome & Vatican",
    "rating": 4.9,
    "reviewsCount": 510,
    "price": "$1,299",
    "originalPrice": "$1,699",
    "discount": "23% OFF",
    "duration": "5 Days / 4 Nights",
    "durationDays": 5,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Hotel Eden Rome",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-paris.jpg",
    "destImg": "assets/images/dest-paris.jpg",
    "gallery": [
      "assets/images/dest-paris.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Vatican City & St. Peter's Basilica Pilgrimage in 🇻🇦 Vatican City & 🇮🇹 Italy (Rome & Vatican). Stay at 5★ Hotel Eden Rome with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Hotel Eden Rome Check-in",
      "Day 2–4: Guided Sightseeing & VIP Excursions",
      "Day 5: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 5,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      }
    ]
  },
  {
    "id": "pkg-camino-santiago-8d",
    "category": "pilgrimage",
    "altCategories": [
      "pilgrimage",
      "luxury",
      "featured"
    ],
    "title": "Spain Camino de Santiago Pilgrimage Walk",
    "country": "🇪🇸 Spain",
    "city": "Sarria & Santiago de Compostela",
    "rating": 4.9,
    "reviewsCount": 380,
    "price": "$1,099",
    "originalPrice": "$1,499",
    "discount": "26% OFF",
    "duration": "8 Days / 7 Nights",
    "durationDays": 8,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Parador de Santiago Hostal dos Reis Catolicos",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-3.jpg",
    "destImg": "assets/images/gallery-3.jpg",
    "gallery": [
      "assets/images/gallery-3.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Spain Camino de Santiago Pilgrimage Walk in 🇪🇸 Spain (Sarria & Santiago de Compostela). Stay at 5★ Parador de Santiago Hostal dos Reis Catolicos with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Parador de Santiago Hostal dos Reis Catolicos Check-in",
      "Day 2–7: Guided Sightseeing & VIP Excursions",
      "Day 8: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 8,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      }
    ]
  },
  {
    "id": "pkg-route66-roadtrip-10d",
    "category": "road",
    "altCategories": [
      "road",
      "luxury",
      "featured"
    ],
    "title": "USA Route 66 Cross-Country Convertible Drive",
    "country": "🇺🇸 USA",
    "city": "Chicago to Los Angeles",
    "rating": 4.9,
    "reviewsCount": 420,
    "price": "$2,499",
    "originalPrice": "$3,199",
    "discount": "22% OFF",
    "duration": "10 Days / 9 Nights",
    "durationDays": 10,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Historic Route 66 Boutique Hotels & Motels",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-boutique.jpg",
    "destImg": "assets/images/hotel-boutique.jpg",
    "gallery": [
      "assets/images/hotel-boutique.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate USA Route 66 Cross-Country Convertible Drive in 🇺🇸 USA (Chicago to Los Angeles). Stay at 5★ Historic Route 66 Boutique Hotels & Motels with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Historic Route 66 Boutique Hotels & Motels Check-in",
      "Day 2–9: Guided Sightseeing & VIP Excursions",
      "Day 10: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 8,
        "title": "Guided Experience & Highlights Part 7",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 9,
        "title": "Guided Experience & Highlights Part 8",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      },
      {
        "day": 10,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-boutique.jpg"
      }
    ]
  },
  {
    "id": "pkg-pch1-california-7d",
    "category": "road",
    "altCategories": [
      "road",
      "luxury",
      "featured"
    ],
    "title": "California Highway 1 Big Sur Coastal Drive",
    "country": "🇺🇸 USA",
    "city": "San Francisco to Los Angeles",
    "rating": 4.9,
    "reviewsCount": 490,
    "price": "$1,899",
    "originalPrice": "$2,399",
    "discount": "20% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Post Ranch Inn Big Sur",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-paris.jpg",
    "destImg": "assets/images/dest-paris.jpg",
    "gallery": [
      "assets/images/dest-paris.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate California Highway 1 Big Sur Coastal Drive in 🇺🇸 USA (San Francisco to Los Angeles). Stay at 5★ Post Ranch Inn Big Sur with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Post Ranch Inn Big Sur Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-paris.jpg"
      }
    ]
  },
  {
    "id": "pkg-greatocean-aus-6d",
    "category": "road",
    "altCategories": [
      "road",
      "luxury",
      "featured"
    ],
    "title": "Australia Great Ocean Road & 12 Apostles Drive",
    "country": "🇦🇺 Australia",
    "city": "Melbourne & Victoria Coast",
    "rating": 4.8,
    "reviewsCount": 360,
    "price": "$1,599",
    "originalPrice": "$1,999",
    "discount": "20% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Deep Blue Hotel & Coastal Villas",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/hotel-luxury.jpg",
    "destImg": "assets/images/hotel-luxury.jpg",
    "gallery": [
      "assets/images/hotel-luxury.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Australia Great Ocean Road & 12 Apostles Drive in 🇦🇺 Australia (Melbourne & Victoria Coast). Stay at 5★ Deep Blue Hotel & Coastal Villas with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Deep Blue Hotel & Coastal Villas Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/hotel-luxury.jpg"
      }
    ]
  },
  {
    "id": "pkg-nc500-scotland-7d",
    "category": "road",
    "altCategories": [
      "road",
      "luxury",
      "featured"
    ],
    "title": "Scotland North Coast 500 Highlands & Castles",
    "country": "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland",
    "city": "Inverness & Isle of Skye",
    "rating": 4.9,
    "reviewsCount": 340,
    "price": "$1,799",
    "originalPrice": "$2,299",
    "discount": "21% OFF",
    "duration": "7 Days / 6 Nights",
    "durationDays": 7,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Inverlochy Castle Hotel Highlands",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-2.jpg",
    "destImg": "assets/images/gallery-2.jpg",
    "gallery": [
      "assets/images/gallery-2.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Scotland North Coast 500 Highlands & Castles in 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland (Inverness & Isle of Skye). Stay at 5★ Inverlochy Castle Hotel Highlands with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Inverlochy Castle Hotel Highlands Check-in",
      "Day 2–6: Guided Sightseeing & VIP Excursions",
      "Day 7: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      },
      {
        "day": 7,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-2.jpg"
      }
    ]
  },
  {
    "id": "pkg-gardenroute-sa-8d",
    "category": "road",
    "altCategories": [
      "road",
      "luxury",
      "featured"
    ],
    "title": "South Africa Garden Route Scenic Coastal Drive",
    "country": "🇿🇦 South Africa",
    "city": "Cape Town to Port Elizabeth",
    "rating": 4.9,
    "reviewsCount": 390,
    "price": "$1,699",
    "originalPrice": "$2,199",
    "discount": "22% OFF",
    "duration": "8 Days / 7 Nights",
    "durationDays": 8,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ The Twelve Apostles Hotel Cape Town",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-bali.jpg",
    "destImg": "assets/images/dest-bali.jpg",
    "gallery": [
      "assets/images/dest-bali.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate South Africa Garden Route Scenic Coastal Drive in 🇿🇦 South Africa (Cape Town to Port Elizabeth). Stay at 5★ The Twelve Apostles Hotel Cape Town with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ The Twelve Apostles Hotel Cape Town Check-in",
      "Day 2–7: Guided Sightseeing & VIP Excursions",
      "Day 8: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 6,
        "title": "Guided Experience & Highlights Part 5",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 7,
        "title": "Guided Experience & Highlights Part 6",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      },
      {
        "day": 8,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-bali.jpg"
      }
    ]
  },
  {
    "id": "pkg-swiss-glamping-5d",
    "category": "camping",
    "altCategories": [
      "camping",
      "luxury",
      "featured"
    ],
    "title": "Swiss Alps High-Altitude Luxury Dome Glamping",
    "country": "🇨🇭 Switzerland",
    "city": "Valais Alpine Domes",
    "rating": 5.0,
    "reviewsCount": 290,
    "price": "$1,899",
    "originalPrice": "$2,399",
    "discount": "20% OFF",
    "duration": "5 Days / 4 Nights",
    "durationDays": 5,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Whitepod Alpine High-Altitude Eco Domes",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-santorini.jpg",
    "destImg": "assets/images/dest-santorini.jpg",
    "gallery": [
      "assets/images/dest-santorini.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Swiss Alps High-Altitude Luxury Dome Glamping in 🇨🇭 Switzerland (Valais Alpine Domes). Stay at 5★ Whitepod Alpine High-Altitude Eco Domes with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Whitepod Alpine High-Altitude Eco Domes Check-in",
      "Day 2–4: Guided Sightseeing & VIP Excursions",
      "Day 5: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      },
      {
        "day": 5,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-santorini.jpg"
      }
    ]
  },
  {
    "id": "pkg-sahara-camp-4d",
    "category": "camping",
    "altCategories": [
      "camping",
      "luxury",
      "featured"
    ],
    "title": "Moroccan Sahara Desert Royal Bedouin Camp",
    "country": "🇲🇦 Morocco",
    "city": "Merzouga Sand Dunes",
    "rating": 4.9,
    "reviewsCount": 480,
    "price": "$999",
    "originalPrice": "$1,299",
    "discount": "23% OFF",
    "duration": "4 Days / 3 Nights",
    "durationDays": 4,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Desert Luxury Royal Bedouin Tented Camp",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-dubai.jpg",
    "destImg": "assets/images/dest-dubai.jpg",
    "gallery": [
      "assets/images/dest-dubai.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Moroccan Sahara Desert Royal Bedouin Camp in 🇲🇦 Morocco (Merzouga Sand Dunes). Stay at 5★ Desert Luxury Royal Bedouin Tented Camp with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Desert Luxury Royal Bedouin Tented Camp Check-in",
      "Day 2–3: Guided Sightseeing & VIP Excursions",
      "Day 4: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      },
      {
        "day": 4,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-dubai.jpg"
      }
    ]
  },
  {
    "id": "pkg-grandcanyon-glamping-5d",
    "category": "camping",
    "altCategories": [
      "camping",
      "luxury",
      "featured"
    ],
    "title": "Grand Canyon Under Canvas Stargazing Glamping",
    "country": "🇺🇸 USA",
    "city": "Grand Canyon National Park",
    "rating": 4.8,
    "reviewsCount": 370,
    "price": "$1,299",
    "originalPrice": "$1,699",
    "discount": "23% OFF",
    "duration": "5 Days / 4 Nights",
    "durationDays": 5,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Under Canvas Grand Canyon Luxury Tent",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-1.jpg",
    "destImg": "assets/images/gallery-1.jpg",
    "gallery": [
      "assets/images/gallery-1.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Grand Canyon Under Canvas Stargazing Glamping in 🇺🇸 USA (Grand Canyon National Park). Stay at 5★ Under Canvas Grand Canyon Luxury Tent with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Under Canvas Grand Canyon Luxury Tent Check-in",
      "Day 2–4: Guided Sightseeing & VIP Excursions",
      "Day 5: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      },
      {
        "day": 5,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-1.jpg"
      }
    ]
  },
  {
    "id": "pkg-norway-aurora-dome-5d",
    "category": "camping",
    "altCategories": [
      "camping",
      "luxury",
      "featured"
    ],
    "title": "Norway Glass Igloo Aurora Northern Lights Camp",
    "country": "🇳🇴 Norway",
    "city": "Tromsø & Arctic Wilderness",
    "rating": 5.0,
    "reviewsCount": 410,
    "price": "$2,199",
    "originalPrice": "$2,799",
    "discount": "21% OFF",
    "duration": "5 Days / 4 Nights",
    "durationDays": 5,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Tromsø Ice Hotel & Aurora Glass Domes",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/gallery-3.jpg",
    "destImg": "assets/images/gallery-3.jpg",
    "gallery": [
      "assets/images/gallery-3.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Norway Glass Igloo Aurora Northern Lights Camp in 🇳🇴 Norway (Tromsø & Arctic Wilderness). Stay at 5★ Tromsø Ice Hotel & Aurora Glass Domes with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Tromsø Ice Hotel & Aurora Glass Domes Check-in",
      "Day 2–4: Guided Sightseeing & VIP Excursions",
      "Day 5: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      },
      {
        "day": 5,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/gallery-3.jpg"
      }
    ]
  },
  {
    "id": "pkg-kenya-savanna-glamping-6d",
    "category": "camping",
    "altCategories": [
      "camping",
      "luxury",
      "featured"
    ],
    "title": "Kenya Savanna Wilderness Luxury Tented Glamping",
    "country": "🇰🇪 Kenya",
    "city": "Amboseli Savanna",
    "rating": 4.9,
    "reviewsCount": 350,
    "price": "$1,699",
    "originalPrice": "$2,199",
    "discount": "22% OFF",
    "duration": "6 Days / 5 Nights",
    "durationDays": 6,
    "dates": "Daily Departures · 2026 Season",
    "hotel": "5★ Tortilis Tented Luxury Camp Amboseli",
    "hotelRating": "5.0 ★ Luxury Resort",
    "hotelAmenities": [
      "Private Plunge Pool / Suite View",
      "Subterranean Spa",
      "24/7 Butler Service",
      "Free High-speed WiFi",
      "Breakfast Included"
    ],
    "meals": [
      "Breakfast",
      "Gourmet Lunch",
      "5-Course Candlelight Dinner"
    ],
    "transportation": [
      "Roundtrip Flights Included",
      "Private Airport Chauffeur",
      "Luxury Excursion Car"
    ],
    "heroImg": "assets/images/dest-tokyo.jpg",
    "destImg": "assets/images/dest-tokyo.jpg",
    "gallery": [
      "assets/images/dest-tokyo.jpg",
      "assets/images/hotel-luxury.jpg",
      "assets/images/gallery-1.jpg",
      "assets/images/gallery-2.jpg"
    ],
    "overview": "Experience the ultimate Kenya Savanna Wilderness Luxury Tented Glamping in 🇰🇪 Kenya (Amboseli Savanna). Stay at 5★ Tortilis Tented Luxury Camp Amboseli with world-class amenities, private guided tours, and gourmet dining.",
    "itineraryPreview": [
      "Day 1: Arrival & 5★ Tortilis Tented Luxury Camp Amboseli Check-in",
      "Day 2–5: Guided Sightseeing & VIP Excursions",
      "Day 6: Farewell Breakfast & Departure"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "VIP Airport Arrival & Luxury Check-in",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 2,
        "title": "Guided Experience & Highlights Part 1",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 3,
        "title": "Guided Experience & Highlights Part 2",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 4,
        "title": "Guided Experience & Highlights Part 3",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 5,
        "title": "Guided Experience & Highlights Part 4",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      },
      {
        "day": 6,
        "title": "Farewell Breakfast & VIP Departure",
        "location": "Prime Location",
        "weather": "25°C Sunny",
        "time": "09:00 AM – 06:00 PM",
        "transport": "Private SUV Chauffeur",
        "hotel": "5★ Luxury Suite",
        "meals": "Breakfast & Gourmet Dinner",
        "activities": [
          "Guided Sightseeing",
          "Cultural Photography",
          "Luxury Dining"
        ],
        "img": "assets/images/dest-tokyo.jpg"
      }
    ]
  }
];

  // Data registry for generic details
  const detailsDatabase = {
    'dest-maldives': {
      type: 'Destination',
      title: 'Maldives Island Sanctuary',
      subtitle: 'Overwater Luxury & Coral Atolls',
      image: 'assets/images/dest-maldives.jpg',
      rating: '4.9/5 (1,240 Reviews)',
      bestTime: 'November – April (Dry Season)',
      currency: 'Maldivian Rufiyaa (MVR) / USD Accepted',
      language: 'Dhivehi & English',
      description: 'The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls made up of more than 1,000 coral islands.',
      highlights: ['Overwater bungalow experience', 'Scuba diving with Manta Rays', 'Private sandbank dining', 'Bioluminescent beach walks']
    },
    'dest-santorini': {
      type: 'Destination',
      title: 'Santorini Island, Greece',
      subtitle: 'Volcanic Cliffs & Aegean Sunsets',
      image: 'assets/images/dest-santorini.jpg',
      rating: '4.8/5 (980 Reviews)',
      bestTime: 'April – October',
      currency: 'Euro (€)',
      language: 'Greek & English',
      description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape.'
    },
    'dest-tokyo': {
      type: 'Destination',
      title: 'Tokyo Neon & Heritage, Japan',
      subtitle: 'Metropolis & Ancient Shrines',
      image: 'assets/images/dest-tokyo.jpg',
      rating: '4.9/5 (1,420 Reviews)',
      bestTime: 'March – May & October – November',
      currency: 'Japanese Yen (¥)',
      language: 'Japanese & English',
      description: 'Tokyo is a vibrant global capital where futuristic neon skyscrapers stand alongside historic Shinto temples, tranquil gardens, and world-class sushi bars.'
    },
    'dest-kyoto': {
      type: 'Destination',
      title: 'Kyoto Zen Temples, Japan',
      subtitle: 'Heritage & Traditional Ryokans',
      image: 'assets/images/dest-tokyo.jpg',
      rating: '4.9/5 (1,120 Reviews)',
      bestTime: 'Spring (Sakura) & Autumn (Red Maple)',
      currency: 'Japanese Yen (¥)',
      language: 'Japanese & English',
      description: 'Kyoto is Japan’s cultural heart, famous for thousands of classical Buddhist temples, pristine gardens, geisha districts, and royal palaces.'
    },
    'dest-osaka': {
      type: 'Destination',
      title: 'Osaka Food & Castle, Japan',
      subtitle: 'Street Food & Nightlife Capital',
      image: 'assets/images/dest-tokyo.jpg',
      rating: '4.8/5 (950 Reviews)',
      bestTime: 'Year Round',
      currency: 'Japanese Yen (¥)',
      language: 'Japanese & English',
      description: 'Osaka is celebrated for Dotonbori neon canal walks, street food markets, 16th-century Osaka Castle, and Universal Studios Japan.'
    },
    'dest-paris': {
      type: 'Destination',
      title: 'Paris Capital Experience, France',
      subtitle: 'Art, Gastronomy & Romance',
      image: 'assets/images/dest-paris.jpg',
      rating: '4.8/5 (1,150 Reviews)',
      bestTime: 'Year Round (Spring & Fall Peak)',
      currency: 'Euro (€)',
      language: 'French & English',
      description: 'Paris inspires with the Eiffel Tower, Louvre Museum masterpieces, haute couture, world-famous pastries, and romantic Seine river cruises.'
    },
    'dest-rome': {
      type: 'Destination',
      title: 'Rome Imperial Heritage, Italy',
      subtitle: 'Colosseum & Vatican Treasures',
      image: 'assets/images/gallery-3.jpg',
      rating: '4.8/5 (860 Reviews)',
      bestTime: 'April – October',
      currency: 'Euro (€)',
      language: 'Italian & English',
      description: 'Rome is an eternal city of ancient gladiatorial arenas, Baroque fountains, Vatican chapels, authentic pasta trattorias, and vibrant piazzas.'
    },
    'dest-venice': {
      type: 'Destination',
      title: 'Venice Canals & Palaces, Italy',
      subtitle: 'Waterway Romance & Gondolas',
      image: 'assets/images/gallery-3.jpg',
      rating: '4.9/5 (920 Reviews)',
      bestTime: 'April – November',
      currency: 'Euro (€)',
      language: 'Italian & English',
      description: 'Venice is a floating sanctuary built on 118 islands in the Adriatic lagoon, linked by stone bridges, historic gondolas, and Gothic palaces.'
    },
    'dest-dubai': {
      type: 'Destination',
      title: 'Dubai Desert Oasis, UAE',
      subtitle: 'Ultra Luxury & Sky Architecture',
      image: 'assets/images/hotel-luxury.jpg',
      rating: '4.9/5 (910 Reviews)',
      bestTime: 'October – April',
      currency: 'UAE Dirham (AED)',
      language: 'Arabic & English',
      description: 'Dubai is an ultra-modern metropolis of record-breaking skyscrapers, 7-star resorts, desert dune safaris, and luxury yacht harbor cruises.'
    },
    'dest-bali': {
      type: 'Destination',
      title: 'Bali Island & Jungle, Indonesia',
      subtitle: 'Rainforest Villas & Holy Temples',
      image: 'assets/images/dest-bali.jpg',
      rating: '4.7/5 (850 Reviews)',
      bestTime: 'April – October',
      currency: 'Indonesian Rupiah (IDR)',
      language: 'Indonesian, Balinese & English',
      description: 'Bali is Indonesia’s Island of the Gods, blending lush rice terraces, sacred Hindu temples, surfing beaches, and luxury wellness sanctuaries.'
    },
    'dest-swiss': {
      type: 'Destination',
      title: 'Swiss Alps Glacier Express, Switzerland',
      subtitle: 'Alpine Peaks & Matterhorn Panoramas',
      image: 'assets/images/dest-paris.jpg',
      rating: '4.9/5 (730 Reviews)',
      bestTime: 'Year Round',
      currency: 'Swiss Franc (CHF)',
      language: 'German, French & English',
      description: 'The Swiss Alps offer pristine mountain landscapes, Matterhorn peaks, panoramic train journeys on the Glacier Express, and cozy alpine chalets.'
    },
    'dest-singapore': {
      type: 'Destination',
      title: 'Singapore Skyline & Gardens',
      subtitle: 'Futuristic City & Marina Bay',
      image: 'assets/images/hotel-boutique.jpg',
      rating: '4.9/5 (1,080 Reviews)',
      bestTime: 'Year Round',
      currency: 'Singapore Dollar (SGD)',
      language: 'English, Malay, Mandarin & Tamil',
      description: 'Singapore is a garden metropolis of futuristic architecture, Marina Bay Sands infinity pools, Gardens by the Bay biodomes, and Michelin street food.'
    },
    'dest-bangkok': {
      type: 'Destination',
      title: 'Bangkok Palaces & Waterways, Thailand',
      subtitle: 'Golden Temples & Floating Markets',
      image: 'assets/images/dest-bali.jpg',
      rating: '4.7/5 (890 Reviews)',
      bestTime: 'November – February',
      currency: 'Thai Baht (THB)',
      language: 'Thai & English',
      description: 'Bangkok features glittering golden palaces, traditional longtail river boat tours, bustling floating markets, and authentic street gastronomy.'
    },
    'dest-newyork': {
      type: 'Destination',
      title: 'New York Manhattan Lights, USA',
      subtitle: 'Skyscrapers & Broadway Shows',
      image: 'assets/images/hotel-boutique.jpg',
      rating: '4.8/5 (1,310 Reviews)',
      bestTime: 'Year Round',
      currency: 'US Dollar ($)',
      language: 'English',
      description: 'New York City is a iconic global metropolis featuring Manhattan skylines, Broadway theaters, Central Park, world-class art museums, and 24/7 energy.'
    },
    'dest-sydney': {
      type: 'Destination',
      title: 'Sydney Opera & Harbour, Australia',
      subtitle: 'Pacific Harbour & Bondi Surfing',
      image: 'assets/images/hotel-luxury.jpg',
      rating: '4.9/5 (940 Reviews)',
      bestTime: 'September – April',
      currency: 'Australian Dollar (AUD)',
      language: 'English',
      description: 'Sydney is Australia’s coastal gem, world-famous for the Sydney Opera House, Harbour Bridge climb, golden surf beaches, and Blue Mountains national park.'
    }
  };

  // ═══════════════════════════════════════════════════
  // GLOBAL DESTINATIONS CATALOG DATABASE (15 DESTINATIONS)
  // ═══════════════════════════════════════════════════
  let destinationCatalogDb = [
    {
      id: 'dest-tokyo',
      name: 'Tokyo Neon & Heritage',
      country: '🇯🇵 Japan',
      city: 'Shinjuku & Shibuya, Tokyo',
      heroImg: 'assets/images/dest-tokyo.jpg',
      type: 'METROPOLIS & CULTURE',
      rating: 4.9,
      reviews: 1420,
      price: '$1,899',
      duration: '8 Days / 7 Nights',
      hotel: '5★ Aman Tokyo',
      weather: '20°C Pleasant',
      bestSeason: 'Mar – May & Oct – Nov',
      included: ['High-Rise Suite', 'Kaiseki Breakfast', 'Shinkansen Bullet Pass', 'TeamLab Tickets'],
      highlights: ['Mount Fuji Bullet train trip', 'TeamLab Planets digital art', 'Tsukiji Market sushi tour']
    },
    {
      id: 'dest-kyoto',
      name: 'Kyoto Zen Temples & Shrines',
      country: '🇯🇵 Japan',
      city: 'Gion & Arashiyama, Kyoto',
      heroImg: 'assets/images/dest-tokyo.jpg',
      type: 'HERITAGE & ZEN',
      rating: 4.9,
      reviews: 1120,
      price: '$1,699',
      duration: '6 Days / 5 Nights',
      hotel: '5★ Four Seasons Hotel Kyoto',
      weather: '19°C Mild',
      bestSeason: 'Spring & Autumn',
      included: ['Ryokan Luxury Suite', 'Traditional Tea Ceremony', 'Private Temple Tour', 'Kimono Experience'],
      highlights: ['Fushimi Inari thousand torii gates', 'Arashiyama bamboo grove', 'Kinkaku-ji Golden Pavilion']
    },
    {
      id: 'dest-osaka',
      name: 'Osaka Food & Castle Tour',
      country: '🇯🇵 Japan',
      city: 'Dotonbori, Osaka',
      heroImg: 'assets/images/dest-tokyo.jpg',
      type: 'CULINARY CAPITAL',
      rating: 4.8,
      reviews: 950,
      price: '$1,499',
      duration: '5 Days / 4 Nights',
      hotel: '5★ The Ritz-Carlton Osaka',
      weather: '21°C Clear',
      bestSeason: 'Year Round',
      included: ['Club Level Suite', 'Street Food Tasting Pass', 'Osaka Castle VIP Access', 'Universal VIP Pass'],
      highlights: ['Dotonbori street food night walk', 'Osaka Castle historical gardens', 'Universal Studios Japan VIP']
    },
    {
      id: 'dest-paris',
      name: 'Paris Capital Experience',
      country: '🇫🇷 France',
      city: 'Paris',
      heroImg: 'assets/images/dest-paris.jpg',
      type: 'HISTORIC & ROMANTIC',
      rating: 4.8,
      reviews: 1150,
      price: '$1,199',
      duration: '5 Days / 4 Nights',
      hotel: '5★ Le Meurice Paris',
      weather: '18°C Mild Spring',
      bestSeason: 'Year Round',
      included: ['Eiffel Balcony Room', 'French Breakfast', 'Louvre VIP Tickets', 'Seine Cruise'],
      highlights: ['Eiffel Tower balcony views', 'Louvre Museum VIP tour', 'Seine gourmet river cruise']
    },
    {
      id: 'dest-santorini',
      name: 'Santorini Clifftop',
      country: '🇬🇷 Greece',
      city: 'Oia & Fira',
      heroImg: 'assets/images/dest-santorini.jpg',
      type: 'AEGEAN ROMANCE',
      rating: 4.8,
      reviews: 980,
      price: '$1,299',
      duration: '5 Days / 4 Nights',
      hotel: '5★ Grace Hotel Caldera Suite',
      weather: '26°C Sunny Breeze',
      bestSeason: 'Apr – Oct',
      included: ['Caldera Suite', 'Champagne Breakfast', 'Catamaran Cruise', 'Wine Tasting Tour'],
      highlights: ['Iconic blue-domed vistas', 'Sunset catamaran yacht sail', 'Volcanic winery tasting']
    },
    {
      id: 'dest-rome',
      name: 'Rome Colosseum Heritage',
      country: '🇮🇹 Italy',
      city: 'Rome & Positano',
      heroImg: 'assets/images/gallery-3.jpg',
      type: 'MEDITERRANEAN HERITAGE',
      rating: 4.8,
      reviews: 860,
      price: '$1,399',
      duration: '6 Days / 5 Nights',
      hotel: '5★ Hotel Hassler Roma',
      weather: '25°C Sunny Mediterranean',
      bestSeason: 'Apr – Oct',
      included: ['Boutique Suite', 'Italian Breakfast', 'Colosseum VIP Tour', 'Positano Car Drive'],
      highlights: ['Colosseum & Forum VIP tour', 'Vatican Museums Sistine Chapel', 'Positano coastal road drive']
    },
    {
      id: 'dest-venice',
      name: 'Venice Canals & Palaces',
      country: '🇮🇹 Italy',
      city: 'Grand Canal, Venice',
      heroImg: 'assets/images/gallery-3.jpg',
      type: 'WATERWAY ROMANCE',
      rating: 4.9,
      reviews: 920,
      price: '$1,599',
      duration: '4 Days / 3 Nights',
      hotel: '5★ Hotel Danieli Venice',
      weather: '22°C Soft Breeze',
      bestSeason: 'Apr – Nov',
      included: ['Grand Canal Suite', 'Gondola Sunset Ride', 'Doges Palace VIP Tour', 'Murano Glass Workshop'],
      highlights: ['Private gondola serenade', 'St Marks Basilica terrace access', 'Murano island glassblowing']
    },
    {
      id: 'dest-dubai',
      name: 'Dubai Luxury Desert Oasis',
      country: '🇦🇪 UAE',
      city: 'Dubai & Palm Jumeirah',
      heroImg: 'assets/images/hotel-luxury.jpg',
      type: 'ULTRA LUXURY',
      rating: 4.9,
      reviews: 910,
      price: '$1,599',
      duration: '5 Days / 4 Nights',
      hotel: '7★ Burj Al Arab Suite',
      weather: '32°C Sunny Desert',
      bestSeason: 'Oct – Apr',
      included: ['Suite with Butler', 'Desert Safari BBQ', 'Burj Khalifa Top Pass', 'Airport Limo'],
      highlights: ['Burj Khalifa 148th floor view', '4x4 Desert Dune Bashing', 'Palm Jumeirah yacht cruise']
    },
    {
      id: 'dest-bali',
      name: 'Bali Jungle & Beach',
      country: '🇮🇩 Indonesia',
      city: 'Ubud & Seminyak',
      heroImg: 'assets/images/dest-bali.jpg',
      type: 'ISLAND RETREAT',
      rating: 4.7,
      reviews: 850,
      price: '$999',
      duration: '6 Days / 5 Nights',
      hotel: '5★ Viceroy Bali Jungle Suite',
      weather: '30°C Warm Sun',
      bestSeason: 'Apr – Oct',
      included: ['Private Pool Villa', 'Organic Breakfast', 'Private Chauffeur', 'Nusa Penida Tour'],
      highlights: ['Tegallalang rice terraces', 'Uluwatu Kecak fire dance', 'Diamond Beach day trip']
    },
    {
      id: 'dest-maldives',
      name: 'Maldives Overwater Sanctuary',
      country: '🇲🇻 Maldives',
      city: 'Baa Atoll & Male',
      heroImg: 'assets/images/dest-maldives.jpg',
      type: 'TROPICAL ISLAND',
      rating: 4.9,
      reviews: 1240,
      price: '$2,499',
      duration: '7 Days / 6 Nights',
      hotel: '5★ Velana Luxury Overwater Villa',
      weather: '29°C Tropical Sun',
      bestSeason: 'Nov – Apr',
      included: ['Overwater Villa', 'All Meals & Drinks', 'Seaplane Transfer', 'Manta Ray Snorkeling'],
      highlights: ['Overwater bungalow stay', 'Scuba diving with Manta Rays', 'Private sandbank dinner']
    },
    {
      id: 'dest-swiss',
      name: 'Swiss Alps Glacier Express',
      country: '🇨🇭 Switzerland',
      city: 'Zermatt & St. Moritz',
      heroImg: 'assets/images/dest-paris.jpg',
      type: 'ALPINE MOUNTAINS',
      rating: 4.9,
      reviews: 730,
      price: '$2,199',
      duration: '7 Days / 6 Nights',
      hotel: '5★ Matterhorn Glacier Lodge',
      weather: '15°C Cool Alpine',
      bestSeason: 'Year Round',
      included: ['Chalet Suite', 'Alpine Half-Board', 'Glacier Express Ticket', 'Cable Car Pass'],
      highlights: ['Glacier Express train ride', 'Matterhorn cable car ascent', 'Alpine cheese fondue dinner']
    },
    {
      id: 'dest-singapore',
      name: 'Singapore Skyline & Gardens',
      country: '🇸🇬 Singapore',
      city: 'Marina Bay & Sentosa',
      heroImg: 'assets/images/hotel-boutique.jpg',
      type: 'GARDEN CITY LUXURY',
      rating: 4.9,
      reviews: 1080,
      price: '$1,399',
      duration: '5 Days / 4 Nights',
      hotel: '5★ Marina Bay Sands Suite',
      weather: '31°C Tropical Breeze',
      bestSeason: 'Year Round',
      included: ['Infinity Pool Suite', 'Breakfast Buffet', 'Gardens by the Bay Pass', 'Night Safari Pass'],
      highlights: ['World famous infinity pool', 'Gardens by the Bay light show', 'Michelin street food tour']
    },
    {
      id: 'dest-bangkok',
      name: 'Bangkok Palaces & Floating Markets',
      country: '🇹🇭 Thailand',
      city: 'Bangkok & Chao Phraya',
      heroImg: 'assets/images/dest-bali.jpg',
      type: 'SOUTHEAST ASIA HERITAGE',
      rating: 4.7,
      reviews: 890,
      price: '$799',
      duration: '5 Days / 4 Nights',
      hotel: '5★ The Mandarin Oriental Bangkok',
      weather: '32°C Sunny',
      bestSeason: 'Nov – Feb',
      included: ['Riverside Suite', 'Thai Cooking Class', 'Grand Palace Tour', 'Longtail Boat Ride'],
      highlights: ['Grand Palace Emerald Buddha', 'Damnoen Saduak floating market', 'Wat Arun sunset vista']
    },
    {
      id: 'dest-newyork',
      name: 'New York Manhattan Lights',
      country: '🇺🇸 USA',
      city: 'Manhattan, New York',
      heroImg: 'assets/images/hotel-boutique.jpg',
      type: 'GLOBAL METROPOLIS',
      rating: 4.8,
      reviews: 1310,
      price: '$1,799',
      duration: '6 Days / 5 Nights',
      hotel: '5★ The Plaza New York',
      weather: '22°C Spring Sun',
      bestSeason: 'Year Round',
      included: ['Fifth Avenue Suite', 'Broadway Show Tickets', 'Helicopter Tour', 'Empire State Pass'],
      highlights: ['Manhattan skyline helicopter flight', 'Broadway show VIP seats', 'Central Park horse carriage']
    },
    {
      id: 'dest-sydney',
      name: 'Sydney Opera & Harbour Explorer',
      country: '🇦🇺 Australia',
      city: 'Sydney & Bondi Beach',
      heroImg: 'assets/images/hotel-luxury.jpg',
      type: 'PACIFIC HARBOUR',
      rating: 4.9,
      reviews: 940,
      price: '$1,999',
      duration: '7 Days / 6 Nights',
      hotel: '5★ Four Seasons Hotel Sydney',
      weather: '24°C Sunny Coast',
      bestSeason: 'Sep – Apr',
      included: ['Harbour View Suite', 'Opera House VIP Tour', 'Harbour Yacht Cruise', 'Blue Mountains Pass'],
      highlights: ['Sydney Opera House backstage tour', 'Harbour Bridge climb option', 'Bondi to Coogee coastal walk']
    }
  ];

  // ═══════════════════════════════════════════════════
  // HOTELS & RESORTS CATALOG DATABASE (10 LUXURY HOTELS)
  // ═══════════════════════════════════════════════════
  let hotelCatalogDb = [
    {
      id: 'hotel-horizon',
      name: 'Horizon Infinity Resort',
      location: 'Ubud Valley, Bali, Indonesia',
      heroImg: 'assets/images/hotel-luxury.jpg',
      category: 'LUXURY RESORT',
      rating: 5.0,
      reviews: 480,
      price: '$399',
      rooms: ['Jungle Pool Villa', 'Valley Suite', 'Royal Infinity Villa'],
      amenities: ['🏊 Infinity Pool', '🍽️ Gourmet Restaurant', '💆 Organic Spa', '🏋️ Fitness Center', '📶 High Speed WiFi'],
      specs: 'Spanning 15 acres of tropical rainforest with a 3-tier infinity pool overlooking the sacred Ayung River.'
    },
    {
      id: 'hotel-metropolitan',
      name: 'Metropolitan Grand Suites',
      location: 'Downtown Marina, Dubai, UAE',
      heroImg: 'assets/images/hotel-boutique.jpg',
      category: 'CITY PENTHOUSE',
      rating: 5.0,
      reviews: 390,
      price: '$529',
      rooms: ['Executive Penthouse', 'Marina View Suite', 'Presidential Sky Suite'],
      amenities: ['🏊 Rooftop Pool', '🍾 Sky Lounge Bar', '💼 Business Center', '🚗 Valet Parking', '🚁 Helipad'],
      specs: 'Soaring 68 stories above Dubai Marina with floor-to-ceiling glass and private plunge pools on upper penthouses.'
    },
    {
      id: 'hotel-aqua',
      name: 'Aqua Lagoon Villa — Maldives',
      location: 'Baa Atoll UNESCO Reserve, Maldives',
      heroImg: 'assets/images/hotel-overwater.jpg',
      category: 'OVERWATER VILLA',
      rating: 5.0,
      reviews: 620,
      price: '$899',
      rooms: ['Sunset Ocean Villa', 'Lagoon Pool Bungalow', 'Royal 2-Bedroom Suite'],
      amenities: ['🤿 Snorkeling Gear', '🛶 Private Kayaks', '🍳 Personal Butler', '🌅 Sunset Pool', '⛵ Yacht Charter'],
      specs: 'Glass-bottom floor panels, direct ocean ladder access, and 24/7 dedicated butler service.'
    },
    {
      id: 'hotel-aman',
      name: 'Aman Tokyo Skyline Suite',
      location: 'Otemachi Tower, Tokyo, Japan',
      heroImg: 'assets/images/dest-tokyo.jpg',
      category: 'URBAN SANCTUARY',
      rating: 4.9,
      reviews: 510,
      price: '$950',
      rooms: ['Premier King Suite', 'Corner City Suite', 'Aman Imperial Suite'],
      amenities: ['🍵 Tea Lounge', '♨️ Japanese Onsen Bath', '💆 Wellness Spa', '🍷 Wine Cellar'],
      specs: 'Occupying the top 6 floors of the Otemachi Tower, featuring traditional washi paper doors and camphor wood baths.'
    },
    {
      id: 'hotel-grace',
      name: 'Grace Hotel Santorini Caldera Suite',
      location: 'Imerovigli Cliffs, Santorini, Greece',
      heroImg: 'assets/images/dest-santorini.jpg',
      category: 'CLIFFSIDE RESORT',
      rating: 5.0,
      reviews: 440,
      price: '$720',
      rooms: ['Deluxe Caldera Suite', 'Grace Infinity Suite', 'VIP Villa Suite'],
      amenities: ['🏊 Infinity Pool', '🍸 Champagne Bar', '🧘 Sunrise Yoga', '🍳 Fine Dining'],
      specs: 'Carved directly into the volcanic cliffside with unobstructed views of the Aegean Sea caldera.'
    },
    {
      id: 'hotel-meurice',
      name: 'Le Meurice Palace Hotel',
      location: 'Rue de Rivoli, Paris, France',
      heroImg: 'assets/images/dest-paris.jpg',
      category: 'HISTORIC PALACE',
      rating: 4.9,
      reviews: 580,
      price: '$1,100',
      rooms: ['Tuileries Suite', 'Executive Room', 'Penthouse Belle Etoile'],
      amenities: ['🍷 Michelin Restaurant', '💆 Valmont Spa', '🚗 Limousine Service', '🥐 Pastry Shop'],
      specs: 'First established in 1835, blending 18th-century grandeur with modern Philippe Starck interior accents.'
    },
    {
      id: 'hotel-mbs',
      name: 'Marina Bay Sands Infinity Resort',
      location: 'Marina Bay, Singapore',
      heroImg: 'assets/images/hotel-boutique.jpg',
      category: 'SKYLINE ICON',
      rating: 4.9,
      reviews: 1250,
      price: '$650',
      rooms: ['Sands Premier Suite', 'Orchid Suite', 'Presidential Suite'],
      amenities: ['🏊 150m Rooftop Pool', '🎰 Casino', '🛍️ Luxury Mall', '🍽️ 40+ Restaurants'],
      specs: 'Featuring the world\'s largest rooftop infinity pool spanning 57 stories above the Singapore Strait.'
    },
    {
      id: 'hotel-danieli',
      name: 'Hotel Danieli Luxury Palace',
      location: 'Riva degli Schiavoni, Venice, Italy',
      heroImg: 'assets/images/gallery-3.jpg',
      category: 'PALAZZO LUXURY',
      rating: 4.8,
      reviews: 490,
      price: '$820',
      rooms: ['Dandolo Executive Suite', 'Lagoon View Suite', 'Doges Suite'],
      amenities: ['⛵ Private Water Taxi Pier', '🍽️ Terrazza Danieli', '🍷 Wine Lounge', '🎻 Live Harpist'],
      specs: 'Former 14th-century palace of the Dandolo family located steps from St. Mark\'s Square.'
    },
    {
      id: 'hotel-plaza',
      name: 'The Plaza Hotel Fifth Avenue',
      location: 'Fifth Avenue & Central Park, New York, USA',
      heroImg: 'assets/images/hotel-luxury.jpg',
      category: 'LANDMARK PALACE',
      rating: 4.8,
      reviews: 870,
      price: '$890',
      rooms: ['Plaza Suite', 'Carnegie Suite', 'Royal Plaza Suite'],
      amenities: ['🍾 Champagne Bar', '💆 Guerlain Spa', '🛍️ Shops at The Plaza', '🚗 Chauffeur'],
      specs: 'An iconic Manhattan landmark since 1907 situated directly across from Central Park South.'
    },
    {
      id: 'hotel-fourseasons',
      name: 'Four Seasons Hotel Sydney Harbour',
      location: 'The Rocks, Sydney, Australia',
      heroImg: 'assets/images/dest-maldives.jpg',
      category: 'HARBOURFRONT RESORT',
      rating: 4.9,
      reviews: 530,
      price: '$680',
      rooms: ['Full Harbour King Suite', 'Opera View Suite', 'Presidential Suite'],
      amenities: ['🏊 Outdoor Heated Pool', '🍸 Mode Kitchen & Bar', '💆 Endota Spa', '🏋️ 24/7 Gym'],
      specs: 'Unobstructed panorama views of both the Sydney Opera House and Sydney Harbour Bridge.'
    }
  ];

  // ═══════════════════════════════════════════════════
  // FLIGHTS CATALOG DATABASE (10 SAMPLE ROUTES)
  // ═══════════════════════════════════════════════════
  let flightCatalogDb = [
    {
      id: 'flight-emirates',
      airline: 'Emirates',
      logo: '🇦🇪',
      route: 'DXB (Dubai) ✈️ JFK (New York)',
      duration: '14h 20m · Direct',
      cabin: 'First Suites / Business Class',
      price: '$1,299',
      features: ['Private Suite', 'Onboard Shower Spa', 'A380 Bar Lounge', 'Wi-Fi Included']
    },
    {
      id: 'flight-qatar',
      airline: 'Qatar Airways',
      logo: '🇶🇦',
      route: 'DOH (Doha) ✈️ LHR (London)',
      duration: '7h 15m · Direct',
      cabin: 'Qsuite Business Class',
      price: '$990',
      features: ['Qsuite Double Bed', 'À la carte Dining', 'Oryx One 4000+ Movies', 'Lounge Access']
    },
    {
      id: 'flight-singapore',
      airline: 'Singapore Airlines',
      logo: '🇸🇬',
      route: 'SIN (Singapore) ✈️ NRT (Tokyo)',
      duration: '6h 45m · Direct',
      cabin: 'First Class Suite',
      price: '$890',
      features: ['Poltrona Frau Leather Bed', 'Dom Pérignon Service', 'Book the Cook', 'Noise Canceling Headphones']
    },
    {
      id: 'flight-ba',
      airline: 'British Airways',
      logo: '🇬🇧',
      route: 'LHR (London) ✈️ CDG (Paris)',
      duration: '1h 20m · Direct',
      cabin: 'Club Europe Business',
      price: '$240',
      features: ['Fast Track Security', 'Galleries Lounge Access', 'Gourmet Meal', 'Extra Legroom']
    },
    {
      id: 'flight-airfrance',
      airline: 'Air France',
      logo: '🇫🇷',
      route: 'CDG (Paris) ✈️ LAX (Los Angeles)',
      duration: '11h 50m · Direct',
      cabin: 'La Première First Class',
      price: '$1,450',
      features: ['Private Chauffeur', 'Sistley Spa Lounge', 'Michelin Chef Menu', 'Private Cabin Suite']
    },
    {
      id: 'flight-lufthansa',
      airline: 'Lufthansa',
      logo: '🇩🇪',
      route: 'FRA (Frankfurt) ✈️ HND (Tokyo)',
      duration: '12h 10m · Direct',
      cabin: 'First Class / Business',
      price: '$1,180',
      features: ['First Class Terminal Access', 'Porsche Airport Transfer', 'Caviar Service', 'Lie-flat Seat']
    },
    {
      id: 'flight-ana',
      airline: 'ANA All Nippon Airways',
      logo: '🇯🇵',
      route: 'HND (Tokyo) ✈️ SFO (San Francisco)',
      duration: '9h 30m · Direct',
      cabin: '"THE Suite" First Class',
      price: '$1,350',
      features: ['43-inch 4K TV Screen', 'Private Door Suite', 'Japanese Kaiseki Dining', 'High-Speed Wi-Fi']
    },
    {
      id: 'flight-etihad',
      airline: 'Etihad Airways',
      logo: '🇦🇪',
      route: 'AUH (Abu Dhabi) ✈️ SYD (Sydney)',
      duration: '13h 40m · Direct',
      cabin: 'First Apartment Suite',
      price: '$1,520',
      features: ['Private Apartment', 'Vanity Counter', 'Shower Ensuite', 'Personal Chef']
    },
    {
      id: 'flight-qantas',
      airline: 'Qantas Airways',
      logo: '🇦🇺',
      route: 'SYD (Sydney) ✈️ LAX (Los Angeles)',
      duration: '13h 50m · Direct',
      cabin: 'First Suite B787',
      price: '$1,290',
      features: ['Sheridan Bedding', 'Neil Perry Dining', 'Rockpool Sommelier Wine', 'First Lounge']
    },
    {
      id: 'flight-turkish',
      airline: 'Turkish Airlines',
      logo: '🇹🇷',
      route: 'IST (Istanbul) ✈️ BKK (Bangkok)',
      duration: '9h 15m · Direct',
      cabin: 'Business Class',
      price: '$840',
      features: ['Flying Chef Service', 'Istanbul CIP Lounge Access', 'Massage Seats', 'Free Wi-Fi']
    }
  ];

  // ═══════════════════════════════════════════════════
  // CRUISES CATALOG DATABASE (10 LUXURY CRUISES)
  // ═══════════════════════════════════════════════════
  let cruiseCatalogDb = [
    {
      id: 'cruise-med',
      name: 'Mediterranean Magic & Riviera Odyssey',
      line: 'Silver Ocean Cruises',
      heroImg: 'assets/images/dest-santorini.jpg',
      route: 'Barcelona ➔ Marseille ➔ Monaco ➔ Florence ➔ Rome',
      duration: '8 Days / 7 Nights',
      price: '$1,899',
      cabin: 'Oceanview Balcony Suite',
      dining: '6 Michelin Restaurants',
      entertainment: 'Broadway Show & Casino'
    },
    {
      id: 'cruise-caribbean',
      name: 'Royal Caribbean Island Hopper',
      line: 'Royal Caribbean International',
      heroImg: 'assets/images/dest-maldives.jpg',
      route: 'Miami ➔ Cozumel ➔ Roatan ➔ Perfect Day CocoCay',
      duration: '7 Days / 6 Nights',
      price: '$1,299',
      cabin: 'Crown Loft Suite',
      dining: '12 Specialty Restaurants',
      entertainment: 'AquaTheater & Ice Show'
    },
    {
      id: 'cruise-greek',
      name: 'Aegean & Greek Isles Discovery',
      line: 'Celebrity Cruises',
      heroImg: 'assets/images/dest-santorini.jpg',
      route: 'Athens ➔ Mykonos ➔ Santorini ➔ Rhodes ➔ Crete',
      duration: '6 Days / 5 Nights',
      price: '$1,499',
      cabin: 'Infinite Veranda Suite',
      dining: 'The Retreat Fine Dining',
      entertainment: 'Rooftop Garden Cinema'
    },
    {
      id: 'cruise-alaska',
      name: 'Glaciers & Alaska Wilderness Cruise',
      line: 'Princess Cruises',
      heroImg: 'assets/images/dest-paris.jpg',
      route: 'Vancouver ➔ Inside Passage ➔ Juneau ➔ Glacier Bay',
      duration: '8 Days / 7 Nights',
      price: '$1,699',
      cabin: 'Mini-Suite with Balcony',
      dining: 'Fresh Alaskan Seafood Dining',
      entertainment: 'Wildlife Lectures & Stargazing'
    },
    {
      id: 'cruise-asia',
      name: 'Asia Pacific Odyssey & Dragon Bay',
      line: 'Seabourn Ultra Luxury',
      heroImg: 'assets/images/dest-tokyo.jpg',
      route: 'Singapore ➔ Bangkok ➔ Ho Chi Minh ➔ Ha Long Bay',
      duration: '10 Days / 9 Nights',
      price: '$2,899',
      cabin: 'Seabourn Ocean Suite',
      dining: 'Thomas Keller Gourmet',
      entertainment: 'Private Marina Sports & Caviar in the Surf'
    },
    {
      id: 'cruise-fjords',
      name: 'Norwegian Fjords & Northern Lights Voyage',
      line: 'Hurtigruten Expeditions',
      heroImg: 'assets/images/gallery-3.jpg',
      route: 'Bergen ➔ Geirangerfjord ➔ Tromso ➔ North Cape',
      duration: '9 Days / 8 Nights',
      price: '$2,199',
      cabin: 'Arctic Superior Balcony Suite',
      dining: 'Local Nordic Organic Kitchen',
      entertainment: 'Aurora Borealis Astronomy Guide'
    },
    {
      id: 'cruise-nile',
      name: 'Nile River Pharaoh & Temple Cruise',
      line: 'Oberoi Nile Cruises',
      heroImg: 'assets/images/hotel-luxury.jpg',
      route: 'Luxor ➔ Karnak ➔ Edfu ➔ Kom Ombo ➔ Aswan',
      duration: '5 Days / 4 Nights',
      price: '$1,399',
      cabin: 'Luxury Riverview Cabin',
      dining: 'Egyptian & International Buffet',
      entertainment: 'Nile Felucca Sail & Nubian Show'
    },
    {
      id: 'cruise-transatlantic',
      name: 'Queen Mary 2 Transatlantic Crossing',
      line: 'Cunard Line',
      heroImg: 'assets/images/hotel-boutique.jpg',
      route: 'Southampton ➔ Atlantic Ocean ➔ New York',
      duration: '7 Days / 6 Nights',
      price: '$1,999',
      cabin: 'Queens Grill Suite',
      dining: 'Queens Grill Restaurant',
      entertainment: 'Planetarium & Royal Court Theatre'
    },
    {
      id: 'cruise-southpacific',
      name: 'South Pacific Coral Island Cruise',
      line: 'Paul Gauguin Cruises',
      heroImg: 'assets/images/dest-maldives.jpg',
      route: 'Tahiti ➔ Moorea ➔ Huahine ➔ Bora Bora',
      duration: '8 Days / 7 Nights',
      price: '$3,100',
      cabin: 'Bora Bora Veranda Suite',
      dining: 'French Polynesian Gastronomy',
      entertainment: 'Les Gauguines Cultural Show'
    },
    {
      id: 'cruise-antarctica',
      name: 'Antarctic Polar Expedition & Ice Voyage',
      line: 'Ponant Luxury Expeditions',
      heroImg: 'assets/images/dest-paris.jpg',
      route: 'Ushuaia ➔ Drake Passage ➔ Antarctic Peninsula',
      duration: '11 Days / 10 Nights',
      price: '$4,500',
      cabin: 'Prestige Stateroom Balcony',
      dining: 'French Haute Cuisine',
      entertainment: 'Zodiac Ice Excursions & Penguin Safari'
    }
  ];

  // ═══════════════════════════════════════════════════
  // CAR & TRANSFERS CATALOG DATABASE (10 SERVICES)
  // ═══════════════════════════════════════════════════
  let transportCatalogDb = [
    {
      id: 'trans-airport',
      title: 'Airport VIP Executive Transfer',
      vehicle: 'Mercedes-Benz E-Class / BMW 5 Series',
      img: 'assets/images/hotel-boutique.jpg',
      capacity: '3 Passengers · 3 Bags',
      price: '$79',
      features: ['Flight Tracking', 'Meet & Greet Service', '60 Min Free Waiting', 'Free Bottled Water & Wi-Fi']
    },
    {
      id: 'trans-sedan',
      title: 'Luxury Personal Sedan Service',
      vehicle: 'Mercedes-Benz S-Class / Maybach',
      img: 'assets/images/hotel-luxury.jpg',
      capacity: '3 Passengers · 3 Bags',
      price: '$149',
      features: ['Leather Reclining Seats', 'Panoramic Sunroof', 'Chauffeur in Suit', 'Premium Sound System']
    },
    {
      id: 'trans-suv',
      title: 'Full-Size Luxury SUV Escort',
      vehicle: 'Cadillac Escalade ESV / Lincoln Navigator',
      img: 'assets/images/hotel-luxury.jpg',
      capacity: '6 Passengers · 6 Bags',
      price: '$189',
      features: ['4WD All-Weather', 'Tinted Privacy Glass', 'USB Charging Ports', 'Child Seats Included']
    },
    {
      id: 'trans-van',
      title: 'Executive Passenger Van',
      vehicle: 'Mercedes-Benz V-Class / Sprinter',
      img: 'assets/images/hotel-boutique.jpg',
      capacity: '8 Passengers · 8 Bags',
      price: '$210',
      features: ['Face-to-Face Seating', 'Work Tables', 'Ambient Lighting', 'Luggage Compartment']
    },
    {
      id: 'trans-chauffeur',
      title: 'Full-Day Personal Private Chauffeur',
      vehicle: 'Rolls-Royce Ghost / Bentley Flying Spur',
      img: 'assets/images/hotel-luxury.jpg',
      capacity: '3 Passengers · 4 Bags',
      price: '$590 / day',
      features: ['12 Hours Unlimited Mileage', 'Dedicated Personal Driver', 'Flexible Itinerary', 'VIP Door Service']
    },
    {
      id: 'trans-taxi',
      title: 'City VIP Express Cab Service',
      vehicle: 'Toyota Alphard Executive / Lexus ES',
      img: 'assets/images/hotel-boutique.jpg',
      capacity: '4 Passengers · 3 Bags',
      price: '$45',
      features: ['24/7 On-Demand Dispatch', 'GPS Live Tracking', 'Card / Apple Pay', 'Fixed Flat Rates']
    },
    {
      id: 'trans-limo',
      title: 'Stretch Executive Town Limousine',
      vehicle: 'Lincoln MKT Stretch Limo',
      img: 'assets/images/hotel-luxury.jpg',
      capacity: '10 Passengers · 6 Bags',
      price: '$350',
      features: ['Mini Bar & Champagne Ice', 'Fiber Optic Ceiling', 'Privacy Partition', 'Bluetooth Stereo']
    },
    {
      id: 'trans-ev',
      title: 'Tesla Electric Vehicle Rental',
      vehicle: 'Tesla Model S Plaid / Model X',
      img: 'assets/images/dest-tokyo.jpg',
      capacity: '5 Passengers · 4 Bags',
      price: '$130 / day',
      features: ['Autopilot Capability', 'Zero Emissions', 'Free Supercharging', 'Falcon Wing Doors']
    },
    {
      id: 'trans-shuttle',
      title: 'Group Resort Express Shuttle Bus',
      vehicle: 'Volvo Luxury Coach',
      img: 'assets/images/hotel-boutique.jpg',
      capacity: '24 Passengers · 24 Bags',
      price: '$320',
      features: ['Air-Conditioned Comfort', 'PA System & Mic', 'Reclining Seats', 'Underneath Luggage Storage']
    },
    {
      id: 'trans-convertible',
      title: 'Premium Sports Convertible Rental',
      vehicle: 'Porsche 911 Carrera Cabriolet',
      img: 'assets/images/dest-santorini.jpg',
      capacity: '2 Passengers · 2 Bags',
      price: '$290 / day',
      features: ['Retractable Hardtop', 'Sport Chrono Package', 'GPS Navigation', 'Full Insurance Included']
    }
  ];

  // ═══════════════════════════════════════════════════
  // VISA & PASSPORT SERVICES CATALOG DATABASE (10 SERVICES)
  // ═══════════════════════════════════════════════════
  let visaCatalogDb = [
    {
      id: 'visa-japan',
      country: '🇯🇵 Japan',
      title: 'Japan Tourist Fast-Track eVisa',
      type: 'Single / Double Entry Tourist Visa',
      processingTime: '24–48 Hours Express',
      fee: '$85',
      reqs: ['Valid Passport Scan', 'Passport Photo', 'Flight Reservation', 'Hotel Booking Confirmation']
    },
    {
      id: 'visa-schengen',
      country: '🇪🇺 Europe / Schengen',
      title: 'Schengen Multi-Entry Tourist Visa',
      type: '90-Day Short Stay Tourist Visa',
      processingTime: '5–7 Business Days',
      fee: '$160',
      reqs: ['Passport (6 mo validity)', 'Travel Insurance (€30k coverage)', 'Bank Statement', 'Itinerary']
    },
    {
      id: 'visa-uae',
      country: '🇦🇪 UAE / Dubai',
      title: 'Dubai 30-Day Express Tourist eVisa',
      type: '30-Day Single Entry eVisa',
      processingTime: '12 Hours Express',
      fee: '$110',
      reqs: ['Color Passport Copy', 'White Background Photo', 'No Bank Statement Needed']
    },
    {
      id: 'visa-us',
      country: '🇺🇸 United States',
      title: 'US B1/B2 Tourist & Business Visa Assistance',
      type: '10-Year Multiple Entry Visa',
      processingTime: 'DS-160 Filing & Interview Appointment',
      fee: '$240',
      reqs: ['DS-160 Application', 'Consular Fee Payment', 'Interview Coaching', 'Document Verification']
    },
    {
      id: 'visa-uk',
      country: '🇬🇧 United Kingdom',
      title: 'UK Standard Visitor 6-Month Visa',
      type: '6-Month / 2-Year Multiple Entry',
      processingTime: '7–10 Business Days',
      fee: '$180',
      reqs: ['Financial Proof', 'Employment Letter', 'Accommodation Details', 'Biometrics Appointment']
    },
    {
      id: 'visa-australia',
      country: '🇦🇺 Australia',
      title: 'Australia Subclass 601 / 651 ETA Visa',
      type: '1-Year Multiple Entry ETA',
      processingTime: 'Instant / 4 Hours',
      fee: '$45',
      reqs: ['Eligible Passport Scan', 'Contact Info', 'No Physical Embassy Visit Required']
    },
    {
      id: 'visa-maldives',
      country: '🇲🇻 Maldives',
      title: 'Maldives Tourist Arrival Approval Pass',
      type: '30-Day On-Arrival Tourist Pass',
      processingTime: 'IMUGA Filing (Under 2 Hours)',
      fee: '$25',
      reqs: ['IMUGA Health Declaration', 'Confirmed Resort Booking', 'Return Flight Ticket']
    },
    {
      id: 'visa-bali',
      country: '🇮🇩 Indonesia / Bali',
      title: 'Indonesia e-VOA & B214 Tourist Visa',
      type: '30-Day / 60-Day Renewable Visa',
      processingTime: '2 Hours Instant eVisa',
      fee: '$65',
      reqs: ['Passport Photo', 'Return Flight', 'eVisa Fee Payment Online']
    },
    {
      id: 'visa-thailand',
      country: '🇹🇭 Thailand',
      title: 'Thailand 60-Day Tourist Visa Pass',
      type: '60-Day Single Entry Visa',
      processingTime: '24 Hours Express',
      fee: '$75',
      reqs: ['Passport Copy', 'E-Pass Photo', 'Hotel Reservation', 'Bank Proof']
    },
    {
      id: 'visa-egypt',
      country: '🇪🇬 Egypt',
      title: 'Egypt Express Tourist eVisa',
      type: '30-Day Single / Multiple Entry',
      processingTime: '24 Hours Express',
      fee: '$55',
      reqs: ['Passport Scan', 'Travel Dates', 'Instant Email Approval PDF']
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    // Always start at the top when this page loads
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    initServiceFilters();
    initPackageSubCategories();
    initDetailsModal();
  });

  // ═══════════════════════════════════════════════════
  // DYNAMIC CATEGORY GRID RENDERERS
  // ═══════════════════════════════════════════════════
  function initServiceFilters() {
    const chips = document.querySelectorAll('.service-chip');
    const subCatBar = document.getElementById('package-sub-categories');
    const servicesNavBar = document.getElementById('all-services');

    function updateSubCatBarTop() {
      if (!subCatBar || !servicesNavBar) return;
      const navbarEl = document.getElementById('navbar');
      const navbarH = navbarEl ? navbarEl.getBoundingClientRect().height : 72;
      const servicesNavH = servicesNavBar.offsetHeight;
      subCatBar.style.top = (navbarH + servicesNavH) + 'px';
    }

    const catAliasMap = {
      'hotel': 'hotels',
      'hotels': 'hotels',
      'accommodation': 'hotels',
      'accommodations': 'hotels',
      'resort': 'hotels',
      'resorts': 'hotels',
      
      'dest': 'destinations',
      'destination': 'destinations',
      'destinations': 'destinations',
      
      'pkg': 'packages',
      'package': 'packages',
      'packages': 'packages',
      'tour': 'packages',
      'tours': 'packages',
      
      'cruise': 'cruises',
      'cruises': 'cruises',
      
      'flight': 'flights',
      'flights': 'flights',
      'airline': 'flights',
      
      'car': 'transport',
      'cars': 'transport',
      'transport': 'transport',
      'transfers': 'transport',
      'transfer': 'transport',
      
      'insurance': 'insurance',
      'travel-insurance': 'insurance',
      'travel_insurance': 'insurance',
      
      'specialty': 'specialty',
      'specialty-tours': 'specialty',
      'specialty_tours': 'specialty',
      
      'experience': 'experiences',
      'experiences': 'experiences',
      'guide': 'experiences',
      'guides': 'experiences',
      
      'visa': 'visa',
      'visas': 'visa',
      
      'gallery': 'gallery',
      'photos': 'gallery',
      'photo': 'gallery',
      
      'all': 'all'
    };

    function activateCategory(rawCat, fromUserClick, query) {
      const normalizedCat = catAliasMap[String(rawCat || '').toLowerCase().trim()] || 'all';
      const cat = normalizedCat;
      const q = typeof query === 'string' ? query : (new URLSearchParams(window.location.search).get('q') || new URLSearchParams(window.location.search).get('search') || '');

      chips.forEach(c => {
        c.style.background = '';
        c.style.boxShadow = '';
        c.style.border = '';
        c.style.borderRadius = '';
        if (c.dataset.category === cat) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });

      if (subCatBar) {
        const showSubCat = (cat === 'packages');
        subCatBar.style.display = showSubCat ? 'block' : 'none';
        if (showSubCat) {
          updateSubCatBarTop();
        }
      }

      if (fromUserClick) {
        try {
          let newUrl = cat === 'all' ? 'services.html' : 'services.html?cat=' + encodeURIComponent(cat);
          if (q) newUrl += '&q=' + encodeURIComponent(q);
          window.history.pushState({ category: cat, q: q }, '', newUrl);
        } catch (e) {}
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }

      if (cat === 'all') {
        renderAllServicesGrid(q);
      } else if (cat === 'destinations') {
        renderDestinationGrid(q);
      } else if (cat === 'packages') {
        const subCat = new URLSearchParams(window.location.search).get('sub') || new URLSearchParams(window.location.search).get('pkgCat') || 'all';
        renderPackageGrid(subCat, q);
      } else if (cat === 'hotels') {
        renderHotelGrid(q);
      } else if (cat === 'flights') {
        renderFlightGrid(q);
      } else if (cat === 'cruises') {
        renderCruiseGrid(q);
      } else if (cat === 'transport') {
        renderTransportGrid(q);
      } else if (cat === 'visa') {
        renderVisaGrid(q);
      } else if (cat === 'insurance') {
        renderInsuranceGrid(q);
      } else if (cat === 'specialty') {
        renderSpecialtyGrid(q);
      } else if (cat === 'experiences') {
        renderExperiencesGrid(q);
      } else if (cat === 'gallery') {
        renderGalleryGrid();
      } else {
        renderAllServicesGrid(q);
      }

      setTimeout(() => {
        document.querySelectorAll('#services-hub-grid .reveal, #services-hub-grid .glass-card').forEach(el => {
          el.classList.add('visible');
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }, 50);
    }

    window.renderActiveServiceTab = function(cat, query) {
      activateCategory(cat, false, query);
    };

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cat = chip.dataset.category;
        activateCategory(cat, true);
      });
    });

    // URL Query Parameter Filtering (e.g. ?cat=hotels or ?cat=destinations or ?q=maldives)
    const urlParams = new URLSearchParams(window.location.search);
    let initialCat = urlParams.get('cat') || urlParams.get('category') || urlParams.get('service') || '';
    const initialQuery = (urlParams.get('q') || urlParams.get('search') || urlParams.get('query') || '').trim();
    const subCat = urlParams.get('sub') || urlParams.get('pkgCat');
    
    // Auto-detect category if user navigated with ?q=hotel or ?q=cruises without cat
    if (!initialCat && initialQuery) {
      const qLower = initialQuery.toLowerCase();
      if (['hotel', 'hotels', 'resort', 'resorts', 'stay'].some(k => qLower.includes(k))) initialCat = 'hotels';
      else if (['cruise', 'cruises', 'ship', 'vessel'].some(k => qLower.includes(k))) initialCat = 'cruises';
      else if (['flight', 'flights', 'airline'].some(k => qLower.includes(k))) initialCat = 'flights';
      else if (['package', 'packages', 'tour', 'tours'].some(k => qLower.includes(k))) initialCat = 'packages';
      else if (['dest', 'destination', 'destinations'].some(k => qLower.includes(k))) initialCat = 'destinations';
      else if (['car', 'cars', 'transfer', 'transfers', 'cab'].some(k => qLower.includes(k))) initialCat = 'transport';
      else if (['insurance'].some(k => qLower.includes(k))) initialCat = 'insurance';
      else if (['visa'].some(k => qLower.includes(k))) initialCat = 'visa';
      else initialCat = 'all';
    } else if (!initialCat) {
      initialCat = 'all';
    }

    activateCategory(initialCat, false, initialQuery);

    if (initialCat === 'packages' && subCat) {
      setTimeout(() => {
        if (typeof renderPackageGrid === 'function') {
          renderPackageGrid(subCat, initialQuery);
        }
        document.querySelectorAll('.pkg-sub-chip').forEach(c => {
          if (c.dataset.pkgCat === subCat) {
            c.classList.add('active');
            c.style.background = 'var(--accent)';
            c.style.color = '#0f172a';
          } else {
            c.classList.remove('active');
            c.style.background = 'rgba(255,255,255,0.06)';
            c.style.color = '#cbd5e1';
          }
        });
      }, 50);
    }
  }

  // ═══════════════════════════════════════════════════
  // ALL SERVICES OVERVIEW GRID
  // ═══════════════════════════════════════════════════
  function renderAllServicesGrid() {
    const grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    const cats = [
      { id: 'packages', emoji: '📦', title: 'Tour Packages', desc: 'Handcrafted luxury tour packages with flights, hotels & transfers included.', count: packageCatalogDb.length, color: '#fbbf24', border: 'rgba(251,191,36,0.3)', img: (packageCatalogDb[0] && (packageCatalogDb[0].heroImg || packageCatalogDb[0].heroImage)) || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85' },
      { id: 'destinations', emoji: '🌍', title: 'Destinations', desc: 'World-class destinations with curated itineraries and luxury travel experiences.', count: destinationCatalogDb.length, color: '#38bdf8', border: 'rgba(56,189,248,0.3)', img: (destinationCatalogDb[0] && destinationCatalogDb[0].heroImg) || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=85' },
      { id: 'cruises', emoji: '🚢', title: 'Cruises', desc: 'Luxury ocean and river cruises with world-class onboard dining and entertainment.', count: cruiseCatalogDb.length, color: '#34d399', border: 'rgba(52,211,153,0.3)', img: 'https://images.unsplash.com/photo-1548574505-5e2386903d8f?auto=format&fit=crop&w=800&q=85' },
      { id: 'hotels', emoji: '🏨', title: 'Hotels & Resorts', desc: '5-star luxury hotels and private resorts with exclusive rates and butler service.', count: hotelCatalogDb.length, color: '#a78bfa', border: 'rgba(167,139,250,0.3)', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=85' },
      { id: 'flights', emoji: '✈️', title: 'Flights', desc: 'Business and first class international flights with lounge access and priority boarding.', count: flightCatalogDb.length, color: '#f472b6', border: 'rgba(244,114,182,0.3)', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=85' },
      { id: 'insurance', emoji: '🛡️', title: 'Travel Insurance', desc: 'Comprehensive protection plans covering medical emergencies and trip cancellations.', count: '10', color: '#22d3ee', border: 'rgba(34,211,238,0.3)', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=85' },
      { id: 'specialty', emoji: '💎', title: 'Specialty Tours', desc: 'Exclusive VIP experiences — aurora hunts, private islands, helicopter tours and more.', count: '15', color: '#D4AF37', border: 'rgba(212,175,55,0.3)', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=85' },
      { id: 'experiences', emoji: '🎟️', title: 'Experiences & Guides', desc: 'Curated local experiences, private guides, cultural immersions and activities.', count: '25', color: '#4ade80', border: 'rgba(74,222,128,0.3)', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=85' },
      { id: 'visa', emoji: '🛂', title: 'Visa Services', desc: 'Fast-track visa processing for 40+ countries with expert document support.', count: visaCatalogDb.length, color: '#f87171', border: 'rgba(248,113,113,0.3)', img: 'https://images.unsplash.com/photo-1575506726823-c6b1cb0da484?auto=format&fit=crop&w=800&q=85' },
      { id: 'gallery', emoji: '📸', title: 'Photo Gallery', desc: 'Stunning photorealistic gallery of breathtaking destinations and luxury moments.', count: '60', color: '#94a3b8', border: 'rgba(148,163,184,0.3)', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=85' }
    ];

    let html = '<div style="grid-column:1/-1; text-align:center; padding:20px 0 32px;">';
    html += '<div style="font-size:13px; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:1.5px; margin-bottom:8px;">COMPLETE SERVICES CATALOG</div>';
    html += '<h2 style="font-size:clamp(22px,4vw,34px); font-weight:900; color:#fff; margin-bottom:8px;">Everything for Your <span style="color:var(--accent)">Perfect Journey</span></h2>';
    html += '<p style="color:#94a3b8; font-size:14px; max-width:560px; margin:0 auto;">Explore our full range of premium travel services. Click any card to browse and book.</p>';
    html += '</div>';

    cats.forEach(function(cat) {
      html += '<div class="glass-card service-hub-card" style="padding:0; overflow:hidden; display:flex; flex-direction:column; border:1px solid ' + cat.border + '; border-radius:20px; cursor:pointer;" onclick="document.querySelector(\'.service-chip[data-category=' + cat.id + ']\').click()">';
      html += '<div style="position:relative; height:140px; overflow:hidden;">';
      html += '<img src="' + cat.img + '" alt="' + cat.title + '" onerror="this.onerror=null;this.src=\'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85\'" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease;" />';
      html += '<div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.2) 60%, transparent 100%);"></div>';
      html += '<div style="position:absolute; top:10px; left:12px; font-size:26px;">' + cat.emoji + '</div>';
      html += '<div style="position:absolute; top:10px; right:10px; background:rgba(15,23,42,0.7); border:1px solid ' + cat.border + '; color:' + cat.color + '; font-size:10px; font-weight:800; padding:3px 9px; border-radius:9999px;">' + cat.count + '+ Services</div>';
      html += '</div>';
      html += '<div style="padding:14px 16px; flex:1; display:flex; flex-direction:column; justify-content:space-between;">';
      html += '<div>';
      html += '<h3 style="font-size:16px; font-weight:800; color:#fff; margin-bottom:5px;">' + cat.title + '</h3>';
      html += '<p style="font-size:12px; color:#94a3b8; line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">' + cat.desc + '</p>';
      html += '</div>';
      html += '<div style="margin-top:12px; display:flex; align-items:center; gap:5px; color:' + cat.color + '; font-size:12px; font-weight:700;">Browse ' + cat.title + ' <span>&#8594;</span></div>';
      html += '</div></div>';
    });

    grid.innerHTML = html;
  }

  // ═══════════════════════════════════════════════════
  // TRAVEL INSURANCE GRID
  // ═══════════════════════════════════════════════════
  function renderInsuranceGrid(query) {
    var grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    var insurancePlans = [
      { id: 'ins-basic', emoji: '🛡️', title: 'Essential Travel Shield', coverage: 'Up to $50,000', price: '$29', duration: 'Per Trip', features: ['Medical Emergency Cover', 'Trip Cancellation', 'Lost Baggage ($500)', 'Flight Delay Cover', '24/7 Helpline'], badge: 'MOST POPULAR', badgeColor: '#34d399' },
      { id: 'ins-silver', emoji: '🥈', title: 'Silver Traveler Plan', coverage: 'Up to $150,000', price: '$59', duration: 'Per Trip', features: ['Medical Emergency', 'Trip Cancellation/Delay', 'Baggage Loss ($1,500)', 'Adventure Sports Cover', 'Visa Denial Refund', '24/7 Priority Helpline'], badge: 'GREAT VALUE', badgeColor: '#38bdf8' },
      { id: 'ins-gold', emoji: '🥇', title: 'Gold Premium Plan', coverage: 'Up to $500,000', price: '$99', duration: 'Per Trip', features: ['Medical Emergency', 'Medical Evacuation', 'Trip Cancellation Full', 'Baggage ($3,000)', 'Missed Connection Cover', 'Rental Car Damage', 'Personal Liability'], badge: 'RECOMMENDED', badgeColor: '#fbbf24' },
      { id: 'ins-platinum', emoji: '💎', title: 'Platinum Elite Plan', coverage: 'Up to $1,000,000', price: '$179', duration: 'Per Trip', features: ['Unlimited Medical Cover', 'Emergency Evacuation', 'Trip Interruption Full', 'Baggage ($10,000)', 'Cancel For Any Reason', 'Concierge Medical', '24/7 VIP Hotline'], badge: 'VIP', badgeColor: '#D4AF37' },
      { id: 'ins-annual', emoji: '📅', title: 'Annual Multi-Trip Plan', coverage: 'Up to $200,000 / trip', price: '$299', duration: 'Full Year', features: ['Unlimited Trips / Year', 'Medical cover per trip', 'Global Emergency Cover', 'Business Travel Cover', 'Golf & Sport Equipment', 'Family Plan Available'], badge: 'FREQUENT FLYERS', badgeColor: '#a78bfa' },
      { id: 'ins-family', emoji: '👨‍👩‍👧', title: 'Family Protection Plan', coverage: 'Up to $500,000 family', price: '$149', duration: 'Per Trip', features: ['Covers Entire Family (4)', 'Children Cover Included', 'Maternity Emergency', 'School Year Cover', 'Activity Injuries', 'Repatriation Cover'], badge: 'FAMILY FAVORITE', badgeColor: '#f472b6' }
    ];

    var list = insurancePlans;
    if (query) {
      var qClean = query.toLowerCase().trim();
      var matched = insurancePlans.filter(function(p) {
        return (p.title && p.title.toLowerCase().includes(qClean)) ||
               (p.coverage && p.coverage.toLowerCase().includes(qClean)) ||
               (p.features && p.features.some(function(f) { return f.toLowerCase().includes(qClean); }));
      });
      if (matched.length > 0) list = matched;
    }

    var html = '';
    list.forEach(function(plan) {
      html += '<div class="glass-card service-hub-card" style="padding:20px; border:1px solid rgba(34,211,238,0.15); border-radius:20px; display:flex; flex-direction:column; justify-content:space-between;">';
      html += '<div>';
      html += '<div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">';
      html += '<div style="display:flex; align-items:center; gap:10px;">';
      html += '<span style="font-size:28px;">' + plan.emoji + '</span>';
      html += '<div><div style="font-size:16px; font-weight:800; color:#fff;">' + plan.title + '</div>';
      html += '<div style="font-size:12px; color:#38bdf8; font-weight:700;">Coverage: ' + plan.coverage + '</div></div></div>';
      html += '<div style="background:rgba(34,211,238,0.1); border:1px solid rgba(34,211,238,0.3); color:' + plan.badgeColor + '; font-size:9px; font-weight:900; padding:3px 8px; border-radius:9999px; white-space:nowrap;">' + plan.badge + '</div></div>';
      html += '<div style="display:flex; align-items:baseline; gap:4px; margin-bottom:14px;">';
      html += '<span style="font-size:26px; font-weight:900; color:#fbbf24;">' + plan.price + '</span>';
      html += '<span style="font-size:12px; color:#94a3b8;">/ ' + plan.duration + '</span></div>';
      html += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:5px; margin-bottom:16px;">';
      plan.features.forEach(function(f) { html += '<div style="font-size:11px; color:#cbd5e1;">&#10003; ' + f + '</div>'; });
      html += '</div></div>';
      html += '<button onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({id:\'' + plan.id + '\',title:\'' + plan.title + '\',price:\'' + plan.price + '\',coverage:\'' + plan.coverage + '\'}, \'insurance\')" class="btn btn-primary btn-sm" style="width:100%; justify-content:center; padding:12px; font-size:13px; font-weight:800; border-radius:9999px; border:none; cursor:pointer;">Get This Plan &#128737;</button>';
      html += '</div>';
    });
    grid.innerHTML = html;
  }

  // ═══════════════════════════════════════════════════
  // SPECIALTY TOURS GRID
  // ═══════════════════════════════════════════════════
  function renderSpecialtyGrid(query) {
    var grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    var specialtyTours = [
      { id: 'sp-aurora', emoji: '🌌', title: 'Northern Lights Aurora Hunt', location: 'Tromso, Norway', duration: '6 Nights', price: '$3,299', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=85', desc: 'Chase the spectacular aurora borealis from glass igloo suites in the Arctic Circle with private guides.', badge: 'BUCKET LIST' },
      { id: 'sp-island', emoji: '🏝️', title: 'Private Island Retreat', location: 'Maldives / Fiji', duration: '7 Nights', price: '$8,999', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=85', desc: 'Exclusive access to a private island resort with personal chef, butler and underwater spa.', badge: 'ULTRA LUXURY' },
      { id: 'sp-heli', emoji: '🚁', title: 'Alpine Helicopter Tour', location: 'Swiss Alps', duration: '3 Days', price: '$2,499', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=85', desc: 'Soar above the Swiss Alps with private helicopter transfers, glacier walks and Michelin dining.', badge: 'ADVENTURE VIP' },
      { id: 'sp-safari', emoji: '🦁', title: 'Private Luxury Safari', location: 'Serengeti, Tanzania', duration: '8 Days', price: '$5,199', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85', desc: 'Witness the Great Migration with a private game drive vehicle, expert naturalist and luxury tented camp.', badge: 'WILDLIFE VIP' },
      { id: 'sp-yacht', emoji: '⛵', title: 'Mediterranean Yacht Charter', location: 'Amalfi / Santorini', duration: '7 Days', price: '$12,000', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=85', desc: 'Sail the Mediterranean on a private luxury superyacht visiting hidden coves and coastal villages.', badge: 'SIGNATURE' },
      { id: 'sp-culinary', emoji: '🍽️', title: 'Culinary Masterclass Tour', location: 'Paris / Tokyo / Rome', duration: '10 Days', price: '$4,799', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=85', desc: 'Exclusive cooking classes with Michelin-starred chefs, market tours and gourmet restaurant trails.', badge: 'FOOD LOVERS' },
      { id: 'sp-polar', emoji: '🧊', title: 'Antarctica Expedition', location: 'South Pole', duration: '14 Days', price: '$15,999', img: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=85', desc: 'Ultimate expedition to Antarctica aboard a luxury ice-breaking vessel with onboard scientists.', badge: 'ONCE IN A LIFETIME' },
      { id: 'sp-balloon', emoji: '🎈', title: 'Hot Air Balloon Sunrise', location: 'Cappadocia / Serengeti', duration: '2 Days', price: '$899', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=85', desc: 'Float silently over magical landscapes at sunrise in a private luxury balloon with champagne breakfast.', badge: 'ROMANTIC ESCAPE' },
      { id: 'sp-dive', emoji: '🤿', title: 'Deep Sea Diving Experience', location: 'Maldives / Great Barrier Reef', duration: '5 Days', price: '$2,199', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85', desc: 'Certified dive experiences in the world\'s most pristine coral reefs with marine biologist guides.', badge: 'UNDERWATER VIP' }
    ];

    var list = specialtyTours;
    if (query) {
      var qClean = query.toLowerCase().trim();
      var matched = specialtyTours.filter(function(t) {
        return (t.title && t.title.toLowerCase().includes(qClean)) ||
               (t.location && t.location.toLowerCase().includes(qClean)) ||
               (t.desc && t.desc.toLowerCase().includes(qClean));
      });
      if (matched.length > 0) list = matched;
    }

    var html = '';
    list.forEach(function(tour) {
      html += '<div class="glass-card service-hub-card" style="padding:0; overflow:hidden; border-radius:20px; border:1px solid rgba(212,175,55,0.2); background:#0f172a; display:flex; flex-direction:column;">';
      html += '<div style="position:relative; height:170px; overflow:hidden;">';
      html += '<img src="' + tour.img + '" alt="' + tour.title + '" onerror="this.onerror=null;this.src=\'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85\'" style="width:100%; height:100%; object-fit:cover;" />';
      html += '<div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%);"></div>';
      html += '<div style="position:absolute; top:10px; right:10px; background:rgba(212,175,55,0.9); color:#0f172a; font-size:9px; font-weight:900; padding:4px 10px; border-radius:9999px;">' + tour.badge + '</div>';
      html += '</div>';
      html += '<div style="padding:14px 16px; display:flex; flex-direction:column; flex:1; justify-content:space-between;">';
      html += '<div><div style="font-size:10px; color:#38bdf8; font-weight:700; text-transform:uppercase; margin-bottom:3px;">&#128205; ' + tour.location + ' &middot; ' + tour.duration + '</div>';
      html += '<h3 style="font-size:15px; font-weight:800; color:#fff; margin-bottom:5px; line-height:1.3;">' + tour.emoji + ' ' + tour.title + '</h3>';
      html += '<p style="font-size:11px; color:#94a3b8; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">' + tour.desc + '</p></div>';
      html += '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">';
      html += '<div style="font-size:18px; font-weight:900; color:#fbbf24;">' + tour.price + ' <span style="font-size:11px; color:#94a3b8; font-weight:normal;">/ person</span></div>';
      html += '<button onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({id:\'' + tour.id + '\',title:\'' + tour.title + '\',price:\'' + tour.price + '\',location:\'' + tour.location + '\',duration:\'' + tour.duration + '\'}, \'specialty\')" class="btn btn-primary btn-sm" style="font-size:11px; padding:9px 16px; border-radius:9999px; border:none; cursor:pointer; font-weight:800;">Enquire &#8594;</button>';
      html += '</div></div></div>';
    });
    grid.innerHTML = html;
  }

  // ═══════════════════════════════════════════════════
  // EXPERIENCES & GUIDES GRID
  // ═══════════════════════════════════════════════════
  function renderExperiencesGrid(query) {
    var grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    var experiencesList = [
      { id: 'exp-tokyo', emoji: '🍜', title: 'Tokyo Street Food Night Tour', location: 'Tokyo, Japan', duration: '4 Hours', price: '$89', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=85', desc: 'Taste authentic ramen, sushi and street foods with a local guide through Shibuya and Shinjuku.', category: 'Food & Drink' },
      { id: 'exp-maldives', emoji: '🌅', title: 'Maldives Sunset Dolphin Cruise', location: 'North Male Atoll', duration: '3 Hours', price: '$129', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=85', desc: 'Sail into the sunset on a private dhoni boat and watch dolphins play in crystal blue lagoon waters.', category: 'Nature & Wildlife' },
      { id: 'exp-paris', emoji: '🎨', title: 'Private Louvre Museum Tour', location: 'Paris, France', duration: '3 Hours', price: '$199', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=85', desc: 'Skip-the-line private guided tour of the Louvre with expert art historian and exclusive gallery access.', category: 'Culture & Art' },
      { id: 'exp-dubai', emoji: '🐪', title: 'Dubai Desert Safari & Dine', location: 'Dubai, UAE', duration: '6 Hours', price: '$149', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=85', desc: 'Thrilling dune bashing, camel rides and traditional Bedouin dinner under the stars in the Arabian desert.', category: 'Adventure' },
      { id: 'exp-bali', emoji: '🛕', title: 'Bali Sacred Temple Trail', location: 'Ubud, Bali', duration: '5 Hours', price: '$79', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=85', desc: 'Guided spiritual journey through ancient Balinese temples, rice terraces and jungle waterfalls.', category: 'Culture & Wellness' },
      { id: 'exp-santorini', emoji: '📸', title: 'Santorini Photography Walk', location: 'Oia, Santorini', duration: '3 Hours', price: '$119', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=85', desc: 'Professional photo shoot at Oia\'s iconic blue domes and cliffside caldera with a local photographer.', category: 'Photography' },
      { id: 'exp-swiss', emoji: '⛷️', title: 'St. Moritz Ski & Snow Experience', location: 'St. Moritz, Switzerland', duration: 'Full Day', price: '$349', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=85', desc: 'Private ski instructor, luxury equipment hire and apres-ski at the famous Badrutts Palace bar.', category: 'Snow & Adventure' },
      { id: 'exp-serengeti', emoji: '🦁', title: 'Serengeti Night Game Drive', location: 'Serengeti, Tanzania', duration: '4 Hours', price: '$249', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85', desc: 'Exclusive after-dark safari spotting nocturnal predators — leopards, lions and hyenas in their element.', category: 'Wildlife' },
      { id: 'exp-amalfi', emoji: '⛵', title: 'Amalfi Private Boat Day Trip', location: 'Positano, Italy', duration: '8 Hours', price: '$299', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=85', desc: 'Rent a private boat along the Amalfi coast visiting sea caves, cliff diving spots and hidden beaches.', category: 'Nautical' }
    ];

    var list = experiencesList;
    if (query) {
      var qClean = query.toLowerCase().trim();
      var matched = experiencesList.filter(function(e) {
        return (e.title && e.title.toLowerCase().includes(qClean)) ||
               (e.location && e.location.toLowerCase().includes(qClean)) ||
               (e.category && e.category.toLowerCase().includes(qClean)) ||
               (e.desc && e.desc.toLowerCase().includes(qClean));
      });
      if (matched.length > 0) list = matched;
    }

    var html = '';
    list.forEach(function(exp) {
      html += '<div class="glass-card service-hub-card" style="padding:0; overflow:hidden; border-radius:20px; border:1px solid rgba(74,222,128,0.2); background:#0f172a; display:flex; flex-direction:column;">';
      html += '<div style="position:relative; height:145px; overflow:hidden;">';
      html += '<img src="' + exp.img + '" alt="' + exp.title + '" onerror="this.onerror=null;this.src=\'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85\'" style="width:100%; height:100%; object-fit:cover;" />';
      html += '<div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%);"></div>';
      html += '<div style="position:absolute; top:9px; left:9px; background:rgba(74,222,128,0.15); border:1px solid rgba(74,222,128,0.4); color:#4ade80; font-size:10px; font-weight:700; padding:3px 9px; border-radius:9999px;">' + exp.category + '</div>';
      html += '</div>';
      html += '<div style="padding:13px 15px; display:flex; flex-direction:column; flex:1; justify-content:space-between;">';
      html += '<div><div style="font-size:10px; color:#38bdf8; font-weight:700; text-transform:uppercase; margin-bottom:2px;">&#128205; ' + exp.location + ' &middot; ' + exp.duration + '</div>';
      html += '<h3 style="font-size:14px; font-weight:800; color:#fff; margin-bottom:4px; line-height:1.3;">' + exp.emoji + ' ' + exp.title + '</h3>';
      html += '<p style="font-size:11px; color:#94a3b8; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">' + exp.desc + '</p></div>';
      html += '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">';
      html += '<div style="font-size:17px; font-weight:900; color:#fbbf24;">' + exp.price + ' <span style="font-size:11px; color:#94a3b8; font-weight:normal;">/ person</span></div>';
      html += '<button onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({id:\'' + exp.id + '\',title:\'' + exp.title + '\',price:\'' + exp.price + '\',location:\'' + exp.location + '\',duration:\'' + exp.duration + '\'}, \'experience\')" class="btn btn-primary btn-sm" style="font-size:11px; padding:8px 13px; border-radius:9999px; border:none; cursor:pointer; font-weight:800;">Book &#8594;</button>';
      html += '</div></div></div>';
    });
    grid.innerHTML = html;
  }

  function formatINR(price) {
    let num = Number(price);
    if (isNaN(num) || num <= 0) return '₹0';
    if (num < 10000) num = num * 100;
    return '₹' + num.toLocaleString('en-IN');
  }

  function formatDuration(item) {
    if (!item) return '7 Days / 6 Nights';
    if (item.duration && item.duration.includes('Nights')) return item.duration;
    let days = item.days || 7;
    let nights = item.nights || (days > 1 ? days - 1 : 1);
    return `${days} Days / ${nights} Nights`;
  }

  // 1. Render Destination Cards Grid
  function renderDestinationGrid(query) {
    const grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    let list = destinationCatalogDb;
    if (query) {
      const qClean = query.toLowerCase().trim();
      const matched = destinationCatalogDb.filter(d =>
        (d.name && d.name.toLowerCase().includes(qClean)) ||
        (d.country && d.country.toLowerCase().includes(qClean)) ||
        (d.city && d.city.toLowerCase().includes(qClean)) ||
        (d.type && d.type.toLowerCase().includes(qClean)) ||
        (d.highlights && d.highlights.some(h => h.toLowerCase().includes(qClean)))
      );
      if (matched.length > 0) list = matched;
    }

    window._servDestDb = list;
    grid.innerHTML = list.map((dest, i) => `
      <div class="glass-card service-hub-card" data-category="destinations" style="padding:0; overflow:hidden; display:flex; flex-direction:column; border:1px solid rgba(255,255,255,0.1); border-radius:12px; background:#0f172a;">
        <div style="position:relative; height:160px; overflow:hidden;">
          <img src="${dest.heroImg}" alt="${dest.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=95'" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease;" />
        </div>

        <div style="padding:14px 16px; display:flex; flex-direction:column; flex:1; justify-content:space-between;">
          <div>
            <div style="font-size:10px; color:#38bdf8; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:2px;">📍 ${dest.city ? dest.city.toUpperCase() + ' · ' : ''}${dest.country ? dest.country.toUpperCase() : 'GLOBAL'}</div>
            <h3 style="font-size:17px; font-weight:700; color:#fff; line-height:1.25; margin-bottom:6px;">${dest.name}</h3>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.08);">
              <div>
                <span style="font-size:10px; color:#94a3b8; text-transform:uppercase;">Starting From</span>
                <div style="font-size:17px; font-weight:900; color:#fbbf24;">${formatINR(dest.price || 180000)} <span style="font-size:10px; color:#94a3b8;">/ person</span></div>
              </div>
              <div style="text-align:right;">
                <div style="color:#fbbf24; font-size:12px; font-weight:700;">★ ${dest.rating}</div>
                <div style="font-size:11px; color:#94a3b8;">⏱️ ${formatDuration(dest)}</div>
              </div>
            </div>

            <div style="font-size:12px; color:#94a3b8; line-height:1.4; margin-bottom:10px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              👥 ${dest.includedGuests || 2} Guests Included · ${(dest.highlights && dest.highlights[0]) || 'Bespoke luxury itinerary.'}
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:auto;">
            <button class="btn btn-outline btn-sm" onclick="window.VentouraEnquiry.openDetailPage(window._servDestDb[${i}], 'destination')" style="font-size:11px; padding:7px 10px; border-radius:8px; justify-content:center;">Explore 🗺️</button>
            <button class="btn btn-primary btn-sm" onclick="window.VentouraEnquiry.openEnquiryModal(window._servDestDb[${i}], 'destination')" style="font-size:11px; padding:7px 10px; border-radius:8px; justify-content:center; text-align:center;">Book Now →</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 2. Render Hotels & Resorts Grid
  function renderHotelGrid(query) {
    const grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    let list = hotelCatalogDb;
    if (query) {
      const qClean = query.toLowerCase().trim();
      const matched = hotelCatalogDb.filter(h =>
        (h.name && h.name.toLowerCase().includes(qClean)) ||
        (h.location && h.location.toLowerCase().includes(qClean)) ||
        (h.specs && h.specs.toLowerCase().includes(qClean)) ||
        (h.amenities && h.amenities.some(a => a.toLowerCase().includes(qClean)))
      );
      if (matched.length > 0) list = matched;
    }

    window._servHotelDb = list;
    grid.innerHTML = list.map((h, i) => `
      <div class="glass-card service-hub-card" style="padding:0; overflow:hidden; display:flex; flex-direction:column; border:1px solid rgba(255,255,255,0.1); border-radius:12px; background:#0f172a;">
        <div style="position:relative; height:160px; overflow:hidden;">
          <img src="${h.heroImg}" alt="${h.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=3840&q=95'" style="width:100%; height:100%; object-fit:cover;" />
        </div>

        <div style="padding:14px 16px; display:flex; flex-direction:column; flex:1; justify-content:space-between;">
          <div>
            <div style="font-size:10px; color:#38bdf8; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:2px;">📍 ${h.location}</div>
            <h3 style="font-size:17px; font-weight:700; color:#fff; line-height:1.25; margin-bottom:6px;">${h.name}</h3>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.08);">
              <div>
                <span style="font-size:10px; color:#94a3b8; text-transform:uppercase;">From Per Night</span>
                <div style="font-size:17px; font-weight:900; color:#fbbf24;">${formatINR(h.price || 120000)} <span style="font-size:10px; color:#94a3b8;">/ night</span></div>
              </div>
              <div style="text-align:right;">
                <div style="color:#fbbf24; font-size:12px; font-weight:700;">★ ${h.rating}</div>
              </div>
            </div>

            <div style="font-size:12px; color:#94a3b8; line-height:1.4; margin-bottom:10px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              👥 ${h.includedGuests || 2} Guests · ${h.specs || 'Luxury hotel resort stay with 5-star amenities.'}
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:auto;">
            <button class="btn btn-outline btn-sm" onclick="window.VentouraEnquiry.openDetailPage(window._servHotelDb[${i}], 'hotel')" style="font-size:11px; padding:7px 10px; border-radius:8px; justify-content:center;">View Hotel 🏨</button>
            <button class="btn btn-primary btn-sm" onclick="window.VentouraEnquiry.openEnquiryModal(window._servHotelDb[${i}], 'hotel')" style="font-size:11px; padding:7px 10px; border-radius:8px; justify-content:center; text-align:center;">Book Room →</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 3. Render Flights Grid
  function renderFlightGrid(query) {
    const grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    let list = flightCatalogDb;
    if (query) {
      const qClean = query.toLowerCase().trim();
      const matched = flightCatalogDb.filter(f =>
        (f.airline && f.airline.toLowerCase().includes(qClean)) ||
        (f.route && f.route.toLowerCase().includes(qClean)) ||
        (f.cabin && f.cabin.toLowerCase().includes(qClean))
      );
      if (matched.length > 0) list = matched;
    }

    window._servFlightDb = list;
    grid.innerHTML = list.map((f, i) => `
      <div class="glass-card service-hub-card" style="padding:20px; border:1px solid rgba(255,255,255,0.1); border-radius:20px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:32px;">${f.logo}</span>
              <div>
                <div style="font-size:18px; font-weight:800; color:#fff;">${f.airline}</div>
                <div style="font-size:12px; color:#38bdf8; font-weight:700;">${f.cabin}</div>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:20px; font-weight:900; color:#fbbf24;">${formatINR(f.price || 78000)}</div>
              <div style="font-size:10px; color:#94a3b8;">per seat</div>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:12px 16px; border-radius:14px; margin-bottom:14px;">
            <div style="font-size:14px; font-weight:800; color:#fff; margin-bottom:4px;">${f.route}</div>
            <div style="font-size:12px; color:#94a3b8;">⏱️ Duration: ${f.duration}</div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:16px;">
            ${f.features.map(feat => '<div style="font-size:11px; color:#cbd5e1;">✓ ' + feat + '</div>').join('')}
          </div>

        </div>

        <button class="btn btn-primary btn-sm" onclick="window.VentouraEnquiry.openEnquiryModal(window._servFlightDb[${i}], 'flight')" style="width:100%; justify-content:center; padding:12px; font-size:13px; font-weight:800; border-radius:9999px;">
          Book Flight ✈️
        </button>
      </div>
    `).join('');
  }

  // 4. Render Cruises Grid
  function renderCruiseGrid(query) {
    const grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    let list = cruiseCatalogDb;
    if (query) {
      const qClean = query.toLowerCase().trim();
      const matched = cruiseCatalogDb.filter(c =>
        (c.name && c.name.toLowerCase().includes(qClean)) ||
        (c.vessel && c.vessel.toLowerCase().includes(qClean)) ||
        (c.route && c.route.toLowerCase().includes(qClean))
      );
      if (matched.length > 0) list = matched;
    }

    window._servCruiseDb = list;
    grid.innerHTML = list.map((c, i) => `
      <div class="glass-card service-hub-card" style="padding:0; overflow:hidden; display:flex; flex-direction:column; border:1px solid rgba(255,255,255,0.1); border-radius:12px; background:#0f172a;">
        <div style="position:relative; height:160px; overflow:hidden;">
          <img src="${c.heroImg}" alt="${c.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1548574505-5e2386903d8f?auto=format&fit=crop&w=3840&q=95'" style="width:100%; height:100%; object-fit:cover;" />
        </div>

        <div style="padding:14px 16px; display:flex; flex-direction:column; flex:1; justify-content:space-between;">
          <div>
            <div style="font-size:10px; color:#38bdf8; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:2px;">⏱️ ${formatDuration(c)} · ${c.vessel || ''}</div>
            <h3 style="font-size:17px; font-weight:700; color:#fff; line-height:1.25; margin-bottom:6px;">${c.name}</h3>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.08);">
              <div>
                <span style="font-size:10px; color:#94a3b8; text-transform:uppercase;">Starting Price</span>
                <div style="font-size:17px; font-weight:900; color:#fbbf24;">${formatINR(c.price || 189900)} <span style="font-size:10px; color:#94a3b8;">/ cabin</span></div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:11px; color:#38bdf8; font-weight:700;">${c.cabin}</div>
              </div>
            </div>

            <div style="font-size:12px; color:#94a3b8; line-height:1.4; margin-bottom:10px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              📍 ${c.route} · ${c.dining || 'All-Inclusive Michelin Dining'}
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:auto;">
            <button class="btn btn-outline btn-sm" onclick="window.VentouraEnquiry.openDetailPage(window._servCruiseDb[${i}], 'cruise')" style="font-size:11px; padding:7px 10px; border-radius:8px; justify-content:center;">View Details 🔍</button>
            <button class="btn btn-primary btn-sm" onclick="window.VentouraEnquiry.openEnquiryModal(window._servCruiseDb[${i}], 'cruise')" style="font-size:11px; padding:7px 10px; border-radius:8px; justify-content:center; text-align:center;">Book Cruise →</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 5. Render Car & Transfers Grid
  function renderTransportGrid(query) {
    const grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    let list = transportCatalogDb;
    if (query) {
      const qClean = query.toLowerCase().trim();
      const matched = transportCatalogDb.filter(t =>
        (t.title && t.title.toLowerCase().includes(qClean)) ||
        (t.vehicle && t.vehicle.toLowerCase().includes(qClean)) ||
        (t.capacity && t.capacity.toLowerCase().includes(qClean))
      );
      if (matched.length > 0) list = matched;
    }

    grid.innerHTML = list.map(t => `
      <div class="glass-card service-hub-card" style="padding:20px; border:1px solid rgba(255,255,255,0.1); border-radius:20px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <div>
              <span class="badge badge-accent" style="font-size:11px; padding:3px 10px; font-weight:800; border-radius:9999px; margin-bottom:6px;">🚗 ${t.capacity}</span>
              <h3 style="font-size:18px; font-weight:800; color:#fff;">${t.title}</h3>
              <div style="font-size:13px; color:#38bdf8; font-weight:700;">${t.vehicle}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:22px; font-weight:900; color:#fbbf24;">${t.price}</div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin:14px 0 16px 0;">
            ${t.features.map(f => '<div style="font-size:11px; color:#cbd5e1;">✓ ' + f + '</div>').join('')}
          </div>

        </div>

        <button onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({title:'${t.title}', price:'${t.rate}', location:'${t.type}'}, 'transport')" class="btn btn-primary btn-sm" style="width:100%; justify-content:center; padding:12px; font-size:13px; font-weight:800; border-radius:9999px; border:none; cursor:pointer;">
          Book Transfer Service 🚗
        </button>
      </div>
    `).join('');
  }

  // 6. Render Visa & Passport Services Grid
  function renderVisaGrid(query) {
    const grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    let list = visaCatalogDb;
    if (query) {
      const qClean = query.toLowerCase().trim();
      const matched = visaCatalogDb.filter(v =>
        (v.title && v.title.toLowerCase().includes(qClean)) ||
        (v.country && v.country.toLowerCase().includes(qClean)) ||
        (v.type && v.type.toLowerCase().includes(qClean))
      );
      if (matched.length > 0) list = matched;
    }

    grid.innerHTML = list.map(v => `
      <div class="glass-card service-hub-card" style="padding:20px; border:1px solid rgba(255,255,255,0.1); border-radius:20px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <div>
              <span style="font-size:28px;">${v.country.split(' ')[0]}</span>
              <h3 style="font-size:18px; font-weight:800; color:#fff; margin-top:4px;">${v.title}</h3>
              <div style="font-size:12px; color:#38bdf8; font-weight:700;">${v.type}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:22px; font-weight:900; color:#fbbf24;">${v.fee}</div>
              <div style="font-size:10px; color:#34d399; font-weight:700;">⏱️ ${v.processingTime}</div>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:12px; margin:12px 0 16px 0;">
            <div style="font-size:11px; font-weight:800; color:#94a3b8; margin-bottom:4px; text-transform:uppercase;">Required Documents:</div>
            ${v.reqs.map(r => '<div style="font-size:11px; color:#cbd5e1;">• ' + r + '</div>').join('')}
          </div>

        </div>

        <button onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({title:'${v.title}', price:'${v.fee}', location:'${v.country}'}, 'visa')" class="btn btn-primary btn-sm" style="width:100%; justify-content:center; padding:12px; font-size:13px; font-weight:800; border-radius:9999px; border:none; cursor:pointer;">
          Apply For Visa 📋
        </button>
      </div>
    `).join('');
  }


  // 7. Render Photo Gallery Grid
  function renderGalleryGrid() {
    const grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    const galleryPhotos = [
      { url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=3840&q=95', title: 'Amalfi Coast Yachting', loc: 'Positano, Italy' },
      { url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=3840&q=95', title: 'Arashiyama Bamboo Forest', loc: 'Kyoto, Japan' },
      { url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=3840&q=95', title: 'Private Overwater Villa', loc: 'Baa Atoll, Maldives' },
      { url: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=3840&q=95', title: 'Torres del Paine Glacier', loc: 'Patagonia, Chile' },
      { url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=3840&q=95', title: 'Alpine Heli-Ski Resort', loc: 'St. Moritz, Switzerland' },
      { url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=3840&q=95', title: 'Serengeti Savannah Safari', loc: 'Seronera, Tanzania' },
      { url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=3840&q=95', title: 'Oia Cliffside Caldera Sunset', loc: 'Santorini, Greece' },
      { url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=3840&q=95', title: 'Eiffel Tower Twilight View', loc: 'Paris, France' },
      { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3840&q=95', title: 'Burj Khalifa Skyline', loc: 'Dubai, UAE' }
    ];

    grid.innerHTML = galleryPhotos.map(p => `
      <div class="glass-card service-hub-card" style="padding:0; overflow:hidden; border-radius:20px; position:relative; height:260px; cursor:pointer;" onclick="if(typeof window.openImageLightbox === 'function') window.openImageLightbox('${p.url}')">
        <img src="${p.url}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease;" />
        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%);"></div>
        <div style="position:absolute; bottom:16px; left:16px; right:16px;">
          <div style="font-size:12px; color:#38bdf8; font-weight:700;">📍 ${p.loc}</div>
          <div style="font-size:18px; font-weight:800; color:#fff; line-height:1.2; margin-top:2px;">${p.title}</div>
        </div>
      </div>
    `).join('');
  }

  async function syncCmsData() {
    try {
      const [pkgRes, destRes, hotelRes, cruiseRes, flightRes, transportRes] = await Promise.all([
        fetch('/api/packages').then(r => r.json()).catch(() => null),
        fetch('/api/destinations').then(r => r.json()).catch(() => null),
        fetch('/api/hotels').then(r => r.json()).catch(() => null),
        fetch('/api/cruises').then(r => r.json()).catch(() => null),
        fetch('/api/flights').then(r => r.json()).catch(() => null),
        fetch('/api/cars').then(r => r.json()).catch(() => null)
      ]);

      if (pkgRes && pkgRes.success && Array.isArray(pkgRes.data) && pkgRes.data.length > 0) {
        packageCatalogDb = pkgRes.data.map(p => {
          const pkgId = p.id || p._id;
          const imgUrl = p.featuredImage || p.image || p.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=95';
          return {
            id: pkgId,
            category: p.category || 'luxury',
            altCategories: ['all', 'luxury', p.category || 'beach'],
            title: p.title || p.name,
            country: p.destination || p.country || 'Global Destination',
            city: p.city || p.destination || '',
            rating: p.rating || 5.0,
            reviewsCount: p.reviewsCount || 150,
            price: typeof p.price === 'number' ? '₹' + p.price.toLocaleString('en-IN') : (p.price || '₹1,80,000'),
            originalPrice: typeof p.price === 'number' ? '₹' + Math.round(p.price * 1.2).toLocaleString('en-IN') : '₹2,20,000',
            discount: p.badge || 'SPECIAL',
            duration: p.duration || `${p.days || 7} Days / ${(p.days ? p.days - 1 : 6)} Nights`,
            durationDays: p.days || 7,
            dates: 'Daily Departures · 2026 Season',
            hotel: p.hotelName || '5★ Luxury Resort & Suite',
            hotelRating: '5.0 ★ Luxury Hotel',
            hotelAmenities: ['Private Suite View', 'Spa & Pool', '24/7 Butler Service', 'Breakfast Included'],
            meals: ['Breakfast Included', 'Gourmet Lunch', 'Dinner'],
            transportation: ['Roundtrip Transfers', 'Private Chauffeur'],
            heroImg: imgUrl,
            destImg: imgUrl,
            gallery: p.gallery || [imgUrl],
            overview: p.description || 'Curated luxury trip with exclusive guided tours and 5-star accommodations.',
            description: p.description || 'Curated luxury trip with exclusive guided tours and 5-star accommodations.',
            itineraryPreview: p.itinerary || [
              'Day 1: VIP Arrival & Luxury Suite Check-in',
              'Day 2–6: Guided Sightseeing & Private Tours',
              'Day 7: Farewell Breakfast & Chauffeur Transfer'
            ],
            status: p.status || 'published'
          };
        });
      }

      if (destRes && destRes.success && Array.isArray(destRes.data) && destRes.data.length > 0) {
        destinationCatalogDb = destRes.data.map(item => {
          const imgUrl = item.image || item.heroImg || item.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=95';
          return {
            id: item.id || item._id,
            name: item.title || item.name,
            country: item.country || 'Global',
            city: item.city || item.location || '',
            heroImg: imgUrl,
            price: item.startingPrice || item.starting_price || item.price || 180000,
            rating: item.rating || 4.9,
            reviews: 180,
            type: item.category || 'Luxury Destination',
            duration: `${item.days || 7} Days`,
            hotel: '5★ Luxury Resort Stay',
            bestSeason: item.bestSeason || 'Year-Round Luxury',
            included: ['VIP Transfer', '5-Star Resort', 'Private Excursions'],
            highlights: [item.description || 'Exclusive bespoke itinerary tailored with luxury accommodations.']
          };
        });
      }

      if (hotelRes && hotelRes.success && Array.isArray(hotelRes.data) && hotelRes.data.length > 0) {
        hotelCatalogDb = hotelRes.data.map(item => {
          const imgUrl = item.heroImage || item.heroImg || item.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=3840&q=95';
          return {
            id: item.id || item._id,
            name: item.name || item.title,
            location: item.location || item.city || item.country || 'Luxury Location',
            heroImg: imgUrl,
            price: item.price || 120000,
            rating: item.starRating || item.rating || '5.0',
            reviews: 210,
            specs: item.description || 'Luxury resort stay with world-class amenities.',
            amenities: item.amenities || ['Infinity Pool', 'Spa & Wellness', 'Michelin Dining', '24/7 Butler']
          };
        });
      }

      if (cruiseRes && cruiseRes.success && Array.isArray(cruiseRes.data) && cruiseRes.data.length > 0) {
        cruiseCatalogDb = cruiseRes.data.map(item => {
          const imgUrl = item.image || item.heroImg || 'https://images.unsplash.com/photo-1548574505-5e2386903d8f?auto=format&fit=crop&w=3840&q=95';
          return {
            id: item.id || item._id,
            name: item.title || item.name || item.vessel,
            vessel: item.vessel || item.title || 'Royal Symphony',
            route: item.route || item.vessel || 'Mediterranean Voyage',
            duration: item.duration || `${item.days || 7} nights`,
            heroImg: imgUrl,
            price: item.price || 189900,
            cabin: item.cabin || 'Oceanview Balcony Stateroom',
            dining: item.dining || 'All-Inclusive Michelin Dining',
            entertainment: 'Broadway Stage Shows'
          };
        });
      }

      if (flightRes && flightRes.success && Array.isArray(flightRes.data) && flightRes.data.length > 0) {
        flightCatalogDb = flightRes.data.map(item => ({
          id: item.id || item._id,
          airline: item.airline || item.name || 'Emirates First Class',
          logo: item.logo || '✈️',
          cabin: item.cabin || item.class || 'First Class Suite',
          route: item.route || item.from_to || 'Dubai (DXB) → London (LHR)',
          price: item.price || 78000,
          duration: item.duration || '7h 45m Direct',
          features: item.features || ['Private Suite', 'Shower Spa', 'Fine Champagne', 'VIP Chauffeur']
        }));
      }

      if (transportRes && transportRes.success && Array.isArray(transportRes.data) && transportRes.data.length > 0) {
        transportCatalogDb = transportRes.data.map(item => ({
          id: item.id || item._id,
          title: item.title || item.vehicle || item.name,
          vehicle: item.vehicle || item.type || 'Mercedes-Maybach S-Class',
          capacity: item.capacity || '3 Passengers · 3 Bags',
          price: typeof item.price === 'number' ? '₹' + item.price.toLocaleString('en-IN') : (item.price || '₹15,000 / day'),
          rate: item.price || 15000,
          features: item.features || ['Private Chauffeur', 'Flight Tracking', 'Complimentary Water & WiFi']
        }));
      }

      // Re-trigger active grid rendering with fresh Supabase data
      const urlParams = new URLSearchParams(window.location.search);
      const activeCat = urlParams.get('cat') || urlParams.get('category') || urlParams.get('service') || '';
      const activeQuery = urlParams.get('q') || urlParams.get('search') || urlParams.get('query') || '';
      if (typeof window.renderActiveServiceTab === 'function') {
        window.renderActiveServiceTab(activeCat || 'all', activeQuery);
      }
    } catch (e) {
      console.warn('[Services.js] Error syncing CMS data:', e);
    }
  }

  // URL category routing is already handled by initServiceFilters() above.
  // No duplicate handling needed here.
  document.addEventListener('DOMContentLoaded', syncCmsData);

  function initPackageSubCategories() {

    const subChips = document.querySelectorAll('.pkg-sub-chip');
    subChips.forEach(chip => {
      chip.addEventListener('click', () => {
        subChips.forEach(c => {
          c.classList.remove('active');
          c.style.background = 'rgba(255,255,255,0.06)';
          c.style.color = '#cbd5e1';
        });
        chip.classList.add('active');
        chip.style.background = 'var(--accent)';
        chip.style.color = '#0f172a';

        const subCat = chip.dataset.pkgCat || 'all';
        renderPackageGrid(subCat);
      });
    });
  }

  // Render Tour Package Cards Grid dynamically
  function renderPackageGrid(subCat, query) {
    const grid = document.getElementById('services-hub-grid');
    if (!grid) return;

    let filtered = packageCatalogDb;
    if (subCat && subCat !== 'all') {
      filtered = packageCatalogDb.filter(p => p.category === subCat || (p.altCategories && p.altCategories.includes(subCat)));
    }

    if (query) {
      const qClean = query.toLowerCase().trim();
      const matched = filtered.filter(p =>
        (p.title && p.title.toLowerCase().includes(qClean)) ||
        (p.country && p.country.toLowerCase().includes(qClean)) ||
        (p.city && p.city.toLowerCase().includes(qClean)) ||
        (p.overview && p.overview.toLowerCase().includes(qClean))
      );
      if (matched.length > 0) filtered = matched;
    }

    if (filtered.length === 0) {
      filtered = packageCatalogDb;
    }

    grid.innerHTML = filtered.map(pkg => `
      <div class="glass-card service-hub-card" data-category="packages" style="padding:0; overflow:hidden; display:flex; flex-direction:column; border:1px solid rgba(255,255,255,0.1); border-radius:20px; background:#0f172a;">
        <div style="position:relative; height:210px; overflow:hidden;">
          <img src="${pkg.heroImg}" alt="${pkg.title}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=95'" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease;" />
          <button class="package-wishlist" data-id="${pkg.id}" style="position:absolute; top:12px; right:12px; background:rgba(15,23,42,0.6); border:1px solid rgba(255,255,255,0.2); width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; cursor:pointer;" aria-label="Add to Wishlist">❤️</button>
        </div>

        <div style="padding:18px 20px; display:flex; flex-direction:column; flex:1; justify-content:space-between;">
          <div>
            <div style="font-size:11px; color:#38bdf8; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">📍 ${pkg.country} ${pkg.city ? '· ' + pkg.city : ''}</div>
            <h3 style="font-size:20px; font-weight:800; color:#fff; line-height:1.3; margin-bottom:8px;">${pkg.title}</h3>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.08);">
              <div>
                <span style="font-size:11px; color:#94a3b8; text-decoration:line-through;">${pkg.originalPrice}</span>
                <span style="font-size:20px; font-weight:900; color:#fbbf24; margin-left:6px;">${pkg.price}</span>
                <span style="font-size:11px; color:#94a3b8;">/ person</span>
              </div>
              <div style="text-align:right;">
                <div style="color:#fbbf24; font-size:12px; font-weight:700;">★ ${pkg.rating}</div>
                <div style="font-size:11px; color:#94a3b8;">📅 ${pkg.duration}</div>
              </div>
            </div>

            <div style="font-size:13px; color:#94a3b8; line-height:1.5; margin-bottom:14px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              ${pkg.overview || (pkg.itineraryPreview && pkg.itineraryPreview[0]) || 'Curated luxury tour package featuring 5-star hotels and private transfers.'}
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:auto;">
            <button class="btn btn-outline btn-sm pkg-details-btn" data-pkg-id="${pkg.id}" style="font-size:12px; padding:10px; border-radius:9999px; justify-content:center;">View Details 🔍</button>
            <button type="button" class="btn btn-primary btn-sm pkg-book-btn" data-pkg-id="${pkg.id}" style="font-size:12px; padding:10px; border-radius:9999px; justify-content:center; border:none; cursor:pointer;">Book Now →</button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to View Details buttons & Wishlist buttons
    document.querySelectorAll('.pkg-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pkgId = btn.dataset.pkgId;
        openPackageDetailsModal(pkgId);
      });
    });

    // Attach Book Now to enquiry modal (not checkout.html)
    document.querySelectorAll('.pkg-book-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pkgId = btn.dataset.pkgId;
        const pkg = packageCatalogDb.find(p => String(p.id) === String(pkgId));
        if (pkg && window.VentouraEnquiry) {
          window.VentouraEnquiry.openEnquiryModal(pkg, 'package');
        } else if (window.VentouraEnquiry) {
          window.VentouraEnquiry.openEnquiryModal({id: pkgId}, 'package');
        }
      });
    });

    document.querySelectorAll('.package-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = btn.closest('.package-card, .destination-card, .hotel-card, .cruise-card');
        const id = btn.dataset.id || card?.dataset.dest || card?.dataset.id;
        const title = card?.querySelector('.package-title, .destination-name, .dest-title, .hotel-name, .cruise-name, h3')?.textContent.trim() || 'Saved Package';
        const location = card?.querySelector('.package-location, .destination-country, .dest-location, .hotel-location, .cruise-route')?.textContent.trim() || 'Global Spot';
        const priceStr = card?.querySelector('.price-tag, .dest-price, .hotel-price, .destination-meta span:nth-child(2)')?.textContent.trim() || '₹1,80,000';
        const img = card?.querySelector('img')?.src || 'assets/images/dest-maldives.jpg';

        if (window.VentouraWishlist) {
          window.VentouraWishlist.toggleItem({ id, title, location, price: priceStr, image: img });
        }
      });
    });
  }


  // ═══════════════════════════════════════════════════
  // PACKAGE DETAILS FULL-SCREEN MODAL RENDERER
  // ═══════════════════════════════════════════════════
  function openPackageDetailsModal(pkgId) {
    const modal = document.querySelector('.details-modal');
    const container = document.querySelector('#details-modal-container') || document.querySelector('#destination-modal-content');
    if (!modal || !container) return;

    const pkg = (window.VentouraDatabase && window.VentouraDatabase.getPackage) ? 
                window.VentouraDatabase.getPackage(pkgId) : 
                (packageCatalogDb.find(p => p.id === pkgId) || packageCatalogDb[0]);

    // Save active package draft for checkout
    try {
      localStorage.setItem('wanderlux_selected_package', JSON.stringify(pkg));
    } catch(e) {}

    const galleryImages = pkg.gallery || [pkg.image];
    const hotel = pkg.hotel || { name: '5-Star Luxury Resort', rating: '5.0', roomType: 'Deluxe Suite', amenities: ['Free Wi-Fi', 'Spa', 'Pool'] };
    const flight = pkg.flight || { airline: 'Emirates', flightNo: 'EK-202', dep: 'JFK 11:00 PM', arr: 'DXB 7:45 PM', cabin: 'Business Class', baggage: '2x 32kg', duration: '12.5 hrs' };

    container.innerHTML = `
      <div class="details-hero" style="position:relative; height:340px; border-radius:24px 24px 0 0; overflow:hidden;">
        <img src="${pkg.heroImage || pkg.image}" alt="${pkg.title}" style="width:100%; height:100%; object-fit:cover;" />
        <div style="position:absolute; inset:0; background:linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.4) 60%, transparent 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:28px;">
          <h2 style="font-family:'Cormorant Garamond',serif; font-size:clamp(26px,4vw,38px); font-weight:700; color:#fff; margin-bottom:4px; line-height:1.1;">${pkg.title}</h2>
          <div style="font-size:15px; color:#38bdf8; font-weight:600;">📍 ${pkg.country} · ${pkg.location}</div>
        </div>
      </div>

      <div style="background:#0f172a; padding:28px; color:#f8fafc; border-radius:0 0 24px 24px;">
        
        <!-- Key Specifications Bar -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:18px; border-radius:16px; margin-bottom:24px;">
          <div><div style="font-size:11px; color:#94a3b8; font-weight:600;">STARTING PRICE</div><div style="font-size:24px; font-weight:900; color:#fbbf24;">${pkg.startingPrice || '$' + pkg.basePrice}</div></div>
          <div><div style="font-size:11px; color:#94a3b8; font-weight:600;">DURATION</div><div style="font-size:15px; font-weight:700; color:#fff;">${pkg.duration}</div></div>
          <div><div style="font-size:11px; color:#94a3b8; font-weight:600;">RATING</div><div style="font-size:15px; font-weight:800; color:#fbbf24;">${pkg.rating}</div></div>
          <div><div style="font-size:11px; color:#94a3b8; font-weight:600;">BEST TIME TO VISIT</div><div style="font-size:13px; font-weight:700; color:#fff;">${pkg.bestTime || 'Year-round'}</div></div>
          <div><div style="font-size:11px; color:#94a3b8; font-weight:600;">LIVE WEATHER</div><div style="font-size:13px; font-weight:700; color:#38bdf8;">${pkg.weather || '☀️ 24°C'}</div></div>
        </div>

        <!-- Destination Overview -->
        <div style="margin-bottom:24px;">
          <h3 style="font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:700; color:#fff; margin-bottom:8px;">📋 Destination Overview & Highlights</h3>
          <p style="font-size:15px; color:#cbd5e1; line-height:1.7;">${pkg.description}</p>
        </div>

        <!-- Photo Gallery Grid -->
        <div style="margin-bottom:24px;">
          <h3 style="font-size:16px; font-weight:800; color:#fff; margin-bottom:12px;">🖼️ Photorealistic Destination Gallery</h3>
          <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px;">
            ${galleryImages.map(img => '<img src="' + img + '" alt="' + pkg.title + '" style="width:100%; height:100px; object-fit:cover; border-radius:12px; border:1px solid rgba(255,255,255,0.1);" />').join('')}
          </div>

        </div>

        <!-- Destination Details Specs (Currency, Language, Visa) -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap:12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:16px; border-radius:16px; margin-bottom:24px; font-size:13px;">
          <div><strong style="color:#fbbf24;">💱 Currency:</strong> ${pkg.currency || 'USD'}</div>
          <div><strong style="color:#fbbf24;">🗣️ Language:</strong> ${pkg.language || 'English'}</div>
          <div><strong style="color:#fbbf24;">🛂 Visa Status:</strong> ${pkg.visa || 'Free Visa / VOA'}</div>
        </div>

        <!-- Included Hotel & Flight Grid -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:20px; border-radius:16px;">
            <h3 style="font-size:16px; font-weight:800; color:#38bdf8; margin-bottom:8px;">🏨 Included 5-Star Hotel</h3>
            <div style="font-size:15px; font-weight:700; color:#fff; margin-bottom:4px;">${hotel.name}</div>
            <div style="font-size:13px; color:#cbd5e1; margin-bottom:10px;">Room: <strong>${hotel.roomType}</strong></div>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
              ${(hotel.amenities || []).map(a => '<span style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); color:#38bdf8; font-size:11px; padding:3px 10px; border-radius:9999px;">✓ ' + a + '</span>').join('')}
            </div>

          </div>

          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:20px; border-radius:16px;">
            <h3 style="font-size:16px; font-weight:800; color:#34d399; margin-bottom:8px;">✈️ Included Flight Details</h3>
            <div style="font-size:15px; font-weight:700; color:#fff; margin-bottom:4px;">${flight.airline} (${flight.flightNo})</div>
            <div style="font-size:13px; color:#cbd5e1; line-height:1.6;">
              <div><strong>Dep:</strong> ${flight.dep}</div>
              <div><strong>Arr:</strong> ${flight.arr} (${flight.duration})</div>
              <div><strong>Cabin:</strong> ${flight.cabin} · Baggage: ${flight.baggage}</div>
            </div>
          </div>
        </div>

        <!-- Package Includes & Excludes -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:28px;">
          <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.25); padding:18px; border-radius:16px;">
            <h4 style="font-size:15px; font-weight:800; color:#34d399; margin-bottom:10px;">Package Includes (✔)</h4>
            <div style="font-size:13px; color:#cbd5e1; display:flex; flex-direction:column; gap:6px;">
              ${(pkg.includes || ['Roundtrip Flights', '5-Star Hotel Stay', 'Airport Transfers', 'Daily Breakfast', 'Guided Excursions', 'Travel Insurance']).map(inc => '<div>' + inc + '</div>').join('')}
            </div>

          </div>

          <div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.25); padding:18px; border-radius:16px;">
            <h4 style="font-size:15px; font-weight:800; color:#f87171; margin-bottom:10px;">Package Excludes (✖)</h4>
            <div style="font-size:13px; color:#cbd5e1; display:flex; flex-direction:column; gap:6px;">
              ${(pkg.excludes || ['Personal Souvenir Shopping', 'Alcoholic Drinks outside meal plan', 'Optional Extreme Sports', 'Personal Expenses']).map(exc => '<div>' + exc + '</div>').join('')}
            </div>

          </div>
        </div>



        <!-- Action Bar -->
        <div style="display:flex; gap:16px; justify-content:space-between; align-items:center; padding-top:20px; border-top:1px solid rgba(255,255,255,0.1); flex-wrap:wrap;">
          <div>
            <div style="font-size:12px; color:#94a3b8;">Total Package Rate:</div>
            <div style="font-size:28px; font-weight:900; color:#fbbf24;">${pkg.startingPrice || '$' + pkg.basePrice} <span style="font-size:13px; color:#94a3b8; font-weight:normal;">/ person</span></div>
          </div>
          <button type="button" class="btn btn-primary btn-lg" id="pkg-modal-book-now" style="padding:14px 36px; font-size:16px; font-weight:800; border-radius:9999px; background:linear-gradient(135deg,#D4AF37,#C5A059); color:#000; border:none; cursor:pointer; box-shadow:0 10px 25px rgba(212,175,55,0.3);">
            ⚡ Book Now →
          </button>
        </div>

      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Wire Book Now to enquiry modal with the package data
    const pkgBookBtn = document.getElementById('pkg-modal-book-now');
    if (pkgBookBtn && window.VentouraEnquiry) {
      pkgBookBtn.addEventListener('click', () => {
        window.VentouraEnquiry.openEnquiryModal(pkg, 'package');
      });
    }
  }

  window.openPackageDetailsModal = openPackageDetailsModal;

  function initDetailsModal() {
    const modal = document.querySelector('.details-modal');
    const closeBtn = document.querySelector('.details-modal-close');

    document.querySelectorAll('.view-details-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.dataset.detailsId || 'dest-maldives';
        if (id.startsWith('pkg-')) {
          openPackageDetailsModal(id);
        } else if (typeof window.openTravelExperienceModal === 'function') {
          window.openTravelExperienceModal(id);
        } else {
          renderDetailsContent(id);
          if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  function renderDetailsContent(id) {
    const data = detailsDatabase[id] || detailsDatabase['dest-maldives'];
    const container = document.querySelector('#details-modal-container');
    if (!container) return;

    container.innerHTML = `
      <div class="details-hero">
        <img src="${data.image}" alt="${data.title}" />
        <div class="details-hero-overlay"></div>
        <div class="details-hero-content">
          <span class="badge badge-primary">${data.type}</span>
          <h2 class="section-title" style="font-size:32px;color:#fff;margin-top:6px">${data.title}</h2>
          <p style="color:rgba(255,255,255,0.8);font-size:16px">${data.subtitle}</p>
        </div>
      </div>
      <div class="details-body">
        <p style="color:var(--text-secondary);font-size:15px;line-height:1.7;margin-bottom:20px">${data.description || 'Full specifications available upon booking.'}</p>
        <button class="btn btn-primary" type="button" onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({}, 'package')">Enquire Now</button>

      </div>
    `;
  }
})();



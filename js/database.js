/* ============================================================
   DATABASE.JS — Centralized Unique Packages & Destinations Database
   Ventoura Travel Luxury Travel Agency
   ============================================================ */

(function () {
  'use strict';

  // Normalize any destination or package key string
  function normalizeDestKey(str) {
    if (!str) return 'tokyo';
    let s = String(str).toLowerCase().trim();
    s = s.replace(/^pkg-/, '').replace(/^dest-/, '').replace(/-\d+d$/, '');

    if (s.includes('tokyo')) return 'tokyo-6d';
    if (s.includes('kyoto')) return 'kyoto-5d';
    if (s.includes('maldives')) return 'maldives-5d';
    if (s.includes('bali')) return 'bali-5d';
    if (s.includes('santorini') || s.includes('greece') || s.includes('oia')) return 'santorini-4d';
    if (s.includes('paris') || s.includes('france')) return 'paris-4d';
    if (s.includes('swiss') || s.includes('switzerland') || s.includes('stmoritz') || s.includes('alps') || s.includes('zurich') || s.includes('lucerne')) return 'stmoritz-6d';
    if (s.includes('dubai') || s.includes('uae') || s.includes('burj')) return 'dubai-6d';
    if (s.includes('patagonia') || s.includes('chile') || s.includes('argentina')) return 'patagonia-6d';
    if (s.includes('serengeti') || s.includes('tanzania') || s.includes('ngorongoro')) return 'serengeti-7d';
    if (s.includes('amalfi') || s.includes('italy') || s.includes('positano') || s.includes('naples')) return 'amalfi-7d';
    if (s.includes('thailand') || s.includes('phuket') || s.includes('bangkok')) return 'thailand-5d';
    if (s.includes('singapore')) return 'singapore-4d';
    if (s.includes('norway') || s.includes('tromso') || s.includes('aurora')) return 'norway-6d';

    return s;
  }

  window.VentouraDatabase = {
    normalizeDestKey: normalizeDestKey,

    packages: {
      "tokyo-6d": {
        id: "tokyo-6d",
        key: "tokyo",
        title: "Tokyo Sanctuary & Cultural Explorer",
        country: "Japan 🇯🇵",
        location: "Tokyo, Japan",
        airport: "Narita (NRT) / Haneda (HND) Airport",
        duration: "6 Days / 5 Nights",
        daysCount: 6,
        basePrice: 189900,
        startingPrice: "₹1,89,900",
        rating: "⭐ 4.9 (240+ reviews)",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=3840&q=95",
        heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Experience Tokyo's neon skyline, ancient Senso-ji Temple, fast-track Tokyo Skytree, Mount Fuji & Lake Kawaguchi, Akihabara tech district, and Ginza luxury dining.",
        bestTime: "March – May & Sept – Nov",
        weather: "☀️ 22°C Pleasant & Sunny",
        currency: "JPY (¥)",
        language: "Japanese / English",
        visa: "Visa-Free 90 Days",
        hotel: {
          name: "Aman Tokyo (5-Star Luxury)",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Deluxe Palace View Suite",
          location: "Otemachi Financial Center, Tokyo",
          amenities: ["33rd Floor Infinity Pool", "Aman Spa & Onsen Bath", "2-Michelin Star Dining", "24/7 Personal Butler"]
        },
        flight: {
          airline: "Japan Airlines (JL-005)",
          flightNo: "JL-005",
          dep: "JFK (New York) 11:30 AM",
          arr: "HND (Tokyo Haneda) 3:15 PM +1",
          cabin: "First Class Suite",
          baggage: "2x 32kg Check-in",
          duration: "13.5 Hours"
        },
        includes: ["✔ Roundtrip First Class Flights", "✔ 5 Nights Aman Tokyo Palace View Suite", "✔ Private VIP Airport Transfers", "✔ Daily Gourmet Omakase Breakfast", "✔ Fast-Track Tokyo Skytree Entry", "✔ Mount Fuji Private Tour"],
        excludes: ["✖ Personal Souvenir Shopping", "✖ Unspecified Meals", "✖ Personal Spa Treatments"]
      },

      "kyoto-5d": {
        id: "kyoto-5d",
        key: "kyoto",
        title: "Kyoto Zen & Heritage Sanctuary",
        country: "Japan 🇯🇵",
        location: "Kyoto, Japan",
        airport: "Kansai International Airport (KIX)",
        duration: "5 Days / 4 Nights",
        daysCount: 5,
        basePrice: 169900,
        startingPrice: "₹1,69,900",
        rating: "⭐ 4.95 (180+ reviews)",
        image: "assets/images/dest-tokyo.jpg",
        heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "assets/images/dest-tokyo.jpg",
          "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Stroll through Fushimi Inari 10,000 crimson Torii gates, Arashiyama Bamboo Forest, Kinkaku-ji Golden Pavilion, and stay in a riverfront luxury ryokan with natural hot spring baths.",
        bestTime: "Spring (Sakura) & Autumn",
        weather: "🌸 19°C Mild & Pleasant",
        currency: "INR (₹)",
        language: "Japanese / English",
        visa: "Visa-Free 90 Days",
        hotel: {
          name: "Hoshinoya Kyoto Riverfront Ryokan",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Luxury River View Suite",
          location: "Arashiyama, Kyoto",
          amenities: ["Private Boat Arrival Escort", "Natural Thermal Onsen Bath", "Kaiseki Multi-Course Dining", "Zen Garden Platform"]
        },
        flight: {
          airline: "ANA All Nippon Airways (NH-012)",
          flightNo: "NH-012",
          dep: "LAX (Los Angeles) 1:00 PM",
          arr: "KIX (Osaka Kansai) 5:30 PM +1",
          cabin: "Business Class Suite",
          baggage: "2x 32kg Checked",
          duration: "11.5 Hours"
        },
        includes: ["✔ Roundtrip Business Class Flights", "✔ 4 Nights Hoshinoya Kyoto Ryokan", "✔ Private Boat Arrival Escort", "✔ Daily Multi-Course Kaiseki Breakfast & Dinner", "✔ Tea Ceremony Experience"],
        excludes: ["✖ Personal Souvenirs", "✖ Premium Wine Orders"]
      },

      "maldives-5d": {
        id: "maldives-5d",
        key: "maldives",
        title: "Maldives Overwater Paradise & Coral Sanctuary",
        country: "Maldives 🇲🇻",
        location: "Baa Atoll, Maldives",
        airport: "Velana International Airport (MLE)",
        duration: "5 Days / 4 Nights",
        daysCount: 5,
        basePrice: 249900,
        startingPrice: "₹2,49,900",
        rating: "⭐ 5.0 (310+ reviews)",
        image: "assets/images/dest-maldives.jpg",
        heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "assets/images/dest-maldives.jpg",
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Stay in a luxury overwater villa featuring private infinity pools, glass floor viewing panels, floating breakfasts, turtle reef snorkeling, island hopping, and subsea underwater fine dining.",
        bestTime: "November – April (Dry Season)",
        weather: "☀️ 29°C Tropical Blue",
        currency: "INR (₹)",
        language: "English / Dhivehi",
        visa: "30-Day Free Visa on Arrival",
        hotel: {
          name: "Anantara Dhigu Overwater Villa Resort",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Sunset Overwater Pool Villa",
          location: "South Malé Atoll, Maldives",
          amenities: ["Private Overwater Pool", "Glass Floor Panel", "Subsea Underwater Restaurant", "Overwater Spa Sanctuary"]
        },
        flight: {
          airline: "Qatar Airways (QR-672)",
          flightNo: "QR-672",
          dep: "DOH (Doha) 2:15 AM",
          arr: "MLE (Malé) 8:45 AM",
          cabin: "Qsuite Business Class",
          baggage: "2x 32kg Checked",
          duration: "4.5 Hours"
        },
        includes: ["✔ Seaplane / VIP Speedboat Airport Transfers", "✔ 4 Nights Sunset Overwater Villa with Pool", "✔ Daily Floating Villa Breakfast", "✔ Sea Turtle & Coral Reef Snorkeling", "✔ Sunset Dolphin Cruise"],
        excludes: ["✖ Motorized Jet Ski Rentals", "✖ Scuba Certification Fees"]
      },

      "bali-5d": {
        id: "bali-5d",
        key: "bali",
        title: "Bali Jungle Sanctuary & Coastal Retreat",
        country: "Indonesia 🇮🇩",
        location: "Ubud & Seminyak, Bali",
        airport: "Ngurah Rai International Airport (DPS)",
        duration: "5 Days / 4 Nights",
        daysCount: 5,
        basePrice: 129900,
        startingPrice: "₹1,29,900",
        rating: "⭐ 4.88 (420+ reviews)",
        image: "assets/images/dest-bali.jpg",
        heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "assets/images/dest-bali.jpg",
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Lush jungle valley luxury villas in Ubud, private rice terrace swings, Nusa Penida island speedboat tours, Kelingking T-Rex cliff, and sunset beach clubs in Seminyak.",
        bestTime: "April – October (Dry Season)",
        weather: "🌴 28°C Warm & Sunny",
        currency: "INR (₹)",
        language: "Indonesian / English",
        visa: "30-Day VOA",
        hotel: {
          name: "Four Seasons Resort Bali at Sayan",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Riverfront Pool Villa",
          location: "Sayan Valley, Ubud, Bali",
          amenities: ["Sacred Riverfront Infinity Pool", "Ayurvedic Spa Sanctuary", "Private Jungle Deck"]
        },
        flight: {
          airline: "Singapore Airlines (SQ-942)",
          flightNo: "SQ-942",
          dep: "SIN (Singapore) 9:20 AM",
          arr: "DPS (Bali) 12:05 PM",
          cabin: "Business Class",
          baggage: "2x 32kg Checked",
          duration: "2.5 Hours"
        },
        includes: ["✔ Roundtrip Flights via Singapore Airlines", "✔ 4 Nights Four Seasons Riverfront Villa", "✔ Tegallalang Rice Terrace & Jungle Swing Tour", "✔ Nusa Penida Speedboat & Kelingking Cliff Trip", "✔ 90-Minute Lulur Herbal Spa"],
        excludes: ["✖ Alcoholic Drinks outside meal plan", "✖ Souvenir purchases"]
      },

      "santorini-4d": {
        id: "santorini-4d",
        key: "santorini",
        title: "Santorini Clifftop Sunset & Aegean Escape",
        country: "Greece 🇬🇷",
        location: "Oia & Fira, Santorini, Greece",
        airport: "Santorini (Thira) International Airport (JTR)",
        duration: "4 Days / 3 Nights",
        daysCount: 4,
        basePrice: 139900,
        startingPrice: "₹1,39,900",
        rating: "⭐ 4.96 (280+ reviews)",
        image: "assets/images/dest-santorini.jpg",
        heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "assets/images/dest-santorini.jpg",
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Breathtaking Aegean sunsets over white-washed cliffside villages, Oia blue dome churches, Fira cobblestones, sommelier wine tasting tours, Red Beach swimming, and luxury catamaran volcano cruises.",
        bestTime: "May – October",
        weather: "☀️ 26°C Mediterranean Sunny",
        currency: "INR (₹)",
        language: "Greek / English",
        visa: "Schengen Visa",
        hotel: {
          name: "Canaves Oia Suites (5-Star Luxury)",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Executive Caldera View Cave Suite",
          location: "Oia Clifftop, Santorini",
          amenities: ["Private Heated Infinity Plunge Pool", "Caldera Sunset Terrace", "Sommelier Wine Cellar"]
        },
        flight: {
          airline: "Emirates & Aegean (A3-356)",
          flightNo: "A3-356",
          dep: "ATH (Athens) 4:00 PM",
          arr: "JTR (Santorini) 4:45 PM",
          cabin: "Business Class",
          baggage: "2x 32kg Checked",
          duration: "45 Mins"
        },
        includes: ["✔ 3 Nights Canaves Oia Executive Suite", "✔ Daily Champagne Breakfast on Terrace", "✔ Luxury Catamaran Cruise to Volcanic Springs", "✔ Sommelier Vineyard Wine Tasting", "✔ Private Airport Transfers"],
        excludes: ["✖ Souvenir Shopping in Oia", "✖ Additional Dinners"]
      },

      "paris-4d": {
        id: "paris-4d",
        key: "paris",
        title: "Parisian Romance & Haute Couture",
        country: "France 🇫🇷",
        location: "Paris, France",
        airport: "Paris Charles de Gaulle Airport (CDG)",
        duration: "4 Days / 3 Nights",
        daysCount: 4,
        basePrice: 175000,
        startingPrice: "₹1,75,000",
        rating: "⭐ 4.92 (350+ reviews)",
        image: "assets/images/dest-paris.jpg",
        heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "assets/images/dest-paris.jpg",
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Experience Eiffel Tower views, Louvre Museum art collections, Seine River sunset cruises, Arc de Triomphe, and Palace of Versailles Royal Hall of Mirrors.",
        bestTime: "April – June & Sept – Nov",
        weather: "🥐 21°C Pleasant Mild",
        currency: "INR (₹)",
        language: "French / English",
        visa: "Schengen Visa",
        hotel: {
          name: "Four Seasons Hotel George V Paris",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Eiffel Tower View Terrace Suite",
          location: "Avenue George V, Paris",
          amenities: ["Eiffel Tower View Terrace", "Le Spa & Heated Pool", "3 Michelin-Star Restaurant Le Cinq"]
        },
        flight: {
          airline: "Air France (AF-007)",
          flightNo: "AF-007",
          dep: "JFK (New York) 7:30 PM",
          arr: "CDG (Paris) 8:45 AM +1",
          cabin: "Business Class",
          baggage: "2x 32kg Checked",
          duration: "7.0 Hours"
        },
        includes: ["✔ Roundtrip Air France Business Class Flights", "✔ 3 Nights Four Seasons George V Palace Suite", "✔ Private After-Hours Louvre Mona Lisa Tour", "✔ Seine River Sunset Boat Charter", "✔ Versailles Palace Access"],
        excludes: ["✖ High Fashion Shopping on Champs-Élysées", "✖ Personal Expenses"]
      },

      "stmoritz-6d": {
        id: "stmoritz-6d",
        key: "switzerland",
        title: "Swiss Alps Alpine Escape & Glacier Express",
        country: "Switzerland 🇨🇭",
        location: "Zurich, Lucerne & St. Moritz, Switzerland",
        airport: "Zurich Airport (ZRH) / Geneva Airport (GVA)",
        duration: "6 Days / 5 Nights",
        daysCount: 6,
        basePrice: 195000,
        startingPrice: "₹1,95,000",
        rating: "⭐ 4.94 (190+ reviews)",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=3840&q=95",
        heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Journey through Zurich, Lucerne, Mount Titlis ice flyer, Interlaken, Jungfraujoch Top of Europe (3,454m), Grindelwald First cliff walk, and ride the Glacier Express train.",
        bestTime: "Dec – March & June – Sept",
        weather: "🏔️ 16°C Crisp Alpine Air",
        currency: "INR (₹)",
        language: "German / French / English",
        visa: "Schengen Visa",
        hotel: {
          name: "Badrutt's Palace Hotel St. Moritz",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Lake St. Moritz Alpine Suite",
          location: "Via Serlas, St. Moritz",
          amenities: ["Glacier View Balcony", "Palace Spa & Pool", "Glacier Express VIP Pass"]
        },
        flight: {
          airline: "SWISS International Air (LX-015)",
          flightNo: "LX-015",
          dep: "JFK (New York) 5:25 PM",
          arr: "ZRH (Zurich) 7:15 AM +1",
          cabin: "First Class",
          baggage: "2x 32kg Checked",
          duration: "7.8 Hours"
        },
        includes: ["✔ Roundtrip SWISS First Class Flights", "✔ 5 Nights Badrutt's Palace Suite", "✔ Glacier Express Excellence Class Train Pass", "✔ Mount Titlis Cable Car Pass", "✔ Jungfraujoch Top of Europe Pass"],
        excludes: ["✖ Ski Equipment Rental", "✖ Souvenir Purchasing"]
      },

      "dubai-6d": {
        id: "dubai-6d",
        key: "dubai",
        title: "Dubai Royal Mirage & Desert Safari",
        country: "United Arab Emirates 🇦🇪",
        location: "Dubai, UAE",
        airport: "Dubai International Airport (DXB)",
        duration: "6 Days / 5 Nights",
        daysCount: 6,
        basePrice: 219900,
        startingPrice: "₹2,19,900",
        rating: "⭐ 4.97 (480+ reviews)",
        image: "assets/images/dest-dubai.jpg",
        heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "assets/images/dest-dubai.jpg",
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Stay at 7-Star Burj Al Arab Jumeirah, enjoy VIP fast-track access to Burj Khalifa 148th floor, Dubai Mall, red desert 4x4 dune safari, and Palm Jumeirah marina superyacht cruise.",
        bestTime: "November – March",
        weather: "☀️ 27°C Sunny Warm",
        currency: "INR (₹)",
        language: "Arabic / English",
        visa: "Visa-Free / VOA for US/EU/UK",
        hotel: {
          name: "Burj Al Arab Jumeirah (7-Star)",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Deluxe Royal Two-Bedroom Suite",
          location: "Jumeirah Beach, Dubai",
          amenities: ["Helipad & Private Rolls-Royce Escort", "24-Karat Gold iPad", "Assawan Spa"]
        },
        flight: {
          airline: "Emirates (EK-202)",
          flightNo: "EK-202",
          dep: "JFK (New York) 11:00 PM",
          arr: "DXB (Dubai) 7:45 PM +1",
          cabin: "A380 First Class Shower Suite",
          baggage: "2x 32kg Checked",
          duration: "12.5 Hours"
        },
        includes: ["✔ Roundtrip Emirates A380 First Class Flights", "✔ 5 Nights Burj Al Arab 7-Star Suite", "✔ Rolls-Royce Phantom Airport Escort", "✔ Burj Khalifa 148th Floor Fast-Track Pass", "✔ Red Desert 4x4 Dune Safari"],
        excludes: ["✖ Gold Souk Jewellery Purchases", "✖ Designer Shopping"]
      },

      "patagonia-6d": {
        id: "patagonia-6d",
        key: "patagonia",
        title: "Patagonia Wilderness & Glacier Odyssey",
        country: "Chile 🇨🇱 / Argentina 🇦🇷",
        location: "Torres del Paine, Patagonia",
        airport: "Punta Arenas Airport (PUQ) / El Calafate (FTE)",
        duration: "6 Days / 5 Nights",
        daysCount: 6,
        basePrice: 345000,
        startingPrice: "₹3,45,000",
        rating: "⭐ 4.98 (130+ reviews)",
        image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=3840&q=95",
        heroImage: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Hike beneath towering granite horns of Torres del Paine, cruise across Lake Grey to trek on blue glacier ice, and savor traditional Chilean Estancia lamb BBQ.",
        bestTime: "November – March",
        weather: "🌬️ 14°C Fresh Nordic Air",
        currency: "INR (₹)",
        language: "Spanish / English",
        visa: "Visa-Free 90 Days",
        hotel: {
          name: "Tierra Patagonia Luxury All-Inclusive Lodge",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Torres View Suite",
          location: "Lake Sarmiento, Patagonia, Chile",
          amenities: ["Uma Spa & Hydrotherapy Pool", "Torres Mountain Views", "All-Inclusive Chef Dining"]
        },
        flight: {
          airline: "LATAM Airlines (LA-533)",
          flightNo: "LA-533",
          dep: "SCL (Santiago) 6:00 AM",
          arr: "PUQ (Punta Arenas) 9:30 AM",
          cabin: "Premium Business",
          baggage: "2x 32kg Checked",
          duration: "3.5 Hours"
        },
        includes: ["✔ All-Inclusive Tierra Patagonia Lodge Stay", "✔ Guided Base Las Torres Granite Towers Hike", "✔ Glacier Grey Catamaran & Ice Walk", "✔ Chilean Estancia Lamb BBQ"],
        excludes: ["✖ International Flights to Santiago", "✖ Extreme Climbing Gear"]
      },

      "serengeti-7d": {
        id: "serengeti-7d",
        key: "serengeti",
        title: "Serengeti Big Five Safari & Ngorongoro",
        country: "Tanzania 🇹🇿",
        location: "Serengeti & Ngorongoro, Tanzania",
        airport: "Kilimanjaro Airport (JRO) / Seronera Airstrip (SEU)",
        duration: "7 Days / 6 Nights",
        daysCount: 7,
        basePrice: 385000,
        startingPrice: "₹3,85,000",
        rating: "⭐ 5.0 (220+ reviews)",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=3840&q=95",
        heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Private 4x4 game drives to track the Big Five (Lions, Leopards, Elephants, Rhinos, Buffalos), dawn hot air balloon flight over Great Migration plains, and 600m Ngorongoro Crater descent.",
        bestTime: "June – October (Great Migration)",
        weather: "🦁 26°C Savannah Warm",
        currency: "INR (₹)",
        language: "Swahili / English",
        visa: "eVisa on Arrival ($50)",
        hotel: {
          name: "Four Seasons Safari Lodge Serengeti",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Waterhole View Suite",
          location: "Central Serengeti National Park",
          amenities: ["Private Waterhole Elephant Viewing Deck", "Boma Bush Platform", "Infinity Pool"]
        },
        flight: {
          airline: "Ethiopian Airlines & Coastal Aviation",
          flightNo: "ET-815",
          dep: "JRO (Kilimanjaro) 10:00 AM",
          arr: "SEU (Serengeti Airstrip) 11:00 AM",
          cabin: "Executive Bush Aircraft",
          baggage: "1x 23kg Soft Bag",
          duration: "1.0 Hour"
        },
        includes: ["✔ Private 4x4 Pop-Roof Land Cruiser Safari", "✔ 6 Nights Four Seasons Safari Lodge Suite", "✔ Dawn Hot Air Balloon Flight & Bush Breakfast", "✔ Ngorongoro Crater 600m Descent Pass", "✔ Maasai Village Visit"],
        excludes: ["✖ Tipping for Safari Driver Guides", "✖ Personal Souvenirs"]
      },

      "amalfi-7d": {
        id: "amalfi-7d",
        key: "amalfi",
        title: "Amalfi Coast Clifftop Escape & Capri Charter",
        country: "Italy 🇮🇹",
        location: "Positano, Amalfi & Capri, Italy",
        airport: "Naples International Airport (NAP)",
        duration: "7 Days / 6 Nights",
        daysCount: 7,
        basePrice: 285000,
        startingPrice: "₹2,85,000",
        rating: "⭐ 4.96 (210+ reviews)",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=3840&q=95",
        heroImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=3840&q=95",
        gallery: [
          "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=3840&q=95",
          "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=3840&q=95"
        ],
        description: "Cliffside pastel villages in Positano, private speed boat charter to Capri's Blue Grotto, Ravello Villa Cimbrone infinity terrace, limoncello tasting, and Michelin-starred coastal dining.",
        bestTime: "May – October",
        weather: "☀️ 27°C Mediterranean Warm",
        currency: "INR (₹)",
        language: "Italian / English",
        visa: "Schengen Visa",
        hotel: {
          name: "Le Sirenuse Positano & Hotel Santa Caterina",
          rating: "⭐⭐⭐⭐⭐ 5.0",
          roomType: "Positano Cliffside Sea View Suite",
          location: "Positano, Amalfi Coast",
          amenities: ["Private Sea View Terrace", "Saltwater Pool on Cliff", "Michelin Star La Sponda Restaurant"]
        },
        flight: {
          airline: "ITA Airways / Lufthansa",
          flightNo: "AZ-610",
          dep: "JFK (New York) 4:00 PM",
          arr: "NAP (Naples) 7:30 AM +1",
          cabin: "Business Class",
          baggage: "2x 32kg Checked",
          duration: "8.5 Hours"
        },
        includes: ["✔ 6 Nights Le Sirenuse & Santa Caterina Sea View Suite", "✔ Private Speedboat Charter to Capri & Blue Grotto", "✔ Ravello Villa Cimbrone & Limoncello Tasting", "✔ Private Mercedes Coastal Chauffeur Transfers"],
        excludes: ["✖ Personal Souvenir Purchases", "✖ Extra Meals"]
      }
    },

    syncWithBackend: async function () {
      try {
        const res = await fetch('/api/packages');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          json.data.forEach(p => {
            const key = normalizeDestKey(p.id || p._id || p.title);
            const imgUrl = p.featuredImage || p.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';
            const rawPrice = p.price || 199900;
            const inrVal = rawPrice < 10000 ? rawPrice * 100 : rawPrice;
            this.packages[key] = {
              id: p.id || p._id || key,
              key: key,
              title: p.title,
              country: p.destination || p.country || 'Global Destination',
              location: p.destination || p.location || 'Featured Location',
              duration: p.duration || `${p.days || 7} Days / 6 Nights`,
              basePrice: inrVal,
              startingPrice: '₹' + Number(inrVal).toLocaleString('en-IN'),
              rating: p.rating ? `⭐ ${p.rating}` : '⭐ 5.0 (New Package)',
              badge: p.badge || 'SPECIAL',
              image: imgUrl,
              heroImage: imgUrl,
              gallery: [imgUrl],
              description: p.description || 'Exclusive curated luxury travel package with 5-star resort accommodations.',
              status: p.status || 'published',
              includes: ['✔ Roundtrip VIP Airport Transfers', '✔ 5-Star Luxury Resort Stay', '✔ Guided Excursions & Sightseeing', '✔ Gourmet Meals Included'],
              excludes: ['✖ Personal Expenses', '✖ Tips & Gratuities']
            };
          });
        }
      } catch (e) {
        console.warn('[VentouraDatabase] Backend sync warning:', e);
      }
    },

    // Retrieve package dynamically using normalized keys
    getPackage: function (idOrName) {
      const normKey = normalizeDestKey(idOrName);
      if (this.packages[normKey]) return this.packages[normKey];

      // Direct fallback search
      for (const k in this.packages) {
        if (k.toLowerCase() === String(idOrName).toLowerCase() || String(this.packages[k].id) === String(idOrName)) {
          return this.packages[k];
        }
      }

      return this.packages["tokyo-6d"];
    }
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      if (window.VentouraDatabase && window.VentouraDatabase.syncWithBackend) {
        window.VentouraDatabase.syncWithBackend();
      }
    });
  }

  console.log('[VentouraDatabase] Fully Synchronized Database Initialized.');
})();

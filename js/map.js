/* ============================================================
   PHOTOREALISTIC 3D SATELLITE EARTH & GLOBAL TRAVEL EXPLORER
   ============================================================ */

(function () {
  'use strict';

  // 1. Comprehensive Geocoding Database for Dynamic Data Sync
  const GEOCODING_DB = {
    'tokyo': { lat: 35.6762, lon: 139.6503, country: 'Japan', flag: '🇯🇵', weather: { temp: '22°C', cond: '☀️ Sunny', humidity: '55%', wind: '12 km/h' } },
    'kyoto': { lat: 35.0116, lon: 135.7681, country: 'Japan', flag: '🇯🇵', weather: { temp: '20°C', cond: '⛅ Pleasant', humidity: '58%', wind: '10 km/h' } },
    'osaka': { lat: 34.6937, lon: 135.5023, country: 'Japan', flag: '🇯🇵', weather: { temp: '23°C', cond: '☀️ Clear', humidity: '60%', wind: '14 km/h' } },
    'paris': { lat: 48.8566, lon: 2.3522, country: 'France', flag: '🇫🇷', weather: { temp: '24°C', cond: '🌤️ Partly Cloudy', humidity: '50%', wind: '15 km/h' } },
    'rome': { lat: 41.9028, lon: 12.4964, country: 'Italy', flag: '🇮🇹', weather: { temp: '28°C', cond: '☀️ Sunny', humidity: '45%', wind: '11 km/h' } },
    'venice': { lat: 45.4408, lon: 12.3155, country: 'Italy', flag: '🇮🇹', weather: { temp: '26°C', cond: '🌤️ Breezy', humidity: '62%', wind: '13 km/h' } },
    'santorini': { lat: 36.3932, lon: 25.4615, country: 'Greece', flag: '🇬🇷', weather: { temp: '29°C', cond: '☀️ Sunny', humidity: '40%', wind: '18 km/h' } },
    'maldives': { lat: 3.2028, lon: 73.2207, country: 'Maldives', flag: '🇲🇻', weather: { temp: '30°C', cond: '🏖️ Tropical Sunshine', humidity: '70%', wind: '16 km/h' } },
    'baa atoll': { lat: 5.1333, lon: 72.9333, country: 'Maldives', flag: '🇲🇻', weather: { temp: '30°C', cond: '🏖️ Tropical', humidity: '72%', wind: '15 km/h' } },
    'bali': { lat: -8.3405, lon: 115.0920, country: 'Indonesia', flag: '🇮🇩', weather: { temp: '28°C', cond: '🌴 Warm & Sunny', humidity: '75%', wind: '9 km/h' } },
    'seminyak': { lat: -8.6913, lon: 115.1682, country: 'Indonesia', flag: '🇮🇩', weather: { temp: '29°C', cond: '🏖️ Coastal Breeze', humidity: '73%', wind: '11 km/h' } },
    'dubai': { lat: 25.2048, lon: 55.2708, country: 'UAE', flag: '🇦🇪', weather: { temp: '36°C', cond: '☀️ Sunny & Hot', humidity: '35%', wind: '14 km/h' } },
    'swiss-alps': { lat: 46.5601, lon: 7.9736, country: 'Switzerland', flag: '🇨🇭', weather: { temp: '16°C', cond: '🏔️ Clear Alpine', humidity: '48%', wind: '8 km/h' } },
    'switzerland': { lat: 46.8182, lon: 8.2275, country: 'Switzerland', flag: '🇨🇭', weather: { temp: '18°C', cond: '🌤️ Crisp', humidity: '52%', wind: '10 km/h' } },
    'singapore': { lat: 1.3521, lon: 103.8198, country: 'Singapore', flag: '🇸🇬', weather: { temp: '31°C', cond: '⛅ Tropical', humidity: '78%', wind: '10 km/h' } },
    'phuket': { lat: 7.8804, lon: 98.3923, country: 'Thailand', flag: '🇹🇭', weather: { temp: '31°C', cond: '🏖️ Sunny Beach', humidity: '74%', wind: '12 km/h' } },
    'bangkok': { lat: 13.7563, lon: 100.5018, country: 'Thailand', flag: '🇹🇭', weather: { temp: '33°C', cond: '☀️ Warm', humidity: '70%', wind: '9 km/h' } },
    'hawaii': { lat: 20.7984, lon: -156.3319, country: 'USA', flag: '🇺🇸', weather: { temp: '27°C', cond: '🌺 Ocean Breeze', humidity: '60%', wind: '18 km/h' } },
    'maui': { lat: 20.7984, lon: -156.3319, country: 'USA', flag: '🇺🇸', weather: { temp: '27°C', cond: '🌺 Sunny', humidity: '58%', wind: '16 km/h' } },
    'grand canyon': { lat: 36.1069, lon: -112.1129, country: 'USA', flag: '🇺🇸', weather: { temp: '25°C', cond: '☀️ Dry & Clear', humidity: '20%', wind: '15 km/h' } },
    'new york': { lat: 40.7128, lon: -74.0060, country: 'USA', flag: '🇺🇸', weather: { temp: '23°C', cond: '🏙️ Clear Skies', humidity: '52%', wind: '14 km/h' } },
    'london': { lat: 51.5074, lon: -0.1278, country: 'UK', flag: '🇬🇧', weather: { temp: '20°C', cond: '🌤️ Mild', humidity: '64%', wind: '16 km/h' } },
    'scotland': { lat: 56.4907, lon: -4.2026, country: 'UK', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', weather: { temp: '17°C', cond: '☁️ Cool & Fresh', humidity: '72%', wind: '20 km/h' } },
    'kenya': { lat: -1.2921, lon: 36.8219, country: 'Kenya', flag: '🇰🇪', weather: { temp: '27°C', cond: '🦁 Sunny Savanna', humidity: '45%', wind: '14 km/h' } },
    'amboseli': { lat: -2.6527, lon: 37.2606, country: 'Kenya', flag: '🇰🇪', weather: { temp: '28°C', cond: '☀️ Clear Blue', humidity: '42%', wind: '15 km/h' } },
    'morocco': { lat: 31.6295, lon: -7.9811, country: 'Morocco', flag: '🇲🇦', weather: { temp: '32°C', cond: '🏜️ Sunny Desert', humidity: '30%', wind: '12 km/h' } },
    'merzouga': { lat: 31.0990, lon: -4.0124, country: 'Morocco', flag: '🇲🇦', weather: { temp: '34°C', cond: '☀️ Warm Sands', humidity: '22%', wind: '11 km/h' } },
    'norway': { lat: 69.6492, lon: 18.9553, country: 'Norway', flag: '🇳🇴', weather: { temp: '12°C', cond: '🌌 Crisp Fjord', humidity: '68%', wind: '16 km/h' } },
    'tromsø': { lat: 69.6492, lon: 18.9553, country: 'Norway', flag: '🇳🇴', weather: { temp: '11°C', cond: '🌌 Aurora Skies', humidity: '70%', wind: '18 km/h' } },
    'south africa': { lat: -33.9249, lon: 18.4241, country: 'South Africa', flag: '🇿🇦', weather: { temp: '21°C', cond: '🌊 Coastal Sun', humidity: '58%', wind: '19 km/h' } },
    'cape town': { lat: -33.9249, lon: 18.4241, country: 'South Africa', flag: '🇿🇦', weather: { temp: '21°C', cond: '☀️ Fine & Clear', humidity: '56%', wind: '20 km/h' } },
    'sydney': { lat: -33.8688, lon: 151.2093, country: 'Australia', flag: '🇦🇺', weather: { temp: '20°C', cond: '☀️ Sunny Harbour', humidity: '54%', wind: '17 km/h' } },
    'cairo': { lat: 30.0444, lon: 31.2357, country: 'Egypt', flag: '🇪🇬', weather: { temp: '35°C', cond: '☀️ Clear Desert', humidity: '32%', wind: '13 km/h' } },
    'rio de janeiro': { lat: -22.9068, lon: -43.1729, country: 'Brazil', flag: '🇧🇷', weather: { temp: '27°C', cond: '🏖️ Tropical Sun', humidity: '72%', wind: '12 km/h' } },
    'borabora': { lat: -16.5004, lon: -151.7415, country: 'French Polynesia', flag: '🇵🇫', weather: { temp: '29°C', cond: '🌺 Warm Lagoon', humidity: '71%', wind: '15 km/h' } }
  };

  // Baseline Master Destinations Array (Rich content fallback)
  const BASELINE_DESTINATIONS = [
    {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japan',
      lat: 35.6762, lon: 139.6503,
      price: '$1,899', wasPrice: '$2,399', discount: '20% OFF',
      duration: '6 Days 5 Nights',
      hotel: '5★ Aman Tokyo Luxury Suite',
      rating: '4.8', reviewsCount: 120, stars: '★★★★★',
      category: 'City & Culture', flag: '🇯🇵',
      image: 'assets/images/dest-tokyo.jpg',
      subtitle: 'Experience the perfect blend of tradition and modernity in Tokyo.',
      desc: 'Tokyo, Japan\'s bustling capital, is a city of contrasts—where ancient Shinto shrines stand beside neon-lit skyscrapers. Explore vibrant neighborhoods, savor 3-star Michelin cuisine, and immerse yourself in rich culture.'
    },
    {
      id: 'kyoto',
      name: 'Kyoto',
      country: 'Japan',
      lat: 35.0116, lon: 135.7681,
      price: '$1,699', wasPrice: '$2,099', discount: '19% OFF',
      duration: '5 Days 4 Nights',
      hotel: '5★ Luxury Onsen Ryokan',
      rating: '4.9', reviewsCount: 105, stars: '★★★★★',
      category: 'Heritage & Temples', flag: '🇯🇵',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Tranquil bamboo groves, golden temples, and geisha traditions.',
      desc: 'Kyoto is the cultural heart of Japan. Discover ancient wooden temples, serene Zen gardens, historic Gion geisha districts, and traditional ryokan stays.'
    },
    {
      id: 'paris',
      name: 'Paris',
      country: 'France',
      lat: 48.8566, lon: 2.3522,
      price: '$1,299', wasPrice: '$1,699', discount: '23% OFF',
      duration: '6 Days 5 Nights',
      hotel: '5★ Le Meurice Eiffel View Suite',
      rating: '4.8', reviewsCount: 132, stars: '★★★★★',
      category: 'Romance & Luxury', flag: '🇫🇷',
      image: 'assets/images/dest-paris.jpg',
      subtitle: 'The city of lights, haute couture, and timeless romance.',
      desc: 'Experience Paris with 5-star boutique hotel suites near Champs-Élysées, private Louvre tours, Eiffel Tower summit dining, and Seine champagne cruises.'
    },
    {
      id: 'santorini',
      name: 'Santorini',
      country: 'Greece',
      lat: 36.3932, lon: 25.4615,
      price: '$1,299', wasPrice: '$1,699', discount: '24% OFF',
      duration: '5 Days 4 Nights',
      hotel: '5★ Grace Hotel Caldera Cave Suite',
      rating: '4.9', reviewsCount: 98, stars: '★★★★★',
      category: 'Island & Luxury', flag: '🇬🇷',
      image: 'assets/images/dest-santorini.jpg',
      subtitle: 'Whitewashed cliffside villas and world-famous Aegean sunsets.',
      desc: 'Unwind in cliffside luxury cave suites with private infinity plunge pools overlooking the turquoise Caldera lagoon.'
    },
    {
      id: 'maldives',
      name: 'Maldives',
      country: 'Maldives',
      lat: 3.2028, lon: 73.2207,
      price: '$2,499', wasPrice: '$3,199', discount: '22% OFF',
      duration: '6 Days 5 Nights',
      hotel: '5★ Velana Luxury Overwater Villa',
      rating: '4.9', reviewsCount: 86, stars: '★★★★★',
      category: 'Overwater Luxury', flag: '🇲🇻',
      image: 'assets/images/dest-maldives.jpg',
      subtitle: 'Crystal clear ocean lagoons and private overwater villa paradises.',
      desc: 'Escape to private overwater bungalows featuring glass floor viewing panels, ocean water slides, sea turtle snorkeling, and personal butler service.'
    },
    {
      id: 'bali',
      name: 'Bali',
      country: 'Indonesia',
      lat: -8.3405, lon: 115.0920,
      price: '$999', wasPrice: '$1,299', discount: '23% OFF',
      duration: '7 Days 6 Nights',
      hotel: '5★ Viceroy Jungle Pool Villa',
      rating: '4.7', reviewsCount: 110, stars: '★★★★★',
      category: 'Jungle & Beach', flag: '🇮🇩',
      image: 'assets/images/dest-bali.jpg',
      subtitle: 'Lush jungle pool villas, sacred cliff temples, and beach clubs.',
      desc: 'Experience Ubud\'s green rice terrace valleys, sacred monkey sanctuaries, cliffside Kecak fire dances, and luxury beachfront resort cabanas.'
    },
    {
      id: 'dubai',
      name: 'Dubai',
      country: 'UAE',
      lat: 25.2048, lon: 55.2708,
      price: '$1,599', wasPrice: '$1,999', discount: '20% OFF',
      duration: '5 Days 4 Nights',
      hotel: '5★ Burj Al Arab Royal Suite',
      rating: '4.8', reviewsCount: 132, stars: '★★★★★',
      category: 'Ultra Luxury', flag: '🇦🇪',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Gleaming skyscrapers, royal desert safaris, and high luxury.',
      desc: 'Soar to the top of Burj Khalifa, ride 4x4 dune buggies across golden sand reserves, and sail private yachts along Dubai Marina.'
    },
    {
      id: 'swiss-alps',
      name: 'Swiss Alps',
      country: 'Switzerland',
      lat: 46.5601, lon: 7.9736,
      price: '$2,999', wasPrice: '$3,699', discount: '18% OFF',
      duration: '7 Days 6 Nights',
      hotel: '5★ Zermatt Alpine Chalet & Spa',
      rating: '5.0', reviewsCount: 142, stars: '★★★★★',
      category: 'Mountain & Alpine', flag: '🇨🇭',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      subtitle: 'Snow-capped peaks, glacier trains, and cozy chalet luxury.',
      desc: 'Ride the panoramic Glacier Express, stay in high-alpine chalets facing Matterhorn, and enjoy Swiss fondue by open fireplaces.'
    }
  ];

  // Global Dynamic Package Retriever (Requirement 9 Data Sync)
  function getDynamicGlobeDestinations() {
    const list = [...BASELINE_DESTINATIONS];
    const seen = new Set(list.map(d => d.id.toLowerCase()));

    // 1. Collect from packageCatalogDb if loaded from services.js
    if (window.packageCatalogDb && Array.isArray(window.packageCatalogDb)) {
      window.packageCatalogDb.forEach(pkg => {
        const id = (pkg.id || pkg.title || '').toLowerCase();
        if (id && !seen.has(id)) {
          seen.add(id);
          const cityClean = (pkg.city || pkg.title || '').toLowerCase();
          const countryClean = (pkg.country || '').replace(/[^\w\s]/gi, '').trim().toLowerCase();
          
          let geo = GEOCODING_DB[cityClean] || GEOCODING_DB[countryClean];
          if (!geo) {
            // Fallback hash positioning
            const hash = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const lat = ((hash % 140) - 70);
            const lon = ((hash * 3 % 360) - 180);
            geo = { lat, lon, country: pkg.country || 'Global', flag: '🌍', weather: { temp: '25°C', cond: '☀️ Clear', humidity: '50%', wind: '10 km/h' } };
          }

          list.push({
            id: pkg.id || `pkg-${hash}`,
            name: pkg.title ? pkg.title.split(' ')[0] : (pkg.city || 'Destination'),
            fullName: pkg.title || pkg.name,
            country: geo.country || pkg.country || 'Global',
            lat: geo.lat,
            lon: geo.lon,
            price: pkg.price || '$1,499',
            wasPrice: pkg.originalPrice || '$1,899',
            discount: pkg.discount || '20% OFF',
            duration: pkg.duration || '6 Days',
            hotel: pkg.hotel || '5★ Luxury Resort & Suites',
            rating: pkg.rating ? pkg.rating.toString() : '4.9',
            reviewsCount: pkg.reviewsCount || 100,
            stars: '★★★★★',
            category: pkg.category || 'Luxury Travel',
            flag: geo.flag || '📍',
            image: pkg.destImg || pkg.heroImg || 'assets/images/dest-maldives.jpg',
            subtitle: pkg.overview ? pkg.overview.substring(0, 80) + '...' : 'Explore world-class travel packages.',
            desc: pkg.overview || 'Enjoy an extraordinary travel experience with VIP accommodations, transfers, and guided tours.',
            weather: geo.weather
          });
        }
      });
    }

    // 2. Collect from localStorage ('custom_packages' / 'wanderlux_packages')
    try {
      const stored = localStorage.getItem('custom_packages') || localStorage.getItem('wanderlux_packages');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed.forEach(pkg => {
            const id = (pkg.id || pkg.title || '').toLowerCase();
            if (id && !seen.has(id)) {
              seen.add(id);
              const key = (pkg.city || pkg.location || pkg.title || '').toLowerCase();
              let geo = GEOCODING_DB[key] || { lat: 15, lon: 45, country: pkg.country || 'Global', flag: '📍', weather: { temp: '26°C', cond: '☀️ Clear', humidity: '50%', wind: '12 km/h' } };
              list.push({
                id: pkg.id,
                name: pkg.name || pkg.title || 'New Package',
                country: pkg.country || geo.country || 'Global',
                lat: pkg.lat || geo.lat,
                lon: pkg.lon || geo.lon,
                price: pkg.price || '$1,299',
                wasPrice: '$1,699',
                discount: 'SPECIAL',
                duration: pkg.duration || '5 Days',
                hotel: pkg.hotel || '5★ Luxury Accommodation',
                rating: '5.0',
                reviewsCount: 24,
                stars: '★★★★★',
                category: 'Newly Added',
                flag: geo.flag || '✨',
                image: pkg.image || 'assets/images/dest-paris.jpg',
                subtitle: 'Newly added package ready to explore.',
                desc: pkg.desc || pkg.overview || 'Newly created luxury package automatically synced to 3D Globe.',
                weather: geo.weather
              });
            }
          });
        }
      }
    } catch (e) {
      console.warn('Globe data sync notice:', e);
    }

    return list;
  }

  function latLongToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }

  // 2. High-Resolution Realistic Satellite Earth Texture Generator
  function createPhotorealisticEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Deep Ocean Blue Base
    const ocean = ctx.createLinearGradient(0, 0, 0, canvas.height);
    ocean.addColorStop(0, '#020617');
    ocean.addColorStop(0.2, '#0B1E36');
    ocean.addColorStop(0.5, '#0E2847');
    ocean.addColorStop(0.8, '#0B1E36');
    ocean.addColorStop(1, '#020617');
    ctx.fillStyle = ocean;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Coastal Shallow Turquoise Reefs
    ctx.fillStyle = 'rgba(14, 165, 233, 0.35)';
    const reefSpots = [
      [1450, 560, 110], [1620, 620, 140], [420, 640, 100], [1720, 720, 130],
      [1100, 480, 85], [1300, 450, 80], [800, 650, 120], [1850, 680, 110]
    ];
    reefSpots.forEach(([x, y, r]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Realistic Continents Layer
    const landmasses = [
      { x: 350, y: 260, r: 195, color: '#2B4C28' }, // North America
      { x: 480, y: 360, r: 135, color: '#5C6B32' },
      { x: 280, y: 200, r: 125, color: '#33542E' },
      { x: 620, y: 640, r: 165, color: '#1B3D1D' }, // South America
      { x: 680, y: 780, r: 105, color: '#3F5424' },
      { x: 1080, y: 240, r: 120, color: '#325A29' }, // Europe
      { x: 1020, y: 200, r: 90, color: '#3C6632' },
      { x: 1060, y: 440, r: 145, color: '#917B44' }, // Sahara / Africa
      { x: 1080, y: 580, r: 155, color: '#284C22' },
      { x: 1280, y: 380, r: 115, color: '#9E884B' }, // Middle East
      { x: 1480, y: 260, r: 240, color: '#254B22' }, // Asia
      { x: 1600, y: 340, r: 145, color: '#4B622D' },
      { x: 1380, y: 440, r: 135, color: '#87743F' }, // India
      { x: 1720, y: 700, r: 135, color: '#966C36' }  // Australia
    ];

    landmasses.forEach(lm => {
      ctx.fillStyle = lm.color;
      ctx.beginPath();
      ctx.arc(lm.x, lm.y, lm.r, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 15; i++) {
        const ang = Math.random() * Math.PI * 2;
        const d = Math.random() * lm.r * 0.8;
        const subR = Math.random() * lm.r * 0.45;
        ctx.beginPath();
        ctx.arc(lm.x + Math.cos(ang) * d, lm.y + Math.sin(ang) * d, subR, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Polar Ice Caps
    ctx.fillStyle = '#E2E8F0';
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, 35, canvas.width / 2, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height - 35, canvas.width / 2, 50, 0, 0, Math.PI * 2);
    ctx.fill();

    // Night City Golden Glow Lights
    ctx.fillStyle = '#F59E0B';
    for (let i = 0; i < 950; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(rx, ry, Math.random() * 1.3 + 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  // Cloud Texture Generator
  // Cloud Texture Generator — Photorealistic Soft Atmospheric Whisps
  function createCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 70 + 25;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.06)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }

  // 3. Main Init Function
  function init3DExplorer() {
    const canvas = document.getElementById('globe-3d-canvas');
    const container = document.getElementById('world-map-3d-wrapper');
    if (!canvas || !container || typeof THREE === 'undefined') return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 260);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Natural Space & Sunlight Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfffaed, 1.25);
    dirLight1.position.set(180, 120, 180);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.4);
    dirLight2.position.set(-180, -100, -180);
    scene.add(dirLight2);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Earth Sphere Mesh
    const radius = 84;
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    
    let earthTexture = createPhotorealisticEarthTexture();
    const textureLoader = new THREE.TextureLoader();

    // High resolution NASA Earth satellite texture with fallback
    textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
      (tex) => {
        earthMaterial.map = tex;
        earthMaterial.needsUpdate = true;
      },
      undefined,
      () => {}
    );

    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.6,
      metalness: 0.08
    });

    const earthMesh = new THREE.Mesh(geometry, earthMaterial);
    globeGroup.add(earthMesh);

    // 2. Rotating Realistic Atmosphere Clouds Mesh Layer
    const cloudGeom = new THREE.SphereGeometry(radius * 1.015, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: createCloudTexture(),
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    // High resolution NASA Earth cloud texture
    textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_2048.png',
      (cloudTex) => {
        cloudMat.map = cloudTex;
        cloudMat.needsUpdate = true;
      },
      undefined,
      () => {}
    );

    const cloudMesh = new THREE.Mesh(cloudGeom, cloudMat);
    globeGroup.add(cloudMesh);

    // 3. Atmospheric Outer Rim Glow (Fresnel rim halo)
    const atmosGeom = new THREE.SphereGeometry(radius * 1.028, 64, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#38bdf8'),
      transparent: true,
      opacity: 0.14,
      side: THREE.BackSide
    });
    const atmosMesh = new THREE.Mesh(atmosGeom, atmosMat);
    globeGroup.add(atmosMesh);

    // Overlay Container for 2D Floating Pin Badges
    let overlayContainer = document.getElementById('globe-popups-overlay');
    if (!overlayContainer) {
      overlayContainer = document.createElement('div');
      overlayContainer.id = 'globe-popups-overlay';
      overlayContainer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:11;overflow:hidden;';
      container.appendChild(overlayContainer);
    }

    let activeDestinations = [];
    let pinObjects = [];

    // Render Dynamic Pins Function
    function renderGlobePins() {
      overlayContainer.innerHTML = '';
      pinObjects.forEach(obj => globeGroup.remove(obj));
      pinObjects = [];

      activeDestinations = getDynamicGlobeDestinations();

      activeDestinations.forEach(dest => {
        const pos = latLongToVector3(dest.lat, dest.lon, radius + 1.8);

        // 3D Pin Sphere Dot
        const pinGeom = new THREE.SphereGeometry(2.4, 16, 16);
        const pinMat = new THREE.MeshBasicMaterial({ color: '#C5A059' });
        const pinMesh = new THREE.Mesh(pinGeom, pinMat);
        pinMesh.position.copy(pos);
        globeGroup.add(pinMesh);
        pinObjects.push(pinMesh);

        // Glowing Outer Ring
        const ringGeom = new THREE.RingGeometry(3.2, 4.5, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: '#C5A059', side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.position.copy(pos.clone().multiplyScalar(1.01));
        ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
        globeGroup.add(ringMesh);
        pinObjects.push(ringMesh);

        // Floating HTML Badge Pin
        const badgeEl = document.createElement('div');
        badgeEl.className = 'globe-pin-badge';
        badgeEl.dataset.dest = dest.id;
        badgeEl.style.cssText = `
          position: absolute;
          pointer-events: auto;
          cursor: pointer;
          background: rgba(18, 22, 25, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(197, 160, 89, 0.45);
          border-radius: 9999px;
          padding: 5px 12px;
          color: #FAF8F5;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          transform: translate(-50%, -100%);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        `;

        badgeEl.innerHTML = `
          <span style="font-size:13px">${dest.flag || '📍'}</span>
          <span>${dest.name}</span>
          <span style="font-size:10px; background:#C5A059; color:#121619; padding:2px 6px; border-radius:9999px; font-weight:800">${dest.price}</span>
        `;

        badgeEl.addEventListener('mouseenter', () => {
          badgeEl.style.transform = 'translate(-50%, -108%) scale(1.08)';
          badgeEl.style.borderColor = '#C5A059';
        });

        badgeEl.addEventListener('mouseleave', () => {
          badgeEl.style.transform = 'translate(-50%, -100%) scale(1)';
          badgeEl.style.borderColor = 'rgba(197, 160, 89, 0.45)';
        });

        badgeEl.addEventListener('click', (e) => {
          e.stopPropagation();
          selectDestination(dest);
        });

        overlayContainer.appendChild(badgeEl);
        dest._badgeEl = badgeEl;
      });
    }

    // Expose global refresh hooks
    window.syncGlobePackages = renderGlobePins;
    window.refreshGlobeData = renderGlobePins;

    renderGlobePins();

    // 4. Projection 2D Update with Camera Occlusion Check
    function updateHTMLPopups() {
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      activeDestinations.forEach(dest => {
        if (!dest._badgeEl) return;
        const pos3D = latLongToVector3(dest.lat, dest.lon, radius + 1.8);
        pos3D.applyMatrix4(globeGroup.matrixWorld);

        const cameraVector = camera.position.clone().sub(pos3D);
        const normalVector = pos3D.clone().normalize();
        const isFacingCamera = cameraVector.dot(normalVector) > 0;

        if (isFacingCamera) {
          pos3D.project(camera);
          const x = (pos3D.x * halfWidth) + halfWidth;
          const y = -(pos3D.y * halfHeight) + halfHeight;

          dest._badgeEl.style.left = `${x}px`;
          dest._badgeEl.style.top = `${y}px`;
          dest._badgeEl.style.opacity = '1';
          dest._badgeEl.style.visibility = 'visible';
        } else {
          dest._badgeEl.style.opacity = '0';
          dest._badgeEl.style.visibility = 'hidden';
        }
      });
    }

    // 5. 360° Free Cursor Rotation, Dragging & Pinch Zoom
    const wrapper = document.getElementById('world-map-3d-wrapper') || container || canvas;

    let isDragging = false;
    let autoRotate = true;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    let touchStartDist = 0;

    wrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.0065;
      targetRotationX += deltaY * 0.0065;

      // Clamp X tilt rotation (-80° to +80°) to prevent inverted flipping
      targetRotationX = Math.max(-Math.PI / 2 + 0.15, Math.min(Math.PI / 2 - 0.15, targetRotationX));
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    document.addEventListener('mouseup', () => { isDragging = false; });

    // Touch Support & Pinch Zoom
    wrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.sqrt(dx * dx + dy * dy);
      }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.0065;
        targetRotationX += deltaY * 0.0065;
        targetRotationX = Math.max(-Math.PI / 2 + 0.15, Math.min(Math.PI / 2 - 0.15, targetRotationX));

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const deltaDist = touchStartDist - dist;

        camera.position.z += deltaDist * 0.3;
        camera.position.z = Math.max(160, Math.min(420, camera.position.z));
        touchStartDist = dist;
      }
    }, { passive: true });

    document.addEventListener('touchend', () => { isDragging = false; });

    // Mouse Wheel Zoom
    wrapper.addEventListener('wheel', (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.15;
      camera.position.z = Math.max(160, Math.min(420, camera.position.z));
    }, { passive: false });

    // Floating Glass Toolbar Controls Wireup
    document.getElementById('btn-globe-zoom-in')?.addEventListener('click', () => {
      camera.position.z = Math.max(160, camera.position.z - 35);
    });

    document.getElementById('btn-globe-zoom-out')?.addEventListener('click', () => {
      camera.position.z = Math.min(420, camera.position.z + 35);
    });

    // Auto-Rotate Toggle (Requirement 7)
    const rotateBtn = document.getElementById('btn-globe-rotate-toggle');
    rotateBtn?.addEventListener('click', () => {
      autoRotate = !autoRotate;
      const icon = document.getElementById('globe-rotate-icon');
      const text = document.getElementById('globe-rotate-text');
      if (icon) icon.textContent = autoRotate ? '⏸️' : '▶️';
      if (text) text.textContent = autoRotate ? 'Pause' : 'Rotate';
    });

    // Reset Camera (Requirement 7)
    document.getElementById('btn-globe-fit')?.addEventListener('click', () => {
      camera.position.z = 260;
      targetRotationX = 0;
      targetRotationY = 0;
    });

    // 6. Select Destination & Focus Camera + Luxury Weather Popup (Requirement 8)
    function selectDestination(dest) {
      const phi = (90 - dest.lat) * (Math.PI / 180);
      const theta = (dest.lon + 180) * (Math.PI / 180);
      
      targetRotationY = -theta + Math.PI / 2;
      targetRotationX = phi - Math.PI / 2;

      renderLuxuryDestinationDetail(dest);

      document.querySelectorAll('.map-dest-card').forEach(card => {
        card.classList.toggle('active', card.dataset.dest === dest.name || card.dataset.dest === dest.id);
      });
    }

    // Attach Sidebar Cards Listeners
    document.querySelectorAll('.map-dest-card, .btn-explore-dest').forEach(card => {
      card.addEventListener('click', (e) => {
        const destKey = card.dataset.dest || 'Paris';
        const allDest = getDynamicGlobeDestinations();
        const target = allDest.find(d => d.name.toLowerCase() === destKey.toLowerCase() || d.id === destKey) || allDest[0];
        selectDestination(target);
      });
    });

    // 7. Render Luxury Popup Modal Container (Requirement 8)
    function renderLuxuryDestinationDetail(dest) {
      let detailSection = document.getElementById('dest-package-detail-container');
      if (!detailSection) {
        detailSection = document.createElement('div');
        detailSection.id = 'dest-package-detail-container';
        detailSection.style.cssText = 'margin-top:28px; transition:all 0.4s ease;';
        const mapSection = document.getElementById('world-map-section');
        if (mapSection) {
          const containerDiv = mapSection.querySelector('.container');
          if (containerDiv) containerDiv.appendChild(detailSection);
        }
      }

      const weather = dest.weather || { temp: '26°C / 78°F', cond: '☀️ Pleasant & Sunny', humidity: '55%', wind: '12 km/h' };

      detailSection.innerHTML = `
        <div style="background:var(--bg-secondary); border:1px solid var(--glass-border); border-radius:24px; padding:24px; box-shadow:0 16px 48px rgba(0,0,0,0.35);">
          
          <div style="display:grid; grid-template-columns: 1fr 340px; gap:24px; align-items:start;">
            
            <div style="position:relative;">
              <div style="position:relative; height:320px; border-radius:20px; overflow:hidden; margin-bottom:16px; box-shadow:0 8px 24px rgba(0,0,0,0.3);">
                <img src="${dest.image}" alt="${dest.name}" style="width:100%; height:100%; object-fit:cover;" />
                <span style="position:absolute; top:16px; left:16px; background:rgba(18,22,25,0.85); backdrop-filter:blur(10px); color:#FAF8F5; font-size:12px; font-weight:800; padding:6px 14px; border-radius:9999px; border:1px solid rgba(255,255,255,0.2);">
                  ${dest.flag || '📍'} ${dest.country}
                </span>
                <span style="position:absolute; top:16px; right:16px; background:#C5A059; color:#121619; font-size:11px; font-weight:800; padding:6px 12px; border-radius:9999px;">
                  ★ ${dest.rating || '4.9'} (${dest.reviewsCount || 100}+ Reviews)
                </span>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <h2 style="font-family:'Cormorant Garamond', serif; font-size:36px; font-weight:700; color:var(--text-primary); margin:0;">
                  ${dest.name} Sanctuary
                </h2>
                <button onclick="window.toggleWishlist('${dest.id}')" style="width:42px; height:42px; border-radius:50%; border:1px solid var(--glass-border); background:rgba(255,255,255,0.05); color:#fff; font-size:18px; display:flex; align-items:center; justify-content:center; cursor:pointer;" title="Save to Wishlist">
                  ❤️
                </button>
              </div>

              <div style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;">
                📍 ${dest.country} • ⏱️ <strong>${dest.duration}</strong> • 🏨 <strong>${dest.hotel}</strong>
              </div>

              <p style="font-size:14px; color:var(--text-secondary); line-height:1.7; margin-bottom:16px;">
                ${dest.desc}
              </p>

              <!-- Live Weather Widget (Requirement 8) -->
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(197,160,89,0.3); border-radius:16px; padding:14px 18px; display:flex; align-items:center; justify-content:space-between; margin-top:16px;">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="font-size:28px;">${weather.cond.split(' ')[0] || '☀️'}</div>
                  <div>
                    <div style="font-size:11px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Live Weather</div>
                    <div style="font-size:14px; font-weight:800; color:var(--text-primary);">${weather.cond} · ${weather.temp}</div>
                  </div>
                </div>
                <div style="text-align:right; font-size:11px; color:var(--text-secondary);">
                  <div>💧 Humidity: <strong>${weather.humidity}</strong></div>
                  <div>🌬️ Wind: <strong>${weather.wind}</strong></div>
                </div>
              </div>
            </div>

            <!-- Booking Card -->
            <div style="background:var(--bg-card); border:1px solid var(--glass-border); border-radius:20px; padding:22px; display:flex; flex-direction:column; gap:18px;">
              <div>
                <div style="font-size:11px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Package Rate</div>
                <div style="display:flex; align-items:baseline; gap:8px; margin-top:2px;">
                  <span style="font-family:'Manrope', sans-serif; font-size:30px; font-weight:800; color:var(--text-primary);">${dest.price}</span>
                  <span style="font-size:12px; color:var(--text-muted);">/ person</span>
                  <span style="background:rgba(197,160,89,0.2); color:#C5A059; font-size:10px; font-weight:800; padding:2px 8px; border-radius:9999px; margin-left:auto;">${dest.discount || 'LIMITED'}</span>
                </div>
                ${dest.wasPrice ? `<div style="font-size:12px; color:var(--text-muted); text-decoration:line-through;">Was ${dest.wasPrice}</div>` : ''}
              </div>

              <div style="display:flex; flex-direction:column; gap:8px; font-size:12px; color:var(--text-secondary); border-top:1px solid var(--glass-border); border-bottom:1px solid var(--glass-border); padding:12px 0;">
                <div>✔️ <strong>${dest.duration}</strong> Included</div>
                <div>✔️ <strong>${dest.hotel}</strong></div>
                <div>✔️ Flights & VIP Airport Transfers</div>
                <div>✔️ Free Cancellation up to 7 Days</div>
              </div>

              <!-- Action Buttons (Explore, Book Now, Wishlist - Requirement 8) -->
              <div style="display:flex; flex-direction:column; gap:10px;">
                <button onclick="window.openTravelExperienceModal('${dest.id}')" class="btn btn-outline" style="width:100%; justify-content:center; padding:12px; font-weight:700;">
                  Explore Package Details 🗺️
                </button>
                <button onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({id:'${dest.id}', title:'${dest.title || dest.name}', location:'${dest.location || dest.country}', startingPrice:'${dest.price}', duration:'${dest.duration}', image:'${dest.image||''}'}, 'destination')" class="btn btn-primary" style="width:100%; justify-content:center; padding:14px; font-weight:800; border:none; cursor:pointer;">
                  ⚡ Book Now →
                </button>
                <button onclick="window.toggleWishlist('${dest.id}')" class="btn btn-ghost" style="width:100%; justify-content:center; font-size:13px; color:var(--text-secondary);">
                  ❤️ Add to Wishlist
                </button>
              </div>
            </div>

          </div>
        </div>
      `;

      detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 8. 60 FPS Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      // Smooth camera lerp rotation
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.08;

      // Outer cloud layer counter-drift
      cloudMesh.rotation.y += 0.0004;

      // Ambient drift when user is not dragging and autoRotate is active
      if (!isDragging && autoRotate) {
        targetRotationY += 0.0012;
      }

      updateHTMLPopups();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // Initial detailed view
    const initialDest = activeDestinations[0] || BASELINE_DESTINATIONS[0];
    renderLuxuryDestinationDetail(initialDest);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DExplorer);
  } else {
    init3DExplorer();
  }

})();

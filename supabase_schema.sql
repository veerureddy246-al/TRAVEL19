-- ============================================================
-- VENTOURA TRAVEL AGENCY — SUPABASE POSTGRESQL SCHEMA & SEED DATA
-- Project: Ventoura Luxury Travel Platform
-- Project URL: https://okbesgmohvgmyblqhjod.supabase.co
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. DESTINATIONS TABLE
CREATE TABLE IF NOT EXISTS public.destinations (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 4.90,
    starting_price NUMERIC(12, 2) NOT NULL,
    days INTEGER DEFAULT 7,
    nights INTEGER DEFAULT 6,
    included_guests INTEGER DEFAULT 2,
    weather VARCHAR(100),
    category VARCHAR(100),
    image_url TEXT NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'published',
    featured BOOLEAN DEFAULT true,
    highlights JSONB DEFAULT '[]'::jsonb,
    best_season VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PACKAGES TABLE
CREATE TABLE IF NOT EXISTS public.packages (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    days INTEGER DEFAULT 7,
    nights INTEGER DEFAULT 6,
    included_guests INTEGER DEFAULT 2,
    price NUMERIC(12, 2) NOT NULL,
    original_price NUMERIC(12, 2),
    badge VARCHAR(50),
    rating NUMERIC(3, 2) DEFAULT 4.90,
    reviews_count INTEGER DEFAULT 0,
    featured_image TEXT NOT NULL,
    description TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'published',
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. HOTELS TABLE
CREATE TABLE IF NOT EXISTS public.hotels (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    nights INTEGER DEFAULT 1,
    included_guests INTEGER DEFAULT 2,
    hero_image TEXT NOT NULL,
    description TEXT,
    star_rating INTEGER DEFAULT 5,
    amenities JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CRUISES TABLE
CREATE TABLE IF NOT EXISTS public.cruises (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cruise_line VARCHAR(100) NOT NULL,
    route VARCHAR(255) NOT NULL,
    duration VARCHAR(100) DEFAULT '7 Days',
    price NUMERIC(12, 2) NOT NULL,
    hero_image TEXT NOT NULL,
    description TEXT,
    rating NUMERIC(3, 2) DEFAULT 4.9,
    amenities JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. FLIGHTS TABLE
CREATE TABLE IF NOT EXISTS public.flights (
    id VARCHAR(100) PRIMARY KEY,
    airline VARCHAR(100) NOT NULL,
    flight_number VARCHAR(50) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    departure_time VARCHAR(100),
    arrival_time VARCHAR(100),
    flight_class VARCHAR(50) DEFAULT 'First Class',
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. CARS TABLE
CREATE TABLE IF NOT EXISTS public.cars (
    id VARCHAR(100) PRIMARY KEY,
    car_model VARCHAR(100) NOT NULL,
    category VARCHAR(100) DEFAULT 'Luxury SUV',
    location VARCHAR(100) NOT NULL,
    price_per_day NUMERIC(12, 2) NOT NULL,
    image TEXT NOT NULL,
    seats INTEGER DEFAULT 5,
    transmission VARCHAR(50) DEFAULT 'Automatic',
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. BLOGS TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    views INTEGER DEFAULT 0,
    date VARCHAR(50),
    category VARCHAR(100) DEFAULT 'Travel Tips',
    image TEXT,
    content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id VARCHAR(100) PRIMARY KEY,
    customer VARCHAR(255) NOT NULL,
    trip VARCHAR(255) NOT NULL,
    rating INTEGER DEFAULT 5,
    comment TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'approved',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    category VARCHAR(100) DEFAULT 'Luxury Travel',
    image_url TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. COUPONS TABLE
CREATE TABLE IF NOT EXISTS public.coupons (
    id VARCHAR(100) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL,
    uses INTEGER DEFAULT 0,
    limit_count INTEGER DEFAULT 100,
    expiry VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id VARCHAR(100) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'Customer',
    phone VARCHAR(50),
    avatar_url TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. STAFF TABLE
CREATE TABLE IF NOT EXISTS public.staff (
    id VARCHAR(100) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    department VARCHAR(100) DEFAULT 'Operations',
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
    id VARCHAR(100) PRIMARY KEY,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    user_id VARCHAR(100),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    item_title VARCHAR(255) NOT NULL,
    travel_date DATE,
    travelers_count INTEGER DEFAULT 1,
    total_amount NUMERIC(12, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'Pending',
    booking_status VARCHAR(50) DEFAULT 'Confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id VARCHAR(100) PRIMARY KEY,
    ref_no VARCHAR(50),
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    product_type VARCHAR(50),
    product_id VARCHAR(100),
    product_name VARCHAR(255),
    destination VARCHAR(255),
    travel_date VARCHAR(50),
    price NUMERIC(12, 2),
    duration VARCHAR(100),
    adults VARCHAR(10),
    children VARCHAR(10),
    message TEXT,
    status VARCHAR(50) DEFAULT 'NEW',
    source VARCHAR(100) DEFAULT 'Website',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. REFUNDS TABLE
CREATE TABLE IF NOT EXISTS public.refunds (
    id VARCHAR(100) PRIMARY KEY,
    refund_ref VARCHAR(50) UNIQUE NOT NULL,
    booking_ref VARCHAR(50) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    reason TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC POLICIES
-- ============================================================
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cruises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Public Read Destinations" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Public Read Packages" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Public Read Hotels" ON public.hotels FOR SELECT USING (true);
CREATE POLICY "Public Read Cruises" ON public.cruises FOR SELECT USING (true);
CREATE POLICY "Public Read Flights" ON public.flights FOR SELECT USING (true);
CREATE POLICY "Public Read Cars" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Public Read Blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Public Read Reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Coupons" ON public.coupons FOR SELECT USING (true);

-- Allow Public Write / Insert Access
CREATE POLICY "Public Insert Bookings" ON public.bookings FOR ALL USING (true);
CREATE POLICY "Public Insert Inquiries" ON public.inquiries FOR ALL USING (true);
CREATE POLICY "Public Insert Reviews" ON public.reviews FOR ALL USING (true);
CREATE POLICY "Admin All Destinations" ON public.destinations FOR ALL USING (true);
CREATE POLICY "Admin All Packages" ON public.packages FOR ALL USING (true);
CREATE POLICY "Admin All Hotels" ON public.hotels FOR ALL USING (true);
CREATE POLICY "Admin All Cruises" ON public.cruises FOR ALL USING (true);
CREATE POLICY "Admin All Flights" ON public.flights FOR ALL USING (true);
CREATE POLICY "Admin All Cars" ON public.cars FOR ALL USING (true);
CREATE POLICY "Admin All Gallery" ON public.gallery FOR ALL USING (true);
CREATE POLICY "Admin All Blogs" ON public.blogs FOR ALL USING (true);
CREATE POLICY "Admin All Reviews" ON public.reviews FOR ALL USING (true);
CREATE POLICY "Admin All Coupons" ON public.coupons FOR ALL USING (true);

-- ============================================================
-- SEED DATA FROM CMS STORE
-- ============================================================

INSERT INTO public.destinations (id, title, city, country, rating, starting_price, days, nights, included_guests, weather, category, image_url, description, status, featured, highlights, best_season)
VALUES 
('dest-1', 'Amalfi Coast Escape', 'Positano & Amalfi', 'Italy', 4.96, 285000.00, 7, 6, 2, '27°C Mediterranean Sun', 'Luxury Coastal & Yachting', 'assets/images/amalfi-view-1.jpg', 'Cliffside pastel villages, private yacht charters, limoncello tasting, and Michelin Mediterranean seafood.', 'published', true, '["Private Yacht Charter", "Limoncello Tasting", "Cliffside Villas"]'::jsonb, 'May - October'),
('dest-2', 'Kyoto Zen Retreat', 'Kyoto', 'Japan', 4.95, 320000.00, 8, 7, 2, '22°C Crisp & Pleasant', 'Cultural & Wellness Sanctuary', 'assets/images/kyoto-view-1.jpg', 'Arashiyama bamboo forest dawn walks, traditional hot spring ryokans, and private tea ceremonies.', 'published', true, '["Bamboo Forest Walk", "Private Ryokan", "Tea Ceremony"]'::jsonb, 'March - May, Oct - Nov'),
('dest-3', 'Maldives Private Haven', 'Baa Atoll', 'Maldives', 4.99, 450000.00, 7, 6, 2, '30°C Tropical Sun', 'Overwater Paradise & Reef Diving', 'assets/images/maldives-view-1.jpg', 'Glass-bottom floor overwater villas, private seaplane flights, submerged coral reef dining.', 'published', true, '["Overwater Bungalows", "Seaplane Transfer", "Submerged Dining"]'::jsonb, 'November - April'),
('dest-4', 'Patagonia Odyssey', 'Torres del Paine', 'Argentina & Chile', 4.93, 345000.00, 10, 9, 2, '14°C Mountain Air', 'Alpine Glacier & Wildlife Trekking', 'assets/images/patagonia-view-1.jpg', 'Granite horns of Torres del Paine, ice-trekking on Perito Moreno Glacier, and geodesic eco-domes.', 'published', true, '["Glacier Ice Trekking", "Eco-Dome Glamping", "Patagonian Wildlife"]'::jsonb, 'November - March'),
('dest-5', 'St. Moritz Alpine Escape', 'St. Moritz', 'Switzerland', 4.94, 490000.00, 6, 5, 2, '-4°C Powder Snow', 'VIP Winter Sports & Ski Chalets', 'assets/images/stmoritz-view-1.jpg', 'Heli-ski drops onto pristine Alpine peaks, open fireplace chalets, and Michelin fondue dining.', 'published', true, '["Heli-Skiing", "Private Chalets", "Michelin Dining"]'::jsonb, 'December - April'),
('dest-6', 'Serengeti Safari Expedition', 'Seronera', 'Tanzania', 4.98, 385000.00, 7, 6, 2, '28°C Golden Hour Sun', 'Luxury African Wildlife Safari', 'assets/images/serengeti-view-1.jpg', '14,763 sq km African savannah hosting the Great Migration alongside lion prides, leopards, and elephants.', 'published', true, '["Great Migration", "Hot Air Balloon Safari", "Luxury Tented Camps"]'::jsonb, 'June - October')
ON CONFLICT (id) DO UPDATE SET 
title = EXCLUDED.title,
starting_price = EXCLUDED.starting_price,
description = EXCLUDED.description,
image_url = EXCLUDED.image_url;

INSERT INTO public.packages (id, title, destination, duration, days, nights, included_guests, price, badge, rating, reviews_count, featured_image, description, status, featured)
VALUES
('pkg-1', 'Amalfi Coast Escape', 'Amalfi Coast Escape', '7 Days / 6 Nights', 7, 6, 2, 285000.00, '15% OFF', 4.96, 248, 'assets/images/amalfi-view-1.jpg', '7 days exploring Sorrento, Capri, and Positano with private boat tour.', 'published', true),
('pkg-2', 'Kyoto Zen Retreat', 'Kyoto Zen Retreat', '8 Days / 7 Nights', 8, 7, 2, 320000.00, '12% OFF', 4.95, 312, 'assets/images/kyoto-view-1.jpg', 'Immersive cultural experience with luxury ryokan stay and private guide.', 'published', true),
('pkg-3', 'Maldives Private Haven', 'Maldives Private Haven', '7 Days / 6 Nights', 7, 6, 2, 450000.00, 'BEST SELLER', 4.99, 512, 'assets/images/maldives-view-1.jpg', 'All-inclusive overwater villa with private butler service and daily spa.', 'published', true),
('pkg-4', 'Patagonia Odyssey', 'Patagonia Odyssey', '10 Days / 9 Nights', 10, 9, 2, 345000.00, '18% OFF', 4.93, 187, 'assets/images/patagonia-view-1.jpg', 'Guided alpine trekking adventure across Southern Patagonia.', 'published', true),
('pkg-5', 'St. Moritz Alpine Escape', 'St. Moritz Alpine Escape', '6 Days / 5 Nights', 6, 5, 2, 490000.00, '10% OFF', 4.94, 204, 'assets/images/stmoritz-view-1.jpg', 'VIP luxury ski experience with private helicopter transfer.', 'published', true),
('pkg-6', 'Serengeti Safari Expedition', 'Serengeti Safari Expedition', '7 Days / 6 Nights', 7, 6, 2, 385000.00, 'EXCLUSIVE', 4.98, 394, 'assets/images/serengeti-view-1.jpg', 'Unforgettable Big Five safari experience with luxury tented accommodations.', 'published', true)
ON CONFLICT (id) DO UPDATE SET
title = EXCLUDED.title,
price = EXCLUDED.price,
description = EXCLUDED.description,
featured_image = EXCLUDED.featured_image;

INSERT INTO public.hotels (id, name, location, price, nights, included_guests, hero_image, description, star_rating, status)
VALUES
('hotel-1', 'Le Sirenuse', 'Positano, Italy', 120000.00, 1, 2, 'assets/images/hotel-luxury.jpg', 'Cliffside luxury hotel overlooking Positano bay.', 5, 'published'),
('hotel-2', 'Aman Kyoto', 'Kyoto, Japan', 180000.00, 1, 2, 'assets/images/kyoto-view-2.jpg', 'Secret garden sanctuary with private thermal onsens.', 5, 'published'),
('hotel-3', 'Soneva Jani', 'Noonu Atoll, Maldives', 350000.00, 1, 2, 'assets/images/hotel-overwater.jpg', 'Iconic overwater villas with private water slides.', 5, 'published')
ON CONFLICT (id) DO UPDATE SET
name = EXCLUDED.name,
price = EXCLUDED.price,
hero_image = EXCLUDED.hero_image;


INSERT INTO public.coupons (id, code, type, uses, limit_count, expiry, status)
VALUES
('c-1', 'SUMMER2026', 'Fixed ($200)', 142, 500, 'Aug 31, 2026', 'Active'),
('c-2', 'WANDER50', 'Fixed ($50)', 329, 1000, 'Dec 31, 2026', 'Active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.blogs (id, title, author, views, date, category, content, status)
VALUES
('BL-01', 'Ultimate Maldives Travel Guide 2026', 'Emma Watson', 14200, 'Jul 10, 2026', 'Travel Tips', 'Discover the best resort islands, underwater restaurants, and luxury transfers in the Maldives.', 'published'),
('BL-02', 'Japan Cherry Blossom Season Essential Tips', 'Kenji Mori', 9800, 'Jul 15, 2026', 'Cultural', 'Planning your trip to Kyoto and Tokyo during peak Sakura bloom season.', 'published')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.reviews (id, customer, trip, rating, comment, status)
VALUES
('RV-022', 'Sarah Mitchell', 'Santorini Sunset Honeymoon', 5, 'Absolutely breathtaking experience! Everything was seamless from start to finish.', 'approved'),
('RV-021', 'James Kowalski', 'Japan Family Cultural Tour', 5, 'Ventoura arranged the most incredible private tea ceremony and bullet train passes.', 'approved')
ON CONFLICT (id) DO NOTHING;

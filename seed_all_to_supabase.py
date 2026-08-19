import json
import os
import supabase_client

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'cms_store.json')

def clean_record(row, valid_keys):
    return {k: v for k, v in row.items() if k in valid_keys and v is not None}

def seed_all():
    if not os.path.exists(DATA_FILE):
        print("No cms_store.json found.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Destinations
    dest_keys = {'id', 'title', 'city', 'country', 'rating', 'starting_price', 'days', 'nights', 'included_guests', 'weather', 'category', 'image_url', 'description', 'status', 'featured', 'highlights', 'best_season'}
    d_list = []
    for d in data.get('destinations', []):
        r = d.copy()
        r['starting_price'] = r.get('startingPrice') or r.get('starting_price', 0)
        r['image_url'] = r.get('image') or r.get('image_url') or r.get('imageUrl', '')
        r['best_season'] = r.get('bestSeason') or r.get('best_season', '')
        r['included_guests'] = r.get('includedGuests') or r.get('included_guests', 2)
        d_list.append(clean_record(r, dest_keys))
    ok, res = supabase_client.sync_collection_to_supabase('destinations', d_list)
    print(f"Destinations: {ok}")

    # Packages
    pkg_keys = {'id', 'title', 'destination', 'duration', 'days', 'nights', 'included_guests', 'price', 'original_price', 'badge', 'rating', 'reviews_count', 'featured_image', 'description', 'highlights', 'status', 'featured'}
    p_list = []
    for p in data.get('packages', []):
        r = p.copy()
        r['featured_image'] = r.get('featuredImage') or r.get('featured_image') or r.get('image', '')
        r['reviews_count'] = r.get('reviewsCount') or r.get('reviews_count', 0)
        r['included_guests'] = r.get('includedGuests') or r.get('included_guests', 2)
        r['original_price'] = r.get('originalPrice') or r.get('original_price')
        p_list.append(clean_record(r, pkg_keys))
    ok, res = supabase_client.sync_collection_to_supabase('packages', p_list)
    print(f"Packages: {ok}")

    # Hotels
    hotel_keys = {'id', 'name', 'location', 'price', 'nights', 'included_guests', 'hero_image', 'description', 'star_rating', 'amenities', 'status'}
    h_list = []
    for h in data.get('hotels', []):
        r = h.copy()
        r['hero_image'] = r.get('heroImage') or r.get('hero_image') or r.get('image', '')
        r['star_rating'] = r.get('starRating') or r.get('star_rating', 5)
        r['included_guests'] = r.get('includedGuests') or r.get('included_guests', 2)
        h_list.append(clean_record(r, hotel_keys))
    ok, res = supabase_client.sync_collection_to_supabase('hotels', h_list)
    print(f"Hotels: {ok}")

    # Coupons
    cp_keys = {'id', 'code', 'type', 'uses', 'limit_count', 'expiry', 'status'}
    c_list = []
    for c in data.get('coupons', []):
        r = c.copy()
        r['limit_count'] = r.get('limit') or r.get('limit_count', 100)
        c_list.append(clean_record(r, cp_keys))
    ok, res = supabase_client.sync_collection_to_supabase('coupons', c_list)
    print(f"Coupons: {ok}")

    # Blogs
    blog_keys = {'id', 'title', 'author', 'views', 'date', 'category', 'image', 'content', 'status'}
    b_list = [clean_record(b, blog_keys) for b in data.get('blogs', [])]
    ok, res = supabase_client.sync_collection_to_supabase('blogs', b_list)
    print(f"Blogs: {ok}")

    # Reviews
    rev_keys = {'id', 'customer', 'trip', 'rating', 'comment', 'status'}
    rv_list = [clean_record(rv, rev_keys) for rv in data.get('reviews', [])]
    ok, res = supabase_client.sync_collection_to_supabase('reviews', rv_list)
    print(f"Reviews: {ok}")

    # Inquiries
    inq_keys = {'id', 'ref_no', 'customer_name', 'email', 'phone', 'product_type', 'product_id', 'product_name', 'destination', 'travel_date', 'price', 'duration', 'adults', 'children', 'message', 'status', 'source'}
    iq_list = []
    for iq in data.get('inquiries', []):
        r = iq.copy()
        r['customer_name'] = r.get('customerName') or r.get('name') or 'Customer'
        r['ref_no'] = r.get('refNo') or r.get('ref_no')
        r['product_type'] = r.get('productType') or r.get('product_type')
        r['product_id'] = r.get('productId') or r.get('product_id')
        r['product_name'] = r.get('productName') or r.get('product_name')
        r['travel_date'] = str(r.get('travelDate') or r.get('travel_date', ''))
        iq_list.append(clean_record(r, inq_keys))
    ok, res = supabase_client.sync_collection_to_supabase('inquiries', iq_list)
    print(f"Inquiries: {ok}")

    # Cruises
    cruise_keys = {'id', 'name', 'cruise_line', 'route', 'duration', 'price', 'hero_image', 'description', 'rating', 'amenities', 'status'}
    cr_list = []
    for cr in data.get('cruises', []):
        r = cr.copy()
        r['cruise_line'] = r.get('cruiseLine') or r.get('cruise_line', 'Ventoura Luxury')
        r['hero_image'] = r.get('heroImage') or r.get('hero_image') or r.get('image', '')
        cr_list.append(clean_record(r, cruise_keys))
    ok, res = supabase_client.sync_collection_to_supabase('cruises', cr_list)
    print(f"Cruises: {ok}")

    # Gallery
    gal_keys = {'id', 'title', 'location', 'category', 'image_url', 'likes'}
    g_list = []
    for g in data.get('gallery', []):
        r = g.copy()
        r['image_url'] = r.get('imageUrl') or r.get('image_url') or r.get('image', '')
        g_list.append(clean_record(r, gal_keys))
    ok, res = supabase_client.sync_collection_to_supabase('gallery', g_list)
    print(f"Gallery: {ok}")

    # Flights
    flight_keys = {'id', 'airline', 'flight_number', 'origin', 'destination', 'price', 'departure_time', 'arrival_time', 'flight_class', 'status'}
    fl_list = []
    for fl in data.get('flights', []):
        r = fl.copy()
        r['flight_number'] = r.get('flightNumber') or r.get('flight_number', '')
        r['departure_time'] = r.get('departureTime') or r.get('departure_time', '')
        r['arrival_time'] = r.get('arrivalTime') or r.get('arrival_time', '')
        r['flight_class'] = r.get('flightClass') or r.get('flight_class', 'First Class')
        fl_list.append(clean_record(r, flight_keys))
    ok, res = supabase_client.sync_collection_to_supabase('flights', fl_list)
    print(f"Flights: {ok}")

    # Cars
    car_keys = {'id', 'car_model', 'category', 'location', 'price_per_day', 'image', 'seats', 'transmission', 'status'}
    car_list = []
    for car in data.get('cars', []):
        r = car.copy()
        r['car_model'] = r.get('carModel') or r.get('car_model', '')
        r['price_per_day'] = r.get('pricePerDay') or r.get('price_per_day', 0)
        car_list.append(clean_record(r, car_keys))
    ok, res = supabase_client.sync_collection_to_supabase('cars', car_list)
    print(f"Cars: {ok}")

if __name__ == "__main__":
    seed_all()

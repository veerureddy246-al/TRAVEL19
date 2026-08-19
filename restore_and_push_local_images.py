import json
import os
import supabase_client

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'cms_store.json')

def restore_local_image_paths():
    if not os.path.exists(DATA_FILE):
        print("cms_store.json not found.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 1. Restore Destinations
    dest_img_map = {
        'dest-1': 'assets/images/amalfi-view-1.jpg',
        'dest-2': 'assets/images/kyoto-view-1.jpg',
        'dest-3': 'assets/images/maldives-view-1.jpg',
        'dest-4': 'assets/images/patagonia-view-1.jpg',
        'dest-5': 'assets/images/serengeti-view-1.jpg',
        'dest-6': 'assets/images/stmoritz-view-1.jpg',
    }
    for dest in data.get('destinations', []):
        d_id = str(dest.get('id', ''))
        if d_id in dest_img_map:
            dest['image'] = dest_img_map[d_id]
        elif not dest.get('image') or 'unsplash.com' in str(dest.get('image', '')):
            dest['image'] = 'assets/images/kerala-view-1.jpg'

    # 2. Restore Packages
    pkg_img_map = {
        'pkg-1': 'assets/images/amalfi-view-1.jpg',
        'pkg-2': 'assets/images/dest-paris.jpg',
        'pkg-3': 'assets/images/amalfi-view-2.jpg',
        'pkg-4': 'assets/images/kyoto-view-1.jpg',
        'pkg-5': 'assets/images/maldives-view-1.jpg',
        'pkg-6': 'assets/images/patagonia-view-1.jpg',
        'pkg-7': 'assets/images/serengeti-view-1.jpg',
        'pkg-8': 'assets/images/stmoritz-view-1.jpg',
        'pkg-9': 'assets/images/kerala-view-1.jpg',
    }
    for pkg in data.get('packages', []):
        p_id = str(pkg.get('id', ''))
        if p_id in pkg_img_map:
            pkg['image'] = pkg_img_map[p_id]
            pkg['featuredImage'] = pkg_img_map[p_id]
        elif not pkg.get('image') or 'unsplash.com' in str(pkg.get('image', '')):
            pkg['image'] = 'assets/images/dest-maldives.jpg'
            pkg['featuredImage'] = 'assets/images/dest-maldives.jpg'

    # 3. Restore Hotels
    hotel_img_map = {
        'hotel-1': 'assets/images/hotel-luxury.jpg',
        'hotel-2': 'assets/images/kyoto-view-2.jpg',
        'hotel-3': 'assets/images/hotel-overwater.jpg',
        'hotel-4': 'assets/images/hotel-boutique.jpg',
    }
    for hotel in data.get('hotels', []):
        h_id = str(hotel.get('id', ''))
        if h_id in hotel_img_map:
            hotel['heroImage'] = hotel_img_map[h_id]
            hotel['image'] = hotel_img_map[h_id]
        elif not hotel.get('heroImage') or 'unsplash.com' in str(hotel.get('heroImage', '')):
            hotel['heroImage'] = 'assets/images/hotel-luxury.jpg'
            hotel['image'] = 'assets/images/hotel-luxury.jpg'

    # 4. Restore Cruises
    cruise_img_map = {
        'cruise-1': 'assets/images/mediterranean-magic.jpg',
        'cruise-2': 'assets/images/maldives-view-2.jpg',
        'cruise-3': 'assets/images/amalfi-view-2.jpg',
    }
    for cruise in data.get('cruises', []):
        c_id = str(cruise.get('id', ''))
        if c_id in cruise_img_map:
            cruise['image'] = cruise_img_map[c_id]

    # Save cleaned data to cms_store.json
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    print("[OK] Successfully updated cms_store.json with original local image paths!")


    # Now push all updated records into Supabase Database tables
    def clean_record(row, valid_keys):
        return {k: v for k, v in row.items() if k in valid_keys and v is not None}

    # Destinations to Supabase
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
    print(f"Pushed Destinations to Supabase: {ok}")

    # Packages to Supabase
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
    print(f"Pushed Packages to Supabase: {ok}")

    # Hotels to Supabase
    hotel_keys = {'id', 'name', 'location', 'price', 'nights', 'included_guests', 'hero_image', 'description', 'star_rating', 'amenities', 'status'}
    h_list = []
    for h in data.get('hotels', []):
        r = h.copy()
        r['hero_image'] = r.get('heroImage') or r.get('hero_image') or r.get('image', '')
        r['star_rating'] = r.get('starRating') or r.get('star_rating', 5)
        r['included_guests'] = r.get('includedGuests') or r.get('included_guests', 2)
        h_list.append(clean_record(r, hotel_keys))
    ok, res = supabase_client.sync_collection_to_supabase('hotels', h_list)
    print(f"Pushed Hotels to Supabase: {ok}")

    print("All original image paths successfully restored and synced into Supabase Database!")


if __name__ == "__main__":
    restore_local_image_paths()

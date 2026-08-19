import http.server
import socketserver
import json
import os
import urllib.parse
import time
import base64
import re
import supabase_client

PORT = 5000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'cms_store.json')
UPLOAD_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'uploads')

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

def read_db():
    default_keys = ["destinations", "packages", "hotels", "cruises", "flights", "cars", "blogs", "reviews", "gallery", "coupons", "users", "staff", "bookings", "inquiries", "refunds", "wishlists"]
    if not os.path.exists(DATA_FILE):
        return {k: [] for k in default_keys}
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for key in default_keys:
                if key not in data:
                    data[key] = []
            return data
    except Exception as e:
        print(f"Error reading DB file: {e}")
        return {k: [] for k in default_keys}

def write_db(data):
    try:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error writing DB file: {e}")

def format_supabase_payload(resource, body):
    if not isinstance(body, dict):
        return body
    r = body.copy()
    if resource == 'destinations':
        if 'startingPrice' in r and 'starting_price' not in r:
            r['starting_price'] = r.pop('startingPrice')
        if 'image' in r and 'image_url' not in r:
            r['image_url'] = r.pop('image')
        if 'bestSeason' in r and 'best_season' not in r:
            r['best_season'] = r.pop('bestSeason')
        if 'includedGuests' in r and 'included_guests' not in r:
            r['included_guests'] = r.pop('includedGuests')
    elif resource == 'packages':
        if 'featuredImage' in r and 'featured_image' not in r:
            r['featured_image'] = r.get('featuredImage') or r.get('image', '')
        elif 'image' in r and 'featured_image' not in r:
            r['featured_image'] = r['image']
        if 'reviewsCount' in r and 'reviews_count' not in r:
            r['reviews_count'] = r.pop('reviewsCount')
        if 'includedGuests' in r and 'included_guests' not in r:
            r['included_guests'] = r.pop('includedGuests')
        if 'originalPrice' in r and 'original_price' not in r:
            r['original_price'] = r.pop('originalPrice')
    elif resource == 'hotels':
        if 'heroImage' in r and 'hero_image' not in r:
            r['hero_image'] = r.get('heroImage') or r.get('image', '')
        elif 'image' in r and 'hero_image' not in r:
            r['hero_image'] = r['image']
        if 'starRating' in r and 'star_rating' not in r:
            r['star_rating'] = r.pop('starRating')
        if 'includedGuests' in r and 'included_guests' not in r:
            r['included_guests'] = r.pop('includedGuests')
    elif resource == 'bookings':
        full_name = r.get('full_name') or r.get('fullName') or r.get('customer_name') or r.get('customerName') or r.get('travelerName') or r.get('traveler_name') or r.get('name') or 'Customer'
        booking_ref = r.get('booking_reference') or r.get('bookingReference') or r.get('ref_no') or r.get('refNo') or r.get('id') or f"BK-{int(time.time()*1000)%1000000:06d}"
        item_title = r.get('item_title') or r.get('itemTitle') or r.get('product_name') or r.get('productName') or r.get('package') or r.get('destination') or r.get('title') or 'Luxury Travel Service'
        travel_date = str(r.get('travel_date') or r.get('travelDate') or r.get('bookingDate') or '') or None
        travelers_count = int(r.get('travelers_count') or r.get('travelersCount') or r.get('guests') or r.get('adults') or 1)
        total_amount = float(r.get('total_amount') or r.get('totalAmount') or r.get('totalPaid') or r.get('price') or r.get('amount') or 0)
        email = r.get('email') or r.get('userEmail') or ''
        phone = r.get('phone') or ''

        sp_booking = {
            'id': str(r.get('id') or f"book-{int(time.time()*1000)}"),
            'booking_reference': booking_ref,
            'user_id': str(r.get('user_id') or r.get('userId') or ''),
            'full_name': full_name,
            'email': email,
            'phone': phone,
            'item_title': item_title,
            'travel_date': travel_date,
            'travelers_count': travelers_count,
            'total_amount': total_amount,
            'payment_status': r.get('payment_status') or r.get('paymentStatus') or 'Pending',
            'booking_status': (r.get('booking_status') or r.get('bookingStatus') or r.get('status') or 'Confirmed').capitalize()
        }
        return {k: v for k, v in sp_booking.items() if v is not None}
    elif resource == 'inquiries':
        customer_name = r.get('customer_name') or r.get('customerName') or f"{r.get('first_name', '')} {r.get('last_name', '')}".strip() or 'Customer'
        ref_no = r.get('ref_no') or r.get('refNo') or f"VT-{int(time.time()*1000)%1000000:06d}"
        product_type = r.get('product_type') or r.get('productType') or 'contact_form'
        product_id = r.get('product_id') or r.get('productId')
        product_name = r.get('product_name') or r.get('productName') or r.get('interest_category') or 'General Enquiry'
        destination = r.get('destination') or r.get('product_name')
        travel_date = str(r.get('travel_date') or r.get('travelDate') or '') or None
        message = r.get('message') or ''
        admin_reply = r.get('admin_reply') or r.get('adminReply')
        if admin_reply and '[Ventoura Reply]' not in message:
            message = f"{message}\n\n[Ventoura Reply]: {admin_reply}"

        sp_inq = {
            'id': str(r.get('id') or f"inqu-{int(time.time()*1000)}"),
            'ref_no': ref_no,
            'customer_name': customer_name,
            'email': r.get('email', ''),
            'phone': r.get('phone', ''),
            'product_type': product_type,
            'product_id': product_id,
            'product_name': product_name,
            'destination': destination,
            'travel_date': travel_date,
            'price': r.get('price'),
            'duration': r.get('duration'),
            'adults': r.get('adults'),
            'children': r.get('children'),
            'message': message,
            'status': (r.get('status') or 'NEW').upper(),
            'source': r.get('source') or 'Website Contact Form'
        }
        return {k: v for k, v in sp_inq.items() if v is not None}
    elif resource == 'coupons':
        code = str(r.get('code') or '').strip().upper()
        disc_type = str(r.get('discount_type') or r.get('type') or 'percentage').lower()
        disc_val = float(r.get('discount_value') or r.get('value') or (15 if 'percent' in disc_type else 25000))
        type_str = f"Percentage ({int(disc_val)}%)" if 'percent' in disc_type else f"Fixed (₹{int(disc_val):,})"
        
        sp_coupon = {
            'id': str(r.get('id') or f"coup-{int(time.time()*1000)}"),
            'code': code,
            'type': type_str,
            'uses': int(r.get('uses') or r.get('used_count') or 0),
            'limit_count': int(r.get('limit_count') or r.get('usage_limit') or r.get('limit') or 500),
            'expiry': str(r.get('expiry') or r.get('expiry_date') or '2026-12-31'),
            'status': str(r.get('status') or 'Active').capitalize()
        }
        return sp_coupon
    return r

def normalize_item_for_frontend(item):
    if not isinstance(item, dict):
        return item
    r = item.copy()

    # Inquiries normalization
    if 'ref_no' in r or 'customer_name' in r or 'product_type' in r:
        r['refNo'] = r.get('ref_no') or r.get('refNo')
        r['customerName'] = r.get('customer_name') or r.get('customerName')
        r['productName'] = r.get('product_name') or r.get('productName')
        r['productType'] = r.get('product_type') or r.get('productType')
        msg = r.get('message') or ''
        if '[Ventoura Reply]:' in msg and not r.get('admin_reply'):
            parts = msg.split('[Ventoura Reply]:', 1)
            r['message'] = parts[0].strip()
            r['admin_reply'] = parts[1].strip()

    # Bookings normalization
    if 'booking_reference' in r or 'full_name' in r or 'item_title' in r or 'travelerName' in r or 'totalPaid' in r:
        r['refNo'] = r.get('booking_reference') or r.get('bookingReference') or r.get('ref_no') or r.get('refNo') or r.get('id')
        r['bookingReference'] = r['refNo']
        r['customerName'] = r.get('full_name') or r.get('customerName') or r.get('travelerName') or r.get('name') or 'Valued Traveler'
        r['productName'] = r.get('item_title') or r.get('itemTitle') or r.get('productName') or r.get('package') or r.get('title') or 'Luxury Travel Experience'
        r['itemTitle'] = r['productName']
        r['bookingType'] = r.get('booking_type') or r.get('bookingType') or r.get('product_type') or r.get('productType') or 'Tour Package'
        r['productId'] = r.get('item_id') or r.get('itemId') or r.get('product_id') or r.get('productId') or 'custom-item'
        r['selectedPlan'] = r.get('selected_plan') or r.get('selectedPlan') or r.get('plan') or 'Luxury Itinerary'
        r['travelDate'] = r.get('travel_date') or r.get('travelDate') or r.get('bookingDate')
        r['guests'] = r.get('travelers_count') or r.get('travelersCount') or r.get('guests') or 1
        r['price'] = r.get('total_amount') or r.get('totalAmount') or r.get('totalPaid') or r.get('price') or r.get('amount') or 0
        r['status'] = r.get('booking_status') or r.get('bookingStatus') or r.get('status') or 'Confirmed'
        r['email'] = r.get('email') or r.get('userEmail') or ''
        r['phone'] = r.get('phone') or 'N/A'

    # Title & Name normalization across all resources
    ttl = r.get('title') or r.get('name') or r.get('vessel') or r.get('vehicle') or r.get('question')
    if ttl:
        r['title'] = ttl
        r['name'] = ttl

    # Image normalization
    img = r.get('image') or r.get('image_url') or r.get('imageUrl') or r.get('featured_image') or r.get('featuredImage') or r.get('hero_image') or r.get('heroImage') or r.get('heroImg') or ''
    if img:
        r['image'] = img
        r['image_url'] = img
        r['imageUrl'] = img
        r['featuredImage'] = img
        r['featured_image'] = img
        r['heroImage'] = img
        r['hero_image'] = img
        r['heroImg'] = img

    # Price normalization
    price = r.get('startingPrice') or r.get('starting_price') or r.get('price')
    if price is not None:
        r['startingPrice'] = price
        r['starting_price'] = price
        r['price'] = price

    # Guests normalization
    guests = r.get('includedGuests') or r.get('included_guests')
    if guests is not None:
        r['includedGuests'] = guests
        r['included_guests'] = guests

    # Category normalization for packages
    cat = r.get('category') or r.get('package_category') or r.get('type')
    if not cat:
        title_dest = f"{r.get('title', '')} {r.get('destination', '')} {r.get('description', '')}".lower()
        if any(w in title_dest for w in ['maldives', 'beach', 'baa atoll', 'coastal', 'island']):
            cat = 'beach'
        elif any(w in title_dest for w in ['patagonia', 'adventure', 'trek', 'hiking', 'glacier']):
            cat = 'adventure'
        elif any(w in title_dest for w in ['amalfi', 'luxury', 'st. moritz', 'haven', 'villa', 'retreat']):
            cat = 'luxury'
        elif any(w in title_dest for w in ['honeymoon', 'romance', 'couple', 'lagoon']):
            cat = 'honeymoon'
        elif any(w in title_dest for w in ['family', 'heritage', 'rajasthan']):
            cat = 'family'
        elif any(w in title_dest for w in ['solo', 'ubud', 'bali', 'mindfulness']):
            cat = 'solo'
        elif any(w in title_dest for w in ['business', 'executive', 'dubai']):
            cat = 'business'
        elif any(w in title_dest for w in ['serengeti', 'safari', 'wildlife', 'tanzania']):
            cat = 'safari'
        elif any(w in title_dest for w in ['cruise', 'yacht', 'voyage', 'greek']):
            cat = 'cruise'
        elif any(w in title_dest for w in ['kyoto', 'pilgrimage', 'zen', 'temple', 'spiritual']):
            cat = 'pilgrimage'
        elif any(w in title_dest for w in ['road', 'drive', 'panoramic', 'swiss alpine']):
            cat = 'road'
        elif any(w in title_dest for w in ['camping', 'glamping', 'dome', 'iceland', 'aurora']):
            cat = 'camping'
        else:
            cat = 'luxury'

    r['category'] = str(cat).lower()
    if 'categories' not in r or not isinstance(r['categories'], list):
        r['categories'] = [r['category']]

    return r

class VentouraUnifiedServerHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def send_json_response(self, data, status_code=200):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        try:
            self.wfile.write(body)
        except (ConnectionResetError, BrokenPipeError):
            pass

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path_str = parsed_url.path.rstrip('/')
        query_params = urllib.parse.parse_qs(parsed_url.query)

        if path_str.startswith('/api'):
            db = read_db()
            is_admin_call = '/admin' in path_str or 'all' in query_params

            resource_key = None
            if path_str in ['/api/destinations', '/api/destination', '/api/admin/destinations']:
                resource_key = 'destinations'
            elif path_str in ['/api/packages', '/api/package', '/api/admin/packages']:
                resource_key = 'packages'
            elif path_str in ['/api/hotels', '/api/hotel', '/api/admin/hotels']:
                resource_key = 'hotels'
            elif path_str in ['/api/cruises', '/api/cruise', '/api/admin/cruises']:
                resource_key = 'cruises'
            elif path_str in ['/api/flights', '/api/admin/flights']:
                resource_key = 'flights'
            elif path_str in ['/api/cars', '/api/admin/cars']:
                resource_key = 'cars'
            elif path_str in ['/api/blogs', '/api/admin/blogs']:
                resource_key = 'blogs'
            elif path_str in ['/api/reviews', '/api/admin/reviews']:
                resource_key = 'reviews'
            elif path_str in ['/api/gallery', '/api/admin/gallery']:
                resource_key = 'gallery'
            elif path_str in ['/api/coupons', '/api/admin/coupons']:
                resource_key = 'coupons'
            elif path_str in ['/api/users', '/api/admin/users']:
                resource_key = 'users'
            elif path_str in ['/api/staff', '/api/admin/staff']:
                resource_key = 'staff'
            elif path_str in ['/api/bookings', '/api/booking', '/api/admin/bookings']:
                resource_key = 'bookings'
            elif path_str in ['/api/enquiries', '/api/enquiry', '/api/inquiries', '/api/inquiry', '/api/admin/enquiries', '/api/admin/inquiries']:
                resource_key = 'inquiries'
            elif path_str in ['/api/wishlist', '/api/wishlists', '/api/admin/wishlists']:
                resource_key = 'wishlists'
            elif path_str in ['/api/faqs', '/api/faq', '/api/admin/faqs']:
                resource_key = 'faqs'
            elif path_str in ['/api/insurance', '/api/admin/insurance']:
                resource_key = 'insurance'
            elif path_str in ['/api/visa', '/api/visas', '/api/admin/visa', '/api/admin/visas']:
                resource_key = 'visa'
            elif path_str in ['/api/payments', '/api/payment', '/api/admin/payments']:
                resource_key = 'payments'
            elif path_str in ['/api/refunds', '/api/refund', '/api/admin/refunds']:
                resource_key = 'refunds'

            if resource_key:
                user_id_param = query_params.get('user_id', [None])[0]
                sp_tables = ['destinations', 'packages', 'hotels', 'cruises', 'flights', 'cars', 'blogs', 'reviews', 'gallery', 'coupons', 'users', 'staff', 'bookings', 'inquiries', 'refunds']
                if resource_key in sp_tables:
                    sp_ok, sp_data = supabase_client.supabase_request(resource_key, 'GET')
                else:
                    sp_ok, sp_data = False, None
                local_items = db.get(resource_key, [])

                if resource_key == 'coupons':
                    # Merge local (authoritative, has rich fields) with Supabase by coupon code
                    code_dict = {str(x.get('code', '')).upper(): x for x in local_items if x.get('code')}
                    if sp_ok and isinstance(sp_data, list):
                        for sp_item in sp_data:
                            sp_code = str(sp_item.get('code', '')).upper()
                            if sp_code in code_dict:
                                local_rec = code_dict[sp_code]
                                if sp_item.get('uses') is not None:
                                    local_rec['uses'] = sp_item['uses']
                                if sp_item.get('status') and not local_rec.get('status'):
                                    local_rec['status'] = sp_item['status']
                                code_dict[sp_code] = local_rec
                            else:
                                code_dict[sp_code] = sp_item
                    items = list(code_dict.values())
                else:
                    # Universal ID-keyed merge (local takes priority for rich fields, Supabase enriches)
                    local_dict = {str(x.get('id', '')): x for x in local_items if x.get('id')}
                    if sp_ok and isinstance(sp_data, list):
                        for sp_item in sp_data:
                            sp_id = str(sp_item.get('id', ''))
                            if sp_id in local_dict:
                                merged = dict(sp_item)
                                merged.update(local_dict[sp_id])
                                local_dict[sp_id] = merged
                            else:
                                local_dict[sp_id] = sp_item
                    items = list(local_dict.values())
                    if resource_key in ['inquiries', 'bookings']:
                        def get_item_sort_key(item):
                            t = item.get('created_at') or item.get('createdAt') or str(item.get('id', ''))
                            return str(t)
                        items.sort(key=get_item_sort_key, reverse=True)
                
                if not is_admin_call and resource_key not in ['wishlists', 'inquiries', 'bookings', 'users', 'staff']:
                    items = [i for i in items if str(i.get("status", "published")).lower() in ["published", "active", "approved"]]
                elif resource_key == 'wishlists' and user_id_param:
                    items = [i for i in items if str(i.get('user_id')) == str(user_id_param)]
                
                normalized_items = [normalize_item_for_frontend(x) for x in items]
                resp = {"success": True, "count": len(normalized_items), "data": normalized_items, "source": "supabase" if sp_ok else "database"}
                self.send_json_response(resp)
                return

            elif path_str in ['/api/admin/stats']:
                d_count = len([d for d in db.get("destinations", []) if d.get("status", "published") in ["published", "active"]])
                p_count = len([p for p in db.get("packages", []) if p.get("status", "published") in ["published", "active"]])
                resp = {
                    "success": True,
                    "data": {
                        "totalRevenue": 1520000,
                        "activeBookings": 1840,
                        "totalBookings": 1840,
                        "totalTravelers": 52301,
                        "registeredUsers": len(db.get("users", [])),
                        "averageRating": 4.92,
                        "activeDestinations": d_count,
                        "totalPackages": p_count,
                        "customerSatisfaction": 99.4
                    }
                }
            else:
                resp = {"success": True, "message": "Ventoura API operational", "path": path_str}

            self.send_json_response(resp)
            return

        if path_str == '/favicon.ico':
            logo_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets', 'images', 'logo.png')
            if os.path.exists(logo_path):
                self.send_response(200)
                self.send_header('Content-Type', 'image/png')
                self.send_header('Content-Length', str(os.path.getsize(logo_path)))
                self.send_header('Cache-Control', 'public, max-age=86400')
                self.end_headers()
                with open(logo_path, 'rb') as f:
                    self.wfile.write(f.read())
                return

        # High-Speed Video Streaming with Byte-Range (HTTP 206 Partial Content) Support
        clean_path = path_str.lstrip('/').split('?')[0]
        if os.path.exists(clean_path) and os.path.isfile(clean_path) and clean_path.lower().endswith(('.mp4', '.mov', '.webm', '.ogg', '.m4v')):
            try:
                file_size = os.path.getsize(clean_path)
                range_header = self.headers.get('Range', None)
                mime_type = 'video/mp4'
                if clean_path.lower().endswith('.mov'): mime_type = 'video/quicktime'
                elif clean_path.lower().endswith('.webm'): mime_type = 'video/webm'

                if range_header:
                    byte_range = range_header.strip().split('=')[-1]
                    parts = byte_range.split('-')
                    start = int(parts[0]) if parts[0] else 0
                    end = int(parts[1]) if len(parts) > 1 and parts[1] else file_size - 1
                    end = min(end, file_size - 1)
                    chunk_len = end - start + 1

                    self.send_response(206)
                    self.send_header('Content-Type', mime_type)
                    self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
                    self.send_header('Content-Length', str(chunk_len))
                    self.send_header('Accept-Ranges', 'bytes')
                    self.send_header('Cache-Control', 'public, max-age=31536000')
                    self.end_headers()

                    with open(clean_path, 'rb') as vf:
                        vf.seek(start)
                        self.wfile.write(vf.read(chunk_len))
                    return
                else:
                    self.send_response(200)
                    self.send_header('Content-Type', mime_type)
                    self.send_header('Content-Length', str(file_size))
                    self.send_header('Accept-Ranges', 'bytes')
                    self.send_header('Cache-Control', 'public, max-age=31536000')
                    self.end_headers()

                    with open(clean_path, 'rb') as vf:
                        self.wfile.write(vf.read())
                    return
            except (ConnectionResetError, BrokenPipeError):
                return
            except Exception as e:
                print(f"[Streaming Error] {e}")

        super().do_GET()

    def do_POST(self):
        self.handle_mutation_request('POST')

    def do_PUT(self):
        self.handle_mutation_request('PUT')

    def do_PATCH(self):
        self.handle_mutation_request('PATCH')

    def do_DELETE(self):
        self.handle_mutation_request('DELETE')

    def handle_mutation_request(self, method):
        parsed_url = urllib.parse.urlparse(self.path)
        path_str = parsed_url.path
        path_parts = [p for p in path_str.strip('/').split('/') if p]

        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length) if content_length > 0 else b'{}'

        # File upload handler
        if path_str == '/api/upload':
            try:
                body = json.loads(post_data.decode('utf-8'))
                file_data = body.get('file', '')
                file_name = body.get('filename', f"upload_{int(time.time()*1000)}.jpg")
                file_name = re.sub(r'[^a-zA-Z0-9_.-]', '_', file_name)
                
                if file_data.startswith('data:image'):
                    header, base64_str = file_data.split(',', 1)
                    ext_match = re.search(r'data:image/(\w+);', header)
                    ext = ext_match.group(1) if ext_match else 'jpg'
                    if not file_name.endswith(f".{ext}"):
                        file_name = f"{file_name}.{ext}"
                    image_bytes = base64.b64decode(base64_str)
                else:
                    image_bytes = post_data

                file_path = os.path.join(UPLOAD_DIR, file_name)
                with open(file_path, 'wb') as f:
                    f.write(image_bytes)

                rel_url = f"assets/images/uploads/{file_name}"
                resp = {"success": True, "url": rel_url, "filename": file_name}
            except Exception as err:
                print(f"Upload error: {err}")
                resp = {"success": False, "message": "Failed to upload image"}
            
            self.send_json_response(resp)
            return

        # Auth endpoints
        if path_str in ['/api/auth/login', '/api/auth/register']:
            try:
                body = json.loads(post_data.decode('utf-8')) if post_data else {}
                email = body.get('email', '').strip()
                name = body.get('name', '').strip() or email.split('@')[0]
                user_obj = {
                    'id': f"usr_{int(time.time()*1000)}",
                    'name': name or 'Member',
                    'email': email,
                    'role': 'user'
                }
                token_str = f"vt_jwt_{int(time.time()*1000)}"
                resp = {'success': True, 'user': user_obj, 'token': token_str}
            except Exception as e:
                resp = {'success': False, 'message': str(e)}
            self.send_json_response(resp)
            return

        # Coupon validation endpoint
        if path_str in ['/api/coupons/validate', '/api/coupon/validate']:
            try:
                body = json.loads(post_data.decode('utf-8')) if post_data else {}
                code = str(body.get('code') or '').strip().upper()
                booking_amount = float(body.get('amount') or body.get('price') or body.get('total_amount') or 0)
                
                db = read_db()
                sp_ok, sp_data = supabase_client.supabase_request('coupons', 'GET')
                coupons_list = db.get('coupons', [])
                if sp_ok and isinstance(sp_data, list):
                    code_map = {str(c.get('code','')).upper(): c for c in coupons_list}
                    for sp_c in sp_data:
                        sp_code = str(sp_c.get('code','')).upper()
                        if sp_code in code_map:
                            code_map[sp_code].update(sp_c)
                        else:
                            code_map[sp_code] = sp_c
                    coupons_list = list(code_map.values())
                
                matched = None
                for c in coupons_list:
                    if str(c.get('code', '')).strip().upper() == code:
                        matched = c
                        break
                
                if not matched:
                    resp = {'success': False, 'valid': False, 'error': f"Promo code '{code}' does not exist or is invalid."}
                    self.send_json_response(resp)
                    return
                
                # Check status
                status = str(matched.get('status') or 'Active').strip().lower()
                if status not in ['active', 'enabled', 'published']:
                    resp = {'success': False, 'valid': False, 'error': f"Coupon code '{code}' is currently inactive / disabled."}
                    self.send_json_response(resp)
                    return
                
                # Check start date
                start_date = str(matched.get('start_date') or matched.get('startDate') or '')
                current_iso = time.strftime('%Y-%m-%d')
                if start_date and start_date > current_iso:
                    resp = {'success': False, 'valid': False, 'error': f"Coupon '{code}' is not active yet (Valid from {start_date})."}
                    self.send_json_response(resp)
                    return
                
                # Check expiry
                expiry = str(matched.get('expiry') or matched.get('expiry_date') or matched.get('expiration') or '')
                if expiry:
                    if re.match(r'^\d{4}-\d{2}-\d{2}$', expiry):
                        if expiry < current_iso:
                            resp = {'success': False, 'valid': False, 'error': f"Coupon code '{code}' expired on {expiry}."}
                            self.send_json_response(resp)
                            return
                    else:
                        try:
                            t_parsed = time.strptime(expiry, '%b %d, %Y')
                            if time.mktime(t_parsed) < time.time() - 86400:
                                resp = {'success': False, 'valid': False, 'error': f"Coupon code '{code}' expired on {expiry}."}
                                self.send_json_response(resp)
                                return
                        except Exception:
                            pass
                
                # Check usage limit
                uses = int(matched.get('uses') or matched.get('used_count') or 0)
                limit = int(matched.get('limit_count') or matched.get('usage_limit') or matched.get('limit') or 500)
                if limit > 0 and uses >= limit:
                    resp = {'success': False, 'valid': False, 'error': f"Coupon code '{code}' has reached its maximum redemption limit ({limit} uses)."}
                    self.send_json_response(resp)
                    return
                
                # Check minimum booking amount
                min_amount = float(matched.get('min_amount') or matched.get('minBookingAmount') or matched.get('min_booking_amount') or 0)
                if min_amount > 0 and booking_amount < min_amount:
                    resp = {'success': False, 'valid': False, 'error': f"Minimum booking amount of ₹{int(min_amount):,} is required for coupon '{code}'."}
                    self.send_json_response(resp)
                    return
                
                # Calculate discount
                t_str = str(matched.get('type') or '')
                disc_type = str(matched.get('discount_type') or ('percentage' if 'percent' in t_str.lower() else 'fixed')).lower()
                disc_val = matched.get('discount_value')
                if disc_val is None:
                    nums = re.findall(r'\d+', t_str)
                    if nums:
                        disc_val = float(nums[0])
                        if disc_type == 'fixed' and disc_val < 1000:
                            disc_val = disc_val * 100
                    else:
                        disc_val = 15 if disc_type == 'percentage' else 25000
                else:
                    disc_val = float(disc_val)
                
                if disc_type == 'percentage':
                    discount_amount = round(booking_amount * (disc_val / 100.0), 2)
                    type_display = f"{int(disc_val)}% Off"
                else:
                    discount_amount = min(booking_amount, float(disc_val))
                    type_display = f"₹{int(disc_val):,} Off"
                
                final_total = max(0, round(booking_amount - discount_amount, 2))
                
                resp = {
                    'success': True,
                    'valid': True,
                    'code': code,
                    'discount_type': disc_type,
                    'discount_value': disc_val,
                    'discount_display': type_display,
                    'discount_amount': discount_amount,
                    'original_total': booking_amount,
                    'final_total': final_total,
                    'message': f"Coupon '{code}' applied! You save ₹{int(discount_amount):,} ({type_display})."
                }
            except Exception as e:
                resp = {'success': False, 'valid': False, 'error': str(e)}
            self.send_json_response(resp)
            return

        try:
            body = json.loads(post_data.decode('utf-8')) if post_data else {}
        except Exception:
            body = {}

        db = read_db()
        resource = None
        item_id = None

        if len(path_parts) >= 2 and path_parts[0] == 'api':
            if path_parts[1] == 'admin' and len(path_parts) >= 3:
                resource = path_parts[2]
                if len(path_parts) >= 4:
                    item_id = path_parts[3]
            elif path_parts[1] in ['destinations', 'destination', 'packages', 'package', 'hotels', 'hotel', 'cruises', 'cruise', 'flights', 'cars', 'blogs', 'reviews', 'gallery', 'coupons', 'users', 'staff', 'bookings', 'booking', 'inquiries', 'inquiry', 'enquiries', 'enquiry', 'payments', 'payment', 'refunds', 'refund', 'wishlist', 'wishlists', 'faqs', 'faq', 'insurance', 'visa', 'visas']:
                resource = path_parts[1]
                if resource in ['enquiry', 'enquiries', 'inquiry', 'inquiries']:
                    resource = 'inquiries'
                elif resource in ['faq', 'faqs']:
                    resource = 'faqs'
                elif resource in ['booking', 'bookings']:
                    resource = 'bookings'
                elif resource in ['payment', 'payments']:
                    resource = 'payments'
                elif resource in ['refund', 'refunds']:
                    resource = 'refunds'
                elif resource in ['wishlist', 'wishlists']:
                    resource = 'wishlists'
                elif resource in ['visa', 'visas']:
                    resource = 'visa'
                elif resource in ['insurance']:
                    resource = 'insurance'
                elif resource.endswith('e') and not resource.endswith('se'):
                    resource = resource + 's'
                elif not resource.endswith('s'):
                    resource = resource + 's'
                if len(path_parts) >= 3:
                    item_id = path_parts[2]

        if not resource or resource not in db:
            resp = {"success": True, "message": f"Action {method} processed", "data": body}
            self.send_json_response(resp)
            return

        items = db.get(resource, [])

        if method == 'POST':
            if not body.get('id'):
                body['id'] = f"{resource[:4]}-{int(time.time()*1000)}"
            if resource == 'bookings':
                count = len(items) + 1
                year = time.strftime('%Y')
                ref = body.get('booking_reference') or body.get('refNo') or f"BK-{year}-{count:04d}"
                body['refNo'] = ref
                body['booking_reference'] = ref
                if 'status' not in body:
                    body['status'] = 'Confirmed'
                if 'booking_status' not in body:
                    body['booking_status'] = body['status']
                if 'payment_status' not in body:
                    body['payment_status'] = 'Pending'
                if 'createdAt' not in body:
                    body['createdAt'] = time.strftime('%Y-%m-%d %H:%M:%S')

                # Update coupon usage if booking applied coupon
                c_code = str(body.get('coupon_code') or body.get('coupon') or '').strip().upper()
                if c_code:
                    c_list = db.get('coupons', [])
                    for c_item in c_list:
                        if str(c_item.get('code', '')).strip().upper() == c_code:
                            c_item['uses'] = int(c_item.get('uses') or 0) + 1
                            supabase_client.supabase_request('coupons', 'PATCH', {'uses': c_item['uses']}, {'code': c_code})
                            break
                    db['coupons'] = c_list
            elif resource == 'coupons':
                code = str(body.get('code') or '').strip().upper()
                body['code'] = code
                if 'status' not in body:
                    body['status'] = 'Active'
                if 'uses' not in body:
                    body['uses'] = 0
                if 'limit_count' not in body:
                    body['limit_count'] = int(body.get('limit') or body.get('usage_limit') or 500)
                body['limit'] = body['limit_count']
                disc_type = str(body.get('discount_type') or body.get('type') or 'percentage').lower()
                disc_val = float(body.get('discount_value') or body.get('value') or 15)
                body['discount_type'] = disc_type
                body['discount_value'] = disc_val
                body['type'] = f"Percentage ({int(disc_val)}%)" if 'percent' in disc_type else f"Fixed (₹{int(disc_val):,})"
            elif resource == 'inquiries':
                if not body.get('refNo'):
                    count = len(items) + 1
                    year = time.strftime('%Y')
                    body['refNo'] = f"VT-{year}-{count:04d}"
                if 'status' not in body:
                    body['status'] = 'NEW'
                if 'createdAt' not in body:
                    body['createdAt'] = time.strftime('%Y-%m-%d %H:%M:%S')
            elif 'status' not in body:
                body['status'] = 'published'

            items.insert(0, body)
            # For coupons, deduplicate by code — keep only the freshest record per code
            if resource == 'coupons':
                seen_codes = {}
                deduped = []
                for itm in items:
                    c = str(itm.get('code', '')).upper()
                    if c and c not in seen_codes:
                        seen_codes[c] = True
                        deduped.append(itm)
                items = deduped
            db[resource] = items
            write_db(db)

            # Sync with Supabase
            sp_payload = format_supabase_payload(resource, body)
            supabase_client.supabase_request(resource, 'POST', sp_payload)

            resp = {"success": True, "message": f"{resource.title()} record saved to database!", "data": body}

        elif method in ['PUT', 'PATCH']:
            target_id = item_id or body.get('id') or body.get('_id') or body.get('booking_reference') or body.get('refNo') or body.get('code')
            updated = False
            for idx, item in enumerate(items):
                if (str(item.get('id')) == str(target_id) or 
                    str(item.get('_id')) == str(target_id) or 
                    str(item.get('refNo')) == str(target_id) or 
                    str(item.get('booking_reference')) == str(target_id) or 
                    str(item.get('code', '')).upper() == str(target_id).upper()):
                    items[idx].update(body)
                    if resource == 'bookings' and 'status' in body:
                        items[idx]['booking_status'] = body['status']
                    if resource == 'coupons' and 'status' in body:
                        items[idx]['status'] = body['status']
                    updated = True
                    break
            # Only insert if item is complete and was meant to be created
            if not updated and body and (body.get('id') or body.get('title') or body.get('name') or body.get('code')):
                items.insert(0, body)

            # For coupons, deduplicate by code after every PUT/PATCH
            if resource == 'coupons':
                seen_codes = {}
                deduped = []
                for itm in items:
                    c = str(itm.get('code', '')).upper()
                    if c and c not in seen_codes:
                        seen_codes[c] = True
                        deduped.append(itm)
                items = deduped
            db[resource] = items
            write_db(db)

            # Sync with Supabase
            target_item = next((x for x in items if (str(x.get('id')) == str(target_id) or 
                                                     str(x.get('_id')) == str(target_id) or 
                                                     str(x.get('refNo')) == str(target_id) or 
                                                     str(x.get('booking_reference')) == str(target_id) or
                                                     str(x.get('code', '')).upper() == str(target_id).upper())), body)
            sp_payload = format_supabase_payload(resource, target_item)
            supabase_client.supabase_request(resource, 'POST', sp_payload)

            resp = {"success": True, "message": f"{resource.title()} record updated in database!", "data": body}

        elif method == 'DELETE':
            target_id = item_id or body.get('id') or body.get('_id') or body.get('code')
            db[resource] = [x for x in items if (str(x.get('id')) != str(target_id) and 
                                                 str(x.get('_id')) != str(target_id) and 
                                                 str(x.get('code', '')).upper() != str(target_id).upper())]
            write_db(db)

            # Sync deletion with Supabase
            supabase_client.supabase_request(resource, 'DELETE', {'id': target_id})

            resp = {"success": True, "message": f"{resource.title()} record deleted from database!"}

        self.send_json_response(resp)
import sys

def run(port=8000):
    os.chdir(BASE_DIR)
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        port = int(sys.argv[1])
    elif 'PORT' in os.environ:
        port = int(os.environ['PORT'])
    
    ports_to_try = [port, 8000, 5500, 3000, 8080]
    for p in ports_to_try:
        try:
            httpd = http.server.ThreadingHTTPServer(("127.0.0.1", p), VentouraUnifiedServerHandler)
            print(f"Ventoura Travel Unified Server running at http://localhost:{p}", flush=True)
            httpd.serve_forever()
            break
        except OSError as e:
            print(f"Port {p} is busy ({e}), trying next port...", flush=True)
            continue

if __name__ == "__main__":
    run()

import http.server
import socketserver
import json
import os
import urllib.parse
import datetime
import threading

PORT = 5000
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'cms_store.json')

# Thread lock for safe concurrent writes
_db_lock = threading.Lock()

def read_db():
    if not os.path.exists(DATA_FILE):
        return {}
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return {}

def write_db(data):
    try:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f'[DB] Write error: {e}')
        return False

class ClientWebsiteHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        # Only log API calls, suppress static file noise
        if '/api/' in (args[0] if args else ''):
            print(f'[{datetime.datetime.now().strftime("%H:%M:%S")}] {format % args}')

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path_str = parsed_url.path.rstrip('/')

        if path_str.startswith('/api'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()

            db = read_db()

            if path_str in ['/api/destinations', '/api/destination']:
                raw_items = db.get('destinations', [])
                published = [d for d in raw_items if d.get('status', 'published').lower() in ['published', 'active', 'approved']]
                resp = {"success": True, "count": len(published), "data": published}

            elif path_str == '/api/packages':
                raw_items = db.get('packages', [])
                published = [p for p in raw_items if p.get('status', 'published').lower() in ['published', 'active', 'approved']]
                resp = {"success": True, "count": len(published), "data": published}

            elif path_str == '/api/hotels':
                raw_items = db.get('hotels', [])
                published = [h for h in raw_items if h.get('status', 'published').lower() in ['published', 'active', 'approved']]
                resp = {"success": True, "count": len(published), "data": published}

            elif path_str == '/api/blogs':
                raw_items = db.get('blogs', [])
                published = [b for b in raw_items if b.get('status', 'published').lower() in ['published', 'active', 'approved']]
                resp = {"success": True, "count": len(published), "data": published}

            elif path_str == '/api/reviews':
                raw_items = db.get('reviews', [])
                approved = [r for r in raw_items if r.get('status', 'published').lower() in ['approved', 'published', 'active']]
                resp = {"success": True, "count": len(approved), "data": approved}

            elif path_str in ['/api/enquiries', '/api/bookings']:
                # Serve real enquiries from cms_store.json for Admin Portal
                inquiries = db.get('inquiries', [])
                resp = {"success": True, "count": len(inquiries), "data": inquiries}

            else:
                resp = {"success": True, "message": "Client API Operational", "path": path_str}

            self.wfile.write(json.dumps(resp).encode('utf-8'))
            return

        super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path_str = parsed_url.path.rstrip('/')

        if path_str.startswith('/api'):
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length) if content_length > 0 else b'{}'
            try:
                body = json.loads(post_data.decode('utf-8'))
            except Exception:
                body = {}

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()

            if path_str in ['/api/enquiries', '/api/bookings']:
                with _db_lock:
                    db = read_db()
                    inquiries = db.get('inquiries', [])

                    # Generate sequential VT-YYYY-NNNN reference
                    year = datetime.datetime.now().strftime('%Y')
                    existing_vt = [e.get('refNo', '') for e in inquiries if str(year) in e.get('refNo', '')]
                    next_num = len(existing_vt) + 1
                    ref_no = f'VT-{year}-{str(next_num).zfill(4)}'

                    # Generate unique ID
                    import time
                    enquiry_id = f'inqu-{int(time.time() * 1000)}'

                    # Build the enquiry record with all fields Admin expects
                    enquiry = {
                        'id': enquiry_id,
                        'refNo': ref_no,
                        'customerName': body.get('customerName') or body.get('name', 'Guest'),
                        'name': body.get('name') or body.get('customerName', 'Guest'),
                        'phone': body.get('phone', ''),
                        'email': body.get('email', ''),
                        'travelDate': body.get('travelDate', ''),
                        'productType': body.get('productType', 'destination'),
                        'productId': body.get('productId', ''),
                        'productName': body.get('productName', 'Travel Booking'),
                        'destination': body.get('destination', ''),
                        'price': body.get('price', 0),
                        'priceFormatted': body.get('priceFormatted', ''),
                        'duration': body.get('duration', ''),
                        'image': body.get('image', ''),
                        'status': 'NEW',
                        'source': body.get('source', 'Website Book Now'),
                        'createdAt': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    }

                    inquiries.insert(0, enquiry)  # Newest first
                    db['inquiries'] = inquiries
                    write_db(db)

                print(f'[BOOKING] New enquiry saved: {ref_no} — {enquiry["customerName"]} — {enquiry["productName"]}')
                resp = {
                    "success": True,
                    "message": "Booking enquiry saved successfully!",
                    "refNo": ref_no,
                    "data": {"refNo": ref_no, "id": enquiry_id}
                }

            elif path_str == '/api/ai/plan-trip':
                resp = {
                    "success": True,
                    "plan": {
                        "destination": body.get("destination", "Bespoke Journey"),
                        "days": body.get("days", 7),
                        "summary": "Customized luxury travel plan.",
                        "estimatedCost": 3900
                    }
                }
            else:
                resp = {"success": True, "message": "Request processed", "data": body}

            self.wfile.write(json.dumps(resp).encode('utf-8'))
            return

        self.send_error(404, "Not Found")

    def do_PATCH(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path_str = parsed_url.path

        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length) if content_length > 0 else b'{}'
        try:
            body = json.loads(post_data.decode('utf-8'))
        except Exception:
            body = {}

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

        # PATCH /api/enquiries/:id — update enquiry status
        if '/api/enquiries/' in path_str:
            parts = path_str.strip('/').split('/')
            target_id = parts[-1] if parts else ''
            new_status = body.get('status', 'NEW')

            with _db_lock:
                db = read_db()
                inquiries = db.get('inquiries', [])
                updated = False
                for inq in inquiries:
                    if inq.get('id') == target_id or inq.get('refNo') == target_id:
                        inq['status'] = new_status
                        updated = True
                        break
                if updated:
                    db['inquiries'] = inquiries
                    write_db(db)

            resp = {"success": True, "message": f"Status updated to {new_status}"}
        else:
            resp = {"success": True, "message": "PATCH processed"}

        self.wfile.write(json.dumps(resp).encode('utf-8'))

def run(port=PORT):
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), ClientWebsiteHandler) as httpd:
        print(f"[SERVER] Ventoura Travel Server running at http://localhost:{port}")
        print(f"[SERVER] Enquiries stored in: data/cms_store.json")
        httpd.serve_forever()

if __name__ == "__main__":
    run()

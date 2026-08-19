import http.server
import socketserver
import json
import os
import urllib.parse
import time

PORT = 5001
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'cms_store.json')

def read_db():
    if not os.path.exists(DATA_FILE):
        return {"destinations": [], "packages": [], "hotels": [], "blogs": [], "reviews": [], "coupons": []}
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading DB: {e}")
        return {"destinations": [], "packages": [], "hotels": [], "blogs": [], "reviews": [], "coupons": []}

def write_db(data):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

class AdminPortalHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path_str = parsed_url.path.rstrip('/')

        if path_str in ['', '/', '/index.html']:
            self.path = '/admin.html'

        if path_str.startswith('/api'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()

            db = read_db()

            if path_str == '/api/admin/stats':
                dest_count = len(db.get("destinations", []))
                pkg_count = len(db.get("packages", []))
                resp = {
                    "success": True,
                    "data": {
                        "totalRevenue": "$1,520,000",
                        "activeBookings": 1840,
                        "totalBookings": 1840,
                        "totalTravelers": 52301,
                        "registeredUsers": 52301,
                        "averageRating": 4.92,
                        "activeDestinations": dest_count,
                        "totalPackages": pkg_count,
                        "customerSatisfaction": 99.4,
                        "recentBookings": [
                            {"id": "WL-884921", "customer": "Eleanor Vance", "destination": "Maldives Overwater Haven", "amount": 9000, "status": "Confirmed"},
                            {"id": "WL-884922", "customer": "Marcus Sterling", "destination": "Kyoto Zen Sanctuary", "amount": 6400, "status": "Confirmed"},
                            {"id": "WL-884923", "customer": "Sophia Chen", "destination": "Amalfi Yacht Escape", "amount": 5700, "status": "Processing"}
                        ]
                    }
                }
            elif path_str in ['/api/destinations', '/api/admin/destinations']:
                resp = {"success": True, "count": len(db.get("destinations", [])), "data": db.get("destinations", [])}
            elif path_str in ['/api/packages', '/api/admin/packages']:
                resp = {"success": True, "count": len(db.get("packages", [])), "data": db.get("packages", [])}
            elif path_str in ['/api/hotels', '/api/admin/hotels']:
                resp = {"success": True, "count": len(db.get("hotels", [])), "data": db.get("hotels", [])}
            elif path_str in ['/api/blogs', '/api/admin/blogs']:
                resp = {"success": True, "count": len(db.get("blogs", [])), "data": db.get("blogs", [])}
            elif path_str in ['/api/reviews', '/api/admin/reviews']:
                resp = {"success": True, "count": len(db.get("reviews", [])), "data": db.get("reviews", [])}
            elif path_str in ['/api/coupons', '/api/admin/coupons']:
                resp = {"success": True, "count": len(db.get("coupons", [])), "data": db.get("coupons", [])}
            else:
                resp = {"success": True, "message": "Admin API Operational", "path": path_str}

            self.wfile.write(json.dumps(resp).encode('utf-8'))
            return

        super().do_GET()

    def handle_write_request(self, method):
        parsed_url = urllib.parse.urlparse(self.path)
        path_parts = [p for p in parsed_url.path.strip('/').split('/') if p]

        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length) if content_length > 0 else b'{}'
        try:
            body = json.loads(post_data.decode('utf-8'))
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
            elif path_parts[1] in ['destinations', 'packages', 'hotels', 'blogs', 'reviews', 'coupons']:
                resource = path_parts[1]
                if len(path_parts) >= 3:
                    item_id = path_parts[2]

        if not resource or resource not in db:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            if parsed_url.path == '/api/auth/login':
                resp = {"success": True, "token": "admin-jwt-token", "user": {"name": "Super Admin"}}
            else:
                resp = {"success": True, "message": "Action processed", "data": body}
            self.wfile.write(json.dumps(resp).encode('utf-8'))
            return

        items = db.get(resource, [])

        if method == 'POST':
            if not body.get('id'):
                body['id'] = f"{resource[:4]}-{int(time.time()*1000)}"
            if 'status' not in body:
                body['status'] = 'published'
            items.insert(0, body)
            db[resource] = items
            write_db(db)
            resp = {"success": True, "message": f"{resource.title()} created successfully!", "data": body}

        elif method in ['PUT', 'PATCH']:
            target_id = item_id or body.get('id')
            updated_item = None
            for idx, item in enumerate(items):
                if str(item.get('id')) == str(target_id) or str(item.get('_id')) == str(target_id):
                    items[idx].update(body)
                    updated_item = items[idx]
                    break
            if updated_item:
                db[resource] = items
                write_db(db)
                resp = {"success": True, "message": f"{resource.title()} updated successfully!", "data": updated_item}
            else:
                resp = {"success": False, "message": f"Item with id {target_id} not found."}

        elif method == 'DELETE':
            target_id = item_id or body.get('id')
            new_items = [item for item in items if str(item.get('id')) != str(target_id) and str(item.get('_id')) != str(target_id)]
            if len(new_items) < len(items):
                db[resource] = new_items
                write_db(db)
                resp = {"success": True, "message": f"Item {target_id} deleted successfully."}
            else:
                resp = {"success": False, "message": f"Item {target_id} not found."}

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(resp).encode('utf-8'))

    def do_POST(self):
        self.handle_write_request('POST')

    def do_PUT(self):
        self.handle_write_request('PUT')

    def do_PATCH(self):
        self.handle_write_request('PATCH')

    def do_DELETE(self):
        self.handle_write_request('DELETE')

def run(port=PORT):
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with http.server.ThreadingHTTPServer(("", port), AdminPortalHandler) as httpd:
        print(f"Admin Portal Server running at http://localhost:{port}")
        httpd.serve_forever()

if __name__ == "__main__":
    run()

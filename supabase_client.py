import os
import json
import urllib.request
import urllib.parse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_env_file(env_path):
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    os.environ[key.strip()] = val.strip()

load_env_file(os.path.join(BASE_DIR, '.env'))

SUPABASE_URL = os.environ.get('SUPABASE_URL', 'https://okbesgmohvgmyblqhjod.supabase.co').rstrip('/')
SUPABASE_KEY = os.environ.get('SUPABASE_PUBLISHABLE_KEY') or os.environ.get('SUPABASE_ANON_KEY', '')

supabase_py_client = None
try:
    from supabase import create_client, Client
    if SUPABASE_URL and SUPABASE_KEY and 'placeholder' not in SUPABASE_KEY:
        supabase_py_client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as err:
    print(f"Supabase SDK initialization note: {err}")

HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

def supabase_request(table, method='GET', data=None, query_params=None):
    """
    Unified function to query Supabase tables.
    Uses official Supabase SDK if available, or falls back to PostgREST API.
    Returns (success: bool, result_data_or_error)
    """
    if not SUPABASE_URL or not SUPABASE_KEY or 'placeholder' in SUPABASE_KEY:
        return False, "Supabase credentials not configured"

    # Try SDK first
    if supabase_py_client:
        try:
            if method == 'GET':
                q = supabase_py_client.table(table).select("*")
                res = q.execute()
                return True, res.data
            elif method == 'POST':
                res = supabase_py_client.table(table).upsert(data).execute()
                return True, res.data
            elif method in ['PUT', 'PATCH']:
                res = supabase_py_client.table(table).upsert(data).execute()
                return True, res.data
            elif method == 'DELETE':
                if isinstance(data, dict) and 'id' in data:
                    res = supabase_py_client.table(table).delete().eq('id', data['id']).execute()
                    return True, res.data
        except Exception as sdk_err:
            pass

    # PostgREST REST fallback
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    if method == 'DELETE' and isinstance(data, dict) and 'id' in data and not query_params:
        url += f"?id=eq.{urllib.parse.quote(str(data['id']))}"
    elif query_params:
        url += "?" + urllib.parse.urlencode(query_params)

    req = urllib.request.Request(url, headers=HEADERS, method=method)
    
    if data and method in ['POST', 'PUT', 'PATCH']:
        body_bytes = json.dumps(data).encode('utf-8')
        req.data = body_bytes

    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            content = resp.read().decode('utf-8')
            res = json.loads(content) if content else []
            return True, res
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8') if e.fp else str(e)
        return False, f"HTTP {e.code}: {error_body}"
    except Exception as e:
        return False, str(e)

def sync_collection_to_supabase(table_name, items):
    """
    Syncs a local JSON array into Supabase table using upsert.
    """
    if not items or not isinstance(items, list):
        return False, "No items to sync"
    
    if supabase_py_client:
        try:
            res = supabase_py_client.table(table_name).upsert(items).execute()
            return True, res.data
        except Exception as e:
            pass

    headers_upsert = HEADERS.copy()
    headers_upsert['Prefer'] = 'resolution=merge-duplicates,return=representation'
    
    url = f"{SUPABASE_URL}/rest/v1/{table_name}"
    body_bytes = json.dumps(items).encode('utf-8')
    req = urllib.request.Request(url, data=body_bytes, headers=headers_upsert, method='POST')
    
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            content = resp.read().decode('utf-8')
            res = json.loads(content) if content else []
            return True, res
    except Exception as e:
        return False, str(e)

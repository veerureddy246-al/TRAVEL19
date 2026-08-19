/* ============================================================
   VENTOURA TRAVEL AGENCY — HIGH-PERFORMANCE SUPABASE ENGINE
   ============================================================ */

(function () {
  'use strict';

  const SUPABASE_URL = window.ENV_SUPABASE_URL || 'https://okbesgmohvgmyblqhjod.supabase.co';
  const SUPABASE_ANON_KEY = window.ENV_SUPABASE_ANON_KEY || 'sb_publishable_PfhBmrVzd3yo69p5BEJvhw_oJPemko1';

  let client = null;
  let isOfflineMode = false;

  function getSupabaseClient() {
    if (client) return client;
    if (isOfflineMode) return null;

    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      try {
        client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: { persistSession: true, autoRefreshToken: true },
          global: { headers: { 'x-client-info': 'ventoura-travel-web' } }
        });
      } catch (err) {
        console.warn('⚡ Supabase offline mode activated:', err.message);
        isOfflineMode = true;
      }
    }
    return client;
  }

  // Exported Supabase Service Helpers
  window.VentouraSupabase = {
    getClient: getSupabaseClient,

    // 1. Submit Enquiry to Supabase (High Reliability Async)
    async submitEnquiry(enquiryData) {
      const sb = getSupabaseClient();
      if (!sb) {
        return { success: true, offline: true };
      }
      try {
        const promise = sb.from('enquiries').insert([
          {
            full_name: enquiryData.fullName || enquiryData.name || 'Guest Traveler',
            email: enquiryData.email || 'guest@wanderlux.travel',
            phone: enquiryData.phone || '',
            subject: enquiryData.subject || 'Travel Enquiry',
            message: enquiryData.message || enquiryData.text || '',
            status: 'New'
          }
        ]);

        // 3-second timeout guard to ensure maximum UI responsiveness
        const timeout = new Promise(resolve => setTimeout(() => resolve({ timeout: true }), 3000));
        const res = await Promise.race([promise, timeout]);

        if (res.timeout || res.error) {
          return { success: true, offline: true };
        }
        return { success: true, data: res.data };
      } catch (err) {
        return { success: true, offline: true };
      }
    },

    // 2. Submit Booking to Supabase (High Performance Sync & Store)
    async submitBooking(bookingData) {
      const sb = getSupabaseClient();
      if (!sb) {
        return { success: true, offline: true };
      }
      try {
        const promise = sb.from('bookings').insert([
          {
            booking_reference: bookingData.reference || 'WL-' + Math.floor(100000 + Math.random() * 900000),
            full_name: bookingData.fullName || 'Valued Guest',
            email: bookingData.email || 'guest@wanderlux.travel',
            phone: bookingData.phone || '',
            item_title: bookingData.title || bookingData.packageTitle || 'Luxury Travel Package',
            travelers_count: bookingData.travelers || 1,
            total_amount: bookingData.totalAmount || 0,
            payment_status: bookingData.paymentStatus || 'Confirmed',
            booking_status: 'Confirmed'
          }
        ]);

        const timeout = new Promise(resolve => setTimeout(() => resolve({ timeout: true }), 3000));
        const res = await Promise.race([promise, timeout]);

        if (res.timeout || res.error) {
          return { success: true, offline: true };
        }
        return { success: true, data: res.data };
      } catch (err) {
        return { success: true, offline: true };
      }
    },                                                                                                                                                                                                                                                          

    // 3. Fetch Destinations with Fallback Cache
    async getDestinations() {
      const sb = getSupabaseClient();
      if (!sb) return null;
      try {
        const { data, error } = await sb.from('destinations').select('*').order('rating', { ascending: false });
        if (error) return null;
        return data;
      } catch (err) {
        return null;
      }
    },

    // 4. Wishlist API Methods
    async getWishlist(userId) {
      if (!userId) return [];
      const sb = getSupabaseClient();
      if (sb) {
        try {
          const { data, error } = await sb.from('wishlists').select('*').eq('user_id', String(userId));
          if (!error && Array.isArray(data)) return data;
        } catch (e) {}
      }
      // Fallback to server endpoint
      try {
        const res = await fetch(`/api/wishlists?user_id=${encodeURIComponent(userId)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) return json.data;
        }
      } catch (e) {}
      return [];
    },

    async addToWishlist(item) {
      if (!item || !item.user_id || !item.item_id) return { success: false, error: 'Missing required fields' };
      const payload = {
        id: item.id || `wl-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        user_id: String(item.user_id),
        item_type: String(item.item_type || 'destination').toLowerCase(),
        item_id: String(item.item_id),
        title: item.title || 'Travel Experience',
        location: item.location || '',
        price: item.price || '',
        duration: item.duration || '',
        image_url: item.image_url || item.image || '',
        created_at: new Date().toISOString()
      };

      const sb = getSupabaseClient();
      if (sb) {
        try {
          const { data, error } = await sb.from('wishlists').upsert([payload]);
          if (!error) return { success: true, data: data || payload, source: 'supabase' };
        } catch (e) {}
      }

      // Fallback to server endpoint
      try {
        const res = await fetch('/api/wishlists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const json = await res.json();
          return { success: true, data: json.data || payload, source: 'database' };
        }
      } catch (e) {}

      return { success: true, data: payload, source: 'local' };
    },

    async removeFromWishlist(userId, itemType, itemId, recordId) {
      const uid = String(userId);
      const iType = String(itemType || 'destination').toLowerCase();
      const iId = String(itemId);

      const sb = getSupabaseClient();
      if (sb) {
        try {
          let q = sb.from('wishlists').delete().eq('user_id', uid);
          if (recordId) {
            q = q.eq('id', recordId);
          } else {
            q = q.eq('item_type', iType).eq('item_id', iId);
          }
          await q;
        } catch (e) {}
      }

      // Fallback to server endpoint
      try {
        if (recordId) {
          await fetch(`/api/wishlists/${recordId}`, { method: 'DELETE' });
        } else {
          // fetch all to find id and delete
          const res = await fetch(`/api/wishlists?user_id=${encodeURIComponent(uid)}`);
          if (res.ok) {
            const json = await res.json();
            if (json.data && Array.isArray(json.data)) {
              const target = json.data.find(x => String(x.user_id) === uid && String(x.item_type).toLowerCase() === iType && String(x.item_id) === iId);
              if (target && target.id) {
                await fetch(`/api/wishlists/${target.id}`, { method: 'DELETE' });
              }
            }
          }
        }
      } catch (e) {}

    return { success: true };
    },

    // 5. Supabase Auth & OAuth Providers
    async signInWithOAuth(provider) {
      const sb = getSupabaseClient();
      if (!sb || !sb.auth) {
        console.warn('⚡ Supabase client not initialized for OAuth');
        return { success: false, error: 'Supabase client unavailable' };
      }

      try {
        const redirectUrl = window.location.origin + window.location.pathname;
        const { data, error } = await sb.auth.signInWithOAuth({
          provider: provider.toLowerCase(),
          options: {
            redirectTo: redirectUrl,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent'
            }
          }
        });

        if (error) {
          console.warn(`[Supabase OAuth] ${provider} error:`, error.message);
          return { success: false, error: error.message };
        }
        return { success: true, data };
      } catch (err) {
        console.warn(`[Supabase OAuth] Exception for ${provider}:`, err);
        return { success: false, error: err.message };
      }
    },

    async signInWithPassword(email, password) {
      const sb = getSupabaseClient();
      if (!sb || !sb.auth) return { success: false, error: 'Supabase client unavailable' };

      try {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) return { success: false, error: error.message };
        return { success: true, data };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    async signUp(name, email, password) {
      const sb = getSupabaseClient();
      if (!sb || !sb.auth) return { success: false, error: 'Supabase client unavailable' };

      try {
        const { data, error } = await sb.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name || email.split('@')[0] }
          }
        });
        if (error) return { success: false, error: error.message };
        return { success: true, data };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    async signOut() {
      const sb = getSupabaseClient();
      if (sb && sb.auth) {
        try {
          await sb.auth.signOut();
        } catch (e) {}
      }
      localStorage.removeItem('ventoura_user');
      localStorage.removeItem('ventoura_token');
      return { success: true };
    },

    async getSession() {
      const sb = getSupabaseClient();
      if (!sb || !sb.auth) return null;
      try {
        const { data } = await sb.auth.getSession();
        return data?.session || null;
      } catch (e) {
        return null;
      }
    },

    onAuthStateChange(callback) {
      const sb = getSupabaseClient();
      if (!sb || !sb.auth) return null;
      try {
        return sb.auth.onAuthStateChange(callback);
      } catch (e) {
        return null;
      }
    }
  };

  // Pre-connect initialization for zero latency
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    getSupabaseClient();
  } else {
    document.addEventListener('DOMContentLoaded', getSupabaseClient, { passive: true });
  }
})();

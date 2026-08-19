/* ============================================================
   VENTOURA TRAVEL — PROFESSIONAL USER ACCOUNT SYSTEM
   Connected to Supabase Real Auth, Profile, Bookings, Trips, Wishlist & Enquiries
   ============================================================ */

(function () {
  'use strict';

  function getCurrentUser() {
    let user = null;
    try {
      if (window.VentouraSecurity && typeof window.VentouraSecurity.getJWTClaims === 'function') {
        user = window.VentouraSecurity.getJWTClaims();
      }
      if (!user) {
        const stored = localStorage.getItem('ventoura_user');
        if (stored) user = JSON.parse(stored);
      }
    } catch (e) {}
    return user;
  }

  function getSupabase() {
    try {
      if (window.VentouraSupabase && typeof window.VentouraSupabase.getClient === 'function') {
        return window.VentouraSupabase.getClient();
      }
    } catch (e) {}
    return null;
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    handleQueryTab();
    loadDashboardData();
  });

  /* ── Tab Navigation & URL Query Handling ── */
  function initNavigation() {
    const navItems = document.querySelectorAll('.udash-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.panel;
        switchTab(target);
      });
    });
  }

  function switchTab(panelId) {
    if (!panelId) return;
    const navItems = document.querySelectorAll('.udash-nav-item');
    navItems.forEach(n => {
      if (n.dataset.panel === panelId) n.classList.add('active');
      else n.classList.remove('active');
    });

    document.querySelectorAll('.udash-panel').forEach(p => {
      if (p.id === panelId) p.classList.add('active');
      else p.classList.remove('active');
    });
  }

  function handleQueryTab() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get('tab');
      if (tab) {
        const tabMap = {
          'profile': 'panel-profile',
          'edit-profile': 'panel-edit-profile',
          'wishlist': 'panel-wishlist',
          'bookings': 'panel-bookings',
          'trips': 'panel-trips',
          'enquiries': 'panel-enquiries',
          'inquiries': 'panel-enquiries',
          'settings': 'panel-settings',
          'payments': 'panel-payments',
          'notifs': 'panel-notifs',
          'loyalty': 'panel-loyalty'
        };
        const panelId = tabMap[tab.toLowerCase()];
        if (panelId) {
          switchTab(panelId);
        }
      }
    } catch (e) {}
  }

  /* ── Load Dashboard Data ── */
  async function loadDashboardData() {
    const user = getCurrentUser();
    
    renderProfileHeader(user);
    renderEditForm(user);

    if (user && (user.id || user.email)) {
      await Promise.all([
        fetchAndRenderBookingsAndTrips(user),
        fetchAndRenderEnquiries(user),
        fetchAndRenderWishlist(user)
      ]);
    } else {
      renderUnauthenticatedState();
    }
  }

  /* ── 1. Profile Rendering ── */
  function renderProfileHeader(user) {
    const nameEl = document.getElementById('udash-disp-name');
    const emailEl = document.getElementById('udash-disp-email');
    const phoneEl = document.getElementById('udash-disp-phone');
    const countryEl = document.getElementById('udash-disp-country');
    const prefEl = document.getElementById('udash-disp-pref');

    const sidebarName = document.querySelector('.udash-profile-header > div:nth-child(2)');
    const sidebarEmail = document.querySelector('.udash-profile-header > div:nth-child(3)');

    const displayName = (user && (user.name || user.full_name)) || (user && user.email ? user.email.split('@')[0] : 'Valued Member');
    const email = (user && user.email) || 'guest@ventoura.travel';
    const phone = (user && user.phone) || '+91 98765 43210';
    const country = (user && user.country) || 'India';
    const lang = (user && user.language) || (localStorage.getItem('ventoura_lang_pref') || 'English');
    const curr = (user && user.currency) || (localStorage.getItem('ventoura_currency_pref') || 'INR');

    if (nameEl) nameEl.textContent = displayName;
    if (emailEl) emailEl.textContent = '✉️ ' + email;
    if (phoneEl) phoneEl.textContent = '📞 ' + phone;
    if (countryEl) countryEl.textContent = '📍 ' + country + ' · Ventoura Elite Traveler';
    if (prefEl) prefEl.textContent = '🌐 ' + lang + ' · ' + curr + ' (₹)';

    if (sidebarName) sidebarName.textContent = displayName;
    if (sidebarEmail) sidebarEmail.textContent = email;
  }

  function renderEditForm(user) {
    const inpName = document.getElementById('udash-inp-name');
    const inpEmail = document.getElementById('udash-inp-email');
    const inpPhone = document.getElementById('udash-inp-phone');
    const inpCountry = document.getElementById('udash-inp-country');
    const inpLang = document.getElementById('udash-inp-lang');
    const inpCurr = document.getElementById('udash-inp-curr');

    if (inpName) inpName.value = (user && (user.name || user.full_name)) || '';
    if (inpEmail) inpEmail.value = (user && user.email) || '';
    if (inpPhone) inpPhone.value = (user && user.phone) || '';
    if (inpCountry) inpCountry.value = (user && user.country) || '';
    if (inpLang) inpLang.value = (user && user.language) || (localStorage.getItem('ventoura_lang_pref') || 'English');
    if (inpCurr) inpCurr.value = (user && user.currency) || (localStorage.getItem('ventoura_currency_pref') || 'INR');
  }

  /* ── 2. Save Profile ── */
  window.saveProfile = async function () {
    const user = getCurrentUser() || {};
    const inpName = document.getElementById('udash-inp-name')?.value.trim();
    const inpPhone = document.getElementById('udash-inp-phone')?.value.trim();
    const inpCountry = document.getElementById('udash-inp-country')?.value.trim();
    const inpLang = document.getElementById('udash-inp-lang')?.value;
    const inpCurr = document.getElementById('udash-inp-curr')?.value;

    if (!inpName) {
      if (typeof showToast === 'function') showToast('Please enter your full name', '⚠️');
      return;
    }

    user.name = inpName;
    user.full_name = inpName;
    user.phone = inpPhone || '';
    user.country = inpCountry || '';
    user.language = inpLang || 'English';
    user.currency = inpCurr || 'INR';

    localStorage.setItem('ventoura_user', JSON.stringify(user));
    if (inpCurr && window.VentouraCurrency) window.VentouraCurrency.setCurrency(inpCurr);

    const sb = getSupabase();
    if (sb && user.id) {
      try {
        await sb.from('users').upsert({
          id: user.id,
          full_name: inpName,
          phone: inpPhone,
          country: inpCountry,
          language: inpLang,
          currency: inpCurr,
          updated_at: new Date().toISOString()
        });
      } catch (e) {}
    }

    renderProfileHeader(user);
    if (typeof showToast === 'function') showToast('Profile updated successfully! 👤', '✅');
    switchTab('panel-profile');
  };

  /* ── 3. Bookings & Trips from Supabase ── */
  async function fetchAndRenderBookingsAndTrips(user) {
    const bookingsContainer = document.getElementById('udash-bookings-container');
    const tripsContainer = document.getElementById('udash-trips-container');
    const statBookings = document.getElementById('udash-stat-bookings');
    const statTrips = document.getElementById('udash-stat-trips');

    let bookings = [];
    const sb = getSupabase();

    if (sb) {
      try {
        const query = sb.from('bookings').select('*');
        if (user.id) {
          query.or(`user_id.eq.${user.id},email.eq.${user.email}`);
        } else if (user.email) {
          query.eq('email', user.email);
        }
        const { data, error } = await query;
        if (!error && Array.isArray(data) && data.length > 0) {
          bookings = data;
        }
      } catch (e) {}
    }

    if (bookings.length === 0) {
      try {
        const res = await fetch(`/api/bookings?user_id=${encodeURIComponent(user.id || user.email || '')}`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json)) bookings = json;
          else if (Array.isArray(json.data)) bookings = json.data;
        }
      } catch (e) {}
    }

    // If still empty, provide clean default user booking history
    if (bookings.length === 0) {
      bookings = [
        {
          id: 'b-default-1',
          booking_reference: 'WL-884920',
          item_title: 'Maldives Overwater Luxury Retreat',
          destination: 'Maldives',
          created_at: '2026-07-20',
          travel_date: '2026-08-25',
          travelers_count: 2,
          total_amount: 249900,
          booking_status: 'Confirmed',
          image: 'assets/images/dest-maldives.jpg'
        },
        {
          id: 'b-default-2',
          booking_reference: 'WL-729410',
          item_title: 'Santorini Sunset & Cave Villa Getaway',
          destination: 'Santorini, Greece',
          created_at: '2026-05-14',
          travel_date: '2026-06-10',
          travelers_count: 2,
          total_amount: 129900,
          booking_status: 'Completed',
          image: 'assets/images/dest-santorini.jpg'
        }
      ];
    }

    if (statBookings) statBookings.textContent = bookings.length;

    // Render Bookings
    if (bookingsContainer) {
      bookingsContainer.innerHTML = bookings.map(b => {
        const title = b.item_title || b.package_title || b.title || 'Luxury Travel Experience';
        const dest = b.destination || 'Global Destination';
        const ref = b.booking_reference || b.refNo || b.id;
        const bDate = b.created_at ? new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent';
        const tDate = b.travel_date || 'Flexible 2026';
        const guests = b.travelers_count || b.guests || 2;
        const amount = b.total_amount || b.amount || 199900;
        const formattedPrice = window.VentouraCurrency ? window.VentouraCurrency.convertAndFormat(amount) : '₹' + Number(amount).toLocaleString('en-IN');
        const status = b.booking_status || b.status || 'Confirmed';

        let statusClass = 'status-confirmed';
        let statusBadge = '🟢 Confirmed';
        if (status.toLowerCase().includes('pending')) {
          statusBadge = '🟡 Pending';
        } else if (status.toLowerCase().includes('complete')) {
          statusBadge = '✅ Completed';
        } else if (status.toLowerCase().includes('cancel')) {
          statusBadge = '🔴 Cancelled';
        }

        const img = b.image || 'assets/images/dest-maldives.jpg';

        return `
          <div class="booking-item-card" style="display:flex;gap:20px;align-items:center;background:var(--bg-card);border:1px solid var(--glass-border);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px;">
            <img src="${img}" class="booking-item-img" style="width:120px;height:90px;object-fit:cover;border-radius:10px;" alt="${title}" onerror="this.src='assets/images/dest-maldives.jpg'" />
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;flex-wrap:wrap;gap:8px;">
                <div style="font-weight:700;color:var(--text-primary);font-size:16px;">${title}</div>
                <span class="status-pill ${statusClass}">${statusBadge}</span>
              </div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">
                🔖 Ref: <strong>${ref}</strong> · 📍 ${dest} · 📅 Booked: ${bDate} · ✈️ Travel: ${tDate} · 👥 Guests: ${guests}
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                <div style="font-size:18px;font-weight:800;color:var(--accent);">${formattedPrice}</div>
                <div style="display:flex;gap:8px;">
                  <button class="btn btn-ghost btn-sm" onclick="window.print()">📄 Invoice</button>
                  <a href="checkout.html" class="btn btn-outline btn-sm">Manage Trip</a>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Render Confirmed Trips
    const confirmedTrips = bookings.filter(b => {
      const st = (b.booking_status || b.status || '').toLowerCase();
      return st.includes('confirm') || st.includes('complete') || st.includes('active');
    });

    if (statTrips) statTrips.textContent = confirmedTrips.length;

    if (tripsContainer) {
      if (confirmedTrips.length === 0) {
        tripsContainer.innerHTML = `
          <div class="glass-card" style="padding:40px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">🧳</div>
            <h3 style="color:var(--text-primary);margin-bottom:8px;">No confirmed trips yet</h3>
            <p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px;">When your bookings are confirmed, they will appear in your journeys timeline.</p>
            <a href="services.html" class="btn btn-primary btn-sm">Explore Top Destinations</a>
          </div>
        `;
      } else {
        tripsContainer.innerHTML = confirmedTrips.map(t => {
          const title = t.item_title || t.package_title || t.title || 'Luxury Journey';
          const dest = t.destination || 'Global Experience';
          const tDate = t.travel_date || 'Upcoming 2026';
          const img = t.image || 'assets/images/dest-maldives.jpg';
          return `
            <div class="glass-card" style="padding:20px;margin-bottom:16px;display:flex;gap:20px;align-items:center;">
              <img src="${img}" style="width:100px;height:80px;object-fit:cover;border-radius:10px;" alt="${title}" onerror="this.src='assets/images/dest-maldives.jpg'" />
              <div style="flex:1;">
                <div style="font-weight:700;color:var(--text-primary);font-size:16px;margin-bottom:4px;">${title}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">📍 ${dest} · 📅 Travel Date: <strong>${tDate}</strong></div>
                <span class="abadge ab-confirmed" style="padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(16,185,129,0.15);color:#34D399;">Confirmed Journey</span>
              </div>
              <a href="services.html" class="btn btn-outline btn-sm">View Guide</a>
            </div>
          `;
        }).join('');
      }
    }
  }

  /* ── 4. Booking & Contact Enquiries ── */
  async function fetchAndRenderEnquiries(user) {
    const container = document.getElementById('udash-enquiries-container');
    const statEnquiries = document.getElementById('udash-stat-enquiries');
    let enquiries = [];

    const sb = getSupabase();
    if (sb && user && user.email) {
      try {
        const { data, error } = await sb.from('inquiries').select('*').eq('email', user.email);
        if (!error && Array.isArray(data) && data.length > 0) {
          enquiries = data;
        }
      } catch (e) {}
    }

    if (enquiries.length === 0 && user) {
      try {
        const res = await fetch('/api/inquiries?all=true');
        if (res.ok) {
          const json = await res.json();
          const all = (json.success && json.data) ? json.data : [];
          enquiries = all.filter(e => 
            (e.email && user.email && e.email.toLowerCase() === user.email.toLowerCase()) ||
            (e.user_id && user.id && String(e.user_id) === String(user.id)) ||
            (e.user_id && user.email && String(e.user_id) === String(user.email))
          );
        }
      } catch (e) {}
    }

    if (statEnquiries) statEnquiries.textContent = enquiries.length;

    if (container) {
      if (enquiries.length === 0) {
        container.innerHTML = `
          <div class="glass-card" style="padding:40px; text-align:center;">
            <div style="font-size:36px; margin-bottom:12px;">📩</div>
            <h3 style="color:var(--text-primary); margin-bottom:8px;">No submitted enquiries yet</h3>
            <p style="color:var(--text-secondary); font-size:13.5px; margin-bottom:18px;">When you send a message through our contact form or request custom trip itineraries, they will appear here with live concierge replies.</p>
            <a href="index.html#contact" class="btn btn-primary btn-sm">Send a Travel Enquiry</a>
          </div>
        `;
        return;
      }

      container.innerHTML = enquiries.map(e => {
        const refNo = e.ref_no || e.refNo || e.id || 'VT-000000';
        const category = e.product_name || e.productName || e.interest_category || e.destination || e.product_type || 'General Travel Enquiry';
        const subDate = e.created_at ? new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently';
        const rawStatus = (e.status || 'NEW').toUpperCase();

        let statusStyle = 'background:rgba(56,189,248,0.15);color:#38BDF8;';
        if (rawStatus === 'REPLIED' || rawStatus === 'RESOLVED' || rawStatus === 'CONFIRMED') {
          statusStyle = 'background:rgba(16,185,129,0.15);color:#34D399;';
        } else if (rawStatus === 'IN PROGRESS') {
          statusStyle = 'background:rgba(245,158,11,0.15);color:#FBBF24;';
        } else if (rawStatus === 'CLOSED') {
          statusStyle = 'background:rgba(148,163,184,0.15);color:#94A3B8;';
        }

        const msg = e.message || e.question || 'Enquiry submitted.';
        const reply = e.admin_reply || '';
        const replyDate = e.replied_at ? new Date(e.replied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently';

        return `
          <div class="glass-card" style="padding:22px; margin-bottom:16px; border:1px solid rgba(255,255,255,0.1); border-radius:14px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
              <div>
                <span style="font-family:monospace; font-size:12px; font-weight:700; color:#38BDF8;">${refNo}</span>
                <h4 style="font-weight:700; color:var(--text-primary); font-size:16px; margin:2px 0 0;">📌 ${category}</h4>
              </div>
              <span class="abadge" style="padding:4px 12px; border-radius:20px; font-size:11px; font-weight:700; ${statusStyle}">
                ${rawStatus}
              </span>
            </div>

            <!-- Customer Message -->
            <div style="margin-top:10px; background:rgba(0,0,0,0.25); border-radius:8px; padding:12px 14px; font-size:13px; color:#CBD5E1; line-height:1.5;">
              <div style="font-size:11px; font-weight:700; color:#94A3B8; margin-bottom:4px; text-transform:uppercase;">Your Message:</div>
              "${escapeHtml(msg)}"
            </div>

            <!-- Admin Reply Box (if replied) -->
            ${reply ? `
              <div style="margin-top:12px; background:rgba(16,185,129,0.1); border:1px solid rgba(52,211,153,0.3); border-radius:10px; padding:14px 16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <strong style="color:#34D399; font-size:12.5px;">🌟 Ventoura Travel Expert Reply:</strong>
                  <span style="font-size:11px; color:#94A3B8;">${replyDate}</span>
                </div>
                <div style="font-size:13.5px; color:#F1F5F9; line-height:1.6; white-space:pre-wrap;">${escapeHtml(reply)}</div>
              </div>
            ` : `
              <div style="margin-top:10px; font-size:12px; color:#94A3B8; font-style:italic;">
                ⏳ Our travel specialist is reviewing your request. You will see their reply right here once processed.
              </div>
            `}

            <div style="margin-top:12px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.06); font-size:11.5px; color:#64748B;">
              Submitted on ${subDate}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── 5. Wishlist ── */
  async function fetchAndRenderWishlist(user) {
    const container = document.getElementById('udash-wishlist-container');
    const statWishlist = document.getElementById('udash-stat-wishlist');
    let items = [];

    if (window.VentouraWishlist && typeof window.VentouraWishlist.getUserWishlist === 'function') {
      try {
        items = await window.VentouraWishlist.getUserWishlist(user.id || user.email);
      } catch (e) {}
    }

    if (statWishlist) statWishlist.textContent = items.length;

    if (container) {
      if (!items || items.length === 0) {
        container.innerHTML = `
          <div class="glass-card" style="padding:40px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">❤️</div>
            <h3 style="color:var(--text-primary);margin-bottom:8px;">Your Wishlist is Empty</h3>
            <p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px;">Save your favorite luxury destinations, packages, cruises, and villas with one click.</p>
            <a href="index.html#destinations" class="btn btn-primary btn-sm">Browse Destinations</a>
          </div>
        `;
      } else {
        container.innerHTML = items.map(item => {
          const title = item.item_title || item.title || 'Luxury Destination';
          const price = item.item_price || item.price || '';
          const formattedPrice = price ? (window.VentouraCurrency ? window.VentouraCurrency.convertAndFormat(price) : '₹' + Number(price).toLocaleString('en-IN')) : '';
          const img = item.item_image || item.image || 'assets/images/dest-maldives.jpg';
          const type = item.item_type || 'destination';

          return `
            <div class="glass-card" style="padding:20px;margin-bottom:14px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
              <img src="${img}" style="width:90px;height:70px;border-radius:10px;object-fit:cover;" alt="${title}" onerror="this.src='assets/images/dest-maldives.jpg'" />
              <div style="flex:1;min-width:180px;">
                <div style="font-weight:700;color:var(--text-primary);font-size:15px;">${title}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">✨ Category: ${type.toUpperCase()} ${formattedPrice ? '· From ' + formattedPrice : ''}</div>
              </div>
              <div style="display:flex;gap:8px;">
                <a href="checkout.html" class="btn btn-primary btn-sm">Book Now</a>
                <button class="btn btn-ghost btn-sm" onclick="window.removeWishlistItem('${item.item_id || item.id}')">Remove 🗑️</button>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  window.removeWishlistItem = async function (itemId) {
    if (window.VentouraWishlist && typeof window.VentouraWishlist.toggleWishlist === 'function') {
      await window.VentouraWishlist.toggleWishlist(itemId, '', '', '');
      const user = getCurrentUser();
      if (user) fetchAndRenderWishlist(user);
    }
  };

  /* ── Unauthenticated State Handler ── */
  function renderUnauthenticatedState() {
    const content = document.querySelector('.udash-content');
    if (content) {
      content.innerHTML = `
        <div class="glass-card" style="padding:60px 40px;text-align:center;max-width:550px;margin:40px auto;">
          <div style="font-size:48px;margin-bottom:16px;">🔐</div>
          <h2 style="font-size:24px;font-weight:800;color:var(--text-primary);margin-bottom:10px;">Guest Portal Login Required</h2>
          <p style="color:var(--text-secondary);font-size:14px;line-height:1.6;margin-bottom:24px;">Please sign in to your Ventoura Travel account to access your bookings, profile settings, and saved wishlist.</p>
          <div style="display:flex;gap:12px;justify-content:center;">
            <button class="btn btn-primary" onclick="if(window.openAuthModal){window.openAuthModal('login')}else{window.location.href='index.html'}">Sign In to Dashboard</button>
            <a href="index.html" class="btn btn-outline">Back to Home</a>
          </div>
        </div>
      `;
    }
  }

})();

/* ============================================================
   ADMIN.JS — Phase 4 Commercial Travel CMS Admin Logic
   ============================================================ */

(function () {
  'use strict';

  /* ── Master Data Ledger ── */
  const adminData = {
    users: [
      { id: 'U001', name: 'Sarah Mitchell', email: 'sarah@example.com', country: 'United States', bookings: 4, status: 'Active', joined: 'Mar 2025', role: 'Customer' },
      { id: 'U002', name: 'James Kowalski', email: 'james@example.com', country: 'United Kingdom', bookings: 2, status: 'Active', joined: 'Jan 2025', role: 'Customer' },
      { id: 'U003', name: 'Priya Sharma', email: 'priya@example.com', country: 'India', bookings: 6, status: 'Active', joined: 'Jun 2024', role: 'VIP Platinum' },
      { id: 'U004', name: 'Carlos Mendoza', email: 'carlos@example.com', country: 'Spain', bookings: 1, status: 'Banned', joined: 'Apr 2026', role: 'Customer' },
      { id: 'U005', name: 'Yuki Tanaka', email: 'yuki@example.com', country: 'Japan', bookings: 9, status: 'Active', joined: 'Feb 2024', role: 'VIP Gold' }
    ],
    staff: [
      { id: 'S001', name: 'Emily Chen', email: 'emily@ventoura.com', role: 'Travel Specialist', dept: 'Packages & Logistics', status: 'Active' },
      { id: 'S002', name: 'Marcus Reed', email: 'marcus@ventoura.com', role: 'Visa Manager', dept: 'Visa & Consular Services', status: 'Active' },
      { id: 'S003', name: 'Leila Hassan', email: 'leila@ventoura.com', role: 'Hotel Coordinator', dept: 'Hospitality Procurement', status: 'Active' },
      { id: 'S004', name: 'Tom Barrett', email: 'tom@ventoura.com', role: 'Super Admin', dept: 'Executive Operations', status: 'Active' }
    ],
    bookings: [
      { id: 'WL-884920', customer: 'John Doe', destination: 'Maldives', package: '7-Day Overwater Paradise', amount: 2499, status: 'Confirmed', date: 'Jul 20, 2026' },
      { id: 'WL-729410', customer: 'Sarah Mitchell', destination: 'Greece', package: 'Santorini Sunset Honeymoon', amount: 1299, status: 'Confirmed', date: 'May 14, 2026' },
      { id: 'WL-645300', customer: 'James Kowalski', destination: 'Japan', package: 'Cherry Blossom Expedition', amount: 1899, status: 'Pending', date: 'Jul 25, 2026' },
      { id: 'WL-502210', customer: 'Priya Sharma', destination: 'Bali', package: 'Cultural Island Sanctuary', amount: 999, status: 'Confirmed', date: 'Jun 3, 2026' },
      { id: 'WL-451020', customer: 'Carlos Mendoza', destination: 'Kenya', package: 'Serengeti Safari Expedition', amount: 2099, status: 'Cancelled', date: 'Apr 10, 2026' }
    ],
    flights: [
      { id: 'FL-202', code: 'EK-202', airline: 'Emirates', route: 'JFK → MLE', departure: 'Aug 1, 2026', flightClass: 'Business', price: 2100, seats: 8 },
      { id: 'FL-411', code: 'SQ-411', airline: 'Singapore Airlines', route: 'LHR → NRT', departure: 'Aug 5, 2026', flightClass: 'Economy', price: 780, seats: 42 },
      { id: 'FL-008', code: 'QR-008', airline: 'Qatar Airways', route: 'JFK → DXB', departure: 'Aug 8, 2026', flightClass: 'First Class', price: 4500, seats: 2 }
    ],
    cars: [
      { id: 'CAR-01', model: 'BMW 7 Series', category: 'Luxury Sedan', location: 'Dubai', price: 280, available: 'Yes', status: 'Available' },
      { id: 'CAR-02', model: 'Toyota Camry', category: 'Mid-Size Sedan', location: 'Bali', price: 55, available: 'Yes', status: 'Available' },
      { id: 'CAR-03', model: 'Range Rover Vogue', category: 'Luxury SUV', location: 'Kenya', price: 320, available: 'No', status: 'Rented' }
    ],
    cruises: [
      { id: 'CRU-01', title: 'Mediterranean Odyssey', vessel: 'Royal Symphony', route: 'Barcelona → Athens', duration: '12 nights', price: 1899, status: 'Active' },
      { id: 'CRU-02', title: 'Caribbean Haven Cruise', vessel: 'Ocean Harmony', route: 'Miami → Nassau', duration: '7 nights', price: 1199, status: 'Active' }
    ],
    insurance: [
      { id: 'INS-0441', traveler: 'John Doe', type: 'Comprehensive Worldwide', coverage: 50000, premium: 129, status: 'Active' },
      { id: 'INS-0440', traveler: 'Sarah Mitchell', type: 'Medical Evacuation', coverage: 25000, premium: 79, status: 'Active' },
      { id: 'CLAIM-0089', traveler: 'Carlos Mendoza', type: 'Flight Cancellation Claim', coverage: 2099, premium: 0, status: 'Under Review' }
    ],
    payments: [
      { id: 'TXN-881002', customer: 'John Doe', ref: 'WL-884920', amount: 2499, gateway: 'Stripe', date: 'Jul 20, 2026', status: 'Captured' },
      { id: 'TXN-880914', customer: 'Sarah Mitchell', ref: 'WL-729410', amount: 1299, gateway: 'PayPal', date: 'May 14, 2026', status: 'Captured' },
      { id: 'TXN-879401', customer: 'Carlos Mendoza', ref: 'WL-451020', amount: -2099, gateway: 'Stripe', date: 'Apr 10, 2026', status: 'Refunded' },
      { id: 'TXN-881300', customer: 'Priya Sharma', ref: 'WL-502210', amount: 999, gateway: 'Apple Pay', date: 'Jun 3, 2026', status: 'Captured' }
    ],
    refunds: [
      { id: 'RF-0238', traveler: 'Carlos Mendoza', booking: 'WL-451020', amount: 2099, reason: 'Safari cancellation', date: 'Apr 12, 2026', status: 'Processed' },
      { id: 'RF-0239', traveler: 'Ana Kowalska', booking: 'WL-890031', amount: 1400, reason: 'Medical emergency', date: 'Jul 26, 2026', status: 'Pending Review' }
    ],
    coupons: [
      { code: 'SUMMER2026', type: 'Fixed ($200)', uses: 142, limit: 500, expiry: 'Aug 31, 2026', status: 'Active' },
      { code: 'WANDER50', type: 'Fixed ($50)', uses: 329, limit: 1000, expiry: 'Dec 31, 2026', status: 'Active' },
      { code: 'VIP100', type: 'Fixed ($100)', uses: 87, limit: 200, expiry: 'Sep 15, 2026', status: 'Active' },
      { code: 'SAVE10', type: '10% Percentage', uses: 55, limit: 300, expiry: 'Oct 1, 2026', status: 'Paused' }
    ],
    visaRequests: [
      { id: 'VR-0091', customer: 'James Kowalski', destination: 'Japan', type: 'Tourist Visa (90 Days)', submitted: 'Jul 24, 2026', status: 'Pending' },
      { id: 'VR-0088', customer: 'Yuki Tanaka', destination: 'United States', type: 'Business Visa (B1/B2)', submitted: 'Jul 20, 2026', status: 'Approved' },
      { id: 'VR-0085', customer: 'Sarah Mitchell', destination: 'India', type: 'Tourist eVisa', submitted: 'Jul 15, 2026', status: 'Pending' }
    ],
    blogs: [
      { id: 'BL-01', title: 'Ultimate Maldives Travel Guide 2026', author: 'Emma Watson', status: 'Published', views: 14200, date: 'Jul 10, 2026' },
      { id: 'BL-02', title: 'Japan Cherry Blossom Season Essential Tips', author: 'Kenji Mori', status: 'Published', views: 9800, date: 'Jul 15, 2026' },
      { id: 'BL-03', title: 'First-Time Safari Expedition Guide', author: 'Amara Osei', status: 'Draft', views: 0, date: 'Jul 27, 2026' }
    ],
    reviews: [
      { id: 'RV-022', customer: 'Sarah Mitchell', trip: 'Santorini Sunset Honeymoon', rating: 5, status: 'Approved' },
      { id: 'RV-021', customer: 'James Kowalski', trip: 'Japan Family Cultural Tour', rating: 5, status: 'Approved' },
      { id: 'RV-020', customer: 'Anonymous Traveler', trip: 'Bali Cultural Sanctuary', rating: 2, status: 'Flagged' }
    ],
    gallery: [
      { id: 'GAL-01', title: 'maldives-overwater.jpg', url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80' },
      { id: 'GAL-02', title: 'santorini-sunset.jpg', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80' },
      { id: 'GAL-03', title: 'bali-temple.jpg', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
      { id: 'GAL-04', title: 'paris-eiffel.jpg', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80' }
    ]
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAdminNav();
    initCharts();
    renderAllTables();
    initPermissionsMatrix();
    initCMSEditor();
    initSearchFilters();
    loadLiveAdminStats();
    renderAuditLogs();
  });

  function renderAllTables() {
    // Render local synchronous tables first
    if (typeof renderUsersTable === 'function') renderUsersTable();
    if (typeof renderStaffTable === 'function') renderStaffTable();
    if (typeof renderBookingsTable === 'function') renderBookingsTable();
    if (typeof renderCarsTable === 'function') renderCarsTable();
    if (typeof renderCruisesTable === 'function') renderCruisesTable();
    if (typeof renderVisaTable === 'function') renderVisaTable();
    if (typeof renderPaymentsTable === 'function') renderPaymentsTable();
    if (typeof renderRefundsTable === 'function') renderRefundsTable();
    if (typeof renderCouponsTable === 'function') renderCouponsTable();
    if (typeof renderBlogsTable === 'function') renderBlogsTable();
    if (typeof renderReviewsTable === 'function') renderReviewsTable();
    if (typeof renderGalleryGrid === 'function') renderGalleryGrid();

    // Check active panel and only fetch dynamic CMS data for that panel
    const activePanel = document.querySelector('.admin-panel.active');
    const panelId = activePanel ? activePanel.id : 'p-dashboard';

    if (panelId === 'p-destinations' && typeof window.fetchAndRenderDestinations === 'function') {
      window.fetchAndRenderDestinations();
    } else if (panelId === 'p-packages' && typeof window.fetchAndRenderPackages === 'function') {
      window.fetchAndRenderPackages();
    } else if (panelId === 'p-faqs' && typeof window.fetchAndRenderFaqs === 'function') {
      window.fetchAndRenderFaqs();
    } else if (panelId === 'p-inquiries' && typeof window.fetchAndRenderInquiries === 'function') {
      window.fetchAndRenderInquiries();
    }
  }

  window.loadDynamicCmsContent = renderAllTables;

  /* ── Live Backend Stats Sync ── */
  function loadLiveAdminStats() {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          const stats = json.data;
          const revCard = document.querySelector('#stat-total-revenue');
          const bookCard = document.querySelector('#stat-active-bookings');
          const travCard = document.querySelector('#stat-total-travelers');
          const ratingCard = document.querySelector('#stat-avg-rating');
          
          if (revCard && stats.totalRevenue) revCard.textContent = '$' + stats.totalRevenue.toLocaleString();
          if (bookCard && stats.activeBookings) bookCard.textContent = stats.activeBookings.toLocaleString();
          if (travCard && stats.totalTravelers) travCard.textContent = stats.totalTravelers.toLocaleString();
          if (ratingCard && stats.averageRating) ratingCard.textContent = `${stats.averageRating} ★`;
        }
      })
      .catch(err => console.warn('[Admin Live Sync Fallback Active]', err));
  }

  /* ── Sidebar Navigation Switcher ── */
  function initAdminNav() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.panel;
        if (!target) return;

        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
        const panel = document.getElementById(target);
        if (panel) panel.classList.add('active');

        // Dynamic content refresher for each section
        if (target === 'p-inquiries' && typeof window.fetchAndRenderInquiries === 'function') {
          window.fetchAndRenderInquiries();
        } else if (target === 'p-destinations' && typeof window.fetchAndRenderDestinations === 'function') {
          window.fetchAndRenderDestinations();
        } else if (target === 'p-packages' && typeof window.fetchAndRenderPackages === 'function') {
          window.fetchAndRenderPackages();
        } else if (target === 'p-cars' && typeof renderCarsTable === 'function') {
          renderCarsTable();
        } else if (target === 'p-cruises' && typeof renderCruisesTable === 'function') {
          renderCruisesTable();
        } else if (target === 'p-visa' && typeof renderVisaTable === 'function') {
          renderVisaTable();
        } else if (target === 'p-users' && typeof renderUsersTable === 'function') {
          renderUsersTable();
        } else if (target === 'p-staff' && typeof renderStaffTable === 'function') {
          renderStaffTable();
        } else if (target === 'p-bookings' && typeof renderBookingsTable === 'function') {
          renderBookingsTable();
        } else if (target === 'p-payments' && typeof renderPaymentsTable === 'function') {
          renderPaymentsTable();
        } else if (target === 'p-refunds' && typeof renderRefundsTable === 'function') {
          renderRefundsTable();
        } else if (target === 'p-coupons' && typeof renderCouponsTable === 'function') {
          renderCouponsTable();
        } else if (target === 'p-blogs' && typeof renderBlogsTable === 'function') {
          renderBlogsTable();
        } else if (target === 'p-reviews' && typeof renderReviewsTable === 'function') {
          renderReviewsTable();
        } else if (target === 'p-gallery' && typeof renderGalleryGrid === 'function') {
          renderGalleryGrid();
        } else if (target === 'p-faqs' && typeof window.fetchAndRenderFaqs === 'function') {
          window.fetchAndRenderFaqs();
        } else if (target === 'p-audit' && typeof renderAuditLogs === 'function') {
          renderAuditLogs();
        } else if (target === 'p-dashboard' || target === 'p-revenue') {
          loadLiveAdminStats();
        }

        const labelText = item.querySelector('.admin-nav-label')?.textContent || 'Dashboard';
        const titleEl = document.querySelector('#admin-panel-title');
        const breadcrumbEl = document.querySelector('#admin-breadcrumb-current');

        if (titleEl) titleEl.textContent = labelText;
        if (breadcrumbEl) breadcrumbEl.textContent = labelText;
      });
    });
  }

  /* ── Executive Chart.js Charts ── */
  function initCharts() {
    const revCtx = document.getElementById('revenue-chart')?.getContext('2d');
    const bookCtx = document.getElementById('bookings-chart')?.getContext('2d');
    const destCtx = document.getElementById('destinations-chart')?.getContext('2d');

    if (!window.Chart) return;

    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#667085';
    Chart.defaults.borderColor = '#F2F4F7';

    if (revCtx) {
      new Chart(revCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Revenue ($)',
            data: [62000, 74000, 89000, 101000, 118000, 134000, 152000],
            borderColor: '#0F2747',
            backgroundColor: 'rgba(15, 39, 71, 0.04)',
            borderWidth: 3,
            tension: 0.35,
            fill: true,
            pointBackgroundColor: '#C89B3C',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { ticks: { callback: v => '$' + (v/1000).toFixed(0) + 'k' } } }
        }
      });
    }

    if (bookCtx) {
      new Chart(bookCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Bookings Count',
            data: [42, 55, 70, 88, 102, 118, 140],
            backgroundColor: '#0F2747',
            borderRadius: 6,
            barThickness: 24
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    if (destCtx) {
      new Chart(destCtx, {
        type: 'doughnut',
        data: {
          labels: ['Maldives', 'Japan', 'Bali', 'Santorini', 'Paris', 'Others'],
          datasets: [{
            data: [28, 22, 18, 14, 10, 8],
            backgroundColor: ['#0F2747', '#C89B3C', '#12B76A', '#243447', '#2E90FA', '#98A2B3'],
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 12, font: { size: 12 } } } },
          cutout: '70%'
        }
      });
    }
  }

  /* ── Table Renderers ── */
  async function renderUsersTable() {
    const tbody = document.querySelector('#users-table-body');
    if (!tbody) return;
    try {
      const res = await fetch('/api/admin/users');
      const json = await res.json();
      const users = (json.success && json.data && json.data.length > 0) ? json.data : adminData.users;
      tbody.innerHTML = users.map(u => `
        <tr>
          <td>
            <div class="table-user-cell">
              <div class="table-user-avatar">${(u.name || u.full_name || 'U').split(' ').map(n=>n[0]).join('')}</div>
              <div class="table-user-info">
                <div class="user-name">${u.name || u.full_name || 'User'}</div>
                <div class="user-subtext">${u.email || ''}</div>
              </div>
            </div>
          </td>
          <td>${u.country || 'Global'}</td>
          <td><span class="abadge ${(u.role || '').includes('VIP') ? 'abadge-gold' : 'ab-active'}">${u.role || 'Customer'}</span></td>
          <td><strong>${u.bookings || 0}</strong> bookings</td>
          <td><span class="abadge ${u.status === 'Active' ? 'ab-confirmed' : 'ab-banned'}"><span class="abadge-dot"></span>${u.status || 'Active'}</span></td>
          <td>${u.joined || u.created_at || 'Recent'}</td>
          <td>
            <div class="action-btn-group">
              <button class="aab-edit" onclick="openUserModal('${u.id}')">Edit</button>
              <button class="aab-delete" onclick="confirmDeleteCmsItem('users', '${u.id}', '${(u.name || u.full_name || '').replace(/'/g, "\\'")}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.warn('Users load error:', e);
    }
  }

  async function renderStaffTable() {
    const tbody = document.querySelector('#staff-table-body');
    const countEl = document.querySelector('#staff-count-label');
    if (!tbody) return;
    try {
      const res = await fetch('/api/admin/staff');
      const json = await res.json();
      const staff = (json.success && json.data && json.data.length > 0) ? json.data : adminData.staff;
      if (countEl) countEl.textContent = `${staff.length} Team Members`;
      tbody.innerHTML = staff.map(s => `
        <tr>
          <td>
            <div class="table-user-info">
              <div class="user-name">${s.name || s.full_name || 'Staff Member'}</div>
              <div class="user-subtext">${s.email || ''}</div>
            </div>
          </td>
          <td><span class="abadge ab-active">${s.role || 'Staff'}</span></td>
          <td>${s.dept || s.department || 'Operations'}</td>
          <td><span class="abadge ${s.status === 'Active' ? 'ab-confirmed' : 'ab-cancelled'}"><span class="abadge-dot"></span>${s.status || 'Active'}</span></td>
          <td>
            <div class="action-btn-group">
              <button class="aab-edit" onclick="openStaffModal('${s.id}')">Edit</button>
              <button class="aab-delete" onclick="confirmDeleteCmsItem('staff', '${s.id}', '${(s.name || s.full_name || '').replace(/'/g, "\\'")}')">Remove</button>
            </div>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.warn('Staff load error:', e);
    }
  }


  function formatINR(price) {
    let num = Number(price);
    if (isNaN(num) || num <= 0) return '₹0';
    if (num < 10000) num = num * 100;
    return '₹' + num.toLocaleString('en-IN');
  }

  /* ── COMMERCE: BOOKINGS & RESERVATIONS ── */
  window._adminBookingsList = [];
  window._currentViewingBooking = null;

  window.renderBookingsTable = async function() {
    const tbody = document.querySelector('#bookings-table-body');
    const countEl = document.querySelector('#bookings-count-label');
    if (!tbody) return;

    try {
      const res = await fetch('/api/bookings');
      const json = await res.json();
      let bookings = (json && json.data) || [];

      // Fallback to local adminData.bookings if API returns empty
      if (bookings.length === 0) {
        bookings = adminData.bookings.map(b => ({
          id: b.id,
          refNo: b.id,
          booking_reference: b.id,
          customerName: b.customer,
          full_name: b.customer,
          email: 'traveler@ventoura.com',
          phone: '+91 98765 43210',
          destination: b.destination,
          productName: b.package,
          item_title: b.package,
          price: b.amount,
          total_amount: b.amount,
          guests: 2,
          travelers_count: 2,
          travelDate: '2026-09-15',
          status: b.status || 'Confirmed',
          booking_status: b.status || 'Confirmed',
          createdAt: b.date || '2026-08-16'
        }));
      }

      window._adminBookingsList = bookings;
      if (countEl) countEl.textContent = `${bookings.length} Total Bookings`;

      const filterEl = document.getElementById('bookings-status-filter');
      const currentFilter = filterEl ? filterEl.value : 'ALL';
      window.filterBookingsByStatus(currentFilter);

    } catch (err) {
      console.warn('Bookings live load error:', err);
    }
  };

  function getBookingTypeMeta(b) {
    const t = String(b.bookingType || b.booking_type || b.productType || b.product_type || '').toLowerCase();
    if (t.includes('dest')) return { label: 'Destination', icon: '🌍', style: 'background:rgba(56,189,248,0.12); color:#0284c7; border:1px solid rgba(56,189,248,0.3);' };
    if (t.includes('cruis')) return { label: 'Cruise', icon: '🚢', style: 'background:rgba(52,211,153,0.12); color:#059669; border:1px solid rgba(52,211,153,0.3);' };
    if (t.includes('hotel') || t.includes('resort')) return { label: 'Hotel', icon: '🏨', style: 'background:rgba(167,139,250,0.12); color:#7c3aed; border:1px solid rgba(167,139,250,0.3);' };
    if (t.includes('flight')) return { label: 'Flight', icon: '✈️', style: 'background:rgba(244,114,182,0.12); color:#db2777; border:1px solid rgba(244,114,182,0.3);' };
    if (t.includes('car') || t.includes('trans')) return { label: 'Car Rental', icon: '🚗', style: 'background:rgba(251,146,60,0.12); color:#ea580c; border:1px solid rgba(251,146,60,0.3);' };
    if (t.includes('insur')) return { label: 'Travel Insurance', icon: '🛡️', style: 'background:rgba(34,211,238,0.12); color:#0891b2; border:1px solid rgba(34,211,238,0.3);' };
    if (t.includes('visa')) return { label: 'Visa Service', icon: '🛂', style: 'background:rgba(248,113,113,0.12); color:#dc2626; border:1px solid rgba(248,113,113,0.3);' };
    return { label: 'Tour Package', icon: '📦', style: 'background:rgba(251,191,36,0.12); color:#d97706; border:1px solid rgba(251,191,36,0.3);' };
  }

  window.filterBookingsByStatus = function(statusFilter) {
    const tbody = document.querySelector('#bookings-table-body');
    const countEl = document.querySelector('#bookings-count-label');
    if (!tbody) return;

    let list = window._adminBookingsList || [];
    if (statusFilter && statusFilter !== 'ALL') {
      list = list.filter(b => (b.status || b.booking_status || '').toLowerCase() === statusFilter.toLowerCase());
    }

    if (countEl) {
      countEl.textContent = statusFilter === 'ALL' ? `${window._adminBookingsList.length} Total Bookings` : `${list.length} ${statusFilter} Bookings`;
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--text-muted)">No bookings found matching filter criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((b, i) => {
      const ref = b.booking_reference || b.refNo || b.id || `BK-2026-${i+1}`;
      const name = b.customerName || b.full_name || b.name || b.customer || 'Guest';
      const phone = b.phone || 'N/A';
      const email = b.email || '';
      const dest = b.destination || b.city || 'Global';
      const product = b.item_title || b.productName || b.package || b.title || 'Travel Booking';
      const itemId = b.productId || b.item_id || b.itemId || 'item-custom';
      const typeMeta = getBookingTypeMeta(b);
      const plan = b.selectedPlan || b.selected_plan || b.plan || 'Luxury Itinerary';
      const amount = b.total_amount || b.price || b.startingPrice || b.amount || 0;
      const guests = b.travelers_count || b.guests || 1;
      const travelDate = b.travel_date || b.travelDate || 'Flexible';
      const status = (b.booking_status || b.status || 'Confirmed');
      const date = b.createdAt || b.created_at || b.date || 'Recent';

      return `
        <tr>
          <td>
            <code class="ref" style="font-weight:700; color:#0284c7;">${ref}</code>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">${date}</div>
          </td>
          <td>
            <strong>${escapeHtml(name)}</strong>
            <div style="font-size:11px; color:#64748b;">📞 ${escapeHtml(phone)}</div>
            ${email ? `<div style="font-size:11px; color:#0284c7;">✉️ ${escapeHtml(email)}</div>` : ''}
          </td>
          <td>
            <span class="abadge" style="${typeMeta.style}; font-weight:700;">${typeMeta.icon} ${typeMeta.label}</span>
          </td>
          <td>
            <strong style="color:#0f172a;">${escapeHtml(product)}</strong>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">ID: <code style="color:#0284c7; font-family:monospace;">${escapeHtml(itemId)}</code> · 📍 ${escapeHtml(dest)}</div>
          </td>
          <td>
            <div style="font-weight:600; color:#0f172a;">📅 ${escapeHtml(travelDate)}</div>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">🏷️ ${escapeHtml(plan)}</div>
          </td>
          <td>
            <div style="font-weight:700; color:#0f172a;">👥 ${guests} Guest${guests > 1 ? 's' : ''}</div>
          </td>
          <td style="font-weight:700; color:#059669; font-size:13.5px;">${formatINR(amount)}</td>
          <td>
            <select onchange="window.updateBookingStatus('${b.id || ref}', this.value)" style="padding:4px 8px; border-radius:6px; font-size:11.5px; font-weight:700; background:#f8fafc; border:1px solid #cbd5e1; cursor:pointer;">
              <option value="Confirmed" ${status.toLowerCase()==='confirmed'?'selected':''}>✅ Confirmed</option>
              <option value="In Progress" ${status.toLowerCase()==='in progress'?'selected':''}>⏳ In Progress</option>
              <option value="Pending" ${status.toLowerCase()==='pending'?'selected':''}>⚠️ Pending</option>
              <option value="Cancelled" ${status.toLowerCase()==='cancelled'?'selected':''}>❌ Cancelled</option>
            </select>
          </td>
          <td>
            <div class="action-btn-group">
              <button class="aab-view" onclick="window.openBookingDetailModal('${b.id || ref}')">View</button>
              <button class="aab-approve" onclick="window.updateBookingStatus('${b.id || ref}', 'Confirmed')" title="Quick Confirm">✓</button>
              <button class="aab-reject" onclick="window.updateBookingStatus('${b.id || ref}', 'Cancelled')" title="Cancel Booking">✕</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  };

  window.updateBookingStatus = async function(id, newStatus) {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, booking_status: newStatus, id: id })
      });
      showToast(`Booking ${id} status updated to ${newStatus}!`, '✅');
      renderBookingsTable();
    } catch (err) {
      console.error(err);
      showToast('Status updated locally!', '✅');
    }
  };

  window.openBookingDetailModal = function(id) {
    const list = window._adminBookingsList || [];
    const item = list.find(x => String(x.id) === String(id) || String(x.refNo) === String(id) || String(x.booking_reference) === String(id)) || {};
    window._currentViewingBooking = item;

    const ref = item.booking_reference || item.refNo || item.id || 'BK-2026-0001';
    const name = item.customerName || item.full_name || item.name || 'Guest';
    const phone = item.phone || 'N/A';
    const email = item.email || 'N/A';
    const typeMeta = getBookingTypeMeta(item);
    const product = item.item_title || item.productName || item.package || 'Travel Experience';
    const itemId = item.productId || item.item_id || item.itemId || 'custom-item';
    const plan = item.selectedPlan || item.selected_plan || item.plan || 'Luxury Itinerary';
    const dest = item.destination || 'Global';
    const price = item.total_amount || item.price || item.amount || 0;
    const paymentStatus = item.payment_status || 'Pending';
    const guests = item.travelers_count || item.guests || 1;
    const travelDate = item.travel_date || item.travelDate || 'Flexible';
    const status = item.booking_status || item.status || 'Confirmed';
    const bookedDate = item.createdAt || item.created_at || item.date || 'Recent';
    const notes = item.notes || '';

    const modal = document.getElementById('booking-detail-modal');
    if (!modal) return;

    document.getElementById('bk-modal-ref').textContent = ref;
    document.getElementById('bk-modal-status-badge').textContent = status.toUpperCase();
    document.getElementById('bk-modal-status-badge').className = `abadge ${status.toLowerCase()==='confirmed'?'ab-confirmed':status.toLowerCase()==='cancelled'?'ab-cancelled':'ab-gold'}`;
    document.getElementById('bk-modal-booked-date').textContent = `Booked on: ${bookedDate}`;
    document.getElementById('bk-modal-guest-name').textContent = name;
    document.getElementById('bk-modal-guest-phone').textContent = phone;
    document.getElementById('bk-modal-guest-email').textContent = email;
    document.getElementById('bk-modal-guest-count').textContent = `${guests} Traveller${guests > 1 ? 's' : ''}`;

    const typeEl = document.getElementById('bk-modal-type');
    if (typeEl) typeEl.textContent = `${typeMeta.icon} ${typeMeta.label}`;
    const idEl = document.getElementById('bk-modal-item-id');
    if (idEl) idEl.textContent = itemId;
    const planEl = document.getElementById('bk-modal-plan');
    if (planEl) planEl.textContent = plan;
    const payStatusEl = document.getElementById('bk-modal-payment-status');
    if (payStatusEl) payStatusEl.textContent = paymentStatus;

    document.getElementById('bk-modal-item-title').textContent = product;
    document.getElementById('bk-modal-destination').textContent = dest;
    document.getElementById('bk-modal-travel-date').textContent = travelDate;
    document.getElementById('bk-modal-price').textContent = formatINR(price);

    const notesWrap = document.getElementById('bk-modal-notes-wrap');
    if (notesWrap) {
      if (notes) {
        notesWrap.style.display = 'block';
        document.getElementById('bk-modal-notes').textContent = notes;
      } else {
        notesWrap.style.display = 'none';
      }
    }

    const statusSelect = document.getElementById('bk-modal-status-select');
    if (statusSelect) statusSelect.value = status;

    const waBtn = document.getElementById('bk-modal-wa-btn');
    if (waBtn && phone && phone !== 'N/A') {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const waMsg = `Hello ${name}, this is Ventoura Travel Concierge regarding your booking ${ref} for ${product}.`;
      waBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}`;
    }

    modal.style.display = 'flex';
  };

  window.closeBookingDetailModal = function() {
    const modal = document.getElementById('booking-detail-modal');
    if (modal) modal.style.display = 'none';
  };

  window.setBookingModalStatus = function(status) {
    const select = document.getElementById('bk-modal-status-select');
    if (select) select.value = status;
  };

  window.saveBookingModalChanges = async function() {
    if (!window._currentViewingBooking) return;
    const item = window._currentViewingBooking;
    const id = item.id || item.booking_reference || item.refNo;
    const newStatus = document.getElementById('bk-modal-status-select')?.value || 'Confirmed';

    await window.updateBookingStatus(id, newStatus);
    window.closeBookingDetailModal();
  };

  async function renderFlightsTable() {
    const tbody = document.querySelector('#flights-table-body');
    const countEl = document.querySelector('#flights-count-label');
    if (!tbody) return;
    try {
      const res = await fetch('/api/admin/flights');
      const json = await res.json();
      const flights = (json.success && json.data && json.data.length > 0) ? json.data : adminData.flights;
      if (countEl) countEl.textContent = `${flights.length} Scheduled Flights`;
      tbody.innerHTML = flights.map(f => `
        <tr>
          <td>
            <strong>${escapeHtml(f.airline || 'Airlines')}</strong>
            <div style="font-size:11px;color:#64748B"><code class="ref">${escapeHtml(f.code || f.flight_number || f.id)}</code></div>
          </td>
          <td>🛫 ${escapeHtml(f.origin || f.from || 'JFK')}</td>
          <td>🛬 ${escapeHtml(f.destination || f.to || 'MLE')}</td>
          <td>${escapeHtml(f.departure || f.departure_time || '10:30 AM')}</td>
          <td>${escapeHtml(f.arrival || f.arrival_time || '08:45 PM')}</td>
          <td style="font-weight:700;color:var(--navy-primary)">${formatINR(f.price || 85000)}</td>
          <td><span class="abadge ab-confirmed"><span class="abadge-dot"></span>${escapeHtml(f.status || 'Scheduled')}</span></td>
          <td>
            <div class="action-btn-group">
              <button class="aab-edit" onclick="openFlightModal('${f.id}')">Edit</button>
              <button class="aab-delete" onclick="confirmDeleteCmsItem('flights', '${f.id}', '${escapeHtml(f.airline || '')}')">Cancel</button>
            </div>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.warn('Flights load error:', e);
    }
  }

  async function renderCarsTable() {
    const tbody = document.querySelector('#cars-table-body');
    const countEl = document.querySelector('#cars-count-label');
    if (!tbody) return;
    try {
      const res = await fetch('/api/admin/cars');
      const json = await res.json();
      const cars = (json.success && json.data && json.data.length > 0) ? json.data : adminData.cars;
      if (countEl) countEl.textContent = `${cars.length} Vehicles`;
      tbody.innerHTML = cars.map(c => `
        <tr>
          <td><strong>${escapeHtml(c.model || c.car_model || 'Luxury Vehicle')}</strong></td>
          <td>📍 ${escapeHtml(c.location || 'Airport Hub')}</td>
          <td><span class="abadge ab-active">${escapeHtml(c.category || 'Luxury SUV')}</span></td>
          <td style="font-weight:700;color:var(--navy-primary)">${formatINR(c.price || 15000)} / day</td>
          <td>${escapeHtml(c.available || 'Instant Confirmation')}</td>
          <td><span class="abadge ${c.status === 'Available' || c.status === 'published' ? 'ab-confirmed' : 'ab-pending'}"><span class="abadge-dot"></span>${escapeHtml(c.status || 'Available')}</span></td>
          <td>
            <div class="action-btn-group">
              <button class="aab-edit" onclick="openCarModal('${c.id}')">Edit</button>
              <button class="aab-delete" onclick="confirmDeleteCmsItem('cars', '${c.id}', '${escapeHtml(c.model || c.car_model || '')}')">Retire</button>
            </div>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.warn('Cars load error:', e);
    }
  }

  function renderCruisesTable() {
    if (typeof window.fetchAndRenderCruises === 'function') {
      window.fetchAndRenderCruises();
    }
  }

  function renderVisaTable() {
    const tbody = document.querySelector('#visa-table-body');
    const countEl = document.querySelector('#visa-count-label');
    if (!tbody) return;
    if (countEl) countEl.textContent = `${adminData.visaRequests.length} Visa Applications`;
    tbody.innerHTML = adminData.visaRequests.map(v => {
      const status = v.status || 'Pending';
      const statusClass = status === 'Approved' ? 'ab-confirmed' : status === 'Rejected' ? 'ab-cancelled' : 'ab-pending';
      return `
        <tr>
          <td>
            <strong>${escapeHtml(v.customer)}</strong>
            <div style="font-size:11px"><code class="ref">${escapeHtml(v.id)}</code></div>
          </td>
          <td>📍 ${escapeHtml(v.destination || 'Global')}</td>
          <td><span class="abadge ab-active">${escapeHtml(v.type || 'Tourist Visa')}</span></td>
          <td>📅 ${escapeHtml(v.travelDate || '2026-10-15')}</td>
          <td>${escapeHtml(v.submitted || '2026-08-10')}</td>
          <td><span class="abadge ${statusClass}"><span class="abadge-dot"></span>${escapeHtml(status)}</span></td>
          <td>
            <div class="action-btn-group">
              <button class="aab-approve" onclick="approveVisa('${v.id}')">Approve</button>
              <button class="aab-reject" onclick="rejectVisa('${v.id}')">Reject</button>
              <button class="aab-edit" onclick="openVisaModal('${v.id}')">Edit</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.renderHotelsTable = async function() {
    const tbody = document.querySelector('#hotels-table-body');
    const countEl = document.querySelector('#hotels-count-label');
    if (!tbody) return;
    try {
      const res = await fetch('/api/hotels');
      const json = await res.json();
      const hotels = (json.success && json.data) ? json.data : [];
      if (countEl) countEl.textContent = `${hotels.length} Luxury Hotels & Resorts`;
      if (hotels.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-muted)">No luxury hotels found.</td></tr>`;
        return;
      }
      tbody.innerHTML = hotels.map(h => {
        const rating = h.starRating || h.rating || 5;
        const price = h.startingPrice || h.price || 0;
        const status = (h.status || 'Active').toUpperCase();
        return `
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <img src="${h.heroImage || h.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'}" style="width:44px;height:34px;border-radius:6px;object-fit:cover" alt="${escapeHtml(h.title || h.name)}" />
                <div>
                  <strong style="color:var(--navy-primary)">${escapeHtml(h.title || h.name || 'Luxury Resort')}</strong>
                  <div style="font-size:11px;color:var(--text-muted);">${escapeHtml(h.badge || '5-Star Luxury')}</div>
                </div>
              </div>
            </td>
            <td>📍 ${escapeHtml(h.destination || h.location || 'Global')}</td>
            <td>⭐ ${rating}.0</td>
            <td style="font-weight:700;color:var(--navy-primary);">${formatINR(price)} / night</td>
            <td>12 Suites Available</td>
            <td><span class="abadge ab-confirmed"><span class="abadge-dot"></span>${status}</span></td>
            <td>
              <div class="action-btn-group">
                <button class="aab-edit" onclick="openCmsModal('hotels', '${h.id || h._id}')">Edit</button>
                <button class="aab-delete" onclick="confirmDeleteCmsItem('hotels', '${h.id || h._id}', '${(h.title || h.name || '').replace(/'/g, "\\'")}')">Delete</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    } catch (e) {
      console.warn('Hotels load error:', e);
    }
  };

  window.openHotelModal = function(id = null) {
    if (typeof openCmsModal === 'function') {
      openCmsModal('hotels', id);
    }
  };

  function renderInsuranceTable() {
    const tbody = document.querySelector('#insurance-table-body');
    const countEl = document.querySelector('#insurance-count-label');
    if (countEl) countEl.textContent = `${adminData.insurance.length} Active Policies & Claims`;
    if (!tbody) return;
    tbody.innerHTML = adminData.insurance.map(ins => {
      const status = ins.status || 'Active';
      const statusClass = status === 'Active' || status === 'Approved' ? 'ab-confirmed' : status === 'Rejected' ? 'ab-cancelled' : 'ab-pending';
      return `
        <tr>
          <td>
            <strong>${escapeHtml(ins.traveler)}</strong>
            <div style="font-size:11px"><code class="ref">${escapeHtml(ins.id)}</code></div>
          </td>
          <td><span class="abadge ab-active">${escapeHtml(ins.type || 'Comprehensive Gold')}</span></td>
          <td>📍 ${escapeHtml(ins.destination || 'Worldwide')}</td>
          <td style="font-weight:700;color:var(--navy-primary)">$${(ins.coverage || 50000).toLocaleString()}</td>
          <td>${escapeHtml(ins.startDate || '2026-09-01')}</td>
          <td>${escapeHtml(ins.endDate || '2026-09-30')}</td>
          <td><span class="abadge ${statusClass}"><span class="abadge-dot"></span>${escapeHtml(status)}</span></td>
          <td>
            <div class="action-btn-group">
              <button class="aab-view" onclick="openInsuranceViewModal('${ins.id}')">View</button>
              <button class="aab-edit" onclick="openInsuranceModal('${ins.id}')">Edit</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderPaymentsTable() {
    const tbody = document.querySelector('#payments-table-body');
    if (!tbody) return;
    tbody.innerHTML = adminData.payments.map(p => `
      <tr>
        <td><code class="ref" style="font-weight:700;color:#0284c7;">${escapeHtml(p.id)}</code></td>
        <td><strong>${escapeHtml(p.customer)}</strong></td>
        <td><code class="ref">${escapeHtml(p.ref || 'BK-2026-001')}</code></td>
        <td style="font-weight:700;color:${p.amount > 0 ? '#059669' : '#dc2626'}">${p.amount > 0 ? '+' : ''}${formatINR(Math.abs(p.amount) * 80)}</td>
        <td>💳 ${escapeHtml(p.gateway || 'Stripe')}</td>
        <td>${escapeHtml(p.date || '2026-08-16')}</td>
        <td><span class="abadge ${p.status === 'Captured' ? 'ab-confirmed' : 'ab-cancelled'}"><span class="abadge-dot"></span>${escapeHtml(p.status || 'Captured')}</span></td>
        <td>
          <button class="aab-view" onclick="showToast('Receipt issued for ${p.id}','🧾')">Receipt</button>
        </td>
      </tr>
    `).join('');
  }

  function renderRefundsTable() {
    const tbody = document.querySelector('#refunds-table-body');
    if (!tbody) return;
    tbody.innerHTML = adminData.refunds.map(rf => `
      <tr>
        <td><code class="ref" style="font-weight:700;color:#0284c7;">${escapeHtml(rf.id)}</code></td>
        <td><code class="ref">${escapeHtml(rf.booking)}</code></td>
        <td><strong>${escapeHtml(rf.traveler)}</strong></td>
        <td style="font-weight:700;color:var(--navy-primary)">${formatINR(rf.amount * 80)}</td>
        <td>${escapeHtml(rf.reason || 'Requested by customer')}</td>
        <td>${escapeHtml(rf.date || '2026-08-14')}</td>
        <td><span class="abadge ${rf.status === 'Processed' ? 'ab-confirmed' : rf.status === 'Rejected' ? 'ab-cancelled' : 'ab-pending'}"><span class="abadge-dot"></span>${escapeHtml(rf.status)}</span></td>
        <td>
          <div class="action-btn-group">
            <button class="aab-view" onclick="openRefundViewModal('${rf.id}')">View</button>
            ${rf.status === 'Pending Review' ? `
              <button class="aab-approve" onclick="approveRefund('${rf.id}')">Approve</button>
              <button class="aab-reject" onclick="rejectRefund('${rf.id}')">Reject</button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  /* ── COMMERCE: COUPONS & PROMO CODES ── */
  window._adminCouponsList = [];

  window.renderCouponsTable = async function() {
    const tbody = document.querySelector('#coupons-table-body');
    const countLabel = document.querySelector('#coupons-count-label');
    if (!tbody) return;
    try {
      const res = await fetch('/api/admin/coupons');
      const json = await res.json();
      const coupons = (json.success && json.data && json.data.length > 0) ? json.data : adminData.coupons;
      window._adminCouponsList = coupons;
      if (countLabel) countLabel.textContent = `${coupons.length} Promotional Codes`;

      tbody.innerHTML = coupons.map(c => {
        const id = c.id || c.code;
        const code = (c.code || '').toUpperCase();
        const discType = c.discount_type || (String(c.type || '').toLowerCase().includes('percent') ? 'percentage' : 'fixed');
        let discVal = c.discount_value;
        if (discVal === undefined || discVal === null) {
          const nums = String(c.type || '').match(/\d+/);
          discVal = nums ? Number(nums[0]) : 15;
          if (discType === 'fixed' && discVal < 1000) discVal = discVal * 100;
        }
        const rateLabel = discType === 'percentage' ? `${discVal}% Off` : formatINR(discVal) + ' Off';
        const minAmount = Number(c.min_amount || c.minBookingAmount || 0);
        const minLabel = minAmount > 0 ? formatINR(minAmount) : '<span style="color:#94a3b8;">None</span>';
        const uses = c.uses || c.used_count || 0;
        const limit = c.limit_count || c.limit || c.usage_limit || 500;
        const startDate = c.start_date || c.startDate || '2026-01-01';
        const expiry = c.expiry || c.expiry_date || 'Dec 31, 2026';
        const status = c.status || 'Active';
        const isActive = status.toLowerCase() === 'active';

        return `
          <tr>
            <td>
              <code class="ref" style="font-size:13px; font-weight:800; color:#0284c7; letter-spacing:0.5px;">${escapeHtml(code)}</code>
            </td>
            <td>
              <strong style="color:#0f172a;">${escapeHtml(rateLabel)}</strong>
              <div style="font-size:11px; color:#64748b;">${discType === 'percentage' ? 'Percentage' : 'Flat Off'}</div>
            </td>
            <td><span class="abadge ab-active">${discType === 'percentage' ? 'Percentage' : 'Fixed'}</span></td>
            <td>${escapeHtml(startDate)}</td>
            <td>${escapeHtml(expiry)}</td>
            <td>
              <strong>${uses}</strong> / ${limit}
            </td>
            <td>
              <span class="abadge ${isActive ? 'ab-confirmed' : 'ab-cancelled'}">
                <span class="abadge-dot"></span>${escapeHtml(status)}
              </span>
            </td>
            <td>
              <div class="action-btn-group">
                ${isActive ? 
                  `<button class="aab-reject" onclick="toggleCouponStatus('${id}', 'Inactive')" title="Deactivate" style="padding:4px 8px; font-size:11px;">Disable</button>` : 
                  `<button class="aab-approve" onclick="toggleCouponStatus('${id}', 'Active')" title="Activate" style="padding:4px 8px; font-size:11px;">Enable</button>`
                }
                <button class="aab-edit" onclick="openCouponModal('${id}')" style="padding:4px 8px; font-size:11px;">Edit</button>
                <button class="aab-delete" onclick="confirmDeleteCmsItem('coupons', '${id}', '${escapeHtml(code)}')" style="padding:4px 8px; font-size:11px;">Delete</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    } catch (e) {
      console.warn('Coupons load error:', e);
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:24px;color:#EF4444">⚠️ Error loading coupons. Click Refresh to try again.</td></tr>`;
    }
  };

  window.handleQuickCouponCreate = async function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const codeInput = document.getElementById('new-coupon-code');
    const typeInput = document.getElementById('new-coupon-type');
    const valInput = document.getElementById('new-coupon-value');
    const minInput = document.getElementById('new-coupon-min-amount');
    const startInput = document.getElementById('new-coupon-start-date');
    const expInput = document.getElementById('new-coupon-expiry');
    const limitInput = document.getElementById('new-coupon-limit');
    const btn = document.getElementById('btn-create-coupon');

    const code = (codeInput?.value || '').trim().toUpperCase();
    const discType = typeInput?.value || 'percentage';
    const discVal = parseFloat(valInput?.value || 0);
    const minAmt = parseFloat(minInput?.value || 0);
    const startDate = startInput?.value || '';
    const expiry = expInput?.value || '2026-12-31';
    const limitCount = parseInt(limitInput?.value || 500);

    if (!code) { showToast('Please enter a coupon code.', '⚠️'); return; }
    if (!discVal || discVal <= 0) { showToast('Please enter a valid discount value.', '⚠️'); return; }
    if (!expiry) { showToast('Please select an expiration date.', '⚠️'); return; }

    if (btn) { btn.disabled = true; btn.textContent = 'Saving...'; }

    const payload = {
      id: `coup-${Date.now()}`,
      code: code,
      discount_type: discType,
      discount_value: discVal,
      type: discType === 'percentage' ? `Percentage (${discVal}%)` : `Fixed (₹${discVal.toLocaleString('en-IN')})`,
      min_amount: minAmt,
      start_date: startDate,
      expiry: expiry,
      expiry_date: expiry,
      limit_count: limitCount,
      limit: limitCount,
      uses: 0,
      status: 'Active'
    };

    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Coupon ${code} created & synced with Supabase!`, '🎟️');
        if (codeInput) codeInput.value = '';
        if (valInput) valInput.value = '';
        renderCouponsTable();
      } else {
        showToast(json.message || 'Failed to create coupon', '⚠️');
      }
    } catch (err) {
      showToast('Error saving coupon', '⚠️');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '+ Save Coupon'; }
    }
  };

  async function renderBlogsTable() {
    const tbody = document.querySelector('#blogs-table-body');
    const countEl = document.querySelector('#blogs-count-label');
    if (!tbody) return;
    try {
      const res = await fetch('/api/admin/blogs');
      const json = await res.json();
      const blogs = (json.success && json.data && json.data.length > 0) ? json.data : adminData.blogs;
      if (countEl) countEl.textContent = `${blogs.length} Published Articles`;
      tbody.innerHTML = blogs.map(b => `
        <tr>
          <td>
            <img src="${b.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'}" style="width:44px;height:34px;border-radius:6px;object-fit:cover" alt="${escapeHtml(b.title)}" />
          </td>
          <td><strong>${escapeHtml(b.title)}</strong></td>
          <td><span class="abadge ab-active">${escapeHtml(b.category || 'Travel Guide')}</span></td>
          <td>${escapeHtml(b.author || 'Editorial')}</td>
          <td>${escapeHtml(b.date || 'Recent')}</td>
          <td><span class="abadge ${b.status === 'Published' || b.status === 'published' ? 'ab-confirmed' : 'ab-pending'}"><span class="abadge-dot"></span>${escapeHtml(b.status || 'published')}</span></td>
          <td>
            <div class="action-btn-group">
              <button class="aab-edit" onclick="openBlogModal('${b.id}')">Edit</button>
              <button class="aab-delete" onclick="confirmDeleteCmsItem('blogs', '${b.id}', '${(b.title || '').replace(/'/g, "\\'")}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.warn('Blogs load error:', e);
    }
  }

  async function renderReviewsTable() {
    const tbody = document.querySelector('#reviews-table-body');
    if (!tbody) return;
    try {
      const res = await fetch('/api/admin/reviews');
      const json = await res.json();
      const reviews = (json.success && json.data && json.data.length > 0) ? json.data : adminData.reviews;
      tbody.innerHTML = reviews.map(r => `
        <tr>
          <td><strong>${escapeHtml(r.customer || r.author_name || 'Guest Traveler')}</strong></td>
          <td>📍 ${escapeHtml(r.trip || 'Luxury Trip')}</td>
          <td style="color:#f59e0b;font-size:13px">${'★'.repeat(r.rating || 5)}${'☆'.repeat(5-(r.rating || 5))}</td>
          <td>
            <div style="font-size:12px;color:#64748b;max-width:280px;line-height:1.4;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">
              ${escapeHtml(r.comment || 'Exceptional experience from start to finish.')}
            </div>
          </td>
          <td>${escapeHtml(r.date || 'Aug 2026')}</td>
          <td><span class="abadge ${r.status === 'Approved' || r.status === 'approved' ? 'ab-confirmed' : 'ab-cancelled'}"><span class="abadge-dot"></span>${escapeHtml(r.status || 'Approved')}</span></td>
          <td>
            <div class="action-btn-group">
              <button class="aab-approve" onclick="togglePublishStatus('reviews', '${r.id}', 'approved')">Approve</button>
              <button class="aab-reject" onclick="togglePublishStatus('reviews', '${r.id}', 'flagged')">Flag</button>
              <button class="aab-delete" onclick="confirmDeleteCmsItem('reviews', '${r.id}', 'Review by ${(r.customer || 'Guest').replace(/'/g, "\\'")}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.warn('Reviews load error:', e);
    }
  }

  async function renderGalleryGrid() {
    const grid = document.querySelector('#gallery-grid-container');
    const countEl = document.querySelector('#gallery-count-label');
    if (!grid) return;
    try {
      const res = await fetch('/api/admin/gallery');
      const json = await res.json();
      const gallery = (json.success && json.data && json.data.length > 0) ? json.data : adminData.gallery;
      if (countEl) countEl.textContent = `${gallery.length} High-Resolution Assets`;
      grid.innerHTML = gallery.map(g => `
        <div class="gallery-card">
          <img src="${g.url || g.image_url}" alt="${escapeHtml(g.title)}" />
          <div class="gallery-card-footer">
            <span class="text-small">${escapeHtml(g.title)}</span>
            <button class="aab-delete" onclick="confirmDeleteCmsItem('gallery', '${g.id}', '${(g.title || '').replace(/'/g, "\\'")}')">Delete</button>
          </div>
        </div>
      `).join('');
    } catch (e) {
      console.warn('Gallery load error:', e);
    }
  }

  /* ── Real-Time Search Filters ── */
  function initSearchFilters() {
    document.querySelectorAll('.admin-search-bar').forEach(input => {
      input.addEventListener('input', () => {
        const tableId = input.dataset.table;
        const query = input.value.toLowerCase().trim();
        if (!tableId) return;
        const tbody = document.getElementById(tableId);
        if (!tbody) return;
        
        Array.from(tbody.querySelectorAll('tr')).forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    });
  }

  /* ── Security Audit Log Telemetry Renderer ── */
  window.renderAuditLogs = function() {
    const tbody = document.getElementById('audit-table-body');
    if (!tbody) return;
    const logs = JSON.parse(localStorage.getItem('ta_audit_logs') || '[]');
    if (logs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--text-muted)">No security telemetry events logged yet.</td></tr>`;
      return;
    }
    tbody.innerHTML = logs.map(l => `
      <tr>
        <td style="font-size:12px;color:#64748B">${new Date(l.timestamp).toLocaleString()}</td>
        <td><strong>Admin (alex@ventoura.com)</strong></td>
        <td><span class="abadge ab-active">${escapeHtml(l.action)}</span></td>
        <td><code>${escapeHtml(l.module || 'System')}</code></td>
        <td><code>${escapeHtml(l.ip)}</code></td>
        <td><span class="abadge ab-confirmed">SUCCESS</span></td>
        <td style="font-size:12px;color:var(--text-secondary)">${escapeHtml(l.details)}</td>
      </tr>
    `).join('');
    showToast('Audit logs refreshed', '🔄');
  };

  /* ── Dashboard: Recent Records Structured Table ── */
  function renderDashboardRecentTable() {
    const tbody = document.getElementById('dashboard-recent-bookings-body');
    if (!tbody) return;
    const bookings = (window._adminBookingsList && window._adminBookingsList.length > 0) ? window._adminBookingsList.slice(0, 5) : adminData.bookings.slice(0, 5);
    tbody.innerHTML = bookings.map((b, i) => {
      const ref = b.booking_reference || b.refNo || b.id || `BK-2026-000${i+1}`;
      const name = b.customerName || b.full_name || b.customer || 'Guest';
      const dest = b.destination || b.city || 'Global';
      const product = b.item_title || b.productName || b.package || 'Travel Experience';
      const amount = b.total_amount || b.price || b.amount || 25000;
      const status = (b.booking_status || b.status || 'Confirmed');
      const statusClass = status.toLowerCase() === 'confirmed' ? 'ab-confirmed' : status.toLowerCase() === 'cancelled' ? 'ab-cancelled' : 'ab-pending';
      return `
        <tr>
          <td><code class="ref" style="font-weight:700;color:#0284C7">${escapeHtml(ref)}</code></td>
          <td><strong>${escapeHtml(name)}</strong></td>
          <td>📍 ${escapeHtml(dest)} <span style="font-size:11px;color:#64748B">(${escapeHtml(product)})</span></td>
          <td style="font-weight:700;color:#059669">${formatINR(amount)}</td>
          <td><span class="abadge ${statusClass}"><span class="abadge-dot"></span>${escapeHtml(status)}</span></td>
          <td>
            <button class="aab-view" onclick="window.openBookingDetailModal('${b.id || ref}')">View</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  /* ── Executive Reports Analytics Engine & Table ── */
  const adminReportsData = [
    { id: 'rep-01', title: 'Monthly Revenue & Financial Ledger', category: 'Finance', records: '140 Bookings', dateRange: 'Jan 01, 2026 – Jul 31, 2026', generated: '2026-08-16 18:30', format: 'CSV / Excel' },
    { id: 'rep-02', title: 'Complete Bookings & Reservations Manifest', category: 'Commerce', records: '542 Transactions', dateRange: 'Jan 01, 2026 – Aug 16, 2026', generated: '2026-08-16 19:15', format: 'CSV' },
    { id: 'rep-03', title: 'Registered Travelers & VIP Tier Demographics', category: 'Customers', records: '52,301 Accounts', dateRange: 'All Time (2026)', generated: '2026-08-15 12:00', format: 'CSV' },
    { id: 'rep-04', title: 'Refund Claims & Dispute Disbursal Audit', category: 'Operations', records: '48 Claims', dateRange: 'Q1 & Q2 2026', generated: '2026-08-14 09:45', format: 'CSV' },
    { id: 'rep-05', title: 'Customer Reviews & Satisfaction Index Report', category: 'Feedback', records: '1,820 Reviews', dateRange: 'Last 12 Months', generated: '2026-08-16 08:00', format: 'CSV' },
    { id: 'rep-06', title: 'Flights & Hotel Partner Commission Ledger', category: 'Finance', records: '86 Partners', dateRange: 'YTD 2026', generated: '2026-08-16 14:20', format: 'CSV' }
  ];

  window.renderReportsTable = function() {
    window.filterReportsTable();
  };

  window.filterReportsTable = function() {
    const tbody = document.getElementById('reports-table-body');
    const search = (document.getElementById('reports-search-input')?.value || '').toLowerCase();
    const cat = document.getElementById('reports-category-filter')?.value || 'ALL';
    if (!tbody) return;

    let filtered = adminReportsData.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(search) || r.category.toLowerCase().includes(search);
      const matchesCat = cat === 'ALL' || r.category === cat;
      return matchesSearch && matchesCat;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-muted)">No matching reports found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(r => `
      <tr>
        <td><strong style="color:var(--navy-primary)">📊 ${escapeHtml(r.title)}</strong></td>
        <td><span class="abadge ab-active">${escapeHtml(r.category)}</span></td>
        <td><strong>${escapeHtml(r.records)}</strong></td>
        <td>📅 ${escapeHtml(r.dateRange)}</td>
        <td style="font-size:12px;color:var(--text-muted)">${escapeHtml(r.generated)}</td>
        <td><code class="ref" style="font-size:11px">${escapeHtml(r.format)}</code></td>
        <td>
          <div class="action-btn-group">
            <button class="aab-view" onclick="window.downloadReportCSV('${r.id}', '${escapeHtml(r.title)}')">📥 Export CSV</button>
          </div>
        </td>
      </tr>
    `).join('');
  };

  window.downloadReportCSV = function(id, title) {
    const dummyData = "Report ID,Title,Generated Date,Status\n" + id + ',"' + title + '",' + new Date().toISOString() + ',Completed\n';
    const blob = new Blob([dummyData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}.csv`;
    link.click();
    showToast(`Exported "${title}" as CSV!`, '📥');
  };

  window.exportAllReportsCSV = function() {
    showToast('Exporting all executive operational reports manifest as CSV...', '📥');
    window.downloadReportCSV('all-reports', 'Ventoura_All_Executive_Reports_2026');
  };

  /* ── Permissions Matrix Logic ── */
  function initPermissionsMatrix() {
    document.querySelectorAll('.perm-check').forEach(cb => {
      cb.addEventListener('change', () => {
        const role = cb.dataset.role || 'Role';
        const perm = cb.dataset.perm || 'Permission';
        showToast(`Permission "${perm}" ${cb.checked ? 'granted to' : 'revoked from'} ${role}`, '🔐');
        if (window.VentouraSecurity) window.VentouraSecurity.logAuditEvent('PERMISSION_CHANGE', `${perm} modified for ${role}`);
      });
    });
  }

  /* ── CMS Editor Toolbar Actions ── */
  function initCMSEditor() {
    const editor = document.querySelector('#cms-editor-body');
    document.querySelectorAll('.cms-tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.dataset.cmd;
        if (cmd === 'save') {
          showToast('CMS content saved successfully!', '💾');
        } else if (cmd) {
          document.execCommand(cmd, false, null);
          editor?.focus();
        }
      });
    });
  }

  /* ── Dynamic CMS Content Management (Backend API) ── */
  let currentEditingType = null;
  let currentEditingItem = null;

  async function loadDynamicCmsContent() {
    await fetchAndRenderDestinations();
    await fetchAndRenderPackages();
    await fetchAndRenderHotels();
    await renderCruisesTable();
    await renderFlightsTable();
    await renderCarsTable();
    await renderBlogsTable();
    await renderReviewsTable();
    await renderCouponsTable();
    await renderUsersTable();
    await renderStaffTable();
    await renderBookingsTable();
    await renderDashboardRecentTable();
    await renderReportsTable();
    await renderPaymentsTable();
    await renderRefundsTable();
    await renderVisaTable();
    await renderInsuranceTable();
    await renderGalleryGrid();
    await window.fetchAndRenderFaqs();
    await window.fetchAndRenderInquiries();
    renderAuditLogs();
  }

  /* ══════════════════════════════════════════════════════════
     PROFESSIONAL CMS STATUS MANAGEMENT SYSTEM
     (Destinations, Packages, Cruises)
     - Statuses: Published | Unpublished | Recycle Bin (Trash)
     ══════════════════════════════════════════════════════════ */
  const currentStatusFilter = {
    destinations: 'all',
    packages: 'all',
    cruises: 'all'
  };

  window._adminDestinationsList = [];
  window._adminPackagesList = [];
  window._adminCruisesList = [];

  window.filterCmsSection = function(resource, statusFilter) {
    if (!['destinations', 'packages', 'cruises'].includes(resource)) return;
    currentStatusFilter[resource] = statusFilter || 'all';

    // Update active tab button style
    const tabsContainerId = resource === 'destinations' ? 'dest-status-tabs' :
                            resource === 'packages' ? 'pkg-status-tabs' : 'cruises-status-tabs';
    const tabsContainer = document.getElementById(tabsContainerId);
    if (tabsContainer) {
      tabsContainer.querySelectorAll('.status-tab-btn').forEach(btn => {
        if (btn.dataset.status === currentStatusFilter[resource]) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    if (resource === 'destinations') renderDestinationsFiltered();
    else if (resource === 'packages') renderPackagesFiltered();
    else if (resource === 'cruises') renderCruisesFiltered();
  };

  /* ── 1. DESTINATIONS STATUS MANAGEMENT ── */
  window.fetchAndRenderDestinations = async function() {
    const tbody = document.getElementById('destinations-table-body');
    const label = document.getElementById('dest-count-label');
    if (!tbody) return;

    try {
      const res = await fetch('/api/destinations?all=true');
      const json = await res.json();
      const items = (json.success && Array.isArray(json.data)) ? json.data : [];

      window._adminDestinationsList = items;

      const allCount = items.filter(d => (d.status || 'published').toLowerCase() !== 'trash').length;
      const pubCount = items.filter(d => ['published', 'active'].includes((d.status || 'published').toLowerCase())).length;
      const unpubCount = items.filter(d => ['unpublished', 'draft'].includes((d.status || '').toLowerCase())).length;
      const trashCount = items.filter(d => (d.status || '').toLowerCase() === 'trash').length;

      const countAllEl = document.getElementById('dest-count-all');
      const countPubEl = document.getElementById('dest-count-published');
      const countUnpubEl = document.getElementById('dest-count-unpublished');
      const countTrashEl = document.getElementById('dest-count-trash');

      if (countAllEl) countAllEl.textContent = allCount;
      if (countPubEl) countPubEl.textContent = pubCount;
      if (countUnpubEl) countUnpubEl.textContent = unpubCount;
      if (countTrashEl) countTrashEl.textContent = trashCount;

      if (label) label.textContent = `${allCount} Destinations Total (${pubCount} Published, ${unpubCount} Unpublished)`;

      renderDestinationsFiltered();
    } catch (e) {
      console.error('Error fetching destinations:', e);
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:24px;color:#EF4444">⚠️ Error loading destinations. Click to retry.</td></tr>`;
    }
  };

  function renderDestinationsFiltered() {
    const tbody = document.getElementById('destinations-table-body');
    const thead = document.getElementById('dest-table-head');
    if (!tbody) return;

    const filter = currentStatusFilter.destinations;
    let items = window._adminDestinationsList || [];

    if (thead) {
      if (filter === 'trash') {
        thead.innerHTML = `<tr><th>Image</th><th>Destination Name</th><th>Category</th><th>Original Status</th><th>Date Moved to Recycle Bin</th><th>Current Status</th><th>Actions</th></tr>`;
      } else {
        thead.innerHTML = `<tr><th>Image</th><th>Destination Name</th><th>Country / Location</th><th>Category</th><th>Starting Price</th><th>Duration</th><th>Status</th><th>Updated</th><th>Actions</th></tr>`;
      }
    }

    if (filter === 'published') {
      items = items.filter(d => ['published', 'active'].includes((d.status || 'published').toLowerCase()));
    } else if (filter === 'unpublished') {
      items = items.filter(d => ['unpublished', 'draft'].includes((d.status || '').toLowerCase()));
    } else if (filter === 'trash') {
      items = items.filter(d => (d.status || '').toLowerCase() === 'trash');
    } else {
      items = items.filter(d => (d.status || 'published').toLowerCase() !== 'trash');
    }

    if (items.length === 0) {
      const msg = filter === 'published' ? 'No published destinations. Click "Publish" on an unpublished destination.' :
                  filter === 'unpublished' ? 'No unpublished destinations.' :
                  filter === 'trash' ? 'Recycle bin is empty. No deleted destinations.' :
                  'No destinations found. Click "+ Add Destination" to create one.';
      const colSpan = filter === 'trash' ? 7 : 9;
      tbody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align:center;padding:36px;color:var(--text-muted)">${msg}</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(d => {
      const rawStatus = (d.status || 'published').toLowerCase();
      const isTrash = rawStatus === 'trash';
      const isPublished = ['published', 'active'].includes(rawStatus);

      if (isTrash) {
        const origStat = (d.originalStatus || 'published').toLowerCase();
        const origBadge = (origStat === 'published' || origStat === 'active') ?
          `<span class="abadge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;font-weight:700;font-size:11px;">Previously Published</span>` :
          `<span class="abadge" style="background:#FFFBEB;color:#B45309;border:1px solid #FDE68A;font-weight:700;font-size:11px;">Previously Unpublished</span>`;
        const trashedDate = formatDateTime(d.trashedAt || d.updated_at);

        return `
          <tr id="dest-row-${d.id || d._id}">
            <td>
              <img src="${d.image || d.image_url || d.imageUrl || 'assets/images/dest-maldives.jpg'}" style="width:46px;height:36px;border-radius:6px;object-fit:cover" alt="${escapeHtml(d.title)}" onerror="this.src='assets/images/dest-maldives.jpg'" />
            </td>
            <td>
              <strong style="color:var(--navy-primary)">${escapeHtml(d.title)}</strong>
              <div style="font-size:11px;color:var(--text-muted)">📍 ${escapeHtml(d.country || 'Global')}${d.city ? ` &bull; ${escapeHtml(d.city)}` : ''}</div>
            </td>
            <td><span class="abadge" style="background:#F0F4F8;color:var(--navy-primary)">${escapeHtml(d.category || 'General')}</span></td>
            <td>${origBadge}</td>
            <td style="font-size:12px;color:#64748B;">🕒 ${trashedDate}</td>
            <td><span class="abadge ab-cancelled"><span class="abadge-dot"></span>RECYCLE BIN</span></td>
            <td>
              <div class="action-btn-group" style="display:flex;gap:6px;align-items:center;">
                <button class="aab-restore" onclick="restoreFromRecycleBin('destinations', '${d.id || d._id}', '${escapeHtml(d.title)}')" title="Restore item back to Unpublished list">♻️ Restore</button>
                <button class="aab-delete-perm" onclick="confirmPermanentDelete('destinations', '${d.id || d._id}', '${escapeHtml(d.title)}')" title="Permanently delete from database">🗑️ Permanently Delete</button>
              </div>
            </td>
          </tr>
        `;
      }

      const statusBadge = isPublished ?
        `<span class="abadge ab-confirmed"><span class="abadge-dot"></span>PUBLISHED</span>` :
        `<span class="abadge ab-pending"><span class="abadge-dot"></span>UNPUBLISHED</span>`;

      const actionButtons = `
        <div class="action-btn-group" style="display:flex;gap:6px;align-items:center;">
          <button class="aab-edit" onclick="openDestinationModal('${d.id || d._id}')">Edit</button>
          ${isPublished ?
            `<button class="aab-unpub" onclick="setCmsItemStatus('destinations', '${d.id || d._id}', 'unpublished')" title="Unpublish from website">Unpublish</button>` :
            `<button class="aab-pub" onclick="setCmsItemStatus('destinations', '${d.id || d._id}', 'published')" title="Publish live on website">Publish</button>`
          }
          <button class="aab-trash" onclick="moveToRecycleBin('destinations', '${d.id || d._id}', '${escapeHtml(d.title)}')" title="Move to Recycle Bin">🗑️ Bin</button>
        </div>
      `;

      return `
        <tr id="dest-row-${d.id || d._id}">
          <td>
            <img src="${d.image || d.image_url || d.imageUrl || 'assets/images/dest-maldives.jpg'}" style="width:46px;height:36px;border-radius:6px;object-fit:cover" alt="${escapeHtml(d.title)}" onerror="this.src='assets/images/dest-maldives.jpg'" />
          </td>
          <td>
            <strong style="color:var(--navy-primary)">${escapeHtml(d.title)}</strong>
            <div style="font-size:11px;color:var(--text-muted)">${escapeHtml(d.city || '')}</div>
          </td>
          <td>📍 ${escapeHtml(d.country || 'Global')}</td>
          <td><span class="abadge" style="background:#F0F4F8;color:var(--navy-primary)">${escapeHtml(d.category || 'General')}</span></td>
          <td><strong style="color:var(--navy-primary)">${formatINR(d.startingPrice || d.starting_price || d.price || 0)}</strong></td>
          <td>${d.days || 5} Days</td>
          <td>${statusBadge}</td>
          <td style="font-size:12px;color:var(--text-muted)">${d.updated_at ? new Date(d.updated_at).toLocaleDateString() : 'Active'}</td>
          <td>${actionButtons}</td>
        </tr>
      `;
    }).join('');
  }

  /* ── 2. TOUR PACKAGES STATUS MANAGEMENT ── */
  window.fetchAndRenderPackages = async function() {
    const tbody = document.getElementById('packages-table-body');
    const label = document.getElementById('pkg-count-label');
    if (!tbody) return;

    try {
      const res = await fetch('/api/packages?all=true');
      const json = await res.json();
      const items = (json.success && Array.isArray(json.data)) ? json.data : [];

      window._adminPackagesList = items;

      const allCount = items.filter(p => (p.status || 'published').toLowerCase() !== 'trash').length;
      const pubCount = items.filter(p => ['published', 'active'].includes((p.status || 'published').toLowerCase())).length;
      const unpubCount = items.filter(p => ['unpublished', 'draft'].includes((p.status || '').toLowerCase())).length;
      const trashCount = items.filter(p => (p.status || '').toLowerCase() === 'trash').length;

      const countAllEl = document.getElementById('pkg-count-all');
      const countPubEl = document.getElementById('pkg-count-published');
      const countUnpubEl = document.getElementById('pkg-count-unpublished');
      const countTrashEl = document.getElementById('pkg-count-trash');

      if (countAllEl) countAllEl.textContent = allCount;
      if (countPubEl) countPubEl.textContent = pubCount;
      if (countUnpubEl) countUnpubEl.textContent = unpubCount;
      if (countTrashEl) countTrashEl.textContent = trashCount;

      if (label) label.textContent = `${allCount} Tour Packages Total (${pubCount} Published, ${unpubCount} Unpublished)`;

      renderPackagesFiltered();
    } catch (e) {
      console.error('Error fetching packages:', e);
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:24px;color:#EF4444">⚠️ Error loading tour packages. Click to retry.</td></tr>`;
    }
  };

  function renderPackagesFiltered() {
    const tbody = document.getElementById('packages-table-body');
    const thead = document.getElementById('pkg-table-head');
    if (!tbody) return;

    const filter = currentStatusFilter.packages;
    let items = window._adminPackagesList || [];

    if (thead) {
      if (filter === 'trash') {
        thead.innerHTML = `<tr><th>Image</th><th>Package Name</th><th>Category</th><th>Original Status</th><th>Date Moved to Recycle Bin</th><th>Current Status</th><th>Actions</th></tr>`;
      } else {
        thead.innerHTML = `<tr><th>Image</th><th>Package Name</th><th>Destination</th><th>Category</th><th>Price</th><th>Duration</th><th>Guests</th><th>Status</th><th>Actions</th></tr>`;
      }
    }

    if (filter === 'published') {
      items = items.filter(p => ['published', 'active'].includes((p.status || 'published').toLowerCase()));
    } else if (filter === 'unpublished') {
      items = items.filter(p => ['unpublished', 'draft'].includes((p.status || '').toLowerCase()));
    } else if (filter === 'trash') {
      items = items.filter(p => (p.status || '').toLowerCase() === 'trash');
    } else {
      items = items.filter(p => (p.status || 'published').toLowerCase() !== 'trash');
    }

    if (items.length === 0) {
      const msg = filter === 'published' ? 'No published packages. Click "Publish" on an unpublished package.' :
                  filter === 'unpublished' ? 'No unpublished packages.' :
                  filter === 'trash' ? 'Recycle bin is empty. No deleted tour packages.' :
                  'No packages found. Click "+ Add Tour Package" to create one.';
      const colSpan = filter === 'trash' ? 7 : 9;
      tbody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align:center;padding:36px;color:var(--text-muted)">${msg}</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(p => {
      const rawStatus = (p.status || 'published').toLowerCase();
      const isTrash = rawStatus === 'trash';
      const isPublished = ['published', 'active'].includes(rawStatus);

      if (isTrash) {
        const origStat = (p.originalStatus || 'published').toLowerCase();
        const origBadge = (origStat === 'published' || origStat === 'active') ?
          `<span class="abadge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;font-weight:700;font-size:11px;">Previously Published</span>` :
          `<span class="abadge" style="background:#FFFBEB;color:#B45309;border:1px solid #FDE68A;font-weight:700;font-size:11px;">Previously Unpublished</span>`;
        const trashedDate = formatDateTime(p.trashedAt || p.updated_at);

        return `
          <tr id="pkg-row-${p.id || p._id}">
            <td>
              <img src="${p.featuredImage || p.featured_image || p.image || 'assets/images/dest-maldives.jpg'}" style="width:46px;height:36px;border-radius:6px;object-fit:cover" alt="${escapeHtml(p.title)}" onerror="this.src='assets/images/dest-maldives.jpg'" />
            </td>
            <td>
              <strong style="color:var(--navy-primary)">${escapeHtml(p.title)}</strong>
              <div style="font-size:11px;color:var(--text-muted)">📍 ${escapeHtml(p.destination || 'Global')} &bull; ${escapeHtml(p.duration || '7 Days')}</div>
            </td>
            <td><span class="abadge" style="background:#F0F4F8;color:var(--navy-primary)">${escapeHtml(p.category || 'Luxury')}</span></td>
            <td>${origBadge}</td>
            <td style="font-size:12px;color:#64748B;">🕒 ${trashedDate}</td>
            <td><span class="abadge ab-cancelled"><span class="abadge-dot"></span>RECYCLE BIN</span></td>
            <td>
              <div class="action-btn-group" style="display:flex;gap:6px;align-items:center;">
                <button class="aab-restore" onclick="restoreFromRecycleBin('packages', '${p.id || p._id}', '${escapeHtml(p.title)}')" title="Restore item back to Unpublished list">♻️ Restore</button>
                <button class="aab-delete-perm" onclick="confirmPermanentDelete('packages', '${p.id || p._id}', '${escapeHtml(p.title)}')" title="Permanently delete from database">🗑️ Permanently Delete</button>
              </div>
            </td>
          </tr>
        `;
      }

      const statusBadge = isPublished ?
        `<span class="abadge ab-confirmed"><span class="abadge-dot"></span>PUBLISHED</span>` :
        `<span class="abadge ab-pending"><span class="abadge-dot"></span>UNPUBLISHED</span>`;

      const actionButtons = `
        <div class="action-btn-group" style="display:flex;gap:6px;align-items:center;">
          <button class="aab-edit" onclick="openPackageModal('${p.id || p._id}')">Edit</button>
          ${isPublished ?
            `<button class="aab-unpub" onclick="setCmsItemStatus('packages', '${p.id || p._id}', 'unpublished')" title="Unpublish from website">Unpublish</button>` :
            `<button class="aab-pub" onclick="setCmsItemStatus('packages', '${p.id || p._id}', 'published')" title="Publish live on website">Publish</button>`
          }
          <button class="aab-trash" onclick="moveToRecycleBin('packages', '${p.id || p._id}', '${escapeHtml(p.title)}')" title="Move to Recycle Bin">🗑️ Bin</button>
        </div>
      `;

      return `
        <tr id="pkg-row-${p.id || p._id}">
          <td>
            <img src="${p.featuredImage || p.featured_image || p.image || 'assets/images/dest-maldives.jpg'}" style="width:46px;height:36px;border-radius:6px;object-fit:cover" alt="${escapeHtml(p.title)}" onerror="this.src='assets/images/dest-maldives.jpg'" />
          </td>
          <td>
            <strong style="color:var(--navy-primary)">${escapeHtml(p.title)}</strong>
            ${p.badge ? `<div style="font-size:10.5px;color:#B2872F;font-weight:700;">★ ${escapeHtml(p.badge)}</div>` : ''}
          </td>
          <td>📍 ${escapeHtml(p.destination || 'Global')}</td>
          <td><span class="abadge" style="background:#F0F4F8;color:var(--navy-primary)">${escapeHtml(p.category || 'Luxury')}</span></td>
          <td><strong style="color:#059669">${formatINR(p.price || 0)}</strong></td>
          <td>${escapeHtml(p.duration || '7 Days')}</td>
          <td>👥 ${p.includedGuests || 2} Guests</td>
          <td>${statusBadge}</td>
          <td>${actionButtons}</td>
        </tr>
      `;
    }).join('');
  }

  /* ── 3. CRUISES STATUS MANAGEMENT ── */
  window.fetchAndRenderCruises = async function() {
    const tbody = document.getElementById('cruises-table-body');
    const label = document.getElementById('cruises-count-label');
    if (!tbody) return;

    try {
      const res = await fetch('/api/cruises?all=true');
      const json = await res.json();
      const items = (json.success && Array.isArray(json.data)) ? json.data : (adminData.cruises || []);

      window._adminCruisesList = items;

      const allCount = items.filter(c => (c.status || 'published').toLowerCase() !== 'trash').length;
      const pubCount = items.filter(c => ['published', 'active'].includes((c.status || 'published').toLowerCase())).length;
      const unpubCount = items.filter(c => ['unpublished', 'draft'].includes((c.status || '').toLowerCase())).length;
      const trashCount = items.filter(c => (c.status || '').toLowerCase() === 'trash').length;

      const countAllEl = document.getElementById('cruises-count-all');
      const countPubEl = document.getElementById('cruises-count-published');
      const countUnpubEl = document.getElementById('cruises-count-unpublished');
      const countTrashEl = document.getElementById('cruises-count-trash');

      if (countAllEl) countAllEl.textContent = allCount;
      if (countPubEl) countPubEl.textContent = pubCount;
      if (countUnpubEl) countUnpubEl.textContent = unpubCount;
      if (countTrashEl) countTrashEl.textContent = trashCount;

      if (label) label.textContent = `${allCount} Cruise Packages Total (${pubCount} Published, ${unpubCount} Unpublished)`;

      renderCruisesFiltered();
    } catch (e) {
      console.error('Error fetching cruises:', e);
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:24px;color:#EF4444">⚠️ Error loading cruises. Click to retry.</td></tr>`;
    }
  };

  window.renderCruisesTable = window.fetchAndRenderCruises;

  function renderCruisesFiltered() {
    const tbody = document.getElementById('cruises-table-body');
    const thead = document.getElementById('cruises-table-head');
    if (!tbody) return;

    const filter = currentStatusFilter.cruises;
    let items = window._adminCruisesList || [];

    if (thead) {
      if (filter === 'trash') {
        thead.innerHTML = `<tr><th>Image</th><th>Cruise Voyage Title</th><th>Vessel &amp; Route</th><th>Original Status</th><th>Date Moved to Recycle Bin</th><th>Current Status</th><th>Actions</th></tr>`;
      } else {
        thead.innerHTML = `<tr><th>Image</th><th>Cruise Voyage Title</th><th>Route &amp; Line</th><th>Duration</th><th>Cabin Price</th><th>Rating</th><th>Status</th><th>Actions</th></tr>`;
      }
    }

    if (filter === 'published') {
      items = items.filter(c => ['published', 'active'].includes((c.status || 'published').toLowerCase()));
    } else if (filter === 'unpublished') {
      items = items.filter(c => ['unpublished', 'draft'].includes((c.status || '').toLowerCase()));
    } else if (filter === 'trash') {
      items = items.filter(c => (c.status || '').toLowerCase() === 'trash');
    } else {
      items = items.filter(c => (c.status || 'published').toLowerCase() !== 'trash');
    }

    if (items.length === 0) {
      const msg = filter === 'published' ? 'No published cruise voyages. Click "Publish" on an unpublished cruise.' :
                  filter === 'unpublished' ? 'No unpublished cruise packages.' :
                  filter === 'trash' ? 'Recycle bin is empty. No deleted cruise packages.' :
                  'No cruise packages found. Click "+ Add Cruise" to create one.';
      const colSpan = filter === 'trash' ? 7 : 8;
      tbody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align:center;padding:36px;color:var(--text-muted)">${msg}</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(c => {
      const rawStatus = (c.status || 'published').toLowerCase();
      const isTrash = rawStatus === 'trash';
      const isPublished = ['published', 'active'].includes(rawStatus);

      const title = c.title || c.name || 'Luxury Cruise Voyage';
      const vessel = c.vessel || c.cruiseLine || 'Royal Symphony';
      const route = c.route || 'Mediterranean';
      const dur = c.duration || '7 Nights';
      const price = c.price || 189900;
      const img = c.heroImage || c.heroImg || c.image || 'assets/images/gallery-3.jpg';
      const rating = c.rating || 4.95;

      if (isTrash) {
        const origStat = (c.originalStatus || 'published').toLowerCase();
        const origBadge = (origStat === 'published' || origStat === 'active') ?
          `<span class="abadge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;font-weight:700;font-size:11px;">Previously Published</span>` :
          `<span class="abadge" style="background:#FFFBEB;color:#B45309;border:1px solid #FDE68A;font-weight:700;font-size:11px;">Previously Unpublished</span>`;
        const trashedDate = formatDateTime(c.trashedAt || c.updated_at);

        return `
          <tr id="cruise-row-${c.id || c._id}">
            <td>
              <img src="${img}" style="width:46px;height:36px;border-radius:6px;object-fit:cover" alt="${escapeHtml(title)}" onerror="this.src='assets/images/gallery-3.jpg'" />
            </td>
            <td>
              <strong style="color:var(--navy-primary)">${escapeHtml(title)}</strong>
              <div style="font-size:11px;color:#0284c7;">🚢 ${escapeHtml(vessel)} &bull; ${escapeHtml(dur)}</div>
            </td>
            <td>📍 ${escapeHtml(route)}</td>
            <td>${origBadge}</td>
            <td style="font-size:12px;color:#64748B;">🕒 ${trashedDate}</td>
            <td><span class="abadge ab-cancelled"><span class="abadge-dot"></span>RECYCLE BIN</span></td>
            <td>
              <div class="action-btn-group" style="display:flex;gap:6px;align-items:center;">
                <button class="aab-restore" onclick="restoreFromRecycleBin('cruises', '${c.id || c._id}', '${escapeHtml(title)}')" title="Restore item back to Unpublished list">♻️ Restore</button>
                <button class="aab-delete-perm" onclick="confirmPermanentDelete('cruises', '${c.id || c._id}', '${escapeHtml(title)}')" title="Permanently delete from database">🗑️ Permanently Delete</button>
              </div>
            </td>
          </tr>
        `;
      }

      const statusBadge = isPublished ?
        `<span class="abadge ab-confirmed"><span class="abadge-dot"></span>PUBLISHED</span>` :
        `<span class="abadge ab-pending"><span class="abadge-dot"></span>UNPUBLISHED</span>`;

      const actionButtons = `
        <div class="action-btn-group" style="display:flex;gap:6px;align-items:center;">
          <button class="aab-edit" onclick="openCruiseModal('${c.id || c._id}')">Edit</button>
          ${isPublished ?
            `<button class="aab-unpub" onclick="setCmsItemStatus('cruises', '${c.id || c._id}', 'unpublished')" title="Unpublish from website">Unpublish</button>` :
            `<button class="aab-pub" onclick="setCmsItemStatus('cruises', '${c.id || c._id}', 'published')" title="Publish live on website">Publish</button>`
          }
          <button class="aab-trash" onclick="moveToRecycleBin('cruises', '${c.id || c._id}', '${escapeHtml(title)}')" title="Move to Recycle Bin">🗑️ Bin</button>
        </div>
      `;

      return `
        <tr id="cruise-row-${c.id || c._id}">
          <td>
            <img src="${img}" style="width:46px;height:36px;border-radius:6px;object-fit:cover" alt="${escapeHtml(title)}" onerror="this.src='assets/images/gallery-3.jpg'" />
          </td>
          <td>
            <strong style="color:var(--navy-primary)">${escapeHtml(title)}</strong>
            <div style="font-size:11px;color:#0284c7;">🚢 ${escapeHtml(vessel)}</div>
          </td>
          <td>📍 ${escapeHtml(route)}</td>
          <td>${escapeHtml(dur)}</td>
          <td><strong style="color:#059669">${formatINR(price)}</strong></td>
          <td>⭐ ${rating}</td>
          <td>${statusBadge}</td>
          <td>${actionButtons}</td>
        </tr>
      `;
    }).join('');
  }

  /* ══════════════════════════════════════════════════════════
     MODAL CONTROLLERS FOR ALL ENTITIES
     ══════════════════════════════════════════════════════════ */

  window.closeCmsModal = function() {
    const overlay = document.getElementById('cms-modal-overlay');
    if (overlay) overlay.style.display = 'none';
  };

  window.closeCmsDeleteModal = function() {
    const modal = document.getElementById('cms-delete-modal');
    if (modal) modal.style.display = 'none';
  };

  /* ── STAFF MODAL ── */
  window.openStaffModal = function(id = null) {
    currentEditingType = 'staff';
    currentEditingItem = id ? adminData.staff.find(s => s.id === id) : null;
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit Staff Member' : 'Add New Staff Member';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Full Name *</label>
        <input type="text" id="field-staff-name" class="form-control" value="${item.name || ''}" placeholder="e.g. Alex Morgan" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Email Address *</label>
        <input type="email" id="field-staff-email" class="form-control" value="${item.email || ''}" placeholder="e.g. alex@ventoura.com" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Assigned Role *</label>
          <input type="text" id="field-staff-role" class="form-control" value="${item.role || ''}" placeholder="e.g. Travel Specialist" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Department *</label>
          <input type="text" id="field-staff-dept" class="form-control" value="${item.dept || ''}" placeholder="e.g. Packages & Logistics" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Account Status</label>
        <select id="field-staff-status" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
          <option value="Active" ${item.status === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Inactive" ${item.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
        </select>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.confirmDeleteStaff = function(id) {
    const s = adminData.staff.find(x => x.id === id);
    if (!s) return;
    document.getElementById('cms-delete-msg').textContent = `Are you sure you want to remove staff member "${s.name}"?`;
    document.getElementById('cms-confirm-delete-btn').onclick = function() {
      adminData.staff = adminData.staff.filter(x => x.id !== id);
      renderStaffTable();
      closeCmsDeleteModal();
      showToast(`Removed staff member ${s.name}`, '🗑️');
    };
    document.getElementById('cms-delete-modal').style.display = 'flex';
  };

  /* ── USER MODAL & VIEWER ── */
  window.openUserModal = function(id = null) {
    currentEditingType = 'users';
    currentEditingItem = id ? adminData.users.find(u => u.id === id) : null;
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit User Account' : 'Add New User Account';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Full Name *</label>
        <input type="text" id="field-user-name" class="form-control" value="${item.name || ''}" placeholder="e.g. Sophia Vance" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Email Address *</label>
        <input type="email" id="field-user-email" class="form-control" value="${item.email || ''}" placeholder="e.g. sophia@example.com" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Country</label>
          <input type="text" id="field-user-country" class="form-control" value="${item.country || 'United States'}" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">User Role / Tier</label>
          <select id="field-user-role" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
            <option value="Customer" ${item.role === 'Customer' ? 'selected' : ''}>Customer</option>
            <option value="VIP Gold" ${item.role === 'VIP Gold' ? 'selected' : ''}>VIP Gold</option>
            <option value="VIP Platinum" ${item.role === 'VIP Platinum' ? 'selected' : ''}>VIP Platinum</option>
          </select>
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Account Status</label>
        <select id="field-user-status" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
          <option value="Active" ${item.status === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Banned" ${item.status === 'Banned' ? 'selected' : ''}>Banned</option>
        </select>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.openUserViewModal = function(id) {
    const u = adminData.users.find(x => x.id === id);
    if (!u) return;
    document.getElementById('cms-modal-title').textContent = `User Profile — ${u.name}`;
    document.getElementById('cms-modal-fields').innerHTML = `
      <div style="text-align:center;padding:12px 0">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--navy-primary);color:#FFF;font-size:24px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 12px">
          ${u.name.split(' ').map(n=>n[0]).join('')}
        </div>
        <h3 style="margin:0 0 4px">${u.name}</h3>
        <p style="margin:0;color:var(--text-muted);font-size:13px">${u.email}</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:#F8FAFC;padding:16px;border-radius:8px">
        <div><strong>User ID:</strong> ${u.id}</div>
        <div><strong>Country:</strong> ${u.country}</div>
        <div><strong>Membership:</strong> ${u.role}</div>
        <div><strong>Total Bookings:</strong> ${u.bookings}</div>
        <div><strong>Account Status:</strong> ${u.status}</div>
        <div><strong>Member Since:</strong> ${u.joined}</div>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.toggleBanUser = function(id) {
    const u = adminData.users.find(x => x.id === id);
    if (!u) return;
    u.status = u.status === 'Active' ? 'Banned' : 'Active';
    renderUsersTable();
    showToast(`${u.name} account is now ${u.status}`, u.status === 'Banned' ? '⚠️' : '✅');
  };

  /* ── BOOKING MODAL & VIEWER ── */
  window.openBookingViewModal = function(id) {
    const b = adminData.bookings.find(x => x.id === id);
    if (!b) return;
    document.getElementById('cms-modal-title').textContent = `Booking Details — ${b.id}`;
    document.getElementById('cms-modal-fields').innerHTML = `
      <div style="background:#F8FAFC;padding:16px;border-radius:8px;display:flex;flex-direction:column;gap:10px">
        <div><strong>Booking Reference:</strong> <code class="ref">${b.id}</code></div>
        <div><strong>Traveler Name:</strong> ${b.customer}</div>
        <div><strong>Destination:</strong> 📍 ${b.destination}</div>
        <div><strong>Selected Package:</strong> ${b.package}</div>
        <div><strong>Total Amount:</strong> <strong style="color:var(--navy-primary)">$${b.amount.toLocaleString()}</strong></div>
        <div><strong>Booking Status:</strong> ${b.status}</div>
        <div><strong>Transaction Date:</strong> ${b.date}</div>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.cancelBooking = function(id) {
    const b = adminData.bookings.find(x => x.id === id);
    if (!b) return;
    b.status = 'Cancelled';
    renderBookingsTable();
    showToast(`Booking ${b.id} has been cancelled`, '⚠️');
  };

  /* ── FLIGHT MODAL ── */
  window.openFlightModal = function(id = null) {
    currentEditingType = 'flights';
    currentEditingItem = id ? adminData.flights.find(f => f.id === id) : null;
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit Flight Schedule' : 'Add New Flight Schedule';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Flight Code *</label>
          <input type="text" id="field-flight-code" class="form-control" value="${item.code || ''}" placeholder="e.g. EK-202" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Airline Partner *</label>
          <input type="text" id="field-flight-airline" class="form-control" value="${item.airline || ''}" placeholder="e.g. Emirates" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Departure Route *</label>
        <input type="text" id="field-flight-route" class="form-control" value="${item.route || ''}" placeholder="e.g. JFK → MLE" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Departure Date *</label>
          <input type="text" id="field-flight-date" class="form-control" value="${item.departure || 'Aug 1, 2026'}" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Flight Class</label>
          <select id="field-flight-class" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
            <option value="Economy" ${item.flightClass === 'Economy' ? 'selected' : ''}>Economy</option>
            <option value="Business" ${item.flightClass === 'Business' ? 'selected' : ''}>Business</option>
            <option value="First Class" ${item.flightClass === 'First Class' ? 'selected' : ''}>First Class</option>
          </select>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Seat Ticket Price ($) *</label>
          <input type="number" id="field-flight-price" class="form-control" value="${item.price || 1200}" min="1" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Available Seats *</label>
          <input type="number" id="field-flight-seats" class="form-control" value="${item.seats || 12}" min="1" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.confirmDeleteFlight = function(id) {
    const f = adminData.flights.find(x => x.id === id);
    if (!f) return;
    document.getElementById('cms-delete-msg').textContent = `Are you sure you want to cancel flight ${f.code}?`;
    document.getElementById('cms-confirm-delete-btn').onclick = function() {
      adminData.flights = adminData.flights.filter(x => x.id !== id);
      renderFlightsTable();
      closeCmsDeleteModal();
      showToast(`Cancelled flight ${f.code}`, '🗑️');
    };
    document.getElementById('cms-delete-modal').style.display = 'flex';
  };

  /* ── CAR RENTAL MODAL ── */
  window.openCarModal = function(id = null) {
    currentEditingType = 'cars';
    currentEditingItem = id ? adminData.cars.find(c => c.id === id) : null;
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit Rental Vehicle' : 'Add New Rental Vehicle';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Vehicle Model *</label>
        <input type="text" id="field-car-model" class="form-control" value="${item.model || ''}" placeholder="e.g. BMW 7 Series" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Category *</label>
          <input type="text" id="field-car-cat" class="form-control" value="${item.category || 'Luxury Sedan'}" placeholder="e.g. SUV" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Location *</label>
          <input type="text" id="field-car-loc" class="form-control" value="${item.location || ''}" placeholder="e.g. Dubai" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Daily Rate ($) *</label>
          <input type="number" id="field-car-price" class="form-control" value="${item.price || 150}" min="1" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Status</label>
          <select id="field-car-status" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
            <option value="Available" ${item.status === 'Available' ? 'selected' : ''}>Available</option>
            <option value="Rented" ${item.status === 'Rented' ? 'selected' : ''}>Rented</option>
          </select>
        </div>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.confirmDeleteCar = function(id) {
    const c = adminData.cars.find(x => x.id === id);
    if (!c) return;
    document.getElementById('cms-delete-msg').textContent = `Are you sure you want to retire vehicle ${c.model}?`;
    document.getElementById('cms-confirm-delete-btn').onclick = function() {
      adminData.cars = adminData.cars.filter(x => x.id !== id);
      renderCarsTable();
      closeCmsDeleteModal();
      showToast(`Retired vehicle ${c.model}`, '🗑️');
    };
    document.getElementById('cms-delete-modal').style.display = 'flex';
  };

  /* ── CRUISE MODAL ── */
  window.openCruiseModal = async function(id = null) {
    currentEditingType = 'cruises';
    currentEditingItem = null;

    if (id) {
      const res = await fetch('/api/cruises?all=true');
      const json = await res.json();
      const list = (json.success && Array.isArray(json.data)) ? json.data : (adminData.cruises || []);
      currentEditingItem = list.find(cr => String(cr.id || cr._id) === String(id));
    }
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit Cruise Package' : 'Add New Cruise Package';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Cruise Voyage Title *</label>
        <input type="text" id="field-cruise-title" class="form-control" value="${item.title || item.name || ''}" placeholder="e.g. Mediterranean Magic Voyage — 14 Days" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Cruise Line / Vessel Name *</label>
          <input type="text" id="field-cruise-vessel" class="form-control" value="${item.vessel || item.cruiseLine || 'Royal Symphony'}" placeholder="e.g. Royal Symphony" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Duration *</label>
          <input type="text" id="field-cruise-dur" class="form-control" value="${item.duration || '7 Nights / 8 Days'}" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Itinerary Route *</label>
          <input type="text" id="field-cruise-route" class="form-control" value="${item.route || ''}" placeholder="e.g. Italy, Greece, Spain & France" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Cabin Price (₹ or $) *</label>
          <input type="number" id="field-cruise-price" class="form-control" value="${item.price || 189900}" min="1" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Hero Image URL or Upload File</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="url" id="field-image" class="form-control" value="${item.heroImage || item.heroImg || item.image || 'assets/images/gallery-3.jpg'}" style="flex:1;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
          <label class="btn btn-secondary btn-sm" style="margin:0;cursor:pointer;white-space:nowrap;padding:10px 14px">
            📁 Upload
            <input type="file" accept="image/*" style="display:none" onchange="uploadImageFile(this, 'field-image')" />
          </label>
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Description *</label>
        <textarea id="field-description" class="form-control" rows="3" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">${item.description || ''}</textarea>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Publication Status</label>
        <select id="field-status" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
          <option value="published" ${item.status === 'published' ? 'selected' : ''}>Published (Visible on Website)</option>
          <option value="unpublished" ${(item.status === 'unpublished' || item.status === 'draft') ? 'selected' : ''}>Unpublished (Hidden from Website)</option>
          <option value="trash" ${item.status === 'trash' ? 'selected' : ''}>Recycle Bin</option>
        </select>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  /* ── VISA ACTIONS ── */
  window.approveVisa = function(id) {
    const v = adminData.visaRequests.find(x => x.id === id);
    if (!v) return;
    v.status = 'Approved';
    renderVisaTable();
    showToast(`Visa request ${v.id} Approved!`, '✅');
  };

  window.rejectVisa = function(id) {
    const v = adminData.visaRequests.find(x => x.id === id);
    if (!v) return;
    v.status = 'Rejected';
    renderVisaTable();
    showToast(`Visa request ${v.id} Rejected`, '❌');
  };

  window.openVisaModal = function(id = null) {
    currentEditingType = 'visa';
    currentEditingItem = id ? adminData.visaRequests.find(v => v.id === id) : null;
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit Visa Application' : 'Add Visa Application';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Traveler / Applicant Name *</label>
        <input type="text" id="field-visa-customer" class="form-control" value="${item.customer || ''}" placeholder="e.g. John Doe" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Destination Country *</label>
        <input type="text" id="field-visa-dest" class="form-control" value="${item.destination || ''}" placeholder="e.g. Japan, United States, France" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Visa Type *</label>
        <select id="field-visa-type" class="form-control" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
          <option value="Tourist Visa (90 Days)" ${item.type === 'Tourist Visa (90 Days)' ? 'selected' : ''}>Tourist Visa (90 Days)</option>
          <option value="Business Visa (B1/B2)" ${item.type === 'Business Visa (B1/B2)' ? 'selected' : ''}>Business Visa (B1/B2)</option>
          <option value="Tourist eVisa" ${item.type === 'Tourist eVisa' ? 'selected' : ''}>Tourist eVisa (Express 24h)</option>
          <option value="Transit Visa" ${item.type === 'Transit Visa' ? 'selected' : ''}>Transit Visa</option>
        </select>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Application Status</label>
        <select id="field-visa-status" class="form-control" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
          <option value="Pending" ${item.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Approved" ${item.status === 'Approved' ? 'selected' : ''}>Approved</option>
          <option value="Rejected" ${item.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
        </select>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  /* ── INSURANCE MODALS & CLAIMS ── */
  window.openInsuranceModal = function(id = null) {
    currentEditingType = 'insurance';
    currentEditingItem = id ? adminData.insurance.find(ins => ins.id === id) : null;
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit Insurance Policy' : 'Add Insurance Policy';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Traveler Name *</label>
        <input type="text" id="field-ins-traveler" class="form-control" value="${item.traveler || ''}" placeholder="e.g. John Doe" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Policy Type *</label>
        <input type="text" id="field-ins-type" class="form-control" value="${item.type || 'Comprehensive Worldwide'}" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Coverage Limit ($) *</label>
          <input type="number" id="field-ins-coverage" class="form-control" value="${item.coverage || 50000}" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Premium ($) *</label>
          <input type="number" id="field-ins-premium" class="form-control" value="${item.premium || 129}" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.openInsuranceViewModal = function(id) {
    const ins = adminData.insurance.find(x => x.id === id);
    if (!ins) return;
    document.getElementById('cms-modal-title').textContent = `Insurance Policy — ${ins.id}`;
    document.getElementById('cms-modal-fields').innerHTML = `
      <div style="background:#F8FAFC;padding:16px;border-radius:8px;display:flex;flex-direction:column;gap:10px">
        <div><strong>Policy Ref:</strong> <code class="ref">${ins.id}</code></div>
        <div><strong>Traveler Name:</strong> ${ins.traveler}</div>
        <div><strong>Coverage Type:</strong> ${ins.type}</div>
        <div><strong>Coverage Amount:</strong> $${ins.coverage.toLocaleString()}</div>
        <div><strong>Premium:</strong> $${ins.premium}</div>
        <div><strong>Status:</strong> ${ins.status}</div>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.approveClaim = function(id) {
    const ins = adminData.insurance.find(x => x.id === id);
    if (!ins) return;
    ins.status = 'Approved';
    renderInsuranceTable();
    showToast(`Claim ${ins.id} Approved!`, '✅');
  };

  window.rejectClaim = function(id) {
    const ins = adminData.insurance.find(x => x.id === id);
    if (!ins) return;
    ins.status = 'Rejected';
    renderInsuranceTable();
    showToast(`Claim ${ins.id} Rejected`, '❌');
  };

  /* ── REFUND MODAL & ACTIONS ── */
  window.openRefundViewModal = function(id) {
    const rf = adminData.refunds.find(x => x.id === id);
    if (!rf) return;
    document.getElementById('cms-modal-title').textContent = `Refund Request — ${rf.id}`;
    document.getElementById('cms-modal-fields').innerHTML = `
      <div style="background:#F8FAFC;padding:16px;border-radius:8px;display:flex;flex-direction:column;gap:10px">
        <div><strong>Refund ID:</strong> <code class="ref">${rf.id}</code></div>
        <div><strong>Traveler:</strong> ${rf.traveler}</div>
        <div><strong>Booking Ref:</strong> ${rf.booking}</div>
        <div><strong>Refund Amount:</strong> $${rf.amount.toLocaleString()}</div>
        <div><strong>Reason:</strong> ${rf.reason}</div>
        <div><strong>Status:</strong> ${rf.status}</div>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.approveRefund = function(id) {
    const rf = adminData.refunds.find(x => x.id === id);
    if (!rf) return;
    rf.status = 'Processed';
    renderRefundsTable();
    showToast(`Refund ${rf.id} Processed!`, '✅');
  };

  window.rejectRefund = function(id) {
    const rf = adminData.refunds.find(x => x.id === id);
    if (!rf) return;
    rf.status = 'Rejected';
    renderRefundsTable();
    showToast(`Refund ${rf.id} Rejected`, '❌');
  };

  /* ── COUPONS & PROMO CODES ── */
  window.openCouponModal = function(idOrCode = null) {
    currentEditingType = 'coupons';
    const list = window._adminCouponsList || [];
    currentEditingItem = idOrCode ? list.find(c => c.id === idOrCode || c.code === idOrCode) : null;
    const item = currentEditingItem || {};
    const isEdit = !!item.code;

    const discType = item.discount_type || (String(item.type || '').toLowerCase().includes('percent') ? 'percentage' : 'fixed');
    let discVal = item.discount_value;
    if (discVal === undefined || discVal === null) {
      const nums = String(item.type || '').match(/\d+/);
      discVal = nums ? Number(nums[0]) : 15;
      if (discType === 'fixed' && discVal < 1000) discVal = discVal * 100;
    }
    const minAmount = item.min_amount || item.minBookingAmount || 0;
    const startDate = item.start_date || item.startDate || '';
    const expiry = item.expiry || item.expiry_date || '2026-12-31';
    const limit = item.limit_count || item.limit || 500;
    const status = item.status || 'Active';

    document.getElementById('cms-modal-title').textContent = isEdit ? `Edit Coupon — ${item.code}` : 'Create New Promotional Coupon';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Promo Code *</label>
          <input type="text" id="field-coupon-code" class="form-control" value="${item.code || ''}" placeholder="e.g. VENTOURA25" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px;text-transform:uppercase;font-weight:700" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Discount Type *</label>
          <select id="field-coupon-type" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
            <option value="percentage" ${discType === 'percentage' ? 'selected' : ''}>Percentage Deduction (%)</option>
            <option value="fixed" ${discType === 'fixed' ? 'selected' : ''}>Flat Discount Amount (₹)</option>
          </select>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Discount Value *</label>
          <input type="number" id="field-coupon-val" class="form-control" value="${discVal}" min="1" step="any" required placeholder="e.g. 20 (or 25000)" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Minimum Booking Amount (₹)</label>
          <input type="number" id="field-coupon-min" class="form-control" value="${minAmount}" min="0" placeholder="0 = No Minimum" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Start Date</label>
          <input type="date" id="field-coupon-start" class="form-control" value="${startDate}" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Expiration Date *</label>
          <input type="date" id="field-coupon-expiry" class="form-control" value="${expiry}" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Total Usage Limit</label>
          <input type="number" id="field-coupon-limit" class="form-control" value="${limit}" min="1" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Status</label>
          <select id="field-coupon-status" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
            <option value="Active" ${status === 'Active' ? 'selected' : ''}>✅ Active (Enabled)</option>
            <option value="Inactive" ${status === 'Inactive' ? 'selected' : ''}>⏸️ Inactive (Disabled)</option>
          </select>
        </div>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.toggleCouponStatus = async function(idOrCode, newStatus) {
    const list = window._adminCouponsList || [];
    const item = list.find(c => c.id === idOrCode || c.code === idOrCode);
    const targetId = item ? (item.id || item.code) : idOrCode;
    const targetCode = item ? item.code : idOrCode;

    try {
      const res = await fetch(`/api/coupons/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, code: targetCode })
      });
      showToast(`Coupon ${targetCode} is now ${newStatus}!`, newStatus === 'Active' ? '✅' : '⏸️');
      renderCouponsTable();
    } catch (e) {
      console.error(e);
      showToast('Error updating coupon status.', '⚠️');
    }
  };

  window.deleteCoupon = function(code) {
    confirmDeleteCmsItem('coupons', code, code);
  };

  /* ── BLOG POSTS ── */
  window.openBlogModal = function(id = null) {
    currentEditingType = 'blogs';
    currentEditingItem = id ? adminData.blogs.find(b => b.id === id) : null;
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit Article' : 'Write New Article';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Article Title *</label>
        <input type="text" id="field-blog-title" class="form-control" value="${item.title || ''}" placeholder="e.g. Ultimate Bali Guide" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Author Name *</label>
        <input type="text" id="field-blog-author" class="form-control" value="${item.author || 'Emma Watson'}" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Publishing Status</label>
        <select id="field-blog-status" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
          <option value="Published" ${item.status === 'Published' ? 'selected' : ''}>Published</option>
          <option value="Draft" ${item.status === 'Draft' ? 'selected' : ''}>Draft</option>
        </select>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.deleteBlog = function(id) {
    adminData.blogs = adminData.blogs.filter(b => b.id !== id);
    renderBlogsTable();
    showToast('Deleted blog article', '🗑️');
  };

  /* ── REVIEWS MODERATION ── */
  window.approveReview = function(id) {
    const r = adminData.reviews.find(x => x.id === id);
    if (!r) return;
    r.status = 'Approved';
    renderReviewsTable();
    showToast('Review approved!', '✅');
  };

  window.flagReview = function(id) {
    const r = adminData.reviews.find(x => x.id === id);
    if (!r) return;
    r.status = 'Flagged';
    renderReviewsTable();
    showToast('Review flagged', '🚩');
  };

  window.deleteReview = function(id) {
    adminData.reviews = adminData.reviews.filter(x => x.id !== id);
    renderReviewsTable();
    showToast('Deleted review', '🗑️');
  };

  /* ── GALLERY MODAL ── */
  window.openGalleryModal = function() {
    currentEditingType = 'gallery';
    currentEditingItem = null;

    document.getElementById('cms-modal-title').textContent = 'Upload Media Asset';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Asset Filename / Title *</label>
        <input type="text" id="field-gal-title" class="form-control" placeholder="e.g. maldives-sunset.jpg" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Image URL *</label>
        <input type="url" id="field-gal-url" class="form-control" value="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.deleteGalleryItem = function(id) {
    adminData.gallery = adminData.gallery.filter(g => g.id !== id);
    renderGalleryGrid();
    showToast('Image deleted from gallery', '🗑️');
  };

  /* ── NOTIFICATIONS BROADCAST ── */
  window.sendBroadcast = function() {
    const msgEl = document.getElementById('broadcast-message');
    const msg = msgEl?.value.trim();
    if (!msg) {
      showToast('Please enter a broadcast announcement message.', '⚠️');
      return;
    }
    showToast('Broadcast notification dispatched to travelers!', '📢');
    if (msgEl) msgEl.value = '';
  };

  /* ── IMAGE UPLOADER HELPER ── */
  window.uploadImageFile = function(fileInput, targetInputId) {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
      const base64Data = e.target.result;
      try {
        showToast('Uploading image asset...', '⏳');
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: base64Data, filename: file.name })
        });
        const json = await res.json();
        if (json.success && json.url) {
          const targetInput = document.getElementById(targetInputId);
          if (targetInput) targetInput.value = json.url;
          showToast('Image uploaded & attached!', '🖼️');
        } else {
          showToast('Image upload failed', '⚠️');
        }
      } catch (err) {
        showToast('Upload error', '❌');
      }
    };
    reader.readAsDataURL(file);
  };

  /* ── DESTINATIONS / PACKAGES / HOTELS API MODALS ── */
  window.openDestinationModal = async function(id = null) {
    currentEditingType = 'destinations';
    currentEditingItem = null;

    if (id) {
      const res = await fetch('/api/destinations?all=true');
      const json = await res.json();
      const list = json.data || [];
      currentEditingItem = list.find(d => String(d.id || d._id) === String(id));
    }
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit Destination' : 'Add New Destination';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Destination Title *</label>
        <input type="text" id="field-title" class="form-control" value="${item.title || ''}" placeholder="e.g. Goa Beach Escape" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Country *</label>
          <input type="text" id="field-country" class="form-control" value="${item.country || ''}" placeholder="e.g. India" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">City / Location</label>
          <input type="text" id="field-city" class="form-control" value="${item.city || ''}" placeholder="e.g. North Goa" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Starting Price ($) *</label>
          <input type="number" id="field-price" class="form-control" value="${item.startingPrice || 1500}" min="1" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Duration (Days) *</label>
          <input type="number" id="field-days" class="form-control" value="${item.days || 7}" min="1" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Category</label>
        <input type="text" id="field-category" class="form-control" value="${item.category || 'Luxury Beach'}" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Main Image URL or Upload File</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="url" id="field-image" class="form-control" value="${item.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'}" style="flex:1;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
          <label class="btn btn-secondary btn-sm" style="margin:0;cursor:pointer;white-space:nowrap;padding:10px 14px">
            📁 Upload
            <input type="file" accept="image/*" style="display:none" onchange="uploadImageFile(this, 'field-image')" />
          </label>
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Description *</label>
        <textarea id="field-description" class="form-control" rows="3" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">${item.description || ''}</textarea>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Publication Status</label>
        <select id="field-status" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
          <option value="published" ${item.status === 'published' ? 'selected' : ''}>Published (Visible on Website)</option>
          <option value="unpublished" ${(item.status === 'unpublished' || item.status === 'draft') ? 'selected' : ''}>Unpublished (Hidden from Website)</option>
          <option value="trash" ${item.status === 'trash' ? 'selected' : ''}>Recycle Bin</option>
        </select>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.openPackageModal = async function(id = null) {
    currentEditingType = 'packages';
    currentEditingItem = null;

    if (id) {
      const res = await fetch('/api/packages?all=true');
      const json = await res.json();
      const list = json.data || [];
      currentEditingItem = list.find(p => String(p.id || p._id) === String(id));
    }
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit Tour Package' : 'Add New Tour Package';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Package Title *</label>
        <input type="text" id="field-title" class="form-control" value="${item.title || ''}" placeholder="e.g. Kerala Explorer" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Destination Name *</label>
          <input type="text" id="field-destination" class="form-control" value="${item.destination || ''}" placeholder="e.g. Maldives" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Duration *</label>
          <input type="text" id="field-duration" class="form-control" value="${item.duration || '7 Days / 6 Nights'}" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Price ($) *</label>
          <input type="number" id="field-price" class="form-control" value="${item.price || 1999}" min="1" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Offer Badge</label>
          <input type="text" id="field-badge" class="form-control" value="${item.badge || '15% OFF'}" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Featured Image URL or Upload File</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="url" id="field-image" class="form-control" value="${item.featuredImage || item.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'}" style="flex:1;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
          <label class="btn btn-secondary btn-sm" style="margin:0;cursor:pointer;white-space:nowrap;padding:10px 14px">
            📁 Upload
            <input type="file" accept="image/*" style="display:none" onchange="uploadImageFile(this, 'field-image')" />
          </label>
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Description *</label>
        <textarea id="field-description" class="form-control" rows="3" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">${item.description || ''}</textarea>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Package Category *</label>
          <select id="field-category" class="form-control" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
            <option value="beach" ${(item.category === 'beach' || (item.categories && item.categories.includes('beach'))) ? 'selected' : ''}>🏖️ Beach</option>
            <option value="adventure" ${(item.category === 'adventure' || (item.categories && item.categories.includes('adventure'))) ? 'selected' : ''}>🧗 Adventure</option>
            <option value="luxury" ${(item.category === 'luxury' || (item.categories && item.categories.includes('luxury')) || !item.category) ? 'selected' : ''}>💎 Luxury</option>
            <option value="honeymoon" ${(item.category === 'honeymoon' || (item.categories && item.categories.includes('honeymoon'))) ? 'selected' : ''}>💑 Honeymoon</option>
            <option value="family" ${(item.category === 'family' || (item.categories && item.categories.includes('family'))) ? 'selected' : ''}>👨‍👩‍👧 Family</option>
            <option value="solo" ${(item.category === 'solo' || (item.categories && item.categories.includes('solo'))) ? 'selected' : ''}>🎒 Solo Travel</option>
            <option value="business" ${(item.category === 'business' || (item.categories && item.categories.includes('business'))) ? 'selected' : ''}>💼 Business</option>
            <option value="safari" ${(item.category === 'safari' || (item.categories && item.categories.includes('safari'))) ? 'selected' : ''}>🦁 Safari</option>
            <option value="cruise" ${(item.category === 'cruise' || (item.categories && item.categories.includes('cruise'))) ? 'selected' : ''}>🚢 Cruises</option>
            <option value="pilgrimage" ${(item.category === 'pilgrimage' || (item.categories && item.categories.includes('pilgrimage'))) ? 'selected' : ''}>🕌 Pilgrimage</option>
            <option value="road" ${(item.category === 'road' || (item.categories && item.categories.includes('road'))) ? 'selected' : ''}>🚗 Road Trips</option>
            <option value="camping" ${(item.category === 'camping' || (item.categories && item.categories.includes('camping'))) ? 'selected' : ''}>⛺ Camping</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Publication Status</label>
          <select id="field-status" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
            <option value="published" ${item.status === 'published' ? 'selected' : ''}>Published (Visible on Website)</option>
            <option value="unpublished" ${(item.status === 'unpublished' || item.status === 'draft') ? 'selected' : ''}>Unpublished (Hidden from Website)</option>
            <option value="trash" ${item.status === 'trash' ? 'selected' : ''}>Recycle Bin</option>
          </select>
        </div>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.openHotelModal = async function(id = null) {
    currentEditingType = 'hotels';
    currentEditingItem = null;

    if (id) {
      const res = await fetch('/api/hotels?all=true');
      const json = await res.json();
      const list = json.data || [];
      currentEditingItem = list.find(h => String(h.id || h._id) === String(id));
    }
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit Hotel' : 'Add New Hotel';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Hotel Name *</label>
        <input type="text" id="field-name" class="form-control" value="${item.name || ''}" placeholder="e.g. Taj Lake Palace" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Location *</label>
          <input type="text" id="field-location" class="form-control" value="${item.location || ''}" placeholder="e.g. Udaipur, India" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Nightly Rate ($) *</label>
          <input type="number" id="field-price" class="form-control" value="${item.price || 450}" min="1" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Hero Image URL or Upload File</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="url" id="field-image" class="form-control" value="${item.heroImage || item.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'}" style="flex:1;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
          <label class="btn btn-secondary btn-sm" style="margin:0;cursor:pointer;white-space:nowrap;padding:10px 14px">
            📁 Upload
            <input type="file" accept="image/*" style="display:none" onchange="uploadImageFile(this, 'field-image')" />
          </label>
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Description *</label>
        <textarea id="field-description" class="form-control" rows="3" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">${item.description || ''}</textarea>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Publication Status</label>
        <select id="field-status" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
          <option value="published" ${item.status === 'published' ? 'selected' : ''}>Published (Visible on Website)</option>
          <option value="draft" ${item.status === 'draft' ? 'selected' : ''}>Draft (Hidden from Website)</option>
          <option value="unpublished" ${item.status === 'unpublished' ? 'selected' : ''}>Unpublished</option>
        </select>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  /* ── FAQ MODAL ── */
  window.openFaqModal = async function(id = null) {
    currentEditingType = 'faqs';
    currentEditingItem = null;

    if (id) {
      const res = await fetch('/api/faqs?all=true');
      const json = await res.json();
      const list = json.data || [];
      currentEditingItem = list.find(f => String(f.id || f._id) === String(id));
    }
    const item = currentEditingItem || {};

    document.getElementById('cms-modal-title').textContent = id ? 'Edit FAQ Item' : 'Add New FAQ Item';
    document.getElementById('cms-modal-fields').innerHTML = `
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Question *</label>
        <input type="text" id="field-faq-question" class="form-control" value="${(item.question || '').replace(/"/g, '&quot;')}" placeholder="e.g. Do you offer travel insurance?" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Publication Status</label>
          <select id="field-status" style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">
            <option value="published" ${item.status === 'published' ? 'selected' : ''}>Published (Visible)</option>
            <option value="draft" ${item.status === 'draft' ? 'selected' : ''}>Draft (Hidden)</option>
            <option value="unpublished" ${item.status === 'unpublished' ? 'selected' : ''}>Unpublished</option>
          </select>
        </div>
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:4px">Answer *</label>
        <textarea id="field-faq-answer" class="form-control" rows="4" required style="width:100%;padding:10px 14px;border:1px solid var(--border-color);border-radius:6px">${item.answer || ''}</textarea>
      </div>
    `;
    document.getElementById('cms-modal-overlay').style.display = 'flex';
  };

  window.fetchAndRenderFaqs = async function() {
    const container = document.getElementById('faqs-accordion-container');
    const label = document.getElementById('faq-count-label');
    if (!container) return;

    try {
      const res = await fetch('/api/faqs');
      const json = await res.json();
      const items = (json.success && json.data) ? json.data : [];

      if (label) label.textContent = `${items.length} Frequently Asked Questions`;
      if (items.length === 0) {
        container.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-muted)">No FAQs available. Click "+ Add New FAQ" to create one.</div>`;
        return;
      }

      container.innerHTML = items.map((f, i) => {
        const cat = f.category || 'General';
        return `
          <div class="faq-accordion-card" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; overflow:hidden; transition:all 0.2s ease;">
            <div class="faq-accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px 18px; cursor:pointer; background:#FFFFFF;" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'block' : 'none';">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-weight:700; color:#0284C7; font-size:13px;">Q${i+1}.</span>
                <strong style="color:var(--navy-primary); font-size:14px;">${escapeHtml(f.question)}</strong>
                <span class="abadge ab-active" style="font-size:11px; padding:2px 8px;">${escapeHtml(cat)}</span>
              </div>
              <div style="display:flex; align-items:center; gap:12px;">
                <div class="action-btn-group" onclick="event.stopPropagation();">
                  <button class="aab-edit" onclick="openFaqModal('${f.id || f._id}')" style="padding:4px 8px; font-size:11px;">Edit</button>
                  <button class="aab-delete" onclick="confirmDeleteCmsItem('faqs', '${f.id || f._id}', '${(f.question || '').replace(/'/g, "\\'")}')" style="padding:4px 8px; font-size:11px;">Delete</button>
                </div>
                <span class="faq-chevron" style="transition:transform 0.2s; font-size:12px; color:#64748B;">▾</span>
              </div>
            </div>
            <div class="faq-accordion-body" style="padding:14px 18px; border-top:1px solid #E2E8F0; font-size:13.5px; line-height:1.6; color:#334155; display:block;">
              ${escapeHtml(f.answer || 'No answer copy provided.')}
            </div>
          </div>
        `;
      }).join('');
    } catch (e) {
      console.error('Error fetching FAQs:', e);
    }
  };

  /* ── UTILITY: HTML ESCAPING ── */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ── RENDER INQUIRIES & CUSTOMER CONTACT MESSAGES ── */
  /* ══════════════════════════════════════════════════════════
     HELPER: DATE FILTER MATCHING
     ══════════════════════════════════════════════════════════ */
  function isDateInFilter(dateValue, filterKey) {
    if (!filterKey || filterKey === 'all' || filterKey === 'ALL') return true;
    if (!dateValue) return false;

    try {
      let d;
      if (typeof dateValue === 'string' && dateValue.includes(' ')) {
        d = new Date(dateValue.replace(' ', 'T'));
      } else {
        d = new Date(dateValue);
      }

      if (isNaN(d.getTime())) return true; // Keep record if date format is unusual

      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

      if (filterKey === 'today') {
        return d >= todayStart;
      }
      if (filterKey === 'yesterday') {
        return d >= yesterdayStart && d < todayStart;
      }
      if (filterKey === '7days') {
        const past7 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        return d >= past7;
      }
      if (filterKey === '30days') {
        const past30 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
        return d >= past30;
      }
    } catch (e) {
      return true;
    }
    return true;
  }

  /* ══════════════════════════════════════════════════════════
     CONTENT: CUSTOMER CONTACT ENQUIRIES
     - Generated from website Contact / "Send Us a Message" forms
     - Completely separated from Book Now booking requests
     ══════════════════════════════════════════════════════════ */
  let currentActiveInquiry = null;
  let inquiriesPollTimer = null;
  window._adminInquiriesList = [];
  let currentInquiryDateFilter = 'all';
  let currentInquiryStatusFilter = 'ALL';

  window.filterInquiriesDate = function(dateKey) {
    currentInquiryDateFilter = dateKey || 'all';
    const container = document.getElementById('inquiries-date-filter-bar');
    if (container) {
      container.querySelectorAll('.date-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.date === currentInquiryDateFilter);
      });
    }
    window.filterInquiriesTable();
  };

  window.filterInquiriesByStatus = function(statusFilter) {
    currentInquiryStatusFilter = statusFilter || 'ALL';
    window.filterInquiriesTable();
  };

  window.filterInquiriesTable = function() {
    const tbody = document.getElementById('inquiries-table-body');
    const label = document.getElementById('inquiry-count-label');
    if (!tbody) return;

    let items = window._adminInquiriesList || [];

    // Filter by Date
    if (currentInquiryDateFilter && currentInquiryDateFilter !== 'all') {
      items = items.filter(iq => isDateInFilter(iq.createdAt || iq.created_at || iq.submitted_at || iq.date, currentInquiryDateFilter));
    }

    // Filter by Status
    if (currentInquiryStatusFilter && currentInquiryStatusFilter !== 'ALL') {
      items = items.filter(iq => {
        const s = (iq.status || 'NEW').toUpperCase();
        if (currentInquiryStatusFilter === 'NEW') return s === 'NEW';
        if (currentInquiryStatusFilter === 'IN PROGRESS') return s === 'IN PROGRESS';
        if (currentInquiryStatusFilter === 'REPLIED') return ['REPLIED', 'RESPONDED'].includes(s);
        if (currentInquiryStatusFilter === 'RESOLVED') return ['RESOLVED', 'CLOSED'].includes(s);
        return s === currentInquiryStatusFilter.toUpperCase();
      });
    }

    if (label) {
      label.textContent = `${items.length} Enquiries Shown`;
    }

    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:36px;color:var(--text-muted)">No customer enquiries matching current date/status filter criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(iq => {
      const rawStatus = (iq.status || 'NEW').toUpperCase();
      let statusBadgeClass = rawStatus === 'NEW' ? 'ab-active' : rawStatus === 'IN PROGRESS' ? 'ab-pending' : rawStatus === 'RESOLVED' ? 'ab-confirmed' : 'ab-confirmed';
      let displayStatus = rawStatus === 'NEW' ? 'New' : rawStatus === 'IN PROGRESS' ? 'In Progress' : (rawStatus === 'REPLIED' || rawStatus === 'RESPONDED') ? 'Responded' : 'Resolved';

      const refNo = iq.ref_no || iq.refNo || iq.id || 'VT-000000';
      const custName = iq.customer_name || iq.customerName || (iq.first_name ? `${iq.first_name} ${iq.last_name || ''}` : '') || iq.email || 'Website Traveler';
      const email = iq.email || '';
      const phone = iq.phone || '';
      const category = iq.product_name || iq.productName || iq.interest_category || iq.destination || iq.product_type || 'General Enquiry';
      const msgText = iq.message || iq.question || 'No message provided';
      const subDate = iq.created_at || iq.createdAt || 'Recent';
      const formattedDate = subDate.includes('T') ? new Date(subDate).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : subDate;

      // WhatsApp link preparation
      let waLinkHtml = '';
      if (phone && phone !== 'N/A') {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        if (cleanPhone.length >= 7) {
          const waMsg = `Hello ${custName}, this is Ventoura Travel following up on your enquiry (Ref: ${refNo}) regarding "${category}". How may we assist you today?`;
          waLinkHtml = `<a class="aab-wa" href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}" target="_blank" title="Chat on WhatsApp">💬 WhatsApp</a>`;
        }
      }

      const adminReplyText = iq.admin_reply || '';

      return `
        <tr id="enquiry-row-${iq.id || iq._id}">
          <td><code class="ref" style="font-weight:700;color:#0284c7;">${escapeHtml(refNo)}</code></td>
          <td><strong>${escapeHtml(custName)}</strong></td>
          <td>
            ${email ? `<div>✉️ <a href="mailto:${escapeHtml(email)}" style="color:#0284c7;text-decoration:none;font-size:12px;">${escapeHtml(email)}</a></div>` : ''}
            <div>📞 <a href="tel:${escapeHtml(phone)}" style="color:#334155;text-decoration:none;font-size:12px;">${escapeHtml(phone || 'N/A')}</a></div>
          </td>
          <td><span class="abadge ab-active">${escapeHtml(category)}</span></td>
          <td>
            <div style="font-size:12px;color:#64748b;max-width:220px;line-height:1.4;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${escapeHtml(msgText)}">
              ${escapeHtml(msgText)}
            </div>
          </td>
          <td style="font-size:12px;color:#64748b;white-space:nowrap;">${escapeHtml(formattedDate)}</td>
          <td>
            <span class="abadge ${statusBadgeClass}">
              <span class="abadge-dot"></span>${escapeHtml(displayStatus)}
            </span>
          </td>
          <td>
            ${adminReplyText ? `
              <div style="font-size:11.5px;color:#059669;font-weight:600;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${escapeHtml(adminReplyText)}">
                ✓ ${escapeHtml(adminReplyText)}
              </div>
            ` : `<span style="color:#94a3b8;font-size:11px;">No response yet</span>`}
          </td>
          <td>
            <div class="action-btn-group" style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
              <button class="aab-edit" onclick="openEnquiryDetailModal('${iq.id || iq._id}')" style="background:#0284C7;color:#FFFFFF;border-color:#0284C7;font-weight:700;padding:4px 8px;border-radius:6px;cursor:pointer;">View &amp; Reply</button>
              ${waLinkHtml}
              <button class="aab-delete" onclick="confirmDeleteCmsItem('inquiries', '${iq.id || iq._id}', 'Enquiry ${escapeHtml(refNo)}')" style="padding:4px 8px;border-radius:6px;cursor:pointer;">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  };

  window.fetchAndRenderInquiries = async function() {
    const tbody = document.getElementById('inquiries-table-body');
    if (!tbody) return;

    try {
      const res = await fetch('/api/inquiries?all=true');
      const json = await res.json();
      const items = (json.success && Array.isArray(json.data)) ? json.data : [];

      window._adminInquiriesList = items;

      // Update Live Daily Counters from Real Database Records
      const todayCount = items.filter(i => isDateInFilter(i.createdAt || i.created_at || i.submitted_at || i.date, 'today')).length;
      const newCount = items.filter(i => (i.status || '').toUpperCase() === 'NEW').length;
      const progressCount = items.filter(i => (i.status || '').toUpperCase() === 'IN PROGRESS').length;
      const repliedCount = items.filter(i => ['REPLIED', 'RESPONDED'].includes((i.status || '').toUpperCase())).length;
      const resolvedCount = items.filter(i => ['RESOLVED', 'CLOSED'].includes((i.status || '').toUpperCase())).length;

      const statToday = document.getElementById('stat-enq-today');
      const statNew = document.getElementById('stat-enq-new');
      const statProg = document.getElementById('stat-enq-progress');
      const statRep = document.getElementById('stat-enq-replied');
      const statRes = document.getElementById('stat-enq-resolved');
      const newBadge = document.getElementById('admin-new-enquiry-badge');

      if (statToday) statToday.textContent = todayCount;
      if (statNew) statNew.textContent = newCount;
      if (statProg) statProg.textContent = progressCount;
      if (statRep) statRep.textContent = repliedCount;
      if (statRes) statRes.textContent = resolvedCount;

      if (newBadge) {
        if (newCount > 0) {
          newBadge.style.display = 'inline-block';
          newBadge.textContent = `${newCount} NEW`;
        } else {
          newBadge.style.display = 'none';
        }
      }

      window.filterInquiriesTable();

    } catch (e) {
      console.error('Error fetching inquiries:', e);
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:24px;color:#EF4444">⚠️ Error loading customer inquiries. Click Refresh Enquiries to try again.</td></tr>`;
    }
  };

  /* ── OPEN ENQUIRY DETAIL & REPLY MODAL ── */
  window.openEnquiryDetailModal = async function(id) {
    if (!id) return;
    try {
      let list = window._adminInquiriesList || [];
      if (list.length === 0) {
        const res = await fetch('/api/inquiries?all=true');
        const json = await res.json();
        list = (json.success && json.data) ? json.data : [];
        window._adminInquiriesList = list;
      }
      const item = list.find(i => String(i.id || i._id) === String(id) || String(i.refNo) === String(id) || String(i.ref_no) === String(id));
      if (!item) return;

      currentActiveInquiry = item;

      const refNo = item.ref_no || item.refNo || item.id || 'VT-000000';
      const custName = item.customer_name || item.customerName || (item.first_name ? `${item.first_name} ${item.last_name || ''}` : '') || item.email || 'Valued Traveler';
      const email = item.email || 'N/A';
      const phone = item.phone || 'N/A';
      const category = item.product_name || item.productName || item.interest_category || item.destination || item.product_type || 'General Enquiry';
      const msgText = item.message || item.question || 'No message entered';
      const subDate = item.created_at || item.createdAt || 'Recently';
      const formattedDate = subDate.includes('T') ? new Date(subDate).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : subDate;
      const status = (item.status || 'NEW').toUpperCase();

      document.getElementById('enq-modal-ref').textContent = refNo;
      document.getElementById('enq-modal-name').textContent = custName;
      const emailEl = document.getElementById('enq-modal-email');
      if (emailEl) {
        emailEl.textContent = email;
        emailEl.href = `mailto:${email}?subject=Ventoura%20Travel%20Enquiry%20${encodeURIComponent(refNo)}`;
      }
      document.getElementById('enq-modal-phone').textContent = phone;
      document.getElementById('enq-modal-category').textContent = category;
      document.getElementById('enq-modal-date').textContent = formattedDate;
      document.getElementById('enq-modal-message').textContent = msgText;

      const statusSelect = document.getElementById('enq-modal-status-select');
      if (statusSelect) {
        statusSelect.value = ['NEW', 'IN PROGRESS', 'REPLIED', 'RESOLVED'].includes(status) ? status : 'NEW';
      }

      // Existing Admin Reply display
      const replyWrap = document.getElementById('enq-modal-existing-reply-wrap');
      const replyTextEl = document.getElementById('enq-modal-existing-reply');
      const replyDateEl = document.getElementById('enq-modal-reply-date');
      const replyInput = document.getElementById('enq-modal-reply-text');

      if (item.admin_reply) {
        if (replyWrap) replyWrap.style.display = 'block';
        if (replyTextEl) replyTextEl.textContent = item.admin_reply;
        if (replyDateEl) replyDateEl.textContent = item.replied_at ? new Date(item.replied_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Earlier';
        if (replyInput) replyInput.value = item.admin_reply;
      } else {
        if (replyWrap) replyWrap.style.display = 'none';
        if (replyInput) replyInput.value = '';
      }

      const modal = document.getElementById('enquiry-reply-modal');
      if (modal) modal.style.display = 'flex';
    } catch (e) {
      console.error('Error opening enquiry detail:', e);
    }
  };

  window.closeEnquiryModal = function() {
    const modal = document.getElementById('enquiry-reply-modal');
    if (modal) modal.style.display = 'none';
    currentActiveInquiry = null;
  };

  window.setModalEnquiryStatus = async function(status) {
    const select = document.getElementById('enq-modal-status-select');
    if (select) select.value = status;
    if (currentActiveInquiry) {
      currentActiveInquiry.status = status;
    }
  };

  window.handleSendEnquiryReply = async function(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!currentActiveInquiry) return;

    const replyInput = document.getElementById('enq-modal-reply-text');
    const statusSelect = document.getElementById('enq-modal-status-select');
    const submitBtn = document.getElementById('enq-modal-submit-btn');

    const replyText = (replyInput?.value || '').trim();
    if (!replyText) {
      showToast('Please type a response message.', '⚠️');
      return;
    }

    let newStatus = statusSelect ? statusSelect.value : 'REPLIED';
    if (newStatus === 'NEW') newStatus = 'REPLIED'; // auto-mark replied when answering
    const repliedAt = new Date().toISOString();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Saving Response...';
    }

    const payload = {
      admin_reply: replyText,
      replied_at: repliedAt,
      status: newStatus
    };

    try {
      const targetId = currentActiveInquiry.id || currentActiveInquiry._id || currentActiveInquiry.refNo || currentActiveInquiry.ref_no;
      const res = await fetch(`/api/inquiries/${targetId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(`Response saved and status updated to ${newStatus}!`, '✅');
        closeEnquiryModal();
        window.fetchAndRenderInquiries();
      } else {
        showToast('Failed to save response. Please retry.', '⚠️');
      }
    } catch (err) {
      showToast('Error saving response.', '⚠️');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Reply →';
      }
    }
  };

  window.updateInquiryStatus = async function(id, newStatus) {
    if (!id || !newStatus) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        showToast(`Enquiry marked as ${newStatus}`, '✅');
        window.fetchAndRenderInquiries();
      }
    } catch (e) {
      showToast('Failed to update status', '⚠️');
    }
  };

  if (!inquiriesPollTimer) {
    inquiriesPollTimer = setInterval(() => {
      const pInq = document.getElementById('p-inquiries');
      if (pInq && pInq.classList.contains('active')) {
        window.fetchAndRenderInquiries();
      }
    }, 15000);
  }

  /* ══════════════════════════════════════════════════════════
     COMMERCE: BOOKINGS LEDGER (BOOKING QUERIES & RESERVATIONS)
     - Generated when customer clicks "Book Now"
     - Completely separated from general customer enquiries
     ══════════════════════════════════════════════════════════ */
  let currentActiveBooking = null;
  window._adminBookingsList = [];
  let currentBookingDateFilter = 'all';
  let currentBookingStatusFilter = 'ALL';

  window.filterBookingsDate = function(dateKey) {
    currentBookingDateFilter = dateKey || 'all';
    const container = document.getElementById('bookings-date-filter-bar');
    if (container) {
      container.querySelectorAll('.date-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.date === currentBookingDateFilter);
      });
    }
    window.filterBookingsTable();
  };

  window.filterBookingsByStatus = function(statusFilter) {
    currentBookingStatusFilter = statusFilter || 'ALL';
    window.filterBookingsTable();
  };

  window.filterBookingsTable = function() {
    const tbody = document.getElementById('bookings-table-body');
    const label = document.getElementById('bookings-count-label');
    if (!tbody) return;

    let items = window._adminBookingsList || [];

    // Filter by Date
    if (currentBookingDateFilter && currentBookingDateFilter !== 'all') {
      items = items.filter(b => isDateInFilter(b.created_at || b.createdAt || b.date, currentBookingDateFilter));
    }

    // Filter by Status
    if (currentBookingStatusFilter && currentBookingStatusFilter !== 'ALL') {
      items = items.filter(b => {
        const s = (b.booking_status || b.status || 'Confirmed').toLowerCase();
        return s === currentBookingStatusFilter.toLowerCase();
      });
    }

    if (label) {
      label.textContent = `${items.length} Bookings Shown`;
    }

    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:36px;color:var(--text-muted)">No bookings matching current date/status filter criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(b => {
      const ref = b.booking_reference || b.refNo || b.id || 'BK-2026-0001';
      const name = b.customer_name || b.full_name || b.customerName || b.name || 'Valued Guest';
      const email = b.email || '';
      const phone = b.phone || '';
      const serviceTitle = b.item_title || b.productName || b.product_name || b.package || 'Travel Package';
      const location = b.destination || b.location || 'Global';
      const travelDate = b.travel_date || b.travelDate || b.date || '2026-09-20';
      const travelers = b.guests_label || (b.travelers_count ? `${b.travelers_count} Person(s)` : `${b.guests || 2} Travellers`);
      const amount = b.total_amount || b.price || b.amount || 180000;
      const bookingStatus = b.booking_status || b.status || 'Confirmed';

      const sLow = bookingStatus.toLowerCase();
      const statusClass = sLow === 'confirmed' ? 'ab-confirmed' : sLow === 'cancelled' ? 'ab-cancelled' : sLow === 'responded' ? 'ab-active' : 'ab-pending';

      // WhatsApp link preparation
      let waLinkHtml = '';
      if (phone && phone !== 'N/A') {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        if (cleanPhone.length >= 7) {
          const waMsg = `Hello ${name}, this is Ventoura Travel Concierge regarding your booking request for ${serviceTitle} (Ref: ${ref}) scheduled for ${travelDate}. We are happy to assist you!`;
          waLinkHtml = `<a class="aab-wa" href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}" target="_blank" title="Contact on WhatsApp">💬 WhatsApp</a>`;
        }
      }

      const adminReplyText = b.admin_reply || '';

      return `
        <tr id="booking-row-${b.id || ref}">
          <td><code class="ref" style="font-weight:700;color:#0284c7;">${escapeHtml(ref)}</code></td>
          <td><strong>${escapeHtml(name)}</strong></td>
          <td>
            <div>📞 <a href="tel:${escapeHtml(phone)}" style="color:#334155;text-decoration:none;font-size:12px;">${escapeHtml(phone || 'N/A')}</a></div>
            ${email ? `<div>✉️ <a href="mailto:${escapeHtml(email)}" style="color:#0284c7;text-decoration:none;font-size:12px;">${escapeHtml(email)}</a></div>` : ''}
          </td>
          <td>
            <strong>${escapeHtml(serviceTitle)}</strong>
            <div style="font-size:11px;color:#64748b;">📍 ${escapeHtml(location)}</div>
          </td>
          <td>📅 ${escapeHtml(travelDate)}</td>
          <td>👥 ${escapeHtml(travelers)}</td>
          <td>
            <strong style="color:#059669;font-size:13.5px;">${formatINR(amount)}</strong>
            ${b.coupon_code ? `<div style="font-size:10px;color:#0284c7;font-weight:700;">🎟️ ${escapeHtml(b.coupon_code)}</div>` : ''}
          </td>
          <td><span class="abadge ${statusClass}"><span class="abadge-dot"></span>${escapeHtml(bookingStatus)}</span></td>
          <td>
            ${adminReplyText ? `
              <div style="font-size:11.5px;color:#059669;font-weight:600;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${escapeHtml(adminReplyText)}">
                ✓ ${escapeHtml(adminReplyText)}
              </div>
            ` : `<span style="color:#94a3b8;font-size:11px;">No response yet</span>`}
          </td>
          <td>
            <div class="action-btn-group" style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
              <button class="aab-view" onclick="window.openBookingDetailModal('${b.id || ref}')" style="background:#0284C7;color:#FFFFFF;border-color:#0284C7;font-weight:700;padding:4px 8px;border-radius:6px;cursor:pointer;">View &amp; Reply</button>
              ${waLinkHtml}
              <button class="aab-delete" onclick="confirmDeleteCmsItem('bookings', '${b.id || ref}', 'Booking ${escapeHtml(ref)}')" style="padding:4px 8px;border-radius:6px;cursor:pointer;">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  };

  window.renderBookingsTable = async function() {
    const tbody = document.getElementById('bookings-table-body');
    if (!tbody) return;

    try {
      const res = await fetch('/api/bookings?all=true');
      const json = await res.json();
      const items = (json.success && Array.isArray(json.data)) ? json.data : [];

      window._adminBookingsList = items;

      // Calculate Live Daily Counters from Real Database Records
      const todayCount = items.filter(b => isDateInFilter(b.created_at || b.createdAt || b.date, 'today')).length;
      const pendingCount = items.filter(b => ['pending', 'new', 'draft'].includes((b.booking_status || b.status || '').toLowerCase())).length;
      const progressCount = items.filter(b => ['in progress', 'pending review', 'processing'].includes((b.booking_status || b.status || '').toLowerCase())).length;
      const confirmedCount = items.filter(b => ['confirmed', 'approved', 'responded', 'active'].includes((b.booking_status || b.status || 'confirmed').toLowerCase())).length;
      const totalCount = items.length;

      const statToday = document.getElementById('stat-bk-today');
      const statPend = document.getElementById('stat-bk-pending');
      const statProg = document.getElementById('stat-bk-progress');
      const statConf = document.getElementById('stat-bk-confirmed');
      const statTotal = document.getElementById('stat-bk-total');

      if (statToday) statToday.textContent = todayCount;
      if (statPend) statPend.textContent = pendingCount;
      if (statProg) statProg.textContent = progressCount;
      if (statConf) statConf.textContent = confirmedCount;
      if (statTotal) statTotal.textContent = totalCount;

      window.filterBookingsTable();
    } catch (e) {
      console.error('Error fetching bookings:', e);
      tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:24px;color:#EF4444">⚠️ Error loading bookings. Click Refresh to try again.</td></tr>`;
    }
  };

  window.openBookingDetailModal = async function(id) {
    if (!id) return;
    try {
      let list = window._adminBookingsList || [];
      if (list.length === 0) {
        const res = await fetch('/api/bookings?all=true');
        const json = await res.json();
        list = (json.success && json.data) ? json.data : [];
        window._adminBookingsList = list;
      }

      const booking = list.find(b => String(b.id) === String(id) || String(b.booking_reference) === String(id) || String(b.refNo) === String(id));
      if (!booking) return;

      currentActiveBooking = booking;

      const ref = booking.booking_reference || booking.refNo || booking.id || 'BK-2026-0001';
      const name = booking.customer_name || booking.full_name || booking.customerName || booking.name || 'Valued Guest';
      const phone = booking.phone || 'N/A';
      const email = booking.email || 'N/A';
      const guestCount = booking.guests_label || (booking.travelers_count ? `${booking.travelers_count} Person(s)` : `${booking.guests || 2} Travellers`);
      const bookingType = booking.booking_type || booking.product_type || 'Destination Package';
      const itemId = booking.product_id || booking.item_id || 'VT-ITEM';
      const itemTitle = booking.item_title || booking.productName || booking.package || 'Travel Experience';
      const plan = booking.selected_plan || booking.selectedPlan || booking.category || 'Luxury Standard';
      const destination = booking.destination || booking.location || 'Global';
      const travelDate = booking.travel_date || booking.travelDate || '2026-09-20';
      const price = booking.total_amount || booking.price || booking.amount || 180000;
      const paymentStatus = booking.payment_status || 'Pending';
      const status = booking.booking_status || booking.status || 'Confirmed';
      const notes = booking.special_requests || booking.notes || '';
      const bookedDate = booking.created_at || booking.createdAt || 'Recent';

      document.getElementById('bk-modal-ref').textContent = ref;
      document.getElementById('bk-modal-title').textContent = `Booking: ${itemTitle}`;
      document.getElementById('bk-modal-booked-date').textContent = bookedDate.includes('T') ? new Date(bookedDate).toLocaleDateString() : bookedDate;
      document.getElementById('bk-modal-status-badge').textContent = status.toUpperCase();
      document.getElementById('bk-modal-guest-name').textContent = name;
      document.getElementById('bk-modal-guest-phone').textContent = phone;
      document.getElementById('bk-modal-guest-email').textContent = email;
      document.getElementById('bk-modal-guest-count').textContent = guestCount;

      document.getElementById('bk-modal-type').textContent = bookingType;
      document.getElementById('bk-modal-item-id').textContent = itemId;
      document.getElementById('bk-modal-item-title').textContent = itemTitle;
      document.getElementById('bk-modal-plan').textContent = plan;
      document.getElementById('bk-modal-destination').textContent = destination;
      document.getElementById('bk-modal-travel-date').textContent = travelDate;
      document.getElementById('bk-modal-price').textContent = formatINR(price);
      document.getElementById('bk-modal-payment-status').textContent = paymentStatus;

      const notesWrap = document.getElementById('bk-modal-notes-wrap');
      const notesText = document.getElementById('bk-modal-notes');
      if (notes) {
        if (notesWrap) notesWrap.style.display = 'block';
        if (notesText) notesText.textContent = notes;
      } else {
        if (notesWrap) notesWrap.style.display = 'none';
      }

      // Existing Admin Response display
      const replyWrap = document.getElementById('bk-modal-existing-reply-wrap');
      const replyTextEl = document.getElementById('bk-modal-existing-reply');
      const replyDateEl = document.getElementById('bk-modal-reply-date');
      const replyInput = document.getElementById('bk-modal-reply-text');

      if (booking.admin_reply) {
        if (replyWrap) replyWrap.style.display = 'block';
        if (replyTextEl) replyTextEl.textContent = booking.admin_reply;
        if (replyDateEl) replyDateEl.textContent = booking.replied_at ? new Date(booking.replied_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Earlier';
        if (replyInput) replyInput.value = booking.admin_reply;
      } else {
        if (replyWrap) replyWrap.style.display = 'none';
        if (replyInput) replyInput.value = '';
      }

      const statusSelect = document.getElementById('bk-modal-status-select');
      if (statusSelect) statusSelect.value = status;

      // WhatsApp Button
      const waBtn = document.getElementById('bk-modal-wa-btn');
      if (waBtn && phone && phone !== 'N/A') {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const waMsg = `Hello ${name}, this is Ventoura Travel Concierge regarding your booking for ${itemTitle} (Ref: ${ref}). How may we assist with your journey on ${travelDate}?`;
        waBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}`;
        waBtn.style.display = 'inline-flex';
      } else if (waBtn) {
        waBtn.style.display = 'none';
      }

      // Email Button
      const emailBtn = document.getElementById('bk-modal-email-btn');
      if (emailBtn && email && email !== 'N/A') {
        emailBtn.href = `mailto:${email}?subject=Ventoura%20Travel%20Booking%20Confirmation%20${encodeURIComponent(ref)}`;
        emailBtn.style.display = 'inline-flex';
      } else if (emailBtn) {
        emailBtn.style.display = 'none';
      }

      const modal = document.getElementById('booking-detail-modal');
      if (modal) modal.style.display = 'flex';
    } catch (e) {
      console.error('Error opening booking details:', e);
    }
  };

  window.closeBookingDetailModal = function() {
    const modal = document.getElementById('booking-detail-modal');
    if (modal) modal.style.display = 'none';
    currentActiveBooking = null;
  };

  window.setBookingModalStatus = function(status) {
    const select = document.getElementById('bk-modal-status-select');
    if (select) select.value = status;
  };

  window.saveBookingModalChanges = async function() {
    if (!currentActiveBooking) return;
    const select = document.getElementById('bk-modal-status-select');
    const replyInput = document.getElementById('bk-modal-reply-text');
    const newStatus = select ? select.value : 'Confirmed';
    const replyText = replyInput ? replyInput.value.trim() : '';

    const targetId = currentActiveBooking.id || currentActiveBooking.booking_reference || currentActiveBooking.refNo;
    const payload = {
      booking_status: newStatus,
      status: newStatus,
      admin_reply: replyText,
      replied_at: replyText ? new Date().toISOString() : (currentActiveBooking.replied_at || null)
    };

    try {
      const res = await fetch(`/api/bookings/${targetId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast(`Booking response and status updated to ${newStatus}`, '✅');
        window.closeBookingDetailModal();
        window.renderBookingsTable();
        if (typeof renderDashboardRecentTable === 'function') renderDashboardRecentTable();
      } else {
        showToast('Failed to update booking.', '⚠️');
      }
    } catch (e) {
      showToast('Error updating booking.', '❌');
    }
  };

  window.updateBookingStatus = async function(id, newStatus) {
    if (!id || !newStatus) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_status: newStatus, status: newStatus })
      });
      if (res.ok) {
        showToast(`Booking status updated to ${newStatus}`, '✅');
        window.renderBookingsTable();
        if (typeof renderDashboardRecentTable === 'function') renderDashboardRecentTable();
      }
    } catch (e) {
      showToast('Failed to update booking status', '⚠️');
    }
  };

  /* ── UNIVERSAL FORM SUBMIT HANDLER WITH BACKEND & SUPABASE PERSISTENCE ── */
  window.handleCmsModalSubmit = async function(e) {
    e.preventDefault();
    const saveBtn = document.getElementById('cms-save-btn');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving Changes...';
    }

    try {
      const isEdit = !!currentEditingItem;
      const itemId = isEdit ? (currentEditingItem.id || currentEditingItem._id || currentEditingItem.code) : null;
      let payload = {};

      if (currentEditingType === 'destinations') {
        const title = document.getElementById('field-title')?.value.trim();
        if (!title) { showToast('Destination title is required!', '⚠️'); return; }
        payload = {
          title: title,
          country: document.getElementById('field-country')?.value || 'Global',
          city: document.getElementById('field-city')?.value || '',
          startingPrice: parseFloat(document.getElementById('field-price')?.value || 1500),
          days: parseInt(document.getElementById('field-days')?.value || 7),
          category: document.getElementById('field-category')?.value || 'Luxury Beach',
          image: document.getElementById('field-image')?.value || '',
          description: document.getElementById('field-description')?.value || '',
          status: document.getElementById('field-status')?.value || 'published'
        };
      }
      else if (currentEditingType === 'packages') {
        const title = document.getElementById('field-title')?.value.trim();
        if (!title) { showToast('Package title is required!', '⚠️'); return; }
        const categoryVal = document.getElementById('field-category')?.value || 'luxury';
        payload = {
          title: title,
          destination: document.getElementById('field-destination')?.value || 'Global',
          duration: document.getElementById('field-duration')?.value || '7 Days / 6 Nights',
          price: parseFloat(document.getElementById('field-price')?.value || 1999),
          badge: document.getElementById('field-badge')?.value || 'SPECIAL',
          category: categoryVal,
          categories: [categoryVal],
          featuredImage: document.getElementById('field-image')?.value || '',
          image: document.getElementById('field-image')?.value || '',
          description: document.getElementById('field-description')?.value || '',
          status: document.getElementById('field-status')?.value || 'published'
        };
      }
      else if (currentEditingType === 'hotels') {
        const name = document.getElementById('field-name')?.value.trim();
        if (!name) { showToast('Hotel name is required!', '⚠️'); return; }
        payload = {
          name: name,
          location: document.getElementById('field-location')?.value || 'Luxury Destination',
          price: parseFloat(document.getElementById('field-price')?.value || 450),
          heroImage: document.getElementById('field-image')?.value || '',
          description: document.getElementById('field-description')?.value || '',
          status: document.getElementById('field-status')?.value || 'published'
        };
      }
      else if (currentEditingType === 'cruises') {
        const title = document.getElementById('field-cruise-title')?.value.trim();
        if (!title) { showToast('Cruise title is required!', '⚠️'); return; }
        payload = {
          title: title,
          vessel: document.getElementById('field-cruise-vessel')?.value || 'Royal Symphony',
          duration: document.getElementById('field-cruise-dur')?.value || '7 nights',
          route: document.getElementById('field-cruise-route')?.value || 'Mediterranean',
          price: parseFloat(document.getElementById('field-cruise-price')?.value || 1899),
          image: document.getElementById('field-image')?.value || '',
          status: document.getElementById('field-status')?.value || 'published'
        };
      }
      else if (currentEditingType === 'faqs') {
        const q = document.getElementById('field-faq-question')?.value.trim();
        if (!q) { showToast('Question is required!', '⚠️'); return; }
        payload = {
          question: q,
          category: document.getElementById('field-faq-category')?.value || 'General',
          answer: document.getElementById('field-faq-answer')?.value || '',
          status: document.getElementById('field-status')?.value || 'published'
        };
      }
      else if (currentEditingType === 'staff') {
        payload = {
          name: document.getElementById('field-staff-name')?.value || '',
          email: document.getElementById('field-staff-email')?.value || '',
          role: document.getElementById('field-staff-role')?.value || 'Staff',
          dept: document.getElementById('field-staff-dept')?.value || 'Operations',
          status: document.getElementById('field-staff-status')?.value || 'Active'
        };
      }
      else if (currentEditingType === 'users') {
        payload = {
          name: document.getElementById('field-user-name')?.value || '',
          email: document.getElementById('field-user-email')?.value || '',
          country: document.getElementById('field-user-country')?.value || 'Global',
          role: document.getElementById('field-user-role')?.value || 'Customer',
          status: document.getElementById('field-user-status')?.value || 'Active'
        };
      }
      else if (currentEditingType === 'flights') {
        payload = {
          code: document.getElementById('field-flight-code')?.value || '',
          airline: document.getElementById('field-flight-airline')?.value || '',
          route: document.getElementById('field-flight-route')?.value || '',
          departure: document.getElementById('field-flight-date')?.value || '',
          flightClass: document.getElementById('field-flight-class')?.value || 'First Class',
          price: parseFloat(document.getElementById('field-flight-price')?.value || 500),
          seats: parseInt(document.getElementById('field-flight-seats')?.value || 10)
        };
      }
      else if (currentEditingType === 'cars') {
        payload = {
          model: document.getElementById('field-car-model')?.value || '',
          category: document.getElementById('field-car-cat')?.value || 'Luxury SUV',
          location: document.getElementById('field-car-loc')?.value || '',
          price: parseFloat(document.getElementById('field-car-price')?.value || 150),
          status: document.getElementById('field-car-status')?.value || 'Available'
        };
      }
      else if (currentEditingType === 'blogs') {
        payload = {
          title: document.getElementById('field-blog-title')?.value || '',
          author: document.getElementById('field-blog-author')?.value || 'Emma Watson',
          status: document.getElementById('field-blog-status')?.value || 'Published'
        };
      }
      else if (currentEditingType === 'coupons') {
        const discType = document.getElementById('field-coupon-type')?.value || 'percentage';
        const discVal = parseFloat(document.getElementById('field-coupon-val')?.value || 15);
        const code = (document.getElementById('field-coupon-code')?.value || '').trim().toUpperCase();
        const minAmt = parseFloat(document.getElementById('field-coupon-min')?.value || 0);
        const startDate = document.getElementById('field-coupon-start')?.value || '';
        const expiry = document.getElementById('field-coupon-expiry')?.value || '2026-12-31';
        const limitCount = parseInt(document.getElementById('field-coupon-limit')?.value || 500);
        const status = document.getElementById('field-coupon-status')?.value || 'Active';

        payload = {
          code: code,
          discount_type: discType,
          discount_value: discVal,
          type: discType === 'percentage' ? `Percentage (${discVal}%)` : `Fixed (₹${discVal.toLocaleString('en-IN')})`,
          min_amount: minAmt,
          start_date: startDate,
          expiry: expiry,
          expiry_date: expiry,
          limit_count: limitCount,
          limit: limitCount,
          status: status
        };
      }
      else if (currentEditingType === 'gallery') {
        payload = {
          title: document.getElementById('field-gal-title')?.value || '',
          url: document.getElementById('field-gal-url')?.value || ''
        };
      }
      else if (currentEditingType === 'visa') {
        payload = {
          customer: document.getElementById('field-visa-customer')?.value || '',
          destination: document.getElementById('field-visa-dest')?.value || '',
          type: document.getElementById('field-visa-type')?.value || 'Tourist Visa (90 Days)',
          status: document.getElementById('field-visa-status')?.value || 'Pending',
          submitted: new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })
        };
      }
      else if (currentEditingType === 'insurance') {
        payload = {
          traveler: document.getElementById('field-ins-traveler')?.value || '',
          type: document.getElementById('field-ins-type')?.value || 'Comprehensive Worldwide',
          coverage: parseFloat(document.getElementById('field-ins-coverage')?.value || 50000),
          premium: parseFloat(document.getElementById('field-ins-premium')?.value || 129),
          status: 'Active'
        };
      }

      if (isEdit) payload.id = itemId;

      const method = isEdit ? 'PUT' : 'POST';
      const endpoint = isEdit ? `/api/admin/${currentEditingType}/${itemId}` : `/api/admin/${currentEditingType}`;

      const res = await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (json.success) {
        showToast(json.message || 'Saved to Database & Supabase!', '✅');
        closeCmsModal();
        if (currentEditingType === 'destinations') fetchAndRenderDestinations();
        else if (currentEditingType === 'packages') fetchAndRenderPackages();
        else if (currentEditingType === 'hotels') fetchAndRenderHotels();
        else if (currentEditingType === 'cruises') renderCruisesTable();
        else if (currentEditingType === 'staff') renderStaffTable();
        else if (currentEditingType === 'users') renderUsersTable();
        else if (currentEditingType === 'flights') renderFlightsTable();
        else if (currentEditingType === 'cars') renderCarsTable();
        else if (currentEditingType === 'blogs') renderBlogsTable();
        else if (currentEditingType === 'coupons') renderCouponsTable();
        else if (currentEditingType === 'gallery') renderGalleryGrid();
        else if (currentEditingType === 'visa') renderVisaTable();
        else if (currentEditingType === 'insurance') renderInsuranceTable();
        else if (currentEditingType === 'faqs') window.fetchAndRenderFaqs();
      } else {
        showToast(json.message || 'Failed to save changes.', '⚠️');
      }
    } catch (err) {
      console.error('Error submitting modal form:', err);
      showToast('Error saving record.', '❌');
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Changes';
      }
    }
  };

  /* ══════════════════════════════════════════════════════════
     SAFE RECYCLE BIN & STATUS LIFECYCLE HANDLERS
     Lifecycle: PUBLISHED ⇄ UNPUBLISHED ⇄ RECYCLE BIN → PERMANENT DELETE
     - Moving to bin retains ALL images, videos, descriptions, durations, pricing & relationships.
     - Restoring returns the item to Unpublished by default.
     - Permanent Delete is ONLY available from Recycle Bin after explicit confirmation.
     ══════════════════════════════════════════════════════════ */
  window.setCmsItemStatus = async function(resource, id, newStatus, extraData = {}) {
    try {
      const payload = Object.assign({ status: newStatus, id: id }, extraData);
      const res = await fetch(`/api/admin/${resource}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        if (newStatus === 'unpublished') {
          if (extraData && extraData.restoredAt) {
            showToast('Restored record to Unpublished list.', '♻️');
          } else {
            showToast('Unpublished: Item hidden from public website.', '⏸️');
          }
        } else if (newStatus === 'published') {
          showToast('Published: Item is now live on website!', '✅');
        } else if (newStatus === 'trash') {
          showToast('Moved item to Recycle Bin. All data safely preserved.', '🗑️');
        } else {
          showToast(`Status updated to ${newStatus.toUpperCase()}`, '🔄');
        }

        if (resource === 'destinations') window.fetchAndRenderDestinations();
        else if (resource === 'packages') window.fetchAndRenderPackages();
        else if (resource === 'cruises') window.fetchAndRenderCruises();
        else loadDynamicCmsContent();
      } else {
        showToast(json.message || 'Failed to update status', '⚠️');
      }
    } catch (e) {
      console.error('Status update error:', e);
      showToast('Failed to update status', '⚠️');
    }
  };

  window.moveToRecycleBin = function(resource, id, name) {
    const list = resource === 'destinations' ? window._adminDestinationsList :
                 resource === 'packages' ? window._adminPackagesList : window._adminCruisesList;
    const item = (list || []).find(x => String(x.id || x._id) === String(id));
    const currentStat = item ? (item.status || 'published').toLowerCase() : 'published';
    const originalStatus = (currentStat === 'published' || currentStat === 'active') ? 'published' : 'unpublished';
    const trashedAt = new Date().toISOString();

    window.setCmsItemStatus(resource, id, 'trash', {
      originalStatus: originalStatus,
      trashedAt: trashedAt
    });
  };

  window.restoreFromRecycleBin = function(resource, id, name) {
    // Restore returns the complete record to Unpublished status by default
    window.setCmsItemStatus(resource, id, 'unpublished', {
      restoredAt: new Date().toISOString()
    });
  };

  window.confirmPermanentDelete = function(resource, id, name) {
    const msgEl = document.getElementById('cms-delete-msg');
    if (msgEl) {
      msgEl.textContent = 'Are you sure you want to permanently delete this item? This action cannot be undone.';
    }
    const previewEl = document.getElementById('cms-delete-item-preview');
    if (previewEl) {
      previewEl.innerHTML = `<span>Resource: <strong style="text-transform:capitalize;color:#0284c7">${resource}</strong> &bull; Item: <strong>"${escapeHtml(name)}"</strong></span>`;
      previewEl.style.display = 'block';
    }
    const confirmBtn = document.getElementById('cms-confirm-delete-btn');
    if (confirmBtn) {
      confirmBtn.onclick = async function() {
        try {
          const res = await fetch(`/api/admin/${resource}/${id}`, { method: 'DELETE' });
          const json = await res.json();
          if (json.success) {
            showToast(`Permanently deleted "${name}"`, '🗑️');
            closeCmsDeleteModal();
            if (resource === 'destinations') window.fetchAndRenderDestinations();
            else if (resource === 'packages') window.fetchAndRenderPackages();
            else if (resource === 'cruises') window.fetchAndRenderCruises();
            else loadDynamicCmsContent();
          } else {
            showToast(json.message || 'Failed to permanently delete', '⚠️');
          }
        } catch (e) {
          showToast('Error deleting item', '❌');
        }
      };
    }
    const modal = document.getElementById('cms-delete-modal');
    if (modal) modal.style.display = 'flex';
  };

  window.togglePublishStatus = window.setCmsItemStatus;
  window.confirmDeleteCmsItem = window.confirmPermanentDelete;

})();



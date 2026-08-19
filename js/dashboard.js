/* ============================================================
   DASHBOARD.JS — Customer Portal, Trip Timeline, Refunds & Vault
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initDashboardTabs();
    renderBookingHistory();
    initCancellationModal();
  });

  function initDashboardTabs() {
    const menuItems = document.querySelectorAll('.dashboard-menu-item');
    const sections = document.querySelectorAll('.dashboard-tab-content');

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        menuItems.forEach(m => m.classList.remove('active'));
        item.classList.add('active');

        const target = item.dataset.dashTab;
        sections.forEach(s => {
          if (s.id === target) {
            s.style.display = 'block';
            s.style.opacity = '0';
            requestAnimationFrame(() => {
              s.style.transition = 'opacity 0.3s ease';
              s.style.opacity = '1';
            });
          } else {
            s.style.display = 'none';
          }
        });
      });
    });
  }

  function renderBookingHistory() {
    const history = JSON.parse(localStorage.getItem('ta_booking_history') || '[]');
    const container = document.querySelector('#booking-history-list');
    if (!container) return;

    if (history.length === 0) {
      // Default sample bookings if empty
      history.push({
        id: 'WL-884920',
        title: 'Maldives Overwater Paradise — 7 Days',
        destination: 'Maldives',
        totalPaid: 2499,
        bookingDate: 'Jul 20, 2026',
        status: 'Confirmed',
        roomType: 'Deluxe Overwater Suite',
        selectedSeats: ['12A', '12B']
      });
      history.push({
        id: 'WL-729410',
        title: 'Santorini Romantic Getaway — 5 Days',
        destination: 'Greece',
        totalPaid: 1299,
        bookingDate: 'May 14, 2026',
        status: 'Completed',
        roomType: 'Cave Villa',
        selectedSeats: ['08C', '08D']
      });
    }

    container.innerHTML = history.map(item => `
      <div class="booking-item-card">
        <img class="booking-item-img" src="${item.destination === 'Greece' ? 'assets/images/dest-santorini.jpg' : 'assets/images/dest-maldives.jpg'}" alt="${item.title}" />
        <div class="booking-item-details">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
            <h3 style="font-size:18px;font-weight:700;color:var(--text-primary);margin:0">${item.title}</h3>
            <span class="status-pill ${item.status === 'Confirmed' ? 'status-confirmed' : (item.status === 'Completed' ? 'status-confirmed' : 'status-cancelled')}">
              ${item.status === 'Confirmed' ? '🟢 Confirmed' : (item.status === 'Completed' ? '✅ Completed' : '🔴 Cancelled')}
            </span>
          </div>
          <div style="display:flex;gap:16px;font-size:13px;color:var(--text-muted);margin-bottom:12px">
            <span>🔖 Ref: <strong>${item.id}</strong></span>
            <span>📅 Booked: ${item.bookingDate}</span>
            <span>💺 Seats: ${item.selectedSeats ? item.selectedSeats.join(', ') : 'Assigned'}</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--glass-border)">
            <div style="font-size:18px;font-weight:800;color:var(--accent)">$${item.totalPaid.toLocaleString()}</div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost btn-sm" onclick="window.print()">📄 Voucher / Invoice</button>
              ${item.status === 'Confirmed' ? `<button class="btn btn-outline btn-sm cancel-booking-btn" data-id="${item.id}" data-title="${item.title}" data-price="${item.totalPaid}">Cancel & Refund</button>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.cancel-booking-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openCancellationModal(btn.dataset.id, btn.dataset.title, parseFloat(btn.dataset.price));
      });
    });
  }

  function initCancellationModal() {
    const modal = document.querySelector('.cancellation-modal');
    const closeBtn = document.querySelector('.cancellation-modal-close');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal?.classList.remove('open'));
    }
  }

  function openCancellationModal(id, title, price) {
    const modal = document.querySelector('.cancellation-modal');
    const container = document.querySelector('#cancellation-modal-body');
    if (!modal || !container) return;

    const refundAmt = Math.max(0, price - 150); // $150 processing fee

    container.innerHTML = `
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <h3 class="section-title" style="font-size:22px;margin:0">Cancel Booking Request</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-top:4px">Ref: <strong>${id}</strong> — ${title}</p>
      </div>

      <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:16px;padding:20px;margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;color:var(--text-secondary)">
          <span>Total Original Paid:</span>
          <span>$${price.toLocaleString()}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;color:var(--rose)">
          <span>Policy Fee (-):</span>
          <span>-$150.00</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;padding-top:12px;border-top:1px solid var(--glass-border);color:var(--emerald)">
          <span>Net Refund Amount:</span>
          <span>$${refundAmt.toLocaleString()}</span>
        </div>
      </div>

      <p style="font-size:12px;color:var(--text-muted);margin-bottom:20px;line-height:1.6">
        Refunds are automatically processed back to original payment method within 3–5 business days under ATOL / ABTA regulations.
      </p>

      <div style="display:flex;gap:12px">
        <button class="btn btn-ghost" style="flex:1" onclick="document.querySelector('.cancellation-modal')?.classList.remove('open')">Keep My Trip</button>
        <button class="btn btn-accent" style="flex:1" id="confirm-cancel-action">Confirm Refund →</button>
      </div>
    `;

    modal.classList.add('open');

    container.querySelector('#confirm-cancel-action')?.addEventListener('click', () => {
      const history = JSON.parse(localStorage.getItem('ta_booking_history') || '[]');
      const match = history.find(item => item.id === id);
      if (match) {
        match.status = 'Cancelled';
        localStorage.setItem('ta_booking_history', JSON.stringify(history));
      }
      modal.classList.remove('open');
      renderBookingHistory();
      showToast(`Refund of $${refundAmt.toLocaleString()} initiated successfully!`, '💳');
    });
  }

})();

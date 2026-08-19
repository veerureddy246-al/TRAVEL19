/* ============================================================
   CHECKOUT.JS — 4-Step Checkout Wizard, Payment & Confirmation
   ============================================================ */

(function () {
  'use strict';

  let currentStep = 1;

  document.addEventListener('DOMContentLoaded', () => {
    initCheckoutWizard();
    initSeatMap();
    initRoomSelector();
    initCouponEngine();
    initPaymentTabs();
    updateSummaryView();
  });

  function initCheckoutWizard() {
    const nextBtns = document.querySelectorAll('.checkout-next-btn');
    const prevBtns = document.querySelectorAll('.checkout-prev-btn');

    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (validateCurrentStep()) {
          goToStep(currentStep + 1);
        }
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        goToStep(currentStep - 1);
      });
    });

    document.querySelectorAll('.stepper-step').forEach((stepEl, idx) => {
      stepEl.addEventListener('click', () => {
        const targetStep = idx + 1;
        if (targetStep < currentStep) {
          goToStep(targetStep);
        }
      });
    });
  }

  function notify(msg, icon = 'ℹ️') {
    if (typeof showToast === 'function') showToast(msg, icon);
    else if (window.showToast) window.showToast(msg, icon);
    else console.log(`[Toast] ${icon} ${msg}`);
  }

  function validateCurrentStep() {
    if (currentStep === 2) {
      // Validate all Step 2 Traveler inputs
      const first = document.querySelector('#traveler1-first');
      const last = document.querySelector('#traveler1-last');
      const email = document.querySelector('#traveler1-email');
      const phone = document.querySelector('#traveler1-phone');
      const passport = document.querySelector('#traveler1-passport');
      const emName = document.querySelector('#emergency-name');
      const emPhone = document.querySelector('#emergency-phone');

      const fields = [
        { el: first, name: 'First Name' },
        { el: last, name: 'Last Name' },
        { el: email, name: 'Email Address', isEmail: true },
        { el: phone, name: 'Phone Number' },
        { el: passport, name: 'Passport Number' },
        { el: emName, name: 'Emergency Contact Name' },
        { el: emPhone, name: 'Emergency Phone' }
      ];

      let isValid = true;
      let firstErrorField = null;

      fields.forEach(f => {
        if (!f.el) return;
        const val = f.el.value ? f.el.value.trim() : '';

        // Reset previous error styles
        f.el.style.borderColor = '';
        f.el.style.boxShadow = '';

        if (!val || (f.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
          isValid = false;
          f.el.style.borderColor = '#EF4444';
          f.el.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
          if (!firstErrorField) firstErrorField = f.el;
        }
      });

      if (!isValid) {
        notify('Please fill out all required traveler fields before continuing!', '⚠️');
        if (firstErrorField) firstErrorField.focus();
        return false;
      } else {
        window.BookingEngine.draft.travelers = [
          { title: 'Mr./Ms.', first: first.value.trim(), last: last.value.trim(), email: email.value.trim(), phone: phone.value.trim(), passport: passport.value.trim() }
        ];
        if (emName && emPhone) {
          window.BookingEngine.draft.emergencyContact = { name: emName.value.trim(), phone: emPhone.value.trim() };
        }
      }
    }
    return true;
  }

  function goToStep(step) {
    if (step < 1 || step > 5) return;
    currentStep = step;

    // Update Stepper UI
    document.querySelectorAll('.stepper-step').forEach((el, idx) => {
      const s = idx + 1;
      el.classList.remove('active', 'completed');
      if (s === currentStep) {
        el.classList.add('active');
      } else if (s < currentStep) {
        el.classList.add('completed');
        el.querySelector('.stepper-circle').textContent = '✓';
      }
    });

    // Update Panels Visibility
    document.querySelectorAll('.checkout-step-panel').forEach(panel => {
      const panelStep = parseInt(panel.dataset.step);
      if (panelStep === currentStep) {
        panel.style.display = 'block';
        panel.style.opacity = '0';
        requestAnimationFrame(() => {
          panel.style.transition = 'opacity 0.3s ease';
          panel.style.opacity = '1';
        });
      } else {
        panel.style.display = 'none';
      }
    });

    if (currentStep === 5) {
      processOrderConfirmation();
    }

    // Update Top Order Summary Action Button Label
    const summaryBtn = document.querySelector('#order-summary-action-btn-wrap .checkout-next-btn');
    if (summaryBtn) {
      if (currentStep === 1) summaryBtn.innerHTML = 'Continue to Traveler Details →';
      else if (currentStep === 2) summaryBtn.innerHTML = 'Continue to Discounts →';
      else if (currentStep === 3) summaryBtn.innerHTML = 'Proceed to Payment →';
      else if (currentStep === 4) summaryBtn.innerHTML = '🔒 Complete & Pay Now';
      else if (currentStep === 5) summaryBtn.parentElement.style.display = 'none';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ─── 2D Airplane Seat Map Selector ─── */
  function initSeatMap() {
    const seatContainer = document.querySelector('#seat-grid-container');
    if (!seatContainer) return;

    const rows = 10;
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    const occupiedSeats = ['1B', '2D', '4A', '5F', '8C', '9E'];

    let html = '';
    for (let r = 1; r <= rows; r++) {
      html += `<div class="seat-row"><div class="seat-row-num">${r}</div>`;
      cols.forEach((c, idx) => {
        if (idx === 3) html += `<div class="seat-aisle"></div>`; // aisle spacer
        const seatId = `${r}${c}`;
        const isOccupied = occupiedSeats.includes(seatId);
        const isSelected = window.BookingEngine.draft.selectedSeats.includes(seatId);

        html += `
          <button type="button" 
                  class="seat-btn ${isOccupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}" 
                  data-seat="${seatId}" 
                  ${isOccupied ? 'disabled' : ''}>
            ${seatId}
          </button>
        `;
      });
      html += `</div>`;
    }

    seatContainer.innerHTML = html;

    seatContainer.querySelectorAll('.seat-btn:not(.occupied)').forEach(btn => {
      btn.addEventListener('click', () => {
        const seatId = btn.dataset.seat;
        const selectedArr = window.BookingEngine.toggleSeat(seatId);

        seatContainer.querySelectorAll('.seat-btn').forEach(b => b.classList.remove('selected'));
        selectedArr.forEach(s => {
          const match = seatContainer.querySelector(`[data-seat="${s}"]`);
          if (match) match.classList.add('selected');
        });

        const seatsLabel = document.querySelector('#selected-seats-label');
        if (seatsLabel) seatsLabel.textContent = selectedArr.join(', ') || 'None selected';
        notify(`Selected Seats: ${selectedArr.join(', ')}`, '💺');
      });
    });
  }

  /* ─── Room Selector ─── */
  function initRoomSelector() {
    document.querySelectorAll('.room-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.room-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        window.BookingEngine.draft.roomType = card.dataset.roomName;
        window.BookingEngine.draft.roomUpgrade = parseInt(card.dataset.upgradePrice || 0);
        updateSummaryView();
      });
    });
  }

  /* ─── Coupon & Gift Card Engine ─── */
  function initCouponEngine() {
    const applyCouponBtn = document.querySelector('#apply-coupon-btn');
    const applyGiftBtn = document.querySelector('#apply-giftcard-btn');

    applyCouponBtn?.addEventListener('click', () => {
      const input = document.querySelector('#coupon-input-field')?.value;
      if (!input) return;
      const res = window.BookingEngine.applyCoupon(input);
      if (res.success) {
        notify(res.message, '🎉');
        updateSummaryView();
      } else {
        notify(res.message, '⚠️');
      }
    });

    applyGiftBtn?.addEventListener('click', () => {
      const input = document.querySelector('#giftcard-input-field')?.value;
      if (!input) return;
      const res = window.BookingEngine.applyGiftCard(input);
      if (res.success) {
        notify(res.message, '🎁');
        updateSummaryView();
      } else {
        notify(res.message, '⚠️');
      }
    });
  }

  /* ─── Payment Gateway Tabs ─── */
  function initPaymentTabs() {
    document.querySelectorAll('.payment-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const mode = tab.dataset.payMode;
        document.querySelectorAll('.payment-form-panel').forEach(p => {
          p.style.display = p.dataset.mode === mode ? 'block' : 'none';
        });

        window.BookingEngine.draft.paymentMethod = tab.textContent.trim();
      });
    });
  }

  /* ─── Update Pricing Breakdown ─── */
  function updateSummaryView() {
    if (window.BookingEngine && typeof window.BookingEngine.loadSelectedTripFromStorage === 'function') {
      window.BookingEngine.loadSelectedTripFromStorage();
    }

    const d = window.BookingEngine.draft;
    const calc = window.BookingEngine.calculateTotal();

    const imgEl = document.querySelector('#summary-pkg-img');
    const titleEl = document.querySelector('#summary-pkg-title');
    const infoEl = document.querySelector('#summary-pkg-info');
    const labelEl = document.querySelector('#summary-base-label');

    const subEl = document.querySelector('#summary-subtotal');
    const roomEl = document.querySelector('#summary-room-upgrade');
    const discountEl = document.querySelector('#summary-discount');
    const totalEl = document.querySelector('#summary-total');

    const baseVal = d.basePrice < 10000 ? d.basePrice * 100 : d.basePrice;
    const baseMultiply = baseVal * d.travelersCount;
    const roomUpgradeVal = d.roomUpgrade < 10000 ? d.roomUpgrade * 100 : d.roomUpgrade;
    const discountVal = calc.totalDiscount < 10000 ? calc.totalDiscount * 100 : calc.totalDiscount;
    const finalVal = calc.finalTotal < 10000 ? calc.finalTotal * 100 : calc.finalTotal;

    if (imgEl && d.image) imgEl.src = d.image;
    if (titleEl && d.title) titleEl.textContent = d.title;
    if (infoEl && d.duration) infoEl.textContent = `${d.duration} · ${d.travelersCount} Travelers`;
    if (labelEl && d.basePrice) labelEl.textContent = `Base Package (₹${baseVal.toLocaleString('en-IN')} × ${d.travelersCount}):`;

    if (subEl) subEl.textContent = `₹${baseMultiply.toLocaleString('en-IN')}`;
    if (roomEl) roomEl.textContent = `+₹${roomUpgradeVal.toLocaleString('en-IN')}`;
    if (discountEl) discountEl.textContent = `-₹${discountVal.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${finalVal.toLocaleString('en-IN')}`;

    // Dynamically render matching alternating timeline for the loaded package
    const pkgKey = d.packageKey || d.destination || 'tokyo-6d';
    const daysCount = d.daysCount || 6;
    if (window.renderLuxuryTimeline && document.getElementById('checkout-alternating-timeline-container')) {
      window.renderLuxuryTimeline('checkout-alternating-timeline-container', daysCount, pkgKey, true);
    }
  }

  /* ─── Process Order Confirmation & Print ─── */
  function processOrderConfirmation() {
    const record = window.BookingEngine.commitBooking();
    const qrSvg = window.BookingEngine.generateSVGQRCode(record.qrCodePayload);

    // Sync booking automatically to Supabase
    if (window.VentouraSupabase && typeof window.VentouraSupabase.submitBooking === 'function') {
      window.VentouraSupabase.submitBooking({
        reference: record.id,
        fullName: (record.travelers && record.travelers[0]) ? `${record.travelers[0].first} ${record.travelers[0].last}` : 'Guest',
        email: (record.travelers && record.travelers[0]) ? record.travelers[0].email : '',
        phone: (record.travelers && record.travelers[0]) ? record.travelers[0].phone : '',
        title: record.title || record.destination || 'Travel Package',
        travelers: (record.travelers) ? record.travelers.length : 1,
        totalAmount: record.totalAmount || 0,
        paymentStatus: 'Paid'
      });
    }

    const confContainer = document.querySelector('#confirmation-output-container');
    if (!confContainer) return;

    const leadTraveler = (record.travelers && record.travelers.length > 0) ? record.travelers[0] : { first: 'Valued', last: 'Guest', email: 'guest@wanderlux.com' };
    const seatsStr = (record.selectedSeats && record.selectedSeats.length > 0) ? record.selectedSeats.join(', ') : 'Unassigned (Auto)';

    confContainer.innerHTML = `
      <div style="text-align:center;margin-bottom:32px">
        <span class="badge badge-emerald" style="font-size:14px;padding:6px 16px;margin-bottom:12px">✅ BOOKING CONFIRMED</span>
        <h2 class="section-title" style="font-size:32px;margin-bottom:8px">Pack Your Bags! <span>You're Going to ${record.destination || record.title || 'Your Destination'}!</span></h2>
        <p style="color:var(--text-secondary);font-size:15px">Booking Reference: <strong style="color:var(--primary-light)">${record.id}</strong> · Confirmation email sent to <strong>${leadTraveler.email}</strong></p>
      </div>

      <!-- Digital QR Boarding Ticket -->
      <div class="ticket-card">
        <div class="ticket-header">
          <div>
            <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;opacity:0.8">WANDERLUX DIGITAL PASS</div>
            <div style="font-size:20px;font-weight:800">${record.title || 'Travel Booking'}</div>
          </div>
          <div style="font-size:22px">✈️</div>
        </div>
        <div class="ticket-body">
          <div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
              <div>
                <div style="font-size:11px;color:var(--text-muted)">PASSENGER</div>
                <div style="font-weight:700;color:var(--text-primary)">${leadTraveler.first} ${leadTraveler.last}</div>
              </div>
              <div>
                <div style="font-size:11px;color:var(--text-muted)">BOOKING REF</div>
                <div style="font-weight:700;color:var(--primary-light)">${record.id}</div>
              </div>
              <div>
                <div style="font-size:11px;color:var(--text-muted)">ASSIGNED SEATS</div>
                <div style="font-weight:700;color:var(--accent)">${seatsStr}</div>
              </div>
              <div>
                <div style="font-size:11px;color:var(--text-muted)">ACCOMMODATION</div>
                <div style="font-weight:700;color:var(--text-primary)">${record.roomType || 'Standard Deluxe Suite'}</div>
              </div>
            </div>
            <div style="font-size:12px;color:var(--emerald)">✔ ATOL & ABTA Protected · Status: Confirmed</div>
          </div>
          
          <div class="qr-code-box">
            ${qrSvg}
            <div style="font-size:10px;color:#000;font-weight:700;margin-top:6px">SCAN AT GATE</div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display:flex;gap:16px;justify-content:center;margin-bottom:32px;flex-wrap:wrap">
        <button class="btn btn-primary btn-lg" onclick="window.print()">📄 Print Official Invoice / PDF</button>
        <a href="index.html" class="btn btn-accent btn-lg">🏠 Return to Home →</a>
      </div>
    `;

    notify('🚀 Live Notification: Booking Confirmation SMS & Email Dispatched!', '📱');
  }

})();

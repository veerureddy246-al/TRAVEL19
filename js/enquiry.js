/**
 * ═══════════════════════════════════════════════════════════════════
 * VENTOURA TRAVEL — INSTANT TRAVEL BOOKING MODAL & ENQUIRY ENGINE
 * Professional Modal Layout, Dynamic Auto-Fill, Coupon Engine & WhatsApp
 * ═══════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // Configured WhatsApp Concierge Number
  const WHATSAPP_BUSINESS_NUMBER = '919876543210';

  let currentSelectedItem = null;
  let currentItemType = 'destination';
  let appliedCoupon = null;

  // Indian Rupee (₹) Formatter
  function formatINR(price) {
    if (price === undefined || price === null || price === '') return '₹1,80,000';
    let str = String(price).trim();
    if (str.startsWith('₹') || str.startsWith('Rs')) return str;

    let cleaned = str.replace(/[^0-9.]/g, '');
    let num = Number(cleaned);
    if (isNaN(num) || num <= 0) return str || '₹1,80,000';

    if (num < 10000 && !str.includes('₹')) {
      num = num * 100;
    }
    return '₹' + Math.round(num).toLocaleString('en-IN');
  }

  function parseNumericPrice(price) {
    if (!price && price !== 0) return 180000;
    let cleaned = String(price).replace(/[^0-9.]/g, '');
    let num = Number(cleaned);
    if (isNaN(num) || num <= 0) return 180000;
    if (num < 10000) num = num * 100;
    return Math.round(num);
  }

  // Format Duration
  function formatDuration(item) {
    if (!item) return '7 Days / 6 Nights';
    if (typeof item === 'string') return item;
    if (item.duration && (item.duration.includes('Days') || item.duration.includes('Nights') || item.duration.includes('d'))) {
      return item.duration;
    }
    let days = item.days || 7;
    let nights = item.nights || (days > 1 ? days - 1 : 1);
    return `${days} Days / ${nights} Nights`;
  }

  // Determine Service Category Label
  function getBookingTypeLabel(type, item) {
    const t = String(type || (item && (item.productType || item.type || item.category)) || '').toLowerCase();
    if (t.includes('dest')) return 'DESTINATION';
    if (t.includes('pack') || t.includes('tour') || t.includes('holiday')) return 'TOUR PACKAGE';
    if (t.includes('cruis') || t.includes('vessel') || t.includes('ship') || t.includes('yacht')) return 'CRUISE';
    if (t.includes('hotel') || t.includes('resort') || t.includes('room') || t.includes('stay') || t.includes('villa')) return 'HOTEL';
    if (t.includes('flight') || t.includes('air') || t.includes('charter')) return 'FLIGHT';
    if (t.includes('car') || t.includes('vehic') || t.includes('trans') || t.includes('chauffeur')) return 'CAR RENTAL';
    if (t.includes('insur')) return 'TRAVEL INSURANCE';
    if (t.includes('visa')) return 'VISA SERVICE';
    if (t.includes('special')) return 'SPECIALTY TOUR';
    if (t.includes('exp')) return 'EXPERIENCE';
    return 'DESTINATION';
  }

  const VentouraEnquiry = {
    appliedCoupon: null,

    // Open Booking Modal for Any Selected Service
    openEnquiryModal: function (item, type) {
      if (!item) {
        item = {
          title: 'Kerala Backwater Sanctuary',
          location: 'Kochi & Alleppey, India',
          duration: '7 Days / 6 Nights',
          price: 180000,
          image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
          type: 'destination'
        };
      }

      currentSelectedItem = item;
      currentItemType = type || item.type || item.category || 'destination';
      this.appliedCoupon = null;

      this.ensureModalDOM();

      const modal = document.getElementById('ventoura-enquiry-modal');
      if (!modal) return;

      const bookingType = getBookingTypeLabel(currentItemType, item);
      const title = item.title || item.name || item.vessel || item.model || 'Kerala Backwater Sanctuary';
      const location = item.city ? `${item.city}, ${item.country || ''}` : (item.location || item.country || item.destination || item.route || 'Kochi & Alleppey, India');
      const basePrice = item.startingPrice || item.price || item.amount || item.rate || 180000;
      const duration = formatDuration(item);
      const image = item.image || item.featuredImage || item.heroImg || item.heroImage || item.img || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80';

      // Fill Trip Information Header
      document.getElementById('enquiry-preview-title').textContent = title;
      document.getElementById('enquiry-preview-location').textContent = `📍 ${location}`;
      document.getElementById('enquiry-preview-duration').textContent = `📅 ${duration}`;
      document.getElementById('enquiry-preview-tag').textContent = bookingType;
      document.getElementById('enquiry-preview-price').textContent = formatINR(basePrice);
      
      const imgEl = document.getElementById('enquiry-preview-img');
      if (imgEl) {
        imgEl.src = image;
        imgEl.alt = title;
      }

      // Reset Coupon Fields
      const couponInput = document.getElementById('enquiry-coupon-input');
      const couponFeedback = document.getElementById('enquiry-coupon-feedback');
      const couponBadge = document.getElementById('coupon-applied-pill');
      const breakdownBox = document.getElementById('coupon-breakdown-box');
      if (couponInput) couponInput.value = '';
      if (couponFeedback) { couponFeedback.className = 'coupon-feedback-box'; couponFeedback.textContent = ''; }
      if (couponBadge) couponBadge.style.display = 'none';
      if (breakdownBox) breakdownBox.style.display = 'none';

      // Clear Validation Errors
      document.querySelectorAll('.field-error-msg').forEach(el => el.classList.remove('visible'));
      document.querySelectorAll('.enquiry-form-control').forEach(el => el.classList.remove('has-error'));

      // Set Travel Date to 14 days in future by default
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 14);
      const dateInput = document.getElementById('enquiry-date');
      if (dateInput) {
        dateInput.value = futureDate.toISOString().split('T')[0];
        dateInput.min = new Date().toISOString().split('T')[0];
      }

      // Set default guests to 2
      const guestSelect = document.getElementById('enquiry-guests');
      if (guestSelect) guestSelect.value = "2";

      // Reset Form and Switch Views
      const formEl = document.getElementById('enquiry-form-element');
      if (formEl) formEl.reset();
      if (guestSelect) guestSelect.value = "2";
      if (dateInput) dateInput.value = futureDate.toISOString().split('T')[0];

      document.getElementById('enquiry-form-view').style.display = 'block';
      document.getElementById('enquiry-success-view').style.display = 'none';

      // Show Modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      this.recalculatePrices();
    },

    // Alias for compatibility
    openBookingModal: function (item, type) {
      this.openEnquiryModal(item, type);
    },

    // Close Modal
    closeEnquiryModal: function () {
      const modal = document.getElementById('ventoura-enquiry-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    // Open Detail Page for "Explore" buttons
    openDetailPage: function (item, type) {
      if (!item) return;
      const itemType = type || 'destination';
      const itemId = item.id || item._id || '';
      const title = item.title || item.name || '';
      const query = new URLSearchParams({ type: itemType, id: itemId, title: title }).toString();
      window.location.href = `detail.html?${query}`;
    },

    // Recalculate Prices on Guest or Coupon Change
    recalculatePrices: function () {
      const item = currentSelectedItem || {};
      const basePrice = parseNumericPrice(item.startingPrice || item.price || item.amount || 180000);
      const guestSelect = document.getElementById('enquiry-guests');
      const guests = parseInt(guestSelect?.value || '2', 10);
      const priceEl = document.getElementById('enquiry-preview-price');
      const breakdownBox = document.getElementById('coupon-breakdown-box');

      let subtotal = basePrice;
      let discount = 0;

      if (this.appliedCoupon) {
        const c = this.appliedCoupon;
        if (c.discount_type === 'percentage') {
          discount = Math.round(subtotal * (c.discount_value / 100));
        } else {
          discount = Math.min(subtotal, c.discount_value);
        }
      }

      const finalTotal = Math.max(0, subtotal - discount);

      if (this.appliedCoupon && discount > 0) {
        if (priceEl) {
          priceEl.innerHTML = `<span style="text-decoration:line-through;font-size:13px;color:#94a3b8;margin-right:6px;font-weight:600;">${formatINR(subtotal)}</span> <span style="color:#10b981;">${formatINR(finalTotal)}</span>`;
        }
        if (breakdownBox) {
          breakdownBox.style.display = 'block';
          breakdownBox.innerHTML = `
            <div class="price-breakdown-row">
              <span>Base Fare:</span>
              <span>${formatINR(subtotal)}</span>
            </div>
            <div class="price-breakdown-row" style="color:#10b981;font-weight:700;">
              <span>Promo Discount (${this.appliedCoupon.code}):</span>
              <span>-${formatINR(discount)}</span>
            </div>
            <div class="price-breakdown-row" style="font-weight:800;color:#ffffff;font-size:13px;border-top:1px solid rgba(255,255,255,0.1);padding-top:6px;margin-top:6px;">
              <span>Estimated Total:</span>
              <span style="color:#10b981;">${formatINR(finalTotal)}</span>
            </div>
          `;
        }
      } else {
        if (priceEl) priceEl.textContent = formatINR(subtotal);
        if (breakdownBox) breakdownBox.style.display = 'none';
      }
    },

    // Apply Coupon Code
    applyCoupon: async function () {
      const input = document.getElementById('enquiry-coupon-input');
      const feedback = document.getElementById('enquiry-coupon-feedback');
      const badge = document.getElementById('coupon-applied-pill');
      const applyBtn = document.getElementById('enquiry-coupon-apply-btn');

      const code = (input?.value || '').trim().toUpperCase();
      if (!code) {
        if (feedback) {
          feedback.className = 'coupon-feedback-box error';
          feedback.textContent = '⚠️ Please enter a coupon code.';
        }
        return;
      }

      if (this.appliedCoupon && this.appliedCoupon.code === code) {
        if (feedback) {
          feedback.className = 'coupon-feedback-box info';
          feedback.textContent = `ℹ️ Coupon '${code}' is already applied.`;
        }
        return;
      }

      const item = currentSelectedItem || {};
      const basePrice = parseNumericPrice(item.startingPrice || item.price || item.amount || 180000);

      if (applyBtn) {
        applyBtn.disabled = true;
        applyBtn.textContent = 'Checking...';
      }

      try {
        const res = await fetch('/api/coupons/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: code, amount: basePrice })
        });
        const data = await res.json();

        if (data.success && data.valid) {
          this.appliedCoupon = data;
          if (badge) {
            badge.style.display = 'inline-block';
            badge.textContent = `✓ ${data.discount_display || 'DISCOUNT'} APPLIED`;
          }
          if (feedback) {
            feedback.className = 'coupon-feedback-box success';
            feedback.textContent = `✅ ${data.message || `Coupon '${code}' applied successfully!`}`;
          }
          this.recalculatePrices();
        } else {
          this.appliedCoupon = null;
          if (badge) badge.style.display = 'none';
          if (feedback) {
            feedback.className = 'coupon-feedback-box error';
            feedback.textContent = `⚠️ ${data.error || `Invalid coupon code '${code}'.`}`;
          }
          this.recalculatePrices();
        }
      } catch (err) {
        // Fallback local coupon check
        const fallbackCoupons = {
          'VENTOURA10': { discount_type: 'percentage', discount_value: 10, discount_display: '10% Off' },
          'SUMMER2026': { discount_type: 'fixed', discount_value: 20000, discount_display: '₹20,000 Off' },
          'WANDER50': { discount_type: 'fixed', discount_value: 5000, discount_display: '₹5,000 Off' },
          'WELCOME15': { discount_type: 'percentage', discount_value: 15, discount_display: '15% Off' }
        };

        if (fallbackCoupons[code]) {
          const cp = fallbackCoupons[code];
          this.appliedCoupon = {
            valid: true,
            code: code,
            discount_type: cp.discount_type,
            discount_value: cp.discount_value,
            discount_display: cp.discount_display
          };
          if (badge) {
            badge.style.display = 'inline-block';
            badge.textContent = `✓ ${cp.discount_display} APPLIED`;
          }
          if (feedback) {
            feedback.className = 'coupon-feedback-box success';
            feedback.textContent = `✅ Coupon '${code}' applied successfully! (${cp.discount_display})`;
          }
          this.recalculatePrices();
        } else {
          this.appliedCoupon = null;
          if (badge) badge.style.display = 'none';
          if (feedback) {
            feedback.className = 'coupon-feedback-box error';
            feedback.textContent = `⚠️ Invalid coupon code '${code}'. Try SUMMER2026 or VENTOURA10.`;
          }
          this.recalculatePrices();
        }
      } finally {
        if (applyBtn) {
          applyBtn.disabled = false;
          applyBtn.textContent = 'Apply';
        }
      }
    },

    // Form Validation (React Hook Form / Zod Schema Equivalent)
    validateForm: function () {
      let isValid = true;

      const nameInput = document.getElementById('enquiry-name');
      const phoneInput = document.getElementById('enquiry-phone');
      const emailInput = document.getElementById('enquiry-email');
      const dateInput = document.getElementById('enquiry-date');

      const errName = document.getElementById('err-name');
      const errPhone = document.getElementById('err-phone');
      const errEmail = document.getElementById('err-email');
      const errDate = document.getElementById('err-date');

      // Clear previous error states
      [nameInput, phoneInput, emailInput, dateInput].forEach(inp => inp && inp.classList.remove('has-error'));
      [errName, errPhone, errEmail, errDate].forEach(err => err && err.classList.remove('visible'));

      // 1. Full Name Validation
      const name = (nameInput?.value || '').trim();
      if (!name || name.length < 2) {
        isValid = false;
        if (nameInput) nameInput.classList.add('has-error');
        if (errName) {
          errName.textContent = 'Please enter your full name (minimum 2 characters).';
          errName.classList.add('visible');
        }
      }

      // 2. Phone Validation
      const phone = (phoneInput?.value || '').trim();
      const phoneDigits = phone.replace(/[^0-9]/g, '');
      if (!phone || phoneDigits.length < 8) {
        isValid = false;
        if (phoneInput) phoneInput.classList.add('has-error');
        if (errPhone) {
          errPhone.textContent = 'Please enter a valid phone number with country code.';
          errPhone.classList.add('visible');
        }
      }

      // 3. Email Validation
      const email = (emailInput?.value || '').trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        isValid = false;
        if (emailInput) emailInput.classList.add('has-error');
        if (errEmail) {
          errEmail.textContent = 'Please enter a valid email address.';
          errEmail.classList.add('visible');
        }
      }

      // 4. Date Validation
      const dateVal = (dateInput?.value || '').trim();
      if (!dateVal) {
        isValid = false;
        if (dateInput) dateInput.classList.add('has-error');
        if (errDate) {
          errDate.textContent = 'Please select your preferred travel date.';
          errDate.classList.add('visible');
        }
      } else {
        const selectedDate = new Date(dateVal);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          isValid = false;
          if (dateInput) dateInput.classList.add('has-error');
          if (errDate) {
            errDate.textContent = 'Travel date cannot be in the past.';
            errDate.classList.add('visible');
          }
        }
      }

      return isValid;
    },

    // Form Submit Handler
    handleFormSubmit: async function (e) {
      if (e) e.preventDefault();

      if (!this.validateForm()) {
        return;
      }

      const submitBtn = document.getElementById('enquiry-submit-btn');
      if (submitBtn && submitBtn.disabled) return;

      const name = document.getElementById('enquiry-name').value.trim();
      const phone = document.getElementById('enquiry-phone').value.trim();
      const email = document.getElementById('enquiry-email').value.trim();
      const travelDate = document.getElementById('enquiry-date').value;
      const guestSelect = document.getElementById('enquiry-guests');
      const guests = parseInt(guestSelect?.value || '2', 10);
      const guestLabel = guestSelect?.options[guestSelect.selectedIndex]?.text || `${guests} Travellers`;
      const notes = document.getElementById('enquiry-notes')?.value.trim() || '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Saving Reservation to Database... ⏳</span>';
      }

      const item = currentSelectedItem || {};
      const bookingType = getBookingTypeLabel(currentItemType, item);
      const title = item.title || item.name || item.vessel || item.model || 'Kerala Backwater Sanctuary';
      const itemId = item.id || item._id || item.code || 'kerala-backwater';
      const location = item.city ? `${item.city}, ${item.country || ''}` : (item.location || item.country || item.destination || item.route || 'Kochi & Alleppey, India');
      const basePrice = parseNumericPrice(item.startingPrice || item.price || item.amount || 180000);
      const durationStr = formatDuration(item);
      const image = item.image || item.featuredImage || item.heroImg || item.heroImage || '';

      // Calculate final pricing
      let discountAmount = 0;
      let couponCode = null;
      if (this.appliedCoupon) {
        couponCode = String(this.appliedCoupon.code).toUpperCase();
        if (this.appliedCoupon.discount_type === 'percentage') {
          discountAmount = Math.round(basePrice * (this.appliedCoupon.discount_value / 100));
        } else {
          discountAmount = Math.min(basePrice, this.appliedCoupon.discount_value);
        }
      }
      const finalTotal = Math.max(0, basePrice - discountAmount);
      const formattedPriceStr = formatINR(finalTotal);

      // Unique reference number
      const refNo = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const bookingPayload = {
        id: `bk-${Date.now()}`,
        booking_reference: refNo,
        refNo: refNo,
        full_name: name,
        customerName: name,
        fullName: name,
        name: name,
        phone: phone,
        email: email,
        travel_date: travelDate,
        travelDate: travelDate,
        travelers_count: guests,
        guests: guests,
        guests_label: guestLabel,
        special_requests: notes,
        notes: notes,
        booking_type: bookingType,
        product_type: currentItemType,
        productType: currentItemType,
        product_id: itemId,
        productId: itemId,
        selected_destination_id: currentItemType === 'destination' ? itemId : null,
        selected_package_id: currentItemType === 'package' ? itemId : null,
        selected_cruise_id: currentItemType === 'cruise' ? itemId : null,
        selected_hotel_id: currentItemType === 'hotel' ? itemId : null,
        item_title: title,
        productName: title,
        destination: location,
        location: location,
        duration: durationStr,
        price: finalTotal,
        total_amount: finalTotal,
        totalAmount: finalTotal,
        original_amount: basePrice,
        discount_amount: discountAmount,
        coupon_code: couponCode,
        coupon: couponCode,
        price_formatted: formattedPriceStr,
        image: image,
        booking_status: 'Confirmed',
        status: 'Confirmed',
        payment_status: 'Pending',
        source: 'Website Book Now Modal',
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };

      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload)
        });

        const resData = await response.json();
        const savedRef = (resData.data && (resData.data.booking_reference || resData.data.refNo)) || refNo;

        // Populate Success Confirmation Card
        document.getElementById('enquiry-success-ref').textContent = `BOOKING REF: ${savedRef}`;
        document.getElementById('success-guest-name').textContent = name;
        document.getElementById('success-item-name').textContent = `${title} (${location})`;
        document.getElementById('success-guests').textContent = guestLabel;
        document.getElementById('success-duration').textContent = durationStr;
        document.getElementById('success-travel-date').textContent = travelDate;
        document.getElementById('success-price').textContent = formattedPriceStr;

        const couponRow = document.getElementById('success-coupon-row');
        if (couponRow) {
          if (couponCode) {
            couponRow.style.display = 'flex';
            document.getElementById('success-coupon-code').textContent = couponCode;
            document.getElementById('success-coupon-discount').textContent = `-${formatINR(discountAmount)}`;
          } else {
            couponRow.style.display = 'none';
          }
        }

        // Format Date for WhatsApp
        let displayDate = travelDate;
        try {
          if (travelDate.includes('-')) {
            const parts = travelDate.split('-');
            const d = new Date(parts[0], parts[1] - 1, parts[2]);
            displayDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
          }
        } catch (e) {}

        // Construct Exact WhatsApp Concierge Message
        const waMessage = 
          `Hello Ventoura Travel,\n` +
          `I would like to enquire about:\n\n` +
          `Package: ${title}\n` +
          `Travel Date: ${displayDate}\n` +
          `Travellers: ${guestLabel}\n` +
          `Booking Reference: ${savedRef}`;

        const waUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(waMessage)}`;
        const waBtn = document.getElementById('enquiry-whatsapp-link');
        if (waBtn) waBtn.href = waUrl;

        // Switch to Success View
        document.getElementById('enquiry-form-view').style.display = 'none';
        document.getElementById('enquiry-success-view').style.display = 'block';

      } catch (err) {
        console.warn('Booking network sync notice:', err);
        // Fallback local display
        document.getElementById('enquiry-success-ref').textContent = `BOOKING REF: ${refNo}`;
        document.getElementById('success-guest-name').textContent = name;
        document.getElementById('success-item-name').textContent = `${title} (${location})`;
        document.getElementById('success-guests').textContent = guestLabel;
        document.getElementById('success-duration').textContent = durationStr;
        document.getElementById('success-travel-date').textContent = travelDate;
        document.getElementById('success-price').textContent = formattedPriceStr;

        const waMessage = 
          `Hello Ventoura Travel,\n` +
          `I would like to enquire about:\n\n` +
          `Package: ${title}\n` +
          `Travel Date: ${travelDate}\n` +
          `Travellers: ${guestLabel}\n` +
          `Booking Reference: ${refNo}`;

        const waUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(waMessage)}`;
        const waBtn = document.getElementById('enquiry-whatsapp-link');
        if (waBtn) waBtn.href = waUrl;

        document.getElementById('enquiry-form-view').style.display = 'none';
        document.getElementById('enquiry-success-view').style.display = 'block';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Confirm Booking ✈️</span>';
        }
      }
    },

    // Ensure Modal HTML is injected in DOM
    ensureModalDOM: function () {
      if (document.getElementById('ventoura-enquiry-modal')) return;

      const modalHTML = `
        <div id="ventoura-enquiry-modal" class="enquiry-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-title">
          <div class="enquiry-modal-card">
            <button type="button" class="enquiry-modal-close" onclick="window.VentouraEnquiry.closeEnquiryModal()" aria-label="Close modal">✕</button>
            
            <!-- HEADER -->
            <div class="enquiry-modal-header">
              <h2 class="enquiry-modal-title" id="enquiry-modal-title">Instant Travel Booking</h2>
              <p class="enquiry-modal-subtitle">Reserve your itinerary — immediate confirmation &amp; luxury concierge support.</p>
            </div>

            <!-- SELECTED PRODUCT PREVIEW CARD -->
            <div class="enquiry-product-preview">
              <img id="enquiry-preview-img" class="enquiry-product-img" src="" alt="Selected Experience" />
              <div class="enquiry-product-info">
                <div id="enquiry-preview-tag" class="enquiry-product-tag">DESTINATION</div>
                <div id="enquiry-preview-title" class="enquiry-product-name">Kerala Backwater Sanctuary</div>
                <div class="enquiry-product-meta">
                  <span id="enquiry-preview-location">📍 Kochi &amp; Alleppey, India</span>
                  <span id="enquiry-preview-duration">📅 7 Days / 6 Nights</span>
                </div>
              </div>
              <div id="enquiry-preview-price" class="enquiry-product-price">₹1,80,000</div>
            </div>

            <!-- FORM VIEW -->
            <div id="enquiry-form-view">
              <form id="enquiry-form-element" onsubmit="window.VentouraEnquiry.handleFormSubmit(event)" novalidate>
                
                <!-- ROW 1: Full Name & Phone Number -->
                <div class="enquiry-form-grid">
                  <div class="enquiry-form-group">
                    <label class="enquiry-form-label" for="enquiry-name">Full Name *</label>
                    <input type="text" id="enquiry-name" class="enquiry-form-control" placeholder="e.g. Veerendra Reddy" required />
                    <span class="field-error-msg" id="err-name"></span>
                  </div>
                  <div class="enquiry-form-group">
                    <label class="enquiry-form-label" for="enquiry-phone">Phone Number *</label>
                    <input type="tel" id="enquiry-phone" class="enquiry-form-control" placeholder="+91 98765 43210" required />
                    <span class="field-error-msg" id="err-phone"></span>
                  </div>
                </div>

                <!-- ROW 2: Email Address & Preferred Travel Date -->
                <div class="enquiry-form-grid">
                  <div class="enquiry-form-group">
                    <label class="enquiry-form-label" for="enquiry-email">Email Address *</label>
                    <input type="email" id="enquiry-email" class="enquiry-form-control" placeholder="customer@example.com" required />
                    <span class="field-error-msg" id="err-email"></span>
                  </div>
                  <div class="enquiry-form-group">
                    <label class="enquiry-form-label" for="enquiry-date">Preferred Travel Date *</label>
                    <input type="date" id="enquiry-date" class="enquiry-form-control" required />
                    <span class="field-error-msg" id="err-date"></span>
                  </div>
                </div>

                <!-- ROW 3: Number of Travellers & Special Requests -->
                <div class="enquiry-form-grid">
                  <div class="enquiry-form-group">
                    <label class="enquiry-form-label" for="enquiry-guests">Number of Travellers *</label>
                    <select id="enquiry-guests" class="enquiry-form-control" onchange="window.VentouraEnquiry.recalculatePrices()">
                      <option value="1">1 Traveller (Solo)</option>
                      <option value="2" selected>2 Travellers (Couple / Pair)</option>
                      <option value="3">3 Travellers</option>
                      <option value="4">4 Travellers (Family / Group)</option>
                      <option value="5">5 Travellers</option>
                      <option value="6">6+ Travellers</option>
                    </select>
                  </div>
                  <div class="enquiry-form-group">
                    <label class="enquiry-form-label" for="enquiry-notes">Special Requests / Preferences</label>
                    <input type="text" id="enquiry-notes" class="enquiry-form-control" placeholder="e.g. Ocean view, dietary needs..." />
                  </div>
                </div>

                <!-- PROMO / COUPON CODE SECTION (Matches Screenshot) -->
                <div class="enquiry-coupon-wrapper">
                  <div class="coupon-header-row">
                    <label class="coupon-label-title" for="enquiry-coupon-input">Have a Promo / Coupon Code?</label>
                    <span id="coupon-applied-pill" class="coupon-applied-pill">✓ CODE APPLIED</span>
                  </div>
                  <div class="coupon-input-group">
                    <input type="text" id="enquiry-coupon-input" class="coupon-input-field" placeholder="E.G. SUMMER2026, WANDER50" />
                    <button type="button" id="enquiry-coupon-apply-btn" class="coupon-apply-btn" onclick="window.VentouraEnquiry.applyCoupon()">Apply</button>
                  </div>
                  <div id="enquiry-coupon-feedback" class="coupon-feedback-box"></div>
                  <div id="coupon-breakdown-box" style="display:none;"></div>
                </div>

                <!-- CONFIRM BOOKING BUTTON -->
                <button type="submit" id="enquiry-submit-btn" class="enquiry-submit-btn">
                  <span>Confirm Booking ✈️</span>
                </button>
              </form>
            </div>

            <!-- SUCCESS CONFIRMATION VIEW -->
            <div id="enquiry-success-view" class="enquiry-success-view" style="display:none;">
              <div class="enquiry-success-icon">✓</div>
              <h3 style="font-size:22px; font-weight:800; color:#ffffff; margin:0 0 6px;">Booking Confirmed!</h3>
              <p style="font-size:13.5px; color:#94a3b8; margin:0 0 12px;">Thank you. Our travel team will contact you shortly.</p>

              <div class="enquiry-success-ref" id="enquiry-success-ref">BOOKING REF: BK-2026-0001</div>

              <div class="enquiry-summary-card">
                <div class="row">
                  <span class="label">Lead Guest:</span>
                  <span class="value" id="success-guest-name">-</span>
                </div>
                <div class="row">
                  <span class="label">Service / Trip:</span>
                  <span class="value" id="success-item-name">-</span>
                </div>
                <div class="row">
                  <span class="label">Travellers:</span>
                  <span class="value" id="success-guests">-</span>
                </div>
                <div class="row">
                  <span class="label">Duration:</span>
                  <span class="value" id="success-duration">-</span>
                </div>
                <div class="row">
                  <span class="label">Travel Date:</span>
                  <span class="value" id="success-travel-date">-</span>
                </div>
                <div class="row" id="success-coupon-row" style="display:none; color:#10b981;">
                  <span class="label" style="color:#10b981;">Promo Code:</span>
                  <span class="value" style="color:#10b981;"><span id="success-coupon-code">-</span> (<span id="success-coupon-discount">-</span>)</span>
                </div>
                <div class="row" style="border-top:1px solid rgba(255,255,255,0.08); padding-top:6px; margin-top:2px;">
                  <span class="label" style="font-weight:700; color:#ffffff;">Final Amount:</span>
                  <span class="value" id="success-price" style="color:#10b981; font-size:16px;">-</span>
                </div>
              </div>

              <p style="font-size:12.5px; color:#94a3b8; margin-bottom:14px;">Connect directly with your personal travel concierge on WhatsApp:</p>

              <a id="enquiry-whatsapp-link" href="#" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
                <span>💬 Continue on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHTML);

      // Close on backdrop click or ESC key
      const modal = document.getElementById('ventoura-enquiry-modal');
      if (modal) {
        modal.addEventListener('click', function (e) {
          if (e.target === modal) {
            VentouraEnquiry.closeEnquiryModal();
          }
        });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
          VentouraEnquiry.closeEnquiryModal();
        }
      });
    }
  };

  // Global delegation for Book Now and Explore buttons
  document.addEventListener('click', function (e) {
    // 1. BOOK NOW Handler
    const bookBtn = e.target.closest('.btn-book-now, .btn-book-trip, .btn-book-cruise, .btn-book-room, [data-action="book"], [data-book], .booking-btn, .btn-reserve');
    if (bookBtn) {
      e.preventDefault();
      e.stopPropagation();

      const card = bookBtn.closest('.package-card, .destination-card, .hotel-card, .cruise-card, .experience-card, .map-dest-card, .service-card, .service-item, .flight-card, .car-card');
      let item = {};
      if (card) {
        const imgEl = card.querySelector('img');
        const titleEl = card.querySelector('.package-title, .destination-name, .hotel-name, .cruise-name, .experience-title, .service-title, .service-text-title, h3, h4');
        const priceEl = card.querySelector('.price-tag, .destination-meta, .hotel-price, .cruise-footer, [class*="price"]');
        const locationEl = card.querySelector('.package-location, .destination-country, .hotel-location, .cruise-route, .location');
        const durationEl = card.querySelector('.package-duration, .duration, .days');

        item = {
          title: bookBtn.dataset.itemTitle || bookBtn.dataset.title || (titleEl ? titleEl.textContent.trim() : 'Kerala Backwater Sanctuary'),
          type: bookBtn.dataset.itemType || bookBtn.dataset.type || 'destination',
          price: bookBtn.dataset.itemPrice || bookBtn.dataset.price || (priceEl ? priceEl.textContent.trim() : '₹1,80,000'),
          duration: bookBtn.dataset.itemDuration || bookBtn.dataset.duration || (durationEl ? durationEl.textContent.trim() : '7 Days / 6 Nights'),
          image: bookBtn.dataset.itemImage || bookBtn.dataset.image || (imgEl ? imgEl.src : ''),
          location: bookBtn.dataset.itemLocation || bookBtn.dataset.location || (locationEl ? locationEl.textContent.trim() : 'Kochi & Alleppey, India')
        };
      } else {
        item = {
          title: bookBtn.dataset.itemTitle || bookBtn.dataset.title || 'Kerala Backwater Sanctuary',
          type: bookBtn.dataset.itemType || bookBtn.dataset.type || 'destination',
          price: bookBtn.dataset.itemPrice || bookBtn.dataset.price || '₹1,80,000',
          duration: bookBtn.dataset.itemDuration || bookBtn.dataset.duration || '7 Days / 6 Nights',
          image: bookBtn.dataset.itemImage || bookBtn.dataset.image || '',
          location: bookBtn.dataset.itemLocation || bookBtn.dataset.location || 'Kochi & Alleppey, India'
        };
      }

      VentouraEnquiry.openEnquiryModal(item, item.type);
      return;
    }

    // 2. EXPLORE Handler -> Detail Page
    const exploreBtn = e.target.closest('.btn-explore, .btn-explore-dest, .btn-explore-pkg, [data-action="explore"]');
    if (exploreBtn) {
      if (exploreBtn.tagName.toLowerCase() === 'a' && exploreBtn.getAttribute('href') && exploreBtn.getAttribute('href').includes('detail.html')) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();

      const card = exploreBtn.closest('.package-card, .destination-card, .hotel-card, .cruise-card, .experience-card, .map-dest-card');
      let title = exploreBtn.dataset.title || exploreBtn.dataset.dest || '';
      let type = exploreBtn.dataset.type || 'destination';
      let id = exploreBtn.dataset.id || title;

      if (!title && card) {
        const titleEl = card.querySelector('.package-title, .destination-name, .hotel-name, .cruise-name, .experience-title');
        if (titleEl) title = titleEl.textContent.trim();
      }

      VentouraEnquiry.openDetailPage({ id: id || title, title: title || 'Travel Experience' }, type);
    }
  });

  // Expose globally
  window.VentouraEnquiry = VentouraEnquiry;
  window.openBookingModal = function (item, type) {
    VentouraEnquiry.openBookingModal(item, type);
  };
  window.openEnquiryModal = function (item, type) {
    VentouraEnquiry.openEnquiryModal(item, type);
  };

  // Auto-init DOM on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      VentouraEnquiry.ensureModalDOM();
    });
  } else {
    VentouraEnquiry.ensureModalDOM();
  }
})();

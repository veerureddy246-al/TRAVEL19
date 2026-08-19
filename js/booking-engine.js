/* ============================================================
   BOOKING-ENGINE.JS — Core Booking State, Seat/Room Selectors & Coupons
   ============================================================ */

(function () {
  'use strict';

  window.BookingEngine = {
    // Current Active Booking Draft State
    draft: {
      id: 'WL-' + Math.floor(100000 + Math.random() * 900000),
      title: 'Maldives Overwater Paradise — 7 Days',
      destination: 'Maldives',
      basePrice: 249900,
      travelersCount: 2,
      roomType: 'Deluxe Overwater Suite',
      roomUpgrade: 25000,
      selectedSeats: ['12A', '12B'],
      extras: {
        insurance: 4900,
        transfer: 6500,
        baggage: 3500,
        guide: 0
      },
      couponCode: null,
      couponDiscount: 0,
      giftCardCode: null,
      giftCardDiscount: 0,
      travelers: [
        { title: 'Mr.', first: 'John', last: 'Doe', email: 'john@example.com', phone: '+1 555 0192', passport: 'A98241928' },
        { title: 'Mrs.', first: 'Jane', last: 'Doe', email: 'jane@example.com', phone: '+1 555 0193', passport: 'A98241929' }
      ],
      emergencyContact: { name: 'Robert Doe', relation: 'Brother', phone: '+1 555 9944' },
      paymentMethod: 'Credit Card',
      image: 'assets/images/dest-maldives.jpg',
      duration: '7 Days / 6 Nights'
    },

    // Sync selected trip from URL parameter, cart, or localStorage
    loadSelectedTripFromStorage: function () {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const itemParam = urlParams.get('item') || urlParams.get('pkg') || urlParams.get('dest');

        if (itemParam && window.VentouraDatabase) {
          const pkg = window.VentouraDatabase.getPackage(itemParam);
          if (pkg) {
            this.draft.packageKey = pkg.id;
            this.draft.title = pkg.title;
            this.draft.destination = pkg.location || pkg.country;
            this.draft.basePrice = pkg.basePrice < 10000 ? pkg.basePrice * 100 : pkg.basePrice;
            this.draft.image = pkg.image;
            this.draft.duration = pkg.duration;
            this.draft.daysCount = pkg.daysCount;
            if (pkg.hotel) this.draft.roomType = pkg.hotel.roomType || this.draft.roomType;
            return;
          }
        }

        const storedPkg = localStorage.getItem('wanderlux_selected_package');
        if (storedPkg) {
          const pkg = JSON.parse(storedPkg);
          if (pkg && pkg.title) {
            this.draft.packageKey = pkg.id || 'tokyo-6d';
            this.draft.title = pkg.title;
            this.draft.destination = pkg.location || pkg.country;
            const bPrice = pkg.basePrice || 189900;
            this.draft.basePrice = bPrice < 10000 ? bPrice * 100 : bPrice;
            this.draft.image = pkg.image;
            this.draft.duration = pkg.duration;
            this.draft.daysCount = pkg.daysCount;
            return;
          }
        }

        const cart = JSON.parse(localStorage.getItem('wanderlux_cart_v2') || '[]');
        if (cart.length > 0) {
          const item = cart[cart.length - 1];
          this.draft.title = item.title || this.draft.title;
          this.draft.destination = item.location || this.draft.destination;
          let p = parseFloat((item.price || '₹1,29,900').replace(/[^0-9.]/g, '')) || 129900;
          if (p < 10000) p = p * 100;
          this.draft.basePrice = p;
          this.draft.image = item.img || this.draft.image;
        }
      } catch (e) {
        console.error('Error syncing selected trip:', e);
      }
    },

    // Coupons Database
    coupons: {
      'VENTOURA10': { type: 'percent', value: 0.10, label: '10% Off Special (-10%)' },
      'WELCOME15': { type: 'percent', value: 0.15, label: '15% Off Welcome Deal (-15%)' },
      'SUMMER25': { type: 'fixed', value: 25000, label: 'Summer Luxury Deal (-₹25,000)' },
      'EARLYBIRD20': { type: 'percent', value: 0.20, label: '20% Off Early Bird (-20%)' },
      'LUXURY30': { type: 'fixed', value: 30000, label: 'Luxury Escape Discount (-₹30,000)' },
      'SUMMER2026': { type: 'fixed', value: 20000, label: 'Summer Flash Deal (-₹20,000)' },
      'WANDER50': { type: 'fixed', value: 5000, label: 'Welcome Discount (-₹5,000)' }
    },

    // Gift Cards Database
    giftCards: {
      'GIFT-8842': 25000,
      'GIFT-1000': 10000
    },

    // Calculate Total Price Breakdown
    calculateTotal: function () {
      const d = this.draft;
      const subtotal = (d.basePrice * d.travelersCount) + d.roomUpgrade;
      const extrasTotal = d.extras.insurance + d.extras.transfer + d.extras.baggage + d.extras.guide;
      const grossTotal = subtotal + extrasTotal;
      const totalDiscount = d.couponDiscount + d.giftCardDiscount;
      const finalTotal = Math.max(0, grossTotal - totalDiscount);

      return {
        subtotal,
        extrasTotal,
        grossTotal,
        couponDiscount: d.couponDiscount,
        giftCardDiscount: d.giftCardDiscount,
        totalDiscount,
        finalTotal
      };
    },

    // Apply Coupon Code
    applyCoupon: function (code) {
      const formatted = code.trim().toUpperCase();
      const cp = this.coupons[formatted];

      if (!cp) {
        return { success: false, message: 'Invalid coupon code. Try "SUMMER2026" or "WANDER50"' };
      }

      if (cp.type === 'fixed') {
        this.draft.couponDiscount = cp.value;
      } else if (cp.type === 'percent') {
        const sub = this.draft.basePrice * this.draft.travelersCount;
        this.draft.couponDiscount = Math.round(sub * cp.value);
      }

      this.draft.couponCode = formatted;
      return { success: true, message: `Coupon applied: ${cp.label}!`, discount: this.draft.couponDiscount };
    },

    // Apply Gift Card Code
    applyGiftCard: function (code) {
      const formatted = code.trim().toUpperCase();
      const amount = this.giftCards[formatted];

      if (!amount) {
        return { success: false, message: 'Invalid Gift Card. Try "GIFT-8842"' };
      }

      this.draft.giftCardCode = formatted;
      this.draft.giftCardDiscount = amount;
      return { success: true, message: `Gift Card redeemed: -$${amount}!`, discount: amount };
    },

    // Toggle Seat Selection
    toggleSeat: function (seatId) {
      const idx = this.draft.selectedSeats.indexOf(seatId);
      if (idx >= 0) {
        this.draft.selectedSeats.splice(idx, 1);
      } else {
        if (this.draft.selectedSeats.length >= this.draft.travelersCount) {
          this.draft.selectedSeats.shift(); // replace first seat
        }
        this.draft.selectedSeats.push(seatId);
      }
      return this.draft.selectedSeats;
    },

    // Save Booking to LocalStorage & Backend REST API Database
    commitBooking: function () {
      const history = JSON.parse(localStorage.getItem('ta_booking_history') || '[]');
      const breakdown = this.calculateTotal();
      
      const record = {
        ...this.draft,
        bookingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Confirmed',
        totalPaid: breakdown.finalTotal,
        qrCodePayload: `WANDERLUX:${this.draft.id}:${this.draft.destination}:${breakdown.finalTotal}`
      };

      history.unshift(record);
      localStorage.setItem('ta_booking_history', JSON.stringify(history));
      localStorage.setItem('ta_latest_booking', JSON.stringify(record));

      // Synchronize with Fullstack Backend REST API
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: record.title,
          destination: record.destination,
          travelerName: record.travelers && record.travelers[0] ? `${record.travelers[0].first} ${record.travelers[0].last}` : 'Valued Traveler',
          userEmail: record.travelers && record.travelers[0] ? record.travelers[0].email : 'traveler@example.com',
          travelersCount: record.travelersCount,
          roomType: record.roomType,
          selectedSeats: record.selectedSeats,
          totalPaid: record.totalPaid,
          paymentMethod: record.paymentMethod
        })
      }).then(res => res.json())
        .then(data => console.log('[Fullstack Backend] Booking synced with server:', data))
        .catch(err => console.warn('[Backend Sync Fallback Active]:', err));

      return record;
    },

    // Render Pure JS SVG QR Code Generator
    generateSVGQRCode: function (payload) {
      // Clean fallback SVG QR representation
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="120" height="120">
          <rect width="100" height="100" fill="#ffffff" />
          <!-- Corner Position Pattern TL -->
          <rect x="10" y="10" width="25" height="25" fill="#050A18" />
          <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
          <rect x="18" y="18" width="9" height="9" fill="#0EA5E9" />
          
          <!-- Corner Position Pattern TR -->
          <rect x="65" y="10" width="25" height="25" fill="#050A18" />
          <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
          <rect x="73" y="18" width="9" height="9" fill="#0EA5E9" />

          <!-- Corner Position Pattern BL -->
          <rect x="10" y="65" width="25" height="25" fill="#050A18" />
          <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
          <rect x="18" y="73" width="9" height="9" fill="#0EA5E9" />

          <!-- Random Data Dots Simulation -->
          <rect x="42" y="12" width="6" height="6" fill="#050A18" />
          <rect x="52" y="18" width="6" height="6" fill="#050A18" />
          <rect x="42" y="28" width="6" height="6" fill="#7C3AED" />
          <rect x="12" y="42" width="6" height="6" fill="#050A18" />
          <rect x="22" y="48" width="6" height="6" fill="#050A18" />
          <rect x="42" y="42" width="16" height="16" fill="#0EA5E9" />
          <rect x="65" y="42" width="8" height="8" fill="#050A18" />
          <rect x="78" y="52" width="6" height="6" fill="#7C3AED" />
          <rect x="48" y="68" width="8" height="8" fill="#050A18" />
          <rect x="62" y="75" width="12" height="12" fill="#0EA5E9" />
          <rect x="80" y="80" width="10" height="10" fill="#050A18" />
        </svg>
      `;
    }
  };

})();

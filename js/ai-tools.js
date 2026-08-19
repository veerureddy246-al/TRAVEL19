/* ============================================================
   AI TOOLS & INTERACTIVE 3D GLOBE ENGINE — Phase 5
   ============================================================ */

(function () {
  'use strict';

  /* ── Currency Exchange Matrix (Base USD) ── */
  const currencyRates = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 154.5,
    AED: 3.67,
    INR: 83.4,
    AUD: 1.51,
    CAD: 1.36
  };

  /* ── Timezones Matrix (UTC offset in hours) ── */
  const timezoneOffsets = {
    'NYC': { name: 'New York (EDT)', offset: -4, flag: '🇺🇸' },
    'LON': { name: 'London (BST)', offset: +1, flag: '🇬🇧' },
    'PAR': { name: 'Paris (CEST)', offset: +2, flag: '🇫🇷' },
    'DXB': { name: 'Dubai (GST)', offset: +4, flag: '🇦🇪' },
    'TYO': { name: 'Tokyo (JST)', offset: +9, flag: '🇯🇵' },
    'SYD': { name: 'Sydney (AEST)', offset: +10, flag: '🇦🇺' },
    'MLE': { name: 'Maldives (MVT)', offset: +5, flag: '🇲🇻' }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initBudgetPlanner();
    initPackingList();
    initCurrencyConverter();
    initTimezoneConverter();
    init3DGlobe();
  });

  /* ── 1. AI Budget Planner ── */
  function initBudgetPlanner() {
    const calcBtn = document.querySelector('#calc-budget-btn');
    if (calcBtn) {
      calcBtn.addEventListener('click', calculateAIBudget);
    }
  }

  function calculateAIBudget() {
    const dest = document.querySelector('#budget-dest')?.value || 'Maldives';
    const total = parseFloat(document.querySelector('#budget-total')?.value || 3000);
    const style = document.querySelector('#budget-style')?.value || 'Luxury';
    const travelers = parseInt(document.querySelector('#budget-travelers')?.value || 2);

    let flightPct = 0.35, hotelPct = 0.35, foodPct = 0.15, actPct = 0.10, bufferPct = 0.05;

    if (style === 'Budget') {
      flightPct = 0.40; hotelPct = 0.25; foodPct = 0.20; actPct = 0.10; bufferPct = 0.05;
    } else if (style === 'Luxury') {
      flightPct = 0.30; hotelPct = 0.45; foodPct = 0.12; actPct = 0.08; bufferPct = 0.05;
    }

    const perPerson = total / travelers;
    const flights = Math.round(total * flightPct);
    const hotel = Math.round(total * hotelPct);
    const food = Math.round(total * foodPct);
    const activities = Math.round(total * actPct);
    const buffer = Math.round(total * bufferPct);

    const container = document.querySelector('#budget-results-container');
    if (container) {
      container.innerHTML = `
        <div class="glass-card" style="padding:24px;margin-top:20px;animation:fadeInUp 0.3s ease">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap">
            <div>
              <h3 style="font-size:18px;font-weight:800;color:var(--text-primary)">🤖 AI Budget Plan for ${dest}</h3>
              <div style="font-size:13px;color:var(--text-muted)">Style: ${style} · ${travelers} Traveler(s) · Total: $${total.toLocaleString()} ($${perPerson.toLocaleString()}/person)</div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="exportBudgetPDF()">📄 Save Budget PDF</button>
          </div>
          <div class="budget-breakdown-grid">
            <div class="budget-cat-card">
              <div class="cat-icon">✈️</div>
              <div style="font-size:12px;color:var(--text-muted)">Flights</div>
              <div class="cat-amount">$${flights.toLocaleString()}</div>
              <div class="cat-pct">${Math.round(flightPct * 100)}%</div>
            </div>
            <div class="budget-cat-card">
              <div class="cat-icon">🏨</div>
              <div style="font-size:12px;color:var(--text-muted)">Accommodation</div>
              <div class="cat-amount">$${hotel.toLocaleString()}</div>
              <div class="cat-pct">${Math.round(hotelPct * 100)}%</div>
            </div>
            <div class="budget-cat-card">
              <div class="cat-icon">🍽️</div>
              <div style="font-size:12px;color:var(--text-muted)">Dining & Food</div>
              <div class="cat-amount">$${food.toLocaleString()}</div>
              <div class="cat-pct">${Math.round(foodPct * 100)}%</div>
            </div>
            <div class="budget-cat-card">
              <div class="cat-icon">🎟️</div>
              <div style="font-size:12px;color:var(--text-muted)">Tours & Activities</div>
              <div class="cat-amount">$${activities.toLocaleString()}</div>
              <div class="cat-pct">${Math.round(actPct * 100)}%</div>
            </div>
            <div class="budget-cat-card">
              <div class="cat-icon">🛡️</div>
              <div style="font-size:12px;color:var(--text-muted)">Buffer & Emergency</div>
              <div class="cat-amount">$${buffer.toLocaleString()}</div>
              <div class="cat-pct">${Math.round(bufferPct * 100)}%</div>
            </div>
          </div>
        </div>
      `;
    }
    if (window.showToast) window.showToast('AI Budget generated successfully!', '🤖');
  }

  window.exportBudgetPDF = function () {
    window.print();
  };

  /* ── 2. AI Packing List Generator ── */
  function initPackingList() {
    const packBtn = document.querySelector('#generate-packing-btn');
    if (packBtn) {
      packBtn.addEventListener('click', generatePackingList);
    }
  }

  function generatePackingList() {
    const climate = document.querySelector('#packing-climate')?.value || 'Tropical';
    const duration = parseInt(document.querySelector('#packing-days')?.value || 7);
    const type = document.querySelector('#packing-type')?.value || 'Beach';

    let items = [
      'Passports, Visas & Booking Vouchers',
      'Universal Travel Power Adapter',
      'Personal Medication & First Aid Kit',
      'Powerbank (10,000mAh+)',
      'Noise-Canceling Headphones'
    ];

    if (climate === 'Tropical' || type === 'Beach') {
      items.push(
        'Reef-Safe SPF50+ Sunscreen',
        'Polarized UV Sunglasses',
        'Swimwear (2-3 sets)',
        'Breathable Linen Shorts/Shirts',
        'Quick-Dry Microfiber Beach Towel',
        'Waterproof Phone Pouch'
      );
    } else if (climate === 'Cold' || climate === 'Snow') {
      items.push(
        'Thermal Underwear Base Layers',
        'Waterproof Insulated Winter Jacket',
        'Fleece-Lined Gloves & Beanie',
        'Waterproof Snow Boots',
        'Lip Balm with SPF & Moisturizer'
      );
    } else {
      items.push(
        'Comfortable Walking Sneakers',
        'Light Rain Jacket / Windbreaker',
        'Casual Day Pack Backpack',
        'Reusable Insulated Water Bottle'
      );
    }

    const container = document.querySelector('#packing-results-container');
    if (container) {
      container.innerHTML = `
        <div class="glass-card" style="padding:24px;margin-top:20px;animation:fadeInUp 0.3s ease">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap">
            <h3 style="font-size:18px;font-weight:800;color:var(--text-primary)">🎒 AI Packing List (${climate} · ${duration} Days)</h3>
            <button class="btn btn-ghost btn-sm" onclick="window.print()">🖨️ Print Checklist</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${items.map((item, idx) => `
              <label class="packing-item-row" id="pack-item-${idx}">
                <input type="checkbox" class="packing-checkbox" onchange="document.getElementById('pack-item-${idx}')?.classList.toggle('checked', this.checked)" />
                <span style="font-size:13px;color:var(--text-primary)">${item}</span>
              </label>
            `).join('')}
          </div>
        </div>
      `;
    }
    if (window.showToast) window.showToast('AI Packing List generated!', '🎒');
  }

  /* ── 3. Live Currency Converter ── */
  function initCurrencyConverter() {
    const inputAmount = document.querySelector('#curr-amount');
    const fromSelect = document.querySelector('#curr-from');
    const toSelect = document.querySelector('#curr-to');

    if (inputAmount && fromSelect && toSelect) {
      const updateCurrency = () => {
        const amt = parseFloat(inputAmount.value) || 0;
        const fromRate = currencyRates[fromSelect.value] || 1;
        const toRate = currencyRates[toSelect.value] || 1;
        const result = (amt / fromRate) * toRate;

        const resultEl = document.querySelector('#curr-result-val');
        if (resultEl) {
          resultEl.textContent = `${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toSelect.value}`;
        }
      };

      inputAmount.addEventListener('input', updateCurrency);
      fromSelect.addEventListener('change', updateCurrency);
      toSelect.addEventListener('change', updateCurrency);
      updateCurrency();
    }
  }

  /* ── 4. Time Zone Converter ── */
  function initTimezoneConverter() {
    const container = document.querySelector('#timezone-grid');
    if (!container) return;

    function updateTimes() {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMins = now.getUTCMinutes();

      container.innerHTML = Object.keys(timezoneOffsets).map(code => {
        const tz = timezoneOffsets[code];
        let localH = (utcHours + tz.offset + 24) % 24;
        const ampm = localH >= 12 ? 'PM' : 'AM';
        const displayH = (localH % 12) || 12;
        const displayM = String(utcMins).padStart(2, '0');

        return `
          <div class="glass-card" style="padding:16px;text-align:center">
            <div style="font-size:24px;margin-bottom:4px">${tz.flag}</div>
            <div style="font-size:12px;font-weight:700;color:var(--text-muted)">${tz.name}</div>
            <div style="font-size:22px;font-weight:900;color:var(--primary-light);margin-top:6px">${displayH}:${displayM} <small style="font-size:12px;color:var(--text-secondary)">${ampm}</small></div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:2px">UTC ${tz.offset >= 0 ? '+' : ''}${tz.offset}:00</div>
          </div>
        `;
      }).join('');
    }

    updateTimes();
    setInterval(updateTimes, 30000); // update every 30s
  }

  /* ── 5. Interactive 3D Canvas Globe ── */
  function init3DGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rotation = 0;
    let isDragging = false;
    let previousMouseX = 0;

    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
    });
    window.addEventListener('mouseup', () => isDragging = false);
    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const delta = e.clientX - previousMouseX;
        rotation += delta * 0.005;
        previousMouseX = e.clientX;
      }
    });

    // Destination Pin Hotspots
    const hotspots = [
      { name: 'Maldives', lat: 3.2, lon: 73.2, desc: 'Overwater Paradise · 28°C' },
      { name: 'Santorini', lat: 36.3, lon: 25.4, desc: 'Aegean Luxury · 26°C' },
      { name: 'Tokyo', lat: 35.6, lon: 139.6, desc: 'Cherry Blossom Hub · 21°C' },
      { name: 'Bali', lat: -8.4, lon: 115.1, desc: 'Island Culture · 29°C' },
      { name: 'Paris', lat: 48.8, lon: 2.3, desc: 'City of Lights · 22°C' },
      { name: 'New York', lat: 40.7, lon: -74.0, desc: 'Metropolitan Hub · 24°C' }
    ];

    function drawGlobe() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.38;

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.2);
      glow.addColorStop(0, 'rgba(14, 165, 233, 0.2)');
      glow.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Globe sphere
      const sphereGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.1, cx, cy, radius);
      sphereGrad.addColorStop(0, '#0F2552');
      sphereGrad.addColorStop(0.7, '#071126');
      sphereGrad.addColorStop(1, '#030814');
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const r = radius * Math.cos((lat * Math.PI) / 180);
        const y = cy - radius * Math.sin((lat * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(cx, y, r, r * 0.25, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = 0; lon < 180; lon += 30) {
        const rad = ((lon + rotation * 50) * Math.PI) / 180;
        const xOffset = Math.sin(rad) * radius;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xOffset), radius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.stroke();
      }

      // Draw hotspots
      hotspots.forEach(spot => {
        const radLon = ((spot.lon + rotation * 50) * Math.PI) / 180;
        const radLat = (spot.lat * Math.PI) / 180;

        const x = cx + radius * Math.cos(radLat) * Math.sin(radLon);
        const y = cy - radius * Math.sin(radLat);
        const z = radius * Math.cos(radLat) * Math.cos(radLon);

        if (z > 0) { // Front side of globe
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Pulsing halo
          ctx.beginPath();
          ctx.arc(x, y, 10 + Math.sin(Date.now() * 0.005) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Label
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 11px Outfit, sans-serif';
          ctx.fillText(spot.name, x + 10, y + 4);
        }
      });

      if (!isDragging) rotation += 0.002;
      requestAnimationFrame(drawGlobe);
    }

    drawGlobe();
  }

})();

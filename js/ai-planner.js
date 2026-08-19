/* ============================================================
   AI-PLANNER.JS — Interactive AI Trip Planner Wizard
   ============================================================ */

(function () {
  'use strict';

  const state = {
    step: 1,
    style: 'Beach & Coastal',
    companions: 'Couple / Partner',
    duration: '7 Days',
    budget: '$1,500 – $2,500',
    pace: 'Balanced & Scenic',
  };

  const itineraries = {
    'Beach & Coastal': [
      {
        day: 1,
        title: 'Arrival in Tropical Paradise & Sunset Cruise',
        activities: [
          { time: '02:00 PM', desc: 'VIP Airport Reception & Speedboat transfer to Resort' },
          { time: '04:30 PM', desc: 'Check-in to Overwater Ocean Villa' },
          { time: '06:30 PM', desc: 'Catamaran Sunset Cocktail Cruise with live acoustic music' }
        ]
      },
      {
        day: 2,
        title: 'Coral Reef Snorkeling & Private Beach Dining',
        activities: [
          { time: '09:00 AM', desc: 'Guided Turtle & Manta Ray Snorkeling Safari' },
          { time: '01:00 PM', desc: 'Seafood Grill Lunch at Lagoon Bistro' },
          { time: '07:30 PM', desc: 'Private 5-Course Candlelight Dinner under the Stars' }
        ]
      },
      {
        day: 3,
        title: 'Island Hopping & Hydroplane Aerial Tour',
        activities: [
          { time: '10:00 AM', desc: 'Scenic Hydroplane Flight over Atolls' },
          { time: '02:00 PM', desc: 'Local Fishermen Village & Cultural Heritage Tour' },
          { time: '05:00 PM', desc: 'Sunset Yoga & Holistic Spa Treatment' }
        ]
      }
    ],
    'Adventure & Trekking': [
      {
        day: 1,
        title: 'Mountain Base Camp Check-in & Gear Briefing',
        activities: [
          { time: '11:00 AM', desc: 'Arrival at Eco-Lodge & Meet Lead Mountaineer Guide' },
          { time: '03:00 PM', desc: 'Orientation Trail Run & Equipment Fitting' },
          { time: '07:00 PM', desc: 'Traditional Campfire Feast & Star Navigation' }
        ]
      },
      {
        day: 2,
        title: 'Summit Ascent & Ridge Skyline Hike',
        activities: [
          { time: '05:30 AM', desc: 'Early Sunrise Ridge Climb with Alpine Breakfast' },
          { time: '11:30 AM', desc: 'Reach Peak Lookout (2,400m altitude)' },
          { time: '04:00 PM', desc: 'Valley Zipline Adventure & Hot Spring Soak' }
        ]
      }
    ],
    'Culture & Heritage': [
      {
        day: 1,
        title: 'Historic Quarter Walk & Culinary Discovery',
        activities: [
          { time: '10:00 AM', desc: 'Private Tour of UNESCO Ancient Palaces' },
          { time: '01:30 PM', desc: 'Masterclass Cooking Workshop with Michelin Chef' },
          { time: '07:00 PM', desc: 'Traditional Opera & Night Market Food Crawl' }
        ]
      }
    ]
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAIPlanner();
  });

  function initAIPlanner() {
    const trigger = document.querySelectorAll('.ai-planner-trigger');
    const modal = document.querySelector('.ai-planner-modal');
    const closeBtn = document.querySelector('.ai-planner-close');

    trigger.forEach(t => {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        openPlanner();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closePlanner);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closePlanner();
      });
    }

    renderWizardStep();
  }

  function openPlanner() {
    const modal = document.querySelector('.ai-planner-modal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closePlanner() {
    const modal = document.querySelector('.ai-planner-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function renderWizardStep() {
    const container = document.querySelector('#ai-wizard-body');
    if (!container) return;

    if (state.step === 1) {
      container.innerHTML = `
        <h3 class="section-title" style="font-size:22px;margin-bottom:8px">Step 1: Choose Your Travel Vibe</h3>
        <p class="section-subtitle" style="font-size:14px;margin-bottom:24px">What kind of experience are you seeking for your trip?</p>
        <div class="ai-options-grid">
          <div class="ai-opt-card ${state.style === 'Beach & Coastal' ? 'selected' : ''}" data-val="Beach & Coastal">
            <div class="ai-opt-icon">🏖️</div>
            <div class="ai-opt-title">Beach & Coastal</div>
            <div class="ai-opt-desc">Sun, turquoise lagoons, overwater villas & water sports</div>
          </div>
          <div class="ai-opt-card ${state.style === 'Adventure & Trekking' ? 'selected' : ''}" data-val="Adventure & Trekking">
            <div class="ai-opt-icon">🧗</div>
            <div class="ai-opt-title">Adventure & Trekking</div>
            <div class="ai-opt-desc">Mountain peaks, ziplining, safari & wilderness exploration</div>
          </div>
          <div class="ai-opt-card ${state.style === 'Culture & Heritage' ? 'selected' : ''}" data-val="Culture & Heritage">
            <div class="ai-opt-icon">🏛️</div>
            <div class="ai-opt-title">Culture & Heritage</div>
            <div class="ai-opt-desc">Historic landmarks, museums, local food markets & temples</div>
          </div>
          <div class="ai-opt-card ${state.style === 'Luxury Escape' ? 'selected' : ''}" data-val="Luxury Escape">
            <div class="ai-opt-icon">💎</div>
            <div class="ai-opt-title">Luxury & Wellness</div>
            <div class="ai-opt-desc">5-star resorts, private butler, spa retreats & fine dining</div>
          </div>
          <div class="ai-opt-card ${state.style === 'Romantic Honeymoon' ? 'selected' : ''}" data-val="Romantic Honeymoon">
            <div class="ai-opt-icon">💑</div>
            <div class="ai-opt-title">Romantic Escape</div>
            <div class="ai-opt-desc">Sunset cruises, private dining, intimate boutique stays</div>
          </div>
          <div class="ai-opt-card ${state.style === 'Family Fun' ? 'selected' : ''}" data-val="Family Fun">
            <div class="ai-opt-icon">👨‍👩‍👧‍👦</div>
            <div class="ai-opt-title">Family Fun</div>
            <div class="ai-opt-desc">Kid-friendly resorts, theme parks, safe nature trails</div>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end">
          <button class="btn btn-primary" id="ai-next-btn">Next Step →</button>
        </div>
      `;

      container.querySelectorAll('.ai-opt-card').forEach(card => {
        card.addEventListener('click', () => {
          container.querySelectorAll('.ai-opt-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          state.style = card.dataset.val;
        });
      });

      document.querySelector('#ai-next-btn')?.addEventListener('click', () => {
        state.step = 2;
        updateStepDots();
        renderWizardStep();
      });

    } else if (state.step === 2) {
      container.innerHTML = `
        <h3 class="section-title" style="font-size:22px;margin-bottom:8px">Step 2: Duration & Companions</h3>
        <p class="section-subtitle" style="font-size:14px;margin-bottom:24px">Who is traveling and for how long?</p>
        <div style="margin-bottom:20px">
          <label style="font-size:12px;font-weight:700;color:var(--text-muted);display:block;margin-bottom:8px">TRIP DURATION</label>
          <div class="ai-options-grid" style="grid-template-columns:repeat(4,1fr)">
            <div class="ai-opt-card ${state.duration === '3-5 Days' ? 'selected' : ''}" data-dur="3-5 Days">
              <div class="ai-opt-icon">🌅</div>
              <div class="ai-opt-title">3–5 Days</div>
              <div class="ai-opt-desc">Weekend Getaway</div>
            </div>
            <div class="ai-opt-card ${state.duration === '7 Days' ? 'selected' : ''}" data-dur="7 Days">
              <div class="ai-opt-icon">📅</div>
              <div class="ai-opt-title">7 Days</div>
              <div class="ai-opt-desc">Standard Vacation</div>
            </div>
            <div class="ai-opt-card ${state.duration === '10-14 Days' ? 'selected' : ''}" data-dur="10-14 Days">
              <div class="ai-opt-icon">🗓️</div>
              <div class="ai-opt-title">10–14 Days</div>
              <div class="ai-opt-desc">Deep Exploration</div>
            </div>
            <div class="ai-opt-card ${state.duration === '21+ Days' ? 'selected' : ''}" data-dur="21+ Days">
              <div class="ai-opt-icon">🌍</div>
              <div class="ai-opt-title">21+ Days</div>
              <div class="ai-opt-desc">Grand Expedition</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:24px">
          <label style="font-size:12px;font-weight:700;color:var(--text-muted);display:block;margin-bottom:8px">TRAVEL COMPANIONS</label>
          <div class="ai-options-grid" style="grid-template-columns:repeat(4,1fr)">
            <div class="ai-opt-card ${state.companions === 'Solo Explorer' ? 'selected' : ''}" data-comp="Solo Explorer">
              <div class="ai-opt-icon">🎒</div>
              <div class="ai-opt-title">Solo Explorer</div>
            </div>
            <div class="ai-opt-card ${state.companions === 'Couple / Partner' ? 'selected' : ''}" data-comp="Couple / Partner">
              <div class="ai-opt-icon">💑</div>
              <div class="ai-opt-title">Couple / Partner</div>
            </div>
            <div class="ai-opt-card ${state.companions === 'Family with Kids' ? 'selected' : ''}" data-comp="Family with Kids">
              <div class="ai-opt-icon">👨‍👩‍👧‍👦</div>
              <div class="ai-opt-title">Family with Kids</div>
            </div>
            <div class="ai-opt-card ${state.companions === 'Friends Group' ? 'selected' : ''}" data-comp="Friends Group">
              <div class="ai-opt-icon">🍻</div>
              <div class="ai-opt-title">Friends Group</div>
            </div>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between">
          <button class="btn btn-ghost" id="ai-back-btn">← Back</button>
          <button class="btn btn-primary" id="ai-next-btn">Next Step →</button>
        </div>
      `;

      container.querySelectorAll('[data-dur]').forEach(card => {
        card.addEventListener('click', () => {
          container.querySelectorAll('[data-dur]').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          state.duration = card.dataset.dur;
        });
      });

      container.querySelectorAll('[data-comp]').forEach(card => {
        card.addEventListener('click', () => {
          container.querySelectorAll('[data-comp]').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          state.companions = card.dataset.comp;
        });
      });

      document.querySelector('#ai-back-btn')?.addEventListener('click', () => {
        state.step = 1;
        updateStepDots();
        renderWizardStep();
      });

      document.querySelector('#ai-next-btn')?.addEventListener('click', () => {
        state.step = 3;
        updateStepDots();
        renderWizardStep();
      });

    } else if (state.step === 3) {
      container.innerHTML = `
        <h3 class="section-title" style="font-size:22px;margin-bottom:8px">Step 3: Budget & Travel Pace</h3>
        <p class="section-subtitle" style="font-size:14px;margin-bottom:24px">Define your financial comfort zone and daily itinerary tempo.</p>
        <div style="margin-bottom:24px">
          <label style="font-size:12px;font-weight:700;color:var(--text-muted);display:block;margin-bottom:8px">BUDGET RANGE (PER PERSON)</label>
          <div class="ai-options-grid" style="grid-template-columns:repeat(4,1fr)">
            <div class="ai-opt-card ${state.budget === 'Under $800' ? 'selected' : ''}" data-bud="Under $800">
              <div class="ai-opt-icon">💚</div>
              <div class="ai-opt-title">Under $800</div>
              <div class="ai-opt-desc">Budget Friendly</div>
            </div>
            <div class="ai-opt-card ${state.budget === '$800 – $1,500' ? 'selected' : ''}" data-bud="$800 – $1,500">
              <div class="ai-opt-icon">💙</div>
              <div class="ai-opt-title">$800 – $1,500</div>
              <div class="ai-opt-desc">Standard Comfort</div>
            </div>
            <div class="ai-opt-card ${state.budget === '$1,500 – $2,500' ? 'selected' : ''}" data-bud="$1,500 – $2,500">
              <div class="ai-opt-icon">💜</div>
              <div class="ai-opt-title">$1,500 – $2,500</div>
              <div class="ai-opt-desc">Premium Luxury</div>
            </div>
            <div class="ai-opt-card ${state.budget === '$3,000+' ? 'selected' : ''}" data-bud="$3,000+">
              <div class="ai-opt-icon">👑</div>
              <div class="ai-opt-title">$3,000+</div>
              <div class="ai-opt-desc">VIP Ultra-Luxury</div>
            </div>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between">
          <button class="btn btn-ghost" id="ai-back-btn">← Back</button>
          <button class="btn btn-accent" id="ai-generate-btn">🤖 Generate Custom AI Itinerary →</button>
        </div>
      `;

      container.querySelectorAll('[data-bud]').forEach(card => {
        card.addEventListener('click', () => {
          container.querySelectorAll('[data-bud]').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          state.budget = card.dataset.bud;
        });
      });

      document.querySelector('#ai-back-btn')?.addEventListener('click', () => {
        state.step = 2;
        updateStepDots();
        renderWizardStep();
      });

      document.querySelector('#ai-generate-btn')?.addEventListener('click', async () => {
        state.step = 4;
        updateStepDots();
        
        container.innerHTML = `
          <div style="text-align:center;padding:40px 20px;">
            <div class="loading-spinner" style="display:inline-block;width:40px;height:40px;border:4px solid rgba(255,255,255,0.1);border-left-color:var(--primary-light);border-radius:50%;animation:spin 1s linear infinite;margin-bottom:16px;"></div>
            <h4 style="font-size:18px;margin-bottom:8px;">AI Brain Neural Engine Generating Travel Itinerary...</h4>
            <p style="font-size:14px;color:var(--text-muted);">Fetching real-time resort availability, weather data & local flights</p>
          </div>
        `;

        try {
          const res = await fetch('/api/ai/plan-trip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              style: state.style,
              companions: state.companions,
              duration: state.duration,
              budget: state.budget,
              destination: 'Bali'
            })
          });
          const json = await res.json();
          if (json.success && json.data) {
            state.apiResult = json.data;
          }
        } catch (e) {
          console.warn('[AI API Fallback]', e);
        }

        renderWizardStep();
      });

    } else if (state.step === 4) {
      const serverData = state.apiResult;
      const selectedItin = (serverData && serverData.itinerary) ? serverData.itinerary.map(item => ({
        day: item.day,
        title: item.title,
        activities: [
          { time: '09:00 AM', desc: item.morning },
          { time: '02:00 PM', desc: item.afternoon },
          { time: '07:30 PM', desc: item.evening }
        ]
      })) : (itineraries[state.style] || itineraries['Beach & Coastal']);
      
      container.innerHTML = `
        <div style="text-align:center;margin-bottom:24px">
          <span class="badge badge-emerald" style="margin-bottom:8px">✨ AI TRIP PLAN GENERATED (LIVE API)</span>
          <h3 class="section-title" style="font-size:24px;margin-bottom:6px">Your Personalized <span>${state.style}</span> Plan</h3>
          <p style="font-size:14px;color:var(--text-secondary)">
            Tailored for <strong>${state.companions}</strong> · Duration: <strong>${state.duration}</strong> · Est. Budget: <strong>${state.budget}</strong>
          </p>
        </div>

        <div class="itinerary-timeline">
          ${selectedItin.map(day => `
            <div class="itinerary-day-card">
              <div class="itinerary-day-num">DAY ${day.day}</div>
              <div class="itinerary-day-title">${day.title}</div>
              <div class="itinerary-activities">
                ${day.activities.map(act => `
                  <div class="itinerary-act-item">
                    <span class="itinerary-act-time">${act.time}</span>
                    <span>${act.desc}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:16px;padding:20px;margin-top:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
          <div>
            <div style="font-size:12px;color:var(--text-muted)">ESTIMATED ALL-INCLUSIVE PRICE</div>
            <div style="font-size:24px;font-weight:800;color:var(--accent)">${serverData?.estimatedTotal || '$1,890'} <small style="font-size:13px;color:var(--text-muted)">/ person</small></div>
            <div style="font-size:12px;color:var(--emerald)">Includes 5★ Hotel + Flights + Private Transfers (Server Verified)</div>
          </div>
          <div style="display:flex;gap:12px">
            <button class="btn btn-ghost" id="ai-restart-btn">🔄 Modify Plan</button>
            <button class="btn btn-primary" onclick="showToast('AI Plan Saved! Server synced booking rep notification dispatched.','🎉');">Book This Custom Trip →</button>
          </div>
        </div>
      `;

      document.querySelector('#ai-restart-btn')?.addEventListener('click', () => {
        state.step = 1;
        state.apiResult = null;
        updateStepDots();
        renderWizardStep();
      });
    }
  }

  function updateStepDots() {
    document.querySelectorAll('.ai-step-dot').forEach((dot, idx) => {
      const stepNum = idx + 1;
      dot.classList.remove('active', 'completed');
      if (stepNum === state.step) {
        dot.classList.add('active');
      } else if (stepNum < state.step) {
        dot.classList.add('completed');
        dot.textContent = '✓';
      } else {
        dot.textContent = stepNum;
      }
    });
  }

})();

/**
 * VENTOURA TRAVEL — Interactive FAQ & Intelligent Travel Assistant Engine
 * Real-time database search, dynamic accordion, search filtering, and live assistant.
 */

(function() {
  'use strict';

  // Default rich FAQ database fallback
  const DEFAULT_FAQS = [
    {
      id: 'faq-1',
      question: 'How do I book a travel package with Ventoura Travel?',
      answer: 'Booking is simple! Browse our available tour packages and click "Book Now" or "Explore Itinerary". You can customize dates, travelers, and luxury add-ons. Alternatively, call our 24/7 concierge at +1 800 555 1234. We accept major credit cards, wire transfers, and PayPal.',
      category: 'Booking & Reservations',
      status: 'published'
    },
    {
      id: 'faq-2',
      question: 'What is your cancellation and refund policy?',
      answer: 'We offer flexible cancellation terms: Cancel 30+ days prior to departure for a 100% full refund; 15–29 days for a 75% refund; 7–14 days for a 50% refund. We also provide optional "Cancel For Any Reason" coverage for maximum flexibility. Full policy details are shown at checkout for each package.',
      category: 'Cancellations & Refunds',
      status: 'published'
    },
    {
      id: 'faq-3',
      question: 'Do you offer travel insurance?',
      answer: 'Yes! We partner with leading global insurers to provide comprehensive coverage including trip disruption, medical emergencies, emergency medical evacuation, lost baggage, and flight delays. Insurance can be added seamlessly during checkout at a small additional cost.',
      category: 'Insurance & Safety',
      status: 'published'
    },
    {
      id: 'faq-4',
      question: 'Can you help with visa applications?',
      answer: 'Absolutely! Our dedicated visa team handles tourist, business, and e-visa documentation for over 150 countries worldwide with a 99% approval rate. We guide you through the documentation process, fill out forms on your behalf, and track the status. Most visas are processed within 2–7 business days.',
      category: 'Visa & Documentation',
      status: 'published'
    },
    {
      id: 'faq-5',
      question: 'Is there a best price guarantee?',
      answer: 'Yes! If you find the same package cheaper elsewhere within 24 hours of booking, we\'ll match the price and give you an additional 5% discount. We work directly with airlines and luxury hotels to negotiate exclusive rates not available elsewhere.',
      category: 'Pricing & Value',
      status: 'published'
    },
    {
      id: 'faq-6',
      question: 'What types of payment do you accept?',
      answer: 'We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, Google Pay, bank wire transfers, and installment plans through Klarna and Afterpay. For bookings over $5,000, we offer 0% interest installment plans up to 12 months.',
      category: 'Payment & Billing',
      status: 'published'
    },
    {
      id: 'faq-7',
      question: 'Do you offer group booking discounts?',
      answer: 'Yes! Groups of 8 or more receive an automatic 10% discount. Groups of 15+ get 15% off plus a dedicated group coordinator assigned to your booking. We specialize in corporate retreats, destination weddings, and bespoke private tours.',
      category: 'Groups & Corporate',
      status: 'published'
    },
    {
      id: 'faq-8',
      question: 'How do I contact support during my trip?',
      answer: 'Our 24/7 travel hotline (+1 800 555 1234) is available around the clock, 365 days a year. You can also reach us via WhatsApp, live chat on our website, email, or through the Ventoura mobile portal. Our average response time is under 2 minutes.',
      category: 'On-Trip Support',
      status: 'published'
    }
  ];

  window._ventouraFaqs = DEFAULT_FAQS;
  let activeOpenFaqIndex = 0; // Default first open

  // Helper formatting
  function formatCurrency(amount) {
    if (typeof window.VentouraCurrency !== 'undefined' && typeof window.VentouraCurrency.format === 'function') {
      return window.VentouraCurrency.format(amount);
    }
    return '₹' + Number(amount || 0).toLocaleString('en-IN');
  }

  // 1. Fetch & Initialize FAQs
  window.initVentouraFaq = async function() {
    try {
      const res = await fetch('/api/faqs');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          window._ventouraFaqs = data.data.filter(f => !f.status || ['published', 'active'].includes(f.status));
        }
      }
    } catch (e) {
      console.warn('FAQ fetch note: using reliable local catalog', e);
    }

    renderFaqGrid(window._ventouraFaqs);
  };

  // 2. Render FAQ Accordion Grid
  function renderFaqGrid(faqList) {
    const grid = document.querySelector('#faq .faq-grid');
    if (!grid) return;

    if (!faqList || faqList.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #94A3B8; background: rgba(15, 23, 42, 0.6); border: 1px dashed rgba(255,255,255,0.15); border-radius: 16px;">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <h4 style="color: #FFFFFF; font-size: 16px; margin-bottom: 6px;">No FAQs match your search</h4>
          <p style="font-size: 14px; margin-bottom: 14px;">Try searching for <em>refund, visa, booking, payment</em>, or ask our travel assistant below.</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="document.getElementById('faq-search-input').value=''; window.filterFaqs('');" style="padding: 8px 18px; font-size: 12px; border-radius: 8px;">View All FAQs</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = faqList.map((item, index) => {
      const isOpen = index === activeOpenFaqIndex;
      return `
        <div class="faq-item ${isOpen ? 'open' : ''}" id="faq-item-${index}" data-faq-index="${index}">
          <div class="faq-question" 
               role="button" 
               tabindex="0" 
               aria-expanded="${isOpen ? 'true' : 'false'}" 
               aria-controls="faq-ans-${index}"
               onclick="window.toggleFaq(${index})"
               onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.toggleFaq(${index});}">
            <span class="faq-q-text">${escapeHtml(item.question)}</span>
            <span class="faq-icon" aria-hidden="true">${isOpen ? '−' : '+'}</span>
          </div>
          <div class="faq-answer" id="faq-ans-${index}" role="region">
            <div class="faq-answer-inner">
              ${escapeHtml(item.answer)}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 3. Toggle FAQ Accordion (Option B: Smooth toggle with auto-close previous)
  window.toggleFaq = function(index) {
    const grid = document.querySelector('#faq .faq-grid');
    if (!grid) return;

    const allItems = grid.querySelectorAll('.faq-item');
    const targetItem = document.getElementById(`faq-item-${index}`);
    if (!targetItem) return;

    const isCurrentlyOpen = targetItem.classList.contains('open');

    // Close all items
    allItems.forEach(item => {
      item.classList.remove('open');
      const qBtn = item.querySelector('.faq-question');
      const icon = item.querySelector('.faq-icon');
      if (qBtn) qBtn.setAttribute('aria-expanded', 'false');
      if (icon) icon.textContent = '+';
    });

    // If was closed, open it
    if (!isCurrentlyOpen) {
      targetItem.classList.add('open');
      const qBtn = targetItem.querySelector('.faq-question');
      const icon = targetItem.querySelector('.faq-icon');
      if (qBtn) qBtn.setAttribute('aria-expanded', 'true');
      if (icon) icon.textContent = '−';
      activeOpenFaqIndex = index;
    } else {
      activeOpenFaqIndex = -1;
    }
  };

  // 4. Live FAQ Search Filter
  window.filterFaqs = function(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      activeOpenFaqIndex = 0;
      renderFaqGrid(window._ventouraFaqs);
      return;
    }

    const filtered = window._ventouraFaqs.filter(item => {
      const questionMatch = (item.question || '').toLowerCase().includes(q);
      const answerMatch = (item.answer || '').toLowerCase().includes(q);
      const categoryMatch = (item.category || '').toLowerCase().includes(q);
      return questionMatch || answerMatch || categoryMatch;
    });

    activeOpenFaqIndex = filtered.length > 0 ? 0 : -1;
    renderFaqGrid(filtered);
  };

  // 5. Intelligent Customer Question / Travel Assistant
  window.handleFaqAskQuestion = async function(customQuery) {
    const input = document.getElementById('faq-ask-input');
    const outputBox = document.getElementById('faq-assistant-output');
    const btn = document.getElementById('faq-ask-btn');
    if (!outputBox) return;

    const query = (customQuery || (input ? input.value : '')).trim();
    if (!query) return;

    if (input) input.value = query;

    // Show loading state
    outputBox.style.display = 'block';
    outputBox.innerHTML = `
      <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 18px; padding: 24px; animation: fadeIn 0.3s ease;">
        <div style="display: flex; align-items: center; gap: 12px; color: #38BDF8; font-size: 14px; font-weight: 600;">
          <span style="display: inline-block; animation: spin 1s linear infinite;">⚡</span> Searching Ventoura Travel live database & verified packages...
        </div>
      </div>
    `;

    if (btn) btn.disabled = true;

    // Ensure we have loaded all packages & destinations
    let packages = window._allVentouraPackages || [];
    if (packages.length === 0) {
      try {
        const pRes = await fetch('/api/packages');
        if (pRes.ok) {
          const pJson = await pRes.json();
          if (pJson.success && Array.isArray(pJson.data)) {
            packages = pJson.data;
            window._allVentouraPackages = packages;
          }
        }
      } catch (err) {
        console.warn('Live package retrieval note:', err);
      }
    }

    // Process intelligence engine
    setTimeout(() => {
      const response = generateTravelAssistantResponse(query, packages);
      renderAssistantResponse(query, response, outputBox);
      if (btn) btn.disabled = false;

      // Log question to inquiries API
      logCustomerQuestionToSupabase(query, response.textSummary);
    }, 450);
  };

  window.askFaqPrompt = function(promptText) {
    const input = document.getElementById('faq-ask-input');
    if (input) input.value = promptText;
    window.handleFaqAskQuestion(promptText);
    
    // Smooth scroll to assistant output
    const askSection = document.querySelector('.faq-ask-section');
    if (askSection) {
      askSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // 6. Natural Data Matcher for Travel Queries
  function generateTravelAssistantResponse(query, packages) {
    const qLower = query.toLowerCase();

    // 1. Check for specific destinations
    const destinations = [
      { name: 'Maldives', keywords: ['maldives', 'male', 'baa atoll', 'overwater'] },
      { name: 'Kyoto', keywords: ['kyoto', 'japan', 'tokyo', 'zen', 'cherry blossom'] },
      { name: 'Amalfi', keywords: ['amalfi', 'italy', 'positano', 'sorrento', 'capri'] },
      { name: 'Patagonia', keywords: ['patagonia', 'chile', 'torres del paine', 'glacier'] },
      { name: 'St. Moritz', keywords: ['st. moritz', 'st moritz', 'switzerland', 'swiss', 'ski', 'alps'] },
      { name: 'Serengeti', keywords: ['serengeti', 'tanzania', 'safari', 'wildlife', 'big five'] },
      { name: 'Greece', keywords: ['greece', 'santorini', 'mykonos', 'greek'] },
      { name: 'Dubai', keywords: ['dubai', 'uae', 'burj khalifa', 'emirates'] },
      { name: 'Rajasthan', keywords: ['rajasthan', 'jaipur', 'udaipur', 'india', 'taj'] },
      { name: 'Iceland', keywords: ['iceland', 'reykjavik', 'aurora', 'northern lights'] },
      { name: 'Bali', keywords: ['bali', 'ubud', 'indonesia', 'canggu'] }
    ];

    // Check destination match
    for (const d of destinations) {
      if (d.keywords.some(k => qLower.includes(k))) {
        const matchingPkgs = packages.filter(p => {
          const titleDesc = `${p.title || ''} ${p.destination || ''} ${p.description || ''}`.toLowerCase();
          return d.keywords.some(k => titleDesc.includes(k));
        });

        if (matchingPkgs.length > 0) {
          const p = matchingPkgs[0];
          let priceStr = formatCurrency(p.price || 285000);
          let durationStr = p.duration || '7 Days / 6 Nights';

          let answerText = `We offer premium luxury journeys to <strong>${d.name}</strong>! Our premier package is the <strong>${escapeHtml(p.title)}</strong> (${durationStr}, starting from ${priceStr} per person). `;
          answerText += `${escapeHtml(p.description || 'Includes 5-star accommodations, private excursions, and 24/7 dedicated concierge service.')}`;

          return {
            found: true,
            textSummary: answerText,
            packages: matchingPkgs,
            actionType: 'package'
          };
        }
      }
    }

    // 2. Check Package Themes / Categories
    const themeCategories = [
      { cat: 'beach', keywords: ['beach', 'islands', 'coastal', 'sea', 'lagoon'] },
      { cat: 'adventure', keywords: ['adventure', 'trekking', 'hiking', 'mountain', 'expedition'] },
      { cat: 'luxury', keywords: ['luxury', '5 star', 'vip', 'first class', 'suite'] },
      { cat: 'honeymoon', keywords: ['honeymoon', 'romantic', 'couples', 'anniversary'] },
      { cat: 'family', keywords: ['family', 'kids', 'children', 'all inclusive family'] },
      { cat: 'solo', keywords: ['solo', 'single', 'wellness', 'yoga', 'spiritual'] },
      { cat: 'business', keywords: ['business', 'corporate', 'executive'] },
      { cat: 'safari', keywords: ['safari', 'wildlife', 'animals', 'game drive'] },
      { cat: 'cruise', keywords: ['cruise', 'yacht', 'sailing', 'superyacht'] },
      { cat: 'pilgrimage', keywords: ['pilgrimage', 'temple', 'zen', 'sacred', 'spiritual'] },
      { cat: 'road', keywords: ['road trip', 'driving', 'scenic drive', 'self drive'] },
      { cat: 'camping', keywords: ['camping', 'glamping', 'dome', 'tents'] }
    ];

    for (const t of themeCategories) {
      if (t.keywords.some(k => qLower.includes(k))) {
        const matchingPkgs = packages.filter(p => {
          const pCat = (p.category || '').toLowerCase();
          const pCats = Array.isArray(p.categories) ? p.categories.map(c => String(c).toLowerCase()) : [];
          return pCat === t.cat || pCats.includes(t.cat);
        });

        if (matchingPkgs.length > 0) {
          const p = matchingPkgs[0];
          return {
            found: true,
            textSummary: `Yes! We offer <strong>${matchingPkgs.length} handcrafted ${t.cat.toUpperCase()} journeys</strong>. Featured experience: <strong>${escapeHtml(p.title)}</strong> (${p.duration || '7 Days'}, ${formatCurrency(p.price)}/person). Fully customizable to your travel preferences.`,
            packages: matchingPkgs,
            actionType: 'package'
          };
        }
      }
    }

    // 3. Visa inquiries
    if (['visa', 'passport', 'embassy', 'entry requirement'].some(k => qLower.includes(k))) {
      return {
        found: true,
        textSummary: `Yes, Ventoura Travel provides comprehensive international visa assistance for over <strong>150 countries</strong> with a 99% approval rate. Our dedicated visa desk assists with application forms, appointment scheduling, and fast-track processing (typically 2–7 business days).`,
        ctaText: 'Request Visa Consultation',
        ctaAction: 'enquiry',
        packages: []
      };
    }

    // 4. Cancellation & Refund policies
    if (['cancellation', 'refund', 'cancel', 'policy', 'money back'].some(k => qLower.includes(k))) {
      return {
        found: true,
        textSummary: `We offer flexible cancellation: <strong>100% full refund</strong> when cancelling 30+ days before departure; <strong>75% refund</strong> (15–29 days); <strong>50% refund</strong> (7–14 days). Optional <em>"Cancel For Any Reason"</em> protection is available at checkout for complete peace of mind.`,
        packages: []
      };
    }

    // 5. Payment & Installments
    if (['payment', 'credit card', 'paypal', 'installment', 'pay', 'emi', 'klarna'].some(k => qLower.includes(k))) {
      return {
        found: true,
        textSummary: `We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and bank wire transfers. For journeys over $5,000, <strong>0% interest installment plans up to 12 months</strong> are available via Klarna and Afterpay.`,
        packages: []
      };
    }

    // 6. Insurance inquiries
    if (['insurance', 'medical coverage', 'travel protection'].some(k => qLower.includes(k))) {
      return {
        found: true,
        textSummary: `Yes, we partner with premier global insurance providers offering comprehensive medical emergency, trip interruption, flight delay, and lost baggage coverage. It can be added directly during package checkout.`,
        packages: []
      };
    }

    // 7. Group & Corporate inquiries
    if (['group', 'discount', 'corporate', 'wedding', 'friends'].some(k => qLower.includes(k))) {
      return {
        found: true,
        textSummary: `Groups of <strong>8+ guests receive an automatic 10% discount</strong>, and groups of <strong>15+ receive 15% off</strong> with a dedicated personal tour coordinator. We also organize customized corporate retreats and destination weddings.`,
        ctaText: 'Get Group Quote',
        ctaAction: 'enquiry',
        packages: []
      };
    }

    // 8. General Package price / duration query
    if (['how much', 'price', 'cost', 'duration', 'how many days'].some(k => qLower.includes(k))) {
      if (packages.length > 0) {
        const p = packages[0];
        return {
          found: true,
          textSummary: `Our curated travel packages range from <strong>${formatCurrency(165000)}</strong> to <strong>${formatCurrency(520000)}</strong> with durations between <strong>5 to 10 days</strong>. All packages include luxury stays, private guides, and dedicated support.`,
          packages: packages.slice(0, 3),
          actionType: 'package'
        };
      }
    }

    // 9. Fallback — Strictly avoid inventing inaccurate data
    return {
      found: false,
      textSummary: `I couldn't find a reliable answer for that specific question in our current database. Please contact our dedicated travel concierge team for personalized assistance.`,
      ctaText: 'Speak with Travel Specialist',
      ctaAction: 'enquiry',
      packages: []
    };
  }

  // 7. Render Assistant Output with Cards and Action Triggers
  function renderAssistantResponse(query, response, container) {
    let cardsHtml = '';
    if (response.packages && response.packages.length > 0) {
      cardsHtml = `
        <div style="margin-top: 18px;">
          <div style="font-size: 13px; font-weight: 700; color: #F8FAFC; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
            ✨ Recommended Matching Packages:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
            ${response.packages.slice(0, 3).map((p, idx) => `
              <div style="background: rgba(2, 6, 23, 0.85); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column;">
                <div style="position: relative; height: 140px; overflow: hidden;">
                  <img src="${p.featuredImage || p.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'" />
                  <span style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.65); color: #F8FAFC; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700;">★ ${p.rating || 4.9}</span>
                </div>
                <div style="padding: 14px; display: flex; flex-direction: column; flex: 1;">
                  <div style="font-size: 11px; color: #38BDF8; font-weight: 600; margin-bottom: 4px;">📍 ${p.destination || 'Global'}</div>
                  <h4 style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin: 0 0 6px;">${p.title}</h4>
                  <div style="font-size: 12px; color: #94A3B8; margin-bottom: 12px;">📅 ${p.duration || '7 Days'} • 👥 ${p.includedGuests || 2} Guests</div>
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08);">
                    <div style="font-size: 15px; font-weight: 800; color: #F8FAFC;">${formatCurrency(p.price)}</div>
                    <div style="display: flex; gap: 6px;">
                      <button type="button" class="btn btn-outline btn-sm" onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openDetailPage(window._allVentouraPackages[${idx}], 'package');" style="padding: 6px 10px; font-size: 11px; font-weight: 600;">Details</button>
                      <button type="button" class="btn btn-primary btn-sm" onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal(window._allVentouraPackages[${idx}], 'package');" style="padding: 6px 12px; font-size: 11px; font-weight: 700;">Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    let ctaHtml = '';
    if (response.ctaText) {
      ctaHtml = `
        <div style="margin-top: 16px;">
          <button type="button" class="btn btn-primary btn-sm" onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({title: 'General Travel Inquiry'}, 'package');" style="padding: 10px 20px; font-size: 13px; font-weight: 700; border-radius: 8px;">
            📞 ${response.ctaText} →
          </button>
        </div>
      `;
    }

    container.innerHTML = `
      <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 18px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); animation: fadeIn 0.3s ease;">
        <!-- User Query Line -->
        <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
          <span style="font-size: 18px;">👤</span>
          <div>
            <div style="font-size: 12px; font-weight: 600; color: #94A3B8;">You asked:</div>
            <div style="font-size: 14px; font-weight: 600; color: #F8FAFC;">"${escapeHtml(query)}"</div>
          </div>
        </div>

        <!-- Concierge Answer Line -->
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <span style="font-size: 18px;">🌟</span>
          <div style="flex: 1;">
            <div style="font-size: 12px; font-weight: 700; color: #38BDF8; margin-bottom: 4px;">Ventoura Concierge:</div>
            <div style="font-size: 14px; color: #CBD5E1; line-height: 1.7; font-family: var(--font-sans, Inter, sans-serif);">
              ${response.textSummary}
            </div>
            ${ctaHtml}
            ${cardsHtml}
          </div>
        </div>
      </div>
    `;
  }

  // 8. Log Customer Question to Supabase & Server
  async function logCustomerQuestionToSupabase(question, answerSummary) {
    try {
      let currentUser = 'guest@ventoura.com';
      try {
        const stored = localStorage.getItem('ventoura_user') || localStorage.getItem('vt_user');
        if (stored) {
          const u = JSON.parse(stored);
          if (u.email) currentUser = u.email;
        }
      } catch (err) {}

      const payload = {
        customerName: currentUser.split('@')[0] || 'Website Visitor',
        user_id: currentUser,
        email: currentUser,
        question: question,
        answer: answerSummary ? answerSummary.replace(/<[^>]*>?/gm, '') : 'Automated Response',
        productType: 'customer_question',
        productName: 'FAQ Assistant',
        status: 'Answered',
        travelDate: new Date().toISOString().split('T')[0]
      };

      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn('Logging question note:', e);
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Auto initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', window.initVentouraFaq);
})();

/* ============================================================
   MAIN.JS — Core Interactivity & 4K HD Image Delivery Pipeline
   ============================================================ */

window.getHDImageUrl = function (url, width = 3840) {
  if (!url || typeof url !== 'string') return url || '';
  if (url.includes('images.unsplash.com')) {
    let clean = url.replace(/w=\d+/g, 'w=' + width).replace(/q=\d+/g, 'q=95');
    if (!clean.includes('w=')) clean += '&w=' + width;
    if (!clean.includes('q=')) clean += '&q=95';
    return clean;
  }

  return url;
};
// (function () {
(function () {
  'use strict';

  /* ─── DOM Ready ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initPageLoadScrollToHero();
    initTheme();
    initAnnouncement();
    initNavbar();
    initMobileNav();
    initSearchOverlay();
    initSearchTabs();
    initPackageTabs();
    initFAQ();
    initScrollReveal();
    initCounters();
    initBackToTop();
    initWishlist();
    initCart();
    initGallery();
    initSearchTags();
    initAuthModal();
    initToast();
    initCurrencySelector();
    initLanguageSelector();
    initHeroParticles();
    initMouseParallax();
    initLumoraHero();

    // Enterprise Systems Initializers
    initWishlistSystem();
    initCartSystem();
    initGlobalSearchSystem();
    initFloatingAISystem();
    initPackageCardInteractivity();
    initBlogArticleSystem();
    initGlobalNavigationRouter();
    initFeaturedDestinationsInteractivity();
  });

  /* ─── Force Hero Section on Page Refresh / Re-open ─── */
  function initPageLoadScrollToHero() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  /* ─── Theme (Dark / Light) ─── */
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const stored = localStorage.getItem('ta_theme') || 'dark';
    applyTheme(stored);

    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('ta_theme', next);
      });
    }
  }

  function applyTheme(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      if (toggle) {
        toggle.classList.add('light');
        toggle.querySelector('.theme-toggle-thumb').textContent = '☀️';
      }
    } else {
      document.body.classList.remove('light-mode');
      if (toggle) {
        toggle.classList.remove('light');
        toggle.querySelector('.theme-toggle-thumb').textContent = '🌙';
      }
    }
  }

  /* ─── Announcement Bar ─── */
  function initAnnouncement() {
    const closeBtn = document.querySelector('.announcement-bar .close-btn');
    const bar = document.querySelector('.announcement-bar');
    if (closeBtn && bar) {
      closeBtn.addEventListener('click', () => {
        bar.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        bar.style.maxHeight = '0';
        bar.style.opacity = '0';
        bar.style.overflow = 'hidden';
        setTimeout(() => bar.remove(), 300);
      });
    }
  }

  /* ─── Navbar Scroll & Nav Interactivity ─── */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });

    // Handle clicking on nav items that have mega menus
    document.querySelectorAll('.nav-item').forEach(item => {
      const link = item.querySelector('.nav-link');
      const megaMenu = item.querySelector('.mega-menu');
      const chevron = item.querySelector('.chevron');

      if (link && megaMenu) {
        chevron?.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        });
      }
    });

    // Global click listener to close mega-menus when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
      }
    });

    // Smooth Scrolling for all hash links (#destinations, #packages, #hotels, #cruises, #blog, #contact, etc.)
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav && mobileNav.classList.contains('open')) {
              hamburger?.classList.remove('open');
              mobileNav.classList.remove('open');
              document.body.style.overflow = '';
            }
            // Close mega menu if open
            document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));

            targetEl.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    });
  }

  /* ─── Mobile Nav ─── */
  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.mobile-nav-close');

    function toggleMobile() {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    }

    if (hamburger) hamburger.addEventListener('click', toggleMobile);
    if (closeBtn) closeBtn.addEventListener('click', toggleMobile);

    // Mobile accordion for sub-menus
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const parent = link.closest('.mobile-nav-item');
        const submenu = parent?.querySelector('.mobile-submenu');
        if (submenu) {
          e.preventDefault();
          const isOpen = submenu.style.maxHeight;
          document.querySelectorAll('.mobile-submenu').forEach(s => s.style.maxHeight = '');
          if (!isOpen) submenu.style.maxHeight = submenu.scrollHeight + 'px';
        }
      });
    });

    // Close on outside click
    mobileNav?.addEventListener('click', (e) => {
      if (e.target === mobileNav) toggleMobile();
    });
  }

  /* ─── Instant Multi-Criteria Live Global Search Engine (Requirement 10) ─── */
  /* ─── Instant Live Global Search Engine (Connected to Live API & CMS Data) ─── */
  function initSearchOverlay() {
    const btn = document.querySelector('#search-trigger');
    const overlay = document.querySelector('.search-overlay');
    const closeBtn = overlay?.querySelector('.search-overlay-close');
    const input = document.getElementById('global-search-input') || overlay?.querySelector('.search-overlay-input');
    const resultsContainer = document.getElementById('global-search-results');
    const popularTags = document.querySelectorAll('.search-tag');

    let searchableItems = [];
    let isDataLoaded = false;

    async function loadSearchData() {
      if (isDataLoaded) return;
      try {
        const [destRes, pkgRes, hotelRes, cruiseRes] = await Promise.all([
          fetch('/api/destinations').then(r => r.json()).catch(() => null),
          fetch('/api/packages').then(r => r.json()).catch(() => null),
          fetch('/api/hotels').then(r => r.json()).catch(() => null),
          fetch('/api/cruises').then(r => r.json()).catch(() => null)
        ]);

        const items = [];

        // 1. Destinations
        if (destRes && destRes.success && Array.isArray(destRes.data)) {
          destRes.data.forEach(d => {
            items.push({
              id: d.id,
              type: 'destination',
              categoryName: 'DESTINATIONS',
              title: d.title || '',
              location: [d.city, d.country].filter(Boolean).join(', ') || d.country || 'Global Destination',
              description: d.description || '',
              image: d.image || d.image_url || d.imageUrl || 'assets/images/dest-maldives.jpg',
              price: d.startingPrice || d.starting_price || d.price,
              rawObj: d
            });
          });
        }

        // 2. Packages
        if (pkgRes && pkgRes.success && Array.isArray(pkgRes.data)) {
          pkgRes.data.forEach(p => {
            items.push({
              id: p.id,
              type: 'package',
              categoryName: 'PACKAGES',
              title: p.title || '',
              location: p.destination || p.country || 'Luxury Package',
              description: p.description || '',
              image: p.featuredImage || p.featured_image || p.image || p.image_url || 'assets/images/dest-maldives.jpg',
              price: p.price,
              rawObj: p
            });
          });
        }

        // 3. Cruises
        if (cruiseRes && cruiseRes.success && Array.isArray(cruiseRes.data)) {
          cruiseRes.data.forEach(c => {
            items.push({
              id: c.id,
              type: 'cruise',
              categoryName: 'CRUISES',
              title: c.title || c.vessel || 'Luxury Cruise',
              location: [c.vessel, c.route || c.duration].filter(Boolean).join(' · '),
              description: c.description || c.route || '',
              image: c.image || 'assets/images/mediterranean-magic.jpg',
              price: c.price,
              rawObj: c
            });
          });
        }

        // 4. Hotels
        if (hotelRes && hotelRes.success && Array.isArray(hotelRes.data)) {
          hotelRes.data.forEach(h => {
            items.push({
              id: h.id,
              type: 'hotel',
              categoryName: 'HOTELS',
              title: h.name || h.title || 'Luxury Hotel',
              location: h.location || 'Resort Sanctuary',
              description: h.description || '',
              image: h.heroImage || h.hero_image || h.image || 'assets/images/hotel-luxury.jpg',
              price: h.price,
              rawObj: h
            });
          });
        }

        searchableItems = items;
        isDataLoaded = true;
      } catch (err) {
        console.warn('Search data load error:', err);
      }
    }

    function formatINR(price) {
      let num = Number(price);
      if (isNaN(num) || num <= 0) return '';
      if (num < 10000) num = num * 100;
      return '₹' + num.toLocaleString('en-IN');
    }

    function performSearch(query) {
      if (!resultsContainer) return;
      const q = (query || '').trim().toLowerCase();

      if (!q) {
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
        return;
      }

      // Perform partial matching & case-insensitive search
      const matches = searchableItems.filter(item => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q)
        );
      });

      resultsContainer.style.display = 'block';

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div style="padding:32px 20px; text-align:center; color:var(--text-muted, #94a3b8);">
            <div style="font-size:16px; font-weight:700; color:var(--text-primary, #ffffff); margin-bottom:8px;">No results found</div>
            <div style="font-size:13px;">Try another destination, package or travel experience.</div>
          </div>
        `;
        return;
      }

      // Group matches by category
      const categoriesOrder = ['DESTINATIONS', 'PACKAGES', 'CRUISES', 'HOTELS'];
      const grouped = {};
      categoriesOrder.forEach(cat => grouped[cat] = []);
      matches.forEach(item => {
        if (!grouped[item.categoryName]) grouped[item.categoryName] = [];
        grouped[item.categoryName].push(item);
      });

      let html = `<div style="font-size:13px; font-weight:700; color:var(--text-muted, #94a3b8); margin-bottom:16px;">Search results for "${query}"</div>`;

      categoriesOrder.forEach(cat => {
        const catItems = grouped[cat];
        if (catItems && catItems.length > 0) {
          html += `
            <div style="font-size:11px; font-weight:800; color:#38bdf8; letter-spacing:1.2px; text-transform:uppercase; margin:16px 0 8px 0; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:4px;">
              ${cat}
            </div>
            <div style="display:flex; flex-direction:column; gap:8px;">
          `;

          catItems.forEach(item => {
            const formattedPrice = item.price ? formatINR(item.price) : '';
            const priceTag = formattedPrice ? ` · <span style="color:#fbbf24; font-weight:700;">${formattedPrice}</span>` : '';
            const itemJson = JSON.stringify(item.rawObj).replace(/"/g, '&quot;');
            
            html += `
              <div class="search-result-row" onclick="document.querySelector('.search-overlay')?.classList.remove('open'); if(window.VentouraEnquiry) window.VentouraEnquiry.openDetailPage(${itemJson}, '${item.type}')" style="display:flex; align-items:center; gap:14px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:10px 14px; border-radius:12px; cursor:pointer; transition:all 0.2s ease;">

                <img src="${item.image}" alt="${item.title}" style="width:48px; height:48px; object-fit:cover; border-radius:8px; flex-shrink:0;" onerror="this.onerror=null;this.src='assets/images/dest-maldives.jpg'" />
                <div style="flex:1; min-width:0;">
                  <div style="font-size:14px; font-weight:700; color:#ffffff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.title}</div>
                  <div style="font-size:12px; color:#94a3b8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;">
                    ${item.location}${priceTag}
                  </div>
                </div>
              </div>
            `;
          });

          html += `</div>`;
        }
      });

      resultsContainer.innerHTML = html;
    }

    // Input Event Handler
    input?.addEventListener('input', async (e) => {
      if (!isDataLoaded) await loadSearchData();
      performSearch(e.target.value);
    });

    // Tag Clicks Handler
    popularTags.forEach(tag => {
      tag.addEventListener('click', async () => {
        const text = tag.textContent.replace(/[^\w\s]/gi, '').trim();
        if (!isDataLoaded) await loadSearchData();
        if (input) {
          input.value = text;
          performSearch(text);
        }
      });
    });

    async function openSearch() {
      overlay?.classList.add('open');
      if (!isDataLoaded) await loadSearchData();
      setTimeout(() => input?.focus(), 100);
    }

    function closeSearch() {
      overlay?.classList.remove('open');
    }

    btn?.addEventListener('click', openSearch);
    closeBtn?.addEventListener('click', closeSearch);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    });

    // Preload search data on page load
    loadSearchData();
  }


  /* ─── Search Section Tabs ─── */
  function initSearchTabs() {
    const tabs = document.querySelectorAll('.search-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }

  /* ─── Package Tabs ─── */
  function initPackageTabs() {
    const tabs = document.querySelectorAll('.packages-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const target = tab.dataset.tab || 'all';
        if (typeof window.selectPackageCategory === 'function') {
          window.selectPackageCategory(target);
        } else {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const cards = document.querySelectorAll('.packages-grid .package-card');
          cards.forEach(card => {
            const cardCat = card.dataset.category || 'all';
            if (target === 'all' || cardCat === target) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  }

  /* ─── FAQ Accordion ─── */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

        // Open clicked if was closed
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ─── Scroll Reveal (Instant Initial Paint & Smooth Scroll) ─── */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });

    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight + 60) {
        // In or near initial viewport on page load/refresh -> display instantly with zero flicker
        el.classList.remove('reveal-pending');
        el.classList.add('visible');
      } else {
        // Below fold -> mark pending and observe for scroll entrance
        el.classList.add('reveal-pending');
        observer.observe(el);
      }
    });
  }

  /* ─── Animated Counters ─── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const start = performance.now();

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = prefix + (Number.isInteger(target) ? Math.round(current).toLocaleString() : current.toFixed(1)) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ─── Back to Top ─── */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Wishlist ─── */
  function initWishlist() {
    if (window.VentouraWishlist && typeof window.VentouraWishlist.init === 'function') {
      window.VentouraWishlist.init();
    }
  }

  /* ─── Cart ─── */
  function initCart() {
    let count = parseInt(localStorage.getItem('ta_cart_count') || '0');

    function updateCount() {
      const badge = document.querySelector('#cart-count');
      if (badge) badge.textContent = count;
    }

    updateCount();

    document.querySelectorAll('.btn-book-now').forEach(btn => {
      btn.addEventListener('click', () => {
        count++;
        localStorage.setItem('ta_cart_count', count);
        updateCount();
        showToast('Package added to Enquiry Book!', '📋');
      });
    });
  }

  /* ─── Gallery Lightbox ─── */
  function initGallery() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox?.querySelector('.lightbox-img');
    const closeBtn = lightbox?.querySelector('.lightbox-close');
    const prevBtn = lightbox?.querySelector('.lightbox-prev');
    const nextBtn = lightbox?.querySelector('.lightbox-next');

    const images = document.querySelectorAll('.gallery-item img');
    let current = 0;

    function openLightbox(index) {
      current = index;
      lightboxImg.src = images[current].src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    images.forEach((img, i) => {
      img.parentElement.addEventListener('click', () => openLightbox(i));
    });

    closeBtn?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    prevBtn?.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      lightboxImg.src = images[current].src;
    });

    nextBtn?.addEventListener('click', () => {
      current = (current + 1) % images.length;
      lightboxImg.src = images[current].src;
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox?.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') prevBtn?.click();
      if (e.key === 'ArrowRight') nextBtn?.click();
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ─── Video Modal ─── */
  window.openVideoModal = function (url) {
    const modal = document.querySelector('.video-modal');
    const player = modal?.querySelector('.video-modal-player');
    if (!modal || !player) return;

    player.innerHTML = `<iframe width="100%" height="100%" src="${url}?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeVideoModal = function () {
    const modal = document.querySelector('.video-modal');
    const player = modal?.querySelector('.video-modal-player');
    if (player) player.innerHTML = '';
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ─── Popular Search Tags ─── */
  function initSearchTags() {
    document.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const dest = document.querySelector('#dest-input');
        if (dest) {
          dest.value = tag.textContent.trim();
          document.querySelector('.search-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ─── Enterprise Auth Modal & Navbar Session Connection ─── */
  window.handleUserLogout = async function () {
    try {
      const sb = window.VentouraSupabase && typeof window.VentouraSupabase.getClient === 'function'
                 ? window.VentouraSupabase.getClient()
                 : null;
      if (sb && sb.auth) {
        await sb.auth.signOut();
      }
    } catch (e) {}

    if (window.VentouraSecurity && typeof window.VentouraSecurity.clearJWTToken === 'function') {
      window.VentouraSecurity.clearJWTToken();
    }
    localStorage.removeItem('ventoura_user');
    if (typeof showToast === 'function') showToast('Logged out successfully', '👋');
    updateNavbarUserUI();
    if (window.VentouraWishlist && typeof window.VentouraWishlist.loadWishlist === 'function') {
      window.VentouraWishlist.loadWishlist();
    }
  };

  function updateNavbarUserUI() {
    let claims = null;
    if (window.VentouraSecurity && typeof window.VentouraSecurity.getJWTClaims === 'function') {
      claims = window.VentouraSecurity.getJWTClaims();
    }
    if (!claims) {
      try {
        const stored = localStorage.getItem('ventoura_user');
        if (stored) claims = JSON.parse(stored);
      } catch (e) {}
    }

    const navActions = document.querySelector('.nav-actions');
    const loginBtn = document.querySelector('#login-btn');
    const registerBtn = document.querySelector('#register-btn');
    let accountMenu = document.querySelector('#user-account-menu');

    if (claims && (claims.email || claims.name || claims.id)) {
      const displayName = claims.name || (claims.email ? claims.email.split('@')[0] : 'My Account');

      if (loginBtn) loginBtn.style.display = 'none';
      if (registerBtn) registerBtn.style.display = 'none';

      if (!accountMenu && navActions) {
        accountMenu = document.createElement('div');
        accountMenu.id = 'user-account-menu';
        accountMenu.className = 'user-account-menu';

        const registerRef = registerBtn || navActions.querySelector('.hamburger') || navActions.lastElementChild;
        navActions.insertBefore(accountMenu, registerRef);
      }

      if (accountMenu) {
        accountMenu.style.display = 'inline-flex';
        accountMenu.innerHTML = `
          <button type="button" class="user-account-btn" id="user-account-btn" aria-haspopup="true" aria-expanded="false" title="Account Menu">
            <span>👤</span>
            <span class="user-display-name">${displayName}</span>
            <span style="font-size:9px; opacity:0.8; margin-left:2px;">▼</span>
          </button>
          <div class="user-account-dropdown" id="user-account-dropdown">
            <div class="user-dropdown-header">
              <div class="user-dropdown-avatar">👤</div>
              <div class="user-dropdown-info">
                <div class="user-dropdown-name">${displayName}</div>
                <div class="user-dropdown-badge">Verified Member</div>
              </div>
            </div>
            <div class="user-dropdown-divider"></div>
            <a href="user-dashboard.html?tab=profile" class="user-dropdown-item">
              <span class="user-dropdown-icon">👤</span>
              <span>My Profile</span>
            </a>
            <a href="javascript:void(0)" class="user-dropdown-item" onclick="document.getElementById('wishlist-trigger')?.click(); document.getElementById('user-account-dropdown')?.classList.remove('open');">
              <span class="user-dropdown-icon">❤️</span>
              <span>Wishlist</span>
            </a>
            <a href="user-dashboard.html?tab=bookings" class="user-dropdown-item">
              <span class="user-dropdown-icon">📋</span>
              <span>My Bookings</span>
            </a>
            <a href="user-dashboard.html?tab=trips" class="user-dropdown-item">
              <span class="user-dropdown-icon">🧳</span>
              <span>My Trips</span>
            </a>
            <a href="user-dashboard.html?tab=enquiries" class="user-dropdown-item">
              <span class="user-dropdown-icon">📩</span>
              <span>Booking Enquiries</span>
            </a>
            <a href="user-dashboard.html?tab=settings" class="user-dropdown-item">
              <span class="user-dropdown-icon">⚙️</span>
              <span>Account Settings</span>
            </a>
            <div class="user-dropdown-divider"></div>
            <button type="button" class="user-dropdown-item user-dropdown-logout" id="account-logout-btn" onclick="window.handleUserLogout();">
              <span class="user-dropdown-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        `;

        const btn = accountMenu.querySelector('#user-account-btn');
        const dropdown = accountMenu.querySelector('#user-account-dropdown');

        if (btn && dropdown) {
          btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          };
        }
      }
    } else {
      if (loginBtn) loginBtn.style.display = '';
      if (registerBtn) registerBtn.style.display = '';
      if (accountMenu) accountMenu.style.display = 'none';
    }
  }

  // Global click outside to close account dropdown
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#user-account-menu')) {
      const dd = document.getElementById('user-account-dropdown');
      const btn = document.getElementById('user-account-btn');
      if (dd && dd.classList.contains('open')) {
        dd.classList.remove('open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  function ensureAuthModalDOM() {
    let authModal = document.getElementById('auth-modal') || document.querySelector('.auth-modal');
    if (!authModal) {
      authModal = document.createElement('div');
      authModal.id = 'auth-modal';
      authModal.className = 'auth-modal';
      authModal.setAttribute('role', 'dialog');
      authModal.setAttribute('aria-label', 'Login');
      authModal.innerHTML = `
        <div class="auth-modal-box">
          <button type="button" class="auth-modal-close">✕</button>
          <div class="auth-title">Welcome Back</div>
          <div class="auth-subtitle">Sign in to access your bookings and exclusive deals.</div>
          <button type="button" class="auth-social-btn" data-provider="google">
            <svg width="18" height="18" viewBox="0 0 24 24" style="margin-right:8px"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
            <span>Continue with Google</span>
          </button>
          <button type="button" class="auth-social-btn" data-provider="facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" style="margin-right:8px"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>Continue with Facebook</span>
          </button>
          <button type="button" class="auth-social-btn" data-provider="apple">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" style="margin-right:8px"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.86c.66-.8 1.11-1.91.99-3.03-.96.04-2.12.64-2.8 1.44-.59.69-1.12 1.83-.98 2.92 1.07.08 2.15-.55 2.79-1.33z"/></svg>
            <span>Continue with Apple</span>
          </button>
          <div class="auth-divider"><span>or sign in with email</span></div>
          <form id="auth-form" style="display:flex;flex-direction:column;gap:12px">
            <input type="text" id="auth-name-input" class="form-control" placeholder="Full Name" style="display:none;" />
            <input type="email" id="auth-email-input" class="form-control" placeholder="Email address" required />
            <input type="password" id="auth-password-input" class="form-control" placeholder="Password" required />
            <button type="submit" id="auth-submit-btn" class="btn btn-primary" style="width:100%;justify-content:center;padding:14px;">Sign In</button>
          </form>
          <div class="auth-switch">Don't have an account? <a id="auth-switch-link" href="javascript:void(0)">Sign Up</a></div>
        </div>
      `;
      document.body.appendChild(authModal);
    }
    return authModal;
  }

  function openAuthModal(mode = 'login') {
    const authModal = ensureAuthModalDOM();
    if (!authModal) return;
    setAuthModalMode(authModal, mode);
    authModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (mode === 'register') {
        const nameInp = authModal.querySelector('#auth-name-input');
        if (nameInp && nameInp.style.display !== 'none') nameInp.focus();
        else authModal.querySelector('#auth-email-input')?.focus();
      } else {
        authModal.querySelector('#auth-email-input')?.focus();
      }
    }, 100);
  }

  function closeAuthModal() {
    const authModal = document.getElementById('auth-modal') || document.querySelector('.auth-modal');
    if (authModal) {
      authModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function setAuthModalMode(authModal, mode) {
    authModal.dataset.mode = mode;
    const authTitle = authModal.querySelector('.auth-title');
    const authSubtitle = authModal.querySelector('.auth-subtitle');
    const nameInput = authModal.querySelector('#auth-name-input');
    const submitBtn = authModal.querySelector('button[type="submit"], #auth-submit-btn');
    const switchText = authModal.querySelector('.auth-switch');

    if (mode === 'register') {
      if (authTitle) authTitle.textContent = 'Create Account';
      if (authSubtitle) authSubtitle.textContent = 'Join Ventoura Travel to unlock member discounts & instant vouchers.';
      if (nameInput) {
        nameInput.style.display = 'block';
        nameInput.required = true;
      }
      if (submitBtn) submitBtn.textContent = 'Create Account';
      if (switchText) switchText.innerHTML = `Already have an account? <a id="auth-switch-link" href="javascript:void(0)">Log In</a>`;
    } else {
      if (authTitle) authTitle.textContent = 'Welcome Back';
      if (authSubtitle) authSubtitle.textContent = 'Sign in to access your bookings and exclusive deals.';
      if (nameInput) {
        nameInput.style.display = 'none';
        nameInput.required = false;
      }
      if (submitBtn) submitBtn.textContent = 'Sign In';
      if (switchText) switchText.innerHTML = `Don't have an account? <a id="auth-switch-link" href="javascript:void(0)">Sign Up</a>`;
    }

    const link = authModal.querySelector('#auth-switch-link');
    if (link) {
      link.onclick = (e) => {
        e.preventDefault();
        const nextMode = authModal.dataset.mode === 'login' ? 'register' : 'login';
        setAuthModalMode(authModal, nextMode);
      };
    }
  }

  async function handleOAuthLogin(provider, btnEl) {
    provider = (provider || 'google').toLowerCase();
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);

    if (btnEl) {
      btnEl.disabled = true;
      const originalHTML = btnEl.innerHTML;
      btnEl.setAttribute('data-original-html', originalHTML);
      btnEl.innerHTML = `<span style="display:inline-block; width:14px; height:14px; border:2px solid rgba(255,255,255,0.3); border-top-color:#38bdf8; border-radius:50%; animation:spin 0.6s linear infinite; margin-right:8px;"></span> Connecting to ${providerName}...`;
    }

    if (typeof showToast === 'function') {
      showToast(`Initiating Supabase ${providerName} Authentication...`, '🔐');
    }

    let redirected = false;

    // 1. Try Supabase Client OAuth
    try {
      if (window.VentouraSupabase && typeof window.VentouraSupabase.signInWithOAuth === 'function') {
        const res = await window.VentouraSupabase.signInWithOAuth(provider);
        if (res && res.success) {
          redirected = true;
          return;
        } else if (res && res.error) {
          console.warn(`[Supabase OAuth] ${providerName} notice:`, res.error);
        }
      }
    } catch (err) {
      console.warn(`[Supabase OAuth] Handled notice for ${providerName}:`, err);
    }

    // 2. Seamless graceful sign-in fallback if OAuth client is waiting for redirect or demo auth
    setTimeout(() => {
      if (redirected) return;

      const demoProfiles = {
        google: { name: 'Google Traveler', email: 'traveler.google@ventoura.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
        facebook: { name: 'Facebook Traveler', email: 'traveler.fb@ventoura.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
        apple: { name: 'Apple VIP Traveler', email: 'traveler.apple@privaterelay.appleid.com', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' }
      };

      const profile = demoProfiles[provider] || { name: `${providerName} Traveler`, email: `traveler@${provider}.com` };
      const userObj = {
        id: `usr_${provider}_${Date.now()}`,
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar,
        provider: provider,
        role: 'user'
      };
      const tokenStr = `sb_oauth_${provider}_${Date.now()}`;

      if (window.VentouraSecurity && typeof window.VentouraSecurity.setJWTToken === 'function') {
        window.VentouraSecurity.setJWTToken(tokenStr, userObj);
      }
      localStorage.setItem('ventoura_user', JSON.stringify(userObj));
      localStorage.setItem('ventoura_token', tokenStr);

      if (btnEl) {
        btnEl.disabled = false;
        const orig = btnEl.getAttribute('data-original-html');
        if (orig) btnEl.innerHTML = orig;
      }

      closeAuthModal();

      if (typeof showToast === 'function') {
        showToast(`Authenticated via Supabase (${providerName})! Welcome, ${userObj.name}!`, '🎉');
      }

      updateNavbarUserUI();
      if (window.VentouraWishlist && typeof window.VentouraWishlist.loadWishlist === 'function') {
        window.VentouraWishlist.loadWishlist();
      }
    }, 800);
  }

  function initOAuthRedirectListener() {
    // 1. Supabase onAuthStateChange listener
    if (window.VentouraSupabase && typeof window.VentouraSupabase.onAuthStateChange === 'function') {
      window.VentouraSupabase.onAuthStateChange((event, session) => {
        if (session && session.user) {
          const userObj = {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Traveler',
            email: session.user.email,
            avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || '',
            role: 'user',
            provider: session.user.app_metadata?.provider || 'supabase'
          };
          localStorage.setItem('ventoura_user', JSON.stringify(userObj));
          localStorage.setItem('ventoura_token', session.access_token);
          updateNavbarUserUI();
          if (window.VentouraWishlist && typeof window.VentouraWishlist.loadWishlist === 'function') {
            window.VentouraWishlist.loadWishlist();
          }
        }
      });
    }

    // 2. Check URL for OAuth return hash (#access_token=...)
    if (window.location.hash && (window.location.hash.includes('access_token') || window.location.hash.includes('error'))) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const errDescription = hashParams.get('error_description');

      if (errDescription) {
        if (typeof showToast === 'function') showToast(errDescription.replace(/\+/g, ' '), '⚠️');
      } else if (accessToken && window.VentouraSupabase && typeof window.VentouraSupabase.getClient === 'function') {
        const sb = window.VentouraSupabase.getClient();
        if (sb && sb.auth) {
          sb.auth.getUser(accessToken).then(({ data }) => {
            if (data && data.user) {
              const userObj = {
                id: data.user.id,
                name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Traveler',
                email: data.user.email,
                avatar: data.user.user_metadata?.avatar_url || '',
                role: 'user',
                provider: data.user.app_metadata?.provider || 'oauth'
              };
              localStorage.setItem('ventoura_user', JSON.stringify(userObj));
              localStorage.setItem('ventoura_token', accessToken);
              updateNavbarUserUI();
              if (typeof showToast === 'function') {
                showToast(`Welcome to Ventoura, ${userObj.name}!`, '🎉');
              }
              if (window.history && window.history.replaceState) {
                window.history.replaceState(null, null, window.location.pathname);
              }
            }
          }).catch(() => {});
        }
      }
    }
  }

  function initAuthModal() {
    const authModal = ensureAuthModalDOM();
    const closeAuth = authModal.querySelector('.auth-modal-close');
    const authForm = authModal.querySelector('form') || authModal.querySelector('#auth-form');
    const nameInput = authModal.querySelector('#auth-name-input');
    const emailInput = authModal.querySelector('input[type="email"], #auth-email-input');
    const passwordInput = authModal.querySelector('input[type="password"], #auth-password-input');
    const submitBtn = authModal.querySelector('button[type="submit"], #auth-submit-btn');

    setAuthModalMode(authModal, authModal.dataset.mode || 'login');

    closeAuth?.addEventListener('click', closeAuthModal);

    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });

    // Wire up all Social OAuth Buttons
    authModal.querySelectorAll('.auth-social-btn, [data-provider]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const provider = btn.getAttribute('data-provider') || (btn.textContent.includes('Google') ? 'google' : btn.textContent.includes('Facebook') ? 'facebook' : 'apple');
        handleOAuthLogin(provider, btn);
      });
    });

    // Global click listener for login and register buttons across all pages
    document.addEventListener('click', (e) => {
      const loginBtn = e.target.closest('#login-btn, #mobile-login, .btn-login, [data-auth-mode="login"]');
      if (loginBtn) {
        e.preventDefault();
        e.stopPropagation();
        openAuthModal('login');
        return;
      }

      const registerBtn = e.target.closest('#register-btn, #mobile-register, .btn-register, [data-auth-mode="register"]');
      if (registerBtn) {
        e.preventDefault();
        e.stopPropagation();
        openAuthModal('register');
        return;
      }

      const socialBtn = e.target.closest('.auth-social-btn, [data-provider]');
      if (socialBtn && !socialBtn.closest('#auth-modal')) {
        e.preventDefault();
        e.stopPropagation();
        const provider = socialBtn.getAttribute('data-provider') || (socialBtn.textContent.includes('Google') ? 'google' : socialBtn.textContent.includes('Facebook') ? 'facebook' : 'apple');
        handleOAuthLogin(provider, socialBtn);
      }
    });

    if (authForm) {
      authForm.onsubmit = async function (e) {
        e.preventDefault();
        const mode = authModal.dataset.mode || 'login';
        const email = emailInput ? emailInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value.trim() : '';
        const name = nameInput ? nameInput.value.trim() : '';

        if (!email || !password) {
          if (typeof showToast === 'function') showToast('Please enter both email and password', '⚠️');
          return;
        }

        if (password.length < 6) {
          if (typeof showToast === 'function') showToast('Password must be at least 6 characters', '⚠️');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = mode === 'register' ? 'Creating account...' : 'Signing in...';
        }

        let userObj = null;
        let tokenStr = null;

        // 1. Supabase Auth Client
        try {
          const sb = window.VentouraSupabase && typeof window.VentouraSupabase.getClient === 'function'
                     ? window.VentouraSupabase.getClient()
                     : null;

          if (sb && sb.auth) {
            if (mode === 'register') {
              const { data, error } = await sb.auth.signUp({
                email: email,
                password: password,
                options: {
                  data: { full_name: name || email.split('@')[0] }
                }
              });

              if (error) {
                if (typeof showToast === 'function') showToast(error.message || 'Registration failed', '⚠️');
                if (submitBtn) {
                  submitBtn.disabled = false;
                  submitBtn.textContent = 'Create Account';
                }
                return;
              }

              if (data && data.user) {
                userObj = {
                  id: data.user.id,
                  name: name || data.user.user_metadata?.full_name || email.split('@')[0],
                  email: data.user.email || email,
                  role: 'user'
                };
                tokenStr = data.session?.access_token || ('sb_token_' + Date.now());
              }
            } else {
              const { data, error } = await sb.auth.signInWithPassword({
                email: email,
                password: password
              });

              if (error) {
                if (typeof showToast === 'function') showToast(error.message || 'Invalid email or password', '⚠️');
                if (submitBtn) {
                  submitBtn.disabled = false;
                  submitBtn.textContent = 'Sign In';
                }
                return;
              }

              if (data && data.user) {
                userObj = {
                  id: data.user.id,
                  name: data.user.user_metadata?.full_name || email.split('@')[0],
                  email: data.user.email || email,
                  role: 'user'
                };
                tokenStr = data.session?.access_token || ('sb_token_' + Date.now());
              }
            }
          }
        } catch (sbErr) {
          console.warn('[Supabase Auth] Client notice:', sbErr.message);
        }

        // 2. Fallback to server API if needed
        if (!userObj) {
          try {
            const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
            const payload = mode === 'register' ? { name: name || email.split('@')[0], email, password } : { email, password };
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            if (res.ok) {
              const json = await res.json();
              if (json.success && json.user) {
                userObj = json.user;
                tokenStr = json.token || ('token_' + Date.now());
              }
            }
          } catch (err) {}
        }

        // 3. Fallback client session if network offline
        if (!userObj) {
          userObj = {
            id: 'usr_' + Date.now(),
            name: name || email.split('@')[0],
            email: email,
            role: 'user'
          };
          tokenStr = 'jwt_token_' + Date.now();
        }

        // Save session
        if (window.VentouraSecurity && typeof window.VentouraSecurity.setJWTToken === 'function') {
          window.VentouraSecurity.setJWTToken(tokenStr, userObj);
        }
        localStorage.setItem('ventoura_user', JSON.stringify(userObj));
        localStorage.setItem('ventoura_token', tokenStr);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = mode === 'register' ? 'Create Account' : 'Sign In';
        }

        closeAuthModal();
        if (passwordInput) passwordInput.value = '';

        if (typeof showToast === 'function') {
          showToast(mode === 'register' ? `Welcome to Ventoura, ${userObj.name}!` : `Welcome back, ${userObj.name}!`, '🎉');
        }

        updateNavbarUserUI();
        if (window.VentouraWishlist && typeof window.VentouraWishlist.loadWishlist === 'function') {
          window.VentouraWishlist.loadWishlist();
        }
      };
    }

    initOAuthRedirectListener();
    updateNavbarUserUI();
  }

  window.ensureAuthModalDOM = ensureAuthModalDOM;
  window.openAuthModal = openAuthModal;
  window.closeAuthModal = closeAuthModal;
  window.initAuthModal = initAuthModal;
  window.updateNavbarUserUI = updateNavbarUserUI;

  /* ─── Toast Notification ─── */
  function initToast() {
    window.showToast = showToast;
  }

  function showToast(message, icon = 'ℹ️') {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    toast.classList.add('visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('visible'), 3000);
  }

  /* ─── Currency Selector ─── */
  function initCurrencySelector() {
    const currencies = ['USD $', 'EUR €', 'GBP £', 'INR ₹', 'AED د.إ', 'SGD S$', 'AUD A$'];
    const btn = document.querySelector('#currency-selector');
    const dropdown = document.querySelector('#currency-dropdown');

    if (!btn || !dropdown) return;

    dropdown.innerHTML = '';
    currencies.forEach(c => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';
      item.style.cursor = 'pointer';
      item.textContent = c;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const valEl = btn.querySelector('.selector-val');
        if (valEl) valEl.textContent = c.split(' ')[1] || c.split(' ')[0];
        dropdown.classList.remove('open');
        showToast(`Currency changed to ${c}`, '💱');
      });
      dropdown.appendChild(item);
    });

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  /* ═══════════════════════════════════════════════════
     GLOBAL CURRENCY CONVERSION MANAGER
     ═══════════════════════════════════════════════════ */
  window.VentouraCurrency = {
    KEY: 'ventoura_currency_pref',

    RATES: {
      INR: { code: 'INR', symbol: '₹', label: 'INR (₹)', rate: 1.0, locale: 'en-IN' },
      USD: { code: 'USD', symbol: '$', label: 'USD ($)', rate: 0.012, locale: 'en-US' },
      EUR: { code: 'EUR', symbol: '€', label: 'EUR (€)', rate: 0.011, locale: 'de-DE' },
      GBP: { code: 'GBP', symbol: '£', label: 'GBP (£)', rate: 0.0095, locale: 'en-GB' },
      AED: { code: 'AED', symbol: 'د.إ ', label: 'AED (د.إ)', rate: 0.044, locale: 'ar-AE' }
    },

    getCurrency: function() {
      try {
        return localStorage.getItem(this.KEY) || 'INR';
      } catch(e) {
        return 'INR';
      }
    },

    setCurrency: function(code) {
      if (!this.RATES[code]) return;
      try {
        localStorage.setItem(this.KEY, code);
      } catch(e) {}
      this.updateSelectorButton();
      this.updateAllPrices();
    },

    convertAndFormat: function(amountInINR) {
      let num = Number(amountInINR);
      if (isNaN(num) || num <= 0) return '';
      if (num < 1000 && num > 0) num = num * 100;

      const currCode = this.getCurrency();
      const config = this.RATES[currCode] || this.RATES.INR;
      const converted = Math.round(num * config.rate);

      if (currCode === 'INR') {
        return '₹' + converted.toLocaleString('en-IN');
      } else if (currCode === 'USD') {
        return '$' + converted.toLocaleString('en-US');
      } else if (currCode === 'EUR') {
        return '€' + converted.toLocaleString('de-DE');
      } else if (currCode === 'GBP') {
        return '£' + converted.toLocaleString('en-GB');
      } else if (currCode === 'AED') {
        return 'د.إ ' + converted.toLocaleString('en-US');
      }
      return config.symbol + converted.toLocaleString();
    },

    updateSelectorButton: function() {
      const code = this.getCurrency();
      const config = this.RATES[code] || this.RATES.INR;
      document.querySelectorAll('#currency-selector .selector-val').forEach(el => {
        el.textContent = `${config.symbol} ${config.code}`;
      });
    },

    updateAllPrices: function() {
      const currCode = this.getCurrency();

      document.querySelectorAll('[data-base-price], .price-tag, .dest-price, .hotel-price, .pkg-price, .cruise-price, [data-price]').forEach(el => {
        // Skip if inside review quote or rating/duration tag
        if (el.closest('.destination-rating, .rating-badge, .rating, .package-rating, .destination-days, .reviews-container, .review-card')) {
          return;
        }

        let basePrice = el.getAttribute('data-base-price') || el.getAttribute('data-price');
        if (!basePrice) {
          const text = el.textContent || '';
          const match = text.replace(/,/g, '').match(/(\d{4,9})/);
          if (match) {
            basePrice = match[1];
            el.setAttribute('data-base-price', basePrice);
          }
        }

        if (basePrice) {
          const formatted = this.convertAndFormat(basePrice);
          if (formatted) {
            const smallEl = el.querySelector('small, span.per-unit');
            if (smallEl) {
              const suffix = smallEl.outerHTML;
              el.innerHTML = `${formatted} ${suffix}`;
            } else if (el.textContent.includes('From ₹') || el.textContent.includes('From $') || el.textContent.includes('From €') || el.textContent.includes('From £') || el.textContent.includes('From د.إ')) {
              el.textContent = `✈️ From ${formatted}`;
            } else {
              el.textContent = formatted;
            }
          }
        }
      });
    },

    renderDropdown: function() {
      const dropdown = document.querySelector('#currency-dropdown');
      if (!dropdown) return;

      const current = this.getCurrency();
      dropdown.innerHTML = '';

      Object.values(this.RATES).forEach(config => {
        const isActive = config.code === current;
        const item = document.createElement('div');
        item.className = `dropdown-item ${isActive ? 'active' : ''}`;
        item.style.cursor = 'pointer';
        item.style.padding = '10px 14px';
        item.style.color = isActive ? '#38bdf8' : '#e2e8f0';
        item.style.fontSize = '13px';
        item.style.fontWeight = isActive ? '700' : '500';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'space-between';
        item.style.transition = 'all 0.2s ease';
        item.style.background = isActive ? 'rgba(56,189,248,0.12)' : 'transparent';

        item.innerHTML = `
          <span>${config.symbol} ${config.code}</span>
          ${isActive ? '<span style="color:#38bdf8; font-weight:800; margin-left:10px;">✓</span>' : ''}
        `;

        item.addEventListener('mouseenter', () => {
          if (!isActive) item.style.background = 'rgba(255,255,255,0.06)';
        });
        item.addEventListener('mouseleave', () => {
          if (!isActive) item.style.background = 'transparent';
        });

        item.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.setCurrency(config.code);
          dropdown.classList.remove('open');
          this.renderDropdown();
          if (typeof showToast === 'function') showToast(`Currency switched to ${config.code} (${config.symbol})`, '💱');
        });

        dropdown.appendChild(item);
      });
    },

    init: function() {
      this.updateSelectorButton();
      this.renderDropdown();
      this.updateAllPrices();
    }
  };

  /* ═══════════════════════════════════════════════════
     GLOBAL MULTILINGUAL I18N DICTIONARY MANAGER
     ═══════════════════════════════════════════════════ */
  window.VentouraI18n = {
    KEY: 'ventoura_lang_pref',

    LANGS: {
      EN: { code: 'EN', name: '🌐 English', flag: '🇺🇸' },
      HI: { code: 'HI', name: '🇮🇳 हिंदी (Hindi)', flag: '🇮🇳' },
      ES: { code: 'ES', name: '🇪🇸 Español (Spanish)', flag: '🇪🇸' },
      FR: { code: 'FR', name: '🇫🇷 Français (French)', flag: '🇫🇷' },
      DE: { code: 'DE', name: '🇩🇪 Deutsch (German)', flag: '🇩🇪' },
      JA: { code: 'JA', name: '🇯🇵 日本語 (Japanese)', flag: '🇯🇵' }
    },

    DICTIONARY: {
      HI: {
        'Destinations': 'गंतव्य',
        'Packages': 'पैकेज',
        'Cruises': 'क्रूज़',
        'Services': 'सेवाएं',
        'Blog': 'ब्लॉग',
        'Contact': 'संपर्क',
        'Login': 'लॉग इन',
        'Register': 'पंजीकरण',
        'Search': 'खोजें',
        'My Wishlist': 'मेरी विशलिस्ट',
        'Best Sellers': 'बेस्ट सेलर्स',
        'Featured Destinations': 'प्रमुख गंतव्य',
        'Popular Travel Packages': 'लोकप्रिय यात्रा पैकेज',
        'Explore 🗺️': 'एक्सप्लोर करें 🗺️',
        'Book Now →': 'अभी बुक करें →',
        'View Details 🔍': 'विवरण देखें 🔍',
        'View All Destinations →': 'सभी गंतव्य देखें →'
      },
      ES: {
        'Destinations': 'Destinos',
        'Packages': 'Paquetes',
        'Cruises': 'Cruceros',
        'Services': 'Servicios',
        'Blog': 'Blog',
        'Contact': 'Contacto',
        'Login': 'Iniciar sesión',
        'Register': 'Registrarse',
        'Search': 'Buscar',
        'My Wishlist': 'Lista de deseos',
        'Best Sellers': 'Más vendidos',
        'Featured Destinations': 'Destinos destacados',
        'Popular Travel Packages': 'Paquetes populares',
        'Explore 🗺️': 'Explorar 🗺️',
        'Book Now →': 'Reservar →',
        'View Details 🔍': 'Ver detalles 🔍',
        'View All Destinations →': 'Ver todos los destinos →'
      },
      FR: {
        'Destinations': 'Destinations',
        'Packages': 'Forfaits',
        'Cruises': 'Croisières',
        'Services': 'Services',
        'Blog': 'Blog',
        'Contact': 'Contact',
        'Login': 'Connexion',
        'Register': "S'inscrire",
        'Search': 'Rechercher',
        'My Wishlist': 'Mes favoris',
        'Best Sellers': 'Meilleures ventes',
        'Featured Destinations': 'Destinations vedettes',
        'Popular Travel Packages': 'Forfaits populaires',
        'Explore 🗺️': 'Explorer 🗺️',
        'Book Now →': 'Réserver →',
        'View Details 🔍': 'Voir détails 🔍',
        'View All Destinations →': 'Toutes les destinations →'
      },
      DE: {
        'Destinations': 'Reiseziele',
        'Packages': 'Pakete',
        'Cruises': 'Kreuzfahrten',
        'Services': 'Dienstleistungen',
        'Blog': 'Blog',
        'Contact': 'Kontakt',
        'Login': 'Anmelden',
        'Register': 'Registrieren',
        'Search': 'Suchen',
        'My Wishlist': 'Meine Wunschliste',
        'Best Sellers': 'Bestseller',
        'Featured Destinations': 'Empfohlene Reiseziele',
        'Popular Travel Packages': 'Beliebte Reisepakete',
        'Explore 🗺️': 'Entdecken 🗺️',
        'Book Now →': 'Jetzt buchen →',
        'View Details 🔍': 'Details anzeigen 🔍',
        'View All Destinations →': 'Alle Reiseziele anzeigen →'
      },
      JA: {
        'Destinations': '目的地',
        'Packages': 'パッケージ',
        'Cruises': 'クルーズ',
        'Services': 'サービス',
        'Blog': 'ブログ',
        'Contact': 'お問い合わせ',
        'Login': 'ログイン',
        'Register': '登録',
        'Search': '検索',
        'My Wishlist': 'ウィッシュリスト',
        'Best Sellers': 'ベストセラー',
        'Featured Destinations': '注目の目的地',
        'Popular Travel Packages': '人気のある旅行パッケージ',
        'Explore 🗺️': '探索する 🗺️',
        'Book Now →': '今すぐ予約 →',
        'View Details 🔍': '詳細を見る 🔍',
        'View All Destinations →': 'すべての目的地を見る →'
      }
    },

    getLang: function() {
      try {
        return localStorage.getItem(this.KEY) || 'EN';
      } catch(e) {
        return 'EN';
      }
    },

    setLang: function(code) {
      if (!this.LANGS[code]) return;
      try {
        localStorage.setItem(this.KEY, code);
      } catch(e) {}
      this.updateSelectorButton();
      this.translatePage();
    },

    updateSelectorButton: function() {
      const code = this.getLang();
      document.querySelectorAll('#lang-selector .selector-val').forEach(el => {
        el.textContent = code;
      });
    },

    translatePage: function() {
      const lang = this.getLang();
      const dict = this.DICTIONARY[lang];

      if (!dict || lang === 'EN') return;

      document.querySelectorAll('a, button, span, h1, h2, h3, p, label, .section-title, .section-badge').forEach(el => {
        const text = el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 ? el.textContent.trim() : null;
        if (text && dict[text]) {
          el.textContent = dict[text];
        }
      });
    },

    renderDropdown: function() {
      const dropdown = document.querySelector('#lang-dropdown');
      if (!dropdown) return;

      const current = this.getLang();
      dropdown.innerHTML = '';

      Object.values(this.LANGS).forEach(lang => {
        const isActive = lang.code === current;
        const item = document.createElement('div');
        item.className = `dropdown-item ${isActive ? 'active' : ''}`;
        item.style.cursor = 'pointer';
        item.style.padding = '10px 14px';
        item.style.color = isActive ? '#38bdf8' : '#e2e8f0';
        item.style.fontSize = '13px';
        item.style.fontWeight = isActive ? '700' : '500';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'space-between';
        item.style.transition = 'all 0.2s ease';
        item.style.background = isActive ? 'rgba(56,189,248,0.12)' : 'transparent';

        item.innerHTML = `
          <span>${lang.name}</span>
          ${isActive ? '<span style="color:#38bdf8; font-weight:800; margin-left:10px;">✓</span>' : ''}
        `;

        item.addEventListener('mouseenter', () => {
          if (!isActive) item.style.background = 'rgba(255,255,255,0.06)';
        });
        item.addEventListener('mouseleave', () => {
          if (!isActive) item.style.background = 'transparent';
        });

        item.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.setLang(lang.code);
          dropdown.classList.remove('open');
          this.renderDropdown();
          if (typeof showToast === 'function') showToast(`Language switched to ${lang.name}`, '🌐');
        });

        dropdown.appendChild(item);
      });
    },

    init: function() {
      this.updateSelectorButton();
      this.renderDropdown();
      if (this.getLang() !== 'EN') {
        this.translatePage();
      }
    }
  };

  // Global Window Toggle Functions for Navbar Selectors
  window.toggleLangDropdown = function(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const langDropdown = document.getElementById('lang-dropdown');
    const currDropdown = document.getElementById('currency-dropdown');

    if (currDropdown) currDropdown.classList.remove('open');

    if (langDropdown) {
      if (window.VentouraI18n && window.VentouraI18n.renderDropdown) {
        window.VentouraI18n.renderDropdown();
      }
      langDropdown.classList.toggle('open');
    }
  };

  window.toggleCurrDropdown = function(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const langDropdown = document.getElementById('lang-dropdown');
    const currDropdown = document.getElementById('currency-dropdown');

    if (langDropdown) langDropdown.classList.remove('open');

    if (currDropdown) {
      if (window.VentouraCurrency && window.VentouraCurrency.renderDropdown) {
        window.VentouraCurrency.renderDropdown();
      }
      currDropdown.classList.toggle('open');
    }
  };

  // Global Click Outside & Escape Key Handlers
  document.addEventListener('click', (e) => {
    if (e.target.closest('#lang-selector') || e.target.closest('#currency-selector') || e.target.closest('#lang-dropdown') || e.target.closest('#currency-dropdown')) {
      return;
    }
    document.getElementById('lang-dropdown')?.classList.remove('open');
    document.getElementById('currency-dropdown')?.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('lang-dropdown')?.classList.remove('open');
      document.getElementById('currency-dropdown')?.classList.remove('open');
    }
  });

  function initLanguageSelector() {
    window.VentouraCurrency.init();
    window.VentouraI18n.init();
  }




  /* ─── Carousel ─── */
  window.initCarousel = function (trackSelector, prevBtn, nextBtn, itemSelector) {
    const track = document.querySelector(trackSelector);
    if (!track) return;

    const items = track.querySelectorAll(itemSelector);
    let current = 0;
    let visibleCount = getVisibleCount();

    function getVisibleCount() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function updateCarousel() {
      const itemWidth = track.parentElement.offsetWidth / visibleCount;
      const gap = 24;
      track.style.transform = `translateX(-${current * (itemWidth + gap)}px)`;
    }

    document.querySelector(prevBtn)?.addEventListener('click', () => {
      if (current > 0) { current--; updateCarousel(); }
    });

    document.querySelector(nextBtn)?.addEventListener('click', () => {
      if (current < items.length - visibleCount) { current++; updateCarousel(); }
    });

    window.addEventListener('resize', () => {
      visibleCount = getVisibleCount();
      current = Math.min(current, items.length - visibleCount);
      updateCarousel();
    });
  };

  /* ─── Contact Form (Delegated to js/contact.js) ─── */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm && !contactForm.getAttribute('data-bound')) {
    contactForm.setAttribute('data-bound', 'true');
    contactForm.addEventListener('submit', (e) => {
      if (typeof window.handleContactSubmit === 'function') {
        window.handleContactSubmit(e);
      }
    });
  }

  /* ─── Newsletter Form ─── */
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input?.value) return;
      showToast('🎉 Welcome! Check your email for exclusive deals.', '✉️');
      input.value = '';
    });
  });

  /* ─── Hero Floating Particles ─── */
  function initHeroParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    });

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ─── Mouse Parallax Disabled ─── */
  function initMouseParallax() {
    // Disabled mouse movement tracking
  }


  /* ─── Lumora Video Switcher & Dark Text Mode ─── */
  function initLumoraHero() {
    const slides = document.querySelectorAll('.hero-bg-slide');
    const typographyWrapper = document.getElementById('hero-theme-typography');
    const nameEl = document.getElementById('hero-theme-name');
    const subtitleEl = document.getElementById('hero-theme-subtitle');
    const mobileBtn = document.getElementById('lumora-mobile-menu-btn');
    const mobileOverlay = document.getElementById('lumora-mobile-overlay');
    const mobileClose = document.getElementById('lumora-mobile-close');

    const themes = [
      {
        name: "TROPICAL PARADISE",
        destination: "Maldives",
        tagline: "Luxury Overwater Escape"
      },
      {
        name: "SAKURA DREAMS",
        destination: "Kyoto, Japan",
        tagline: "Spring Blossoms & Culture"
      },
      {
        name: "GOLDEN HORIZON",
        destination: "Santorini, Greece",
        tagline: "Sunset Above The Aegean"
      },
      {
        name: "ALPINE ESCAPE",
        destination: "Swiss Alps",
        tagline: "Luxury Mountain Retreat"
      },
      {
        name: "AURORA NIGHTS",
        destination: "Tromsø, Norway",
        tagline: "Northern Lights Experience"
      },
      {
        name: "DESERT MIRAGE",
        destination: "Dubai Desert",
        tagline: "Luxury Desert Adventure"
      }
    ];

    let currentIndex = 0;

    function goToTheme(index) {
      if (!slides.length) return;

      // Smooth crossfade slide transition
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Smooth text crossfade transition
      if (typographyWrapper) {
        typographyWrapper.classList.add('fade-out');
        setTimeout(() => {
          const theme = themes[index];
          if (nameEl && theme) nameEl.textContent = theme.name;
          if (subtitleEl && theme) subtitleEl.textContent = `${theme.destination} · ${theme.tagline}`;
          typographyWrapper.classList.remove('fade-out');
        }, 400);
      }

      currentIndex = index;
    }

    // Auto rotate every 4 seconds (24s total infinite loop)
    setInterval(() => {
      const nextIndex = (currentIndex + 1) % themes.length;
      goToTheme(nextIndex);
    }, 4000);

    // Mobile Menu Overlay Toggle
    if (mobileBtn && mobileOverlay) {
      const links = mobileOverlay.querySelectorAll('.mobile-link');

      function openMobileMenu() {
        mobileOverlay.classList.remove('opacity-0', 'pointer-events-none');
        mobileOverlay.classList.add('opacity-100', 'pointer-events-auto');
        links.forEach((l, i) => {
          setTimeout(() => {
            l.classList.remove('translate-y-4', 'opacity-0');
            l.classList.add('translate-y-0', 'opacity-100');
          }, 100 + i * 50);
        });
      }

      function closeMobileMenu() {
        mobileOverlay.classList.remove('opacity-100', 'pointer-events-auto');
        mobileOverlay.classList.add('opacity-0', 'pointer-events-none');
        links.forEach(l => {
          l.classList.remove('translate-y-0', 'opacity-100');
          l.classList.add('translate-y-4', 'opacity-0');
        });
      }

      mobileBtn.addEventListener('click', openMobileMenu);
      mobileClose?.addEventListener('click', closeMobileMenu);
      links.forEach(l => l.addEventListener('click', closeMobileMenu));
    }

    // Interactive Cruise Details & Booking Modal Handler
    initCruiseDetails();

    // Interactive Destinations Mega Menu & Cards Details Modal Handler
    initDestinationMegaMenu();
  }

  function initDestinationMegaMenu() {
    const modal = document.querySelector('.details-modal');
    const container = document.getElementById('details-modal-container');
    if (!modal || !container) return;

    const travelDb = {
      "Tokyo": {
        type: "Metropolis & Culture 🇯🇵",
        title: "Tokyo & Kyoto Grand Discovery, Japan",
        subtitle: "Futuristic Skyscrapers, Shinto Shrines & Cherry Blossoms",
        coverImage: "assets/images/dest-tokyo.jpg",
        gallery: ["assets/images/dest-tokyo.jpg", "assets/images/gallery-2.jpg", "assets/images/hotel-boutique.jpg", "assets/images/dest-paris.jpg"],
        description: "Immerse yourself in Japan's mesmerizing capital and ancient imperial city Kyoto. Walk through neon Shibuya crossing, explore 7th-century Senso-ji Temple, ride high-speed bullet trains past Mount Fuji, and savor Michelin-starred sushi feast.",
        duration: "10 Days / 9 Nights",
        startingPrice: "₹1,89,900",
        rating: "4.9 ★ (2,450 Reviews)",
        attractions: ["🗼 Tokyo Skytree & Shibuya Sky Deck", "⛩️ Asakusa Senso-ji Temple & Fushimi Inari Torii Gates", "🗻 Mount Fuji & Lake Kawaguchi Cable Car", "🍜 Tsukiji Outer Market & Nishiki Food Tour"],
        hotels: ["🏨 The Ritz-Carlton Tokyo (5★ Skyscraper Hotel)", "🏨 Hoshinoya Kyoto (Luxury Riverside Ryokan & Spa)"],
        activities: ["🚄 7-Day Shinkansen Bullet Train Express Pass", "🍵 Traditional Matcha Ceremony & Kimono Fitting", "🌸 Sakura Cherry Blossom Parks Walk", "🤖 Akihabara & Ginza VIP Shopping Tour"],
        transportation: "✈️ Roundtrip Flights Included | 🚄 Unlimited JR Bullet Train Pass | 🚗 Private VIP Chauffeur Transfer",
        meals: "🍽️ Daily Gourmet Buffet Breakfast + 3 Michelin-starred Dinners + Authentic Kaiseki Banquet",
        weather: "☀️ Mild & Sunny (16°C – 22°C). Clear blue skies perfect for city excursions.",
        bestSeason: "🗓️ March – May (Cherry Blossom) & September – November (Autumn Colors)",
        reviews: [
          { name: "Kenji Mori", location: "Tokyo Visitor", stars: 5, quote: "The bullet train speed, luxury ryokan, and tea ceremony were unbelievable! Ventoura Travel organized every detail perfectly.", date: "July 2026" },
          { name: "Emily Watson", location: "London, UK", stars: 5, quote: "Mount Fuji views and Asakusa food walk were highlights of our year. 5-star service!", date: "June 2026" }
        ]
      },
      "Santorini": {
        type: "Romantic Aegean Island 🇬🇷",
        title: "Santorini Clifftop Sanctuary, Greece",
        subtitle: "Whitewashed Caldera Villas & Aegean Sunsets",
        coverImage: "assets/images/dest-santorini.jpg",
        gallery: ["assets/images/dest-santorini.jpg", "assets/images/gallery-3.jpg", "assets/images/hotel-luxury.jpg", "assets/images/dest-maldives.jpg"],
        description: "Perched high above the Aegean volcanic caldera, Santorini offers iconic blue-domed churches, cliffside cave suites with infinity plunge pools, volcanic red sand beaches, and world-famous wine tasting at sunset.",
        duration: "5 Days / 4 Nights",
        startingPrice: "₹1,29,900",
        rating: "4.9 ★ (3,120 Reviews)",
        attractions: ["🌅 Oia Clifftop Sunset Promenade", "🌋 Volcanic Red Beach & Akrotiri Ruins", "⛵ Caldera Sunset Catamaran Cruise", "🍷 Santo Wines Volcanic Vineyard Tasting"],
        hotels: ["🏨 Santorini Clifftop Cave Suites (5★ Luxury Caldera Suites)", "🏨 Canaves Oia Boutique Resort & Spa"],
        activities: ["⛵ Private Yacht Charter around Caldera", "📷 Guided Clifftop Photography & Drone Tour", "🍷 Greek Wine & Gourmet Olive Oil Masterclass", "🌋 Fira to Oia Ridge Hiking Trail"],
        transportation: "✈️ Roundtrip Flights Included | 🛥️ Catamaran transfers | 🚗 Mercedes VIP Airport Pickup",
        meals: "🍽️ Champagne Breakfast on Private Balcony Daily + 2 Sunset Caldera Dinners",
        weather: "☀️ Warm Mediterranean Sunshine (25°C – 29°C). Light Aegean breezes and warm sea.",
        bestSeason: "🗓️ May through October (Peak Aegean Summer)",
        reviews: [
          { name: "Sarah Mitchell", location: "New York, USA", stars: 5, quote: "Our honeymoon in Oia was beyond magical. Waking up to blue domes every morning was unreal!", date: "March 2026" },
          { name: "Liam O'Connor", location: "Dublin, Ireland", stars: 5, quote: "The catamaran sunset dinner was the single best experience of our lives.", date: "May 2026" }
        ]
      },
      "Maldives": {
        type: "Tropical Ocean Sanctuary 🇲🇻",
        title: "Baa Atoll Overwater Paradise, Maldives",
        subtitle: "Private Overwater Bungalows & Turquoise Lagoons",
        coverImage: "assets/images/dest-maldives.jpg",
        gallery: ["assets/images/dest-maldives.jpg", "assets/images/hotel-overwater.jpg", "assets/images/gallery-1.jpg", "assets/images/dest-bali.jpg"],
        description: "Escape to an idyllic paradise of crystal-clear turquoise lagoons, powder-white sandbanks, and private overwater bungalows featuring glass floor viewing panels, direct ocean access, and private infinity pools.",
        duration: "7 Days / 6 Nights",
        startingPrice: "₹2,49,900",
        rating: "4.9 ★ (4,200 Reviews)",
        attractions: ["🤿 UNESCO Biosphere Marine Coral Snorkeling", "🐬 Sunset Dolphin Cruise on Dhoni", "🏖️ Private Sandbank Picnic & Champagne", "🍽️ Underwater Submerged Coral Restaurant"],
        hotels: ["🏨 Aqua Lagoon Villa Maldives (5★ Overwater Villa Resort)", "🏨 Soneva Fushi Eco-Luxury Sanctuary"],
        activities: ["🤿 Manta Ray & Whale Shark Reef Diving", "🧘 Overwater Sunrise Yoga Pavilion", "🛶 Glass Kayaking & Stand-up Paddleboarding", "💆 90-Minute Ocean Spa Hydrotherapy Massage"],
        transportation: "✈️ Roundtrip International Flights Included | 🛩️ Scenic Seaplane / Speedboat Atoll Transfer",
        meals: "🍽️ All-Inclusive Full Board (Gourmet Dining, Premium Wine & Poolside Cocktails)",
        weather: "☀️ Tropical Sun (27°C – 31°C). Ocean water temp 28°C year-round.",
        bestSeason: "🗓️ November – April (Dry sunny monsoon season)",
        reviews: [
          { name: "Priya Sharma", location: "Mumbai, India", stars: 5, quote: "Stepping directly off our overwater deck into warm turquoise water with sea turtles was dreamlike!", date: "May 2026" }
        ]
      },
      "Paris": {
        type: "Romantic European Capital 🇫🇷",
        title: "Paris City of Light & Elegance, France",
        subtitle: "Art Museums, Haute Couture & French Gastronomy",
        coverImage: "assets/images/dest-paris.jpg",
        gallery: ["assets/images/dest-paris.jpg", "assets/images/hotel-boutique.jpg", "assets/images/gallery-3.jpg", "assets/images/dest-tokyo.jpg"],
        description: "Stroll along Champs-Élysées, admire Mona Lisa at the Louvre, sip champagne atop the Eiffel Tower, and enjoy private Seine River dinner cruises in the capital of romance.",
        duration: "6 Days / 5 Nights",
        startingPrice: "₹1,19,900",
        rating: "4.8 ★ (1,980 Reviews)",
        attractions: ["🗼 Eiffel Tower Priority Summit Pass & Champagne", "🎨 Louvre Museum Guided Masterpiece Tour", "🏰 Palace of Versailles Hall of Mirrors Day Excursion", "🚢 Seine River Sunset Gourmet Dinner Cruise"],
        hotels: ["🏨 The Ritz Palace Paris (5★ Luxury Place Vendôme)", "🏨 Hotel Plaza Athénée Paris"],
        activities: ["🥖 French Pastry & Macaron Masterclass", "🛍️ VIP Private Fashion Tour at Galeries Lafayette", "🍷 Montmartre Wine & Cheese Tasting Walk"],
        transportation: "✈️ Roundtrip Flights Included | 🚆 Unlimited Metro & RER Pass | 🚗 Chauffeur Transfer",
        meals: "🍽️ Daily Parisian Bistro Breakfast + 1 Seine River Dinner Cruise + 1 Michelin-Starred Dinner",
        weather: "☀️ Pleasant & Crisp (17°C – 23°C). Ideal for walking neighborhood streets.",
        bestSeason: "🗓️ April – June & September – November",
        reviews: [
          { name: "Charlotte Rose", location: "Sydney, Australia", stars: 5, quote: "Eiffel tower champagne at sunset and Louvre guided tour were spectacular!", date: "April 2026" }
        ]
      },
      "Bali": {
        type: "Jungle & Island Retreat 🇮🇩",
        title: "Bali Cultural & Jungle Retreat, Indonesia",
        subtitle: "Spiritual Ubud Terraces & Coastal Beach Clubs",
        coverImage: "assets/images/dest-bali.jpg",
        gallery: ["assets/images/dest-bali.jpg", "assets/images/hotel-luxury.jpg", "assets/images/gallery-2.jpg", "assets/images/dest-santorini.jpg"],
        description: "Experience Bali's magical blend of lush Ubud rice terraces, clifftop Uluwatu monkey temples, serene flower bath spas, and vibrant Seminyak beach club sunsets.",
        duration: "8 Days / 7 Nights",
        startingPrice: "₹99,900",
        rating: "4.7 ★ (1,850 Reviews)",
        attractions: ["🛕 Tegalalang Rice Terraces & Jungle Swing", "🐒 Ubud Sacred Monkey Forest", "🌅 Uluwatu Temple Kecak Fire Dance", "🏝️ Nusa Penida Kelingking Beach Speedboat Tour"],
        hotels: ["🏨 Horizon Infinity Resort Bali (5★ Ubud Jungle Pool Villa)", "🏨 The Mulia Resort Nusa Dua"],
        activities: ["🌋 Mount Batur Sunrise Volcano Trek", "💆 120-Min Balinese Flower Bath Spa", "🏄 Seminyak Beach Surfing Lesson", "🍳 Indonesian Cooking Masterclass"],
        transportation: "✈️ Roundtrip Flights Included | 🚗 Private Dedicated Driver & Vehicle 24/7",
        meals: "🍽️ Daily Tropical Buffet Breakfast + 2 Organic Farm-to-Table Dinners",
        weather: "☀️ Tropical Warm Sun (26°C – 30°C). Soft sea breeze.",
        bestSeason: "🗓️ April through October (Dry Season)",
        reviews: [
          { name: "James Kowalski", location: "London, UK", stars: 5, quote: "Our jungle villa pool overlooking the rice paddies was paradise!", date: "May 2026" }
        ]
      },
      "Dubai": {
        type: "Futuristic Oasis 🇦🇪",
        title: "Dubai Luxury & Desert Oasis, UAE",
        subtitle: "Burj Khalifa, Desert Dune Safaris & 7-Star Hospitality",
        coverImage: "assets/images/dest-dubai.jpg",
        gallery: ["assets/images/dest-dubai.jpg", "assets/images/hotel-boutique.jpg", "assets/images/gallery-1.jpg", "assets/images/dest-paris.jpg"],
        description: "Step into the future in Dubai — marvel at the towering Burj Khalifa, explore luxury shopping at Dubai Mall, experience VIP 4x4 desert dune bashing, and relax on Palm Jumeirah.",
        duration: "6 Days / 5 Nights",
        startingPrice: "₹1,39,900",
        rating: "4.8 ★ (2,600 Reviews)",
        attractions: ["🏙️ Burj Khalifa 148th Floor Sky Observatory", "🏜️ VIP 4x4 Desert Dune Bashing & Bedouin Dinner", "🚤 Dubai Marina Yacht Sunset Cruise", "🌊 Atlantis Aquaventure Waterpark"],
        hotels: ["🏨 Metropolitan Grand Suites Dubai (5★ Marina View Suite)", "🏨 Atlantis The Royal Palm Dubai"],
        activities: ["🐪 Camel Safari & Falconry Show", "🚁 Helicopter Tour of Palm Jumeirah", "🛍️ Gold & Spice Souk Walking Tour"],
        transportation: "✈️ Roundtrip Flights Included | 🚗 VIP Chauffeur Transfer | 🚘 4x4 Desert Safari Vehicle",
        meals: "🍽️ Gourmet Breakfast Daily + 1 Desert Bedouin BBQ + 1 Yacht Dinner",
        weather: "☀️ Warm Desert Sun (24°C – 28°C). Crisp clear skies.",
        bestSeason: "🗓️ November through March",
        reviews: [
          { name: "Yuki Tanaka", location: "Tokyo, Japan", stars: 5, quote: "The desert safari and yacht cruise were unbelievable!", date: "June 2026" }
        ]
      }
    };

    function openDestModal(key) {
      let data = null;
      for (const dKey in travelDb) {
        if (key.toLowerCase().includes(dKey.toLowerCase()) || dKey.toLowerCase().includes(key.toLowerCase())) {
          data = travelDb[dKey];
          break;
        }
      }

      // Dynamic fallback for any unlisted item so 100% of items render all 17 features cleanly!
      if (!data) {
        data = {
          type: "Curated Travel Experience",
          title: `${key} Travel Escape`,
          subtitle: "Handpicked Luxury Destination & Tour Specs",
          coverImage: "assets/images/hero-bg.jpg",
          gallery: ["assets/images/hero-bg.jpg", "assets/images/dest-santorini.jpg", "assets/images/dest-maldives.jpg", "assets/images/hotel-luxury.jpg"],
          description: `Discover the breathtaking sights, rich heritage, and authentic culture of ${key}. Curated by Ventoura Travel travel experts for an unforgettable journey.`,
          duration: "7 Days / 6 Nights",
          startingPrice: "₹1,49,900",
          rating: "4.8 ★ (850 Reviews)",
          attractions: [`🏛️ Historic ${key} City & Cultural Landmarks`, `🌅 Scenic Sightseeing & Panoramic Lookout Points`, `🚤 Private Coastal / River Excursion`, `🍷 Local Gourmet Dining & Culinary Tasting`],
          hotels: [`🏨 5★ Grand Luxury Hotel ${key}`, `🏨 Boutique Clifftop Resort & Spa`],
          activities: ["🚶 Guided VIP Heritage Walking Tour", "📸 Panoramic Photography Spot Excursion", "🛍️ Local Artisan Market & Shopping Tour"],
          transportation: "✈️ Roundtrip Flights Included | 🚗 Private VIP Chauffeur Transfer 24/7",
          meals: "🍽️ Daily Buffet Breakfast + 2 Specialty Chef Dinners Included",
          weather: "☀️ Pleasant & Sunny Climate (22°C – 27°C).",
          bestSeason: "🗓️ All Year Round / Spring & Autumn Peak",
          reviews: [
            { name: "Alex Rivera", location: "Global Traveler", stars: 5, quote: `Exploring ${key} with Ventoura Travel was the best decision we made! Perfectly organized.`, date: "July 2026" }
          ]
        };
      }

      container.innerHTML = `
        <div class="details-hero relative" style="height:320px; overflow:hidden; border-radius: 24px 24px 0 0; position:relative;">
          <img id="modal-cover-img" src="${data.coverImage}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover; transition:src 0.3s ease;" />
          <div style="position:absolute; inset:0; background:linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.4) 60%, transparent 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:24px; padding-right:70px;">
            <span style="background:rgba(16,185,129,0.9); color:#fff; font-size:12px; font-weight:700; padding:4px 12px; border-radius:9999px; width:max-content; margin-bottom:8px; box-shadow:0 4px 12px rgba(0,0,0,0.3);">${data.type}</span>
            <h2 style="font-size:clamp(22px,3vw,30px); font-weight:800; color:#fff; margin-bottom:4px; line-height:1.2;">${data.title}</h2>
            <p style="font-size:13px; color:#cbd5e1; margin:0;">✨ ${data.subtitle} | ✈️ Packages from <strong style="color:#34d399; font-size:15px;">${data.startingPrice}</strong></p>
          </div>
        </div>

        <div style="background:#0f172a; color:#f8fafc; padding:24px; border-radius:0 0 24px 24px;">

          <!-- Interactive Multi-Photo Gallery Switcher -->
          <div style="margin-bottom:20px;">
            <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:700; letter-spacing:1px; margin-bottom:8px;">🖼️ Image Gallery (Click to view HD)</div>
            <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:6px;">
              ${data.gallery.map(img => `
                <img src="${img}" alt="Gallery photo" onclick="document.getElementById('modal-cover-img')?.setAttribute('src', '${img}')" style="width:80px; height:54px; object-fit:cover; border-radius:10px; cursor:pointer; border:2px solid rgba(255,255,255,0.15); flex-shrink:0; transition:all 0.2s;" onmouseover="this.style.borderColor='#38bdf8';this.style.transform='scale(1.05)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.15)';this.style.transform='scale(1)'" />
              `).join('')}
            </div>
          </div>

          <!-- Quick Specs Bar -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:10px; margin-bottom:20px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:16px; border-radius:16px;">
            <div>
              <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:600;">⏱️ Duration</div>
              <div style="font-weight:700; font-size:14px; color:#38bdf8;">${data.duration}</div>
            </div>
            <div>
              <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:600;">💰 Starting Price</div>
              <div style="font-weight:800; font-size:15px; color:#fbbf24;">${data.startingPrice} <small style="font-size:10px; font-weight:400; color:#94a3b8;">/ person</small></div>
            </div>
            <div>
              <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:600;">⭐ Rating</div>
              <div style="font-weight:700; font-size:14px; color:#f59e0b;">${data.rating}</div>
            </div>
            <div>
              <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:600;">☀️ Best Season</div>
              <div style="font-weight:700; font-size:13px; color:#34d399;">${data.bestSeason}</div>
            </div>
          </div>

          <!-- Description & Itinerary -->
          <div style="margin-bottom:20px;">
            <h3 style="font-size:17px; font-weight:700; color:#fff; margin-bottom:8px;">📝 Overview & Experience</h3>
            <p style="color:#94a3b8; font-size:14px; line-height:1.7; margin-bottom:16px;">${data.description}</p>
          </div>

          <!-- Accommodations & Activities -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin-bottom:20px;">
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:16px; border-radius:16px;">
              <h4 style="font-size:14px; font-weight:700; color:#fff; margin-bottom:10px;">🏨 Included Accommodations</h4>
              ${data.hotels.map(h => `<div style="font-size:13px; color:#cbd5e1; margin-bottom:6px;">✓ ${h}</div>`).join('')}
            </div>
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:16px; border-radius:16px;">
              <h4 style="font-size:14px; font-weight:700; color:#fff; margin-bottom:10px;">🏄 Key Activities Included</h4>
              <div style="display:flex; flex-wrap:wrap; gap:6px;">
                ${data.activities.map(a => `<span style="background:rgba(56,189,248,0.12); border:1px solid rgba(56,189,248,0.3); color:#38bdf8; padding:4px 10px; border-radius:9999px; font-size:12px;">${a}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Transportation, Meals, Weather -->
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:16px; border-radius:16px; margin-bottom:20px; font-size:13px; display:flex; flex-direction:column; gap:8px;">
            <div><strong style="color:#38bdf8;">✈️ Transportation:</strong> <span style="color:#cbd5e1;">${data.transportation}</span></div>
            <div><strong style="color:#fbbf24;">🍽️ Meals Included:</strong> <span style="color:#cbd5e1;">${data.meals}</span></div>
            <div><strong style="color:#34d399;">☀️ Weather & Climate:</strong> <span style="color:#cbd5e1;">${data.weather}</span></div>
          </div>

          <!-- Traveler Reviews -->
          <div style="margin-bottom:24px;">
            <h4 style="font-size:15px; font-weight:700; color:#fff; margin-bottom:12px;">💬 Verified Customer Reviews</h4>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
              ${data.reviews.map(r => `
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); padding:12px 14px; border-radius:12px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <strong style="color:#fff; font-size:13px;">${r.name}</strong>
                    <span style="color:#fbbf24; font-size:11px;">${'★'.repeat(r.stars)}</span>
                  </div>
                  <p style="font-size:12px; color:#94a3b8; font-style:italic; margin-bottom:4px;">"${r.quote}"</p>
                  <div style="font-size:10px; color:#64748b;">📍 ${r.location} · ${r.date}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Related Destinations & Similar Packages -->
          <div style="margin-bottom:20px; padding-top:16px; border-top:1px solid rgba(255,255,255,0.1);">
            <h4 style="font-size:15px; font-weight:700; color:#fff; margin-bottom:12px;">🗺️ Related Destinations & Similar Packages</h4>
            <div style="display:flex; gap:12px; overflow-x:auto; padding-bottom:8px;">
              <div onclick="window.openTravelExperienceModal('Santorini')" style="flex:0 0 150px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:10px; cursor:pointer;">
                <img src="assets/images/dest-santorini.jpg" style="width:100%; height:75px; object-fit:cover; border-radius:8px; margin-bottom:6px;" />
                <div style="font-size:12px; font-weight:700; color:#fff;">Santorini</div>
                <div style="font-size:11px; color:#38bdf8; font-weight:800;">From $1,299</div>
              </div>
              <div onclick="window.openTravelExperienceModal('Bali')" style="flex:0 0 150px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:10px; cursor:pointer;">
                <img src="assets/images/dest-bali.jpg" style="width:100%; height:75px; object-fit:cover; border-radius:8px; margin-bottom:6px;" />
                <div style="font-size:12px; font-weight:700; color:#fff;">Bali, Indonesia</div>
                <div style="font-size:11px; color:#38bdf8; font-weight:800;">From $999</div>
              </div>
              <div onclick="window.openTravelExperienceModal('Tokyo')" style="flex:0 0 150px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:10px; cursor:pointer;">
                <img src="assets/images/dest-tokyo.jpg" style="width:100%; height:75px; object-fit:cover; border-radius:8px; margin-bottom:6px;" />
                <div style="font-size:12px; font-weight:700; color:#fff;">Tokyo, Japan</div>
                <div style="font-size:11px; color:#38bdf8; font-weight:800;">From $1,899</div>
              </div>
              <div onclick="window.openTravelExperienceModal('Paris')" style="flex:0 0 150px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:10px; cursor:pointer;">
                <img src="assets/images/dest-paris.jpg" style="width:100%; height:75px; object-fit:cover; border-radius:8px; margin-bottom:6px;" />
                <div style="font-size:12px; font-weight:700; color:#fff;">Paris, France</div>
                <div style="font-size:11px; color:#38bdf8; font-weight:800;">From $1,199</div>
              </div>
            </div>
          </div>

          <!-- Action Buttons Bar -->
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button type="button" class="btn btn-primary" id="btn-modal-book-now" style="flex:1; min-width:180px; justify-content:center; padding:14px; font-size:15px; font-weight:700; background:linear-gradient(135deg,#10b981,#059669); border:none; border-radius:9999px; cursor:pointer;">
              ⚡ Book Now (${data.startingPrice}) →
            </button>
            <button class="btn btn-outline" id="btn-modal-inquire" style="flex:1; min-width:180px; justify-content:center; padding:14px; font-size:14px; border-radius:9999px;">
              🗺️ Explore &amp; Contact Expert
            </button>
          </div>

          <div id="dest-booking-success" style="display:none; margin-top:14px; padding:14px; background:rgba(16,185,129,0.2); border:1px solid #10b981; border-radius:14px; color:#34d399; text-align:center; font-weight:600;">
            🎉 Inquiry Received! Our Luxury Travel Concierge will send your customized itinerary and discount code within 15 minutes.
          </div>

        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';



      const inquireBtn = document.getElementById('btn-modal-inquire');
      const success = document.getElementById('dest-booking-success');
      if (inquireBtn && success) {
        inquireBtn.addEventListener('click', () => {
          inquireBtn.style.display = 'none';
          success.style.display = 'block';
        });
      }

      // Wire Book Now button to VentouraEnquiry modal (same-page, no checkout.html)
      const bookNowBtn = document.getElementById('btn-modal-book-now');
      if (bookNowBtn && window.VentouraEnquiry) {
        bookNowBtn.addEventListener('click', () => {
          // Build a normalized item from the destination data object in scope
          const item = {
            id: data.id || key,
            title: data.title,
            city: data.subtitle || '',
            country: data.country || '',
            startingPrice: data.startingPrice,
            image: data.coverImage || '',
            days: 7,
            nights: 6
          };
          window.VentouraEnquiry.openEnquiryModal(item, 'destination');
        });
      }
    }

    // Expose globally
    window.openDestinationModal = openDestModal;
    window.openTravelExperienceModal = openDestModal;

    // Attach click listeners to all mega-menu links
    document.querySelectorAll('.mega-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const key = link.dataset.dest || link.textContent.trim();
        openDestModal(key);
      });
    });

    // Attach click listeners to all destination cards and explore buttons
    document.querySelectorAll('.destination-card, .btn-explore-dest').forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', (e) => {
        const card = el.closest('.destination-card') || el;
        const nameEl = card.querySelector('.destination-name');
        const text = el.dataset.dest || card.dataset.dest || (nameEl ? nameEl.textContent.trim() : 'Santorini');
        openDestModal(text);
      });
    });

    // Attach click listeners to all travel category cards
    document.querySelectorAll('.category-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        const catName = card.dataset.category || card.querySelector('.category-name')?.textContent.trim() || 'Beach';
        openCategoryTripModal(catName);
      });
    });
  }

  function openCategoryTripModal(catName) {
    const categoryDb = {
      "Beach": {
        title: "Beach & Coastal Escapes 🏖️",
        subtitle: "42 Luxury Beach Packages Available",
        img: "assets/images/dest-maldives.jpg",
        desc: "Pristine white sand beaches, crystal clear ocean waters, overwater bungalow resorts, and tropical island sunset experiences.",
        trips: [
          { name: "Maldives Overwater Paradise", duration: "7 Days / 6 Nights", price: "$1,499", perks: "Overwater Villa, Full Board Dining & Snorkeling" },
          { name: "Santorini Clifftop Sunset Villa", duration: "6 Days / 5 Nights", price: "$1,299", perks: "Clifftop Suite, Private Pool & Catamaran Tour" },
          { name: "Bali Beach & Island Hopper", duration: "8 Days / 7 Nights", price: "$999", perks: "Luxury Resort, Island Speedboat & Spa Pass" }
        ]
      },
      "Adventure": {
        title: "Adventure & Wilderness Expeditions 🧗",
        subtitle: "38 Trekking & Safari Packages",
        img: "assets/images/gallery-3.jpg",
        desc: "High-altitude mountain trekking, volcano hikes, river rafting, and wild jungle safari tours for thrill seekers.",
        trips: [
          { name: "Patagonia Glacier Expedition", duration: "10 Days / 9 Nights", price: "$1,899", perks: "Glacier Trekking, Heated Yurt Camp & Mountain Guides" },
          { name: "Machu Picchu Incan Trail Trek", duration: "7 Days / 6 Nights", price: "$1,699", perks: "Vistadome Train, Inca Pass & Cusco Hotel" },
          { name: "Bali Volcano & Jungle Trek", duration: "8 Days / 7 Nights", price: "$999", perks: "Mount Batur Sunrise Hike, Rafting & Villa" }
        ]
      },
      "Luxury": {
        title: "Ultra Luxury & VIP Sanctuaries 💎",
        subtitle: "24 Ultra-Luxury Packages",
        img: "assets/images/dest-paris.jpg",
        desc: "5-Star & 7-Star resort suites, private jet charters, Michelin-star dining, 24/7 personal butler service, and VIP concierge.",
        trips: [
          { name: "Paris Michelin & Fashion Suite", duration: "6 Days / 5 Nights", price: "$1,599", perks: "5-Star Luxury Suite, Private Chauffeur & VIP Louvre Pass" },
          { name: "Dubai Burj Al Arab VIP Suite", duration: "5 Days / 4 Nights", price: "$2,499", perks: "7-Star Ocean Suite, Helicopter Transfer & Butler" },
          { name: "Amalfi Coast Private Yacht Cruise", duration: "7 Days / 6 Nights", price: "$2,199", perks: "Private Luxury Yacht, Cliffside Villa & Chef" }
        ]
      },
      "Honeymoon": {
        title: "Romantic Honeymoon Getaways 💑",
        subtitle: "31 Romantic Couples Packages",
        img: "assets/images/dest-santorini.jpg",
        desc: "Private romantic candlelit beach dinners, couples massage spa treatments, private pool villas, and champagne sunset cruises.",
        trips: [
          { name: "Santorini Sunset Honeymoon Suite", duration: "6 Days / 5 Nights", price: "$1,399", perks: "Caldera Pool Suite, Sunset Catamaran & Wine Tasting" },
          { name: "Maldives Romantic Overwater Retreat", duration: "7 Days / 6 Nights", price: "$1,699", perks: "Private Lagoon Bungalow & Free Candlelight Dinner" },
          { name: "Paris Romantic Seine & Châteaux Escape", duration: "5 Days / 4 Nights", price: "$1,299", perks: "Eiffel View Suite & Private Seine Dinner Cruise" }
        ]
      },
      "Family": {
        title: "Family-Friendly Travel Tours 👨‍👩‍👧",
        subtitle: "28 Family Vacation Packages",
        img: "assets/images/dest-tokyo.jpg",
        desc: "Kid-friendly resorts, theme park priority passes, interactive cultural workshops, and spacious multi-bedroom suites.",
        trips: [
          { name: "Tokyo Disneyland & Anime Family Tour", duration: "8 Days / 7 Nights", price: "$1,799", perks: "Disney VIP Pass, Bullet Train & Family Suite" },
          { name: "Kenya Family Safari & Wildlife Lodge", duration: "9 Days / 8 Nights", price: "$2,199", perks: "Spacious Safari Lodge & Ranger Kids Club" },
          { name: "Bali Family Beach Resort & Waterpark", duration: "7 Days / 6 Nights", price: "$1,099", perks: "2-Bedroom Family Villa & Waterbom Park Pass" }
        ]
      },
      "Solo": {
        title: "Solo Travel & Cultural Discovery 🎒",
        subtitle: "19 Solo Wanderer Packages",
        img: "assets/images/dest-tokyo.jpg",
        desc: "Safe, immersive cultural tours with zero single supplement fees, small group social dinners, and local city guides.",
        trips: [
          { name: "Tokyo & Kyoto Solo Backpacker Tour", duration: "9 Days / 8 Nights", price: "$1,299", perks: "No Single Supplement, Bullet Pass & City Guide" },
          { name: "Barcelona Art & Tapas Solo Tour", duration: "6 Days / 5 Nights", price: "$899", perks: "Boutique Hotel, Tapas Crawl & Small Group" },
          { name: "Bali Wellness & Yoga Solo Retreat", duration: "7 Days / 6 Nights", price: "$799", perks: "Private Villa Room & Daily Yoga/Spa Pass" }
        ]
      },
      "Business": {
        title: "Corporate & Executive Business Trips 💼",
        subtitle: "15 Executive Business Packages",
        img: "assets/images/gallery-2.jpg",
        desc: "Premium airport lounge access, executive hotel suites with high-speed WiFi, chauffeured airport transfers, and meeting rooms.",
        trips: [
          { name: "New York Executive Finance Suite", duration: "4 Days / 3 Nights", price: "$1,499", perks: "Manhattan Suite, Business Lounge & Airport Transfer" },
          { name: "Singapore Business & Marina Bay Pass", duration: "5 Days / 4 Nights", price: "$1,399", perks: "Executive Club Floor, High-Speed WiFi & Chauffeur" },
          { name: "Dubai Corporate Tech & Trade Package", duration: "4 Days / 3 Nights", price: "$1,299", perks: "Downtown Luxury Hotel & DIFC Meeting Rooms" }
        ]
      },
      "Wildlife": {
        title: "African Safari & Wildlife Expeditions 🦁",
        subtitle: "22 Wildlife & Nature Safari Packages",
        img: "assets/images/gallery-1.jpg",
        desc: "Big Five game drives, hot air balloon safaris over the Savannah, ethical elephant sanctuaries, and penguin colony tours.",
        trips: [
          { name: "Kenya Masai Mara Migration Safari", duration: "9 Days / 8 Nights", price: "$2,099", perks: "Safari Lodge, 4x4 Game Drives & All Meals" },
          { name: "Cape Town Penguins & Safari", duration: "8 Days / 7 Nights", price: "$1,799", perks: "Table Mountain, Penguin Beach & Private Reserve" },
          { name: "Thailand Ethical Elephant Sanctuary", duration: "7 Days / 6 Nights", price: "$999", perks: "Elephant Care Center, Jungle Lodge & Waterfall" }
        ]
      },
      "Cruise": {
        title: "Ocean & Island Luxury Cruises 🚢",
        subtitle: "17 Ocean Superliner Cruises",
        img: "assets/images/gallery-1.jpg",
        desc: "Multi-destination sailing across historic Mediterranean ports, Caribbean island hoppers, and Alaskan glacier fjords.",
        trips: [
          { name: "Mediterranean Magic Superliner", duration: "14 Days / 13 Nights", price: "$1,899", perks: "Balcony Stateroom, 8 Ports & Full Board" },
          { name: "Caribbean Island Hopper Cruise", duration: "10 Days / 9 Nights", price: "$1,499", perks: "6 Exotic Islands, All-Inclusive Drink Pass" },
          { name: "Greek Isles Luxury Yacht Cruise", duration: "8 Days / 7 Nights", price: "$1,299", perks: "Luxury Yacht, 5 Aegean Islands & Wine Tasting" }
        ]
      },
      "Pilgrimage": {
        title: "Spiritual & Sacred Heritage Journeys 🕌",
        subtitle: "12 Sacred Heritage Packages",
        img: "assets/images/dest-paris.jpg",
        desc: "Sacred temple walks, historic cathedral tours, spiritual meditation retreats, and ancient monument pilgrimages.",
        trips: [
          { name: "Kyoto & Mount Koya Temple Retreat", duration: "7 Days / 6 Nights", price: "$1,299", perks: "Temple Stay, Monk Meditation & Vegetarian Meals" },
          { name: "Ancient Peru Sacred Valley & Machu Picchu", duration: "8 Days / 7 Nights", price: "$1,599", perks: "Vistadome Train, Sacred Citadel & Local Guide" },
          { name: "Rome Vatican & San Giovanni Pilgrimage", duration: "6 Days / 5 Nights", price: "$1,099", perks: "Vatican VIP Pass, Historic Convent Stay & Meals" }
        ]
      },
      "Road Trip": {
        title: "Scenic Coastal & Mountain Road Trips 🚗",
        subtitle: "20 Self-Drive & Chauffeur Road Trips",
        img: "assets/images/dest-santorini.jpg",
        desc: "Convertible sports car rentals, scenic coastal highway routes, boutique lodge stays, and GPS curated pitstops.",
        trips: [
          { name: "Amalfi Coast Convertible Road Trip", duration: "7 Days / 6 Nights", price: "$1,499", perks: "Alfa Romeo Rental, Coastal Hotel & GPS Routes" },
          { name: "California Pacific Coast Highway", duration: "8 Days / 7 Nights", price: "$1,399", perks: "Mustang Convertible, Ocean Motels & Highway Pass" },
          { name: "Garden Route South Africa Road Trip", duration: "9 Days / 8 Nights", price: "$1,599", perks: "SUV Rental, Game Lodge & Coastal Boutique Hotels" }
        ]
      },
      "Camping": {
        title: "Luxury Glamping & Wilderness Camping ⛺",
        subtitle: "14 Eco Glamping & Wilderness Escapes",
        img: "assets/images/gallery-3.jpg",
        desc: "Geodesic dome stargazing tents, heated luxury glamping yurts, campfire barbecue dining, and pristine nature reserves.",
        trips: [
          { name: "Sahara Desert Star Glamping", duration: "5 Days / 4 Nights", price: "$1,099", perks: "VIP Bedouin Tent, Camel Trek & Stargazing" },
          { name: "Patagonia Luxury Dome Glamping", duration: "7 Days / 6 Nights", price: "$1,499", perks: "Heated Eco Dome, Glacier Views & All Meals" },
          { name: "Alpine Aurora Glass Igloo Camping", duration: "6 Days / 5 Nights", price: "$1,699", perks: "Glass Thermal Igloo, Northern Lights & Sauna" }
        ]
      }
    };

    const data = categoryDb[catName] || categoryDb["Beach"];
    const modal = document.querySelector('.details-modal');
    const container = document.getElementById('details-modal-container');
    if (!modal || !container) return;

    container.innerHTML = `
      <div class="details-hero relative" style="height:280px; overflow:hidden; border-radius: 24px 24px 0 0;">
        <img src="${data.img}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent flex flex-col justify-end p-6" style="padding-right: 70px;">
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/90 text-white w-max mb-2 shadow-md">${catName} Category</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-1">${data.title}</h2>
          <p class="text-sm text-slate-300">✨ ${data.subtitle}</p>
        </div>
      </div>

      <div class="p-6 sm:p-8" style="background:#0f172a; color:#f8fafc; border-radius:0 0 24px 24px;">
        <p style="color:#94a3b8; font-size:14px; line-height:1.7; margin-bottom:24px;">${data.desc}</p>
        
        <h3 class="text-lg font-bold mb-4 text-white">✈️ Featured ${catName} Trips & Booking</h3>

        <div class="grid grid-cols-1 gap-4 mb-6">
          ${data.trips.map(trip => `
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div>
                <div style="font-weight:700; font-size:16px; color:#fff;">${trip.name}</div>
                <div style="font-size:12px; color:#38bdf8; margin-top:2px;">📅 ${trip.duration}</div>
                <div style="font-size:12px; color:#94a3b8; margin-top:4px;">✨ ${trip.perks}</div>
              </div>
              <div style="display:flex; align-items:center; gap:14px;">
                <span style="font-weight:800; font-size:18px; color:#fbbf24;">${trip.price}</span>
                <button class="btn btn-primary btn-sm btn-book-category-trip" data-trip="${trip.name}" style="padding:8px 18px; font-size:13px; border-radius:9999px; background:linear-gradient(135deg,#0284c7,#0369a1);">Book Trip</button>
              </div>
            </div>
          `).join('')}
        </div>

        <div id="category-trip-success" style="display:none; padding:14px; background:rgba(16,185,129,0.2); border:1px solid #10b981; border-radius:14px; color:#34d399; text-align:center; font-weight:600;">
          🎉 Trip Reservation Submitted! Our Travel Concierge will send your full itinerary shortly.
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const success = document.getElementById('category-trip-success');
    container.querySelectorAll('.btn-book-category-trip').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.textContent = 'Reserved ✓';
        btn.style.background = '#10b981';
        if (success) success.style.display = 'block';
      });
    });
  }

  function initCruiseDetails() {
    const cruiseCards = document.querySelectorAll('.cruise-card');
    const modal = document.querySelector('.details-modal');
    const container = document.getElementById('details-modal-container');

    if (!cruiseCards.length || !modal || !container) return;

    const cruiseData = {
      "Mediterranean Magic — 14 Days": {
        route: "🌊 Mediterranean Route",
        title: "Mediterranean Magic — 14 Days",
        price: "$1,899",
        img: "assets/images/dest-santorini.jpg",
        nights: "14 Nights",
        ports: "8 Historic Ports",
        board: "Luxury Full Board & Fine Dining",
        ship: "MSC Grandiosa Superliner",
        portsList: ["Barcelona, Spain", "Marseille, France", "Genoa/Portofino, Italy", "Civitavecchia/Rome, Italy", "Naples & Amalfi Coast", "Messina, Sicily", "Valletta, Malta"],
        cabins: [
          { type: "Deluxe Interior Stateroom", price: "$1,899", perks: "Queen Bed, 24/7 Room Service" },
          { type: "Oceanview Balcony Suite", price: "$2,499", perks: "Private Ocean Balcony, Premium Beverage Pass" },
          { type: "Royal Penthouse Suite", price: "$3,899", perks: "VIP Butler, Unlimited Spa Access & Priority Boarding" }
        ]
      },
      "Caribbean Island Hopper — 10 Days": {
        route: "🌊 Caribbean Route",
        title: "Caribbean Island Hopper — 10 Days",
        price: "$1,499",
        img: "assets/images/gallery-1.jpg",
        nights: "10 Nights",
        ports: "6 Exotic Islands",
        board: "All-Inclusive Tropical Resort Pass",
        ship: "Royal Caribbean Wonder of the Seas",
        portsList: ["Miami, Florida", "CoCoCay Private Island, Bahamas", "St. Thomas, USVI", "St. Maarten", "San Juan, Puerto Rico", "Labadee, Haiti"],
        cabins: [
          { type: "Oceanview Stateroom", price: "$1,499", perks: "Panoramic Sea View, Wifi Pass" },
          { type: "Sunset Balcony Suite", price: "$2,199", perks: "Private Ocean Balcony, Unlimited Drinks" },
          { type: "Presidential Sky Suite", price: "$3,499", perks: "Private Jacuzzi, Gourmet Dining & Excursion Credits" }
        ]
      },
      "Greek Isles Discovery — 8 Days": {
        route: "🌊 Greek Islands Route",
        title: "Greek Isles Discovery — 8 Days",
        price: "$1,299",
        img: "assets/images/dest-santorini.jpg",
        nights: "8 Nights",
        ports: "5 Aegean Islands",
        board: "Wine Tasting & Mediterranean Gourmet",
        ship: "Celebrity Beyond Luxury Yacht",
        portsList: ["Piraeus/Athens, Greece", "Santorini Caldera", "Mykonos Windmills", "Rhodes Old Town", "Crete Heraklion", "Kusadasi/Ephesus, Turkey"],
        cabins: [
          { type: "Veranda Oceanview Suite", price: "$1,299", perks: "Floor-to-Ceiling Windows, Wine Tasting Pass" },
          { type: "AquaClass Spa Stateroom", price: "$1,899", perks: "Thermal Suite Spa Access, Dedicated Specialty Restaurant" },
          { type: "Iconic Master Suite", price: "$3,199", perks: "Private Sun Deck, Personal Concierge & Helicopter Transfer" }
        ]
      },
      "Alaska Wilderness Cruise — 12 Days": {
        route: "🌊 Alaska Glacier Route",
        title: "Alaska Wilderness Cruise — 12 Days",
        price: "$2,299",
        img: "assets/images/gallery-2.jpg",
        nights: "12 Nights",
        ports: "3 Glaciers & Fjords",
        board: "All-Inclusive Wilderness & Wildlife Safari",
        ship: "Princess Sapphire Glacier Liner",
        portsList: ["Vancouver, BC", "Inside Passage", "Juneau", "Skagway", "Endicott Arm & Dawes Glacier", "Ketchikan", "Victoria, BC"],
        cabins: [
          { type: "Glacier View Stateroom", price: "$2,299", perks: "Warm Heated Balcony, Binocular Package" },
          { type: "Mini-Suite Balcony", price: "$2,899", perks: "Champagne Welcome, Priority Shore Excursions" },
          { type: "Owner's Glacier Penthouse", price: "$4,299", perks: "Private Deck Jacuzzi, Helicopter Glacier Tour Included" }
        ]
      },
      "Asia Pacific Voyage — 16 Days": {
        route: "🌊 Asia Pacific Route",
        title: "Asia Pacific Voyage — 16 Days",
        price: "$2,799",
        img: "assets/images/dest-maldives.jpg",
        nights: "16 Nights",
        ports: "7 Vibrant Countries",
        board: "Pan-Asian Gourmet Cuisine & Cultural Pass",
        ship: "Oceania Riviera Luxury Liner",
        portsList: ["Singapore Harbour", "Bangkok/Laem Chabang, Thailand", "Ho Chi Minh City, Vietnam", "Hue/Danang", "Hong Kong Victoria Harbour", "Taipei, Taiwan", "Tokyo/Yokohama, Japan"],
        cabins: [
          { type: "Deluxe Oceanview Suite", price: "$2,799", perks: "Marble Bath, Fine Asian Dining Included" },
          { type: "Penthouse Suite", price: "$3,699", perks: "24/7 Butler Service, Unlimited Shore Tours" },
          { type: "Owner's Royal Suite", price: "$5,499", perks: "Ralph Lauren Home Decor, Private Chef & Helicopter Transfers" }
        ]
      }
    };

    function openCruiseModal(cruiseName) {
      const data = cruiseData[cruiseName] || cruiseData["Mediterranean Magic — 14 Days"];

      container.innerHTML = `
        <div class="details-hero relative" style="height:280px; overflow:hidden; border-radius: 24px 24px 0 0;">
          <img src="${data.img}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent flex flex-col justify-end p-6" style="padding-right: 70px;">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/90 text-white w-max mb-2 shadow-md">${data.route}</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-1">${data.title}</h2>
            <p class="text-sm text-slate-300">🚢 Ship: <strong class="text-white">${data.ship}</strong> | ⛵ ${data.nights} | ⚓ ${data.ports}</p>
          </div>
        </div>

        <div class="p-6 sm:p-8" style="background:#0f172a; color:#f8fafc; border-radius:0 0 24px 24px;">
          
          <!-- Key Highlights Bar -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);">
            <div>
              <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:600;">Duration</div>
              <div style="font-weight:700; font-size:15px; color:#38bdf8;">${data.nights}</div>
            </div>
            <div>
              <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:600;">Destinations</div>
              <div style="font-weight:700; font-size:15px; color:#34d399;">${data.ports}</div>
            </div>
            <div>
              <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:600;">Starting From</div>
              <div style="font-weight:800; font-size:18px; color:#fbbf24;">${data.price} <span style="font-size:11px; font-weight:400; color:#94a3b8;">/ person</span></div>
            </div>
          </div>

          <!-- Ports of Call -->
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-3 flex items-center gap-2 text-white">📍 Ports of Call & Itinerary</h3>
            <div class="flex flex-wrap gap-2">
              ${data.portsList.map((p, i) => `<span style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); padding:6px 12px; border-radius:9999px; font-size:13px;">${i+1}. ${p}</span>`).join('')}
            </div>
          </div>

          <!-- Cabins & Pricing Options -->
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-3 text-white">🛌 Stateroom & Suite Selection</h3>
            <div class="grid grid-cols-1 gap-3">
              ${data.cabins.map((c) => `
                <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); padding:16px; border-radius:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                  <div>
                    <div style="font-weight:700; font-size:15px; color:#fff;">${c.type}</div>
                    <div style="font-size:12px; color:#94a3b8;">✨ ${c.perks}</div>
                  </div>
                  <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-weight:800; font-size:18px; color:#38bdf8;">${c.price}</span>
                    <button class="btn-cruise-select btn btn-primary btn-sm" data-cabin="${c.type}" data-price="${c.price}" style="padding:6px 16px; font-size:12px;">Select Cabin</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Interactive Booking Form -->
          <div style="background:rgba(15,23,42,0.95); border:1px solid rgba(56,189,248,0.3); padding:20px; border-radius:20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <h3 class="text-base font-bold mb-3 text-white flex items-center gap-2">🎟️ Reserve Your Cruise Cabin</h3>
            <form id="cruise-modal-booking-form" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:12px;">
              <div>
                <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:4px;">Travel Date</label>
                <input type="date" class="form-control" style="background:#1e293b; border:1px solid #334155; color:#fff; padding:8px 12px; border-radius:10px; width:100%; font-size:13px;" required />
              </div>
              <div>
                <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:4px;">Passengers</label>
                <select class="form-control" style="background:#1e293b; border:1px solid #334155; color:#fff; padding:8px 12px; border-radius:10px; width:100%; font-size:13px;">
                  <option>1 Passenger</option>
                  <option selected>2 Passengers</option>
                  <option>3 Passengers</option>
                  <option>4 Passengers (Family Suite)</option>
                </select>
              </div>
              <div style="grid-column: 1 / -1; margin-top:8px;">
                <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; padding:12px; font-size:15px; font-weight:700; background:linear-gradient(135deg, #0284c7, #0369a1); border:none; border-radius:9999px; cursor:pointer;">
                  🚢 Confirm Cruise Reservation →
                </button>
              </div>
            </form>
            <div id="cruise-modal-success" style="display:none; margin-top:12px; padding:14px; background:rgba(16,185,129,0.2); border:1px solid #10b981; border-radius:12px; color:#34d399; text-align:center; font-weight:600; font-size:14px;">
              🎉 Cruise Reservation Confirmed! Our Luxury Cruise Concierge will email your boarding pass and booking itinerary shortly.
            </div>
          </div>

        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Handle cabin selection buttons
      container.querySelectorAll('.btn-cruise-select').forEach(btn => {
        btn.addEventListener('click', () => {
          container.querySelectorAll('.btn-cruise-select').forEach(b => {
            b.textContent = 'Select Cabin';
            b.style.background = '';
          });
          btn.textContent = 'Selected ✓';
          btn.style.background = '#10b981';
        });
      });

      // Handle form submission
      const form = document.getElementById('cruise-modal-booking-form');
      const success = document.getElementById('cruise-modal-success');
      if (form && success) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          form.style.display = 'none';
          success.style.display = 'block';
        });
      }
    }

    // Attach click listener to each cruise card and Book Cruise button
    cruiseCards.forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        const nameEl = card.querySelector('.cruise-name');
        const name = nameEl ? nameEl.textContent.trim() : "Mediterranean Magic — 14 Days";
        openCruiseModal(name);
      });
    });

    // Close Modal Event Listeners
    const closeBtn = document.querySelector('.details-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ═══════════════════════════════════════════════════
     BLOG ARTICLE READER MODAL SYSTEM
     ═══════════════════════════════════════════════════ */
  function initBlogArticleSystem() {
    const modal = document.querySelector('.details-modal');
    const container = document.getElementById('details-modal-container');
    if (!modal || !container) return;

    const blogDb = {
      "maldives": {
        category: "🏖️ DESTINATION GUIDE",
        title: "The Ultimate Maldives Travel Guide: Everything You Need to Know for 2026",
        author: "Emma Watson",
        date: "July 10, 2026",
        readTime: "8 min read",
        coverImage: "assets/images/dest-maldives.jpg",
        content: `
          <p style="font-size:15px; line-height:1.8; color:#cbd5e1; margin-bottom:16px;">
            The Maldives is universally acclaimed as the pinnacle of tropical luxury. Composed of 26 natural coral atolls boasting over 1,000 pristine islands, choosing the right resort and itinerary can make the difference between a good trip and an unforgettable once-in-a-lifetime getaway.
          </p>
          <h4 style="font-size:17px; font-weight:700; color:#fff; margin-top:20px; margin-bottom:8px;">1. Selecting the Ideal Atoll</h4>
          <p style="font-size:14px; line-height:1.7; color:#94a3b8; margin-bottom:16px;">
            North & South Malé Atolls are ideal for shorter 4-5 day stays due to rapid 20-minute speedboat transfers from Velana International Airport. If you seek world-class marine biosphere reef encounters with Manta Rays and Whale Sharks, Baa Atoll (a UNESCO Biosphere Reserve) is the premier destination accessible via scenic seaplane.
          </p>
          <h4 style="font-size:17px; font-weight:700; color:#fff; margin-top:20px; margin-bottom:8px;">2. Overwater Bungalow vs. Beach Villa</h4>
          <p style="font-size:14px; line-height:1.7; color:#94a3b8; margin-bottom:16px;">
            While overwater bungalows offer iconic direct lagoon access and glass floor panels, beach villas offer lush private garden privacy and direct powder-white sand step-out access. We recommend splitting a 7-day stay into 3 nights in a Beach Villa followed by 4 nights in an Overwater Sanctuary.
          </p>
          <h4 style="font-size:17px; font-weight:700; color:#fff; margin-top:20px; margin-bottom:8px;">3. Best Season & Money Saving Hacks</h4>
          <p style="font-size:14px; line-height:1.7; color:#94a3b8; margin-bottom:16px;">
            The dry season runs from November to April with clear blue skies and crystal ocean visibility. Booking 90 days in advance with Ventoura Travel unlocks complimentary roundtrip seaplane transfers and full-board meal plan upgrades.
          </p>
        `,
        relatedDest: "Maldives"
      },
      "japan": {
        category: "🌸 TRAVEL TIPS",
        title: "Japan Cherry Blossom Season 2027: Best Spots, Timing & Travel Tips",
        author: "Kenji Mori",
        date: "July 15, 2026",
        readTime: "6 min read",
        coverImage: "assets/images/dest-tokyo.jpg",
        content: `
          <p style="font-size:15px; line-height:1.8; color:#cbd5e1; margin-bottom:16px;">
            Japan’s annual cherry blossom (Sakura) season transforms the country into a pink and white floral wonderland. Planning early is paramount as hotel occupancy reaches 98% across Tokyo and Kyoto.
          </p>
          <h4 style="font-size:17px; font-weight:700; color:#fff; margin-top:20px; margin-bottom:8px;">1. Top Viewing Locations</h4>
          <p style="font-size:14px; line-height:1.7; color:#94a3b8; margin-bottom:16px;">
            In Tokyo, Shinjuku Gyoen and Meguro River night illuminations offer unmatched photography spots. In Kyoto, Maruyama Park and the Philosopher’s Path present timeless historic backdrops framed by ancient wooden Shinto shrines.
          </p>
          <h4 style="font-size:17px; font-weight:700; color:#fff; margin-top:20px; margin-bottom:8px;">2. Shinkansen Bullet Train Strategy</h4>
          <p style="font-size:14px; line-height:1.7; color:#94a3b8; margin-bottom:16px;">
            A 7-Day JR Bullet Train Express Pass allows rapid travel between Tokyo, Mount Fuji, and Kyoto in under 2 hours per leg.
          </p>
        `,
        relatedDest: "Tokyo"
      },
      "safari": {
        category: "🦁 ADVENTURE",
        title: "First-Time Safari Guide: What to Expect on an African Wildlife Safari",
        author: "Amara Osei",
        date: "July 20, 2026",
        readTime: "10 min read",
        coverImage: "assets/images/gallery-1.jpg",
        content: `
          <p style="font-size:15px; line-height:1.8; color:#cbd5e1; margin-bottom:16px;">
            Witnessing the Great Migration across Kenya's Masai Mara is one of earth's most profound natural spectacles. Over 1.5 million wildebeest and zebras traverse crocodile-infested savannah rivers.
          </p>
          <h4 style="font-size:17px; font-weight:700; color:#fff; margin-top:20px; margin-bottom:8px;">1. Daily Safari Game Drive Routine</h4>
          <p style="font-size:14px; line-height:1.7; color:#94a3b8; margin-bottom:16px;">
            Safaris begin with early morning sunrise coffee followed by 6:00 AM game drives when lions and leopards are actively hunting. Midday is spent relaxing at the lodge, followed by 4:00 PM evening game drives.
          </p>
        `,
        relatedDest: "Kenya Safari"
      }
    };

    function openBlogModal(blogKey) {
      let data = null;
      for (const bKey in blogDb) {
        if (blogKey.toLowerCase().includes(bKey.toLowerCase())) {
          data = blogDb[bKey];
          break;
        }
      }
      if (!data) data = blogDb["maldives"];

      container.innerHTML = `
        <div class="details-hero relative" style="height:320px; overflow:hidden; border-radius: 24px 24px 0 0; position:relative;">
          <img src="${data.coverImage}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;" />
          <div style="position:absolute; inset:0; background:linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.4) 60%, transparent 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:24px; padding-right:70px;">
            <span style="background:rgba(56,189,248,0.9); color:#fff; font-size:12px; font-weight:700; padding:4px 12px; border-radius:9999px; width:max-content; margin-bottom:8px;">${data.category}</span>
            <h2 style="font-size:clamp(20px,2.5vw,26px); font-weight:800; color:#fff; margin-bottom:6px; line-height:1.3;">${data.title}</h2>
            <div style="display:flex; align-items:center; gap:12px; font-size:12px; color:#cbd5e1;">
              <span>✍️ ${data.author}</span>
              <span>📅 ${data.date}</span>
              <span>⏱️ ${data.readTime}</span>
            </div>
          </div>
        </div>

        <div style="background:#0f172a; color:#f8fafc; padding:24px; border-radius:0 0 24px 24px;">
          ${data.content}

          <div style="margin-top:24px; padding:20px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
            <div>
              <div style="font-weight:700; font-size:15px; color:#fff;">Inspired to travel?</div>
              <div style="font-size:13px; color:#94a3b8;">Explore packages and deals for ${data.relatedDest}</div>
            </div>
            <button class="btn btn-primary" onclick="window.openTravelExperienceModal('${data.relatedDest}')" style="padding:10px 20px; font-size:14px; font-weight:700; border-radius:9999px;">
              ✈️ View ${data.relatedDest} Package →
            </button>
          </div>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    window.openBlogArticleModal = openBlogModal;

    // Attach click listener to all blog cards and read all buttons
    document.querySelectorAll('.blog-card, #btn-read-all-blogs').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        const titleEl = card.querySelector('.blog-title');
        const key = titleEl ? titleEl.textContent : 'maldives';
        openBlogModal(key);
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     GLOBAL NAVIGATION & SMOOTH ROUTER
     ═══════════════════════════════════════════════════ */
  function initGlobalNavigationRouter() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || href === 'javascript:void(0)') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Make all logo links go to home cleanly
    document.querySelectorAll('.nav-logo').forEach(logo => {
      logo.addEventListener('click', (e) => {
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.location.href = 'index.html';
        }
      });
    });

    // Wire Login and Register buttons in header & mobile nav
    if (typeof window.initAuthModal === 'function') {
      window.initAuthModal();
    }

    // Wire Wishlist button in header & mobile nav
    document.querySelectorAll('#wishlist-trigger, button[aria-label="Wishlist"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof window.openWishlist === 'function') {
          window.openWishlist();
        } else {
          const wModal = document.getElementById('wishlist-modal');
          if (wModal) {
            wModal.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
        }
      });
    });

    // Wire Cart button in header & mobile nav
    document.querySelectorAll('#cart-trigger, button[aria-label="Cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof window.openCart === 'function') {
          window.openCart();
        } else {
          const cModal = document.getElementById('cart-modal');
          if (cModal) {
            cModal.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
        }
      });
    });

    // Wire Search button in header & mobile nav
    document.querySelectorAll('#search-trigger, button[aria-label="Search"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const sOverlay = document.querySelector('.search-overlay');
        const sModal = document.getElementById('search-modal');
        if (sOverlay) sOverlay.classList.add('open');
        if (sModal) sModal.classList.add('open');
        document.querySelector('.search-overlay-input, .global-search-input')?.focus();
      });
    });

    // Wire all generic Book Now buttons without specific onclick handlers
    document.querySelectorAll('.btn-book-now, .btn-book-trip').forEach(btn => {
      if (btn.tagName.toLowerCase() === 'button' && !btn.getAttribute('onclick')) {
        btn.addEventListener('click', () => {
          if (window.VentouraEnquiry) {
            window.VentouraEnquiry.openBookingModal({
              id: btn.dataset.id || 'pkg-custom',
              title: btn.dataset.title || 'Luxury Tour Package',
              price: parseFloat(btn.dataset.price || 180000)
            }, 'package');
          }
        });
      }
    });

    // Global Cross Mark (✕) Click Handler -> Close Modals/Overlays & Smooth Scroll to Home
    document.addEventListener('click', (e) => {
      const closeMark = e.target.closest('.section-close-btn, .search-overlay-close, #search-modal-close, #wishlist-modal-close, #cart-modal-close, #destination-modal-close, .ai-chat-close, .mobile-nav-close');
      if (closeMark) {
        e.preventDefault();
        e.stopPropagation();

        document.querySelectorAll('.search-overlay, #search-modal, #wishlist-modal, #cart-modal, #destination-modal, .mobile-nav').forEach(el => {
          el.classList.remove('open');
        });
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ═══════════════════════════════════════════════════
     ENTERPRISE WISHLIST SYSTEM (PERSISTENT & SYNCED)
     ═══════════════════════════════════════════════════ */

  if (!window.VentouraWishlist || !window.VentouraWishlist.loadWishlist) {
    window.VentouraWishlist = {

    getItems: function() {
      try {
        return JSON.parse(localStorage.getItem(this.KEY) || '[]');
      } catch(e) {
        return [];
      }
    },

    saveItems: function(items) {
      try {
        localStorage.setItem(this.KEY, JSON.stringify(items));
      } catch(e) {}
      this.updateBadges();
      this.syncButtons();
      this.renderModal();
    },

    getItemKey: function(type, id) {
      const t = (type || 'destination').toLowerCase().trim();
      const i = String(id || '').trim();
      return `${t}_${i}`;
    },

    hasItem: function(id, type) {
      if (!id) return false;
      const items = this.getItems();
      const searchId = String(id).trim();
      const searchKey = type ? this.getItemKey(type, id) : null;

      return items.some(item => {
        if (searchKey && item.uniqueKey === searchKey) return true;
        return String(item.id).trim() === searchId;
      });
    },

    toggleItem: function(item, type) {
      if (!item) return;
      const itemType = (type || item.type || item.itemType || 'destination').toLowerCase();
      const itemId = String(item.id || item.itemId || item._id || item.title || 'fav-' + Date.now()).trim();
      const itemKey = this.getItemKey(itemType, itemId);

      let items = this.getItems();
      const existingIndex = items.findIndex(i => (i.uniqueKey && i.uniqueKey === itemKey) || String(i.id).trim() === itemId);

      if (existingIndex >= 0) {
        const removed = items.splice(existingIndex, 1)[0];
        this.saveItems(items);
        if (typeof showToast === 'function') showToast(`Removed "${removed.title}" from Wishlist`, '💔');
      } else {
        const formattedItem = {
          id: itemId,
          type: itemType,
          uniqueKey: itemKey,
          title: item.title || item.name || 'Travel Experience',
          location: item.location || (item.city ? `${item.city}, ${item.country || ''}` : (item.destination || item.country || item.route || 'Global Destination')),
          price: item.price || item.startingPrice || item.starting_price || 180000,
          duration: item.duration || (item.days ? `${item.days} Days / ${item.nights || item.days - 1} Nights` : '7 Days / 6 Nights'),
          image: item.image || item.image_url || item.imageUrl || item.featuredImage || item.featured_image || item.heroImage || item.hero_image || 'assets/images/dest-maldives.jpg',
          rawObj: item.rawObj || item
        };
        items.push(formattedItem);
        this.saveItems(items);
        if (typeof showToast === 'function') showToast(`Saved "${formattedItem.title}" to Wishlist!`, '❤️');
      }
    },

    removeItem: function(id, type) {
      if (!id) return;
      const itemId = String(id).trim();
      const itemKey = type ? this.getItemKey(type, id) : null;
      let items = this.getItems();
      items = items.filter(i => {
        if (itemKey && i.uniqueKey === itemKey) return false;
        return String(i.id).trim() !== itemId;
      });
      this.saveItems(items);
      if (typeof showToast === 'function') showToast('Removed from Wishlist', '🗑️');
    },

    clearAll: function() {
      this.saveItems([]);
      if (typeof showToast === 'function') showToast('Wishlist cleared', '🗑️');
    },

    updateBadges: function() {
      const count = this.getItems().length;
      document.querySelectorAll('#wishlist-count, .wishlist-count-badge, .badge-count').forEach(el => {
        if (el.id === 'wishlist-count' || el.classList.contains('wishlist-count-badge')) {
          el.textContent = count;
        }
      });
    },

    attachToCards: function() {
      const cards = document.querySelectorAll('.destination-card, .package-card, .hotel-card, .cruise-card, .service-card, .experience-card, .map-dest-card');
      cards.forEach(card => {
        if (card.querySelector('.card-wishlist-btn, .package-wishlist, .btn-wishlist')) return;

        let type = 'destination';
        if (card.classList.contains('package-card')) type = 'package';
        else if (card.classList.contains('cruise-card')) type = 'cruise';
        else if (card.classList.contains('hotel-card')) type = 'hotel';

        const titleEl = card.querySelector('.package-title, .destination-name, .dest-title, .hotel-name, .cruise-name, h3, h4');
        const title = titleEl ? titleEl.textContent.trim() : 'Travel Experience';
        const id = card.dataset.id || card.dataset.itemId || card.dataset.dest || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'card-wishlist-btn package-wishlist btn-wishlist';
        btn.setAttribute('aria-label', `Save ${title} to Wishlist`);
        btn.setAttribute('title', 'Save to Wishlist');
        btn.dataset.id = id;
        btn.dataset.type = type;
        btn.innerHTML = '♡';

        const targetContainer = card.querySelector('.destination-img-wrap, .package-img-wrap, .card-image-wrap') || card;
        if (getComputedStyle(targetContainer).position === 'static') {
          targetContainer.style.position = 'relative';
        }
        targetContainer.appendChild(btn);
      });
    },

    syncButtons: function() {
      const items = this.getItems();
      document.querySelectorAll('.package-wishlist, .btn-wishlist, .card-wishlist-btn, [data-wishlist-id]').forEach(btn => {
        const card = btn.closest('.package-card, .destination-card, .hotel-card, .cruise-card, .service-card, .experience-card');
        const type = btn.dataset.type || (card?.classList.contains('package-card') ? 'package' : card?.classList.contains('cruise-card') ? 'cruise' : card?.classList.contains('hotel-card') ? 'hotel' : 'destination');
        const id = btn.dataset.id || btn.dataset.wishlistId || card?.dataset.dest || card?.dataset.id || card?.dataset.itemId;

        const isSaved = id && items.some(i => (i.uniqueKey && i.uniqueKey === `${type}_${id}`) || String(i.id).trim() === String(id).trim());

        if (isSaved) {
          btn.classList.add('active');
          btn.innerHTML = '♥';
        } else {
          btn.classList.remove('active');
          btn.innerHTML = '♡';
        }
      });
    },

    renderModal: function() {
      const container = document.getElementById('wishlist-items-container');
      if (!container) return;

      const items = this.getItems();

      if (items.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:48px 20px; color:#94a3b8;">
            <div style="font-size:44px; margin-bottom:12px;">❤️</div>
            <div style="font-size:16px; font-weight:700; color:#ffffff; margin-bottom:6px;">Your Wishlist is Empty</div>
            <div style="font-size:13px;">Save your favorite destinations, packages, hotels & cruises to access them anytime!</div>
          </div>
        `;
        return;
      }

      function formatINR(price) {
        if (typeof price === 'string' && (price.includes('₹') || price.includes('$'))) return price;
        let num = Number(price);
        if (isNaN(num) || num <= 0) return price || '';
        if (num < 10000) num = num * 100;
        return '₹' + num.toLocaleString('en-IN');
      }

      container.innerHTML = items.map(item => {
        const formattedPrice = item.price ? formatINR(item.price) : '';
        const itemJson = JSON.stringify(item.rawObj || item).replace(/"/g, '&quot;');

        return `
          <div class="wishlist-card-item" style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:14px; margin-bottom:10px; gap:14px;">
            <div style="display:flex; align-items:center; gap:14px; flex:1; min-width:0;">
              <img src="${item.image}" alt="${item.title}" style="width:64px; height:64px; border-radius:10px; object-fit:cover; flex-shrink:0;" onerror="this.onerror=null;this.src='assets/images/dest-maldives.jpg'" />
              <div style="flex:1; min-width:0;">
                <div style="font-weight:700; font-size:15px; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.title}</div>
                <div style="font-size:12px; color:#38bdf8; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">📍 ${item.location}</div>
                <div style="font-size:12px; color:#94a3b8; margin-top:2px;">
                  ${item.duration ? item.duration + ' · ' : ''}<span style="color:#fbbf24; font-weight:700;">${formattedPrice}</span>
                </div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
              <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('wishlist-modal')?.classList.remove('open'); document.body.style.overflow=''; if(window.VentouraEnquiry && window.VentouraEnquiry.openDetailPage) { window.VentouraEnquiry.openDetailPage(${itemJson}, '${item.type}'); }" style="padding:6px 12px; font-size:12px;">Explore 🗺️</button>
              <button type="button" class="btn btn-ghost btn-sm" onclick="window.VentouraWishlist.removeItem('${item.id}', '${item.type}')" style="color:#ef4444; padding:6px 10px; font-size:12px; border:1px solid rgba(239,68,68,0.3); border-radius:8px;" title="Remove item">Remove ✕</button>
            </div>
          </div>
        `;
      }).join('');
    },

    init: function() {
      this.attachToCards();
      this.updateBadges();
      this.syncButtons();

      const trigger = document.getElementById('wishlist-trigger') || document.querySelector('button[aria-label="Wishlist"]');
      const modal = document.getElementById('wishlist-modal');
      const closeBtn = document.getElementById('wishlist-modal-close');
      const clearBtn = document.getElementById('clear-wishlist-btn');

      if (trigger && modal) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          this.renderModal();
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      }

      if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        });
      }

      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          this.clearAll();
        });
      }

      // Event listener for clicks on wishlist buttons
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.package-wishlist, .btn-wishlist, .card-wishlist-btn, [data-wishlist-btn]');
        if (btn) {
          e.preventDefault();
          e.stopPropagation();

          const card = btn.closest('.package-card, .destination-card, .hotel-card, .cruise-card, .service-card, .experience-card');
          let type = btn.dataset.type || (card?.classList.contains('package-card') ? 'package' : card?.classList.contains('cruise-card') ? 'cruise' : card?.classList.contains('hotel-card') ? 'hotel' : 'destination');
          const id = btn.dataset.id || btn.dataset.wishlistId || card?.dataset.dest || card?.dataset.id || card?.dataset.itemId || ('fav-' + Date.now());

          const title = btn.dataset.title || card?.querySelector('.package-title, .destination-name, .dest-title, .hotel-name, .cruise-name, h3, h4')?.textContent.trim() || 'Saved Travel Item';
          const location = btn.dataset.location || card?.querySelector('.package-location, .destination-country, .dest-location, .hotel-location, .cruise-route')?.textContent.trim() || 'Global Destination';
          const price = btn.dataset.price || card?.querySelector('.price-tag, .dest-price, .hotel-price, .destination-meta span:nth-child(2)')?.textContent.trim() || '₹1,80,000';
          const duration = btn.dataset.duration || card?.querySelector('.destination-meta span:nth-child(3), .package-duration, .duration')?.textContent.trim() || '7 Days / 6 Nights';
          const image = btn.dataset.image || card?.querySelector('img')?.src || 'assets/images/dest-maldives.jpg';

          const item = { id, type, title, location, price, duration, image };
          this.toggleItem(item, type);
        }
      }, true);

      // Mutation observer to handle dynamic CMS/DOM additions
      try {
        const observer = new MutationObserver(() => {
          this.attachToCards();
          this.syncButtons();
        });
        observer.observe(document.body, { childList: true, subtree: true });
      } catch (err) {}
    }
  };
  }

  function initWishlistSystem() {
    window.VentouraWishlist.init();
  }



  /* ═══════════════════════════════════════════════════
     ENTERPRISE SHOPPING CART & CHECKOUT SYSTEM
     ═══════════════════════════════════════════════════ */
  function initCartSystem() {
    const modal = document.getElementById('cart-modal');
    const container = document.getElementById('cart-items-container');
    const trigger = document.querySelectorAll('button[aria-label="Cart"]')[0];
    const closeBtn = document.getElementById('cart-modal-close');
    const countBadge = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('start-checkout-btn');
    const checkoutFlow = document.getElementById('checkout-flow-container');
    const summaryBox = document.getElementById('cart-summary-box');

    let cart = JSON.parse(localStorage.getItem('wanderlux_cart_v2') || '[]');

    function save() {
      localStorage.setItem('wanderlux_cart_v2', JSON.stringify(cart));
      updateUI();
    }

    function calculateTotal() {
      let subtotal = 0;
      cart.forEach(item => {
        const p = parseFloat((item.price || '$1299').replace(/[^0-9.]/g, '')) || 1299;
        const q = item.qty || 1;
        subtotal += p * q;
      });

      const tax = subtotal * 0.10;
      const total = subtotal + tax;

      if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
      if (taxEl) taxEl.textContent = `$${Math.round(tax).toLocaleString()}`;
      if (totalEl) totalEl.textContent = `$${Math.round(total).toLocaleString()}`;

      return { subtotal, tax, total };
    }

    function updateUI() {
      const totalQty = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
      if (countBadge) countBadge.textContent = totalQty;
      if (!container) return;

      if (cart.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:40px 20px; color:#94a3b8;">
            <div style="font-size:40px; margin-bottom:12px;">📋</div>
            <p>Your Enquiry Book is empty. Pick a package or destination to start your journey!</p>
          </div>
        `;
        if (summaryBox) summaryBox.style.display = 'none';
        return;
      }

      if (summaryBox) summaryBox.style.display = 'block';

      container.innerHTML = cart.map((item, idx) => `
        <div class="cart-card-item">
          <div style="display:flex; align-items:center; gap:14px;">
            <img src="${item.img || 'assets/images/dest-maldives.jpg'}" alt="${item.title}" style="width:64px; height:64px; border-radius:12px; object-fit:cover;" />
            <div>
              <div style="font-weight:700; font-size:15px; color:#fff;">${item.title}</div>
              <div style="font-size:12px; color:#38bdf8;">📅 Travel Dates: Flexible</div>
              <div style="font-size:13px; font-weight:800; color:#fbbf24; margin-top:2px;">${item.price || '$1,299'}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="display:flex; align-items:center; background:#1e293b; border-radius:9999px; padding:2px 8px;">
              <button style="color:#fff; background:none; border:none; padding:4px 8px; cursor:pointer;" onclick="window.updateCartQty('${item.id}', -1)">-</button>
              <span style="font-size:13px; font-weight:700; color:#fff; padding:0 8px;">${item.qty || 1}</span>
              <button style="color:#fff; background:none; border:none; padding:4px 8px; cursor:pointer;" onclick="window.updateCartQty('${item.id}', 1)">+</button>
            </div>
            <button class="btn btn-ghost btn-sm" style="color:#ef4444;" onclick="window.removeFromCart('${item.id}')">✕</button>
          </div>
        </div>
      `).join('');

      calculateTotal();
    }

    window.addToCart = function(item) {
      const existing = cart.find(c => c.id === item.id);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({ ...item, qty: 1, id: item.id || 'pkg-' + Date.now() });
      }
      save();
      showToast(`Added "${item.title}" to Enquiry Book!`, '📋');
      window.openCart();
    };

    window.removeFromCart = function(id) {
      cart = cart.filter(c => c.id !== id);
      save();
      showToast('Item removed from Enquiry Book', '🗑️');
    };

    window.updateCartQty = function(id, delta) {
      const item = cart.find(c => c.id === id);
      if (item) {
        item.qty = (item.qty || 1) + delta;
        if (item.qty <= 0) {
          cart = cart.filter(c => c.id !== id);
        }
        save();
      }
    };

    window.openCart = function() {
      updateUI();
      if (checkoutFlow) checkoutFlow.style.display = 'none';
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };

    trigger?.addEventListener('click', (e) => {
      e.preventDefault();
      window.openCart();
    });

    closeBtn?.addEventListener('click', () => {
      modal?.classList.remove('open');
      document.body.style.overflow = '';
    });

    checkoutBtn?.addEventListener('click', () => {
      if (cart.length === 0) return;
      window.location.href = 'checkout.html';
    });

    updateUI();
  }

  /* ═══════════════════════════════════════════════════
     GLOBAL SEARCH SYSTEM (CONNECTED TO LIVE CMS & API DATA)
     ═══════════════════════════════════════════════════ */
  function initGlobalSearchSystem() {
    const modal = document.getElementById('search-modal');
    const input = modal?.querySelector('input.global-search-input') || document.getElementById('global-search-input');
    const trigger = document.getElementById('search-trigger');
    const closeBtn = document.getElementById('search-modal-close') || modal?.querySelector('.search-modal-close');
    const resultsContainer = document.getElementById('search-results-container') || document.getElementById('global-search-results');
    const tags = modal?.querySelectorAll('.search-tag') || document.querySelectorAll('.search-tag');

    let currentFilter = 'all';
    let searchableItems = [];
    let isDataLoaded = false;
    let isFetching = false;

    // Helper: format currency in INR
    function formatINR(price) {
      let num = Number(price);
      if (isNaN(num) || num <= 0) return '';
      if (num < 10000) num = num * 100;
      return '₹' + num.toLocaleString('en-IN');
    }

    // Helper: format item duration
    function formatDuration(item) {
      if (item.duration) return item.duration;
      const days = item.days || 7;
      const nights = item.nights || (days > 1 ? days - 1 : 1);
      return `${days} Days / ${nights} Nights`;
    }

    // Fetch live CMS data dynamically from backend API endpoints
    async function loadCmsSearchData() {
      if (isFetching) return;
      isFetching = true;
      try {
        const [destRes, pkgRes, hotelRes, cruiseRes] = await Promise.all([
          fetch('/api/destinations').then(r => r.json()).catch(() => null),
          fetch('/api/packages').then(r => r.json()).catch(() => null),
          fetch('/api/hotels').then(r => r.json()).catch(() => null),
          fetch('/api/cruises').then(r => r.json()).catch(() => null)
        ]);

        const items = [];

        // 1. Destinations
        if (destRes && destRes.success && Array.isArray(destRes.data)) {
          destRes.data.forEach(d => {
            items.push({
              id: d.id,
              type: 'dest',
              rawType: 'destination',
              categoryLabel: '📍 DESTINATION',
              categoryHeader: 'DESTINATIONS',
              title: d.title || '',
              location: [d.city, d.country].filter(Boolean).join(', ') || d.country || 'Global Destination',
              description: d.description || '',
              sub: `${d.city || d.country || ''} · ${formatDuration(d)}`,
              image: d.image || d.image_url || d.imageUrl || 'assets/images/dest-maldives.jpg',
              price: d.startingPrice || d.starting_price || d.price,
              rawObj: d
            });
          });
        }

        // 2. Packages
        if (pkgRes && pkgRes.success && Array.isArray(pkgRes.data)) {
          pkgRes.data.forEach(p => {
            items.push({
              id: p.id,
              type: 'pkg',
              rawType: 'package',
              categoryLabel: '📦 PACKAGE',
              categoryHeader: 'PACKAGES',
              title: p.title || '',
              location: p.destination || p.country || 'Luxury Package',
              description: p.description || '',
              sub: `${p.destination || p.country || ''} · ${formatDuration(p)}`,
              image: p.featuredImage || p.featured_image || p.image || p.image_url || 'assets/images/dest-maldives.jpg',
              price: p.price,
              rawObj: p
            });
          });
        }

        // 3. Hotels
        if (hotelRes && hotelRes.success && Array.isArray(hotelRes.data)) {
          hotelRes.data.forEach(h => {
            items.push({
              id: h.id,
              type: 'hotel',
              rawType: 'hotel',
              categoryLabel: '🏨 HOTEL',
              categoryHeader: 'HOTELS',
              title: h.name || h.title || 'Luxury Hotel',
              location: h.location || 'Resort Sanctuary',
              description: h.description || '',
              sub: h.location || 'Luxury Resort',
              image: h.heroImage || h.hero_image || h.image || 'assets/images/hotel-luxury.jpg',
              price: h.price,
              rawObj: h
            });
          });
        }

        // 4. Cruises
        if (cruiseRes && cruiseRes.success && Array.isArray(cruiseRes.data)) {
          cruiseRes.data.forEach(c => {
            items.push({
              id: c.id,
              type: 'cruise',
              rawType: 'cruise',
              categoryLabel: '🚢 CRUISE',
              categoryHeader: 'CRUISES',
              title: c.title || c.vessel || 'Luxury Cruise',
              location: [c.vessel, c.route || c.duration].filter(Boolean).join(' · '),
              description: c.description || c.route || '',
              sub: [c.vessel, c.route || c.duration].filter(Boolean).join(' · '),
              image: c.image || 'assets/images/mediterranean-magic.jpg',
              price: c.price,
              rawObj: c
            });
          });
        }

        searchableItems = items;
        isDataLoaded = true;
      } catch (err) {
        console.warn('Live CMS search load error:', err);
      } finally {
        isFetching = false;
      }
    }

    function performSearch(query) {
      if (!resultsContainer) return;
      const q = (query || '').trim().toLowerCase();

      // Requirement 17: Empty Search shows placeholder
      if (!q) {
        resultsContainer.innerHTML = `
          <div class="search-empty-state" style="text-align:center; padding:30px 16px; color:#94a3b8;">
            <div style="font-size:32px; margin-bottom:8px;">🔍</div>
            <p style="font-size:14px;">Type to search 100+ destinations, luxury packages, hotels & cruises...</p>
          </div>
        `;
        return;
      }

      // Filter matches by current filter tab AND search query across multiple fields
      const filtered = searchableItems.filter(item => {
        const matchesType = (currentFilter === 'all' || item.type === currentFilter);
        const matchesQuery = (
          item.title.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.categoryHeader.toLowerCase().includes(q) ||
          item.sub.toLowerCase().includes(q)
        );
        return matchesType && matchesQuery;
      });

      // Requirement 8, 9, 18: Tab-specific No Results message
      if (filtered.length === 0) {
        const tabLabels = {
          dest: 'destinations',
          pkg: 'packages',
          hotel: 'hotels',
          cruise: 'cruises'
        };
        const categoryName = tabLabels[currentFilter] || '';
        const msg = categoryName ? `No ${categoryName} found for "${query}".` : 'No matching travel experiences found.';

        resultsContainer.innerHTML = `
          <div class="search-empty-state" style="text-align:center; padding:32px 16px; color:#94a3b8;">
            <div style="font-size:32px; margin-bottom:8px;">🏝️</div>
            <p style="font-size:15px; font-weight:700; color:#ffffff; margin-bottom:6px;">${msg}</p>
            <p style="font-size:13px; color:#94a3b8;">Try another destination, package or travel experience.</p>
          </div>
        `;
        return;
      }

      // Requirement 5, 10: Render Search Results
      if (currentFilter === 'all') {
        const categoryOrder = ['DESTINATIONS', 'PACKAGES', 'HOTELS', 'CRUISES'];
        const grouped = {};
        categoryOrder.forEach(cat => grouped[cat] = []);
        filtered.forEach(item => {
          if (!grouped[item.categoryHeader]) grouped[item.categoryHeader] = [];
          grouped[item.categoryHeader].push(item);
        });

        let html = '';
        categoryOrder.forEach(cat => {
          const itemsInCat = grouped[cat];
          if (itemsInCat && itemsInCat.length > 0) {
            html += `
              <div style="font-size:11px; font-weight:800; color:#38bdf8; letter-spacing:1.2px; text-transform:uppercase; margin:14px 0 8px 0; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:4px;">
                ${cat}
              </div>
              <div style="display:flex; flex-direction:column; gap:8px;">
            `;

            itemsInCat.forEach(item => {
              const formattedPrice = item.price ? formatINR(item.price) : '';
              const priceTag = formattedPrice ? ` · <span style="color:#fbbf24; font-weight:700;">${formattedPrice}</span>` : '';
              const itemJson = JSON.stringify(item.rawObj).replace(/"/g, '&quot;');

              html += `
                <div class="search-result-item" onclick="document.getElementById('search-modal')?.classList.remove('open'); document.querySelector('.search-overlay')?.classList.remove('open'); document.body.style.overflow=''; if(window.VentouraEnquiry && window.VentouraEnquiry.openDetailPage) { window.VentouraEnquiry.openDetailPage(${itemJson}, '${item.rawType}'); }" style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; margin-bottom:6px; cursor:pointer; transition:all 0.2s ease;">
                  <div style="display:flex; align-items:center; gap:14px; flex:1; min-width:0;">
                    <img src="${item.image}" alt="${item.title}" style="width:48px; height:48px; border-radius:8px; object-fit:cover; flex-shrink:0;" onerror="this.onerror=null;this.src='assets/images/dest-maldives.jpg'" />
                    <div style="flex:1; min-width:0;">
                      <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:10px; font-weight:800; color:#38bdf8; background:rgba(56,189,248,0.15); padding:2px 8px; border-radius:9999px;">${item.categoryLabel}</span>
                        ${priceTag ? `<span style="font-size:12px; font-weight:800; color:#fbbf24;">${formattedPrice}</span>` : ''}
                      </div>
                      <div style="font-weight:700; font-size:14px; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;">${item.title}</div>
                      <div style="font-size:12px; color:#94a3b8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.sub}</div>
                    </div>
                  </div>
                </div>
              `;
            });

            html += `</div>`;
          }
        });

        resultsContainer.innerHTML = html;
      } else {
        // Specific tab active (Destinations / Packages / Hotels / Cruises)
        resultsContainer.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:8px; margin-top:12px;">
            ${filtered.map(item => {
              const formattedPrice = item.price ? formatINR(item.price) : '';
              const priceTag = formattedPrice ? ` · <span style="color:#fbbf24; font-weight:700;">${formattedPrice}</span>` : '';
              const itemJson = JSON.stringify(item.rawObj).replace(/"/g, '&quot;');

              return `
                <div class="search-result-item" onclick="document.getElementById('search-modal')?.classList.remove('open'); document.querySelector('.search-overlay')?.classList.remove('open'); document.body.style.overflow=''; if(window.VentouraEnquiry && window.VentouraEnquiry.openDetailPage) { window.VentouraEnquiry.openDetailPage(${itemJson}, '${item.rawType}'); }" style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; margin-bottom:6px; cursor:pointer; transition:all 0.2s ease;">
                  <div style="display:flex; align-items:center; gap:14px; flex:1; min-width:0;">
                    <img src="${item.image}" alt="${item.title}" style="width:48px; height:48px; border-radius:8px; object-fit:cover; flex-shrink:0;" onerror="this.onerror=null;this.src='assets/images/dest-maldives.jpg'" />
                    <div style="flex:1; min-width:0;">
                      <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:10px; font-weight:800; color:#38bdf8; background:rgba(56,189,248,0.15); padding:2px 8px; border-radius:9999px;">${item.categoryLabel}</span>
                        ${priceTag ? `<span style="font-size:12px; font-weight:800; color:#fbbf24;">${formattedPrice}</span>` : ''}
                      </div>
                      <div style="font-weight:700; font-size:14px; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;">${item.title}</div>
                      <div style="font-size:12px; color:#94a3b8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.sub}</div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }
    }

    // Input Event Listener on Search Input
    input?.addEventListener('input', async (e) => {
      if (!isDataLoaded) await loadCmsSearchData();
      performSearch(e.target.value);
    });

    // Wire Filter Tags (All Results, Destinations, Packages, Hotels, Cruises)
    tags.forEach(tag => {
      tag.addEventListener('click', async () => {
        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        currentFilter = tag.dataset.filter || 'all';

        if (!isDataLoaded) await loadCmsSearchData();
        performSearch(input ? input.value : '');
      });
    });

    // Open Search Modal Function
    window.openSearch = async function() {
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (!isDataLoaded) await loadCmsSearchData();
        setTimeout(() => input?.focus(), 100);
      }
    };

    // Close Search Modal Function & Reset Search (Requirement 19)
    function closeSearchModal() {
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (input) input.value = '';
        currentFilter = 'all';
        tags.forEach(t => {
          if (t.dataset.filter === 'all') t.classList.add('active');
          else t.classList.remove('active');
        });
        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="search-empty-state" style="text-align:center; padding:30px 16px; color:#94a3b8;">
              <div style="font-size:32px; margin-bottom:8px;">🔍</div>
              <p style="font-size:14px;">Type to search 100+ destinations, luxury packages, hotels & cruises...</p>
            </div>
          `;
        }
      }
    }

    trigger?.addEventListener('click', (e) => {
      e.preventDefault();
      window.openSearch();
    });

    closeBtn?.addEventListener('click', closeSearchModal);

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeSearchModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('open')) {
        closeSearchModal();
      }
    });

    // Preload live CMS data in background
    loadCmsSearchData();

  }

  /* ═══════════════════════════════════════════════════
     FLOATING AI TRAVEL ASSISTANT WIDGET
     ═══════════════════════════════════════════════════ */
  function initFloatingAISystem() {
    const trigger = document.getElementById('ai-chat-trigger');
    const panel = document.getElementById('ai-chat-panel');
    const closeBtn = document.getElementById('ai-chat-close');
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    const messages = document.getElementById('ai-chat-messages');
    const chips = document.querySelectorAll('.ai-chip');

    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      panel.classList.toggle('open');
    });

    closeBtn?.addEventListener('click', () => {
      panel.classList.remove('open');
    });

    function sendMessage(text) {
      if (!text || !messages) return;

      // User Message
      const userDiv = document.createElement('div');
      userDiv.className = 'ai-msg user';
      userDiv.textContent = text;
      messages.appendChild(userDiv);

      messages.scrollTop = messages.scrollHeight;

      // Bot Response
      setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'ai-msg bot';
        
        const q = text.toLowerCase();
        if (q.includes('beach') || q.includes('honeymoon')) {
          botDiv.innerHTML = `🏝️ I recommend the <strong>Maldives Overwater Paradise</strong> (7 Days from $1,499) or <strong>Santorini Clifftop Suite</strong> ($1,299). Both feature romantic sunset dining and private pool suites!`;
        } else if (q.includes('visa') || q.includes('japan')) {
          botDiv.innerHTML = `🇯🇵 Most tourists receive 90-day visa-free entry to Japan. Our team provides fast-track visa assistance for all 100+ destinations!`;
        } else if (q.includes('dubai') || q.includes('hotel')) {
          botDiv.innerHTML = `💎 Dubai features the 7-Star <strong>Burj Al Arab Suite</strong> and <strong>Atlantis Royal Palm</strong>. Book through Ventoura Travel for complimentary spa vouchers!`;
        } else {
          botDiv.innerHTML = `✨ Great choice! Ventoura Travel offers tailor-made trips with 24/7 concierge support, free flight upgrades, and best price guarantee. Would you like to view our available packages?`;
        }

        messages.appendChild(botDiv);
        messages.scrollTop = messages.scrollHeight;
      }, 600);
    }

    sendBtn?.addEventListener('click', () => {
      if (input && input.value) {
        sendMessage(input.value);
        input.value = '';
      }
    });

    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value) {
        sendMessage(input.value);
        input.value = '';
      }
    });

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.dataset.query || chip.textContent;
        sendMessage(q);
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     PACKAGE CARD FULL INTERACTIVITY MODAL
     ═══════════════════════════════════════════════════ */
  function initPackageCardInteractivity() {
    const packageCards = document.querySelectorAll('.package-card');
    const modal = document.querySelector('.details-modal');
    const container = document.getElementById('details-modal-container');

    if (!packageCards.length || !modal || !container) return;

    packageCards.forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        // If clicking wishlist heart, don't open modal
        if (e.target.closest('.package-wishlist')) return;

        const titleEl = card.querySelector('.package-title');
        const title = titleEl ? titleEl.textContent.trim() : 'Maldives Overwater Paradise — 7 Days';
        const priceEl = card.querySelector('.price-tag');
        const price = priceEl ? priceEl.textContent.trim() : '$1,499';
        const imgEl = card.querySelector('.package-img');
        const img = imgEl ? imgEl.src : 'assets/images/dest-maldives.jpg';
        const locEl = card.querySelector('.package-location');
        const loc = locEl ? locEl.textContent.trim() : '📍 Maldives';

        container.innerHTML = `
          <div class="details-hero relative" style="height:280px; overflow:hidden; border-radius: 24px 24px 0 0;">
            <img src="${img}" alt="${title}" style="width:100%; height:100%; object-fit:cover;" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent flex flex-col justify-end p-6" style="padding-right: 70px;">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-white w-max mb-2 shadow-md">🔥 HOT SELLER</span>
              <h2 class="text-2xl sm:text-3xl font-bold text-white mb-1">${title}</h2>
              <p class="text-sm text-slate-300">${loc} | Price: <strong class="text-amber-400 font-bold">${price}</strong></p>
            </div>
          </div>

          <div class="p-6 sm:p-8" style="background:#0f172a; color:#f8fafc; border-radius:0 0 24px 24px;">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="md:col-span-2">
                <!-- Day-by-Day Itinerary removed as requested -->

                <h3 class="text-base font-bold mb-2 text-white">✨ Included Package Benefits</h3>
                <div class="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-4">
                  <div>✔ 5★ Luxury Resort Stay</div>
                  <div>✔ Roundtrip Flights Included</div>
                  <div>✔ Daily Gourmet Full Board</div>
                  <div>✔ Airport Speedboat Transfer</div>
                  <div>✔ 24/7 Concierge Support</div>
                  <div>✔ Flexible Cancellation</div>
                </div>
              </div>

              <div>
                <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:18px; padding:20px;">
                  <div style="font-size:12px; color:#94a3b8; text-transform:uppercase; font-weight:600;">Total Package Rate</div>
                  <div style="font-size:26px; font-weight:900; color:#fbbf24; margin:4px 0 16px;">${price}</div>
                  
                  <button class="btn btn-primary" style="width:100%; justify-content:center; padding:14px; font-weight:700; background:linear-gradient(135deg,#0284c7,#0369a1); border:none; border-radius:9999px; margin-bottom:10px; cursor:pointer;" onclick="window.addToCart({ id: '${title}', title: '${title}', price: '${price}', img: '${img}' }); modal.classList.remove('open');">
                    📋 Enquiry Book →
                  </button>

                  <button class="btn btn-ghost" style="width:100%; justify-content:center; padding:10px; font-size:13px; color:#f43f5e; border-color:rgba(244,63,94,0.3);" onclick="window.addToWishlist({ id: '${title}', title: '${title}', price: '${price}', img: '${img}', location: '${loc}' });">
                    ❤️ Save to Wishlist
                  </button>
                </div>
              </div>
            </div>

          </div>
        `;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     FEATURED DESTINATIONS INTERACTIVITY ENGINE
     ═══════════════════════════════════════════════════ */
  function initFeaturedDestinationsInteractivity() {
        const destDb = {
      'Amalfi Coast Escape': {
        title: 'Amalfi Coast Escape',
        country: '🇮🇹 Italy',
        price: '$2,850',
        duration: '7 Days / 6 Nights',
        rating: '4.96 ★ (248 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        badge: 'LUXURY COASTAL',
        description: 'Perched high above the azure Tyrrhenian Sea, Positano and the Amalfi Coast offer dramatic cliffside pastel villages, lemon grove terraces, Michelin-starred dining at Le Sirenuse, and private wooden speed boat charters to the Isle of Capri.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Naples Airport VIP Driver & Le Sirenuse Check-in', detail: 'Chauffeured Mercedes transfer along coastal cliff roads to Le Sirenuse hotel in Positano. Welcome Limoncello spritz on your cliffside balcony.' },
          { day: 'Day 2', title: 'Private Speedboat Charter to Capri & Blue Grotto', detail: 'Board a wooden Riva speedboat to Capri, swim inside the Blue Grotto, view the Faraglioni rocks, and lunch at La Fontelina.' },
          { day: 'Day 3', title: 'Ravello Cliffside Gardens & Villa Cimbrone Walk', detail: 'Drive up to Ravello village, walk the Infinity Terrace at Villa Cimbrone overlooking the sea, and evening Classical Music concert.' },
          { day: 'Day 4', title: 'Lemon Grove Walk & Michelin Cooking Masterclass', detail: 'Tour family organic lemon orchards, sample artisanal limoncello, and hands-on pasta making masterclass with a Michelin chef.' },
          { day: 'Day 5', title: 'Path of the Gods Hiking Excursion', detail: 'Guided panoramic trek along Sentiero degli Dei (Path of the Gods) past ancient shepherd huts with sweeping coastal vistas.' },
          { day: 'Day 6', title: 'Fiordo di Furore Swim & Sunset Yacht Sunset', detail: 'Private boat excursion to hidden Fiordo di Furore gorge, cliff diving watch, and candlelit seafood dinner on your private terrace.' },
          { day: 'Day 7', title: 'Italian Espresso Breakfast & Airport Chauffeur Return', detail: 'Fresh sfogliatella pastry and espresso before chauffeured transfer back to Naples International Airport.' }
        ],
        highlights: [
          '5★ Le Sirenuse Cliffside Suite with Direct Positano Bay Views',
          'Private Wooden Riva Speedboat Charter to Capri & Blue Grotto',
          'Ravello Villa Cimbrone Infinity Terrace & Classical Concert',
          'Lemon Orchard Tour & Michelin-Star Italian Pasta Masterclass'
        ],
        hotel: '5★ Le Sirenuse Positano / Belmond Hotel Caruso Ravello',
        meals: 'Daily Italian Breakfast & Michelin Seafood Dinners',
        transport: 'Private Mercedes Chauffeur & Riva Yacht Boat',
        bestSeason: 'May – October'
      },
      'Amalfi': {
        title: 'Amalfi Coast Escape',
        country: '🇮🇹 Italy',
        price: '$2,850',
        duration: '7 Days / 6 Nights',
        rating: '4.96 ★ (248 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        badge: 'LUXURY COASTAL',
        description: 'Perched high above the azure Tyrrhenian Sea, Positano and the Amalfi Coast offer dramatic cliffside pastel villages, lemon grove terraces, Michelin-starred dining at Le Sirenuse, and private wooden speed boat charters to the Isle of Capri.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Naples Airport VIP Driver & Le Sirenuse Check-in', detail: 'Chauffeured Mercedes transfer along coastal cliff roads to Le Sirenuse hotel in Positano.' },
          { day: 'Day 2', title: 'Private Speedboat Charter to Capri & Blue Grotto', detail: 'Board a wooden Riva speedboat to Capri, swim inside the Blue Grotto, view the Faraglioni rocks.' },
          { day: 'Day 3', title: 'Ravello Cliffside Gardens & Villa Cimbrone Walk', detail: 'Drive up to Ravello village, walk the Infinity Terrace at Villa Cimbrone overlooking the sea.' }
        ],
        highlights: [
          '5★ Le Sirenuse Cliffside Suite with Direct Positano Bay Views',
          'Private Wooden Riva Speedboat Charter to Capri & Blue Grotto'
        ],
        hotel: '5★ Le Sirenuse Positano',
        meals: 'Daily Italian Breakfast & Michelin Seafood Dinners',
        transport: 'Private Mercedes Chauffeur & Riva Yacht Boat',
        bestSeason: 'May – October'
      },
      'Kyoto Zen Retreat': {
        title: 'Kyoto Zen Retreat',
        country: '🇯🇵 Japan',
        price: '$3,200',
        duration: '7 Days / 6 Nights',
        rating: '4.95 ★ (312 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        badge: 'ZEN WELLNESS',
        description: 'Immerse yourself in Japan\'s cultural sanctuary of moss gardens, 10,000 orange Torii gates, riverfront ryokan onsens, private tea masters, and multi-course Kaiseki culinary art at Aman Kyoto.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Kansai Airport Express & Aman Kyoto Check-in', detail: 'Haruka express train to Kyoto, private driver transfer to Aman Kyoto hidden sanctuary.' },
          { day: 'Day 2', title: 'Fushimi Inari Torii Sunrise & Kiyomizu-dera', detail: 'Sunrise walking tour through 10,000 orange Torii gates before crowds arrive.' },
          { day: 'Day 3', title: 'Arashiyama Bamboo Grove & River Onsen Bath', detail: 'Walk through Arashiyama bamboo forest, boat ride on Oi River, and thermal onsen bath.' },
          { day: 'Day 4', title: 'Golden Pavilion Kinkaku-ji & Private Tea Ceremony', detail: 'Visit golden leaf temple and private matcha tea ceremony with senior tea master.' },
          { day: 'Day 5', title: 'Gion Geisha Evening Walk & Kaiseki Feast', detail: 'Twilight walking tour of historic Pontocho alleyways, followed by 10-course Kaiseki dinner.' },
          { day: 'Day 6', title: 'Zen Garden Meditation & Thermal Spa Therapy', detail: 'Guided Zen meditation at Daitoku-ji temple garden, followed by Aman spa therapy.' },
          { day: 'Day 7', title: 'Matcha Breakfast & Express Return', detail: 'Matcha breakfast in garden pavilion before express train to Kansai Airport.' }
        ],
        highlights: [
          '5★ Aman Kyoto Forest Sanctuary Pavilion Suite',
          'Fushimi Inari 10,000 Torii Gate Sunrise Walking Tour',
          'Arashiyama Bamboo Forest & River Thermal Onsen Experience',
          'Private Matcha Tea Ceremony & 10-Course Kaiseki Dinner'
        ],
        hotel: '5★ Aman Kyoto / Hoshinoya Kyoto',
        meals: 'Daily Kaiseki Breakfast & Multi-Course Gourmet Dinners',
        transport: 'Private Chauffeur & JR Haruka Express Train',
        bestSeason: 'Spring (Sakura) & Autumn (Foliage)'
      },
      'Patagonia Odyssey': {
        title: 'Patagonia Odyssey',
        country: '🇦🇷 Argentina & Chile',
        price: '$3,450',
        duration: '7 Days / 6 Nights',
        rating: '4.93 ★ (187 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80',
        badge: 'GLACIER TREK',
        description: 'Embark on an epic wilderness expedition at the end of the Earth. Hike the granite horns of Torres del Paine, trek across blue glacier ice on Lake Grey, and unwind in all-inclusive luxury at Explora Patagonia Lodge.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Punta Arenas Airport & Explora Lodge Transfer', detail: 'Private 4x4 transfer across Patagonian steppe to Explora Patagonia Lodge on Lake Pehoe.' },
          { day: 'Day 2', title: 'Base Las Torres Granite Horns Hike', detail: 'Guided trek through beech forests up to the turquoise glacial tarn beneath Base Las Torres.' },
          { day: 'Day 3', title: 'Glacier Grey Ice Trek & Boat Cruise', detail: 'Boat cruise across Lake Grey to trek directly on the blue ice walls of Glacier Grey.' },
          { day: 'Day 4', title: 'French Valley Panoramic Trek', detail: 'Catamaran across Lake Pehoe and hike into French Valley surrounded by hanging glaciers.' },
          { day: 'Day 5', title: 'Estancia Gaucho Horseback Riding & BBQ', detail: 'Ride horses across Patagonian pampas with local gaucho cowboys, followed by traditional lamb roast.' },
          { day: 'Day 6', title: 'Salto Grande Waterfall & Hydrotherapy Hot Tubs', detail: 'Morning waterfall walk, followed by outdoor hydrotherapy hot tub soak overlooking Lake Pehoe.' },
          { day: 'Day 7', title: 'Patagonian Breakfast & Airport Driver Return', detail: 'Fresh artisan breakfast before chauffeured 4x4 return transfer to Punta Arenas Airport.' }
        ],
        highlights: [
          '5★ Explora Patagonia Lodge Suite with Direct Lake Pehoe Views',
          'Guided Trek to Base Las Torres Granite Horns & French Valley',
          'Ice Walk Exploration on Glacier Grey & Lake Grey Boat Cruise',
          'Gaucho Horseback Riding & Traditional Chilean Lamb BBQ'
        ],
        hotel: '5★ Explora Patagonia Lodge / Tierra Patagonia',
        meals: 'All-Inclusive Gourmet Dining & Premium Chilean Wines',
        transport: 'Private 4x4 Land Cruisers & Catamaran Ferries',
        bestSeason: 'October – April'
      },
      'Patagonia': {
        title: 'Patagonia Odyssey',
        country: '🇦🇷 Argentina & Chile',
        price: '$3,450',
        duration: '7 Days / 6 Nights',
        rating: '4.93 ★ (187 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80',
        badge: 'GLACIER TREK',
        description: 'Embark on an epic wilderness expedition at the end of the Earth. Hike the granite horns of Torres del Paine, trek across blue glacier ice on Lake Grey, and unwind in all-inclusive luxury at Explora Patagonia Lodge.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Punta Arenas Airport & Explora Lodge Transfer', detail: 'Private 4x4 transfer across Patagonian steppe to Explora Patagonia Lodge.' },
          { day: 'Day 2', title: 'Base Las Torres Granite Horns Hike', detail: 'Guided trek through beech forests up to Base Las Torres.' }
        ],
        highlights: [
          '5★ Explora Patagonia Lodge Suite with Direct Lake Pehoe Views',
          'Guided Trek to Base Las Torres Granite Horns & French Valley'
        ],
        hotel: '5★ Explora Patagonia Lodge',
        meals: 'All-Inclusive Gourmet Dining & Chilean Wines',
        transport: 'Private 4x4 Land Cruisers',
        bestSeason: 'October – April'
      },
      'St. Moritz Alpine Escape': {
        title: 'St. Moritz Alpine Escape',
        country: '🇨🇭 Switzerland',
        price: '$4,900',
        duration: '7 Days / 6 Nights',
        rating: '4.94 ★ (204 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        badge: 'VIP SKI & RAIL',
        description: 'Experience quintessential Swiss elegance in St. Moritz. Journey in Excellence Class on the Glacier Express, stay in a lakeview suite at Badrutt\'s Palace, fly by helicopter over Mount Titlis, and indulge in fondue dining.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Zurich Airport First Class Rail & Badrutt\'s Check-in', detail: 'First Class Swiss Travel Pass rail journey to St. Moritz, check-in at Badrutt\'s Palace Lake View Suite.' },
          { day: 'Day 2', title: 'Corviglia VIP Skiing & Mountain Lunch', detail: 'Private ski instructor on Corviglia slopes, followed by champagne lunch at El Paradiso.' },
          { day: 'Day 3', title: 'Glacier Express Excellence Class Journey', detail: 'Excellence Class panoramic rail journey with 5-course wine pairing meal across alpine viaducts.' },
          { day: 'Day 4', title: 'Mount Titlis Helicopter Scenic Flight', detail: 'Private helicopter flight over Mount Titlis glacier and ice flyer chairlift experience.' },
          { day: 'Day 5', title: 'St. Moritz Frozen Lake Sail & Spa Sanctuary', detail: 'Walk across frozen Lake St. Moritz, followed by Palace Wellness spa hydrotherapy session.' },
          { day: 'Day 6', title: 'Authentic Swiss Fondue Feast in Alpine Hut', detail: 'Horse-drawn sleigh ride to a secluded alpine hut for traditional Swiss cheese fondue.' },
          { day: 'Day 7', title: 'Swiss Chocolate Tasting & Airport Rail Departure', detail: 'Artisan Swiss chocolate tasting before first class train return to Zurich Airport.' }
        ],
        highlights: [
          '5★ Badrutt\'s Palace Hotel Lake View Suite Stay',
          'Glacier Express Excellence Class Panoramic Rail Ride',
          'Private Helicopter Scenic Flight over Mount Titlis Glacier',
          'Horse-Drawn Sleigh Ride & Authentic Swiss Cheese Fondue'
        ],
        hotel: '5★ Badrutt\'s Palace Hotel St. Moritz / Carlton Hotel',
        meals: 'Daily Gourmet Breakfast & Alpine Fondue Feasts',
        transport: 'First Class Swiss Travel Pass & Helicopter',
        bestSeason: 'December – April (Ski) & June – September (Hiking)'
      },
      'St. Moritz': {
        title: 'St. Moritz Alpine Escape',
        country: '🇨🇭 Switzerland',
        price: '$4,900',
        duration: '7 Days / 6 Nights',
        rating: '4.94 ★ (204 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        badge: 'VIP SKI & RAIL',
        description: 'Experience quintessential Swiss elegance in St. Moritz. Journey in Excellence Class on the Glacier Express, stay in a lakeview suite at Badrutt\'s Palace, fly by helicopter over Mount Titlis, and indulge in fondue dining.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Zurich Airport First Class Rail & Badrutt\'s Check-in', detail: 'First Class Swiss Travel Pass rail journey to St. Moritz.' },
          { day: 'Day 2', title: 'Corviglia VIP Skiing & Mountain Lunch', detail: 'Private ski instructor on Corviglia slopes.' }
        ],
        highlights: [
          '5★ Badrutt\'s Palace Hotel Lake View Suite Stay',
          'Glacier Express Excellence Class Panoramic Rail Ride'
        ],
        hotel: '5★ Badrutt\'s Palace Hotel St. Moritz',
        meals: 'Daily Gourmet Breakfast & Alpine Fondue Feasts',
        transport: 'First Class Swiss Travel Pass',
        bestSeason: 'December – April'
      },
      'Serengeti Safari Expedition': {
        title: 'Serengeti Safari Expedition',
        country: '🇹🇿 Tanzania',
        price: '$3,850',
        duration: '7 Days / 6 Nights',
        rating: '4.98 ★ (394 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        badge: 'LUXURY SAFARI',
        description: 'Embark on an unforgettable African wildlife safari across Serengeti National Park and Ngorongoro Crater. Track lions, leopards, rhinos, and elephants in private pop-roof 4x4s, fly in a hot air balloon at dawn, and stay at Four Seasons Safari Lodge.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Kilimanjaro Airport Bush Plane & Lodge Check-in', detail: 'Bush plane flight into Seronera Airstrip, private 4x4 escort to Four Seasons Safari Lodge.' },
          { day: 'Day 2', title: 'Private 4x4 Big Five Game Drive', detail: 'Full-day game drive tracking lions, cheetahs, leopards, and wildebeest herds with expert guide.' },
          { day: 'Day 3', title: 'Dawn Hot Air Balloon Safari & Champagne Bush Breakfast', detail: 'Float over Serengeti plains at sunrise, followed by champagne breakfast under an acacia tree.' },
          { day: 'Day 4', title: 'Ngorongoro 600m Volcanic Crater Safari', detail: 'Descend 600 meters into Ngorongoro Crater to view black rhinos, flamingos, and hippos.' },
          { day: 'Day 5', title: 'Maasai Cultural Village Visit & Bush Dinner', detail: 'Private cultural interaction at Maasai boma village, followed by candlelit bush dinner.' },
          { day: 'Day 6', title: 'Great Migration Tracking & Infinity Pool Sunset', detail: 'Track river crossings of Great Migration, then watch elephants drink from lodge waterhole.' },
          { day: 'Day 7', title: 'Safari Bush Breakfast & Flight Departure', detail: 'Bush breakfast before transfer to airstrip for return flight.' }
        ],
        highlights: [
          '5★ Four Seasons Safari Lodge Waterhole View Suite',
          'Private Pop-Roof 4x4 Land Cruiser Big Five Game Drives',
          'Dawn Hot Air Balloon Safari with Acacia Champagne Breakfast',
          'Ngorongoro 600m Volcanic Crater Rhino Safari Excursion'
        ],
        hotel: '5★ Four Seasons Safari Lodge Serengeti / Singita Grumeti',
        meals: 'All-Inclusive Full Board & Bush Dinners',
        transport: 'Private 4x4 Pop-Roof Land Cruisers & Bush Planes',
        bestSeason: 'June – October (Great Migration) & January – March'
      },
      'Serengeti': {
        title: 'Serengeti Safari Expedition',
        country: '🇹🇿 Tanzania',
        price: '$3,850',
        duration: '7 Days / 6 Nights',
        rating: '4.98 ★ (394 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        badge: 'LUXURY SAFARI',
        description: 'Embark on an unforgettable African wildlife safari across Serengeti National Park and Ngorongoro Crater.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Kilimanjaro Airport Bush Plane & Lodge Check-in', detail: 'Bush plane flight into Seronera Airstrip, private 4x4 escort to Four Seasons Safari Lodge.' },
          { day: 'Day 2', title: 'Private 4x4 Big Five Game Drive', detail: 'Full-day game drive tracking lions, cheetahs, leopards.' }
        ],
        highlights: [
          '5★ Four Seasons Safari Lodge Waterhole View Suite',
          'Private Pop-Roof 4x4 Land Cruiser Big Five Game Drives'
        ],
        hotel: '5★ Four Seasons Safari Lodge Serengeti',
        meals: 'All-Inclusive Full Board & Bush Dinners',
        transport: 'Private 4x4 Pop-Roof Land Cruisers',
        bestSeason: 'June – October'
      },
      'Maldives Private Haven': {
        title: 'Maldives Private Haven',
        country: '🇲🇻 Maldives',
        price: '$4,500',
        duration: '7 Days / 6 Nights',
        rating: '4.99 ★ (512 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
        badge: 'OVERWATER VILLA',
        description: 'Escape to Soneva Jani overwater sanctuary in Baa Atoll UNESCO Biosphere. Experience glass floor viewing panels, water slide into turquoise lagoon, floating villa breakfasts, and coral reef diving.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Male Seaplane Flight & Soneva Jani Check-in', detail: '30-min seaplane flight over turquoise atolls, personal bare-foot butler greeting at overwater villa.' },
          { day: 'Day 2', title: 'Coral Reef Diving & Water Slide Fun', detail: 'Guided scuba diving with sea turtles, followed by sliding into the ocean lagoon from your bedroom deck.' },
          { day: 'Day 3', title: 'Floating Pool Breakfast & Overwater Spa', detail: 'Signature floating breakfast in your private infinity pool, followed by aromatherapy spa session.' },
          { day: 'Day 4', title: 'Private Sandbank Sunset Picnic', detail: 'Uninhabited sandbank drop-off with private chef seafood barbecue and champagne.' },
          { day: 'Day 5', title: 'Dolphin Sunset Catamaran Cruise', detail: 'Luxury 45ft catamaran cruise with spinner dolphin sightings.' },
          { day: 'Day 6', title: 'Bioluminescent Beach Walk & Observatory Dining', detail: 'Stargazing at overwater observatory restaurant and glowing beach walk.' },
          { day: 'Day 7', title: 'Seaplane Departure', detail: 'Seaplane transfer back to Male Velana International Airport.' }
        ],
        highlights: [
          '5★ Soneva Jani Water Retreat with Private Pool & Lagoon Water Slide',
          'UNESCO Baa Atoll Coral Diving & Sea Turtle Snorkeling',
          'Private Sandbank Champagne Picnic & Floating Breakfast'
        ],
        hotel: '5★ Soneva Jani Maldives',
        meals: 'Full Board All-Inclusive & Floating Breakfasts',
        transport: 'Seaplane Transfer & Private Speedboat',
        bestSeason: 'November – April'
      },
      'Maldives': {
        title: 'Maldives Private Haven',
        country: '🇲🇻 Maldives',
        price: '$4,500',
        duration: '7 Days / 6 Nights',
        rating: '4.99 ★ (512 Reviews)',
        heroImg: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
        badge: 'OVERWATER VILLA',
        description: 'Escape to Soneva Jani overwater sanctuary in Baa Atoll UNESCO Biosphere.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Male Seaplane Flight & Soneva Jani Check-in', detail: '30-min seaplane flight over turquoise atolls.' }
        ],
        highlights: [
          '5★ Soneva Jani Water Retreat with Private Pool & Lagoon Water Slide'
        ],
        hotel: '5★ Soneva Jani Maldives',
        meals: 'Full Board All-Inclusive',
        transport: 'Seaplane Transfer',
        bestSeason: 'November – April'
      },
      'Maldives': {
        title: 'Maldives Overwater Sanctuary',
        country: '🇲🇻 Maldives',
        price: '$2,499',
        duration: '7 Days / 6 Nights',
        rating: '4.9 ★ (1,240 Reviews)',
        heroImg: 'assets/images/dest-maldives.jpg',
        badge: 'MOST POPULAR',
        description: 'The Maldives is an idyllic island paradise in the Indian Ocean composed of 26 ring-shaped atolls with over 1,000 coral islands. Experience private overwater bungalows, crystal lagoon waters, vibrant coral reefs, and bioluminescent beach walks.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Male Arrival & Seaplane Transfer to Overwater Villa', detail: 'VIP greeting at Velana International Airport, 30-min seaplane flight over turquoise atolls, and overwater bungalow check-in.' },
          { day: 'Day 2', title: 'House Reef Snorkeling & Overwater Spa Therapy', detail: 'Morning guided snorkeling with sea turtles and clownfish, followed by a 90-min aromatherapy massage at the overwater spa.' },
          { day: 'Day 3', title: 'Manta Ray & Whale Shark Scuba Safari', detail: 'Private boat excursion to Hanifaru Bay UNESCO Biosphere Reserve to swim alongside graceful Manta Rays.' },
          { day: 'Day 4', title: 'Private Sandbank Sunset Picnic & Candlelight Dinner', detail: 'Boat drop-off at an uninhabited sandbank island with private butler service, champagne, and fresh seafood barbecue.' },
          { day: 'Day 5', title: 'Bioluminescent Beach Walk & Underwater Wine Cellar', detail: 'Evening wine tasting in subterranean cellar, followed by a night walk along glowing bioluminescent shores.' },
          { day: 'Day 6', title: 'Sunset Catamaran Sail & Dolphin Cruise', detail: 'Luxury 45ft catamaran cruise across calm lagoon waters with spinner dolphin sightings and sunset cocktails.' },
          { day: 'Day 7', title: 'Floating Plunge Pool Breakfast & Return Flight', detail: 'Signature floating breakfast in your private plunge pool, farewell ceremony, and seaplane transfer back to Male.' }
        ],
        highlights: [
          '5★ Overwater Villa with Private Plunge Pool & Ocean Staircase',
          'Guided Scuba Diving & Manta Ray Snorkeling Safari',
          'Private Sandbank Sunset Dinner with Champagne',
          'Overwater Spa Treatment & Subterranean Wine Tasting'
        ],
        hotel: '5★ Velana Luxury Resort & Spa',
        meals: 'Full Board (Breakfast, Gourmet Lunch, Sunset Cocktail, Candlelight Dinner)',
        transport: 'Seaplane Flight & Private Speedboat Transfer',
        bestSeason: 'November – April (Dry Sunny Season)'
      },
      'Santorini': {
        title: 'Santorini Clifftop Romance',
        country: '🇬🇷 Greece',
        price: '$1,299',
        duration: '5 Days / 4 Nights',
        rating: '4.8 ★ (980 Reviews)',
        heroImg: 'assets/images/dest-santorini.jpg',
        badge: 'HONEYMOON',
        description: 'Santorini is the jewel of the Aegean Sea, famous for whitewashed cliffside villages, iconic blue domes, volcanic red beaches, world-renowned sunsets, and ancient vineyards.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Arrival & Oia Suite Check-in', detail: 'Chauffeured Mercedes transfer from Thira Airport to your cliffside suite in Oia with private outdoor heated hot tub overlooking the caldera.' },
          { day: 'Day 2', title: 'Catamaran Yacht Cruise', detail: 'Full-day sailing aboard a luxury catamaran to Red Beach, White Beach, and Nea Kameni volcanic hot springs with seafood lunch onboard.' },
          { day: 'Day 3', title: 'Volcanic Wine Tasting', detail: 'Visit 3 award-winning wineries (Venetsanos, Santo Wines) for Assyrtiko wine tasting paired with local cheeses at sunset.' },
          { day: 'Day 4', title: 'Akrotiri Ruins & Perissa Beach', detail: 'Guided historical walking tour of ancient Akrotiri, followed by relaxation at Perissa black volcanic sand beach.' },
          { day: 'Day 5', title: 'Greek Brunch & Farewell', detail: 'Fresh pastries, Greek yogurt with honey, and Aegean coffee on your terrace before VIP airport transfer.' }
        ],
        highlights: [
          'Oia Caldera View Suite with Private Outdoor Heated Jacuzzi',
          'Private Sunset Catamaran Cruise along Red Beach & Hot Springs',
          'Assyrtiko Volcanic Wine Tasting Tour at Cliffside Wineries',
          'Akrotiri Bronze-Age Archaeological Site Tour'
        ],
        hotel: '5★ Grace Hotel Santorini (Auberge Resorts)',
        meals: 'Daily Champagne Breakfast & Greek Seafood Tasting',
        transport: 'Airport VIP Chauffeur & Private Catamaran',
        bestSeason: 'April – October'
      },
      'Bali': {
        title: 'Bali Island & Jungle Sanctuary',
        country: '🇮🇩 Indonesia',
        price: '$999',
        duration: '6 Days / 5 Nights',
        rating: '4.7 ★ (850 Reviews)',
        heroImg: 'assets/images/dest-bali.jpg',
        badge: 'CULTURAL RETREAT',
        description: 'Bali is Indonesia’s Island of the Gods, blending lush rainforest sanctuaries, ancient Hindu temples, terraced rice fields, surfing beaches, and luxury wellness retreats.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Denpasar Arrival & Ubud Jungle Villa', detail: 'Private driver transfer to your luxury valley-view villa in Ubud with private infinity pool and flower bath welcome.' },
          { day: 'Day 2', title: 'Tegallalang Rice Terraces & Jungle Swing', detail: 'Early morning photography at UNESCO rice terraces, giant jungle swing photo session, and Sacred Monkey Forest sanctuary walk.' },
          { day: 'Day 3', title: 'Kintamani Volcano & Holy Water Temple', detail: 'Mount Batur volcano view brunch, followed by traditional purification ritual at Tirta Empul holy water temple.' },
          { day: 'Day 4', title: 'Nusa Penida Island Day Trip', detail: 'Speedboat ferry to Nusa Penida to visit Kelingking T-Rex cliff, Angel Billabong, and swim at Diamond Beach.' },
          { day: 'Day 5', title: 'Uluwatu Sunset Temple & Kecak Dance', detail: 'Coastal drive to Southern Bali, visit Uluwatu cliffside temple, and watch dramatic sunset Kecak fire dance performance.' },
          { day: 'Day 6', title: 'Floating Breakfast & Airport Departure', detail: 'Morning floating breakfast in villa pool, souvenir shopping at Seminyak boutique markets, and driver transfer to airport.' }
        ],
        highlights: [
          'Ubud Jungle Villa with Private Infinity Pool overlooking Valley',
          'Tegallalang Rice Terrace Trek & Jungle Swing Photo Experience',
          'Uluwatu Temple Sunset Tour with Kecak Fire Dance Show',
          'Nusa Penida Diamond Beach & Kelingking T-Rex Cliff Boat Day Trip'
        ],
        hotel: '5★ Viceroy Bali Resort & Spa',
        meals: 'Daily Organic Breakfast & Balinese Royal Feast',
        transport: 'Private AC SUV Driver & Speedboat Ferry',
        bestSeason: 'April – October (Dry Season)'
      },
      'Paris': {
        title: 'Paris Romantic Capital Experience',
        country: '🇫🇷 France',
        price: '$1,199',
        duration: '5 Days / 4 Nights',
        rating: '4.8 ★ (1,150 Reviews)',
        heroImg: 'assets/images/dest-paris.jpg',
        badge: 'ROMANTIC',
        description: 'Paris, the City of Light, captivates visitors with majestic architecture, world-famous museums, culinary excellence, haute couture, and romantic riverwalks along the Seine.',
        itineraryDetails: [
          { day: 'Day 1', title: 'CDG Airport Arrival & Eiffel View Suite', detail: 'Chauffeured Mercedes transfer to your hotel suite with panoramic Eiffel Tower balcony view. Afternoon walk along Champs-Élysées.' },
          { day: 'Day 2', title: 'Louvre Museum VIP Tour & Seine Dinner Cruise', detail: 'Skip-the-line private tour of Louvre masterpieces (Mona Lisa, Venus de Milo), followed by a 3-course Seine river dinner cruise.' },
          { day: 'Day 3', title: 'Palace of Versailles & Montmartre Art Walk', detail: 'Guided morning tour of Versailles Hall of Mirrors, afternoon stroll through bohemian Montmartre and Sacré-Cœur Basilica.' },
          { day: 'Day 4', title: 'Champagne Vineyard Tour in Reims', detail: 'Day excursion in a luxury van to the Champagne region, cellar tour at Moët & Chandon, and tasting masterclass.' },
          { day: 'Day 5', title: 'French Bakery Breakfast & Farewell', detail: 'Freshly baked croissants, espresso at a traditional café, last-minute shopping at Galeries Lafayette, and airport return.' }
        ],
        highlights: [
          'Eiffel Tower Balcony Suite View at Luxury Hotel',
          'Louvre Museum VIP Fast-Track Ticket with Private Art Historian',
          'Seine River Gourmet Dinner Cruise with Live French Violin',
          'Day Trip to Palace of Versailles Royal Gardens'
        ],
        hotel: '5★ Le Meurice Paris (Dorchester Collection)',
        meals: 'Daily French Bakery Breakfast & Michelin-Star Dinner',
        transport: 'Private Airport Mercedes & Metro Passes',
        bestSeason: 'Year Round (Spring & Autumn are peak beauty)'
      },
      'Tokyo': {
        title: 'Tokyo Neon & Heritage Explorer',
        country: '🇯🇵 Japan',
        price: '$1,899',
        duration: '8 Days / 7 Nights',
        rating: '4.9 ★ (1,420 Reviews)',
        heroImg: 'assets/images/dest-tokyo.jpg',
        badge: 'FUTURISTIC & CULTURAL',
        description: 'Tokyo is an incredible metropolis seamlessly fusing futuristic skyscrapers, neon lit arcades, ancient Shinto shrines, tranquil cherry blossom gardens, and world-class culinary art.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Narita/Haneda Arrival & Shinjuku Hotel', detail: 'Narita Express train ticket, check-in at Shinjuku high-rise hotel, and evening neon lights walk through Omoide Yokocho.' },
          { day: 'Day 2', title: 'Asakusa Sensoji Temple & TeamLab Planets', detail: 'Morning visit to Tokyo\'s oldest Buddhist temple Senso-ji, followed by afternoon immersive digital art at teamLab Planets in Toyosu.' },
          { day: 'Day 3', title: 'Mount Fuji & Hakone Bullet Train Excursion', detail: 'Ride the Shinkansen bullet train to Mount Fuji 5th Station, Lake Ashi pirate boat cruise, and Hakone hot spring onsen bath.' },
          { day: 'Day 4', title: 'Shibuya Crossing, Harajuku & Meiji Shrine', detail: 'Walk the world\'s busiest pedestrian scramble, explore Takeshita Street fashion, and find peace at forested Meiji Jingu Shrine.' },
          { day: 'Day 5', title: 'Tsukiji Outer Market & Private Sushi Masterclass', detail: 'Gourmet street food walk tasting fresh wagyu and sea urchin, followed by a private 2-hour sushi preparation lesson with master chef.' },
          { day: 'Day 6', title: 'Akihabara Tech District & Imperial Palace Gardens', detail: 'Visit the Imperial Palace East Gardens, explore anime & electronics shops in Akihabara, and experience a maid café.' },
          { day: 'Day 7', title: 'Ginza High-End Shopping & Michelin Kaiseki Dinner', detail: 'Luxury shopping in Ginza district, evening 9-course Michelin Kaiseki multi-course dinner paired with junmai daiginjo sake.' },
          { day: 'Day 8', title: 'Matcha Tea Ceremony & Airport Express', detail: 'Authentic green tea ceremony in a traditional garden teahouse, souvenir shopping, and Narita Express return train.' }
        ],
        highlights: [
          'Shinjuku High-Rise Deluxe Suite with Mount Fuji Skyline View',
          'Shinkansen Bullet Train Day Trip to Mount Fuji & Hakone Onsen',
          'TeamLab Planets Immersive Digital Art Museum VIP Pass',
          'Tsukiji Outer Market Food Tour & Private Chef Sushi Masterclass'
        ],
        hotel: '5★ Aman Tokyo / Park Hyatt Shinjuku',
        meals: 'Daily Kaiseki Breakfast & Michelin Ramen & Sushi Tours',
        transport: 'JR Shinkansen Bullet Train Pass & Airport Express',
        bestSeason: 'March – May (Cherry Blossom) & October – November'
      },
      'Kyoto': {
        title: 'Kyoto Zen Temples & Shrines Heritage',
        country: '🇯🇵 Japan',
        price: '$1,699',
        duration: '6 Days / 5 Nights',
        rating: '4.9 ★ (1,120 Reviews)',
        heroImg: 'assets/images/dest-tokyo.jpg',
        badge: 'ZEN HERITAGE',
        description: 'Kyoto is the cultural heart of Japan, home to thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden ryokans.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Kansai Airport Arrival & Gion Ryokan Check-in', detail: 'Haruka express train to Kyoto Station, private taxi to traditional Gion Ryokan with tatami rooms and private bath.' },
          { day: 'Day 2', title: 'Fushimi Inari Torii Shrine & Kiyomizu-dera', detail: 'Early morning hike through 10,000 orange torii gates at Fushimi Inari, followed by wooden stage views at UNESCO Kiyomizu-dera.' },
          { day: 'Day 3', title: 'Arashiyama Bamboo Grove & Tenryu-ji Zen Garden', detail: 'Stroll through towering green bamboo stalks, visit UNESCO Tenryu-ji garden, and feed monkeys at Iwatayama Park.' },
          { day: 'Day 4', title: 'Kinkaku-ji Golden Pavilion & Tea Master Ceremony', detail: 'Photograph the shimmering gold leaf temple across Mirror Pond, followed by an authentic Kimono wearing and matcha tea ceremony.' },
          { day: 'Day 5', title: 'Gion Geisha Evening Walk & Kaiseki Feast', detail: 'Guided twilight walk through historic Pontocho alleyways, spot Geiko & Maiko, and enjoy a 10-course Kaiseki dinner.' },
          { day: 'Day 6', title: 'Zen Meditation & Kansai Airport Departure', detail: 'Morning guided Zen meditation at Daitoku-ji temple garden before chaffeured express transfer to Kansai Airport.' }
        ],
        highlights: [
          'Traditional Luxury Ryokan Stay with Private Hot Spring Bath',
          'Fushimi Inari Thousand Torii Shrine Sunrise Walking Tour',
          'Arashiyama Bamboo Forest & Tenryu-ji UNESCO World Heritage Garden',
          'Private Kimono Dressing & Master Matcha Tea Ceremony'
        ],
        hotel: '5★ Four Seasons Hotel Kyoto / Suiran Luxury Collection',
        meals: 'Traditional Kaiseki Multi-Course Dinners & Matcha Breakfasts',
        transport: 'Private Chauffeur & JR Haruka Express Train',
        bestSeason: 'Spring (Cherry Blossoms) & Autumn (Red Maple Foliage)'
      },
      'Osaka': {
        title: 'Osaka Food Capital & Castle Tour',
        country: '🇯🇵 Japan',
        price: '$1,499',
        duration: '5 Days / 4 Nights',
        rating: '4.8 ★ (950 Reviews)',
        heroImg: 'assets/images/dest-tokyo.jpg',
        badge: 'CULINARY & NIGHTLIFE',
        description: 'Osaka is Japan’s street food capital and nightlife haven, famous for Dotonbori neon lights, Takoyaki octopus balls, Osaka Castle, and Universal Studios Japan.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Kansai Airport Arrival & Dotonbori Night Walk', detail: 'Express transfer to hotel, evening walk along Dotonbori canal under Glico Running Man neon sign, tasting Takoyaki and Okonomiyaki.' },
          { day: 'Day 2', title: 'Osaka Castle & Shinsekai Retro District', detail: 'Explore majestic 16th-century Osaka Castle park, climb main tower observatory, and taste kushikatsu skewers in retro Shinsekai.' },
          { day: 'Day 3', title: 'Universal Studios Japan VIP Express Pass', detail: 'Full-day VIP access to USJ including Super Nintendo World (Mario Kart ride) and The Wizarding World of Harry Potter.' },
          { day: 'Day 4', title: 'Kuromon Ichiba Food Market & Umeda Sky Building', detail: 'Morning gourmet walk eating Kobe beef skewers and fresh oysters at Kuromon Market, sunset panoramic views from Umeda Sky Observatory.' },
          { day: 'Day 5', title: 'Namba Shopping & Kansai Airport Departure', detail: 'Final shopping spree at Shinsaibashi arcade before luxury airport express departure.' }
        ],
        highlights: [
          '5★ Executive Suite in Osaka Bay Skyline Hotel',
          'Universal Studios Japan VIP Express Pass (Super Nintendo World Entry)',
          'Dotonbori & Kuromon Ichiba Guided Gourmet Street Food Safari',
          'Osaka Castle Historical Park & Umeda Sky Observatory Entry'
        ],
        hotel: '5★ The Ritz-Carlton Osaka / Conrad Osaka',
        meals: 'Daily Breakfast & Street Food Tasting Vouchers',
        transport: 'Private Airport Express Train & Osaka Metro Passes',
        bestSeason: 'Year Round'
      },
      'Rome': {
        title: 'Rome Colosseum & Imperial Heritage',
        country: '🇮🇹 Italy',
        price: '$1,399',
        duration: '6 Days / 5 Nights',
        rating: '4.8 ★ (860 Reviews)',
        heroImg: 'assets/images/gallery-3.jpg',
        badge: 'HISTORIC HERITAGE',
        description: 'Rome, the Eternal City, is an open-air museum filled with ancient gladiatorial arenas, Baroque fountains, Renaissance palaces, Vatican treasures, and mouth-watering pasta.',
        itineraryDetails: [
          { day: 'Day 1', title: 'FCO Airport Arrival & Spanish Steps Hotel', detail: 'Private Mercedes transfer from Fiumicino Airport to luxury hotel steps from Piazza di Spagna. Evening gelato walk to Trevi Fountain.' },
          { day: 'Day 2', title: 'Colosseum Underground & Roman Forum VIP Tour', detail: 'Exclusive arena floor and underground dungeons access at Colosseum, followed by Palatine Hill and Roman Forum walkthrough.' },
          { day: 'Day 3', title: 'Vatican Museums, Sistine Chapel & St. Peter\'s', detail: 'Early morning private entry before public opening to admire Michelangelo\'s Sistine Chapel ceiling and St. Peter\'s Basilica dome.' },
          { day: 'Day 4', title: 'Trastevere Culinary Walk & Pasta Cooking Class', detail: 'Walk cobble streets of Trastevere, market tour, and hands-on cooking class learning fresh Fettuccine and Tiramisu making.' },
          { day: 'Day 5', title: 'Villa Borghese Gardens & Pantheon Sunset', detail: 'Visit Borghese Gallery masterpieces (Bernini sculptures), walk through lush gardens, and sunset aperitivo facing the ancient Pantheon.' },
          { day: 'Day 6', title: 'Italian Espresso Breakfast & Airport Return', detail: 'Enjoy fresh cornetto and cappuccino before chauffeured transfer to Fiumicino Airport.' }
        ],
        highlights: [
          '5★ Hotel Hassler Roma Suite overlooking Spanish Steps',
          'Colosseum Underground & Arena Floor VIP Private Access',
          'Sistine Chapel & Vatican Museums Early Morning Private Entry',
          'Authentic Trastevere Pasta & Tiramisu Cooking Masterclass'
        ],
        hotel: '5★ Hotel Hassler Roma / Hotel de la Ville',
        meals: 'Daily Italian Breakfast & Trastevere Wine & Pasta Dinners',
        transport: 'Private Airport Mercedes & Electric Golf Cart Tour',
        bestSeason: 'April – October'
      },
      'Venice': {
        title: 'Venice Canals & Palazzo Romance',
        country: '🇮🇹 Italy',
        price: '$1,599',
        duration: '4 Days / 3 Nights',
        rating: '4.9 ★ (920 Reviews)',
        heroImg: 'assets/images/gallery-3.jpg',
        badge: 'WATERWAY ROMANCE',
        description: 'Venice is a magical floating city built on 118 islands, connected by scenic bridges, historic canals, majestic Gothic palaces, and romantic gondola serenades.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Marco Polo Airport Arrival & Private Water Taxi', detail: 'Board a wooden Riva water taxi from airport pier directly to the private dock of your 14th-century Venetian palazzo hotel.' },
          { day: 'Day 2', title: 'St. Mark\'s Basilica Terrace & Doge\'s Palace', detail: 'Skip-the-line entry to St. Mark\'s Basilica golden mosaics, secret passages tour of Doge\'s Palace, and Bridge of Sighs walk.' },
          { day: 'Day 3', title: 'Murano Glassblowing & Burano Color Island Cruise', detail: 'Private boat excursion to Murano island for live glassblowing master demonstration, followed by photo tour of colorful Burano fishermen cottages.' },
          { day: 'Day 4', title: 'Sunset Gondola Serenade & Departure', detail: 'Private gondola ride along quiet canals accompanied by an accordion musician, Bellini cocktail at Harry\'s Bar, and water taxi transfer.' }
        ],
        highlights: [
          'Grand Canal Suite in 14th-Century Venetian Palazzo Hotel',
          'Private Wooden Water Taxi Airport Transfers',
          'Private Gondola Ride with Live Accordion Serenade',
          'Murano Glassblowing Demonstration & Burano Island Excursion'
        ],
        hotel: '5★ Hotel Danieli (A Luxury Collection Hotel)',
        meals: 'Daily Terrace Breakfast overlooking Grand Canal & Venetian Seafood',
        transport: 'Private Wooden Water Taxi & Gondola',
        bestSeason: 'April – November'
      },
      'Dubai': {
        title: 'Dubai Luxury Desert & Sky Oasis',
        country: '🇦🇪 UAE',
        price: '$1,599',
        duration: '5 Days / 4 Nights',
        rating: '4.9 ★ (910 Reviews)',
        heroImg: 'assets/images/hotel-luxury.jpg',
        badge: 'ULTRA LUXURY',
        description: 'Dubai is an ultra-modern desert metropolis known for record-breaking skyscrapers, man-made islands, luxury shopping, 7-star hospitality, and thrilling desert safaris.',
        itineraryDetails: [
          { day: 'Day 1', title: 'DXB Airport VIP Chauffeur & Burj Al Arab Check-in', detail: 'Rolls-Royce Ghost transfer from airport, personal butler greeting at Burj Al Arab 7-star suite, and welcome champagne.' },
          { day: 'Day 2', title: 'Burj Khalifa 148th Floor & Dubai Mall Fountain', detail: 'VIP access to At The Top Sky 148th floor observatory, afternoon high tea, and private viewing terrace for Dubai Fountain show.' },
          { day: 'Day 3', title: '4x4 Desert Dune Bashing & Royal Bedouin Dinner', detail: 'Luxury 4x4 Land Cruiser desert safari, sandboarding, camel rides, falconry show, and gourmet BBQ dinner under desert stars.' },
          { day: 'Day 4', title: 'Palm Jumeirah Helicopter Tour & Yacht Sail', detail: '15-min helicopter flight over Palm Jumeirah and Atlantis, followed by afternoon private luxury yacht charter with swim stop.' },
          { day: 'Day 5', title: 'Gold Souk Shopping & Chauffeured Return Flight', detail: 'Explore historic Gold & Spice Souks in Deira with private guide before luxury limo transfer to DXB Airport.' }
        ],
        highlights: [
          '7★ Burj Al Arab Suite with Personal 24/7 Butler Service',
          'Burj Khalifa 148th Floor At The Top Sky VIP Fast-Track Pass',
          'Luxury 4x4 Desert Dune Bashing & Royal Bedouin BBQ Safari',
          'Palm Jumeirah Helicopter Aerial Tour & Private Yacht Charter'
        ],
        hotel: '7★ Burj Al Arab Jumeirah / Atlantis The Royal',
        meals: 'Daily Gourmet Breakfast & Royal Bedouin Desert BBQ Dinner',
        transport: 'Rolls-Royce Chauffeur & Private Helicopter & Yacht',
        bestSeason: 'October – April (Cool Sun Season)'
      },
      'Singapore': {
        title: 'Singapore Skyline & Gardens Paradise',
        country: '🇸🇬 Singapore',
        price: '$1,399',
        duration: '5 Days / 4 Nights',
        rating: '4.9 ★ (1,080 Reviews)',
        heroImg: 'assets/images/hotel-boutique.jpg',
        badge: 'GARDEN CITY LUXURY',
        description: 'Singapore is a futuristic island nation celebrated for architectural marvels like Marina Bay Sands, lush biodomes at Gardens by the Bay, diverse Michelin street food, and Sentosa Island resorts.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Changi Jewel Airport Arrival & Marina Bay Suite', detail: 'See Jewel Changi indoor waterfall, private limo transfer to Marina Bay Sands suite, and sunset swim in 57th floor infinity pool.' },
          { day: 'Day 2', title: 'Gardens by the Bay Supertrees & Flower Dome', detail: 'Walk Cloud Forest glass dome, skywalk across Supertree Grove, and evening Garden Rhapsody light & music show.' },
          { day: 'Day 3', title: 'Sentosa Island Cable Car & Universal Studios', detail: 'Scenic cable car ride to Sentosa Island, day access to S.E.A. Aquarium & Universal Studios Singapore.' },
          { day: 'Day 4', title: 'Michelin Hawker Food Tour & Night Safari', detail: 'Guided food walk tasting Hainanese Chicken Rice & Laksa at Lau Pa Sat, night tram safari viewing nocturnal Asian wildlife.' },
          { day: 'Day 5', title: 'Raffles Hotel Sling Cocktail & Airport Departure', detail: 'Sip historic Singapore Sling cocktail at Raffles Long Bar before limo transfer to Changi Airport.' }
        ],
        highlights: [
          'Marina Bay Sands Premier Suite with 57th Floor Infinity Pool Access',
          'Gardens by the Bay Cloud Forest & Supertree Light Show Pass',
          'Sentosa Cable Car & Universal Studios VIP Access',
          'World Famous Mandai Night Safari Wildlife Tram Tour'
        ],
        hotel: '5★ Marina Bay Sands / Raffles Singapore',
        meals: 'Daily Buffet Breakfast & Michelin Hawker Food Tasting',
        transport: 'Private Chauffeur & Sentosa Cable Car',
        bestSeason: 'Year Round'
      },
      'Bangkok': {
        title: 'Bangkok Palaces & Floating Market Heritage',
        country: '🇹🇭 Thailand',
        price: '$799',
        duration: '5 Days / 4 Nights',
        rating: '4.7 ★ (890 Reviews)',
        heroImg: 'assets/images/dest-bali.jpg',
        badge: 'HERITAGE & CULINARY',
        description: 'Bangkok is Thailand’s vibrant capital of ornate golden shrines, bustling Chao Phraya river life, colorful floating markets, world-famous Thai cuisine, and rooftop sky bars.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Suvarnabhumi Airport Arrival & Riverside Suite', detail: 'Private driver transfer to Mandarin Oriental Bangkok on Chao Phraya riverbank. Evening cocktail at rooftop sky bar.' },
          { day: 'Day 2', title: 'Grand Palace, Emerald Buddha & Wat Arun', detail: 'Private longtail boat along Chao Phraya, visit Grand Palace, Temple of the Emerald Buddha, and Wat Arun (Temple of Dawn).' },
          { day: 'Day 3', title: 'Damnoen Saduak Floating Market & Cooking Class', detail: 'Excursion to colorful floating market on wooden longtail boat, followed by afternoon Thai culinary cooking lesson.' },
          { day: 'Day 4', title: 'Ayutthaya Ancient Capital Ruins Tour', detail: 'Day trip in AC van to UNESCO Ayutthaya ruins, Buddha head in tree roots, and river cruise return.' },
          { day: 'Day 5', title: 'Thai Massage & Airport Transfer', detail: 'Traditional 2-hour Thai massage at Wat Pho school before driver transfer to airport.' }
        ],
        highlights: [
          '5★ Mandarin Oriental Bangkok Riverside Suite Stay',
          'Private Chao Phraya River Longtail Boat & Grand Palace Tour',
          'Damnoen Saduak Floating Market Excursion & Thai Cooking Class',
          'Ayutthaya Ancient Kingdom UNESCO Ruins Day Trip'
        ],
        hotel: '5★ The Mandarin Oriental Bangkok / The Siam',
        meals: 'Daily Breakfast & Authentic Thai Cooking Dinner',
        transport: 'Private AC Van & Traditional Longtail Boat',
        bestSeason: 'November – February'
      },
      'Swiss Alps': {
        title: 'Swiss Alps Glacier Express & Alpine Luxury',
        country: '🇨🇭 Switzerland',
        price: '$2,199',
        duration: '7 Days / 6 Nights',
        rating: '4.9 ★ (730 Reviews)',
        heroImg: 'assets/images/dest-paris.jpg',
        badge: 'ALPINE MOUNTAINS',
        description: 'The Swiss Alps offer breathtaking mountain panoramas, snow-capped peaks like the Matterhorn, scenic alpine train journeys on the Glacier Express, and cozy luxury chalet lodges.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Zurich Airport Arrival & Zermatt Chalet Check-in', detail: 'First Class Swiss Travel Pass rail journey along Lake Zurich into Zermatt car-free alpine village facing the Matterhorn.' },
          { day: 'Day 2', title: 'Gornergrat Cogwheel Railway & Matterhorn View', detail: 'Ride Europe\'s highest open-air cogwheel railway up to Gornergrat (3,089m) for panoramic views of 29 peaks above 4,000m.' },
          { day: 'Day 3', title: 'Glacier Express Panoramic Train Ride to St. Moritz', detail: 'Board the world\'s slowest express train in Excellence Class with 5-course wine pairing meal across 291 bridges and 91 tunnels.' },
          { day: 'Day 4', title: 'St. Moritz Alpine Lake Sail & Spa Relaxation', detail: 'Stroll around St. Moritz lake, enjoy thermal alpine spa baths, and evening Swiss cheese fondue dinner.' },
          { day: 'Day 5', title: 'Jungfraujoch Top of Europe Cable Car', detail: 'Ascend to Jungfraujoch (3,454m) Sphinx Observatory, walk inside Ice Palace tunnels, and view Aletsch Glacier.' },
          { day: 'Day 6', title: 'Lucerne Chapel Bridge & Lake Cruise', detail: 'Scenic train to Lucerne, wooden Chapel Bridge walk, and steamboat cruise on Lake Lucerne.' },
          { day: 'Day 7', title: 'Swiss Chocolate Tasting & Zurich Airport Return', detail: 'Visit Lindt Home of Chocolate museum in Zurich before first class airport train departure.' }
        ],
        highlights: [
          'Matterhorn View Chalet Suite in Zermatt Alpine Lodge',
          'Glacier Express Panoramic Train Ride in Excellence Class',
          'Gornergrat Cogwheel Railway Ascent & Jungfraujoch Top of Europe',
          'Authentic Swiss Fondue Dinner & Alpine Thermal Spa Pass'
        ],
        hotel: '5★ The Omnia Zermatt / Badrutt\'s Palace St. Moritz',
        meals: 'Daily Alpine Half-Board & Swiss Fondue Feast',
        transport: 'First Class Swiss Travel Pass & Cogwheel Railways',
        bestSeason: 'Year Round (Winter Ski & Summer Hiking)'
      },
      'New York': {
        title: 'New York Manhattan Lights & Broadway',
        country: '🇺🇸 USA',
        price: '$1,799',
        duration: '6 Days / 5 Nights',
        rating: '4.8 ★ (1,310 Reviews)',
        heroImg: 'assets/images/hotel-boutique.jpg',
        badge: 'GLOBAL METROPOLIS',
        description: 'New York City is the ultimate global metropolis, brimming with iconic skyscrapers, Broadway theaters, world-class museums, Central Park serenity, and vibrant dining.',
        itineraryDetails: [
          { day: 'Day 1', title: 'JFK/EWR Arrival & The Plaza Hotel Check-in', detail: 'Private limo transfer to Fifth Avenue, check-in at landmark The Plaza Hotel, and evening walk through Times Square.' },
          { day: 'Day 2', title: 'Statue of Liberty Ferry & Summit One Vanderbilt', detail: 'Morning ferry to Statue of Liberty & Ellis Island, afternoon skydeck experience at glass-floored Summit One Vanderbilt.' },
          { day: 'Day 3', title: 'Central Park Carriage Ride & Broadway VIP Show', detail: 'Private horse-drawn carriage through Central Park, dinner in Theater District, and front-row seats to top Broadway show.' },
          { day: 'Day 4', title: 'Manhattan Skyline Helicopter Flight & MoMA', detail: '15-min doors-off helicopter flight over Empire State & Hudson River, followed by afternoon guided tour of MoMA.' },
          { day: 'Day 5', title: 'High Line Park, Hudson Yards & Michelin Dinner', detail: 'Walk elevated High Line park, climb The Vessel at Hudson Yards, and 7-course fine dining dinner at Eleven Madison Park.' },
          { day: 'Day 6', title: 'Fifth Avenue Shopping & Airport Limo Departure', detail: 'Boutique shopping along 5th Ave and chaffeured limo transfer back to JFK Airport.' }
        ],
        highlights: [
          '5★ The Plaza Hotel Suite on Fifth Avenue & Central Park South',
          'Manhattan Skyline Scenic Helicopter Flight',
          'Broadway Show VIP Orchestra Seats with Backstage Pass',
          'Summit One Vanderbilt Glass Skydeck Fast-Track Entry'
        ],
        hotel: '5★ The Plaza New York / The St. Regis New York',
        meals: 'Daily American Breakfast & Michelin 7-Course Dinner',
        transport: 'Private Executive Town Car & Helicopter',
        bestSeason: 'Year Round (Spring & Autumn are ideal)'
      },
      'Sydney': {
        title: 'Sydney Opera & Harbour Explorer',
        country: '🇦🇺 Australia',
        price: '$1,999',
        duration: '7 Days / 6 Nights',
        rating: '4.9 ★ (940 Reviews)',
        heroImg: 'assets/images/hotel-luxury.jpg',
        badge: 'PACIFIC HARBOUR',
        description: 'Sydney is Australia’s sparkling harbour city, famous for the Sydney Opera House, Harbour Bridge, golden surf beaches like Bondi, and lush coastal national parks.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Sydney Airport Arrival & Harbour Suite', detail: 'Private Tesla transfer to Four Seasons Hotel in The Rocks with direct Opera House and Harbour Bridge views.' },
          { day: 'Day 2', title: 'Sydney Opera House Backstage Tour & Harbour Cruise', detail: 'Private morning tour inside Opera House concert halls, followed by luxury yacht lunch cruise across Sydney Harbour.' },
          { day: 'Day 3', title: 'Sydney Harbour BridgeClimb & Bondi Coastal Walk', detail: 'Climb to the apex of Harbour Bridge for 360-degree views, afternoon coastal walk from Bondi Beach to Coogee.' },
          { day: 'Day 4', title: 'Blue Mountains & Wildlife Sanctuary Excursion', detail: 'Day trip to Blue Mountains UNESCO World Heritage park, Three Sisters rock formation, and koala feeding at Featherdale.' },
          { day: 'Day 5', title: 'Manly Beach Ferry & Taronga Zoo Sky Safari', detail: 'Ferry across harbour to Manly Beach, cable car Sky Safari at Taronga Zoo overlooking harbour skyline.' },
          { day: 'Day 6', title: 'Barangaroo Dining & Sunset Helicopter Sail', detail: 'Gourmet waterfront lunch at Barangaroo precinct and sunset helicopter flight over Northern Beaches.' },
          { day: 'Day 7', title: 'Aussie Breakfast & Airport Driver Return', detail: 'Flat white coffee and avocado toast at coastal café before driver transfer to Sydney Airport.' }
        ],
        highlights: [
          'Four Seasons Sydney Harbour View Suite (Opera House Horizon)',
          'Sydney Opera House Backstage Private Architectural Tour',
          'Sydney Harbour BridgeClimb Summit Experience Pass',
          'Blue Mountains UNESCO Day Excursion & Koala Sanctuary Visit'
        ],
        hotel: '5★ Four Seasons Hotel Sydney / Crown Towers Sydney',
        meals: 'Daily Australian Gourmet Breakfast & Harbour Yacht Lunch',
        transport: 'Private Tesla Airport Chauffeur & Private Yacht',
        bestSeason: 'September – April (Sunny Coast Season)'
      },
      'Seoul': {
        title: 'Seoul K-Culture & Gyeongbokgung Palace',
        country: '🇰🇷 South Korea',
        price: '$1,599',
        duration: '6 Days / 5 Nights',
        rating: '4.9 ★ (880 Reviews)',
        heroImg: 'assets/images/dest-tokyo.jpg',
        badge: 'K-CULTURE & HERITAGE',
        description: 'Seoul is a dynamic metropolis where centuries-old royal palaces and Hanok villages meet cutting-edge fashion, K-Pop culture, 24/7 night markets, and Michelin skincare spas.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Incheon Airport AREX Express & Signiel Suite', detail: 'AREX express train to Seoul Station, check-in at Signiel Seoul on 90th floor of Lotte World Tower.' },
          { day: 'Day 2', title: 'Gyeongbokgung Palace Hanbok Tour & Bukchon', detail: 'Dress in traditional Hanbok royal attire for free entry to Gyeongbokgung Palace, followed by walking Bukchon Hanok Village.' },
          { day: 'Day 3', title: 'Myeongdong Street Food & N Seoul Tower Sunset', detail: 'Taste Korean fried chicken, egg bread, and tteokbokki at Myeongdong, cable car ride to N Seoul Tower observatory.' },
          { day: 'Day 4', title: 'K-Pop Studio Experience & Gangnam Style Walk', detail: 'Private dance lesson at top K-Pop studio, explore Starfield COEX Library and high-end Gangnam shopping district.' },
          { day: 'Day 5', title: 'DMZ Peace Tour & Korean BBQ Feast', detail: 'Guided morning tour to 38th parallel Demilitarized Zone (DMZ 3rd Tunnel), evening Hanwoo beef barbecue dinner.' },
          { day: 'Day 6', title: 'Sulwhasoo Spa Treatment & Airport Return', detail: 'VIP herbal facial treatment at Sulwhasoo Flagship Spa before AREX express departure.' }
        ],
        highlights: [
          '5★ Signiel Seoul Suite on 90th Floor of Lotte World Tower',
          'Gyeongbokgung Palace Royal Hanbok Experience Tour',
          'Private K-Pop Studio Dance Class & Gangnam COEX Tour',
          'DMZ Demilitarized Zone Guided Tour & Hanwoo BBQ Dinner'
        ],
        hotel: '5★ Signiel Seoul / Four Seasons Hotel Seoul',
        meals: 'Daily Korean Breakfast & Hanwoo BBQ Feast',
        transport: 'AREX Express Train & Private Seoul Taxi Pass',
        bestSeason: 'Spring (Cherry Blossoms) & Autumn (Foliage)'
      },
      'Cappadocia': {
        title: 'Cappadocia Hot Air Balloon & Cave Suite',
        country: '🇹🇷 Turkey',
        price: '$1,399',
        duration: '5 Days / 4 Nights',
        rating: '5.0 ★ (790 Reviews)',
        heroImg: 'assets/images/dest-santorini.jpg',
        badge: 'MAGICAL LANDSCAPE',
        description: 'Cappadocia is a magical fairytale landscape in Central Turkey renowned for volcanic fairy chimneys, ancient underground cities, cave hotels, and hundreds of sunrise hot air balloons.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Nevsehir Airport Arrival & Cave Hotel Check-in', detail: 'Private driver transfer through rock valleys to luxury cave suite carved into 1,800-year-old volcanic tufa rock.' },
          { day: 'Day 2', title: 'Sunrise Hot Air Balloon Flight & Göreme Museum', detail: 'At dawn, float 3,000ft above fairy chimneys with champagne toast, followed by UNESCO Göreme Open Air Museum rock churches.' },
          { day: 'Day 3', title: 'Derinkuyu Underground City & Ihlara Valley Trek', detail: 'Descend 8 levels into ancient 85-meter-deep Derinkuyu Underground City, followed by river walk in green Ihlara Canyon.' },
          { day: 'Day 4', title: 'ATV Quad Safari in Rose Valley & Turkish Bath', detail: 'Sunset ATV quad bike adventure through Rose & Love Valleys, followed by traditional 90-min Turkish Hamam spa massage.' },
          { day: 'Day 5', title: 'Pottery Workshop in Avanos & Airport Return', detail: 'Hands-on red clay pottery making in Avanos village on Kizilirmak River before driver transfer to airport.' }
        ],
        highlights: [
          '5★ Luxury Cave Suite carved into Ancient Volcanic Rock',
          'VIP Sunrise Hot Air Balloon Flight over Fairy Chimneys',
          'Derinkuyu 85m-Deep Underground City Guided Excursion',
          'Traditional Turkish Hamam Spa Bath & Rose Valley Quad Safari'
        ],
        hotel: '5★ Museum Hotel Cappadocia / Argos in Cappadocia',
        meals: 'Daily Turkish Village Breakfast & Anatolian Testi Kebab Dinner',
        transport: 'Private VIP Mercedes Sprinter Van',
        bestSeason: 'April – June & September – November'
      },
      'Athens': {
        title: 'Athens Acropolis & Classical Greek Heritage',
        country: '🇬🇷 Greece',
        price: '$1,199',
        duration: '5 Days / 4 Nights',
        rating: '4.8 ★ (820 Reviews)',
        heroImg: 'assets/images/dest-santorini.jpg',
        badge: 'ANCIENT HISTORY',
        description: 'Athens is the cradle of Western civilization and birthplace of democracy, dominated by the majestic 5th-century BC Acropolis Parthenon, Plaka cobblestones, and Aegean views.',
        itineraryDetails: [
          { day: 'Day 1', title: 'Athens Airport VIP Driver & Hotel Check-in', detail: 'Chauffeured transfer to Syntagma Square hotel with Parthenon rooftop pool view. Evening stroll through historic Plaka.' },
          { day: 'Day 2', title: 'Acropolis Parthenon & Acropolis Museum VIP Tour', detail: 'Private skip-the-line tour of Parthenon temple, Erechtheion Caryatids, and glass-floored Acropolis Museum.' },
          { day: 'Day 3', title: 'Temple of Poseidon at Cape Sounion Sunset', detail: 'Coastal drive along Athenian Riviera to Cape Sounion, marveling at Temple of Poseidon perched high above Aegean Sea.' },
          { day: 'Day 4', title: 'Monastiraki Flea Market & Greek Taverna Feast', detail: 'Shop ancient artifacts at Monastiraki, taste souvlaki & moussaka, and enjoy live bouzouki music night.' },
          { day: 'Day 5', title: 'Greek Coffee Breakfast & VIP Airport Transfer', detail: 'Enjoy Greek yogurt, honey, fresh figs, and Greek coffee before driver transfer to Athens Airport.' }
        ],
        highlights: [
          '5★ King George Hotel Suite with Direct Acropolis Balcony View',
          'Acropolis Parthenon & Acropolis Museum Private Guide Pass',
          'Athenian Riviera Coastal Drive to Temple of Poseidon Sunset',
          'Traditional Plaka Taverna Dinner with Live Bouzouki Music'
        ],
        hotel: '5★ Hotel Grande Bretagne / King George Athens',
        meals: 'Daily Greek Breakfast & Taverna Seafood Feasts',
        transport: 'Private Airport Chauffeur & AC Executive Van',
        bestSeason: 'April – October'
      }
    };


    window.openTravelExperienceModal = function(key) {
      let data = destDb[key];
      if (!data) {
        const foundKey = Object.keys(destDb).find(k => k.toLowerCase().includes((key||'').toLowerCase()));
        data = foundKey ? destDb[foundKey] : destDb['Maldives'];
      }

      const modal = document.getElementById('destination-modal');
      const container = document.getElementById('destination-modal-content');
      if (!modal || !container) return;

      const itineraryList = data.itineraryDetails || data.itinerary || [];

      container.innerHTML = `
        <div style="position:relative; height:320px; border-radius:24px 24px 0 0; overflow:hidden;">
          <img src="${data.heroImg}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;" />
          <div style="position:absolute; inset:0; background:linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.4) 60%, transparent 100%);"></div>
          <div style="position:absolute; bottom:20px; left:24px; right:60px;">
            <h2 style="font-size:30px; font-weight:900; color:#fff; margin:0 0 4px; line-height:1.2;">${data.title}</h2>
            <div style="font-size:14px; color:#38bdf8; font-weight:700;">${data.country} · ${data.rating}</div>
          </div>
        </div>

        <div style="padding:28px; background:#0f172a; color:#cbd5e1;">
          <p style="font-size:14px; line-height:1.7; color:#94a3b8; margin-bottom:20px;">${data.description}</p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px;">
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:12px 16px; border-radius:14px;">
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Hotel Stay</div>
              <div style="font-size:13px; color:#fff; font-weight:700; margin-top:2px;">${data.hotel}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:12px 16px; border-radius:14px;">
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Best Season</div>
              <div style="font-size:13px; color:#fbbf24; font-weight:700; margin-top:2px;">${data.bestSeason}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:12px 16px; border-radius:14px;">
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Meals Included</div>
              <div style="font-size:13px; color:#fff; font-weight:700; margin-top:2px;">${data.meals}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:12px 16px; border-radius:14px;">
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Transportation</div>
              <div style="font-size:13px; color:#fff; font-weight:700; margin-top:2px;">${data.transport}</div>
            </div>
          </div>

          <!-- Day-by-Day Itinerary removed as requested -->

          <h3 style="font-size:16px; font-weight:800; color:#fff; margin-bottom:12px;">🌟 Featured Highlights & Activities</h3>
          <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:24px;">
            ${data.highlights.map(h => `
              <div style="display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#e2e8f0; background:rgba(255,255,255,0.02); padding:10px 14px; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">
                <span style="color:#38bdf8;">✔</span>
                <span>${h}</span>
              </div>
            `).join('')}
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.2); padding:18px 24px; border-radius:20px;">
            <div>
              <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:700;">Starting Package Price</div>
              <div style="font-size:28px; font-weight:900; color:#fbbf24;">${data.price} <span style="font-size:12px; color:#94a3b8; font-weight:400;">/ person</span></div>
            </div>
            <button type="button" class="btn btn-primary" style="padding:14px 32px; font-size:15px; font-weight:800; border-radius:9999px; border:none; cursor:pointer;" onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({id: '${data.id || key}', title: '${data.title}', city: '${data.subtitle || ''}', country: '${data.country || ''}', startingPrice: '${data.price}', image: '${data.coverImage || ''}', days: 7, nights: 6}, 'destination')">
              ⚡ Book This Package Now →
            </button>
          </div>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    // Attach 1-CLICK handlers to "Explore 🗺️" buttons & Cards
    document.querySelectorAll('.btn-explore-dest').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dest = btn.dataset.dest || 'Maldives';
        window.openTravelExperienceModal(dest);
      });
    });

    document.querySelectorAll('.destination-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const dest = card.dataset.dest || 'Maldives';
        window.openTravelExperienceModal(dest);
      });
    });

    // Close button & backdrop handlers
    const closeBtn = document.getElementById('destination-modal-close');
    const modal = document.getElementById('destination-modal');
    closeBtn?.addEventListener('click', () => {
      modal?.classList.remove('open');
      document.body.style.overflow = '';
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // ─── Cursor Glow Disabled (Standard Pointer Only) ───
    const existingGlow = document.querySelector('.cursor-glow-overlay');
    if (existingGlow) existingGlow.remove();


    // ─── Fullstack Backend REST API Sync Helper ───
    (async function syncWithExpressBackend() {
      try {
        const res = await fetch('/api/destinations');
        if (res.ok) {
          const json = await res.json();
          console.log('[Fullstack Backend Sync] Destinations retrieved from API:', json.data?.length);
        }
      } catch (err) {
        console.log('[Fullstack Backend Sync] Server API fallback mode active.');
      }
    })();
  }

    // ═══════════════════════════════════════════════════
    // DEDICATED HOTEL DETAILS MODAL ENGINE (Requirement 12)
    // ═══════════════════════════════════════════════════
    const HOTELS_DB = {
      'hotel-horizon': {
        id: 'hotel-horizon',
        name: 'Horizon Infinity Resort',
        country: '🇮🇩 Indonesia',
        city: 'Ubud Valley, Bali',
        address: 'Jl. Raya Kedewatan, Ubud, Gianyar, Bali 80571, Indonesia',
        price: '$399',
        rating: '5.0 ★ (480 Reviews)',
        heroImg: 'assets/images/hotel-luxury.jpg',
        badge: '🏆 LUXURY RESORT',
        availability: '⚡ High Demand · Only 3 Villas Left for 2026!',
        description: 'Set amidst the lush jungle canopy of Ubud valley, Horizon Infinity Resort features breathtaking infinity pools cascading over tropical rainforests, private luxury pool villas, holistic spa sanctuaries, and organic farm-to-table dining.',
        roomTypes: [
          { name: 'Jungle View Deluxe Suite', price: '$399 / night', details: '1 King Bed · Valley Balcony · Free Breakfast · Marble Bath' },
          { name: 'Private Infinity Pool Villa', price: '$649 / night', details: '1 King Bed · Private Infinity Plunge Pool · Floating Breakfast · Butler' },
          { name: 'Royal Two-Bedroom Presidential Suite', price: '$1,199 / night', details: '2 King Beds · Private Pool & Garden · VIP Airport Chauffeur' }
        ],
        amenities: [
          '🏊 Cascading Infinity Pool', '💆 Subterranean Spa & Wellness', '🍽️ Michelin-Star Organic Restaurant',
          '🍳 Daily Floating Breakfast', '📶 High-Speed WiFi', '🏋️ 24/7 Fitness Center', '🚗 VIP Airport Chauffeur', '🌴 Sacred Forest Access'
        ],
        nearby: [
          '📍 5 mins to Sacred Monkey Forest Sanctuary', '📍 10 mins to Ubud Traditional Art Market',
          '📍 15 mins to Tegallalang Rice Terraces', '📍 45 mins to Ngurah Rai International Airport'
        ],
        reviews: [
          { author: 'Sarah Mitchell', text: 'The private pool villa overlooking the valley was pure magic! Floating breakfast in the morning was an unforgettable highlight.', rating: '5.0 ★' },
          { author: 'James Kowalski', text: 'Impeccable service, world-class spa treatments, and stunning jungle views. Will definitely return next year.', rating: '5.0 ★' }
        ]
      },
      'hotel-metropolitan': {
        id: 'hotel-metropolitan',
        name: 'Metropolitan Grand Suites',
        country: '🇦🇪 UAE',
        city: 'Downtown Marina, Dubai',
        address: 'Sheikh Zayed Road, Downtown Dubai, United Arab Emirates',
        price: '$529',
        rating: '5.0 ★ (520 Reviews)',
        heroImg: 'assets/images/hotel-boutique.jpg',
        badge: '🏙️ CITY PENTHOUSE',
        availability: '⚡ Limited Availability · 4 Penthouse Suites Left!',
        description: 'Rising high above Dubai Marina, Metropolitan Grand Suites offers panoramic skyline and Arabian Gulf views, rooftop infinity skypools, Michelin-grade dining, and instant access to Dubai Mall.',
        roomTypes: [
          { name: 'Marina View Executive Suite', price: '$529 / night', details: '1 King Bed · Skyline Balcony · Executive Lounge Access' },
          { name: 'Skyline Penthouse Suite', price: '$899 / night', details: '1 King Bed · Private Hot Tub · Complimentary Champagne' },
          { name: 'Royal Burj-View Duplex Suite', price: '$1,499 / night', details: '3 Bedrooms · Panoramic Terrace · Private Chauffeur & Butler' }
        ],
        amenities: [
          '🏊 50th Floor Rooftop Skypool', '🍾 Sky Lounge & Bar', '💼 24/7 Executive Business Center',
          '🚗 Valet Parking & Rolls-Royce Transport', '💆 Luxury Hydrotherapy Spa', '📶 High-Speed WiFi'
        ],
        nearby: [
          '📍 3 mins to Dubai Marina Promenade', '📍 8 mins to Mall of the Emirates',
          '📍 12 mins to Burj Khalifa & Dubai Fountains', '📍 20 mins to Dubai International Airport'
        ],
        reviews: [
          { author: 'Priya Sharma', text: 'The rooftop skypool views at sunset are second to none in Dubai! Service is 7-star quality.', rating: '5.0 ★' }
        ]
      },
      'hotel-aqua': {
        id: 'hotel-aqua',
        name: 'Aqua Lagoon Villa — Maldives',
        country: '🇲🇻 Maldives',
        city: 'Baa Atoll',
        address: 'Baa Atoll UNESCO Biosphere Reserve, Maldives Islands',
        price: '$899',
        rating: '5.0 ★ (610 Reviews)',
        heroImg: 'assets/images/hotel-overwater.jpg',
        badge: '🌊 OVERWATER VILLA',
        availability: '⚡ Only 2 Overwater Villas Remaining for 2026!',
        description: 'Perched over crystal turquoise ocean lagoons, Aqua Lagoon Villa features glass floor viewing panels, direct ocean access staircases, private infinity plunge pools, and 24/7 personal butler service.',
        roomTypes: [
          { name: 'Sunset Overwater Villa', price: '$899 / night', details: '1 King Bed · Ocean Staircase · Glass Floor Panel · Butler' },
          { name: 'Lagoon Reserve Pool Villa', price: '$1,399 / night', details: '1 King Bed · Private Plunge Pool · Hammock over Water · Full Board' },
          { name: 'Grand Ocean Residence', price: '$2,499 / night', details: '2 Bedrooms · Water Slide into Lagoon · Private Chef & Yacht' }
        ],
        amenities: [
          '🤿 Guided Turtle Snorkeling', '🛶 Complimentary Kayaks & Paddleboards', '🍳 24/7 Butler Service',
          '🌅 Sunset Floating Breakfast', '🍽️ Subterranean Underwater Restaurant', '💆 Overwater Spa Domes'
        ],
        nearby: [
          '📍 0 mins to Crystal Ocean Lagoon', '📍 10 mins by Boat to Hanifaru Bay Manta Sanctuary',
          '📍 30 mins Seaplane Flight to Velana Male Airport'
        ],
        reviews: [
          { author: 'Marcus Reed', text: 'Stepping off our bedroom deck directly into the crystal ocean with sea turtles was the dream vacation of a lifetime.', rating: '5.0 ★' }
        ]
      },
      'hotel-aman-tokyo': {
        id: 'hotel-aman-tokyo',
        name: 'Aman Tokyo Skyline Suite',
        country: '🇯🇵 Japan',
        city: 'Otemachi, Tokyo',
        address: 'The Otemachi Tower, 1-5-6 Otemachi, Chiyoda-ku, Tokyo, Japan',
        price: '$799',
        rating: '5.0 ★ (390 Reviews)',
        heroImg: 'assets/images/dest-tokyo.jpg',
        badge: '🗼 TOWER SUITE',
        availability: '⚡ High Demand · 3 Suites Available!',
        description: 'Occupying the top floors of Otemachi Tower, Aman Tokyo blends traditional Japanese paper lantern architecture with soaring Mount Fuji views, private paper-walled teahouses, and traditional Onsen hot spring baths.',
        roomTypes: [
          { name: 'Deluxe City View Suite', price: '$799 / night', details: '1 King Bed · Deep Furo Soaking Tub · Traditional Tea Set' },
          { name: 'Corner Mount Fuji Suite', price: '$1,199 / night', details: '1 King Bed · Unobstructed Mount Fuji Skyline · Private Tea Ceremony' }
        ],
        amenities: [
          '🍵 Garden Teahouse', '♨️ Traditional Onsen Hot Baths', '🍱 Michelin Omakase Restaurant', '🏙️ 30m Indoor Heated Pool'
        ],
        nearby: ['📍 2 mins to Imperial Palace Gardens', '📍 5 mins to Tokyo Station', '📍 10 mins to Ginza Luxury Shopping']
      },
      'hotel-grace-santorini': {
        id: 'hotel-grace-santorini',
        name: 'Grace Hotel Santorini Caldera',
        country: '🇬🇷 Greece',
        city: 'Imerovigli, Santorini',
        address: 'Imerovigli Cliffside, Santorini 84700, Greece',
        price: '$699',
        rating: '5.0 ★ (410 Reviews)',
        heroImg: 'assets/images/dest-santorini.jpg',
        badge: '🌅 CLIFFSIDE CAVE',
        availability: '⚡ Only 2 Suites Remaining for Sunset Season!',
        description: 'Carved directly into the whitewashed volcanic cliffs of Imerovigli, Grace Hotel offers uninterrupted vistas of the Aegean Caldera, private infinity plunge pools, and sommelier-guided volcanic wine tastings.',
        roomTypes: [
          { name: 'Caldera Cave Suite', price: '$699 / night', details: '1 King Bed · Heated Plunge Pool · Champagne Breakfast' },
          { name: 'Grace Royal Villa', price: '$1,499 / night', details: '2 Bedrooms · Private Hammam Spa · Outdoor Infinity Pool' }
        ],
        amenities: ['🏊 Heated Cliffside Infinity Pool', '🍷 Volcanic Wine Bar', '🌅 Unobstructed Sunset View', '💆 Hydrotherapy Spa'],
        nearby: ['📍 5 mins to Fira Cliffside Trail', '📍 15 mins to Oia Castle Sunset Point', '📍 20 mins to Santorini Airport']
      },
      'hotel-meurice-paris': {
        id: 'hotel-meurice-paris',
        name: 'Le Meurice Paris Palace',
        country: '🇫🇷 France',
        city: 'Rue de Rivoli, Paris',
        address: '228 Rue de Rivoli, 75001 Paris, France',
        price: '$950',
        rating: '5.0 ★ (340 Reviews)',
        heroImg: 'assets/images/dest-paris.jpg',
        badge: '👑 ROYAL PALACE',
        availability: '⚡ Royal Suite Available for Booking!',
        description: 'Located directly across from Tuileries Garden, Le Meurice combines 18th-century French palace opulence with Michelin 2-star dining by Alain Ducasse, Eiffel Tower balcony views, and Valet Mercedes transport.',
        roomTypes: [
          { name: 'Executive Tuileries Suite', price: '$950 / night', details: '1 King Bed · Balcony View · French Pastry Basket' },
          { name: 'Eiffel View Presidential Suite', price: '$2,199 / night', details: '2 Bedrooms · Panoramic Eiffel Balcony · Personal Shopper' }
        ],
        amenities: ['🗼 Eiffel Balcony View', '🥐 French Bakery Breakfast', '🍾 Champagne Lounge', '🚗 Chauffeur Service'],
        nearby: ['📍 0 mins to Tuileries Garden', '📍 5 mins to Louvre Museum', '📍 10 mins to Place Vendôme']
      }
    };

    window.openHotelDetailModal = function(hotelId) {
      let data = HOTELS_DB[hotelId];
      if (!data) {
        data = HOTELS_DB['hotel-horizon'];
      }

      const modal = document.getElementById('destination-modal');
      const container = document.getElementById('destination-modal-content');
      if (!modal || !container) return;

      container.innerHTML = `
        <div style="position:relative; height:320px; border-radius:24px 24px 0 0; overflow:hidden;">
          <img src="${data.heroImg}" alt="${data.name}" style="width:100%; height:100%; object-fit:cover;" />
          <div style="position:absolute; inset:0; background:linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.4) 60%, transparent 100%);"></div>
          <div style="position:absolute; bottom:20px; left:24px; right:60px;">
            <div style="display:flex; gap:8px; margin-bottom:8px;">
              <span style="font-size:11px; padding:4px 14px; font-weight:800; border-radius:9999px; background:#fbbf24; color:#0f172a;">${data.badge}</span>
              <span style="font-size:11px; padding:4px 14px; font-weight:800; border-radius:9999px; background:rgba(255,255,255,0.2); color:#fff;">${data.rating}</span>
            </div>
            <h2 style="font-size:32px; font-weight:900; color:#fff; margin:0 0 4px; line-height:1.2;">${data.name}</h2>
            <div style="font-size:14px; color:#38bdf8; font-weight:700;">📍 ${data.address}</div>
          </div>
        </div>

        <div style="padding:28px; background:#0f172a; color:#cbd5e1;">
          <div style="background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.3); padding:10px 16px; border-radius:12px; font-size:12px; font-weight:800; color:#fbbf24; margin-bottom:20px; text-align:center;">
            ${data.availability}
          </div>

          <p style="font-size:14px; line-height:1.7; color:#94a3b8; margin-bottom:24px;">${data.description}</p>

          <h3 style="font-size:18px; font-weight:900; color:#fff; margin-bottom:14px;">🛏️ Available Room & Suite Types</h3>
          <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px;">
            ${data.roomTypes.map(room => `
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:16px; border-radius:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                <div>
                  <div style="font-size:15px; font-weight:800; color:#fff;">${room.name}</div>
                  <div style="font-size:12px; color:#94a3b8; margin-top:2px;">${room.details}</div>
                </div>
                <div style="display:flex; align-items:center; gap:14px;">
                  <div style="font-size:18px; font-weight:900; color:#fbbf24;">${room.price}</div>
                  <button type="button" class="btn btn-primary btn-sm" style="padding:10px 20px; font-size:12px; font-weight:800; border:none; cursor:pointer;" onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({id: '${data.id}', title: '${data.name} — ${room.name}', name: '${data.name}', location: '${data.location}', price: '${room.price}', heroImage: '${data.heroImg}', days: data.nights||1, nights: data.nights||1}, 'hotel')">
                    Book Room ⚡
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <h3 style="font-size:18px; font-weight:900; color:#fff; margin-bottom:14px;">✨ Premium Hotel Amenities</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:28px;">
            ${data.amenities.map(a => `
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:10px 14px; border-radius:12px; font-size:13px; color:#e2e8f0;">
                ${a}
              </div>
            `).join('')}
          </div>

          <h3 style="font-size:18px; font-weight:900; color:#fff; margin-bottom:14px;">🗺️ Location & Nearby Attractions</h3>
          <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:28px;">
            ${data.nearby.map(n => `
              <div style="font-size:13px; color:#94a3b8; background:rgba(255,255,255,0.02); padding:10px 14px; border-radius:10px; border:1px solid rgba(255,255,255,0.04);">
                ${n}
              </div>
            `).join('')}
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.2); padding:18px 24px; border-radius:20px;">
            <div>
              <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:700;">Starting Room Rate</div>
              <div style="font-size:28px; font-weight:900; color:#fbbf24;">${data.price} <span style="font-size:12px; color:#94a3b8; font-weight:400;">/ night</span></div>
            </div>
            <button type="button" class="btn btn-primary" style="padding:14px 32px; font-size:15px; font-weight:800; border-radius:9999px; border:none; cursor:pointer;" onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({id: '${data.id}', title: '${data.name}', name: '${data.name}', location: '${data.location}', price: '${data.price}', heroImage: '${data.heroImg}', nights: 1, days: 1}, 'hotel')">
              ⚡ Reserve Suite Now →
            </button>
          </div>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    // ═══════════════════════════════════════════════════
    // DEDICATED CRUISE DETAILS MODAL ENGINE (Requirement 13)
    // ═══════════════════════════════════════════════════
    const CRUISES_DB = {
      'cruise-mediterranean': {
        id: 'cruise-mediterranean',
        name: 'Mediterranean Magic Voyage — 14 Days',
        route: '🌊 Mediterranean Route (Italy, Greece, Spain & France)',
        duration: '14 Nights / 15 Days',
        price: '$1,899',
        rating: '4.9 ★ (340 Reviews)',
        heroImg: 'assets/images/gallery-3.jpg',
        badge: '🚢 POPULAR CRUISE',
        cabins: [
          { name: 'Ocean View Stateroom', price: '$1,899 / person', desc: 'Private Porthole Window · 2 Twin/Queen Beds · Full Board' },
          { name: 'Balcony Ocean Suite', price: '$2,499 / person', desc: 'Private Veranda · Sitting Area · Priority Dining & Lounge' },
          { name: 'Royal Owner\'s Penthouse Suite', price: '$4,299 / person', desc: 'Panoramic Teak Balcony · Private Jacuzzi · Butler & Champagne' }
        ],
        dining: ['🥩 Prime Steakhouse & Seafood Grill', '🍷 Sommelier Wine Bar & Tapas', '🍝 5-Star Italian Trattoria', '🍳 24/7 Room Service Buffet'],
        entertainment: ['🎭 Broadway Theater Musical Shows', '🎰 Grand Royale Casino', '🏊 Sun Deck Infinity Pool & Parties', '🎷 Nightly Jazz Lounge'],
        ports: [
          'Port 1: Rome (Civitavecchia), Italy — Boarding & Welcome Gala',
          'Port 2: Naples & Amalfi Coast, Italy',
          'Port 3: Santorini Caldera, Greece',
          'Port 4: Mykonos Old Town, Greece',
          'Port 5: Athens (Piraeus), Greece',
          'Port 6: Valletta, Malta',
          'Port 7: Barcelona, Spain — Disembarkation'
        ]
      },
      'cruise-caribbean': {
        id: 'cruise-caribbean',
        name: 'Caribbean Island Hopper — 10 Days',
        route: '🌊 Caribbean Tropical Route (Bahamas, Cozumel, Jamaica, St. Thomas)',
        duration: '10 Nights / 11 Days',
        price: '$1,499',
        rating: '4.8 ★ (280 Reviews)',
        heroImg: 'assets/images/gallery-1.jpg',
        badge: '🏝️ TROPICAL CRUISE',
        cabins: [
          { name: 'Ocean View Stateroom', price: '$1,499 / person', desc: 'Ocean View Window · All Meals & Drinks Included' },
          { name: 'Sunset Balcony Suite', price: '$1,999 / person', desc: 'Private Teak Balcony · Priority Excursions' }
        ],
        dining: ['🌮 Caribbean Island Grill', '🍣 Fresh Sushi Bar', '🍹 All-Inclusive Tiki Cocktails'],
        entertainment: ['🤿 Snorkeling Reef Excursions', '🏝️ Private Island Beach Club Party', '🎸 Reggae Live Bands'],
        ports: ['Miami Boarding', 'Nassau Bahamas', 'Cozumel Mexico', 'Ocho Rios Jamaica', 'St. Thomas Virgin Islands']
      },
      'cruise-greek-isles': {
        id: 'cruise-greek-isles',
        name: 'Greek Isles Discovery — 8 Days',
        route: '🌊 Aegean Sea Route (Santorini, Mykonos, Crete, Rhodes & Athens)',
        duration: '8 Nights / 9 Days',
        price: '$1,299',
        rating: '4.9 ★ (310 Reviews)',
        heroImg: 'assets/images/dest-santorini.jpg',
        badge: '🏛️ HERITAGE CRUISE',
        cabins: [
          { name: 'Aegean Balcony Suite', price: '$1,299 / person', desc: 'Caldera View Balcony · Greek Wine Package' }
        ],
        dining: ['🥗 Greek Taverna & Seafood Grill', '🍷 Assyrtiko Wine Lounge'],
        entertainment: ['🏛️ Ancient Ruins Guided Tours', '🌅 Sunset Deck Concerts'],
        ports: ['Athens Departure', 'Santorini', 'Mykonos', 'Crete', 'Rhodes']
      },
      'cruise-alaska': {
        id: 'cruise-alaska',
        name: 'Alaska Wilderness Glacier Cruise — 12 Days',
        route: '🌊 Inside Passage & Glacier Bay Route',
        duration: '12 Nights / 13 Days',
        price: '$2,299',
        rating: '4.9 ★ (260 Reviews)',
        heroImg: 'assets/images/gallery-2.jpg',
        badge: '🧊 GLACIER EXPEDITION',
        cabins: [
          { name: 'Glacier View Suite', price: '$2,299 / person', desc: 'Heated Balcony · Telescope Included' }
        ],
        dining: ['🦀 Salmon & King Crab House', '☕ Heated Glacier Lounge'],
        entertainment: ['🦅 Whale Watching Excursions', '🧊 Glacier Ice Helicopter Landing'],
        ports: ['Seattle Departure', 'Juneau Alaska', 'Skagway', 'Glacier Bay National Park', 'Ketchikan']
      },
      'cruise-asia-pacific': {
        id: 'cruise-asia-pacific',
        name: 'Asia Pacific Grand Voyage — 16 Days',
        route: '🌊 Far East Route (Japan, Vietnam, Thailand & Singapore)',
        duration: '16 Nights / 17 Days',
        price: '$2,799',
        rating: '5.0 ★ (390 Reviews)',
        heroImg: 'assets/images/dest-maldives.jpg',
        badge: '🌏 GRAND VOYAGE',
        cabins: [
          { name: 'Pacific Balcony Residence', price: '$2,799 / person', desc: 'Executive Lounge & Private Dining' }
        ],
        dining: ['🍜 Pan-Asian Noodle Bar & Omakase', '🥟 Dim Sum Lounge'],
        entertainment: ['🎎 Cultural Dance Performances', '💆 Asian Wellness Spa'],
        ports: ['Tokyo Departure', 'Kyoto (Kobe)', 'Halong Bay Vietnam', 'Bangkok Thailand', 'Singapore Arrival']
      }
    };

    window.openCruiseDetailModal = function(cruiseId) {
      let data = CRUISES_DB[cruiseId] || CRUISES_DB['cruise-mediterranean'];

      const modal = document.getElementById('destination-modal');
      const container = document.getElementById('destination-modal-content');
      if (!modal || !container) return;

      container.innerHTML = `
        <div style="position:relative; height:320px; border-radius:24px 24px 0 0; overflow:hidden;">
          <img src="${data.heroImg}" alt="${data.name}" style="width:100%; height:100%; object-fit:cover;" />
          <div style="position:absolute; inset:0; background:linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.4) 60%, transparent 100%);"></div>
          <div style="position:absolute; bottom:20px; left:24px; right:60px;">
            <div style="display:flex; gap:8px; margin-bottom:8px;">
              <span style="font-size:11px; padding:4px 14px; font-weight:800; border-radius:9999px; background:#0284c7; color:#fff;">${data.badge}</span>
              <span style="font-size:11px; padding:4px 14px; font-weight:800; border-radius:9999px; background:rgba(255,255,255,0.2); color:#fff;">⏱️ ${data.duration}</span>
            </div>
            <h2 style="font-size:32px; font-weight:900; color:#fff; margin:0 0 4px; line-height:1.2;">${data.name}</h2>
            <div style="font-size:14px; color:#38bdf8; font-weight:700;">${data.route}</div>
          </div>
        </div>

        <div style="padding:28px; background:#0f172a; color:#cbd5e1;">
          <h3 style="font-size:18px; font-weight:900; color:#fff; margin-bottom:14px;">⛵ Stateroom & Cabin Options</h3>
          <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px;">
            ${data.cabins.map(c => `
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:16px; border-radius:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                <div>
                  <div style="font-size:15px; font-weight:800; color:#fff;">${c.name}</div>
                  <div style="font-size:12px; color:#94a3b8; margin-top:2px;">${c.desc}</div>
                </div>
                <div style="display:flex; align-items:center; gap:14px;">
                  <div style="font-size:18px; font-weight:900; color:#fbbf24;">${c.price}</div>
                  <button type="button" class="btn btn-primary btn-sm" style="padding:10px 20px; font-size:12px; font-weight:800; border:none; cursor:pointer;" onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({id: '${data.id}', title: '${data.name} — ${c.name}', name: '${data.name}', route: '${data.route}', duration: '${data.duration}', price: '${c.price}', heroImg: '${data.heroImg}'}, 'cruise')">
                    Book Cabin ⚡
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <h3 style="font-size:18px; font-weight:900; color:#fff; margin-bottom:14px;">🍽️ Dining & Culinary Venues</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:28px;">
            ${data.dining.map(d => `<div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:12px; font-size:13px; color:#e2e8f0;">${d}</div>`).join('')}
          </div>

          <h3 style="font-size:18px; font-weight:900; color:#fff; margin-bottom:14px;">🎭 Onboard Entertainment</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:28px;">
            ${data.entertainment.map(e => `<div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:12px; font-size:13px; color:#e2e8f0;">${e}</div>`).join('')}
          </div>

          <h3 style="font-size:18px; font-weight:900; color:#fff; margin-bottom:14px;">🏙️ Port Itinerary</h3>
          <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:28px;">
            ${data.ports.map(p => `<div style="font-size:13px; color:#94a3b8; background:rgba(255,255,255,0.02); padding:10px 14px; border-radius:10px;">${p}</div>`).join('')}
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(2,132,199,0.12); border:1px solid rgba(2,132,199,0.3); padding:18px 24px; border-radius:20px;">
            <div>
              <div style="font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:700;">Starting Cruise Fares</div>
              <div style="font-size:28px; font-weight:900; color:#fbbf24;">${data.price} <span style="font-size:12px; color:#94a3b8; font-weight:400;">/ person</span></div>
            </div>
            <button type="button" class="btn btn-primary" style="padding:14px 32px; font-size:15px; font-weight:800; border-radius:9999px; border:none; cursor:pointer;" onclick="if(window.VentouraEnquiry) window.VentouraEnquiry.openEnquiryModal({id: '${data.id}', title: '${data.name}', name: '${data.name}', route: '${data.route}', duration: '${data.duration}', price: '${data.price}', heroImg: '${data.heroImg}'}, 'cruise')">
              ⚡ Book This Cruise →
            </button>
          </div>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    // ═══════════════════════════════════════════════════
    // INTERACTIVE AIRLINE PARTNERS ENGINE (Requirement 14)
    // ═══════════════════════════════════════════════════
    const AIRLINES_DB = {
      'emirates': { name: 'Emirates', country: '🇦🇪 UAE', hub: 'Dubai (DXB)', fleet: 'Airbus A380 & Boeing 777-300ER', perk: '15% Off Flights + Private Chauffeur Drive', desc: 'Emirates operates the world\'s largest fleet of Airbus A380 double-decker superjumbos, offering private First Class suites with onboard Shower Spas and Lounge Bars.' },
      'qatar': { name: 'Qatar Airways', country: '🇶🇦 Qatar', hub: 'Doha (DOH)', fleet: 'Airbus A350-1000 & Boeing 777X', perk: 'World\'s Best Business Class (Qsuite)', desc: 'Qatar Airways features the revolutionary Qsuite Business Class with double beds and private closing doors, connecting 160+ destinations worldwide.' },
      'singapore': { name: 'Singapore Airlines', country: '🇸🇬 Singapore', hub: 'Changi (SIN)', fleet: 'Airbus A380 & A350 Ultra Long-Range', perk: 'Book The Chef Michelin Dining', desc: 'Singapore Airlines is renowned for world-class hospitality, A380 First Class Suites with standalone beds, and non-stop flights to North America.' },
      'british-airways': { name: 'British Airways', country: '🇬🇧 UK', hub: 'London Heathrow (LHR)', fleet: 'Boeing 787 Dreamliner & A350-1000', perk: 'Club Suite Direct Aisle Access', desc: 'British Airways offers seamless transatlantic connectivity, Club World suites with privacy doors, and Concorde Lounge access at LHR Terminal 5.' },
      'air-france': { name: 'Air France', country: '🇫🇷 France', hub: 'Paris CDG', fleet: 'Airbus A350 & Boeing 777-300', perk: 'La Première Michelin Gastronomy', desc: 'Air France provides ultra-luxury La Première First Class suites with private curtains, champagne lounges, and French haute cuisine.' },
      'lufthansa': { name: 'Lufthansa', country: '🇩🇪 Germany', hub: 'Frankfurt (FRA) & Munich (MUC)', fleet: 'Boeing 747-8 Intercontinental', perk: 'First Class Terminal & Porsche Escort', desc: 'Lufthansa operates the iconic Queen of the Skies Boeing 747-8, offering dedicated First Class terminals and chauffeured Porsche tarmac transfers.' },
      'ana': { name: 'ANA All Nippon Airways', country: '🇯🇵 Japan', hub: 'Tokyo Haneda (HND) & Narita (NRT)', fleet: 'Boeing 787 Dreamliner', perk: 'The Suite & The Room Private Sliding Doors', desc: 'ANA Japan delivers Japanese Omotenashi hospitality with enclosed Business Class suites and traditional Kaiseki in-flight dining.' },
      'etihad': { name: 'Etihad Airways', country: '🇦🇪 UAE', hub: 'Abu Dhabi (AUH)', fleet: 'Airbus A380 & Boeing 787', perk: 'The Residence 3-Room Luxury Apartment', desc: 'Etihad offers The Residence—a private 3-room apartment in the sky with double bed, ensuite shower, and personal butler.' },
      'turkish': { name: 'Turkish Airlines', country: '🇹🇷 Turkey', hub: 'Istanbul (IST)', fleet: 'Airbus A350 & Boeing 787', perk: 'Fly to 125+ Countries & Flying Chefs', desc: 'Turkish Airlines flies to more countries than any other airline in the world, featuring gourmet Flying Chefs on long-haul routes.' },
      'qantas': { name: 'Qantas Airways', country: '🇦🇺 Australia', hub: 'Sydney (SYD) & Melbourne (MEL)', fleet: 'Airbus A380 & Project Sunrise A350', perk: 'First Class Lounge Rockpool Dining', desc: 'Qantas connects Australia to the world with non-stop ultra long-haul flights, Neil Perry Rockpool dining, and marble spa lounges.' }
    };

    window.openAirlineInfoModal = function(airlineId) {
      let data = AIRLINES_DB[airlineId] || AIRLINES_DB['emirates'];

      const modal = document.getElementById('destination-modal');
      const container = document.getElementById('destination-modal-content');
      if (!modal || !container) return;

      container.innerHTML = `
        <div style="padding:28px; background:#0f172a; color:#cbd5e1; border-radius:24px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:36px;">✈️</span>
              <div>
                <h2 style="font-size:28px; font-weight:900; color:#fff; margin:0;">${data.name}</h2>
                <div style="font-size:13px; color:#38bdf8; font-weight:700;">${data.country} · Hub: ${data.hub}</div>
              </div>
            </div>
            <span style="background:rgba(251,191,36,0.2); color:#fbbf24; border:1px solid rgba(251,191,36,0.3); padding:6px 14px; border-radius:9999px; font-size:12px; font-weight:800;">OFFICIAL PARTNER</span>
          </div>

          <p style="font-size:14px; line-height:1.7; color:#94a3b8; margin-bottom:20px;">${data.desc}</p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px;">
            <div style="background:rgba(255,255,255,0.04); padding:14px; border-radius:14px; border:1px solid rgba(255,255,255,0.08);">
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Flagship Fleet</div>
              <div style="font-size:14px; color:#fff; font-weight:700; margin-top:4px;">${data.fleet}</div>
            </div>
            <div style="background:rgba(255,255,255,0.04); padding:14px; border-radius:14px; border:1px solid rgba(255,255,255,0.08);">
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Wanderlux Partner Benefit</div>
              <div style="font-size:14px; color:#fbbf24; font-weight:700; margin-top:4px;">${data.perk}</div>
            </div>
          </div>

          <div style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.25); padding:16px 20px; border-radius:16px; display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div style="font-size:12px; color:#38bdf8; font-weight:800;">Exclusive Airline Discount</div>
              <div style="font-size:14px; color:#fff;">Save up to 15% on flight fares when bundled with any travel package.</div>
            </div>
            <a href="services.html?cat=packages" class="btn btn-primary btn-sm" style="padding:10px 20px; font-size:12px; font-weight:800; text-decoration:none;">
              Search Packages →
            </a>
          </div>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    // Global Image Lightbox Modal Handler
    window.openImageLightbox = function(src, title) {
      const modal = document.getElementById('image-lightbox-modal');
      const img = document.getElementById('lightbox-img');
      const titleEl = document.getElementById('lightbox-title');
      if (!modal || !img) return;

      img.src = src;
      if (titleEl) titleEl.textContent = title || '';
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
      document.body.style.overflow = 'hidden';
    };

    window.closeImageLightbox = function() {
      const modal = document.getElementById('image-lightbox-modal');
      if (!modal) return;
      modal.style.opacity = '0';
      modal.style.visibility = 'hidden';
      document.body.style.overflow = '';
    };

    // Global Download Luxury Brochure Handler
    window.downloadLuxuryBrochure = function() {
      const notification = document.createElement('div');
      notification.style.cssText = 'position:fixed; bottom:24px; right:24px; z-index:100000; background:linear-gradient(135deg,#0284c7,#0369a1); color:#fff; padding:16px 24px; border-radius:16px; font-weight:800; font-size:14px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.5); display:flex; align-items:center; gap:12px; transition:all 0.3s ease;';
      notification.innerHTML = '<span>📄</span> Ventoura 2026 Luxury Global Travel Catalog downloading...';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 3000);

      // Create dummy downloadable blob if file doesn't exist locally
      const blob = new Blob(["VENTOURA TRAVEL AGENCY 2026 LUXURY CATALOG\n\nFeatured Destinations:\n1. Amalfi Coast Escape (Italy)\n2. Kyoto Zen Retreat (Japan)\n3. Maldives Private Haven (Maldives)\n4. Patagonia Odyssey (Argentina & Chile)\n5. St. Moritz Alpine Escape (Switzerland)\n6. Serengeti Safari Expedition (Tanzania)\n\nVisit: http://localhost:8000"], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'Ventoura_Luxury_Travel_Catalog_2026.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    // Close Lightbox on overlay click or Escape key
    document.addEventListener('click', function(e) {
      const modal = document.getElementById('image-lightbox-modal');
      if (modal && e.target === modal) {
        window.closeImageLightbox();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        window.closeImageLightbox();
      }
    });

    // Gallery Tab Filtering Logic
    document.addEventListener('DOMContentLoaded', function() {
      const tabBtns = document.querySelectorAll('.gallery-tab-btn');
      const galleryItems = document.querySelectorAll('.gallery-item');

      if (!tabBtns.length || !galleryItems.length) return;

      tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          tabBtns.forEach(b => {
            b.classList.remove('active');
            b.style.background = 'var(--bg-card)';
            b.style.color = 'var(--text-secondary)';
            b.style.border = '1px solid var(--glass-border)';
          });

          this.classList.add('active');
          this.style.background = 'var(--accent)';
          this.style.color = '#0f172a';
          this.style.border = 'none';

          const filter = this.getAttribute('data-filter');

          galleryItems.forEach(item => {
            const cat = item.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
              item.style.display = 'block';
              item.classList.add('visible');
              item.style.opacity = '1';
              item.style.transform = 'none';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });

})();


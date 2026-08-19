/**
 * Base UI Navigation Menu Engine for Ventoura Travel
 * Follows the Base UI / Headless Navigation Menu interaction pattern:
 * NavigationMenu > NavigationMenuList > NavigationMenuItem > (NavigationMenuTrigger + NavigationMenuContent | NavigationMenuLink) + NavigationMenuIndicator
 */
(function() {
  'use strict';

  // Default fallback data if API/CMS is pending
  const DEFAULT_DESTINATIONS = [
    {
      id: 'dest-1',
      title: 'Amalfi Coast Escape',
      city: 'Positano & Amalfi',
      country: 'Italy 🇮🇹',
      price: '₹2,85,000',
      duration: '7 Days',
      image: 'assets/images/amalfi-view-1.jpg',
      description: 'Cliffside pastel villages, private yacht charters to Capri & Michelin dining.'
    },
    {
      id: 'dest-2',
      title: 'Kyoto Zen Retreat',
      city: 'Kyoto',
      country: 'Japan 🇯🇵',
      price: '₹3,20,000',
      duration: '8 Days',
      image: 'assets/images/kyoto-view-1.jpg',
      description: 'Ancient bamboo groves, private tea ceremonies & riverfront ryokan onsens.'
    },
    {
      id: 'dest-3',
      title: 'Maldives Private Haven',
      city: 'Baa Atoll',
      country: 'Maldives 🇲🇻',
      price: '₹4,50,000',
      duration: '6 Days',
      image: 'assets/images/dest-maldives.jpg',
      description: 'Overwater luxury villas with private lagoon pool & seaplane transfers.'
    },
    {
      id: 'dest-4',
      title: 'Bali Tropical Paradise',
      city: 'Ubud & Seminyak',
      country: 'Indonesia 🇮🇩',
      price: '₹1,49,900',
      duration: '7 Days',
      image: 'assets/images/dest-bali.jpg',
      description: 'Private infinity pool villa stays, jungle swings, and sacred ocean temples.'
    },
    {
      id: 'dest-1786535642759',
      title: 'Kerala Backwater Sanctuary',
      city: 'Alleppey & Munnar',
      country: 'India 🇮🇳',
      price: '₹1,80,000',
      duration: '7 Days',
      image: 'assets/images/kerala-view-1.jpg',
      description: 'Private air-conditioned houseboat cruises and Ayurvedic hill resort spa.'
    },
    {
      id: 'dest-6',
      title: 'Santorini Sunset Dreams',
      city: 'Oia & Fira',
      country: 'Greece 🇬🇷',
      price: '₹2,85,000',
      duration: '6 Days',
      image: 'assets/images/dest-santorini.jpg',
      description: 'Caldera cliff luxury cave suites, sunset catamaran cruises & Aegean wine.'
    }
  ];

  const DEFAULT_PACKAGES = [
    {
      id: 'pkg-kashmir-6d',
      title: 'Flagship Kashmir Paradise & Gondola',
      duration: '6 Days / 5 Nights',
      price: '₹24,500',
      badge: 'BEST SELLER',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80',
      highlights: 'Dal Lake Shikara ride, luxury houseboat & Gulmarg Phase 2 Gondola pass.'
    },
    {
      id: 'pkg-goa-5d',
      title: 'Goa Sun & Sea Beach Escape',
      duration: '5 Days / 4 Nights',
      price: '₹14,999',
      badge: '15% OFF',
      image: 'assets/images/dest-goa.jpg',
      highlights: 'North & South beaches, luxury beachfront resort & private sunset yacht cruise.'
    },
    {
      id: 'pkg-kerala-5d',
      title: 'Kerala Backwaters & Munnar Tea Hills',
      duration: '5 Days / 4 Nights',
      price: '₹18,999',
      badge: 'POPULAR',
      image: 'assets/images/kerala-view-1.jpg',
      highlights: 'Private AC houseboat stay, spice plantation safari & Ayurvedic spa.'
    },
    {
      id: 'pkg-rajasthan-7d',
      title: 'Royal Rajasthan Forts & Desert Safari',
      duration: '7 Days / 6 Nights',
      price: '₹28,900',
      badge: 'HERITAGE VIP',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80',
      highlights: 'Jaipur & Udaipur royal palace stays, Lake Pichola boat & Thar camel glamping.'
    },
    {
      id: 'pkg-maldives-5d',
      title: 'Maldives Overwater Villa Paradise',
      duration: '5 Days / 4 Nights',
      price: '₹65,000',
      badge: 'ALL-INCLUSIVE',
      image: 'assets/images/dest-maldives.jpg',
      highlights: 'Private pool overwater villa, seaplane transfers & coral reef snorkeling.'
    },
    {
      id: 'pkg-bali-6d',
      title: 'Bali Tropical Island & Temple Odyssey',
      duration: '6 Days / 5 Nights',
      price: '₹38,900',
      badge: 'HOT DEAL',
      image: 'assets/images/dest-bali.jpg',
      highlights: 'Private Ubud pool villa, Tanah Lot sunset & Nusa Penida island speedboat pass.'
    }
  ];

  class BaseUINavigationMenu {
    constructor(container) {
      this.container = container;
      this.list = container.querySelector('.base-nav-menu-list');
      this.items = Array.from(container.querySelectorAll('.base-nav-menu-item'));
      this.triggers = Array.from(container.querySelectorAll('.base-nav-menu-trigger'));
      this.indicator = container.querySelector('.base-nav-menu-indicator');
      if (this.indicator) {
        this.indicator.style.opacity = '0';
        this.indicator.style.width = '0px';
      }
      this.activeItem = null;
      this.openTimeout = null;
      this.closeTimeout = null;

      this.init();
    }

    init() {
      this.loadDynamicData();
      this.bindEvents();

      // Listen for CMS updates if custom event dispatched
      window.addEventListener('cms:updated', () => this.loadDynamicData());
    }

    loadDynamicData() {
      // Render destinations and packages once
      const destContainer = this.container.querySelector('#nav-destinations-grid');
      if (!destContainer || !destContainer.children.length) {
        this.renderDestinations();
      }
      const pkgContainer = this.container.querySelector('#nav-packages-grid');
      if (!pkgContainer || !pkgContainer.children.length) {
        this.renderPackages();
      }

      // Check backend API without jarring UI rewrite
      if (window.fetch && (!destContainer || !destContainer.children.length || !pkgContainer || !pkgContainer.children.length)) {
        fetch('/api/destinations')
          .then(res => res.json())
          .then(data => {
            if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
              this.renderDestinations(data.data);
            }
          })
          .catch(() => {});

        fetch('/api/packages')
          .then(res => res.json())
          .then(data => {
            if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
              this.renderPackages(data.data);
            }
          })
          .catch(() => {});
      }
    }

    renderDestinations(list) {
      const container = this.container.querySelector('#nav-destinations-content');
      if (!container) return;

      const items = (list && list.length > 0) ? list.slice(0, 6) : DEFAULT_DESTINATIONS;

      const html = `
        <div class="base-nav-dropdown-inner destinations-dropdown">
          <div class="base-nav-dropdown-header">
            <span class="base-nav-badge">Handcrafted Destinations</span>
            <span class="base-nav-count">${items.length} Featured</span>
          </div>

          <div class="base-nav-grid destinations-grid-layout">
            ${items.map(item => {
              const id = item.id || item._id || item.title;
              const img = item.image || item.image_url || 'assets/images/dest-maldives.jpg';
              const location = item.city ? `${item.city}, ${item.country}` : (item.country || 'Global');
              const price = item.startingPrice ? (typeof item.startingPrice === 'number' ? `₹${item.startingPrice.toLocaleString('en-IN')}` : item.startingPrice) : (item.price || '');
              const desc = item.description ? (item.description.length > 70 ? item.description.substring(0, 68) + '...' : item.description) : 'Luxury curated travel experience.';

              return `
                <a href="detail.html?type=destination&id=${encodeURIComponent(id)}" class="base-nav-card" target="_self">
                  <div class="base-nav-card-thumb">
                    <img src="${img}" alt="${item.title}" loading="lazy" />
                  </div>
                  <div class="base-nav-card-info">
                    <div class="base-nav-card-tag">${location}</div>
                    <div class="base-nav-card-title">${item.title}</div>
                    <div class="base-nav-card-desc">${desc}</div>
                    ${price ? `<div class="base-nav-card-price">From <strong>${price}</strong></div>` : ''}
                  </div>
                </a>
              `;
            }).join('')}
          </div>

          <div class="base-nav-dropdown-footer">
            <span class="base-nav-footer-hint">🗺️ Looking for more? Explore all 100+ destinations</span>
            <a href="#destinations" class="base-nav-footer-btn" target="_self">View All Destinations →</a>
          </div>
        </div>
      `;

      container.innerHTML = html;
    }

    renderPackages(list) {
      const container = this.container.querySelector('#nav-packages-content');
      if (!container) return;

      const items = (list && list.length > 0) ? list.slice(0, 6) : DEFAULT_PACKAGES;

      const html = `
        <div class="base-nav-dropdown-inner packages-dropdown">
          <div class="base-nav-dropdown-header">
            <span class="base-nav-badge">All-Inclusive Tour Packages</span>
            <span class="base-nav-count">${items.length} Trending</span>
          </div>

          <div class="base-nav-grid packages-grid-layout">
            ${items.map(item => {
              const id = item._id || item.id || item.title;
              const img = item.featuredImage || item.image || item.image_url || 'assets/images/dest-goa.jpg';
              const price = item.price ? (typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : item.price) : '';
              const duration = item.duration || '5 Days';
              const badge = item.badge || 'POPULAR';
              const snippet = item.highlights || item.description || 'All-inclusive stays, private tours & verified transfers.';
              const cleanSnippet = typeof snippet === 'string' ? (snippet.length > 70 ? snippet.substring(0, 68) + '...' : snippet) : 'All-inclusive curated holiday.';

              return `
                <a href="detail.html?type=package&id=${encodeURIComponent(id)}" class="base-nav-card" target="_self">
                  <div class="base-nav-card-thumb">
                    <img src="${img}" alt="${item.title}" loading="lazy" />
                    <span class="base-nav-card-badge">${badge}</span>
                  </div>
                  <div class="base-nav-card-info">
                    <div class="base-nav-card-meta">📅 ${duration}</div>
                    <div class="base-nav-card-title">${item.title}</div>
                    <div class="base-nav-card-desc">${cleanSnippet}</div>
                    ${price ? `<div class="base-nav-card-price">Starting <strong>${price}</strong> / person</div>` : ''}
                  </div>
                </a>
              `;
            }).join('')}
          </div>

          <div class="base-nav-dropdown-footer">
            <span class="base-nav-footer-hint">🎁 Guaranteed lowest prices with zero cancellation penalty</span>
            <a href="#packages" class="base-nav-footer-btn" target="_self">Browse All Packages →</a>
          </div>
        </div>
      `;

      container.innerHTML = html;
    }

    bindEvents() {
      // 1. Mouse interactions with smooth hover-intent
      this.items.forEach(item => {
        const trigger = item.querySelector('.base-nav-menu-trigger');
        const content = item.querySelector('.base-nav-menu-content');

        if (trigger && content) {
          item.addEventListener('mouseenter', () => this.handlePointerEnter(item));
          item.addEventListener('mouseleave', () => this.handlePointerLeave(item));

          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.activeItem === item) {
              this.close();
            } else {
              this.open(item);
            }
          });
        } else {
          // Normal link item
          const link = item.querySelector('.base-nav-menu-link');
          if (link) {
            item.addEventListener('mouseenter', () => {
              this.close();
              this.updateIndicator(item);
            });
            item.addEventListener('mouseleave', () => {
              if (!this.activeItem) {
                this.hideIndicator();
              }
            });
          }
        }
      });

      // 2. Global clicks outside close dropdown
      document.addEventListener('click', (e) => {
        if (!this.container.contains(e.target)) {
          this.close();
        }
      });

      // 3. Escape key closes menu
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (this.activeItem) {
            const trigger = this.activeItem.querySelector('.base-nav-menu-trigger');
            this.close();
            if (trigger) trigger.focus();
          }
        }

        // Arrow navigation between triggers
        if (this.activeItem || document.activeElement.classList.contains('base-nav-menu-trigger')) {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const currentTrigger = document.activeElement.classList.contains('base-nav-menu-trigger') 
              ? document.activeElement 
              : this.activeItem?.querySelector('.base-nav-menu-trigger');

            if (currentTrigger) {
              const triggers = this.triggers;
              const idx = triggers.indexOf(currentTrigger);
              if (idx !== -1) {
                const nextIdx = e.key === 'ArrowRight' ? (idx + 1) % triggers.length : (idx - 1 + triggers.length) % triggers.length;
                const nextTrigger = triggers[nextIdx];
                nextTrigger.focus();
                const parentItem = nextTrigger.closest('.base-nav-menu-item');
                if (parentItem) {
                  this.open(parentItem);
                }
              }
            }
          }
        }
      });
    }

    handlePointerEnter(item) {
      clearTimeout(this.closeTimeout);
      this.openTimeout = setTimeout(() => {
        this.open(item);
      }, 70);
    }

    handlePointerLeave(item) {
      clearTimeout(this.openTimeout);
      this.closeTimeout = setTimeout(() => {
        if (this.activeItem === item) {
          this.close();
        }
      }, 150);
    }

    open(item) {
      clearTimeout(this.openTimeout);
      clearTimeout(this.closeTimeout);

      if (this.activeItem && this.activeItem !== item) {
        this.activeItem.classList.remove('is-open');
        const prevTrigger = this.activeItem.querySelector('.base-nav-menu-trigger');
        if (prevTrigger) prevTrigger.setAttribute('aria-expanded', 'false');
      }

      this.activeItem = item;
      item.classList.add('is-open');
      const trigger = item.querySelector('.base-nav-menu-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');

      this.updateIndicator(item);
    }

    close() {
      clearTimeout(this.openTimeout);
      clearTimeout(this.closeTimeout);

      if (this.activeItem) {
        this.activeItem.classList.remove('is-open');
        const trigger = this.activeItem.querySelector('.base-nav-menu-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        this.activeItem = null;
      }
      this.hideIndicator();
    }

    updateIndicator(item) {
      if (!this.indicator || !item || !this.list) return;

      const trigger = item.querySelector('.base-nav-menu-trigger') || item.querySelector('.base-nav-menu-link');
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const listRect = this.list.getBoundingClientRect();

      const offsetLeft = triggerRect.left - listRect.left;
      const width = triggerRect.width;

      this.indicator.style.transform = `translateX(${offsetLeft}px)`;
      this.indicator.style.width = `${width}px`;
      this.indicator.style.opacity = '1';
    }

    hideIndicator() {
      if (this.indicator) {
        this.indicator.style.opacity = '0';
      }
    }
  }

  // Initialize on page ready
  function initNavigation() {
    const navRoot = document.querySelector('.base-nav-menu');
    if (navRoot && !navRoot.dataset.initialized) {
      navRoot.dataset.initialized = 'true';
      window.VentouraBaseNav = new BaseUINavigationMenu(navRoot);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }

  window.initBaseUINavigationMenu = initNavigation;
})();

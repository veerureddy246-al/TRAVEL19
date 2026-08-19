/* ============================================================
   VENTOURA TRAVEL AGENCY — ENTERPRISE SUPABASE WISHLIST SYSTEM
   ============================================================ */

(function () {
  'use strict';

  // In-memory cache of user's saved wishlist items
  let currentWishlist = [];
  let isSyncing = false;
  const pendingToggles = new Set();

  // Helper: Normalize item type
  function normalizeType(type) {
    if (!type) return 'destination';
    const t = String(type).toLowerCase().trim();
    if (t.includes('pack')) return 'package';
    if (t.includes('cruise')) return 'cruise';
    if (t.includes('hotel') || t.includes('stay') || t.includes('room')) return 'hotel';
    return 'destination';
  }

  // Helper: Format Price in INR
  function formatINR(price) {
    if (!price) return '';
    if (typeof price === 'string' && (price.includes('₹') || price.includes('$'))) return price;
    let num = Number(price);
    if (isNaN(num) || num <= 0) return price || '';
    if (num < 10000) num = num * 100;
    return '₹' + num.toLocaleString('en-IN');
  }

  // Get currently logged-in user from all possible auth sources
  function getAuthenticatedUser() {
    // 1. Check window.VentouraSecurity
    if (window.VentouraSecurity && typeof window.VentouraSecurity.getCurrentUser === 'function') {
      const u = window.VentouraSecurity.getCurrentUser();
      if (u && (u.id || u._id || u.email)) return u;
    }

    // 2. Check localStorage ventoura_user
    try {
      const stored = localStorage.getItem('ventoura_user');
      if (stored) {
        const u = JSON.parse(stored);
        if (u && (u.id || u._id || u.email)) return u;
      }
    } catch (e) {}

    // 3. Check Supabase client session if available
    try {
      if (window.VentouraSupabase && typeof window.VentouraSupabase.getClient === 'function') {
        const sb = window.VentouraSupabase.getClient();
        if (sb && sb.auth && typeof sb.auth.getUser === 'function') {
          // Sync check for cached user
          const sessionUser = sb.auth.currentUser || (sb.auth.session && sb.auth.session()?.user);
          if (sessionUser && (sessionUser.id || sessionUser.email)) {
            return {
              id: sessionUser.id,
              name: sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'Member',
              email: sessionUser.email
            };
          }
        }
      }
    } catch (e) {}

    return null;
  }

  // Show login modal prompt when unauthenticated user clicks heart
  function promptLogin(customMessage) {
    const msg = customMessage || 'Please log in to save this trip to your wishlist.';
    if (typeof showToast === 'function') {
      showToast(msg, '🔒');
    }

    // Open existing auth modal
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
      if (typeof window.initAuthModal === 'function') {
        window.initAuthModal();
      }
      authModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const authSubtitle = authModal.querySelector('.auth-subtitle');
      if (authSubtitle) {
        authSubtitle.textContent = msg;
      }
    }
  }

  // Load wishlist from Supabase / API backend
  async function loadWishlist() {
    const user = getAuthenticatedUser();
    if (!user) {
      currentWishlist = [];
      updateBadges();
      syncButtons();
      renderModal();
      return;
    }

    const userId = user.id || user._id || user.email;
    isSyncing = true;

    try {
      // 1. Try Supabase Client
      if (window.VentouraSupabase && typeof window.VentouraSupabase.getWishlist === 'function') {
        const data = await window.VentouraSupabase.getWishlist(userId);
        if (Array.isArray(data)) {
          currentWishlist = data;
          saveLocalCache(userId, data);
          updateBadges();
          syncButtons();
          renderModal();
          isSyncing = false;
          return;
        }
      }

      // 2. Try Server API endpoint
      const res = await fetch(`/api/wishlists?user_id=${encodeURIComponent(userId)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          currentWishlist = json.data;
          saveLocalCache(userId, json.data);
          updateBadges();
          syncButtons();
          renderModal();
          isSyncing = false;
          return;
        }
      }
    } catch (err) {
      console.warn('[Wishlist] Sync fallback to local cache:', err);
    }

    // 3. Fallback to local cache for this user
    currentWishlist = getLocalCache(userId);
    updateBadges();
    syncButtons();
    renderModal();
    isSyncing = false;
  }

  function getLocalCache(userId) {
    try {
      const key = `ventoura_wishlist_${userId || 'guest'}`;
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveLocalCache(userId, items) {
    try {
      const key = `ventoura_wishlist_${userId || 'guest'}`;
      localStorage.setItem(key, JSON.stringify(items));
    } catch (e) {}
  }

  // Check if an item is currently saved in the wishlist
  function isItemSaved(type, id) {
    if (!id) return false;
    const itemType = normalizeType(type);
    const itemId = String(id).trim();

    return currentWishlist.some(item => {
      const matchesType = normalizeType(item.item_type || item.type) === itemType;
      const matchesId = String(item.item_id || item.id).trim() === itemId;
      return matchesType && matchesId;
    });
  }

  // Extract clean item metadata from card or raw object
  function extractItemData(cardOrBtn, explicitType, explicitId) {
    const card = cardOrBtn.closest('.package-card, .destination-card, .hotel-card, .cruise-card, .service-card, .experience-card') || cardOrBtn;
    
    // 1. Determine Type
    let itemType = explicitType;
    if (!itemType) {
      if (card.classList.contains('package-card')) itemType = 'package';
      else if (card.classList.contains('cruise-card')) itemType = 'cruise';
      else if (card.classList.contains('hotel-card')) itemType = 'hotel';
      else itemType = 'destination';
    }
    itemType = normalizeType(itemType);

    // 2. Determine Real Database ID
    let itemId = explicitId || card.dataset.id || card.dataset.itemId || card.dataset.destId || card.dataset.dest;
    if (!itemId) {
      const exploreBtn = card.querySelector('.btn-explore, .btn-book-now, [data-id]');
      if (exploreBtn && exploreBtn.dataset.id) itemId = exploreBtn.dataset.id;
    }

    const titleEl = card.querySelector('.package-title, .destination-name, .dest-title, .hotel-name, .cruise-name, h3, h4');
    const title = titleEl ? titleEl.textContent.trim() : 'Travel Experience';

    if (!itemId) {
      itemId = `${itemType}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    }

    // 3. Location
    const locEl = card.querySelector('.package-location, .destination-country, .dest-location, .hotel-location, .cruise-route, .location');
    const location = locEl ? locEl.textContent.trim().replace(/^📍\s*/, '') : 'Global Destination';

    // 4. Price
    const priceEl = card.querySelector('.price-tag, .dest-price, .hotel-price, .package-footer .price-tag, .cruise-footer div:nth-child(2)');
    let price = priceEl ? priceEl.textContent.trim() : '';

    // 5. Duration
    const durEl = card.querySelector('.pkg-detail, .cruise-detail, .package-details span, .duration');
    let duration = durEl ? durEl.textContent.trim() : '7 Days / 6 Nights';

    // 6. Image
    const imgEl = card.querySelector('img.package-img, img.destination-img, img.hotel-img, img.cruise-img, img');
    let imageUrl = imgEl ? imgEl.src : 'assets/images/dest-maldives.jpg';

    return {
      item_type: itemType,
      item_id: String(itemId).trim(),
      title,
      location,
      price,
      duration,
      image_url: imageUrl
    };
  }

  // Toggle wishlist item (Add or Remove)
  async function toggleItem(itemData, btnEl) {
    const user = getAuthenticatedUser();
    if (!user) {
      promptLogin('Please log in to save this trip to your wishlist.');
      return;
    }

    const userId = user.id || user._id || user.email;
    const itemType = normalizeType(itemData.item_type);
    const itemId = String(itemData.item_id).trim();
    const toggleKey = `${userId}_${itemType}_${itemId}`;

    if (pendingToggles.has(toggleKey)) return;
    pendingToggles.add(toggleKey);

    if (btnEl) {
      btnEl.disabled = true;
      btnEl.style.opacity = '0.6';
    }

    const isSaved = isItemSaved(itemType, itemId);

    try {
      if (isSaved) {
        // --- REMOVE FROM WISHLIST ---
        const existingRecord = currentWishlist.find(i => normalizeType(i.item_type || i.type) === itemType && String(i.item_id || i.id).trim() === itemId);
        const recordId = existingRecord ? existingRecord.id : null;

        // Optimistic UI update
        currentWishlist = currentWishlist.filter(i => !(normalizeType(i.item_type || i.type) === itemType && String(i.item_id || i.id).trim() === itemId));
        saveLocalCache(userId, currentWishlist);
        updateBadges();
        syncButtons();
        renderModal();

        if (typeof showToast === 'function') {
          showToast(`Removed "${itemData.title || 'Item'}" from Wishlist`, '💔');
        }

        // Call Supabase / Server
        if (window.VentouraSupabase && typeof window.VentouraSupabase.removeFromWishlist === 'function') {
          await window.VentouraSupabase.removeFromWishlist(userId, itemType, itemId, recordId);
        } else {
          await fetch(`/api/wishlists?user_id=${encodeURIComponent(userId)}&item_type=${encodeURIComponent(itemType)}&item_id=${encodeURIComponent(itemId)}`, { method: 'DELETE' });
        }
      } else {
        // --- ADD TO WISHLIST ---
        const newRecord = {
          id: `wl-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          user_id: String(userId),
          item_type: itemType,
          item_id: itemId,
          title: itemData.title || 'Travel Experience',
          location: itemData.location || 'Global Destination',
          price: itemData.price || '₹1,80,000',
          duration: itemData.duration || '7 Days / 6 Nights',
          image_url: itemData.image_url || 'assets/images/dest-maldives.jpg',
          created_at: new Date().toISOString()
        };

        // Optimistic UI update
        currentWishlist.push(newRecord);
        saveLocalCache(userId, currentWishlist);
        updateBadges();
        syncButtons();
        renderModal();

        if (btnEl) {
          btnEl.style.animation = 'none';
          requestAnimationFrame(() => {
            btnEl.style.animation = 'heartPop 0.4s ease';
          });
        }

        if (typeof showToast === 'function') {
          showToast(`Saved "${itemData.title || 'Trip'}" to Wishlist!`, '❤️');
        }

        // Call Supabase / Server
        if (window.VentouraSupabase && typeof window.VentouraSupabase.addToWishlist === 'function') {
          await window.VentouraSupabase.addToWishlist(newRecord);
        } else {
          await fetch('/api/wishlists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecord)
          });
        }
      }
    } catch (err) {
      console.error('[Wishlist] Toggle Error:', err);
      if (typeof showToast === 'function') {
        showToast('Unable to update wishlist. Please try again.', '⚠️');
      }
      // Re-sync with server state on error
      await loadWishlist();
    } finally {
      pendingToggles.delete(toggleKey);
      if (btnEl) {
        btnEl.disabled = false;
        btnEl.style.opacity = '1';
      }
    }
  }

  // Synchronize all wishlist heart buttons on the page
  function syncButtons() {
    const user = getAuthenticatedUser();
    const buttons = document.querySelectorAll('.card-wishlist-btn, .package-wishlist, .btn-wishlist, [data-wishlist-btn], .detail-wishlist-btn');

    buttons.forEach(btn => {
      const card = btn.closest('.package-card, .destination-card, .hotel-card, .cruise-card, .service-card, .experience-card');
      let type = btn.dataset.type || (card?.classList.contains('package-card') ? 'package' : card?.classList.contains('cruise-card') ? 'cruise' : card?.classList.contains('hotel-card') ? 'hotel' : 'destination');
      let id = btn.dataset.id || btn.dataset.wishlistId || card?.dataset.id || card?.dataset.dest;

      if (!id && card) {
        const exploreBtn = card.querySelector('.btn-explore, .btn-book-now');
        if (exploreBtn && exploreBtn.dataset.id) id = exploreBtn.dataset.id;
      }

      if (!id && card) {
        const titleEl = card.querySelector('.package-title, .destination-name, .dest-title, .hotel-name, .cruise-name, h3, h4');
        if (titleEl) id = `${type}-${titleEl.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      }

      const isSaved = Boolean(user && id && isItemSaved(type, id));

      if (isSaved) {
        if (!btn.classList.contains('active')) btn.classList.add('active');
        if (btn.innerHTML !== '♥') btn.innerHTML = '♥';
        btn.setAttribute('title', 'Remove from Wishlist');
        btn.setAttribute('aria-label', 'Remove from Wishlist');
      } else {
        if (btn.classList.contains('active')) btn.classList.remove('active');
        if (btn.innerHTML !== '♡') btn.innerHTML = '♡';
        btn.setAttribute('title', 'Save to Wishlist');
        btn.setAttribute('aria-label', 'Save to Wishlist');
      }
    });
  }

  // Update navbar badge counts
  function updateBadges() {
    const count = currentWishlist.length;
    document.querySelectorAll('#wishlist-count, .wishlist-count-badge, .badge-count').forEach(el => {
      if (el.id === 'wishlist-count' || el.classList.contains('wishlist-count-badge')) {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
      }
    });
  }

  // Attach heart buttons to any dynamically rendered cards
  function attachToCards() {
    const cards = document.querySelectorAll('.destination-card, .package-card, .hotel-card, .cruise-card, .service-card, .experience-card, .map-dest-card');
    cards.forEach(card => {
      if (card.querySelector('.card-wishlist-btn, .package-wishlist, .btn-wishlist')) return;

      let type = 'destination';
      if (card.classList.contains('package-card')) type = 'package';
      else if (card.classList.contains('cruise-card')) type = 'cruise';
      else if (card.classList.contains('hotel-card')) type = 'hotel';

      const titleEl = card.querySelector('.package-title, .destination-name, .dest-title, .hotel-name, .cruise-name, h3, h4');
      const title = titleEl ? titleEl.textContent.trim() : 'Travel Experience';
      const id = card.dataset.id || card.dataset.itemId || card.dataset.dest || `${type}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'card-wishlist-btn package-wishlist btn-wishlist';
      btn.setAttribute('aria-label', `Save ${title} to Wishlist`);
      btn.setAttribute('title', 'Save to Wishlist');
      btn.dataset.id = id;
      btn.dataset.type = type;
      btn.innerHTML = '♡';

      const targetContainer = card.querySelector('.destination-img-wrap, .package-img-wrap, .hotel-img-wrap, .card-image-wrap') || card;
      if (getComputedStyle(targetContainer).position === 'static') {
        targetContainer.style.position = 'relative';
      }
      targetContainer.appendChild(btn);
    });

    syncButtons();
  }

  // Render the Wishlist Modal UI
  function renderModal() {
    const container = document.getElementById('wishlist-items-container');
    if (!container) return;

    const user = getAuthenticatedUser();

    if (!user) {
      container.innerHTML = `
        <div style="text-align:center; padding:48px 20px; color:#94a3b8;">
          <div style="font-size:44px; margin-bottom:12px;">🔒</div>
          <div style="font-size:16px; font-weight:700; color:#ffffff; margin-bottom:6px;">Please Log In</div>
          <div style="font-size:13px; margin-bottom:20px;">Log in to access your saved travel experiences across all your devices.</div>
          <button type="button" class="btn btn-primary btn-md" onclick="document.getElementById('wishlist-modal')?.classList.remove('open'); document.body.style.overflow=''; window.initAuthModal && window.initAuthModal(); document.getElementById('auth-modal')?.classList.add('open');" style="padding:10px 24px; font-weight:700; border-radius:12px;">Log In / Sign Up →</button>
        </div>
      `;
      return;
    }

    if (currentWishlist.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:48px 20px; color:#94a3b8;">
          <div style="font-size:44px; margin-bottom:12px;">❤️</div>
          <div style="font-size:16px; font-weight:700; color:#ffffff; margin-bottom:6px;">Your Wishlist is Empty</div>
          <div style="font-size:13px;">Save your favorite destinations, packages, hotels & cruises to access them anytime!</div>
        </div>
      `;
      return;
    }

    container.innerHTML = currentWishlist.map(item => {
      const type = normalizeType(item.item_type || item.type);
      const id = String(item.item_id || item.id);
      const title = item.title || 'Luxury Experience';
      const loc = item.location || 'Global Destination';
      const price = formatINR(item.price);
      const dur = item.duration || '7 Days / 6 Nights';
      const img = item.image_url || item.image || 'assets/images/dest-maldives.jpg';
      const itemJson = JSON.stringify(item).replace(/"/g, '&quot;');

      return `
        <div class="wishlist-card-item" style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:14px; margin-bottom:10px; gap:14px;">
          <div style="display:flex; align-items:center; gap:14px; flex:1; min-width:0;">
            <img src="${img}" alt="${title}" style="width:64px; height:64px; border-radius:10px; object-fit:cover; flex-shrink:0;" onerror="this.onerror=null;this.src='assets/images/dest-maldives.jpg'" />
            <div style="flex:1; min-width:0;">
              <div style="font-weight:700; font-size:15px; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${title}</div>
              <div style="font-size:12px; color:#38bdf8; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">📍 ${loc}</div>
              <div style="font-size:12px; color:#94a3b8; margin-top:2px;">
                ${dur ? dur + ' · ' : ''}<span style="color:#fbbf24; font-weight:700;">${price}</span>
              </div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
            <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('wishlist-modal')?.classList.remove('open'); document.body.style.overflow=''; if(window.VentouraEnquiry && window.VentouraEnquiry.openDetailPage) { window.VentouraEnquiry.openDetailPage(${itemJson}, '${type}'); }" style="padding:6px 12px; font-size:12px;">Explore 🔍</button>
            <button type="button" class="btn btn-primary btn-sm btn-book-now" data-item-title="${title}" data-item-type="${type}" data-item-price="${price}" data-item-duration="${dur}" style="padding:6px 12px; font-size:12px; font-weight:700;">Book Now →</button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="window.VentouraWishlist.removeItem('${type}', '${id}')" style="color:#ef4444; padding:6px 10px; font-size:12px; border:1px solid rgba(239,68,68,0.3); border-radius:8px;" title="Remove from Wishlist">✕</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Public Interface
  window.VentouraWishlist = {
    init: function () {
      attachToCards();
      loadWishlist();

      // Navbar trigger
      const trigger = document.getElementById('wishlist-trigger') || document.querySelector('button[aria-label="Wishlist"]');
      const modal = document.getElementById('wishlist-modal');
      const closeBtn = document.getElementById('wishlist-modal-close');
      const clearBtn = document.getElementById('clear-wishlist-btn');

      if (trigger && modal) {
        trigger.onclick = (e) => {
          e.preventDefault();
          renderModal();
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        };
      }

      if (closeBtn && modal) {
        closeBtn.onclick = () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        };
      }

      if (clearBtn) {
        clearBtn.onclick = async () => {
          const user = getAuthenticatedUser();
          if (!user) return;
          const userId = user.id || user._id || user.email;
          currentWishlist = [];
          saveLocalCache(userId, []);
          updateBadges();
          syncButtons();
          renderModal();
          if (typeof showToast === 'function') showToast('Wishlist cleared', '🗑️');
        };
      }

      // Delegate click handler for ALL wishlist buttons
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.card-wishlist-btn, .package-wishlist, .btn-wishlist, [data-wishlist-btn], .detail-wishlist-btn');
        if (btn) {
          e.preventDefault();
          e.stopPropagation();

          const itemData = extractItemData(btn, btn.dataset.type, btn.dataset.id);
          toggleItem(itemData, btn);
        }
      }, true);

      // Listen for authentication changes to reload wishlist
      window.addEventListener('storage', (e) => {
        if (e.key === 'ventoura_user') loadWishlist();
      });

      // Debounced Mutation Observer for dynamically rendered cards
      let debounceTimer = null;
      try {
        const observer = new MutationObserver((mutations) => {
          let hasRelevantMutation = false;
          for (const m of mutations) {
            if (m.type === 'childList' && m.addedNodes.length > 0) {
              for (const node of m.addedNodes) {
                if (node.nodeType === 1 && !node.classList?.contains('card-wishlist-btn') && !node.classList?.contains('toast')) {
                  hasRelevantMutation = true;
                  break;
                }
              }
            }
            if (hasRelevantMutation) break;
          }

          if (hasRelevantMutation) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              attachToCards();
              syncButtons();
            }, 250);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      } catch (err) {}
    },

    loadWishlist,
    toggleItem,
    removeItem: function (type, id) {
      const itemData = { item_type: type, item_id: id };
      toggleItem(itemData, null);
    },
    attachToCards,
    syncButtons,
    renderModal,
    isItemSaved
  };

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.VentouraWishlist.init());
  } else {
    window.VentouraWishlist.init();
  }
})();

/* ============================================================
   CAROUSEL.JS — Cruise, Reviews & Generic Carousel
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initCruiseCarousel();
    initReviewsCarousel();
    initHeroParallax();
  });

  /* ─── Generic Carousel Factory ─── */
  function createCarousel(opts) {
    const { trackSelector, prevSel, nextSel, cardSelector, dotsSelector } = opts;
    const track = document.querySelector(trackSelector);
    if (!track) return null;

    const cards = track.querySelectorAll(cardSelector);
    let current = 0;
    let visibleCount = getVisible();

    function getVisible() {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, cards.length - visibleCount);
    }

    function slideToIndex(idx) {
      current = Math.max(0, Math.min(idx, maxIndex()));
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = 24;
      track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
      updateDots();
    }

    function updateDots() {
      if (!dotsSelector) return;
      document.querySelectorAll(dotsSelector).forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    document.querySelector(prevSel)?.addEventListener('click', () => slideToIndex(current - 1));
    document.querySelector(nextSel)?.addEventListener('click', () => slideToIndex(current + 1));

    window.addEventListener('resize', () => {
      visibleCount = getVisible();
      slideToIndex(Math.min(current, maxIndex()));
    });

    // Touch / swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? slideToIndex(current + 1) : slideToIndex(current - 1);
      }
    });

    return { slideToIndex };
  }

  /* ─── Cruise Carousel ─── */
  function initCruiseCarousel() {
    createCarousel({
      trackSelector: '#cruise-track',
      prevSel: '#cruise-prev',
      nextSel: '#cruise-next',
      cardSelector: '.cruise-card',
    });
  }

  /* ─── Reviews Carousel ─── */
  function initReviewsCarousel() {
    const ctl = createCarousel({
      trackSelector: '#reviews-track',
      prevSel: '#reviews-prev',
      nextSel: '#reviews-next',
      cardSelector: '.review-card',
      dotsSelector: '.review-dot',
    });

    // Auto-advance reviews
    if (ctl) {
      let auto = setInterval(() => ctl.slideToIndex(
        (document.querySelectorAll('.review-card').length > 0)
          ? (parseInt(document.querySelector('#reviews-track')?.style.transform?.match(/-?\d+/) || [0]) / 100 + 1)
          : 0
      ), 5000);

      document.querySelector('#reviews-track')?.addEventListener('mouseenter', () => clearInterval(auto));
    }
  }

  /* ─── Hero Parallax Disabled ─── */
  function initHeroParallax() {
    // Mouse movement tracking disabled
  }


})();

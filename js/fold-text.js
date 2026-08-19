/**
 * FoldText — 3D Origami Folding Section Heading Animation Engine
 * Applies character-by-character 3D top-hinge folding with perspective and crease shading.
 */
(function() {
  'use strict';

  const CONFIG = {
    duration: 0.65,
    stagger: 0.045,
    perspective: 700,
    creaseShading: 0.55,
    ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    threshold: 0.1
  };

  function applyFoldTextToHeading(heading) {
    if (!heading || heading.dataset.foldtextApplied === 'true') return;
    heading.dataset.foldtextApplied = 'true';

    // Store original text for accessibility
    const rawText = heading.textContent.trim();
    if (!rawText) return;
    heading.setAttribute('aria-label', rawText);

    // Save and clone child nodes to process nested spans and text nodes
    const childNodes = Array.from(heading.childNodes);
    heading.innerHTML = '';
    heading.style.perspective = CONFIG.perspective + 'px';
    heading.classList.add('foldtext-heading');

    let globalCharIndex = 0;
    const allCharSpans = [];
    const allCreaseSpans = [];

    function processNode(node, container) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        // Split text preserving words and spaces
        const parts = text.split(/(\s+)/);
        
        parts.forEach(part => {
          if (!part) return;
          
          if (/^\s+$/.test(part)) {
            // Space node
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'fold-space';
            spaceSpan.style.display = 'inline-block';
            spaceSpan.style.width = '0.28em';
            spaceSpan.innerHTML = '&nbsp;';
            container.appendChild(spaceSpan);
          } else {
            // Word node
            const wordSpan = document.createElement('span');
            wordSpan.className = 'fold-word';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            for (let i = 0; i < part.length; i++) {
              const char = part[i];
              const charSpan = document.createElement('span');
              charSpan.className = 'fold-char';
              charSpan.textContent = char;
              charSpan.style.display = 'inline-block';
              charSpan.style.position = 'relative';
              charSpan.style.transformOrigin = '50% 0%';
              charSpan.style.transform = `perspective(${CONFIG.perspective}px) rotateX(-90deg)`;
              charSpan.style.opacity = '0';
              charSpan.style.transformStyle = 'preserve-3d';
              charSpan.style.backfaceVisibility = 'hidden';
              charSpan.style.willChange = 'transform, opacity';
              charSpan.style.transition = `transform ${CONFIG.duration}s ${CONFIG.ease}, opacity ${CONFIG.duration}s ${CONFIG.ease}`;

              // Crease shading overlay
              if (CONFIG.creaseShading > 0) {
                const crease = document.createElement('span');
                crease.className = 'fold-crease';
                crease.style.position = 'absolute';
                crease.style.inset = '0';
                crease.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.05))';
                crease.style.opacity = String(CONFIG.creaseShading);
                crease.style.borderRadius = '2px';
                crease.style.pointerEvents = 'none';
                crease.style.transition = `opacity ${CONFIG.duration}s ${CONFIG.ease}`;
                charSpan.appendChild(crease);
                allCreaseSpans.push(crease);
              }

              wordSpan.appendChild(charSpan);
              allCharSpans.push({ span: charSpan, index: globalCharIndex });
              globalCharIndex++;
            }
            container.appendChild(wordSpan);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const clonedEl = node.cloneNode(false); // shallow clone with exact styles & classes
        Array.from(node.childNodes).forEach(child => processNode(child, clonedEl));
        container.appendChild(clonedEl);
      }
    }

    childNodes.forEach(node => processNode(node, heading));

    // Immediately animate headings that are already in the viewport on load
    const rect = heading.getBoundingClientRect();
    const isInViewport = rect.top < (window.innerHeight || document.documentElement.clientHeight) + 60;

    if (isInViewport) {
      allCharSpans.forEach(({ span, index }) => {
        const delay = index * (CONFIG.stagger * 0.6);
        span.style.transitionDelay = `${delay}s`;
        span.style.transform = `perspective(${CONFIG.perspective}px) rotateX(0deg)`;
        span.style.opacity = '1';
      });

      allCreaseSpans.forEach((crease, index) => {
        const delay = index * (CONFIG.stagger * 0.6);
        crease.style.transitionDelay = `${delay}s`;
        crease.style.opacity = '0';
      });
    } else {
      // IntersectionObserver for headings below the fold
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            obs.unobserve(entry.target);
            
            allCharSpans.forEach(({ span, index }) => {
              const delay = index * CONFIG.stagger;
              span.style.transitionDelay = `${delay}s`;
              span.style.transform = `perspective(${CONFIG.perspective}px) rotateX(0deg)`;
              span.style.opacity = '1';
            });

            allCreaseSpans.forEach((crease, index) => {
              const delay = index * CONFIG.stagger;
              crease.style.transitionDelay = `${delay}s`;
              crease.style.opacity = '0';
            });
          }
        });
      }, {
        threshold: CONFIG.threshold,
        rootMargin: '0px 0px 80px 0px'
      });

      observer.observe(heading);
    }
  }

  function initAllSectionHeadings() {
    // Select all major section headings across the entire website
    const selectors = [
      '.section-title',
      '.section-header h2',
      '#destinations .section-title',
      '#packages .section-title',
      '#hotels .section-title',
      '#cruises .section-title',
      '#reviews .section-title',
      '#travel-videos .section-title',
      '#blog .section-title',
      '#faq .section-title',
      '#contact .section-title',
      '#why-us .section-title',
      '.why-section .section-title',
      '#gallery .section-title',
      '[data-foldtext="true"]'
    ];

    const headings = document.querySelectorAll(selectors.join(', '));
    headings.forEach(applyFoldTextToHeading);
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllSectionHeadings);
  } else {
    initAllSectionHeadings();
  }

  // Also expose globally for dynamically loaded sections or tab changes
  window.initFoldTextOnHeadings = initAllSectionHeadings;
  window.applyFoldTextToHeading = applyFoldTextToHeading;
})();

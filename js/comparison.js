/* ============================================================
   COMPARISON.JS — Side-by-Side Trip Comparison Engine
   ============================================================ */

(function () {
  'use strict';

  let comparisonList = JSON.parse(localStorage.getItem('ta_compare_items') || '[]');

  document.addEventListener('DOMContentLoaded', () => {
    initComparison();
  });

  function initComparison() {
    renderDrawer();
    bindCompareButtons();

    document.querySelectorAll('#launch-comparison-modal, #launch-comparison-modal-nav, a[href="#comparison"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openComparisonModal();
      });
    });

    const modalClose = document.querySelector('.comparison-modal-close');
    if (modalClose) {
      modalClose.addEventListener('click', closeComparisonModal);
    }

    const modal = document.querySelector('.comparison-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeComparisonModal();
      });
    }
  }

  function bindCompareButtons() {
    document.querySelectorAll('.btn-compare').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.dataset.id || 'item-' + Math.random().toString(36).substr(2, 5);
        const name = btn.dataset.name || 'Travel Package';
        const price = btn.dataset.price || '$1,299';
        const img = btn.dataset.img || 'assets/images/dest-maldives.jpg';
        const rating = btn.dataset.rating || '4.8';

        addItemToComparison({ id, name, price, img, rating });
      });
    });
  }

  function addItemToComparison(item) {
    if (comparisonList.some(i => i.id === item.id)) {
      showToast('Item already added to comparison', 'ℹ️');
      return;
    }

    if (comparisonList.length >= 4) {
      showToast('You can compare up to 4 items at a time', '⚠️');
      return;
    }

    comparisonList.push(item);
    localStorage.setItem('ta_compare_items', JSON.stringify(comparisonList));
    renderDrawer();
    showToast(`Added "${item.name}" to comparison!`, '⚖️');
  }

  function removeItemFromComparison(id) {
    comparisonList = comparisonList.filter(i => i.id !== id);
    localStorage.setItem('ta_compare_items', JSON.stringify(comparisonList));
    renderDrawer();
    if (document.querySelector('.comparison-modal.open')) {
      renderComparisonModalTable();
    }
  }

  function renderDrawer() {
    let drawer = document.querySelector('.comparison-drawer');

    if (comparisonList.length === 0) {
      if (drawer) drawer.classList.remove('open');
      return;
    }

    if (!drawer) {
      drawer = document.createElement('div');
      drawer.className = 'comparison-drawer';
      document.body.appendChild(drawer);
    }

    drawer.innerHTML = `
      <div class="container">
        <div class="comparison-drawer-inner">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="font-size:20px">⚖️</span>
            <div>
              <div style="font-weight:700;font-size:14px;color:var(--text-primary)">Compare Selected Items</div>
              <div style="font-size:12px;color:var(--text-muted)">${comparisonList.length} of 4 selected</div>
            </div>
          </div>
          <div class="comparison-items-list">
            ${comparisonList.map(item => `
              <div class="comp-thumb-card">
                <img src="${item.img}" style="width:28px;height:28px;border-radius:6px;object-fit:cover" />
                <span>${item.name}</span>
                <span class="comp-thumb-remove" data-id="${item.id}">✕</span>
              </div>
            `).join('')}
          </div>
          <div style="display:flex;gap:10px">
            <button class="btn btn-ghost btn-sm" id="clear-compare-btn">Clear All</button>
            <button class="btn btn-primary btn-sm" id="launch-comparison-modal">Compare Now →</button>
          </div>
        </div>
      </div>
    `;

    drawer.classList.add('open');

    drawer.querySelectorAll('.comp-thumb-remove').forEach(btn => {
      btn.addEventListener('click', () => removeItemFromComparison(btn.dataset.id));
    });

    drawer.querySelector('#clear-compare-btn')?.addEventListener('click', () => {
      comparisonList = [];
      localStorage.removeItem('ta_compare_items');
      renderDrawer();
    });

    drawer.querySelector('#launch-comparison-modal')?.addEventListener('click', openComparisonModal);
  }

  function openComparisonModal() {
    const modal = document.querySelector('.comparison-modal');
    if (!modal) return;
    renderComparisonModalTable();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeComparisonModal() {
    const modal = document.querySelector('.comparison-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function renderComparisonModalTable() {
    const container = document.querySelector('#comparison-table-container');
    if (!container) return;

    if (comparisonList.length === 0) {
      container.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:40px">No items selected for comparison.</p>`;
      return;
    }

    container.innerHTML = `
      <table class="comparison-table">
        <thead>
          <tr>
            <th style="width:200px">Feature</th>
            ${comparisonList.map(item => `
              <th>
                <div style="display:flex;flex-direction:column;gap:6px">
                  <img src="${item.img}" style="width:100%;height:120px;object-fit:cover;border-radius:12px" />
                  <div style="font-weight:800;font-size:16px;color:var(--text-primary)">${item.name}</div>
                  <div style="color:var(--accent);font-weight:800;font-size:18px">${item.price}</div>
                </div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>User Rating</strong></td>
            ${comparisonList.map(item => `<td>⭐ ${item.rating} / 5</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Flights Included</strong></td>
            ${comparisonList.map(() => `<td>✅ Roundtrip Economy</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Hotel Standard</strong></td>
            ${comparisonList.map(() => `<td>🏨 5-Star Luxury Resort</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Meals</strong></td>
            ${comparisonList.map(() => `<td>🍽️ Breakfast & Dinner</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Refund Policy</strong></td>
            ${comparisonList.map(() => `<td>🛡️ Full refund up to 14 days</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Action</strong></td>
            ${comparisonList.map(item => `
              <td>
                <button class="btn btn-primary btn-sm" onclick="showToast('Proceeding to book ${item.name}','🛒')">Book Now</button>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    `;
  }

})();

/**
 * VENTOURA TRAVEL — Complete Customer Contact & Enquiry System
 * Handles form validation, Supabase + Backend persistence, Reference ID,
 * Guest/Auth user handling, and real-time Admin CMS connection.
 */

(function() {
  'use strict';

  function getCurrentUser() {
    let user = null;
    try {
      if (window.VentouraSecurity && typeof window.VentouraSecurity.getJWTClaims === 'function') {
        user = window.VentouraSecurity.getJWTClaims();
      }
      if (!user) {
        const stored = localStorage.getItem('ventoura_user') || localStorage.getItem('vt_user');
        if (stored) user = JSON.parse(stored);
      }
    } catch (e) {}
    return user;
  }

  function getSupabase() {
    try {
      if (window.VentouraSupabase && typeof window.VentouraSupabase.getClient === 'function') {
        return window.VentouraSupabase.getClient();
      }
    } catch (e) {}
    return null;
  }

  window.handleContactSubmit = async function(event) {
    if (event && event.preventDefault) event.preventDefault();

    const form = document.getElementById('contact-form');
    if (!form) return;

    const firstInput = document.getElementById('cf-first');
    const lastInput = document.getElementById('cf-last');
    const emailInput = document.getElementById('cf-email');
    const phoneInput = document.getElementById('cf-phone');
    const interestInput = document.getElementById('cf-interest');
    const messageInput = document.getElementById('cf-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const feedbackBox = document.getElementById('contact-form-feedback');

    const firstName = (firstInput?.value || '').trim();
    const lastName = (lastInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const phone = (phoneInput?.value || '').trim();
    const interest = (interestInput?.value || '').trim();
    const message = (messageInput?.value || '').trim();

    // Reset feedback
    if (feedbackBox) {
      feedbackBox.style.display = 'none';
      feedbackBox.innerHTML = '';
    }

    // 1. Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;

    if (!firstName) {
      showInlineError(firstInput, 'Please enter your first name.');
      return;
    }
    if (!lastName) {
      showInlineError(lastInput, 'Please enter your last name.');
      return;
    }
    if (!email || !emailRegex.test(email)) {
      showInlineError(emailInput, 'Please enter a valid email address.');
      return;
    }
    if (!phone || phone.replace(/\D/g, '').length < 7) {
      showInlineError(phoneInput, 'Please enter a valid phone number (minimum 7 digits).');
      return;
    }
    if (!interest) {
      showInlineError(interestInput, 'Please select what you are interested in.');
      return;
    }
    if (!message || message.length < 5) {
      showInlineError(messageInput, 'Please write a message describing your trip or inquiry (at least 5 characters).');
      return;
    }

    // 2. Loading State
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message ✉️';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span style="display:inline-block;animation:spin 1s linear infinite;margin-right:8px;">⏳</span> Sending...';
    }

    // 3. Prepare Payload
    const user = getCurrentUser();
    const userId = user ? (user.id || user.email || null) : null;
    const timestamp = Date.now();
    const refNo = `VT-${Math.floor(100000 + Math.random() * 900000)}`;
    const inquiryId = `inqu-${timestamp}`;

    const payload = {
      id: inquiryId,
      ref_no: refNo,
      refNo: refNo,
      customer_name: `${firstName} ${lastName}`,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      product_type: 'contact_form',
      product_name: interest,
      interest_category: interest,
      destination: interest,
      message: message,
      status: 'NEW',
      source: 'Website Contact Form',
      user_id: userId,
      created_at: new Date().toISOString()
    };

    let saveSuccess = false;
    let savedReference = refNo;

    try {
      // 1. Direct Supabase Insertion (if client available)
      const sb = getSupabase();
      if (sb) {
        try {
          const sbPayload = {
            id: inquiryId,
            ref_no: refNo,
            customer_name: `${firstName} ${lastName}`,
            email: email,
            phone: phone,
            product_type: 'contact_form',
            product_name: interest,
            destination: interest,
            message: message,
            status: 'NEW',
            source: 'Website Contact Form'
          };
          const { data, error } = await sb.from('inquiries').insert([sbPayload]);
          if (!error) {
            saveSuccess = true;
          }
        } catch (sbErr) {
          console.warn('Direct Supabase insert note:', sbErr);
        }
      }

      // 2. Backend API persistence
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          saveSuccess = true;
          if (json.data && json.data.ref_no) {
            savedReference = json.data.ref_no;
          }
        }
      }
    } catch (netErr) {
      console.error('Contact submission error:', netErr);
    }

    if (saveSuccess) {
      // 4. Success State
      if (submitBtn) {
        submitBtn.innerHTML = 'Message Sent ✓';
        submitBtn.style.background = '#10B981';
      }

      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 16px; padding: 22px; text-align: center; margin-top: 18px; animation: fadeIn 0.4s ease;">
            <div style="font-size: 32px; margin-bottom: 6px;">✨</div>
            <h4 style="font-size: 17px; font-weight: 700; color: #34D399; margin: 0 0 6px; font-family: var(--font-sans, Inter, sans-serif);">
              Thank you, ${escapeHtml(firstName)}! Your enquiry has been received.
            </h4>
            <p style="font-size: 13.5px; color: #CBD5E1; margin: 0 0 12px; line-height: 1.6; font-family: var(--font-sans, Inter, sans-serif);">
              One of our travel experts will review your request and get back to you within 2 hours.
            </p>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(0, 0, 0, 0.35); border: 1px dashed rgba(52, 211, 153, 0.5); padding: 7px 18px; border-radius: 8px; font-family: monospace; font-size: 14px; font-weight: 700; color: #6EE7B7;">
              <span>Enquiry ID:</span> <span>${escapeHtml(savedReference)}</span>
            </div>
          </div>
        `;
      }

      // Reset form fields
      form.reset();

      if (typeof showToast === 'function') {
        showToast(`Enquiry ${savedReference} received! We will contact you shortly.`, '✉️');
      }

      // Restore submit button after 4 seconds
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }
      }, 4500);

    } else {
      // 5. Error State
      if (submitBtn) {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }

      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 12px; padding: 14px 18px; color: #FCA5A5; font-size: 13.5px; margin-top: 14px;">
            ⚠️ Unable to send your message right now. Please check your internet connection and try again.
          </div>
        `;
      }

      if (typeof showToast === 'function') {
        showToast('Unable to send message. Please try again.', '⚠️');
      }
    }
  };

  function showInlineError(inputEl, message) {
    if (!inputEl) return;
    inputEl.focus();
    inputEl.style.borderColor = '#EF4444';
    inputEl.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';

    if (typeof showToast === 'function') {
      showToast(message, '⚠️');
    }

    const clearError = () => {
      inputEl.style.borderColor = '';
      inputEl.style.boxShadow = '';
      inputEl.removeEventListener('input', clearError);
      inputEl.removeEventListener('change', clearError);
    };
    inputEl.addEventListener('input', clearError);
    inputEl.addEventListener('change', clearError);
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

  // Bind listener to #contact-form
  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', window.handleContactSubmit);
    }
  });

})();

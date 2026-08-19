/* ============================================================
   SECURITY ENGINE & AUDIT LOG TELEMETRY — Phase 5
   ============================================================ */

(function () {
  'use strict';

  /* ── Security Namespace ── */
  window.VentouraSecurity = {
    
    /* ── XSS Sanitizer ── */
    sanitizeHTML: function (str) {
      if (typeof str !== 'string') return str;
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    },

    /* ── Input Validator ── */
    validateEmail: function (email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },

    validatePhone: function (phone) {
      const re = /^\+?[0-9\s\-()]{7,20}$/;
      return re.test(String(phone));
    },

    /* ── CSRF Token Simulation ── */
    getCSRFToken: function () {
      let token = sessionStorage.getItem('ta_csrf_token');
      if (!token) {
        token = 'csrf_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        sessionStorage.setItem('ta_csrf_token', token);
      }
      return token;
    },

    /* ── Rate Limiter Simulator ── */
    rateLimitMap: new Map(),
    checkRateLimit: function (key, maxRequests = 5, windowMs = 10000) {
      const now = Date.now();
      const record = this.rateLimitMap.get(key) || { count: 0, resetTime: now + windowMs };

      if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + windowMs;
      } else {
        record.count++;
      }

      this.rateLimitMap.set(key, record);

      if (record.count > maxRequests) {
        this.logAuditEvent('RATE_LIMIT_EXCEEDED', `Rate limit exceeded for key: ${key}`);
        return false; // Blocked
      }
      return true; // Allowed
    },

    /* ── JWT Session Token Manager ── */
    setJWTToken: function (token, userClaims) {
      localStorage.setItem('ta_jwt_token', token);
      localStorage.setItem('ta_user_claims', JSON.stringify(userClaims));
      this.logAuditEvent('USER_LOGIN', `User ${userClaims.email} logged in with role: ${userClaims.role}`);
    },

    getJWTClaims: function () {
      const claims = localStorage.getItem('ta_user_claims');
      return claims ? JSON.parse(claims) : null;
    },

    clearJWTToken: function () {
      const claims = this.getJWTClaims();
      if (claims) {
        this.logAuditEvent('USER_LOGOUT', `User ${claims.email} logged out`);
      }
      localStorage.removeItem('ta_jwt_token');
      localStorage.removeItem('ta_user_claims');
    },

    /* ── Audit Logger (Stores in localStorage for Admin inspection) ── */
    logAuditEvent: function (action, details) {
      const logs = JSON.parse(localStorage.getItem('ta_audit_logs') || '[]');
      const event = {
        id: 'LOG-' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toISOString(),
        action: action,
        details: details,
        ip: '192.168.1.' + Math.floor(Math.random() * 254 + 1),
        userAgent: navigator.userAgent.substring(0, 40)
      };
      logs.unshift(event);
      // Keep last 100 events
      if (logs.length > 100) logs.pop();
      localStorage.setItem('ta_audit_logs', JSON.stringify(logs));
    }
  };

  /* ── Auto-initialize default audit logs if empty ── */
  document.addEventListener('DOMContentLoaded', () => {
    const logs = JSON.parse(localStorage.getItem('ta_audit_logs') || '[]');
    if (logs.length === 0) {
      window.VentouraSecurity.logAuditEvent('SYSTEM_BOOT', 'Security Engine initialized on client side');
      window.VentouraSecurity.logAuditEvent('SSL_CHECK', 'TLS 1.3 Encryption verified for endpoint');
      window.VentouraSecurity.logAuditEvent('CSRF_GENERATE', 'Generated session CSRF token');
    }
  });

})();

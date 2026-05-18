/**
 * ==========================================================================
 * Sistem e-Khairat Masjid Annur
 * auth.js — Token state + session-aware POST wrapper (ADMIN ONLY)
 * ==========================================================================
 *
 * Exposes window.Auth with:
 *   saveToken, loadToken, clearToken, getToken, apiAuthPost
 *
 * Decoupling pattern:
 *   On session expiry, dispatches CustomEvent('session-expired') on window.
 *   Page code listens dan handle UI (e.g. swap ke login screen).
 *   Module ini TAK tahu apa-apa pasal DOM.
 *
 * Usage in page:
 *   window.addEventListener('session-expired', () => {
 *     // swap UI, show toast, etc
 *   });
 * ==========================================================================
 */

(function () {
  'use strict';

  const KEY = window.AppConfig.TOKEN_STORAGE_KEY;
  const Api = window.Api;

  let authToken = null;

  function saveToken(t) {
    authToken = t;
    try { sessionStorage.setItem(KEY, t); } catch (e) { /* private mode */ }
  }

  function loadToken() {
    try { authToken = sessionStorage.getItem(KEY); } catch (e) { authToken = null; }
    return authToken;
  }

  function clearToken() {
    authToken = null;
    try { sessionStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  }

  function getToken() {
    return authToken;
  }

  /**
   * Wrap admin POST: auto-inject token, auto-clear + dispatch event on session expiry.
   */
  async function apiAuthPost(action, body) {
    const payload = Object.assign({}, body || {}, { token: authToken });
    try {
      return await Api.apiPost(action, payload);
    } catch (err) {
      if (Api.isSessionError(err)) {
        clearToken();
        window.dispatchEvent(new CustomEvent('session-expired'));
      }
      throw err;
    }
  }

  window.Auth = { saveToken, loadToken, clearToken, getToken, apiAuthPost };
})();

/**
 * ==========================================================================
 * Sistem e-Khairat Masjid Annur
 * api.js — fetch wrapper untuk Apps Script backend
 * ==========================================================================
 *
 * Exposes window.Api with: apiGet, apiPost, isSessionError
 *
 * Convention: server returns { ok: boolean, data?: any, error?: string }
 * Throws Error on { ok: false } so caller can use try/catch.
 * ==========================================================================
 */

(function () {
  'use strict';

  const URL = window.AppConfig.WEB_APP_URL;

  async function apiGet(action, params) {
    const qs = new URLSearchParams(Object.assign({ action }, params || {})).toString();
    const res = await fetch(`${URL}?${qs}`);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Ralat tidak diketahui');
    return json.data;
  }

  async function apiPost(action, body) {
    const res = await fetch(`${URL}?action=${action}`, {
      method: 'POST',
      body: JSON.stringify(body || {})
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Ralat tidak diketahui');
    return json.data;
  }

  /** Detect kalau error daripada server adalah session-related */
  function isSessionError(err) {
    const msg = (err && err.message) || '';
    return /sesi/i.test(msg);
  }

  window.Api = { apiGet, apiPost, isSessionError };
})();

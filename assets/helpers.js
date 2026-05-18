/**
 * ==========================================================================
 * Sistem e-Khairat Masjid Annur
 * helpers.js — Pure utility functions
 * ==========================================================================
 *
 * Exposes window.Helpers with:
 *   escapeHtml, applyICMask, applyTelMask,
 *   attachUpper, attachIC, attachTel,
 *   debounce, applyConfigToDom
 * ==========================================================================
 */

(function () {
  'use strict';

  /** HTML-escape supaya selamat masuk innerHTML */
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /** Format IC: "010203045678" → "010203-04-5678" */
  function applyICMask(el) {
    let v = el.value.replace(/\D/g, '');
    if (v.length > 6) v = v.slice(0, 6) + '-' + v.slice(6);
    if (v.length > 9) v = v.slice(0, 9) + '-' + v.slice(9);
    el.value = v.slice(0, 14);
  }

  /** Format Malaysia phone: "0123456789" → "012 345 6789" */
  function applyTelMask(el) {
    const d = el.value.replace(/\D/g, '').slice(0, 11);
    let f = d;
    if (d.length > 10) {
      f = d.slice(0, 3);
      if (d.length > 3) f += ' ' + d.slice(3, 7);
      if (d.length > 7) f += ' ' + d.slice(7);
    } else if (d.length > 6) {
      f = d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6);
    } else if (d.length > 3) {
      f = d.slice(0, 3) + ' ' + d.slice(3);
    }
    el.value = f;
  }

  /** Attach input handler: auto-uppercase */
  function attachUpper(el) {
    if (el) el.addEventListener('input', e => e.target.value = e.target.value.toUpperCase());
  }

  /** Attach input handler: IC auto-format */
  function attachIC(el) {
    if (el) el.addEventListener('input', e => applyICMask(e.target));
  }

  /** Attach input handler: telephone auto-format */
  function attachTel(el) {
    if (el) el.addEventListener('input', e => applyTelMask(e.target));
  }

  /** Debounce: delay function execution until ms passed since last call */
  function debounce(fn, ms) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  /**
   * Apply window.AppConfig values to DOM via data attributes.
   *
   *   <span data-cfg-text="MASJID_NAME">Default fallback</span>
   *   <img  data-cfg-src="LOGO_URL" src="default.png">
   *   <a    data-cfg-href="WEB_APP_URL" href="#">link</a>
   *
   * Call once on DOMContentLoaded.
   */
  function applyConfigToDom() {
    const cfg = window.AppConfig || {};
    document.querySelectorAll('[data-cfg-text]').forEach(el => {
      const v = cfg[el.dataset.cfgText];
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll('[data-cfg-src]').forEach(el => {
      const v = cfg[el.dataset.cfgSrc];
      if (v !== undefined) el.src = v;
    });
    document.querySelectorAll('[data-cfg-href]').forEach(el => {
      const v = cfg[el.dataset.cfgHref];
      if (v !== undefined) el.href = v;
    });
  }

  window.Helpers = {
    escapeHtml,
    applyICMask,
    applyTelMask,
    attachUpper,
    attachIC,
    attachTel,
    debounce,
    applyConfigToDom
  };
})();

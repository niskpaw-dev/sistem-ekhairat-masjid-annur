/**
 * ==========================================================================
 * Sistem e-Khairat Masjid Annur
 * config.js — Single source of truth untuk semua hardcoded values
 * ==========================================================================
 *
 * Untuk ubah masjid name, logo, atau WhatsApp number — edit di sini SAHAJA.
 * Value akan auto-propagate ke HTML melalui data-cfg-text / data-cfg-src
 * attributes (applied by Helpers.applyConfigToDom()).
 * ==========================================================================
 */

window.AppConfig = Object.freeze({
  // Backend endpoint
  WEB_APP_URL: "https://script.google.com/macros/s/AKfycbx206kzi8vYAiIpNXtSGEoF1kZJA7amxYGpGg6l9deX7bPiVruT2TgMSdow0jOGpXta/exec",

  // Contact
  WHATSAPP_NO: "60126801752",
  WHATSAPP_GREETING: "Assalamualaikum%20Admin%20Khairat.",

  // Branding (auto-inject ke HTML via data-cfg-* attributes)
  MASJID_NAME:  "Masjid Annur Kanchong Tengah",
  MASJID_SHORT: "Masjid Annur",
  LOGO_URL:     "https://arleta.site/interactivelink/1610/Logo²-Masjid_20260429_070641_0000.png",

  // Behaviour tuning
  SEARCH_DEBOUNCE_MS:        200,
  TOKEN_STORAGE_KEY:         "khairat_admin_token",
  REGISTRATION_TOTAL_STEPS:  4
});

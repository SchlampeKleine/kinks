import { createI18n } from 'vue-i18n';

const languages = ['de', 'en'];

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`
 * , which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}
/*
 * Source:
 * https://blog.logrocket.com/advanced-localization-techniques-vue-js/
 */
function checkDefaultLanguage() {
  let matched = null;
  // const languages = Object.getOwnPropertyNames(loadLocaleMessages());
  languages.forEach((lang) => {
    if (lang === navigator.language) {
      matched = lang;
    }
  });
  if (!matched) {
    languages.forEach((lang) => {
      const languagePartials = navigator.language.split('-')[0];
      if (lang === languagePartials) {
        matched = lang;
      }
    });
  }
  if (!matched) {
    languages.forEach((lang) => {
      const languagePartials = navigator.language.split('-')[0];
      if (lang.split('-')[0] === languagePartials) {
        matched = lang;
      }
    });
  }
  return matched;
}

export const selectedLocale = checkDefaultLanguage()
  || process.env.VUE_APP_I18N_LOCALE
  || 'en';

export { languages };
// Object.getOwnPropertyNames(loadLocaleMessages());
export default createI18n({
  locale: selectedLocale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE
    || 'en',
  messages: loadLocaleMessages(),
  legacy: false,
});

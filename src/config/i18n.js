import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
import translationEN from '../locales/en/translation.json'
import translationPT from '../locales/pt/translation.json'

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // use en if detected lng is not available

    keySeparator: false, // doesn't use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react is already safe from xss
    },
  })

export default i18n

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
import languages from '../locales'
import { resources } from '../locales/resources'

i18n
  .use(detector)
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: [languages.defaultLangKey], // Use 'en' if detected lng is not available
    nonExplicitSupportedLngs: true,
    keySeparator: false, // Doesn't use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // React is already safe from XSS
    },
    debug: process.env.NODE_ENV === 'development',
  })

export default i18n

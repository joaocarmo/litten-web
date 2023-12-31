export enum Language {
  EN = 'en',
  ES = 'es',
  PT = 'pt',
  RU = 'ru',
}

const locales = {
  langs: Object.values(Language),
  defaultLangKey: Language.EN,
  translationKeys: {
    [Language.EN]: 'langEnglish',
    [Language.ES]: 'langSpanish',
    [Language.PT]: 'langPortuguese',
    [Language.RU]: 'langRussian',
  },
}

export default locales

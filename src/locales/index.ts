export enum Language {
  EN = 'en',
  ES = 'es',
  PT = 'pt',
  // RU = 'ru',
}

const locales = {
  langs: Object.values(Language),
  defaultLangKey: Language.EN,
  translationKeys: {
    [Language.EN]: 'English',
    [Language.ES]: 'Español',
    [Language.PT]: 'Português',
    // [Language.RU]: 'Русский',
  },
}

export default locales

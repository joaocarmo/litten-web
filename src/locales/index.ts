export enum Language {
  EN = 'en',
  PT = 'pt',
  ES = 'es',
}

const locales = {
  langs: Object.values(Language),
  defaultLangKey: Language.EN,
}

export default locales

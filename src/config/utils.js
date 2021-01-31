import Bowser from 'bowser'
import { defaultLangKey } from '../locales'

export const debugLog = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(...args)
  }
}

export const getWindow = () => {
  if (typeof window !== 'undefined') {
    return window
  }

  return null
}

export const useShare = async (shareData) => {
  if (typeof window !== 'undefined') {
    await window.navigator.share(shareData)
  }
}

export const getUserAgent = () => {
  if (typeof window !== 'undefined') {
    return window.navigator.userAgent
  }

  return 'Zombie//1.0 (Server)'
}

export const i18nUpdateLocation = (userLang, pageLang, { slug = '' } = {}) => {
  if (userLang !== pageLang) {
    let langPrefix = ''
    let currentLocation = slug

    if (!currentLocation && typeof window !== 'undefined') {
      currentLocation = window.location.pathname
    }

    if (userLang !== defaultLangKey) {
      langPrefix = `/${userLang}`
    }

    const newLocation = `${langPrefix}${currentLocation.replace(/^\/[a-zA-Z]{2}\//, '/')}`

    window.location.replace(newLocation)
  }
}

export const buildIntent = (
  uriScheme,
  packageName,
  { fallbackUrl = '', optionalPath = '' } = {},
) =>
  `intent://${optionalPath.replace(
    /^\/+|\/+$/g,
    '',
  )}#Intent;scheme=${uriScheme};package=${packageName}${
    fallbackUrl ? `;S.browser_fallback_url=${fallbackUrl}` : ''
  };end`

export const useIntent = () => {
  const browser = Bowser.getParser(getUserAgent())
  return browser.satisfies({ mobile: { chrome: '>=25' } })
}

export const isIE11 = () => {
  const browser = Bowser.getParser(getUserAgent())
  return browser.satisfies({ windows: { 'internet explorer': '>10' } })
}

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

export const getSearchParams = () => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    return Object.fromEntries(url.searchParams.entries())
  }

  return {}
}

export const appendInAppClassToBody = () => {
  const inAppClass = 'in-app'

  if (
    typeof document !== 'undefined' &&
    !document.body.classList.contains(inAppClass)
  ) {
    document.body.classList.add(inAppClass)
  }
}

export const i18nUpdateLocation = (userLang, pageLang, { slug = '' } = {}) => {
  if (userLang && pageLang && userLang !== pageLang) {
    let langPrefix = ''
    let currentLocation = slug

    if (typeof window !== 'undefined') {
      if (!currentLocation) {
        currentLocation = window.location.pathname
      }

      currentLocation = `${currentLocation}${window.location.search}`
    }

    if (userLang !== defaultLangKey) {
      langPrefix = `/${userLang}`
    }

    const newLocation = `${langPrefix}${currentLocation.replace(
      /^\/[a-zA-Z]{2}\//,
      '/',
    )}`

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

import Bowser from 'bowser'
import type { GatsbyImageProps } from 'gatsby-plugin-image'
import locales from '../locales'
import { deepLinkPrefix } from './constants'

export const debugLog = (...args: any[]) => {
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

export const useShare = async (shareData?: ShareData) => {
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

export const getDeepLinkPath = () => {
  if (typeof window !== 'undefined') {
    const { pathname, search } = new URL(window.location.href)
    return `${pathname.replace(`${deepLinkPrefix}/`, '')}${search}`
  }

  return ''
}

export const appendClassToBody = (className: string) => {
  if (
    typeof document !== 'undefined' &&
    !document.body.classList.contains(className)
  ) {
    document.body.classList.add(className)
  }
}

export const i18nUpdateLocation = (
  userLang: string,
  pageLang: string,
  { slug = '' } = {},
) => {
  if (userLang && pageLang && userLang !== pageLang) {
    let langPrefix = ''
    let currentLocation = slug

    if (typeof window !== 'undefined') {
      if (!currentLocation) {
        currentLocation = window.location.pathname
      }

      currentLocation = `${currentLocation}${window.location.search}`
    }

    if (userLang !== locales.defaultLangKey) {
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
  uriScheme: string,
  packageName: string,
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

export const formEncode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')

/**
 * Helper functions to use the `BackgroundImage` component with the new
 * `gatsby-plugin-image` plugin
 */
export const getBgImageType = (imageData: GatsbyImageProps['image']) =>
  imageData.layout === 'fixed' ? 'fixed' : 'fluid'

export const getAspectRatio = (imageData: GatsbyImageProps['image']) =>
  imageData.width / imageData.height

export const getPlaceholder = (imageData: GatsbyImageProps['image']) => {
  if (imageData.placeholder) {
    return imageData.placeholder.fallback?.includes('base64')
      ? { base64: imageData.placeholder.fallback }
      : { tracedSvg: imageData.placeholder.fallback }
  }
  return {}
}

/**
 * Tries to Backport the new `gatsbyImageData` type to the classic `fluid` /
 * `fixed` form
 *
 * @param imageData {object} The image data to convert
 * @returns {{}}
 */
export const convertToBgImage = (imageData: GatsbyImageProps['image']) => {
  if (imageData && imageData.layout) {
    const returnBgObject: Record<any, any> = {}
    const bgType = getBgImageType(imageData)
    const aspectRatio = getAspectRatio(imageData)
    const placeholder = getPlaceholder(imageData)
    returnBgObject[bgType] = {
      ...imageData.images.fallback,
      ...placeholder,
      aspectRatio,
    }
    return returnBgObject
  }
  return {}
}

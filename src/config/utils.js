import Bowser from 'bowser'

export const getUserAgent = () => {
  if (typeof window !== 'undefined') {
    return window.navigator.userAgent
  }

  return 'Zombie//1.0 (Server)'
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

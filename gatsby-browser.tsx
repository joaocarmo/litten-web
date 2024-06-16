import type { RouteUpdateArgs } from 'gatsby'
import config from './package.json'
import 'normalize.css'
import './src/config/trusted-security-policies'
import './src/config/i18n'
import './src/styles/global.scss'

const polyfillIntersectionObserver = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!('IntersectionObserver' in window)) {
    require('intersection-observer')
  }
}

const redirectOnLink = ({ search }: RouteUpdateArgs['location']) => {
  const dynamicLinkPrefix = '/open'

  if (search) {
    const searchParams = new URLSearchParams(search)
    const link = searchParams.get('link')
    if (link) {
      const homepageUrl = new URL(config.homepage)
      const linkUrl = new URL(link)
      if (
        linkUrl.hostname === homepageUrl.hostname &&
        linkUrl.pathname.includes(dynamicLinkPrefix)
      ) {
        window.location.href = linkUrl.href
      }
    }
  }
}

export const onClientEntry = () => {
  polyfillIntersectionObserver()
}

export const onPreRouteUpdate = ({ location }: RouteUpdateArgs) => {
  redirectOnLink(location)
}

import config from './package.json'
import 'normalize.css'
import './src/config/trusted-security-policies'
import './src/config/i18n'
import './src/styles/global.scss'

const polyfillIntersectionObserver = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!('IntersectionObserver' in window)) {
    // eslint-disable-next-line global-require
    require('intersection-observer')
  }
}

const redirectOnLink = ({ search } = {}) => {
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
        window.location.href = linkUrl
      }
    }
  }
}

export const onClientEntry = () => {
  polyfillIntersectionObserver()
}

export const onRouteUpdate = ({ location }) => {
  redirectOnLink(location)
}

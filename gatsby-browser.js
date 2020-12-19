import config from './package.json'
import './src/config/i18n'
import 'normalize.css'
import './src/styles/global.scss'

const polyfillIntersectionObserver = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!('IntersectionObserver' in window)) {
    import('intersection-observer')
  }
}

const redirectOnLink = ({ search } = {}) => {
  if (search) {
    const searchParams = new URLSearchParams(search)
    const link = searchParams.get('link')
    if (link) {
      const homepageUrl = new URL(config.homepage)
      const linkUrl = new URL(link)
      if (linkUrl.hostname === homepageUrl.hostname) {
        window.location.href = `${linkUrl.pathname}${linkUrl.search}`
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

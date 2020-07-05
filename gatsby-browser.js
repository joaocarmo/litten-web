import './src/config/i18n'
import 'normalize.css'
import './src/styles/global.scss'

// eslint-disable-next-line import/prefer-default-export
export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!('IntersectionObserver' in window)) {
    import('intersection-observer')
  }
}

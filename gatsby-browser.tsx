import type { RouteUpdateArgs } from 'gatsby'
import config from './package.json'
import 'normalize.css'
import './src/config/trusted-security-policies'
import './src/config/i18n'
import './src/styles/global.scss'

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

export const onPreRouteUpdate = ({ location }: RouteUpdateArgs) => {
  redirectOnLink(location)
}

import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { I18nextProvider } from 'react-i18next'
import i18n from '../config/i18n'
import UpgradeBrowserNotice from './upgrade-browser-notice'
import { isIE11 } from '../config/utils'

const shouldUpgrade = isIE11()

const Layout = ({ children, ...otherProps }) => {
  const data = useStaticQuery(graphql`
    query LayoutMetaQuery {
      site {
        siteMetadata {
          title
          titleTemplate
          siteUrl
          description
        }
      }
    }
  `)

  const title = data?.site?.siteMetadata?.title
  const titleTemplate = data?.site?.siteMetadata?.titleTemplate

  return (
    <I18nextProvider i18n={i18n}>
      <div id="main" role="main" {...otherProps}>
        <Helmet titleTemplate={titleTemplate} defaultTitle={title}>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={data?.site?.siteMetadata?.description}
          />
          <link rel="canonical" href={data?.site?.siteMetadata?.siteUrl} />
        </Helmet>
        <div id="container" role="grid">
          {shouldUpgrade ? <UpgradeBrowserNotice /> : children}
        </div>
      </div>
    </I18nextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Layout

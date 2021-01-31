import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import UpgradeBrowserNotice from './upgrade-browser-notice'
import { isIE11 } from '../config/utils'

const Layout = ({ children, ...otherProps }) => {
  const data = useStaticQuery(graphql`
    query LayoutMetaQuery {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
    }
  `)

  const title = data?.site?.siteMetadata?.title

  return (
    <div id="main" role="main" {...otherProps}>
      <Helmet titleTemplate={`${title} - %s`} defaultTitle={title}>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={data?.site?.siteMetadata?.description}
        />
        <link rel="canonical" href={data?.site?.siteMetadata?.siteUrl} />
      </Helmet>
      <div id="container" role="grid">
        {isIE11() ? <UpgradeBrowserNotice /> : children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Layout

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import '../config/i18n'
import '../styles/components/layout.scss'

const Layout = ({ children }) => (
  <div id="main" role="main">
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              title
              siteUrl
              description
            }
          }
        }
      `}
      render={(data) => (
        <Helmet>
          <meta charSet="utf-8" />
          <title>{data?.site?.siteMetadata?.title}</title>
          <link rel="canonical" href={data?.site?.siteMetadata?.siteUrl} />
        </Helmet>
      )}
    />
    <div id="container" role="grid">
      {children}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Layout

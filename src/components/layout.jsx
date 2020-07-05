import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import '../config/i18n'

const Layout = ({ children }) => {
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

  return (
    <div id="main" role="main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data?.site?.siteMetadata?.title}</title>
        <link rel="canonical" href={data?.site?.siteMetadata?.siteUrl} />
      </Helmet>
      <div id="container" role="grid">
        {children}
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

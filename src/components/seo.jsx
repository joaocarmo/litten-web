import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          siteUrl
          defaultImage: image
          twitterUsername
        }
      }
    }
  `)

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata

  const seo = {
    name: defaultTitle,
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    type: article ? 'article' : 'website',
  }

  return (
    <Helmet
      defaultTitle={defaultTitle}
      title={seo.title}
      titleTemplate={titleTemplate}>
      {/* General */}
      <meta charSet="utf-8" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />
      {/* Open Graph */}
      {seo.name && <meta property="og:site_name" content={seo.name} />}
      {seo.url && <meta property="og:url" content={seo.url} />}
      {article && <meta property="og:type" content={seo.type} />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      {seo.image && <meta property="og:image:alt" content={seo.description} />}
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      {seo.image && <meta name="twitter:image:alt" content={seo.description} />}
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: '',
  description: '',
  image: '',
  article: false,
}

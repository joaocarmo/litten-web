import { useStaticQuery, graphql } from 'gatsby'
import { genSchemaOrgWebPage } from '../config/schema'

interface SEOProps {
  article?: boolean
  description?: string
  image?: string
  pathname: string
  title?: string
}

const isDev = process.env.NODE_ENV === 'development'

const SEO = ({
  article = false,
  description = '',
  image = '',
  pathname,
  title = '',
}: SEOProps) => {
  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        buildTime(formatString: "YYYY-MM-DD")
        siteMetadata {
          author
          defaultDescription: description
          defaultImage: image
          defaultTitle: title
          headline
          siteUrl
          titleTemplate
          twitterUsername
        }
      }
    }
  `)

  const {
    defaultDescription,
    defaultImage,
    defaultTitle,
    siteUrl,
    titleTemplate,
    twitterUsername,
  } = site.siteMetadata

  const seo = {
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    name: defaultTitle,
    title: title || defaultTitle,
    type: article ? 'article' : 'website',
    url: `${siteUrl}${pathname}`,
  }

  const schemaOrgWebPage = genSchemaOrgWebPage({
    ...site.siteMetadata,
    buildTime: site.buildTime,
    image: image || defaultImage,
    lang: 'en',
  })

  const resolvedTitle =
    seo.title && seo.title !== defaultTitle
      ? titleTemplate.replace('%s', seo.title)
      : defaultTitle

  return (
    <>
      {/* Title */}
      <title>{resolvedTitle}</title>
      {/* General */}
      <meta charSet="utf-8" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {!isDev && (
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; base-uri 'self'; form-action 'self'; object-src 'none'; worker-src 'self'; child-src 'self'; frame-src 'self'; connect-src 'self'; font-src 'self'; manifest-src 'self'; media-src 'self'; prefetch-src 'self'; require-trusted-types-for 'script'; block-all-mixed-content"
        />
      )}
      <link rel="canonical" href={seo.url} />
      {/* Insert schema.org data (webpage/article) */}
      {!article && (
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgWebPage)}
        </script>
      )}
      {/* Open Graph */}
      {seo.name && <meta property="og:site_name" content={seo.name} />}
      <meta property="og:locale" content="en" />
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
    </>
  )
}

export default SEO

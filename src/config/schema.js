/* eslint-disable import/prefer-default-export */
/**
 * Schema.org in JSON-LD format
 * @link https://developers.google.com/search/docs/guides/intro-structured-data
 */

export const genSchemaOrgWebPage = (config = {}) => ({
  '@context': 'http://schema.org',
  '@type': 'WebPage',
  url: config.siteUrl,
  headline: config.headline,
  inLanguage: config.lang,
  mainEntityOfPage: config.siteUrl,
  description: config.defaultDescription,
  name: config.defaultTitle,
  author: {
    '@type': 'Person',
    name: config.author,
  },
  copyrightHolder: {
    '@type': 'Person',
    name: config.author,
  },
  copyrightYear: '2020',
  creator: {
    '@type': 'Person',
    name: config.author,
  },
  publisher: {
    '@type': 'Person',
    name: config.author,
  },
  datePublished: '2020-06-27',
  dateModified: config.buildTime,
  image: {
    '@type': 'ImageObject',
    url: `${config.siteUrl}${config.image}`,
  },
})

const path = require('path')
const enCommon = require('./src/locales/en/common.json')
const config = require('./package.json')
const colors = require('./src/config/colors')
const languages = require('./src/locales')

const isDev = process.env.NODE_ENV === 'development'

const description = [
  enCommon.featureAdoptionText,
  enCommon.featureLostText,
  enCommon.featureFoundText,
].join(' ')

module.exports = {
  siteMetadata: {
    author: config.author.name,
    description,
    headline: 'Find a furry friend',
    image: '/img/seo/social-preview.jpg',
    languages,
    siteUrl: config.homepage,
    title: config.title,
    titleTemplate: `${config.title} - %s`,
    twitterUsername: '@littenapp',
  },
  flags: {
    DETECT_NODE_MUTATIONS: isDev,
    DEV_WEBPACK_CACHE: isDev,
    FAST_DEV: isDev,
    PARALLEL_SOURCING: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: isDev,
    PRESERVE_WEBPACK_CACHE: isDev,
  },
  plugins: [
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: colors.theme,
        showSpinner: false,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: path.join(__dirname, 'src', 'markdown-pages'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              maintainCase: false,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'en',
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: false,
        prefixDefault: false,
        pagesPaths: [path.join(__dirname, 'src', 'markdown-pages')],
        markdownRemark: {
          postPage: 'src/templates/static-template.jsx',
          query: `
            {
              allMarkdownRemark {
                edges {
                  node {
                    fields {
                      slug
                      langKey
                    }
                  }
                }
              }
            }
          `,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/config/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.title,
        start_url: '/',
        background_color: colors.background,
        theme_color: colors.theme,
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
  ],
}

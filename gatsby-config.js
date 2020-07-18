const path = require('path')
const enCommon = require('./src/locales/en/common.json')
const config = require('./package.json')
const colors = require('./src/config/colors')

const description = [
  enCommon.featureAdoptionText,
  enCommon.featureMatingText,
  enCommon.featureLostText,
  enCommon.featureFoundText,
].join(' ')

module.exports = {
  siteMetadata: {
    title: config.title,
    siteUrl: config.homepage,
    description,
  },
  plugins: [
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
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

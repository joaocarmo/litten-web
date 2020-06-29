const config = require('./package.json')
const colors = require('./src/config/colors')

module.exports = {
  siteMetadata: {
    title: config.title,
    siteUrl: config.homepage,
    description: config.description,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
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

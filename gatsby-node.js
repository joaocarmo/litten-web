const path = require('path')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const staticUniversalLinksTemplate = require.resolve(
    path.join(__dirname, 'src', 'templates', 'open-template.jsx'),
  )

  createPage({
    path: '/open',
    matchPath: '/open/*',
    component: staticUniversalLinksTemplate,
  })

  const staticPageTemplate = require.resolve(
    path.join(__dirname, 'src', 'templates', 'static-template.jsx'),
  )

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
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
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({
    node: { fields: { slug, langKey } },
}) => {
    createPage({
      path: slug,
      component: staticPageTemplate,
      context: {
        // Additional data can be passed via context
        slug,
        langKey,
      },
    })
  })
}

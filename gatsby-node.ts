import path from 'path'
import type { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions

  const staticUniversalLinksTemplate = path.resolve(
    path.join(__dirname, 'src', 'templates', 'open-template.tsx'),
  )

  createPage({
    path: '/open',
    matchPath: '/open/*',
    component: staticUniversalLinksTemplate,
  })

  const staticPageTemplate = path.resolve(
    path.join(__dirname, 'src', 'templates', 'static-template.tsx'),
  )

  const result = await graphql<any, any>(`
    query GetAllMarkdownRemarks {
      allMarkdownRemark(sort: { fields: { slug: ASC } }, limit: 1000) {
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

  result.data.allMarkdownRemark.edges.forEach(
    ({
      node: {
        // @ts-expect-error
        fields: { slug, langKey },
      },
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
    },
  )
}

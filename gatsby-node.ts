import { join, resolve } from 'path'
import type { GatsbyNode } from 'gatsby'

interface MarkdownFields {
  slug: string
  langKey: string
}

interface MarkdownNode {
  fields: MarkdownFields
}

interface MarkdownEdge {
  node: MarkdownNode
}

interface MarkdownResult {
  data?: {
    allMarkdownRemark: {
      edges: MarkdownEdge[]
    }
  }
  errors?: any[]
}

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions

  const staticUniversalLinksTemplate = resolve(
    join(__dirname, 'src', 'templates', 'open-template.tsx'),
  )

  createPage({
    path: '/open',
    matchPath: '/open/*',
    component: staticUniversalLinksTemplate,
  })

  const staticPageTemplate = resolve(
    join(__dirname, 'src', 'templates', 'static-template.tsx'),
  )

  const result: MarkdownResult = await graphql<any, any>(`
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

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  result.data?.allMarkdownRemark.edges.forEach(
    ({
      node: {
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

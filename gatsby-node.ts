import { join, resolve } from 'path'
import type { GatsbyNode } from 'gatsby'
import { Language } from './src/locales'

interface MarkdownRemarkPage {
  node: {
    fields: {
      slug: string
      langKey: Language
    }
  }
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
        fields: { slug, langKey },
      },
    }: MarkdownRemarkPage) => {
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

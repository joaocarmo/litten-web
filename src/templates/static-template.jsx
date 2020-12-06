import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import Layout from '../components/layout'

const StaticTemplate = ({ data, t }) => {
  const {
    markdownRemark: { frontmatter, html, tableOfContents },
  } = data

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <section id="static-page" className="page-container">
        <article className="page">
          <h1 className="uppercase">{frontmatter.title}</h1>
          {/* eslint-disable-next-line react/jsx-no-literals */}
          <p>{`${t('lastUpdatedOn')} ${frontmatter.date}`}</p>
          {frontmatter.toc && (
            <div className="page-toc" role="navigation">
              <h2 className="uppercase">{t('tableOfContents')}</h2>
              <div
                className="page-toc-content"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: tableOfContents }}
              />
            </div>
          )}
          <div
            className="page-content"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </section>
    </Layout>
  )
}

StaticTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
        date: PropTypes.string,
        toc: PropTypes.bool,
      }),
      html: PropTypes.string,
      tableOfContents: PropTypes.string,
    }),
  }),
  t: PropTypes.func.isRequired,
}

StaticTemplate.defaultProps = {
  data: null,
}

export default withTranslation()(StaticTemplate)

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      tableOfContents(absolute: false, maxDepth: 3)
      frontmatter {
        title
        slug
        date(formatString: "DD/MM/YYYY")
        toc
      }
    }
  }
`

import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import Layout from '../components/layout'

const StaticTemplate = ({ data, t }) => {
  const { markdownRemark: { frontmatter, html } } = data

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <section id="static-page" className="page-container">
        <article className="page">
          <h1>{frontmatter.title}</h1>
          {/* eslint-disable-next-line react/jsx-no-literals */}
          <p>{`${t('lastUpdatedOn')} ${frontmatter.date}`}</p>
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
        date: PropTypes.string,
        slug: PropTypes.string,
      }),
      html: PropTypes.string,
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
      frontmatter {
        date(formatString: "DD/MM/YYYY")
        slug
        title
      }
    }
  }
`

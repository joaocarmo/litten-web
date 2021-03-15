import { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import useEventListener from '../hooks/use-event-listener'
import Layout from '../components/layout'
import StaticContainer from '../components/static-container'
import useCurrentShortLang from '../hooks/use-current-short-lang'
import {
  appendInAppClassToBody,
  debugLog,
  getSearchParams,
  i18nUpdateLocation,
  useShare,
} from '../config/utils'
import config from '../../package.json'

const shareData = {
  title: config.title,
  text: config.description,
  url: config.homepage,
}

const StaticTemplate = ({
  data: {
    markdownRemark: {
      fields: { langKey, slug },
      frontmatter,
      html,
      tableOfContents,
    },
  },
  t,
}) => {
  const [currentShortLang] = useCurrentShortLang()

  const inApp = useMemo(() => {
    const { inapp } = getSearchParams()
    return inapp === 'true'
  }, [])

  const handleClick = useCallback(async (event) => {
    const {
      target: { nodeName = '', href = '' },
    } = event

    if (nodeName === 'A' && href.endsWith('#share')) {
      event.preventDefault()

      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await useShare(shareData)
      } catch (err) {
        debugLog(err)
      }
    }
  }, [])

  useEventListener('click', handleClick)

  useEffect(() => {
    if (inApp) {
      appendInAppClassToBody()
    }
  }, [inApp])

  useEffect(() => {
    i18nUpdateLocation(currentShortLang, langKey, { slug })
  }, [currentShortLang, langKey, slug])

  if (currentShortLang !== langKey) {
    return null
  }

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <StaticContainer inApp={inApp}>
        <section id="static-page" className="page-container static-page">
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
      </StaticContainer>
    </Layout>
  )
}

StaticTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      fields: PropTypes.shape({
        langKey: PropTypes.string,
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents(absolute: false, maxDepth: 3)
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        toc
      }
      fields {
        langKey
        slug
      }
    }
  }
`

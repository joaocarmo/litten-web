import { useCallback, useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import useEventListener from '../hooks/use-event-listener'
import Layout from '../components/layout'
import StaticContainer from '../components/static-container'
import useCurrentShortLang from '../hooks/use-current-short-lang'
import {
  appendClassToBody,
  debugLog,
  getSearchParams,
  i18nUpdateLocation,
  useShare,
} from '../config/utils'
import { inAppClass, themeClass } from '../config/constants'
import config from '../../package.json'

const shareData = {
  title: config.title,
  text: config.description,
  url: config.homepage,
}

interface StaticTemplateProps {
  data: {
    markdownRemark: {
      fields: {
        langKey: string
        slug: string
      }
      frontmatter: {
        title: string
        date: string
        toc: boolean
      }
      html: string
      tableOfContents: string
    }
  }
}

const StaticTemplate: FC<StaticTemplateProps> = ({
  data: {
    markdownRemark: {
      fields: { langKey, slug },
      frontmatter,
      html,
      tableOfContents,
    },
  },
}) => {
  const { t } = useTranslation()
  const [currentShortLang] = useCurrentShortLang()

  const inApp = useMemo(() => {
    const { inapp } = getSearchParams()
    return inapp === 'true'
  }, [])

  const theme = useMemo(() => {
    const { theme: themeFromParams } = getSearchParams()
    return typeof themeFromParams === 'string' ? themeFromParams : 'light'
  }, [])

  const handleClick = useCallback(async (event: any) => {
    const {
      target: { nodeName = '', href = '' },
    } = event

    if (nodeName === 'A' && href.endsWith('#share')) {
      event.preventDefault()

      try {
        await useShare(shareData)
      } catch (err) {
        debugLog(err)
      }
    }
  }, [])

  useEventListener('click', handleClick)

  useEffect(() => {
    if (inApp) {
      const whichThemeClass = `${themeClass}-${theme}`

      appendClassToBody(inAppClass)
      appendClassToBody(whichThemeClass)
    }
  }, [inApp, theme])

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
                  dangerouslySetInnerHTML={{ __html: tableOfContents }}
                />
              </div>
            )}
            <div
              className="page-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>
        </section>
      </StaticContainer>
    </Layout>
  )
}

export default StaticTemplate

export const pageQuery = graphql`
  query ($slug: String!) {
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

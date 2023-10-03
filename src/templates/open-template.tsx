import { useEffect, useRef } from 'react'
import type { FC } from 'react'
import { Link } from 'gatsby'
import { Trans, useTranslation } from 'react-i18next'
import Layout from '../components/layout'
import { buildIntent, getDeepLinkPath, useIntent } from '../config/utils'
import { androidPackageName, scheme } from '../config/constants'
import { HOME } from '../config/link-refs'

const deepLinkPath = getDeepLinkPath()

const Open: FC = () => {
  const { t } = useTranslation()
  const dynamicLink = useRef(`${scheme}://${deepLinkPath}`)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (useIntent()) {
      dynamicLink.current = buildIntent(scheme, androidPackageName, {
        // @ts-expect-error
        deepLinkPath,
      })
    }

    if (window.location.href !== dynamicLink.current) {
      window.location.href = dynamicLink.current
    }
  }, [])

  return (
    <Layout>
      <div className="page-centered" role="article">
        <article className="contained title-container">
          <h1>
            <Trans i18nKey="appNotInstalledTitle">
              {/* eslint-disable */}
              Why not <mark>Litten</mark> ?{/* eslint-enable */}
            </Trans>
          </h1>
          <p>{t('appNotInstalledContent')}</p>
          <Link to={HOME} className="button">
            {t('appNotInstalledButton')}
          </Link>
        </article>
      </div>
    </Layout>
  )
}

export default Open

import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Trans, withTranslation } from 'react-i18next'
import Layout from '../components/layout'
import { buildIntent, getDeepLinkPath, useIntent } from '../config/utils'
import { androidPackageName, scheme } from '../config/constants'
import { HOME } from '../config/link-refs'

const deepLinkPath = getDeepLinkPath()

const Open = ({ t }) => {
  const dynamicLink = useRef(`${scheme}://${deepLinkPath}`)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (useIntent()) {
      dynamicLink.current = buildIntent(scheme, androidPackageName, {
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

Open.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Open)

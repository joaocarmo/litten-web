import { useEffect, useRef } from 'react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Layout from '../../components/layout'
import { buildIntent, useIntent } from '../../config/utils'
import {
  androidPackageName,
  scheme,
  verificationPath,
} from '../../config/constants'

const Verification: FC = () => {
  const { t } = useTranslation()
  const dynamicLink = useRef(`${scheme}://${verificationPath}`)

  useEffect(() => {
     
    if (useIntent()) {
      dynamicLink.current = buildIntent(scheme, androidPackageName, {
        // @ts-expect-error
        verificationPath,
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
            <Trans i18nKey="accountVerification">
              {/* eslint-disable */}
              Account <mark>verification</mark>
              {/* eslint-enable */}
            </Trans>
          </h1>
          <p>{t('accountVerificationContent')}</p>
          <a href={dynamicLink.current} className="button">
            {t('accountVerificationButton')}
          </a>
        </article>
      </div>
    </Layout>
  )
}

export default Verification

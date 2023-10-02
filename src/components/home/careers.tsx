import type { FC } from 'react'
import { Link } from 'gatsby'
import { Trans, useTranslation } from 'react-i18next'
import { CAREERS } from '../../config/link-refs'

const Careers: FC = () => {
  const { t } = useTranslation()

  return (
    <section id="careers">
      <h3>{t('careersHeader')}</h3>
      <p>
        <Trans i18nKey="careersText">
          {/* eslint-disable */}
          We're always looking for talented minds to join our quest.
          <br />
          Take a look at the positions that we're currently looking for.
          {/* eslint-enable */}
        </Trans>
      </p>
      <Link to={CAREERS} className="cta">
        {t('careersCTA')}
      </Link>
    </section>
  )
}

export default Careers

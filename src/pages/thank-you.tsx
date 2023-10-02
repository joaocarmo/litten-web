import type { FC } from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'
import Layout from '../components/layout'
import { HOME } from '../config/link-refs'

const ThankYou: FC = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <div className="page-centered" role="article">
        <article className="contained title-container">
          <h1>{t('thankYouTitle')}</h1>
          <p>{t('thankYouDescription')}</p>
          <Link to={HOME} className="button">
            {t('thankYouButton')}
          </Link>
        </article>
      </div>
    </Layout>
  )
}

export default ThankYou

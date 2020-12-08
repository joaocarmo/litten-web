import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Trans, withTranslation } from 'react-i18next'
import Layout from '../components/layout'
import { HOME } from '../config/link-refs'

const Open = ({ t }) => (
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

Open.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Open)

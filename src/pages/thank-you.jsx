import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { withTranslation } from 'react-i18next'
import Layout from '../components/layout'
import { HOME } from '../config/link-refs'

const ThankYou = ({ t }) => (
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

ThankYou.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(ThankYou)

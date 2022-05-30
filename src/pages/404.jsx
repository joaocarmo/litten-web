import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Trans, withTranslation } from 'react-i18next'
import Layout from '../components/layout'
import { HOME } from '../config/link-refs'
import badPuppy from '../images/404.svg'

const NotFound = ({ t }) => (
  <Layout>
    <main className="not-found-grid">
      <section className="not-found-text">
        <h1>
          <Trans i18nKey="notFoundTitle" values={{ errorCode: '404' }}>
            {/* eslint-disable */}
            Lost Litten <mark>errorCode</mark>!{/* eslint-enable */}
          </Trans>
        </h1>
        <p>{t('notFoundContent')}</p>
      </section>
      <article className="not-found-image">
        <img src={badPuppy} alt="404" className="not-found" />
      </article>
      <nav className="not-found-button">
        <Link to={HOME} className="button">
          {t('notFoundButton')}
        </Link>
      </nav>
    </main>
  </Layout>
)

NotFound.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(NotFound)

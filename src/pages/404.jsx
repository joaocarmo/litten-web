import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Trans, withTranslation } from 'react-i18next'
import Layout from '../components/layout'

const NotFound = ({ t }) => (
  <Layout>
    <div className="page-centered" role="article">
      <article className="error-container">
        <h1>
          <Trans i18nKey="notFoundTitle" values={{ errorCode: '404' }}>
            {/* eslint-disable */}
            Sorry about the <mark>errorCode</mark>!
            {/* eslint-enable */}
          </Trans>
        </h1>
        <p>
          {t('notFoundContent')}
        </p>
        <Link to="/" className="button">
          {t('notFoundButton')}
        </Link>
      </article>
    </div>
  </Layout>
)

NotFound.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(NotFound)

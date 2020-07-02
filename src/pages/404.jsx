import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { withTranslation } from 'react-i18next'
import Layout from '../components/layout'

const NotFound = ({ t }) => (
  <Layout>
    <div className="page-centered" role="article">
      <article className="error-container">
        <h1
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={
            {
              __html: t(
                'notFoundTitle',
                {
                  errorCode: '<span class="highlight" role="mark">404</span>',
                },
              ),
            }
          }
        />
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

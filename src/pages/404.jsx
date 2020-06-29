import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import Layout from '../components/layout'
import '../styles/pages/404.scss'

const NotFound = ({ t }) => (
  <Layout>
    <div className="page-centered" role="article">
      <h1>
        {t('notFound')}
      </h1>
    </div>
  </Layout>
)

NotFound.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(NotFound)

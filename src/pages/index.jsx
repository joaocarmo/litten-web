import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import Layout from '../components/layout'
import '../styles/pages/index.scss'

const Home = ({ t }) => (
  <Layout>
    <div className="page-padded" role="article">
      <h1>{t('hello')}</h1>
    </div>
  </Layout>
)

Home.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Home)

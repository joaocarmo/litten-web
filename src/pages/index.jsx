import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import Layout from '../components/layout'

const Home = ({ t }) => <Layout><h1>{t('hello')}</h1></Layout>

Home.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Home)

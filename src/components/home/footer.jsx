import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

// eslint-disable-next-line no-unused-vars
const Footer = ({ t }) => <h1>Footer</h1>

Footer.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Footer)

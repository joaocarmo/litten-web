import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

// eslint-disable-next-line no-unused-vars
const Careers = ({ t }) => <h1>Careers</h1>

Careers.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Careers)

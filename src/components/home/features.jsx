import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

// eslint-disable-next-line no-unused-vars
const Features = ({ t }) => <h1>Features</h1>

Features.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Features)

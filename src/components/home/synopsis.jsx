import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

// eslint-disable-next-line no-unused-vars
const Synopsis = ({ t }) => <h1>Synopsis</h1>

Synopsis.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Synopsis)

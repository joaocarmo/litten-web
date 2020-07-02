import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

// eslint-disable-next-line no-unused-vars
const Team = ({ t }) => <h1>Team</h1>

Team.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Team)

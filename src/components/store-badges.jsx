import React from 'react'
import PropTypes from 'prop-types'

const StoreBadges = ({ className, small }) => (
  <aside id="store-badges" className={className}>
    {small ? 'small' : 'big icons'}
  </aside>
)

StoreBadges.propTypes = {
  className: PropTypes.string,
  small: PropTypes.bool,
}

StoreBadges.defaultProps = {
  className: '',
  small: false,
}

export default StoreBadges

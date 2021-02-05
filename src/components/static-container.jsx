import PropTypes from 'prop-types'
import LanguageSelector from './language-selector'

const StaticContainer = ({ children, inApp }) => {
  if (inApp) {
    return children
  }

  return (
    <>
      <LanguageSelector className="static-page" withHome />
      {children}
    </>
  )
}

StaticContainer.propTypes = {
  children: PropTypes.node,
  inApp: PropTypes.bool,
}

StaticContainer.defaultProps = {
  children: null,
  inApp: false,
}

export default StaticContainer

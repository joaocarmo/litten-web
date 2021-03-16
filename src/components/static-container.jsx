import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './language-selector'

const StaticContainer = ({ children, inApp }) => {
  const { t } = useTranslation()

  if (inApp) {
    return children
  }

  return (
    <>
      <LanguageSelector className="static-page" withHome />
      {children}
      <footer className="static attribution">
        <p>{t('footerAttribution')}</p>
      </footer>
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

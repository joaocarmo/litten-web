import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import SEO from './seo'
import UpgradeBrowserNotice from './upgrade-browser-notice'
import i18n from '../config/i18n'
import { isIE11 } from '../config/utils'

const shouldUpgrade = isIE11()

const Layout = ({ children, ...otherProps }) => (
  <I18nextProvider i18n={i18n}>
    <div id="main" role="main" {...otherProps}>
      <SEO />
      <div id="container" role="grid">
        {shouldUpgrade ? <UpgradeBrowserNotice /> : children}
      </div>
    </div>
  </I18nextProvider>
)

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Layout

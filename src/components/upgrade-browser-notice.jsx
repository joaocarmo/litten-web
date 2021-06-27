import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { UPGRADE_BROWSER } from '../config/link-refs'

const UpgradeBrowserNotice = ({ t }) => (
  <div id="upgrade-browser" role="alert">
    <p>
      {t('upgradeBrowserNotice')}{' '}
      <a href={UPGRADE_BROWSER} target="_blank" rel="noreferrer noopener">
        {t('upgradeBrowserNoticeClickHere')}
      </a>
    </p>
  </div>
)

UpgradeBrowserNotice.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(UpgradeBrowserNotice)

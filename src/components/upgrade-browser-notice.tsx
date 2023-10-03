import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { UPGRADE_BROWSER } from '../config/link-refs'

const UpgradeBrowserNotice: FC = () => {
  const { t } = useTranslation()

  return (
    <div id="upgrade-browser" role="alert">
      <p>
        {t('upgradeBrowserNotice')}{' '}
        <a href={UPGRADE_BROWSER} target="_blank" rel="noreferrer noopener">
          {t('upgradeBrowserNoticeClickHere')}
        </a>
      </p>
    </div>
  )
}

export default UpgradeBrowserNotice

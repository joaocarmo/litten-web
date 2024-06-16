import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'
import { appStoreURL, playStoreURL } from '../config/constants'

interface StoreBadgesProps {
  className?: string
  small?: boolean
  disabled?: boolean
}

const StoreBadges: FC<StoreBadgesProps> = ({
  className = '',
  small = false,
  disabled = false,
}) => {
  const [appStoreBadge, setAppStoreBadge] = useState(null)
  const [playStoreBadge, setPlayStoreBadge] = useState(null)

  const { i18n, t } = useTranslation()

  const lang = i18n?.language?.substring(0, 2)

  const getIcons = async (suffix: string, ext = 'svg') => {
    try {
      const appStore = await import(
        `../images/app-store-black-${suffix}.${ext}`
      )
      setAppStoreBadge(appStore?.default)
    } catch (err) {
      setAppStoreBadge(null)
    }
    try {
      if (suffix !== 'small') {
        ext = 'png'
      }
      const playStore = await import(
        `../images/play-store-black-${suffix}.${ext}`
      )
      setPlayStoreBadge(playStore?.default)
    } catch (err) {
      setPlayStoreBadge(null)
    }
  }

  useEffect(() => {
    if (small) {
      getIcons('small')
    } else {
      getIcons(lang)
    }
  }, [small, lang])

  return (
    <aside id="store-badges" className={cx([className, { small, disabled }])}>
      {appStoreBadge && (
        <a href={appStoreURL}>
          <img src={appStoreBadge} alt={t('appStoreImgAlt')} />
        </a>
      )}
      {playStoreBadge && (
        <a href={playStoreURL}>
          <img src={playStoreBadge} alt={t('playStoreImgAlt')} />
        </a>
      )}
    </aside>
  )
}

export default StoreBadges

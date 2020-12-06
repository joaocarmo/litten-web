import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'

const StoreBadges = ({ className, small, disabled }) => {
  const [appStoreBadge, setAppStoreBadge] = useState(null)
  const [playStoreBadge, setPlayStoreBadge] = useState(null)

  const { i18n } = useTranslation()

  const lang = i18n?.language?.substring(0, 2)

  const getIcons = async (suffix, ext = 'svg') => {
    try {
      const appStore = await import(`../images/app-store-black-${suffix}.${ext}`)
      setAppStoreBadge(appStore?.default)
    } catch (err) {
      setAppStoreBadge(null)
    }
    try {
      if (suffix !== 'small') {
        // eslint-disable-next-line no-param-reassign
        ext = 'png'
      }
      const playStore = await import(`../images/play-store-black-${suffix}.${ext}`)
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
      {appStoreBadge && <img src={appStoreBadge} alt="" />}
      {playStoreBadge && <img src={playStoreBadge} alt="" />}
    </aside>
  )
}

StoreBadges.propTypes = {
  className: PropTypes.string,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
}

StoreBadges.defaultProps = {
  className: '',
  small: false,
  disabled: false,
}

export default StoreBadges

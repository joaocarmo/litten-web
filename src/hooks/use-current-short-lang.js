import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const useCurrentShortLang = () => {
  const { i18n } = useTranslation()

  const [currentShortLang, setCurrentShortLang] = useState('')

  const setShortLang = useCallback(
    (newLang) => {
      if (newLang) {
        i18n.changeLanguage(newLang)
      }
    },
    [i18n],
  )

  useEffect(() => {
    setCurrentShortLang(i18n?.language?.substring(0, 2))
  }, [i18n?.language])

  return [currentShortLang, setShortLang]
}

export default useCurrentShortLang

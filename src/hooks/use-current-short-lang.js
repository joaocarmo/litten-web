import { useCallback, useState } from 'react'

const useCurrentShortLang = (i18n) => {
  const [currentShortLang, setCurrentShortLang] = useState(
    i18n?.language?.substring(0, 2),
  )

  const setShortLang = useCallback((newLang) => {
    if (newLang) {
      i18n.changeLanguage(newLang)
      setCurrentShortLang(newLang)
    }
  }, [i18n])

  return [currentShortLang, setShortLang]
}

export default useCurrentShortLang

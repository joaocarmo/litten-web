import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Language } from '../locales'

const useCurrentShortLang = (): [Language, (newLang: Language) => void] => {
  const { i18n } = useTranslation()

  const [currentShortLang, setCurrentShortLang] = useState<Language>(
    i18n.language as Language,
  )

  const setShortLang = useCallback(
    (newLang: Language) => {
      if (newLang) {
        i18n.changeLanguage(newLang)
      }
    },
    [i18n],
  )

  useEffect(() => {
    const shortLang = i18n?.language?.substring(0, 2) as Language

    setCurrentShortLang(shortLang)
  }, [i18n?.language])

  return [currentShortLang, setShortLang]
}

export default useCurrentShortLang

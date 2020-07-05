import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const [currentShortLang, setCurrentShortLang] = useState(i18n?.language?.substring(0, 2))

  const changeLang = (event) => {
    const newLang = event?.target?.value

    if (newLang) {
      i18n.changeLanguage(newLang)
      setCurrentShortLang(newLang)
    }
  }

  return (
    <nav id="language-selector-nav">
      <Helmet>
        <html lang={currentShortLang || 'en'} />
      </Helmet>
      <div id="language-selector" role="form">
        <select
          name="language-selector"
          value={currentShortLang}
          onChange={changeLang}
          aria-label="select language"
        >
          {i18n?.languages?.map((lang) => (
            <option value={lang} key={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </nav>
  )
}

export default LanguageSelector

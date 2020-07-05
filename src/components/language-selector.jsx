import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const currentShortLang = i18n?.language?.substring(0, 2)

  const changeLang = (event) => {
    if (event?.target?.value) {
      i18n.changeLanguage(event.target.value)
    }
  }

  return (
    <nav id="language-selector-nav">
      <Helmet>
        <html lang={currentShortLang || 'en'} />
      </Helmet>
      <div id="language-selector" role="button">
        <select
          name="language-selector"
          value={currentShortLang}
          onChange={changeLang}
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

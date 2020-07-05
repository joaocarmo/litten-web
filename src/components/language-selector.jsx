import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const changeLang = (event) => {
    if (event?.target?.value) {
      i18n.changeLanguage(event.target.value)
    }
  }

  return (
    <nav id="language-selector-nav">
      <div id="language-selector" role="button">
        <select
          name="language-selector"
          value={i18n?.language}
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

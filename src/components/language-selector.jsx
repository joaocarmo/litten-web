import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import useCurrentShortLang from '../hooks/use-current-short-lang'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const [currentShortLang, setCurrentShortLang] = useCurrentShortLang(i18n)

  const changeLang = (event) => {
    const newLang = event?.target?.value

    if (newLang) {
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
          aria-label="select language">
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

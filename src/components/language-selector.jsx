import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import useCurrentShortLang from '../hooks/use-current-short-lang'

const LanguageSelector = ({ withHome, ...otherProps }) => {
  const [languages, setLanguages] = useState([])

  const { i18n, t } = useTranslation()

  const [currentShortLang, setCurrentShortLang] = useCurrentShortLang()

  const changeLang = (event) => {
    const newLang = event?.target?.value

    if (newLang) {
      setCurrentShortLang(newLang)
    }
  }

  useEffect(() => {
    setLanguages(i18n?.languages || [])
  }, [i18n?.languages])

  return (
    <>
      <nav id="language-selector-nav" {...otherProps}>
        <div id="go-back-home">
          {withHome && (
            // eslint-disable-next-line react/jsx-no-literals
            <Link to="/">
              &larr;
              {t('home')}
            </Link>
          )}
        </div>
        <div id="language-selector" role="form">
          <select
            name="language-selector"
            value={currentShortLang}
            onChange={changeLang}
            aria-label="select language"
          >
            {languages.map((lang) => (
              <option value={lang} key={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </>
  )
}

LanguageSelector.propTypes = {
  withHome: PropTypes.bool,
}

LanguageSelector.defaultProps = {
  withHome: false,
}

export default LanguageSelector

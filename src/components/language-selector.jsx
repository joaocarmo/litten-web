import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import useCurrentShortLang from '../hooks/use-current-short-lang'

const LanguageSelector = ({ withHome, ...otherProps }) => {
  const { i18n, t } = useTranslation()

  const [currentShortLang, setCurrentShortLang] = useCurrentShortLang()

  const changeLang = (event) => {
    const newLang = event?.target?.value

    if (newLang) {
      setCurrentShortLang(newLang)
    }
  }

  return (
    <>
      <Helmet>
        <html lang={currentShortLang || 'en'} />
      </Helmet>
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
            aria-label="select language">
            {i18n?.languages?.map((lang) => (
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

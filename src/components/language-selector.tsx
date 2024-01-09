import type { ChangeEventHandler, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import useCurrentShortLang from '../hooks/use-current-short-lang'
import locales from '../locales'
import type { Language } from '../locales'

interface LanguageSelectorProps {
  className?: string
  withHome?: boolean
}

const LanguageSelector: FC<LanguageSelectorProps> = ({
  withHome = false,
  ...otherProps
}) => {
  const { t } = useTranslation()

  const [currentShortLang, setCurrentShortLang] = useCurrentShortLang()

  const changeLang: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newLang = event.target.value as Language

    if (newLang) {
      setCurrentShortLang(newLang)
    }
  }

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
            {locales.langs.map((lang) => (
              <option value={lang} key={lang}>
                {locales.translationKeys[lang]}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </>
  )
}

export default LanguageSelector

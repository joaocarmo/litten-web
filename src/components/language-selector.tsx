import { useEffect, useState } from 'react'
import type { ChangeEventHandler, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import useCurrentShortLang from '../hooks/use-current-short-lang'

interface LanguageSelectorProps {
  className?: string
  withHome?: boolean
}

const LanguageSelector: FC<LanguageSelectorProps> = ({
  withHome = false,
  ...otherProps
}) => {
  const [languages, setLanguages] = useState<string[]>([])

  const { i18n, t } = useTranslation()

  const [currentShortLang, setCurrentShortLang] = useCurrentShortLang()

  const changeLang: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newLang = event?.target?.value

    if (newLang) {
      setCurrentShortLang(newLang)
    }
  }

  useEffect(() => {
    setLanguages([...(i18n?.languages || [])])
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

export default LanguageSelector

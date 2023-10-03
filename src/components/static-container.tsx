import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './language-selector'

interface StaticContainerProps {
  inApp?: boolean
}

const StaticContainer: FC<PropsWithChildren<StaticContainerProps>> = ({
  children,
  inApp = false,
}) => {
  const { t } = useTranslation()

  if (inApp) {
    return children
  }

  return (
    <>
      <LanguageSelector className="static-page" withHome />
      {children}
      <footer className="static attribution">
        <p>{t('footerAttribution')}</p>
      </footer>
    </>
  )
}

export default StaticContainer

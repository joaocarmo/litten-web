import type { FC } from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'
import StoreBadges from '../store-badges'
import {
  HELP_AND_CONTACTS,
  TERMS_AND_CONDITIONS,
  PRIVACY_POLICY,
} from '../../config/link-refs'

interface FooterProps {
  className?: string
}

const Footer: FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation()

  const navItems = [
    {
      key: 'HELP_AND_CONTACTS',
      text: t('footerNavItemHelp'),
      to: HELP_AND_CONTACTS,
    },
    {
      key: 'TERMS_AND_CONDITIONS',
      text: t('footerNavItemTerms'),
      to: TERMS_AND_CONDITIONS,
    },
    {
      key: 'PRIVACY_POLICY',
      text: t('footerNavItemPrivacy'),
      to: PRIVACY_POLICY,
    },
  ]

  return (
    <section id="footer" role="grid" className={className}>
      <div className="navigation" role="row">
        <div className="left" role="gridcell">
          <h6>{t('footerNavHeader')}</h6>
          <ul className="navigation-items">
            {navItems.map(({ key, text, to }) => (
              <li key={key}>
                <Link to={to} className="navigation-item">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="right" role="gridcell">
          <StoreBadges small />
        </div>
      </div>
      <hr className="separator" />
      <div className="attribution" role="row">
        <p>{t('footerAttribution')}</p>
      </div>
    </section>
  )
}

export default Footer

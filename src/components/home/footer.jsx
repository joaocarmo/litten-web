import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { withTranslation } from 'react-i18next'
import StoreBadges from '../store-badges'

const Footer = ({ t }) => {
  const navItems = [
    {
      key: 'help',
      text: t('footerNavItemHelp'),
      to: '#top',
    },
    {
      key: 'terms',
      text: t('footerNavItemTerms'),
      to: '#top',
    },
    {
      key: 'privacy',
      text: t('footerNavItemPrivacy'),
      to: '#top',
    },
  ]

  return (
    <section id="footer" role="grid">
      <div className="navigation" role="row">
        <div className="left" role="gridcell">
          <h6>{t('footerNavHeader')}</h6>
          <ul className="navigation-items">
            {navItems.map(({ key, text, to }) => (
              <li key={key}>
                <Link to={to} className="navigation-item">{text}</Link>
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

Footer.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Footer)

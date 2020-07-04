import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import heroLogoImg from '../../images/hero-logo.png'
import heroMainImg from '../../images/hero-main.png'

const Hero = ({ t }) => (
  <section id="hero" role="grid">
    <div className="hero-left" role="gridcell">
      <img src={heroLogoImg} className="hero-logo-img" alt="" />
      {/* eslint-disable-next-line react/no-danger */}
      <h1 dangerouslySetInnerHTML={{ __html: t('homeHeroHeader') }} />
      <p>{t('homeHeroSubHeader')}</p>
    </div>
    <img src={heroMainImg} className="hero-main-img" alt="" />
  </section>
)

Hero.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Hero)

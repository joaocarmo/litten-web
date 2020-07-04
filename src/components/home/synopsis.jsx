import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import synopsisImg from '../../images/synopsis-img.png'

const Synopsis = ({ t }) => (
  <section id="synopsis" role="grid">
    <div className="left-synopsis" role="gridcell">
      <img src={synopsisImg} className="with-phone-border" alt="" />
    </div>
    <div className="right-synopsis" role="gridcell">
      <h3>{t('synopsisTitle')}</h3>
      <p>{t('synopsisText')}</p>
    </div>
  </section>
)

Synopsis.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Synopsis)

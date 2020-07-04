import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { withTranslation } from 'react-i18next'

const nToBR = (str) => {
  if (typeof str === 'string') {
    const content = []
    str.split('\n').forEach((v, i, a) => {
      const key = i
      content.push(<span key={key} role="complementary">{v}</span>)
      if (i + 1 < a.length) {
        content.push(<br key={`br-${key}`} />)
      }
    })
    return content
  }
  return str
}

const Careers = ({ t }) => (
  <section id="careers">
    <h3>{t('careersHeader')}</h3>
    <p>{nToBR(t('careersText'))}</p>
    <Link to="#top" className="cta">{t('careersCTA')}</Link>
  </section>
)

Careers.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Careers)

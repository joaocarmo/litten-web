import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Trans, withTranslation } from 'react-i18next'

const Careers = ({ t }) => (
  <section id="careers">
    <h3>{t('careersHeader')}</h3>
    <p>
      <Trans i18nKey="careersText">
        {/* eslint-disable */}
        We're always looking for talented minds to join our quest.
        <br/>
        Take a look at the positions that we're currently looking for.
        {/* eslint-enable */}
      </Trans>
    </p>
    <Link to="#top" className="cta">{t('careersCTA')}</Link>
  </section>
)

Careers.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Careers)

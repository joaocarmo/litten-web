import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

const Features = ({ t }) => {
  const mainFeatures = [
    {
      key: 'adoption',
      icon: '',
      title: t('featureAdoptionTitle'),
      text: '',
    },
    {
      key: 'mating',
      icon: '',
      title: t('featureMatingTitle'),
      text: '',
    },
    {
      key: 'lost',
      icon: '',
      title: t('featureLostTitle'),
      text: '',
    },
    {
      key: 'found',
      icon: '',
      title: t('featureFoundTitle'),
      text: '',
    },
  ]

  return (
    <section id="features">
      <div className="tag-line" role="banner">
        <h3>{t('featuresTagLineHeader')}</h3>
        <p>{t('featuresTagLineText')}</p>
      </div>
      <div className="main-features" role="grid">
        {mainFeatures.map(({ key, title, text }) => (
          <div className="feature" role="gridcell" key={key}>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

Features.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Features)

import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import adoptionIcon from '../../images/adoption-icon.svg'
import lostIcon from '../../images/lost-icon.svg'
import foundIcon from '../../images/found-icon.svg'

const Features: FC = () => {
  const { t } = useTranslation()

  const mainFeatures = [
    {
      key: 'adoption',
      icon: adoptionIcon,
      title: t('featureAdoptionTitle'),
      text: t('featureAdoptionText'),
    },
    {
      key: 'lost',
      icon: lostIcon,
      title: t('featureLostTitle'),
      text: t('featureLostText'),
    },
    {
      key: 'found',
      icon: foundIcon,
      title: t('featureFoundTitle'),
      text: t('featureFoundText'),
    },
  ]

  return (
    <section id="features">
      <div className="tag-line" role="banner">
        <h3>{t('featuresTagLineHeader')}</h3>
        <p>{t('featuresTagLineText')}</p>
      </div>
      <div className="main-features" role="grid">
        {mainFeatures.map(({ key, icon, title, text }) => (
          <div className="feature" role="gridcell" key={key}>
            <div className="feature-img" role="img">
              {icon && <img src={icon} alt="" loading="lazy" />}
            </div>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features

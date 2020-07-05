import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { withTranslation } from 'react-i18next'

const Hero = ({ t }) => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      logo: file(relativePath: { eq: "hero-logo.png" }) {
        childImageSharp {
          fixed(height: 72, width: 72) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
      main: file(relativePath: { eq: "hero-main.png" }) {
        childImageSharp {
          fixed(width: 220) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div className="hero-container" role="heading" aria-level="1">
      <section id="hero" role="grid">
        <div className="hero-left" role="gridcell">
          <Img fixed={data?.logo?.childImageSharp?.fixed} className="hero-logo-img" alt="" />
          {/* eslint-disable-next-line react/no-danger */}
          <h1 dangerouslySetInnerHTML={{ __html: t('homeHeroHeader') }} />
          <p>{t('homeHeroSubHeader')}</p>
        </div>
        <Img fixed={data?.main?.childImageSharp?.fixed} className="hero-main-img with-phone-border" alt="" />
      </section>
    </div>
  )
}

Hero.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Hero)

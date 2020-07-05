import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'
import { Trans, withTranslation } from 'react-i18next'
import StoreBadges from '../store-badges'
import colors from '../../config/colors'

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
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
      bg: file(relativePath: { eq: "hero-bg.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1280) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <div className="hero-container" role="banner">
      <BackgroundImage
        Tag="section"
        fluid={data?.bg?.childImageSharp?.fluid}
        backgroundColor={colors?.background}
        id="hero"
        role="grid"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="hero-left" role="gridcell">
          <Img fixed={data?.logo?.childImageSharp?.fixed} className="hero-logo-img" alt="" />
          <h1>
            <Trans i18nKey="homeHeroHeader">
              {/* eslint-disable */}
              The world of <mark>pets</mark> in your pocket
              {/* eslint-enable */}
            </Trans>
          </h1>
          <p>{t('homeHeroSubHeader')}</p>
          <StoreBadges className="store-badges-mobile" />
        </div>
        <Img fixed={data?.main?.childImageSharp?.fixed} className="hero-main-img with-phone-border" alt="" />
      </BackgroundImage>
      <StoreBadges className="store-badges-desktop" />
    </div>
  )
}

Hero.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Hero)

import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import BackgroundImage from 'gatsby-background-image'
import { Trans, withTranslation } from 'react-i18next'
import StoreBadges from '../store-badges'
import colors from '../../config/colors'
import { convertToBgImage } from '../../config/utils'

const Hero = ({ t }) => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      logo: file(relativePath: { eq: "square-logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            height: 72
            width: 72
            placeholder: BLURRED
            layout: FIXED
          )
        }
      }
      main: file(relativePath: { eq: "hero-main.png" }) {
        childImageSharp {
          gatsbyImageData(width: 220, placeholder: BLURRED, layout: FIXED)
        }
      }
      secondary: file(relativePath: { eq: "hero-secondary.png" }) {
        childImageSharp {
          gatsbyImageData(width: 220, placeholder: BLURRED, layout: FIXED)
        }
      }
      bg: file(relativePath: { eq: "hero-bg.png" }) {
        childImageSharp {
          gatsbyImageData(quality: 90, placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
    }
  `)

  const image = getImage(data?.bg)
  const bgImage = convertToBgImage(image)

  return (
    <div className="hero-container" role="banner">
      <BackgroundImage
        {...bgImage}
        Tag="section"
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
          <GatsbyImage
            image={data?.logo?.childImageSharp?.gatsbyImageData}
            className="hero-logo-img"
            alt=""
          />
          <h1>
            <Trans i18nKey="homeHeroHeader">
              {/* eslint-disable */}A world of <mark>pets</mark> in your pocket
              {/* eslint-enable */}
            </Trans>
          </h1>
          <div className="mobile-container" role="grid">
            <div className="mobile-left" role="gridcell">
              <p>{t('homeHeroSubHeader')}</p>
              <StoreBadges className="store-badges-mobile" />
              <div className="img-cutter with-phone-border" role="img">
                <GatsbyImage
                  image={data?.main?.childImageSharp?.gatsbyImageData}
                  className="hero-main-img mobile"
                  alt=""
                />
              </div>
            </div>
            <div className="mobile-right" role="gridcell">
              <div className="with-phone-border" role="img">
                <GatsbyImage
                  image={data?.secondary?.childImageSharp?.gatsbyImageData}
                  className="hero-secondary-img mobile"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hero-main-img with-phone-border desktop" role="img">
          <GatsbyImage
            image={data?.main?.childImageSharp?.gatsbyImageData}
            className=""
            alt=""
          />
        </div>
      </BackgroundImage>
      <StoreBadges className="store-badges-desktop" />
    </div>
  )
}

Hero.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Hero)

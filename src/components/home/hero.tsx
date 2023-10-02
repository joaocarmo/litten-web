import type { FC } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import BackgroundImage from 'gatsby-background-image'
import { Trans, useTranslation } from 'react-i18next'
import useIsClient from '../../hooks/use-is-client'
import colors from '../../config/colors'
import { convertToBgImage } from '../../config/utils'
import StoreBadges from '../store-badges'

const query = graphql`
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
`

const Hero: FC = () => {
  const { t } = useTranslation()
  const data = useStaticQuery(query)
  const image = getImage(data?.bg)
  const bgImage = image ? convertToBgImage(image) : undefined

  const { isClient, key } = useIsClient()

  if (!isClient) {
    return (
      <div className="hero-container fade-in" role="banner" key={key}>
        <div id="hero" role="grid">
          <p className="hero-loader">
            {
              // eslint-disable-next-line react/jsx-no-literals
              '🐶 🐱 🐷 🐭 🐰'
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="hero-container" role="banner" key={key}>
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

export default Hero

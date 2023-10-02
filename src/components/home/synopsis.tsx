import type { FC } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useTranslation } from 'react-i18next'
import StoreBadges from '../store-badges'

const Synopsis: FC = () => {
  const { t } = useTranslation()

  const data = useStaticQuery(graphql`
    query SynopsisQuery {
      file(relativePath: { eq: "synopsis-img.png" }) {
        childImageSharp {
          gatsbyImageData(height: 520, placeholder: BLURRED, layout: FIXED)
        }
      }
    }
  `)

  return (
    <section id="synopsis" role="grid">
      <div className="left-synopsis" role="gridcell">
        <div className="synopsis-img with-phone-border" role="img">
          <GatsbyImage
            image={data?.file?.childImageSharp?.gatsbyImageData}
            loading="lazy"
            alt=""
          />
        </div>
      </div>
      <div className="right-synopsis" role="gridcell">
        <h3>{t('synopsisTitle')}</h3>
        <p>{t('synopsisText')}</p>
        <StoreBadges />
      </div>
    </section>
  )
}

export default Synopsis

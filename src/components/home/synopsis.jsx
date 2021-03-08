import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { withTranslation } from 'react-i18next'
import StoreBadges from '../store-badges'

const Synopsis = ({ t }) => {
  const data = useStaticQuery(graphql`
    query SynopsisQuery {
      file(relativePath: { eq: "synopsis-img.png" }) {
        childImageSharp {
          gatsbyImageData(height: 520, placeholder: TRACED_SVG, layout: FIXED)
        }
      }
    }
  `)

  return (
    <section id="synopsis" role="grid">
      <div className="left-synopsis" role="gridcell">
        <GatsbyImage
          image={data?.file?.childImageSharp?.gatsbyImageData}
          className="synopsis-img with-phone-border"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="right-synopsis" role="gridcell">
        <h3>{t('synopsisTitle')}</h3>
        <p>{t('synopsisText')}</p>
        <StoreBadges />
      </div>
    </section>
  )
}

Synopsis.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Synopsis)

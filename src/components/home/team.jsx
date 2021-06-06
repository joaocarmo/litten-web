import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { withTranslation } from 'react-i18next'

const Team = ({ t }) => {
  const data = useStaticQuery(graphql`
    query TeamQuery {
      james: file(relativePath: { eq: "james.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            height: 260
            width: 260
            placeholder: TRACED_SVG
            layout: FIXED
          )
        }
        publicURL
      }
      joao: file(relativePath: { eq: "joao.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            height: 260
            width: 260
            placeholder: TRACED_SVG
            layout: FIXED
          )
        }
        publicURL
      }
      tania: file(relativePath: { eq: "tania.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            height: 260
            width: 260
            placeholder: TRACED_SVG
            layout: FIXED
          )
        }
        publicURL
      }
    }
  `)

  const teamMembers = [
    {
      key: 'joao',
      photo: {
        childImageSharp: data?.joao?.childImageSharp,
        publicURL: data?.joao?.publicURL,
      },
      name: 'João Carmo',
      jobTitle: 'co-CEO & Lead Engineer',
    },
    {
      key: 'tania',
      photo: {
        childImageSharp: data?.tania?.childImageSharp,
        publicURL: data?.tania?.publicURL,
      },
      name: 'Tânia Matos',
      jobTitle: 'co-CEO & Lead Designer',
    },
    {
      key: 'james',
      photo: {
        childImageSharp: data?.james?.childImageSharp,
        publicURL: data?.james?.publicURL,
      },
      name: 'James Briscoe',
      jobTitle: 'Lead English Editor',
    },
  ]

  const getPhotoHolder = (photo) => {
    if (photo?.childImageSharp?.fixed) {
      return (
        <GatsbyImage
          image={photo.childImageSharp.gatsbyImageData}
          className="photo-holder"
          alt=""
          loading="lazy"
        />
      )
    }

    if (photo?.publicURL) {
      return (
        <img
          src={photo.publicURL}
          className="photo-holder"
          alt=""
          loading="lazy"
        />
      )
    }

    return <div className="photo-placeholder" role="img" />
  }

  return (
    <section id="team">
      <h3>{t('teamHeader')}</h3>
      <div className="team-board" role="grid">
        {teamMembers.map(({ key, photo, name, jobTitle }) => (
          <div className="team-member" role="gridcell" key={key}>
            {getPhotoHolder(photo)}
            <h5>{name}</h5>
            <p>{jobTitle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

Team.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Team)

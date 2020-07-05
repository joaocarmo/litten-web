import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { withTranslation } from 'react-i18next'

const Team = ({ t }) => {
  const data = useStaticQuery(graphql`
    query TeamQuery {
      joao: file(relativePath: { eq: "joao.jpg" }) {
        childImageSharp {
          fixed(height: 260, width: 260) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
        publicURL
      }
      tania: file(relativePath: { eq: "tania.jpg" }) {
        childImageSharp {
          fixed(height: 260, width: 260) {
            ...GatsbyImageSharpFixed
          }
        }
        publicURL
      }
    }
  `)

  const teamMembers = [
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
      key: 'joao',
      photo: {
        childImageSharp: data?.joao?.childImageSharp,
        publicURL: data?.joao?.publicURL,
      },
      name: 'João Carmo',
      jobTitle: 'co-CEO & Lead Engineer',
    },
  ]

  const getPhotoHolder = (photo) => {
    if (photo?.childImageSharp?.fixed) {
      return (
        <Img
          fixed={photo.childImageSharp.fixed}
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
        {teamMembers.map(({
          key, photo, name, jobTitle,
        }) => (
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

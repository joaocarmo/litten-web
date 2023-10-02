import type { FC } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useTranslation } from 'react-i18next'

const Team: FC = () => {
  const { t } = useTranslation()

  const data = useStaticQuery(graphql`
    query TeamQuery {
      james: file(relativePath: { eq: "james.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            height: 260
            width: 260
            placeholder: BLURRED
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
            placeholder: BLURRED
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
            placeholder: BLURRED
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
      jobTitle: 'CEO & Lead Engineer',
    },
    {
      key: 'tania',
      photo: {
        childImageSharp: data?.tania?.childImageSharp,
        publicURL: data?.tania?.publicURL,
      },
      name: 'Tânia Matos',
      jobTitle: 'Lead Designer',
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

  const getPhotoHolder = (photo: any) => {
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

export default Team

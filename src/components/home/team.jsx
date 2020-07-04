import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import taniaPhoto from '../../images/tania.png'
import joaoPhoto from '../../images/joao.png'

const teamMembers = [
  {
    key: 'tania',
    photo: taniaPhoto,
    name: 'Tânia Matos',
    jobTitle: 'co-CEO & Lead Designer',
  },
  {
    key: 'joao',
    photo: joaoPhoto,
    name: 'João Carmo',
    jobTitle: 'co-CEO & Lead Engineer',
  },
]

const Team = ({ t }) => (
  <section id="team">
    <h3>{t('teamHeader')}</h3>
    <div className="team-board" role="grid">
      {teamMembers.map(({
        key, photo, name, jobTitle,
      }) => (
        <div className="team-member" role="gridcell" key={key}>
          {photo && <img src={photo} className="photo-holder" alt="" />}
          {!photo && <div className="photo-placeholder" role="img" />}
          <h5>{name}</h5>
          <p>{jobTitle}</p>
        </div>
      ))}
    </div>
  </section>
)

Team.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Team)

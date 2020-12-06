import { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { Trans, withTranslation } from 'react-i18next'
import Layout from '../components/layout'
import Footer from '../components/home/footer'
import Form from '../components/form'
import Select from '../components/select'

const encode = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')

const JoinBeta = ({ t }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    device: '',
    language: '',
  })

  const handleChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value })
  }

  const isValidForm = () =>
    Object.keys(formValues).every((key) => !!formValues[key])

  const handleOnSubmit = (event) => {
    event.preventDefault()

    if (!isValidForm()) {
      // eslint-disable-next-line no-alert
      window.alert(t('joinBetaProgramInvalidForm'))
      return
    }

    const { target: form } = event

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...formValues,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      // eslint-disable-next-line no-alert
      .catch((error) => window.alert(error))
  }

  const languages = [
    {
      key: 'ENGLISH',
      label: t('langEnglish'),
      value: 'ENGLISH',
    },
    {
      key: 'PORTUGUESE',
      label: t('langPortuguese'),
      value: 'PORTUGUESE',
    },
  ]

  const mobileDevices = [
    {
      key: 'ANDROID',
      label: 'Android',
      value: 'ANDROID',
    },
    {
      key: 'IOS',
      label: 'iOS',
      value: 'IOS',
    },
  ]

  return (
    <Layout>
      <div className="page-centered" role="article">
        <article className="contained title-container">
          <h1>
            <Trans i18nKey="joinBetaProgramTitle">
              {/* eslint-disable */}
              Join our <mark>beta program</mark>!{/* eslint-enable */}
            </Trans>
          </h1>
          <p>{t('joinBetaProgramDescription')}</p>
          <p>{t('joinBetaProgramDescriptionCTA')}</p>
        </article>
        <section className="contained">
          <Form
            name="join-beta"
            action="/thank-you/"
            onSubmit={handleOnSubmit}
            className="join-beta"
          >
            <p>{t('joinBetaFormHelp')}</p>
            <p hidden>
              <label htmlFor="bot-field">
                {/* eslint-disable */}
                Don't fill this out
                {/* eslint-enable */}
                <input
                  id="bot-field"
                  name="bot-field"
                  onChange={handleChange}
                />
              </label>
            </p>
            <p>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={t('joinBetaProgramName')}
                value={formValues.name}
                onChange={handleChange}
              />
            </p>
            <p>
              <input
                id="email"
                type="email"
                name="email"
                placeholder={t('joinBetaProgramEmail')}
                value={formValues.email}
                onChange={handleChange}
              />
            </p>
            <p>
              <Select
                id="device"
                name="device"
                options={mobileDevices}
                placeholder={t('joinBetaProgramDevice')}
                value={formValues.device}
                onChange={handleChange}
              />
            </p>
            <p>
              <Select
                id="language"
                name="language"
                options={languages}
                placeholder={t('joinBetaProgramLanguage')}
                value={formValues.language}
                onChange={handleChange}
              />
            </p>
            <p>
              <button type="submit">{t('joinBetaProgramSend')}</button>
            </p>
          </Form>
          <Footer className="join-beta" />
        </section>
      </div>
    </Layout>
  )
}

JoinBeta.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(JoinBeta)

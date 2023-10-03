import { useState } from 'react'
import type { ChangeEventHandler, FC, FormEventHandler } from 'react'
import { navigate } from 'gatsby'
import { Trans, useTranslation } from 'react-i18next'
import StaticContainer from '../components/static-container'
import Layout from '../components/layout'
import Footer from '../components/home/footer'
import Form from '../components/form'
import Input from '../components/input'
import Select from '../components/select'
import { formEncode } from '../config/utils'
import { betaEnabled } from '../config/constants'

interface FormValues {
  name: string
  email: string
  device: string
  language: string
}

const JoinBeta: FC = () => {
  const { t } = useTranslation()
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    device: '',
    language: '',
  })

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value })
  }

  const isValidForm = () =>
    Object.keys(formValues).every(
      (key) => !!formValues[key as keyof FormValues],
    )

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    if (!isValidForm()) {
      // eslint-disable-next-line no-alert
      window.alert(t('joinBetaProgramInvalidForm'))
      return
    }

    const form = event.target as HTMLElement

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formEncode({
        'form-name': form.getAttribute('name')!,
        ...formValues,
      }),
    })
      .then(() => navigate(form.getAttribute('action')!))
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
      <StaticContainer>
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
            {betaEnabled && (
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
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder={t('joinBetaProgramName')}
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <Input
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
            )}
            <Footer className="join-beta" />
          </section>
        </div>
      </StaticContainer>
    </Layout>
  )
}

export default JoinBeta

import { useEffect, useMemo, useState } from 'react'
import type { FC } from 'react'
import { Link } from 'gatsby'
import { Trans, useTranslation } from 'react-i18next'
import Layout from '../components/layout'
import { HOME } from '../config/link-refs'
import badPuppy from '../images/404.svg'

const NotFound: FC = () => {
  const { t } = useTranslation()
  const [isClient, setClient] = useState(false)

  const notFoundContent = useMemo<string>(() => {
    const notFoundRandom: string[] = t('notFoundContent', {
      returnObjects: true,
    })
    const randomIndex = Math.floor(Math.random() * notFoundRandom.length)

    return notFoundRandom[randomIndex]
  }, [t])

  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <Layout>
      <main className="not-found-grid">
        <section className="not-found-text">
          <h1>
            <Trans i18nKey="notFoundTitle" values={{ errorCode: '404' }}>
              {/* eslint-disable */}
              Lost Litten <mark>errorCode</mark>!{/* eslint-enable */}
            </Trans>
          </h1>
          <p>
            {!isClient && <span className="cursor" />}
            {isClient && notFoundContent}
          </p>
        </section>
        <article className="not-found-image">
          <img src={badPuppy} alt="404" className="not-found" />
        </article>
        <nav className="not-found-button">
          <Link to={HOME} className="button">
            {t('notFoundButton')}
          </Link>
        </nav>
      </main>
    </Layout>
  )
}

export default NotFound

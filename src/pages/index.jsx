import Layout from '../components/layout'
import LanguageSelector from '../components/language-selector'
import Hero from '../components/home/hero'
import Features from '../components/home/features'
import Synopsis from '../components/home/synopsis'
import Team from '../components/home/team'
import Careers from '../components/home/careers'
import Footer from '../components/home/footer'

const Home = () => (
  <Layout>
    <LanguageSelector />
    <div className="page-padded" role="article">
      <Hero />
      <Features />
      <Synopsis />
      <Team />
      <Careers />
      <Footer />
    </div>
  </Layout>
)

export default Home

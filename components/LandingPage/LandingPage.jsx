import Header from './Header'
import IntroBody from './IntroBody'
import StatsBody from './StatsBody'
import InfoBody from './InfoBoxesBody'

const LandingPage = () => {
  return (
    <div className="w-screen flex flex-col bg-white">
      <Header />
      {/* add more here to complete the landing page */}
      <IntroBody />
      <StatsBody />
      <InfoBody />
    </div>
  )
}

export default LandingPage

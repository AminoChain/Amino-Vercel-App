import DonateNav from '../donate/DonateNav'
import DonateFooter from '../donate/DonateFooter'
import DonorProfileBody from './DonorProfileBody'

const DonorProfile = () => {
  return (
    <div className="w-full">
      <DonateNav />
      <DonorProfileBody />
      <DonateFooter />
    </div>
  )
}

export default DonorProfile

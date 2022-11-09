import BioBankNav from './BioBankNav'
import BioBankBanner from './BioBankBanner'
import BioBankAppointments from './appointments/BioBankAppointments'
import BioBankFooter from './BioBankFooter'

const BioBankPage = () => {
  return (
    <div className="w-screen">
      <BioBankBanner />
      <BioBankNav />
      <BioBankAppointments />
      <BioBankFooter />
    </div>
  )
}

export default BioBankPage

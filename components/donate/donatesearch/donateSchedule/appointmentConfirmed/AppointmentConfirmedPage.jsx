import DonateFooter from '../donate/DonateFooter'
import DonateNav from '../donate/DonateNav'
import DonateSearchSteps from '../donate/donatesearch/DonateSearchSteps'
import AppointmentInstructions from '../donate/donatesearch/donateSchedule/appointmentConfirmed/AppointmentInstructions'

const AppointmentConfirmedPage = ({ bioBank, progress }) => {
  return (
    <div className="w-full flex flex-col">
      <DonateNav />
      <DonateSearchSteps progress={progress} />
      <AppointmentInstructions bioBank={bioBank} />
      <DonateFooter />
    </div>
  )
}

export default AppointmentConfirmedPage

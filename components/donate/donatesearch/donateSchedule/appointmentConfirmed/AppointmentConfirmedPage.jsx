import DonateFooter from "../../../DonateFooter"
import DonateNav from "../../../DonateNav"
import DonateSearchSteps from "../../DonateSearchSteps"
import AppointmentInstructions from "./AppointmentInstructions"

const AppointmentConfirmedPage = ({ bioBank, progress }) => {
  return (
    <div className="w-full flex flex-col">
      <DonateNav />
      <DonateSearchSteps progress={progress}/>
      <AppointmentInstructions bioBank={bioBank}/>
      <DonateFooter/>
    </div>
  )
}

export default AppointmentConfirmedPage

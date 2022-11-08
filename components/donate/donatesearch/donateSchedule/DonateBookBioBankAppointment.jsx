import DonateBioBankInfo from './DonateBioBankInfo'
import DonateScheduleAppointment from './DonateScheduleAppointment'
const DonateBookBioBankAppointment = ({ bioBank }) => {
  return (
    <div className="flex flex-col px-20 py-5">
      <div className="px-2 pb-4 font-satoshiMedium text-[24px] text-black">
        Appointment Details
      </div>
      <div className="bioBankAppointment rounded-[55px] flex">
        <DonateBioBankInfo bioBank={bioBank} />
        <DonateScheduleAppointment bioBank={bioBank} />
      </div>
    </div>
  )
}

export default DonateBookBioBankAppointment

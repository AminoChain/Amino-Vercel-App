import BioBankAppointment from './BioBankAppointment'

const BioBankAppointmentList = () => {
  let appointments = [1, 2, 3, 4, 5, 6, 7, 8]
  let times = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "4:30 PM"]

  const appointmentList = appointments.map((item, index) => (
    <BioBankAppointment key={index} time={times[index]}/>
  ))
  
  return (
    <div className="w-full px-20 mt-5">
      <div className="w-full flex rounded-full border-t-[1px] border-b-[1px] border-main py-2 px-8">
        <div className=" font-satoshiMedium text-main basis-3/12">
          Date & Time
        </div>
        <div className=" font-satoshiMedium text-main basis-7/12">
          Donor address
        </div>
        <div className=" font-satoshiMedium text-main basis-2/12 flex justify-center">
          Action
        </div>
      </div>
      <div>{appointmentList}</div>
    </div>
  )
}

export default BioBankAppointmentList

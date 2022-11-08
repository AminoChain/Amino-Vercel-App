import Image from "next/image"
import manWithCalendar from '../../../../../assets/manWithCalendar.png'

const AppointmentDetails = ({bioBank}) => {

  return(
    <div className="w-1/2 flex flex-col items-center">
        <div className="pt-5">
          <Image src={manWithCalendar} />
        </div>
        <div>
          <div className=' font-satoshiBold text-black text-[20px]'>Appointment Details</div>
          <div>
            <div className=' font-satoshiMedium text-main pt-3 pb-1'>BioBank</div>
            <div className=' font-satoshiMedium text-black'>{bioBank.name}</div>
          </div>
          <div>
            <div className=' font-satoshiMedium text-main pt-3 pb-1'>Date and time</div>
            <div className=' font-satoshiMedium text-black'>
              {/* retrieve info on scheduled time from the database */}
              Your appointment is confirmed for Nov 1st, at 10:30 AM
            </div>
          </div>
          <div>
            <div className=' font-satoshiMedium text-main pt-3 pb-1'>Address</div>
            <div className=' font-satoshiMedium text-black'>
              {bioBank.location}
            </div>
          </div>
        </div>
      </div>
  )
}

export default AppointmentDetails
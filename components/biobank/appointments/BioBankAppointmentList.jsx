import Image from 'next/image'
import dot from '../../../assets/footerDot.png'
const BioBankAppointmentList = () => {
  return (
    <div className="w-full px-20">
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
      <div className="w-full flex  border-b-[1px] border-main py-10 px-8">
        <div className=" font-satoshiMedium text-main basis-3/12 flex items-center">
          Nov 2nd
          <div className="flex items-center px-2">
            <Image src={dot} />
          </div>
          10:15 am
        </div>
        <div className=" font-satoshiMedium text-main basis-7/12">
          0x279A27Ee501E1a515429573691683971FE2aBbfd
        </div>
        <div className=" font-satoshiMedium text-main basis-2/12 flex justify-center">
          Action
        </div>
      </div>
    </div>
  )
}

export default BioBankAppointmentList

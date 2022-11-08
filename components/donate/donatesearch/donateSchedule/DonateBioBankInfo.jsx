import Image from 'next/image'
import googleMaps from '../../../../assets/googleMaps.png'
import bioBankSymbolBig from '../../../../assets/bioBankSymbolBig.png'

const DonateBioBankInfo = ({ bioBank }) => {
  return (
    <div className="w-1/4 flex flex-col items-start p-20">
      <div>
        <Image src={bioBankSymbolBig} width={200} height={178} />
      </div>
      <div className="flex flex-col pt-4">
        <div className=" font-satoshiMedium text-main text-[16px]">Name</div>
        <div className="font-satoshiBold text-black text-[24px]">
          {bioBank.name}
        </div>
      </div>
      <div className="flex flex-col py-4">
        <div className="font-satoshiMedium text-main text-[16px]">
          opening hours
        </div>
        <div className="font-satoshiRegular text-black text-[20px]">
          Mon to Fri 10 am to 6pm
        </div>
      </div>

      <div className="flex flex-col items-start">
        <div className="font-satoshiMedium text-main text-[16px]">Address</div>
        <div className="flex items-center">
          <div className="w-1/4">
            <Image src={googleMaps} width={20} alt="google logo" />
          </div>
          <div className="px-2 underline-offset-1 underline">
            {bioBank.location}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonateBioBankInfo

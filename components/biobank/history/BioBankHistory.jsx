import Image from 'next/image'
import Link from 'next/link'
import dot from '../../../assets/footerDot.png'
import share from '../../../assets/share.png'

const BioBankHistory = ({ item }) => {
  const donor =
    item.donor.slice(0, 4) +
    '...' +
    item.donor.slice(item.donor.length - 4, item.donor.length)
  const date = new Date(item.timestamp * 1000)

  return (
    <div className="w-full flex items-center border-b-[1px] border-main py-8 px-8">
      <div className=" font-satoshiMedium text-black basis-3/12 flex items-center">
        {date.toLocaleDateString()}
        <div className="flex items-center px-2">
          <Image src={dot} alt="dot image" draggable="false" />
        </div>
        {date.toLocaleTimeString()}
      </div>
      <div className=" font-satoshiMedium text-black basis-4/12">{donor}</div>
      <div className="font-satoshiMedium text-black basis-[22%]">35cc</div>
      <Link href="/marketplace">
        <div className="flex justify-center basis-2/12">
          <div className="w-fit flex justify-center py-3 px-7 border border-main rounded-full cursor-pointer">
            <div className="flex h-[22px] items-center">
              <div className="font-satoshiMedium text-black pr-2">
                Marketplace
              </div>
              <div className="flex items-center">
                <Image src={share} alt="share icon" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BioBankHistory

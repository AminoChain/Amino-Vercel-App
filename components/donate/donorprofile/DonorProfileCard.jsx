import { ethers } from 'ethers'
import Link from 'next/link'
import { biobankNames } from '../../../constants/index'

const DonorProfileCard = ({ item }) => {
  const biobank = item.bioBank
  const price = ethers.utils.formatUnits(item.price, 18).toString() //change to 6 decimals later

  const BioBankNames = biobankNames

  return (
    <Link href={`/marketplace/nft?tokenId=${item.tokenId}`}>
      <div className="w-fit min-w-[256px] max-w-[256px] bg-white flex flex-col px-5 pt-2 pb-4 mb-[2rem] mr-[2rem] drop-shadow-nftCard cursor-pointer rounded-2xl">
        <div className="py-3">
          <div className="flex flex-row justify-between mb-2">
            <div className="font-satoshiRegular text-base text-main h-min self-end">
              Biobank
            </div>
            <div className=" font-satoshiMedium text-xl rounded-[20px] py-1 px-4 text-main bg-ccBackground self-top">
              {item.size} CC
            </div>
          </div>
          <div className=" font-satoshiBold text-xl text-black">
            {BioBankNames[biobank]}
          </div>
        </div>
        <div className="py-3">
          <div className="font-satoshiRegular text-base text-main">Price</div>
          <div className="font-satoshiBold text-black text-xl mt-[0.4rem] truncate">
            ${parseFloat(price).toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default DonorProfileCard

import Link from 'next/link'
import { ethers } from 'ethers'

const NftCard = ({ item }) => {
  const percentage = (item.matchRating / 6) * 100
  const biobank = item.bioBank
  const price = ethers.utils.formatUnits(item.price, 18).toString() //change to 6 decimals later

  const BioBankNames = {
    '0x53c847035e9c2ea3aead920d395bccd7768ee63f': 'Coriell',
    '0x35a5b80732efe78d171327c39de408227c299aac': 'Greenville',
    '': 'National',
  }

  return (
    <Link href={`/marketplace/nft?tokenId=${item.tokenId}`}>
      <div className="w-fit min-w-[223px] max-w-[223px] bg-white flex flex-col px-5 py-2 drop-shadow-nftCard cursor-pointer rounded-2xl">
        <div className="py-3">
          <div className="py-1 font-satoshiRegular text-base text-main">
            Biobank
          </div>
          <div className=" font-satoshiBold text-xl text-black">
            {BioBankNames[biobank]}
          </div>
        </div>
        <div className="py-3">
          <div className="py-1 font-satoshiRegular text-base text-main">
            Sample Size
          </div>
          <div className=" font-satoshiBold text-xl text-black">
            {item.size} CC
          </div>
        </div>
        <div className="py-3">
          <div className="pb-2 font-satoshiRegular text-base text-main">
            Match Rate
          </div>
          <div className=" font-satoshiBold text-xl text-black">
            {percentage}%
          </div>
          <div className="h-2 w-full bg-slate-200 rounded">
            <div
              style={{ width: `${percentage}%` }}
              className={`h-2 bg-primary rounded`}
            ></div>
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

export default NftCard

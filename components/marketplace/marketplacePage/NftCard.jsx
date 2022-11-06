import Link from 'next/link'
import { ethers } from 'ethers'

const NftCard = ({ item }) => {
  const percentage = (item.matchRating / 6) * 100
  const biobank = item.bioBank
  const price = ethers.utils.formatUnits(item.price, 6).toString()

  const BioBankNames = {
    '0x53c847035e9c2ea3aead920d395bccd7768ee63f': 'Coriell',
    '': 'Greenville',
    '': 'National',
  }

  return (
    <Link href={`/marketplace/nft?tokenId=${item.tokenId}`}>
      <div className="w-fit min-w-[223px] bg-white flex flex-col px-5 py-2 drop-shadow-nftCard rounded-2xl">
        <div className="py-3">
          <div className="py-1 font-satoshiRegular text-base text-main">
            Biobank
          </div>
          <div className=" font-satoshiBold text-xl text-black">
            {BioBankNames[biobank]}
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
          <div className="font-satoshiBold text-black text-xl mt-[0.4rem]">
            ${parseFloat(price).toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NftCard

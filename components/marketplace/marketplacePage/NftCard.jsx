import Link from 'next/link'

const NftCard = ({ item }) => {
  const percentage = (item.matchRating / 6) * 100
  const biobank = item.bioBank.slice(0, 6) + "..."
  const price = item.price

  return (
    <Link href={`/marketplace/nft?tokenId=${item.tokenId}`}>
      <div className="w-fit min-w-[223px] bg-white flex flex-col p-5 drop-shadow-nftCard rounded-lg">
        <div className="py-3">
          <div className="py-2 font-satoshiLight text-sm text-main">
            Biobank
          </div>
          <div className=" font-satoshiRegular text-xl text-black">
            {biobank}
          </div>
        </div>
        <div className="py-3">
          <div className=" font-satoshiLight text-main">Match Rate</div>
          <div className=" font-satoshiBold text-black">{percentage}%</div>
          <div className="h-2 w-full bg-slate-200 rounded">
            <div
              style={{ width: `${percentage}%` }}
              className={`h-2 bg-primary rounded`}
            ></div>
          </div>
        </div>
        <div className="py-3">
          <div className=" font-satoshiLight text-main">Price</div>
          <div className="font-satoshiBold text-black">${price}</div>
        </div>
      </div>
    </Link>
  )
}

export default NftCard

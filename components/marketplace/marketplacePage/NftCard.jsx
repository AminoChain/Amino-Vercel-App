import Link from "next/link"

const NftCard = ({ item }) => {
  const percentage = (item.matchRating / 6) * 100
  return (
    <Link href={`/marketplace/item/${item.nftId}`}>
      <div className="w-fit bg-white flex flex-col p-5 drop-shadow-nftCard rounded-lg">
        <div className="my-3">
          <div className="flex flex-row items-center">
            Type<div className="w-3 h-3 mx-2 bg-pinkHLAA"></div>
          </div>
          <div>HLA A*01:01:03</div>
        </div>
        <div className="my-3">
          <div>Match Rate</div>
          <div>{percentage}%</div>
          <div className="h-2 w-full bg-slate-300 rounded">
            <div
              style={{ width: `${percentage}%` }}
              className={`h-2 bg-slate-800 rounded`}
            ></div>
          </div>
        </div>
        <div className="my-3">
          <div>Price</div>
          <div>$8,500</div>
        </div>
      </div>
    </Link>
  )
}

export default NftCard

const StatsBody = () => {
  return (
    <div className="flex w-full bg-center px-[10%] mt-20">
      <div className="flex w-full p-16 justify-evenly align-middle text-center border-solid border-x-[1px] rounded-3xl border-main">
        <div className="flex flex-col ">
          <p className="font-satoshiBlack text-black text-3xl">1500</p>
          <p className="text-2xl  text-black font-satoshiRegular pt-4">
            Tokenized Donors
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-satoshiBlack text-black text-3xl">$4.7M</p>
          <p className="text-2xl text-black font-satoshiRegular pt-4">
            Incentives Paid
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-satoshiBlack text-black text-3xl">950</p>
          <p className="text-2xl text-black font-satoshiRegular pt-4">
            Stem Cells Delivered
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatsBody

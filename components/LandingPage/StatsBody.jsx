const StatsBody = () => {
  return (
    <div className="flex w-screen bg-center px-[10%] mt-6">
      <div className="flex w-full p-16 justify-evenly align-middle text-center border-solid border-x-2 rounded-3xl border-main">
        <div className="flex flex-col ">
          <p className="font-black text-black text-3xl">1500</p>
          <p className="text-2xl  text-black font-normal pt-4">
            Tokenized Donors
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-black text-black text-3xl">$4.7M</p>
          <p className="text-2xl text-black font-normal pt-4">
            Incentives Paid
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-black text-black text-3xl">950</p>
          <p className="text-2xl text-black font-normal pt-4">
            Stem Cells Delivered
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatsBody

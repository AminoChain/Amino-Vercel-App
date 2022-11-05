const MarketplaceNav = () => {
  return (
    <div className="flex w-1/3 px-20 py-5 justify-between">
      <div className=" border-white border-b-4 hover:border-b-4 hover:border-main hover:text-black hover:border-solid transition p-2 rounded text-main text-2xl">
        Marketplace
      </div>
      <div className=" border-white border-b-4 hover:border-b-4 hover:border-main hover:text-black hover:border-solid transition p-2 rounded text-main text-2xl">
        Activity
      </div>
      <div className=" border-white border-b-4 hover:border-b-4 hover:border-main hover:text-black hover:border-solid transition p-2 rounded text-main text-2xl">
        Profile
      </div>
    </div>
  )
}

export default MarketplaceNav

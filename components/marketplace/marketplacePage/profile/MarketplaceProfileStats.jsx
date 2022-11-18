const MarketplaceProfileStats = ({ totalSpent, numPurchasedComplete }) => {
  return (
    <div className="flex">
      <div className="flex flex-col w-full px-12 py-8 border-r-[1px] border-l-[1px] border-main rounded-md ">
        <div className="w-full flex flex-row px-6 border-b-[1px] border-main">
          <div className="flex flex-col pr-20 pb-6">
            <div className=" font-satoshiMedium text-main text-base">
              Stem Cells Purchased
            </div>
            <div className=" font-satoshiBold text-primary text-[40px]">
              {numPurchasedComplete}
            </div>
          </div>
          <div className="flex flex-col">
            <div className=" font-satoshiMedium text-main text-base">
              Total Spent
            </div>
            <div className="flex">
              <div className=" font-satoshiBold text-primary text-[40px]">
                $
              </div>
              <div className=" font-satoshiBold text-black text-[40px]">
                {parseFloat(totalSpent)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row px-6 pt-8">
          <div className="flex flex-col mr-[5%]">
            <p className="font-satoshiMedium text-main text-base pb-1">Email</p>
            <div className="font-satoshiMedium text-black text-base">
              contact@buyeremailaddress.com
            </div>
          </div>
          <div className="flex flex-col mr-[5%]">
            <p className="font-satoshiMedium text-main text-base pb-1">Phone</p>
            <div className="font-satoshiMedium text-black text-base">
              +1-656-5296
            </div>
          </div>
          <div className="flex flex-col max-w-[18%]">
            <p className="font-satoshiMedium text-main text-base pb-1">
              Shipping Address
            </p>
            <div className="font-satoshiMedium text-black text-base">
              63, Sunset buvld, West Hollywood, street 15/B, LOS ANGELES, CA
              90028
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplaceProfileStats

const InfoBody = () => {
  return (
    <div className="flex w-full px-[10%] mt-[7rem]">
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-row justify-between">
          <div className="border-solid border-b-[1px] rounded-3xl border-main min-w-[42%]">
            <div className="flex flex-col ml-[5%]">
              <p className="text-main font-satoshiMedium text-2xl mb-[10px]">
                Donors
              </p>
              <p className="text-black font-satoshiMedium text-3xl max-w-[60%]">
                Donate stem cells with incentives
              </p>
              <p className="text-black text-base font-satoshiRegular my-[20px]">
                Get paid when your Stem Cells are purchased
              </p>
            </div>
          </div>
          <div className="border-solid border-b-[1px] rounded-3xl border-main min-w-[42%]">
            <div className="flex flex-col ml-[5%]">
              <p className="text-main font-satoshiMedium text-2xl mb-[10px]">
                BioBanks
              </p>
              <p className="text-black font-satoshiMedium text-3xl max-w-[60%] ">
                **
              </p>
              <p className="text-black text-base font-satoshiRegular my-[20px]">
                **
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row justify-between mt-[12rem]">
          <div className="border-solid border-b-[1px] rounded-3xl border-main min-w-[42%]">
            <div className="flex flex-col ml-[5%]">
              <p className="text-main font-satoshiMedium text-2xl mb-[10px]">
                Doctors
              </p>
              <p className="text-black font-satoshiMedium text-3xl max-w-[60%]">
                Purchase Stem Cells in a Decentralized way
              </p>
              <p className="text-black text-base font-satoshiRegular my-[20px]">
                Find the stem cells your patients need
              </p>
            </div>
          </div>
          <div className="border-solid border-b-[1px] rounded-3xl border-main min-w-[42%]">
            <div className="flex flex-col ml-[5%]">
              <p className="text-main font-satoshiMedium text-2xl mb-[10px]">
                Researchers
              </p>
              <p className="text-black font-satoshiMedium text-3xl max-w-[60%]">
                **
              </p>
              <p className="text-black text-base font-satoshiRegular my-[20px]">
                **
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoBody

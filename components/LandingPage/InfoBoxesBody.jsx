const InfoBody = () => {
  return (
    <div className="flex w-screen px-[10%] mt-[8rem]">
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-row justify-between">
          <div className="border-solid border-b-2 rounded-3xl border-main min-w-[40%]">
            <div className="flex flex-col ml-[5%]">
              <p className="text-main font-medium text-2xl mb-[10px]">Donors</p>
              <p className="text-black font-medium text-3xl max-w-[60%]">
                Donate stem cells with incentives
              </p>
              <p className="text-black text-base my-[20px]">
                Get paid when your Stem Cells are purchased
              </p>
            </div>
          </div>
          <div className="border-solid border-b-2 rounded-3xl border-main min-w-[40%]">
            <div className="flex flex-col ml-[5%]">
              <p className="text-main font-medium text-2xl mb-[10px]">
                BioBanks
              </p>
              <p className="text-black font-medium text-3xl max-w-[60%] ">**</p>
              <p className="text-black text-base my-[20px]">**</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row justify-between mt-[10rem]">
          <div className="border-solid border-b-2 rounded-3xl border-main min-w-[40%]">
            <div className="flex flex-col ml-[5%]">
              <p className="text-main font-medium text-2xl mb-[10px]">
                Doctors
              </p>
              <p className="text-black font-medium text-3xl max-w-[60%]">
                Purchase Stem Cells in a Decentralized way
              </p>
              <p className="text-black text-base my-[20px]">
                Find the semt cells your patients need
              </p>
            </div>
          </div>
          <div className="border-solid border-b-2 rounded-3xl border-main min-w-[40%]">
            <div className="flex flex-col ml-[5%]">
              <p className="text-main font-medium text-2xl mb-[10px]">
                Researchers
              </p>
              <p className="text-black font-medium text-3xl max-w-[60%]">**</p>
              <p className="text-black text-base my-[20px]">**</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoBody

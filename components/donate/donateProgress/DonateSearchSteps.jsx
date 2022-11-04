


const DonateSearchSteps = ({progress, barPercent, setBarPercent}) => {
  const bar = (progress/10) * 100
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row px-20">
        <div className="w-full flex flex-row items-start">
          <div className="flex justify-center items-center bg-main text-white h-10 w-10  rounded-full">
            1
          </div>
          <div className="flex flex-col justify-end text-black py-2 px-4">
            <div className="text-lg">Book Appointment</div>
            <div className="text-sm">
              Choose a donation center as per your preference
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row items-start">
          <div className="flex justify-center items-center bg-main text-white h-10 w-10  rounded-full">
            2
          </div>
          <div className="flex flex-col justify-end text-black py-2 px-4">
            <div className="text-lg text-main">
              Visit center and verify donation
            </div>
            <div className="text-sm">
              Donate Stem Cells at the selected center
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-20">
      <div className="w-full h-2 bg-slate-200 rounded">
        <div style={{width :`${bar}%`}} className={`h-2 bg-primary rounded`}/>
      </div>
      </div>
      
    </div>
  )
}

export default DonateSearchSteps

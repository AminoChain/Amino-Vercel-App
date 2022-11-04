
const DonateStart = ({progress, setProgress}) => {

  const increaseProgress = () => {setProgress(progress+1)}
  

  return(
    <section className="flex flex-col items-center">
        <div className="text-4xl text-black p-2">Ready to donate?</div>
        <div className="text-black p-2">
          Get paid when your Stem Cells are purchased
        </div>
        <div className='py-5' onClick={increaseProgress}>
            <div className="h-14 flex justify-between items-center rounded-full px-10 py-5 drop-shadow-donatebuttonIntroShadow bg-gradient-to-r from-gradientDonateStart to-gradientDonateEnd">
              Start Donation 
            </div>
        </div>
      </section>
  )
}

export default DonateStart
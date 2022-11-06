

const DonateBioBankCard = ({bioBank, setProgress}) => {
  
  const loadBioBankInfo = () => {

    //setProgress(4)
    //
  }

  return(
    <div onClick={loadBioBankInfo} className="flex-col" >
      {bioBank.location}
      {bioBank.name}
    </div>
  )
}

export default DonateBioBankCard
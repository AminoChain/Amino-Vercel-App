import Image from 'next/image'
import DonateBioBankCard from './DonateBioBankCard'

const DonateBioBankList = ({ bioBanks, setProgress, location }) => {
  const bioBankMatches = bioBanks.map((item, index) => (
    <DonateBioBankCard key={index} bioBank={item} setProgress={setProgress}/>
  ))

  return (
    <div className="w-full">
      <div>{location}</div>
      <div className="w-full flex justify-around">
        {bioBankMatches}
      </div>
    </div>
  )
}

export default DonateBioBankList

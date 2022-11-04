import Link from 'next/link'
import DonateNav from './DonateNav'
import DonateBody from './DonateBody'
import { useState } from 'react'

const DonatePage = () => {
  const [progress, setProgress] = useState(0)
  const [barPercent, setBarPercent] = useState('10')


  return (
    <div className="w-full">
      <DonateNav />
      <DonateBody progress={progress} setProgress={setProgress} barPercent={barPercent} setBarPercent={setBarPercent}/>
    </div>
  )
}

export default DonatePage

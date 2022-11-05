import Link from 'next/link'
import DonateNav from './DonateNav'
import DonateBody from './DonateBody'
import DonorFooter from './DonateFooter'
import { useState } from 'react'

const DonatePage = () => {
  const [progress, setProgress] = useState(0)
  const [barPercent, setBarPercent] = useState('10')

  return (
    <div className="w-[100vw] flex flex-col">
      <DonateNav />
      <DonateBody
        progress={progress}
        setProgress={setProgress}
        barPercent={barPercent}
        setBarPercent={setBarPercent}
      />
      <DonorFooter />
    </div>
  )
}

export default DonatePage

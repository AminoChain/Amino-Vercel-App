import DonateFooter from '../../DonateFooter'
import DonateNav from '../../DonateNav'
import DonateBookBioBankAppointment from './DonateBookBioBankAppointment'
import { useState, useEffect } from 'react'

const DonateBioBankPage = ({ bioBank }) => {
  // const [bioBank, setBioBank] = useState({})
  // useEffect(async () => {
  //   const getBioBank = async () => {
      
  //   await getBioBank()
  // }, [])

  return (
    <div>
      <DonateNav />
      <DonateBookBioBankAppointment bioBank={bioBank} />
      <DonateFooter />
    </div>
  )
}

export default DonateBioBankPage

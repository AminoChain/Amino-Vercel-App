import DonateFooter from '../../DonateFooter'
import DonateNav from '../../DonateNav'
import DonateBookBioBankAppointment from './DonateBookBioBankAppointment'

export async function getServerSideProps(context) {
  const { bioBankId } = context.query
  let bioBankData
  try {
    const body = { bioBankId }
    const res = await fetch('/api/singleBioBank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      bioBankData = await res.json()
      setBioBanks(data)
      setProgress(2)
    }
  } catch (error) {
    console.error(error)
  }

  return {
    props: { bioBank: bioBankData }, // will be passed to the page component as props
  }
}

const DonateBioBankPage = ({ bioBank }) => {
  return (
    <div>
      <DonateNav />
      <DonateBookBioBankAppointment />
      <DonateFooter />
    </div>
  )
}

export default DonateBioBankPage

import BioBankHistory from './BioBankHistory'
import { gql, useQuery } from '@apollo/client'

const BioBankHistoryList = () => {
  const GET_REGISTERED_DONATIONS = gql`
    {
      stemCellDonationTokenizeds {
        timestamp
        donor
      }
    }
  `
  const {
    loading,
    error,
    data: registered,
  } = useQuery(GET_REGISTERED_DONATIONS)

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  if (error) return `Error! ${error}`

  let allRegisteredDonations = []
  const getData = () => {
    registered.stemCellDonationTokenizeds.forEach((item, index) => {
      allRegisteredDonations.push({
        timestamp: item.timestamp,
        donor: item.donor,
      })
    })
  }
  const organizeByTime = () => {
    allRegisteredDonations.sort((a, b) => {
      return parseInt(b.timestamp) - parseInt(a.timestamp)
    })
  }
  getData()
  organizeByTime()

  const registeredDonations = allRegisteredDonations.map((item, index) => (
    <BioBankHistory key={index} item={item} />
  ))

  return (
    <div className="w-full px-20 pt-5">
      <div className="w-full flex rounded-full border-t-[1px] border-b-[1px] border-main py-2 px-8">
        <div className=" font-satoshiMedium text-main basis-3/12">
          Date & Time
        </div>
        <div className=" font-satoshiMedium text-main basis-4/12">
          Donor address
        </div>
        <div className=" font-satoshiMedium text-main basis-[22%]">
          Total Amount
        </div>
        <div className=" font-satoshiMedium text-main basis-2/12 flex justify-center">
          Action
        </div>
      </div>
      {registeredDonations}
    </div>
  )
}

export default BioBankHistoryList

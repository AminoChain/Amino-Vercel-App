import SearchFooter from '../../../searchPage/SearchFooter'
import MarketplaceBanner from '../../MarketplaceBanner'
import NftShipmentBody from './NftShipmentBody'
import ShippingForm from './ShippingForm'

const NftShippmentPage = ({ NftData, NftStatus }) => {

  return (
    <div className="w-screen">
      <MarketplaceBanner />
      <NftShipmentBody NftData={NftData} NftStatus={NftStatus} />
      <SearchFooter />
    </div>
  )
}

export default NftShippmentPage

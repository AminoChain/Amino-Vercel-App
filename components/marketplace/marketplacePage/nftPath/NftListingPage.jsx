import MarketplaceBanner from '../MarketplaceBanner'
import NftArtCard from './NftArtCard'
import NftDetailsAndBuy from './NftDetails'
import SearchFooter from '../../searchPage/SearchFooter'

const NftListingPage = ({ nftData }) => {
  return (
    <div className="w-full">
      <MarketplaceBanner />
      <div className="w-full px-52 pt-[2rem]">
        <div className="w-full flex">
          <NftArtCard nftData={nftData} />
          <NftDetailsAndBuy nftData={nftData} />
        </div>
      </div>
    </div>
  )
}

export default NftListingPage

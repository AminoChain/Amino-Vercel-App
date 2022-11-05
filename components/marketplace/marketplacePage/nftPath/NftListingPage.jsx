import NftArtCard from './NftArtCard'
import NftDetailsAndBuy from './NftDetails'

const NftListingPage = ({ nftData }) => {


  return (
    <div className="w-full p-52">
      <div className="w-full flex">
        <NftArtCard nftData={nftData}/>
        <NftDetailsAndBuy nftData={nftData}/>
      </div>
    </div>
  )
}

export default NftListingPage

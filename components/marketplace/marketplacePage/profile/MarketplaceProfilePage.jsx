import { useState } from 'react'
import SearchFooter from '../../searchPage/SearchFooter'
import MarketplaceBanner from '../MarketplaceBanner'
import MarketplaceNav from '../MarketplaceNav'
import MarketplaceProfileBody from './MarketplaceProfileBody'

const MarketplaceProfilePage = () => {

  return (
    <div>
      <MarketplaceBanner />
      <MarketplaceNav />
      <MarketplaceProfileBody />
      <SearchFooter />
    </div>
  )
}

export default MarketplaceProfilePage

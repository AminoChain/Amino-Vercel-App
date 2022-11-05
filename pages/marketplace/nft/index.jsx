import NftListingPage from '../../../components/marketplace/marketplacePage/nftPath/NftListingPage'
import { gql, useQuery } from '@apollo/client'

export async function getServerSideProps(context) {
  const { tokenId } = context.query

  return {
    props: { tokenId: tokenId }, // will be passed to the page component as props
  }
}

const Nft = ({ tokenId }) => {
  const GET_NFT = gql`
    query Nft($tokenId: Int!) {
      activeListings(where: { tokenId: $tokenId }) {
        id
        tokenId
        price
        donor
        bioBank
        halotypes_A
        halotypes_B
        halotypes_C
        halotypes_DPB
        halotypes_DRB
      }
    }
  `

  let id = Number(tokenId)
  const {
    loading,
    error,
    data: listing,
  } = useQuery(GET_NFT, {
    variables: { tokenId: id },
  })

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  if (error) return `Error! ${error}`

  return (
    <div className='w-screen'>
      <NftListingPage nftData={listing.activeListings[0]}/>
    </div>
  )
}

export default Nft

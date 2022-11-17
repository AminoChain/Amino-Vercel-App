import NftShipmentPage from '../../../../components/marketplace/marketplacePage/nftPath/shipping/NftShipmentPage'
import { gql, useQuery } from '@apollo/client'

export async function getServerSideProps(context) {
  const { tokenId, trackingNum } = context.query

  return {
    props: { tokenId: tokenId, trackingNum: trackingNum }, // will be passed to the page component as props
  }
}

const MarketplaceShipping = ({ tokenId, trackingNum }) => {

  //const updateBiobank = fetch()

  const GET_TOKEN_DATA = gql`
    query Nft($tokenId: Int!) {
      existingTokenIds(where: { tokenId: $tokenId }) {
        tokenId
        price
        sizeInCC
        donor
        bioBank
        hlaHashes {
          hlaHashed_A
          hlaHashed_B
          hlaHashed_C
          hlaHashed_DPB
          hlaHashed_DRB
        }
      }
    }
  `
  const GET_TOKEN_STATUS = gql`
  query NftStatus($tokenId: Int!) {
    pendingSales(where: { tokenId: $tokenId }) {
      tokenId
      status
    }
  }
`

  let id = Number(tokenId)
  const {
    loading,
    error,
    data: NftData,
  } = useQuery(GET_TOKEN_DATA, {
    variables: { tokenId: id },
  })

  const {
    loading: loading2,
    error: error2,
    data: NftStatus,
  } = useQuery(GET_TOKEN_STATUS, {
    variables: { tokenId: id },
  })

  if (loading || loading2) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  if (error || error2) return `Error! ${error}`

  return (
    <div>
      <NftShipmentPage NftData={NftData.existingTokenIds[0]} NftStatus={NftStatus.pendingSales[0]} />
    </div>
  )
}

export default MarketplaceShipping

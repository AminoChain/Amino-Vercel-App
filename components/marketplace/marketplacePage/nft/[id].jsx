
export async function getServerSideProps(context) {
  const nftId = context.params.id

  
  return {
    props: {}, // will be passed to the page component as props
  }
}


const Nft = () => {


  return(
    <div>
      NFT listing

    </div>
  )
}

export default Nft
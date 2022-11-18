import { ethers } from "ethers"

const MarketplaceCreateAccount = ({ shippingAddress, setShippingAddress }) => {
  
  const login = async (e) => {
    e.preventDefault()

    const checkConnection = async () => {
      let provider, signer
      try {
        provider = new ethers.providers.Web3Provider(window.ethereum)
        signer = await provider.getSigner(0)
      } catch (e) {
        console.log(e)
      }

      if (signer === undefined) {
        return false
      } else {
        try {
          let address = await signer.getAddress()
          return address
        } catch (e) {
          console.log(e)
        }
      }
    }
    const address = await checkConnection()
    if (address) {
      const name = e.target[0].value
      const street = e.target[1].value
      const city = e.target[2].value
      const state = e.target[3].value
      const zipcode = e.target[4].value

      const data = {
        address: address,
        name: name,
        street: street,
        city: city,
        state: state,
        zipcode: zipcode,
      }

      try {
        const res = await fetch('/api/create-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (res.ok) {
          setShippingAddress(true)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="flex flex-col px-20 py-3">
      <div className="flex flex-col py-2">
        <div className="font-satoshiBold text-xl text-black py-2">
          Create your account by adding your shipping details
        </div>
        <div className=" font-satoshiMedium text-black pb-2">
          By adding your shipping details here you will never have to input them
          when you order stemcells
        </div>
      </div>
      {!shippingAddress ? (
        <form onSubmit={login} className="flex ">
          <div className="basis-2/12">
            <div className=" font-satoshiMedium text-main">Full Name</div>
            <input
              type="text"
              placeholder="enter here"
              className="border-b-[1px] border-black p-1 pl-0 text-black font-satoshiMedium focus:outline-none"
            />
          </div>
          <div className="basis-2/12">
            <div className=" font-satoshiMedium text-main">St name</div>
            <input
              type="text"
              placeholder="enter here"
              className="border-b-[1px] border-black p-1 pl-0 text-black font-satoshiMedium focus:outline-none"
            />
          </div>
          <div className="basis-2/12">
            <div className=" font-satoshiMedium text-main">City</div>
            <input
              type="text"
              placeholder="enter here"
              className="border-b-[1px] border-black p-1 pl-0 text-black font-satoshiMedium focus:outline-none"
            />
          </div>
          <div className="basis-2/12">
            <div className=" font-satoshiMedium text-main">State</div>
            <input
              type="text"
              placeholder="enter here"
              className="border-b-[1px] border-black p-1 pl-0 text-black font-satoshiMedium focus:outline-none"
            />
          </div>
          <div className="basis-2/12">
            <div className=" font-satoshiMedium text-main">Zip code</div>
            <input
              type="text"
              placeholder="enter here"
              className="border-b-[1px] border-black p-1 pl-0 text-black font-satoshiMedium focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center ">
            <input
              className="flex justify-items-center text-xl cursor-pointer bg-marketplaceButton font-satoshiBold px-10 py-4 rounded-full text-black drop-shadow-searchButtonShadow "
              name="submit"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      ) : (
        <div className="font-satoshiBold text-black text-4xl">
          Successfully Submitted!
        </div>
      )}
    </div>
  )
}

export default MarketplaceCreateAccount

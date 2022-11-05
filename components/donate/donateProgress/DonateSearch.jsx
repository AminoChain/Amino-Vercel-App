import Image from 'next/image'
import search from '../../../assets/search.png'

const DonateSearch = () => {
  return (
    <div className="w-full px-20 py-5">
      <div className="text-2xl text-black font-satoshiMedium pt-5 pb-[0.8rem]">
        Search donation center
      </div>
      <form>
        <div className="flex flex-row border border-main bg-white px-5 rounded-full w-max justify-center">
          <div className="self-center pr-[0.6rem] ">
            <Image src={search} alt="" />
          </div>
          <input
            className="w-fit font-satoshiRegular text-base focus:outline-0 bg-white text-main border-0 py-2"
            type="text"
            placeholder="Enter city name"
          />
          <button className="font-satoshiRegular text-black text-base ml-[4rem]">
            Locate Me
          </button>
        </div>
      </form>
    </div>
  )
}

export default DonateSearch

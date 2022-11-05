import { useRouter } from 'next/router'

const DonateNav = () => {
  const { pathname } = useRouter()

  return (
    <div className="flex w-1/3 px-20 py-5 justify-between">
      {pathname !== '/donate' ? (
        <div className="pb-[4px] hover:pb-0 hover:border-b-4 hover:border-black hover:text-black cursor-pointer transition p-2 rounded text-main font-satoshiMedium text-2xl">
          Donations
        </div>
      ) : (
        <div className="pb-0 border-b-4 border-black text-black cursor-pointer transition p-2 rounded font-satoshiMedium text-2xl">
          Donations
        </div>
      )}
      <div className="pb-[4px] hover:pb-0 hover:border-b-4 hover:border-black hover:text-black cursor-pointer transition p-2 rounded text-main font-satoshiMedium text-2xl">
        Earnings
      </div>
      <div className="pb-[4px] hover:pb-0 hover:border-b-4 hover:border-black hover:text-black cursor-pointer transition p-2 rounded text-main font-satoshiMedium text-2xl">
        Profile
      </div>
    </div>
  )
}

export default DonateNav

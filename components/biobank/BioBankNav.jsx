import Link from 'next/link'
import { useRouter } from 'next/router'

const BioBankNav = () => {
  const { pathname } = useRouter()
  const pathRoot = pathname.substring(0, pathname.indexOf('/', 2))

  return (
    <div className="flex px-20 py-5 justify-start ">
      {pathRoot !== '/biobank' && pathname !== '/biobank' ? (
        <Link href="/biobank/appointments">
          <div className="pb-[4px] hover:pb-0 hover:border-b-4 hover:border-black hover:text-black cursor-pointer transition p-2 mr-4 rounded text-main font-satoshiMedium text-2xl">
            Appointments
          </div>
        </Link>
      ) : (
        <div className="pb-0 border-b-4 border-black text-black cursor-pointer transition p-2 mr-4 rounded font-satoshiMedium text-2xl">
          Appointments
        </div>
      )}
      {pathRoot !== '/history' && pathname !== '/history' ? (
        <Link href="/biobank/history">
          <div className="pb-[4px] hover:pb-0 hover:border-b-4 hover:border-black hover:text-black cursor-pointer transition p-2 mx-4 rounded text-main font-satoshiMedium text-2xl ">
            History
          </div>
        </Link>
      ) : (
        <div className="pb-0 border-b-4 border-black text-black cursor-pointer transition p-2 mx-4 rounded font-satoshiMedium text-2xl">
          History
        </div>
      )}
      {pathRoot !== '/bioBankDetails' && pathname !== '/bioBankDetails' ? (
        <Link href="/biobank/details">
          <div className="pb-[4px] hover:pb-0 hover:border-b-4 hover:border-black hover:text-black cursor-pointer transition p-2 mx-4 rounded text-main font-satoshiMedium text-2xl whitespace-nowrap">
            BioBank Details
          </div>
        </Link>
      ) : (
        <div className="pb-0 border-b-4 border-black text-black cursor-pointer transition p-2 mx-4 rounded font-satoshiMedium text-2xl">
          BioBank Details
        </div>
      )}
    </div>
  )
}

export default BioBankNav

import Image from 'next/image'
import aminoLogo from '../../assets/aminoLogo2.png'

const Nav = () => {
  return (
    <div className="w-screen flex flex-row justify-between px-[10%]">
      <a href="./">
        <div>
          <Image
            src={aminoLogo}
            alt="Image of AminoChain Logo"
            height={40}
            width={71}
          />
        </div>
      </a>
      <div className=" flex flex-row justify-evenly ">
        <div className="text-base font-medium text-black">Docs</div>
      </div>
    </div>
  )
}

export default Nav

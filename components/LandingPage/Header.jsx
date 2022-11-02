import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Nav from './Nav'
import Intro from './Intro'

const Header = () => {
  const router = useRouter()
  const isActive = (pathname) => router.pathname === pathname

  return (
    <header className="w-full flex flex-col mt-20">
      <title>AminoChain</title>
      <Nav />
      <Intro />
    </header>
  )
}

export default Header

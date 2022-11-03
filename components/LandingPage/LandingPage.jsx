import React from 'react'
import Header from './Header'

const LandingPage = (props) => (
  <div className="w-screen flex flex-col bg-white">
    <Header />
    {/* add more here to complete the landing page */}
    <div className="layout">{props.children}</div>
  </div>
)

export default LandingPage

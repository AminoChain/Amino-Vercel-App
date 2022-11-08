import { useState } from "react"
import DonateBanner from "../../../components/donate/DonateBanner"
import DonateBioBankPage from "../../../components/donate/donatesearch/donateSchedule/DonateBioBankPage"
import prisma from "../../../lib/prisma"

export async function getServerSideProps(context) {
  const { bioBankId } = context.query

  const bioBank = await prisma.bioBank.findUnique({
    where: {
      id: bioBankId
    },
  })  

  return {
    props: { bioBank: bioBank }, // will be passed to the page component as props
  }
}

const DonateBioBank = ({bioBank}) => {
  
  
  return(
    <div>
      <DonateBanner/>
      <DonateBioBankPage bioBank={bioBank} />
    </div>
  )
}
export default DonateBioBank
import React from 'react'
import { useState } from 'react'
import SearchPage from '../../components/marketplace/SearchPage'
import MarketplacePage from '../../components/marketplace/MarketplacePage'

// export const getServerSideProps = async ({ params }) => {
//   const post = {
//     id: '1',
//     title: 'Prisma is the perfect ORM for Next.js',
//     content:
//       '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
//     published: false,
//     author: {
//       name: 'Nikolas Burk',
//       email: 'burk@prisma.io',
//     },
//   }
//   return {
//     props: post,
//   }
// }

const Marketplace = () => {
  const [matches, setMatches] = useState({})
  const [search, setSearch] = useState({})

  // let title = props.title
  // if (!props.published) {
  //   title = `${title} (Draft)`
  // }

  const isEmpty = Object.keys(search).length === 0

  if (isEmpty) {
    return (
      <div className="w-screen">
        <SearchPage matches={matches} setMatches={setMatches} search={search} setSearch={setSearch}/>
      </div>
    )
  }

  if (!isEmpty) {
    return (
      <div className="w-screen bg-white">
        <MarketplacePage matches={matches} setMatches={setMatches}/>
      </div>
    )
  }
}

export default Marketplace

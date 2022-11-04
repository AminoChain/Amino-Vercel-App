import React from 'react'
import LandingPage from '../components/landingpage/LandingPage'

export const getStaticProps = async () => {
  const feed = [
    {
      id: '1',
      title: 'Prisma is the perfect ORM for Next.js',
      content:
        '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
      published: false,
      author: {
        name: 'Nikolas Burk',
        email: 'burk@prisma.io',
      },
    },
  ]
  return {
    props: { feed },
    revalidate: 10,
  }
}

const Home = () => {
  return <LandingPage />
}

export default Home

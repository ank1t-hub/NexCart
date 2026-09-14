import React from 'react'
import { Hero,LatestCollection,BestSeller,OurPolicy,NewsLatterBox } from '../components'

function Home() {
  return (
    <div className='pt-10'>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLatterBox/>
    </div>
  )
}

export default Home

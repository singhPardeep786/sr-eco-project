import React from 'react'
import Banner from '@/components/banner/Banner'
import Navbar from '@/components/navbar/Navbar'
import { ReactLenis } from 'lenis/react'
import Introduction from '@/components/introduction/Introduction'
import Features from '@/components/features/Features'
import MasterPlan from '@/components/masterplan/MasterPlan'

const Page = () => {
  return (
      <div>
        <Navbar />
        <Banner />
        <Introduction />
        <Features />
        <MasterPlan />
      </div>
    // <ReactLenis root options={{ duration: 1 }}>
    // </ReactLenis>
  )
}

export default Page
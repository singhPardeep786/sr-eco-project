import React from 'react'
import Banner from '@/components/banner/Banner'
import Navbar from '@/components/navbar/Navbar'
import { ReactLenis } from 'lenis/react'
import Introduction from '@/components/introduction/Introduction'

const Page = () => {
  return (
    <ReactLenis root>
      <div>
        <Navbar />
        <Banner />
        <Introduction />
      </div>
    </ReactLenis>
  )
}

export default Page
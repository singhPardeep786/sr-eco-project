'use client'
import React from 'react'
import Banner from '@/components/banner/Banner'
import Navbar from '@/components/navbar/Navbar'
import { ReactLenis } from 'lenis/react'
import Introduction from '@/components/introduction/Introduction'
import Features from '@/components/features/Features'
import MasterPlan from '@/components/masterplan/MasterPlan'
import ClubhouseAmenities from '@/components/amenities/ClubhouseAmenities'
import ParkAmenities from '@/components/amenities/ParkAmenities'
import Location from '@/components/locationAndProximities/Location'

const Page = () => {
  return (
    // <ReactLenis root options={{ duration: 1 }}>
      <div>
        <Navbar />
        <Banner />
        <Introduction />
        <Features />
        <MasterPlan />
        <ClubhouseAmenities />
        <ParkAmenities />
        <Location />
      </div>
    // </ReactLenis>
  )
}

export default Page
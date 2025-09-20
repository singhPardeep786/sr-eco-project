"use client"
import React from 'react'

const Proximities = () => {

    const proximity = [
        {
            img: "/images/location_and_proximity/airport.jpg",
            txt: "Rajiv Gandhi Intl. Airport"
        },
        {
            img: "/images/location_and_proximity/outer_ring_road.jpg",
            txt: "Outer Ring Road"
        },
        {
            img: "/images/location_and_proximity/tcs.jpg",
            txt: "IT Park Adibatla (TCS)"
        },
        {
            img: "/images/location_and_proximity/wtc.jpg",
            txt: "WTC at Hardware Park Raviryal"
        },
        {
            img: "/images/location_and_proximity/wonderla.jpg",
            txt: "Wonderla Amusement Park"
        },
        {
            img: "/images/location_and_proximity/fabcity.jpg",
            txt: "fab city"

        },
        {
            img: "/images/location_and_proximity/college.jpg",
            txt: "MVSR Eng. College"
        },
        {
            img: "/images/location_and_proximity/aghakhna_academy.jpg",
            txt: "Aghakhan Academy"
        },
    ]
    
  return (
    <>
        <div>
            <h2 className='section_heading text-center mt-10'>proximities</h2>
            <div className="heading-divider" />
            <div className="proximities_main">
                {proximity.map((content, idx)=>
                    <div className="proximities relative" key={idx}>
                        <img src={content.img} 
                        className='w-full h-full object-cover transition-all duration-500 mt-4 rounded-5' 
                        style={{borderRadius: "1.5rem"}}
                        alt="sr eco park proximities" />
                        <h6 className='absolute top-0 left-0'>{content.txt}</h6>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default Proximities
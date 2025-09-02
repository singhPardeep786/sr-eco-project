"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const PageLoader = () => {

    const pageLoader = useRef(null)
    
    useGSAP(()=>{

        let tl = gsap.timeline()
        
        tl.to(pageLoader.current,{
           display: "block",
        })
        tl.to('.stair',{
            y: '100%',
            stagger: {
                amount: 0.2
            }
        })
        tl.to(pageLoader.current,{
            display: "none",
         })
    })
    
  return (
    <>
    <div ref={pageLoader} className='w-full h-screen fixed z-[9999] top-0'>
        <div className='w-full h-full flex'>
            <div className='stair w-1/5 h-screen bg-[var(--maincolor)]'></div>
            <div className='stair w-1/5 h-screen bg-[var(--blue)]'></div>
            <div className='stair w-1/5 h-screen bg-[var(--maincolor)]'></div>
            <div className='stair w-1/5 h-screen bg-[var(--blue)]'></div>
            <div className='stair w-1/5 h-screen bg-[var(--maincolor)]'></div>
        </div>
    </div>
    </>
  )
}

export default PageLoader
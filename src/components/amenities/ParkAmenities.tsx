"use client"
import React, { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParkAmenities = () => {

    useEffect(()=>{
        const animateLine = document.querySelectorAll(".animated_line");
        animateLine.forEach((line)=>{
          gsap.fromTo(line,{
            width: "0",
          },{
            width: "100%",
            duration: 1.2,
            scrollTrigger:{
              trigger: line,
              scroller: "body",
              start: "top 80%",
              end: "top 30%",
              scrub: 2,
              // markers: true,
              toggleActions: "play reverse play reverse",
            }
          }
        )
        })
      }, [])

    const cards = [
      {
        img: "/images/outdoors/lawn.jpg",
        txt1: "Every Day",
        txt2: "is a Living Canvas."
      },
      {
        img: "/images/outdoors/yoga.jpg",
        txt1: "Every Breath is a",
        txt2: "Soulful Restoration."
      },
      {
        img: "/images/outdoors/children_play_area.jpg",
        txt1: "Every Leap",
        txt2: "is Safe and Soft."
      },
      {
        img: "/images/outdoors/swirling_hills.jpg",
        txt1: "Every Whisper",
        txt2: "is Natural and Endless."
      },
      {
        img: "/images/outdoors/badminton.jpg",
        txt1: "Every Rally is a",
        txt2: "Display of Agility and Joy."
      },
      {
        img: "/images/outdoors/cricket_net.jpg",
        txt1: "Every Game",
        txt2: "is Fuel for Refinement."
      }
    ]
    
  return (
    <>
        <section className='wrapper pb-5'>
            <h3 className='capitalize mt-5 text-[1.7rem] md:text-[2.3rem] text-[var(--blue)] transition-all duration-500'>outdoor amenities</h3>
            <div className="animated_line mb-5"></div>
              <div className="carousel2 text-white">
                    {cards.map((content, idx) =>
                      <div key={idx} className="card2 relative">
                        <img src={content.img} className='w-full h-full object-cover' alt="sr eco park outdoor amenity" />
                        <div className="card_content absolute bottom-0 right-0">
                          <h5>{content.txt1}</h5>
                          <h5>{content.txt2}</h5>
                        </div>
                      </div>
                    )}
              </div>
        </section>
    </>
  )
}

export default ParkAmenities
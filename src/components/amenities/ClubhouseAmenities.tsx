"use client"
import React, { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ClubhouseAmenities = () => {

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
        img: "/images/outdoors/seating_alcove.jpg",
        txt1: "Every Corner is a Chance",
        txt2: "to Pause, Play, and Explore."
      },
      {
        img: "/images/outdoors/coconut_grove.jpg",
        txt1: "Every Step is a Celebration",
        txt2: "of Nature's Bounty and Beauty."
      },
      {
        img: "/images/outdoors/walkway.jpg",
        txt1: "Every Stroll",
        txt2: "is Serene and Mindful."
      },
      {
        img: "/images/outdoors/party_deck.jpg",
        txt1: "Every Celebration",
        txt2: "is a Frame of Nature."
      },
      {
        img: "/images/outdoors/play_lawn.jpg",
        txt1: "Every Childhood",
        txt2: "is Joyful and Wonderful."
      },
      {
        img: "/images/outdoors/mango_&_coconut_grove.jpg",
        txt1: "Every Experience is",
        txt2: "Sweet and Bountiful."
      }
    ]
    
  return (
    <>
        <section className='wrapper'>
            <h2 className='section_heading text-center'>amenities</h2>
            <div className="masterplan-divider" />
            <h3 className='capitalize mt-5 text-[1.7rem] md:text-[2.3rem] text-[var(--blue)] transition-all duration-500'>clubhouse amenities</h3>
            <div className="animated_line mb-5"></div>
              <div className="carousel text-white">
                    {cards.map((content, idx) =>
                      <div key={idx} className="card relative">
                        <img src={content.img} className='w-full h-full object-cover' alt="sr eco park clubhouse amenity" />
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

export default ClubhouseAmenities
"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
        txt1: "LAWN",
        // txt2: "is a Living Canvas."
      },
      {
        img: "/images/outdoors/yoga.jpg",
        txt1: "YOGA",
        // txt2: "Soulful Restoration."
      },
      {
        img: "/images/outdoors/children_play_area.jpg",
        txt1: "CHILDREN PLAY AREA",
        // txt2: "is Safe and Soft."
      },
      {
        img: "/images/outdoors/swirling_hills.jpg",
        txt1: "SWIRLING HILLS",
        // txt2: "is Natural and Endless."
      },
      {
        img: "/images/outdoors/badminton.jpg",
        txt1: "BADMINTON COURT",
        // txt2: "Display of Agility and Joy."
      },
      {
        img: "/images/outdoors/cricket_net.jpg",
        txt1: "CRICKET PRACTICE NET",
        // txt2: "is Fuel for Refinement."
      }
    ]
    
  return (
    <>
        <section className="wrapper">
        {/* <h3 className="capitalize mt-5 text-[1.7rem] md:text-[2.3rem] text-[var(--blue)] transition-all duration-500">Park amenities Two</h3>
        <div className="animated_line mb-5"></div> */}
        <div className="relative mt-8">
          <Swiper
            modules={[Pagination, A11y, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            speed={1200}
            loop={true}
            className="carousel text-white"
            style={{ width: "100%", height: "100%" }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {cards.map((content, idx) => (
              <SwiperSlide key={idx}>
                <div className="card relative w-full h-full">
                  <img
                    src={content.img}
                    className="w-full h-full object-cover"
                    alt="sr eco park amenities"
                  />
                  <div className="card_content absolute top-0 left-0">
                    <h5>{content.txt1}</h5>
                    {/* <h5>{content.txt2}</h5> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  )
}

export default ParkAmenities
"use client"
import React, { useEffect } from 'react'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const Introduction = () => {

  // Responsive values for all screens
  const getResponsiveValues = () => {
    const width = window.innerWidth;
    // Mobile (<=450px)
    if (width <= 450) {
      return {
        initial: { width: "30%", height: "80px", y: 0 },
        animate: { width: "95%", height: "320px", y: 250 }
      }
    }
    // Medium Mobile (451px - 700px)
    if (width > 450 && width <= 700) {
      return {
        initial: { width: "30%", height: "120px", y: 0 },
        animate: { width: "80%", height: "350px", y: 250 }
      }
    }
    // Tablet (701px - 900px)
    if (width > 700 && width <= 900) {
      return {
        initial: { width: "25%", height: "140px", y: 0 },
        animate: { width: "65%", height: "380px", y: 180 }
      }
    }
    // Medium Desktop (901px - 1200px)
    if (width > 900 && width <= 1200) {
      return {
        initial: { width: "20%", height: "160px", y: 0 },
        animate: { width: "55%", height: "400px", y: 200 }
      }
    }
    // Large Desktop (>1200px)
    return {
      initial: { width: "18%", height: "180px", y: 0 },
      animate: { width: "40%", height: "420px", y: 300 }
    }
  }

  useEffect(() => {
    const introBox = document.querySelector('.intro_content_box');
    const h2 = document.querySelector('.intro_content_box h2');
    const p = document.querySelector('.intro_content_box p');
    const intrOverlay = document.querySelector('.intro_overlay');

    if (introBox && h2 && p) {
      const { initial, animate } = getResponsiveValues();

      // Set initial states for introBox, h2, and p
      gsap.set(introBox, { 
        width: initial.width, 
        height: initial.height, 
        borderRadius: "500px", 
        overflow: "hidden", 
        y: initial.y 
      });
      gsap.set(h2, { opacity: 0, y: 60 });
      gsap.set(p, { opacity: 0, y: 60 });
      gsap.set(intrOverlay, { opacity: 0 })

      // Timeline for smooth, overlapping animations
      const tl = gsap.timeline();

      // Animate introBox width and y with a longer, softer ease
      tl.to(
        introBox,
        { 
          width: animate.width, 
          height: animate.height, 
          borderRadius: "30px",
          y: animate.y, 
          duration: 1.6, 
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: introBox,
            start: "top 70%",
            end: "top top",
            scrub: 1.2,
            // markers: true,
            toggleActions: "play reverse play reverse",
          }
        }
      )

      tl.to(
        intrOverlay,
        { 
          opacity: 1, 
          duration: 1.6, 
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: intrOverlay,
            start: "top 70%",
            end: "top top",
            scrub: 1.2,
            // markers: true,
            toggleActions: "play reverse play reverse",
          }
        }
      )
      // Fade in h2, slightly before box finishes
      .to(
        h2,
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.1, 
          ease: "power2.out" ,
          scrollTrigger: {
            trigger: introBox,
            start: "top 10%",
            end: "top top",
            scrub: 1.2,
            // markers: true,
            toggleActions: "play reverse play reverse",
          }
        },
        "-=0.7"
      )
      // Fade in p, overlapping with h2
      .to(
        p,
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: introBox,
            start: "top 10%",
            end: "top top",
            scrub: 1.2,
            // markers: true,
            toggleActions: "play reverse play reverse",
          }
        },
        "-=0.6"
      );

      // Update animation on resize for all screens
      const handleResize = () => {
        const { initial, animate } = getResponsiveValues();
        // Reset to initial state
        gsap.set(introBox, { 
          width: initial.width, 
          height: initial.height, 
          y: initial.y 
        });
        // Optionally, you could also reset h2/p if needed
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <>
      {/* <div id='intro'></div> */}
      <div className='w-full h-screen bg-zinc-800 intro_bg overflow-hidden relative'>
        <section className="wrapper">
          <div className='intro_content_box flex items-center justify-center relative'>
            <div className="intro_content p-5 rounded-2xl flex items-center justify-center flex-col text-center">
              <h2>Premium residential plots <br /> to build homes, lives and legacies</h2>
              <p className='light text-gray-500 mt-3'>In an era where apartment living has become increasingly common and people are seeking respite from the concrete jungle, the desire to build a home of dreams in a peaceful, picturesque setting has become stronger than ever</p>
            </div>
          </div>
        </section>
        <div className="intro_overlay"></div>
      </div>
    </>
  )
}

export default Introduction
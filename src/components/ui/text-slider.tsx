"use client"

import React, { useRef } from "react"
import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface TextSliderProps {
  children?: string | React.ReactNode
  className?: string
  delay?: number
  start?: string
  end?: string
  translateX?: number
  popFrom?: "up" | "down"
  translateDuration?: number
  duration?: number
}

gsap.registerPlugin(ScrollTrigger)

export function TextSlider({
  children,
  className,
  delay = 0,
  translateX,
  popFrom = "down",
  translateDuration = 0.4,
  duration = 0.3,
  start = "top 80%",
  end = "top 65%",
}: TextSliderProps) {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      if (containerRef.current && lineRef.current) {
        const lineHeight = lineRef.current.offsetHeight || 0
        const animationDistance = popFrom === "up" ? -lineHeight : lineHeight
  
        // Hint the browser for smoother text transforms
        gsap.set(lineRef.current, { willChange: "transform" })
  
        tl.current = gsap.timeline({
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            toggleActions: "play none none reverse",
            once: true,
          },
        })
  
        tl.current.from(lineRef.current, {
          y: animationDistance,
          autoAlpha: 0,            // ensure it fades in
          force3D: true,           // avoid blur during transform
          duration: duration,
          ease: "power2.out",
        })
  
        if (translateX !== undefined) {
          tl.current.to(
            containerRef.current,
            {
              x: `${translateX}%`,
              duration: translateDuration,
              ease: "power2.out",
            },
            "+=0.1"
          )
        }
  
        gsap.delayedCall(0, () => ScrollTrigger.refresh())
      }
  
      return () => { tl.current?.kill() }
    },
    { dependencies: [popFrom, start, end, translateX, delay, duration, translateDuration], revertOnUpdate: true, scope: containerRef }
  )
  
  return (
    <section ref={containerRef} className={cn("overflow-hidden block", className)}>
      <div className="inline-block" ref={lineRef}>
        {children}
      </div>
    </section>
  )
}

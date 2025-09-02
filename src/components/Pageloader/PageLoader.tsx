"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import type { ReactNode } from "react";

interface PageLoaderProps {
  children: ReactNode;
}
  
const PageLoader: React.FC<PageLoaderProps> = ({ children }) => {
    const pageLoader = useRef<HTMLDivElement | null>(null);
    const pageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

   
    tl.set(pageLoader.current, { display: "block" })
      .to(".stair", {
        y: "100%",
        stagger: {
            amount: 0.25
        },
      })
      .set(pageLoader.current, { display: "none" });
      gsap.to('.loader_logo', {
        y: "-170%",
        opacity: 0,
        scale: 0.5,
      });
    gsap.from(pageRef.current, {
      opacity: 0,
      scale: 1.05,
      delay: 0.2
    }); 
  }, []);

  return (
    <>
      <div ref={pageLoader} className="w-full h-screen fixed z-[9999] top-0 left-0">
        <div className="w-full h-full flex">
            <div className="loader_logo w-[10%] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-3xl">
                <img src="/images/logo1.png" className="w-full h-full" alt="Loader Logo" />
            </div>
          <div className="stair w-1/5 h-screen bg-[var(--maincolor)]">
          </div>
          <div className="stair w-1/5 h-screen bg-[var(--blue)]"></div>
          <div className="stair w-1/5 h-screen bg-[var(--maincolor)]"></div>
          <div className="stair w-1/5 h-screen bg-[var(--blue)]"></div>
          <div className="stair w-1/5 h-screen bg-[var(--maincolor)]"></div>
        </div>
      </div>
      <div ref={pageRef}>{children}</div>
    </>
  );
};

export default PageLoader;

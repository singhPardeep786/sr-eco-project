"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
// import { AnimatedText } from "./animatedText/AnimatedText";
import { Icon } from "@iconify/react/dist/iconify.js";

const Banner = () => {
  // const slides = [
  //     {
  //         smallTitle: "introducing",
  //         title: "SR Eco Park",
  //         desc: "In an era where apartment living has become increasingly common and people are seeking respite from the concrete jungle, the desire to build a home of dreams in a peaceful, picturesque setting has become stronger than ever",
  //     },
  //     {
  //         smallTitle: "Premium residential plots",
  //         title: " lives and legacies",
  //         desc: "In an era where apartment living has become increasingly common and people are seeking respite from the concrete jungle, the desire to build a home of dreams in a peaceful, picturesque setting has become stronger than ever",
  //     },
  // ]

  return (
    <>
    <div className="slides_main bg-zinc-800 relative">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Autoplay, EffectFade, Keyboard, Pagination]}
        keyboard={true}
        effect="fade"
        speed={1200}
        loop = {true}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="mySwiper h-full"
      >
       
          <SwiperSlide className="slide1">
            <div className="content">
              <div className="banner_content">
                <div className="small_heading overflow-hidden">
                  <h5 className="uppercase">introducing</h5>
                </div>
                <div className="main_heading overflow-hidden">
                  <h1>sr eco park</h1>
                </div>
              </div>
            </div>
            <span className="bottom-left"></span>
            <span className="bottom-right"></span>
            <div className="scroll_downIcon_section flex items-center justify-center w-full">
              <div className="arrow_main_box">
                <div>
                  <a href="#intro">
                    <span className="arrow_icon flex items-center justify-center">
                      <Icon icon="line-md:arrow-down" width="24" height="24" />
                    </span>
                  </a>
                </div>
                <div>
                  <a href="#intro">
                    <span className="scroll_arrow_div flex items-center justify-center">
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <div className="content">
              <div className="banner_content">
                <div className="small_heading overflow-hidden">
                  <h5 className="uppercase">Premium residential plots</h5>
                </div>
                <div className="main_heading overflow-hidden">
                  <h1>lives and legacies</h1>
                </div>
              </div>
            </div>
            <span className="bottom-left"></span>
            <span className="bottom-right"></span>
            <div className="scroll_downIcon_section flex items-center justify-center w-full">
              <div className="arrow_main_box">
                <div>
                  <a href="#intro">
                    <span className="arrow_icon flex items-center justify-center">
                      <Icon icon="line-md:arrow-down" width="24" height="24" />
                    </span>
                  </a>
                </div>
                <div>
                  <a href="#intro">
                    <span className="scroll_arrow_div flex items-center justify-center">
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
      </Swiper>
    </div>
    </>
  );
};

export default Banner;

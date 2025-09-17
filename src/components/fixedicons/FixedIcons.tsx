"use client"
import React, { useState } from 'react'
import { Icon } from '@iconify/react';

const FixedIcons = () => {

    const [showVideo, setShowVideo] = useState(false);

    const WALKTHROUGH_VIDEO_URL = "/images/video.mp4";

    const playClickSound = () => {
        const audio = new Audio('/click_sounds/walkthrough_click.mp3');
        audio.volume = 1;
        audio.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    };

    const handleVideoClick = () => {
        playClickSound();
        setShowVideo(true);
    };

  return (
    <>
      <div className="fixed_icons fixed top-[30%] right-0 z-[1]">
        <div className="first_icon transition-all duration-500">
          <a
            href="/brochure/SR Eco Park Brochure.pdf"
            className="w-fit decoration-0 flex items-center justify-start gap-2 bg-[var(--maincolor2)] text-white px-3 py-2 rounded-l-xl light uppercase text-md"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
          >
            <span>
              <Icon icon="gala:brochure" className="fixed_icon text-lg" />
            </span>
            <span>Brochure</span>
          </a>
        </div>
        {/* <div className="second_icon transition-all duration-500">
          <button
            type="button"
            className="mt-[0.1rem] decoration-0 flex items-center gap-2 bg-[var(--maincolor)] text-white px-3 py-2 rounded-l-xl light uppercase text-md focus:outline-none cursor-pointer"
            onClick={handleVideoClick}
            aria-label="Open Walkthrough Video"
          >
            <span>
              <Icon icon="bi:camera-reels" className="fixed_icon text-lg" />
            </span>
            <span>Walkthrough</span>
          </button>
        </div> */}
      </div>

      {/* {showVideo && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-[90vw] w-[500px] md:w-[700px] aspect-video flex items-center justify-center overflow-hidden animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-red-500 text-2xl z-10 transition-all duration-300 cursor-pointer"
              onClick={() => setShowVideo(false)}
              aria-label="Close walkthrough video"
            >
              <Icon icon="line-md:close" />
            </button>
            <iframe
              src={WALKTHROUGH_VIDEO_URL}
              title="SR Eco Park Walkthrough"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-2xl"
            />
          </div>
        </div>
      )} */}
    </>
  );
};

export default FixedIcons
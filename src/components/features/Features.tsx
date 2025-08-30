"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { ReactNode, useEffect, useMemo } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define types for amenities and chunkArray
type Amenity = {
  className: string;
  icon: ReactNode;
  desc: string;
};

const clubhouseAmenities: Amenity[] = [
  {
    className: "features_box",
    icon: <Icon icon="fluent-mdl2:toll" className='icon' />,
    desc: "Grand Entrance Plaza"
  },
  {
    className: "features_box",
    icon: <Icon icon="game-icons:road" className='icon' />,
    desc: "40’ and 30’ CC Roads"
  },
  {
    className: "features_box",
    icon: <Icon icon="mdi:wall" className='icon' />,
    desc: "Compound Wall on All Sides"
  },
  {
    className: "features_box",
    icon: <Icon icon="mdi:security-camera" className='icon' />,
    desc: "24 X 7 Security"
  },
  {
    className: "features_box",
    icon: <Icon icon="uil:water" className='icon' />,
    desc: "Provision for Krishna Water"
  },
  {
    className: "features_box",
    icon: <Icon icon="mdi:pipe" className='icon' />,
    desc: "Underground Sump"
  },
  {
    className: "features_box",
    icon: <Icon icon="game-icons:fuel-tank" className='icon' />,
    desc: "Septic Tank"
  },
  {
    className: "features_box",
    icon: <Icon icon="tabler:waves-electricity" className='icon' />,
    desc: "Underground Electricity"
  },
  {
    className: "features_box",
    icon: <Icon icon="game-icons:warp-pipe" className='icon' />,
    desc: "Underground Drainage"
  },
  {
    className: "features_box",
    icon: <Icon icon="ph:park-fill" className='icon' />,
    desc: "Premium Landscape"
  },
  {
    className: "features_box",
    icon: <Icon icon="lucide-lab:cricket-wicket" className='icon' />,
    desc: "Cricket net"
  },
  {
    className: "features_box",
    icon: <Icon icon="emojione-monotone:badminton" className='icon' />,
    desc: "Badminton court"
  },
  {
    className: "features_box",
    icon: <Icon icon="guidance:garden" className='icon' />,
    desc: "Arrival Landscape"
  },
  {
    className: "features_box",
    icon: <Icon icon="maki:garden" className='icon' />,
    desc: "Planting Buffer"
  },
  {
    className: "features_box",
    icon: <Icon icon="game-icons:walk" className='icon' />,
    desc: "Pathway"
  },
];

const parkAmenities: Amenity[] = [
  {
    className: "features_box",
    icon: <Icon icon="eos-icons:sandbox" className='icon' />,
    desc: "Sand Pit for Tot-lots"
  },
  {
    className: "features_box",
    icon: <Icon icon="fluent-emoji-high-contrast:man-running-facing-right" className='icon' />,
    desc: "Jogging Track"
  },
  {
    className: "features_box",
    icon: <Icon icon="mdi:playground-slide" className='icon' />,
    desc: "EPDM Play Court for Kids"
  },
  {
    className: "features_box",
    icon: <Icon icon="material-symbols:playground-2" className='icon' />,
    desc: "Summer Park"
  },
  {
    className: "features_box",
    icon: <Icon icon="material-symbols-light:settings-seating-rounded" className='icon' />,
    desc: "Seating Alcove"
  },
  {
    className: "features_box",
    icon: <Icon icon="map:playground" className='icon' />,
    desc: "Play Lawn"
  },
  {
    className: "features_box",
    icon: <Icon icon="lineicons:trees-3" className='icon' />,
    desc: "Mango Grove"
  },
  {
    className: "features_box",
    icon: <Icon icon="icon-park-outline:coconut-tree" className='icon' />,
    desc: "Coconut Grove"
  },
  {
    className: "features_box",
    icon: <Icon icon="solar:meditation-round-bold" className='icon' />,
    desc: "Meditation Zone"
  },
  {
    className: "features_box",
    icon: <Icon icon="material-symbols:relax-sharp" className='icon' />,
    desc: "Relaxing Court"
  },
  {
    className: "features_box",
    icon: <Icon icon="healthicons:exercise-yoga" className='icon' />,
    desc: "Yoga Zone"
  },
  {
    className: "features_box",
    icon: <Icon icon="game-icons:water-tank" className='icon' />,
    desc: "Overhead Tank"
  },
  {
    className: "features_box",
    icon: <Icon icon="hugeicons:cloud-angled-rain" className='icon' />,
    desc: "Rain Garden"
  },
  {
    className: "features_box",
    icon: <Icon icon="emojione-monotone:party-popper" className='icon' />,
    desc: "Party Lawn"
  },
  {
    className: "features_box",
    icon: <Icon icon="material-symbols:dine-lamp-outline" className='icon' />,
    desc: "Party Deck"
  },
];

// Responsive chunking logic
function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// Custom hook to get responsive chunk size
function useResponsiveChunkSize() {
  const [chunkSize, setChunkSize] = React.useState(4);

  React.useEffect(() => {
    function handleResize() {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 700) {
        setChunkSize(1);
      } else if (width >= 700 && width < 1024) {
        setChunkSize(3);
      } else {
        setChunkSize(4);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return chunkSize;
}

const Features: React.FC = () => {
  const chunkSize = useResponsiveChunkSize();

  // Memoize rows for performance
  const clubhouseRows = useMemo(() => chunkArray(clubhouseAmenities, chunkSize), [chunkSize]);
  const parkRows = useMemo(() => chunkArray(parkAmenities, chunkSize), [chunkSize]);

  // Helper to determine if a row has less than chunkSize boxes
  const getRowClass = (row: Amenity[]) => {
    // If row has less than chunkSize, add a class to stretch the boxes
    return row.length < chunkSize ? "features-row features-row--stretch" : "features-row";
  };

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
  
  return (
    <>
      <section className='wrapper my-8'>
        <h2 className='text-center section_heading mt-5'>features</h2>
        <div className="masterplan-divider" />
        <div className="flex flex-col gap-10 items-start w-full mt-8">
          {/* Clubhouse Features */}
          <div className="w-full">
            <h3 className="features-section-title">Clubhouse Features</h3>
            <div className="animated_line mb-8"></div>
            {clubhouseRows.map((row, idx) => (
              <div className={getRowClass(row)} key={`clubhouse-row-${idx}`}>
                {row.map((box, i) => (
                  <div className={box.className} key={`clubhouse-box-${idx}-${i}`}>
                    <div className="features_icon">
                      {box.icon}
                    </div>
                    <h5 className='capitalize font-bold'>{box.desc}</h5>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Park Features */}
          <div className="w-full">
            <h3 className="features-section-title">Park Features</h3>
            <div className="animated_line mb-8"></div>
            {parkRows.map((row, idx) => (
              <div className={getRowClass(row)} key={`park-row-${idx}`}>
                {row.map((box, i) => (
                  <div className={box.className} key={`park-box-${idx}-${i}`}>
                    <div className="features_icon">
                      {box.icon}
                    </div>
                    <h5 className='capitalize font-bold'>{box.desc}</h5>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Features
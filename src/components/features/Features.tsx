"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

const baseBoxes = [
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

// Generate 30 boxes by repeating baseBoxes, but do not add numbers to desc
const totalBoxes = Array.from({ length: 30 }, (_, i) => {
  const base = baseBoxes[i % baseBoxes.length];
  return {
    ...base,
    desc: base.desc
  };
});

// Helper to chunk array into groups of 3
function chunkArray(arr: any[], size: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const Features = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [previousCount, setPreviousCount] = useState(6);

  const handleLoadMore = () => {
    setPreviousCount(visibleCount);
    setVisibleCount((prev) => Math.min(prev + 3, 30));
  };

  // Only show up to visibleCount
  const visibleBoxes = totalBoxes.slice(0, visibleCount);
  const rows = chunkArray(visibleBoxes, 3);

  return (
    <>
      <section className='wrapper my-8'>
        <h2 className='text-center uppercase section_heading mt-5 transition-all duration-500'>features</h2>
        <div className='flex flex-col items-center justify-center gap-3 w-full'>
          {rows.map((row, rowIdx) => (
            <div
              className="flex flex-row items-center justify-center gap-3 w-full"
              key={rowIdx}
            >
              {row.map((box, idx) => {
                const globalIdx = rowIdx * 3 + idx;
                const isNew = globalIdx >= previousCount && globalIdx < visibleCount;
                return (
                  <div
                    className={`${box.className} mt-1 ${isNew ? 'fade-in-up' : ''}`}
                    key={idx}
                  >
                    <div className="features_icon">
                      {box.icon}
                    </div>
                    <h5 className='capitalize font-bold'>{box.desc}</h5>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {visibleCount < 30 && (
          <div className="flex justify-center mt-3">
            <button
              className="px-6 py-3 w-[75%] bg-[var(--blue)] text-white rounded-lg font-semibold hover:bg-transparent hover:border hover:border-[var(--blue)] hover:text-[var(--blue)] transition-all duration-500 active:border-0 focus:border-0 focus:outline-none cursor-pointer"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default Features
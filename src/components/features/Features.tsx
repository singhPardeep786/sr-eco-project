"use client"
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

// 30 features as before
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

// Split into two rows of 15
const row1 = baseBoxes.slice(0, 15);
const row2 = baseBoxes.slice(15, 30);

const Features = () => {
  // For accessibility, pause animation on hover/focus
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  // GSAP: Animation speed state
  // Instead of a number, use an object so GSAP can animate its property
  const animationSpeed = useRef<{ value: number }>({ value: 32 }); // seconds, default

  // Store animation style elements for cleanup
  const styleElRef = useRef<HTMLStyleElement | null>(null);

  // Helper to update animation duration in CSS
  const updateAnimationDuration = (duration: number) => {
    // Remove previous style if exists
    if (styleElRef.current) {
      styleElRef.current.remove();
      styleElRef.current = null;
    }
    // Create new style element
    const style = document.createElement('style');
    style.innerHTML = `
      .features-reel-row-1 {
        animation: features-reel-left ${duration}s linear infinite;
      }
      .features-reel-row-2 {
        animation: features-reel-right ${duration}s linear infinite;
      }
    `;
    document.head.appendChild(style);
    styleElRef.current = style;
  };

  useEffect(() => {
    // Accepts HTMLDivElement, not RefObject
    const handlePause = (el: HTMLDivElement | null, pause: boolean) => {
      if (el) {
        el.style.animationPlayState = pause ? 'paused' : 'running';
      }
    };
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;
    if (!r1 || !r2) return;

    const pause = () => {
      handlePause(r1, true);
      handlePause(r2, true);
    };
    const play = () => {
      handlePause(r1, false);
      handlePause(r2, false);
    };

    r1.addEventListener('mouseenter', pause);
    r1.addEventListener('mouseleave', play);
    r2.addEventListener('mouseenter', pause);
    r2.addEventListener('mouseleave', play);

    // For keyboard accessibility
    r1.addEventListener('focusin', pause);
    r1.addEventListener('focusout', play);
    r2.addEventListener('focusin', pause);
    r2.addEventListener('focusout', play);

    // GSAP: Scroll speed up effect
    let ticking = false;
    let lastScrollY = window.scrollY;
    let baseDuration = 32; // seconds
    let fastDuration = 18; // seconds (faster)
    let timeoutId: number | null = null;

    // Set initial animation duration
    updateAnimationDuration(baseDuration);

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = Math.abs(currentScrollY - lastScrollY);

          // If user is scrolling down (or up), speed up
          if (scrollDelta > 5) {
            // Animate to fast duration using GSAP
            gsap.to(animationSpeed.current, {
              value: fastDuration,
              duration: 0.5,
              onUpdate: () => {
                updateAnimationDuration(animationSpeed.current.value);
              }
            });
            // Reset to base after 1.2s of no scroll
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
              gsap.to(animationSpeed.current, {
                value: baseDuration,
                duration: 1.2,
                onUpdate: () => {
                  updateAnimationDuration(animationSpeed.current.value);
                }
              });
            }, 1200);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial value
    animationSpeed.current.value = baseDuration;

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      r1.removeEventListener('mouseenter', pause);
      r1.removeEventListener('mouseleave', play);
      r2.removeEventListener('mouseenter', pause);
      r2.removeEventListener('mouseleave', play);
      r1.removeEventListener('focusin', pause);
      r1.removeEventListener('focusout', play);
      r2.removeEventListener('focusin', pause);
      r2.removeEventListener('focusout', play);
      window.removeEventListener('scroll', onScroll);
      if (styleElRef.current) {
        styleElRef.current.remove();
        styleElRef.current = null;
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <style>{`
        .features-reel-row {
          display: flex;
          flex-direction: row;
          gap: 1.25rem;
          width: max-content;
          min-width: 100vw;
          will-change: transform;
        }
        .features-reel-outer {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        /* The animation duration for .features-reel-row-1 and .features-reel-row-2
           will be dynamically injected via JS for scroll speed effect */
        @keyframes features-reel-left {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes features-reel-right {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 900px) {
          .features-reel-row {
            gap: 0.75rem;
          }
        }
        @media (max-width: 600px) {
          .features-reel-row {
            gap: 0.5rem;
          }
          .features_box {
            min-width: 180px;
            height: 170px;
            font-size: 0.95rem;
          }
          .features_icon .icon {
            font-size: 2.1rem;
          }
        }
        @media (max-width: 450px) {
          .features_box {
            min-width: 140px;
            height: 140px;
            font-size: 0.85rem;
          }
          .features_icon .icon {
            font-size: 1.5rem;
          }
        }
      `}</style>
      <section className='wrapper my-8'>
        <h2 className='text-center uppercase section_heading mt-5 transition-all duration-500 text-[var(--blue)]'>features</h2>
        <div className="flex flex-col gap-6 items-center w-full mt-8">
          {/* Row 1: left to right */}
          <div className="features-reel-outer" tabIndex={0}>
            <div
              className="features-reel-row features-reel-row-1"
              ref={row1Ref}
              aria-label="Feature highlights row 1"
            >
              {[...row1, ...row1].map((box, idx) => (
                <div
                  className={`${box.className} min-w-[220px] md:w-[220px] flex-shrink-0 flex-grow-0`}
                  key={`row1-${idx}`}
                  tabIndex={-1}
                >
                  <div className="features_icon">
                    {box.icon}
                  </div>
                  <h5 className='capitalize font-bold'>{box.desc}</h5>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2: right to left */}
          <div className="features-reel-outer" tabIndex={0}>
            <div
              className="features-reel-row features-reel-row-2"
              ref={row2Ref}
              aria-label="Feature highlights row 2"
            >
              {[...row2, ...row2].map((box, idx) => (
                <div
                  className={`${box.className} min-w-[220px] md:w-[220px] flex-shrink-0 flex-grow-0`}
                  key={`row2-${idx}`}
                  tabIndex={-1}
                >
                  <div className="features_icon">
                    {box.icon}
                  </div>
                  <h5 className='capitalize font-bold'>{box.desc}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Features
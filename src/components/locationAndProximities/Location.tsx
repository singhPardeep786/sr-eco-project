"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Fancybox } from "@fancyapps/ui";
import Proximities from './Proximities';

const Location = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panzoomRef = useRef<HTMLDivElement>(null);

  // Bind Fancybox only for location_map and handle close event to hide second image
  useEffect(() => {
    // Bind Fancybox and listen for close event
    Fancybox.bind("[data-fancybox='location_map']", {
      on: {
        close: () => {
          setIsOpen(false);
        }
      }
    });
    return () => {
      Fancybox.destroy();
    }
  }, []);

  // Panzoom state
  const [isPanning, setIsPanning] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [translate, setTranslate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  // Mouse pan handlers
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPanning) return;
      setTranslate(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    };

    const handleMouseUp = () => setIsPanning(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPanning, isOpen]);

  // Touch pan handlers
  useEffect(() => {
    if (!isOpen) return;

    let lastTouch: { x: number; y: number } | null = null;

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPanning || !lastTouch) return;
      const touch = e.touches[0];
      const dx = touch.clientX - lastTouch.x;
      const dy = touch.clientY - lastTouch.y;
      setTranslate(prev => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
      lastTouch = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = () => {
      setIsPanning(false);
      lastTouch = null;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        setIsPanning(true);
        lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const node = panzoomRef.current;
    if (node) {
      node.addEventListener('touchstart', handleTouchStart);
      node.addEventListener('touchmove', handleTouchMove);
      node.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (node) {
        node.removeEventListener('touchstart', handleTouchStart);
        node.removeEventListener('touchmove', handleTouchMove);
        node.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isPanning, isOpen]);

  // Wheel zoom handler
  useEffect(() => {
    if (!isOpen) return;
    const node = panzoomRef.current;
    if (!node) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      let newScale = scale - e.deltaY * 0.001;
      newScale = Math.max(1, Math.min(4, newScale));
      setScale(newScale);
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      node.removeEventListener('wheel', handleWheel);
    };
  }, [scale, isOpen]);

  // Reset pan/zoom when closed
  useEffect(() => {
    if (!isOpen) {
      setTranslate({ x: 0, y: 0 });
      setScale(1);
      setIsPanning(false);
    }
  }, [isOpen]);

  // Animations for modal and image
  const modalAnimation = isOpen
    ? {
        animation: 'fadeInModal 0.35s cubic-bezier(.4,0,.2,1)',
      }
    : {};

  const imageAnimation = isOpen
    ? {
        animation: 'zoomInImage 0.5s cubic-bezier(.4,0,.2,1)',
      }
    : {};

  // Compose transform style for pan/zoom
  const panZoomStyle: React.CSSProperties = {
    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
    transition: isPanning ? 'none' : 'transform 0.2s cubic-bezier(.4,0,.2,1)',
    cursor: isPanning ? 'grabbing' : 'grab',
    ...imageAnimation,
  };

  return (
    <>
      <div id='location'></div>
      <section className='wrapper'>
        <h2 className='section_heading text-center mt-8'>Location</h2>
        <div className="heading-divider" />
        <div className="w-full md:flex items-center justify-center">
            <div className="w-full md:w-1/2">
                <div className="w-full flex flex-col items-center bg-zinc-100 p-3 md:p-5 rounded-xl">
                    <a
                    href="/images/location_and_proximity/location.jpg"
                    data-fancybox="location_map"
                    data-caption="SR Eco Park Location"
                    className="w-full"
                    style={{
                        width: '100%',
                        margin: '0 auto',
                        marginBottom: 12,
                        marginTop: 8,
                        cursor: 'zoom-in',
                    }}
                    // Remove onClick to allow Fancybox to work natively
                    >
                    <img
                        src="/images/location_and_proximity/location.jpg"
                        className="masterplan-img"
                        alt="SR Eco Park Location"
                    />
                    </a>
                </div>
                {/* Show custom modal only if isOpen is true (i.e., user clicked for custom zoom/pan, not Fancybox) */}
                {isOpen && (
                    <div
                    className="masterplan-modal-bg"
                    style={modalAnimation}
                    onClick={() => setIsOpen(false)}
                    >
                    <div
                        ref={panzoomRef}
                        className="masterplan-modal-img"
                        style={panZoomStyle}
                        onMouseDown={e => {
                        e.stopPropagation();
                        setIsPanning(true);
                        setOrigin({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseUp={e => {
                        setIsPanning(false);
                        }}
                        onMouseLeave={e => {
                        setIsPanning(false);
                        }}
                        onMouseMove={e => {
                        if (!isPanning) return;
                        setTranslate(prev => ({
                            x: prev.x + e.movementX,
                            y: prev.y + e.movementY,
                        }));
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                        src="/images/location_and_proximity/location.jpg"
                        className="masterplan-img"
                        alt="SR Eco Park Location"
                        draggable={false}
                        style={{ width: '100%', height: 'auto', pointerEvents: 'none', userSelect: 'none' }}
                        />
                        <div className="masterplan-modal-tip">
                        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="10" fill="#fff" fillOpacity="0.18"/>
                            <path d="M10 5v6m0 2h.01" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <span>Scroll to zoom, drag to pan</span>
                        </div>
                        <button
                        className="masterplan-reset-btn"
                        onClick={e => {
                            e.stopPropagation();
                            setTranslate({ x: 0, y: 0 });
                            setScale(1);
                        }}
                        aria-label="Reset pan and zoom"
                        type="button"
                        title="Reset pan and zoom"
                        >
                        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path d="M10 4v4l3-3M10 16a6 6 0 1 1 6-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </button>
                    </div>
                    <button
                        className="masterplan-modal-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close"
                        type="button"
                        title="Close"
                    >   
                        &times;
                    </button>
                    </div>
                )}
            </div>
            <div className="w-full md:w-1/2">
                <div className='location_content'>
                    <h3>Everything feels better with a</h3>
                    <h3>peaceful and connected home.</h3>
                    <p className='mt-3 text-black'>Enjoy the new world of improved living while still being minutes away from the city. Set in serene, clean and healthy environment, SR Eco Park is strategically located in Nadargul, close to the major residential areas of Hyderabad city.</p>
                </div>    
            </div>
        </div>
        <Proximities />
      </section>
    </>
  )
}

export default Location
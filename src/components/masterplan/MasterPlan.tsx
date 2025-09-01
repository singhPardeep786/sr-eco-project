"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Fancybox } from "@fancyapps/ui";

const MasterPlan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panzoomRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Bind Fancybox once
  useEffect(() => {
    Fancybox.bind("[data-fancybox='masterplan']");
    return () => {
      Fancybox.destroy();
    }
  }, []);

  // Panzoom state

  const [isPanning, setIsPanning] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [translate, setTranslate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  // Mouse/touch pan handlers
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

  return (
    <>
    <section className='wrapper relative'>
      <section className="masterplan-section">
        <h2 className="masterplan-title uppercase">Master Plan</h2>
        <div className="heading-divider" />
        <div className="w-full flex flex-col items-center">
          <a
            href="/images/master_plan/master_plan.jpg"
            data-fancybox="masterplan"
            data-caption="SR Eco Park Master Plan"
            className="w-full"
            style={{
              width: '100%',
              margin: '0 auto',
              marginBottom: 12,
              marginTop: 8,
              cursor: 'zoom-in',
            }}
          >
            <img
              src="/images/master_plan/master_plan.jpg"
              className="masterplan-img"
              alt="SR Eco Park Master Plan"
            />
          </a>
        </div>
        {isOpen && (
          <div
            className="masterplan-modal-bg"
            style={modalAnimation}
            onClick={() => setIsOpen(false)}
          >
            <div
              ref={panzoomRef}
              className="masterplan-modal-img"
              style={{
                cursor: isPanning ? 'grabbing' : 'grab',
                ...imageAnimation,
              }}
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
                ref={imgRef}
                src="/images/master_plan/master_plan.jpg"
                alt="SR Eco Park Master Plan Enlarged"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                  transition: isPanning ? 'none' : 'transform 0.25s cubic-bezier(.4,0,.2,1)',
                  borderRadius: '20px',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  touchAction: 'none',
                  background: 'linear-gradient(120deg, #f0f8ff 0%, #e6f7ff 100%)',
                }}
                draggable={false}
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
                onClick={() => {
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
      </section>
        {/* <h2 className='bg_text text-[8vw] md:text:[12vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase w-full text-center'>explore</h2> */}
    </section>
    </>
  )
}

export default MasterPlan
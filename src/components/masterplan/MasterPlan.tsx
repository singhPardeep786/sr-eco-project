"use client"
import React, { useState, useRef, useEffect } from 'react'

const MasterPlan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panzoomRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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

  return (
    <>
      <section className='wrapper'>
        <h2 className='text-center section_heading mt-8'>Master Plan</h2>
        <div className="master_plan w-[80%] mx-auto">
          <div
            onClick={() => setIsOpen(true)}
            style={{ cursor: 'zoom-in', display: 'inline-block', width: '100%' }}
          >
            <img
              src="/images/master_plan/master_plan.jpg"
              className='w-full h-auto'
              alt="sr eco park master plan"
              style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}
            />
          </div>
          <div className="text-center mt-2 text-sm text-gray-500">
            Click to view and zoom the master plan
          </div>
        </div>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              zIndex: 1000,
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
            onClick={() => setIsOpen(false)}
          >
            <div
              ref={panzoomRef}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: '16px',
                boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
                background: 'white',
                cursor: isPanning ? 'grabbing' : 'grab',
                overflow: 'hidden',
                position: 'relative',
                touchAction: 'none',
                userSelect: 'none',
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
                alt="sr eco park master plan enlarged"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                  transition: isPanning ? 'none' : 'transform 0.2s',
                  borderRadius: '16px',
                  userSelect: 'none',
                  pointerEvents: 'none', // disables drag image ghost
                  touchAction: 'none',
                }}
                draggable={false}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  borderRadius: 8,
                  padding: '4px 12px',
                  fontSize: 14,
                  zIndex: 1002,
                  pointerEvents: 'auto',
                  userSelect: 'none',
                }}
              >
                <span>Scroll to zoom, drag to pan</span>
              </div>
              <button
                onClick={() => {
                  setTranslate({ x: 0, y: 0 });
                  setScale(1);
                }}
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  fontSize: 18,
                  cursor: 'pointer',
                  zIndex: 1002,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8,
                  userSelect: 'none',
                }}
                aria-label="Reset pan and zoom"
                type="button"
              >
                &#8634;
              </button>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                top: 24,
                right: 32,
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                fontSize: 24,
                cursor: 'pointer',
                zIndex: 1001,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default MasterPlan
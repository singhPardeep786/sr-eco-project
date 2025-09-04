"use client"

import { useState, useEffect, useRef } from 'react';
import React from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const lastScrollY = useRef(0);

  // Define menu items with unique hrefs (ids removed)
  const menuItems = [
    { label: 'Home', href: 'https://srprojects.in/', target: "_blank" },
    { label: 'Intro', href: '#intro' },
    { label: 'Features', href: '#features' },
    { label: 'Master Plan', href: '#plan' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Location', href: '#location' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  // Smooth scroll effect for background and show/hide
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 50);

          if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            setShowNavbar(false);
            setOpacity(0);
          } else {
            setShowNavbar(true);
            setOpacity(1);
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div id='home'></div>
      <nav
        className={`
          sticky top-0 left-0 right-0 nav_bg py-3 z-[999]
          ${scrolled ? 'bg-[var(--maincolor)] backdrop-blur-sm shadow-lg' : 'bg-[var(--lightmaincolor2)]'}
          ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}
        `}
        style={{
          willChange: 'transform',
          opacity: opacity,
          transition: 'opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flex: left menu, center logo, right menu button */}
          <div className="flex items-center h-16 justify-center md:justify-center relative">
            {/* Desktop Menu - Left */}
            <div className="hidden md:flex flex-1 justify-end">
              <div className="flex items-baseline space-x-8">
                {menuItems.slice(0, Math.ceil(menuItems.length / 2)).map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.target}
                    className={`px-3 py-2 text-[.8rem] links uppercase transition-all duration-300 hover:scale-105 relative group rounded-md ${
                      scrolled
                        ? 'text-[var(--white)]'
                        : 'text-white md:text-gray-700'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-[20%] left-[10%] w-0 h-2 z-[-1] transition-all duration-300 group-hover:w-[80%] ${
                      scrolled ? 'bg-[var(--lightmaincolor2)]' : 'bg-[var(--maincolor)]'
                    } `}></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Logo - Center */}
            <div className="flex-shrink-0 z-10 mt-5">
              <div className="font-bold transition-colors duration-300 w-32 sm:w-40 md:w-48 lg:w-30">
                <a href="#home" className="inline-block">
                  <div className="logo mx-0 md:mx-auto">
                    <img src="/images/logo.png" className="w-full h-full" alt="SR Eco Park Logo" />
                  </div>
                </a>
              </div>
            </div>

            {/* Desktop Menu - Right */}
            <div className="hidden md:flex flex-1 justify-start">
              <div className="flex items-baseline space-x-8">
                {menuItems.slice(Math.ceil(menuItems.length / 2)).map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-[.8rem] uppercase links transition-all duration-300 hover:scale-105 relative group rounded-md ${
                      scrolled
                        ? 'text-[var(--white)]'
                        : 'text-white md:text-gray-700'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-[20%] left-[10%] w-0 h-2 z-[-1] transition-all duration-300 group-hover:w-[80%] ${
                      scrolled ? 'bg-[var(--lightmaincolor2)]' : 'bg-[var(--maincolor)]'
                    }`}></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet menu button - Right */}
            <div className="md:hidden flex flex-1 justify-end">
              <button
                onClick={toggleMenu}
                className={`relative w-8 h-8 flex flex-col justify-center items-center transition-all duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}
                aria-label="Toggle menu"
                style={{ outline: 'none', border: 'none', padding: 0 }}
              >
                {/* Hamburger/Cross Lines - SMOOTH CROSS ANIMATION */}
                <span
                  className="absolute left-1/2 top-1/2 w-6 h-0.5 bg-current rounded transition-all duration-400 ease-in-out"
                  style={{
                    transform: isOpen
                      ? 'translate(-50%, -50%) rotate(45deg)'
                      : 'translate(-50%, -9px) rotate(0deg)',
                    transition: 'transform 0.35s cubic-bezier(.4,0,.2,1), background 0.3s',
                  }}
                />
                <span
                  className="absolute left-1/2 top-1/2 w-6 h-0.5 bg-current rounded transition-all duration-300 ease-in-out"
                  style={{
                    opacity: isOpen ? 0 : 1,
                    transform: 'translate(-50%, -10%)',
                    transition: 'opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.35s cubic-bezier(.4,0,.2,1)',
                  }}
                />
                <span
                  className="absolute left-1/2 top-1/2 w-6 h-0.5 bg-current rounded transition-all duration-400 ease-in-out"
                  style={{
                    transform: isOpen
                      ? 'translate(-50%, -50%) rotate(-45deg)'
                      : 'translate(-50%, 9px) rotate(0deg)',
                    transition: 'transform 0.35s cubic-bezier(.4,0,.2,1), background 0.3s',
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 z-40 pointer-events-none`}
          style={{
            transition: 'background 0.3s cubic-bezier(.4,0,.2,1)',
            height: '100vh', // Ensure overlay always covers full viewport height
          }}
        >
          {/* Overlay background */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-smooth bg-black ${
              isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleMenu}
            style={{
              transition: 'opacity 0.5s cubic-bezier(.4,0,.2,1)',
              height: '100vh', // Ensure background always covers full viewport height
            }}
          />
          {/* Slide-in menu panel */}
          <div
            className={`relative min-h-screen w-80 max-w-sm shadow-xl transform transition-transform duration-500 ease-smooth ${
              isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
            } ${isOpen ? 'bg-white/90 backdrop-blur-md' : 'bg-white'}`}
            style={{
              transition: 'transform 0.5s cubic-bezier(.4,0,.2,1), background 0.3s cubic-bezier(.4,0,.2,1)',
            }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="text-2xl font-bold text-gray-900">Menu</div>
                <button
                  onClick={toggleMenu}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="space-y-4">
                {menuItems.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={toggleMenu}
                    target={item.target}
                    className={`block px-4 py-3 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-2 menu-link-animate`}
                    style={{
                      animation: isOpen
                        ? `slideInMenu 0.45s cubic-bezier(.4,0,.2,1) both`
                        : 'none',
                      animationDelay: isOpen ? `${index * 60 + 100}ms` : '0ms',
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar

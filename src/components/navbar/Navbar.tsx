"use client"

import { useState, useEffect } from 'react';
import React from 'react'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = ['Home', 'About', 'Services', 'Portfolio', 'Location', 'Contact'];
  
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav_bg py-3 ${
        scrolled ? 'bg-[var(--lightmaincolor)] backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flex: left menu, center logo, right menu button */}
          <div className="flex items-center h-16 justify-between md:justify-center relative">
            {/* Desktop Menu - Left */}
            <div className="hidden md:flex flex-1 justify-end">
              <div className="flex items-baseline space-x-8">
                {menuItems.slice(0, Math.ceil(menuItems.length / 2)).map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className={`px-3 py-2 text-[.8rem] uppercase font-bold transition-all duration-300 hover:scale-105 relative group rounded-md ${
                      scrolled 
                        ? 'text-[var(--bodybg)]' 
                        : 'text-white lg:text-gray-700'
                    }`}
                  >
                    {item}
                    <span className="absolute bottom-[20%] left-[10%] w-0 h-2 z-[-1] bg-[var(--maincolor)] transition-all duration-300 group-hover:w-[80%]"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Logo - Center */}
            <div className="flex-shrink-0 z-10">
              <div className="font-bold transition-colors duration-300 w-32 sm:w-40 md:w-48 lg:w-30">
                <a href="/" className='inline-block w-fit'>
                  <div className="logo mx-0 md:mx-auto">
                    <img src="/images/logo.jpg" className='w-full h-full' alt="SR Eco Park Logo" />
                  </div>
                </a>
              </div>
            </div>

            {/* Desktop Menu - Right */}
            <div className="hidden md:flex flex-1 justify-start">
              <div className="flex items-baseline space-x-8">
                {menuItems.slice(Math.ceil(menuItems.length / 2)).map((item, index) => (
                  <a
                    key={index + Math.ceil(menuItems.length / 2)}
                    href={`#${item.toLowerCase()}`}
                    className={`px-3 py-2 text-[.8rem] uppercase font-bold transition-all duration-300 hover:scale-105 relative group rounded-md ${
                      scrolled 
                        ? 'text-[var(--bodybg)]' 
                        : 'text-white lg:text-gray-700'
                    }`}
                  >
                    {item}
                    <span className="absolute bottom-[20%] left-[10%] w-0 h-2 z-[-1] bg-[var(--maincolor)] transition-all duration-300 group-hover:w-[80%]"></span>
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
              >
                {/* Hamburger/Cross Lines */}
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-out ${
                    isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-out ${
                    isOpen ? '-rotate-45 -translate-y-0' : 'translate-y-1.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Menu Overlay */}
        <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible'
        }`}>
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isOpen ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={toggleMenu}
          />
          {/* 
            Fix: When menu is open, always show a solid/blurred background for the menu panel,
            regardless of scroll state. We'll use bg-white/90 and backdrop-blur for a consistent look.
          */}
          <div className={`relative ${
              isOpen ? 'bg-white/90 backdrop-blur-md' : 'bg-white'
            } min-h-screen w-80 max-w-sm shadow-xl transform transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
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
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    onClick={toggleMenu}
                    className={`block px-4 py-3 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:translate-x-2 ${
                      isOpen ? 'animate-slideIn' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

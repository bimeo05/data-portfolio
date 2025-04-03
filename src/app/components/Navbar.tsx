'use client'

import { useState, useEffect } from 'react'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to track active section and add background after scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Add background color after scrolling
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const homeSection = document.getElementById('home')?.getBoundingClientRect();
      const aboutSection = document.getElementById('about')?.getBoundingClientRect();
      const workSection = document.getElementById('work')?.getBoundingClientRect();
      const contactSection = document.getElementById('contact')?.getBoundingClientRect();

      if (homeSection && homeSection.top <= 100 && homeSection.bottom >= 100) {
        setActiveSection('home');
      } else if (aboutSection && aboutSection.top <= 100 && aboutSection.bottom >= 100) {
        setActiveSection('about');
      } else if (workSection && workSection.top <= 100 && workSection.bottom >= 100) {
        setActiveSection('work');
      } else if (contactSection && contactSection.top <= 100 && contactSection.bottom >= 100) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`py-4 transition-all duration-300 font-mono ${scrolled ? 'py-3 border-b border-[#2a2a2a]' : 'py-5'}`}>
      <div className="flex items-center justify-between">
        <div className="font-semibold text-xl text-gray-300">
          <a href="#" className="hover:text-white transition-colors">
            AATOS&apos;S DIRECTORY
          </a>
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 ml-auto mr-6">
          <li>
            <a 
              href="#" 
              className={`hover:text-white transition-colors ${activeSection === 'home' ? 'text-white font-medium' : 'text-gray-400'}`}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`hover:text-white transition-colors ${activeSection === 'about' ? 'text-white font-medium' : 'text-gray-400'}`}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#work" 
              className={`hover:text-white transition-colors ${activeSection === 'work' ? 'text-white font-medium' : 'text-gray-400'}`}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={`hover:text-white transition-colors ${activeSection === 'contact' ? 'text-white font-medium' : 'text-gray-400'}`}
            >
              Contact
            </a>
          </li>
        </ul>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 right-0 left-0 bg-[#0a0a0c] shadow-lg border border-[#2a2a2a] rounded-b-lg p-4 md:hidden z-50">
            <ul className="flex flex-col space-y-4">
              <li>
                <a 
                  href="#" 
                  className={`block py-2 hover:text-white transition-colors ${activeSection === 'home' ? 'text-white font-medium' : 'text-gray-400'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className={`block py-2 hover:text-white transition-colors ${activeSection === 'about' ? 'text-white font-medium' : 'text-gray-400'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#work" 
                  className={`block py-2 hover:text-white transition-colors ${activeSection === 'work' ? 'text-white font-medium' : 'text-gray-400'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={`block py-2 hover:text-white transition-colors ${activeSection === 'contact' ? 'text-white font-medium' : 'text-gray-400'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
        
        {/* Dark Mode Toggle */}
        <button className="p-2 rounded-full bg-[#2a2a2a] text-gray-400 hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </button>
      </div>
    </nav>
  )
} 
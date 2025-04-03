'use client'

import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { LinkSection } from './components/LinkSection'
import { Footer } from './components/Footer'
import { TypedText } from './components/TypedText'
import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'

export default function Home() {
  const [titleComplete, setTitleComplete] = useState(false);
  const [subtitleComplete, setSubtitleComplete] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(true);

  // Handle scroll event to hide the scroll button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowScrollButton(false);
      } else {
        setShowScrollButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative font-mono bg-black text-white">
      {/* Fixed Sphere Background for entire site */}
      <div 
        className="fixed inset-0 z-0 flex items-center justify-center"
        style={{
          backgroundColor: 'black',
        }}
      >
        <div
          className="w-[90vh] h-[90vh]"
          style={{
            backgroundImage: 'url(/sphere-background.gif)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7,
          }}
        />
      </div>

      {/* Navbar with more gray color */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] bg-opacity-95 shadow-md">
        <div className="container mx-auto px-6 max-w-6xl">
          <Navbar />
        </div>
      </div>
      
      {/* Hero Section - Full Viewport Height */}
      <section id="home" className="min-h-screen pt-20 flex flex-col justify-center relative overflow-hidden">
        {/* Content */}
        <div className="container mx-auto px-6 max-w-6xl flex-grow flex flex-col justify-center items-center relative z-10">
          <div className="text-7xl font-bold text-center mb-8 h-[88px] glitch-text relative">
            <TypedText 
              text="Welcome!" 
              speed={100}
              onComplete={() => setTitleComplete(true)}
              className="relative z-10 [text-shadow:0_0_5px_rgba(180,180,180,0.4)]"
            />
          </div>
          
          <div className="text-2xl text-gray-300 text-center max-w-3xl mx-auto min-h-[64px]">
            {titleComplete && (
              <TypedText 
                text="Explore my portfolio and see my journey as a Data Analyst and Finance Bro"
                speed={43}
                blinkFrequency={0.2}
                onComplete={() => setSubtitleComplete(true)}
              />
            )}
          </div>
          
          {subtitleComplete && showScrollButton && (
            <div className="flex justify-center mt-12 opacity-0 animate-fade-in">
              <a href="#about" className="group flex flex-col items-center text-gray-400 hover:text-gray-300 transition-colors">
                <span className="mb-2">Explore My Work</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 animate-bounce" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* About Section - Full Viewport Height */}
      <section id="about" className="min-h-screen pt-20 flex flex-col justify-center relative z-10">
        <div className="container mx-auto px-6 max-w-6xl flex-grow">
          <AboutSection />
        </div>
      </section>

      {/* Links Section */}
      <section id="work" className="min-h-screen pt-20 flex flex-col justify-center relative z-10">
        <div className="container mx-auto px-6 max-w-6xl flex-grow">
          <LinkSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen pt-20 flex flex-col justify-center relative z-10">
        <div className="container mx-auto px-6 max-w-6xl flex-grow">
          <ContactSection />
        </div>
      </section>
      
      {/* Footer */}
      <section className="relative z-10 bg-[#1a1a1a] bg-opacity-95">
        <div className="container mx-auto px-6 max-w-6xl">
          <Footer />
        </div>
      </section>
      
      {/* Scroll up button */}
      <a 
        href="#home" 
        className="fixed bottom-6 left-6 bg-gray-700 text-white p-3 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity z-50"
        style={{ display: showScrollButton ? 'none' : 'block' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </a>
    </main>
  )
} 
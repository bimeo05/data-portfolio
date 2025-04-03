'use client'

import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa'
import { FadeInSection } from './FadeInSection'

export function AboutSection() {
  return (
    <div className="min-h-full flex items-center font-mono">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 py-10">
        <div className="w-full md:w-1/2 space-y-6">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Hi, I&apos;m <br /><span className="text-gray-400">Aatos Pham</span>
            </h1>
          </FadeInSection>
          
          <FadeInSection delay={200}>
            <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
              Data Analyst / Finance Bro
            </h2>
          </FadeInSection>
          
          <div className="space-y-6">
            <FadeInSection delay={400}>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/in/tbimeo/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a href="mailto:thuanduc911@gmail.com" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <FaEnvelope className="w-6 h-6" />
                </a>
                <a href="https://github.com/bimeo05" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={600}>
              <p className="text-gray-300 text-lg leading-relaxed">
                As a Biz student at Aalto University, I thrive at the intersection of data, finance, and technology, transforming complex datasets into actionable insights that drive smarter investment decisions.
              </p>
            </FadeInSection>
            
            <FadeInSection delay={800}>
              <a 
                href="#work" 
                className="inline-block bg-gray-700 group relative overflow-hidden px-8 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                <span className="relative z-10 flex items-center text-white group-hover:text-gray-100">
                  View My Projects
                  <svg
                    className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gray-600 transform transition-transform origin-left scale-x-0 group-hover:scale-x-100"></div>
              </a>
            </FadeInSection>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-end">
          <FadeInSection delay={400}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full shadow-xl border-2 border-[#2a2a2d] bg-[#141418]">
              <div className="w-full h-full">
                <img 
                  src="/IMG_8082.png" 
                  alt="Aatos Pham profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  )
}
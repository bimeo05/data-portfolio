'use client'

import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FadeInSection } from './FadeInSection'
import VideoThumbnail from './VideoThumbnail'

const projects = [
  {
    title: "ESG Investment Analysis",
    description: "Led a team of 4 to assess the investment potential of Bayer AG, a German pharmaceutical company, based on their ESG performance by using Tableau.",
    image: "/esg-investment.png",
    video: "/video/esg.mp4", // Updated to match the uploaded filename
    liveLink: "https://github.com/bimeo05/ESG-Investment-Analysis",
    useVideo: true // Flag to indicate this project should use video instead of image
  },
  // Add more projects here as needed
]

export function LinkSection() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentProject(index);
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
      <div className="space-y-12">
        <FadeInSection>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Projects</h2>
            <p className="text-gray-400 mb-12">Hours of grinding just to show you the best!</p>
          </div>
        </FadeInSection>
        
        <div className="relative">
          {/* Navigation Arrows */}
          <FadeInSection delay={200}>
            <button 
              onClick={prevProject}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-gray-400 hover:text-white transition-colors z-10"
              aria-label="Previous project"
            >
              <FaChevronLeft className="w-8 h-8" />
            </button>

            <button 
              onClick={nextProject}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-gray-400 hover:text-white transition-colors z-10"
              aria-label="Next project"
            >
              <FaChevronRight className="w-8 h-8" />
            </button>
          </FadeInSection>

          {/* Project Display */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <FadeInSection delay={400}>
              <div className="w-full aspect-video bg-[#0f0f12] rounded-lg overflow-hidden border border-[#2a2a2a]">
                {projects[currentProject].useVideo ? (
                  <VideoThumbnail 
                    src={projects[currentProject].video!} 
                    posterImage={projects[currentProject].image}
                    className="w-full h-full"
                  />
                ) : (
                  <img 
                    src={projects[currentProject].image} 
                    alt={projects[currentProject].title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </FadeInSection>
            
            <div className="space-y-4">
              <FadeInSection delay={600}>
                <h3 className="text-2xl font-bold text-white">{projects[currentProject].title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {projects[currentProject].description}
                </p>
              </FadeInSection>
              
              <FadeInSection delay={800}>
                <a
                  href={projects[currentProject].liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-700 group relative overflow-hidden px-8 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  <span className="relative z-10 flex items-center text-white group-hover:text-gray-100">
                    View Me
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

          {/* Pagination Dots */}
          <FadeInSection delay={1000}>
            <div className="flex justify-center space-x-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentProject ? 'bg-white w-4' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useEffect, useRef } from 'react'

// Generate random ASCII and matrix-like characters
const generateMatrixText = () => {
  // Include more technical/hacker-style characters and ASCII symbols with higher density of simple characters
  const characters = '01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン<>[]{}~|¦/\\!@#$%^&*()_+-:;,.?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const length = Math.floor(Math.random() * 15) + 3; // Shorter strings for more tech feel
  
  for (let i = 0; i < length; i++) {
    // Bias toward alphanumeric characters to match the reference image
    const useSimpleChar = Math.random() > 0.3;
    let char;
    
    if (useSimpleChar) {
      // Simple character set (letters, numbers, basic punctuation)
      const simpleChars = 'abcdefghijklmnopqrstuvwxyz0123456789 _-+.,/\\';
      const randomIndex = Math.floor(Math.random() * simpleChars.length);
      char = simpleChars.charAt(randomIndex);
    } else {
      // Full character set
      const randomIndex = Math.floor(Math.random() * characters.length);
      char = characters.charAt(randomIndex);
    }
    
    result += char;
  }
  
  return result;
};

// Add subtle glitch effect to some characters
const addGlitchEffect = (element: HTMLElement) => {
  // Random chance to apply glitch
  if (Math.random() > 0.85) {
    const glitchInterval = setInterval(() => {
      if (!element.isConnected) {
        clearInterval(glitchInterval);
        return;
      }
      
      // Toggle visibility for a glitch effect (more subtle)
      element.style.opacity = (Math.random() > 0.7) ? '0.2' : '0.7';
      
      // Occasionally distort the text
      if (Math.random() > 0.9) {
        element.style.transform = `skew(${Math.random() * 5 - 2.5}deg) scale(${0.9 + Math.random() * 0.2})`;
        element.style.textShadow = `0 0 ${Math.random() * 3}px rgba(180, 180, 180, 0.5)`;
      } else {
        element.style.transform = '';
        element.style.textShadow = '';
      }
    }, 200 + Math.random() * 500);
    
    // Clean up interval after a shorter time
    setTimeout(() => clearInterval(glitchInterval), 3000);
  }
};

export function TechBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create initial text elements with more density
    const createInitialTexts = () => {
      for (let i = 0; i < 150; i++) {
        createTextElement();
      }
    };
    
    // Create a single floating text element
    const createTextElement = () => {
      const textEl = document.createElement('div');
      textEl.className = 'tech-text';
      textEl.innerText = generateMatrixText();
      
      // Random positioning and timing
      const x = Math.random() * containerWidth;
      const y = Math.random() * containerHeight;
      
      // Smaller range of sizes to match the reference image
      const size = 10 + Math.random() * 6; 
      
      // Higher opacity to make text more visible like in the reference
      const opacity = 0.3 + Math.random() * 0.4;
      
      // Slower animations for more readability
      const duration = 15 + Math.random() * 30;
      const delay = Math.random() * 5;
      
      // Apply styles
      textEl.style.left = `${x}px`;
      textEl.style.top = `${y}px`;
      textEl.style.fontSize = `${size}px`;
      textEl.style.opacity = opacity.toString();
      textEl.style.filter = `blur(${Math.random() > 0.9 ? 0.5 : 0}px)`;
      textEl.style.animationDuration = `${duration}s`;
      textEl.style.animationDelay = `${delay}s`;
      
      // Gray color variations for monochrome look
      const grayValue = 130 + Math.random() * 125;
      textEl.style.color = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${opacity})`;
      
      container.appendChild(textEl);
      
      // Add glitch effect to some elements
      addGlitchEffect(textEl);
      
      // Remove element after animation completes
      setTimeout(() => {
        if (container.contains(textEl)) {
          container.removeChild(textEl);
          createTextElement(); // Create a new element to replace this one
        }
      }, (duration + delay) * 1000);
    };
    
    createInitialTexts();
    
    // Create new elements periodically
    const interval = setInterval(() => {
      if (container.childElementCount < 170) {
        createTextElement();
      }
    }, 300);
    
    return () => {
      clearInterval(interval);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);
  
  return <div ref={containerRef} className="tech-background cyberpunk-bg"></div>;
} 
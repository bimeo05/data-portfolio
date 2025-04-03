'use client'

import { useState, useEffect, useRef } from 'react'

interface TypedTextProps {
  text: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
  blinkFrequency?: number; // Higher value = more frequent blinking (0-1)
}

export function TypedText({ text, className = "", speed = 50, onComplete, blinkFrequency = 0.05 }: TypedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // Occasional glitch effect
  useEffect(() => {
    if (isComplete && textRef.current) {
      const glitchInterval = setInterval(() => {
        const shouldGlitch = Math.random() > (1 - blinkFrequency);
        if (shouldGlitch) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 150);
        }
      }, 1000); // Reduced interval time for more frequent checks
      
      return () => clearInterval(glitchInterval);
    }
  }, [isComplete, blinkFrequency]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        // Occasionally add a small typing delay for a more realistic effect
        const delay = Math.random() > 0.9 ? 3 : 1;
        
        setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, delay * speed);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete && onComplete();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <div ref={textRef} className={`font-mono relative ${className} ${isGlitching ? 'glitch-effect' : ''}`}>
      {isGlitching ? (
        <>
          <span className="absolute top-0 left-0 w-full" style={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)',
            transform: 'translate(-2px, 0)',
            opacity: 0.8,
            color: 'rgba(0, 255, 255, 0.8)'
          }}>
            {displayedText}
          </span>
          <span className="absolute top-0 left-0 w-full" style={{ 
            clipPath: 'polygon(0 33%, 100% 33%, 100% 66%, 0 66%)',
            transform: 'translate(2px, 0)',
            color: 'white'
          }}>
            {displayedText}
          </span>
          <span className="absolute top-0 left-0 w-full" style={{ 
            clipPath: 'polygon(0 66%, 100% 66%, 100% 100%, 0 100%)',
            transform: 'translate(-1px, 0)',
            opacity: 0.8,
            color: 'rgba(255, 0, 100, 0.8)'
          }}>
            {displayedText}
          </span>
        </>
      ) : displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-1 bg-gray-400 ml-1 animate-pulse" style={{ height: '100%' }} />
      )}
    </div>
  );
} 
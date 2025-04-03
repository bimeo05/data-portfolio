import React from 'react';

interface VideoThumbnailProps {
  src: string;
  className?: string;
  posterImage?: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ 
  src, 
  className = '', 
  posterImage 
}) => {
  return (
    <div className={`video-thumbnail ${className}`}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover rounded-lg"
        poster={posterImage}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoThumbnail; 
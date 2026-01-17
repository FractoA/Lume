"use client";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimationsPage() {
  const [selectedAnimation, setSelectedAnimation] = useState(null);
  const [galleryAnimations, setGalleryAnimations] = useState([]);

  useEffect(() => {
    const numAnimations = 6;
    const animationIds = Array.from({length: numAnimations}, (_, index) => index + 1);
    
    const shuffledIds = [...animationIds];
    for (let i = shuffledIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
    }
    
    const galleryAnimations = shuffledIds.map(id => {
      const width = 500 + Math.floor(Math.random() * 200);
      const height = width * (0.7 + Math.random() * 0.6);
      
      return {     
        videoSrc: `https://res.cloudinary.com/dvlvkn1vy/video/upload/v1768516199/v_${id}.mp4`,
        thumbnailSrc: `https://res.cloudinary.com/dvlvkn1vy/video/upload/w_500,h_500,c_fill,q_auto,f_jpg/v1753606393/v_${id}.mp4`,
        width: Math.floor(width),
        height: Math.floor(height),
        alt: `Animación ${id}`,
        id: id
      };
    });
    setGalleryAnimations(galleryAnimations);
  }, []);

  return (
    <div className="relative w-screen bg-transparent">
      <Gallery 
        animations={galleryAnimations} 
        onAnimationClick={(anim) => setSelectedAnimation(anim)}
      />

      <AnimatePresence>
        {selectedAnimation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
              onClick={() => setSelectedAnimation(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 flex items-center justify-center z-[101]"
              onClick={() => setSelectedAnimation(null)}
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAnimation(null);
                }}
                className="absolute top-6 right-6 z-[102] text-white hover:text-gray-300 transition-all duration-200 bg-black/50 hover:bg-black/70 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-3xl font-light border border-white/30"
              >
                ×
              </button>
              
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative w-auto h-auto z-[101]"
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxWidth: '95vw', maxHeight: '95vh' }}
                >
                  <video
                    src={selectedAnimation.videoSrc}
                    controls
                    autoPlay
                    loop
                    muted
                    className="w-auto h-auto max-w-full max-h-full object-contain"
                    style={{ maxWidth: 'min(95vw, 1200px)', maxHeight: '95vh' }}
                  />
                </motion.div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = galleryAnimations.findIndex(anim => anim.id === selectedAnimation.id);
                  const prevIndex = (currentIndex - 1 + galleryAnimations.length) % galleryAnimations.length;
                  setSelectedAnimation(galleryAnimations[prevIndex]);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-[102] text-white hover:text-gray-300 transition-all duration-200 bg-black/50 hover:bg-black/70 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light border border-white/30"
              >
                ←
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = galleryAnimations.findIndex(anim => anim.id === selectedAnimation.id);
                  const nextIndex = (currentIndex + 1) % galleryAnimations.length;
                  setSelectedAnimation(galleryAnimations[nextIndex]);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-[102] text-white hover:text-gray-300 transition-all duration-200 bg-black/50 hover:bg-black/70 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light border border-white/30"
              >
                →
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Gallery({ animations, onAnimationClick }) {
  const breakpointColumnsObj = {
    default: 3,
    1536: 3,
    1280: 3,
    1024: 2,
    768: 2,
    640: 1,
    480: 1,
  };

  return (
    <div className="w-full min-h-screen bg-transparent py-5">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -mx-2 md:-mx-3 lg:-mx-4"
        columnClassName="flex flex-col px-2 md:px-3 lg:px-4"
      >
        {animations.map((animation, index) => (
          <AnimationThumbnail
            key={animation.id}
            animation={animation}
            index={index}
            onAnimationClick={onAnimationClick}
          />
        ))}
      </Masonry>
      
      <div className="h-10 md:h-16"></div>
    </div>
  );
}

function AnimationThumbnail({ animation, index, onAnimationClick }) {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);
  const stopTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    
    timeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        
        stopTimeoutRef.current = setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }, 2000);
      }
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    onAnimationClick(animation);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="mb-4 md:mb-5 lg:mb-6 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-black/10">
        <div className="relative" style={{ aspectRatio: `${animation.width}/${animation.height}` }}>
          <div className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
            <Image
              src={animation.thumbnailSrc}
              alt={animation.alt}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
              className="object-cover w-full h-full"
              loading={index < 4 ? "eager" : "lazy"}
              quality={85}
            />
          </div>
          
          <div className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <video
              ref={videoRef}
              src={animation.videoSrc}
              muted
              loop={false}
              playsInline
              preload="metadata"
              className="object-cover w-full h-full"
              style={{ objectFit: 'cover' }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/60 backdrop-blur-sm rounded-full p-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              <span>VIDEO</span>
            </div>
          </div>
        </div>
      </div>
      
    </motion.div>
  );
}
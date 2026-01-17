"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const maxImages = 25;
    const imageIndex = Array.from({length: maxImages}, (_, index) => index);
    
    const randomImage = [...imageIndex];
    for (let i = randomImage.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomImage[i], randomImage[j]] = [randomImage[j], randomImage[i]];
    }
    
    const galleryImages = randomImage.map(number => {
      const width = 450 + Math.floor(Math.random() * 150);
      const height = width * (0.7 + Math.random() * 0.6);
      
      return {
        src: `https://res.cloudinary.com/dvlvkn1vy/image/upload/v1753606393/m_${number +1}.png`,
        width: Math.floor(width),
        height: Math.floor(height),
        alt: `Item ${number + 1}`,
        id: number
      };
    });
    setGalleryImages(galleryImages);
  }, []);

  return (
    <div className="relative w-full bg-transparent">
      <Gallery 
        images={galleryImages} 
        onImageClick={(img) => setSelectedImage(img)}
      />

      {/* Modal para imagen ampliada - Z-INDEX INCREMENTADO */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Overlay de fondo - DEBE ESTAR ENCIMA DE TODO */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]" // Aumentado a z-[100]
              onClick={() => setSelectedImage(null)}
            />
            
            {/* Contenedor principal del modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="fixed inset-0 flex items-center justify-center z-[101]" // Aumentado a z-[101]
              onClick={() => setSelectedImage(null)}
            >
              {/* Botón cerrar - z-index más alto aún */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute top-6 right-6 z-[102] // Aumentado a z-[102]
                  text-white hover:text-gray-300 
                  transition-all duration-200 
                  bg-black/50 hover:bg-black/70 
                  backdrop-blur-sm
                  w-12 h-12 rounded-full 
                  flex items-center justify-center
                  text-3xl font-light
                  border border-white/30"
              >
                ×
              </button>
              
              {/* Contenedor de imagen */}
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative w-auto h-auto z-[101]"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxWidth: '95vw',
                    maxHeight: '95vh'
                  }}
                >
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-auto max-w-full max-h-full object-contain"
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: 'min(95vw, 1200px)',
                      maxHeight: '95vh'
                    }}
                    priority
                  />
                </motion.div>
              </div>
              
              {/* Botones de navegación */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
                  const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                  setSelectedImage(galleryImages[prevIndex]);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-[102]
                  text-white hover:text-gray-300 
                  transition-all duration-200 
                  bg-black/50 hover:bg-black/70 
                  backdrop-blur-sm
                  w-12 h-12 rounded-full 
                  flex items-center justify-center
                  text-2xl font-light
                  border border-white/30"
              >
                ←
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
                  const nextIndex = (currentIndex + 1) % galleryImages.length;
                  setSelectedImage(galleryImages[nextIndex]);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-[102]
                  text-white hover:text-gray-300 
                  transition-all duration-200 
                  bg-black/50 hover:bg-black/70 
                  backdrop-blur-sm
                  w-12 h-12 rounded-full 
                  flex items-center justify-center
                  text-2xl font-light
                  border border-white/30"
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

function Gallery({ images, onImageClick }) {
  const breakpointColumnsObj = {
    default: 4,
    1536: 4,
    1280: 4,
    1024: 3,
    768: 2,
    640: 2,
    480: 1,
  };

  return (
    <div className="w-full min-h-screen bg-transparent py-5">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -mx-2 md:-mx-3 lg:-mx-4"
        columnClassName="flex flex-col px-2 md:px-3 lg:px-4"
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
            className="mb-4 md:mb-5 lg:mb-6 cursor-pointer"
            onClick={() => onImageClick(image)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <div className="relative" style={{ 
                aspectRatio: `${image.width}/${image.height}` 
              }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, 
                         (max-width: 768px) 45vw, 
                         (max-width: 1024px) 30vw, 
                         25vw"
                  className="object-cover w-full h-full
                    transition-transform duration-500 
                    hover:scale-105"
                  loading={index < 4 ? "eager" : "lazy"}
                  quality={85}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </Masonry>
      
      <div className="h-10 md:h-16"></div>
    </div>
  );
}
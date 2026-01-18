"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeClient() {
  const [randomBackground, setRandomBackground] = useState("");
  const [activeTab, setActiveTab] = useState("illustrations"); // "illustrations" | "animations"
  
  // Estados para galería de ilustraciones
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  
  // Estados para galería de animaciones
  const [selectedAnimation, setSelectedAnimation] = useState(null);
  const [galleryAnimations, setGalleryAnimations] = useState([]);

  // Array de fondos disponibles
  const backgrounds = [
    "https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768534021/m_19.png",
    "https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768530226/m_16.png",
    "https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768529952/m_17.png",
    "https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768529919/m_1.jpg",
    "https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768529870/m_15.png",
  ];

  // Seleccionar fondo aleatorio al cargar el componente
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setRandomBackground(backgrounds[randomIndex]);

    // Cargar galería de ilustraciones
    const maxImages = 25;
    const imageIndex = Array.from({ length: maxImages }, (_, index) => index);

    const randomImage = [...imageIndex];
    for (let i = randomImage.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomImage[i], randomImage[j]] = [randomImage[j], randomImage[i]];
    }

    const galleryImages = randomImage.map((number) => {
      const width = 450 + Math.floor(Math.random() * 150);
      const height = width * (0.7 + Math.random() * 0.6);

      return {
        src: `https://res.cloudinary.com/dvlvkn1vy/image/upload/v1753606393/m_${number + 1}.png`,
        width: Math.floor(width),
        height: Math.floor(height),
        alt: `Item ${number + 1}`,
        id: number,
      };
    });
    setGalleryImages(galleryImages);

    // Cargar galería de animaciones
    const numAnimations = 6;
    const animationIds = Array.from({ length: numAnimations }, (_, index) => index + 1);

    const shuffledIds = [...animationIds];
    for (let i = shuffledIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
    }

    const galleryAnimations = shuffledIds.map((id) => {
      const width = 500 + Math.floor(Math.random() * 200);
      const height = width * (0.7 + Math.random() * 0.6);

      return {
        videoSrc: `https://res.cloudinary.com/dvlvkn1vy/video/upload/v1768516199/v_${id}.mp4`,
        thumbnailSrc: `https://res.cloudinary.com/dvlvkn1vy/video/upload/w_500,h_500,c_fill,q_auto,f_jpg/v1753606393/v_${id}.mp4`,
        width: Math.floor(width),
        height: Math.floor(height),
        alt: `Animación ${id}`,
        id: id,
      };
    });
    setGalleryAnimations(galleryAnimations);
  }, []);

  return (
    <div className="relative w-screen min-h-screen">
      {/* Fondo fijo - Capa 1 */}
      <div className="fixed inset-0 -z-20">
        {randomBackground && (
          <Image
            src={randomBackground}
            alt="Background profile"
            fill
            priority
            className="object-cover"
          />
        )}
      </div>

      {/* Contenedor principal */}
      <div className="relative z-0 min-h-screen">
        {/* Overlay con transparencia */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full" style={{ top: "-150px" }}>
            <Image
              src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768627699/t_rsggaa.png"
              fill
              className="object-cover opacity-50"
              alt="Overlay texture"
            />
          </div>
        </div>

        {/* Sección 1: Portada principal */}
        <section className="relative z-10 min-h-screen flex flex-col justify-center items-center p-4 md:p-10">
          {/* Nombre centrado */}
          <div className="flex justify-center items-center mb-8 md:mb-12 w-full">
            <div className="relative w-full max-w-[70vw] md:max-w-[50vw] h-auto aspect-[970/540]">
              <Image
                src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768625948/NAME_r3pizw.gif"
                fill
                alt="LUMENAE - Nombre de la marca"
                className="opacity-50 object-contain"
                sizes="(max-width: 768px) 70vw, 50vw"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Logos de redes sociales */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-6 md:mt-8">
            <a
              href="https://www.instagram.com/lumen4e/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group transform transition-all duration-300 hover:scale-125"
            >
              <div className="p-2 md:p-3 rounded-full transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768625982/INSTAGRAM_LOGO_zt2ncw.png"
                  width={32}
                  height={32}
                  alt="Instagram"
                  className="opacity-40 group-hover:opacity-100 transition-opacity w-8 h-8 md:w-10 md:h-10"
                />
              </div>
            </a>

            <a
              href="mailto:lumen4e@gmail.com"
              className="flex flex-col items-center group transform transition-all duration-300 hover:scale-125"
            >
              <div className="p-2 md:p-3 rounded-full transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768625982/GMAIL_LOGO_ildlpf.png"
                  width={32}
                  height={32}
                  alt="Gmail"
                  className="opacity-40 group-hover:opacity-100 transition-opacity w-8 h-8 md:w-10 md:h-10"
                />
              </div>
            </a>

            <a
              href="https://www.tumblr.com/lumen4e?source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group transform transition-all duration-300 hover:scale-125"
            >
              <div className="p-2 md:p-3 rounded-full transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768625982/TUMBLR_LOGO_j0eah6.png"
                  width={32}
                  height={32}
                  alt="Tumblr"
                  className="opacity-40 group-hover:opacity-100 transition-opacity w-8 h-8 md:w-10 md:h-10"
                />
              </div>
            </a>

            <a
              href="https://www.youtube.com/@Lumen4e"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group transform transition-all duration-300 hover:scale-125"
            >
              <div className="p-2 md:p-3 rounded-full transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768625982/YOUTUBE_LOGO_kscmyr.png"
                  width={32}
                  height={32}
                  alt="YouTube"
                  className="opacity-40 group-hover:opacity-100 transition-opacity w-8 h-8 md:w-10 md:h-10"
                />
              </div>
            </a>
          </div>
        </section>

        {/* Sección 2: Galerías con navegación de pestañas */}
        <section className="relative z-10 min-h-screen pt-20 pb-10 px-4 md:px-6">
          {/* Navegación estilo header del layout */}
          <div className="max-w-4xl mx-auto mb-8 md:mb-12">
            <div className="flex justify-center gap-4 md:gap-6">
              <div className="max-w-4xl mx-auto mb-8 md:mb-12">
                <div className="flex justify-center gap-4 md:gap-6">
                  <motion.button
                    onClick={() => setActiveTab("illustrations")}
                    className={`
                      relative px-3 md:px-4 py-1.5 md:py-2
                      font-medium text-xs md:text-sm
                      tracking-wider transition-all duration-300
                      ${activeTab === "illustrations" 
                        ? "text-red-300" 
                        : "text-white/90 hover:text-red-300"
                      }
                      rounded-none
                      hover:scale-105 active:scale-95
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">ILLUSTRACIÓN</span>
                    {activeTab === "illustrations" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setActiveTab("animations")}
                    className={`
                      relative px-3 md:px-4 py-1.5 md:py-2
                      font-medium text-xs md:text-sm
                      tracking-wider transition-all duration-300
                      ${activeTab === "animations" 
                        ? "text-red-300" 
                        : "text-white/90 hover:text-red-300"
                      }
                      rounded-none
                      hover:scale-105 active:scale-95
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">ANIMACIÓN</span>
                    {activeTab === "animations" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Contenedor de galerías con blur degradado */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Fondo con blur degradado */}
              <div className="absolute inset-0 -m-2 md:-m-4 rounded-xl md:rounded-2xl 
                bg-gradient-to-br from-black/40 via-black/30 to-black/20 
                backdrop-blur-xl 
                border border-white/5
                shadow-2xl" />
              
              {/* Overlay de gradiente sutil */}
              <div className="absolute inset-0 -m-2 md:-m-4 rounded-xl md:rounded-2xl 
                bg-gradient-to-tr from-red-400/5 via-transparent to-blue-400/5 
                pointer-events-none" />
              
              {/* Contenido de la galería */}
              <div className="relative z-10 p-3 md:p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "illustrations" ? (
                    <motion.div
                      key="illustrations"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Gallery
                        images={galleryImages}
                        onImageClick={(img) => setSelectedImage(img)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="animations"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GalleryAnimations
                        animations={galleryAnimations}
                        onAnimationClick={(anim) => setSelectedAnimation(anim)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modal para imagen ampliada */}
        <AnimatePresence>
          {selectedImage && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
                onClick={() => setSelectedImage(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="fixed inset-0 flex items-center justify-center z-[101]"
                onClick={() => setSelectedImage(null)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                  className="absolute top-6 right-6 z-[102] text-white hover:text-red-300 transition-all duration-200 bg-black/50 hover:bg-black/70 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-3xl font-light border border-white/30"
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
                    style={{
                      maxWidth: "95vw",
                      maxHeight: "95vh",
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
                        width: "auto",
                        height: "auto",
                        maxWidth: "min(95vw, 1200px)",
                        maxHeight: "95vh",
                      }}
                      priority
                    />
                  </motion.div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id);
                    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                    setSelectedImage(galleryImages[prevIndex]);
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-[102] text-white hover:text-red-300 transition-all duration-200 bg-black/50 hover:bg-black/70 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light border border-white/30"
                >
                  ←
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id);
                    const nextIndex = (currentIndex + 1) % galleryImages.length;
                    setSelectedImage(galleryImages[nextIndex]);
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-[102] text-white hover:text-red-300 transition-all duration-200 bg-black/50 hover:bg-black/70 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light border border-white/30"
                >
                  →
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Modal para animación ampliada */}
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
                  className="absolute top-6 right-6 z-[102] text-white hover:text-red-300 transition-all duration-200 bg-black/50 hover:bg-black/70 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-3xl font-light border border-white/30"
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
                    style={{ maxWidth: "95vw", maxHeight: "95vh" }}
                  >
                    <video
                      src={selectedAnimation.videoSrc}
                      controls
                      autoPlay
                      loop
                      muted
                      className="w-auto h-auto max-w-full max-h-full object-contain"
                      style={{ maxWidth: "min(95vw, 1200px)", maxHeight: "95vh" }}
                    />
                  </motion.div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = galleryAnimations.findIndex((anim) => anim.id === selectedAnimation.id);
                    const prevIndex = (currentIndex - 1 + galleryAnimations.length) % galleryAnimations.length;
                    setSelectedAnimation(galleryAnimations[prevIndex]);
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-[102] text-white hover:text-red-300 transition-all duration-200 bg-black/50 hover:bg-black/70 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light border border-white/30"
                >
                  ←
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = galleryAnimations.findIndex((anim) => anim.id === selectedAnimation.id);
                    const nextIndex = (currentIndex + 1) % galleryAnimations.length;
                    setSelectedAnimation(galleryAnimations[nextIndex]);
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-[102] text-white hover:text-red-300 transition-all duration-200 bg-black/50 hover:bg-black/70 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-2xl font-light border border-white/30"
                >
                  →
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Componente para galería de ilustraciones
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
    <div className="w-full min-h-screen bg-transparent py-4 md:py-5">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -mx-1 md:-mx-2 lg:-mx-3"
        columnClassName="flex flex-col px-1 md:px-2 lg:px-3"
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            className="mb-3 md:mb-4 lg:mb-5 cursor-pointer group"
            onClick={() => onImageClick(image)}
          >
            <div className="relative overflow-hidden rounded-lg md:rounded-xl">
              <div
                className="relative"
                style={{
                  aspectRatio: `${image.width}/${image.height}`,
                }}
              >
                {/* Overlay sutil en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, 
                         (max-width: 768px) 45vw, 
                         (max-width: 1024px) 30vw, 
                         25vw"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading={index < 4 ? "eager" : "lazy"}
                  quality={85}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </Masonry>

      <div className="h-8 md:h-12 lg:h-16"></div>
    </div>
  );
}

// Componente para galería de animaciones
function GalleryAnimations({ animations, onAnimationClick }) {
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
    <div className="w-full min-h-screen bg-transparent py-4 md:py-5">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -mx-1 md:-mx-2 lg:-mx-3"
        columnClassName="flex flex-col px-1 md:px-2 lg:px-3"
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

      <div className="h-8 md:h-12 lg:h-16"></div>
    </div>
  );
}

// Componente para thumbnail de animación
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
        videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e));

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
      className="mb-3 md:mb-4 lg:mb-5 cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-black/20">
        <div className="relative" style={{ aspectRatio: `${animation.width}/${animation.height}` }}>
          <div className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? "opacity-0" : "opacity-100"}`}>
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

          <div className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}>
            <video
              ref={videoRef}
              src={animation.videoSrc}
              muted
              loop={false}
              playsInline
              preload="metadata"
              className="object-cover w-full h-full"
              style={{ objectFit: "cover" }}
            />

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/60 backdrop-blur-sm rounded-full p-3 md:p-4 transform transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full">
            <div className="flex items-center gap-1 md:gap-2">
              <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              <span className="font-medium">PLAY</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
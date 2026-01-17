"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function  HomeClient() {

  
  const [randomBackground, setRandomBackground] = useState("");

  // Array de fondos disponibles
  const backgrounds = [
    "https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768534021/m_19.png",
    "https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768530226/m_16.png",
    "https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768529952/m_17.png",
    "https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768529919/m_1.jpg",
    "https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768529870/m_15.png"
  ];

  // Seleccionar fondo aleatorio al cargar el componente
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setRandomBackground(backgrounds[randomIndex]);
  }, []);

  return (
    <div className="relative w-screen">
      
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
      <div className="relative z-0">
        
        {/* Overlay con transparencia */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full" style={{ top: '-150px' }}>
          <Image
            src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768627699/t_rsggaa.png"
            fill
            className="object-cover opacity-50"
            alt="Overlay texture"
          />
        </div>
        </div>

        {/* Sección 1: Portada principal */}
        <section className="relative z-10 min-h-screen flex flex-col justify-center items-center p-10">

          {/* Nombre centrado */}
          <div className="flex justify-center items-center mb-12 w-full">
            <div className="relative w-full max-w-[50vw] h-auto aspect-[970/540]"> 
              <Image
                src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768625948/NAME_r3pizw.gif"
                fill
                alt="LUMENAE - Nombre de la marca"
                className="opacity-50 object-contain"
                sizes="50vw"
              />
            </div>
          </div>

          {/* Logos de redes sociales */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
            
            <a href="https://www.instagram.com/lumen4e/" target="_blank" rel="noopener noreferrer" 
              className="flex flex-col items-center group transform transition-transform duration-300 hover:scale-110">
              <div className="p-3 rounded-full group-hover:bg-white/5 transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768625982/INSTAGRAM_LOGO_zt2ncw.png"
                  width={40}
                  height={40}
                  alt="Instagram"
                  className="opacity-40 group-hover:opacity-70 transition-opacity"
                />
              </div>
            </a>
            
            <a href="mailto:lumen4e@gmail.com" 
              className="flex flex-col items-center group transform transition-transform duration-300 hover:scale-110">
              <div className="p-3 rounded-full group-hover:bg-white/5 transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768625982/GMAIL_LOGO_ildlpf.png"
                  width={40}
                  height={40}
                  alt="Gmail"
                  className="opacity-40 group-hover:opacity-70 transition-opacity"
                />
              </div>
            </a>
            
            <a href="https://www.tumblr.com/lumen4e?source=share" target="_blank" rel="noopener noreferrer" 
              className="flex flex-col items-center group transform transition-transform duration-300 hover:scale-110">
              <div className="p-3 rounded-full group-hover:bg-white/5 transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768625982/TUMBLR_LOGO_j0eah6.png"
                  width={40}
                  height={40}
                  alt="Tumblr"
                  className="opacity-40 group-hover:opacity-70 transition-opacity"
                />
              </div>
            </a>
            
            <a href="https://www.youtube.com/@Lumen4e" target="_blank" rel="noopener noreferrer" 
              className="flex flex-col items-center group transform transition-transform duration-300 hover:scale-110">
              <div className="p-3 rounded-full group-hover:bg-white/5 transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dvlvkn1vy/image/upload/v1768625982/YOUTUBE_LOGO_kscmyr.png"
                  width={40}
                  height={40}
                  alt="YouTube"
                  className="opacity-40 group-hover:opacity-70 transition-opacity"
                />
              </div>
            </a>

          </div>

        </section>

        {/* Sección 2: ESPACIO VACÍO para mostrar el fondo*/}
        <section className="min-h-screen">
          {/* */}
        </section>

      </div>
    </div>
  );
}
"use client";

import { Inter, Raleway } from "next/font/google";
import { useState, useEffect } from "react";
import "./globals.css";
import { Barriecito } from "next/font/google";

// Fuentes
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const barriecito = Barriecito({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-barriecito',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-raleway',
});

const LinkButton = ({ text, href, className = "", isLogo = false, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`
      transition-all duration-300 
      ${isLogo 
        ? `font-bold tracking-wider ${barriecito.className} text-white` 
        : `font-medium ${raleway.className} text-white`
      }
      ${className}
    `}
  >
    {text}
  </a>
);

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      const isScrollingDown = currentScrollPos > prevScrollPos && currentScrollPos > 10;
      setVisible(!isScrollingDown);
      setPrevScrollPos(currentScrollPos);

      setIsScrolled(currentScrollPos > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Elementos de navegación - Solo Presentación y Contacto
  const navItems = [
    { text: "Presentación", href: "/" },
    { text: "Contacto", href: "/Contact" },
  ];

  // Redes sociales para el menú móvil
  const socialLinks = [
    { 
      href: "https://www.instagram.com/lumen4e/", 
      label: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      href: "mailto:lumen4e@gmail.com", 
      label: "Email",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    { 
      href: "https://www.tumblr.com/lumen4e?source=share", 
      label: "Tumblr",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 11a8 8 0 01-8 8v-6H9V9h2V7.5a3.5 3.5 0 013.5-3.5H16v3h-2a1 1 0 00-1 1v2h3v3h-3v6a5 5 0 005-5h-2z"/>
        </svg>
      )
    },
    { 
      href: "https://www.youtube.com/@Lumen4e", 
      label: "YouTube",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
      )
    },
  ];

  return (
    <>
      <header className={`
        fixed top-0 left-0 right-0 
        z-50 
        transition-all duration-500 ease-in-out
        ${visible ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-black/80 backdrop-blur-md'}
        ${isMenuOpen ? 'bg-black/95 backdrop-blur-lg' : ''}
      `}>
        <nav className="
          container mx-auto px-4 sm:px-6
          flex items-center justify-between
          max-w-7xl
          h-5
          transition-all duration-300
        ">
          <div className="flex items-center">
            <LinkButton 
              text="LUMENAE" 
              href="/" 
              isLogo={true}
              onClick={() => setIsMenuOpen(false)}
              className="
                hover:text-red-300
                transition-colors duration-300
                text-xl sm:text-2xl md:text-3xl
                drop-shadow-lg
              "
            />
          </div>

          {/* Navegación desktop - oculta en móvil */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <LinkButton 
                key={item.text}
                text={item.text} 
                href={item.href}
                className="
                  text-white/90 hover:text-red-300
                  text-sm lg:text-base
                  relative
                  after:content-['']
                  after:absolute after:bottom-0 after:left-0
                  after:w-0 after:h-0.5
                  after:bg-red-400
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              />
            ))}
          </div>

          {/* Botón menu movil */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú"
          >
            <span className={`
              block w-5 h-0.5 bg-white transition-all duration-300  
              ${isMenuOpen ? 'rotate-45 translate-y-1' : ''} 
            `}></span>
            <span className={`
              block w-5 h-0.5 bg-white mt-1 transition-all duration-300
              ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
            `}></span>
            <span className={`
              block w-5 h-0.5 bg-white mt-1 transition-all duration-300 
              ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''} 
            `}></span>
          </button>
        </nav>

        {/* Menú desplegable para móvil */}
        <div className={`
          md:hidden absolute top-full left-0 right-0
          bg-black/95 backdrop-blur-lg
          transition-all duration-300 overflow-hidden
          ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="container mx-auto px-4 py-4">
            {/* Enlaces de navegación */}
            <div className="flex flex-col space-y-3 mb-4">
              {navItems.map((item) => (
                <LinkButton 
                  key={item.text}
                  text={item.text} 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    text-white/90 hover:text-red-300 
                    text-base py-2
                    transition-all duration-300
                    border-b border-white/10 hover:border-red-400/30
                  "
                />
              ))}
            </div>
            
            {/* Separador */}
            <div className="border-t border-white/10 my-3"></div>
            
            {/* Redes sociales */}
            <div className="mb-3">
              <p className="text-white/70 text-xs uppercase tracking-wider mb-2">Redes Sociales</p>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    onClick={() => setIsMenuOpen(false)}
                    className="
                      w-10 h-10 rounded-full
                      flex items-center justify-center
                      bg-white/10 hover:bg-white/20
                      text-white hover:text-red-300
                      transition-all duration-300
                      hover:scale-110 active:scale-95
                      shadow-lg hover:shadow-xl
                      backdrop-blur-sm
                    "
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay para cerrar menú al hacer clic fuera */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.className} ${barriecito.variable} ${raleway.variable}`}>
      <body className="min-h-screen flex flex-col bg-black">
        <Header />
        
        <main className="flex-1">
          <div className="container">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}
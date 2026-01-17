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

const SocialIcon = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="
      w-8 h-8 md:w-10 md:h-10 rounded-full
      flex items-center justify-center
      bg-white/10 hover:bg-white/20
      text-white hover:text-red-300
      transition-all duration-300
      hover:scale-110 active:scale-95
      shadow-lg hover:shadow-xl
      backdrop-blur-sm
    "
  >
    {children}
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

  const navItems = [
    { text: "Presentación", href: "/" },
    { text: "Galería", href: "/Gallery/Illustrations" },
    { text: "Contacto", href: "/Contact" },
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
          ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <LinkButton 
                  key={item.text}
                  text={item.text} 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    text-white/90 hover:text-red-300 
                    text-base py-1.5 
                    transition-all duration-300
                    border-b border-white/10 hover:border-red-400/30
                  "
                />
              ))}
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
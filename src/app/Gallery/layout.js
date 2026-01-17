// app/layout.js
import { Inter } from "next/font/google";
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
});

export const metadata = {
  title: 'LUMENAE',
  description: 'Galería de arte contemporáneo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body className="bg-transparent w-screen">
        <header className="mt-12 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 w-screen">
          <nav className="px-4 py-4 flex justify-center gap-10">
            <a 
              href="/Gallery/Illustrations" 
              className="
                text-gray-700 text-sm 
                hover:text-red-400 
                transition-colors duration-200 
                tracking-wide
                relative
                after:content-['']
                after:absolute after:bottom-0 after:left-0
                after:w-0 after:h-0.5
                after:bg-red-400
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              Illustrations
            </a>
            <a 
              href="/Gallery/Animations" 
              className="
                text-gray-700 text-sm 
                hover:text-red-400 
                transition-colors duration-200 
                tracking-wide
                relative
                after:content-['']
                after:absolute after:bottom-0 after:left-0
                after:w-0 after:h-0.5
                after:bg-red-400
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              Animations
            </a>
          </nav>
        </header>

        {/* Contenido principal */}
        <main className="p-4 w-screen" >
          {children}
        </main>
      </body>
    </html>
  );
}
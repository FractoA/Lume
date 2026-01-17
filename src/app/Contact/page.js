"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (submitStatus === "error" || errorMessage) {
      setSubmitStatus("");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(""), 5000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || "Error al enviar el mensaje. Intenta nuevamente.");
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus("error");
      setErrorMessage("Error de conexión. Por favor, inténtalo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 min-h-screen bg-white text-gray-800 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-2">
            Alexandra / Lumenae
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Artista digital • Estudiante de Ingeniería Informática
          </p>
        </div>

        {/* Diseño en 2 columnas: Imagen+Sobre mí | Formulario */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          
          {/* COLUMNA 1: Imagen + Sobre mí en el mismo cuadro */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-5 md:p-6">
              
              {/* Contenedor para imagen y texto lado a lado */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                
                {/* Imagen */}
                <div className="md:w-2/5 flex-shrink-0">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-full md:h-auto md:aspect-square mx-auto md:mx-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <Image
                      src="/img/profile.jpg"
                      alt="Lumenae"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                </div>
                
                {/* Texto "Sobre mí" */}
                <div className="md:w-3/5 flex flex-col">
                  <h2 className="text-lg sm:text-xl font-normal text-gray-900 mb-3 md:mb-4">
                    Sobre mí
                  </h2>
                  
                  <div className="space-y-3 flex-1">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      Soy artista digital independiente, estudiante de Ingeniería Informática. Trabajo con <span className="text-red-500 font-medium">ilustración digital, animación 2D y desarrollo de videojuegos</span>.
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      Mi enfoque es tanto creativo como técnico, explorando constantemente nuevas herramientas y metodologías.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navegación en la parte inferior del cuadro */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <button
                      onClick={() => setCurrentPage(1)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                        currentPage === 1 
                          ? "bg-red-50 text-red-500 border border-red-200" 
                          : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                      }`}
                    >
                      Presentación
                    </button>
                    
                    <button
                      onClick={() => setCurrentPage(2)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                        currentPage === 2 
                          ? "bg-red-50 text-red-500 border border-red-200" 
                          : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                      }`}
                    >
                      Herramientas
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${currentPage === 1 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                    <div className={`w-2.5 h-2.5 rounded-full ${currentPage === 2 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
                
                {/* Contenido adicional para página 2 */}
                {currentPage === 2 && (
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-lg animate-fadeIn">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-base font-medium text-gray-800 mb-1">Animación 2D:</h3>
                        <p className="text-gray-700 text-sm">
                          Clip Studio Paint • Toon Boom • Adobe Suite
                        </p>
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-800 mb-1">Programación:</h3>
                        <p className="text-gray-700 text-sm">
                          C#, Python • VS Code • Unity, Godot
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </div>

          {/* COLUMNA 2: Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-5 md:p-6 h-full">
              <div className="flex flex-col h-full">
                <div>
                  <h2 className="text-lg sm:text-xl font-normal text-gray-900 mb-3">
                    Contacto
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Escríbeme directamente o usa el formulario
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full h-full min-h-[120px] px-3 py-2 text-sm bg-white border border-gray-300 rounded focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                      placeholder="Escribe tu mensaje..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="text-xs text-gray-600">
                      <p className="font-medium mb-0.5">Email directo:</p>
                      <a 
                        href="mailto:lumen4e@gmail.com" 
                        className="text-red-500 hover:text-red-600 font-medium text-sm"
                      >
                        lumen4e@gmail.com
                      </a>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-5 py-2.5 text-sm rounded-lg font-medium transition-all ${
                        isSubmitting
                          ? "bg-red-200 cursor-not-allowed text-red-700"
                          : "bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                          Enviando...
                        </span>
                      ) : (
                        "Enviar mensaje"
                      )}
                    </button>
                  </div>

                  {/* Mensajes de estado */}
                  {submitStatus === "success" && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded text-sm animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <div>
                          <p className="text-green-700 font-medium">¡Mensaje enviado!</p>
                          <p className="text-green-600 text-xs">Te responderé pronto</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-sm animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <div>
                          <p className="text-red-700 font-medium">Error al enviar</p>
                          <p className="text-red-600 text-xs">{errorMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            Sígueme en redes sociales como <span className="text-red-500 font-medium">@lumen4e</span>
          </p>
        </div>
      </div>

      {/* Estilos para animación */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
import React from "react";

export const Footer = () => {
  return (
    <footer
      style={{ background: "linear-gradient(90deg, #000000, #3533cd)" }}
      className="border-t border-purple-900/50 text-gray-300 pt-12 pb-8 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <span className="text-xl font-bold tracking-wider text-purple-400">
                Level-Up <span className="text-white">Gamer</span>
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Tu tienda de confianza para los mejores accesorios de videojuegos.
              ¡Lleva tu setup al siguiente nivel!
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Navegación
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="/" className="hover:text-purple-400 transition">Inicio</a></li>
              <li><a href="/catalogo" className="hover:text-purple-400 transition">Catálogo</a></li>
              <li><a href="/blog" className="hover:text-purple-400 transition">Gaming Blog</a></li>
              <li><a href="/nosotros" className="hover:text-purple-400 transition">Nosotros</a></li>
            </ul>
          </div>

          {/* Columna 3: Ayuda */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Ayuda
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="/contacto" className="hover:text-purple-400 transition">Contacto</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Seguimiento de envíos</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Preguntas frecuentes</a></li>
            </ul>
          </div>

          {/* Columna 4: Envíos */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Envíos
            </h3>
            <p className="text-xs text-gray-400 mb-2">
              ⚡ Despachos seguros a todo Chile.
            </p>
          </div>
        </div>

        <div className="border-t border-purple-900/40 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>&copy; 2026 Level-Up Gamer. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Términos y condiciones</a>
            <a href="#" className="hover:text-white transition">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
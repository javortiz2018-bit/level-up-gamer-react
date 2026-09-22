import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const abrirCarrito = () => {
    setCarritoAbierto(true);
  };

  const cerrarCarrito = () => {
    setCarritoAbierto(false);
  };

  return (
    <header
      style={{ background: "linear-gradient(90deg, #000000, #3533cd)" }}
      className="border-b border-purple-900/50 shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* LOGO Y NOMBRE DE LA MARCA */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/Logo.png"
                alt="Level-Up-gamer-logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <span className="text-xl font-bold tracking-wider text-purple-400 hover:text-purple-300 hidden md:inline">
                Level-Up <span className="text-white">Gamer</span>
              </span>
            </Link>
          </div>

          {/* BARRA DE BÚSQUEDA */}
          <div className="flex-1 max-w-[150px] sm:max-w-xs md:max-w-md mx-2">
            <div className="relative">
              <input
                id="input-busqueda"
                type="text"
                placeholder="Buscar..."
                className="w-full bg-slate-900/80 text-xs sm:text-sm text-gray-200 placeholder-gray-400 pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg border border-purple-900/50 focus:outline-none focus:border-purple-500"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 sm:pr-3 pointer-events-none text-gray-400 text-xs sm:text-sm">
                🔍
              </span>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-3.5 py-2 rounded-full transition shadow-md shadow-blue-600/30"
            >
              <span>👤</span> Acceso
            </Link>

            {/* Botón para abrir el Carrito */}
            <div className="relative">
              <button
                type="button"
                onClick={abrirCarrito}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition text-sm cursor-pointer shadow-lg"
              >
                🛒
              </button>
              <span
                id="contador-carrito"
                className="absolute -top-1 -right-1 bg-white text-rose-600 text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-slate-950"
              >
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL / DESPLEGABLE DEL CARRITO DE COMPRAS */}
      {carritoAbierto && (
        <div
          id="modal-carrito"
          className="fixed inset-0 bg-black/70 z-50 flex justify-end transition-opacity"
        >
          <div className="bg-slate-900 border-l border-purple-900/50 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-purple-900/50 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  🛒 Tu Carrito Gamer
                </h2>
                <button
                  type="button"
                  onClick={cerrarCarrito}
                  className="text-gray-400 hover:text-white text-2xl font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div
                id="contenedor-items-carrito"
                className="py-8 text-center text-gray-400 text-sm overflow-y-auto max-h-[60vh]"
              >
                <p className="text-4xl mb-2">👾</p>
                <p>Tu carrito está vacío por ahora.</p>
              </div>
            </div>

            <div className="border-t border-purple-900/50 pt-4 space-y-4">
              <div className="flex justify-between text-base font-bold text-white">
                <span>Total:</span>
                <span id="total-carrito" className="text-purple-400">
                  $0 CLP
                </span>
              </div>
              <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition cursor-pointer">
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MENÚ INFERIOR DE NAVEGACIÓN */}
      <nav className="bg-white text-black px-4 sm:px-6 py-2.5 border-t border-gray-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="text-rose-600 font-bold">
                INICIO
              </Link>
            </li>
            <li>
              <Link to="/catalogo" className="hover:text-rose-600 transition">
                CATÁLOGO
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-rose-600 transition">
                GAMING BLOG
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-rose-600 transition">
                CONTACTO
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-rose-600 transition">
                NOSOTROS
              </Link>
            </li>
          </ul>
          <div className="text-xs text-gray-500 hidden md:block">
            ⚡ Envíos a todo Chile
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
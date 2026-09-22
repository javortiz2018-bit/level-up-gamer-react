import React from "react";

const Home = () => {
  const agregarAlCarrito = (nombre, precio) => {
    // Lógica temporal para añadir al carrito
    console.log(`Añadido: ${nombre} - $${precio}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* BANNER PROMOCIONAL PRINCIPAL */}
      <section className="w-full mb-12">
        <a href="/catalogo" className="block w-full">
          <img
            src="images/Sitio web de bodas festivo y charro en beige y verde oscuro.png"
            alt="Oferta Especial Catan"
            className="w-full h-auto object-cover rounded-2xl shadow-lg"
          />
        </a>
      </section>

      {/* TÍTULO DE PRODUCTOS */}
      <div className="text-center mb-8">
        <p className="text-purple-400 text-2xl font-bold tracking-wide">
          Nuevos productos Gamer
        </p>
      </div>

      {/* GRID DE PRODUCTOS DESTACADOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* Producto 1 */}
        <div className="relative block rounded-2xl border border-purple-900/50 bg-slate-900/80 overflow-hidden hover:border-purple-500 transition shadow-lg flex flex-col justify-between">
          <span className="absolute top-2 right-2 z-10 rounded-full bg-rose-600 px-3 py-1 text-xs font-medium tracking-widest text-white uppercase">
            Ahorra 10%
          </span>
          <img src="images/control-gamer.jpg" alt="Control Gamer" className="h-48 w-full object-cover" />
          <div className="p-4 text-center flex-1 flex flex-col justify-between">
            <div>
              <strong className="text-lg font-medium text-white block">Control Pro Gaming</strong>
              <p className="mt-2 text-xs text-gray-400">Diseño ergonómico, alta precisión y compatibilidad total para tu setup.</p>
              <p className="mt-3 text-base font-bold text-purple-400">$35.000 CLP</p>
            </div>
            <button
              type="button"
              onClick={() => agregarAlCarrito('Control Pro Gaming', 35000)}
              className="mt-4 w-full rounded-md bg-rose-600 hover:bg-rose-700 px-4 py-2 text-xs font-medium tracking-widest text-white uppercase transition-colors cursor-pointer"
            >
              Agregar al carrito
            </button>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="relative block rounded-2xl border border-purple-900/50 bg-slate-900/80 overflow-hidden hover:border-purple-500 transition shadow-lg flex flex-col justify-between">
          <span className="absolute top-2 right-2 z-10 rounded-full bg-rose-600 px-3 py-1 text-xs font-medium tracking-widest text-white uppercase">
            Ahorra 10%
          </span>
          <img src="images/teclado-gamer-black.jpg" alt="Teclado Mecánico" className="h-48 w-full object-cover" />
          <div className="p-4 text-center flex-1 flex flex-col justify-between">
            <div>
              <strong className="text-lg font-medium text-white block">Teclado Mecánico RGB Switch Red</strong>
              <p className="mt-2 text-xs text-gray-400">Switches mecánicos rojos táctiles y cable trenzado.</p>
              <p className="mt-3 text-base font-bold text-purple-400">$45.000 CLP</p>
            </div>
            <button
              type="button"
              onClick={() => agregarAlCarrito('Teclado Mecánico RGB Switch Red', 45000)}
              className="mt-4 w-full rounded-md bg-rose-600 hover:bg-rose-700 px-4 py-2 text-xs font-medium tracking-widest text-white uppercase transition-colors cursor-pointer"
            >
              Agregar al carrito
            </button>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="relative block rounded-2xl border border-purple-900/50 bg-slate-900/80 overflow-hidden hover:border-purple-500 transition shadow-lg flex flex-col justify-between">
          <img src="images/audifonos-headset.jpg" alt="Audífonos Gamer" className="h-48 w-full object-cover" />
          <div className="p-4 text-center flex-1 flex flex-col justify-between">
            <div>
              <strong className="text-lg font-medium text-white block">Audífonos RGB Surround 7.1</strong>
              <p className="mt-2 text-xs text-gray-400">Sonido envolvente 7.1 y máxima comodidad para largas horas de juego.</p>
              <p className="mt-3 text-base font-bold text-purple-400">$29.990 CLP</p>
            </div>
            <button
              type="button"
              onClick={() => agregarAlCarrito('Audífonos RGB Surround 7.1', 29990)}
              className="mt-4 w-full rounded-md bg-rose-600 hover:bg-rose-700 px-4 py-2 text-xs font-medium tracking-widest text-white uppercase transition-colors cursor-pointer"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE EVENTOS */}
      <section className="mt-12 bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-purple-900/30">
        <div className="text-center mb-8">
          <p className="text-purple-400 text-2xl font-bold tracking-wide">¡Próximos Eventos!</p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">¡ATENCIÓN GAMERS! LA ARENA TE ESPERA</h2>
          <p className="text-gray-400 text-sm mt-2">Te invitamos a vivir dos días de competencia épica.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <img src="images/Evento1.png" alt="Evento Gamer 1" className="w-full h-auto rounded-xl shadow-lg border border-purple-900/40 object-cover" />
          <img src="images/Evento 2.png" alt="Evento Gamer 2" className="w-full h-auto rounded-xl shadow-lg border border-purple-900/40 object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center mb-8">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-purple-900/50">
            <h3 className="text-lg font-bold text-purple-300">Torneo TCG Masters Día 1</h3>
            <p className="text-xs text-gray-300 mt-1">Pon a prueba tu mazo y dominio estratégico.</p>
            <p className="text-xs font-semibold text-rose-400 mt-2">📍 Eurocentro Local 24 | ⏰ 12:00 a 16:00</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-purple-900/50">
            <h3 className="text-lg font-bold text-purple-300">Torneo TCG Masters Día 2</h3>
            <p className="text-xs text-gray-300 mt-1">Fase final y coronación del Campeón.</p>
            <p className="text-xs font-semibold text-rose-400 mt-2">📍 Eurocentro Local 24 | ⏰ 16:00 a 19:00</p>
          </div>
        </div>

        {/* Mapas Google Maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-purple-900/50">
            <iframe
              title="Mapa Eurocentro 1"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.2766818118407!2d-70.65302032499363!3d-33.4420973970833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a138c9165b%3A0xc5710ab2432b6373!2sGaleria%20Eurocentro!5e0!3m2!1ses-419!2scl!4v1788488452512!5m2!1ses-419!2scl"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-purple-900/50">
            <iframe
              title="Mapa Eurocentro 2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.2766818118407!2d-70.65302032499363!3d-33.4420973970833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a138c9165b%3A0xc5710ab2432b6373!2sGaleria%20Eurocentro!5e0!3m2!1ses-419!2scl!4v1788488452512!5m2!1ses-419!2scl"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Video promocional */}
        <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-purple-900/50 mt-6">
          <video
            controls
            className="w-full h-full object-cover"
            src="images/stockvideo.mp4"
          >
            Tu navegador no soporta el tag de video.
          </video>
        </div>
      </section>

      {/* BOTÓN FLOTANTE SOPORTE */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
        <div className="hidden group-hover:flex flex-col bg-slate-900/95 border border-purple-900/60 rounded-2xl p-4 shadow-2xl backdrop-blur-md w-72 transition-all duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-bold text-white">Soporte en línea</span>
            </div>
            <span className="text-xs text-gray-400">Responde en &lt; 5m</span>
          </div>

          <p className="text-xs text-gray-300 mb-3">¿Tienes problemas con alguna compra o evento? ¡Escríbenos!</p>

          <div className="space-y-2">
            <a
              href="https://wa.me/56912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 text-xs font-semibold text-gray-200 hover:text-white transition group/item"
            >
              <span className="text-lg">💬</span>
              <div className="flex flex-col">
                <span>Chat por WhatsApp</span>
                <span className="text-[10px] text-gray-400 group-hover/item:text-emerald-300">Atención rápida</span>
              </div>
            </a>

            <a
              href="/contacto"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 hover:bg-purple-600/20 border border-slate-700 hover:border-purple-500/50 text-xs font-semibold text-gray-200 hover:text-white transition group/item"
            >
              <span className="text-lg">📩</span>
              <div className="flex flex-col">
                <span>Ticket de Asistencia</span>
                <span className="text-[10px] text-gray-400 group-hover/item:text-purple-300">Formulario web</span>
              </div>
            </a>
          </div>
        </div>

        <button
          type="button"
          aria-label="Abrir Soporte Técnico"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white rounded-full shadow-lg shadow-purple-900/50 border border-purple-400/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a5 5 0 010-7.072m0 0l2.829 2.829m-2.829-2.829L3 3m3.536 5.636a9 9 0 0112.728 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
          </svg>
        </button>
      </div>
    </main>
  );
};

export default Home;
import React, { useState } from "react";

// Datos de ejemplo para los productos
const productosIniciales = [
  {
    id: 1,
    nombre: "Control Gamer Inalámbrico",
    categoria: "Periféricos",
    precio: 29990,
    imagen: "/images/control-gamer.jpg",
    destacado: true,
  },
  {
    id: 2,
    nombre: "Teclado Mecánico RGB",
    categoria: "Periféricos",
    precio: 45990,
    imagen: "/images/teclado-gamer.jpg",
    destacado: false,
  },
  {
    id: 3,
    nombre: "Audífonos Gamer Black",
    categoria: "Audio",
    precio: 35990,
    imagen: "/images/cascos_balck.avif",
    destacado: false,
  },
  {
    id: 4,
    nombre: "Mouse Ergonómico RGB",
    categoria: "Periféricos",
    precio: 19990,
    imagen: "/images/mause.avif",
    destacado: false,
  },
  {
    id: 5,
    nombre: "Mousepad XXL Gamer",
    categoria: "Accesorios",
    precio: 12990,
    imagen: "/images/mausepad.webp",
    destacado: false,
  },
  {
    id: 6,
    nombre: "Silla Gamer Ergonomica Roja/Negra",
    categoria: "Accesorios",
    precio: 119990,
    imagen: "/images/silla_roja_negro.webp",
    destacado: true,
  },
];

const Catalogo = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [orden, setOrden] = useState("defecto");

  // Filtrado por categoría
  const productosFiltrados = productosIniciales.filter((prod) => {
    if (categoriaSeleccionada === "Todas") return true;
    return prod.categoria === categoriaSeleccionada;
  });

  // Ordenamiento por precio
  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (orden === "precio-bajo") return a.precio - b.precio;
    if (orden === "precio-alto") return b.precio - a.precio;
    return 0;
  });

  return (
    <div className="bg-slate-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-500">
            Catálogo de Productos
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Encuentra los mejores accesorios, componentes y juegos para tu Setup
          </p>
        </div>

        {/* BARRA DE FILTROS Y ORDEN */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900 p-4 rounded-xl border border-purple-900/40 mb-8">
          
          {/* Categorías */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["Todas", "Periféricos", "Audio", "Accesorios"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                  categoriaSeleccionada === cat
                    ? "bg-rose-600 text-white shadow-lg"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ordenar Por */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-400">Ordenar:</span>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="bg-slate-800 text-gray-200 text-xs sm:text-sm rounded-lg px-3 py-2 border border-purple-900/50 focus:outline-none"
            >
              <option value="defecto">Por defecto</option>
              <option value="precio-bajo">Menor a Mayor precio</option>
              <option value="precio-alto">Mayor a Menor precio</option>
            </select>
          </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productosOrdenados.map((producto) => (
            <div
              key={producto.id}
              className="bg-slate-900 rounded-xl overflow-hidden border border-purple-900/30 hover:border-purple-500 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Imagen del Producto */}
                <div className="relative overflow-hidden h-48 bg-slate-800 flex items-center justify-center">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {producto.destacado && (
                    <span className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                      DESTACADO
                    </span>
                  )}
                </div>

                {/* Info del Producto */}
                <div className="p-4">
                  <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                    {producto.categoria}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 line-clamp-2">
                    {producto.nombre}
                  </h3>
                </div>
              </div>

              {/* Precio y Botón */}
              <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Precio</span>
                  <span className="text-lg font-extrabold text-rose-500">
                    ${producto.precio.toLocaleString("es-CL")} CLP
                  </span>
                </div>
                <button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-500 text-white p-2.5 rounded-lg transition text-sm cursor-pointer shadow-md"
                  title="Añadir al carrito"
                >
                  🛒
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Catalogo;
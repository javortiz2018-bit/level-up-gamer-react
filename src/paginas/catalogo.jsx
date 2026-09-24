import React, { useState } from "react";
import { useCarrito } from "../context/CarritoContext";

const productosData = [
  {
    id: 101,
    nombre: "Teclado Mecánico RGB Red Switch",
    categoria: "Periféricos",
    precio: 49990,
    puntos: 50,
    imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop",
    descripcion: "Switches red lineales súper rápidos, retroiluminación RGB personalizable."
  },
  {
    id: 102,
    nombre: "Mouse Gamer Pro 16000 DPI",
    categoria: "Periféricos",
    precio: 29990,
    puntos: 30,
    imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop",
    descripcion: "Sensor óptico de alta precisión y peso ultraligero de 68g."
  },
  {
    id: 103,
    nombre: "Audífonos Gamer 7.1 Surround",
    categoria: "Periféricos",
    precio: 59990,
    puntos: 60,
    imagen: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop",
    descripcion: "Sonido posicional 7.1, micrófono con cancelación de ruido."
  },
  {
    id: 104,
    nombre: "Tarjeta de Video RTX 4060 8GB",
    categoria: "Componentes",
    precio: 349990,
    puntos: 350,
    imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop",
    descripcion: "Arquitectura Ada Lovelace, DLSS 3 y Ray Tracing."
  },
  {
    id: 105,
    nombre: "Procesador Ryzen 5 7600X",
    categoria: "Componentes",
    precio: 219990,
    puntos: 220,
    imagen: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop",
    descripcion: "6 núcleos y 12 hilos hasta 5.3GHz, socket AM5, soporte DDR5."
  },
  {
    id: 106,
    nombre: "Monitor Gamer 165Hz 1ms IPS",
    categoria: "Monitores",
    precio: 189990,
    puntos: 190,
    imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop",
    descripcion: "Panel IPS Full HD de 24 pulgadas, tiempo de respuesta de 1ms."
  }
];

export default function Catalogo() {
  const [categoriaSel, setCategoriaSel] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const { agregarAlCarrito } = useCarrito();

  const categorias = ["Todos", "Periféricos", "Componentes", "Monitores"];

  const productosFiltrados = productosData.filter((p) => {
    const coincideCat = categoriaSel === "Todos" || p.categoria === categoriaSel;
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCat && coincideBusqueda;
  });

  return (
    <main className="text-white py-5 min-vh-100" style={{ backgroundColor: "#090d16" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-2 text-white">
            Catálogo de <span style={{ color: "#a855f7" }}>Productos</span>
          </h1>
          <p className="text-secondary small">Explora nuestra tecnología de alto rendimiento</p>
        </div>

        {/* Filtros */}
        <div className="row g-3 mb-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6">
            <div className="d-flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaSel(cat)}
                  className="btn btn-sm fw-bold"
                  style={{
                    backgroundColor: categoriaSel === cat ? "#a855f7" : "#111827",
                    color: categoriaSel === cat ? "#fff" : "#94a3b8",
                    border: "1px solid #1f2937"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-4">
            <input
              type="text"
              placeholder="Buscar producto..."
              className="form-control text-white border-secondary shadow-none"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ backgroundColor: "#111827", borderColor: "#1f2937" }}
            />
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="row g-4">
          {productosFiltrados.map((prod) => (
            <div key={prod.id} className="col-12 col-md-6 col-lg-4">
              <div 
                className="card h-100 border-0 rounded-4 overflow-hidden shadow-lg text-white"
                style={{ backgroundColor: "#111827", border: "1px solid #1f2937" }}
              >
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <div>
                    <span className="small text-uppercase fw-bold d-block mb-1" style={{ color: "#f43f5e", fontSize: "11px" }}>
                      {prod.categoria}
                    </span>
                    <h5 className="card-title fw-bold text-white mb-2">{prod.nombre}</h5>
                    <p className="card-text small mb-4" style={{ color: "#94a3b8" }}>
                      {prod.descripcion}
                    </p>
                  </div>

                  <div>
                    <div className="fs-4 fw-bold text-white mb-3">
                      ${prod.precio.toLocaleString("es-CL")}
                    </div>

                    <button
                      onClick={() => agregarAlCarrito(prod)}
                      className="btn w-100 fw-bold text-uppercase py-2 rounded-3 text-white"
                      style={{ backgroundColor: "#c026d3", border: "none" }}
                    >
                      🛒 Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
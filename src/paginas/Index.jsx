import React, { useState } from "react"; // 👈 Importamos useState
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

// Productos destacados para la página principal
const productosDestacados = [
  {
    id: 101,
    nombre: "Teclado Mecánico RGB Red Switch",
    categoria: "Periféricos",
    precio: 49990,
    puntos: 50,
    imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop",
    descripcion: "Switches red lineales súper rápidos y chasis de aluminio."
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
    id: 104,
    nombre: "Tarjeta de Video RTX 4060 8GB",
    categoria: "Componentes",
    precio: 349990,
    puntos: 350,
    imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop",
    descripcion: "DLSS 3, Ray Tracing de 3ra generación y excelente eficiencia."
  }
];

export default function Index() {
  const [agregadoId, setAgregadoId] = useState(null); // 👈 Estado para controlar el feedback visual
  const { agregarAlCarrito } = useCarrito();

  // Función que agrega al carrito y activa el efecto por 1.5 segundos
  const handleAgregar = (prod) => {
    agregarAlCarrito(prod);
    setAgregadoId(prod.id);
    setTimeout(() => setAgregadoId(null), 1500);
  };

  return (
    <main className="text-white min-vh-100" style={{ backgroundColor: "#090d16" }}>
      {/* Hero Banner */}
      <section 
        className="py-5 border-bottom"
        style={{ backgroundColor: "#0d111d", borderColor: "#1e293b" }}
      >
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <div className="mb-3">
                <span 
                  className="badge px-3 py-2 text-uppercase fw-bold rounded-pill"
                  style={{ 
                    backgroundColor: "rgba(225, 29, 72, 0.2)", 
                    color: "#f43f5e", 
                    fontSize: "11px",
                    letterSpacing: "0.5px"
                  }}
                >
                  🔥 NOVEDADES 2026
                </span>
              </div>

              <h1 className="display-4 fw-normal mb-3 text-white">
                Eleva tu Nivel con{" "}
                <span style={{ color: "#a855f7" }}>
                  Level-Up Gamer
                </span>
              </h1>

              <p className="text-secondary mb-4" style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                Componentes de última generación, periféricos pro y la mejor asesoría en Chile para armar tu Setup definitivo.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link 
                  to="/catalogo" 
                  className="btn fw-bold text-uppercase px-4 py-2 rounded-3 text-white"
                  style={{ backgroundColor: "#c026d3", border: "none", fontSize: "0.85rem" }}
                >
                  VER CATÁLOGO
                </Link>
                <Link 
                  to="/blog" 
                  className="btn fw-bold text-uppercase px-4 py-2 rounded-3"
                  style={{ 
                    backgroundColor: "transparent",
                    borderColor: "#581c87", 
                    color: "#c084fc",
                    border: "1px solid #581c87",
                    fontSize: "0.85rem"
                  }}
                >
                  GAMING BLOG
                </Link>
              </div>
            </div>

            <div className="col-12 col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop"
                alt="Setup Gamer"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: "380px", objectFit: "cover", width: "100%", border: "1px solid #1e293b" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Productos Destacados */}
      <section className="container py-5">
        <div className="text-center mb-4">
          <h3 className="fw-bold text-white mb-1">Productos Destacados</h3>
          <p className="text-secondary small">Lo más vendido y recomendado de la semana</p>
        </div>

        <div className="row g-4">
          {productosDestacados.map((prod) => (
            <div key={prod.id} className="col-12 col-md-4">
              <div 
                className="card h-100 border-0 rounded-4 overflow-hidden shadow-lg text-white"
                style={{ backgroundColor: "#111827", border: "1px solid #1f2937" }}
              >
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <div>
                    <span className="small text-uppercase fw-bold d-block mb-1" style={{ color: "#f43f5e", fontSize: "11px" }}>
                      {prod.categoria}
                    </span>
                    <h6 className="card-title fw-bold text-white mb-2">{prod.nombre}</h6>
                    <p className="card-text small mb-3" style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      {prod.descripcion}
                    </p>
                  </div>

                  <div>
                    <div className="fs-5 fw-bold text-white mb-3">
                      ${prod.precio.toLocaleString("es-CL")}
                    </div>
                    {/* Botón dinámico con feedback verde */}
                    <button
                      onClick={() => handleAgregar(prod)}
                      className="btn w-100 fw-bold text-uppercase py-2 rounded-3 text-white"
                      style={{ 
                        backgroundColor: agregadoId === prod.id ? "#16a34a" : "#c026d3", 
                        border: "none", 
                        fontSize: "0.8rem",
                        transition: "background-color 0.3s ease"
                      }}
                    >
                      {agregadoId === prod.id ? "✓ ¡Agregado!" : "🛒 Agregar al Carrito"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
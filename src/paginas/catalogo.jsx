import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { obtenerProductos } from "../services/api"; // 👈 1. Consumimos el servicio de API

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [categoriaSel, setCategoriaSel] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("defecto");
  const [agregadoId, setAgregadoId] = useState(null);

  const { agregarAlCarrito } = useCarrito();

  // 👈 2. Carga asíncrona de datos mediante useEffect
  useEffect(() => {
    obtenerProductos()
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al obtener los productos:", err);
        setError("No se pudieron cargar los productos.");
        setCargando(false);
      });
  }, []);

  // Categorías extraídas dinámicamente cuando los productos se hayan cargado
  const categorias = useMemo(() => {
    return ["Todos", ...new Set(productos.map((p) => p.categoria))];
  }, [productos]);

  // Filtrado y ordenamiento optimizado
  const productosFiltrados = useMemo(() => {
    return productos
      .filter((p) => {
        const coincideCat = categoriaSel === "Todos" || p.categoria === categoriaSel;
        const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase().trim());
        return coincideCat && coincideBusqueda;
      })
      .sort((a, b) => {
        if (orden === "precio-asc") return a.precio - b.precio;
        if (orden === "precio-desc") return b.precio - a.precio;
        if (orden === "nombre-asc") return a.nombre.localeCompare(b.nombre);
        return 0;
      });
  }, [productos, categoriaSel, busqueda, orden]);

  const handleAgregar = (prod) => {
    agregarAlCarrito(prod);
    setAgregadoId(prod.id);
    setTimeout(() => setAgregadoId(null), 1500);
  };

  // 👈 3. Estado de carga visual manteniendo el estilo gamer
  if (cargando) {
    return (
      <main className="text-white py-5 min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#090d16" }}>
        <div className="text-center">
          <div className="spinner-border mb-3" role="status" style={{ width: "3rem", height: "3rem", color: "#a855f7" }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-secondary small">Cargando catálogo desde el servidor...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="text-white py-5 min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#090d16" }}>
        <div className="text-center">
          <div className="fs-1 mb-2">⚠️</div>
          <h4 className="fw-bold text-danger">{error}</h4>
          <p className="text-secondary small">Intenta recargar la página más tarde.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="text-white py-5 min-vh-100" style={{ backgroundColor: "#090d16" }}>
      <div className="container">
        {/* Encabezado */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-2 text-white">
            Catálogo de <span style={{ color: "#a855f7" }}>Productos</span>
          </h1>
          <p className="text-secondary small">Explora nuestra tecnología de alto rendimiento</p>
        </div>

        {/* Filtros, Búsqueda y Ordenamiento */}
        <div className="row g-3 mb-5 align-items-center justify-content-between">
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaSel(cat)}
                  className="btn btn-sm fw-bold rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: categoriaSel === cat ? "#a855f7" : "#111827",
                    color: categoriaSel === cat ? "#fff" : "#94a3b8",
                    border: "1px solid #1f2937",
                    transition: "all 0.2s ease"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="row g-2">
              <div className="col-12 col-sm-7">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="form-control text-white border-secondary shadow-none"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{ backgroundColor: "#111827", borderColor: "#1f2937" }}
                />
              </div>
              <div className="col-12 col-sm-5">
                <select
                  className="form-select text-white shadow-none"
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  style={{ backgroundColor: "#111827", borderColor: "#1f2937" }}
                >
                  <option value="defecto">Ordenar por...</option>
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                  <option value="nombre-asc">Nombre: A - Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Productos */}
        {productosFiltrados.length === 0 ? (
          <div className="text-center py-5 my-5 rounded-4" style={{ backgroundColor: "#111827", border: "1px solid #1f2937" }}>
            <div className="fs-1 mb-2">🔍</div>
            <h4 className="fw-bold">No se encontraron productos</h4>
            <p className="text-secondary small mb-3">Intenta cambiar la categoría o el término de búsqueda.</p>
            <button
              onClick={() => { setCategoriaSel("Todos"); setBusqueda(""); }}
              className="btn btn-sm text-white fw-bold rounded-3 px-3 py-2"
              style={{ backgroundColor: "#a855f7" }}
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {productosFiltrados.map((prod) => (
              <div key={prod.id} className="col-12 col-md-6 col-lg-4">
                <div 
                  className="card h-100 border-0 rounded-4 overflow-hidden shadow-lg text-white"
                  style={{ backgroundColor: "#111827", border: "1px solid #1f2937" }}
                >
                  {/* Click en la imagen navega al detalle del producto */}
                  <div className="position-relative overflow-hidden">
                    <Link to={`/producto/${prod.id}`}>
                      <img
                        src={prod.imagen}
                        alt={prod.nombre}
                        className="card-img-top"
                        style={{ height: "220px", objectFit: "cover", cursor: "pointer" }}
                      />
                    </Link>
                    <span 
                      className="position-absolute top-0 end-0 m-3 badge rounded-pill"
                      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
                    >
                      +{prod.puntos} pts
                    </span>
                  </div>

                  <div className="card-body d-flex flex-column justify-content-between p-4">
                    <div>
                      <span className="small text-uppercase fw-bold d-block mb-1" style={{ color: "#f43f5e", fontSize: "11px" }}>
                        {prod.categoria}
                      </span>
                      
                      {/* Click en el título navega al detalle del producto */}
                      <Link to={`/producto/${prod.id}`} className="text-decoration-none">
                        <h5 className="card-title fw-bold text-white mb-2" style={{ cursor: "pointer" }}>
                          {prod.nombre}
                        </h5>
                      </Link>

                      <p className="card-text small mb-4" style={{ color: "#94a3b8" }}>
                        {prod.descripcion}
                      </p>
                    </div>

                    <div>
                      <div className="fs-4 fw-bold text-white mb-3">
                        ${prod.precio.toLocaleString("es-CL")}
                      </div>

                      <button
                        onClick={() => handleAgregar(prod)}
                        className="btn w-100 fw-bold text-uppercase py-2 rounded-3 text-white"
                        style={{
                          backgroundColor: agregadoId === prod.id ? "#16a34a" : "#c026d3",
                          border: "none",
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
        )}
      </div>
    </main>
  );
}
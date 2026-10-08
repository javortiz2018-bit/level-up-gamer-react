import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { obtenerProductoPorId } from "../services/api"; 

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  const { usuario } = useAuth(); // Estado del usuario autenticado

  // Estados para manejo asíncrono
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Obtener producto desde el servicio API al montar o cambiar de ID
  useEffect(() => {
    setCargando(true);
    obtenerProductoPorId(id)
      .then((data) => {
        setProducto(data || null);
      })
      .catch((err) => {
        console.error("Error al obtener el producto:", err);
        setProducto(null);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  // Pantalla de carga mientras se consulta la API
  if (cargando) {
    return (
      <div className="container py-5 text-center text-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando producto...</span>
        </div>
      </div>
    );
  }

  // Estado si el producto no existe o falló la petición
  if (!producto) {
    return (
      <div className="container py-5 text-center text-light">
        <h2>Producto no encontrado</h2>
        <Link to="/catalogo" className="btn btn-primary mt-3">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  // Cálculo de puntos (1 punto por cada $1.000 de costo o valor propio)
  const puntosGanados = producto.puntos || Math.floor(producto.precio / 1000);

  return (
    <div className="container py-5 text-light">
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-outline-secondary text-light mb-4"
      >
        ← Volver
      </button>

      <div className="row g-4 align-items-center">
        {/* Imagen del Producto */}
        <div className="col-md-6 text-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded-4 shadow-lg"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%", backgroundColor: "#161c2e" }}
          />
        </div>

        {/* Información del Producto */}
        <div className="col-md-6">
          <span className="badge bg-primary mb-2 text-uppercase">
            {producto.categoria || "Gamer"}
          </span>
          <h1 className="fw-bold">{producto.nombre}</h1>
          <p className="text-secondary">{producto.descripcion}</p>

          <h2 className="text-info fw-bold my-3">
            ${producto.precio?.toLocaleString("es-CL")} CLP
          </h2>

          {/* MOSTRAR PUNTOS SOLO SI LA SESIÓN ESTÁ INICIADA */}
          {usuario ? (
            <div 
              className="p-3 rounded-3 mb-3 d-flex align-items-center gap-2"
              style={{ backgroundColor: "#1c253b", border: "1px solid #00d2ff" }}
            >
              <span className="fs-4">⭐</span>
              <div>
                <strong className="d-block text-info">¡Puntos Level-Up!</strong>
                <small>Con esta compra ganas <strong>{puntosGanados} puntos</strong>.</small>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-3 mb-3 text-secondary" style={{ backgroundColor: "#161b29" }}>
              🔒 <Link to="/login" className="text-info text-decoration-none">Inicia sesión</Link> para acumular puntos con esta compra.
            </div>
          )}

          <button
            onClick={() => agregarAlCarrito(producto)}
            className="btn btn-primary btn-lg w-100 mt-2 fw-bold"
            style={{ backgroundColor: "#8a2be2", borderColor: "#8a2be2" }}
          >
            🛒 Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
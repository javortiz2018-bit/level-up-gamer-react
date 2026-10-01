import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";

export default function Navbar() {
  const { usuario, cerrarSesion } = useAuth();
  const { carrito = [], abrirCarrito } = useCarrito();

  const totalProductos = carrito.reduce(
    (total, item) => total + (item.cantidad || 1),
    0
  );

  return (
    <header
      className="sticky-top"
      style={{ backgroundColor: "#0b0f19", borderBottom: "1px solid #1e293b" }}
    >
      {/* Barra Superior */}
      <div className="container py-2 d-flex align-items-center justify-content-between gap-3">
        <Link
          to="/"
          className="navbar-brand text-white fw-bold d-flex align-items-center gap-2"
        >
          <img
            src="images/Logo.png"
            alt="Level-Up Gamer"
            width="36"
            height="36"
            className="d-inline-block"
          />
          <span style={{ color: "#fff", fontSize: "1.2rem" }}>
            Level-Up <span style={{ color: "#a855f7" }}>Gamer</span>
          </span>
        </Link>

        {/* Acciones */}
        <div className="d-flex align-items-center gap-3">
          {usuario ? (
            <div className="d-flex align-items-center gap-2">
              {/* 🌟 MUESTRA LOS PUNTOS A CUALQUIER USUARIO LOGUEADO */}
              <span className="badge bg-warning text-dark px-2 py-1">
                ⭐ {usuario.puntos || 0} pts
              </span>

              <button
                onClick={cerrarSesion}
                className="btn btn-sm btn-outline-danger"
              >
                {usuario.nombre} (Salir)
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm fw-bold text-white px-3"
              style={{ backgroundColor: "#2563eb", border: "none" }}
            >
              ACCESO
            </Link>
          )}

          <button
            onClick={abrirCarrito}
            className="btn btn-sm position-relative text-white"
            style={{ backgroundColor: "#e11d48", border: "none" }}
            title="Ver Carrito"
          >
            🛒
            {totalProductos > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                {totalProductos}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menú de Navegación */}
      <nav
        style={{ backgroundColor: "white", borderTop: "1px solid #1e293b" }}
        className="py-2"
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex gap-4 fw-bold text-uppercase small">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-none fw-bold"
                  : "text-decoration-none"
              }
              style={({ isActive }) => ({
                color: isActive ? "#f43f5e" : "black",
              })}
            >
              Inicio
            </NavLink>

            <NavLink
              to="/catalogo"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-none fw-bold"
                  : "text-decoration-none"
              }
              style={({ isActive }) => ({
                color: isActive ? "#f43f5e" : "black",
              })}
            >
              Catálogo
            </NavLink>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-none fw-bold"
                  : "text-decoration-none"
              }
              style={({ isActive }) => ({
                color: isActive ? "#f43f5e" : "black",
              })}
            >
              Gaming Blog
            </NavLink>

            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-none fw-bold"
                  : "text-decoration-none"
              }
              style={({ isActive }) => ({
                color: isActive ? "#f43f5e" : "black",
              })}
            >
              Contacto
            </NavLink>

            <NavLink
              to="/nosotros"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-none fw-bold"
                  : "text-decoration-none"
              }
              style={({ isActive }) => ({
                color: isActive ? "#f43f5e" : "black",
              })}
            >
              Nosotros
            </NavLink>
          </div>

          <span className="small d-none d-md-inline" style={{ color: "black" }}>
            ⚡ Envíos a todo Chile
          </span>
        </div>
      </nav>
    </header>
  );
}
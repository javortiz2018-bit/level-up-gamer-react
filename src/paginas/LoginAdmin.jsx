import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginAdmin() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [mostrarModalAccesoDenegado, setMostrarModalAccesoDenegado] = useState(false);

  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 🔒 VALIDACIÓN SEGURA Y ESTRICTA DE CREDENCIALES ADMINISTRATIVAS
    const esCorreoAdminValido = correo.trim().toLowerCase() === "admin@levelup.cl";
    const esClaveValida = contrasena === "admin123";

    if (!esCorreoAdminValido || !esClaveValida) {
      setError("Credenciales inválidas. Se requiere la clave maestra de Administrador.");
      setMostrarModalAccesoDenegado(true);
      return;
    }

    // Iniciar sesión en AuthContext con el perfil de administrador
    iniciarSesion("admin@levelup.cl", "admin123");
    navigate("/admin");
  };

  return (
    <div className="container py-5 text-white" style={{ minHeight: "80vh" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div
            className="p-4 rounded-4 bg-dark border shadow"
            style={{ borderColor: "#a855f7" }}
          >
            <div className="text-center mb-4">
              <span
                className="badge text-white mb-2 px-3 py-2"
                style={{ backgroundColor: "#7c3aed" }}
              >
                🔒 ACCESO SEGURO
              </span>
              <h3 className="fw-bold text-white">Portal Administrativo</h3>
              <p className="text-muted small">
                Ingresa con tus credenciales institucionales para acceder a la gestión de la tienda.
              </p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small fw-bold text-center">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-light small fw-bold">
                  Correo de Administrador
                </label>
                <input
                  type="email"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="admin@levelup.cl"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light small fw-bold">
                  Contraseña Maestra Admin
                </label>
                <input
                  type="password"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-100 py-2 fw-bold text-white mt-2"
                style={{ backgroundColor: "#7c3aed" }}
              >
                INGRESAR AL DASHBOARD
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 🚨 VENTANA EMERGENTE (MODAL) DE ACCESO DENEGADO */}
      {mostrarModalAccesoDenegado && (
        <div
          className="modal d-block tab-index-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border border-danger">
              <div className="modal-header border-danger">
                <h5 className="modal-title text-danger fw-bold">
                  🛑 Acceso Denegado
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setMostrarModalAccesoDenegado(false)}
                ></button>
              </div>
              <div className="modal-body text-center py-4">
                <p className="fs-5">
                  No tienes autorización para acceder al panel de administración.
                </p>
                <p className="text-muted small">
                  Debes ingresar el correo institucional autorizado (<strong>admin@levelup.cl</strong>) y la clave correspondiente.
                </p>
              </div>
              <div className="modal-footer border-secondary justify-content-center">
                <button
                  type="button"
                  className="btn btn-danger fw-bold px-4"
                  onClick={() => setMostrarModalAccesoDenegado(false)}
                >
                  Entendido / Reintentar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
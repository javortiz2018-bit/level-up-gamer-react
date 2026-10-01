import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Registrar() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(""); // 1. Estado para mensaje de éxito

  const { registrarUsuario } = useAuth(); // Ya no necesitamos iniciarSesion aquí
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!nombre || !email || !password || !confirmPassword) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Proceso de registro sincronizado con AuthContext
    const respuesta = registrarUsuario({
      nombre,
      email,
      edad: edad || 18,
      password,
    });

    if (respuesta.ok) {
      // 2. Muestra mensaje de éxito
      setExito(respuesta.msj);

      // 3. Espera 1.5 segundos y redirige a la vista /login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setError(respuesta.msj);
    }
  };

  return (
    <main className="container py-5 text-white">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div 
            className="card text-white border-0 p-4 shadow-lg rounded-4"
            style={{ backgroundColor: "#111827", border: "1px solid #1f2937" }}
          >
            <div className="card-body">
              {/* Encabezado */}
              <div className="text-center mb-4">
                <span 
                  className="badge px-3 py-1 text-uppercase fw-bold mb-2 rounded-pill"
                  style={{ backgroundColor: "rgba(244, 63, 94, 0.2)", color: "#f43f5e" }}
                >
                  Comunidad
                </span>
                <h2 className="fw-bold text-white mb-1">Crear Cuenta</h2>
                <p className="small" style={{ color: "#94a3b8" }}>
                  Únete a Level-Up Gamer y gana puntos en cada una de tus compras.
                </p>
              </div>

              {/* Banner Duoc UC */}
              <div 
                className="p-3 rounded-3 small mb-4"
                style={{ backgroundColor: "rgba(14, 165, 233, 0.15)", border: "1px solid #0284c7", color: "#38bdf8" }}
              >
                🎓 <strong>¿Perteneces a Duoc UC?</strong> Usa tu correo <code style={{ color: "#e0f2fe" }}>@duocuc.cl</code> para activar un 20% de descuento permanente.
              </div>

              {/* Mensaje de Error */}
              {error && (
                <div className="alert alert-danger small py-2 mb-3" role="alert">
                  {error}
                </div>
              )}

              {/* Mensaje de Éxito */}
              {exito && (
                <div className="alert alert-success small py-2 mb-3" role="alert">
                  {exito}
                </div>
              )}

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold" style={{ color: "#94a3b8" }}>
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="form-control text-white border-secondary shadow-none"
                    style={{ backgroundColor: "#1f2937" }}
                    placeholder="Ej. Constanza Silva"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold" style={{ color: "#94a3b8" }}>
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control text-white border-secondary shadow-none"
                    style={{ backgroundColor: "#1f2937" }}
                    placeholder="nombre@ejemplo.com o usuario@duocuc.cl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold" style={{ color: "#94a3b8" }}>
                    Edad (Opcional)
                  </label>
                  <input
                    type="number"
                    className="form-control text-white border-secondary shadow-none"
                    style={{ backgroundColor: "#1f2937" }}
                    placeholder="Ej. 20"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold" style={{ color: "#94a3b8" }}>
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control text-white border-secondary shadow-none"
                    style={{ backgroundColor: "#1f2937" }}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold" style={{ color: "#94a3b8" }}>
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control text-white border-secondary shadow-none"
                    style={{ backgroundColor: "#1f2937" }}
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100 fw-bold text-uppercase py-2 mb-3 text-white"
                  style={{ backgroundColor: "#c026d3", border: "none" }}
                >
                  Registrarme
                </button>
              </form>

              {/* Pie de página */}
              <div className="text-center mt-3 pt-3 border-top border-secondary small">
                <span style={{ color: "#94a3b8" }}>¿Ya tienes una cuenta? </span>
                <Link to="/login" className="fw-bold text-decoration-none" style={{ color: "#f43f5e" }}>
                  Inicia sesión aquí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
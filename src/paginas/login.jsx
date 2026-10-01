import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // Lógica de inicio de sesión
    const resultado = iniciarSesion(email, password);

    // Verificamos la propiedad .ok del resultado
    if (resultado.ok) {
      navigate("/");
    } else {
      // Guardamos el mensaje específico recibido desde AuthContext
      setError(resultado.msj);
    }
  };

  return (
    <main className="container py-5 text-white">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card bg-dark text-white border-secondary p-4 shadow-lg">
            <div className="card-body">
              {/* Encabezado */}
              <div className="text-center mb-4">
                <span className="badge bg-danger text-uppercase mb-2">Acceso</span>
                <h2 className="fw-bold">Iniciar Sesión</h2>
                <p className="text-secondary small">
                  Ingresa tus datos para acceder a tus puntos y beneficios.
                </p>
              </div>

              {/* Banner informativo Duoc UC */}
              <div className="alert alert-info bg-info/10 border-info text-info small mb-4">
                💡 Si tu correo es <strong>@duocuc.cl</strong>, obtendrás un 20% de descuento automático en tus compras.
              </div>

              {/* Mensaje de Error */}
              {error && (
                <div className="alert alert-danger small py-2 mb-3" role="alert">
                  {error}
                </div>
              )}

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="nombre@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-secondary">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100 fw-bold text-uppercase py-2 mb-3"
                >
                  Entrar
                </button>
              </form>

              {/* Pie de tarjeta */}
              <div className="text-center mt-3 pt-3 border-top border-secondary small">
                <span className="text-secondary">¿No tienes una cuenta? </span>
                <Link to="/registrar" className="text-danger fw-bold text-decoration-none">
                  Regístrate aquí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
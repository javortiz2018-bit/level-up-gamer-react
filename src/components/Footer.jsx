import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer 
      className="text-white pt-5 pb-4 border-top border-secondary mt-auto" 
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="container">
        <div className="row g-4">
          
          {/* Columna 1: Level-Up Gamer */}
          <div className="col-12 col-md-4">
            <h5 className="text-danger fw-bold mb-3">Level-Up Gamer</h5>
            <p className="text-secondary small pe-md-4">
              Tu tienda especializada en tecnología gamer, periféricos, componentes de PC y asesoría profesional en Chile.
            </p>
          </div>

          {/* Columna 2: NAVEGACIÓN */}
          <div className="col-12 col-md-4">
            <h6 className="text-uppercase fw-bold mb-3 text-white">NAVEGACIÓN</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li>
                <Link to="/" className="text-secondary text-decoration-none hover-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-secondary text-decoration-none hover-white">
                  Catálogo de Productos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-secondary text-decoration-none hover-white">
                  Gaming Blog
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-secondary text-decoration-none hover-white">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-secondary text-decoration-none hover-white">
                  Contacto y Soporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: ATENCIÓN AL CLIENTE */}
          <div className="col-12 col-md-4">
            <h6 className="text-uppercase fw-bold mb-3 text-white">ATENCIÓN AL CLIENTE</h6>
            <ul className="list-unstyled small text-secondary d-flex flex-column gap-2 mb-3">
              <li>📍 Santiago, Chile</li>
              <li>✉️ contacto@levelupgamer.cl</li>
              <li>📞 +56 9 1234 5678</li>
            </ul>

            {/* Insignias de Redes Sociales */}
            <div className="d-flex gap-2">
              <span className="badge bg-secondary text-white px-2 py-1 fw-normal">Instagram</span>
              <span className="badge bg-secondary text-white px-2 py-1 fw-normal">Discord</span>
              <span className="badge bg-secondary text-white px-2 py-1 fw-normal">Twitch</span>
            </div>
          </div>

        </div>

        {/* Línea divisoria */}
        <hr className="my-4 border-secondary" />

        {/* Copyright */}
        <div className="text-center text-secondary small">
          © 2026 Level-Up Gamer. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}